import { readFile } from "node:fs/promises"

const htmlPath = process.argv[2] ?? "dist/index.html"
const html = await readFile(htmlPath, "utf8")
const rootAbsoluteAssetPattern = /\b(src|href)=["'](\/(?!\/)[^"']*)["']/gu
const forbiddenRuntimePattern = /(?:jquery|bootstrap).*cdn|cdn.*(?:jquery|bootstrap)/giu

const rootAbsoluteAssets = [...html.matchAll(rootAbsoluteAssetPattern)]
const forbiddenRuntimeMatches = [...html.matchAll(forbiddenRuntimePattern)]

for (const match of rootAbsoluteAssets) {
  const attribute = match[1]
  const value = match[2]
  console.error(`${htmlPath}: ${attribute} uses root-absolute local URL "${value}"`)
}

for (const match of forbiddenRuntimeMatches) {
  console.error(`${htmlPath}: forbidden CDN runtime reference "${match[0]}"`)
}

if (rootAbsoluteAssets.length > 0 || forbiddenRuntimeMatches.length > 0) {
  process.exitCode = 1
} else {
  console.log(`${htmlPath}: built asset references are relative and CDN-free`)
}
