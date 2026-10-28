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
  const [copiedKey, setCopiedKey] = useState(null);

  // விரைவுத் தேர்வுக்கான முன்மாதிரிகள் (Presets)
  const quickPresets = [
    { label: '1 சென்ட்', val: '1', unit: 'cent' },
    { label: '1 கிரவுண்ட்', val: '1', unit: 'ground' },
    { label: '1 ஏக்கர்', val: '1', unit: 'acre' },
    { label: '1 குழி', val: '1', unit: 'kuzhi' },
  ];

  const num = parseFloat(val) || 0;
  const baseSqFt = num * (conversionRates[unit] || 1);

  const results = unitLabels.map((u) => {
    const rate = conversionRates[u.key] || 1;
    // NaN பிழை வராமல் தடுக்கும் பாதுகாப்பு கணக்கீடு
    const calculatedValue = rate > 0 ? (baseSqFt / rate) : 0;
    const decimals = config.precisionDecimals ?? 3;
    
    return {
      key: u.key,
      label: u.label,
      value: u.key === 'sqft'
        ? Math.round(calculatedValue).toLocaleString('en-IN')
        : Number(calculatedValue.toFixed(decimals)).toLocaleString('en-IN')
    };
  });

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

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

      {/* விரைவுத் தேர்வு பட்டன்கள் (Quick Presets) */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-xs text-slate-400">விரைவுத் தேர்வு:</span>
        {quickPresets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setVal(preset.val);
              setUnit(preset.unit);
            }}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600/20 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/30 transition text-slate-300"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* முடிவுகள் கட்டம் (Result Cards Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
        {results.map((r) => (
          <div
            key={r.key}
            onClick={() => handleCopy(r.key, `${r.value} ${r.label}`)}
            className="group relative bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 hover:border-emerald-500/40 transition cursor-pointer"
            title="மதிப்பை நகலெடுக்க கிளிக் செய்யவும்"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400 block truncate">
                {r.label}
              </span>
              <span className="text-[10px] text-slate-500 group-hover:text-emerald-400 transition">
                {copiedKey === r.key ? 'நகலெடுக்கப்பட்டது!' : 'நகலெடு'}
              </span>
            </div>
            <span className="text-lg font-bold text-white tracking-tight mt-1 block">
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}