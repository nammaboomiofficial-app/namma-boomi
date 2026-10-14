import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function BankDPR() {
  const [formData, setFormData] = useState({
    applicantName: '',
    phone: '',
    district: '',
    projectType: 'விவசாயம் / பண்ணை (Dairy/Agri)',
    scheme: 'PMEGP (மானியம் வரை 35%)',
    landCost: '',
    buildingCost: '',
    machineryCost: '',
    workingCapital: '',
    marginPercent: '15'
  });

  const [report, setReport] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateReport = (e) => {
    e.preventDefault();
    const land = parseFloat(formData.landCost) || 0;
    const building = parseFloat(formData.buildingCost) || 0;
    const machinery = parseFloat(formData.machineryCost) || 0;
    const working = parseFloat(formData.workingCapital) || 0;

    const totalProjectCost = land + building + machinery + working;
    if (totalProjectCost <= 0) {
      alert("தயவுசெய்து சரியான தொகையை உள்ளிடவும்.");
      return;
    }

    const marginPct = parseFloat(formData.marginPercent) / 100;
    const promoterContribution = Math.round(totalProjectCost * marginPct);
    const bankLoan = totalProjectCost - promoterContribution;

    // உத்தேச 5 ஆண்டு வருடாந்திர கணக்கீடு (Bank Formula Logic)
    const annualTurnover = Math.round(totalProjectCost * 1.25);
    const operatingExpenses = Math.round(annualTurnover * 0.70);
    const grossProfit = annualTurnover - operatingExpenses;
    const interestAndDepreciation = Math.round(bankLoan * 0.12);
    const netProfit = grossProfit - interestAndDepreciation;
    
    // DSCR விகிதம் (Debt Service Coverage Ratio)
    const annualInstallment = Math.round((bankLoan / 5) + (bankLoan * 0.09));
    const dscr = (netProfit / annualInstallment).toFixed(2);

    setReport({
      totalProjectCost,
      promoterContribution,
      bankLoan,
      annualTurnover,
      netProfit,
      annualInstallment,
      dscr
    });
  };

  const handleWhatsAppShare = () => {
    if (!report) return;
    const msg = `*வணக்கம் நம்ம பூமி 360 (Bank DPR Request)*%0A%0A` +
      `*விண்ணப்பதாரர்:* ${formData.applicantName}%0A` +
      `*மொபைல்:* ${formData.phone}%0A` +
      `*மாவட்டம்:* ${formData.district}%0A` +
      `*திட்ட வகை:* ${formData.projectType}%0A` +
      `*திட்டம்/மானியம்:* ${formData.scheme}%0A` +
      `--------------------------------%0A` +
      `*மொத்த திட்ட மதிப்பு:* ₹${report.totalProjectCost.toLocaleString('en-IN')}%0A` +
      `*விண்ணப்பதாரர் பங்கு:* ₹${report.promoterContribution.toLocaleString('en-IN')}%0A` +
      `*கோரப்படும் வங்கிக் கடன்:* ₹${report.bankLoan.toLocaleString('en-IN')}%0A` +
      `*உத்தேச ஆண்டு நிகர லாபம்:* ₹${report.netProfit.toLocaleString('en-IN')}%0A` +
      `*கடன் ஏற்பு விகிதம் (DSCR):* ${report.dscr}%0A` +
      `--------------------------------%0A` +
      `வங்கி ஏற்புத் தகுதியுள்ள முழுமையான திட்ட அறிக்கை (DPR PDF) தயாரித்துத் தரக் கோருகிறேன்.`;
    
    window.open(`https://wa.me/919940000000?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-16">
      <Head>
        <title>வங்கி திட்ட அறிக்கை தயாரிப்பு மையம் (Bank DPR) | நம்ம பூமி 360</title>
      </Head>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 sticky top-0 z-50 backdrop-blur px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded text-sm">நம்ம பூமி 360</span>
            <span className="text-sm font-semibold text-emerald-400">DPR Engine</span>
          </Link>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
            ← முகப்புப் பக்கம்
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">வங்கி கடன் விரிவான திட்ட அறிக்கை (DPR Generator)</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            MSME, முத்ரா, PMEGP, விவசாயம் & வணிகக் கடன்களுக்கு வங்கியாளர்கள் ஏற்கும் வகையில் நிதி மதிப்பீடுகளை நொடியில் உருவாக்குங்கள்.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* படிவம் */}
          <div className="md:col-span-7 bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 shadow-lg">
            <h2 className="text-base font-semibold text-emerald-400 border-b border-slate-700 pb-2 mb-4">
              1. திட்ட விவர உள்ளீடு (Project Details)
            </h2>

            <form onSubmit={calculateReport} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">விண்ணப்பதாரர் பெயர் *</label>
                <input
                  type="text"
                  name="applicantName"
                  required
                  placeholder="எ.கா: சு. உதயகுமார்"
                  value={formData.applicantName}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">கைபேசி எண் *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">மாவட்டம் *</label>
                  <input
                    type="text"
                    name="district"
                    required
                    placeholder="எ.கா: செங்கல்பட்டு"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">திட்ட வகை</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>விவசாயம் / பண்ணை (Dairy/Agri)</option>
                    <option>உற்பத்தித் தொழில் (Manufacturing)</option>
                    <option>சேவை & வர்த்தகம் (Retail / Services)</option>
                    <option>உணவு பதப்படுத்துதல் (Food Processing)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">கடன் திட்டம்</label>
                  <select
                    name="scheme"
                    value={formData.scheme}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>PMEGP (மானியம் வரை 35%)</option>
                    <option>முத்ரா கடன் (MUDRA - Tarun)</option>
                    <option>MSME Term Loan</option>
                    <option>விவசாயக் கடன் / NABARD</option>
                  </select>
                </div>
              </div>

              <h2 className="text-base font-semibold text-emerald-400 border-b border-slate-700 pb-2 pt-2 mb-2">
                2. முதலீட்டு மதிப்பீடு (ரூபாயில்)
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">நிலம் / மேம்பாட்டுச் செலவு</label>
                  <input
                    type="number"
                    name="landCost"
                    placeholder="0"
                    value={formData.landCost}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">கட்டிடம் / கொட்டகை</label>
                  <input
                    type="number"
                    name="buildingCost"
                    placeholder="0"
                    value={formData.buildingCost}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">இயந்திரங்கள் & கருவிகள்</label>
                  <input
                    type="number"
                    name="machineryCost"
                    placeholder="0"
                    value={formData.machineryCost}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">செயல்பாட்டு மூலதனம் (Working Cap)</label>
                  <input
                    type="number"
                    name="workingCapital"
                    placeholder="0"
                    value={formData.workingCapital}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">உங்கள் பங்குத் தொகை விகிதம் (Margin Money)</label>
                <select
                  name="marginPercent"
                  value={formData.marginPercent}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="10">10% (PMEGP Special Category)</option>
                  <option value="15">15% (வழக்கமான வரம்பு)</option>
                  <option value="20">20%</option>
                  <option value="25">25% (வங்கி பரிந்துரை)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-sm transition shadow-lg shadow-emerald-900/40"
              >
                நிதி அறிக்கையைக் கணக்கிடுக (Calculate DPR)
              </button>
            </form>
          </div>

          {/* அறிக்கை முன்னோட்டம் (Draft Preview) */}
          <div className="md:col-span-5">
            {report ? (
              <div className="bg-slate-800 border border-emerald-500/40 rounded-xl p-5 sticky top-20 shadow-xl">
                <span className="bg-emerald-950 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-800 font-semibold">
                  உத்தேச வங்கி மதிப்பீடு (Draft DPR)
                </span>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-700/60 pb-2">
                    <span className="text-xs text-slate-400">மொத்த திட்டச் செலவு:</span>
                    <span className="text-sm font-bold text-white">₹{report.totalProjectCost.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-slate-700/60 pb-2">
                    <span className="text-xs text-slate-400">விண்ணப்பதாரர் பங்கு ({formData.marginPercent}%):</span>
                    <span className="text-sm font-bold text-amber-400">₹{report.promoterContribution.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-slate-700/60 pb-2">
                    <span className="text-xs text-slate-400">கோரப்படும் கடன் (Loan):</span>
                    <span className="text-sm font-bold text-emerald-400">₹{report.bankLoan.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-slate-700/60 pb-2">
                    <span className="text-xs text-slate-400">உத்தேச ஆண்டு விற்பனை:</span>
                    <span className="text-sm font-medium text-slate-200">₹{report.annualTurnover.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-slate-700/60 pb-2">
                    <span className="text-xs text-slate-400">உத்தேச நிகர லாபம் (ஆண்டுக்கு):</span>
                    <span className="text-sm font-semibold text-emerald-300">₹{report.netProfit.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between items-center pb-1">
                    <span className="text-xs text-slate-400">கடன் திருப்பிச் செலுத்தும் திறன் (DSCR):</span>
                    <span className={`text-sm font-bold ${report.dscr >= 1.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {report.dscr} {report.dscr >= 1.5 ? '(சிறந்தது)' : '(மிதமானது)'}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700">
                  <button
                    onClick={handleWhatsAppShare}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-sm transition shadow-md"
                  >
                    <span>முழுமையான DPR PDF பெற வாட்ஸ்அப்பில் அனுப்புக</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    வங்கியாளர்கள் மற்றும் தணிக்கையாளர் (CA) சரிபார்த்த 10-15 பக்க முழுமையான திட்ட அறிக்கை தயாரிக்கப்படும்.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-slate-700/40 border-dashed rounded-xl p-8 text-center text-slate-500 h-full flex flex-col items-center justify-center">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="text-sm font-medium text-slate-300">நிதி அறிக்கை சுருக்கம்</h3>
                <p className="text-xs mt-1 text-slate-400">இடதுபுற படிவத்தில் விவரங்களை பூர்த்தி செய்து "நிதி அறிக்கையைக் கணக்கிடுக" என்பதை அழுத்தவும்.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}