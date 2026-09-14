import React, { useState } from 'react';

export default function LoanModule360() {
  const [loanAmount, setLoanAmount] = useState(2500000); // ரூ. 25 லட்சம்
  const [interestRate, setInterestRate] = useState(8.75); // 8.75%
  const [tenureYears, setTenureYears] = useState(15); // 15 ஆண்டுகள்
  const adminWhatsApp = '919962369131';

  // EMI கணக்கீடு சூத்திரம்
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
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZBOYKKBWNIKD7CzSh0M0qvfkHhORCw53YMBZXlnKCB1AcSAu/exec';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'கடன் விண்ணப்பதாரர்',
          phone: 'WhatsApp தொடர்பு',
          place: `கடன்: ₹${loanAmount.toLocaleString('en-IN')}`,
          surveyNo: `EMI: ₹${emi.toLocaleString('en-IN')} (${tenureYears} வருடங்கள்)`,
          status: 'லோன் விண்ணப்பம்',
          leadType: 'வங்கிக் கடன் லீட் (Loan Lead)',
          feeStatus: 'லோன் விண்ணப்பம்',
          auditStatus: 'வங்கிக் கடன் லீட் (Loan Lead)'
        })
      });
    } catch (err) {
      console.error("Sheet saving error:", err);
    }

    // 2. வாட்ஸ்அப் மெசேஜ் அனுப்புதல்
    const message = `வணக்கம் நம்ம பூமி 360! 🏢\n\nஎனக்கு மனை / வீட்டுக் கடன் ஆலோசனை தேவைப்படுகிறது.\n\n📊 கடன் விவரம்:\n• கடன் தொகை: ₹${loanAmount.toLocaleString('en-IN')}\n• காலம்: ${tenureYears} ஆண்டுகள்\n• வட்டி விகிதம்: ${interestRate}%\n• மாத EMI: ₹${emi.toLocaleString('en-IN')}\n\nஎன் ஆவணங்களை ஆய்வு செய்து வழிகாட்டவும்.`;

    window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto space-y-8">
      {/* தலைப்பு பேனர் */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
          🏦 வங்கி & நிதி சேவைகள் 360
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          மனை & வீட்டுக் கடன் <span className="text-emerald-400">தகுதி மையம்</span>
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          உங்கள் மாதத் தவணையை (EMI) துல்லியமாகக் கணக்கிடுங்கள்; சிறந்த வட்டி விகிதத்தில் முன்னணி வங்கிகளின் கடன் ஆலோசனையைப் பெறுங்கள்.
        </p>
      </div>

      {/* கால்குலேட்டர் மற்றும் முடிவு அட்டை */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        
        {/* ஸ்லைடர்கள் பகுதி */}
        <div className="lg:col-span-7 space-y-6">
          {/* கடன் தொகை */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">தேவைப்படும் கடன் தொகை</span>
              <span className="text-emerald-400 font-bold text-base">₹ {loanAmount.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="200000"
              max="10000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>₹2 லட்சம்</span>
              <span>₹1 கோடி</span>
            </div>
          </div>

          {/* வட்டி விகிதம் */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">வட்டி விகிதம் (% ஆண்டுக்கு)</span>
              <span className="text-emerald-400 font-bold text-base">{interestRate} %</span>
            </div>
            <input
              type="range"
              min="7.5"
              max="15.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>7.5%</span>
              <span>15%</span>
            </div>
          </div>

          {/* தவணை காலம் */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">தவணை காலம் (ஆண்டுகள்)</span>
              <span className="text-emerald-400 font-bold text-base">{tenureYears} ஆண்டுகள்</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>1 வருடம்</span>
              <span>30 வருடங்கள்</span>
            </div>
          </div>
        </div>

        {/* முடிவு மற்றும் விண்ணப்பிக்கும் பகுதி */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-800/80 to-slate-900 border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-slate-700/50">
              <span className="text-xs text-slate-400 uppercase tracking-wider">தோராய மாதத் தவணை (Monthly EMI)</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
                ₹ {emi.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-300">
                <span>அசல் தொகை (Principal):</span>
                <span className="font-semibold text-white">₹ {loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>மொத்த வட்டி (Total Interest):</span>
                <span className="font-semibold text-amber-400">₹ {totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                <span>மொத்த திருப்பிச் செலுத்துதல்:</span>
                <span className="font-bold text-white">₹ {totalPayment.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLoanApply}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🏦</span> குறைந்த வட்டியில் கடன் பெற விண்ணப்பிக்க
          </button>
        </div>

      </div>
    </div>
  );
}