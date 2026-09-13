import React, { useState } from 'react';

const bankRates = [
  { bank: 'SBI (பாரத ஸ்டேட் வங்கி)', rate: '8.50% - 9.15%', type: 'மனை & வீட்டுக் கடன்', tag: 'குறைந்த வட்டி' },
  { bank: 'Indian Bank (இந்தியன் வங்கி)', rate: '8.55% - 9.20%', type: 'மனை + கட்டுமானக் கடன்', tag: 'தமிழகத்தில் விரைவு' },
  { bank: 'HDFC Bank', rate: '8.70% - 9.40%', type: 'வீட்டுக் கடன் / LAP', tag: 'குறைந்த ஆவணங்கள்' },
  { bank: 'Canara Bank', rate: '8.60% - 9.25%', type: 'விவசாய & MSME கடன்', tag: 'சிறந்த அரசு மானியம்' }
];

const docChecklist = {
  plot: [
    '30 ஆண்டு வில்லங்கச் சான்றிதழ் (EC - Encumbrance Certificate)',
    'அங்கீகரிக்கப்பட்ட மனை வரைபடம் (DTCP / CMDA Approval Copy)',
    'பட்டா, சிட்டா மற்றும் நில அளவை வரைபடம் (FMB Sketch)',
    'முந்தைய 30 ஆண்டுகளுக்கான மூலப் பத்திரங்கள் (Parent Documents)',
    'விற்பனையாளர் ஆதார் & பான் அட்டை நகல்'
  ],
  housing: [
    'கட்டுமான திட்ட வரைபடம் (Approved Building Plan)',
    'அங்கீகரிக்கப்பட்ட பொறியாளர் மதிப்பீட்டு அறிக்கை (Estimate Report)',
    'கடைசி 3 மாத சம்பள ரசீதுகள் (Salary Slips) அல்லது 2 ஆண்டு ITR',
    'கடைசி 6 மாத வங்கி கணக்கு அறிக்கை (Bank Statement)',
    'சொத்து வரி ரசீது (Property Tax Receipt)'
  ],
  business: [
    'தொழில் திட்ட அறிக்கை (Detailed Project Report - DPR)',
    'உத்யாம் ஆதார் / GST பதிவுச் சான்றிதழ்',
    'கடைசி 12 மாத நடப்பு கணக்கு அறிக்கை (Current Account Statement)',
    '3 ஆண்டுகளுக்கான தணிக்கை அறிக்கை (Audited Financials)',
    'நிறுவனத்தின் முகவரி மற்றும் வாடகை ஒப்பந்தம்'
  ]
};

export default function FinanceAddons() {
  const [activeChecklist, setActiveChecklist] = useState('plot');
  const adminWhatsApp = '919962369131';

  const sendDocVerificationRequest = () => {
    const text = `வணக்கம் நம்ம பூமி 360! 📄\n\nநான் வங்கிக் கடனுக்காக நில / சொத்து ஆவணங்களைச் சரிபார்க்க விரும்புகிறேன்.\n\nதேர்ந்தெடுத்த பிரிவு: ${
      activeChecklist === 'plot' ? 'மனை வாங்கும் கடன்' : activeChecklist === 'housing' ? 'வீட்டுக் கடன்' : 'தொழில் / MSME கடன்'
    }\n\nஎன் ஆவணங்களை ஆய்வு செய்து வழிகாட்டவும். நன்றி!`;
    window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-10 py-6">
      {/* 1. முன்னணி வங்கிகளின் வட்டி ஒப்பீடு */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🏦</span> முன்னணி வங்கிகளின் தற்போதைய வட்டி ஒப்பீடு
            </h3>
            <p className="text-slate-400 text-xs mt-1">குறைந்த வட்டியில் கடன் ஒப்புதல் பெற ஒப்பீட்டு வழிகாட்டி</p>
          </div>
          <span className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full w-fit">
            சமீபத்திய நிலவரம்
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bankRates.map((item, index) => (
            <div key={index} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {item.tag}
                </span>
                <h4 className="text-white font-bold text-sm mt-2">{item.bank}</h4>
                <p className="text-slate-400 text-xs">{item.type}</p>
              </div>
              <div className="pt-2 border-t border-slate-700/50">
                <span className="text-[11px] text-slate-400">வட்டி விகிதம்:</span>
                <p className="text-lg font-black text-amber-400">{item.rate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. தேவையான ஆவணங்கள் பட்டியல் & நேரடி சரிபார்ப்பு */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📑</span> வங்கிக் கடனுக்குத் தேவையான முக்கிய ஆவணங்கள்
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            கடன் நிராகரிக்கப்படாமல் இருக்க இந்த ஆவணங்கள் அனைத்தும் முறையாக உள்ளதா என்பதை முன்கூட்டியே சரிபார்க்கவும்.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveChecklist('plot')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeChecklist === 'plot'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🏡 மனை வாங்கும் கடன்
          </button>
          <button
            onClick={() => setActiveChecklist('housing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeChecklist === 'housing'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🏗️ வீட்டுக் கட்டுமானம்
          </button>
          <button
            onClick={() => setActiveChecklist('business')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeChecklist === 'business'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            💼 தொழில் / MSME கடன்
          </button>
        </div>

        {/* Checklist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {docChecklist[activeChecklist].map((doc, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-slate-800/40 border border-slate-700/50 p-3 rounded-xl">
              <span className="text-emerald-400 mt-0.5">✔</span>
              <span className="text-slate-200 text-xs leading-relaxed">{doc}</span>
            </div>
          ))}
        </div>

        {/* Conversion Action */}
        <div className="bg-slate-800/70 border border-emerald-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h5 className="text-white font-bold text-sm">ஆவணங்களில் ஏதேனும் சந்தேகம் அல்லது வில்லங்கம் உள்ளதா?</h5>
            <p className="text-slate-400 text-xs mt-0.5">எங்கள் ₹499 டிஜிட்டல் ஆவண சரிபார்ப்பு மூலம் 100% பாதுகாப்பை உறுதி செய்யுங்கள்.</p>
          </div>
          <button
            onClick={sendDocVerificationRequest}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap cursor-pointer"
          >
            📄 ஆவணங்களை சரிபார்க்க அனுப்பவும்
          </button>
        </div>
      </div>
    </div>
  );
}