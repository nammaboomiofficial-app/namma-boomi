import React, { useState } from 'react';

const LOAN_CARDS = [
  {
    id: 'personal',
    title: 'தனிநபர் கடன் (Personal Loan)',
    desc: 'அவசரத் தேவை, மருத்துவம் & குடும்பச் செலவுகளுக்கு உடனடி ஒப்புதல்',
    range: '₹50,000 - ₹10,00,000',
    tenure: '1 முதல் 5 ஆண்டுகள்',
    badge: 'INSTANT APPROVAL',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: '⚡'
  },
  {
    id: 'business',
    title: 'MSME & சிறுதொழில் கடன்',
    desc: 'வியாபார வளர்ச்சி, கடை விரிவுபடுத்த பிணையமில்லா முத்ரா கடன் வசதி',
    range: '₹1,00,000 - ₹25,00,000',
    tenure: '2 முதல் 7 ஆண்டுகள்',
    badge: 'NO COLLATERAL',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    icon: '🏢'
  },
  {
    id: 'home_plot',
    title: 'வீட்டுமனை & கட்டுமானக் கடன்',
    desc: 'புதிய மனை வாங்க, தனி வீடு கட்ட அல்லது வீட்டைப் புதுப்பிக்க',
    range: '₹5,00,000 - ₹1 கோடி வரை',
    tenure: 'குறைந்த வட்டி (8.4%*)',
    badge: 'LOW INTEREST',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    icon: '🏡'
  },
  {
    id: 'agri',
    title: 'விவசாயம் & பண்ணைக் கடன்',
    desc: 'டிராக்டர், சொட்டு நீர் பாசனம், கறவை மாடு & பயிர்க் கடன் வழிகாட்டல்',
    range: 'அரசு மானியத் திட்டங்கள்',
    tenure: 'நெகிழ்வான தவணை',
    badge: 'GOVT SUBSIDY',
    badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
    icon: '🌾'
  },
  {
    id: 'microfinance',
    title: 'மகளிர் & குழு கடன் (SHG)',
    desc: 'சுயதொழில் செய்யும் தாய்மார்களுக்கான சுலப வாராந்திர/மாதாந்திர கடன்',
    range: '₹25,000 - ₹1,50,000',
    tenure: 'சுலப ஆவணங்கள்',
    badge: 'EASY PROCESS',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    icon: '👩‍💼'
  },
  {
    id: 'lap',
    title: 'சொத்து அடமானக் கடன் (LAP)',
    desc: 'உங்கள் நிலம் அல்லது வீட்டின் மதிப்பில் அதிகபட்ச கடன் வசதி',
    range: '₹10 லட்சம் - ₹5 கோடி வரை',
    tenure: '15 ஆண்டுகள் வரை',
    badge: 'MAX VALUE',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    icon: '📑'
  }
];

const BANK_RATES = [
  { name: 'SBI (பாரத ஸ்டேட் வங்கி)', type: 'மனை & வீட்டுக் கடன்', rate: '8.50% - 9.15%', tag: 'குறைந்த வட்டி' },
  { name: 'Indian Bank (இந்தியன் வங்கி)', type: 'மனை + கட்டுமானக் கடன்', rate: '8.55% - 9.20%', tag: 'தமிழகத்தில் விரைவு' },
  { name: 'HDFC Bank', type: 'வீட்டுக் கடன் / LAP', rate: '8.70% - 9.40%', tag: 'குறைந்த ஆவணங்கள்' },
  { name: 'Canara Bank', type: 'விவசாய & MSME கடன்', rate: '8.60% - 9.25%', tag: 'சிறந்த அரசு மானியம்' }
];

export default function FinanceModule() {
  const [applicantPhone, setApplicantPhone] = useState('');
  const [selectedLoan, setSelectedLoan] = useState('தனிநபர் கடன்');
  const [loading, setLoading] = useState(false);

  const handleLoanEnquiry = (loanTitle) => {
    const loanToApply = loanTitle || selectedLoan;

    if (!applicantPhone || applicantPhone.length < 10) {
      alert("தயவுசெய்து உங்கள் 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்.");
      return;
    }

    setLoading(true);

    try {
      fetch('https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZB0YKKbWNIKD7CzSh0M0qvfkHhORCw53YMBZX1nKCB1AcSAu/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'கடன் வாடிக்கையாளர்',
          phone: applicantPhone,
          village: 'கடன் வழிகாட்டல்',
          taluk: loanToApply,
          feeStatus: 'இலவச வழிகாட்டல்',
          status: 'கடன் பரிசீலனை'
        })
      });
    } catch (e) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! எனக்கு "${loanToApply}" கடன் வழிகாட்டல் மற்றும் தகுதி விவரங்கள் தேவை.\n\n📱 எனது எண்: ${applicantPhone}\nஉடனடி வழிகாட்டலை எதிர்பார்க்கிறேன்.`;
    const waUrl = `https://wa.me/919962369131?text=${encodeURIComponent(msg)}`;
    
    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. தலைப்பு & உடனடி விண்ணப்ப பார் */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/60 via-slate-900/80 to-slate-950 p-5 md:p-7 shadow-xl shadow-blue-950/20 backdrop-blur-md">
        <div className="text-center space-y-2 mb-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-full">
            Smart Financial Desk • 100% இலவச ஆலோசனை
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            உடனடி கடன் & நிதி வழிகாட்டல் மையம் (Loan Hub)
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
            குறைந்த வட்டி, சரியான வங்கித் தேர்வு மற்றும் விரைவான கடன் ஒப்புதலுக்கு நம்ம பூமி 360-ன் பிரத்யேக நிதி ஆலோசனை.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 md:p-4 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3 shadow-inner">
          <div className="flex-1 w-full text-left">
            <label className="block text-xs font-medium text-slate-400 mb-1">
              கடன் வகை:
            </label>
            <select
              value={selectedLoan}
              onChange={(e) => setSelectedLoan(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {LOAN_CARDS.map((c) => (
                <option key={c.id} value={c.title}>{c.title}</option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-64 text-left">
            <label className="block text-xs font-medium text-slate-400 mb-1">
              வாட்ஸ்அப் எண் (10 இலக்கம்):
            </label>
            <input
              type="tel"
              maxLength={10}
              placeholder="எ.கா: 9876543210"
              value={applicantPhone}
              onChange={(e) => setApplicantPhone(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => handleLoanEnquiry(selectedLoan)}
            disabled={loading}
            className="w-full sm:w-auto mt-2 sm:mt-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {loading ? 'இணைகிறது...' : 'தகுதி அறிய ↗'}
          </button>
        </div>
      </div>

      {/* 2. 6 அதிநவீன கடன் கார்டுகள் */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LOAN_CARDS.map((card) => (
          <div
            key={card.id}
            className="group relative rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900/95 hover:border-blue-500/50 p-5 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-blue-950/30"
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

              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {card.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">கடன் வரம்பு</span>
                  <span className="text-emerald-400 font-semibold">{card.range}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">சிறப்பம்சம்</span>
                  <span className="text-slate-300 font-medium">{card.tenure}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleLoanEnquiry(card.title)}
              className="mt-4 w-full py-2 px-4 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 hover:border-blue-500 transition-all flex items-center justify-center gap-1.5"
            >
              விசாரிக்க (Enquire Now) ↗
            </button>
          </div>
        ))}
      </div>

      {/* 3. முன்னணி வங்கிகளின் தற்போதைய வட்டி ஒப்பீடு */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🏦</span> முன்னணி வங்கிகளின் தற்போதைய வட்டி ஒப்பீடு
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">குறைந்த வட்டியில் கடன் ஒப்புதல் பெற ஒப்பீட்டு வழிகாட்டி</p>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline-block">
            சமீபத்திய நிலவரம்
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BANK_RATES.map((b, idx) => (
            <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/50 inline-block">
                {b.tag}
              </span>
              <h4 className="text-sm font-bold text-white line-clamp-1">{b.name}</h4>
              <p className="text-xs text-slate-400">{b.type}</p>
              <p className="text-base font-extrabold text-blue-400 pt-1 border-t border-slate-900">
                {b.rate}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. வங்கிக் கடனுக்குத் தேவையான முக்கிய ஆவணங்கள் */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
          <span>📑</span> வங்கிக் கடனுக்குத் தேவையான முக்கிய ஆவணங்கள்
        </h3>
        <p className="text-xs text-slate-400 mb-4">கடன் நிராகரிக்கப்படாமல் இருக்க இந்த ஆவணங்கள் அனைத்தும் முறையாக உள்ளதா என்பதை முன்கூட்டியே சரிபார்க்கவும்.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span> 30 ஆண்டு வில்லங்கச் சான்றிதழ் (EC - Encumbrance Certificate)
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span> அங்கீகரிக்கப்பட்ட மனை வரைபடம் (DTCP / CMDA Approval Copy)
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span> பட்டா, சிட்டா மற்றும் நில அளவை வரைபடம் (FMB Sketch)
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span> முந்தைய 30 ஆண்டுகளுக்கான மூலப் பத்திரங்கள் (Parent Documents)
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span> விண்ணப்பதாரர் ஆதார், பான் கார்டு & 6 மாத வங்கி கணக்கு அறிக்கை
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span> வருமான வரி தாக்கல் (ITR - 2 ஆண்டுகள்) அல்லது சம்பள ரசீது (Salary Slips)
          </div>
        </div>
      </div>

      {/* 5. டிரஸ்ட் பேட்ஜ் */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-slate-400 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div className="p-1.5">⚡ CIBIL ஸ்கோர் வழிகாட்டல்</div>
        <div className="p-1.5">🛡️ 100% வெளிப்படையானது</div>
        <div className="p-1.5">🚫 முன் கட்டணம் ஏதுமில்லை</div>
        <div className="p-1.5">🤝 நேரடி வங்கி ஒருங்கிணைப்பு</div>
      </div>
    </div>
  );
}