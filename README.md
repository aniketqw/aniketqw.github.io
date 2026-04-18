# Aniket Saxena Portfolio — Design System

A design system distilled from the personal portfolio of **Aniket Saxena** — AI Engineer & Full-Stack Developer, B.Tech Computer Science at VIT. Two surfaces are represented: the public **Portfolio** site and the private **Admin** (repo manager) tool.

## Sources

- **Codebase** — `aniketqw/aniketqw.github.io@main` (imported into `_source/`)
  - `_source/index.html` — full portfolio (hero / about / projects / experience / skills / certifications / contact)
  - `_source/admin.html` — repo management dashboard (fetch, pin, exclude, export `projects_config.json`)
  - `_source/projects-section.html` — drop-in replacement block for projects section
  - `_source/fetch_repos.py`, `_source/projects.json` — GitHub Action + generated data
- **Live site** — https://aniketqw.github.io
- **Linked identities** (pulled from the source) — `github.com/aniketqw`, `linkedin.com/in/aniket-saxena-8a5328233`, `aniketsaxena627@gmail.com`

No Figma files were provided. Everything below is derived from the source HTML/CSS.

## Products represented

| Surface | Purpose | Vibe |
|---|---|---|
| **Portfolio** (`index.html`) | Public-facing personal site, showcases projects, experience, skills, certifications, and contact | Cinematic dark, gradient-accented, motion-heavy, full-bleed hero |
| **Admin** (`admin.html`) | Private dashboard to fetch GitHub repos, pin featured ones, exclude noise, export `projects_config.json` consumed by the GitHub Action | Utilitarian dark-tool aesthetic — dense grid, colored status chips, monospace stats |

Both share the **dark canvas + blue→purple gradient accent + Inter/JetBrains Mono** DNA but diverge in density and tone: Portfolio is theatrical, Admin is workmanlike.

---

## Content fundamentals

**Voice — first-person, confident, warm.** The Portfolio speaks as *I*, addressing the visitor as *you*. Not corporate. Plainspoken with occasional enthusiasm markers (*"passionate"*, *"driven by curiosity"*, *"meaningful impact"*).

**Casing.** Sentence case for prose; Title Case for section headings (*Featured Projects*, *Skills & Technologies*, *Let's Connect*). Buttons mix both — *View My Work*, *Get In Touch*, *Start a Conversation* are action-forward Title Case. Admin uses **Title Case with lowercase helper copy** and ALL-CAPS 10–12px uppercase labels with 1–3px letter-spacing.

**Rhythm.** Headings are punchy (2–4 words) and frequently wrap a single word in a gradient span — *"Hi, I'm **Aniket**"*, *"About **Me**"*, *"Featured **Projects**"*, *"Let's **Connect**"*. Subheads are a single compact sentence introducing the section. Prose paragraphs run 2–3 sentences max.

**Never used.** Emoji in body copy. Exclamations. Jokes. Corporate buzzwords (*synergy*, *solutions-oriented*). The admin *does* use 3 compact emoji as iconographic anchors in empty states (`🔍`) and bullet legends (`★`, `✕`), and unicode arrows in decorative roles (`→`, `▸`, `↓`). Portfolio uses `▸` as a bullet in experience lists and `★` for GitHub stars.

**Sample copy (Portfolio).**
- *"AI Engineer & Full-Stack Developer crafting intelligent solutions"*
- *"I'm a passionate AI and ML enthusiast with a strong foundation in computer science…"*
- *"Explore my latest work in AI, machine learning, and full-stack development"*
- *"I'm always interested in new opportunities and collaborations."*

**Sample copy (Admin).**
- *"Enter your username and fetch repos"* / *"Then pin the ones you want featured and exclude the rest"*
- Section labels: `SUMMARY`, `LEGEND`, uppercase, 10px, `letter-spacing: 2px`
- Legend items use em-dashes: *"Pinned — shown first, featured badge"*

**Numbers & stats.** Stat counters use raw integers animated from 0 (*"3 Projects Completed"*, *"15 Technologies"*). Percentages appear only when real (*"40% performance improvement"*). Monospace is used for any code-adjacent data (timestamps, counts, JSON paths).

---

## Visual foundations

### Canvas & surfaces
- **Background.** Pure near-black `#0a0a0a` (Portfolio), `#0c0c0f` (Admin). Always dark — no light theme exists.
- **Surface layers.** `#13131a` (admin sidebar/cards) and `gray-900/30` (`rgba(17,24,39,0.3)`) with `backdrop-filter: blur(...)` on portfolio cards. Glass, not opaque.
- **Noise overlay.** Portfolio has a fullscreen SVG turbulence noise layer at `opacity: 0.03` — subtle grain, the secret sauce against the flat black.
- **Protection.** No protection gradients over imagery; the only gradient scrim is a `bg-gradient-to-t from-blue-900/10 to-transparent` at the foot of Contact. Images get a glowing blue→purple blurred frame on hover (see *Glow* below).

### Color
- **Accent gradient** — `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)`. Used for: gradient text (headings), featured badges, CTA buttons, filter-button active state, progress bar. The entire brand hinges on this one gradient.
- **Primary blue** — `#3b82f6` (`blue-500`) with `#2563eb` hover. Links, active chips, icon frames.
- **Accent purple** — `#8b5cf6` (`violet-500`). Partner in the gradient.
- **Status palette** (appears in project cards and admin status chips):
  - Live → green (`bg-green-900/30 text-green-400`)
  - Demo → blue (`bg-blue-900/30 text-blue-400`)
  - Beta → yellow (`bg-yellow-900/30 text-yellow-400`)
  - Featured → gradient pill
- **Neutrals.** `gray-400` (muted body), `gray-500` (meta), `gray-600` (disabled/faint), `gray-700` (borders-hover), `gray-800` (borders), `gray-900` (surface).
- Admin adds **amber** `#f5a623` (pinned) and **red** `#f75f5f` (excluded) as dedicated semantic hues not present on the public site.

### Type
- **Inter** — 300/400/500/600/700/800/900. Display uses `800–900` + `tracking-tight` (`-0.02em`). Body is `400`. Google Fonts via CDN.
- **JetBrains Mono** — 400/600. Used for timestamps, captions, code-adjacent data via the `.mono` utility.
- **Sora** — 300/400/600/700. Admin display/UI font. A softer geometric alternative to Inter; signals "tool" vs "marketing".
- **Scale.** Hero: `text-5xl → text-8xl` (48→128px) `font-black`. Section H2: `text-4xl md:text-5xl font-bold` (36→48px). Card H3: `text-xl` (20px) `font-bold`. Body: `text-lg` (18px). Meta/chips: `text-xs` / `text-sm` (12/14px). Admin gets tighter: labels at 10–11px uppercase, card names at 14px.

### Spacing
- **Section rhythm.** `py-20` (80px) top+bottom between sections. `mb-12` (48px) between heading and content. `gap-6 → gap-8` (24–32px) between cards. Container is `max-w-4xl` for prose, `max-w-6xl` for project grids.
- **Card padding.** `p-6` (24px) for compact cards, `p-8` (32px) for experience cards.
- **Compact UI (Admin).** `1rem / 1.5rem` vertical padding sections, `10–14px` card padding, `6–10px` gaps.

### Radii
- Cards: `rounded-2xl` (16px). Pills/chips: `rounded-full` (999px). Buttons: `rounded-full`. Admin uses a tighter `--radius: 10px` for cards, `6px` for inputs, `4px` for tiny action buttons.

### Shadows & elevation
- **No drop-shadows** on cards — elevation comes from borders + glow, not traditional box-shadow. Cards read as "etched" lines on dark.
- **Glow**, the signature effect: on hover, a blurred blue→purple bar sits behind the element via a `::before` pseudo with `filter: blur(20px)` and `opacity: 0→0.6`. Applied to buttons and gradient-border wrappers.
- **3D lift** on project cards: `translateY(-10px) rotateX(5deg)` with `transform-style: preserve-3d` and perspective on scroll reveal.

### Borders
- `1px solid` neutrals — `gray-800` default, `gray-700` hover. Featured cards get `border-blue-800/50`. Inputs focus to `--blue` (`#4f8ef7`).
- No border-radius + left-accent patterns. No dashed borders.

### Transparency & blur
- Cards: `bg-gray-900/30` to `/50` with `backdrop-blur` or `backdrop-blur-md`. Nav bar: `bg-black/70 backdrop-blur-md`. Menu overlay: `rgba(10,10,10,0.98) backdrop-filter: blur(10px)`.
- Imagery: blur-up on lazy load (`filter: blur(5px) → 0` on `.loaded`).

### Animation
- **Easing.** `cubic-bezier(0.4, 0, 0.2, 1)` (material standard) for reveals and transitions. Pop/bounce uses `cubic-bezier(0.68, -0.55, 0.265, 1.55)` for overshoot.
- **Durations.** 100ms (hover color), 300ms (transitions), 500–800ms (scroll reveals), 1500ms (skeleton shimmer).
- **Reveal library.** `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`, `.reveal-rotate`, `.stagger-children`, `.pop-in`, `.bounce-in`. All flip to `.active` via an IntersectionObserver.
- **Hover.** Links → `text-blue-400`. Cards → `translateY(-10px) rotateX(5deg)`. Buttons → `bg-blue-700` (color shift) + glow.
- **Press.** Not explicitly defined — falls back to default active.
- **Loading.** Skeleton shimmer gradient sweep (`1.5s infinite`). Custom text loader with staggered letter `translateY(100%) → 0` reveal. Progress bar at top of viewport tied to scroll.
- **Counter animation** for stats (0 → target, timed IIFE).
- **Custom cursor** on desktop: 40px blue ring, `mix-blend-mode: difference`, scales 1.5× with tinted fill on `.hover` elements. Hidden on mobile.

### Imagery
- Projects use screenshots with `aspect-video` (16:9) containers. Missing images fall back to Unsplash tech/code photos (warm-but-desaturated, web-dev-aesthetic — laptops, keyboards, abstract code).
- No illustrations, no emoji art, no hand-drawn elements. Imagery is photographic or direct product screenshots.
- Hover: `scale(1.1)` over 500ms inside `overflow-hidden` wrapper.

### Layout rules
- **Fixed.** Header nav (`fixed top-0`). Progress bar (`fixed top-0 z-50`). Cursor (`fixed z-9998`). Noise overlay (`fixed z-1`). Loader (`fixed z-9999`).
- **Container.** `container mx-auto px-6` with `max-w-4xl / max-w-6xl` inner wrapper. Centered everything.
- **Grid.** Project grid is `md:grid-cols-2 lg:grid-cols-3`. Skills are 3-col. Stats are `grid-cols-2 md:grid-cols-4`. Admin repo grid: `repeat(auto-fill, minmax(300px, 1fr))`.

---

## Iconography

**Inline SVG only.** The source has zero icon-font dependency. Every icon is a raw `<svg viewBox="0 0 24 24">` with either `stroke="currentColor" fill="none" stroke-width="2"` (Heroicons outline-style — used for UI: mail, phone, arrow-right, certificate shield) or `fill="currentColor"` (brand logos: GitHub octocat, LinkedIn).

**Stroke width & caps.** `stroke-width="2"` with `stroke-linecap="round" stroke-linejoin="round"`. Corners rounded, no miter.

**Sizes.** `w-4 h-4` (16px, inline with text), `w-6 h-6` (24px, inside frame boxes). Frame boxes are `w-12 h-12` with a tinted bg (`bg-blue-500/20`) and `rounded-lg` (8px).

**Icon set used.** Custom inline SVGs drawn from Heroicons vocab (shield-check, envelope, phone, arrow-right, menu bars) plus brand marks (GitHub, LinkedIn). We've copied the exact SVGs into `assets/icons/` and also link the **Heroicons** CDN as the canonical substitution for any missing icons.

**Unicode / emoji.** Portfolio uses `▸` (triangle bullet) in experience lists, `★` for GitHub star counts. Admin uses `🔍` `★` `✕` `→` `↓` sparingly. No other emoji in prose.

**Logo.** No real logo exists. The identity mark is the monogram **"AS"** in gradient text in the nav, and the full name **"Aniket Saxena"** in the loader. We ship both as SVG marks in `assets/`.

---

## Index

- **README.md** *(this file)* — brand bible
- **colors_and_type.css** — CSS variables for colors, type scale, semantic tokens
- **SKILL.md** — agent-invocable skill manifest (cross-compatible with Claude Code Agent Skills)
- **fonts/** — font loading notes (Inter, JetBrains Mono, Sora all via Google Fonts CDN)
- **assets/**
  - `logos/` — AS monogram, full wordmark, favicon
  - `icons/` — raw SVGs for GitHub, LinkedIn, mail, phone, arrow-right, shield-check, menu, scroll-indicator
  - `images/` — placeholder project thumbnail
- **preview/** — HTML cards registered to the Design System tab (type, color, spacing, components, brand)
- **ui_kits/**
  - `portfolio/` — Portfolio site recreation (hero, about, projects, experience, skills, contact) with click-thru filter demo
  - `admin/` — Admin repo-manager recreation (sidebar, fetch, pin/exclude, export)
- **_source/** — imported source files from `aniketqw/aniketqw.github.io@main` (do not edit; reference only)
