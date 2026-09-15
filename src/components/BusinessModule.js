import React, { useState, useMemo } from 'react';

// அதிநவீன தொழில் யோசனைகள் & நிதி அளவீடுகள்
const BUSINESS_PRESETS = [
  {
    id: 'cold_press_oil',
    title: 'மரச்செக்கு எண்ணெய் உற்பத்தி (Cold Pressed Oil)',
    category: 'விவசாய & உணவு உற்பத்தி',
    baseCost: 600000,
    minArea: '300 சதுர அடி',
    licenses: ['உத்யம் பதிவு (Udyam)', 'FSSAI உணவு உரிமம்', 'உள்ளாட்சி தொழில் உரிமம்'],
    monthlyProfit: '₹45,000 - ₹70,000',
    breakeven: '10 - 14 மாதங்கள்',
    desc: 'கிரவுண்ட்நட், எள், தேங்காய் எண்ணெய் செக்கு யூனிட். கிராமப்புறங்களில் 35% PMEGP மானியத்திற்கு உகந்தது.'
  },
  {
    id: 'agro_warehouse',
    title: 'மினி தானிய சேமிப்புக் குடோன் & பேக்கிங்',
    category: 'சேமிப்பு & தளவாடங்கள்',
    baseCost: 1200000,
    minArea: '1200 சதுர அடி (சொந்த/வாடகை நிலம்)',
    licenses: ['உத்யம் பதிவு', 'வணிக வரி (GST)', 'தீயணைப்பு தடையில்லா சான்று (Fire NOC)'],
    monthlyProfit: '₹75,000 - ₹1,20,000',
    breakeven: '14 - 18 மாதங்கள்',
    desc: 'விவசாய விளைபொருட்களைப் பாதுகாத்து விநியோகிக்கும் கிடங்கு. நில உரிமையாளர்களுக்கு நிலையான மாத வாடகை வருவாய்.'
  },
  {
    id: 'organic_fertilizer',
    title: 'மண்புழு உரம் & பயோ-உர தயாரிப்பு மையம்',
    category: 'சுற்றுச்சூழல் & இயற்கை வேளாண்மை',
    baseCost: 350000,
    minArea: '500 சதுர அடி',
    licenses: ['உத்யம் பதிவு', 'வேளாண் துறை உர விற்பனை உரிமம்'],
    monthlyProfit: '₹30,000 - ₹55,000',
    breakeven: '8 - 12 மாதங்கள்',
    desc: 'குறைந்த முதலீடு, அதிக தேவை. மகளிர் குழுக்கள் மற்றும் கிராமப்புற இளைஞர்களுக்கு மிகச் சிறந்த தொழில்.'
  },
  {
    id: 'paper_packaging',
    title: 'பேப்பர் பை & பயோ-பேக்கேஜிங் உற்பத்தி',
    category: 'சுற்றுச்சூழல் நட்பு சிறுதொழில்',
    baseCost: 800000,
    minArea: '400 சதுர அடி',
    licenses: ['உத்யம் பதிவு', 'GST', 'மாசுக்கட்டுப்பாட்டு வாரிய அனுமதி (PCB Green Category)'],
    monthlyProfit: '₹50,000 - ₹85,000',
    breakeven: '12 - 16 மாதங்கள்',
    desc: 'பிளாஸ்டிக் தடை அமலில் உள்ளதால் துணிக்கடைகள், உணவகங்களுக்கான பேப்பர் பைகளுக்கு தொடர் மார்க்கெட் உண்டு.'
  },
  {
    id: 'solar_cold_storage',
    title: 'சூரிய மின்சார சிறு குளிர்பதனக் கிடங்கு (Solar Cold Room)',
    category: 'அக்ரி-டெக் & பசுமை ஆற்றல்',
    baseCost: 1500000,
    minArea: '600 சதுர அடி',
    licenses: ['உத்யம் பதிவு', 'மின்வாரிய அனுமதி (TANGEDCO Solar Net-Metering)', 'FSSAI'],
    monthlyProfit: '₹90,000 - ₹1,50,000',
    breakeven: '18 - 24 மாதங்கள்',
    desc: 'காய்கறிகள், பூக்கள் மற்றும் பால் பொருட்களை சேமிக்க உதவும் திட்டம். மத்திய/மாநில அரசு மூலதன மானியம் உண்டு.'
  }
];

export default function BusinessModule({ setCurrentModule }) {
  const [selectedId, setSelectedId] = useState('cold_press_oil');
  const [applicantType, setApplicantType] = useState('rural_special'); // 'rural_special' (35%), 'rural_general' (25%), 'urban' (15%)
  const [customInvestment, setCustomInvestment] = useState(600000);
  const [loading, setLoading] = useState(false);

  // படிவத் தரவுகள்
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    location: '',
    landAvailability: 'சொந்த நிலம் / இடம் உள்ளது'
  });

  const activePreset = useMemo(() => {
    return BUSINESS_PRESETS.find((b) => b.id === selectedId) || BUSINESS_PRESETS[0];
  }, [selectedId]);

  // திட்ட நிதி & மானியக் கணிப்பு (Live DPR Calculations)
  const calculations = useMemo(() => {
    const totalCost = Number(customInvestment) || activePreset.baseCost;

    // மானிய சதவீதம் (PMEGP / NEEDS விதிப்படி)
    let subsidyPct = 0.25;
    let ownContributionPct = 0.10;

    if (applicantType === 'rural_special') {
      subsidyPct = 0.35; // கிராமப்புற பெண்கள் / சிறப்புப் பிரிவு: 35% மானியம்
      ownContributionPct = 0.05; // 5% சொந்த முதலீடு
    } else if (applicantType === 'rural_general') {
      subsidyPct = 0.25; // கிராமப்புற பொதுப்பிரிவு: 25% மானியம்
      ownContributionPct = 0.10;
    } else {
      subsidyPct = 0.15; // நகர்ப்புறம்: 15% மானியம்
      ownContributionPct = 0.10;
    }

    const ownContribution = Math.round(totalCost * ownContributionPct);
    const subsidyAmount = Math.round(totalCost * subsidyPct);
    const bankLoan = totalCost - ownContribution;

    return {
      totalCost,
      ownContribution,
      subsidyAmount,
      subsidyPct: Math.round(subsidyPct * 100),
      bankLoan
    };
  }, [customInvestment, activePreset, applicantType]);

  const handlePresetChange = (presetId) => {
    setSelectedId(presetId);
    const found = BUSINESS_PRESETS.find((p) => p.id === presetId);
    if (found) setCustomInvestment(found.baseCost);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.phone || leadForm.phone.length < 10) {
      alert('தயவுசெய்து சரியான 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்.');
      return;
    }

    setLoading(true);

    try {
      fetch('https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZB0YKKbWNIKD7CzSh0M0qvfkHhORCw53YMBZX1nKCB1AcSAu/exec', {
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
      });
    } catch (err) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! நான் புதிய தொழில் தொடங்க திட்ட அறிக்கை (Project Summary) கோருகிறேன்.\n\n👤 பெயர்: ${leadForm.name || '-'}\n📱 வாட்ஸ்அப்: ${leadForm.phone}\n📍 ஊர்: ${leadForm.location || '-'}\n🏗️ தொழில்: ${activePreset.title}\n💰 திட்ட மதிப்பு: ₹${calculations.totalCost.toLocaleString('en-IN')}\n🎁 எதிர்பார்க்கும் அரசு மானியம்: ₹${calculations.subsidyAmount.toLocaleString('en-IN')} (${calculations.subsidyPct}%)\n🏦 தேவைப்படும் வங்கி கடன்: ₹${calculations.bankLoan.toLocaleString('en-IN')}\n🏡 இட வசதி: ${leadForm.landAvailability}\n\nவங்கி ஒப்புதல் மற்றும் உத்யம் வழிகாட்டலைப் பகிரவும்.`;
    const waUrl = `https://wa.me/919962369131?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. முதன்மை பேனர் */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 rounded-full">
              360° MSME & தொழில் இன்குபேட்டர் • அரசு மானிய ரேடார்
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">
              ஸ்மார்ட் தொழில் துவக்க தளம் (Business Launchpad & DPR)
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              தொழில் யோசனை, 25% முதல் 35% வரை நேரடி அரசு மானியம், வங்கி கடன் மற்றும் சட்டப்பூர்வ உரிமங்களுக்கான ஒருங்கிணைந்த வழிகாட்டி.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-950 px-4 py-2 rounded-xl border border-amber-500/30">
            <span className="text-2xl">🏛️</span>
            <div className="text-xs">
              <span className="text-amber-400 font-bold block">PMEGP / NEEDS / முத்ரா</span>
              <span className="text-slate-400 text-[11px]">100% அரசு அங்கீகரிக்கப்பட்ட நடைமுறை</span>
            </div>
          </div>
        </div>

        {/* 2. தொழில் யோசனை தெரிவு & நிதி மதிப்பீடு */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* இடதுபுறம்: தொழில் தேர்வுகள் (Selector) */}
          <div className="lg:col-span-5 space-y-4">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              1. தொழில் வகையைத் தேர்ந்தெடுங்கள்:
            </label>
            <div className="space-y-2">
              {BUSINESS_PRESETS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePresetChange(item.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedId === item.id
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-950/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold">{item.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-semibold">
                      ₹{(item.baseCost / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">{item.category}</div>
                </button>
              ))}
            </div>

            {/* முதலீட்டாளர் வகை & மானிய ஸ்விட்ச் */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. விண்ணப்பதாரர் வகை & மானியப் பிரிவு:
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

          {/* வலதுபுறம்: லைவ் DPR நிதி & மானிய கார்டு (Live DPR Card) */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-semibold text-amber-400">{activePreset.category}</span>
                  <h3 className="text-base md:text-lg font-black text-white">{activePreset.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{activePreset.desc}</p>
                </div>
                <span className="text-2xl p-2 bg-slate-900 rounded-xl border border-slate-800">📊</span>
              </div>

              {/* திட்ட நிதி கணக்கீடுகள் (Financial Breakdown) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">திட்ட மதிப்பு:</span>
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
                  <div className="text-slate-400 text-[11px] font-semibold">📈 வணிக எதிர்பார்ப்புகள்:</div>
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
                  <div className="text-slate-400 text-[11px] font-semibold">📜 தேவைப்படும் சட்டப்பூர்வ உரிமங்கள்:</div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {activePreset.licenses.map((lic, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-emerald-400">✓</span> {lic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* வாட்ஸ்அப் / சிஆர்எம் திட்ட அறிக்கை படிவம் */}
            <form onSubmit={handleFormSubmit} className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-200 mb-2">
                🚀 இந்தத் தொழிலுக்கான இலவச வங்கி திட்ட அறிக்கை (DPR Summary) பெற:
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

              <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <select
                  value={leadForm.landAvailability}
                  onChange={(e) => setLeadForm({ ...leadForm, landAvailability: e.target.value })}
                  className="w-full sm:w-auto bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 focus:outline-none focus:border-amber-500"
                >
                  <option value="சொந்த நிலம் / இடம் உள்ளது">🏡 சொந்த நிலம் / இடம் உள்ளது</option>
                  <option value="வாடகை இடம் பார்க்க வேண்டும்">🏬 வாடகை இடம் பார்க்க வேண்டும்</option>
                  <option value="நம்ம பூமி 360 நிலம் வாங்க விருப்பம்">🎯 நம்ம பூமி மூலம் இடம் வேண்டும்</option>
                </select>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  {loading ? 'தயாராகிறது...' : 'DPR திட்ட சுருக்கம் பெற (WhatsApp) ↗'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. நம்ம பூமி 360° எகோசிஸ்டம் பாலம் (Interactive Links) */}
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
          <p className="text-xs text-slate-400">
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
          <p className="text-xs text-slate-400">
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
          <p className="text-xs text-slate-400">
            Advanced Excel & Tally தேர்ச்சி பெற்ற சான்றளிக்கப்பட்ட மாணவர்களைப் பணியமர்த்துங்கள்.
          </p>
          <span className="text-[11px] text-amber-400 font-bold block pt-1 underline">கல்வி மாடியூல் செல்ல ↗</span>
        </div>
      </div>
      </div>
  );
}