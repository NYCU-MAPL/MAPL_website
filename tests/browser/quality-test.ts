import { mkdir } from "node:fs/promises"

import { expect, test as base } from "@playwright/test"
import type { Page, TestInfo } from "@playwright/test"

type QualityFixtures = {
  readonly browserErrors: string[]
}

export const test = base.extend<QualityFixtures>({
  browserErrors: [async ({ page }, use) => {
    const errors: string[] = []
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(`console: ${message.text()}`)
    })
    page.on("pageerror", (error) => errors.push(`page: ${error.message}`))
    await use(errors)
  }, { auto: true }],
})

test.afterEach(async ({ page, browserErrors }) => {
  if (page.isClosed()) return
  const images = page.locator("img")
  for (let index = 0; index < await images.count(); index += 1) {
    const image = images.nth(index)
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((element) => {
      if (!(element instanceof HTMLImageElement)) throw new TypeError("Expected image element")
      return element.complete && element.naturalWidth > 0
    })).toBe(true)
  }
  const pageWidth = await page.evaluate(() => Math.max(
    document.body.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.scrollWidth,
    document.documentElement.offsetWidth,
  ))
  const viewportWidth = await page.evaluate(() => window.innerWidth)
  expect(pageWidth).toBeLessThanOrEqual(viewportWidth)
  expect(browserErrors).toEqual([])
})

export const captureRoute = async (page: Page, testInfo: TestInfo, name: string): Promise<void> => {
  const directory = `artifacts/browser/screenshots/${testInfo.project.name}`
  await mkdir(directory, { recursive: true })
  const path = `${directory}/${name}.png`
  await page.screenshot({ path, fullPage: true })
  await testInfo.attach(`${testInfo.project.name}-${name}`, { path, contentType: "image/png" })
}

export { expect }
