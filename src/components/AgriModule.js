import React, { useState, useMemo } from 'react';

// 1. அதிக லாபம் தரும் பயிர் & பண்ணை மாதிரிகள்
const AGRI_MODELS = [
  {
    id: 'dragon_fruit',
    title: 'டிராகன் ஃப்ரூட் (Dragon Fruit) உயர் அடர்த்தி சாகுபடி',
    category: 'குறைந்த நீர் & அதிக லாபம்',
    soilMatch: ['செம்மண்', 'மணற்பாங்கான மண்'],
    maxTDS: 1200,
    setupCostPerAcre: 350000,
    annualNetProfit: '₹3,50,000 - ₹5,50,000 / ஏக்கர்',
    harvestCycle: '2-வது ஆண்டு முதல் 20 ஆண்டுகள் வரை',
    waterReq: 'சொட்டுநீர் பாசனம் (மிகக் குறைந்த நீர்)',
    desc: 'வறட்சியைத் தாங்கி வளரக்கூடியது. தமிழக சந்தைகளில் நிலையான கிராக்கி கொண்ட உயர் மதிப்புப் பயிர்.'
  },
  {
    id: 'integrated_coconut',
    title: 'தென்னை + மிளகு / கொக்கோ ஒருங்கிணைந்த பண்ணை',
    category: 'நீண்டகால நிலையான வருமானம்',
    soilMatch: ['செம்மண்', 'வண்டல் மண்'],
    maxTDS: 1500,
    setupCostPerAcre: 180000,
    annualNetProfit: '₹2,20,000 - ₹3,80,000 / ஏக்கர்',
    harvestCycle: 'ஆண்டு முழுவதும் தொடர் வருவாய்',
    waterReq: 'மிதமான நீர் பாசனம்',
    desc: 'தென்னை மரங்களில் மிளகு கொடிகள் மற்றும் ஊடுபயிராக கொக்கோ அல்லது தீவனப்புல் வளர்க்கும் மல்டி-லேயர் மாடல்.'
  },
  {
    id: 'jasmine_floriculture',
    title: 'குண்டு மல்லி & மலர் சாகுபடி (Drip Floriculture)',
    category: 'தினசரி பணப்புழக்கம் (Daily Cashflow)',
    soilMatch: ['செம்மண்', 'வண்டல் மண்', 'கரிசல் மண்'],
    maxTDS: 1000,
    setupCostPerAcre: 120000,
    annualNetProfit: '₹2,50,000 - ₹4,20,000 / ஏக்கர்',
    harvestCycle: 'தினசரி அறுவடை (மார்ச் - அக்டோபர் உச்சம்)',
    waterReq: 'சொட்டுநீர் உர பாசனம் (Fertigation)',
    desc: 'உள்ளூர் சந்தைகள் மற்றும் வாசனை திரவிய ஆலைகளுக்கு தினசரி விற்பனை வாய்ப்பு.'
  },
  {
    id: 'country_poultry_integrated',
    title: 'மரத்தடி நாட்டுக்கோழி + ஆடு ஒருங்கிணைந்த பண்ணை',
    category: 'ஜீரோ வேஸ்ட் ஒருங்கிணைந்த பண்ணை',
    soilMatch: ['அனைத்து மண் வகைகளும்'],
    maxTDS: 2000,
    setupCostPerAcre: 240000,
    annualNetProfit: '₹3,00,000 - ₹5,00,000 / ஏக்கர்',
    harvestCycle: 'ஒவ்வொரு 3-4 மாத சுழற்சி',
    waterReq: 'குறைந்த நீர் பயன்பாடு',
    desc: 'பண்ணை நிலத்தின் இயற்கை எரு பயன்பாட்டிற்கும், நில உரிமையாளர்களுக்கு மாதந்திர நிலையான வருமானத்திற்கும் ஏற்றது.'
  }
];

// 2. பசுமை ஓய்வூதியம் & மரப்பயிர் செல்வ கால்குலேட்டர் (Timber Wealth Presets)
const TIMBER_MODELS = [
  {
    id: 'mahogany',
    name: 'ஆப்பிரிக்க மஹாகனி (African Mahogany)',
    treesPerAcre: 300,
    growthYears: 10,
    estValuePerTree: 12000,
    desc: 'அறைக்கலன்கள் மற்றும் கதவுகளுக்கு ஏற்ற உறுதியான மரம். பராமரிப்பு மிகக் குறைவு.'
  },
  {
    id: 'teak',
    name: 'நாட்டுத் தேக்கு (Burma Teak Variety)',
    treesPerAcre: 250,
    growthYears: 15,
    estValuePerTree: 22000,
    desc: 'மதிப்புமிக்க மரப்பயிர். நீண்டகால முதலீட்டிற்கு அதிக பாதுகாப்பான சொத்து.'
  },
  {
    id: 'malabar_neem',
    name: 'மலபார் வேம்பு / மலைவேம்பு (Plywood Grade)',
    treesPerAcre: 400,
    growthYears: 6,
    estValuePerTree: 4500,
    desc: 'குறுகிய காலத்தில் (6 ஆண்டுகள்) ப்ளைவுட் ஆலைகளுக்கு விற்பனை செய்யக்கூடிய துரித மரப்பயிர்.'
  }
];

export default function AgriModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('crop_roi'); // 'crop_roi', 'soil_water', 'timber', 'subsidies'
  const [selectedCropId, setSelectedCropId] = useState('dragon_fruit');
  const [landAcres, setLandAcres] = useState(1);
  const [farmerCategory, setFarmerCategory] = useState('small_marginal'); // 'small_marginal' (100%), 'other' (75%)
  
  // மண் & நீர் TDS வடிகட்டி
  const [soilType, setSoilType] = useState('செம்மண்');
  const [waterTds, setWaterTds] = useState(650);

  // மரப்பயிர் கால்குலேட்டர்
  const [selectedTimberId, setSelectedTimberId] = useState('mahogany');
  const [timberAcres, setTimberAcres] = useState(1);

  // சிஆர்எம் படிவம்
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    district: '',
    serviceNeed: 'பயிர் திட்ட அறிக்கை & சொட்டுநீர் மானியம்'
  });
  const [loading, setLoading] = useState(false);

  const activeCrop = useMemo(() => {
    return AGRI_MODELS.find(c => c.id === selectedCropId) || AGRI_MODELS[0];
  }, [selectedCropId]);

  const activeTimber = useMemo(() => {
    return TIMBER_MODELS.find(t => t.id === selectedTimberId) || TIMBER_MODELS[0];
  }, [selectedTimberId]);

  // சொட்டு நீர் மானியக் கணக்கீடு
  const dripSubsidy = useMemo(() => {
    const baseCostPerAcre = 48000;
    const totalDripCost = baseCostPerAcre * landAcres;
    const subsidyPct = farmerCategory === 'small_marginal' ? 1.0 : 0.75;
    const subsidyAmount = Math.round(totalDripCost * subsidyPct);
    const farmerShare = totalDripCost - subsidyAmount;

    return {
      totalCost: totalDripCost,
      subsidyPct: Math.round(subsidyPct * 100),
      subsidyAmount,
      farmerShare
    };
  }, [landAcres, farmerCategory]);

  // மரப்பயிர் எதிர்கால மதிப்பு
  const timberProjection = useMemo(() => {
    const totalTrees = activeTimber.treesPerAcre * timberAcres;
    const futureValue = totalTrees * activeTimber.estValuePerTree;
    const plantingCost = totalTrees * 250; // கன்று + குழி + நடவு உத்தேச செலவு

    return {
      totalTrees,
      futureValue,
      plantingCost,
      netGain: futureValue - plantingCost
    };
  }, [activeTimber, timberAcres]);

  // மண் & நீர் TDS ஆய்வு முடிவு
  const soilWaterSuitability = useMemo(() => {
    const suitable = activeCrop.soilMatch.includes(soilType) || activeCrop.soilMatch.includes('அனைத்து மண் வகைகளும்');
    const tdsOk = waterTds <= activeCrop.maxTDS;

    return {
      isCompatible: suitable && tdsOk,
      soilStatus: suitable ? 'பொருந்துகிறது (Optimal Soil)' : 'மிதமான வளர்ச்சி மட்டுமே இருக்கும்',
      tdsStatus: tdsOk ? 'நீர் உப்புத்தன்மை பாசனத்திற்கு மிக நன்று' : 'எச்சரிக்கை: உப்பின் அளவு பயிர் வளர்ச்சியைப் பாதிக்கலாம்'
    };
  }, [activeCrop, soilType, waterTds]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.phone || leadForm.phone.length < 10) {
      alert('சரியான 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்.');
      return;
    }

    setLoading(true);

    try {
      fetch('https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZB0YKKbWNIKD7CzSh0M0qvfkHhORCw53YMBZX1nKCB1AcSAu/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name || 'விவசாயி / நில உரிமையாளர்',
          phone: leadForm.phone,
          village: leadForm.district || 'குறிப்பிடப்படவில்லை',
          taluk: activeCrop.title,
          surveyNo: `நிலம்: ${landAcres} ஏக்கர் | தேவை: ${leadForm.serviceNeed}`,
          feeStatus: 'இலவச வேளாண் ஆலோசனை',
          status: 'Agri & நவீன பண்ணை வழிகாட்டல்'
        })
      });
    } catch (err) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! நான் நவீன வேளாண் & பண்ணை ஆலோசனை கோருகிறேன்.\n\n👤 பெயர்: ${leadForm.name || '-'}\n📱 எண்: ${leadForm.phone}\n📍 மாவட்டம்: ${leadForm.district || '-'}\n🌾 தேர்ந்தெடுத்த பயிர்: ${activeCrop.title}\n📐 நில அளவு: ${landAcres} ஏக்கர்\n💧 மண் & TDS: ${soilType} | TDS ${waterTds}\n🎁 சொட்டுநீர் மானிய எதிர்பார்ப்பு: ${dripSubsidy.subsidyPct}% அரசு மானியம்\n📌 சேவை தேவை: ${leadForm.serviceNeed}\n\nஅரசு மானிய வழிகாட்டல் மற்றும் கள திட்ட அறிக்கையைப் பகிரவும்.`;
    const waUrl = `https://wa.me/919962369131?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="w-full space-y-8 text-left">
      {/* 1. முதன்மை ஹெடர் பேனர் */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/50 via-slate-900/90 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-full">
              360° நவீன வேளாண்மை • பண்ணை மேலாண்மை & அரசு மானிய ரேடார்
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">
              ஸ்மார்ட் அக்ரி & நவீன பண்ணைத் தொழில்நுட்ப மையம் (Agri Hub)
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              மண் & நீர் தரம் அறிதல், 100% அரசு சொட்டுநீர் மானியம், நீண்டகால மரப்பயிர் நிதி மற்றும் பயிர் லாப மதிப்பீடுகள் ஒரே இடத்தில்.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-emerald-500/30">
            <span className="text-3xl">🌱</span>
            <div className="text-xs">
              <span className="text-emerald-400 font-bold block">100% அரசு மானிய வழிகாட்டி</span>
              <span className="text-slate-400 text-[11px]">சொட்டுநீர் & PM-KUSUM சோலார்</span>
            </div>
          </div>
        </div>

        {/* 2. நேவிகேஷன் டேப்கள் */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('crop_roi')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'crop_roi'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🌾 பயிர் & பண்ணை லாப ரேடார்
          </button>
          <button
            onClick={() => setActiveTab('soil_water')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'soil_water'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🧪 மண் & போர்வெல் TDS ரேடார்
          </button>
          <button
            onClick={() => setActiveTab('subsidies')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'subsidies'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            💧 100% சொட்டுநீர் & சோலார் மானியம்
          </button>
          <button
            onClick={() => setActiveTab('timber')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'timber'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🌳 மரப்பயிர் நிதி (Timber Wealth)
          </button>
        </div>

        {/* 3. டேப் வாரியான உள்ளடக்கங்கள் */}
        <div className="mt-6">
          {/* TAB 1: பயிர் & பண்ணை லாப ரேடார் */}
          {activeTab === 'crop_roi' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase">
                  பயிர் வகையைத் தேர்ந்தெடுங்கள்:
                </label>
                {AGRI_MODELS.map((crop) => (
                  <button
                    key={crop.id}
                    onClick={() => setSelectedCropId(crop.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedCropId === crop.id
                        ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold">{crop.title}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">{crop.category}</div>
                  </button>
                ))}

                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    நிலத்தின் பரப்பளவு (ஏக்கரில்):
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 5].map((acres) => (
                      <button
                        key={acres}
                        onClick={() => setLandAcres(acres)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                          landAcres === acres
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {acres} ஏக்கர்
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* பயிர் விவர கார்டு */}
              <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-emerald-400">{activeCrop.category}</span>
                  <h3 className="text-lg font-black text-white">{activeCrop.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeCrop.desc}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">ஆண்டு நிகர லாபம்:</span>
                    <span className="text-xs font-bold text-emerald-400">{activeCrop.annualNetProfit}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">அறுவடை காலம்:</span>
                    <span className="text-xs font-bold text-white">{activeCrop.harvestCycle}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">பாசனத் தேவை:</span>
                    <span className="text-xs font-bold text-blue-300">{activeCrop.waterReq}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-xs space-y-1">
                  <span className="text-emerald-400 font-bold block">💡 360° எகோசிஸ்டம் உதவி:</span>
                  <p className="text-slate-300 text-[11px]">
                    இந்த சாகுபடிக்குத் தேவையான ஆட்களை நமது <strong>Jobs Hub</strong> மூலமாகவும், அறுவடை செய்யப்படும் பொருட்களை நேரடியாக சந்தைப்படுத்த நமது <strong>B2B மொத்த விற்பனைப் பிரிவு</strong> உடனும் இணைத்துத் தருகிறோம்.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: மண் & போர்வெல் TDS ரேடார் */}
          {activeTab === 'soil_water' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    மண் வகையைத் தேர்ந்தெடுங்கள்:
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    <option value="செம்மண்">செம்மண் (Red Loam - பெரும்பாலான பயிர்களுக்கு உகந்தது)</option>
                    <option value="வண்டல் மண்">வண்டல் மண் (Alluvial / Clay Loam)</option>
                    <option value="கரிசல் மண்">கரிசல் மண் (Black Soil)</option>
                    <option value="மணற்பாங்கான மண்">மணற்பாங்கான மண் (Sandy / Coastal Soil)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>போர்வெல் நீர் TDS அளவு (PPM):</span>
                    <span className="text-emerald-400">{waterTds} TDS</span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={2500}
                    step={50}
                    value={waterTds}
                    onChange={(e) => setWaterTds(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>200 (இனிப்பு நீர்)</span>
                    <span>1000 (மிதமான உப்பு)</span>
                    <span>2500 (அதிக உவர்நீர்)</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🔬</span> பரிசோதனை முடிவு & பயிர் பொருத்தம் ({activeCrop.title}):
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">மண் பொருத்தம்:</span>
                    <span className="text-xs font-bold text-emerald-400">{soilWaterSuitability.soilStatus}</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">தண்ணீர் TDS தகுதி:</span>
                    <span className={`text-xs font-bold ${waterTds <= activeCrop.maxTDS ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {soilWaterSuitability.tdsStatus}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
                  <span className="text-white font-bold block mb-1">பரிந்துரை:</span>
                  {waterTds > 1200 ? (
                    <span>உப்புநீர் அதிகமாக உள்ளதால் டிராகன் ஃப்ரூட் மற்றும் கொய்யா போன்ற சகிப்புத்தன்மை கொண்ட பயிர்களை நடுவது சிறந்தது. சொட்டுநீர் ஃபில்டர் கட்டாயம் பொருத்த வேண்டும்.</span>
                  ) : (
                    <span>உங்கள் நிலத்தின் நீர்வளம் மிகச் சிறப்பான தரத்தில் உள்ளது. காய்கறி, மலர் சாகுபடி மற்றும் நறுமணப் பயிர்கள் மிகச் சிறப்பாக விளைச்சலைத் தரும்.</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 100% சொட்டுநீர் & சோலார் மானியம் */}
          {activeTab === 'subsidies' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30">
                  <span className="text-xs font-bold text-emerald-400 block">சிறு / குறு விவசாயிகளுக்கு</span>
                  <div className="text-2xl font-black text-white mt-1">100% இலவசம்</div>
                  <p className="text-[11px] text-slate-400 mt-1">5 ஏக்கருக்கு உட்பட்ட விவசாயிகளுக்கு முழு சொட்டுநீர் பாசனக் கட்டமைப்பு இலவசம்.</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30">
                  <span className="text-xs font-bold text-blue-400 block">PM-KUSUM சோலார் பம்புசெட்</span>
                  <div className="text-2xl font-black text-white mt-1">70% வரை மானியம்</div>
                  <p className="text-[11px] text-slate-400 mt-1">தடையில்லா பகல்நேர பாசனத்திற்கு 5HP முதல் 10HP சோலார் பம்புகளுக்கு நிதி உதவி.</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
                  <span className="text-xs font-bold text-amber-400 block">பண்ணைக் குட்டை & வேலி</span>
                  <div className="text-2xl font-black text-white mt-1">₹1,00,000 வரை</div>
                  <p className="text-[11px] text-slate-400 mt-1">மழைநீர் சேகரிப்பு குட்டை மற்றும் சோலார் தொங்கு வேலி அமைப்பதற்கான அரசு உதவித்தொகை.</p>
                </div>
              </div>

              {/* சொட்டுநீர் கால்குலேட்டர் */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">உங்கள் {landAcres} ஏக்கர் நிலத்திற்கான உத்தேச மதிப்பீடு:</span>
                  <span className="text-white font-bold text-sm">மொத்த கட்டமைப்பு மதிப்பு: ₹{dripSubsidy.totalCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold block">அரசு மானியக் கழிவு: -₹{dripSubsidy.subsidyAmount.toLocaleString('en-IN')}</span>
                    <span className="text-white font-black text-xs">உங்கள் பங்கு: ₹{dripSubsidy.farmerShare.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    onClick={() => {
                      setFarmerCategory(farmerCategory === 'small_marginal' ? 'other' : 'small_marginal');
                    }}
                    className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[11px] hover:text-white"
                  >
                    பிரிவு: {farmerCategory === 'small_marginal' ? 'சிறு/குறு (100%)' : 'இதர (75%)'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: மரப்பயிர் முதலீடு (Timber Wealth) */}
          {activeTab === 'timber' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase">மரப்பயிரைத் தேர்ந்தெடுங்கள்:</label>
                {TIMBER_MODELS.map((timber) => (
                  <button
                    key={timber.id}
                    onClick={() => setSelectedTimberId(timber.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedTimberId === timber.id
                        ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{timber.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{timber.growthYears} ஆண்டுகளில் அறுவடை</div>
                  </button>
                ))}

                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">பரப்பளவு (ஏக்கர்):</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 5].map((a) => (
                      <button
                        key={a}
                        onClick={() => setTimberAcres(a)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                          timberAcres === a ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {a} ஏக்கர்
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-emerald-400">பசுமை ஓய்வூதியம் & மரப்பயிர் சேமிப்பு நிதி</span>
                  <h3 className="text-base md:text-lg font-black text-white">{activeTimber.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{activeTimber.desc}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">மொத்த மரங்கள்:</span>
                    <span className="text-xs font-bold text-white">{timberProjection.totalTrees} மரங்கள்</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">ஆரம்ப நடவுச் செலவு:</span>
                    <span className="text-xs font-bold text-amber-400">₹{timberProjection.plantingCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-400 block">{activeTimber.growthYears} ஆண்டு உத்தேச அறுவடை மதிப்பு:</span>
                    <span className="text-xs font-bold text-emerald-300">₹{timberProjection.futureValue.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-300">
                  🛡️ <strong>முதலீட்டாளர் பார்வை:</strong> நிலத்தை வேலி போட்டு சும்மா வைத்திருப்பதை விட, மஹாகனி அல்லது தேக்கு நடுவதன் மூலம் பராமரிப்பின்றி பல லட்சம் ரூபாய் எதிர்கால மூலதனமாக மாறும்.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. சிஆர்எம் & வாட்ஸ்அப் விண்ணப்பப் படிவம் */}
        <form onSubmit={handleSubmit} className="mt-6 pt-5 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-2">
            <span>🚀</span> உங்கள் நிலத்திற்கான விரிவான திட்ட அறிக்கை & மானிய வழிகாட்டல் பெற:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <input
              type="text"
              placeholder="உங்கள் பெயர்"
              value={leadForm.name}
              onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <input
              type="tel"
              maxLength={10}
              required
              placeholder="வாட்ஸ்அப் எண் *"
              value={leadForm.phone}
              onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value.replace(/\D/g, '') })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="மாவட்டம் / கிராமம் (எ.கா: செங்கல்பட்டு)"
              value={leadForm.district}
              onChange={(e) => setLeadForm({ ...leadForm, district: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <select
              value={leadForm.serviceNeed}
              onChange={(e) => setLeadForm({ ...leadForm, serviceNeed: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="100% சொட்டுநீர் மானிய விண்ணப்பம்">💧 100% சொட்டுநீர் மானிய உதவி</option>
              <option value="பயிர் திட்ட அறிக்கை & சந்தை இணைப்பு">🌾 பயிர் சாகுபடி திட்ட அறிக்கை</option>
              <option value="மரப்பயிர் நாற்றுகள் & நடவு வழிகாட்டல்">🌳 மரப்பயிர் முதலீட்டுத் திட்டம்</option>
              <option value="சோலார் பம்புசெட் (PM-KUSUM) மானியம்">☀️ PM-KUSUM சோலார் பம்புசெட்</option>
            </select>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5"
            >
              {loading ? 'தயாராகிறது...' : 'வேளாண் திட்ட சுருக்கம் பெற (WhatsApp) ↗'}
            </button>
          </div>
        </form>
      </div>

      {/* 5. நம்ம பூமி 360° எகோசிஸ்டம் பாலங்கள் (Ecosystem Links) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('land');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-emerald-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🏡</span>
          <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">விவசாய நிலம் வாங்க வேண்டுமா?</h4>
          <p className="text-xs text-slate-400">
            நீர் ஆதாரம், போர்வெல் வசதி மற்றும் ₹499 சட்ட தணிக்கை செய்யப்பட்ட விவசாய விளைநிலங்கள்.
          </p>
          <span className="text-[11px] text-emerald-400 font-bold block pt-1 underline">பூமி & நிலப்பிரிவு செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('jobs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🚜</span>
          <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">பண்ணை மேற்பார்வையாளர் தேவையா?</h4>
          <p className="text-xs text-slate-400">
            சொட்டுநீர் பராமரிப்பு, இயற்கை உரம் மற்றும் பண்ணை பணிகளுக்கு அனுபவமுள்ள உள்ளூர் ஆட்கள்.
          </p>
          <span className="text-[11px] text-blue-400 font-bold block pt-1 underline">Jobs Hub வேலைவாய்ப்பு மையம் ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('finance');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-amber-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🏦</span>
          <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">டிராக்டர் & வேளாண் கடன் தேவையா?</h4>
          <p className="text-xs text-slate-400">
            பண்ணைக் கருவிகள், சோலார் பம்புசெட் அமைப்பதற்கான குறைந்த வட்டி விவசாயக் கடன்கள்.
          </p>
          <span className="text-[11px] text-amber-400 font-bold block pt-1 underline">நிதி & கடன்கள் பிரிவு செல்ல ↗</span>
        </div>
      </div>
    </div>
  );
}