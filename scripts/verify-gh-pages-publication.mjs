import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(fileURLToPath(new URL("..", import.meta.url)))
const reportPath = resolve(process.argv[2] ?? "artifacts/deployment/publish-tree.json")
const gitEnvironment = { ...process.env, GIT_MASTER: "1" }

const run = (command, arguments_, cwd) => {
  const result = spawnSync(command, arguments_, { cwd, encoding: "utf8", env: gitEnvironment })
  if (result.status !== 0) throw new Error(`${command} ${arguments_.join(" ")} failed: ${result.stderr.trim()}`)
  return result.stdout.trim()
}

const manifest = async (directory, prefix = "") => {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.toSorted((left, right) => left.name.localeCompare(right.name)).map(async (entry) => {
    if (entry.name === ".git") return []
    const path = join(directory, entry.name)
    const relativePath = prefix === "" ? entry.name : `${prefix}/${entry.name}`
    if (entry.isDirectory()) return manifest(path, relativePath)
    const hash = createHash("sha256").update(await readFile(path)).digest("hex")
    return [{ path: relativePath, sha256: hash }]
  }))
  return nested.flat()
}

const sandbox = await mkdtemp(join(tmpdir(), "mapl-publication-sandbox-"))
try {
  const remote = join(sandbox, "remote.git")
  const seed = join(sandbox, "seed")
  const checkout = join(sandbox, "checkout")
  run("git", ["init", "--bare", remote], root)
  await mkdir(seed)
  await writeFile(join(seed, "index.html"), "obsolete sandbox content\n")
  await writeFile(join(seed, ".nojekyll"), "")
  const unsafeSource = join(sandbox, "unsafe")
  await mkdir(unsafeSource)
  await writeFile(join(unsafeSource, "index.html"), "unsafe sandbox content\n")
  await writeFile(join(unsafeSource, ".nojekyll"), "")
  await symlink("index.html", join(unsafeSource, "linked.html"))
  const rejected = spawnSync(process.execPath, ["scripts/publish-gh-pages.mjs", "--source", unsafeSource, "--remote", remote, "--source-sha", "sandbox", "--push"], { cwd: root, encoding: "utf8", env: gitEnvironment })
  if (rejected.status === 0 || !rejected.stderr.includes("non-regular entry")) {
    throw new Error("Publisher did not reject a symbolic link")
  }
  run(process.execPath, ["scripts/publish-gh-pages.mjs", "--source", seed, "--remote", remote, "--source-sha", "sandbox", "--push"], root)
  run(process.execPath, ["scripts/publish-gh-pages.mjs", "--source", join(root, "dist"), "--remote", remote, "--source-sha", "sandbox", "--push"], root)
  run("git", ["clone", "--quiet", "--branch", "gh-pages", remote, checkout], root)

  const [expected, published] = await Promise.all([manifest(join(root, "dist")), manifest(checkout)])
  if (JSON.stringify(published) !== JSON.stringify(expected)) {
    throw new Error("Sandbox gh-pages tree differs from dist manifest")
  }
  const historyLength = Number(run("git", ["--git-dir", remote, "rev-list", "--count", "gh-pages"], root))
  if (historyLength !== 2) throw new Error(`Expected history-safe two-commit simulation, received ${historyLength}`)

  const report = {
    command: "npm run deploy:dry-run",
    passed: true,
    source: "dist/",
    branch: "gh-pages",
    commits: historyLength,
    files: published,
  }
  await mkdir(resolve(reportPath, ".."), { recursive: true })
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(published.map(({ path }) => path).join("\n"))
  console.log(`Verified ${published.length} files: gh-pages exactly matches dist/ with normal history`)
} finally {
  await rm(sandbox, { recursive: true, force: true })
}
