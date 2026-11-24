import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import businessData from '../data/businessData.json';
import { getWhatsAppUrl } from '../config';

const { BUSINESS_PRESETS: JSON_PRESETS = [] } = businessData;

const EXTRA_PRESETS = [
  {
    id: 'solar_ev_hub',
    category: 'பசுமை எரிசக்தி & EV',
    title: 'சோலார் ரூஃப்டாப் & EV சார்ஜிங் ஸ்டேஷன்',
    baseCost: 1200000,
    desc: 'நெடுஞ்சாலை மற்றும் நகர்ப்புறங்களில் மின்சார வாகன சார்ஜிங் மையம் மற்றும் சோலார் மின் உற்பத்தி அலகு.',
    monthlyProfit: '₹75,000 – ₹1,10,000',
    breakeven: '14 – 18 மாதங்கள்',
    minArea: '600 சதுர அடி',
    licenses: ['உத்யம் பதிவு (Udyam)', 'TANGEDCO மின் இணைப்பு அனுமதி', 'உள்ளாட்சி Trade License', 'GST பதிவு']
  },
  {
    id: 'masala_flour_mill',
    category: 'உணவு & மசாலா உற்பத்தி',
    title: 'மசாலா பொடி & சிறுதானிய மாவு மில்',
    baseCost: 450000,
    desc: 'மிளகாய், மல்லி, மஞ்சள் பொடி மற்றும் ராகி, கம்பு, சத்துமாவு தயாரித்து பேக்கிங் செய்யும் நவீன அலகு.',
    monthlyProfit: '₹35,000 – ₹55,000',
    breakeven: '9 – 12 மாதங்கள்',
    minArea: '350 சதுர அடி',
    licenses: ['உத்யம் பதிவு (Udyam)', 'FSSAI உணவு உரிமம்', 'உள்ளாட்சி NOC', 'பெயர் பதிவு (Trademark)']
  },
  {
    id: 'dairy_value_added',
    category: 'பால் & கால்நடை சார்ந்த தொழில்',
    title: 'மினி பால் பண்ணை & பன்னீர் / நெய் உற்பத்தி',
    baseCost: 800000,
    desc: 'பால் சேகரிப்பு, பன்னீர், தயிர், வெண்ணெய் மற்றும் சுத்தமான நெய் தயாரித்து ஹோட்டல்கள் & கடைகளுக்கு விநியோகம்.',
    monthlyProfit: '₹55,000 – ₹85,000',
    breakeven: '12 – 15 மாதங்கள்',
    minArea: '500 சதுர அடி',
    licenses: ['உத்யம் பதிவு (Udyam)', 'FSSAI மாநில உரிமம்', 'கால்நடைத் துறை சான்று', 'உள்ளாட்சி அனுமதி']
  }
];

const ALL_BUSINESS_PRESETS = [
  ...JSON_PRESETS,
  ...EXTRA_PRESETS.filter((ex) => !JSON_PRESETS.some((j) => j.id === ex.id))
];

const GOVT_SUBSIDY_SCHEMES = [
  {
    code: 'PMEGP (மத்திய அரசு)',
    name: 'பிரதமரின் வேலைவாய்ப்பு உருவாக்கும் திட்டம்',
    maxLoan: 'உற்பத்தி: ₹50 லட்சம் | சேவை: ₹20 லட்சம்',
    subsidy: 'கிராமப்புற சிறப்பு: 35% | கிராமப்புற பொது: 25% | நகர்ப்புறம்: 15%',
    eligibility: '18 வயது பூர்த்தியான அனைவரும் (8-ம் வகுப்பு தேர்ச்சி ₹10L-க்கு மேல்)',
    url: 'https://www.kviconline.gov.in/pmegpeportal/'
  },
  {
    code: 'UYEGP (தமிழ்நாடு அரசு)',
    name: 'வேலையில்லா இளைஞர்களுக்கான வேலைவாய்ப்பு உருவாக்கும் திட்டம்',
    maxLoan: '₹15 லட்சம் வரை (உற்பத்தி & சேவை)',
    subsidy: '25% நேரடி மாநில அரசு மானியம் (அதிகபட்சம் ₹3.75 லட்சம்)',
    eligibility: 'குறைந்தபட்சம் 8-ம் வகுப்பு தேர்ச்சி; குடும்ப ஆண்டு வருமானம் ₹5 லட்சத்திற்குள்',
    url: 'https://www.msmeonline.tn.gov.in/uyegp/'
  },
  {
    code: 'NEEDS (தமிழ்நாடு அரசு)',
    name: 'புதிய தொழில்முனைவோர் மற்றும் தொழில் நிறுவன மேம்பாட்டுத் திட்டம்',
    maxLoan: '₹10 லட்சம் முதல் ₹5 கோடி வரை',
    subsidy: '25% மூலதன மானியம் (அதிகபட்சம் ₹75 லட்சம் வரை) + 3% வட்டி மானியம்',
    eligibility: 'பட்டதாரி / டிப்ளமோ / ITI தேர்ச்சி பெற்ற முதல் தலைமுறை தொழில்முனைவோர்',
    url: 'https://www.msmeonline.tn.gov.in/needs/'
  },
  {
    code: 'PM MUDRA (மத்திய அரசு)',
    name: 'முத்ரா சிறு தொழில் கடன் திட்டம் (Shishu / Kishore / Tarun)',
    maxLoan: '₹50,000 முதல் ₹20 லட்சம் வரை',
    subsidy: 'அடமானமில்லா கடன் (Collateral-Free) & குறைந்த வட்டி',
    eligibility: 'சிறு வியாபாரிகள், கடைகள், பட்டறைகள் & சேவை நிறுவனங்கள்',
    url: 'https://www.jansamarth.in/'
  },
  {
    code: 'PMFME (உணவு பதப்படுத்தல்)',
    name: 'பிரதமரின் குறு உணவு பதப்படுத்தும் நிறுவனங்கள் திட்டம்',
    maxLoan: '₹10 லட்சம் முதல் ₹3 கோடி வரை',
    subsidy: '35% நேரடி மானியம் (அதிகபட்சம் ₹10 லட்சம் வரை) + பிராண்டிங் உதவி',
    eligibility: 'அரிசி, எண்ணெய், மசாலா, பேக்கரி, பழச்சாறு & உணவுத் தொழில்கள்',
    url: 'https://pmfme.mofpi.gov.in/'
  },
  {
    code: 'STAND-UP INDIA',
    name: 'மகளிர் மற்றும் SC / ST தொழில்முனைவோர் சிறப்புத் திட்டம்',
    maxLoan: '₹10 லட்சம் முதல் ₹1 கோடி வரை',
    subsidy: 'பசுமைத் தொழில் (Greenfield Enterprise) தொடங்க எளிய வங்கி கடன்',
    eligibility: 'ஒவ்வொரு வங்கிக் கிளையிலும் குறைந்தது 1 மகளிர் & 1 SC/ST தொழில்முனைவோர்',
    url: 'https://www.standupmitra.in/'
  }
];

const MSME_LICENSES = [
  {
    title: '1. உத்யம் MSME பதிவு (Udyam Registration)',
    authority: 'மத்திய சிறு, குறு மற்றும் நடுத்தரத் தொழில் அமைச்சகம்',
    fee: '100% இலவசம் (ஆன்லைன்)',
    why: 'வங்கி கடன், அரசு மானியம் மற்றும் மின் கட்டணச் சலுகைக்கு அடிப்படை ஆவணம்.',
    url: 'https://udyamregistration.gov.in/'
  },
  {
    title: '2. GST வணிக வரிப் பதிவு (GSTIN)',
    authority: 'மத்திய & மாநில சரக்கு மற்றும் சேவை வரித் துறை',
    fee: 'அரசு கட்டணம் இலவசம்',
    why: 'மாநிலம் விட்டு மாநிலம் விற்பனை செய்யவும், B2B இன்வாய்ஸ் வழங்கவும் கட்டாயம்.',
    url: 'https://www.gst.gov.in/'
  },
  {
    title: '3. FSSAI உணவு பாதுகாப்பு உரிமம்',
    authority: 'இந்திய உணவுப் பாதுகாப்பு மற்றும் தர நிர்ணய ஆணையம்',
    fee: '₹100 (Basic) / ₹2,000 (State)',
    why: 'எண்ணெய், அரிசி, மசாலா, பேக்கரி, ஹோட்டல் மற்றும் அனைத்து உணவுத் தொழில்களுக்கும் கட்டாயம்.',
    url: 'https://foscos.fssai.gov.in/'
  },
  {
    title: '4. உள்ளாட்சித் தொழில் உரிமம் (Trade License)',
    authority: 'பஞ்சாயத்து / நகராட்சி / மாநகராட்சி நிர்வாகம்',
    fee: '₹500 – ₹3,000 (ஆண்டுக்கு)',
    why: 'கடை அல்லது தொழிற்சாலை இயங்குவதற்கான உள்ளாட்சி தடையில்லா அனுமதி.',
    url: 'https://tnurbanepay.tn.gov.in/'
  },
  {
    title: '5. TNPCB மாசுக் கட்டுப்பாட்டு வாரிய NOC',
    authority: 'தமிழ்நாடு மாசுக் கட்டுப்பாட்டு வாரியம்',
    fee: 'பசுமை / வெள்ளை பிரிவுக்கு உடனடி ஒப்புதல்',
    why: 'உற்பத்தி ஆலைகள் சுற்றுச்சூழல் விதிகளுக்கு உட்பட்டு இயங்குவதற்கான சான்று.',
    url: 'https://tnocmms.nic.in/'
  },
  {
    title: '6. GeM அரசு விற்பனையாளர் பதிவு',
    authority: 'Government e-Marketplace (மத்திய அரசு)',
    fee: 'இலவசம்',
    why: 'அரசு அலுவலகங்கள் மற்றும் பொதுத்துறை நிறுவனங்களுக்கு நேரடியாகப் பொருட்களை விற்க.',
    url: 'https://gem.gov.in/'
  }
];

const MSME_PORTALS = [
  { label: 'உத்யம் MSME சான்றிதழ் (Udyam)', url: 'https://udyamregistration.gov.in/' },
  { label: 'தமிழ்நாடு MSME மானியம் (UYEGP/NEEDS)', url: 'https://www.msmeonline.tn.gov.in/' },
  { label: 'PMEGP கடன் விண்ணப்பம் (KVIC)', url: 'https://www.kviconline.gov.in/pmegpeportal/' },
  { label: 'தமிழ்நாடு ஒற்றைச் சாளர இணையதளம் (Single Window)', url: 'https://tnswp.com/' },
  { label: 'ஜன் சமர்த் மானியக் கடன் (JanSamarth)', url: 'https://www.jansamarth.in/' },
  { label: 'GeM அரசு கொள்முதல் தளம்', url: 'https://gem.gov.in/' }
];

export default function BusinessModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('launchpad'); // 'launchpad' | 'cma_engine' | 'subsidies' | 'licenses'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(ALL_BUSINESS_PRESETS[0]?.id || 'cold_press_oil');
  const [applicantType, setApplicantType] = useState('rural_special');
  const [customInvestment, setCustomInvestment] = useState(600000);
  const [loading, setLoading] = useState(false);

  // 5-Year CMA & Break-Even உள்ளீடுகள்
  const [monthlyRevenue, setMonthlyRevenue] = useState(220000);
  const [monthlyExpense, setMonthlyExpense] = useState(145000);

  // AI தொழில் ஆலோசகர் state
  const [aiAdvice, setAiAdvice] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // படிவத் தரவுகள்
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    location: '',
    landAvailability: 'சொந்த நிலம் / இடம் உள்ளது'
  });

  const filteredPresets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ALL_BUSINESS_PRESETS;
    return ALL_BUSINESS_PRESETS.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        b.desc?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const activePreset = useMemo(() => {
    return ALL_BUSINESS_PRESETS.find((b) => b.id === selectedId) || ALL_BUSINESS_PRESETS[0];
  }, [selectedId]);

  // திட்ட நிதி & மானியக் கணிப்பு
  const calculations = useMemo(() => {
    const totalCost = Number(customInvestment) || activePreset.baseCost;

    let subsidyPct = 0.25;
    let ownContributionPct = 0.10;

    if (applicantType === 'rural_special') {
      subsidyPct = 0.35;
      ownContributionPct = 0.05;
    } else if (applicantType === 'rural_general') {
      subsidyPct = 0.25;
      ownContributionPct = 0.10;
    } else {
      subsidyPct = 0.15;
      ownContributionPct = 0.10;
    }

    const ownContribution = Math.round(totalCost * ownContributionPct);
    const subsidyAmount = Math.round(totalCost * subsidyPct);
    const bankLoan = totalCost - ownContribution;
    const netEffectiveLoan = Math.max(0, bankLoan - subsidyAmount);

    return {
      totalCost,
      ownContribution,
      subsidyAmount,
      subsidyPct: Math.round(subsidyPct * 100),
      bankLoan,
      netEffectiveLoan
    };
  }, [customInvestment, activePreset, applicantType]);

  // 5-ஆண்டு CMA நிதி அட்டவணை (10% ஆண்டு வளர்ச்சி அடிப்படையில்)
  const cmaRows = useMemo(() => {
    const rows = [];
    const baseAnnualRev = (Number(monthlyRevenue) || 0) * 12;
    const baseAnnualExp = (Number(monthlyExpense) || 0) * 12;
    const annualEmi = Math.round((calculations.netEffectiveLoan * 1.1) / 5);

    for (let yr = 1; yr <= 5; yr++) {
      const growth = Math.pow(1.1, yr - 1);
      const revenue = Math.round(baseAnnualRev * growth);
      const expense = Math.round(baseAnnualExp * Math.pow(1.07, yr - 1));
      const grossProfit = revenue - expense;
      const netProfitAfterEmi = grossProfit - annualEmi;
      rows.push({ yr, revenue, expense, annualEmi, netProfitAfterEmi });
    }
    return rows;
  }, [monthlyRevenue, monthlyExpense, calculations.netEffectiveLoan]);

  const handlePresetChange = (presetId) => {
    setSelectedId(presetId);
    setAiAdvice('');
    const found = ALL_BUSINESS_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setCustomInvestment(found.baseCost);
      setMonthlyRevenue(Math.round(found.baseCost * 0.35));
      setMonthlyExpense(Math.round(found.baseCost * 0.22));
    }
  };

  const handleGetAiBusinessAdvice = async () => {
    setIsAiLoading(true);
    setAiAdvice('');
    try {
      const res = await fetch('/api/polish-petition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: {
            applicantName: leadForm.name || 'தொழில் முனைவோர்',
            taluk: leadForm.location || 'தமிழ்நாடு',
            district: leadForm.location || 'தமிழ்நாடு',
            subject: `${activePreset.title} (முதலீடு: ₹${calculations.totalCost.toLocaleString('en-IN')}, மானியம்: ${calculations.subsidyPct}%)`
          },
          selectedForm: 'MSME Business Launch & Subsidy Strategy',
          applicationMode: applicantType,
          customNote: `இந்தத் தொழிலுக்கான 1) சந்தை வாய்ப்பு & வாடிக்கையாளர் உத்தி, 2) இயந்திரம் & மூலப்பொருள் கொள்முதல் குறிப்பு, 3) PMEGP/NEEDS வங்கி மானியம் விரைந்து பெறும் வழிமுறை ஆகியவற்றை 3 சுருக்கமான பத்திகளில் தமிழ்நாடு தொழில் முனைவோருக்கு வழிகாட்டு.`
        })
      });
      const data = await res.json();
      if (data.polishedText) {
        setAiAdvice(data.polishedText);
      }
    } catch (err) {
      console.error('AI Business Advice Error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.phone || leadForm.phone.length < 10) {
      alert('தயவுசெய்து சரியான 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்.');
      return;
    }

    setLoading(true);

    try {
      fetch(
        'https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZB0YKKbWNIKD7CzSh0M0qvfkHhORCw53YMBZX1nKCB1AcSAu/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: leadForm.name || 'புதிய தொழில் முனைவோர்',
            phone: leadForm.phone,
            village: leadForm.location || 'குறிப்பிடப்படவில்லை',
            taluk: activePreset.title,
            surveyNo: `முதலீடு: ₹${(calculations.totalCost / 100000).toFixed(1)}L | மானியம்: ₹${(calculations.subsidyAmount / 100000).toFixed(1)}L`,
            feeStatus: 'இலவச தொழில் திட்ட ஆலோசனை',
            status: 'MSME & புதிய தொழில் வழிகாட்டல்'
          })
        }
      );
    } catch (err) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! நான் புதிய தொழில் தொடங்க திட்ட அறிக்கை (4-Page Bank DPR & CMA) கோருகிறேன்.\n\n👤 பெயர்: ${leadForm.name || '-'}\n📱 வாட்ஸ்அப்: ${leadForm.phone}\n📍 ஊர்: ${leadForm.location || '-'}\n🏗️ தொழில்: ${activePreset.title}\n💰 திட்ட மதிப்பு: ₹${calculations.totalCost.toLocaleString('en-IN')}\n🎁 எதிர்பார்க்கும் அரசு மானியம்: ₹${calculations.subsidyAmount.toLocaleString('en-IN')} (${calculations.subsidyPct}%)\n🏦 தேவைப்படும் வங்கி கடன்: ₹${calculations.bankLoan.toLocaleString('en-IN')}\n🏡 இட வசதி: ${leadForm.landAvailability}\n\nவங்கி ஒப்புதல் மற்றும் உத்யம் வழிகாட்டலைப் பகிரவும்.`;
    const waUrl = getWhatsAppUrl(msg);
    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="w-full space-y-8 text-left">
      {/* 1. முதன்மை பேனர் & 4-பிரிவு 360° நேவிகேஷன் */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 rounded-full">
              360° MSME & தொழில் இன்குபேட்டர் • PMEGP • UYEGP • NEEDS • MUDRA
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">
              ஸ்மார்ட் தொழில் துவக்க & வங்கி DPR சாம்ராஜ்யம்
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              15% முதல் 35% வரை அரசு மானியக் கணிப்பான், 5-ஆண்டு CMA வங்கி அறிக்கை, 4-பக்க DPR PDF, 6 அரசு மானியத் திட்டங்கள் மற்றும் அனைத்து உரிம வழிகாட்டல்.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dpr"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg transition"
            >
              📄 4-பக்க Bank DPR Studio →
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold px-3.5 py-2.5 rounded-xl text-xs cursor-pointer"
            >
              🖨️ A4 பிரிண்ட்
            </button>
          </div>
        </div>

        {/* 4 தெளிவான 360° டேப்கள் */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-6 pb-4 border-b border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('launchpad')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'launchpad'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
                : 'bg-slate-900 text-slate-200 hover:text-white border border-slate-800'
            }`}
          >
            🚀 1. தொழில் & மானிய DPR ({ALL_BUSINESS_PRESETS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cma_engine')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'cma_engine'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-200 hover:text-white border border-slate-800'
            }`}
          >
            📊 2. 5-ஆண்டு CMA & லாப அறிக்கை
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('subsidies')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'subsidies'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50'
                : 'bg-slate-900 text-slate-200 hover:text-white border border-slate-800'
            }`}
          >
            🏛️ 3. அரசு மானியத் திட்டங்கள் (6)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('licenses')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'licenses'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
                : 'bg-slate-900 text-slate-200 hover:text-white border border-slate-800'
            }`}
          >
            📜 4. உரிமங்கள் & அரசு போர்ட்டல்கள்
          </button>
        </div>

        {/* TAB 1: ஸ்மார்ட் தொழில் & மானிய DPR */}
        {activeTab === 'launchpad' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* இடதுபுறம்: தொழில் தேர்வுகள் */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  1. தொழில் வகையைத் தேர்ந்தெடுங்கள்:
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 தொழில் தேடுக (எ.கா: எண்ணெய், சோலார், மசாலா, பேப்பர்)..."
                  className="w-full mb-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {filteredPresets.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePresetChange(item.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedId === item.id
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-950/40'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-xs font-bold">{item.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-semibold shrink-0">
                          ₹{(item.baseCost / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-1">{item.category}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  2. உத்தேச மொத்த முதலீடு (ரூபாயில்):
                </label>
                <input
                  type="number"
                  min="50000"
                  step="50000"
                  value={customInvestment}
                  onChange={(e) => setCustomInvestment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  3. விண்ணப்பதாரர் வகை & மானியப் பிரிவு:
                </label>
                <select
                  value={applicantType}
                  onChange={(e) => setApplicantType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="rural_special">கிராமப்புறம் - மகளிர் / SC / ST / சிறப்புப் பிரிவு (35% மானியம்)</option>
                  <option value="rural_general">கிராமப்புறம் - பொதுப்பிரிவு (25% மானியம்)</option>
                  <option value="urban">நகர்ப்புறம் / மாநகராட்சி (15% மானியம்)</option>
                </select>
              </div>
            </div>

            {/* வலதுபுறம்: லைவ் DPR நிதி & மானிய கார்டு */}
            <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-400">{activePreset.category}</span>
                    <h3 className="text-base md:text-lg font-black text-white">{activePreset.title}</h3>
                    <p className="text-xs text-slate-200 mt-1 leading-relaxed">{activePreset.desc}</p>
                  </div>
                  <span className="text-2xl p-2 bg-slate-900 rounded-xl border border-slate-800">📊</span>
                </div>

                {/* திட்ட நிதி கணக்கீடுகள் */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-300 block">திட்ட மதிப்பு:</span>
                    <span className="text-xs font-bold text-white">₹{calculations.totalCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-400 block">அரசு மானியம் ({calculations.subsidyPct}%):</span>
                    <span className="text-xs font-bold text-emerald-300">₹{calculations.subsidyAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-blue-500/30">
                    <span className="text-[10px] text-blue-400 block">வங்கி கடன் பங்கு:</span>
                    <span className="text-xs font-bold text-blue-300">₹{calculations.bankLoan.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-amber-500/30">
                    <span className="text-[10px] text-amber-400 block">சுய முதலீடு (Own):</span>
                    <span className="text-xs font-bold text-amber-300">₹{calculations.ownContribution.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* வணிக அளவீடுகள் & உரிமங்கள் */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                  <div className="space-y-1.5 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
                    <div className="text-slate-100 text-[11px] font-semibold">📈 வணிக எதிர்பார்ப்புகள்:</div>
                    <div className="flex justify-between text-slate-300">
                      <span>உத்தேச மாத நிகர லாபம்:</span>
                      <span className="text-emerald-400 font-bold">{activePreset.monthlyProfit}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>முதலீடு திரும்ப எடுக்கும் காலம்:</span>
                      <span className="text-white font-medium">{activePreset.breakeven}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>குறைந்தபட்ச பரப்பளவு:</span>
                      <span className="text-white font-medium">{activePreset.minArea}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
                    <div className="text-slate-100 text-[11px] font-semibold">📜 தேவைப்படும் சட்டப்பூர்வ உரிமங்கள்:</div>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {activePreset.licenses.map((lic, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-emerald-400">✓</span> {lic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI தொழில் & மானிய ஆலோசனை */}
                <div className="mt-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-3 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-indigo-300">🤖 AI தொழில் & மானிய வெற்றி உத்தி</span>
                    <button
                      type="button"
                      onClick={handleGetAiBusinessAdvice}
                      disabled={isAiLoading}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition cursor-pointer"
                    >
                      {isAiLoading ? 'AI ஆய்வு செய்கிறது... ⚡' : '✨ AI தொழில் ஆலோசனை பெறுக'}
                    </button>
                  </div>
                  {aiAdvice && (
                    <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed pt-2 border-t border-indigo-500/20">
                      {aiAdvice}
                    </div>
                  )}
                </div>
              </div>

              {/* வாட்ஸ்அப் / சிஆர்எம் திட்ட அறிக்கை படிவம் */}
              <form onSubmit={handleFormSubmit} className="mt-4 pt-3 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-200 mb-2">
                  🚀 இந்தத் தொழிலுக்கான வங்கி திட்ட அறிக்கை (4-Page Bank DPR & 5-Year CMA) பெற:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="உங்கள் பெயர்"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="வாட்ஸ்அப் எண் *"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value.replace(/\D/g, '') })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="மாவட்டம் / ஊர் (எ.கா: செங்கல்பட்டு)"
                    value={leadForm.location}
                    onChange={(e) => setLeadForm({ ...leadForm, location: e.target.value })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <select
                    value={leadForm.landAvailability}
                    onChange={(e) => setLeadForm({ ...leadForm, landAvailability: e.target.value })}
                    className="w-full sm:w-auto bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 focus:outline-none focus:border-amber-500"
                  >
                    <option value="சொந்த நிலம் / இடம் உள்ளது">🏡 சொந்த நிலம் / இடம் உள்ளது</option>
                    <option value="வாடகை இடம் பார்க்க வேண்டும்">🏬 வாடகை இடம் பார்க்க வேண்டும்</option>
                    <option value="நம்ம பூமி 360 நிலம் வாங்க விருப்பம்">🎯 நம்ம பூமி மூலம் இடம் வேண்டும்</option>
                  </select>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <Link
                      href="/dpr"
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all text-center"
                    >
                      📊 4-பக்க Bank DPR PDF →
                    </Link>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      {loading ? 'தயாராகிறது...' : 'WhatsApp ஆலோசனை ↗'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: 5-ஆண்டு CMA நிதி அறிக்கை & Break-Even கணிப்பான் */}
        {activeTab === 'cma_engine' && (
          <div className="mt-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">தேர்ந்தெடுக்கப்பட்ட தொழில்:</label>
                <div className="font-bold text-amber-400 text-sm">{activePreset.title}</div>
                <span className="text-[11px] text-slate-400">
                  நிகர வங்கி கடன் (மானியம் கழித்தது): ₹{calculations.netEffectiveLoan.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">உத்தேச மாத விற்பனை வருவாய் (₹):</label>
                <input
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-emerald-400 font-bold"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">மாத இயக்கச் செலவு & மூலப்பொருள் (₹):</label>
                <input
                  type="number"
                  value={monthlyExpense}
                  onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-amber-300 font-bold"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3">ஆண்டு</th>
                    <th className="p-3">ஆண்டு மொத்த வருவாய் (₹)</th>
                    <th className="p-3">இயக்கச் செலவுகள் (₹)</th>
                    <th className="p-3">ஆண்டு வங்கி EMI (₹)</th>
                    <th className="p-3 text-emerald-400">நிகர லாபம் (Net Profit)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {cmaRows.map((row) => (
                    <tr key={row.yr} className="hover:bg-slate-900/60">
                      <td className="p-3 font-bold text-white">ஆண்டு {row.yr}</td>
                      <td className="p-3 text-slate-200">₹{row.revenue.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-amber-300">₹{row.expense.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-blue-300">₹{row.annualEmi.toLocaleString('en-IN')}</td>
                      <td className="p-3 font-black text-emerald-400">
                        ₹{row.netProfitAfterEmi.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl text-xs">
              <span className="text-slate-200">
                ✅ இந்த 5-ஆண்டு CMA நிதி அட்டவணை வங்கி மேலாளரின் DSCR & திருப்பிச் செலுத்தும் தகுதி சரிபார்ப்புக்கு நேரடியாகப் பயன்படும்.
              </span>
              <Link
                href="/dpr"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
              >
                முழு 4-பக்க Bank DPR PDF உருவாக்கு →
              </Link>
            </div>
          </div>
        )}

        {/* TAB 3: தமிழ்நாடு & மத்திய அரசு மானியத் திட்டங்கள் (6 திட்டங்கள்) */}
        {activeTab === 'subsidies' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GOVT_SUBSIDY_SCHEMES.map((sc, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-blue-500/40 flex flex-col justify-between space-y-3 transition"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30 inline-block">
                    {sc.code}
                  </span>
                  <h4 className="text-sm font-bold text-white">{sc.name}</h4>
                  <p className="text-xs text-emerald-400 font-semibold">💰 கடன் வரம்பு: {sc.maxLoan}</p>
                  <p className="text-xs text-amber-300">🎁 மானியம்: {sc.subsidy}</p>
                  <p className="text-[11px] text-slate-300 pt-1">✓ தகுதி: {sc.eligibility}</p>
                </div>

                <a
                  href={sc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold text-center transition"
                >
                  அதிகாரப்பூர்வ போர்ட்டலில் விண்ணப்பிக்க ↗
                </a>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: தொழில் உரிமங்கள் & 6 அரசு போர்ட்டல்கள் */}
        {activeTab === 'licenses' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MSME_LICENSES.map((lic, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-purple-500/40 flex flex-col justify-between space-y-2.5 transition"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{lic.title}</h4>
                    <span className="text-[11px] text-purple-300 block">{lic.authority}</span>
                    <span className="text-[11px] text-emerald-400 font-semibold block">கட்டணம்: {lic.fee}</span>
                    <p className="text-xs text-slate-300 pt-1">{lic.why}</p>
                  </div>
                  <a
                    href={lic.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-purple-600 text-purple-300 hover:text-white border border-slate-800 text-[11px] font-bold transition"
                  >
                    <span>நேரடியாகப் பதிவு செய்க</span>
                    <span>↗</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-3">
              <span className="text-xs font-bold text-emerald-400 block">
                🏛️ தமிழ்நாடு & மத்திய அரசு MSME ஒற்றைச் சாளர இணையதளங்கள்:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {MSME_PORTALS.map((portal) => (
                  <a
                    key={portal.url}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 px-3 py-2 rounded-lg text-[11px] text-slate-200 hover:text-emerald-300 transition"
                  >
                    <span>{portal.label}</span>
                    <span className="text-emerald-400 font-bold shrink-0">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. நம்ம பூமி 360° எகோசிஸ்டம் பாலம் */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('land');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🏡</span>
          <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">தொழிலுக்கு உகந்த நிலம் வேண்டுமா?</h4>
          <p className="text-xs text-slate-100">
            குடோன், பண்ணை அல்லது தொழிற்சாலை அமைக்க ₹499 சட்ட தணிக்கை செய்யப்பட்ட பாதுகாப்பான நிலங்கள்.
          </p>
          <span className="text-[11px] text-blue-400 font-bold block pt-1 underline">நம்ம பூமி நிலப்பிரிவு செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('jobs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-emerald-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">👥</span>
          <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">தொழிலுக்கு ஊழியர்கள் தேவையா?</h4>
          <p className="text-xs text-slate-100">
            பில்லிங், களப்பணி மற்றும் உற்பத்திப் பணிகளுக்கு உள்ளூர் இளைஞர்களை உடனே தேர்வு செய்யுங்கள்.
          </p>
          <span className="text-[11px] text-emerald-400 font-bold block pt-1 underline">நம்ம பூமி Jobs Hub செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('education');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-amber-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">📑</span>
          <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">கணக்கு & ஜிஎஸ்டி ஆட்டோமேஷன்</h4>
          <p className="text-xs text-slate-100">
            Advanced Excel & Tally தேர்ச்சி பெற்ற சான்றளிக்கப்பட்ட மாணவர்களைப் பணியமர்த்துங்கள்.
          </p>
          <span className="text-[11px] text-amber-400 font-bold block pt-1 underline">கல்வி மாடியூல் செல்ல ↗</span>
        </div>
      </div>
    </div>
  );
}