# Work Card 02 — Static Layout

## Goal

Render the static dark-themed shell with the empty state and the circular progress ring placeholder plus the Setup form, so the layout and mobile stacking match `design.md` before any behavior is wired.

## Inputs

- `build-blueprint.md` → Component Map (`BudgetSetup`, `Dashboard`, `BurnRateBar`).
- `design.md` → empty state + mobile stacking rules, circular progress ring centerpiece, sharp edges, cyan accents, no horizontal scroll at 320px.

## Files likely touched

- `src/App.jsx` (empty-state branch)
- `src/components/BudgetSetup.jsx` (form: balance + date)
- `src/components/Dashboard.jsx` (placeholder, ring placeholder)
- `src/components/BurnRateBar.jsx` (static SVG ring placeholder)
- `src/index.css` (base dark background / text colors)

## Instructions for the coding agent

1. In `App`, branch on whether a budget exists; for this card, hard-code the empty-state branch (no real storage yet).
2. Build the Setup form: a numeric balance input and a native date input (`YYYY-MM-DD`), plus a "Save" button. Apply dark inputs with a cyan focus ring and sharp edges.
3. Build a static SVG circular progress ring placeholder sized large, centered, showing 0% with placeholder daily-limit text like "—.—" inside.
4. Apply the Breeze Dark palette: `bg-slate-800` page, `bg-slate-700` card, `text-slate-100`, cyan accents.
5. Make the layout mobile-first: ring on top, then values, then form; stack vertically; tap targets ≥ 44px; no horizontal scroll.

## What not to do

- Do not read/write `localStorage` yet.
- Do not compute the daily limit or subtract expenses yet.
- Do not commit or deploy.

## Done when

- The empty state renders on load: Setup form + ring placeholder + dark theme.
- Layout stacks correctly at mobile width (no horizontal scroll).
- No JS errors in the console.

## Verification steps

- [ ] Empty state shows: Setup form (balance + date) and a large SVG ring placeholder with placeholder daily-limit text.
- [ ] Dark Breeze Dark background + cyan accents applied to form/button/focus ring.
- [ ] Layout stacks vertically on narrow screen; no horizontal scroll.
- [ ] Form inputs are tap-friendly (height ≥ 44px).
- [ ] Design check: empty state, input form placement, ring centerpiece, sharp edges, and mobile stacking follow design.md.

## Localhost test before continuing

After this card, the learner should test:

- [ ] The app loads and shows the dark-themed empty state with the Setup form and ring placeholder.
- [ ] Resizing to a phone width (320–375px) keeps everything readable with no horizontal scroll.
- [ ] No console errors.

If all tests pass, reply `continue`. If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Do not proceed to Work Card 03 until the static empty-state layout matches design.md and is clean on mobile.

## Status

Not started
