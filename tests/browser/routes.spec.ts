import { captureRoute, expect, test } from "./quality-test.ts"

const routes = [
  { name: "home", hash: "/", heading: /Visual intelligence/ },
  { name: "about", hash: "/about", heading: "A laboratory for visual systems." },
  { name: "publications", hash: "/publications", heading: "Publications" },
  { name: "teaching", hash: "/teaching", heading: "Teaching" },
  { name: "join-us", hash: "/join-us", heading: "Join MAPL" },
] as const

for (const route of routes) {
  test(`renders ${route.name} directly and after a hash refresh`, async ({ page }, testInfo) => {
    // Given
    await page.goto(`/#${route.hash}`)

    // When
    await page.reload()

    // Then
    await expect(page).toHaveURL(new RegExp(`#${route.hash.replace("/", "\\/")}$`, "u"))
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible()
    await captureRoute(page, testInfo, route.name)
  })
}
