import React, { useState } from 'react';

const conversionRates = {
  sqft: 1,
  cent: 435.6,
  ground: 2400,
  acre: 43560,
  kuzhi: 144,
};

export default function LandCalculator() {
  const [val, setVal] = useState('1');
  const [unit, setUnit] = useState('cent');

  const num = parseFloat(val) || 0;
  const baseSqft = num * (conversionRates[unit] || 1);

  const results = [
    { label: 'சதுர அடி (Sq.Ft)', value: baseSqft.toLocaleString('en-IN', { maximumFractionDigits: 2 }), unit: 'ச.அடி' },
    { label: 'சென்ட் (Cent)', value: (baseSqft / 435.6).toFixed(3), unit: 'சென்ட்' },
    { label: 'கிரவுண்ட் (Ground)', value: (baseSqft / 2400).toFixed(3), unit: 'கிரவுண்ட்' },
    { label: 'ஏக்கர் (Acre)', value: (baseSqft / 43560).toFixed(4), unit: 'ஏக்கர்' },
    { label: 'குழி (Kuzhi)', value: (baseSqft / 144).toFixed(2), unit: 'குழி' },
  ];

  return (
    <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            📐 நில அளவை மாற்றி
          </span>
          <h4 className="text-lg font-bold text-white mt-1">தமிழக நில அளவீடு கால்குலேட்டர்</h4>
          <p className="text-xs text-slate-400">சென்ட், சதுர அடி, கிரவுண்ட் மற்றும் ஏக்கர் உடனடி மாற்றுக் கருவி.</p>
        </div>

        {/* Input & Unit Selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
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
            className="bg-slate-800 text-emerald-300 text-xs font-medium px-3 py-2 rounded-lg focus:outline-none cursor-pointer border border-slate-700"
          >
            <option value="cent">சென்ட்</option>
            <option value="sqft">ச.அடி (Sq.Ft)</option>
            <option value="ground">கிரவுண்ட்</option>
            <option value="acre">ஏக்கர்</option>
            <option value="kuzhi">குழி</option>
          </select>
        </div>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {results.map((r) => (
          <div key={r.label} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-center">
            <span className="text-[11px] text-slate-400 block truncate">{r.label}</span>
            <span className="text-base font-bold text-emerald-400 block mt-1">{r.value}</span>
            <span className="text-[10px] text-slate-500">{r.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}