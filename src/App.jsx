import React, { useEffect, useState } from 'react';
import BudgetSetup from './components/BudgetSetup.jsx';
import Dashboard from './components/Dashboard.jsx';
import { loadBudget } from './utils/storage.js';

export default function App() {
  const [budget, setBudget] = useState(null);
  const [fromStorage, setFromStorage] = useState(false);

  useEffect(() => {
    const b = loadBudget();
    setBudget(b);
    setFromStorage(!!b);
  }, []);

  // Brief, unobtrusive confirmation that state was restored from localStorage.
  useEffect(() => {
    if (!fromStorage) return undefined;
    const t = setTimeout(() => setFromStorage(false), 3000);
    return () => clearTimeout(t);
  }, [fromStorage]);

  return (
    <div className="min-h-screen w-full bg-batik text-slate-100 flex flex-col items-center p-4">
      <header className="w-full text-center mb-4">
        <h1 className="text-3xl font-bold text-cyan-500">WalletGuard</h1>
        <p className="text-slate-400 mt-1 text-sm">Daily allowance budget</p>
        {fromStorage ? (
          <p className="text-xs text-cyan-400 mt-2">Loaded from browser storage</p>
        ) : null}
      </header>

      <main className="w-full max-w-md">
        {budget ? <Dashboard budget={budget} onUpdate={setBudget} /> : <BudgetSetup onSaved={setBudget} />}
      </main>
    </div>
  );
}
