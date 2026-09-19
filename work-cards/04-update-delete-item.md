# Work Card 04 — Update / Delete Item (Expenses, Undo, Reset)

## Goal

Implement the Update/Edit and Delete path for the single budget object: expense deduction (presets + custom), 1-click Undo, and Reset (deletes the key → empty state). Prove add, edit, delete, and refresh persistence together.

## Inputs

- `build-blueprint.md` → Behaviors (Update/Edit: expense deduction + Undo; Delete: Reset clears key) and preset behavior (RM5.50 Kafe B, RM12 ShopeeFood).
- `design.md` → sharp preset buttons with subtle hover states, Undo/Reset affordances, mobile stacking.

## Files likely touched

- `src/components/ExpenseInput.jsx` (preset buttons + custom numeric input)
- `src/components/UndoButton.jsx`
- `src/components/ResetButton.jsx`
- `src/components/Dashboard.jsx` (wire actions)
- `src/utils/storage.js` (reused save/load/clear)

## Instructions for the coding agent

1. Presets: a small set of campus buttons (e.g., RM5.50, RM8.00, RM12.00) plus a custom amount input. Sharpen edges (no bubbly style).
2. On preset/custom submit: `currentBalance -= amount`, set `lastExpenseAmount = amount`, set `lastUpdated = now()`, `saveBudget(obj)`, re-render.
3. Disable/preset the deduction when it would make `currentBalance` go below 0? Keep simple: if insufficient funds, ignore the deduction and flash a short message.
4. Undo: re-add `lastExpenseAmount` to `currentBalance` (only if the last action was a deduction); update timestamp; save.
5. Reset: `clearBudget()` → App re-renders to the empty Setup state.
6. Ring + daily limit update instantly after each deduction/undo.

## What not to do

- Do not add an expense history list (that is a "Later" item).
- Do not add backend/auth/storage beyond `localStorage`.
- Do not deploy or commit.

## Done when

- Presets and custom input deduct from the balance and update ring/limit instantly.
- Undo re-adds the last expense.
- Reset clears state and returns to the empty state.
- `npm run dev` starts cleanly; no console errors.

## Verification steps

- [ ] Log a preset expense (e.g., RM5.50) → balance, ring, and daily limit update instantly.
- [ ] Log a custom amount → same instant update.
- [ ] Undo reverts the last deduction.
- [ ] Reset clears `walletguard_budget` and returns to Setup (empty state).
- [ ] Refresh after logging an expense → balance/expenses persist.
- [ ] Insufficient funds → deduction ignored with a short message.
- [ ] Design check: preset buttons sharp with hover state, Undo/Reset affordances, update/delete controls, empty-state re-entry, and mobile stacking follow design.md.

## Localhost test before continuing

After this card, the learner should test:

- [ ] Set a budget, log a preset expense, and watch the limit update instantly.
- [ ] Undo the expense and confirm the balance returns.
- [ ] Reset and confirm the empty Setup state returns.
- [ ] Refresh after an expense and confirm it persisted.

If all tests pass, reply `continue`. If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Do not proceed to Work Card 05 until add, edit, delete, and refresh persistence all behave correctly.

## Status

Not started
