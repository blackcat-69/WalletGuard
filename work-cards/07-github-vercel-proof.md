# Work Card 07 — GitHub & Vercel Proof

## Goal

Commit the completed app to GitHub and deploy a static build to Vercel, then record the proof URL. This is the Ship step of the `Spec → Build → Check → Ship` loop.

## Inputs

- `build-blueprint.md` → Proof Ladder (step 8) and Proof Target (Vercel static URL proving persistence + mobile/empty-state).
- `project-brief.md` → Proof Target.
- Completed Work Cards 01–06.

## Files likely touched

- A `.gitignore` (add `node_modules`, `.env`, `dist`).
- GitHub remote setup (no source changes), Vite `vercel`/`vercel.json` config if needed for SPA fallback.
- `build-status.md` (record proof URL + completion).

## Instructions for the coding agent

1. Create a `.gitignore` (Node + Vite defaults: `node_modules`, `dist`, `.env*`).
2. `git init` (if not already), add files, and make one clean commit with a concise message.
3. Push to a new GitHub repo (use HTTPS remote; confirm GitHub login).
4. Connect the GitHub repo to Vercel; ensure Vercel runs `npm run build` and serves `dist`.
5. Deploy. Vercel produces a `https://<project>.vercel.app` URL.
6. In a clean browser tab, open the Vercel URL and run the final persistence proof: set a budget, log an expense, refresh → confirm data remains; confirm empty state on first load and mobile layout.
7. Record the final proof URL and results in `build-status.md`.

## What not to do

- Do not add secrets, env vars, or backend to the Vercel deploy.
- Do not expose any API keys.
- Do not deploy an unverified build.

## Done when

- Repo pushed to GitHub.
- App deployed to Vercel with a live proof URL.
- Persistence + mobile + empty-state verified at the live URL and recorded.

## Verification steps

- [ ] GitHub repo created and the commit pushed.
- [ ] Vercel deployment succeeds; live URL printed.
- [ ] Live URL loads the dark-themed empty state.
- [ ] Set a budget, log an expense, refresh → data persists at the live URL.
- [ ] Live URL is mobile-readable (no horizontal scroll).
- [ ] No secrets/keys committed (`.gitignore` covers them).
- [ ] Proof URL + verification recorded in `build-status.md`.

## Localhost test before continuing

After this card, the learner should test:

- [ ] Open the live Vercel URL in a browser you haven't used for this project.
- [ ] Set a budget, log a preset expense, refresh the page, and confirm the updated balance/limit remain.
- [ ] Confirm the page looks good on a phone-width window.

If all tests pass, reply `continue`. If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Do not consider the build shipped until the Vercel proof URL is live and persistence + mobile are verified at that URL.

## Status

Not started
