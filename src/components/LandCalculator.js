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

  // நீளம் x அகலம் (அடி) கணிப்பான்
  const [lengthFt, setLengthFt] = useState('');
  const [widthFt, setWidthFt] = useState('');

  // வழிகாட்டி மதிப்பு & பத்திரப்பதிவு கட்டணக் கணிப்பான்
  const [ratePerSqFt, setRatePerSqFt] = useState('');

  const quickPresets = [
    { label: '1 சென்ட்', val: '1', unit: 'cent' },
    { label: '1 கிரவுண்ட்', val: '1', unit: 'ground' },
    { label: '1 ஏக்கர்', val: '1', unit: 'acre' },
    { label: '1 குழி', val: '1', unit: 'kuzhi' },
    { label: '1,200 ச.அடி', val: '1200', unit: 'sqft' }
  ];

  const num = parseFloat(val) || 0;
  const baseSqFt = num * (conversionRates[unit] || 1);

  const results = unitLabels.map((u) => {
    const rate = conversionRates[u.key] || 1;
    const calculatedValue = rate > 0 ? baseSqFt / rate : 0;
    const decimals = config.precisionDecimals ?? 3;

    return {
      key: u.key,
      label: u.label,
      value:
        u.key === 'sqft'
          ? Math.round(calculatedValue).toLocaleString('en-IN')
          : Number(calculatedValue.toFixed(decimals)).toLocaleString('en-IN')
    };
  });

  // நீளம் x அகலம் மூலம் சதுர அடி கணக்கிட்டு பிரதான அளவில் இணைத்தல்
  const handleApplyDimension = () => {
    const l = parseFloat(lengthFt) || 0;
    const w = parseFloat(widthFt) || 0;
    if (l > 0 && w > 0) {
      setUnit('sqft');
      setVal(String(Math.round(l * w)));
    }
  };

  // பத்திரப்பதிவு செலவு மதிப்பீடு
  const sqFtRate = parseFloat(ratePerSqFt) || 0;
  const totalLandValue = Math.round(baseSqFt * sqFtRate);
  const stampDuty = Math.round(totalLandValue * 0.07); // 7% முத்திரைத் தாள் கட்டணம்
  const regFee = Math.round(totalLandValue * 0.02); // 2% பதிவுக் கட்டணம்
  const totalRegCost = stampDuty + regFee;

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm text-slate-100 space-y-6">
      {/* தலைப்பு & பிரதான உள்ளீடு */}
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
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400">விரைவுத் தேர்வு:</span>
        {quickPresets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setVal(preset.val);
              setUnit(preset.unit);
            }}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600/20 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/30 transition text-slate-300 cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* முடிவுகள் கட்டம் (Result Cards Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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

      {/* கூடுதல் 2 கருவிகள்: (1) நீளம் x அகலம் & (2) வழிகாட்டி மதிப்பு / பத்திரப்பதிவு கட்டணம் */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
        {/* 1. மனை நீளம் x அகலம் (Feet) */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="text-xs font-bold text-emerald-400">
            📐 மனை நீளம் × அகலம் (அடி கணக்கீடு)
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              min="0"
              placeholder="நீளம் (அடி)"
              value={lengthFt}
              onChange={(e) => setLengthFt(e.target.value)}
              className="w-28 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            />
            <span className="text-slate-400 text-xs">×</span>
            <input
              type="number"
              min="0"
              placeholder="அகலம் (அடி)"
              value={widthFt}
              onChange={(e) => setWidthFt(e.target.value)}
              className="w-28 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            />
            <button
              type="button"
              onClick={handleApplyDimension}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
            >
              கணக்கிடு
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            எ.கா: 30 அடி × 40 அடி = 1,200 ச.அடி (அனைத்து அலகுகளிலும் உடனே மாறும்)
          </p>
        </div>

        {/* 2. வழிகாட்டி மதிப்பு & பத்திரப்பதிவு கட்டண மதிப்பீட்டாளர் */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-amber-400">
              🏛️ வழிகாட்டி மதிப்பு & பத்திரப்பதிவு கட்டணம்
            </span>
            <a
              href="https://tnreginet.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-emerald-400 underline"
            >
              TNREGINET மதிப்பு பார்க்க ↗
            </a>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              placeholder="1 சதுர அடி மதிப்பு (₹)"
              value={ratePerSqFt}
              onChange={(e) => setRatePerSqFt(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            />
          </div>

          {sqFtRate > 0 ? (
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">மொத்த நில மதிப்பு</span>
                <span className="text-xs font-bold text-white">
                  ₹{totalLandValue.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">முத்திரை + பதிவு (9%)</span>
                <span className="text-xs font-bold text-amber-400">
                  ₹{totalRegCost.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-emerald-500/30">
                <span className="text-[10px] text-emerald-400 block">மொத்த பட்ஜெட்</span>
                <span className="text-xs font-bold text-emerald-300">
                  ₹{(totalLandValue + totalRegCost).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400">
              சதுர அடி விலையை உள்ளிட்டால் 7% முத்திரைத் தாள் + 2% பதிவுக் கட்டணம் உடனே கணக்கிடப்படும்.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}