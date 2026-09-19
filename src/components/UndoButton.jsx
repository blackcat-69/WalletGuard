import React from 'react';

/**
 * Undo the last expense: re-adds `lastExpenseAmount` to the current balance.
 * Only rendered when there is something to undo.
 */
export default function UndoButton({ lastAmount, onUndo, disabled }) {
  if (!lastAmount) return null;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onUndo}
      className="rounded-none bg-slate-800 border border-slate-600 text-slate-300 font-mono tabular-nums py-2.5 px-4 hover:border-cyan-500 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
    >
      Undo (RM {Number(lastAmount).toFixed(2)})
    </button>
  );
}
