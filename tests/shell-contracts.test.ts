import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

import { primaryDestinations } from "../src/components/layout/navigation.ts"

const readSource = (relativePath: string): Promise<string> =>
  readFile(new URL(`../${relativePath}`, import.meta.url), "utf8")

test("mounts the shared shell around the route view", async () => {
  // Given
  const appSource = await readSource("src/App.vue")

  // When
  const componentOrder = ["<SkipLink", "<SiteHeader", "<main", "<RouterView", "<SiteFooter"]
    .map((component) => appSource.indexOf(component))

  // Then
  assert.ok(componentOrder.every((index) => index >= 0))
  assert.deepEqual(componentOrder, componentOrder.toSorted((left, right) => left - right))
})

test("declares one shared destination collection for every navigation surface", async () => {
  // Given
  const appSource = await readSource("src/App.vue")

  // When
  const importsSharedDestinations = appSource.includes("primaryDestinations")

  // Then
  assert.equal(importsSharedDestinations, true)
  assert.deepEqual(primaryDestinations, [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Publications", to: "/publications" },
    { label: "Teaching", to: "/teaching" },
    { label: "Join Us", to: "/join-us" },
  ])
})

test("provides explicit drawer dismissal and focus restoration behavior", async () => {
  // Given
  const appSource = await readSource("src/App.vue")
  const drawerSource = await readSource("src/components/layout/MobileNavigation.vue")

  // When
  const mountsMobileNavigation = appSource.includes("<MobileNavigation")
  const behaviorMarkers = [
    'event.key === "Escape"',
    'reason === "route" ? props.mainId : props.triggerId',
    'document.body.style.overflow = "hidden"',
    "document.body.style.paddingInlineEnd",
    "releaseScrollLock()",
    '@click="close(\'route\')"',
  ]

  // Then
  assert.equal(mountsMobileNavigation, true)
  assert.ok(behaviorMarkers.every((marker) => drawerSource.includes(marker)))
})
