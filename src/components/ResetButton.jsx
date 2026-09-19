import React from 'react';

/**
 * Destructive action: clears the budget object from localStorage and returns
 * to the empty Setup state.
 */
export default function ResetButton({ onReset, disabled, loading }) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onReset}
      className="rounded-none w-full bg-slate-900 border border-red-500/70 text-red-400 font-semibold py-3 mt-1 hover:bg-red-400/10 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
    >
      {loading ? 'Resetting…' : 'Reset'}
    </button>
  );
}
