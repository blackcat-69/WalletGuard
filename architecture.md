# Architecture

## Build Shape

Browser-local tool. The main value is adding/changing one data type (the allowance budget state) and keeping it after refresh, with no backend.

## Stack Decision

- Bundler: Vite.
- Library: React.
- Styling: Tailwind CSS.
- Persistence: browser `localStorage` only.
- No backend, auth, database, payment, or live API.
- Deploy as a static site to Vercel (Vite build output).

## Structure Overview

Single-page application. No routing. The page shows, in order:

1. Header with app name (`WalletGuard`) and the daily safe-spend limit (the headline value).
2. Setup card shown only when no budget exists (empty state): starting balance input + next allowance date picker.
3. Main view (shown when a budget exists): current balance, daily limit, progress bar (burn rate vs `initialBalance`), expense preset buttons, custom expense input, Undo button, Reset button.
4. Empty state shown again after Reset.

## Component Map

- `App` — root; manages load/save of the single budget object from `localStorage` and renders the rest.
- `BudgetSetup` — empty-state form: `currentBalance` + `nextAllowanceDate`; writes the object on submit.
- `Dashboard` — main view when a budget exists.
  - `BalanceDisplay` — current balance + last updated.
  - `DailyLimit` — `(currentBalance) / (days remaining)` headline.
  - `BurnRateBar` — progress bar: `currentBalance` vs `initialBalance` remaining.
  - `ExpenseInput` — preset buttons + custom amount; deducts from `currentBalance` and sets `lastExpenseAmount`.
  - `UndoButton` — re-adds `lastExpenseAmount` to `currentBalance`.
  - `ResetButton` — clears `localStorage` key and returns to setup.

## Data / State Model

One data type: a single budget object (no list). Exactly 5 fields:

| Field              | Type   | Notes                                                      |
|--------------------|--------|------------------------------------------------------------|
| `currentBalance`   | number | remaining allowance                                        |
| `initialBalance`   | number | starting allowance; powers the burn-rate progress bar      |
| `nextAllowanceDate`| string | `YYYY-MM-DD`; native date input format, displayed as `DD-MM-YYYY` in the UI via JS |
| `lastExpenseAmount`| number | last deduction; enables 1-click Undo                      |
| `lastUpdated`      | string | ISO timestamp of last modification                         |

## Storage Logic

- Storage key: `walletguard_budget` (stored as a JSON string).
- On startup, read the key; if absent or invalid JSON, treat as empty state.
- Any write to the budget object re-serializes and writes the whole object to `localStorage`.
- Every expense, undo, setup change, or reset writes through to `localStorage` immediately.
- `nextAllowanceDate` is persisted as `YYYY-MM-DD` to match native `<input type="date">` and parsed for display formatting as `DD-MM-YYYY`.

## User Flow

1. Load page.
2. If `walletguard_budget` absent → show Setup (empty state): enter starting balance + next allowance date → creates the 5-field object → show Dashboard.
3. Dashboard shows current balance, daily limit, burn-rate progress.
4. Tap an expense preset or enter a custom amount → `currentBalance -= amount`, `lastExpenseAmount = amount`, `lastUpdated = now` → save → dashboard updates instantly.
5. Tap Undo → `currentBalance += lastExpenseAmount` → save.
6. Tap Reset → delete `walletguard_budget` key → return to Setup (empty state).
7. Refresh at any point → reload object from `localStorage` → state is preserved.

## File Expectations

Plain Vite + React + Tailwind structure:

```
index.html
package.json
vite.config.js
tailwind.config.js
postcss.config.js
src/
  main.jsx
  App.jsx
  components/
    BudgetSetup.jsx
    Dashboard.jsx
    BalanceDisplay.jsx
    DailyLimit.jsx
    BurnRateBar.jsx
    ExpenseInput.jsx
    UndoButton.jsx
    ResetButton.jsx
  utils/
    storage.js        // load/save/clear budget object; date helpers
public/
  favicon.ico
```

No source files or packages created during planning.

## Constraints

- Exactly one data type, single object, 5 fields max.
- Data stays in the user's browser (`localStorage`); no network persistence.
- Single page; no routing.
- Currency: Malaysian Ringgit (RM), matching the campus preset examples (Kafe B, ShopeeFood).
- Date input uses native `YYYY-MM-DD`; UI displays `DD-MM-YYYY`.
- Mobile-responsive and accessible enough to pass the upcoming design pass.

## Technical Non-Goals

- No expense history list in v1 (expenses deduct from `currentBalance` only).
- No multiple budgets, accounts, or currencies in v1.
- No dark mode, analytics, import/export, or sharing in v1.
- No sync across devices or users.
- No backend, auth, database, payments, or live APIs ever without explicit trainer approval.

## Verification Notes

- Refresh-persistence test: set a budget, log an expense, then reload the page in the same browser — `currentBalance` and `lastUpdated` must reflect the logged expense (proves `localStorage` round-trip).
- Empty-state test: fresh browser / cleared storage → Setup screen renders.
- Mobile check: layout fits a small screen; inputs are keypad-friendly.
- Preset math test: balance 300, 30 days → daily limit 10.00; deduct 12 → limit recalculates from the new balance and remaining days.
