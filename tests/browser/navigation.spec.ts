import { expect, test } from "./quality-test.ts"

const destinations = [
  ["Home", "/", /Visual intelligence/],
  ["About", "/about", "A laboratory for visual systems."],
  ["Publications", "/publications", "Publications"],
  ["Teaching", "/teaching", "Teaching"],
  ["Join Us", "/join-us", "Join MAPL"],
] as const

test("moves keyboard focus to the main landmark through the skip link", async ({ page }) => {
  // Given
  await page.goto("/#/")

  // When
  await page.keyboard.press("Tab")
  const skipLink = page.getByRole("link", { name: "Skip to main content" })
  await expect(skipLink).toBeFocused()
  await skipLink.press("Enter")

  // Then
  await expect(page.locator("#main-content")).toBeFocused()
})

test("navigates all destinations from the desktop primary navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop navigation journey")
  await page.goto("/#/")
  const navigation = page.getByRole("navigation", { name: "Primary navigation" })

  for (const [label, hash, heading] of destinations) {
    // When
    await navigation.getByRole("link", { name: label, exact: true }).click()

    // Then
    await expect(page).toHaveURL(new RegExp(`#${hash.replace("/", "\\/")}$`, "u"))
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible()
  }
})

test("closes the mobile drawer on Escape and route selection with focus restoration", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile drawer journey")
  await page.goto("/#/")
  const trigger = page.getByRole("button", { name: "Open navigation" })

  await trigger.click()
  const dialog = page.getByRole("dialog", { name: "Primary navigation" })
  const closeButton = dialog.getByRole("button", { name: "Close navigation" })
  const firstLink = dialog.getByRole("link", { name: "MAPL home" })
  const lastLink = dialog.getByRole("link", { name: "Join Us", exact: true })
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden")
  await expect(closeButton).toBeFocused()
  await page.keyboard.press("Shift+Tab")
  await expect(firstLink).toBeFocused()
  await page.keyboard.press("Shift+Tab")
  await expect(lastLink).toBeFocused()
  await page.keyboard.press("Tab")
  await expect(firstLink).toBeFocused()

  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden")

  // Selecting the current route closes and focuses main.
  await trigger.click()
  await dialog.getByRole("link", { name: "Home", exact: true }).click()
  await expect(dialog).toBeHidden()
  await expect(page.locator("#main-content")).toBeFocused()

  // Selecting another route preserves the same close/focus contract.
  await trigger.click()
  await dialog.getByRole("link", { name: "About", exact: true }).click()
  await expect(page).toHaveURL(/#\/about$/u)
  await expect(dialog).toBeHidden()
  await expect(page.locator("#main-content")).toBeFocused()
})
