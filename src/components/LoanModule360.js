import React, { useState } from 'react';
import loanConfig from '../data/loanConfig.json';

export default function LoanModule360() {
  const { adminWhatsApp, scriptUrl, defaults, ranges } = loanConfig;

  const [loanAmount, setLoanAmount] = useState(defaults.loanAmount);
  const [interestRate, setInterestRate] = useState(defaults.interestRate);
  const [tenureYears, setTenureYears] = useState(defaults.tenureYears);

  // EMI கணக்கீட்டு சூத்திரம்
  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return Math.round(emi) || 0;
  };

  const emi = calculateEMI();
  const totalPayment = emi * tenureYears * 12;
  const totalInterest = totalPayment - loanAmount;

  const handleLoanApply = async () => {
    // 1. கூகுள் ஷீட்டில் ஆட்டோமேட்டிக்காக லோன் லீட் சேமித்தல்
    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'கடன் விண்ணப்பதாரர்',
          phone: 'WhatsApp தொடர்பு',
          place: `கடன்: ₹${loanAmount.toLocaleString('en-IN')}`,
          surveyNo: `EMI: ₹${emi.toLocaleString('en-IN')} (${tenureYears} yrs)`,
          status: 'லோன் விண்ணப்பம்',
          leadType: 'வங்கிக் கடன் லீட் (Loan Lead)',
          feeStatus: 'லோன் விண்ணப்பம்',
          auditStatus: 'வங்கிக் கடன் லீட் (Loan Lead)'
        })
      });
    } catch (err) {
      console.error('Sheet saving error:', err);
    }

    // 2. வாட்ஸ்அப் மெசேஜ் அனுப்புதல்
    const message = `வணக்கம் நம்ம பூமி 360! 🏛️\n\nஎனக்கு மனை / வீட்டுக் கடன் வழிகாட்டல் தேவைப்படுகிறது.\n\n• கடன் தொகை: ₹${loanAmount.toLocaleString('en-IN')}\n• வட்டி விகிதம்: ${interestRate}%\n• தவணைக் காலம்: ${tenureYears} ஆண்டுகள்\n• உத்தேச EMI: ₹${emi.toLocaleString('en-IN')}/மாதம்\n\nதயவுசெய்து வங்கி கடன் ஆவணங்கள் மற்றும் செயல்முறைகளைத் தெரியப்படுத்தவும்.`;
    window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto space-y-8">
      {/* தலைப்பு பேனர் */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold">
          🏛️ வங்கி & நிதி சேவைகள் 360
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          மனை & வீட்டுக் கடன் <span className="text-emerald-400">EMI கால்குலேட்டர்</span>
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          உங்கள் மாதத் தவணையை (EMI) துல்லியமாகக் கணக்கிட்டு உடனடியாக விண்ணப்பியுங்கள்
        </p>
      </div>

      {/* கால்குலேட்டர் மற்றும் முடிவு அட்டை */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
        {/* ஸ்லைடர்கள் பகுதி */}
        <div className="lg:col-span-7 space-y-6">
          {/* கடன் தொகை */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">தேவைப்படும் கடன் தொகை</span>
              <span className="text-emerald-400 font-bold text-base">₹{loanAmount.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={ranges.amount.min}
              max={ranges.amount.max}
              step={ranges.amount.step}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>{ranges.amount.minLabel}</span>
              <span>{ranges.amount.maxLabel}</span>
            </div>
          </div>

          {/* வட்டி விகிதம் */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">வட்டி விகிதம் (% ஆண்டுக்கு)</span>
              <span className="text-emerald-400 font-bold text-base">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={ranges.interest.min}
              max={ranges.interest.max}
              step={ranges.interest.step}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>{ranges.interest.minLabel}</span>
              <span>{ranges.interest.maxLabel}</span>
            </div>
          </div>

          {/* தவணை காலம் */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">தவணை காலம்</span>
              <span className="text-emerald-400 font-bold text-base">{tenureYears} ஆண்டுகள்</span>
            </div>
            <input
              type="range"
              min={ranges.tenure.min}
              max={ranges.tenure.max}
              step={ranges.tenure.step}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>{ranges.tenure.minLabel}</span>
              <span>{ranges.tenure.maxLabel}</span>
            </div>
          </div>
        </div>

        {/* முடிவு மற்றும் விண்ணப்பிக்கும் பகுதி */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider">மாதத் தவணை (EMI)</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
                ₹{emi.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-400">
                <span>அசல் தொகை:</span>
                <span className="font-semibold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>மொத்த வட்டி:</span>
                <span className="font-semibold text-amber-400">₹{totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800/80">
                <span>மொத்த திருப்பிச் செலுத்துதல்:</span>
                <span className="font-bold text-white">₹{totalPayment.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLoanApply}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>📲</span> குறைந்த வட்டியில் கடன் பெற விண்ணப்பிக்கவும்
          </button>
        </div>
      </div>
    </div>
  );
}