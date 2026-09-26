import React, { useState, useMemo } from 'react';
import insuranceData from '../data/insuranceData.json';
const { TERM_PLANS, VEHICLE_MODELS } = insuranceData;



export default function InsuranceModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('term'); // 'term', 'health', 'vehicle', 'govt_micro', 'agri_cattle', 'shop_asset', 'claim_guide'
  
  // டேர்ம் கால்குலேட்டர்
  const [userAge, setUserAge] = useState(30);
  const [coverAmount, setCoverAmount] = useState('1Cr');

  // மருத்துவக் காப்பீடு
  const [familyType, setFamilyType] = useState('nuclear');

  // வாகனக் காப்பீடு
  const [selectedVehicle, setSelectedVehicle] = useState('bike');

  // சிஆர்எம் படிவம்
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    district: '',
    insuranceNeed: 'டேர்ம் லைஃப் (₹1 கோடி குடும்பப் பாதுகாப்பு)'
  });
  const [loading, setLoading] = useState(false);

  // டேர்ம் பிரீமியம் கணக்கீடு
  const selectedTermPremium = useMemo(() => {
    const matched = TERM_PLANS.find(p => p.age === userAge) || TERM_PLANS[1];
    if (coverAmount === '50L') return matched.cover50L;
    if (coverAmount === '2Cr') return matched.cover2Cr;
    return matched.cover1Cr;
  }, [userAge, coverAmount]);

  // மருத்துவக் காப்பீடு மதிப்பீடு
  const healthEstimate = useMemo(() => {
    if (familyType === 'individual') return { cover: '₹5,00,000', approxCost: '₹450 / மாதம்', desc: 'இளைஞர்கள் மற்றும் தனிநபர்களுக்கான முழு மருத்துவச் சிகிச்சை பாதுகாப்பு.' };
    if (familyType === 'nuclear') return { cover: '₹10,00,000', approxCost: '₹950 / மாதம்', desc: 'கணவன், மனைவி மற்றும் 2 குழந்தைகள் வரை உள்ளடக்கிய Family Floater திட்டம்.' };
    return { cover: '₹10,00,000', approxCost: '₹1,650 / மாதம்', desc: 'மூத்த குடிமக்கள் & பெற்றோருக்கான பிரத்யேக திட்டம் (Pre-existing நோய்கள் பாதுகாப்புடன்).' };
  }, [familyType]);

  const activeVehicleData = useMemo(() => {
    return VEHICLE_MODELS.find(v => v.id === selectedVehicle) || VEHICLE_MODELS[0];
  }, [selectedVehicle]);

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
          name: leadForm.name || 'வாடிக்கையாளர்',
          phone: leadForm.phone,
          village: leadForm.district || 'குறிப்பிடப்படவில்லை',
          taluk: leadForm.insuranceNeed,
          surveyNo: `வயது: ${userAge} | வகை: ${activeTab.toUpperCase()}`,
          feeStatus: 'இலவச காப்பீட்டு ஒப்பீடு',
          status: 'Insurance 360 Full Desk'
        })
      });
    } catch (err) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! நான் காப்பீட்டு ஆலோசனை மற்றும் அரசு திட்ட வழிகாட்டல் கோருகிறேன்.\n\n👤 பெயர்: ${leadForm.name || '-'}\n📱 எண்: ${leadForm.phone}\n📍 மாவட்டம்: ${leadForm.district || '-'}\n🛡️ தேவை: ${leadForm.insuranceNeed}\n🎯 பிரிவு: ${activeTab.toUpperCase()}\n\nதகுதியான பாலிசிகள், அரசு மானிய சலுகைகள் மற்றும் கிளைம் வழிகாட்டலை அனுப்பவும்.`;
    const waUrl = `https://wa.me/919962369131?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="w-full space-y-8 text-left">
      {/* 1. முதன்மை பேனர் */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/50 via-slate-900/90 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 rounded-full">
              360° குடும்பம், வாகனம், பயிர் & அரசு நலப் பாதுகாப்பு மையம்
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">
              ஸ்மார்ட் காப்பீட்டு வழிகாட்டி (Insurance 360 Desk)
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              ₹1 கோடி டேர்ம் லைஃப், பணமில்லா மருத்துவம், தமிழக அரசின் CMCHIS ₹5 லட்சம், ₹20 விபத்துக் காப்பீடு மற்றும் க்ளைம் உதவி.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-cyan-500/30">
            <span className="text-3xl">🛡️</span>
            <div className="text-xs">
              <span className="text-cyan-400 font-bold block">மத்திய & மாநில அரசுத் திட்டங்கள்</span>
              <span className="text-slate-400 text-[11px]">நேரடி வழிகாட்டல் & தகுதி ஆய்வு</span>
            </div>
          </div>
        </div>

        {/* 2. நேவிகேஷன் டேப்கள் */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('term')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'term' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            👨‍👩‍👧 டேர்ம் லைஃப் (₹1 கோடி)
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'health' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🏥 பணமில்லா மருத்துவம் (Health)
          </button>
          <button
            onClick={() => setActiveTab('govt_micro')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'govt_micro' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🏛️ மத்திய & தமிழக அரசுத் திட்டங்கள்
          </button>
          <button
            onClick={() => setActiveTab('vehicle')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'vehicle' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🛵 பைக் / கார் / டிராக்டர்
          </button>
          <button
            onClick={() => setActiveTab('agri_cattle')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'agri_cattle' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🌾 PMFBY பயிர் & மாடு காப்பீடு
          </button>
          <button
            onClick={() => setActiveTab('shop_asset')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'shop_asset' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🏢 கடை & குடோன் பாதுகாப்பு
          </button>
          <button
            onClick={() => setActiveTab('claim_guide')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'claim_guide' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            📋 க்ளைம் உதவி & வழிகாட்டி
          </button>
        </div>

        {/* 3. டேப் வாரியான உள்ளடக்கங்கள் */}
        <div className="mt-6">
          {/* TAB 1: டேர்ம் இன்சூரன்ஸ் */}
          {activeTab === 'term' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">உங்கள் தற்போதைய வயது:</label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[25, 30, 35, 40, 45].map((age) => (
                      <button
                        key={age}
                        onClick={() => setUserAge(age)}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                          userAge === age ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">பாதுகாப்புத் தொகை:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['50L', '1Cr', '2Cr'].map((cov) => (
                      <button
                        key={cov}
                        onClick={() => setCoverAmount(cov)}
                        className={`py-2 rounded-lg text-xs font-bold border ${
                          coverAmount === cov ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {cov === '50L' ? '₹50 லட்சம்' : cov === '1Cr' ? '₹1 கோடி' : '₹2 கோடி'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-cyan-400">குறைந்த கட்டண குடும்ப நிதிப் பாதுகாப்பு</span>
                  <h3 className="text-xl font-black text-white">
                    சுமார் ₹{selectedTermPremium} <span className="text-xs font-normal text-slate-400">/ மாதம் முதல்</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {userAge} வயதில் எடுக்கும் போது பாலிசி முடியும் வரை பிரீமியம் மாறாது (Zero Price Hike).
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">இறப்பு இழப்பீடு:</span>
                    <span className="text-sm font-bold text-white">
                      {coverAmount === '1Cr' ? '₹1,00,00,000' : coverAmount === '2Cr' ? '₹2,00,00,000' : '₹50,00,000'}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">வரிச்சலுகை:</span>
                    <span className="text-sm font-bold text-emerald-400">Section 80C படி வரிவிலக்கு</span>
                  </div>
                </div>
                <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-xl text-xs text-slate-300">
                  💡 <strong>கடன் பாதுகாப்பு:</strong> வீட்டுக் கடன் அல்லது தொழில் கடன் வைத்திருப்பவர்கள் தங்கள் குடும்பத்தின் சொத்து வங்கியால் பறிபோகாமல் காக்க டேர்ம் இன்சூரன்ஸ் அவசியமாகும்.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: மருத்துவக் காப்பீடு */}
          {activeTab === 'health' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase">பாலிசி பிரிவு:</label>
                <button
                  onClick={() => setFamilyType('nuclear')}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    familyType === 'nuclear' ? 'bg-cyan-500/15 border-cyan-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold">கணவன், மனைவி & குழந்தைகள் (Family Floater)</div>
                  <div className="text-[11px] text-cyan-400">ஒரே பாலிசியில் முழு குடும்பமும்</div>
                </button>
                <button
                  onClick={() => setFamilyType('individual')}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    familyType === 'individual' ? 'bg-cyan-500/15 border-cyan-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold">தனிநபர் காப்பீடு (Individual Cover)</div>
                  <div className="text-[11px] text-slate-400">இளைஞர்கள் & தனியாக இருப்போருக்கு</div>
                </button>
                <button
                  onClick={() => setFamilyType('parents')}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    familyType === 'parents' ? 'bg-cyan-500/15 border-cyan-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold">பெற்றோர் & முதியோர் (Senior Citizen)</div>
                  <div className="text-[11px] text-amber-400">நீரிழிவு, இரத்த அழுத்தம் கவரேஜ்</div>
                </button>
              </div>

              <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div>
                  <span className="text-xs font-bold text-cyan-400">Cashless மருத்துவமனை நெட்வொர்க்</span>
                  <h3 className="text-xl font-black text-white">{healthEstimate.cover} சிகிச்சை பாதுகாப்பு</h3>
                  <p className="text-xs text-slate-300 mt-1">{healthEstimate.desc}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">உத்தேச பிரீமியம்:</span>
                    <span className="text-sm font-bold text-cyan-300">{healthEstimate.approxCost}</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">நெட்வொர்க்:</span>
                    <span className="text-sm font-bold text-white">10,000+ அரசு & தனியார் மருத்துவமனைகள்</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
                  🏥 அவசர சிகிச்சை, ICU கட்டணங்கள் மற்றும் அறுவை சிகிச்சை செலவுகளை உங்கள் சொந்த சேமிப்பிலிருந்து செலவழிக்காமல் பாதுகாக்கிறது.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: மத்திய & தமிழக அரசு நலத் திட்டங்கள் (State & Central Govt) */}
          {activeTab === 'govt_micro' && (
            <div className="space-y-6">
              {/* தமிழ்நாடு மாநில அரசு திட்டங்கள் */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">🏛️</span>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    தமிழ்நாடு மாநில அரசு திட்டங்கள் (TN State Govt Schemes)
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-emerald-400">முதலமைச்சரின் விரிவான மருத்துவக் காப்பீடு (CMCHIS)</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded">100% இலவசம்</span>
                    </div>
                    <div className="text-xl font-black text-white">ஆண்டுக்கு ₹ 5,00,000 வரை</div>
                    <p className="text-xs text-slate-300">
                      குடும்ப அட்டை (Ration Card) உள்ள தகுதியான குடும்பங்களுக்கு தமிழகத்தின் முன்னணி தனியார் மற்றும் அரசு மருத்துவமனைகளில் இலவச சிகிச்சை.
                    </p>
                    <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
                      📌 <strong>தகுதி:</strong> குடும்ப ஆண்டு வருமானம் ₹1,20,000-க்குள் இருத்தல் வேண்டும் (ஸ்மார்ட் கார்டு கட்டாயம்).
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-emerald-400">முதலமைச்சரின் உழவர் பாதுகாப்புத் திட்டம்</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded">உழவர் நல வாரியம்</span>
                    </div>
                    <div className="text-xl font-black text-white">₹ 1,00,000 முதல் ₹ 2,00,000 வரை</div>
                    <p className="text-xs text-slate-300">
                      விவசாயிகள் மற்றும் விவசாயத் தொழிலாளர்களுக்கு விபத்து மரணம், உடல் உறுப்பு இழப்பு மற்றும் இயற்கை மரணத்திற்கான நேரடி அரசு நிவாரணம்.
                    </p>
                    <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
                      📌 <strong>பலன்கள்:</strong> விபத்து மரண நிவாரணம், கல்வி உதவித்தொகை, திருமண நிதி மற்றும் முதியோர் ஓய்வூதியம்.
                    </div>
                  </div>
                </div>
              </div>

              {/* மத்திய அரசு திட்டங்கள் */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">🇮🇳</span>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    மத்திய அரசு மக்கள் நலத் திட்டங்கள் (Central Govt Micro-Insurance)
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30 space-y-2">
                    <span className="text-xs font-bold text-blue-400 block">PMSBY விபத்துக் காப்பீடு</span>
                    <div className="text-lg font-black text-white">ஆண்டுக்கு ₹20 மட்டும்</div>
                    <div className="text-xs font-bold text-slate-200">₹ 2,00,000 விபத்து மரண இழப்பீடு</div>
                    <p className="text-[11px] text-slate-400">18 முதல் 70 வயது வரை உள்ள எவரும் சேமிப்பு வங்கிக் கணக்கு மூலம் நொடியில் செயல்படுத்தலாம்.</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30 space-y-2">
                    <span className="text-xs font-bold text-blue-400 block">PMJJBY ஆயுள் காப்பீடு</span>
                    <div className="text-lg font-black text-white">ஆண்டுக்கு ₹436 மட்டும்</div>
                    <div className="text-xs font-bold text-slate-200">₹ 2,00,000 இயற்கை / விபத்து மரணம்</div>
                    <p className="text-[11px] text-slate-400">18 முதல் 50 வயது வரை உள்ளவர்களுக்கு குடும்ப நிதிப் பாதுகாப்பை உறுதி செய்யும் எளிய திட்டம்.</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
                    <span className="text-xs font-bold text-amber-400 block">ஆயுஷ்மான் பாரத் (PM-JAY) & APY</span>
                    <div className="text-lg font-black text-white">₹5 லட்சம் மருத்துவ அட்டை</div>
                    <div className="text-xs font-bold text-slate-200">+ மாதம் ₹5,000 ஓய்வூதியம் (APY)</div>
                    <p className="text-[11px] text-slate-400">தேசிய அளவிலான இலவச மருத்துவ சிகிச்சை அட்டை மற்றும் அமைப்புசாரா தொழிலாளர் ஓய்வூதியம்.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: வாகனக் காப்பீடு */}
          {activeTab === 'vehicle' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase">வாகன வகையைத் தேர்வு செய்யவும்:</label>
                {VEHICLE_MODELS.map((veh) => (
                  <button
                    key={veh.id}
                    onClick={() => setSelectedVehicle(veh.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedVehicle === veh.id ? 'bg-cyan-500/15 border-cyan-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{veh.name}</div>
                    <div className="text-[11px] text-cyan-400">{veh.tpCost}</div>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-cyan-400">மோட்டார் வாகனச் சட்டப்படி கட்டாயக் காப்பீடு</span>
                  <h3 className="text-lg font-black text-white">{activeVehicleData.name}</h3>
                  <p className="text-xs text-slate-300 mt-1">விபத்து இழப்பீடு, மூன்றாம் நபர் பொறுப்பு மற்றும் சொந்த சேதப் பாதுகாப்பு.</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Third Party (கட்டாய காப்பீடு):</span>
                    <span className="text-sm font-bold text-emerald-400">{activeVehicleData.tpCost}</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">முழு கவரேஜ் (Comprehensive):</span>
                    <span className="text-sm font-bold text-white">{activeVehicleData.compCost}</span>
                  </div>
                </div>

                <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-xl text-xs text-slate-300 space-y-1">
                  <span className="text-cyan-400 font-bold block">💡 போனஸ் டிப் (NCB தள்ளுபடி):</span>
                  <p className="text-[11px]">முந்தைய ஆண்டில் கிளைம் செய்யவில்லை என்றால் புதிய பாலிசியில் 20% முதல் 50% வரை பிரீமியம் கழிவு பெறலாம்.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: பயிர் & கால்நடை காப்பீடு */}
          {activeTab === 'agri_cattle' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">பிரதான் மந்திரி பயிர்க் காப்பீடு (PMFBY)</span>
                <div className="text-xl font-black text-white">1.5% முதல் 2% பிரீமியம்</div>
                <p className="text-xs text-slate-400">வறட்சி, புயல், பூச்சித் தாக்குதல் மற்றும் இயற்கை பேரிடரால் ஏற்படும் விளைச்சல் நஷ்டத்திற்கு இழப்பீடு.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30 space-y-2">
                <span className="text-xs font-bold text-blue-400 block">கறவை மாடு & கன்று காப்பீடு</span>
                <div className="text-xl font-black text-white">₹50,000 - ₹80,000 வரை</div>
                <p className="text-xs text-slate-400">காதணி (Ear Tag) பொருத்தப்பட்ட கறவை மாடுகள் உயிரிழப்பிற்கு உடனடி இழப்பீடு வழிகாட்டல்.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">ஆடு & நாட்டுக்கோழிப் பண்ணை</span>
                <div className="text-xl font-black text-white">குழு பாலிசி பாதுகாப்பு</div>
                <p className="text-xs text-slate-400">தொற்றுநோய்கள் பரவும் போது ஒருங்கிணைந்த பண்ணை மூலதனத்தைப் பாதுகாக்கும் திட்டம்.</p>
              </div>
            </div>
          )}

          {/* TAB 6: கடை & குடோன் காப்பீடு */}
          {activeTab === 'shop_asset' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400">வணிக நிறுவனங்கள் & கடைகள்</span>
                <h4 className="text-sm font-bold text-white">தீ, வெள்ளம் & திருட்டுப் பாதுகாப்பு (Shopkeeper Policy)</h4>
                <p className="text-xs text-slate-400">கடையில் உள்ள சரக்குகள், பர்னிச்சர் மற்றும் பில்டிங் சேதங்களுக்குக் குறைந்த கட்டணத்தில் முழு பாதுகாப்பு.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400">குடோன் & தொழிற்சாலைகள்</span>
                <h4 className="text-sm font-bold text-white">இயந்திர பழுது & சரக்கு பாதுகாப்பு (Standard Fire Policy)</h4>
                <p className="text-xs text-slate-400">தானியக் கிடங்கு, ஆலை இயந்திரங்கள் மற்றும் மூலப்பொருட்களுக்கான பெருநிறுவனப் பாதுகாப்பு.</p>
              </div>
            </div>
          )}

          {/* TAB 7: க்ளைம் உதவி & வழிகாட்டி */}
          {activeTab === 'claim_guide' && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-emerald-400">Claim Settlement 360° வழிகாட்டி</span>
                <h3 className="text-lg font-black text-white">க்ளைம் செய்யும் போது நிராகரிக்கப்படாமல் இருக்க 3 தங்க விதிகள்:</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-white font-bold block">1. 72 மணிநேரத் தகவல்</span>
                  <p className="text-slate-400 text-[11px]">மருத்துவமனையில் அனுமதிக்கப்பட்டாலோ அல்லது விபத்து நடந்தாலோ 72 மணி நேரத்திற்குள் நிறுவனத்திற்குத் தகவல் தெரிவிக்க வேண்டும்.</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-white font-bold block">2. நெட்வொர்க் TPA கார்டு</span>
                  <p className="text-slate-400 text-[11px]">பணமில்லா சிகிச்சைக்கு இன்சூரன்ஸ் கார்டு மற்றும் ஆதார் அட்டையை மருத்துவமனை இன்சூரன்ஸ் டெஸ்க்கில் சமர்ப்பிக்கவும்.</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-white font-bold block">3. முறையான ஆவணங்கள்</span>
                  <p className="text-slate-400 text-[11px]">வாகன விபத்திற்கு FIR நகல், மருத்துவ சிகிச்சைக்கு டிஸ்சார்ஜ் சம்மரி மற்றும் ஒரிஜினல் பில்கள் கட்டாயம் வைத்திருக்க வேண்டும்.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. சிஆர்எம் படிவம் */}
        <form onSubmit={handleSubmit} className="mt-6 pt-5 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-2">
            <span>🛡️</span> சிறந்த பாலிசி ஒப்பீடு மற்றும் அரசு திட்ட உதவிக்கு விண்ணப்பிக்கவும்:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <input
              type="text"
              placeholder="உங்கள் பெயர்"
              value={leadForm.name}
              onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <input
              type="tel"
              maxLength={10}
              required
              placeholder="வாட்ஸ்அப் எண் *"
              value={leadForm.phone}
              onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value.replace(/\D/g, '') })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="மாவட்டம் / ஊர் (எ.கா: மதுரை)"
              value={leadForm.district}
              onChange={(e) => setLeadForm({ ...leadForm, district: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <select
              value={leadForm.insuranceNeed}
              onChange={(e) => setLeadForm({ ...leadForm, insuranceNeed: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="தமிழ்நாடு CMCHIS ₹5 லட்சம் இலவச மருத்துவக் காப்பீடு">🏛️ தமிழ்நாடு CMCHIS மருத்துவக் காப்பீடு</option>
              <option value="முதலமைச்சரின் உழவர் பாதுகாப்புத் திட்டம்">🌾 உழவர் பாதுகாப்புத் திட்ட உதவி</option>
              <option value="மத்திய அரசு காப்பீடு (₹20 PMSBY / ₹436 PMJJBY)">🇮🇳 ₹20 / ₹436 மத்திய அரசுத் திட்டங்கள்</option>
              <option value="டேர்ம் லைஃப் (₹1 கோடி குடும்பப் பாதுகாப்பு)">👨‍👩‍👧 ₹1 கோடி டேர்ம் லைஃப்</option>
              <option value="குடும்ப பணமில்லா மருத்துவக் காப்பீடு">🏥 பணமில்லா குடும்ப மருத்துவக் காப்பீடு</option>
              <option value="வாகனக் காப்பீடு (பைக் / கார் / டிராக்டர்)">🛵 பைக் / கார் / டிராக்டர் காப்பீடு</option>
              <option value="பயிர் & கால்நடை காப்பீடு (PMFBY)">🌾 பயிர் & மாடு காப்பீடு</option>
              <option value="கடை & குடோன் வணிகப் பாதுகாப்பு">🏢 கடை & குடோன் பாதுகாப்பு</option>
              <option value="க்ளைம் செட்டில்மென்ட் உதவி">📋 க்ளைம் செட்டில்மென்ட் உதவி</option>
            </select>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-950/40 transition-all flex items-center gap-1.5"
            >
              {loading ? 'தயாராகிறது...' : 'பாலிசி & அரசு திட்ட விவரம் பெற (WhatsApp) ↗'}
            </button>
          </div>
        </form>
      </div>

      {/* 5. 360° எகோசிஸ்டம் பாலங்கள் */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('finance');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-amber-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🏦</span>
          <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">கடன் வாங்கும் போது காப்பீடு தேவையா?</h4>
          <p className="text-xs text-slate-400">வீட்டுக்கடன் மற்றும் தனிநபர் கடன்களுக்கான குறைந்த பிரீமியம் Loan Shield வழிகாட்டல்.</p>
          <span className="text-[11px] text-amber-400 font-bold block pt-1 underline">நிதி & கடன்கள் பிரிவு செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('agri');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-emerald-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🌱</span>
          <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">விவசாயப் பயிர்களைத் தேர்வு செய்ய</h4>
          <p className="text-xs text-slate-400">மண், போர்வெல் நீர் TDS பரிசோதனை மற்றும் 100% சொட்டுநீர் மானியத் திட்டங்கள்.</p>
          <span className="text-[11px] text-emerald-400 font-bold block pt-1 underline">Agri Hub செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('business');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-cyan-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🏢</span>
          <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">தொழில் தொடங்க 35% அரசு மானியம்</h4>
          <p className="text-xs text-slate-400">குடோன், எண்ணெய் செக்கு மற்றும் MSME தொழில்களுக்கான திட்ட அறிக்கை (Live DPR).</p>
          <span className="text-[11px] text-cyan-400 font-bold block pt-1 underline">தொழில் & MSME பிரிவு செல்ல ↗</span>
        </div>
      </div>
    </div>
  );
}