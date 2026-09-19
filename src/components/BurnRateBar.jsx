import React from 'react';

/**
 * Circular progress ring (radial bar chart style).
 * progress: 0..1 (fraction of initialBalance remaining)
 * value: text displayed in the center (e.g. the daily limit string)
 * label: short description under the value
 */
export default function BurnRateBar({ progress = 0, value = '—.—', label = 'daily limit' }) {
  const pct = Math.round((progress || 0) * 100);
  const vb = 120;
  const radius = 52;
  const strokeWidth = 8;
  const center = vb / 2;
  const clamped = Math.min(1, Math.max(0, progress));
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped * circumference);

  return (
    <div
      className="relative w-48 h-48 mx-auto mb-2"
      role="img"
      aria-label={`Budget remaining: ${pct}% of initial allowance. ${label}: ${value}`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${vb} ${vb}`}
        className="block h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#334159"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#06b6d4"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-semibold text-slate-100 font-mono tabular-nums">{value}</span>
        <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
}
