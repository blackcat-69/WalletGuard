import React, { useState } from 'react';
import { saveBudget, todayISODate } from '../utils/storage.js';

/**
 * Empty-state Setup form.
 * On submit, creates the 5-field budget object and persists it to localStorage,
 * then notifies the parent (App) so the Dashboard renders.
 */
export default function BudgetSetup({ onSaved }) {
  const [balance, setBalance] = useState('');
  const [date, setDate] = useState(todayISODate());

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(balance);
    if (!amount || !date) return;

    const budget = {
      currentBalance: amount,
      initialBalance: amount,
      nextAllowanceDate: date,
      lastExpenseAmount: 0,
      lastUpdated: new Date().toISOString(),
    };

    saveBudget(budget);
    onSaved && onSaved(budget);
  };

  return (
    <div className="mt-4 w-full bg-slate-700 border border-slate-600 p-5 space-y-4">
      <h2 className="text-lg font-semibold text-slate-100">Set up your allowance</h2>

      <div className="space-y-1.5">
        <label className="block text-sm text-slate-300" htmlFor="wg-start-balance">
          Starting balance (RM)
        </label>
        <input
          id="wg-start-balance"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 text-slate-100 focus:border-cyan-500 focus:outline-none px-3 py-3 text-base"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm text-slate-300" htmlFor="wg-allowance-date">
          Next allowance date
        </label>
        <input
          id="wg-allowance-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 text-slate-100 focus:border-cyan-500 focus:outline-none px-3 py-3 text-base"
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="mt-2 w-full bg-slate-900 border border-cyan-500 text-cyan-500 font-semibold py-3 text-base hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
      >
        Save budget
      </button>
    </div>
  );
}
