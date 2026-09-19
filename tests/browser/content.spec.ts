import type { Locator } from "@playwright/test"

import { expect, test } from "./quality-test.ts"

const expectOutboundContract = async (link: Locator): Promise<void> => {
  await expect(link).toHaveAttribute("href", /^https:\/\//u)
  await expect(link).toHaveAttribute("target", "_blank")
  await expect(link).toHaveAttribute("rel", "noreferrer")
}

test("renders the newest Home news and expands the archive", async ({ page }) => {
  // Given
  await page.goto("/#/")

  // When
  const ledger = page.getByRole("region", { name: "News ledger" })
  await ledger.getByText("Open news archive").click()

  // Then
  await expect(ledger.locator(".news-entry")).toHaveCount(5)
  await expect(ledger.locator(".news-entry").first().getByRole("heading", { name: "MAPL is recruiting students" })).toBeVisible()
  await expect(ledger.locator(".news-archive__entry").first()).toBeVisible()
  await expectOutboundContract(ledger.locator(".news-entry").first().getByRole("link"))
})

test("renders advisor, current-member groups, alumni, and the Join Us pathway", async ({ page }) => {
  // Given
  await page.goto("/#/about")

  // Then
  await expect(page.getByRole("region", { name: "Advisor" }).locator(".person-card")).toHaveCount(1)
  await expect(page.locator("#group-visiting-researchers")).toBeVisible()
  await expect(page.locator("#group-phd-students")).toBeVisible()
  await expect(page.locator("#group-masters-students")).toBeVisible()
  await expect(page.locator("#group-undergraduate-students")).toBeVisible()
  await expect(page.locator("#alumni-phd-graduates")).toBeVisible()
  await expect(page.locator("#alumni-alumni")).toBeVisible()
  await page.getByRole("link", { name: "Explore opportunities" }).click()
  await expect(page.getByRole("heading", { level: 1, name: "Join MAPL" })).toBeVisible()
})

test("renders Teaching courses and validates representative external CTAs without opening them", async ({ page }) => {
  // Given
  await page.goto("/#/teaching")

  // Then
  await expect(page.getByRole("heading", { name: "Deep Learning and Practice" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Video Compression" })).toBeVisible()
  const resources = page.getByRole("navigation", { name: "Teaching resources" }).getByRole("link")
  await expect(resources).toHaveCount(2)
  for (let index = 0; index < await resources.count(); index += 1) {
    await expectOutboundContract(resources.nth(index))
  }
})

test("renders Join Us media, contact details, and download contracts", async ({ page }) => {
  // Given
  await page.goto("/#/join-us")

  // Then
  await expect(page.getByRole("img", { name: "MAPL members at the 2025 year-end gathering" })).toBeVisible()
  await expect(page.getByText("EC621", { exact: true })).toBeVisible()
  await expect(page.getByRole("link", { name: "Email Prof. Peng" })).toHaveAttribute("href", "mailto:wpeng@cs.nycu.edu.tw")
  await expectOutboundContract(page.getByRole("link", { name: "Open the 2027 lab introduction" }))
  await expectOutboundContract(page.getByRole("link", { name: "Official profile" }))
})
