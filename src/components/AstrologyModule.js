import React, { useState } from 'react';

// 12 ராசிகள் பட்டியல்
const RASIS = [
  'மேஷம் (Aries)', 'ரிஷபம் (Taurus)', 'மிதுனம் (Gemini)', 'கடகம் (Cancer)',
  'சிம்மம் (Leo)', 'கன்னி (Virgo)', 'துலாம் (Libra)', 'விருச்சிகம் (Scorpio)',
  'தனுசு (Sagittarius)', 'மகரம் (Capricorn)', 'கும்பம் (Aquarius)', 'மீனம் (Pisces)'
];

// 27 நட்சத்திரங்கள் & பஞ்சபட்சி அட்டவணை
const NAKSHATRAS = [
  { id: 'aswini', name: 'அஸ்வினி', pakshi: 'வல்லூறு' },
  { id: 'bharani', name: 'பரணி', pakshi: 'வல்லூறு' },
  { id: 'krithika', name: 'கார்த்திகை', pakshi: 'வல்லூறு' },
  { id: 'rohini', name: 'ரோகிணி', pakshi: 'ஆந்தை' },
  { id: 'mriga', name: 'மிருகசீரிஷம்', pakshi: 'ஆந்தை' },
  { id: 'arudra', name: 'திருவாதிரை', pakshi: 'ஆந்தை' },
  { id: 'punarvasu', name: 'புனர்பூசம்', pakshi: 'காகம்' },
  { id: 'pushya', name: 'பூசம்', pakshi: 'காகம்' },
  { id: 'ashlesha', name: 'ஆயில்யம்', pakshi: 'காகம்' },
  { id: 'magha', name: 'மகம்', pakshi: 'கோழி' },
  { id: 'poorvaphalguni', name: 'பூரம்', pakshi: 'கோழி' },
  { id: 'uttaraphalguni', name: 'உத்திரம்', pakshi: 'கோழி' },
  { id: 'hastha', name: 'அஸ்தம்', pakshi: 'மயில்' },
  { id: 'chitra', name: 'சித்திரை', pakshi: 'மயில்' },
  { id: 'swati', name: 'சுவாதி', pakshi: 'மயில்' },
  { id: 'vishakha', name: 'விசாகம்', pakshi: 'வல்லூறு' },
  { id: 'anuradha', name: 'அனுஷம்', pakshi: 'வல்லூறு' },
  { id: 'jyeshtha', name: 'கேட்டை', pakshi: 'வல்லூறு' },
  { id: 'moola', name: 'மூலம்', pakshi: 'ஆந்தை' },
  { id: 'poorvashada', name: 'பூராடம்', pakshi: 'ஆந்தை' },
  { id: 'uttarashada', name: 'உத்திராடம்', pakshi: 'ஆந்தை' },
  { id: 'shravana', name: 'திருவோணம்', pakshi: 'காகம்' },
  { id: 'dhanishta', name: 'அவிட்டம்', pakshi: 'காகம்' },
  { id: 'shatabhisha', name: 'சதயம்', pakshi: 'காகம்' },
  { id: 'poorvabhadra', name: 'பூரட்டாதி', pakshi: 'கோழி' },
  { id: 'uttarabhadra', name: 'உத்திரட்டாதி', pakshi: 'கோழி' },
  { id: 'revati', name: 'ரேவதி', pakshi: 'கோழி' }
];

// பஞ்சபட்சி கால அட்டவணை
const PAKSHI_SLOTS = [
  { time: '06:00 - 08:24', act: 'ஊண்', status: '🟢 தொடக்கத்திற்கு நன்று', score: 78 },
  { time: '08:24 - 10:48', act: 'நடை', status: '🟡 வழக்கமான பணிகள்', score: 60 },
  { time: '10:48 - 13:12', act: 'அரசு (அரசாளும் நேரம்)', status: '⭐ அதீத வெற்றி / ஒப்பந்தம்', score: 96 },
  { time: '13:12 - 15:36', act: 'துயில்', status: '🟠 அமைதி காக்கவும்', score: 45 },
  { time: '15:36 - 18:00', act: 'சாவு', status: '🔴 முக்கிய காரியம் தவிர்க்கவும்', score: 20 }
];

export default function AstrologyModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('intelligence'); // intelligence, pakshi, prasannam
  const [step, setStep] = useState(1); // 1: Input, 2: Pricing, 3: Dashboard

  // பயனர் தகவல்கள்
  const [formData, setFormData] = useState({
    name: 'S. Udayakumar',
    dob: '1979-08-26',
    tob: '10:30',
    pob: 'சென்னை',
    rasi: 'கன்னி (Virgo)',
    nakshatra: 'அஸ்தம்'
  });

  const selectedPakshi = NAKSHATRAS.find(n => n.name === formData.nakshatra)?.pakshi || 'மயில்';

  // தட்சணைத் திட்டம்
  const [payPlan, setPayPlan] = useState({
    amount: 49,
    title: '360° AI வாழ்வியல் & பூமி யோக அறிக்கை',
    chatLimit: 5
  });

  // ஆரா AI சேட்டிங்
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'aura',
      text: 'வணக்கம்! நான் அடுத்த தலைமுறை ஜோதிட வழிகாட்டி "ஆரா AI". உங்கள் கன்னி ராசி மற்றும் அஸ்தம் நட்சத்திரப்படி தொழில் உயர்வு, சொத்து யோகம், பரிகாரங்கள் குறித்துக் கேளுங்கள்.'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // சோழி பிரசன்னம் ஸ்டேட்
  const [isRolling, setIsRolling] = useState(false);
  const [prasannamResult, setPrasannamResult] = useState(null);

  const handleRollCowrie = () => {
    setIsRolling(true);
    setPrasannamResult(null);
    setTimeout(() => {
      const results = [
        { count: '8 சோழிகள் நேர்முகம் (ராஜ யோகம்)', verdict: 'முழுமையான காரிய சித்தி உண்டு. நினைத்த காரியத்தில் வெற்றி நிச்சயம்.', status: '100% வெற்றி 🌟', border: 'border-emerald-500' },
        { count: '6 சோழிகள் நேர்முகம் (சுப விரயம்)', verdict: 'காரியம் கூடிவரும். அலைச்சலும் சுபச் செலவுகளும் ஏற்படும். குலதெய்வ வழிபாடு நன்று.', status: 'சுப பலன் 🟢', border: 'border-teal-500' },
        { count: '10 சோழிகள் நேர்முகம் (தெய்வ அனுக்கிரகம்)', verdict: 'எதிர்பாராத அதிர்ஷ்டம் மற்றும் பெரிய மனிதர்களின் உதவி கிட்டும். பொற்காலம்.', status: 'மகா பாக்கியம் ✨', border: 'border-purple-500' },
        { count: '4 சோழிகள் நேர்முகம் (மந்த நிலை)', verdict: 'தற்போது காரியத்தை தள்ளிப்போடுவது நல்லது. இன்னும் 30 நாட்களில் யோகம் கூடும்.', status: 'பொறுமை தேவை ⏳', border: 'border-amber-500' }
      ];
      setPrasannamResult(results[Math.floor(Math.random() * results.length)]);
      setIsRolling(false);
    }, 900);
  };

  const handleSendMessage = () => {
    if (!inputQuery.trim()) return;
    const userText = inputQuery;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const q = userText.toLowerCase();

      if (q.includes('job') || q.includes('promotion') || q.includes('pathavi') || q.includes('velai') || q.includes('பதவி') || q.includes('வேலை')) {
        reply = '10-ஆம் பாவக உப நட்சத்திர அதிபதி தொடர்பு மற்றும் குருவின் பார்வை சாதகமாக இருப்பதால், நடப்பு ஆண்டில் தலைமைப் பொறுப்பு மற்றும் பதவி உயர்வு வாய்ப்புகள் 88% உறுதியாக உள்ளது.';
      } else if (q.includes('land') || q.includes('plot') || q.includes('nilam') || q.includes('veedu') || q.includes('நிலம்') || q.includes('மனை')) {
        reply = '4-ஆம் பாவக பூமி காரகன் செவ்வாய் பலமாக உள்ளார். வடக்கு அல்லது வடகிழக்கு பார்த்த மனை யோகத்தை தரும். நடப்பு காலகட்டம் பத்திரப் பதிவுக்கு உகந்தது.';
      } else if (q.includes('pariharam') || q.includes('kovil') || q.includes('பரிகாரம்')) {
        reply = 'அஸ்தம் நட்சத்திரத்திற்குரிய அத்தி மரக்கன்று நடுதல் மற்றும் எறும்புகளுக்கு பச்சரிசி ரவை இடுதல் மிகச் சிறந்த சித்தர்பூர்வ வாழ்வியல் பரிகாரமாகும்.';
      } else {
        reply = 'உங்கள் தற்போதைய தசா-புக்தி பலம் 84% சாதகமாக உள்ளது. நீங்கள் எடுக்கும் புதிய முயற்சிகளுக்கு குலதெய்வ அனுகூலம் துணை நிற்கும்.';
      }

      setChatMessages(prev => [...prev, { sender: 'aura', text: reply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 text-slate-100 print:p-0 print:text-black">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-card { border: 1px solid #ccc !important; background: white !important; color: black !important; }
        }
      `}} />

      {/* தலைமை ஹெடர் */}
      <div className="text-center space-y-2 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-emerald-500/10 border border-amber-500/30 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
            Next-Gen AI Astrotech Platform • பூமி 360
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
          360° AI வாழ்வியல் & பூமி நுண்ணறிவு ஜாதகம்
        </h1>
        <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto">
          பாரம்பரிய 7 சாஸ்திரங்கள் + AI லைஃப் டைம்லைன் கிராஃப் + ரியல்-டைம் காரிய சித்தி மீட்டர்
        </p>
      </div>

      {/* முதன்மை நேவிகேஷன் */}
      <div className="grid grid-cols-3 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs md:text-sm font-bold no-print">
        <button
          onClick={() => { setActiveTab('intelligence'); setStep(1); }}
          className={`py-2.5 rounded-xl transition-all ${activeTab === 'intelligence' ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          🔮 AI ஜாதக நுண்ணறிவு
        </button>
        <button
          onClick={() => setActiveTab('pakshi')}
          className={`py-2.5 rounded-xl transition-all ${activeTab === 'pakshi' ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          🦅 பஞ்சபட்சி லைவ் ரேடார்
        </button>
        <button
          onClick={() => setActiveTab('prasannam')}
          className={`py-2.5 rounded-xl transition-all ${activeTab === 'prasannam' ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          🎲 சோழி & தேவ பிரசன்னம்
        </button>
      </div>

      {/* ===================== படி 1: உள்ளீட்டுப் படிவம் ===================== */}
      {activeTab === 'intelligence' && step === 1 && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-5 no-print">
          <h3 className="text-sm md:text-base font-bold text-amber-300 border-b border-slate-800 pb-3">
            👤 ஜாதகருக்குரிய அடிப்படைப் பிறப்பு விவரங்கள்
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">பெயர்</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">பிறந்த தேதி</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">பிறந்த நேரம்</label>
              <input
                type="time"
                value={formData.tob}
                onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">பிறந்த இடம்</label>
              <input
                type="text"
                value={formData.pob}
                onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">ராசி</label>
              <select
                value={formData.rasi}
                onChange={(e) => setFormData({ ...formData, rasi: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 outline-none"
              >
                {RASIS.map((r, i) => <option key={i} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">நட்சத்திரம்</label>
              <select
                value={formData.nakshatra}
                onChange={(e) => setFormData({ ...formData, nakshatra: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 outline-none"
              >
                {NAKSHATRAS.map(n => <option key={n.id} value={n.name}>{n.name} (பட்சி: {n.pakshi})</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black rounded-xl text-sm shadow-xl transition-all cursor-pointer"
          >
            அடுத்த தலைமுறை AI ஜாதகத்தை திறக்க ➔
          </button>
        </div>
      )}

      {/* ===================== படி 2: மைக்ரோ-தட்சணை ===================== */}
      {activeTab === 'intelligence' && step === 2 && (
        <div className="space-y-4 no-print">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-extrabold text-white">ஜோதிட தட்சணை முறைமை</h3>
            <p className="text-xs text-slate-400">உடனடி UPI மைக்ரோ-பேமெண்ட் மூலம் முழு அறிக்கையைத் திறக்கவும்</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => { setPayPlan({ amount: 21, title: 'உடனடி ஸ்னாப்ஷாட்', chatLimit: 1 }); setStep(3); }}
              className="p-5 bg-slate-900 border border-slate-800 rounded-2xl cursor-pointer hover:border-amber-500 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-slate-400">அடிப்படை</span>
                <div className="text-2xl font-black text-amber-400 my-1">₹21</div>
                <p className="text-xs text-slate-300 leading-relaxed">• தசா-புக்தி சுருக்கம்<br />• சித்தர் எளிய பரிகாரம்<br />• ஆரா AI 1 கேள்வி</p>
              </div>
              <button className="w-full mt-4 py-2 bg-slate-800 hover:bg-amber-500 hover:text-black font-bold text-xs rounded-xl">தேர்வு செய் ➔</button>
            </div>

            <div
              onClick={() => { setPayPlan({ amount: 49, title: '360° AI வாழ்வியல் & பூமி யோகம்', chatLimit: 5 }); setStep(3); }}
              className="p-5 bg-gradient-to-b from-slate-900 to-amber-950/30 border-2 border-amber-500 rounded-2xl cursor-pointer shadow-xl relative flex flex-col justify-between"
            >
              <div className="absolute -top-3 right-4 bg-amber-500 text-black text-[10px] font-black px-3 py-0.5 rounded-full">POPULAR 🔥</div>
              <div>
                <span className="text-xs font-bold text-amber-400">முழுமை 360°</span>
                <div className="text-2xl font-black text-amber-400 my-1">₹49</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <b>முழு 7 சாஸ்திரங்கள்</b><br />
                  • <b>வாழ்வியல் டைம்லைன் கிராஃப்</b><br />
                  • பூமி யோகம் & மனை வாஸ்து<br />
                  • ஆரா AI 5 கேள்விகள் + PDF
                </p>
              </div>
              <button className="w-full mt-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs rounded-xl shadow-lg">அறிக்கை திறக்க ➔</button>
            </div>

            <div
              onClick={() => { setPayPlan({ amount: 99, title: 'மாஸ்டர் வாழ்நாள் ஜாதகம்', chatLimit: 999 }); setStep(3); }}
              className="p-5 bg-slate-900 border border-purple-500/50 rounded-2xl cursor-pointer hover:border-purple-400 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-purple-400">வாழ்நாள் பிரீமியம்</span>
                <div className="text-2xl font-black text-purple-400 my-1">₹99</div>
                <p className="text-xs text-slate-300 leading-relaxed">• வாழ்நாள் மாஸ்டர் PDF<br />• 12 பாவக முழு பலன்கள்<br />• வரம்பற்ற ஆரா AI சாட்</p>
              </div>
              <button className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl">தேர்வு செய் ➔</button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== படி 3: NEXT-GEN AI டாஷ்போர்டு ===================== */}
      {activeTab === 'intelligence' && step === 3 && (
        <div className="space-y-6">
          {/* முகப்பு பேனர் */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print-card">
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest no-print">
                ✓ AI பகுப்பாய்வு நிறைவு • {payPlan.title}
              </span>
              <h2 className="text-xl font-black text-white">
                {formData.name} — 360° AI வாழ்வியல் வரைபடம்
              </h2>
              <p className="text-xs text-slate-400">
                ராசி: <b className="text-amber-300">{formData.rasi}</b> | நட்சத்திரம்: <b className="text-amber-300">{formData.nakshatra}</b> | பட்சி: <b className="text-emerald-400">{selectedPakshi}</b>
              </p>
            </div>
            <div className="flex gap-2 no-print">
              <button
                onClick={() => window.print()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
              >
                📄 வண்ண PDF சேமி (Print)
              </button>
              <button
                onClick={() => setStep(1)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-2.5 rounded-xl border border-slate-700 cursor-pointer"
              >
                🔄 புதியது
              </button>
            </div>
          </div>

          {/* 1. இன்டராக்டிவ் வாழ்வியல் டைம்லைன் பார் கிராஃப் */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 print-card">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-amber-300 flex items-center gap-2">
                  📊 AI Life Opportunity Timeline (2026 - 2028 வாய்ப்பு வரைகலை)
                </h3>
                <p className="text-[11px] text-slate-400">தசா-புக்தி & கோச்சார பலம் அடிப்படையிலான வாய்ப்பு புள்ளிகள் (0 - 100%)</p>
              </div>
              <span className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
                உச்ச யோகம்: 2026 Q3-Q4
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>2026 (நடப்பு): பதவி உயர்வு & அதிகார யோகம்</span>
                  <span className="text-emerald-400">88% சாதகம்</span>
                </div>
                <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>2027: பூமி & ரியல் எஸ்டேட் சொத்து சேர்க்கை</span>
                  <span className="text-amber-400">94% அதீத யோகம்</span>
                </div>
                <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all" style={{ width: '94%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>2028: நிதி ஸ்திரத்தன்மை & தொழில் விரிவாக்கம்</span>
                  <span className="text-purple-400">82% சாதகம்</span>
                </div>
                <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full transition-all" style={{ width: '82%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* 2. இன்றைய நேரலை முடிவெடுக்கும் மீட்டர் */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 print-card">
            <h3 className="text-sm font-extrabold text-emerald-300">
              ⚡ இன்றைய காரிய சித்தி சிக்னல்கள் (Daily Decision Radar)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-950 border border-emerald-500/30 rounded-xl">
                <span className="text-xs text-slate-400 block">முக்கிய ஒப்பந்தம் & பத்திரப்பதிவு</span>
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> சாதகமானது (காலை 10:48 - 13:12)
                </span>
              </div>
              <div className="p-3.5 bg-slate-950 border border-teal-500/30 rounded-xl">
                <span className="text-xs text-slate-400 block">புதிய பண முதலீடு</span>
                <span className="text-sm font-bold text-teal-400 flex items-center gap-1.5 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" /> தாராளமாகச் செய்யலாம் (78%)
                </span>
              </div>
              <div className="p-3.5 bg-slate-950 border border-amber-500/30 rounded-xl">
                <span className="text-xs text-slate-400 block">கடன் கொடுக்கல் & வாங்கல்</span>
                <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> கவனம் தேவை / மிதமான அளவு
                </span>
              </div>
            </div>
          </div>

          {/* 3. ராசி - நவாம்ச கட்டங்கள் */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 print-card">
            <h3 className="text-sm font-bold text-amber-300">🏛️ தென்னிந்திய பாரம்பரிய கட்டங்கள் (லக்னம் & ராசி: கன்னி)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-square bg-slate-950 p-2 rounded-xl border border-slate-800 grid grid-cols-4 grid-rows-4 gap-1 text-[10px] text-center">
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">மீனம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">மேஷம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">ரிஷபம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">மிதுனம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">கும்பம்</div>
                <div className="col-span-2 row-span-2 bg-slate-900/80 flex items-center justify-center font-bold text-amber-400 text-xs">ராசி</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">கடகம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">மகரம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">சிம்மம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">தனுசு</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">விருச்சிகம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">துலாம்</div>
                <div className="border border-amber-500 bg-amber-500/10 flex flex-col items-center justify-center text-amber-300 font-bold">
                  <span>கன்னி</span><span className="text-[8px] text-emerald-400">லக்/சந்</span>
                </div>
              </div>

              <div className="aspect-square bg-slate-950 p-2 rounded-xl border border-slate-800 grid grid-cols-4 grid-rows-4 gap-1 text-[10px] text-center">
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">மீனம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-amber-300">மேஷம் (செவ்)</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">ரிஷபம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">மிதுனம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">கும்பம்</div>
                <div className="col-span-2 row-span-2 bg-slate-900/80 flex items-center justify-center font-bold text-purple-400 text-xs">நவாம்சம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">கடகம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">மகரம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">சிம்மம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">தனுசு</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">விருச்சிகம்</div>
                <div className="border border-slate-800 flex items-center justify-center text-slate-400">துலாம்</div>
                <div className="border border-purple-500 bg-purple-500/10 flex flex-col items-center justify-center text-purple-300 font-bold">
                  <span>கன்னி</span><span className="text-[8px] text-cyan-400">புதன் (ஆட்சி)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. ஆரா AI கோ-பைலட் */}
          <div className="bg-slate-900 border border-purple-500/40 p-5 rounded-2xl space-y-4 no-print shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-sm font-black text-purple-300">Aura AI Co-Pilot (தமிழ் & Tanglish வழிகாட்டி)</h4>
              </div>
              <span className="text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                Live Intelligence Active
              </span>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`text-xs p-3 rounded-2xl max-w-[85%] leading-relaxed ${msg.sender === 'user' ? 'bg-amber-500 text-slate-950 font-bold rounded-tr-none' : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-xs text-slate-400 italic">ஆரா கணக்கிடுகிறது...</div>}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputQuery}
                placeholder="எ.கா: பதவி உயர்வு எப்போது வரும்? அல்லது மனை வாங்கும் யோகம் உள்ளதா?"
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                கேட்க ➔
              </button>
            </div>
          </div>

          {/* வாட்ஸ்அப் பகிர்தல் பட்டன் */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-3 no-print">
            <span className="text-xs text-slate-300">முழு அறிக்கையையும் வாட்ஸ்அப் ஆவண வடிவில் பெறவும்.</span>
            <a
              href={`https://wa.me/919962369131?text=${encodeURIComponent(
`🌟 *360° AI வாழ்வியல் & பூமி நுண்ணறிவு அறிக்கை* 🌟
----------------------------------------------
👤 *ஜாதகர்:* ${formData.name}
• ராசி: ${formData.rasi} | நட்சத்திரம்: ${formData.nakshatra} (பட்சி: ${selectedPakshi})
• தசா பலம்: 88% சாதகம் (பதவி உயர்வு & பூமி யோகம் வலுவாக உள்ளது)
• பஞ்சபட்சி அரசாளும் நேரம்: காலை 10:48 - 13:12
• சித்தர் பரிகாரம்: அத்தி மரம் நடுதல் / பச்சரிசி ரவை அன்னதானம்.

📲 தயவுசெய்து எனது முழு வண்ணமயமான PDF அறிக்கையை அனுப்பவும்.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
            >
              <span>📲 வாட்ஸ்அப்பில் பெறுக ↗</span>
            </a>
          </div>
        </div>
      )}

      {/* ===================== பஞ்சபட்சி ரேடார் ===================== */}
      {activeTab === 'pakshi' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 no-print">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-emerald-400">🦅 பஞ்சபட்சி 24/7 லைவ் ரேடார்</h3>
              <p className="text-xs text-slate-400">நட்சத்திரம்: <b className="text-white">{formData.nakshatra}</b> | பட்சி: <b className="text-amber-400">{selectedPakshi}</b></p>
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">🟢 செயலில் உள்ளது</span>
          </div>

          <div className="space-y-3 text-xs">
            {PAKSHI_SLOTS.map((slot, idx) => (
              <div key={idx} className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-2 ${slot.act.includes('அரசு') ? 'bg-amber-500/10 border-amber-500/50 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>
                <div>
                  <span className="font-bold text-sm block">{slot.time} : {slot.act}</span>
                  <span className="text-[11px] text-slate-400">{slot.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700 hidden md:block">
                    <div className="bg-emerald-400 h-full" style={{ width: `${slot.score}%` }} />
                  </div>
                  <span className="font-bold text-xs px-2.5 py-1 bg-slate-900 rounded border border-slate-700">{slot.score}% பலம்</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== சோழி பிரசன்னம் ===================== */}
      {activeTab === 'prasannam' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 no-print text-center">
          <h3 className="text-base font-black text-rose-400">🔮 உடனடி சோழி & தேவ பிரசன்ன முடிவு</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            மனதில் குறிப்பிட்ட ஒரு காரியத்தை ஆழமாக வேண்டிக்கொண்டு சோழி உருட்டவும்.
          </p>

          <div className="p-6 bg-slate-950 rounded-2xl border border-rose-500/30 space-y-4">
            <div className="text-4xl">🎲 🐚 🐚</div>
            <button
              onClick={handleRollCowrie}
              disabled={isRolling}
              className="px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              {isRolling ? 'சோழிகள் சுழல்கின்றன... உருட்டப்படுகிறது...' : '🎲 சோழி உருட்டி தெய்வீகத் தீர்ப்பு பெறுக ➔'}
            </button>

            {prasannamResult && (
              <div className={`p-4 rounded-xl border bg-slate-900 mt-4 text-left space-y-2 ${prasannamResult.border}`}>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white">{prasannamResult.count}</span>
                  <span className="text-xs font-black text-emerald-400">{prasannamResult.status}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{prasannamResult.verdict}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}