import React, { useState } from 'react';
import BurnRateBar from './BurnRateBar.jsx';
import ExpenseInput from './ExpenseInput.jsx';
import UndoButton from './UndoButton.jsx';
import ResetButton from './ResetButton.jsx';
import {
  dailyLimit,
  daysFromTodayInclusive,
  formatDateDDMMYYYY,
  formatMoney,
  saveBudget,
  clearBudget,
} from '../utils/storage.js';

/**
 * Main view once a budget exists.
 * - Balance card + ring (daily limit inside).
 * - Expense presets + custom input (deducts from currentBalance, stores lastExpenseAmount).
 * - Undo (re-adds lastExpenseAmount).
 * - Reset (clears localStorage, returns to Setup).
 * Ring + daily limit update instantly after every action.
 */
export default function Dashboard({ budget, onUpdate }) {
  const {
    currentBalance,
    initialBalance,
    nextAllowanceDate,
    lastExpenseAmount,
    lastUpdated,
  } = budget;

  const [notice, setNotice] = useState('');

  const progress = initialBalance > 0 ? currentBalance / initialBalance : 0;
  const limit = dailyLimit(currentBalance, nextAllowanceDate);
  const days = daysFromTodayInclusive(nextAllowanceDate);

  const ringValue = limit == null ? '—' : formatMoney(limit);
  const ringLabel = days != null && days <= 0 ? 'due today' : 'daily limit';

  const persist = (updates) => {
    const next = { ...budget, ...updates, lastUpdated: new Date().toISOString() };
    saveBudget(next);
    onUpdate(next);
  };

  const handleExpense = (amount) => {
    const safeAmount = Number(amount);
    if (!safeAmount || safeAmount <= 0) return;
    if (safeAmount > currentBalance) {
      setNotice('Not enough balance for that expense.');
      setTimeout(() => setNotice(''), 2500);
      return;
    }
    setNotice('');
    persist({ currentBalance: currentBalance - safeAmount, lastExpenseAmount: safeAmount });
  };

  const handleUndo = () => {
    if (!lastExpenseAmount) return;
    setNotice('');
    persist({ currentBalance: currentBalance + lastExpenseAmount });
  };

  const handleReset = () => {
    clearBudget();
    onUpdate(null);
  };

  return (
    <div className="space-y-5 font-sans">
      <div className="bg-slate-700 border border-slate-600 p-5 text-center">
        <p className="text-sm text-slate-400">Current balance</p>
        <p className="text-3xl font-semibold text-slate-100 font-mono tabular-nums">
          {formatMoney(currentBalance)}
        </p>
      </div>

      <BurnRateBar progress={progress} value={ringValue} label={ringLabel} />

      <div className="text-center text-sm text-slate-300">
        Next allowance: <span className="text-slate-100">{formatDateDDMMYYYY(nextAllowanceDate) || '—'}</span>
        {days != null && days >= 0 ? (
          <span className="block text-slate-400">({days} day{days === 1 ? '' : 's'} left)</span>
        ) : null}
        <span className="block text-slate-400 mt-1">Updated {new Date(lastUpdated).toLocaleString()}</span>
      </div>

      {notice ? (
        <p className="text-sm text-red-400 border border-red-400/30 rounded-none bg-red-400/5 py-2 px-3">
          {notice}
        </p>
      ) : null}

      <ExpenseInput onExpense={handleExpense} />

      <div className="flex gap-2">
        <UndoButton lastAmount={lastExpenseAmount} onUndo={handleUndo} />
      </div>

      <ResetButton onReset={handleReset} />
    </div>
  );
}
