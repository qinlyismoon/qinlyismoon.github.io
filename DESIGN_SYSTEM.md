# Website design system

> The durable design language lives in `DESIGN_LANGUAGE.md` (v1.0) —
> philosophy, tokens, layout, components, writing, motion, illustration,
> and component evolution. This file is the working spec that implements
> it; when the two disagree, the Language wins for new work.

This is the shared visual foundation for Home, Desk, Timeline, and future
project pages. Page layouts may differ, but they should use the same tokens and
primitives.

## Typography

Three faces, each with one role:

- Sans: `--font-sans` (`Zalando Sans`) — UI chrome, headings, labels, metadata.
  Used for `--type-display`, `--type-h1`, `--type-h2`, `--type-caption`,
  navigation, sidebar, buttons, and Desk object labels/tooltips. The one
deliberate exception is the Log page title and its closing heading:
serif, so the document never borrows the identity's voice.
- Serif: `--font-serif` (`STIX Two Text`) — reading. The `body` base font;
  used for long-form copy, quotes, and editorial text.
- Mono: `--font-mono` (`JetBrains Mono`) — code, data, and technical labels.
- Handwritten: `Caveat` — reserved for the logo only, never for UI or body.
- Display: `--type-display`, used once for a page-level introduction.
- H1: `--type-h1`, used for page titles — except the Log page title,
  which is serif at `clamp(1.75rem, 3vw, 2.5rem)` (see the Log journey
  section).
- H2: `--type-h2`, used for section titles.
- Card titles (e.g. vibe grid cards): sans/medium at `1.125rem` — one step
  below section titles so cards never compete with section headings.
- Body: `--type-body`, used for reading text and controls.
- Editorial reading: `--type-reading` (`clamp(1.125rem, 1.55vw, 1.35rem)`),
  shared by the Home introduction and About narrative. Page identity must
  not create a second body-copy scale.
- Caption: `--type-caption`, used for metadata and secondary labels.
- Weights: regular (`400`) and medium (`600`) only.
- Short editorial statements (1-3 lines, e.g. home intro bio/statement)
  use `text-wrap: balance` so line breaks stay even and no single word is
  left orphaned on its own line. Long-form paragraphs do not use it.
- Document pages (Log, Case Studies) never scroll horizontally.
  Decorative bleed (e.g. the journey visuals strip, collage fireworks and
  rotated cards) uses `overflow-x: clip`, never `auto` — no swipeable blank
  areas. `.version-history-layout` is the single scroll surface
  (`overflow-x: clip`, `overflow-y: auto`); its outer
  `.app-content-layer--history` stays `overflow: visible` so there is never
  a nested scroll container. (Desk is the exception: its camera viewport
  pans horizontally by design.)

## Spacing and layout

All spacing uses the 8pt tokens `--space-1` through `--space-12`.

- Page width: `--page-max-width` (`1200px`).
- Reading width: `--content-max-width` (`760px`).
- Page margins: `--page-gutter`, responsive from `24px` to `64px`.
- Section spacing: `--section-space`, responsive from `64px` to `112px`.
- Grid: 12 columns with `--grid-gap` (`24px`).

## Color

Use only these semantic tokens in interface and editorial components:

- `--color-background`
- `--color-surface`
- `--color-text`
- `--color-text-strong` (strongest text voice, reserved for the case-study
  detail title; `#000000` in light mode, `#ffffff` in dark — never hardcode
  a raw black/white for text, always go through the token)
- `--color-text-secondary`
- `--color-divider`
- `--color-accent`

Dark mode redefines the same six roles. Photographs and the Desk illustration
are content, so their intrinsic colors are not treated as interface colors.

**Theme fade.** Toggling dark/light mode eases every painted surface
together — one calm breath, never a boundary between animating
and snapping layers. `toggleTheme` (AppSettingsContext) adds a
transient `.theme-fading` class to `<html>` (removed after 400ms;
skipped under `prefers-reduced-motion`); while it is present,
`background-color` / `border-color` / `color` / `fill` / `stroke` /
`stop-color` / `stop-opacity` ease site-wide — gradient stops
included, so the Desk window sky and lamp beams never snap ahead of
the surfaces around them. Text color eases on the same clock: an
earlier iteration snapped text to its final color (glyph
re-rasterization was suspected of shimmering), but the snap made
every text-bearing region — the sidebar, the nav band, the Log
principle pills — change ahead of its ground and read as a leading
rectangle; the boundary was the text, not the surfaces. A brief
mid-fade softening of contrast is the accepted cost of one clock.
Transform and opacity are excluded so hover nudges and motion
keep their own timing. Duration is a variable
(`--theme-fade-duration`, default 350ms), and the contract is one
clock: the Desk scene background (`.desk-layout`) and the room-dim
overlay (EffectLayer, Framer Motion on the same cubic-bezier) run
the same 0.35s ease as the chrome — a layer on its own clock or
easing reads as a lagging rectangle with a visible boundary
mid-switch. The room-dim rect (`.desk-scene__room-dim`) is excluded
from the CSS hammer entirely: Framer Motion drives its opacity per
frame and a CSS transition on top judders. Gradient backgrounds
cannot interpolate, so a theme-dependent gradient surface crossfades
instead: light and dark stacks ride `::before` / `::after` opacity on
the same 0.35s ease over a solid `--color-background` ground (the
collage board pattern), with `site-chrome.css` preserving the opacity
transition while `.theme-fading` is on. Elements whose theme change
is an `opacity` / `filter` shift rather than a paint color — the
board's mountain, fireworks, snowboard and paper props dimming in
dark mode — declare the same 0.35s ease on those properties, likewise
preserved under `.theme-fading`, so nothing inside a crossfading
surface snaps while it fades.

**Dark-mode ground.** In dark mode the Desk scene shares the page
background (`--scene-background` = page bg, set by SiteShell) and the
room dim is neutral — sidebar, nav band and scene read as one ground.
The palette's warm `bgNight` is never used as a page ground, otherwise
a warm/neutral seam appears against the sidebar.

## Components

Shared React components live in `src/components/shared/DesignSystem.jsx`:

- `Section`
- `Divider`
- `Button`
- `Link`
- `Card`
- `Tag`
- `ProjectPreview`
- `Status`

Components accept `className` for composition, but color, type, spacing, border,
and focus behavior should continue to come from the shared tokens.

`Status` is value-driven: location, weather, availability, and an
optional role can change without changing its layout. Local time updates from
the shared local-time utility (`src/lib/useLocalTime.js`), which follows the
viewer's local timezone — no fixed timezone.

## Global page layout

`PageSkeleton` in `GlobalPageLayout.jsx` defines the website-wide page skeleton: the persistent top
navigation remains outside the frame, while every route supplies contextual
metadata to a left Context Column and its own content to the main region.

The Context Column uses one shared width, left margin, type treatment, and
vertical rhythm on every desktop route. It is the first column of the page grid,
not a card: it has no independent background, border, radius, or shadow.
`PageSkeleton` owns the outer top, left, bottom, and column spacing so individual
routes cannot shift the grid.

`PageContent` is the shared flexible second column. It resets route-level outer
margin and padding and establishes the common content baseline. Home and Version
History begin on that baseline; Desk uses the same region as the boundary for
its independent workspace canvas.

The site background is the neutral documentation layer. Desk applies its warm
environment only to `global-page-layout__main--desk`; the Context Column remains
on the same neutral layer and at the same coordinates as every other chapter.

Desk environment values are derived in `useDeskEnvironment`. Time-based night
darkens only the window sky (WindowLayer owns its night colors: dark gradient,
moon, stars); the room, objects, and scene background never change with time.
The full dark scene applies only when the user toggles dark mode. Lamp
interaction updates both the rendered light and Context Column status —
the status value swaps through a stable `<LiveValue>` span
(`.context-metadata__value`) that fades out, swaps text at the
midpoint, and fades back in (~240ms), so live state arrives as one calm
motion instead of blinking. (Keying the span on its text removed the
old value in the same frame the new one started at opacity 0, which
read as a flicker.) A quiet fade-and-rise still plays on first mount.
All time surfaces (sidebar Current time, ClockObject hands, clock tooltip)
read the same local-time source so they never diverge.

Page metadata lives in `src/lib/pageContext.js`. Home, Desk, Log, and
Case Studies can change their values independently without changing the
column structure. The Context Column is informational,
not navigational, and owns the shared contact links.

The home page closes with a single versioned copyright line (`.home-copyright`,
`© 2026 Phoebe Qin · v2.1.0`) after the work index. It is set in the sidebar
label voice (12px/500/secondary) and aligned to the documentation content
width — a quiet colophon, never a footer bar. It is language-neutral, so
it lives directly in `HomeIntro.jsx` rather than the localization copy.
The copyright stays in document flow with one `--space-4` gap after the final
project section, preventing a false empty footer region. Home is a scrolling
portfolio index on every viewport.

On desktop, the Home sidebar keeps `Current location` first and `Open to
opportunities` directly below it. Project hover appends `Project role` and
`Timeline` after both persistent items; it never inserts project information
between them or replaces them. On mobile the sidebar is absent, so cards do
not depend on hover metadata for comprehension.

Between the Home introduction and `Selected Work`, one continuous editorial
thread replaces the conventional horizontal divider. It begins at the main
content column — never inside or across the sidebar — and continues through
the content canvas as a restrained organic curve (`1.15px`, muted accent
green). A quiet but legible Caveat annotation (`1rem` desktop) sits near the
80% point above the stroke. The thread is narrative continuity, not
decoration: no icons, illustrations, repeated lines, or UI container treatment
may be added. Its Bézier path breathes between two nearly identical curves on
a slow `16s` ease-in-out loop; vertical change stays within a few pixels so it
feels alive without reading as a wave. Reduced-motion mode keeps the authored
curve static. On mobile, the same line contracts to the content bounds.
Because inactive route layers remain mounted, the thread is explicitly hidden
whenever `body[data-page]` is not `home`; it must never bleed into About or
Desk.

Desk archive windows inherit the active theme context. In particular, the
Design Journey timeline must apply the same dark-mode text, rail, node, and
reflection tokens used by its original About implementation; light-theme ink
values must never appear inside a dark archive window.

Desk keeps the authored scene at its natural 1.5× scale on mobile. Its
viewport is a horizontally pannable camera, not a fit-to-width thumbnail.
The inspiration board and design timeline are wall-mounted scene objects;
both open document windows using the Vibe Coding detail-modal grammar.
The overlay is the only vertical scroll surface; the white modal window
never draws an inner scrollbar. New Desk objects must occupy non-overlapping
visual and hit-area regions at the authored scene scale.

Desk object affordance contract: every clickable scene object must expose a
plain-language hover/focus label naming the object and the resulting action.
The label reuses `.desk-scene__label` — the same sans caption size, regular
weight, muted color and fade used by Portfolio and MFA Thesis — rather than
introducing an HTML tooltip style. Archive entries name the object only; they
do not add instructional copy.
When an existing decorative prop can carry the meaning, upgrade that prop
instead of adding a competing object. In v2.1.0 the wire-grid note is the
Timeline entry; it is not duplicated elsewhere in the room.

The Home copyright is a content-column colophon, not part of the sidebar
control dock. It aligns horizontally with the work column and follows the
last card at the parent layout's standard `--space-4` gap; it does not force
an unrelated baseline alignment with the sidebar controls.

### Site chrome: Document Controls (Layout Blueprint v2.0, 2026-10-01)

Navigation and system status are one layer — **Document Controls** — in one
visual language: controls embedded in the document, never floating
above it. No pills, no heavy backgrounds, no blurred capsules, no
iOS-style segmented controls. The visual hierarchy is always: content
first, then the sidebar, then Document Controls. Chrome orients; it
never competes with the work.

- **Editorial tabs** (`TopNavigation.jsx`, `.site-nav` / `.site-nav__item`).
The four sections — Home, Case Studies, Desk, Log — are text tabs on a
hairline baseline, per the blueprint's Navigation States: no pills, no
radius, no fill. Each tab keeps a fixed slot across languages: it stacks
its visible label over a hidden ghost twin of the other language's
label in the same grid cell (`.site-nav__label` /
`.site-nav__label--ghost`, the ghost `aria-hidden`), so the tab always
sizes to the widest EN/ZH label and switching languages never moves
the tabs or the baseline's right edge; even `16px` side padding keeps
the rhythm steady. Tabs are 50px (`46px` on mobile) with `0.875rem` / 500 sans
(`0.8125rem` on mobile). Inactive tabs are bare secondary text;
hover warms them with a pale green wash (`color-mix` 12% accent).
The active tab is primary text with a **2px accent underline** laid
exactly over the baseline (`::after`, `bottom: -1px`) — the hairline
thickens and turns green beneath the current chapter.
`aria-current="page"` marks it; the 2px `var(--color-accent)`
keyboard-focus ring is unchanged.
- **Nav header band (system-wide).** The fixed tab row is its own header
section on every page: a solid `var(--color-background)` band from the
viewport top through the tab baseline plus `var(--space-2)` of breathing
room (`.viewport-top-nav` in `site-chrome.css`). Scrolling content slides
cleanly underneath instead of showing through the tabs; at rest the band
is the same ground as the page, so it reads as no band at all. Its bottom
edge lands where the sidebar panel begins. On Desk it additionally stays
below the floating close button (`body[data-page="desk"]` keeps
`z-index` 190 vs 200). The home page's folded paper corner floats above
the band (`.paper-stage-decoration`, `z-index` 220 vs 210) so the corner
stays visible where the band runs under it. The Desk state holds through
the fold-back close: `data-page` (and the sidebar metadata) becomes the
return page only when the peel lands, never at the close click, so the
band keeps its ground for as long as the scene is still on screen behind it.
- **Anchoring.** The tab row sits above the main content on every
page, its left edge aligned to the content column
(`--viewport-page-padding + --context-column-width +
--page-layout-gap`; `--space-3` on mobile where the grid collapses to
a single column) — the same anchor on document pages and on the
full-bleed Desk scene. Chrome placement is a system rule, never a
per-page exception.
- **System status** (`SystemStatus.jsx`, `.system-status` /
`.system-status__item`) — language, theme and sound as three quiet text
states in one row near the sidebar's bottom edge
(`.context-column__region--system-status`, auto height, floating above the
panel bottom with `var(--space-3)` of breathing room — a dock, not a
footer). Each item reports the current state (`EN` / `Light` / `Sound`)
and clicking toggles it: typography carries the interface, no icons, no
dividers, no background. Items are `0.75rem` / 500 / secondary text (the
calmest voice in the panel), set in one flex row with `var(--space-3)`
gaps. Hover follows the link rule — accent color plus a `3px` rightward
nudge (`160ms ease`); each button keeps its accessible label (the action,
e.g. "Switch to Chinese") plus a native tooltip. Rendered inside
`ContextColumn`, so every page — including the full-bleed Desk scene —
inherits it; the page's bottom edge stays clean and content flows
downward with no boundary.
- **Radius discipline.** The chrome uses only the site radius family:
`0` everywhere in the chrome — the underline active state needs no
radius at all. No other radii.
- **Tab continuity.** The active underline is one persistent indicator,
  not a separate line painted by each tab. It measures the active tab and
  glides between positions and widths over `360ms` with
  `cubic-bezier(0.22, 1, 0.36, 1)`; reduced motion changes it instantly.
- Both use theme-aware tokens (`--color-text`,
`--color-text-secondary`, `--color-divider`, `--color-background`,
`--color-accent`) so light and dark mode come for free.
- Rules live in `src/site-chrome.css`, imported in `App.jsx` after
`styles.css` (and after `journey-version-tags.css`) so they win the
cascade. The legacy `.top-navigation*` capsule selectors in `styles.css`
are dead — they no longer match any rendered element — and are pending
removal on a styles.css cleanup pass, together with the now-unused
`nav*` / `control*` color tokens in `src/lib/theme.js`.

### Context Column is a fixed information panel

The Context Column is a stable information panel, not flowing content. It
fills the viewport below the top nav
(`min-height: calc(100vh - var(--context-column-top))`) and is organized
top to bottom:

- Identity (handwritten logo at `56px`, name, roles on one line, and contact links as one visual unit) — `232px`, fixed from the panel top, with generous internal whitespace (`32px` above the logo, `24px` logo→name, `16px` name→roles) so the logo reads as a signature
- Page metadata — `336px` (fixed on every page; content stays top-aligned)
- Flexible spacer — absorbs viewport height, never less than `48px`; empty, never styled, never filled with extra information
- System status (language / theme / sound as quiet text states) — auto height, floating above the panel bottom with `24px` of breathing room

Identity and metadata keep fixed heights; only the spacer flexes, so
divider positions are identical across pages at the same viewport size.
- Shared width — `280px` (`--context-column-width`, 35×8, on the 8pt grid). Both page grids pair the
  column with `minmax(0, 1fr)`, so the content column shifts right
  automatically — one token, all pages inherit. On mobile the fixed
  width resets to `auto` so the column never overflows small screens.
- Top anchors: the persistent panel anchors directly to the safe area below
  the top nav (`--context-column-top: var(--viewport-safe-top)`), while
  document content keeps one extra spacing token of breathing room
  (`--page-shell-top`). Panel and content have distinct, named top anchors
  instead of sharing one; never nudge the panel with ad-hoc padding.

There is no divider between the logo and the name: logo, name, roles, and
contact links read as a single identity block. Dividers sit at fixed
positions below it; only the
content inside each region changes between Home, Desk, Case Studies, and
Log. Availability renders as a single line inside the metadata
region so it can never push the dividers out of place. New fields must live
inside the metadata region and must fit the fixed height — never move the
dividers. If interests need to return later, prefer tags
or chips over small body text.

The two roles are parallel professional identities joined by an ampersand
("Design Engineer & Product Designer", one line): they share one type
treatment (`--type-caption`, `--color-text-secondary`) and must never be
set at different sizes.

Contact links live inside the identity block as one quiet text line — words
separated by middle dots (`Email · GitHub ↗ · LinkedIn ↗`), no label.
They follow the design-system Links rule: the `.ds-link` underline voice
(faded accent underline; hover deepens it), and the external-link arrow
`↗` on destinations that open a new page — never a plain `→` for an
external destination. `mailto:` opens no page, so Email carries no arrow.
Hover follows the design-system link hover: accent color plus a rightward
nudge (see below). The Lucide contact icon system (`LuGithub`,
`LuLinkedin`, `LuMail`) was retired 2026-10-01: text links fit the
editorial typography language and lighten the panel.

Link hover is a design-system rule, unified 2026-10-01: hover/focus turns
the link accent green **and** nudges it right — block rows (homepage
explore items) shift with `padding-left: var(--space-1)`; inline links
(homepage contact links, sidebar contact links, metadata directory links,
`View all work`)
nudge with `translateX(3px)`; the whole card (frame included) nudges
with `translateX(3px)` on card hover/focus. `160ms ease`. One perceived
effect, the technique fits the context. On cards the whole card moves —
the card is the interactive unit, like an explore row — and a transform
never disturbs the grid: siblings stay put, only the hovered card paints
3px to the right.

### Sidebar information architecture and type system

The sidebar is a persistent status panel. It answers who I am, where I am,
and what I'm currently doing; the right side owns page content and
storytelling. Labels describe status, never metadata — the panel reports
the current state of the person and the workspace, not file attributes.
Labels use one controlled vocabulary only:

- `Current ...` / `Last ...` / `Project ...` / `Open ...`

Never mix in other systems (`Based in`, `Version`, `Focus`, `Info`, `Library`,
`Links`). Page metadata lives in `src/lib/pageContext.js`:

- Home: `Current location` / `Columbus, Ohio`; `Open to opportunities`
- Case Studies: `Project role` / `Design Engineer`; `Timeline` / `Selected Work`
- Desk: `Current time` (live) / `Current weather` (live) / `Current status`
  (live lamp state) — everything here reflects the current workspace state
- Log: `Current chapter` / `Designing in the Age of AI`; `Last updated` /
  `September 2026` — the Log is an ongoing record of thinking, so the
  sidebar reports status (the current chapter of the journey), never
  version metadata

One type system applies to every page:

- Labels: `12px`, weight `500`, `--color-text-secondary`
- Values: `17px`, weight `600`, `--color-text`
- Label -> value gap: `7px`; item gap: `var(--space-2)` — identical on all pages
- Dividers stay aligned because region heights never change

Layout, spacing, section heights, typography, and alignment are identical
across Home, Case Studies, Desk, and Log. Only the content
changes, so the left panel always reads as the stable information area.

### Folded paper corner is a page-level decoration

The folded paper corner belongs to the Home page canvas, not to the reading
content. In `PaperPeelStage` it renders in `.paper-stage-decoration`, a
decoration layer portaled to `document.body` via `ViewportPortal` — a sibling
of the sidebar and reading content, never inside the reading container. The
layer is `position: fixed; inset: 0` with the corner at `top: 0; right: 0`, so
it is anchored to the top-right corner of the viewport on every screen size
and no ancestor positioning can shift it. It must never overlap the main
text. The peel animation measures the corner's position relative to the mask
(`--home-fold-top`) so the clip-path notch always aligns with the corner;
moving the corner requires keeping that measurement in sync.

### Desk is a layered scene, not a single illustration

The Desk page composes a scene from independent layers in paint order:

Temperature is always Celsius. The desk weather label has one source of
truth: `useDeskEnvironment().weather.label` — SiteShell overrides the
pageContext static weather value with it at runtime, so edit the hook
(`src/hooks/useDeskEnvironment.js`), never the static value.

```
Desk Page
├── Sidebar (fixed)
├── Navigation (fixed)
└── Right Scene
    ├── Scene Background (page background, no illustration backdrop)
    ├── Wall Layer (non-interactive)
    ├── Window Layer (independent; supports rain/snow/sunrise/sunset)
    ├── Shelf Layer (shelf + plant + clock only)
    ├── Desk Layer (desktop + drawers + legs only)
    ├── Object Layer (independent interactive components)
    ├── Effect Layer (glow, shadow, reflection, ambient light only)
    └── Interaction Layer (invisible; hover/click/drag/keyboard/hit areas)
```

- The page owns the background; the illustration holds no large backdrop rect.
- Visible interactive objects are independent components, never one giant SVG.
- The Effect Layer contains only light and atmosphere, never physical objects.
- The Interaction Layer is visually invisible and owns all hit areas.
- Night darkens only the window sky (WindowLayer owns night colors: dark
  gradient, moon, stars); the room, objects, and background never change with
  time. The full dark scene applies only on user dark-mode toggle.
- Home and Desk share the PaperPeelStage container: both use the
  `shared-layout--desk` layout so switching views never shifts the layout.
  The sidebar keeps its spacing via margins; the home reading content gets
  its padding back inside the peel mask.
- System spacing rule (no page-by-page tweaks): `.shared-layout__grid` never
  owns padding. The sidebar owns its spacing via margin; each content layer
  (`.app-content-layer--history`, `.app-content-layer--library`,
  `.home-layout`) owns its internal padding; Desk is full-bleed. The first
  grid column is `calc(var(--context-column-width) +
  var(--viewport-page-padding))` so the sidebar's left margin never
  overflows and the fixed `var(--page-layout-gap)` between sidebar and
  content is always preserved. Switching `page` therefore never changes the
  grid geometry, so peel transitions from any page never shift content.
- Wall elements never occlude each other: the wire grid (WallLayer) and the
  window (WindowLayer) sit side by side with a clear gap. Speaker and camera
  hang on the grid, clear of the window.
- Fold / close navigation (system-level rule, not per-page): the paper fold
  (enter Desk) is visible on every page except Desk — Home, Case Studies,
  Log — and clicking it ALWAYS plays the same peel-open expand
  effect, no matter which page it was clicked from. The peel over-layer
  renders the source page's content (via `renderPeelOverLayer` in SiteShell),
  so entering from Case Studies / Log peels that page directly —
  Home never flashes in between. The close button appears only on Desk and
  returns to the page the user came from (`deskReturnRef` in SiteShell).
  Returning to Home plays the peel-close; returning to Case Studies /
  Log crossfades directly. When the peel-open completes, the paper
  over-layer holding the source page fades out over 0.28s
  (`.paper-layer--over-fading` in PaperPeelStage) instead of unmounting
  the instant the animation ends. The top-nav Home button always goes
  to Home, never to the fold source.

### Desk responsive: camera, not shrink

The workspace behaves like a camera looking into a room. The scene keeps
its authored viewBox and renders at a base scale (`DESK_SCENE_SCALE` in
`src/lib/deskLayout.js`, currently `1.5`); narrow viewports pan
horizontally across it instead of shrinking it. Object sizes are tuned in
this one constant — never per object.

- `.desk-scene__viewport` is the camera: `overflow: auto` with safe centering.
- Mouse users drag to pan (drag-to-scroll in `DeskLayout`, 4px movement
  threshold; the release click after a real drag is suppressed so panning
  across the lamp can't toggle it by accident); touch and pen keep their
  native scrolling. Grab/grabbing cursor on the viewport.
- `.desk-scene__stage` uses `margin: auto` so it centers when the viewport is
  larger and stays scrollable when it overflows.
- `DeskLayout` centers the viewport on mount and resize; it never scales the
  artwork below the base scale.

### Desk hover labels and tooltips share one face

SVG object labels (`.desk-scene__label`) and HTML portal tooltips
(`.workspace-tooltip__line`) use the same type: `var(--font-sans)`,
`--type-caption`, weight regular, `0.01em` letter-spacing. Tooltips portal
to `document.body` and position from `getBoundingClientRect`, so they track the
scene while the viewport scrolls.

### Case Studies page

The Case Studies page is a document page (no horizontal scroll) with two
sections, in this order:

1. **Selected Work** — a short note, a responsive card grid (`.vibe-grid`)
   of Notion-hosted case studies, and the "View all work ↗" exit link.
   Selected-work cards reuse the vibe card visual system (`.ds-card`
   treatment, quiet accent-border hover, 1.125rem/medium titles, serif
   descriptions, rectangular chip tags) but are external-link cards: the
   whole card is an anchor opening the Notion page in a new tab, so the
   title carries a quiet secondary ↗. The thumbnail is optional: when
   artwork is provided it renders in the 16:10 block with the same image
   error fallback as vibe cards; when missing, no thumbnail block renders
   at all — never an empty placeholder. No modal: with no live
   URL and all content in Notion, a modal would be a hollow middleman.
   Hovering/focusing a card swaps the sidebar metadata to its role and
   timeline (missing values are skipped, never blank rows). Button cards
   and link cards share one card-surface base
   (`.vibe-card__button, .vibe-card__link`) — never two copies of the
   hover/focus treatment.
2. **Vibe Coding** — a responsive card grid (`.vibe-grid`) of interactive
   projects. Each card (`.vibe-card`) shows a 16:10 thumbnail, title
   (sans), one-line description (serif, secondary), and quiet category
   tags.
   Thumbnails are animated GIFs, not static images — motion is the only
   way to convey what an interactive piece feels like. Clicking a card opens a native detail modal (`.vibe-detail`), never a
   direct external jump: the modal keeps portfolio context (background,
   the driving question, visual language, interaction, process) and offers
   a primary "Visit live site" action plus a secondary "Project notes"
   link. The modal closes on overlay click or Escape.

Type roles follow the three-face system: card/detail titles in sans
(1.125rem/medium — one step below the --type-h2 section titles, so grid
cards never compete with section headings), descriptions in serif, tags
in the sidebar label voice (sans 12px/500/secondary). Tags are quiet
rectangular chips: a `--color-background` block with 4px radius (half the
card radius) and token-derived padding — rectangular, never pills, and
never the mono/data voice. Detail body copy
(section `dd`) renders in secondary text for readability; the detail
title is the single strongest text voice in the view and uses
`--color-text-strong`. Both detail actions open external pages, so both
carry the external-link arrow: "Visit live site ↗" (primary) and
"Project notes ↗" (secondary) — never the plain → for an external link. Cards follow the shared `.ds-card` treatment: `8px` radius,
divider border, surface background — and the hover stays quiet:
border-color shifts to the green accent (`--color-accent`) only, never
lift (`translateY`) or drop shadow. Thumbnail fallbacks use
surface/secondary tokens, never raw hex colors. Card buttons carry the
system `:focus-visible` treatment (2px accent outline, 3px offset).

In its default state the sidebar's Page Metadata region is a small
directory of the page's sections, headed `Project Collection`: two links
(`Selected Work`, `Vibe Coding`) in the value type treatment (17px / 600),
stacked with the standard item gap. Hover is quiet — accent color only, no
underline, matching the card hover language. Clicking a link smooth-scrolls
its section into view (`scrollIntoView`, honoring `prefers-reduced-motion`);
sections carry `scroll-margin-top: var(--viewport-safe-top)` so titles clear
the fixed top nav. Hovering (or keyboard-focusing) a vibe card temporarily
replaces the directory with that project's role and timeline (values come
from the project's `role`/`roleZh`/`timeline` fields; labels stay on the
controlled pageContext vocabulary). The swap remounts with a vertical slide
(`metadata-slide-from-below`), distinct from the horizontal tab-navigation
slide, and clears on mouse leave, modal open, or page change. State travels
through `SidebarOverrideContext`, owned by SiteShell.

The Log page does not use the directory pattern: its sidebar reports status
(`Current chapter` / `Designing in the Age of AI`, `Last updated` /
`September 2026`) — the Log is an ongoing record of thinking, not a document
to navigate. Jump targets on document pages carry the same
`scroll-margin-top`. The metadata region's fixed height (`336px`) is
shared by every page, so dividers never move. The page carries no H1 — the tab
label already says "Case Studies", so a page title would repeat it. The
"View all work" exit link sits on the Selected Work section header row,
right-aligned against the section title (caption, secondary, underline on
border); there is exactly one link to the Notion collection, and the
archive exit never gets its own section.

### Log collage notes

The sticky notes on the hero collage are mini cards, not paper slips:
the `.ds-card` container (8px radius, divider border, surface background)
in the card type voice (sans/medium). The collage character comes from
rotation (`--about-rotate`), pin/tape attachments, overlap, and a soft
drop shadow — never from a handwriting face. Notes carry restrained
tints (2026-10-01): five quiet surface washes (`--tint-warm`, `--tint-sage`,
`--tint-mist`, `--tint-clay`, `--tint-straw`, each with explicit light and
dark values set through `--sticky-bg`); text stays on the primary voice
and the border keeps the divider token, so the collage keeps its calm
structure. The quiet footnote card stays untinted — one neutral card
keeps the palette restrained. Only the shadow deepens in dark mode. The
size/emphasis modifiers
(`--secondary` / `--supporting` / `--emphasis` / `--quiet`) set card
scale and z-index only — every note shares one type voice (sans/medium,
one size, primary text); hierarchy is spatial, never typographic.

Notes are draggable inside the board (`useDraggableNotes` in
`AboutHeroCollage.jsx`): dragging writes a per-note pixel offset into
`--about-x` / `--about-y` (the designed position and rotation are never
touched), clamped to the board bounds and persisted to localStorage.
Double-click — or Enter/Space on a focused card — resets a note to its
designed spot; arrow keys nudge a focused card (Shift for larger steps).
While dragging the card floats above the collage (`--dragging`: no
transition lag, grabbing cursor, raised z-index).

The three principle pills above the board (Build to learn / Think in
systems / Design for people) are fixed — the flowchart labels never move.
Only the collage board notes are draggable (2026-10-01: pill drag removed
per her direction — `useDraggablePills` deleted from
`DesignPrinciplesLoop.jsx`, along with its localStorage key
`about-principle-positions:v1`; the `boundsRef` prop is gone too).
`.about-principles` sits at z-index 6, above the portrait (z-index 5).
The now-unused `.about-principles__pill-drag*` selectors in styles.css are
dead; remove them in the styles.css cleanup pass.

### Log journey version language

The Log journey speaks in versions, not years. Each stage in
`src/lib/aboutContent.js` carries a `version` field (`v2022.1` …
`v2026.1`, engineer-style `vYYYY.N`); the transition stage carries
none and renders no version UI.

Title hierarchy is one step apart, never collapsed — and the Log page
title does not borrow the identity's voice. The page-level section
title (`.about-section-heading`, e.g. "My design journey") is the serif
reading face at `clamp(1.75rem, 3vw, 2.5rem)` — smaller than
`--type-h1`, and never the sans the sidebar name speaks in. Each stage
title (`.about-stage__title`) keeps the sans structural voice one step
below at `clamp(1.25rem, 2vw, 1.5rem)`, paired with its mono version
kicker. The closing heading (`.about-closing__heading`,
"Thanks for following the journey.") is the page title's bookend:
same serif voice and size, so the page never closes louder than it
opened. Above every stage title sits its version as a quiet
mono kicker (`.about-stage__version`, JetBrains Mono — the data voice);
it lives inside the stage body so it dims together with inactive
stages.

The left timeline rail uses the same version language and the same
type voices — no handwritten face on the rail (Caveat stays reserved
for the logo): each stage is marked by a ghost version tag
(`.about-stage__version-mark`, mono, secondary text), and the floating
readout pairs the mono version (`.about-journey__moving-version`) with
the phase name in the sans voice
(`.about-journey__moving-phase`). The floating label is compact
(quiet surface, no oversized year); the active stage's ghost tag hides
while the label owns that spot. Scroll-linked activation, the
is-arriving pulse, and `prefers-reduced-motion` behavior are unchanged.

These rules live in `src/journey-version-tags.css`, imported in
`App.jsx` after `styles.css` so they win the cascade without touching
the 7k-line stylesheet. The superseded selectors in `styles.css`
(`.about-stage__year-mark`, `.about-journey__moving-year` and their
state/dark variants) no longer match any element and are pending
removal on the next styles.css cleanup pass.

The stage reflection quote (`JourneyReflection.jsx`) is a quiet aside, not
a testimonial widget: no photo avatar, no Caveat handwriting, no off-system
teal — the active stage no longer shifts the quote's color. Every quote
speaks in one voice — stage highlights and the journey's transition prompt
("Where will this journey take me next?") alike: the bare
`.journey-reflection`, the serif reading face (`var(--font-serif)`,
upright — no faux-italic CJK), primary text,
`clamp(1.125rem, 1.5vw, 1.25rem)` (a modest step above body copy), a single
2px accent rule (`var(--color-accent)`, theme-aware), capped at `40rem`. A
margin-note card variant (soft surface wash, no rule) was tried in
right-docked, right-rail and in-flow placements and reverted 2026-10-01 —
the quote belongs to the document's voice, not to a card. The legacy
internals (`.journey-reflection__rule`, `__body`, `__avatar` and their
dark-mode variants) no longer match any element and are pending removal
with the other dead selectors.

Journey reading measure: stage body copy (`.about-stage__copy`,
`.about-stage__intro p`) runs the full stage measure — no character cap
(a `68ch` cap tried with the margin-note variant was reverted with it
2026-10-01). The dim-when-inactive color logic is untouched; the active
reading color rests at 72% ink (an 80% step-up tried the same day was
reverted too).

## Localization

The site is bilingual (English / Chinese), toggled through
`AppSettingsContext`. What translates and what does not is a system rule,
not a per-page decision:

- UI labels, section notes, and sidebar values localize through
  `LABELS`-style dictionaries. A missing Chinese string falls back to
  English — never to a blank.
- Card descriptions localize (`description` / `descriptionZh`). Project
  titles are proper nouns and stay as-is in both languages.
- Tags never translate: they are English category labels in every
  language. Components read `project.tags` directly — there is no
  `tagsZh`, so the rule holds structurally.
- New Chinese copy needs the user's explicit approval. Code, comments,
  and documentation stay in English.
- Language-toggle stability: a localized line of copy can wrap to a
  different number of lines per language (e.g. `.case-studies__section-note`
  is one line in Chinese, two in English; `.home-identity__statement` is one
  line in Chinese, two in English, which used to push the Explore section
  below it up and down). Never let that move the layout:
  reserve the tallest line count with `min-height: <n>lh` so switching
  languages never changes the block's height. Longer text (narrow screens)
  still grows past the minimum — nothing is clipped. The horizontal
  counterpart: navigation tabs change label width per language (e.g.
  `Case Studies` vs `案例研究`), which used to shift every tab and the
  baseline's right edge on toggle. Each tab reserves the widest label
  across languages — a hidden ghost twin of the other language's label
  stacked in the same grid cell (`TopNavigation.jsx`,
  `src/site-chrome.css`) — so toggling never moves the tabs. Never fix
  this by padding copy to equal lengths; that breaks with the next edit.
