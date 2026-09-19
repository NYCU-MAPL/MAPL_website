import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const root = new URL("../", import.meta.url)
const readRepositoryFile = (path: string): Promise<string> => readFile(new URL(path, root), "utf8")

const pinnedActionPattern = /^\s*uses:\s+[^\s@]+@[0-9a-f]{40}\s+#\s+v\d+(?:\.\d+){0,2}\s*$/gmu
const actionLinePattern = /^\s*uses:\s+.+$/gmu

const assertActionsArePinned = (workflow: string): void => {
  const actionLines = workflow.match(actionLinePattern) ?? []
  const pinnedActionLines = workflow.match(pinnedActionPattern) ?? []
  assert.ok(actionLines.length > 0)
  assert.deepEqual(pinnedActionLines, actionLines)
}

test("CI validates pull requests and main pushes with retained reports", async () => {
  // Given
  const workflow = await readRepositoryFile(".github/workflows/ci.yml")

  // When
  const configuredCommands = ["npm ci", "npm run qa:static", "npm run qa:browser"]

  // Then
  assert.match(workflow, /^name: CI$/mu)
  assert.match(workflow, /^ {2}pull_request:$/mu)
  assert.match(workflow, /^ {2}push:\n {4}branches: \[main\]$/mu)
  assert.match(workflow, /^permissions:\n {2}contents: read$/mu)
  assert.match(workflow, /^concurrency:\n {2}group: ci-/mu)
  assert.match(workflow, /cache: npm/u)
  assert.match(workflow, /playwright install --with-deps chromium/u)
  for (const command of configuredCommands) assert.match(workflow, new RegExp(command.replaceAll(" ", "\\s+"), "u"))
  assert.match(workflow, /path: artifacts\/static\//u)
  assert.match(workflow, /path: artifacts\/browser\//u)
  assert.match(workflow, /if: \$\{\{ always\(\) \}\}/u)
  assert.match(workflow, /Enforce QA result/u)
  assertActionsArePinned(workflow)
})

test("deployment is limited to successful CI runs for main pushes", async () => {
  // Given
  const workflow = await readRepositoryFile(".github/workflows/deploy.yml")

  // When
  const requiredGateTerms = [
    "github.event.workflow_run.conclusion == 'success'",
    "github.event.workflow_run.event == 'push'",
    "github.event.workflow_run.head_branch == 'main'",
    "github.event.workflow_run.head_repository.full_name == github.repository",
  ]

  // Then
  assert.match(workflow, /^name: Deploy gh-pages$/mu)
  assert.match(workflow, /^ {2}workflow_run:\n {4}workflows: \[CI\]\n {4}types: \[completed\]\n {4}branches: \[main\]$/mu)
  assert.doesNotMatch(workflow, /^ {2}(?:pull_request|push|workflow_dispatch):/mu)
  for (const term of requiredGateTerms) assert.ok(workflow.includes(term), `missing deployment gate: ${term}`)
  assert.match(workflow, /^permissions:\n {2}contents: read$/mu)
  assert.match(workflow, /^ {4}permissions:\n {6}contents: write$/mu)
  assert.match(workflow, /^concurrency:\n {2}group: gh-pages-production\n {2}cancel-in-progress: false$/mu)
  assert.match(workflow, /ref: \$\{\{ github\.event\.workflow_run\.head_sha \}\}/u)
  assert.match(workflow, /persist-credentials: false/u)
  assert.match(workflow, /npm run qa:static/u)
  assert.match(workflow, /npm run qa:browser/u)
  assert.match(workflow, /needs: validate/u)
  assert.match(workflow, /uses: actions\/upload-artifact@[0-9a-f]{40}/u)
  assert.match(workflow, /uses: actions\/download-artifact@[0-9a-f]{40}/u)
  assert.match(workflow, /include-hidden-files: true/u)
  assert.match(workflow, /find dist -type l/u)
  assert.match(workflow, /ls-remote origin refs\/heads\/main/u)
  assert.doesNotMatch(workflow, /peaceiris|--force|force-with-lease/u)
  const publishJob = workflow.slice(workflow.indexOf("  publish:"))
  assert.doesNotMatch(publishJob, /actions\/checkout|npm (?:ci|run)|node scripts\//u)
  assert.equal(workflow.match(/contents: write/gu)?.length, 1)
  assertActionsArePinned(workflow)
})

test("failed, pull request, fork, and non-main workflow runs cannot deploy", () => {
  // Given
  const canDeploy = (conclusion: string, event: string, branch: string, repositoryMatches: boolean): boolean =>
    conclusion === "success" && event === "push" && branch === "main" && repositoryMatches
  const rejectedRuns = [
    ["failure", "push", "main", true],
    ["success", "pull_request", "main", true],
    ["success", "push", "feature", true],
    ["success", "push", "main", false],
  ] as const

  // When
  const rejectedDecisions = rejectedRuns.map((run) => canDeploy(run[0], run[1], run[2], run[3]))

  // Then
  assert.deepEqual(rejectedDecisions, [false, false, false, false])
  assert.equal(canDeploy("success", "push", "main", true), true)
})

test("publication policy uses a relative base and a build-owned nojekyll marker", async () => {
  // Given
  const [viteConfig, marker] = await Promise.all([
    readRepositoryFile("vite.config.ts"),
    readRepositoryFile("public/.nojekyll"),
  ])

  // When
  const relativeBaseConfigured = /base:\s*["']\.\/["']/u.test(viteConfig)

  // Then
  assert.equal(relativeBaseConfigured, true)
  assert.equal(marker, "")
})
