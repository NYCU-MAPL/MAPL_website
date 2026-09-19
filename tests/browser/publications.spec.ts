import type { Locator } from "@playwright/test"

import { expect, test } from "./quality-test.ts"

const optionValues = (select: Locator): Promise<readonly string[]> =>
  select.locator("option").evaluateAll((options) => options.map((option) => {
    if (!(option instanceof HTMLOptionElement)) throw new TypeError("Expected option element")
    return option.value
  }))

test("exercises every publication filter combination and updates the query", async ({ page }) => {
  // Given
  await page.goto("/#/publications")
  const type = page.getByLabel("Type")
  const topic = page.getByLabel("Topic")
  const year = page.getByLabel("Year")

  for (const typeValue of await optionValues(type)) {
    for (const topicValue of await optionValues(topic)) {
      for (const yearValue of await optionValues(year)) {
        // When
        await type.selectOption(typeValue)
        await topic.selectOption(topicValue)
        await year.selectOption(yearValue)
        const expectedQuery = new URLSearchParams()
        if (typeValue !== "all") expectedQuery.set("type", typeValue)
        if (topicValue !== "all") expectedQuery.set("topic", topicValue)
        if (yearValue !== "all") expectedQuery.set("year", yearValue)
        const expectedHash = `#/publications${expectedQuery.size === 0 ? "" : `?${expectedQuery}`}`

        // Then
        await expect(type).toHaveValue(typeValue)
        await expect(topic).toHaveValue(topicValue)
        await expect(year).toHaveValue(yearValue)
        await expect.poll(() => new URL(page.url()).hash).toBe(expectedHash)
        await expect(page.locator(".publications-view__count")).toContainText(/publications?/u)
      }
    }
  }
})

test("preserves direct query filters after refresh and renders the zero state", async ({ page }) => {
  // Given
  await page.goto("/#/publications?topic=image-restoration&year=2026")

  // When
  await page.reload()

  // Then
  await expect(page.getByLabel("Topic")).toHaveValue("image-restoration")
  await expect(page.getByLabel("Year")).toHaveValue("2026")
  await expect(page.getByRole("status")).toContainText("No matching records")
  await expect(page.locator(".publications-view__count")).toHaveText("0 publications")
})

test("validates publication resource contracts without third-party navigation", async ({ page }) => {
  // Given
  await page.goto("/#/publications")

  // Then
  const paper = page.getByRole("link", { name: "Paper", exact: true }).first()
  await expect(paper).toHaveAttribute("href", /^https:\/\//u)
  await expect(paper).toHaveAttribute("target", "_blank")
  await expect(paper).toHaveAttribute("rel", "noreferrer")
})
