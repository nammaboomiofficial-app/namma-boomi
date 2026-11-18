import { askGemini } from '../../lib/gemini';

function buildFiveYearCMA(report) {
  const baseTurnover = Number(report.annualTurnover) || 0;
  const baseNetProfit = Number(report.netProfit) || 0;
  const totalProjectCost = Number(report.totalProjectCost) || 0;
  const promoterContribution = Number(report.promoterContribution) || 0;
  const bankLoan = Number(report.bankLoan) || 0;

  const profitMargin = baseTurnover > 0 ? baseNetProfit / baseTurnover : 0.18;
  const depreciationRate = 0.10;
  const fixedAssetsBase = Math.round(totalProjectCost * 0.70);
  const annualPrincipalRepayment = Math.round(bankLoan / 5);
  const interestRate = 0.11;

  const years = [];
  let cumulativeReserves = 0;
  let closingTermLoan = bankLoan;

  for (let yr = 1; yr <= 5; yr++) {
    // 1. Projected Profit & Loss (12% YoY Revenue Growth)
    const growthFactor = Math.pow(1.12, yr - 1);
    const grossSales = Math.round(baseTurnover * growthFactor);
    const netProfit = yr === 1 ? Math.round(baseNetProfit) : Math.round(grossSales * profitMargin);
    const depreciation = Math.round(fixedAssetsBase * Math.pow(1 - depreciationRate, yr - 1) * depreciationRate);

    const openingLoan = closingTermLoan;
    const interestOnTermLoan = Math.round(openingLoan * interestRate);
    const principalRepayment = openingLoan > 0 ? Math.min(annualPrincipalRepayment, openingLoan) : 0;
    closingTermLoan = Math.max(0, openingLoan - principalRepayment);

    const totalOperatingExpenses = Math.max(0, grossSales - netProfit - depreciation - interestOnTermLoan);

    // 2. DSCR Calculation: (Net Profit + Depreciation + Interest) / (Interest + Principal)
    const cashAccrualsForDSCR = netProfit + depreciation + interestOnTermLoan;
    const totalDebtObligation = interestOnTermLoan + principalRepayment;
    const dscr = totalDebtObligation > 0
      ? Number((cashAccrualsForDSCR / totalDebtObligation).toFixed(2))
      : 0;

    // 3. Projected Cash Flow Statement
    const netCashAccruals = netProfit + depreciation;
    const netCashFlow = netCashAccruals - principalRepayment;

    // 4. Projected Balance Sheet
    cumulativeReserves += netProfit;
    const netFixedAssets = Math.max(0, Math.round(fixedAssetsBase * Math.pow(1 - depreciationRate, yr)));
    const totalLiabilities = promoterContribution + cumulativeReserves + closingTermLoan;
    const currentAssetsAndCash = Math.max(0, totalLiabilities - netFixedAssets);

    years.push({
      year: `Year ${yr}`,
      // P&L
      grossSales,
      totalOperatingExpenses,
      depreciation,
      interestOnTermLoan,
      netProfit,
      // Cash Flow & DSCR
      netCashAccruals,
      principalRepayment,
      netCashFlow,
      dscr,
      // Balance Sheet
      promoterCapital: promoterContribution,
      reservesAndSurplus: cumulativeReserves,
      closingTermLoan,
      totalLiabilities,
      netFixedAssets,
      currentAssetsAndCash,
      totalAssets: netFixedAssets + currentAssetsAndCash,
    });
  }

  const avgDscr = Number(
    (years.reduce((sum, item) => sum + item.dscr, 0) / years.length).toFixed(2)
  );

  return {
    currency: 'INR',
    assumptions: {
      annualRevenueGrowth: '12%',
      depreciationMethod: '10% WDV',
      interestRate: '11% p.a.',
      repaymentTenure: '5 Years',
    },
    averageDscr: avgDscr,
    projections: years,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formData, report } = req.body;

    if (!formData || !report) {
      return res.status(400).json({ error: 'திட்ட விவரங்கள் முழுமையாக இல்லை.' });
    }

    const cmaData = buildFiveYearCMA(report);
    const y1 = cmaData.projections[0];
    const y5 = cmaData.projections[4];

    const prompt = `நீ "நம்ம பூமி 360" தளத்தின் மூத்த வங்கித் திட்ட அறிக்கை (MSME & Bank DPR) ஆலோசகர்.
கீழ்க்கண்ட தொழில் திட்டத்திற்கு வங்கி மேலாளர் (Bank Manager) கடன் ஒப்புதல் அளிக்கும் வகையில், மிக நேர்த்தியான, தொழில்முறைத் தமிழில் (எந்த மார்க்டவுன் குறியீடுகளும் #, *, ** இல்லாமல்) ஒரு சுருக்கமான திட்ட அறிக்கை (Executive DPR & 5-Year CMA Note) தயாரித்துக் கொடு:

விண்ணப்பதாரர்: ${formData.applicantName}
மாவட்டம்: ${formData.district}
திட்ட வகை: ${formData.projectType}
கடன் திட்டம்: ${formData.scheme}
மொத்த திட்ட மதிப்பு: ₹${Number(report.totalProjectCost).toLocaleString('en-IN')}
விண்ணப்பதாரர் பங்கு: ₹${Number(report.promoterContribution).toLocaleString('en-IN')}
கோரப்படும் வங்கிக் கடன்: ₹${Number(report.bankLoan).toLocaleString('en-IN')}
முதலாம் ஆண்டு விற்பனை: ₹${y1.grossSales.toLocaleString('en-IN')} | 5-ஆம் ஆண்டு விற்பனை: ₹${y5.grossSales.toLocaleString('en-IN')}
முதலாம் ஆண்டு நிகர லாபம்: ₹${y1.netProfit.toLocaleString('en-IN')} | 5-ஆம் ஆண்டு நிகர லாபம்: ₹${y5.netProfit.toLocaleString('en-IN')}
சராசரி 5-வருட DSCR விகிதம்: ${cmaData.averageDscr} (முதலாம் ஆண்டு DSCR: ${y1.dscr})

கீழ்க்கண்ட 5 தலைப்புகளில் தெளிவாக எழுது:
1. திட்ட அறிமுகம் & நோக்கம்
2. சந்தை வாய்ப்பு & வருவாய் சாத்தியக்கூறு
3. தொழில்நுட்பம் & செயல்பாட்டுத் திட்டம்
4. 5-வருட CMA நிதி வளர்ச்சி & லாபகரத்தன்மை மதிப்பீடு
5. வங்கிக் கடன் திருப்பிச் செலுத்தும் தகுதி (5-Year DSCR பகுப்பாய்வு)`;

    const aiSummary = await askGemini(prompt, 'pro', 'dpr project report');

    return res.status(200).json({ aiSummary, cmaData });
  } catch (error) {
    console.error('DPR AI Error:', error);
    return res.status(500).json({
      error: error.message || 'திட்ட அறிக்கை உருவாக்குவதில் பிழை ஏற்பட்டது.'
    });
  }
}