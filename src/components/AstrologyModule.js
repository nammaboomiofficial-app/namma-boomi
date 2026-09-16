import React, { useState } from 'react';

// 12 ராசிகள் பட்டியல்
const RASIS = [
  'மேஷம் (Aries)', 'ரிஷபம் (Taurus)', 'மிதுனம் (Gemini)', 'கடகம் (Cancer)',
  'சிம்மம் (Leo)', 'கன்னி (Virgo)', 'துலாம் (Libra)', 'விருச்சிகம் (Scorpio)',
  'தனுசு (Sagittarius)', 'மகரம் (Capricorn)', 'கும்பம் (Aquarius)', 'மீனம் (Pisces)'
];

// 27 நட்சத்திரங்கள் & பஞ்சபட்சி வரைபடம்
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

// பஞ்சபட்சி 5 தொழில்கள் அட்டவணை மாதிரி
const PAKSHI_ACTIVITIES = [
  { time: 'காலை 06:00 - 08:24', act: 'ஊண்', power: 'நற்பலன் தரும் தொடக்கம்', tag: '🟢 சாதகம்' },
  { time: 'காலை 08:24 - 10:48', act: 'நடை', power: 'பயணம் மற்றும் சராசரி பணிகள்', tag: '🟡 சுமாரான நேரம்' },
  { time: 'காலை 10:48 - 01:12', act: 'அரசு (அரசாளும் காலம்)', power: 'ஒப்பந்தம், பத்திரப்பதிவு, புதிய முதலீடு', tag: '⭐ அதீத வெற்றி நேரம்' },
  { time: 'மதியம் 01:12 - 03:36', act: 'துயில்', power: 'ஓய்வு, தியானம் மற்றும் திட்டமிடல்', tag: '🟠 அமைதி காக்கவும்' },
  { time: 'மாலை 03:36 - 06:00', act: 'சாவு', power: 'முக்கிய முடிவுகள், புதிய முயற்சிகளைத் தவிர்க்கவும்', tag: '🔴 தவிர்க்கவும்' }
];

export default function AstrologyModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('jathagam'); // jathagam, pakshi, prasannam
  const [step, setStep] = useState(1); // 1: Input, 2: Pricing, 3: Results
  
  // ஜாதக உள்ளீடு
  const [formData, setFormData] = useState({
    name: 'S. Udayakumar',
    dob: '1979-08-26',
    tob: '10:30',
    pob: 'சென்னை',
    gender: 'male',
    rasi: 'கன்னி (Virgo)',
    nakshatra: 'அஸ்தம்',
    childHoroscope: false
  });

  // நடப்பு பஞ்சபட்சி விவரம்
  const selectedNakObj = NAKSHATRAS.find(n => n.name === formData.nakshatra) || { pakshi: 'மயில்' };

  // தட்சணை திட்டம்
  const [payPlan, setPayPlan] = useState({
    amount: 49,
    title: 'விருப்பம் 2: முழுமை 360° AI வாழ்வியல் அறிக்கை',
    chatLimit: 5
  });

  // ஆரா AI சேட்டிங்
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'aura',
      text: 'வணக்கம்! நான் உங்கள் வாழ்வியல் வழிகாட்டி "ஆரா AI". உங்கள் கன்னி ராசி, அஸ்தம் நட்சத்திரப்படி உங்கள் கேள்விக்குரிய துல்லிய ஜோதிட வழிகாட்டலைக் கேட்கலாம்.'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // PDF அச்சிடும் முறை (Print to PDF)
  const handlePrintPDF = () => {
    window.print();
  };

  const handleSendMessage = () => {
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const q = userText.toLowerCase();

      if (
        q.includes('pathavi') || q.includes('uyarvu') || q.includes('velai') || 
        q.includes('job') || q.includes('promotion') || q.includes('work') ||
        q.includes('பதவி') || q.includes('உயர்வு') || q.includes('வேலை') || q.includes('தொழில்')
      ) {
        reply = `உங்கள் கன்னி ராசி, அஸ்தம் நட்சத்திரத்திற்கு 10-ஆம் பாவக அதிபதி தொடர்பு மிக சாதகமாக உள்ளது. நடப்பு தசா அமைப்புப்படி பதவி உயர்வு மற்றும் புதிய பொறுப்புகள் கூடும் யோகம் மிக வலுவாக உள்ளது; 2026-ஆம் ஆண்டின் இரண்டாம் பகுதியில் உயர் அங்கீகாரம் கிட்டும்.`;
      } else if (
        q.includes('nilam') || q.includes('manai') || q.includes('veedu') || 
        q.includes('land') || q.includes('plot') || q.includes('house') ||
        q.includes('நிலம்') || q.includes('வீடு') || q.includes('மனை') || q.includes('சொத்து')
      ) {
        reply = `4-ஆம் பாவக பூமி ஸ்தானம் மற்றும் செவ்வாய் பலம் சாதகமாக உள்ளது. வடக்கு அல்லது கிழக்கு பார்த்த மனை வாங்குவது யோகத்தைத் தரும். பத்திரப் பதிவுக்கு வியாழன் அல்லது திங்கட்கிழமை உகந்தது.`;
      } else if (
        q.includes('pariharam') || q.includes('kovil') || q.includes('temple') ||
        q.includes('பரிகாரம்') || q.includes('வழிபாடு') || q.includes('கோயில்')
      ) {
        reply = `உங்கள் அஸ்தம் நட்சத்திரத்திற்குரிய அத்தி மரக்கன்று நடுதல் அல்லது பராமரிப்பது மிகுந்த நன்மையைத் தரும். காயத்ரி தேவி வழிபாடு மற்றும் எறும்புகளுக்கு பச்சரிசி ரவை இடுவது காரியத் தடைகளை நீக்கும்.`;
      } else if (
        q.includes('kadan') || q.includes('panam') || q.includes('money') || q.includes('finance') ||
        q.includes('கடன்') || q.includes('பணம்') || q.includes('வருமானம்')
      ) {
        reply = `தன ஸ்தான அதிபதி சுக்கிரன் சாதகமாக இருப்பதால் பண வரவு சீராகும். பழைய கடன்களை அடைப்பதற்கான சாதகமான வழிவகைகள் அடுத்த சில மாதங்களில் உருவாகும்.`;
      } else {
        reply = `உங்கள் கன்னி ராசிக்கு தற்போதைய தசா-புக்தி பலம் 82% சாதகமாக உள்ளது. நீங்கள் நினைத்த காரியம் சுபமாக நிறைவேறும்; குலதெய்வப் பிரார்த்தனையுடன் தொடங்குங்கள்.`;
      }

      setChatMessages((prev) => [...prev, { sender: 'aura', text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 text-slate-100 print:p-0 print:text-black">
      {/* PDF பிரிண்ட் ஸ்டைலிங் */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-card { border: 1px solid #999 !important; background: white !important; color: black !important; break-inside: avoid; }
          .print-text { color: black !important; }
        }
      `}} />

      {/* மேல் முகப்பு ஹெடர் */}
      <div className="text-center space-y-2 no-print">
        <span className="text-xs uppercase tracking-widest px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full font-bold">
          நவீன AI + பாரம்பரிய 7 ஜோதிட சாஸ்திர வழிகாட்டல்
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          360° AI வாழ்வியல் ஜாதகம் & ஆரா வழிகாட்டி
        </h1>
        <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto">
          வேதம், நாடி, கே.பி. நேரக் கணிப்பு, பஞ்சபட்சி, பூமி யோகம், பிரசன்னம் மற்றும் எண் கணிதம்.
        </p>
      </div>

      {/* முதன்மை நேவிகேஷன் டேப்கள் */}
      <div className="flex border-b border-slate-800 text-xs md:text-sm font-semibold no-print">
        <button
          onClick={() => { setActiveTab('jathagam'); setStep(1); }}
          className={`flex-1 py-3 text-center transition-all ${activeTab === 'jathagam' ? 'text-amber-400 border-b-2 border-amber-500 bg-amber-500/5' : 'text-slate-400 hover:text-slate-200'}`}
        >
          📜 ஜாதக விவர உள்ளீடு & கணிப்பு
        </button>
        <button
          onClick={() => setActiveTab('pakshi')}
          className={`flex-1 py-3 text-center transition-all ${activeTab === 'pakshi' ? 'text-emerald-400 border-b-2 border-emerald-500 bg-emerald-500/5' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🦅 பஞ்சபட்சி நேரலை நேரக் கணிப்பான்
        </button>
        <button
          onClick={() => setActiveTab('prasannam')}
          className={`flex-1 py-3 text-center transition-all ${activeTab === 'prasannam' ? 'text-rose-400 border-b-2 border-rose-500 bg-rose-500/5' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🔮 சோழி & தேவ பிரசன்னம்
        </button>
      </div>

      {/* ===================== படி 1: உள்ளீட்டுப் படிவம் ===================== */}
      {activeTab === 'jathagam' && step === 1 && (
        <div className="bg-slate-900 border border-slate-800 p-5 md:p-6 rounded-2xl shadow-xl space-y-5 no-print">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm md:text-base font-bold text-amber-300">
              👤 ஜாதகருக்குரிய துல்லிய பிறப்பு விவரங்கள்
            </h3>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
              <input
                type="checkbox"
                checked={formData.childHoroscope}
                onChange={(e) => setFormData({ ...formData, childHoroscope: e.target.checked })}
                className="accent-amber-500 rounded"
              />
              <span>👶 பாலர் / குழந்தை ஜாதகம்</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">பெயர்</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">பிறந்த தேதி</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">பிறந்த நேரம்</label>
              <input
                type="time"
                value={formData.tob}
                onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">பிறந்த ஊர் / மாவட்டம்</label>
              <input
                type="text"
                value={formData.pob}
                onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">ராசி (நேரடித் தேர்வு)</label>
              <select
                value={formData.rasi}
                onChange={(e) => setFormData({ ...formData, rasi: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {RASIS.map((r, i) => (
                  <option key={i} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">நட்சத்திரம் (நேரடித் தேர்வு)</label>
              <select
                value={formData.nakshatra}
                onChange={(e) => setFormData({ ...formData, nakshatra: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {NAKSHATRAS.map((n) => (
                  <option key={n.id} value={n.name}>{n.name} (பட்சி: {n.pakshi})</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
          >
            <span>அடுத்த படி: தட்சணைத் திட்டம் தேர்ந்தெடுத்துக் கணிக்க ➔</span>
          </button>
        </div>
      )}

      {/* ===================== படி 2: தட்சணைத் திட்டம் ===================== */}
      {activeTab === 'jathagam' && step === 2 && (
        <div className="space-y-5 no-print">
          <div className="text-center space-y-1">
            <h3 className="text-base md:text-lg font-bold text-amber-300">
              பாரம்பரிய முறைப்படியான ஜோதிட தட்சணை தேர்வு
            </h3>
            <p className="text-xs text-slate-400">
              உங்கள் தேவைக்கேற்ப நியாயமான தட்சணையைத் தேர்ந்தெடுத்து உடனடி வழிகாட்டலைப் பெறுங்கள்.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ₹21 */}
            <div
              onClick={() => {
                setPayPlan({ amount: 21, title: 'விருப்பம் 1: உடனடி ஸ்னாப்ஷாட்', chatLimit: 1 });
                setStep(3);
              }}
              className="p-5 rounded-2xl border bg-slate-950 border-slate-800 hover:border-amber-500/80 cursor-pointer transition-all flex flex-col justify-between hover:bg-slate-900/60 shadow-lg group"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-400">விருப்பம் 1</span>
                  <span className="text-xl font-extrabold text-amber-400">₹21</span>
                </div>
                <h4 className="font-bold text-sm text-white mb-2">உடனடி ஸ்னாப்ஷாட்</h4>
                <ul className="text-xs text-slate-300 space-y-2 mb-4">
                  <li>• தற்போதைய தசா-புக்தி பலன் & சாதகம்</li>
                  <li>• தமிழ் சித்தர் எளிய செலவில்லா பரிகாரம்</li>
                  <li>• அதிர்ஷ்ட எண்கள் & நிறங்கள்</li>
                  <li>• ஆரா AI-யிடம் <b>1 கேள்வி</b> வழிகாட்டல்</li>
                </ul>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setPayPlan({ amount: 21, title: 'விருப்பம் 1: உடனடி ஸ்னாப்ஷாட்', chatLimit: 1 });
                  setStep(3);
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-800 text-amber-300 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow"
              >
                ₹21 தட்சணையுடன் கணி ➔
              </button>
            </div>

            {/* ₹49 */}
            <div
              onClick={() => {
                setPayPlan({ amount: 49, title: 'விருப்பம் 2: முழுமை 360° AI வாழ்வியல் அறிக்கை', chatLimit: 5 });
                setStep(3);
              }}
              className="p-5 rounded-2xl border bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10 cursor-pointer relative transition-all flex flex-col justify-between hover:border-amber-400 group ring-1 ring-amber-500/50"
            >
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                மக்கள் விருப்பம் 🔥
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-amber-400">விருப்பம் 2</span>
                  <span className="text-xl font-extrabold text-amber-400">₹49</span>
                </div>
                <h4 className="font-bold text-sm text-white mb-2">முழு 7 சாஸ்திர AI அறிக்கை</h4>
                <ul className="text-xs text-slate-300 space-y-2 mb-4">
                  <li>• <b>முழு 7 சாஸ்திரங்களும் திறக்கப்படும்</b></li>
                  <li>• பூமி யோகம் & மனை வாஸ்து திசை</li>
                  <li>• கே.பி. நேரக் கணிப்பு & தொழில் உயர்வு</li>
                  <li>• பஞ்சபட்சி அரசாளும் கால நேரலை</li>
                  <li>• உடனடி PDF பதிவிறக்கம் & வாட்ஸ்அப் அறிக்கை</li>
                  <li>• ஆரா AI-யிடம் <b>5 விரிவான கேள்விகள்</b></li>
                </ul>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setPayPlan({ amount: 49, title: 'விருப்பம் 2: முழுமை 360° AI வாழ்வியல் அறிக்கை', chatLimit: 5 });
                  setStep(3);
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-lg"
              >
                ₹49 தட்சணையுடன் அறிக்கை பெறுக ➔
              </button>
            </div>

            {/* ₹99 */}
            <div
              onClick={() => {
                setPayPlan({ amount: 99, title: 'விருப்பம் 3: பிரீமியம் பாலர் / வாழ்நாள் மாஸ்டர்', chatLimit: 999 });
                setStep(3);
              }}
              className="p-5 rounded-2xl border bg-slate-950 border-purple-500/50 hover:border-purple-400 cursor-pointer transition-all flex flex-col justify-between hover:bg-slate-900/60 shadow-lg group"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-purple-400">விருப்பம் 3</span>
                  <span className="text-xl font-extrabold text-purple-400">₹99</span>
                </div>
                <h4 className="font-bold text-sm text-white mb-2">பாலர் & மாஸ்டர் ஜாதகம்</h4>
                <ul className="text-xs text-slate-300 space-y-2 mb-4">
                  <li>• வாழ்நாள் பிறப்பு ஜாதகக் குறிப்பேடு (PDF)</li>
                  <li>• ஆரம்ப தசா இருப்பு & கல்வி யோகம்</li>
                  <li>• பெயர் சூட்டும் அட்சரங்கள் & பரிகாரம்</li>
                  <li>• முழு 12 பாவக வாழ்வியல் பலன்கள்</li>
                  <li>• <b>ஆரா AI உடன் வரம்பற்ற உரையாடல் 🌟</b></li>
                </ul>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setPayPlan({ amount: 99, title: 'விருப்பம் 3: பிரீமியம் பாலர் / வாழ்நாள் மாஸ்டர்', chatLimit: 999 });
                  setStep(3);
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow"
              >
                ₹99 பிரீமியம் பெறுக ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== படி 3: முடிவுகள், PDF & ஆரா AI ===================== */}
      {activeTab === 'jathagam' && step === 3 && (
        <div className="space-y-6">
          {/* அச்சிடும் போது & திரையில் தெரியும் முதன்மைத் தலைப்பு */}
          <div className="bg-slate-900 border border-slate-800 p-4 md:p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 print-card">
            <div>
              <span className="text-[11px] text-emerald-400 font-bold tracking-wider uppercase block no-print">
                ✓ தட்சணை உறுதிசெய்யப்பட்டது • {payPlan.title}
              </span>
              <h3 className="text-base md:text-xl font-extrabold text-white print-text">
                {formData.name} அவர்களுக்கான 360° AI வாழ்வியல் ஜாதகம்
              </h3>
              <p className="text-xs text-slate-400 print-text">
                பிறந்த தேதி: {formData.dob} | நேரம்: {formData.tob} | ஊர்: {formData.pob} | ராசி: {formData.rasi} | நட்சத்திரம்: {formData.nakshatra} (பட்சி: {selectedNakObj.pakshi})
              </p>
            </div>

            {/* பிடிஎஃப் மற்றும் ரீசெட் பட்டன்கள் */}
            <div className="flex gap-2 no-print">
              <button
                onClick={handlePrintPDF}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-lg"
              >
                📄 வண்ண PDF பதிவிறக்கம் (Save as PDF)
              </button>
              <button
                onClick={() => setStep(1)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl border border-slate-700"
              >
                🔄 புதியது
              </button>
            </div>
          </div>

          {/* தென்னிந்திய ராசி & நவாம்சக் கட்டங்கள் */}
          <div className="bg-slate-900 border border-slate-800 p-4 md:p-5 rounded-2xl space-y-3 print-card">
            <h4 className="text-xs md:text-sm font-bold text-amber-300 flex items-center gap-2 print-text">
              <span>🏛️ தென்னிந்திய பாரம்பரியக் கட்டங்கள்</span>
              <span className="text-[10px] text-slate-400 font-normal print-text">(லக்னம்: கன்னி • ராசி: கன்னி)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ராசி கட்டம் */}
              <div>
                <span className="text-[11px] font-bold text-slate-300 block text-center mb-1 print-text">ராசிச் சக்கரம் (Rasi Chart)</span>
                <div className="grid grid-cols-4 grid-rows-4 gap-1 bg-slate-950 p-2 rounded-xl border border-slate-800 aspect-square text-[10px] text-center print-card">
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">மீனம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">மேஷம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">ரிஷபம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">மிதுனம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">கும்பம்</div>
                  <div className="col-span-2 row-span-2 bg-slate-900/60 flex items-center justify-center font-bold text-amber-400 text-xs print-text">ராசி</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">கடகம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">மகரம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">சிம்மம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">தனுசு</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">விருச்சிகம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">துலாம்</div>
                  <div className="border border-amber-500/50 bg-amber-500/10 p-1 flex flex-col items-center justify-center text-amber-300 font-bold print-text">
                    <span>கன்னி</span>
                    <span className="text-[9px] text-emerald-400">லக் / சந்</span>
                  </div>
                </div>
              </div>

              {/* நவாம்ச கட்டம் */}
              <div>
                <span className="text-[11px] font-bold text-slate-300 block text-center mb-1 print-text">நவாம்சச் சக்கரம் (Navamsa Chart)</span>
                <div className="grid grid-cols-4 grid-rows-4 gap-1 bg-slate-950 p-2 rounded-xl border border-slate-800 aspect-square text-[10px] text-center print-card">
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">மீனம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-amber-300 print-text">மேஷம் (செவ்)</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">ரிஷபம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">மிதுனம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">கும்பம்</div>
                  <div className="col-span-2 row-span-2 bg-slate-900/60 flex items-center justify-center font-bold text-purple-400 text-xs print-text">நவாம்சம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">கடகம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">மகரம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">சிம்மம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">தனுசு</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">விருச்சிகம்</div>
                  <div className="border border-slate-800 p-1 flex items-center justify-center text-slate-400 print-text">துலாம்</div>
                  <div className="border border-purple-500/50 bg-purple-500/10 p-1 flex flex-col items-center justify-center text-purple-300 font-bold print-text">
                    <span>கன்னி</span>
                    <span className="text-[9px] text-cyan-400">புதன் (ஆட்சி)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7 சாஸ்திர கார்டுகள் */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* அட்டை 1: வேத தசா-புக்தி */}
            <div className="p-4 rounded-xl border bg-slate-950 border-purple-500/30 print-card">
              <span className="text-purple-400 font-bold text-sm block mb-1 print-text">1. வேத தசா-புக்தி டைம்லைன் (Vedic Blueprint)</span>
              <div className="flex justify-between items-center text-xs text-slate-300 mb-1 print-text">
                <span>நடப்பு தசை: <b>குரு தசை - சுக்கிர புக்தி</b></span>
                <span className="text-emerald-400 font-bold print-text">82% சாதகம்</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed print-text">
                புதிய சொத்துக்கள் வாங்குவதற்கும், அரசு தேர்வுகள் மற்றும் பதவி உயர்வுக்கு மிகவும் உகந்த பொற்காலம்.
              </p>
            </div>

            {/* அட்டை 2: பூமி யோகம் & வாஸ்து */}
            <div className={`p-4 rounded-xl border relative overflow-hidden print-card ${payPlan.amount === 21 ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-950 border-amber-500/30'}`}>
              <span className="text-amber-400 font-bold text-sm block mb-1 print-text">2. பூமி யோகம் & வாஸ்து பார்வை (Bhoomi Shastra)</span>
              <p className="text-slate-300 text-xs leading-relaxed mb-2 print-text">
                4-ஆம் பாவக அதிபதி மற்றும் செவ்வாய் பலம் சாதகமாக உள்ளது. வடக்கு அல்லது கிழக்கு பார்த்த வீட்டுமனை வாங்குவது செல்வ விருத்தியை உண்டாக்கும்.
              </p>
            </div>

            {/* அட்டை 3: கே.பி. நேரக் கணிப்பு & தொழில் */}
            <div className={`p-4 rounded-xl border relative overflow-hidden print-card ${payPlan.amount === 21 ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-950 border-cyan-500/30'}`}>
              <span className="text-cyan-400 font-bold text-sm block mb-1 print-text">3. கே.பி. நேரக் கணிப்பு & தொழில் (KP Sub-Lord)</span>
              <p className="text-slate-300 text-xs leading-relaxed mb-2 print-text">
                10-ஆம் பாவக உப நட்சத்திர அதிபதி சூரியனின் தொடர்பில் உள்ளதால், அரசு சார்ந்த ஒப்பந்தங்கள் அல்லது உயர் பொறுப்பு மற்றும் பதவி உயர்வு வாய்ப்புகள் 2026 இரண்டாம் பாதியில் மிக வலுவாக அமைகிறது.
              </p>
            </div>

            {/* அட்டை 4: தமிழ் நாடி சித்தர் பரிகாரம் */}
            <div className="p-4 rounded-xl border bg-slate-950 border-emerald-500/30 print-card">
              <span className="text-emerald-400 font-bold text-sm block mb-1 print-text">4. தமிழ் நாடி சித்தர் பரிகாரம் (செலவில்லா வழிகாட்டல்)</span>
              <ul className="text-xs text-slate-300 space-y-1 print-text">
                <li>• <b>நட்சத்திர விருட்சம்:</b> அத்தி மரம் நடுதல் / பராமரித்தல்.</li>
                <li>• <b>ஜீவராசி அன்னதானம்:</b> எறும்புகளுக்கு பச்சரிசி ரவை மற்றும் காகத்திற்கு உணவிடுதல்.</li>
                <li>• <b>இஷ்ட தெய்வம்:</b> காயத்ரி தேவி வழிபாடு.</li>
              </ul>
            </div>

            {/* அட்டை 5: பஞ்சபட்சி நேரலை */}
            <div className="p-4 rounded-xl border bg-slate-950 border-emerald-500/30 print-card">
              <span className="text-emerald-400 font-bold text-sm block mb-1 print-text">5. பஞ்சபட்சி பலம் (Pancha Pakshi)</span>
              <p className="text-slate-300 text-xs leading-relaxed mb-2 print-text">
                உங்கள் நட்சத்திர பட்சி: <b>{selectedNakObj.pakshi}</b>. பகல் நேர அரசாளும் காலம் புதிய தொடக்கங்களுக்கும் ஒப்பந்தங்களுக்கும் அதீத நற்பலன் தரும்.
              </p>
              <span className="inline-block text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded print-card print-text">
                🟢 அரசாளும் நேரம் சாதகமாக உள்ளது
              </span>
            </div>

            {/* அட்டை 6: தேவ பிரசன்னம் */}
            <div className="p-4 rounded-xl border bg-slate-950 border-rose-500/30 print-card">
              <span className="text-rose-400 font-bold text-sm block mb-1 print-text">6. உடனடி தேவ பிரசன்ன பார்வை (Prashnam)</span>
              <p className="text-slate-300 text-xs leading-relaxed print-text">
                கேள்வி நேர லக்னப்படி காரிய சித்தி ஸ்தானம் பலமாக அமைகிறது. மனதில் நினைத்த முக்கிய காரியம் அடுத்த 45 முதல் 90 நாட்களுக்குள் சுபமாக நிறைவேறும்.
              </p>
            </div>

            {/* அட்டை 7: எண் கணிதம் */}
            <div className="p-4 rounded-xl border bg-slate-950 border-yellow-500/30 md:col-span-2 print-card">
              <span className="text-yellow-400 font-bold text-sm block mb-1 print-text">7. அதிர்ஷ்ட எண் கணிதம் & வாஸ்து திசை</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-300 print-text">
                <div>• <b>அதிர்ஷ்ட எண்கள்:</b> 5, 6, 8</div>
                <div>• <b>வெற்றி தரும் திசை:</b> வடக்கு, வடகிழக்கு</div>
                <div>• <b>விருப்பமான நிறம்:</b> பச்சை, வெளிர் நீலம்</div>
              </div>
            </div>
          </div>

          {/* ஆரா AI (Aura AI) நேரலை சாட் பாக்ஸ் - PDF-ல் தோன்றாது */}
          <div className="bg-slate-900 border border-purple-500/40 p-4 md:p-5 rounded-2xl shadow-xl space-y-4 no-print">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-sm font-bold text-purple-300">
                  🔮 ஆரா AI (Aura AI) நேரலை வழிகாட்டி
                </h4>
              </div>
              <span className="text-[10px] text-slate-400 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded-full">
                {formData.rasi} • {formData.nakshatra}
              </span>
            </div>

            {/* சாட் வரலாறு */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] text-xs p-3 rounded-2xl leading-relaxed ${msg.sender === 'user' ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none' : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-xs text-slate-400 flex items-center gap-1.5 italic">
                  <span>ஆரா உங்கள் ஜாதகத்தை ஆராய்கிறது...</span>
                </div>
              )}
            </div>

            {/* உள்ளீட்டுப் பெட்டி */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="எ.கா: promotion eppo varum? அல்லது மனை எப்போது வாங்கலாம்?"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow"
              >
                கேட்க ➔
              </button>
            </div>
          </div>

          {/* வாட்ஸ்அப் பகிர்தல் பட்டன் */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 no-print">
            <span className="text-xs text-slate-300">
              இந்த முழுமையான 360° கணிப்பை வாட்ஸ்அப்பிலும் பெற்றுக்கொள்ளலாம்.
            </span>
            <a
              href={`https://wa.me/919962369131?text=${encodeURIComponent(
`🌟 *360° AI வாழ்வியல் ஜாதக முழு அறிக்கை* 🌟
-----------------------------------------
👤 *ஜாதகர் விபரம்:*
• பெயர்: ${formData.name}
• பிறந்த தேதி: ${formData.dob} | நேரம்: ${formData.tob}
• ராசி: ${formData.rasi}
• நட்சத்திரம்: ${formData.nakshatra} (பட்சி: ${selectedNakObj.pakshi})
• திட்டம்: ${payPlan?.title} (₹${payPlan?.amount})

📜 *7 சாஸ்திர வாழ்வியல் சுருக்கம்:*
1️⃣ வேத தசா-புக்தி: குரு தசை - சுக்கிர புக்தி (82% சாதகம்)
2️⃣ பூமி & வாஸ்து: 4-ஆம் பாவகம் பலம். வடக்கு/கிழக்கு மனை விசேஷம்.
3️⃣ கே.பி. கணிப்பு: 10-ஆம் பாவக தொடர்பால் பதவி உயர்வு யோகம் உண்டு.
4️⃣ சித்தர் பரிகாரம்: அத்தி மரம் நடுதல் / காயத்ரி வழிபாடு.
5️⃣ பஞ்சபட்சி: பட்சி ${selectedNakObj.pakshi} - அரசாளும் நேரம் சாதகம்.
6️⃣ தேவ பிரசன்னம்: காரிய சித்தி யோகம் சுபமாக உள்ளது.
7️⃣ எண் கணிதம்: அதிர்ஷ்ட எண் 5, 6, 8 | அதிர்ஷ்ட நிறம் பச்சை.

📲 தயவுசெய்து எனது முழு வண்ணமயமான PDF அறிக்கையை அனுப்பவும்.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shrink-0"
            >
              <span>📲 வாட்ஸ்அப்பில் முழு PDF பெறுக ↗</span>
            </a>
          </div>
        </div>
      )}

      {/* ===================== பஞ்சபட்சி நேரலை டேப் ===================== */}
      {activeTab === 'pakshi' && (
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 no-print">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-emerald-400">
                🦅 பஞ்சபட்சி நேரலை நேரக் கணிப்பான்
              </h3>
              <p className="text-xs text-slate-400">
                நட்சத்திரம்: <b className="text-white">{formData.nakshatra}</b> | உங்கள் பட்சி: <b className="text-amber-400">{selectedNakObj.pakshi}</b>
              </p>
            </div>
            <span className="text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
              🟢 நேரலை இயக்கம் செயலில் உள்ளது
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {PAKSHI_ACTIVITIES.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-2 ${item.act.includes('அரசு') ? 'bg-amber-500/10 border-amber-500/50 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
              >
                <div>
                  <span className="font-bold text-sm block">{item.time}: <span className="text-white">{item.act}</span></span>
                  <span className="text-[11px] text-slate-400">{item.power}</span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-700">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== பிரசன்னம் டேப் ===================== */}
      {activeTab === 'prasannam' && (
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 no-print">
          <h3 className="text-sm font-bold text-rose-400">🔮 உடனடி சோழி & தேவ பிரசன்ன முடிவு</h3>
          <p className="text-xs text-slate-300">
            மனதில் நினைத்த ஒரு முக்கிய காரியத்தை மனதில் வேண்டிக்கொண்டு சோழி உருட்டவும்.
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 text-center space-y-3">
            <button className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg">
              🎲 சோழி உருட்டி தெய்வீகத் தீர்ப்பு பெறுக
            </button>
          </div>
        </div>
      )}
    </div>
  );
}