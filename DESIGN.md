# MAPL Website Design System

## 0. Research Log

- Embedded references: shortlisted WIRED, Notion, and IBM for readable technical publishing; picked `minimalist-skill.md` + `wired.md` because MAPL needs an editorial research voice, disciplined rules, and strong type hierarchy without product-SaaS decoration. The references supply principles only; no brand identity, proprietary type, logo, layout, or asset is copied.
- ELSA inspection: viewed the live Home, About, and Publication routes in a browser. Retained only the high-level rhythm of a confident opening, clearly grouped content, and route-level editorial pacing; rejected its identity, media, exact layouts, styling, and assets.
- Lazyweb: ran 3 searches (`university research laboratory editorial website`, `academic lab people publications mobile website`, and `computer vision research institute publications people homepage`) and viewed 4 screens. Harvested wide centered desktop bands, emphatic title-to-metadata contrast, rule-separated modules, single-column mobile collapse, larger mobile targets, and compact desktop navigation.
- Interaction reference: read the beui.dev `drawer` source. Retained its Escape handling, body scroll-lock cleanup, side-panel/backdrop split, and reduced-motion opacity fallback; implemented the mechanism in Vue with native CSS and no added dependency.
- Imagen drafts: skipped because no image-generation tool is available in this environment. The shell has no page-specific hero art, so the design contract is expressed through the primitive system and verified rendered screens.

## 1. Atmosphere & Identity

MAPL is a **signal ledger**: calm ivory paper, precise evergreen ink, copper registration marks, and strong editorial rules give laboratory work the permanence of a research notebook without imitating a journal or media brand. The signature is the MAPL wordmark lockup and its four-part “signal mark,” echoed by thin green rules and numbered metadata. The one memorable shell moment is functional: the mobile menu opens as a dark research index whose destinations align like a compact table of contents.

The shell serves prospective students, research peers, current lab members, and visitors using keyboards, screen readers, zoom, or reduced motion. It must remain direct under cognitive load: five destinations, one navigation model, plain labels, persistent context, and no ornamental interaction.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|---|---|---:|---|
| Canvas | `--color-canvas` | `#f3f1e9` | Page background, warm laboratory paper |
| Paper | `--color-paper` | `#fffdf7` | Header and primary content surfaces |
| Paper subdued | `--color-paper-subdued` | `#e8e5d9` | Quiet bands, secondary surfaces |
| Ink | `--color-ink` | `#17231d` | Main text and hard rules |
| Ink muted | `--color-ink-muted` | `#58645d` | Supporting copy and metadata |
| Forest | `--color-forest` | `#174f3d` | Brand, primary links, active navigation |
| Forest deep | `--color-forest-deep` | `#0c3027` | Drawer, footer, primary action states |
| Moss | `--color-moss` | `#a7b7a5` | Quiet rule and surface accent |
| Copper | `--color-copper` | `#b4512b` | Registration mark, active indicator, never large fill |
| Rule | `--color-rule` | `#c8cec4` | Hairline dividers |
| Focus | `--color-focus` | `#006fbe` | Keyboard focus ring |
| White | `--color-white` | `#ffffff` | Text on dark surfaces |
| Success | `--color-success` | `#26724f` | Future positive status |
| Warning | `--color-warning` | `#8b5b00` | Future caution status |
| Error | `--color-error` | `#a62f27` | Future error status |

### Rules

- Forest identifies MAPL and interactive emphasis; copper is a scarce orientation cue, not a CTA fill.
- Large surfaces remain canvas, paper, or forest deep. No gradients, glow, glass, or decorative color wash.
- Text meets WCAG 2.2 AA: 4.5:1 for body text and 3:1 for large text and graphical controls.
- No color may appear in component CSS without a token here.

## 3. Typography

### Font Stacks

- Display/editorial: `var(--font-display)` = `Iowan Old Style`, `Baskerville`, `Times New Roman`, serif.
- UI/body: `var(--font-ui)` = `Avenir Next`, `Avenir`, `Helvetica Neue`, sans-serif.
- Technical metadata: `var(--font-mono)` = `SFMono-Regular`, `Consolas`, `Liberation Mono`, monospace.
- These are dependency-free local stacks. No font or CDN request is permitted.

### Scale

| Level | Token | Size | Weight | Line height | Tracking | Usage |
|---|---|---:|---:|---:|---:|---|
| Display | `--text-display` | `clamp(2.75rem, 7vw, 6.5rem)` | 400 | 0.94 | `-0.045em` | Future route heroes |
| H1 | `--text-h1` | `clamp(2.5rem, 6vw, 5rem)` | 400 | 1 | `-0.035em` | Route title |
| H2 | `--text-h2` | `clamp(1.875rem, 4vw, 3rem)` | 400 | 1.08 | `-0.025em` | Major section |
| H3 | `--text-h3` | `clamp(1.375rem, 2.4vw, 1.75rem)` | 600 | 1.2 | `-0.015em` | Card or group title |
| Lead | `--text-lead` | `clamp(1.125rem, 2vw, 1.375rem)` | 400 | 1.55 | normal | Introductory copy |
| Body | `--text-body` | `1rem` | 400 | 1.65 | normal | Default reading |
| Small | `--text-small` | `0.875rem` | 500 | 1.5 | normal | Secondary information |
| Label | `--text-label` | `0.75rem` | 700 | 1.2 | `0.12em` | Uppercase technical metadata |

### Rules

- Display and H1 use the serif stack. UI controls and body use the UI stack. Labels use mono.
- Body text never falls below `--text-small`; primary body remains `--text-body`.
- Long headings use balanced wrapping where supported and remain under four lines at 390px.
- Measure is capped by `--measure-reading` for comfortable scanning.

## 4. Spacing & Layout

### Base Unit

All intentional spacing derives from 4px.

| Token | Value | Usage |
|---|---:|---|
| `--space-1` | `0.25rem` | Focus offsets, tight marks |
| `--space-2` | `0.5rem` | Icon/label gap |
| `--space-3` | `0.75rem` | Compact groups |
| `--space-4` | `1rem` | Mobile gutter and standard inset |
| `--space-5` | `1.25rem` | Compact control spacing |
| `--space-6` | `1.5rem` | Card and cluster spacing |
| `--space-8` | `2rem` | Grid gutter |
| `--space-10` | `2.5rem` | Content group separation |
| `--space-12` | `3rem` | Section spacing |
| `--space-16` | `4rem` | Page rhythm |
| `--space-20` | `5rem` | Desktop shell spacing |
| `--space-24` | `6rem` | Maximum section break |

### Geometry

- `--content-width: 78rem`; `--measure-reading: 46rem`; mobile gutter `--space-4`, tablet `--space-8`, desktop `--space-12`.
- `--control-size: 2.75rem` guarantees 44px controls; `--header-size: 6rem` and `--drawer-link-size: 4.5rem` establish stable shell rhythm.
- Breakpoints: compact below `48rem`; full desktop shell at `64rem`; content caps at `78rem`.
- Grid tracks use intrinsic mechanics such as `repeat(auto-fit, minmax(min(18rem, 100%), 1fr))` so long content collapses instead of clipping.
- Document scrolling belongs to the viewport. The drawer alone owns vertical overflow while open.
- The shell is a flex column with `min-block-size: 100dvh`; main content grows so the footer remains after short placeholders.

## 5. Components

### Application Shell

- **Structure**: skip link, semantic header, route navigation, `main#main-content`, and footer sitemap.
- **Layout**: document shell; viewport owns scrolling except while the drawer is open.
- **States**: route-active navigation, keyboard focus, compact and desktop navigation.
- **Accessibility**: one main landmark, labeled nav regions, skip destination is programmatically focusable, route transitions focus main only after explicit navigation through the drawer.

### MAPL Brand Lockup

- **Structure**: live RouterLink containing an accessible text name and decorative Lucide flask icon within a four-cell signal mark.
- **Variants**: light header and dark footer.
- **States**: default, hover underline/color, focus ring, active press.
- **Accessibility**: text remains visible; icon is hidden from assistive technology.

### Navigation Link

- **Structure**: RouterLink with text label and rule indicator.
- **Variants**: desktop row, drawer index, footer sitemap.
- **States**: default, hover, current route, focus-visible, active.
- **Motion**: opacity and transform only, `--motion-micro`; reduced motion is immediate.

### Mobile Drawer

- **Structure**: backdrop button plus labeled `aside` dialog, close button, destination list, and institutional note.
- **States**: closed, opening/open, Escape/backdrop/close/route dismissal.
- **Accessibility**: trigger owns `aria-expanded` and `aria-controls`; opening focuses Close; Tab cycles inside the modal; Escape closes; closure restores trigger focus; route selection closes then focuses main; body scroll lock restores its previous value on every cleanup path.
- **Motion**: drawer mechanism adapted from beui.dev: backdrop opacity plus side-panel transform. Reduced motion removes spatial translation and uses an immediate state change.

### Section Heading

- **Structure**: optional label, heading, optional lead copy.
- **Variants**: route heading and section heading.
- **States**: static only.
- **Accessibility**: caller selects semantic heading level; no skipped hierarchy.

### Surface / Content Grid

- **Structure**: semantic article or section content separated by rules rather than floating cards.
- **Variants**: bordered paper, rule-only, dark inverted.
- **States**: static by default; interactive surfaces expose hover/focus through their contained link only.
- **Layout**: auto-fit grid collapses to one column at compact widths with no horizontal scroll.

### Filter Group

- **Structure**: labeled fieldset or nav-like control cluster prepared for Todo 6.
- **Variants**: inline desktop and wrapping mobile.
- **States**: default, hover, selected/current, focus-visible, disabled, empty-result status.
- **Accessibility**: controls remain native buttons/inputs; result count is announced in a polite live region.

### People Card

- **Structure**: portrait or initial fallback plus identity copy and optional advisor details. The portrait and displayed name are the identity links; there are no separate icon-only email or website controls.
- **Portrait**: every displayed non-advisor/current-member source image that is not square is committed as a centered, opaque-white square canvas whose sides equal the original image's longest edge; preserve the source format and orientation, and perform no crop or resample. The circular frame retains full-image `object-fit: contain` so the complete square source remains visible, and uses the lighter `--border-hairline`. Wen-Hsiao Peng's source remains unmodified and receives the rectangular 4:5 advisor treatment with contained full-image presentation and the same lighter tokenized border. All frames remain flat and printerly with no shadow, gradient, glow, or glass treatment.
- **Variants**: compact cohort card and wider advisor profile. The advisor variant is larger and deliberately more prominent at desktop widths, and stacks its portrait above readable centered details on narrow screens; advisor details remain outside the identity link target. In the advisor identity, the Chinese name uses `--text-h2`; `Prof. Wen-Hsiao Peng` uses `--text-h3`, `--color-ink`, and a stronger weight.
- **Identity destination and states**: use the member website when present; otherwise use `mailto:` when an email exists; when neither exists, the portrait and displayed name remain non-interactive. When a destination exists, both identity links expose that same destination. A non-advisor website-backed displayed-name link has a default underline using `var(--color-rule)`; an email-only displayed-name link and every advisor displayed-name link have no underline at rest. On hover and keyboard focus, every linked displayed name, including the advisor identity names, uses an underline in `var(--color-ink)` while retaining the shared focus outline; portrait links retain the shared default, hover, active, and focus-visible treatment.
- **Collection layout**: Master's members form one continuous, non-scrolling responsive grid ordered by ascending `enrollmentYear`. Later-year members fill any incomplete row left by earlier-year members; enrollment-year boundaries never reset rows. The grid uses `var(--space-2)` for both row and column gaps, with 2 columns below `48rem`, 4 columns from `48rem` to below `64rem`, and exactly 6 columns at `64rem` and above. Every non-Master's cohort group retains a contained inline scroller with fixed-width cards, a partial-next-card cue on compact screens, proximity snap points, and no document-width expansion.
- **Accessibility**: portrait and name links expose the same member-specific accessible destination without wrapping advisor details in the link target. Website links retain a new browsing context and `noreferrer`; email fallbacks use `mailto:`. Portraits keep meaningful member alt text while initial fallbacks remain decorative. Every linked name keeps the shared visible focus outline in addition to its `var(--color-ink)` focus underline, and all linked identity targets retain minimum target sizing.

### Primitive Showcase Harness

- The five placeholder routes are the temporary state harness for Todo 4: they exercise route headings, reading measure, shell states, active navigation, footer, and compact/desktop layouts without implementing Todos 5-6 content.
- Drawer open/closed, link current/default/focus, brand light/dark, and route-heading behavior are verified directly in browser QA at mobile and desktop sizes.

## 6. Motion & Interaction

| Token | Duration | Easing | Usage |
|---|---:|---|---|
| `--motion-micro` | `120ms` | `ease-out` | Link color, icon feedback |
| `--motion-standard` | `220ms` | `cubic-bezier(0.22, 1, 0.36, 1)` | Drawer panel and backdrop |

- Motion communicates state only. There are no ambient, entrance, scroll, or decorative animations in the shared shell.
- Spatial motion uses only `transform`; fades use only `opacity`. Color changes use `--motion-micro`.
- Interactive transitions must remain interruptible; route change and close always win immediately.
- Under `prefers-reduced-motion: reduce`, smooth scrolling and non-essential transitions are disabled, and drawer spatial movement is removed.

## 7. Depth & Surface

The strategy is **printerly mixed rules and tonal shift**. Paper sits on canvas; content groups are separated by `--border-hairline` or `--border-strong`, not shadows. The footer and mobile drawer invert to forest deep. There are no box shadows, gradients, glass effects, or rounded content cards.

| Token | Value | Usage |
|---|---|---|
| `--border-hairline` | `1px solid var(--color-rule)` | Section and column division |
| `--border-strong` | `2px solid var(--color-ink)` | Controls and major editorial rules |
| `--border-accent` | `3px solid var(--color-copper)` | Drawer/footer registration edge |
| `--border-moss` | `1px solid var(--color-moss)` | Dividers on inverted surfaces |
| `--radius-control` | `0.25rem` | Small icon controls only |

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- Target WCAG 2.2 AA. Keyboard interaction must expose the same destinations and controls as pointer interaction.
- Focus uses a visible 3px `--color-focus` outline with separation from the target; focus is never indicated by color alone.
- Touch targets are at least 44 by 44 CSS pixels. Navigation labels remain text, not icon-only destinations.
- People-card identity destinations are exposed through both the portrait and displayed name: website when present, otherwise `mailto:` when email exists, and no link when neither exists. Both links identify the member and resolve to the same destination; advisor details remain outside either link target, and no separate icon-only action is presented. Non-advisor website-backed displayed-name links carry the default `var(--color-rule)` underline; email-only names and advisor identity names have no underline at rest. Every linked name, including the advisor identity names, changes to a `var(--color-ink)` underline on hover and keyboard focus while retaining the shared visible focus outline.
- Drawer modal focus is contained while open; Escape, backdrop, close button, and route activation all have deterministic closure behavior.
- Skip link is first in DOM order and moves keyboard focus to the main landmark.
- Zoom to 200%, viewport width 320px+, long labels, and reduced motion must not cause horizontal document overflow, clipping, inaccessible content, or animation-dependent operation.
- Only non-Master's cohort rows contain local horizontal overflow, overscroll, and snap behavior; their About-page ancestors must shrink to the available inline size rather than widening the document. The Master's grid wraps within the available inline size and must never widen the document.
- Cognitive accessibility: five fixed labels, stable ordering, no hidden submenus, no auto-advancing content, and plain-English state labels.
- Screen-reader accessibility: landmarks are uniquely labeled, current route uses `aria-current`, decorative icons are hidden, dialog name and expanded state are explicit.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|---|---|---|---|
| Placeholder route bodies | `src/views/PlaceholderView.vue` | Todo 4 must not pre-empt final page content | Todos 5-6 replace bodies while preserving shell primitives |
| System font metric variance | Global typography | No CDN or new font dependency is permitted | Keep tested fallbacks; revisit only with a MAPL-owned local font asset |
| Automated end-to-end suite | Browser interactions | Todo 7 owns permanent browser automation; Todo 4 performs and records hands-on Playwright QA | Todo 7 codifies the journeys |
