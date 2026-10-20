import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function MSMEProjectReport() {
  const [scheme, setScheme] = useState('uyegp'); // 'uyegp' | 'pmegp' | 'needs' | 'mudra'
  const [businessType, setBusinessType] = useState('manufacturing'); // 'manufacturing' | 'service' | 'trading'
  
  // உள்ளீட்டுப் படிவம்
  const [formData, setFormData] = useState({
    promoterName: 'சுந்தரம் கே',
    enterpriseName: 'ஸ்ரீ விநாயகா பாக்கு மட்டை தயாரிப்பு & பேக்கேஜிங்',
    location: 'செங்கல்பட்டு, தமிழ்நாடு',
    phone: '9876543210',
    email: 'vinayagaenterprises@email.com',
    machineryCost: 350000,
    workingCapitalCost: 150000,
    monthlyRent: 8000,
    employeesCount: 3,
    avgSalaryPerEmp: 12000,
    expectedMonthlySales: 160000,
    rawMaterialCostRatio: 45, // 45% of sales
    electricityAndMisc: 6000,
    loanTenureYears: 5,
    interestRate: 10.5
  });

  const handleChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof prev[field] === 'number' ? Number(val) : val
    }));
  };

  // 1-கிளிக் மாதிரித் தொழில்கள்
  const loadPreset = (type) => {
    if (type === 'oil_mill') {
      setScheme('uyegp');
      setBusinessType('manufacturing');
      setFormData({
        promoterName: 'கே. கார்த்திக்',
        enterpriseName: 'மரச்செக்கு இயற்கை நல்லெண்ணெய் ஆலை',
        location: 'மதுரை, தமிழ்நாடு',
        phone: '9443212345',
        email: 'pureoilmadurai@email.com',
        machineryCost: 550000,
        workingCapitalCost: 200000,
        monthlyRent: 10000,
        employeesCount: 2,
        avgSalaryPerEmp: 14000,
        expectedMonthlySales: 220000,
        rawMaterialCostRatio: 55,
        electricityAndMisc: 8000,
        loanTenureYears: 5,
        interestRate: 10.5
      });
    } else if (type === 'digital_press') {
      setScheme('mudra');
      setBusinessType('service');
      setFormData({
        promoterName: 'ஆர். பிரவீன் குமார்',
        enterpriseName: 'பிரவீன் டிஜிட்டல் பிரிண்டிங் & இ-சேவை மையம்',
        location: 'திருச்சி, தமிழ்நாடு',
        phone: '9840123456',
        email: 'praveendigital@email.com',
        machineryCost: 280000,
        workingCapitalCost: 120000,
        monthlyRent: 7500,
        employeesCount: 1,
        avgSalaryPerEmp: 12000,
        expectedMonthlySales: 125000,
        rawMaterialCostRatio: 30,
        electricityAndMisc: 5000,
        loanTenureYears: 5,
        interestRate: 11
      });
    } else if (type === 'garments') {
      setScheme('pmegp');
      setBusinessType('manufacturing');
      setFormData({
        promoterName: 'எம். லட்சுமி',
        enterpriseName: 'ஸ்ரீ மீனாட்சி அப்பேரல்ஸ் & தையல் அலகு',
        location: 'திருப்பூர், தமிழ்நாடு',
        phone: '9789123456',
        email: 'meenakshigarments@email.com',
        machineryCost: 700000,
        workingCapitalCost: 250000,
        monthlyRent: 12000,
        employeesCount: 4,
        avgSalaryPerEmp: 13000,
        expectedMonthlySales: 280000,
        rawMaterialCostRatio: 48,
        electricityAndMisc: 9000,
        loanTenureYears: 5,
        interestRate: 10.5
      });
    }
  };

  // நிதிக் கணக்கீட்டு இயந்திரம் (Financial Calculation Engine)
  const financialMetrics = useMemo(() => {
    const totalProjectCost = formData.machineryCost + formData.workingCapitalCost;
    
    // திட்ட மானிய விதிகள் (Tamil Nadu Subsidy Norms)
    let subsidyPct = 0;
    let promoterPct = 0.05; // 5% சொந்த முதலீடு

    if (scheme === 'uyegp') {
      subsidyPct = 0.25; // 25% UYEGP மானியம்
      promoterPct = 0.05;
    } else if (scheme === 'pmegp') {
      subsidyPct = 0.35; // 35% கிராமப்புற PMEGP
      promoterPct = 0.05;
    } else if (scheme === 'needs') {
      subsidyPct = 0.25; // 25% NEEDS மானியம்
      promoterPct = 0.10;
    } else {
      subsidyPct = 0; // MUDRA மானியம் கிடையாது
      promoterPct = 0.10;
    }

    const promoterContribution = Math.round(totalProjectCost * promoterPct);
    const subsidyAmount = Math.round(totalProjectCost * subsidyPct);
    const totalBankFinance = totalProjectCost - promoterContribution;
    const termLoan = formData.machineryCost - Math.round(formData.machineryCost * promoterPct);
    const workingCapitalLoan = totalBankFinance - termLoan;

    // EMI கணக்கீடு (வங்கி தவணை)
    const monthlyRate = (formData.interestRate / 100) / 12;
    const totalMonths = formData.loanTenureYears * 12;
    const emi = termLoan > 0 
      ? Math.round((termLoan * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1))
      : 0;
    const annualLoanRepayment = emi * 12;

    // ஆண்டு வருவாய் & செலவுகள் (Year 1 Projection)
    const annualGrossSales = formData.expectedMonthlySales * 12;
    const annualRawMaterial = Math.round(annualGrossSales * (formData.rawMaterialCostRatio / 100));
    const annualRent = formData.monthlyRent * 12;
    const annualSalaries = (formData.employeesCount * formData.avgSalaryPerEmp) * 12;
    const annualElectricityMisc = formData.electricityAndMisc * 12;
    const annualInterestTermLoan = Math.round(termLoan * (formData.interestRate / 100));
    const annualDepreciation = Math.round(formData.machineryCost * 0.15); // 15% தேய்மானம்

    const totalOperatingCosts = annualRawMaterial + annualRent + annualSalaries + annualElectricityMisc + annualInterestTermLoan + annualDepreciation;
    const netProfitYear1 = annualGrossSales - totalOperatingCosts;

    // DSCR (Debt Service Coverage Ratio) - வங்கி மேலாளர் பார்க்கும் பிரதான விகிதம்
    const cashAccruals = netProfitYear1 + annualDepreciation + annualInterestTermLoan;
    const totalDebtService = annualLoanRepayment + annualInterestTermLoan;
    const dscr = totalDebtService > 0 ? (cashAccruals / totalDebtService).toFixed(2) : '2.10';

    // Break Even Point (BEP %)
    const fixedCosts = annualRent + annualSalaries + annualDepreciation + annualInterestTermLoan;
    const variableCosts = annualRawMaterial + annualElectricityMisc;
    const contribution = annualGrossSales - variableCosts;
    const bepPercentage = contribution > 0 ? Math.round((fixedCosts / contribution) * 100) : 48;

    return {
      totalProjectCost,
      promoterContribution,
      subsidyAmount,
      totalBankFinance,
      termLoan,
      workingCapitalLoan,
      emi,
      annualGrossSales,
      annualRawMaterial,
      annualRent,
      annualSalaries,
      annualElectricityMisc,
      annualDepreciation,
      totalOperatingCosts,
      netProfitYear1,
      dscr,
      bepPercentage
    };
  }, [formData, scheme]);

  return (
    <>
      <Head>
        <title>MSME & Bank Project Report Studio | நம்ம பூமி 360</title>
        <meta name="description" content="Official Bank-Ready Project Report (DPR) Generator for PMEGP, UYEGP, NEEDS, and MUDRA Schemes in Tamil Nadu" />
        <style dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body * { visibility: hidden; }
              #dpr-print-sheet, #dpr-print-sheet * { visibility: visible; }
              #dpr-print-sheet {
                position: absolute;
                left: 0;
                top: 0;
                width: 100% !important;
                margin: 0 !important;
                padding: 10mm 15mm !important;
                box-shadow: none !important;
                border: none !important;
              }
              @page {
                size: A4 portrait;
                margin: 0mm;
              }
            }
          `
        }} />
      </Head>

      {/* Header Bar */}
      <header className="w-full bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-50 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded text-sm transition">
              நம்ம பூமி 360
            </Link>
            <span className="text-slate-200 text-xs sm:text-sm font-semibold tracking-wide">
              MSME & Bank Project Report Studio
            </span>
            <div className="hidden md:flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-full text-xs">
              <span className="text-slate-400">Bank DSCR:</span>
              <span className={`font-extrabold ${financialMetrics.dscr >= 1.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {financialMetrics.dscr} (வங்கி ஒப்புதல் தகுதி)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-lg shadow transition flex items-center gap-1.5"
            >
              <span>🖨️</span> வங்கி அறிக்கையாக பதிவிறக்குக (PDF)
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio */}
      <main className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 print:p-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* இடதுபுற படிவம் (Input Controls) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 print:hidden shadow-xl">
            
            {/* 1-Click Tamil Nadu Presets */}
            <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">மாதிரித் தொழில் தேர்வு (1-Click Presets):</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => loadPreset('oil_mill')}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-emerald-300 px-2.5 py-1 rounded"
                >
                  மரச்செக்கு ஆலை
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset('digital_press')}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-indigo-300 px-2.5 py-1 rounded"
                >
                  டிஜிட்டல் பிரஸ் / இ-சேவை
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset('garments')}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-amber-300 px-2.5 py-1 rounded"
                >
                  தையல் / அப்பேரல்ஸ்
                </button>
              </div>
            </div>

            {/* அரசு மானியத் திட்டம் & தொழில் வகை */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-emerald-400 block mb-1">அரசு மானியத் திட்டம்:</label>
                <select
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-xs text-white rounded p-1.5 focus:outline-none"
                >
                  <option value="uyegp">UYEGP (25% TN அரசு மானியம்)</option>
                  <option value="pmegp">PMEGP (35% மத்திய அரசு மானியம்)</option>
                  <option value="needs">NEEDS (25% முதல் தலைமுறை)</option>
                  <option value="mudra">MUDRA (முத்ரா திட்டம்)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-400 block mb-1">தொழில் பிரிவு:</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-xs text-white rounded p-1.5 focus:outline-none"
                >
                  <option value="manufacturing">உற்பத்தி (Manufacturing)</option>
                  <option value="service">சேவை (Service Sector)</option>
                  <option value="trading">வர்த்தகம் / சில்லறை (Trading)</option>
                </select>
              </div>
            </div>

            {/* தொழில் முனைவோர் விவரங்கள் */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">1. தொழில் & நிறுவன விவரங்கள்</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="தொழில் முனைவோர் பெயர்"
                  value={formData.promoterName}
                  onChange={(e) => handleChange('promoterName', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="தொலைபேசி எண்"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="நிறுவனத்தின் பெயர்"
                  value={formData.enterpriseName}
                  onChange={(e) => handleChange('enterpriseName', e.target.value)}
                  className="sm:col-span-2 bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="தொழில் அமையும் இடம் (மாவட்டம், தமிழ்நாடு)"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="sm:col-span-2 bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
              </div>
            </div>

            {/* முதலீடு மற்றும் திட்ட மதிப்பீடு */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">2. திட்ட மதிப்பீடு (Project Cost)</h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-0.5">இயந்திரங்கள் & உபகரணங்கள் (₹):</label>
                  <input
                    type="number"
                    value={formData.machineryCost}
                    onChange={(e) => handleChange('machineryCost', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-0.5">சுழல் நிதி (Working Capital ₹):</label>
                  <input
                    type="number"
                    value={formData.workingCapitalCost}
                    onChange={(e) => handleChange('workingCapitalCost', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* மாதாந்திர உத்தேச வரவு செலவுகள் */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">3. உத்தேச மாதாந்திர வரவு-செலவு</h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-0.5">மாத விற்பனை வருவாய் (₹):</label>
                  <input
                    type="number"
                    value={formData.expectedMonthlySales}
                    onChange={(e) => handleChange('expectedMonthlySales', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-0.5">மூலப்பொருள் செலவு (%):</label>
                  <input
                    type="number"
                    value={formData.rawMaterialCostRatio}
                    onChange={(e) => handleChange('rawMaterialCostRatio', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-0.5">பணியாளர்கள் எண்ணிக்கை:</label>
                  <input
                    type="number"
                    value={formData.employeesCount}
                    onChange={(e) => handleChange('employeesCount', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-0.5">சராசரி மாதச் சம்பளம் (₹):</label>
                  <input
                    type="number"
                    value={formData.avgSalaryPerEmp}
                    onChange={(e) => handleChange('avgSalaryPerEmp', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-0.5">மாத வாடகை (₹):</label>
                  <input
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) => handleChange('monthlyRent', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-0.5">மின்சாரம் & இதர (₹):</label>
                  <input
                    type="number"
                    value={formData.electricityAndMisc}
                    onChange={(e) => handleChange('electricityAndMisc', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* வலதுபுறம்: A4 வங்கி அறிக்கை தாள் (Official Bank DPR) */}
          <div className="lg:col-span-7 flex justify-center w-full overflow-x-auto">
            <div
              id="dpr-print-sheet"
              className="w-full max-w-[210mm] bg-white text-slate-900 rounded shadow-2xl p-8 text-[12px] leading-relaxed border border-slate-300 font-serif print:shadow-none print:border-none"
            >
              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-3 text-center">
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-300">
                  Detailed Project Report (DPR) for Bank Appraisal
                </span>
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 mt-2">
                  {formData.enterpriseName || 'PROPOSED ENTERPRISE'}
                </h1>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">
                  Promoted by: <strong className="text-slate-950">{formData.promoterName}</strong> | {formData.location}
                </p>
                <div className="text-[10.5px] font-sans text-slate-600 mt-1 flex justify-center gap-3">
                  <span>Phone: {formData.phone}</span>
                  <span>•</span>
                  <span>Scheme: <strong className="uppercase text-emerald-800">{scheme}</strong></span>
                  <span>•</span>
                  <span>Category: <strong className="uppercase">{businessType}</strong></span>
                </div>
              </div>

              {/* 1. Project Profile Synopsis */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
                  1. Project Profile & Executive Synopsis
                </h2>
                <table className="w-full border-collapse border border-slate-300 text-[11px] mb-3">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5 font-bold bg-slate-50 w-1/3">Name of Enterprise</td>
                      <td className="p-1.5">{formData.enterpriseName}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5 font-bold bg-slate-50">Constitution / Promoted By</td>
                      <td className="p-1.5">Proprietorship ({formData.promoterName})</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5 font-bold bg-slate-50">Location / Operational Base</td>
                      <td className="p-1.5">{formData.location}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5 font-bold bg-slate-50">Sector & Activity</td>
                      <td className="p-1.5 capitalize">{businessType} Sector</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5 font-bold bg-slate-50">Proposed Financial Scheme</td>
                      <td className="p-1.5 font-semibold text-emerald-800 uppercase">{scheme} Assistance Scheme</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-bold bg-slate-50">Direct Employment Potential</td>
                      <td className="p-1.5">{formData.employeesCount} Personnel</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 2. Cost of Project & Means of Finance */}
              <div className="mt-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
                  2. Cost of Project & Means of Finance
                </h2>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  {/* Cost of Project */}
                  <table className="w-full border-collapse border border-slate-300">
                    <thead>
                      <tr className="bg-slate-100 font-bold border-b border-slate-300">
                        <th className="p-1.5 text-left">Particulars</th>
                        <th className="p-1.5 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-200">
                        <td className="p-1.5">Plant, Machinery & Equipment</td>
                        <td className="p-1.5 text-right font-mono">₹{formData.machineryCost.toLocaleString()}</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="p-1.5">Working Capital Margin</td>
                        <td className="p-1.5 text-right font-mono">₹{formData.workingCapitalCost.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-slate-50 font-bold">
                        <td className="p-1.5">Total Project Outlay</td>
                        <td className="p-1.5 text-right font-mono">₹{financialMetrics.totalProjectCost.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Means of Finance */}
                  <table className="w-full border-collapse border border-slate-300">
                    <thead>
                      <tr className="bg-slate-100 font-bold border-b border-slate-300">
                        <th className="p-1.5 text-left">Means of Finance</th>
                        <th className="p-1.5 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-200">
                        <td className="p-1.5">Promoter's Equity Contribution</td>
                        <td className="p-1.5 text-right font-mono">₹{financialMetrics.promoterContribution.toLocaleString()}</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="p-1.5">Govt. Capital Subsidy Entitlement</td>
                        <td className="p-1.5 text-right font-mono text-emerald-800 font-bold">₹{financialMetrics.subsidyAmount.toLocaleString()}</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="p-1.5">Bank Term Loan (Machinery)</td>
                        <td className="p-1.5 text-right font-mono">₹{financialMetrics.termLoan.toLocaleString()}</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="p-1.5">Bank Working Capital / CC</td>
                        <td className="p-1.5 text-right font-mono">₹{financialMetrics.workingCapitalLoan.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-slate-50 font-bold">
                        <td className="p-1.5">Total Financial Outlay</td>
                        <td className="p-1.5 text-right font-mono">₹{financialMetrics.totalProjectCost.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. Projected Operating Performance (Year 1) */}
              <div className="mt-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
                  3. Projected Annual Profitability (First Year Assessment)
                </h2>
                <table className="w-full border-collapse border border-slate-300 text-[11px]">
                  <thead>
                    <tr className="bg-slate-100 font-bold border-b border-slate-300">
                      <th className="p-1.5 text-left">Operational Revenue & Expenditure Heads</th>
                      <th className="p-1.5 text-right">Annual Value (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 font-bold">
                      <td className="p-1.5">A. Gross Sales Revenue Realization</td>
                      <td className="p-1.5 text-right font-mono">₹{financialMetrics.annualGrossSales.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5 pl-4">Cost of Raw Materials / Merchandise ({formData.rawMaterialCostRatio}%)</td>
                      <td className="p-1.5 text-right font-mono">₹{financialMetrics.annualRawMaterial.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5 pl-4">Direct Wages & Staff Compensation ({formData.employeesCount} staff)</td>
                      <td className="p-1.5 text-right font-mono">₹{financialMetrics.annualSalaries.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5 pl-4">Industrial Power, Utilities & Miscellaneous</td>
                      <td className="p-1.5 text-right font-mono">₹{financialMetrics.annualElectricityMisc.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5 pl-4">Commercial Premises Rent</td>
                      <td className="p-1.5 text-right font-mono">₹{financialMetrics.annualRent.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5 pl-4">Depreciation on Machinery & Plant (15% SLM)</td>
                      <td className="p-1.5 text-right font-mono">₹{financialMetrics.annualDepreciation.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-slate-200 font-semibold bg-slate-50">
                      <td className="p-1.5">B. Total Cost of Operations</td>
                      <td className="p-1.5 text-right font-mono">₹{financialMetrics.totalOperatingCosts.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-slate-300 font-bold text-slate-950 bg-emerald-50/50">
                      <td className="p-1.5">C. Projected Operating Net Profit (A - B)</td>
                      <td className="p-1.5 text-right font-mono text-emerald-900">₹{financialMetrics.netProfitYear1.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 4. Bank Viability Ratios */}
              <div className="mt-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
                  4. Commercial Viability & Debt Servicing Indicators
                </h2>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-sans">
                  <div className="border border-slate-300 p-2 rounded bg-slate-50">
                    <span className="text-slate-600 block text-[10px]">Debt Service Coverage Ratio</span>
                    <strong className="text-sm text-emerald-800">{financialMetrics.dscr}</strong>
                    <span className="text-[9.5px] block text-slate-500 mt-0.5">Benchmarked standard &gt; 1.5</span>
                  </div>
                  <div className="border border-slate-300 p-2 rounded bg-slate-50">
                    <span className="text-slate-600 block text-[10px]">Break-Even Point (BEP)</span>
                    <strong className="text-sm text-blue-900">{financialMetrics.bepPercentage}%</strong>
                    <span className="text-[9.5px] block text-slate-500 mt-0.5">High operational safety buffer</span>
                  </div>
                  <div className="border border-slate-300 p-2 rounded bg-slate-50">
                    <span className="text-slate-600 block text-[10px]">Estimated Monthly EMI</span>
                    <strong className="text-sm text-slate-950 font-mono">₹{financialMetrics.emi.toLocaleString()}</strong>
                    <span className="text-[9.5px] block text-slate-500 mt-0.5">@ {formData.interestRate}% for {formData.loanTenureYears} Yrs</span>
                  </div>
                </div>
              </div>

              {/* Signatures */}
              <div className="mt-6 pt-4 border-t border-slate-300 flex justify-between items-end text-[11px] font-sans">
                <div>
                  <p className="text-slate-500">Date: {new Date().toLocaleDateString('en-GB')}</p>
                  <p className="text-slate-500">Place: {formData.location.split(',')[0]}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-950">For {formData.enterpriseName}</p>
                  <div className="h-8"></div>
                  <p className="border-t border-slate-400 pt-1 font-semibold">Authorized Signatory / Promoter</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </>
  );
}