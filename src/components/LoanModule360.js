import React, { useState } from 'react';
import loansData from '../data/loansData.json';
import { calculateLoanEligibility } from '../utils/loanEngine';
import DocumentChecklist from './DocumentChecklist';
import { getWhatsAppUrl } from '../config';

export default function LoanModule360() {
  const {
    loanCards = [],
    calculatorConfig = {},
    uiLabels = {}
  } = loansData;

  const { income, existingEmi: emiCfg, cibil } = calculatorConfig;

  const [selectedScheme, setSelectedScheme] = useState(loanCards[0] || null);
  const [monthlyIncome, setMonthlyIncome] = useState(income?.defaultValue || 35000);
  const [existingEmi, setExistingEmi] = useState(emiCfg?.defaultValue || 0);
  const [cibilScore, setCibilScore] = useState(cibil?.defaultValue || 750);
  const [tenureYears, setTenureYears] = useState(selectedScheme?.maxTenureYears || 15);

  const eligibility = calculateLoanEligibility({
    monthlyIncome,
    existingEmi,
    scheme: selectedScheme || {},
    cibilScore,
    tenureYears
  });

  const maxLoanFormatted = eligibility?.maxLoanAmount
    ? Number(eligibility.maxLoanAmount).toLocaleString('en-IN')
    : '0';
  const estEmiFormatted = eligibility?.estimatedEmi
    ? Number(eligibility.estimatedEmi).toLocaleString('en-IN')
    : '0';

  const scrollToDocs = () => {
    const el = document.getElementById('document-checklist-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShareEligibility = () => {
    const msg = `🏦 *நம்ம பூமி 360° — கடன் தகுதி & EMI மதிப்பீடு*\n\n📌 கடன் வகை: ${selectedScheme?.title || '-'}\n💰 மாத வருமானம்: ₹${Number(monthlyIncome).toLocaleString('en-IN')}\n📉 தற்போதைய EMI: ₹${Number(existingEmi).toLocaleString('en-IN')}\n📊 CIBIL ஸ்கோர்: ${cibilScore}\n⏳ கால அளவு: ${tenureYears} ஆண்டுகள்\n\n✅ *அதிகபட்ச கடன் தகுதி: ₹${maxLoanFormatted}*\n💳 *உத்தேச மாத EMI: ₹${estEmiFormatted}*\n\nஇந்த மதிப்பீட்டின் அடிப்படையில் வங்கி ஒப்புதலுக்கு வழிகாட்டவும்.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-6 text-slate-100">
      {/* கடன் திட்ட அட்டைகள் & கால்குலேட்டர் பகுதி */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* திட்டத் தேர்வுகள் (Cards) */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
            {uiLabels.schemesTitle}
          </h3>
          {loanCards.map((scheme) => {
            const isSelected = selectedScheme?.id === scheme.id;
            return (
              <div
                key={scheme.id}
                onClick={() => {
                  setSelectedScheme(scheme);
                  setTenureYears(scheme.maxTenureYears || 15);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-500 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm text-white">{scheme.title}</h4>
                  <span className="text-[10px] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full text-emerald-400 font-bold">
                    {scheme.interestRate}% வட்டி
                  </span>
                </div>
                <p className="text-xs text-slate-400">{scheme.description}</p>
              </div>
            );
          })}
        </div>

        {/* தகுதி கால்குலேட்டர் உள்ளீடுகள் (Slider + Direct Input Box) */}
        <div className="lg:col-span-1 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {uiLabels.calcTitle}
          </h3>

          {/* மாத வருமானம் */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-400">{uiLabels.incomeLabel}</span>
              <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-700">
                <span className="text-emerald-400 font-bold">₹</span>
                <input
                  type="number"
                  min={income?.min}
                  max={income?.max}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                  className="w-24 bg-transparent text-emerald-400 font-bold text-right outline-none text-xs"
                />
              </div>
            </div>
            <input
              type="range"
              min={income?.min}
              max={income?.max}
              step={income?.step}
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* தற்போதைய மாத EMI */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-400">{uiLabels.emiLabel}</span>
              <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-700">
                <span className="text-amber-400 font-bold">₹</span>
                <input
                  type="number"
                  min={emiCfg?.min}
                  max={emiCfg?.max}
                  value={existingEmi}
                  onChange={(e) => setExistingEmi(Number(e.target.value) || 0)}
                  className="w-24 bg-transparent text-amber-400 font-bold text-right outline-none text-xs"
                />
              </div>
            </div>
            <input
              type="range"
              min={emiCfg?.min}
              max={emiCfg?.max}
              step={emiCfg?.step}
              value={existingEmi}
              onChange={(e) => setExistingEmi(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* சிபில் ஸ்கோர் */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-400">{uiLabels.cibilLabel}</span>
              <div className="flex items-center bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-700">
                <input
                  type="number"
                  min={cibil?.min}
                  max={cibil?.max}
                  value={cibilScore}
                  onChange={(e) => setCibilScore(Number(e.target.value) || 0)}
                  className="w-14 bg-transparent text-blue-400 font-bold text-right outline-none text-xs"
                />
              </div>
            </div>
            <input
              type="range"
              min={cibil?.min}
              max={cibil?.max}
              step={cibil?.step}
              value={cibilScore}
              onChange={(e) => setCibilScore(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* கால அளவு */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">{uiLabels.tenureLabel}</span>
              <span className="font-bold text-purple-400">
                {tenureYears} {uiLabels.yearsSuffix}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={selectedScheme?.maxTenureYears || 20}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>
        </div>

        {/* தகுதி முடிவு கார்டு (Result Card) */}
        <div className="lg:col-span-1 bg-gradient-to-br from-emerald-950/40 to-slate-900/80 border border-emerald-500/30 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              {uiLabels.resultTitle}
            </span>
            <div className="mt-4">
              <span className="text-xs text-slate-400 block">{uiLabels.maxLoanLabel}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                ₹{maxLoanFormatted}
              </h2>
            </div>

            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">{uiLabels.estimatedEmiLabel}</span>
                <span className="font-bold text-white">₹{estEmiFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{uiLabels.approvalStatusLabel}</span>
                <span
                  className={`font-bold ${
                    eligibility?.eligible ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {eligibility?.eligible ? uiLabels.statusEligible : uiLabels.statusReview}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <button
              type="button"
              onClick={handleShareEligibility}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              📲 கடன் தகுதி அறிக்கையைப் பகிர்க (WhatsApp)
            </button>
            <button
              type="button"
              onClick={scrollToDocs}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              {uiLabels.applyCtaText}
            </button>
          </div>
        </div>
      </div>

      {/* கடன் ஆவணங்கள் சரிபார்ப்புப் பட்டியல் */}
      <div id="document-checklist-section">
        <DocumentChecklist />
      </div>
    </div>
  );
}