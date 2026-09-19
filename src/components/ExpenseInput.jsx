import React, { useState } from 'react';

const PRESETS = [
  { label: 'Kafe B', amount: 5.5 },
  { label: 'Snack', amount: 2.5 },
  { label: 'ShopeeFood', amount: 12.0 },
];

/**
 * Expense logging: preset buttons + a custom amount input.
 * All monetary values use JetBrains Mono + tabular-nums so columns don't jitter.
 */
export default function ExpenseInput({ onExpense, disabled }) {
  const [custom, setCustom] = useState('');

  const deduct = (amount) => {
    if (disabled || !amount || amount <= 0) return;
    onExpense && onExpense(amount);
  };

  const handleCustom = () => {
    deduct(Number(custom));
    setCustom('');
  };

  return (
    <div className="space-y-3 font-sans">
      <p className="text-xs text-slate-400">Log an expense</p>

      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            disabled={disabled}
            onClick={() => deduct(p.amount)}
            className="flex flex-col items-center justify-center min-h-[44px] rounded-none bg-slate-800 border border-slate-600 text-slate-100 font-mono tabular-nums text-base hover:border-cyan-500 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
          >
            <span className="text-[10px] uppercase tracking-wider text-slate-400">{p.label}</span>
            <span>RM {p.amount.toFixed(2)}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          placeholder="Custom amount"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="flex-1 min-h-[44px] rounded-none bg-slate-800 border border-slate-600 text-slate-100 font-mono tabular-nums placeholder-slate-500 focus:border-cyan-500 focus:outline-none px-3 py-2 text-base"
        />
        <button
          type="button"
          disabled={disabled || !custom}
          onClick={handleCustom}
          className="min-h-[44px] rounded-none bg-slate-900 border border-cyan-500 text-cyan-500 font-semibold px-4 py-2 disabled:opacity-40 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
        >
          Deduct
        </button>
      </div>
    </div>
  );
}
