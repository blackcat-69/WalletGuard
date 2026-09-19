# Design Direction

## Design Inspiration

- Custom style named **"Kubuntu Breeze Minimal"** — a premium, sleek Linux desktop aesthetic inspired by KDE Plasma's **Breeze Dark** theme. This is theme inspiration only; it does **not** replicate KDE branding, logos, or identity. No designmd.ai URL (learner chose a custom description).

## What We Borrow

- Breeze Dark color palette: deep slate-gray backgrounds (Tailwind `bg-slate-800` / `bg-zinc-900`, approximating Breeze background RGB 41,44,48).
- Flat, modern geometry with subtle borders and clean edges.
- Electric cyan/blue accents for active/focus elements (Tailwind `sky-400` / `cyan-500`, approximating KDE focus RGB 61,174,233).
- Sharp, professional UI edges with subtle hover states (no rounded bubbles).
- Desktop-widget-style composition adapted to a responsive single page.

## What We Do Not Copy

- No KDE logos, Plasma mascot, or official KDE branding/assets.
- No copying of KDE's exact UI text, documentation, or product identity.
- No fake testimonials, fake stats, lorem ipsum, or fake logos of any kind.
- We replicate the *mood and geometry* only, not protected brand elements.

## Visual Mood

- **Premium, sleek, calm**, and **focused**.
- Dark theme with high contrast for readability.
- Spacious layout with strong visual hierarchy centered on one number: the daily safe-spend limit.
- Minimal decorative elements; every pixel serves the budget task.

## Layout Rules

- Mobile-first, tap-friendly, structured like a refined desktop widget.
- Single focused viewport: the **circular progress ring centerpiece** dominates the top/middle.
- Below the ring: current balance, then expense presets, then Undo / Reset.
- Empty state (setup form) mirrors the same dark theme and card style.
- One clear primary action per screen (Setup on the empty state; "log expense" on the main view).
- No side navigation, no extra pages, no routing.

## Color / Contrast Rules

- Background: `bg-slate-800` / `bg-zinc-900` (Breeze background RGB 41,44,48).
- Surface/cards: `bg-slate-700` / `bg-zinc-800`.
- Text primary: high-contrast near-white (`text-slate-100`).
- Text secondary: muted (`text-slate-300`).
- Accent (active, focus, ring stroke): `sky-400` / `cyan-500` (KDE focus RGB 61,174,233).
- Destructive action (Reset): `red-400` / `red-500`.
- Minimum 4.5:1 contrast for all text and interactive elements (WCAG AA).

## Background Watermark (Batik-inspired)

- A very subtle, low-opacity geometric pattern embedded in the page background, inspired by traditional Indonesian Batik motifs but reduced to clean, abstract geometry.
- Applied only to the blank background surrounding the main UI card; card surfaces remain a **solid** `bg-slate-700` so the ring and content always pop.
- Opacity: ~8% (stroke `stroke-opacity="0.08"` on `slate-400` lines) — a faint watermark that must never distract from the circular progress ring.
- No colors outside the Breeze Dark palette (slate + cyan). No logos, figures, or literal batik iconography; only abstract, repeating geometry.
- Tile size ~240px, repeating; monochrome slate line work. Must remain invisible at a glance and appear only as a soft texture in negative space.
- Anti-slop note: this is decorative texture only — no fake stats, labels, or brand marks.

## Typography Feel

- **Primary UI text:** **Noto Sans** (via Google Fonts), matching KDE Plasma's default UI font — keeps labels and buttons authentic to a Linux desktop look. Applied to `body`/root and all UI text (not numbers).
- **Numbers & ring:** **JetBrains Mono** (via Google Fonts), applied with Tailwind `font-mono` + `tabular-nums` to the Safe Daily Spend number inside the ring, the balance, and all expense/preset buttons. Monospace + tabular figures make currency values look technical and prevent horizontal jitter during recalculation.
- Font weights used: Noto Sans 400/500/600/700; JetBrains Mono 400/500/600/700.
- Headline = daily safe-spend number inside the ring: large, crisp, high-contrast.
- Body labels and values: medium weight, high legibility on dark.
- Numbers use tabular-figure alignment (no width jitter) for clean column reads.

## Component Style

- **Progress centerpiece:** large dynamic SVG circular progress ring (radial bar chart style). Outer ring stroke = track (`slate-600`); progress stroke = `cyan-500`/`sky-400`. Inside the ring, crisply displayed daily safe-spend limit. Ring fills proportionally: `currentBalance` vs `initialBalance`.
- **Preset buttons:** sharp edges (`rounded-none` or minimal rounding), flat, subtle hover/focus state (cyan accent border or soft glow), tap-friendly minimum 44×44px.
- **Custom expense input:** numeric keypad-friendly (`<input type="number">` with `inputMode="decimal">`).
- **Undo / Reset buttons:** flat, icon+label, sharp edges, distinct destructive color for Reset.
- **Form fields (setup):** dark inputs with cyan focus ring, native date picker (`YYYY-MM-DD`).

## Mobile Rules

- Stack vertically on narrow screens: ring on top, then values, then presets, then actions.
- Inputs sized for touch (height ≥ 44px, tap targets ≥ 44px).
- Numeric keyboard summoned for money inputs (`inputMode="decimal"`).
- Layout readable and usable at 320px width.
- No horizontal scroll.

## Accessibility Basics

- All interactive elements are native buttons/inputs (keyboard focusable).
- Focus rings use the cyan accent (`cyan-500`/`sky-400`).
- Color is never the only signal: the ring progress also conveys text (e.g., "X of Y remaining").
- Labels present for all inputs; `aria-label`s where text is icon-only.
- Minimum 4.5:1 text contrast; 3:1 for large UI components.

## Anti-Slop Rules

- No fake logos.
- No fake testimonials.
- No fake stats unless clearly marked as sample.
- No “lorem ipsum” in final proof (use real sample values).
- One clear primary action per screen.
- Readable on phone width.

## Browser-local tool specifics

- **Input form placement:** centered card in the empty state; same card style reused when editing setup.
- **Item card/list style:** not a list of items in v1 — instead a single "Budget" card holding balance + ring + actions. (No expense history list in v1.)
- **Update/mark state style:** every expense instantly updates the ring percentage, the inner daily-limit number, and `lastUpdated`; saved to `localStorage`.
- **Delete affordance:** Reset button (destructive red) clears the entire budget object → returns to empty state.
- **Empty state:** when `walletguard_budget` is absent, show Setup card (balance + date) with helpful first-time text; ring area replaced by an intro message or subtle placeholder.
- **Refresh proof visibility:** on load, surface a brief, unobtrusive confirmation that state was read from `localStorage` (e.g., a one-line toast or status text) so the persistence is visibly proven.
- **Mobile stacking rules:** ring full-width on top → values stacked → preset grid (2–3 per row) → Undo/Reset full-width; all tap-friendly.

## Design Verification Checklist

- [ ] Dark Breeze-inspired background with cyan accent applied to the ring stroke.
- [ ] Large SVG circular progress ring shows `currentBalance` / `initialBalance`; daily limit readable inside the ring.
- [ ] Daily limit updates instantly after a preset deduction.
- [ ] Preset buttons have sharp edges and a subtle hover/focus state (no bubbly style).
- [ ] Setup form mirrors the same dark theme and card style.
- [ ] Empty state shown when no budget exists, with a clear primary action.
- [ ] Layout stacks cleanly at 320px width; no horizontal scroll; inputs are touch-friendly.
- [ ] Text meets ≥ 4.5:1 contrast; color is not the only status signal.
- [ ] Focus rings use the cyan accent; native focusable elements only.
- [ ] No KDE branding/logos, no fake testimonials/lorem ipsum/fake stats.
- [ ] Refresh test: logged expense persists and the ring reflects it after reload.
