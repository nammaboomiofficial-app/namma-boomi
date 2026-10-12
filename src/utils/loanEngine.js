import loansData from '../data/loansData.json';

export function calculateLoanEligibility({
  monthlyIncome = 0,
  existingEmi = 0,
  scheme = {},
  cibilScore = 750,
  tenureYears = 15
}) {
  const config = loansData.calculatorConfig || {};
  const { cibilMultipliers = [], defaultFoir = 0.5 } = config;

  // 1. சிபில் பெருக்கல் காரணி
  const matchedBracket = cibilMultipliers.find(
    (b) => cibilScore >= b.min && cibilScore <= b.max
  );
  const cibilFactor = matchedBracket ? matchedBracket.factor : 0.5;

  // 2. FOIR அடிப்படையில் நிகரத் திறன்
  const maxAllowableEmi = monthlyIncome * defaultFoir;
  const availableEmiCapacity = Math.max(0, maxAllowableEmi - existingEmi);
  const adjustedMonthlyCapacity = availableEmiCapacity * cibilFactor;

  // 3. வட்டி மற்றும் கால அளவு
  const annualInterestRate = scheme.interestRate || 8.5;
  const monthlyInterestRate = annualInterestRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  let maxLoanAmount = 0;
  let estimatedEmi = 0;

  // 4. துல்லியமான கடன் தொகை (எந்த செயற்கை ரவுண்டிங்கும் இல்லாமல்)
  if (monthlyInterestRate > 0 && totalMonths > 0 && adjustedMonthlyCapacity > 0) {
    const compoundFactor = Math.pow(1 + monthlyInterestRate, totalMonths);
    maxLoanAmount = Math.round(
      adjustedMonthlyCapacity * ((compoundFactor - 1) / (monthlyInterestRate * compoundFactor))
    );

    estimatedEmi = Math.round(
      (maxLoanAmount * monthlyInterestRate * compoundFactor) / (compoundFactor - 1)
    );
  }

  const isEligible = maxLoanAmount >= 10000 && cibilScore >= 650;

  return {
    maxLoanAmount,
    estimatedEmi,
    eligible: isEligible,
    cibilStatus: matchedBracket?.status || 'மதிப்பீடு தேவை'
  };
}