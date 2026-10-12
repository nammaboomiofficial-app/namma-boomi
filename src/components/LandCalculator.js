import React, { useState } from 'react';
import unitsData from '../data/landUnits.json';

export default function LandCalculator() {
  const { 
    conversionRates = {}, 
    unitLabels = [], 
    config = {}, 
    uiLabels = {} 
  } = unitsData;

  const [val, setVal] = useState(config.defaultVal || '1');
  const [unit, setUnit] = useState(config.defaultUnit || 'cent');

  const num = parseFloat(val) || 0;
  const baseSqFt = num * (conversionRates[unit] || 1);

  const results = unitLabels.map((u) => {
    const calculatedValue = baseSqFt / (conversionRates[u.key] || 1);
    const decimals = config.precisionDecimals ?? 3;
    return {
      label: u.label,
      value: u.key === 'sqft'
        ? Math.round(calculatedValue).toLocaleString('en-IN')
        : Number(calculatedValue.toFixed(decimals)).toLocaleString('en-IN')
    };
  });

  return (
    <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ▲ {uiLabels.badge}
          </span>
          <h4 className="text-lg font-bold text-white mt-1">{uiLabels.title}</h4>
          <p className="text-xs text-slate-400">{uiLabels.subtitle}</p>
        </div>

        {/* உள்ளீடு & அலகுகள் தேர்வு */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shadow-inner">
          <input
            type="number"
            min="0"
            step="any"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-24 bg-transparent px-3 py-1.5 text-white text-sm focus:outline-none font-semibold text-right"
            placeholder="0"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="bg-slate-800 text-emerald-300 text-xs font-medium px-3 py-2 rounded-lg border border-slate-700 cursor-pointer focus:outline-none"
          >
            {unitLabels.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* முடிவுகள் கட்டம் (Result Cards Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
        {results.map((r, index) => (
          <div
            key={index}
            className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition"
          >
            <span className="text-[11px] font-medium text-slate-400 block truncate">
              {r.label}
            </span>
            <span className="text-lg font-bold text-white tracking-tight mt-1 block">
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}