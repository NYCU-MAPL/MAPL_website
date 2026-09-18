import { readdir, readFile, stat } from "node:fs/promises"
import { extname, join, relative, sep } from "node:path"

export type MediaAudit = {
  readonly referenced: number
  readonly files: number
  readonly byDirectory: Readonly<Record<string, number>>
  readonly errors: readonly string[]
  readonly warnings: readonly string[]
}

const walk = async (directory: string): Promise<readonly string[]> => {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  }))
  return nested.flat().toSorted()
}

const hasExpectedSignature = (extension: string, bytes: Uint8Array): boolean => {
  switch (extension) {
    case ".png":
      return bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47
    case ".jpg":
    case ".jpeg":
      return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
    case ".webp":
      return bytes.length >= 12 && new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" &&
        new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP"
    default:
      return false
  }
}

export const auditMedia = async (
  references: readonly string[],
  publicRoot: string,
): Promise<MediaAudit> => {
  const errors: string[] = []
  const warnings: string[] = []
  const counts = new Map<string, number>()
  for (const reference of references) counts.set(reference, (counts.get(reference) ?? 0) + 1)
  for (const [reference, count] of counts) {
    if (count !== 1) errors.push(`${reference}: referenced ${count} times`)
    const path = join(publicRoot, reference)
    try {
      const info = await stat(path)
      if (!info.isFile()) errors.push(`${reference}: is not a file`)
      if (info.size === 0) errors.push(`${reference}: file is empty`)
      const bytes = await readFile(path)
      if (!hasExpectedSignature(extname(path).toLowerCase(), bytes)) {
        errors.push(`${reference}: extension does not match supported image content`)
      }
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") {
        errors.push(`${reference}: file does not exist`)
      } else {
        throw error
      }
    }
  }

  let files: readonly string[] = []
  try {
    files = (await walk(join(publicRoot, "media"))).map((path) =>
      `media/${relative(join(publicRoot, "media"), path).split(sep).join("/")}`,
    )
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error
  }
  for (const file of files) {
    if (!counts.has(file)) errors.push(`${file}: orphan file is not referenced by JSON`)
  }

  const byDirectory: Record<string, number> = {}
  for (const file of files) {
    const directory = file.split("/")[1]
    if (directory !== undefined) byDirectory[directory] = (byDirectory[directory] ?? 0) + 1
  }
  return {
    referenced: references.length,
    files: files.length,
    byDirectory,
    errors: errors.toSorted(),
    warnings,
  }
}
