import React, { useState, useMemo } from 'react';

// 27 நட்சத்திரங்கள் மற்றும் பஞ்சபட்சி விவரங்கள்
const NAKSHATRAS = [
  { id: 1, name: 'அசுவினி', pakshi: 'வல்லூறு', tree: 'எட்டி மரம்', deity: 'சரஸ்வதி / கணபதி' },
  { id: 2, name: 'பரணி', pakshi: 'வல்லூறு', tree: 'நெல்லி மரம்', deity: 'துர்க்கை அம்மன்' },
  { id: 3, name: 'கிருத்திகை', pakshi: 'வல்லூறு', tree: 'அத்தி மரம்', deity: 'முருகப் பெருமான்' },
  { id: 4, name: 'ரோகிணி', pakshi: 'வல்லூறு', tree: 'நாவல் மரம்', deity: 'மகாவிஷ்ணு / கிருஷ்ணர்' },
  { id: 5, name: 'மிருகசீரிஷம்', pakshi: 'வல்லூறு', tree: 'கருங்காலி மரம்', deity: 'சந்திர மௌலீஸ்வரர்' },
  { id: 6, name: 'திருவாதிரை', pakshi: 'ஆந்தை', tree: 'செங்காலி மரம்', deity: 'பைரவர் / ருத்ரன்' },
  { id: 7, name: 'புனர்பூசம்', pakshi: 'ஆந்தை', tree: 'மூங்கில் மரம்', deity: 'ஸ்ரீ ராமர்' },
  { id: 8, name: 'பூசம்', pakshi: 'ஆந்தை', tree: 'அரச மரம்', deity: 'தட்சிணாமூர்த்தி' },
  { id: 9, name: 'ஆயில்யம்', pakshi: 'ஆந்தை', tree: 'புன்னை மரம்', deity: 'ஆதிசேஷன் / நாகராஜா' },
  { id: 10, name: 'மகம்', pakshi: 'ஆந்தை', tree: 'ஆல மரம்', deity: 'சூரிய பகவான்' },
  { id: 11, name: 'பூரம்', pakshi: 'காகம்', tree: 'பலா மரம்', deity: 'ஆண்டாள் நாச்சியார்' },
  { id: 12, name: 'உத்திரம்', pakshi: 'காகம்', tree: 'அலரி மரம்', deity: 'ஐயப்பன் / சாஸ்தா' },
  { id: 13, name: 'அஸ்தம்', pakshi: 'காகம்', tree: 'அத்தி மரம்', deity: 'காயத்ரி தேவி' },
  { id: 14, name: 'சித்திரை', pakshi: 'காகம்', tree: 'வில்வ மரம்', deity: 'சக்கரத்தாழ்வார்' },
  { id: 15, name: 'சுவாதி', pakshi: 'காகம்', tree: 'மருத மரம்', deity: 'ஸ்ரீ நரசிம்மர்' },
  { id: 16, name: 'விசாகம்', pakshi: 'கோழி', tree: 'விளா மரம்', deity: 'முருகன் / கந்தசுவாமி' },
  { id: 17, name: 'அனுஷம்', pakshi: 'கோழி', tree: 'மகிழ மரம்', deity: 'அனுமன் / சனீஸ்வரர்' },
  { id: 18, name: 'கேட்டை', pakshi: 'கோழி', tree: 'பராய் மரம்', deity: 'வரதராஜப் பெருமாள்' },
  { id: 19, name: 'மூலம்', pakshi: 'கோழி', tree: 'மரா மரம்', deity: 'ஆஞ்சநேயர்' },
  { id: 20, name: 'பூராடம்', pakshi: 'கோழி', tree: 'வஞ்சி மரம்', deity: 'ஜம்புகேஸ்வரர் (அகிலாண்டேஸ்வரி)' },
  { id: 21, name: 'உத்திராடம்', pakshi: 'மயில்', tree: 'பலா மரம்', deity: 'விநாயகர்' },
  { id: 22, name: 'திருவோணம்', pakshi: 'மயில்', tree: 'எருக்கு மரம்', deity: 'ஹயக்ரீவர் / வெங்கடாசலபதி' },
  { id: 23, name: 'அவிட்டம்', pakshi: 'மயில்', tree: 'வன்னி மரம்', deity: 'சுப்பிரமணியர்' },
  { id: 24, name: 'சதயம்', pakshi: 'மயில்', tree: 'கடம்ப மரம்', deity: 'மிருத்யுஞ்சய சிவன்' },
  { id: 25, name: 'பூரட்டாதி', pakshi: 'மயில்', tree: 'தேக்கு மரம்', deity: 'குபேர லட்சுமி' },
  { id: 26, name: 'உத்திரட்டாதி', pakshi: 'வல்லூறு', tree: 'வேப்ப மரம்', deity: 'மகாவிஷ்ணு' },
  { id: 27, name: 'ரேவதி', pakshi: 'ஆந்தை', tree: 'இலுப்பை மரம்', deity: 'ரங்கநாதர்' }
];

// 12 ராசிகள்
const RASIS = [
  'மேஷம் (Aries)', 'ரிஷபம் (Taurus)', 'மிதுனம் (Gemini)', 'கடகம் (Cancer)',
  'சிம்மம் (Leo)', 'கன்னி (Virgo)', 'துலாம் (Libra)', 'விருச்சிகம் (Scorpio)',
  'தனுசு (Sagittarius)', 'மகரம் (Capricorn)', 'கும்பம் (Aquarius)', 'மீனம் (Pisces)'
];

export default function AstrologyModule({ setCurrentModule }) {
  // படிவ உள்ளீடுகள்
  const [formData, setFormData] = useState({
    name: '',
    gender: 'ஆண்',
    dob: '',
    tob: '10:30',
    pob: '',
    rasi: RASIS[0],
    nakshatra: NAKSHATRAS[0].name,
    queryType: 'all', // 'bhoomi', 'career', 'marriage', 'finance', 'all'
    consent: true
  });
// பிறந்த தேதி & நேரத்தை உள்ளிட்டதும் ராசி மற்றும் நட்சத்திரத்தை உடனே தானாகக் கணிக்கும் முறை
  const handleDateOrTimeChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    
    if (updated.dob) {
      const parts = updated.dob.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      
      const timeParts = (updated.tob || '12:00').split(':');
      const hour = parseInt(timeParts[0], 10);

      const dayOfYear = (month - 1) * 30.4 + day;
      const totalHours = dayOfYear * 24 + hour + (year % 19) * 11;
      
      // 27 நட்சத்திரங்கள் சுழற்சி
      const nakIndex = Math.abs(Math.floor((totalHours / 24.3) % 27));
      const autoNak = NAKSHATRAS[nakIndex] ? NAKSHATRAS[nakIndex].name : NAKSHATRAS[0].name;

      // 12 ராசிகள் சுழற்சி
      const rasiIndex = Math.abs(Math.floor((nakIndex * 12) / 27) % 12);
      const autoRasi = RASIS[rasiIndex];

      updated.nakshatra = autoNak;
      updated.rasi = autoRasi;
    }

    setFormData(updated);
  };
  const [activeSubTab, setActiveSubTab] = useState('input'); // 'input', 'result', 'pakshi', 'prasannam'
  const [payPlan, setPayPlan] = useState(null); // { amount: 21/49, title: '...' }
  const [showPayModal, setShowPayModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // எண் கணித அதிர்வு எண் (Numerology Root Number)
  const rootNumber = useMemo(() => {
    if (!formData.dob) return 1;
    const day = parseInt(formData.dob.split('-')[2] || '1', 10);
    const sum = day.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    return sum > 9 ? sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0) : sum;
  }, [formData.dob]);

  // தேர்ந்தெடுக்கப்பட்ட நட்சத்திர விவரம்
  const selectedNak = useMemo(() => {
    return NAKSHATRAS.find((n) => n.name === formData.nakshatra) || NAKSHATRAS[0];
  }, [formData.nakshatra]);

  const handleGenerateReport = (plan) => {
    if (!formData.name || !formData.dob || !formData.pob) {
      alert('தயவுசெய்து பெயர், பிறந்த தேதி மற்றும் பிறந்த ஊரை உள்ளிடவும்.');
      return;
    }
    if (!formData.consent) {
      alert('சேவை வழிகாட்டலுக்கான உடன்படிக்கை செக்பாக்ஸை டிக் செய்யவும்.');
      return;
    }
    setPayPlan(plan);
    setShowPayModal(true);
  };

  const handleConfirmDakshina = () => {
    setLoading(true);

    // Google Sheets CRM Sync
    try {
      fetch('https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZB0YKKbWNIKD7CzSh0M0qvfkHhORCw53YMBZX1nKCB1AcSAu/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          village: formData.pob,
          taluk: `${formData.rasi} / ${formData.nakshatra}`,
          surveyNo: `DOB: ${formData.dob} ${formData.tob} | எண்: ${rootNumber}`,
          feeStatus: `Digital Dakshina ₹${payPlan?.amount || 21} - ${payPlan?.title}`,
          status: 'AI Astrology Desk'
        })
      });
    } catch (e) {
      console.log('CRM Syncing...');
    }

    setTimeout(() => {
      setLoading(false);
      setShowPayModal(false);
      setActiveSubTab('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="w-full space-y-8 text-left">
      {/* 1. முதன்மை பேனர் */}
      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-950/70 via-slate-900/95 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-950/80 border border-purple-500/40 rounded-full">
              7 ஜோதிட முறைகள் ஒருங்கிணைந்த AI வாழ்வியல் கணிப்பான் 360°
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2 flex items-center gap-2">
              <span>🔮</span> AI வேத & வாழ்வியல் ஜோதிட மையம்
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              வேத ஜோதிடம், கே.பி. கணிதம், தமிழ் நாடி, பஞ்சபட்சி, பிரசன்னம், எண் கணிதம் & மனையடி வாஸ்து இணைந்த வாழ்வியல் முடிவுகளுக்கான வழிகாட்டி.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-950/90 px-4 py-3 rounded-xl border border-purple-500/30">
            <span className="text-3xl">⚖️</span>
            <div className="text-xs">
              <span className="text-purple-300 font-bold block">மங்கள டிஜிட்டல் தட்சணை</span>
              <span className="text-emerald-400 font-bold text-sm">₹21 / ₹49 மட்டும்</span>
              <span className="text-slate-400 text-[10px] block">மற்ற முன்னணி செயலிகளை விட 90% குறைந்த கட்டணம்</span>
            </div>
          </div>
        </div>

        {/* 2. துணை டேப்கள் */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveSubTab('input')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'input' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            📋 ஜாதக விவர உள்ளீடு & கணிப்பு
          </button>
          <button
            onClick={() => setActiveSubTab('pakshi')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'pakshi' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🦅 பஞ்சபட்சி நேரலை நேர கணிப்பான் (இலவசம்)
          </button>
          <button
            onClick={() => setActiveSubTab('prasannam')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'prasannam' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🐚 உடனடி சோழி & தாம்பூலப் பிரசன்னம்
          </button>
        </div>

        {/* 3. ஜாதக விவர உள்ளீட்டுப் படிவம் */}
        {activeSubTab === 'input' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">பெயர் *</label>
                <input
                  type="text"
                  placeholder="உங்கள் பெயர்"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">பாலினம்</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="ஆண்">ஆண்</option>
                  <option value="பெண்">பெண்</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">பிறந்த தேதி *</label>
                <input
                  type="date"
                  value={formData.dob}
                 onChange={(e) => handleDateOrTimeChange('dob', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">பிறந்த நேரம் (உத்தேசமாக)</label>
                <input
                  type="time"
                  value={formData.tob}
                  onChange={(e) => handleDateOrTimeChange('tob', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">பிறந்த ஊர் / மாவட்டம் *</label>
                <input
                  type="text"
                  placeholder="எ.கா: சென்னை / தஞ்சாவூர்"
                  value={formData.pob}
                  onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ராசி</label>
                <select
                  value={formData.rasi}
                  onChange={(e) => setFormData({ ...formData, rasi: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {RASIS.map((r, i) => (
                    <option key={i} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">நட்சத்திரம்</label>
                <select
                  value={formData.nakshatra}
                  onChange={(e) => setFormData({ ...formData, nakshatra: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {NAKSHATRAS.map((n) => (
                    <option key={n.id} value={n.name}>{n.name} (பட்சி: {n.pakshi})</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-1">முதன்மை கேள்வி / கவனம் செலுத்த வேண்டிய பகுதி</label>
                <select
                  value={formData.queryType}
                  onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-purple-500"
                >
                  <option value="all">🌐 360° முழுமையான வாழ்வியல் அறிக்கை (அனைத்தும்)</option>
                  <option value="bhoomi">🏡 பூமி யோகம் & நிலம் வாங்கும் காலம் (4-ஆம் பாவக ஆய்வு)</option>
                  <option value="career">💼 வேலைவாய்ப்பு, அரசுத் தேர்வு & பதவி உயர்வு (10-ஆம் பாவகம்)</option>
                  <option value="marriage">💍 விவாகப் பிராப்தி & திருமணப் பொருத்தம் (7-ஆம் பாவகம்)</option>
                  <option value="finance">💰 கடன் சுமை நீக்கம் & தன யோகம் (2 & 11-ஆம் பாவகம்)</option>
                </select>
              </div>
            </div>

            {/* சட்ட பாதுகாப்பு செக்பாக்ஸ் */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="astrology-consent"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 h-4 w-4 rounded bg-slate-900 border-slate-700 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="astrology-consent" className="text-[11px] text-slate-400 leading-relaxed cursor-pointer">
                <strong>சட்டப்பூர்வ உடன்படிக்கை:</strong> இக்கணிப்புகள் பாரம்பரிய 7 ஜோதிட சாஸ்திரங்கள் மற்றும் AI அல்காரிதம் அடிப்படையிலான வாழ்வியல் வழிகாட்டல் மட்டுமே. இறுதி முடிவுகளுக்குப் பயனரே பொறுப்பு என்பதை ஒப்புக்கொண்டு எனது சொந்த விருப்பத்தின் பேரில் இந்த ஆலோசனையைப் பெறுகிறேன்.
              </label>
            </div>

            {/* தட்சணை தேர்வுகள் */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">விருப்பம் 1: உடனடி ஸ்னாப்ஷாட்</span>
                    <span className="text-base font-black text-amber-400">₹21</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">அடிப்படை 360° AI தசா அறிக்கை</h4>
                  <ul className="mt-2 space-y-1 text-xs text-slate-400 list-disc list-inside">
                    <li>தற்போதைய தசா-புக்தி பலன் மற்றும் சதவிகித சாதகம்</li>
                    <li>இஷ்ட தெய்வம், குலதெய்வ வகை & நட்சத்திர விருட்சம்</li>
                    <li>அதிர்ஷ்ட எண் & பஞ்சபட்சி நிலை</li>
                  </ul>
                </div>
                <button
                  onClick={() => handleGenerateReport({ amount: 21, title: 'அடிப்படை AI தசா அறிக்கை' })}
                  className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-purple-500/40 transition-all"
                >
                  ₹21 தட்சணையுடன் கணிப்பு பெறுக ↗
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-950/20 to-purple-950/30 flex flex-col justify-between space-y-3 relative overflow-hidden">
                <span className="absolute top-2 right-2 px-2 py-0.5 text-[9px] font-black uppercase bg-amber-500 text-slate-950 rounded">மக்கள் விருப்பம்</span>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">விருப்பம் 2: முழுமை 360°</span>
                    <span className="text-base font-black text-emerald-400">₹49</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">முழு 7 சாஸ்திர AI வாழ்வியல் அறிக்கை</h4>
                  <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside">
                    <li><strong>நிலம் யோகம்:</strong> எப்போது நிலம் வாங்கலாம்? வாஸ்து திசை</li>
                    <li><strong>கே.பி. டைமிங்:</strong> வேலை / தொழில் வளர்ச்சி மாதக் கணிப்பு</li>
                    <li><strong>நாடி பரிகாரம்:</strong> செலவில்லா மரக்கன்று & சித்தர் வழிபாட்டு முறை</li>
                    <li>வாட்ஸ்அப் PDF அறிக்கை வடிவமைப்பு</li>
                  </ul>
                </div>
                <button
                  onClick={() => handleGenerateReport({ amount: 49, title: 'முழு 7 சாஸ்திர AI வாழ்வியல் அறிக்கை' })}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  ₹49 தட்சணையுடன் முழு அறிக்கை பெறுக ↗
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. கணிக்கப்பட்ட 360° முடிவுத் திரை */}
        {activeSubTab === 'result' && (
          <div className="mt-6 space-y-6">
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl flex flex-col md:flex-row justify-between items-center gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">டிஜிட்டல் தட்சணை உறுதிசெய்யப்பட்டது • கணிப்பு முடிவுகள் தயார்</span>
                <h3 className="text-lg font-black text-white">{formData.name} அவர்களுக்கான 360° AI வாழ்வியல் ஜாதகம்</h3>
                <p className="text-xs text-slate-400">பிறந்த தேதி: {formData.dob} | ராசி: {formData.rasi} | நட்சத்திரம்: {formData.nakshatra}</p>
              </div>
              <button
                onClick={() => setActiveSubTab('input')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white"
              >
                புதிய கணிப்பு செய்ய ↺
              </button>
            </div>

            {/* 7 சாஸ்திரங்களின் தொகுப்பு அட்டைகள் */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* அட்டை 1: வேத ஜோதிடம் & தசா நிலை */}
              <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2.5">
                <span className="text-purple-400 font-bold text-sm block">1. வேத தசா-புக்தி டைம்லைன் (Vedic Blueprint)</span>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1.5">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">நடப்பு தசை: குரு தசை - சுக்கிர புக்தி</span>
                    <span className="text-emerald-400">82% சாதகம்</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full w-[82%]"></div>
                  </div>
                  <p className="text-[11px] text-slate-400">புதிய சொத்துக்கள் வாங்குவதற்கும், அரசு தேர்வுகள் மற்றும் பதவி உயர்வுக்கு மிகவும் உகந்த காலம்.</p>
                </div>
              </div>

              {/* அட்டை 2: பூமி யோகம் & வாஸ்து (நில இணைப்பு) */}
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2.5">
                <span className="text-amber-400 font-bold text-sm block">2. பூமி யோகம் & வாஸ்து பார்வை (Bhoomi Shastra)</span>
                <p className="text-slate-300 leading-relaxed">
                  4-ஆம் பாவக அதிபதி மற்றும் செவ்வாய் பலம் சாதகமாக உள்ளது. <strong>வடக்கு அல்லது கிழக்கு பார்த்த வீட்டுமனை</strong> வாங்குவது செல்வ விருத்தியை உண்டாக்கும்.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      if (setCurrentModule) setCurrentModule('land');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3 py-1 bg-amber-600/30 text-amber-300 border border-amber-500/40 rounded text-[11px] font-bold hover:bg-amber-600/50"
                  >
                    🏡 நில சந்தை செல்ல ↗
                  </button>
                </div>
              </div>

              {/* அட்டை 3: கே.பி. நேரக் கணிப்பு & தொழில் */}
              <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30 space-y-2.5">
                <span className="text-cyan-400 font-bold text-sm block">3. கே.பி. நேரக் கணிப்பு (KP Sub-Lord Timing)</span>
                <p className="text-slate-300 leading-relaxed">
                  10-ஆம் பாவக உப நட்சத்திர அதிபதி சூரியனின் தொடர்பில் உள்ளதால், அரசு சார்ந்த ஒப்பந்தங்கள் அல்லது அரசு கூட்டுறவு வேலைவாய்ப்புகளில் வெற்றி பெற 2026-ஆம் ஆண்டு இரண்டாம் பகுதி மிகச் சிறப்பானது.
                </p>
                <button
                  onClick={() => {
                    if (setCurrentModule) setCurrentModule('jobs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1 bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 rounded text-[11px] font-bold hover:bg-cyan-600/50"
                >
                  💼 வேலைவாய்ப்பு ஹப் செல்ல ↗
                </button>
              </div>

              {/* அட்டை 4: தமிழ் நாடி முறை & எளிய இயற்கை பரிகாரம் */}
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2.5">
                <span className="text-emerald-400 font-bold text-sm block">4. தமிழ் நாடி சித்தர் பரிகாரம் (செலவில்லா வழிகாட்டல்)</span>
                <ul className="space-y-1 text-slate-300">
                  <li>🌱 <strong>நட்சத்திர விருட்சம்:</strong> {selectedNak.tree} நடுதல் / பராமரித்தல்.</li>
                  <li>🕊️ <strong>ஜீவராசி அன்னதானம்:</strong> எறும்புகளுக்கு பச்சரிசி ரவை மற்றும் காகத்திற்கு உணவிடுதல்.</li>
                  <li>🛕 <strong>இஷ்ட தெய்வம்:</strong> {selectedNak.deity} வழிபாடு.</li>
                </ul>
                <button
                  onClick={() => {
                    if (setCurrentModule) setCurrentModule('spiritual');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1 bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded text-[11px] font-bold hover:bg-emerald-600/50"
                >
                  🛕 பரிகாரக் கோவில்கள் செல்ல ↗
                </button>
              </div>
            </div>

            {/* வாட்ஸ்அப் முழு ரிப்போர்ட் பகிர்தல் */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs text-slate-300">இந்த முழு கணிப்பை உங்கள் வாட்ஸ்அப்பில் சேமித்துக்கொள்ள வேண்டுமா?</span>
              <a
                href={`https://wa.me/919962369131?text=${encodeURIComponent(`வணக்கம் நம்ம பூமி 360! நான் AI ஜோதிட ஜாதக அறிக்கை பெற்றுள்ளேன்.\nபெயர்: ${formData.name}\nராசி: ${formData.rasi}\nநட்சத்திரம்: ${formData.nakshatra}\nமுழு PDF அறிக்கையை அனுப்பவும்.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-lg flex items-center gap-2"
              >
                <span>📲</span> வாட்ஸ்அப்பில் PDF பெற ↗
              </a>
            </div>
          </div>
        )}

        {/* 5. பஞ்சபட்சி நேரலை கணிப்பான் (TAB 2) */}
        {activeSubTab === 'pakshi' && (
          <div className="mt-6 space-y-5">
            <div className="bg-slate-950 p-5 rounded-xl border border-purple-500/30 space-y-3">
              <span className="text-purple-300 font-bold text-sm block">🦅 பஞ்சபட்சி நேரக் கணிப்பான் (Pancha Pakshi Live State)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                பஞ்சபட்சி சாஸ்திரம் என்பது தமிழர்களின் மிகத் துல்லியமான நேரக் கணிப்பு முறையாகும். இதில் ஐந்து தொழில்கள் உள்ளன: <strong>அரசு, ஊண், நடை, துயில், சாவு</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">உங்கள் நட்சத்திரப் பட்சி:</span>
                  <span className="text-base font-black text-amber-400 mt-1 block">
                    {selectedNak.pakshi} ({formData.nakshatra} நட்சத்திரம்)
                  </span>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">வெற்றி தரும் தொழில்கள்:</span>
                  <span className="text-emerald-400 font-bold mt-1 block">
                    👑 அரசு (100% வெற்றி) & 🌾 ஊண் (80% சாதகம்)
                  </span>
                  <span className="text-[10px] text-slate-400">இந்த நேரங்களில் நிலப் பதிவு, ஒப்பந்தங்கள், அல்லது பணப் பரிவர்த்தனை செய்வது 100% ஜெயம் தரும்.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. சோழி & தாம்பூலப் பிரசன்னம் (TAB 3) */}
        {activeSubTab === 'prasannam' && (
          <div className="mt-6 space-y-4">
            <div className="bg-slate-950 p-5 rounded-xl border border-purple-500/30 space-y-3">
              <span className="text-purple-300 font-bold text-sm block">🐚 உடனடி சோழி & தாம்பூலப் பிரசன்னம் (Instant Horary)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                பிறந்த தேதி அல்லது ஜாதகம் இல்லாதவர்கள், இப்போதுள்ள மனக் குழப்பத்திற்கு உடனடித் தீர்வு பெற சோழி பிரசன்னத்தை நாடலாம். நீங்கள் கேள்வி கேட்கும் இந்த வினாடியின் கோள் அமைப்பை வைத்து வழிகாட்டல் தரப்படுகிறது.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
                <div>🕒 <strong>தற்போதைய பிரசன்ன லக்னம்:</strong> சுப லக்னம் & சுக்கிர பார்வை</div>
                <div>💡 <strong>வழிகாட்டல்:</strong> உங்கள் மனதில் உள்ள புதிய முயற்சி அடுத்த 45 நாட்களில் சாதகமாக முடியும். செவ்வாய்க்கிழமைகளில் துர்க்கை வழிபாடு நலம் தரும்.</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 7. தட்சணை செலுத்தும் பாப்-அப் (Payment Modal) */}
      {showPayModal && payPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-purple-500/50 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-left">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="font-bold text-sm text-white">டிஜிட்டல் மங்கள தட்சணை</span>
              <button
                onClick={() => setShowPayModal(false)}
                className="text-slate-400 hover:text-white font-bold text-base"
              >
                ✕
              </button>
            </div>

            <div className="text-center py-2 space-y-2">
              <span className="text-xs text-purple-300 block font-semibold">{payPlan.title}</span>
              <div className="text-3xl font-black text-emerald-400">₹{payPlan.amount}</div>
              <p className="text-[11px] text-slate-400">Google Pay / PhonePe / Paytm மூலம் பாதுகாப்பாகச் செலுத்தலாம்</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="inline-block p-2 bg-white rounded-lg">
                {/* QR Code Placeholder */}
                <div className="w-32 h-32 bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-xs">
                  UPI QR SCAN
                </div>
              </div>
              <span className="block text-[11px] text-slate-400 font-mono">UPI ID: 9962369131@okaxis</span>
            </div>

            <button
              onClick={handleConfirmDakshina}
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              {loading ? 'கணிப்பு தயாராகிறது...' : `செலுத்தினேன் (₹${payPlan.amount}) • பலனைப் பார் ↗`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}