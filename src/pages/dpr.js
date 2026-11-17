import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getWhatsAppUrl } from '../config';

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
  const [aiSummary, setAiSummary] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateReport = async (e) => {
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

    const calculatedData = {
      totalProjectCost,
      promoterContribution,
      bankLoan,
      annualTurnover,
      netProfit,
      annualInstallment,
      dscr
    };

    setReport(calculatedData);
    setAiSummary('');
    setIsGeneratingAI(true);

    try {
      const response = await fetch('/api/generate-dpr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, report: calculatedData }),
      });
      const data = await response.json();
      if (data.aiSummary) {
        setAiSummary(data.aiSummary);
      }
    } catch (err) {
      console.error('AI DPR Fetch Error:', err);
    } finally {
      setIsGeneratingAI(false);
    }
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
    
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-16 print:min-h-0 print:bg-white print:pb-0">
      <Head>
        <title>வங்கி திட்ட அறிக்கை தயாரிப்பு மையம் (Bank DPR) | நம்ம பூமி 360</title>
      </Head>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 sticky top-0 z-50 backdrop-blur px-4 py-3 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded text-sm">நம்ம பூமி 360</span>
            <span className="text-sm font-semibold text-emerald-400">AI DPR Engine</span>
          </Link>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
            ← முகப்புப் பக்கம்
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="text-center mb-8 print:hidden">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">AI வங்கி கடன் விரிவான திட்ட அறிக்கை (DPR Generator)</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            MSME, முத்ரா, PMEGP, விவசாயம் & வணிகக் கடன்களுக்கு வங்கியாளர்கள் ஏற்கும் வகையில் நிதி மதிப்பீடுகளையும் AI திட்ட அறிக்கையையும் நொடியில் உருவாக்குங்கள்.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* படிவம் */}
          <div className="md:col-span-5 bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 shadow-lg print:hidden">
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
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-sm transition shadow-lg shadow-emerald-900/40 cursor-pointer"
              >
                AI திட்ட அறிக்கையை உருவாக்குக (Generate DPR)
              </button>
            </form>
          </div>

          {/* அறிக்கை முன்னோட்டம் (AI + Financial Preview) */}
          <div className="md:col-span-7 print:col-span-12">
            {report ? (
              <div className="bg-slate-800 print:bg-white print:text-black border border-emerald-500/40 rounded-xl p-6 shadow-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
                  <div>
                    <span className="bg-emerald-950 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-800 font-semibold">
                      நம்ம பூமி 360 - வங்கித் திட்ட அறிக்கை (DPR)
                    </span>
                    <h3 className="text-lg font-bold text-white print:text-black mt-1">
                      {formData.applicantName} — {formData.projectType}
                    </h3>
                    <p className="text-xs text-slate-400">
                      மாவட்டம்: {formData.district} | திட்டம்: {formData.scheme}
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="print:hidden bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold px-3 py-2 rounded-lg border border-slate-600 cursor-pointer"
                  >
                    🖨️ PDF சேவ் / Print
                  </button>
                </div>

                {/* நிதி அட்டவணை */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-900/80 print:bg-slate-100 p-3 rounded-lg border border-slate-700/60">
                    <div className="text-[11px] text-slate-400">மொத்த திட்டச் செலவு</div>
                    <div className="text-sm font-bold text-white print:text-black mt-0.5">₹{report.totalProjectCost.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-slate-900/80 print:bg-slate-100 p-3 rounded-lg border border-slate-700/60">
                    <div className="text-[11px] text-slate-400">விண்ணப்பதாரர் பங்கு ({formData.marginPercent}%)</div>
                    <div className="text-sm font-bold text-amber-400 print:text-amber-700 mt-0.5">₹{report.promoterContribution.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-slate-900/80 print:bg-slate-100 p-3 rounded-lg border border-slate-700/60">
                    <div className="text-[11px] text-slate-400">கோரப்படும் வங்கிக் கடன்</div>
                    <div className="text-sm font-bold text-emerald-400 print:text-emerald-700 mt-0.5">₹{report.bankLoan.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-slate-900/80 print:bg-slate-100 p-3 rounded-lg border border-slate-700/60">
                    <div className="text-[11px] text-slate-400">உத்தேச ஆண்டு விற்பனை</div>
                    <div className="text-sm font-semibold text-slate-200 print:text-black mt-0.5">₹{report.annualTurnover.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-slate-900/80 print:bg-slate-100 p-3 rounded-lg border border-slate-700/60">
                    <div className="text-[11px] text-slate-400">உத்தேச நிகர லாபம்</div>
                    <div className="text-sm font-semibold text-emerald-300 print:text-emerald-700 mt-0.5">₹{report.netProfit.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-slate-900/80 print:bg-slate-100 p-3 rounded-lg border border-slate-700/60">
                    <div className="text-[11px] text-slate-400">DSCR தகுதி விகிதம்</div>
                    <div className={`text-sm font-bold mt-0.5 ${report.dscr >= 1.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {report.dscr} {report.dscr >= 1.5 ? '(சிறந்தது)' : '(மிதமானது)'}
                    </div>
                  </div>
                </div>

                {/* AI திட்ட அறிக்கை பகுதி */}
                <div className="bg-slate-900/70 print:bg-slate-50 border border-emerald-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 print:text-emerald-800 mb-2">
                    <span>🤖</span>
                    <span>AI வங்கித் திட்ட விவர அறிக்கை (Executive Project Report)</span>
                  </div>

                  {isGeneratingAI ? (
                    <div className="py-6 text-center text-xs text-emerald-300 animate-pulse">
                      வங்கியாளர்கள் ஏற்கும் வகையில் AI திட்ட அறிக்கை தயாராகிறது... ⏳
                    </div>
                  ) : aiSummary ? (
                    <div className="text-xs sm:text-sm text-slate-200 print:text-slate-800 whitespace-pre-line leading-relaxed">
                      {aiSummary}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">திட்ட விவர அறிக்கை தயார் நிலையில் உள்ளது.</p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-700 print:hidden">
                  <button
                    onClick={handleWhatsAppShare}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-sm transition shadow-md cursor-pointer"
                  >
                    <span>முழுமையான CA சான்றொப்பமிட்ட DPR பெற வாட்ஸ்அப்பில் அனுப்புக</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-slate-700/40 border-dashed rounded-xl p-8 text-center text-slate-500 h-full flex flex-col items-center justify-center">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="text-sm font-medium text-slate-300">AI வங்கித் திட்ட அறிக்கை சுருக்கம்</h3>
                <p className="text-xs mt-1 text-slate-400">இடதுபுற படிவத்தில் விவரங்களை பூர்த்தி செய்து "AI திட்ட அறிக்கையை உருவாக்குக" என்பதை அழுத்தவும்.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}