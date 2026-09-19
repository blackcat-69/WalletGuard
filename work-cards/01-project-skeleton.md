# Work Card 01 — Project Skeleton

## Goal

Scaffold the project so `npm run dev` starts a working Vite + React + Tailwind dev server and shows the app shell / header. This card sets the foundation; no interactive budget logic yet.

## Inputs

- `build-blueprint.md` → Architecture Summary (stack: Vite + React + Tailwind CSS; static deploy to Vercel).
- `design.md` → "Kubuntu Breeze Minimal": deep slate-gray background (`bg-slate-800`), cyan accent (`sky-400`), sharp edges, header visible on mobile.
- Project name: WalletGuard.

## Files likely touched

- `index.html`
- `package.json` (initial `npm create vite@latest` + `tailwindcss` install happens during Build, not planning — this card is the Build trigger)
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `src/main.jsx`
- `src/App.jsx` (header only)
- `src/index.css` (Tailwind directives + dark base background)
- `public/favicon.ico`

## Instructions for the coding agent

1. Create the project with Vite + React (vanilla JS or TS optional; keep it simple).
2. Install Tailwind CSS via the Vite tailwind init flow; wire up `tailwind.config.js` and `postcss.config.js`.
3. Enable Tailwind's `darkMode: 'class'` (default to dark per design).
4. Set the page background to `bg-slate-800` and render an `App` header reading "WalletGuard" in high-contrast near-white text with a cyan accent.
5. Ensure `npm run dev` starts and the shell is visible at the localhost URL printed by Vite.
6. Run `npm run build` once to confirm a static build output is produced (proof the Vercel path exists).

## What not to do

- Do not implement budget logic, presets, ring, or storage yet.
- Do not commit to Git or deploy yet (that is a later card).
- Do not install any backend/auth/database packages.

## Done when

- `npm run dev` starts and prints a local URL.
- The page shows a dark (`bg-slate-800`) shell with a "WalletGuard" header and cyan accent.
- `npm run build` completes and emits a `dist/` folder.

## Verification steps

- [ ] `npm run dev` starts without errors and prints `http://localhost:5173` (or assigned port).
- [ ] App header "WalletGuard" is visible.
- [ ] Background is dark (Breeze-inspired `bg-slate-800`), text is high-contrast.
- [ ] `npm run build` completes and produces `dist/`.
- [ ] Design check: app shell/header follows design.md mood (deep slate background, cyan accent, sharp edges, mobile-first), even though full layout comes in a later card.

## Localhost test before continuing

After this card, the learner should test:

- [ ] `npm run dev` starts and the shell loads with a dark background and "WalletGuard" header.
- [ ] `npm run build` finishes and creates `dist/`.
- [ ] No errors in the dev console related to missing Tailwind directives or build config.

If all tests pass, reply `continue`. If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Do not proceed to Work Card 02 until the dev server starts, the shell loads, and the build emits `dist/`.

## Status

Not started
