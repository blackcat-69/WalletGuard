# Project Brief

## Project Identity

- **Name:** WalletGuard
- **Type:** Student allowance burn-rate calculator (browser-local tool).

## One-Sentence Concept

WalletGuard lets a college/university student enter their current allowance balance and next allowance date, instantly see their safe daily spend limit, and log typical expenses via 1-click preset buttons (e.g. RM5.50 Kafe B, RM12 ShopeeFood) so the daily limit recalculates immediately, with all state saved in the browser's `localStorage`.

## Target User

A college or university student managing a limited monthly allowance who needs to know, moment by moment, how much they can safely spend each day without running out before their next allowance.

## User Goal

Check the exact daily safe-spend limit at a glance, tap a preset for a typical campus purchase (or enter a custom amount), and instantly see the budget adjust; all state persists across browser sessions via `localStorage`.

## Build Shape

- **Browser-local tool** — the main value is adding/changing one data type (the allowance budget state) and keeping it after refresh.

## Shape Confirmation

- **Clue:** The core value is creating/changing a single data type (balance, allowance date, expense deductions) that must persist after refresh in the same browser — not presenting or navigating information.
- **Confirmation:** Confirmed by the learner as a browser-local tool.

## Version-One Success

Version one is "done enough" when it is a single responsive page (planned tooling: Vite + Tailwind) that:

- correctly calculates and displays the daily safe-spend limit;
- deducts expenses via preset buttons and/or a custom input;
- saves all state to `localStorage`;
- survives a browser refresh with the data still present;
- handles the empty state cleanly for first-time users;
- looks good and works on mobile;
- is ready to be deployed to Vercel.

## Now / Later / Never

### Now

- Single page, client-side only.
- Inputs: starting balance + next allowance date.
- Display: daily safe-spend limit.
- Expenses: 1-click preset buttons + custom amount input.
- Delete/clear/reset of data.
- State persisted in browser `localStorage` and survives refresh.
- Mobile-responsive empty state for first-time users.
- Deployable to Vercel as a static site.

### Later

- Additional expense categories or tags (e.g. food, transport).
- History/list of logged expenses (still local only).
- Optional dark mode.
- Multiple preset configurations (still client-local data only).

### Never

- No backend servers.
- No external databases.
- No user authentication / login.
- No live bank APIs or secret keys.
- No multi-page application with complex routing.
- No tracking multiple bank accounts or budgets (single allowance only).
- Must remain a single-page, lightweight, client-side tool powered entirely by browser `localStorage`.

## Assumptions

- Currency is Malaysian Ringgit (RM), matching the campus examples (Kafe B, ShopeeFood).
- Daily safe-spend limit formula: `(current balance) / (days remaining until next allowance)`.
- "Days remaining" is calculated in whole days from today (inclusive of today) to the next allowance date.
- Preset buttons are sample campus expenses; the learner can add custom amounts.
- All numeric inputs use a simple numeric keypad-friendly interface.
- The user's device is shared only by the user (no multi-user sync needed).

## Proof Target

A deployed Vercel static URL where, in the same browser, the user can set a balance and allowance date, log an expense, refresh the page, and still see their updated balance and daily limit — proving `localStorage` persistence. Mobile layout and empty state verified.

## Trainer / Learner Notes

- Build shape: browser-local tool. Guardrails applied (one data type, `localStorage` only).
- Planned tooling noted (Vite + Tailwind) for the Architecture phase; no packages installed during planning.
- Git is not initialized during the planning phase. No source files or packages created during planning.
