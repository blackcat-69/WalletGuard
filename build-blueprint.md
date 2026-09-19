# Build Blueprint

## Source Files

- `project-brief.md` — project identity, user, scope, build shape, success target.
- `architecture.md` — stack, structure, logic, data/storage decisions.
- `design.md` — "Kubuntu Breeze Minimal" (Breeze Dark-inspired) direction, layout, mobile, accessibility, anti-slop.
- `build-blueprint.md` — this file (builder-ready specification).
- `work-cards/00-setup-gate.md` — Setup Gate (completed).
- `build-status.md` — current phase, completed work, blockers, decisions, next instruction.

## Project Identity

- **Name:** WalletGuard
- **One-sentence concept:** A browser-local burn-rate calculator that lets a college/university student set a starting allowance balance and next allowance date, instantly see their safe daily spend limit inside a large circular progress ring, log typical campus expenses via 1-click preset buttons (or a custom amount), undo the last deduction, and reset — with all state saved in `localStorage`.
- **Target user:** A college or university student managing a limited monthly allowance.
- **Currency:** Malaysian Ringgit (RM), matching campus examples (Kafe B, ShopeeFood).

## Build Shape

- **Browser-local tool.** The main value is creating/changing one data type (the allowance budget state) and keeping it after refresh in the same browser.
- **Shape confirmation:** Confirmed by the learner.

## Version-One Promise

A single, responsive HTML page (Vite + React + Tailwind) deployed as a static site on Vercel where the user can:

1. Set a starting balance and next allowance date (empty state / first run).
2. See the exact daily safe-spend limit in the center of a large SVG circular progress ring, with the ring showing `currentBalance` vs `initialBalance`.
3. Log an expense with one click on a preset (or a custom amount); the limit and ring update instantly.
4. Undo the last expense (re-adds `lastExpenseAmount`).
5. Reset (clears `localStorage`) and return to the empty state.
6. Refresh the browser and still see their updated balance, ring, and daily limit (proving `localStorage` persistence).
7. Use it comfortably on a phone (mobile-first, tap-friendly, no horizontal scroll).

## Scope Lock

### Now

- Single page, no routing.
- Vite + React + Tailwind CSS; static build for Vercel.
- One data type: a single budget object with exactly 5 fields, persisted to `localStorage` under key `walletguard_budget`.
- Inputs: starting balance + next allowance date.
- Display: daily safe-spend limit (`currentBalance / days remaining`) inside an SVG circular progress ring; burn-rate progress vs `initialBalance`.
- Expenses: 1-click preset buttons + custom numeric input.
- Undo last expense; Reset (clears key) → empty state.
- Empty state + mobile layout + accessibility basics + anti-slop compliance.
- Refresh-persistence proof in the same browser.

### Later

- Expense history list (still local only).
- Additional expense categories/tags.
- Optional dark/light toggle beyond the default dark theme.
- Multiple preset sets.
- Import/export of the budget object.

### Never

- No backend server, auth/login, database, payments, live bank APIs, or secret keys.
- No multi-page app or complex routing.
- No tracking multiple budgets/accounts or currencies.
- No cloning of KDE branding/logo/identity (theme-inspired only).

## Architecture Summary

- **Stack:** Vite (bundler) + React (library) + Tailwind CSS (styling); `localStorage` only.
- **Structure:** single `App` with one data type (budget object). No routing.
- **Components:** `App`, `BudgetSetup` (empty state), `Dashboard`, `BalanceDisplay`, `DailyLimit`, `BurnRateBar` (circular ring), `ExpenseInput` (presets + custom), `UndoButton`, `ResetButton`.
- **Data:** single object, 5 fields — `currentBalance`, `initialBalance`, `nextAllowanceDate` (`YYYY-MM-DD`, displayed as `DD-MM-YYYY`), `lastExpenseAmount`, `lastUpdated`.
- **Storage:** key `walletguard_budget`, JSON string in `localStorage`; load on startup, write-through on every change.
- **Logic:** daily limit = `currentBalance / daysRemaining` where `daysRemaining` = date diff (today → next allowance date); expense deduction subtracts from `currentBalance`; undo re-adds `lastExpenseAmount`.
- **Deploy:** Vite static build output → Vercel.

## Data / State / Storage Rules

- Exactly ONE data type: the budget object. No second list/table.
- The object is created only via Setup (first run).
- All mutations re-serialize the whole object and write to `localStorage`.
- `nextAllowanceDate` persisted as `YYYY-MM-DD` (native date input); UI renders `DD-MM-YYYY` via JS.
- If the key is absent or invalid JSON → empty state.
- Reset deletes the key → empty state.
- No network persistence; nothing leaves the browser.

## Design Direction Summary

- **Borrow:** Breeze Dark mood — deep slate-gray backgrounds (`bg-slate-800`/`bg-zinc-900`, RGB ~41,44,48), flat modern geometry, electric cyan/blue accents (`sky-400`/`cyan-500`, RGB ~61,174,233), sharp professional edges, subtle hover states, mobile-first tap-friendly stacking, high-contrast dark mode, large circular progress ring centerpiece showing balance vs initial balance with the daily limit number inside.
- **Do NOT copy:** KDE/Plasma logos, mascot, official KDE UI text/identity, or any protected brand elements. Translate the aesthetic only. No fake logos, testimonials, lorem ipsum, or fake stats.

## Implementation Rules

- Implement one Work Card at a time; stop after verification; update `build-status.md`.
- Use semantic HTML and native, focusable elements.
- Use `localStorage` for the single `walletguard_budget` key only.
- Date stored as `YYYY-MM-DD`, displayed as `DD-MM-YYYY`.
- Daily limit = `currentBalance / daysRemaining`; guard against divide-by-zero / non-positive days (e.g., show a clear message if allowance date is today or passed).
- Preset buttons use `type="button"` and subtract a fixed amount; custom input uses `type="number"` with `inputMode="decimal"`.
- Round monetary display to 2 decimals; show `RM` prefix.
- Mobile-first layout; no horizontal scroll; tap targets ≥ 44px.
- Accessibility: ≥ 4.5:1 contrast, cyan focus rings, labels for inputs, `aria-label`s for icon-only buttons, color-plus-text status signals.
- Anti-slop: no fake logos/testimonials/lorem ipsum/fake stats; one primary action per screen; readable on phone width.
- No secrets/keys/backend/API/auth/database in code.

## File and Folder Expectations

Planned (created only during the Build phase, NOT during planning):

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
    BurnRateBar.jsx     // SVG circular progress ring
    ExpenseInput.jsx
    UndoButton.jsx
    ResetButton.jsx
  utils/
    storage.js          // load/save/clear budget object; date helpers
public/
  favicon.ico
```

## Work Card Plan

Using the browser-local tool pattern (`work-cards/01` … `07`). Each card is one small step with learner QA and a localhost test:

- **01-project-skeleton:** Scaffold Vite + React + Tailwind; `npm run dev` starts and app shell/header loads. No browser preview required to pass file/command checks beyond the dev server starting.
- **02-static-layout:** Render the dark-themed shell + empty state with the ring placeholder and Setup form; verify mobile width and that no horizontal scroll appears.
- **03-add-item:** Implement Setup — create the budget object with the 5 fields, persist to `localStorage`, show Dashboard with balance + ring + daily limit; verify refresh keeps the data.
- **04-update-delete-item:** Implement preset/custom expense deduction, Undo, and Reset; verify add, edit, delete, and refresh persistence.
- **05-localstorage-save-refresh:** Explicit persistence pass — prove set budget → log expense → refresh → data remains; plus empty-state re-entry after Reset.
- **06-review-and-fix:** Run the review mirror; make the single smallest useful fix.
- **07-github-vercel-proof:** GitHub commit + Vercel deploy; produce a proof URL and record it.

## Review Mirror

After the Build phase, run `prompts/07-review-mirror.md` to check against `design.md`, `architecture.md`, and the completed Work Cards, then make the single smallest useful fix and update `build-status.md`.

## Proof Ladder

1. `npm run dev` starts the dev server and the app shell loads.
2. Setup creates the budget; balance + ring + daily limit render.
3. A preset expense deducts from the balance and the ring/limit update instantly.
4. Undo re-adds the last expense.
5. Refresh in the same browser — `currentBalance` and ring persist.
6. Reset returns to the empty state.
7. Mobile width: no horizontal scroll, tap targets ≥ 44px.
8. Deployed Vercel static URL that reproduces persistence.

## 60-Second Explanation Template

"WalletGuard is a single static page that lets a student set their allowance balance and next-pay date, see their safe daily spend limit inside a big progress ring, tap a preset to log a campus expense (like RM5.50 Kafe B) and watch the limit update instantly, undo/Reset, and have everything stay saved in the browser — no server, no login. It's dark-themed like Breeze, runs on Vite/React/Tailwind, and deploys to Vercel."

## Guardrails for the Coding Agent

- Before editing: read `build-status.md`, `build-blueprint.md`, and the current work card.
- Implement ONLY the current work card; do not jump ahead.
- Stop after the card's verification; update `build-status.md`.
- Do not add backend/auth/database/API unless this blueprint explicitly allows it (it does not).
- Do not add secrets or keys to code.
- Do not invent claims, testimonials, logos, real numbers, or fake stats.
- Apply the browser-local-tool guardrails (one data type; `localStorage` only; add/update/delete; empty state; refresh persistence).
- If a legacy file uses `Build Mode`, treat it as `Build Shape` without stopping.
- Keep the Breeze Dark aesthetic (deep slate backgrounds, cyan accents) and the circular progress ring centerpiece; do NOT copy KDE branding.
