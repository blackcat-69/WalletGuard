# Work Card 06 — Review and Fix

## Goal

Run the review mirror against the completed app, confirm it matches the brief/architecture/design, and make the single smallest useful fix.

## Inputs

- `prompts/07-review-mirror.md`
- `project-brief.md`, `architecture.md`, `design.md`, `build-blueprint.md`
- All completed Work Cards 01–05

## Files likely touched

- Possibly `build-status.md` (record review notes).
- One small app fix only, if the review finds a real issue.

## Instructions for the coding agent

1. Run the review mirror (`prompts/07-review-mirror.md`) checklist against the running app.
2. Record findings in `build-status.md` under a "Review Notes" section.
3. Identify the single smallest useful fix that materially improves correctness, accessibility, or persistence. Apply it.
4. Re-verify that fix manually; do not introduce new scope.

## What not to do

- Do not add new features during review.
- Do not refactor beyond the smallest useful fix.
- Do not deploy from this card.

## Done when

- The review mirror checklist is run and recorded.
- One smallest useful fix is applied and verified (or "no fix needed" is recorded with reason).

## Verification steps

- [ ] Review mirror checklist run and recorded in `build-status.md`.
- [ ] The single smallest useful fix is applied and re-verified (if a real issue was found).
- [ ] App still builds (`npm run build`) and dev server still starts (`npm run dev`).
- [ ] Persistence still survives refresh.
- [ ] Design check: reviewed components still follow design.md (mood, mobile, anti-slop).

## Localhost test before continuing

After this card, the learner should test:

- [ ] `npm run dev` starts and the app looks correct on mobile width.
- [ ] A quick persistence check (set budget, refresh, still there).

If all tests pass, reply `continue`. If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Do not proceed to Work Card 07 until the review mirror is recorded and the smallest useful fix is applied and verified.

## Status

Not started
