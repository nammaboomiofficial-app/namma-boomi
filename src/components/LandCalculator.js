import React, { useState } from 'react';
import unitsData from '../data/landUnits.json';

const { conversionRates, unitLabels } = unitsData;

export default function LandCalculator() {
  const [val, setVal] = useState('1');
  const [unit, setUnit] = useState('cent');

  const num = parseFloat(val) || 0;
  const baseSqFt = num * (conversionRates[unit] || 1);

  const results = unitLabels.map((u) => {
    const calculatedValue = baseSqFt / conversionRates[u.key];
    return {
      label: u.label,
      value: u.key === 'sqft'
        ? Math.round(calculatedValue).toLocaleString('en-IN')
        : Number(calculatedValue.toFixed(3)).toLocaleString('en-IN'),
      unit: u.label
    };
  });

  return (
    <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            📐 நில அளவை மாற்றி
          </span>
          <h4 className="text-lg font-bold text-white mt-1">தமிழக நில அளவீட்டு கால்குலேட்டர்</h4>
          <p className="text-xs text-slate-400">சென்ட், சதுர அடி, கிரவுண்ட், ஏக்கர் மற்றும் குழி அளவீடுகள்</p>
        </div>

        {/* Input & Unit Selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shadow-inner">
          <input
            type="number"
            min="0"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-24 bg-transparent px-3 py-1.5 text-white text-sm focus:outline-none font-semibold text-right"
            placeholder="0"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="bg-slate-800 text-emerald-300 text-xs font-medium px-3 py-2 rounded-lg border border-slate-700 focus:outline-none cursor-pointer hover:bg-slate-750 transition-colors"
          >
            {unitLabels.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
        {results.map((r, index) => (
          <div
            key={index}
            className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all group"
          >
            <span className="text-[11px] font-medium text-slate-400 block group-hover:text-emerald-400 transition-colors">
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