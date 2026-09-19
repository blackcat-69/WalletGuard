# Work Card 05 — LocalStorage Save & Refresh Persistence

## Goal

Explicitly prove the persistence guarantees from the browser-local-tool guardrails: set a budget, log an expense, refresh, and confirm the data remains in the same browser; then confirm the empty state returns cleanly after Reset.

## Inputs

- `build-blueprint.md` → Data/State/Storage Rules (`walletguard_budget` JSON in `localStorage`; absent/invalid → empty state) and Proof Ladder (steps 2–6).
- `architecture.md` → refresh-persistence verification notes.

## Files likely touched

- Likely no new app files; this card is a focused verification pass. Any small storage robustness fix lives in `src/utils/storage.js`.

## Instructions for the coding agent

1. Re-read `loadBudget`/`saveBudget`/`clearBudget` in `storage.js` and double-check JSON round-trip and invalid-JSON handling (return `null`).
2. Add a tiny, unobtrusive on-screen confirmation that state was read from `localStorage` on load (per design.md refresh-proof visibility), e.g., status text "Loaded from browser storage" that clears after the first user action.
3. Run the full end-to-end persistence check below. Do not change behavior beyond robustness and the status message.

## What not to do

- Do not add networking, backups, or sync.
- Do not change scope (no expense history, no cloud).

## Done when

- The complete add → expense → refresh → reset cycle is verified in a real browser.

## Verification steps

- [ ] Fresh browser (no `walletguard_budget`): empty state renders.
- [ ] Set budget (balance + date) + Save → Dashboard appears and the object is in `localStorage`.
- [ ] Log an expense → balance/ring/limit update; `localStorage.walletguard_budget.currentBalance` reflects the deduction.
- [ ] Hard-refresh (Ctrl/Cmd+R) → same balance/ring/limit remain (persistence proven).
- [ ] Reset → key removed; empty state returns; refresh still shows empty state.
- [ ] Invalid JSON in `walletguard_budget` (manually corrupt in DevTools) → app falls back to empty state, no crash.
- [ ] Design check: refresh-proof status message visibility and empty-state behavior follow design.md.

## Localhost test before continuing

After this card, the learner should test:

- [ ] In a real browser dev tab: set a budget, log an expense, then refresh the page and confirm the updated balance and limit are still shown.
- [ ] Reset, then refresh, and confirm the Setup (empty) state returns.
- [ ] (Optional) Corrupt `localStorage.walletguard_budget` in DevTools → refresh → confirm no crash and empty state.

If all tests pass, reply `continue`. If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Do not proceed to Work Card 06 until persistence is verified across refresh and the empty-state re-entry after Reset is clean.

## Status

Not started
