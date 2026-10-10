/**
 * Smart Loan & Banking Engine (RBI & Banking Standards)
 * FOIR (Fixed Obligation to Income Ratio) & Reverse EMI Formula
 */

export function calculateLoanEligibility({
  monthlyIncome = 0,
  existingEmi = 0,
  scheme = {},
  cibilScore = 750,
  customTenureYears = null
}) {
  const income = Number(monthlyIncome) || 0;
  const currentEmi = Number(existingEmi) || 0;
  const cibil = Number(cibilScore) || 750;

  const minIncome = scheme.minIncome || 20000;
  const foirLimit = scheme.foirLimit || 0.50;
  const interestRate = scheme.interestRate || 8.5;
  const tenureYears = customTenureYears || scheme.maxTenureYears || 15;
  const tenureMonths = tenureYears * 12;

  // 1. அதிகபட்ச அனுமதிக்கப்பட்ட EMI வரம்பு (FOIR)
  const maxAllowedEmi = income * foirLimit;

  // 2. எஞ்சிய நிகர EMI திறன்
  const availableEmi = maxAllowedEmi - currentEmi;

  // 3. குறைந்த வருமானம் பரிசோதனை
  if (income < minIncome) {
    return {
      status: "REJECTED",
      reason: `குறைந்தபட்ச மாத வருமானம் ₹${minIncome.toLocaleString('en-IN')} தேவை.`,
      solutions: [
        "குடும்ப உறுப்பினர் ஒருவரை உடன்-விண்ணப்பதாரராக (Co-applicant) இணைக்கலாம்.",
        "கூடுதல் வருமானச் சான்றுகளை (வாடகை/விவசாய வருமானம்) சமர்ப்பிக்கலாம்."
      ],
      maxEligibleAmount: 0,
      monthlyEmi: 0
    };
  }

  // 4. நடப்பு தவணைச் சுமை பரிசோதனை
  if (availableEmi <= 1000) {
    return {
      status: "HIGH_OBLIGATION",
      reason: "தற்போதுள்ள மாதாந்திர கடன் தவணைகள் வருமான வரம்பை (FOIR) நிறைவு செய்துவிட்டன.",
      solutions: [
        "சிறிய தனிநபர் கடன்கள் அல்லது கிரெடிட் கார்டு நிலுவைகளை முன்கூட்டியே அடைக்கலாம்.",
        "கடன் தவணைக் காலத்தை (Tenure) அதிகப்படுத்திக் கேட்கலாம்."
      ],
      maxEligibleAmount: 0,
      monthlyEmi: 0
    };
  }

  // 5. தலைகீழ் EMI கணக்கீடு (Loan Present Value Formula)
  const monthlyRate = interestRate / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const eligibleLoanAmount = Math.floor(availableEmi * ((factor - 1) / (monthlyRate * factor)));

  let cibilStatus = "EXCELLENT";
  let cibilNote = "சிறந்த CIBIL ஸ்கோர்! மிகக் குறைந்த வட்டியில் உடனடி ஒப்புதல் சாத்தியம்.";
  if (cibil < (scheme.minCibil || 650)) {
    cibilStatus = "LOW_CIBIL";
    cibilNote = "CIBIL ஸ்கோர் வங்கியின் குறைந்தபட்ச வரம்பை விட குறைவாக உள்ளது.";
  }

  return {
    status: "APPROVED",
    schemeName: scheme.title || scheme.name,
    maxEligibleAmount: eligibleLoanAmount > 0 ? eligibleLoanAmount : 0,
    monthlyEmi: Math.round(availableEmi),
    tenureYears,
    interestRate,
    cibilStatus,
    cibilNote,
    requiredDocs: scheme.requiredDocs || [],
    solutions: [
      "வங்கி கணக்கு அறிக்கையில் சீரான நிதிப் பரிவர்த்தனையை உறுதிப்படுத்தவும்.",
      "அனைத்து மூல ஆவணங்களையும் தயாராக வைத்திருக்கவும்."
    ]
  };
}