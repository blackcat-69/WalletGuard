# Work Card 03 — Add Item (Setup + Persistence)

## Goal

Implement the Add/Create path: Setup creates the budget object with the 5 fields, persists it to `localStorage` under `walletguard_budget`, and the Dashboard renders the balance, the SVG circular progress ring, and the daily limit. Prove refresh keeps the data.

## Inputs

- `build-blueprint.md` → Data/State/Storage Rules (5 fields, key `walletguard_budget`) and daily-limit formula (`currentBalance / daysRemaining`).
- `design.md` → circular progress ring centerpiece, daily limit inside the ring, mobile stacking.

## Files likely touched

- `src/utils/storage.js` (create/save/load/clear budget object)
- `src/App.jsx` (load on start; branch empty vs. dashboard)
- `src/components/BudgetSetup.jsx` (on submit, build the object and save)
- `src/components/Dashboard.jsx` (show balance + daily limit + ring)
- `src/components/BurnRateBar.jsx` (SVG ring reflecting `currentBalance`/`initialBalance`)
- `src/components/DailyLimit.jsx` (the number inside the ring)

## Instructions for the coding agent

1. In `storage.js`, export helpers: `loadBudget()`, `saveBudget(obj)`, `clearBudget()`, and a date formatter `formatDateDDMMYYYY(isoDate)`.
2. `loadBudget()`: read `walletguard_budget`; parse JSON; return `null` if absent/invalid.
3. `App`: on mount, `loadBudget()`. If present, render `Dashboard`; else render `BudgetSetup` (empty state).
4. `BudgetSetup` submit: build object with fields:
   - `currentBalance` (number)
   - `initialBalance` (number)
   - `nextAllowanceDate` (string `YYYY-MM-DD`)
   - `lastExpenseAmount` (0)
   - `lastUpdated` (new Date().toISOString())
   save via `saveBudget()`, then re-render Dashboard.
5. `BurnRateBar`: SVG circular progress ring; stroke arcs for `currentBalance/initialBalance`; display the daily limit text in the center.
6. Daily limit = `currentBalance / daysRemaining`, where `daysRemaining` = diff in whole days from today to `nextAllowanceDate` (inclusive of today). Render as `RM X.XX`.
7. Display `nextAllowanceDate` as `DD-MM-YYYY` in the UI.

## What not to do

- Do not implement expense deduction or Undo yet (next card).
- Do not deploy or commit.

## Done when

- Setup creates and persists the 5-field object.
- Dashboard shows balance, ring percentage, and daily limit.
- `npm run dev` starts cleanly; no console errors.

## Verification steps

- [ ] Empty state renders first run.
- [ ] Enter balance (e.g., 300) + a future date + Save → Dashboard appears.
- [ ] Ring reflects balance/initialBalance proportion; daily limit shows `RM X.XX`.
- [ ] Date displays as `DD-MM-YYYY`.
- [ ] Refresh the browser → budget still present (persistence works for the created object).
- [ ] Design check: ring centerpiece, empty state, input placement, and mobile stacking follow design.md.

## Localhost test before continuing

After this card, the learner should test:

- [ ] Set a starting balance and allowance date, Save, and see the Dashboard with the ring + daily limit.
- [ ] Refresh the page and confirm the budget is still there.

If all tests pass, reply `continue`. If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Do not proceed to Work Card 04 until the Add path creates/persists the object and the Dashboard renders correctly and survives a refresh.

## Status

Not started
