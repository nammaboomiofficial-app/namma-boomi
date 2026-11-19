import React, { useState, useMemo } from 'react';
import agriData from '../data/agriData.json';
const { AGRI_MODELS, TIMBER_MODELS } = agriData;
import { getWhatsAppUrl } from '../config';

const AGRI_GOVT_PORTALS = [
  { label: 'தமிழ்நாடு வேளாண்மைத் துறை (TNAgrisnet)', url: 'https://www.tnagrisnet.tn.gov.in/' },
  { label: 'தோட்டக்கலை & சொட்டுநீர் மானியம் (TN Horticulture)', url: 'https://tnhorticulture.tn.gov.in/' },
  { label: 'தினசரி மண்டி & காய்கறி விலை (Agmarknet)', url: 'https://agmarknet.gov.in/' },
  { label: 'பி.எம். கிசான் நிதி உதவி (PM-KISAN)', url: 'https://pmkisan.gov.in/' }
];

export default function AgriModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('crop_roi');
  const [selectedCropId, setSelectedCropId] = useState('dragon_fruit');
  const [landAcres, setLandAcres] = useState(1);
  const [farmerCategory, setFarmerCategory] = useState('small_marginal');

  // மண் & நீர் TDS வடிகட்டி
  const [soilType, setSoilType] = useState('செம்மண்');
  const [waterTds, setWaterTds] = useState(650);

  // மரப்பயிர் கால்குலேட்டர்
  const [selectedTimberId, setSelectedTimberId] = useState('mahogany');
  const [timberAcres, setTimberAcres] = useState(1);

  // உடனடி பண்ணைத் திட்ட அறிக்கை
  const [farmPlanReport, setFarmPlanReport] = useState('');

  // சிஆர்எம் படிவம்
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    district: '',
    serviceNeed: '100% சொட்டுநீர் மானிய விண்ணப்பம்'
  });
  const [loading, setLoading] = useState(false);

  const activeCrop = useMemo(() => {
    return AGRI_MODELS.find((c) => c.id === selectedCropId) || AGRI_MODELS[0];
  }, [selectedCropId]);

  const activeTimber = useMemo(() => {
    return TIMBER_MODELS.find((t) => t.id === selectedTimberId) || TIMBER_MODELS[0];
  }, [selectedTimberId]);

  // சொட்டு நீர் மானியக் கணக்கீடு
  const dripSubsidy = useMemo(() => {
    const baseCostPerAcre = 48000;
    const totalDripCost = Math.round(baseCostPerAcre * landAcres);
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
    const totalTrees = Math.round(activeTimber.treesPerAcre * timberAcres);
    const futureValue = totalTrees * activeTimber.estValuePerTree;
    const plantingCost = totalTrees * 250;

    return {
      totalTrees,
      futureValue,
      plantingCost,
      netGain: futureValue - plantingCost
    };
  }, [activeTimber, timberAcres]);

  // மண் & நீர் TDS ஆய்வு முடிவு
  const soilWaterSuitability = useMemo(() => {
    const suitable =
      activeCrop.soilMatch.includes(soilType) ||
      activeCrop.soilMatch.includes('அனைத்து மண் வகைகளும்');
    const tdsOk = waterTds <= activeCrop.maxTDS;

    return {
      isCompatible: suitable && tdsOk,
      soilStatus: suitable ? 'பொருந்துகிறது (Optimal Soil)' : 'மிதமான வளர்ச்சி மட்டுமே இருக்கும்',
      tdsStatus: tdsOk
        ? 'நீர் உப்புத்தன்மை பாசனத்திற்கு மிக நன்று'
        : 'எச்சரிக்கை: உப்பின் அளவு பயிர் வளர்ச்சியைப் பாதிக்கலாம்'
    };
  }, [activeCrop, soilType, waterTds]);

  // 0.01 விநாடியில் விரிவான பண்ணைத் திட்ட அறிக்கை உருவாக்கம்
  const handleGenerateFarmPlan = () => {
    const intercropTip =
      soilType === 'கரிசல் மண்'
        ? 'பருத்தி, உளுந்து, பாசிப்பயறு அல்லது சின்ன வெங்காயம் ஊடுபயிராகச் சாகுபடி செய்யலாம்.'
        : 'நிலக்கடலை, தட்டைப்பயறு, மல்லி அல்லது குறுகிய காலக் கீரை வகைகளை ஊடுபயிராகச் சாகுபடி செய்து ஆரம்ப 6 மாதப் பராமரிப்புச் செலவை ஈடுகட்டலாம்.';

    const waterAdvice =
      waterTds > 1200
        ? `போர்வெல் நீர் ${waterTds} TDS ஆக உள்ளதால், சொட்டுநீர் குழாய்களில் உப்பு அடைப்பைத் தவிர்க்க டிஸ்க் ஃபில்டர் (Disc Filter) மற்றும் வாரம் ஒருமுறை அமில சுத்திகரிப்பு (Acid Flush) அவசியம்.`
        : `போர்வெல் நீர் ${waterTds} TDS அளவில் மிகத் தரமாக உள்ளது. துல்லியமான சொட்டுநீர் உரப்பாசனம் (Fertigation) மூலம் 30% கூடுதல் மகசூல் பெறலாம்.`;

    const reportText = `நம்ம பூமி 360° — ஒருங்கிணைந்த பண்ணை & வேளாண் திட்ட அறிக்கை
---------------------------------------------------------------------
1. நிலம் & பயிர் விவரம்:
   • தேர்ந்தெடுத்த பயிர்: ${activeCrop.title} (${activeCrop.category})
   • சாகுபடி பரப்பளவு: ${landAcres} ஏக்கர் | மண் வகை: ${soilType}
   • நீர் தரம் (TDS): ${waterTds} PPM — ${soilWaterSuitability.tdsStatus}
   • எதிர்பார்க்கப்படும் ஆண்டு நிகர லாபம் (1 ஏக்கர் அடிப்படை): ${activeCrop.annualNetProfit}

2. பாசனம் & அரசு மானிய மதிப்பீடு:
   • ${landAcres} ஏக்கர் சொட்டுநீர் அமைப்பு உத்தேச மதிப்பு: ₹${dripSubsidy.totalCost.toLocaleString('en-IN')}
   • அரசு மானியம் (${dripSubsidy.subsidyPct}% - ${farmerCategory === 'small_marginal' ? 'சிறு/குறு விவசாயி' : 'இதர விவசாயி'}): ₹${dripSubsidy.subsidyAmount.toLocaleString('en-IN')}
   • விவசாயி செலுத்த வேண்டிய பங்குத் தொகை: ₹${dripSubsidy.farmerShare.toLocaleString('en-IN')}

3. வேளாண் தொழில்நுட்பப் பரிந்துரைகள்:
   • ஊடுபயிர் மேலாண்மை: ${intercropTip}
   • நீர் மேலாண்மை: ${waterAdvice}
   • வரப்பு ஓர மரப்பயிர் (Agro-Forestry): நிலத்தின் எல்லை ஓரங்களில் ${activeTimber.name} நடுவதன் மூலம் நீண்டகால மூலதன பாதுகாப்பும் காற்றுத் தடுப்பும் கிடைக்கும்.

4. விண்ணப்பிக்க வேண்டிய ஆவணங்கள் (TN Horticulture / Agriculture):
   • கணினி பட்டா, சிட்டா, அடங்கல், ஆதார் அட்டை, வங்கிப் பாஸ்புக் நகல் & சிறு/குறு விவசாயி சான்று (வட்டாட்சியர் அலுவலகம்).`;

    setFarmPlanReport(reportText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.phone || leadForm.phone.length < 10) {
      alert('சரியான 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்.');
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
            name: leadForm.name || 'விவசாயி / நில உரிமையாளர்',
            phone: leadForm.phone,
            village: leadForm.district || 'குறிப்பிடப்படவில்லை',
            taluk: activeCrop.title,
            surveyNo: `நிலம்: ${landAcres} ஏக்கர் | தேவை: ${leadForm.serviceNeed}`,
            feeStatus: 'இலவச வேளாண் ஆலோசனை',
            status: 'Agri & நவீன பண்ணை வழிகாட்டல்'
          })
        }
      );
    } catch (err) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! நான் நவீன வேளாண் & பண்ணை ஆலோசனை கோருகிறேன்.\n\n👤 பெயர்: ${leadForm.name || '-'}\n📱 எண்: ${leadForm.phone}\n📍 மாவட்டம்: ${leadForm.district || '-'}\n🌾 தேர்ந்தெடுத்த பயிர்: ${activeCrop.title}\n📐 நில அளவு: ${landAcres} ஏக்கர்\n💧 மண் & TDS: ${soilType} | TDS ${waterTds}\n🎁 சொட்டுநீர் மானிய எதிர்பார்ப்பு: ${dripSubsidy.subsidyPct}% அரசு மானியம்\n📌 சேவை தேவை: ${leadForm.serviceNeed}\n\nஅரசு மானிய வழிகாட்டல் மற்றும் கள திட்ட அறிக்கையைப் பகிரவும்.`;
    const waUrl = getWhatsAppUrl(msg);
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
              <span className="text-slate-100 text-[11px]">சொட்டுநீர் & PM-KUSUM சோலார்</span>
            </div>
          </div>
        </div>

        {/* 2. நேவிகேஷன் டேப்கள் */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('crop_roi')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'crop_roi'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🌾 பயிர் & பண்ணை லாப ரேடார்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('soil_water')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'soil_water'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🧪 மண் & போர்வெல் TDS ரேடார்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('subsidies')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'subsidies'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            💧 100% சொட்டுநீர் & சோலார் மானியம்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('timber')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'timber'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
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
                    type="button"
                    onClick={() => setSelectedCropId(crop.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedCropId === crop.id
                        ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold">{crop.title}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">{crop.category}</div>
                  </button>
                ))}

                <div className="pt-2 space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    நிலத்தின் பரப்பளவு (ஏக்கரில்):
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 5].map((acres) => (
                      <button
                        key={acres}
                        type="button"
                        onClick={() => setLandAcres(acres)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                          landAcres === acres
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-100 hover:text-white'
                        }`}
                      >
                        {acres} ஏக்கர்
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] text-slate-400">வேறு அளவு (ஏக்கர்):</span>
                    <input
                      type="number"
                      min="0.5"
                      max="100"
                      step="0.5"
                      value={landAcres}
                      onChange={(e) => setLandAcres(Math.max(0.5, Number(e.target.value)))}
                      className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                    />
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
                    <span className="text-[10px] text-slate-100 block">ஆண்டு நிகர லாபம்:</span>
                    <span className="text-xs font-bold text-emerald-400">{activeCrop.annualNetProfit}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-100 block">அறுவடை காலம்:</span>
                    <span className="text-xs font-bold text-white">{activeCrop.harvestCycle}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-100 block">பாசனத் தேவை:</span>
                    <span className="text-xs font-bold text-blue-300">{activeCrop.waterReq}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-xs space-y-1">
                  <span className="text-emerald-400 font-bold block">💡 360° எகோசிஸ்டம் உதவி:</span>
                  <p className="text-slate-300 text-[11px]">
                    இந்த சாகுபடிக்குத் தேவையான ஆட்களை நமது <strong>Jobs Hub</strong> மூலமாகவும், அறுவடை செய்யப்படும் பொருட்களை நேரடியாக சந்தைப்படுத்த நமது <strong>B2B மொத்த விற்பனைப் பிரிவு</strong> உடனும் இணைத்துத் தருகிறோம்.
                  </p>
                </div>

                {/* உடனடி பண்ணைத் திட்ட அறிக்கை பொத்தான் */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleGenerateFarmPlan}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow cursor-pointer transition"
                  >
                    📋 உடனடி பண்ணைத் திட்ட அறிக்கை உருவாக்கு (Instant Report)
                  </button>
                  {farmPlanReport && (
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 cursor-pointer"
                    >
                      🖨️ A4 PDF பிரிண்ட்
                    </button>
                  )}
                </div>

                {farmPlanReport && (
                  <pre className="bg-slate-900 border border-emerald-500/40 rounded-xl p-4 text-[11px] text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                    {farmPlanReport}
                  </pre>
                )}
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
                  <div className="flex justify-between text-[10px] text-slate-200 mt-1">
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
                    <span className="text-[10px] text-slate-100 block">மண் பொருத்தம்:</span>
                    <span className="text-xs font-bold text-emerald-400">{soilWaterSuitability.soilStatus}</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-100 block">தண்ணீர் TDS தகுதி:</span>
                    <span
                      className={`text-xs font-bold ${
                        waterTds <= activeCrop.maxTDS ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {soilWaterSuitability.tdsStatus}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
                  <span className="text-white font-bold block mb-1">பரிந்துரை:</span>
                  {waterTds > 1200 ? (
                    <span>
                      உப்புநீர் அதிகமாக உள்ளதால் டிராகன் ஃப்ரூட் மற்றும் கொய்யா போன்ற சகிப்புத்தன்மை கொண்ட பயிர்களை நடுவது சிறந்தது. சொட்டுநீர் ஃபில்டர் கட்டாயம் பொருத்த வேண்டும்.
                    </span>
                  ) : (
                    <span>
                      உங்கள் நிலத்தின் நீர்வளம் மிகச் சிறப்பான தரத்தில் உள்ளது. காய்கறி, மலர் சாகுபடி மற்றும் நறுமணப் பயிர்கள் மிகச் சிறப்பாக விளைச்சலைத் தரும்.
                    </span>
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
                  <p className="text-[11px] text-slate-100 mt-1">
                    5 ஏக்கருக்கு உட்பட்ட விவசாயிகளுக்கு முழு சொட்டுநீர் பாசனக் கட்டமைப்பு இலவசம்.
                  </p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30">
                  <span className="text-xs font-bold text-blue-400 block">PM-KUSUM சோலார் பம்புசெட்</span>
                  <div className="text-2xl font-black text-white mt-1">70% வரை மானியம்</div>
                  <p className="text-[11px] text-slate-100 mt-1">
                    தடையில்லா பகல்நேர பாசனத்திற்கு 5HP முதல் 10HP சோலார் பம்புகளுக்கு நிதி உதவி.
                  </p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
                  <span className="text-xs font-bold text-amber-400 block">பண்ணைக் குட்டை & வேலி</span>
                  <div className="text-2xl font-black text-white mt-1">₹1,00,000 வரை</div>
                  <p className="text-[11px] text-slate-100 mt-1">
                    மழைநீர் சேகரிப்பு குட்டை மற்றும் சோலார் தொங்கு வேலி அமைப்பதற்கான அரசு உதவித்தொகை.
                  </p>
                </div>
              </div>

              {/* சொட்டுநீர் கால்குலேட்டர் */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-100 block text-[11px]">
                    உங்கள் {landAcres} ஏக்கர் நிலத்திற்கான உத்தேச மதிப்பீடு:
                  </span>
                  <span className="text-white font-bold text-sm">
                    மொத்த கட்டமைப்பு மதிப்பு: ₹{dripSubsidy.totalCost.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold block">
                      அரசு மானியக் கழிவு: -₹{dripSubsidy.subsidyAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-white font-black text-xs">
                      உங்கள் பங்கு: ₹{dripSubsidy.farmerShare.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFarmerCategory(farmerCategory === 'small_marginal' ? 'other' : 'small_marginal');
                    }}
                    className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[11px] hover:text-white cursor-pointer"
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
                <label className="block text-xs font-bold text-slate-300 uppercase">
                  மரப்பயிரைத் தேர்ந்தெடுங்கள்:
                </label>
                {TIMBER_MODELS.map((timber) => (
                  <button
                    key={timber.id}
                    type="button"
                    onClick={() => setSelectedTimberId(timber.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedTimberId === timber.id
                        ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{timber.name}</div>
                    <div className="text-[11px] text-slate-100 mt-0.5">{timber.growthYears} ஆண்டுகளில் அறுவடை</div>
                  </button>
                ))}

                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    பரப்பளவு (ஏக்கர்):
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 5].map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setTimberAcres(a)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                          timberAcres === a
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-100'
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
                  <span className="text-xs font-bold text-emerald-400">
                    பசுமை ஓய்வூதியம் & மரப்பயிர் சேமிப்பு நிதி
                  </span>
                  <h3 className="text-base md:text-lg font-black text-white">{activeTimber.name}</h3>
                  <p className="text-xs text-slate-100 mt-1">{activeTimber.desc}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-100 block">மொத்த மரங்கள்:</span>
                    <span className="text-xs font-bold text-white">{timberProjection.totalTrees} மரங்கள்</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-100 block">ஆரம்ப நடவுச் செலவு:</span>
                    <span className="text-xs font-bold text-amber-400">
                      ₹{timberProjection.plantingCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-400 block">
                      {activeTimber.growthYears} ஆண்டு உத்தேச அறுவடை மதிப்பு:
                    </span>
                    <span className="text-xs font-bold text-emerald-300">
                      ₹{timberProjection.futureValue.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-300">
                  🛡️ <strong>முதலீட்டாளர் பார்வை:</strong> நிலத்தை வேலி போட்டு சும்மா வைத்திருப்பதை விட, மஹாகனி அல்லது தேக்கு நடுவதன் மூலம் பராமரிப்பின்றி பல லட்சம் ரூபாய் எதிர்கால மூலதனமாக மாறும்.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. அரசு வேளாண் & தோட்டக்கலை அதிகாரப்பூர்வ லிங்க்குகள் */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-2.5">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
            🏛️ அரசு வேளாண் & மானிய அதிகாரப்பூர்வ இணையதளங்கள் (Direct Official Links)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {AGRI_GOVT_PORTALS.map((portal) => (
              <a
                key={portal.url}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 px-3 py-2.5 rounded-xl text-[11px] text-slate-200 hover:text-emerald-300 transition"
              >
                <span>{portal.label}</span>
                <span className="text-emerald-400 font-bold shrink-0">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* 5. சிஆர்எம் & வாட்ஸ்அப் விண்ணப்பப் படிவம் */}
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
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {loading ? 'தயாராகிறது...' : 'வேளாண் திட்ட சுருக்கம் பெற (WhatsApp) ↗'}
            </button>
          </div>
        </form>
      </div>

      {/* 6. நம்ம பூமி 360° எகோசிஸ்டம் பாலங்கள் (Ecosystem Links) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('land');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-emerald-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🏡</span>
          <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
            விவசாய நிலம் வாங்க வேண்டுமா?
          </h4>
          <p className="text-xs text-slate-100">
            நீர் ஆதாரம், போர்வெல் வசதி மற்றும் ₹499 சட்ட தணிக்கை செய்யப்பட்ட விவசாய விளைநிலங்கள்.
          </p>
          <span className="text-[11px] text-emerald-400 font-bold block pt-1 underline">
            பூமி & நிலப்பிரிவு செல்ல ↗
          </span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('jobs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🚜</span>
          <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
            பண்ணை மேற்பார்வையாளர் தேவையா?
          </h4>
          <p className="text-xs text-slate-100">
            சொட்டுநீர் பராமரிப்பு, இயற்கை உரம் மற்றும் பண்ணை பணிகளுக்கு அனுபவமுள்ள உள்ளூர் ஆட்கள்.
          </p>
          <span className="text-[11px] text-blue-400 font-bold block pt-1 underline">
            Jobs Hub வேலைவாய்ப்பு மையம் ↗
          </span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('finance');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-amber-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🏦</span>
          <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
            டிராக்டர் & வேளாண் கடன் தேவையா?
          </h4>
          <p className="text-xs text-slate-100">
            பண்ணைக் கருவிகள், சோலார் பம்புசெட் அமைப்பதற்கான குறைந்த வட்டி விவசாயக் கடன்கள்.
          </p>
          <span className="text-[11px] text-amber-400 font-bold block pt-1 underline">
            நிதி & கடன்கள் பிரிவு செல்ல ↗
          </span>
        </div>
      </div>
    </div>
  );
}