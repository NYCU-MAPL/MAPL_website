import { spawnSync } from "node:child_process"
import { cp, mkdtemp, readdir, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { basename, join, resolve } from "node:path"

const gitEnvironment = { ...process.env, GIT_MASTER: "1" }

const runGit = (arguments_, cwd, acceptedStatuses = [0]) => {
  const result = spawnSync("git", arguments_, { cwd, encoding: "utf8", env: gitEnvironment })
  if (!acceptedStatuses.includes(result.status ?? 1)) {
    throw new Error(`git ${arguments_.join(" ")} failed: ${result.stderr.trim()}`)
  }
  return result
}

const parseArguments = (arguments_) => {
  const values = new Map()
  let push = false
  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index]
    if (argument === "--push") {
      push = true
      continue
    }
    const value = arguments_[index + 1]
    if (!argument?.startsWith("--") || value === undefined || value.startsWith("--")) {
      throw new Error(`Invalid publication argument: ${argument ?? "<missing>"}`)
    }
    values.set(argument, value)
    index += 1
  }
  const source = values.get("--source")
  const remote = values.get("--remote")
  const sourceSha = values.get("--source-sha")
  if (source === undefined || remote === undefined || sourceSha === undefined) {
    throw new Error("Required arguments: --source <dir> --remote <url> --source-sha <sha> [--push]")
  }
  if (!/^[0-9a-f]{7,40}$/u.test(sourceSha) && sourceSha !== "sandbox") {
    throw new Error(`Invalid source SHA: ${sourceSha}`)
  }
  return { source: resolve(source), remote, sourceSha, push }
}

const listFiles = async (directory, prefix = "") => {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.toSorted((left, right) => left.name.localeCompare(right.name)).map(async (entry) => {
    const path = join(directory, entry.name)
    const relativePath = prefix === "" ? entry.name : `${prefix}/${entry.name}`
    if (entry.isDirectory()) return listFiles(path, relativePath)
    if (!entry.isFile()) throw new Error(`Publication source contains non-regular entry: ${relativePath}`)
    return [relativePath]
  }))
  return nested.flat()
}

const options = parseArguments(process.argv.slice(2))
const sourceFiles = await listFiles(options.source)
if (!sourceFiles.includes("index.html") || !sourceFiles.includes(".nojekyll")) {
  throw new Error("Publication source must contain index.html and .nojekyll")
}

const forbiddenPath = /(^|\/)(?:\.git|\.github|node_modules|src|tests|artifacts|reports|test-results)(?:\/|$)|(^|\/)\.env(?:\.|$)|\.(?:pem|key)$/u
const rejectedFiles = sourceFiles.filter((file) => forbiddenPath.test(file))
if (rejectedFiles.length > 0) throw new Error(`Publication source contains forbidden files: ${rejectedFiles.join(", ")}`)

const workspace = await mkdtemp(join(tmpdir(), "mapl-gh-pages-"))
try {
  runGit(["init", "--initial-branch=gh-pages"], workspace)
  runGit(["remote", "add", "origin", options.remote], workspace)
  const branchLookup = runGit(["ls-remote", "--exit-code", "--heads", "origin", "gh-pages"], workspace, [0, 2])
  if (branchLookup.status === 0) {
    runGit(["fetch", "--depth=1", "origin", "gh-pages"], workspace)
    runGit(["checkout", "-B", "gh-pages", "FETCH_HEAD"], workspace)
  }

  const workspaceEntries = await readdir(workspace)
  await Promise.all(workspaceEntries.filter((entry) => entry !== ".git").map((entry) => rm(join(workspace, entry), { recursive: true, force: true })))
  await Promise.all((await readdir(options.source)).map((entry) => cp(join(options.source, entry), join(workspace, entry), { recursive: true })))

  runGit(["add", "--all"], workspace)
  const stagedDiff = runGit(["diff", "--cached", "--quiet"], workspace, [0, 1])
  if (stagedDiff.status === 1) {
    runGit(["config", "user.name", "github-actions[bot]"], workspace)
    runGit(["config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], workspace)
    runGit(["commit", "-m", `deploy: publish ${options.sourceSha}`], workspace)
    if (options.push) runGit(["push", "origin", "HEAD:gh-pages"], workspace)
  }

  const tree = options.push
    ? runGit(["ls-remote", "--heads", "origin", "gh-pages"], workspace).stdout.trim()
    : runGit(["ls-tree", "-r", "--name-only", "HEAD"], workspace).stdout.trim()
  console.log(`Published ${sourceFiles.length} dist files from ${basename(options.source)} without force: ${tree}`)
} finally {
  await rm(workspace, { recursive: true, force: true })
}
