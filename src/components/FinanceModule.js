import React, { useState } from 'react';
import loansData from '../data/loansData.json';
import { calculateLoanEligibility } from '../utils/loanEngine';
import DocumentChecklist from './DocumentChecklist';
import { getWhatsAppUrl } from '../config';

const {
  loanCards: LOAN_CARDS = [],
  bankRates: BANK_RATES = [],
  nbfcRates: NBFC_RATES = [],
  digitalLoanApps: DIGITAL_APPS = [],
  calculatorConfig = {},
  uiLabels = {}
} = loansData;

const LOAN_GOVT_PORTALS = [
  { label: 'ஜன் சமர்த் (JanSamarth - Mudra / Agri / கல்வி மானியக் கடன்)', url: 'https://www.jansamarth.in/' },
  { label: '59 நிமிடங்களில் MSME வங்கிக் கடன் (PSB Loans)', url: 'https://www.psbloansin59minutes.com/' },
  { label: 'உத்யம் MSME சான்றிதழ் பதிவு (Udyam Registration)', url: 'https://udyamregistration.gov.in/' },
  { label: 'தமிழ்நாடு தொழில் & மானியக் கடன்கள் (UYEGP / NEEDS)', url: 'https://www.msmeonline.tn.gov.in/' }
];

export default function FinanceModule() {
  const [activeTab, setActiveTab] = useState('schemes'); // 'schemes' | 'providers' | 'calculator' | 'documents'
  const [providerFilter, setProviderFilter] = useState('banks'); // 'banks' | 'nbfc' | 'apps'
  const [applicantPhone, setApplicantPhone] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(LOAN_CARDS[0]?.title || 'தனிநபர் கடன் (Personal Loan)');
  const [loading, setLoading] = useState(false);

  const { income, existingEmi: emiCfg, cibil } = calculatorConfig;
  const [selectedScheme, setSelectedScheme] = useState(LOAN_CARDS[0] || null);
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

  const handleLoanEnquiry = (loanTitle) => {
    const loanToApply = loanTitle || selectedLoan;

    if (!applicantPhone || applicantPhone.length < 10) {
      alert('தயவுசெய்து மேலே உள்ள பெட்டியில் உங்கள் 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்.');
      const phoneInput = document.getElementById('finance-phone-input');
      if (phoneInput) phoneInput.focus();
      return;
    }

    setLoading(true);

    try {
      fetch(
        'https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZB0YKKbWNIKD7CzSh0M0qvfkHhORCw53YMBZX1nKCB1AcSAu/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'கடன் வாடிக்கையாளர்',
            phone: applicantPhone,
            village: '360° கடன் வழிகாட்டல்',
            taluk: loanToApply,
            feeStatus: 'இலவச வழிகாட்டல்',
            status: 'கடன் பரிசீலனை'
          })
        }
      );
    } catch (e) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! எனக்கு "${loanToApply}" கடன் வழிகாட்டல் மற்றும் தகுதி விவரங்கள் தேவை.\n\n📱 எனது எண்: ${applicantPhone}\nவங்கி / NBFC / டிஜிட்டல் கடன் ஒப்பீட்டுடன் உடனடி வழிகாட்டலை எதிர்பார்க்கிறேன்.`;
    const waUrl = getWhatsAppUrl(msg);

    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  const handleShareEligibility = () => {
    const msg = `🏦 *நம்ம பூமி 360° — கடன் தகுதி & EMI மதிப்பீடு*\n\n📌 கடன் வகை: ${selectedScheme?.title || '-'}\n💰 மாத வருமானம்: ₹${Number(monthlyIncome).toLocaleString('en-IN')}\n📉 தற்போதைய EMI: ₹${Number(existingEmi).toLocaleString('en-IN')}\n📊 CIBIL ஸ்கோர்: ${cibilScore}\n⏳ கால அளவு: ${tenureYears} ஆண்டுகள்\n\n✅ *அதிகபட்ச கடன் தகுதி: ₹${maxLoanFormatted}*\n💳 *உத்தேச மாத EMI: ₹${estEmiFormatted}*\n\nஇந்த மதிப்பீட்டின் அடிப்படையில் வங்கி / NBFC ஒப்புதலுக்கு வழிகாட்டவும்.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="w-full space-y-6 text-left">
      {/* 1. ஹெடர் & உடனடி விண்ணப்ப பார் */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/60 via-slate-900/90 to-slate-950 p-5 md:p-7 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-full">
              360° Smart Financial Desk • வங்கி • NBFC • RBI Digital Loan Apps
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">
              உடனடி கடன் & நிதி வழிகாட்டல் மையம் (360° Loan Hub)
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              பொதுத்துறை & தனியார் வங்கிகள், முன்னணி NBFC நிறுவனங்கள் மற்றும் RBI அங்கீகரிக்கப்பட்ட டிஜிட்டல் கடன் செயலிகளின் முழுமையான ஒப்பீடு.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
            <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg">🛡️ 100% RBI Registered</span>
            <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg">🚫 முன் கட்டணம் இல்லை</span>
          </div>
        </div>

        {/* விரைவு விண்ணப்ப பார் */}
        <div className="mt-5 bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <label className="block text-[11px] font-medium text-slate-300 mb-1">கடன் வகை (9 பிரிவுகள்):</label>
            <select
              value={selectedLoan}
              onChange={(e) => setSelectedLoan(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {LOAN_CARDS.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full lg:w-56">
            <label className="block text-[11px] font-medium text-slate-300 mb-1">வாட்ஸ்அப் எண் (10 இலக்கம்):</label>
            <input
              id="finance-phone-input"
              type="tel"
              maxLength={10}
              placeholder="எ.கா: 9876543210"
              value={applicantPhone}
              onChange={(e) => setApplicantPhone(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleLoanEnquiry(selectedLoan)}
            className="w-full lg:w-auto lg:mt-5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition shadow-lg cursor-pointer whitespace-nowrap"
          >
            {loading ? 'இணைகிறது...' : '📲 உடனடி இலவச ஆலோசனை ↗'}
          </button>
        </div>

        {/* 4 தெளிவான முதன்மை டேப்கள் */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('schemes')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'schemes'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50'
                : 'bg-slate-900 text-slate-200 hover:text-white border border-slate-800'
            }`}
          >
            💳 1. 360° கடன் வகைகள் (9)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('providers')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'providers'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
                : 'bg-slate-900 text-slate-200 hover:text-white border border-slate-800'
            }`}
          >
            🏦 2. வங்கி • NBFC • ஆப் கடன்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'calculator'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-200 hover:text-white border border-slate-800'
            }`}
          >
            📊 3. EMI & தகுதி கால்குலேட்டர்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'documents'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/50'
                : 'bg-slate-900 text-slate-200 hover:text-white border border-slate-800'
            }`}
          >
            📂 4. ஆவணங்கள் சரிபார்ப்பு
          </button>
        </div>
      </div>

      {/* TAB 1: 9 வகை 360° கடன் திட்டங்கள் + அரசு போர்ட்டல்கள் */}
      {activeTab === 'schemes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOAN_CARDS.map((card) => (
              <div
                key={card.id}
                className="group rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-blue-500/50 p-5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-2xl p-2 bg-slate-800/80 rounded-xl border border-slate-700/50">
                      {card.icon}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{card.desc}</p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">கடன் வரம்பு</span>
                      <span className="text-emerald-400 font-semibold">{card.range}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">கால அளவு</span>
                      <span className="text-slate-200 font-medium">{card.tenure}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedScheme(card);
                      setTenureYears(card.maxTenureYears || 15);
                      setActiveTab('calculator');
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-semibold border border-emerald-500/30 transition cursor-pointer"
                  >
                    EMI கணக்கிடு
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoanEnquiry(card.title)}
                    className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition cursor-pointer"
                  >
                    விசாரிக்க ↗
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* அரசு மானியக் கடன் போர்ட்டல்கள் */}
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-5 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🏛️</span> அரசு மானியக் கடன் & MSME அதிகாரப்பூர்வ இணையதளங்கள்
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {LOAN_GOVT_PORTALS.map((portal) => (
                <a
                  key={portal.url}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 px-3 py-2.5 rounded-xl text-[11px] text-slate-200 hover:text-emerald-300 transition"
                >
                  <span>{portal.label}</span>
                  <span className="text-emerald-400 font-bold shrink-0">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: சுத்தமான Sub-Tab ஃபில்டருடன் வங்கிகள் (8) + NBFC (6) + RBI Loan Apps (6) */}
      {activeTab === 'providers' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 space-y-5">
          {/* Sub-Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setProviderFilter('banks')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  providerFilter === 'banks'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
                }`}
              >
                🏦 வங்கிகள் ({BANK_RATES.length})
              </button>
              <button
                type="button"
                onClick={() => setProviderFilter('nbfc')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  providerFilter === 'nbfc'
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
                }`}
              >
                🏢 NBFC நிறுவனங்கள் ({NBFC_RATES.length})
              </button>
              <button
                type="button"
                onClick={() => setProviderFilter('apps')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  providerFilter === 'apps'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
                }`}
              >
                📱 RBI Digital Loan Apps ({DIGITAL_APPS.length})
              </button>
            </div>

            <span className="text-[11px] text-emerald-400">
              🛡️ அனைத்தும் RBI ஒழுங்குபடுத்தப்பட்ட நிறுவனங்கள்
            </span>
          </div>

          {/* 1. வங்கிகள் */}
          {providerFilter === 'banks' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {BANK_RATES.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/90 border border-slate-800 hover:border-blue-500/40 rounded-xl p-4 space-y-2 flex flex-col justify-between transition"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/50 inline-block">
                      {b.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2">{b.name}</h4>
                    <p className="text-xs text-slate-300 mt-1">{b.type}</p>
                  </div>
                  <div className="pt-2.5 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-400">{b.rate}</span>
                    <button
                      type="button"
                      onClick={() => handleLoanEnquiry(`${b.name} வங்கிக் கடன்`)}
                      className="text-[11px] text-blue-400 hover:underline font-semibold cursor-pointer"
                    >
                      விசாரிக்க ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. NBFC நிறுவனங்கள் */}
          {providerFilter === 'nbfc' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {NBFC_RATES.map((n, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/90 border border-slate-800 hover:border-purple-500/40 rounded-xl p-4 space-y-2 flex flex-col justify-between transition"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50 inline-block">
                      {n.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2">{n.name}</h4>
                    <p className="text-xs text-slate-300 mt-1">{n.type}</p>
                    <p className="text-[11px] text-amber-300 mt-1.5">★ {n.highlight}</p>
                  </div>
                  <div className="pt-2.5 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-400">{n.rate}</span>
                    <button
                      type="button"
                      onClick={() => handleLoanEnquiry(`${n.name} (NBFC கடன்)`)}
                      className="text-[11px] text-purple-300 hover:underline font-semibold cursor-pointer"
                    >
                      விசாரிக்க ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. RBI Digital Loan Apps */}
          {providerFilter === 'apps' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300">
                போலி சீன / அங்கீகாரமற்ற செயலிகளைத் தவிர்த்து, RBI-ல் பதிவு செய்யப்பட்ட நம்பகமான NBFC செயலிகள் மூலம் மட்டுமே விண்ணப்பிக்கவும்:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {DIGITAL_APPS.map((app, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 space-y-2 flex flex-col justify-between transition"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-black text-white">{app.name}</h4>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          {app.speed}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">{app.rbiPartner}</p>
                      <p className="text-xs text-slate-200 mt-1.5">{app.loanType}</p>
                    </div>
                    <div className="pt-2.5 border-t border-slate-900 flex items-center justify-between text-[11px]">
                      <span className="text-amber-300 font-bold">{app.amountRange}</span>
                      <button
                        type="button"
                        onClick={() => handleLoanEnquiry(`${app.name} (RBI App கடன்)`)}
                        className="text-emerald-400 hover:underline font-semibold cursor-pointer"
                      >
                        வழிகாட்டல் ↗
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: EMI & கடன் தகுதி கால்குலேட்டர் */}
      {activeTab === 'calculator' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                கடன் திட்டத்தைத் தேர்ந்தெடுக்கவும்:
              </h3>
              {LOAN_CARDS.map((scheme) => {
                const isSelected = selectedScheme?.id === scheme.id;
                return (
                  <div
                    key={scheme.id}
                    onClick={() => {
                      setSelectedScheme(scheme);
                      setTenureYears(scheme.maxTenureYears || 15);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-white'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span className="font-bold text-xs">{scheme.title}</span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-emerald-400 font-bold shrink-0">
                        {scheme.interestRate}% வட்டி
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                உங்கள் வருமானம் & விவரங்கள்:
              </h3>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300">{uiLabels.incomeLabel || 'மாத வருமானம்'}</span>
                  <span className="text-emerald-400 font-bold">₹{Number(monthlyIncome).toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={income?.min || 10000}
                  max={income?.max || 500000}
                  step={income?.step || 5000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300">{uiLabels.emiLabel || 'தற்போதைய மாத EMI'}</span>
                  <span className="text-amber-400 font-bold">₹{Number(existingEmi).toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={emiCfg?.min || 0}
                  max={emiCfg?.max || 200000}
                  step={emiCfg?.step || 1000}
                  value={existingEmi}
                  onChange={(e) => setExistingEmi(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300">{uiLabels.cibilLabel || 'CIBIL ஸ்கோர்'}</span>
                  <span className="text-blue-400 font-bold">{cibilScore}</span>
                </div>
                <input
                  type="range"
                  min={cibil?.min || 300}
                  max={cibil?.max || 900}
                  step={cibil?.step || 5}
                  value={cibilScore}
                  onChange={(e) => setCibilScore(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">{uiLabels.tenureLabel || 'கால அளவு'}</span>
                  <span className="font-bold text-purple-400">{tenureYears} ஆண்டுகள்</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={selectedScheme?.maxTenureYears || 25}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/50 to-slate-950 border border-emerald-500/30 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {uiLabels.resultTitle || 'கடன் தகுதி முடிவு'}
                </span>
                <div className="mt-4">
                  <span className="text-xs text-slate-300 block">{uiLabels.maxLoanLabel || 'அதிகபட்ச கடன் தகுதி'}</span>
                  <h2 className="text-3xl font-black text-emerald-400 mt-1">₹{maxLoanFormatted}</h2>
                </div>

                <div className="mt-4 p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">{uiLabels.estimatedEmiLabel || 'உத்தேச மாத EMI'}</span>
                    <span className="font-bold text-white">₹{estEmiFormatted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{uiLabels.approvalStatusLabel || 'ஒப்புதல் நிலை'}</span>
                    <span className={`font-bold ${eligibility?.eligible ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {eligibility?.eligible ? '✓ தகுதியானது' : 'ஆலோசனை தேவை'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  onClick={handleShareEligibility}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer"
                >
                  📲 கடன் தகுதி அறிக்கையைப் பகிர்க (WhatsApp)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('documents')}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer"
                >
                  📂 தேவையான ஆவணங்களைச் சரிபார்க்க →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ஆவணங்கள் சரிபார்ப்புப் பட்டியல் */}
      {activeTab === 'documents' && (
        <div>
          <DocumentChecklist />
        </div>
      )}
    </div>
  );
}