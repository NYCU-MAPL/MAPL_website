import { spawn } from "node:child_process"
import { mkdir, readdir, rm, writeFile } from "node:fs/promises"

const artifactDirectory = "artifacts/static"
await rm(artifactDirectory, { recursive: true, force: true })
await rm("dist", { recursive: true, force: true })
await mkdir(artifactDirectory, { recursive: true })
const testFiles = (await readdir("tests"))
  .filter((file) => file.endsWith(".test.ts"))
  .map((file) => `tests/${file}`)
  .toSorted()

const run = (name, command, arguments_) => new Promise((resolve) => {
  const child = spawn(command, arguments_, { stdio: ["ignore", "pipe", "pipe"] })
  let log = ""
  const capture = (chunk) => {
    log += chunk
    process.stdout.write(chunk)
  }
  child.stdout.setEncoding("utf8")
  child.stderr.setEncoding("utf8")
  child.stdout.on("data", capture)
  child.stderr.on("data", capture)
  child.on("close", async (code) => {
    const exitCode = code ?? 1
    await writeFile(`${artifactDirectory}/${name}.log`, log, "utf8")
    resolve({ name, status: exitCode === 0 ? "passed" : "failed", exitCode })
  })
})

const npm = process.platform === "win32" ? "npm.cmd" : "npm"
const steps = [
  ["lint", npm, ["run", "lint"]],
  ["type-check", npm, ["run", "check"]],
  ["tests", process.execPath, ["--experimental-strip-types", "--test", "--test-reporter=tap", ...testFiles]],
  ["content-validation", process.execPath, ["--experimental-strip-types", "scripts/validate-content.ts", "--output", `${artifactDirectory}/content-validation.json`]],
  ["site-audit", process.execPath, ["--experimental-strip-types", "scripts/validate-site.ts", "--output", `${artifactDirectory}/site-audit.json`]],
  ["build", npm, ["run", "build"]],
  ["built-assets", process.execPath, ["scripts/verify-built-assets.mjs"]],
  ["node-engine", npm, ["run", "verify:engines"]],
]

const results = []
for (const [name, command, arguments_] of steps) {
  results.push(await run(name, command, arguments_))
}

const passed = results.every(({ exitCode }) => exitCode === 0)
const report = { command: "npm run qa:static", passed, steps: results }
await writeFile(`${artifactDirectory}/results.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8")

process.exitCode = passed ? 0 : 1
