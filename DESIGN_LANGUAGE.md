# Phoebe's Desk — Design Language v1.0

*A living notebook for documenting how ideas become systems.*

Version 1.1 — October 2026. Website release: v2.1.1.

The v2.1.1 information architecture treats Home as the portfolio index,
About as the continuous personal narrative, and Desk as the spatial archive.
Home and About share one editorial reading token. Project hover augments the
stable sidebar status instead of replacing it. On small screens the sidebar
is removed, while the Desk remains a natural-scale, horizontally pannable
scene. The Desk's board and timeline open as document windows.

## How to use this document

This document is the design language of Phoebe's Desk. It is written for
anyone who will design or build here — Muse, Cursor, Claude, a future
collaborator, or Phoebe herself in six months.

It is not a prompt. It does not ask an agent to "be creative." It states
the physical laws of this website: the tokens, the regions, the
components, the words, and the reasons they became what they are.

Two rules govern its use:

1. **When the document and the code disagree, the document wins for new
   work.** Fix the code to match, or revise the document deliberately —
   never let them silently diverge.
2. **Change the system, not the page.** A fix that only works on one page
   is not a fix. Behavior belongs in shared tokens, shared components,
   and shared CSS, so every page inherits it.

The main text states the philosophy. The appendices are the enforceable
part — if you only read one thing, read the appendices.

---

## 01. Vision

### What is Phoebe's Desk?

Phoebe's Desk is not a portfolio website.
It is not a landing page.
It is not a dashboard.

Phoebe's Desk is a living design notebook. It documents how ideas emerge,
evolve, and become interactive systems. Rather than presenting polished
outcomes alone, it reveals the thinking, experiments, iterations, and
relationships behind the work. Visitors are not simply browsing
projects — they are stepping into an evolving workspace.

### Core philosophy

The website should feel like:

- opening a notebook
- walking into a workspace
- reading someone's design journal

instead of:

- using software
- browsing a product landing page
- clicking through a marketing website

### Design values

**Build to learn.** Building is thinking. The website reflects an
iterative process rather than finished answers.

**Think in systems.** Every project is presented as a connected system
rather than isolated screens.

**Design for people.** Technology should disappear. Interfaces exist to
support understanding rather than attract attention.

---

## 02. Visual Identity

Only three keywords define the visual language.

**Quiet.** Minimal. Calm. Intentional. Large amounts of whitespace. No
unnecessary decoration. The interface never competes with the content.

**Structured.** Everything follows a grid. Alignment is more important
than decoration. Spacing creates hierarchy. Typography creates rhythm.

**Living.** The notebook changes over time. Current location updates.
Current workspace evolves. Desk changes. Logs continue growing. Nothing
feels frozen.

---

## 03. Visual Metaphor

The entire website follows one metaphor only: **a design notebook**.
Everything belongs to this notebook.

- Home → the cover
- Case Studies → projects collected inside
- Desk → the current workspace
- Log → growing notebook entries

There is never a competing metaphor. Not a dashboard, not a desktop OS,
not SaaS, not Apple Settings. When a new pattern is proposed, the first
question is: does it belong in a notebook?

---

## 04. Layout Language

The website consists of only four permanent regions:

```
Navigation
────────────────────────────────
Sidebar   │   Main Content
────────────────────────────────
Utilities
```

These regions never change. Only the content changes.

**Navigation** is an editorial tab row. It is not a floating button group.
It behaves like the table of contents in documentation: text tabs on a
hairline baseline, connected to content, calm, horizontal, minimal,
fixed height, no animation beyond subtle transitions. The active tab is
marked by a 2px accent underline — never a fill.

**Sidebar** is metadata. It never functions as primary navigation. It
simply answers: who? where? what? how to contact? Each page updates
only the metadata relevant to that page. Its width is a fixed token
(`280px`); it changes only by deliberate system revision, never per
page and never ad hoc.

**Main content** is always paper. Never cards inside cards. Never
unnecessary containers. Content breathes; whitespace is part of the
design.

**System status** — language, theme, sound — reports the system's
current state as quiet text. It is intentionally calm and never becomes
the visual focus.

**Controls belong to the document.** Controls should feel embedded in the
document, never floating above it. Every control — navigation, system
status, links — is part of the layout grid, not an overlay placed on top
of it later. If a control feels "stuck on," it is in the wrong place.

---

## 05. Typography

Typography carries hierarchy. Not colors. Not boxes. Not shadows.

Hierarchy has five levels:

- **Display** (`--type-display`) — the page-level introduction, used once.
- **Heading** (`--type-h1`, `--type-h2`) — page titles and section titles.
- **Body** (`--type-body`) — reading text and controls.
- **Metadata** — the sidebar voices: labels at 12px / 500 in secondary
  text, values at 17px / 600 in primary text.
- **Caption** (`--type-caption`) — secondary labels and quiet notes.

Three faces, each with one role: **Zalando Sans** for UI chrome,
**STIX Two Text** for reading, **JetBrains Mono** for code, data, and
technical labels. **Caveat** is reserved for the logo — never for UI or
body copy. No additional styles unless absolutely necessary.

One deliberate exception: the Log page title ("My design journey") and
its closing heading speak in the serif reading face, not the sans — the
document must never borrow the identity's voice.

---

## 06. Color System

The palette supports the notebook metaphor. It is semantic, never
decorative:

- **Primary background** — warm white (`#f7f7f5` light / `#171717` dark).
  The neutral documentation layer everything sits on.
- **Secondary background** — the quiet surface (`--color-surface`:
  `#ffffff` light / `#202020` dark).
- **Workspace** — the Desk scene keeps its own warm environment in
  light mode, applied only to the Desk canvas; in dark mode it shares
  the neutral page ground so sidebar, nav band and scene read as one.
  The sidebar stays on the neutral layer in both modes.
- **Accent** — forest green (`#526b61` light / `#9aafa5` dark). The
  site's single unified active voice: the open tab, the hovered link,
  the card's quiet border shift. AA-passing against the background in
  both modes.
- **Supporting accents** — a restrained family of quiet surface washes
  (warm, sage, mist, clay, straw), used sparingly for collage notes and
  illustration tints. Never saturated, never competing.

No saturated colors unless they belong to project content itself.
Photographs and the Desk illustration are content — their intrinsic
colors are not interface colors.

---

## 07. Components

Only these components are allowed:

- Notebook Tabs
- Metadata Blocks
- Paper Sections
- Quiet Links
- Utility Controls
- Interactive Objects

No additional visual language should be introduced. A new need is met by
composing these — not by inventing a seventh.

---

## 08. Interaction

Motion communicates continuity. Never excitement.

- **Hover** → opacity, underline, or background tint. Nothing more.
- **Transitions** → 200ms, ease. One duration for the whole interface
  (named exceptions: the Desk peel at 280ms, the Desk scene background
  at 500ms).
- **Objects** (Desk) → physical movement, gentle response. No bouncing.
  No scaling. No flashy effects.

---

## 09. Content Hierarchy

The interface is always quieter than the content. Projects are the
protagonist; the interface is the stage. If a visitor remembers a
shadow, a gradient, or an animation instead of the work, the interface
failed.

---

## 10. Do / Don't

Do:

- Use typography to build hierarchy.
- Use spacing generously.
- Keep layouts consistent.
- Let projects carry visual richness.
- Maintain a calm interface.
- Build one coherent language across every page.

Don't:

- Introduce new component styles.
- Create page-specific UI.
- Mix dashboard and notebook aesthetics.
- Rely on heavy shadows.
- Overuse rounded capsules.
- Decorate empty space.
- Let UI compete with the work.

---

## 11. Experience Goals

When visitors leave the website, they should feel:

> "I understand how she thinks."

rather than:

> "I saw many projects."

The website communicates thinking, not simply making.

---

## 12. Future Evolution

Phoebe's Desk is intentionally unfinished. New projects, new thoughts,
new research, and new experiments should all extend the same visual
language rather than redefine it. The notebook grows. The system remains.

When the language itself needs to change, the change is recorded in
Appendix H — what it was, what problem it had, what it became, and why.

---

# Appendices

The enforceable part. If the main text is the philosophy, this is the
physics. Future pages, components, and agents must not violate these.

---

## Appendix A — Design Tokens

### A01 Spacing

Spacing comes from an 8pt token scale (`--space-1` through `--space-12`):

```
--space-1    8px      --space-5    40px
--space-2    16px     --space-6    48px
--space-3    24px     --space-8    64px
--space-4    32px     --space-10   80px
                        --space-12   96px
```

The preferred working set — reach for these first:

```
4px     Fine adjustment (tag padding, icon optical alignment)
8px     Tight spacing
16px    Default spacing
24px    Section spacing
40px    Major spacing
64px    Page spacing
96px    Layout spacing
```

For example:

```
Label
  8px
Value

Section
  40px
Section
```

Never invent values. No `11px`, no `27px`, no `43px`. If a spacing need
cannot be expressed with the scale, the layout is wrong — not the scale.

### A02 Border Radius

Only these:

```
0      Sharp (paper edges, dividers, tabs)
4      Tags, small chips
8      Cards
16     Large containers (rare)
50%    True circles only
```

Not allowed: `12`, `18`, `26`, `7`, `10` — any value outside the set.
A uniform radius set keeps the whole site feeling like one object.

| Element              | Radius        |
|----------------------|---------------|
| Tags                 | `4px`         |
| Cards (`.ds-card`)   | `8px`         |

### A03 Border

There is exactly one border:

```
1px solid var(--color-divider)
```

Light: `#deded9`. Dark: `#393936`.

Dividers, cards, and rules all use it. Never `2px`, never a colored
border for decoration. The single exception: a card on hover may shift
its border color to the accent green — the quietest possible signal
that something is interactive. No lift, no shadow.

### A04 Shadow

The interface has no shadows. Documentation needs borders, not depth.

Shadows exist in exactly two places, and both are paper:

- Sticky notes on the Log collage (soft, physical — they are pinned
  paper, and the shadow is what makes them read as paper).
- The page fold (the peel that opens the Desk).

If it is not paper, it casts no shadow.

### A05 Transition

One duration for the whole interface:

```
200ms, ease
```

Hover → transition → underline, opacity, or background tint. Always the
same. Two named exceptions exist and no others:

- Desk peel: `280ms` (the source page fades as the fold opens).
- Desk scene background: `500ms` (daylight shifts slowly, like light).

### A06 Color Tokens

| Token                   | Light     | Dark      | Role                            |
|-------------------------|-----------|-----------|---------------------------------|
| `--color-background`    | `#f7f7f5` | `#171717` | Page — warm white documentation |
| `--color-surface`       | `#ffffff` | `#202020` | Cards, utility circles          |
| `--color-text`          | `#20201f` | `#f2f2f0` | Primary text                    |
| `--color-text-strong`   | `#000000` | `#ffffff` | Strongest voice (detail titles) |
| `--color-text-secondary`| `#6f6f6b` | `#a3a3a0` | Labels, quiet text              |
| `--color-divider`       | `#deded9` | `#393936` | The one border, hairline rules  |
| `--color-accent`        | `#526b61` | `#9aafa5` | Forest green — the active voice |

Dark mode redefines the same roles; components never hardcode a color.

### A07 Type Scale

| Level          | Token            | Value                         |
|----------------|------------------|-------------------------------|
| Display        | `--type-display` | `clamp(3rem, 6vw, 5rem)`      |
| H1             | `--type-h1`      | `clamp(2.25rem, 4vw, 3.5rem)` |
| H2             | `--type-h2`      | `clamp(1.5rem, 2.4vw, 2rem)`  |
| Body           | `--type-body`    | `1rem`                        |
| Caption        | `--type-caption` | `0.875rem`                    |
| Metadata label | —                | `12px / 500`, secondary text  |
| Metadata value | —                | `17px / 600`, primary text    |

Faces: Zalando Sans (UI), STIX Two Text (reading), JetBrains Mono
(code/data), Caveat (logo only).

---

## Appendix B — Layout System

### Website skeleton

```
Navigation          fixed, top-left, divider tabs on a hairline
────────────────────────────────────────
Sidebar   │   Main Content
  344px   │   minmax(0, 1fr)
────────────────────────────────────────
Utilities           fixed, bottom-center, embedded text strip
```

Identity and metadata keep fixed heights from the panel top; workspace
tools pins to the panel bottom; a flexible spacer between metadata and
tools absorbs viewport height. Divider positions are identical across
pages at the same viewport size. The grid never owns padding —
the sidebar owns its spacing via margin, each content layer owns its
internal padding, Desk is full-bleed. Switching pages never changes grid
geometry, so transitions never shift content.

### Sidebar

Fixed, on every desktop route:

- **Width:** `280px` (`--context-column-width`, 35×8 — on the 8pt
  grid). Sized so the one-line identity content (roles, contact line)
  and the longest metadata values fit without wrapping. Changed by
  deliberate revision (`216px` → `344px` → `280px`); never per page,
  never ad hoc.
- **Regions:** Identity `232px` / Page metadata `336px` / flexible
  spacer (never less than `48px`) / System status (auto height, floating
  above the panel bottom with `24px` of breathing room — a dock, not a
  footer). Identity and metadata keep fixed heights; only the spacer
  flexes, so dividers sit at identical positions across pages at the
  same viewport size — only the content inside each region changes per
  route. The spacer stays empty by design: whitespace is part of the
  language, never a gap to fill.
- **Top anchor:** the panel anchors directly below the top nav
  (`--context-column-top`); document content keeps one extra spacing
  token of breathing room. Distinct named anchors, never nudges.
- **Identity:** handwritten logo at `56px`, name, roles on one line, and
  contact links as one visual unit (`Design Engineer & Product Designer`,
  equal weight). No divider between logo, name, and contact links.
- **Metadata:** label `12px / 500` secondary → `7px` gap → value `17px /
  600` primary. Uniform item gap.
- **Contact:** no separate region — one quiet text line inside the
  identity block (`Email · GitHub ↗ · LinkedIn ↗`, `·` separators,
  secondary voice, the `.ds-link` underline voice). External
  destinations carry `↗`; `mailto:` opens no page, so Email carries
  none. The Lucide contact icon system was retired 2026-10-01: text
  links fit the editorial typography language and lighten the panel.
- **Mobile:** the fixed width resets to `auto`; the column stacks above
  content.

### Content modes

Every page is one of two modes. This classification is the most
important layout decision in the system — new pages (Research, Blog,
Case Study detail) must declare their mode before anything else.

**Documentation** — Home, Case Studies, Log.

- Readable width, generous whitespace, paper.
- Never scrolls horizontally (`overflow-x: clip`; Desk is the exception).
- Content begins on a shared baseline below the navigation.

**Workspace** — Desk.

- A canvas, not a document. Background fills the viewport.
- Pans at its base render scale; never shrinks below it.
- Interactive objects, physical motion, living state.
- The sidebar stays on the neutral layer at the same coordinates — the
  workspace never moves the furniture.

---

## Appendix C — Component Library

Every component, drawn with its states. If a design needs something not
listed here, compose from these — do not invent.

### Editorial Tabs

(`TopNavigation.jsx`, `.site-nav` / `.site-nav__item`)

Anatomy: text tabs on a row-width `1px` `--color-divider` baseline (the
sheet edge). Each tab keeps a fixed slot across languages: the visible
label stacks over a hidden ghost twin of the other language's label in
the same grid cell (`.site-nav__label` / `.site-nav__label--ghost`, the
ghost `aria-hidden`), so the tab always sizes to the widest EN/ZH label
and switching languages never moves the tabs or the baseline's right
edge; even `16px` side padding keeps the rhythm steady. Tabs are `50px`
tall (`46px` on mobile), `0.875rem / 500` sans (`0.8125rem` mobile),
`letter-spacing 0.02em`, square corners. Left edge aligned to the
main content column (above the content, not the sidebar).

| State   | Appearance |
|---------|------------|
| Default | Bare secondary text on transparent. |
| Hover   | Primary text on a pale green wash (`color-mix` 12% accent). |
| Active  | Primary text with a `2px` accent underline laid exactly over the baseline (`::after`, `bottom: -1px`) — the hairline thickens and turns green beneath the current chapter. No fill, no radius. |
| Focus   | `2px` accent outline, `2px` offset (keyboard only). |

When to use: the four sections only — Home, Case Studies, Desk, Log.
Tabs are navigation; they never act as filters, toggles, or buttons.

### Sidebar

Logo → Identity → Metadata. Always in this order, always the
same widths, heights, and type (see Appendix B). The metadata region may
swap content per page with a smooth transition — never a flash — and on
some pages it doubles as a quiet section directory (links in the value
voice, `17px / 600`, accent-green hover, smooth scroll).

### Metadata Block

```
Current location        ← label: 12px / 500, secondary
       7px
Columbus, Ohio          ← value: 17px / 600, primary
```

One block per fact. Labels describe status, never file attributes:
`Current …`, `Last …`, `Project …`, `Open …` — and `Timeline`
on Case Studies only. Banned: `Based in`, `Version`, `Focus`, `Info`,
`Library`, `Links`.

### System Status

(`SystemStatus.jsx`, `.system-status`)

Three quiet text states in one row near the sidebar's bottom edge
(`.context-column__region--system-status`, auto height, floating above
the panel bottom with `24px` of breathing room — a dock, not a footer):
language, theme and sound. Each item reports the current
state (`EN` / `Light` / `Sound`); clicking toggles it. Typography
carries the interface — no icons, no dividers, no background, no
radius. Items are `0.75rem` / 500 / secondary text, the calmest voice
in the panel, set in one flex row with `var(--space-3)` gaps and
left-aligned with the panel content above. Hover follows the
design-system link rule: accent color plus a `3px` rightward nudge
(`160ms ease`). Each button keeps its accessible label (the action)
plus a native tooltip. Because the panel lives in the sidebar, the
page's bottom edge stays clean — content flows downward with no
boundary.

### Links

Quiet links: secondary text, hover turns accent green with an underline
**and** a rightward nudge — the design-system link hover, unified
2026-10-01. Block rows (homepage explore items) shift with
`padding-left: var(--space-1)`; inline links (sidebar contact links,
metadata directory links, `View all work`) nudge with `translateX(3px)`;
`160ms ease`. On cards the whole content (thumbnail + body) nudges as
one block on card hover/focus — the card is the interactive unit, like
an explore row — while the frame never moves, so the grid stays
aligned.
External links always carry `↗` (`Visit live site ↗`, `Project notes
↗`, `GitHub ↗`) — never a plain `→` for an external destination.
Render the mark with Unicode text presentation (`↗︎`, U+2197 U+FE0E) in the
sans UI face so iOS never substitutes a colored emoji glyph.
Never a button where a link will do; never a link where plain text
will do.

### Cards (`.ds-card`)

`8px` radius, `1px` divider border, surface background. Hover is quiet:
the border shifts to accent green only — never lift, never shadow.
Card titles are sans/medium `1.125rem`, one step below section titles;
on card hover/focus the title warms to the accent voice while the
thumbnail and body nudge `3px` right as one block (`160ms ease`) — the
frame never moves, so the grid stays aligned. Body copy renders in
secondary text.

### Tags

Rectangular chips: `4px` radius (half the card radius), `12px / 500`
secondary text on the default neutral block. Never pills. Never the
mono/data voice. Never translated — tags are English category labels in
every language.

---

## Appendix D — Writing Language

### Tone

No marketing. No hype. No AI-speak. The notebook documents; it does not
pitch.

- Don't write: "Revolutionizing the way teams…"
- Write instead: "Exploring…", "Building…", "Investigating…"

Short, plain, specific. If a sentence could appear on a SaaS landing
page, rewrite it.

### Labels

The controlled vocabulary (see Metadata Block): `Current`, `Last`,
`Project`, `Open` — plus `Timeline` on Case Studies. These
are the only sidebar labels. A collection is called `Project
Collection`, never `Library`.

> Note: an early draft of this document called the projects page
> "Library." The shipped navigation label is **Case Studies**, and the
> word Library remains banned as a label. This document uses shipped
> names throughout.

### Titles

Short, plain nouns. One word where possible:

- Desk, Log, Home — not "My Journey," "About Me," "Portfolio."
- Case Studies — the shipped two-word exception; never paraphrased.

### Calls to action

Verbs that describe the destination:

- `Visit live site ↗`, `Project notes ↗`, `Explore the workspace`.
- Never `Click here`, never `Learn more`.

---

## Appendix E — Motion

```
Hover:       opacity / underline / background tint — 200ms ease
Transitions: 200ms ease, always (peel 280ms, scene 500ms — see A05)
Desk:        physical movement, gentle response
Log:         scroll-driven reveals, calm
Home:        almost none
```

Motion communicates continuity, never excitement. No bouncing, no
scaling, no flashy effects. When in doubt, remove the animation — the
notebook does not perform.

---

## Appendix F — Illustration Language

The Desk illustration is a brand asset. Every future illustration must
obey the same physics.

- **Perspective:** 2D, orthographic. Never isometric tricks, never
  perspective grids.
- **Stroke:** one unified stroke voice across all objects.
- **Objects:** simplified, never photorealistic, never 3D-rendered.
- **Colors:** the system palette only (see A06) plus the quiet tint
  family. No saturated illustration colors unless the object itself
  demands it (a popsicle is orange; the room is not).
- **Animation:** like wind, plants, paper — gentle, continuous,
  physical. Never scale, never bounce.
- **Architecture:** layered scenes (Background → Wall → Window → Shelf
  → Desk → Objects → Effects → Interaction). The page owns the
  background; the illustration never paints its own backdrop rect.
  Objects are independent components. Responsive means the camera pans
  at a base render scale — never shrink the scene below it; mouse users
  pan by dragging the viewport (touch keeps its native scroll).
- **Light:** time-based night darkens only the window sky (the Window
  layer owns night colors: dark gradient, moon, stars). The room,
  objects, and background stay day. A full dark scene applies only on
  the user's dark-mode toggle.

---

## Appendix G — Do / Don't

Do:

- ✓ Build systems, not pages.
- ✓ Reduce components — compose from the six.
- ✓ Keep whitespace; let content breathe.
- ✓ Let typography lead; color and boxes follow.
- ✓ Design quietly; the work is the protagonist.
- ✓ Record every deliberate change in Appendix H.

Don't:

- ✗ Add another card style.
- ✗ Add gradients, glass, or glow.
- ✗ Add more colors to the interface.
- ✗ Use decorative icons (every icon must mean something).
- ✗ Create page-specific UI — fix the system instead.
- ✗ Rely on heavy shadows (see A04: if it is not paper, it casts none).
- ✗ Overuse rounded capsules — the notebook has dividers, not pills.
- ✗ Decorate empty space; emptiness is the design.
- ✗ Let the interface compete with the work.

---

## Appendix H — Component Evolution

Components are not specified; they are grown. This appendix records why
each one became what it is — so the next change starts from reasons,
not from taste.

Format: version → problem → new version → reason.

### Navigation

- **v0.1** — Centered capsule / segmented control.
  **Problem:** felt like an iOS segmented control, floating over
  content and competing with the work.
- **v0.2** — Notebook divider tabs: 13px/500, hairline baseline, solid
  green-fill active tab.
  **Reason:** supports the Design Notebook metaphor — tabs behave like
  binder dividers, and the green fill became the site's unified active
  voice.
- **v0.3** — Full-width baseline (reverted the same day).
  **Problem:** the tab row (~330px) exceeded the 216px sidebar and the
  row-width line ending mid-air read as a mistake; the full-width line
  crossed the whole viewport including the Desk artwork and added noise.
  **Reason for revert:** the line was not the problem — the column was.
- **v0.4** — Sidebar widened `216px` → `344px` to contain the tab row.
  **Reason:** fix the architecture (the column), not the decoration (the
  line). One token; every page inherits.
- **v0.5** — Notebook Divider (Option A, 2026-10-01): four fixed `96px`
  columns (`384px` grid); the active tab loses its green fill and fuses
  with the paper below (no bottom divider, `8px` top corners); tabs and
  utilities unified as one Document Controls layer.
  **Reason:** the green fill read as a dashboard, not a notebook; fixed
  widths read as document chapters, not buttons. Green remains only as
  the state voice (focus ring, live-state labels).
- **v0.6** — Editorial tabs per Layout Blueprint v2.0 (2026-10-01):
  natural-width text tabs on the hairline baseline; the active tab
  carries a 2px accent underline instead of the paper-fused divider.
  **Reason:** the blueprint's Navigation States specify the underline;
  the paper fusion (v0.5, chosen the same day) did not match the
  approved direction. Green returns as the active voice — as a line,
  never a fill.
- **v0.7** — Fixed tab slots across languages (2026-10-01): each tab
  stacks its visible label over a hidden ghost twin of the other
  language's label in the same grid cell, so the tab always sizes to
  the widest EN/ZH label.
  **Reason:** her report — switching languages moved every tab and the
  baseline's right edge (`Case Studies` vs `案例研究`); the tabs should
  stay put. Same principle as the language-toggle stability rule:
  reserve, never reflow.
- **v0.8** — Tab type stepped up (2026-10-01): `0.77rem` → `0.875rem`
  (`0.72rem` → `0.8125rem` on mobile), still `500` sans.
  **Reason:** her report — the tab type read too small; `0.875rem` is
  the caption token (already the metadata-label size), so the tabs stay
  in-system instead of inventing a new step. The ghost-label width
  reservation scales with the type, so the EN/ZH slots stay fixed.

### Status cluster

- **v0.1** — Full-bleed strip: `English · Light · Sound` text readout.
  **Problem:** a full-width bar for three controls; noisy and text-heavy.
- **v0.2** — Three floating icon buttons, bottom-right.
  **Reason:** quiet; icons show state instead of describing it.
- **v0.3** — Circular buttons: 40px surface circles, 20px glyphs, 10px
  gaps, +12px edge clearance.
  **Reason:** bare icons hugged the viewport edge and lacked presence;
  circles give them a defined touch target without rebuilding the bar.
- **v0.4** — Embedded text strip (Option A, 2026-10-01): `384px`,
  centered, hairline rules, three text tools showing live state.
  **Reason:** the floating cluster felt "stuck on." Controls should
  feel embedded in the document, never floating above it.
- **v0.5** — Sidebar bottom region (2026-10-01): the strip moves into
  the sidebar as its fourth fixed region (`60px`; `52px` on mobile);
  the bottom-center viewport portal is removed.
  **Reason:** her call — the page's bottom edge should stay clean so
  content flows downward with no boundary; the tools belong with the
  persistent panel, not floating over the document's end.

### Sidebar

- **v0.1** — Personal info (bio-style panel).
  **Problem:** static biography; restated what a visitor could guess.
- **v0.2** — Persistent status panel: `Current` / `Last` / `Project` /
  `Open` / `Contact`.
  **Reason:** the panel reports the current state of the person and the
  workspace, not file attributes. Labels describe status, never metadata.
- **v0.3** — Contact section removed (2026-10-01): contact links folded
  into the identity block as one quiet text line (`Email · GitHub ·
  LinkedIn`, `·` separators, secondary voice, accent-green hover); the
  two roles collapsed to one line. Three fixed regions: `184px` / `336px`
  / `60px`.
  **Reason:** her call — lighten the panel. The Lucide contact icon
  system felt heavier than the editorial language needed; pure
  typography matches the navigation tabs (controls are text, never
  chrome).
- **v0.4** — Link treatment unified; tools pinned to the bottom
  (2026-10-01): contact links now follow the Links rule — the
  `.ds-link` underline voice, `↗` on GitHub/LinkedIn (`mailto:` opens
  no page, so Email carries none). Link hover is accent color **plus**
  a rightward nudge (`padding-left` on block rows, `translateX(3px)`
  on inline links), recorded as the design-system link hover. The
  panel fills the viewport (`184px` / `336px` / flexible spacer /
  `60px`); workspace tools pin to the bottom edge as three Lucide
  icon buttons (`24px`, `2px` stroke, monochrome — the sidebar icon
  voice), no divider lines.
  **Reason:** her call — the contact line wasn't following the Links
  rule; the explore-row hover deserved to be the system hover; the
  tools sat too high on tall viewports.
- **v0.5** — No divider above the tools; tools left-aligned
  (2026-10-01): the metadata region's divider below it is removed, and
  the tool row aligns left with the panel content instead of centered.
  **Reason:** her call — the third region needs no dividing line; the
  tools read as part of the panel, not a centered control strip.
- **v0.6** — Sidebar narrowed `344px` → `280px` (2026-10-01).
  **Reason:** her call — the `344px` width existed to contain the
  navigation tab row, but the tabs have anchored to the content edge
  since Navigation v0.6; the width was no longer structurally
  required. `280px` (35×8, on the 8pt grid) still fits every one-line
  content (roles, contact line, longest metadata values); `216px`
  would wrap them and clip the fixed-height identity block. One
  token; every page and the Desk scene inherit.
- **v0.7** — Editorial rhythm + System Status (2026-10-01).
  **Reason:** her brief — stop "designing" the sidebar, make it an
  editorial margin. Identity `184px` → `232px` with generous internal
  whitespace (`32px` above the logo, `24px` logo→name, `16px`
  name→roles) so the logo reads as a signature; metadata item gaps
  `16px` → `24px`; the spacer guarantees at least `48px` of empty
  space and is never filled. "Utilities" retired as a concept — the
  three Lucide icon buttons became **System Status**: three quiet text
  rows reporting the current state (`EN` / `Light` / `Sound`), click
  to toggle, typography-first, no icons, no dividers. The region
  floats `24px` above the panel bottom (a dock, not a footer).
  Hierarchy calms downward: Identity → Context → Contact (quiet) →
  System status (calmest). Guiding rule, in her words: "If something
  feels empty, first consider whether it actually needs more
  whitespace rather than more UI."
- **v0.8** — One-line System Status, theme fade, Desk header (2026-10-01).
  **Reason:** her review — three stacked rows felt heavier than the
  content above them, so System Status became one quiet row
  (`EN` / `Light` / `Sound`, `var(--space-3)` gaps); the Chinese state
  label follows the English-copy rule (`ZH`, not `中文`). The theme
  toggle showed a visible boundary (only the layout root eased while
  inner surfaces snapped), so it now fades page-wide: a transient
  `.theme-fading` class eases every painted surface together for
  `350ms` (transform/opacity excluded; skipped under reduced motion).
  On Desk the tab row floated over the illustration, so it gets the
  paper ground (`body[data-page="desk"]` band) — one coherent header
  region, the same calm ground as document pages, staying below the
  Desk close button. Follow-up the same day: in dark mode the scene
  used the palette's warm `bgNight` plus a warm room dim, leaving a
  visible warm/neutral seam against the sidebar — now the scene shares
  the page background and the dim is neutral, so sidebar, nav band and
  scene read as one ground.

### Active color

- **v0.1** — Green text on a white pill.
  **Problem:** two competing active voices across the site.
- **v0.2** — Solid green fill with page-background text, no outline.
  **Reason:** one unified active voice; AA-passing in both modes.
- **v0.3** — Green retired from navigation fills (Option A, 2026-10-01);
  it remains the state voice: focus rings, live-state text labels,
  hover accents.
  **Reason:** the fill read as a dashboard control, not a notebook
  divider. The active tab's meaning now comes from paper-fusion, not
  color.

### Cards

- **v0.1** — Quiet hover: the border shifts to accent green only.
  **Problem:** the design-system link hover (accent plus a rightward
  nudge, unified 2026-10-01) never reached the Case Studies cards —
  hovering a card moved nothing.
- **v0.2** — The card title follows the link hover (2026-10-01,
  superseded the same day): on card hover/focus the title warmed to
  accent and nudged `3px` right.
  **Reason:** the title is the card's link (it carries the `↗` on
  external cards), so the title moved.
- **v0.3** — The whole card content nudges (2026-10-01, superseded
  the same day): thumbnail and body shift `3px` right as one block
  (`160ms ease`); the title warms to accent but no longer moves on
  its own. The frame never moves.
  **Reason:** her direction — the whole card should apply the hover,
  like an explore row.
- **v0.4** — The whole card nudges, frame included (2026-10-01): the
  card element itself shifts `3px` right (`160ms ease`) on
  hover/focus, exactly like the inline-link and explore-row hover;
  the title warms to accent and the border keeps its quiet accent
  shift.
  **Reason:** her correction — v0.3 moved content inside a fixed
  frame, but the hover effect is the whole thing moving. A transform
  never disturbs the grid: siblings stay put, only the hovered card
  paints 3px to the right. Supersedes v0.3's content-inside-frame
  movement.

### Desk

- **v0.1** — Single SVG illustration.
  **Problem:** one monolith; every change touched everything, and
  extension was painful.
- **v0.2** — Layered scene architecture (Background → Wall → Window →
  Shelf → Desk → Objects → Effects → Interaction).
  **Reason:** supports future interaction and dynamic content;
  responsive means camera pan at base scale, never shrink.
- **v0.3** — Camera drag-to-pan + smooth sidebar status (2026-10-01).
  **Reason:** her bug reports — the mouse couldn't pan the scene at all
  (only touch gestures scrolled it), and toggling the lamp made the
  sidebar status flicker instead of changing smoothly. Mouse users now
  drag the viewport to pan (`DeskLayout`, 4px threshold; the release
  click after a real drag is suppressed so panning across the lamp
  can't toggle it); the lamp status value crossfades through a keyed
  span (200ms fade-and-rise) instead of snapping.

### Log journey

- **v0.1** — Year timeline with a testimonial-style reflection card.
  **Problem:** broke the document type system (handwriting font,
  oversized colored text, photo avatar).
- **v0.2** — Version language (`v2022.1` … `v2026.1`) with a quiet
  editorial pull-quote.
  **Reason:** the journey speaks in versions, like software; the
  notebook documents iterations, not testimonials.
- **v0.3** — Document voice for the page title (2026-10-01):
  "My design journey" steps down from `--type-h1` to a serif
  `clamp(1.75rem, 3vw, 2.5rem)` and leaves the sans to the identity —
  the page opens like a chapter, not a billboard. Stage titles step
  down one notch (`clamp(1.25rem, 2vw, 1.5rem)`, still sans with their
  mono version kickers); the closing heading is the title's bookend in
  the same serif voice.
  **Reason:** her correction — the title was too large and spoke in the
  name's font.

---

*End of Design Language v1.0. The notebook grows. The system remains.*
