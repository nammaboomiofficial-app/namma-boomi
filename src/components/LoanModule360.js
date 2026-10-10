import React, { useState } from 'react';
import loansData from '../data/loansData.json';
import { calculateLoanEligibility } from '../utils/loanEngine';
import DocumentChecklist from './DocumentChecklist';

export default function LoanModule360() {
  const { loanCards = [], bankRates = [] } = loansData;

  // கால்குலேட்டர் நிலைகள் (States)
  const [selectedScheme, setSelectedScheme] = useState(loanCards[0] || null);
  const [monthlyIncome, setMonthlyIncome] = useState(35000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [cibilScore, setCibilScore] = useState(750);
  const [tenureYears, setTenureYears] = useState(selectedScheme?.maxTenureYears || 15);

  // தணிக்கை முடிவு (Live Calculation Engine)
  const eligibility = calculateLoanEligibility({
    monthlyIncome,
    existingEmi,
    scheme: selectedScheme || {},
    cibilScore,
    customTenureYears: tenureYears
  });

  // வாட்ஸ்அப் ஆலோசனை இணைப்பு
  const handleConsultation = () => {
    const text = `வணக்கம் நம்ம பூமி! நான் ${selectedScheme?.title || 'கடன்'} பெற விரும்புகிறேன். எனது மாத வருமானம்: ₹${monthlyIncome.toLocaleString('en-IN')}, CIBIL: ${cibilScore}. ஆலோசனை வழங்கவும்.`;
    window.open(`https://wa.me/919940000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto space-y-10 text-slate-100">
      {/* தலைப்பு பேனர் */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold">
          🏦 வங்கி & நிதி சேவைகள் 360°
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          ஸ்மார்ட் கடன் வழிகாட்டல் & தகுதி தணிக்கை
        </h2>
        <p className="text-slate-700 dark:text-slate-300 text-sm max-w-xl mx-auto font-medium">
          வங்கி விதிமுறைகளின்படி (FOIR & CIBIL) உங்கள் அதிகபட்ச கடன் தகுதியைக் கணக்கிட்டு உடனடியாக விண்ணப்பியுங்கள்.
        </p>
      </div>

      {/* 1. கடன் திட்டங்கள் கார்டுகள் (Grid Cards) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
          <span>📑</span> கடன் திட்டத்தைத் தேர்ந்தெடுக்கவும்:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {loanCards.map((card) => {
            const isSelected = selectedScheme?.id === card.id;
            return (
              <div
                key={card.id}
                onClick={() => {
                  setSelectedScheme(card);
                  setTenureYears(card.maxTenureYears || 10);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500 ring-1 ring-emerald-500 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-xl">{card.icon}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{card.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{card.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                  <span>வரம்பு: <strong className="text-slate-200">{card.range}</strong></span>
                  <span className="text-emerald-400 font-semibold">{card.interestRate}% வட்டி</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. இன்ஜின் கால்குலேட்டர் & தகுதிப் பரிசோதனை (2 Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        {/* ஸ்லைடர்கள் பகுதி (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <span>⚙️</span> வருமானம் & தவணை உள்ளீடு
            </h3>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded">
              {selectedScheme?.title}
            </span>
          </div>

          {/* மாத வருமானம் */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">உங்கள் நிகர மாத வருமானம்:</span>
              <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                <span className="text-emerald-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  value={monthlyIncome || ''}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  placeholder="15987"
                  className="w-24 bg-transparent text-emerald-400 font-bold text-right focus:outline-none text-xs"
                />
              </div>
            </div>
            <input
              type="range"
              min="5000"
              max="300000"
              step="1"
              value={monthlyIncome || 0}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹5,000</span>
              <span>₹3,00,000</span>
            </div>
          </div>

          {/* நடப்பு கடன் தவணைகள் */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">தற்போது கட்டி வரும் தவணைகள் (Existing EMIs):</span>
              <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                <span className="text-amber-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  value={existingEmi === 0 ? '' : existingEmi}
                  onChange={(e) => setExistingEmi(Number(e.target.value))}
                  placeholder="0"
                  className="w-24 bg-transparent text-amber-400 font-bold text-right focus:outline-none text-xs"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="150000"
              step="1"
              value={existingEmi || 0}
              onChange={(e) => setExistingEmi(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹0</span>
              <span>₹1,50,000</span>
            </div>
          </div>

          {/* தவணைக் காலம் & CIBIL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs text-slate-400 block mb-1">தவணைக் காலம் (Years):</label>
              <select
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {[3, 5, 7, 10, 15, 20, 25].map((y) => (
                  <option key={y} value={y}>{y} ஆண்டுகள்</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">CIBIL ஸ்கோர் வரம்பு:</label>
              <select
                value={cibilScore}
                onChange={(e) => setCibilScore(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="780">750 - 900 (சிறந்தது - Best)</option>
                <option value="710">700 - 749 (நன்று - Good)</option>
                <option value="660">650 - 699 (சராசரி - Average)</option>
                <option value="600">650-க்கு கீழ் (குறைவு - Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* முடிவு அட்டை (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              தணிக்கை & தகுதி அறிக்கை
            </span>

            {/* நிலவர நிலை (Status Card) */}
            {eligibility.status === 'APPROVED' ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-1">
                <span className="text-xs text-emerald-400 font-bold block">✓ கடன் பெற தகுதி உண்டு!</span>
                <span className="text-[10px] text-slate-400 block">வங்கி FOIR விதிகளின்படி உங்களால் பெறக்கூடிய அதிகபட்ச கடன்:</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                  ₹{eligibility.maxEligibleAmount.toLocaleString('en-IN')}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg space-y-1">
                <span className="text-xs text-rose-400 font-bold block">⚠️ கூடுதல் தகுதி தேவை</span>
                <p className="text-xs text-slate-300">{eligibility.reason}</p>
              </div>
            )}

            {/* நிதி விவரங்கள் */}
            <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3">
              <div className="flex justify-between text-slate-400">
                <span>உத்தேச மாதாந்திர EMI திறன்:</span>
                <strong className="text-white">₹{eligibility.monthlyEmi.toLocaleString('en-IN')} / மாதம்</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>வட்டி விகிதம்:</span>
                <strong className="text-emerald-400">{eligibility.interestRate}% ஆண்டுக்கு</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CIBIL நிலை:</span>
                <strong className={cibilScore >= 700 ? 'text-emerald-400' : 'text-amber-400'}>
                  {cibilScore >= 700 ? 'தகுதி உடையது (Eligible)' : 'மறுபரிசீலனை தேவை'}
                </strong>
              </div>
            </div>

            {/* 360° தீர்வுகள் & பரிந்துரைகள் */}
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80 space-y-1">
              <span className="text-[11px] font-semibold text-slate-300 block">💡 360° நிபுணர் பரிந்துரை:</span>
              <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-0.5">
                {eligibility.solutions.map((sol, i) => (
                  <li key={i}>{sol}</li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={handleConsultation}
            className="w-full mt-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <span>💬</span> வங்கி கடன் ஆலோசனை பெற விண்ணப்பிக்கவும்
          </button>
        </div>
      </div>

      {/* 3. முன்னணி வங்கிகள் வட்டி நிலவரம் (Bank Rates Mini-Table) */}
      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <h4 className="text-xs font-semibold text-slate-400 mb-3">🏛️ முன்னணி வங்கிகளின் தற்போதைய வட்டி நிலவரம்:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {bankRates.map((bank, idx) => (
            <div key={idx} className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-white block truncate">{bank.name}</strong>
              <span className="text-[10px] text-slate-400 block truncate">{bank.type}</span>
              <span className="text-emerald-400 font-bold text-xs mt-1 block">{bank.rate}</span>
            </div>
          ))}
       </div>
        </div>

        {/* கடன் ஆவணங்கள் சரிபார்ப்புப் பட்டியல் */}
        <DocumentChecklist />
      </div>
    );
}