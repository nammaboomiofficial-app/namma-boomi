import React, { useState, useMemo } from 'react';
import spiritualData from '../data/spiritualData.json';
const { TEMPLE_CIRCUITS, DOSHA_RADAR, KUMB_ITINERARY } = spiritualData;



export default function SpiritualModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('radar'); // 'radar', 'circuits', 'itinerary', 'hrce', 'poosari'
  const [circuitType, setCircuitType] = useState('navagraha');
  const [selectedDosha, setSelectedDosha] = useState(DOSHA_RADAR[0].id);

  // சிஆர்எம் முன்பதிவு படிவம்
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    district: '',
    need: 'நவகிரக யாத்திரை கார் & வழிகாட்டி முன்பதிவு',
    members: '4 நபர்கள்',
    date: ''
  });
  const [loading, setLoading] = useState(false);

  const matchedDosha = useMemo(() => {
    return DOSHA_RADAR.find((d) => d.id === selectedDosha) || DOSHA_RADAR[0];
  }, [selectedDosha]);

  const handleSubmit = (e) => {
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
          name: leadForm.name || 'பக்தர் / யாத்ரீகர்',
          phone: leadForm.phone,
          village: leadForm.district || 'தமிழ்நாடு',
          taluk: leadForm.need,
          surveyNo: `நபர்கள்: ${leadForm.members} | தேதி: ${leadForm.date || 'உடனடி'}`,
          feeStatus: 'Spiritual Tour Booking Inquiry',
          status: 'Spiritual Desk'
        })
      });
    } catch (err) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! நான் ஆன்மிக யாத்திரை & கோவில் தரிசன வழிகாட்டல் பெற விரும்புகிறேன்.\n\n👤 பெயர்: ${leadForm.name || '-'}\n📱 எண்: ${leadForm.phone}\n📍 மாவட்டம்: ${leadForm.district || '-'}\n🎯 தேவை: ${leadForm.need}\n👥 பயணிகள் எண்ணிக்கை: ${leadForm.members}\n📅 திட்டமிடும் தேதி: ${leadForm.date || 'உடனடி'}\n\nபூஜை நேரம், கார் வாடகை மற்றும் தங்கும் விடுதி விவரங்களை அனுப்பவும்.`;
    const waUrl = `https://wa.me/919962369131?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="w-full space-y-8 text-left">
      {/* 1. முதன்மை பேனர் */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/60 via-slate-900/95 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/40 rounded-full">
              தமிழ்நாட்டின் முழுமையான ஆன்மிக & யாத்ரீகர் வழிகாட்டி 360°
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2 flex items-center gap-2">
              <span>🛕</span> திருக்கோயில்கள், பரிகார ரேடார் & யாத்திரை மையம்
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              நவகிரகம் & அறுபடை வீடுகள், தோஷ-பிரார்த்தனை பரிகார ரேடார், 2-நாள் ஜீரோ-டிராஃபிக் ரூட் பிளானர், HR&CE அரசு நேரடி தேவஸ்தான இணைப்பு மற்றும் கிராமப் பூசாரிகள் நலன்.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-950/90 px-4 py-3 rounded-xl border border-amber-500/30">
            <span className="text-3xl">🕉️</span>
            <div className="text-xs">
              <span className="text-amber-400 font-bold block">100% அதிகாரப்பூர்வ தகவல்கள்</span>
              <span className="text-slate-400 text-[11px]">இடைத்தரகர்கள் இன்றி நேரடி தரிசனம்</span>
            </div>
          </div>
        </div>

        {/* 2. நேவிகேஷன் டேப்கள் */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'radar' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🎯 பரிகார ரேடார் (தோஷம் & பிரார்த்தனை)
          </button>
          <button
            onClick={() => setActiveTab('circuits')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'circuits' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🛕 புனித சுற்றுப்பாதைகள் (நவகிரகம் / அறுபடை / பஞ்சபூதம்)
          </button>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'itinerary' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            ⏱️ 2-நாள் 'ஜீரோ டிராஃபிக்' ரூட் பிளானர்
          </button>
          <button
            onClick={() => setActiveTab('hrce')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'hrce' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🏛️ HR&CE அரசு தேவஸ்தான சேவைகள்
          </button>
          <button
            onClick={() => setActiveTab('poosari')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'poosari' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🙏 கிராமப் பூசாரிகள் நலன் & நலிந்த கோவில்கள்
          </button>
        </div>

        {/* 3. டேப் வாரியான உள்ளடக்கங்கள் */}
        <div className="mt-6">
          {/* TAB 1: பரிகார ரேடார் (தோஷம் & பிரார்த்தனை) */}
          {activeTab === 'radar' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  உங்கள் தற்போதைய தேவை அல்லது தோஷப் பரிகாரத்தைத் தேர்ந்தெடுக்கவும்:
                </label>
                <select
                  value={selectedDosha}
                  onChange={(e) => setSelectedDosha(e.target.value)}
                  className="w-full md:w-2/3 bg-slate-900 border border-amber-500/40 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-amber-400"
                >
                  {DOSHA_RADAR.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* தேர்ந்தெடுத்த பரிகார விவர அட்டை */}
              <div className="rounded-2xl border border-amber-500/40 bg-slate-950 p-5 md:p-6 space-y-4 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded">
                      பரிந்துரைக்கப்படும் முதன்மை பரிகார க்ஷேத்திரம்
                    </span>
                    <h3 className="text-xl font-black text-white mt-1.5">{matchedDosha.temple}</h3>
                    <span className="text-xs text-amber-400 font-semibold">📍 இடம்: {matchedDosha.place}</span>
                  </div>
                  <button
                    onClick={() => {
                      setLeadForm({
                        ...leadForm,
                        need: `பரிகார தரிசனம்: ${matchedDosha.temple} (${matchedDosha.label})`
                      });
                      document.getElementById('spiritual-crm-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition-all"
                  >
                    இக்கோவிலுக்கு கார் & தரிசனம் முன்பதிவு ↗
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">செய்ய வேண்டிய பூஜை:</span>
                    <span className="font-bold text-white mt-0.5 block">{matchedDosha.pooja}</span>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">உகந்த நாள் & காலம்:</span>
                    <span className="font-bold text-amber-300 mt-0.5 block">{matchedDosha.bestDay}</span>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">முக்கிய வழிகாட்டல்:</span>
                    <span className="font-bold text-emerald-400 mt-0.5 block">{matchedDosha.note}</span>
                  </div>
                </div>
              </div>

              {/* விரைவு பரிகார வழிகாட்டி அட்டவணை */}
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-300 border-b border-slate-800">
                  அனைத்து முக்கிய பரிகாரத் தலங்கள் ஒரு பார்வையில்:
                </div>
                <div className="divide-y divide-slate-800 text-xs">
                  {DOSHA_RADAR.map((d) => (
                    <div key={d.id} className="p-3 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-slate-900/60 transition-colors">
                      <div>
                        <span className="font-bold text-white block">{d.label}</span>
                        <span className="text-slate-400 text-[11px]">🛕 {d.temple} ({d.place})</span>
                      </div>
                      <span className="text-amber-400 font-semibold text-[11px] whitespace-nowrap">✨ {d.pooja}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: புனித சுற்றுப்பாதைகள் (Circuits) */}
          {activeTab === 'circuits' && (
            <div className="space-y-5">
              <div className="flex gap-2 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setCircuitType('navagraha')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    circuitType === 'navagraha' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  ☀️ நவகிரகத் தலங்கள் (கும்பகோணம் & மயிலாடுதுறை)
                </button>
                <button
                  onClick={() => setCircuitType('murugan')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    circuitType === 'murugan' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  🦚 அறுபடை வீடுகள் (முருகன் க்ஷேத்திரங்கள்)
                </button>
                <button
                  onClick={() => setCircuitType('panchabhootham')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    circuitType === 'panchabhootham' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  🔥 பஞ்சபூத ஸ்தலங்கள் (சிவன் லிங்கங்கள்)
                </button>
              </div>

              {/* நவகிரகங்கள் பட்டியல் */}
              {circuitType === 'navagraha' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {TEMPLE_CIRCUITS.navagraha.map((item) => (
                    <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all space-y-2.5">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-500/30 rounded">
                          {item.planet}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold">{item.specialDay}</span>
                      </div>
                      <h4 className="text-sm font-black text-white">{item.name}</h4>
                      <p className="text-[11px] text-slate-400">📍 {item.place}</p>
                      <div className="text-[11px] bg-slate-900 p-2 rounded border border-slate-800/80 space-y-1">
                        <div><span className="text-slate-500">மூலவர்:</span> <span className="text-slate-300 font-semibold">{item.deity}</span></div>
                        <div><span className="text-slate-500">நடை நேரம்:</span> <span className="text-amber-300">{item.timing}</span></div>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed italic border-t border-slate-900 pt-1.5">
                        💡 {item.highlight}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* அறுபடை வீடுகள் */}
              {circuitType === 'murugan' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TEMPLE_CIRCUITS.murugan.map((m) => (
                    <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-amber-400">{m.padai}</span>
                        <span className="text-[11px] text-slate-400">📍 {m.place}</span>
                      </div>
                      <h4 className="text-sm font-black text-white">{m.name}</h4>
                      <div className="text-xs text-slate-300 bg-slate-900 p-2 rounded">
                        🕒 நடை நேரம்: <span className="text-emerald-400 font-semibold">{m.timing}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        🌟 {m.highlight}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* பஞ்சபூத தலங்கள் */}
              {circuitType === 'panchabhootham' && (
                <div className="space-y-3">
                  {TEMPLE_CIRCUITS.panchabhootham.map((pb) => (
                    <div key={pb.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-black bg-blue-950 text-cyan-300 border border-blue-500/30 rounded">
                            {pb.element}
                          </span>
                          <h4 className="text-sm font-black text-white">{pb.temple}</h4>
                        </div>
                       <p className="text-xs text-amber-400 font-semibold">லிங்கம்: {pb.lingam}</p>
<p className="text-xs text-slate-400">நடை நேரம்: {pb.timing}</p>
<p className="text-xs text-emerald-400 font-medium">✨ {pb.highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: 2-நாள் 'ஜீரோ டிராஃபிக்' ரூட் பிளானர் */}
          {activeTab === 'itinerary' && (
            <div className="space-y-5">
              <div className="p-3.5 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-slate-300 space-y-1">
                <span className="text-amber-400 font-bold block">💡 நவகிரக யாத்திரை ரகசியம் (Zero-Wasted Kilometers):</span>
                <p>
                  கிராமப்புற நவகிரகக் கோவில்கள் <strong>மதியம் 12:30 மணி முதல் மாலை 4:00 மணி வரை நடை சாத்தப்படும்</strong>. தவறான வரிசையில் சென்றால் நடுவழியில் காத்திருக்க நேரிடும். கீழே கொடுக்கப்பட்டுள்ள 2 நாள் கால அட்டவணை அலைச்சலையும் தூரத்தையும் 40% குறைக்கும்.
                </p>
              </div>

              <div className="space-y-4">
                {KUMB_ITINERARY.map((plan, idx) => (
                  <div key={idx} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                    <div className="bg-slate-900/90 px-4 py-2.5 font-bold text-xs text-amber-400 border-b border-slate-800">
                      {plan.day}
                    </div>
                    <div className="divide-y divide-slate-900 text-xs">
                      {plan.slots.map((s, sIdx) => (
                        <div key={sIdx} className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-slate-900/40">
                          <div className="w-48 text-emerald-400 font-bold tracking-tight">
                            ⏱️ {s.time}
                          </div>
                          <div className="flex-1">
                            <span className="font-bold text-white block">{s.temple}</span>
                            <span className="text-slate-400 text-[11px]">{s.note}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HR&CE நேரடி அரசு தேவஸ்தான கவுண்ட்டர் */}
          {activeTab === 'hrce' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-300">
                தமிழக அரசின் இந்து சமய அறநிலையத்துறையின் (HR&CE) அதிகாரப்பூர்வ இணையதளம் மூலம் இடைத்தரகர்கள் இன்றி பக்தர்கள் நேரடியாகப் பதிவு செய்ய வேண்டிய நேரடி இணைப்புகள்:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block text-sm">1. சிறப்பு தரிசன டிக்கெட்</span>
                  <p className="text-slate-400">பழனி, திருச்செந்தூர், சமயபுரம், திருத்தணி, மற்றும் திருவண்ணாமலை ₹100/₹200 கட்டண விரைவு தரிசன முன்பதிவு.</p>
                  <a
                    href="https://hrce.tn.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block pt-1 text-emerald-400 font-bold underline"
                  >
                    அரசு HR&CE போர்ட்டல் செல்ல ↗
                  </a>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block text-sm">2. தேவஸ்தான காட்டேஜ் தங்குமிடம்</span>
                  <p className="text-slate-400">அரசு தேவஸ்தான விடுதிகளில் பாதுகாப்பான, குறைந்த கட்டண குடும்ப தங்குமிடம் ஆன்லைனில் முன் கூட்டியே பதிவு செய்யும் முறை.</p>
                  <a
                    href="https://hrce.tn.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block pt-1 text-emerald-400 font-bold underline"
                  >
                    தேவஸ்தான அறை புக் செய்ய ↗
                  </a>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block text-sm">3. ஒரு நாள் அன்னதானத் திட்டம்</span>
                  <p className="text-slate-400">உங்கள் பிறந்தநாள் அல்லது திருமண நாளில் பக்தர்களுக்கு முழு நாள் அன்னதானம் வழங்க அரசு ரசீதுடன் கூடிய நேரடி பங்களிப்பு.</p>
                  <a
                    href="https://hrce.tn.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block pt-1 text-emerald-400 font-bold underline"
                  >
                    அன்னதான பங்களிப்பு ↗
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: கிராமப் பூசாரிகள் நலன் & நலிந்த கோவில்கள் */}
          {activeTab === 'poosari' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-5 rounded-xl border border-amber-500/30 space-y-3">
                  <span className="text-amber-400 font-bold block text-sm">📜 தமிழ்நாடு கிராமக் கோவில் பூசாரிகள் நல வாரியம்</span>
                  <p className="text-slate-300 leading-relaxed">
                    அறநிலையத்துறை கட்டுப்பாட்டில் இல்லாத கிராமப்புற சிறு திருக்கோயில்களில் பணிபுரியும் அர்ச்சகர் மற்றும் பூசாரிகளுக்கு அரசு வழங்கும் நலத்திட்டங்கள்:
                  </p>
                  <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
                    <li>மாதாந்திர ஓய்வூதியம்: <strong>மாதம் ₹4,000</strong> (60 வயது பூர்த்தியடைந்த பூசாரிகளுக்கு).</li>
                    <li>இலவச மிதிவண்டி (சைக்கிள்) மற்றும் புத்தாடைகள் (வேட்டி / சேலை).</li>
                    <li>பூசாரிகளின் வாரிசுகளுக்கு தொழிற்கல்வி & உயர் கல்வி உதவித்தொகை.</li>
                  </ul>
                  <button
                    onClick={() => {
                      setLeadForm({
                        ...leadForm,
                        need: 'கிராமப் பூசாரிகள் நல வாரிய ஓய்வூதிய பதிவு உதவி'
                      });
                      document.getElementById('spiritual-crm-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                  >
                    பூசாரி நலவாரிய விண்ணப்ப உதவி ↗
                  </button>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 space-y-3">
                  <span className="text-emerald-400 font-bold block text-sm">🪔 ஒரு கால பூசை ஆதரவு & கோவில் தத்தெடுப்பு</span>
                  <p className="text-slate-300 leading-relaxed">
                    தமிழகத்தில் வருமானமின்றி ஒரு கால பூசை கூட நடைபெறச் சிரமப்படும் கிராமப்புற சிவாலயங்கள் மற்றும் அம்மன் கோவில்களுக்கு தீப எண்ணெய், நெய் மற்றும் பூஜைப் பொருட்களை நேரடியாக அனுப்ப விரும்பும் பக்தர்களை இணைக்கிறோம்.
                  </p>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                    🤝 <strong>நேரடி பங்களிப்பு:</strong> எவ்வித நிர்வாகக் கட்டணமும் இன்றி உங்கள் நிதி நேரடியாக அந்தந்த கிராமக் கோவில் அர்ச்சகரின் வங்கிக் கணக்கிற்கே மாற்றப்படும்.
                  </div>
                  <button
                    onClick={() => {
                      setLeadForm({
                        ...leadForm,
                        need: 'நலிந்த கிராமக் கோவிலுக்கு தீப எண்ணெய் / நிதியுதவி செய்ய விரும்புகிறேன்'
                      });
                      document.getElementById('spiritual-crm-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    கிராமக் கோவிலுக்கு உதவ பதிவு ↗
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. ஆன்மிக யாத்திரை & தரிசன வழிகாட்டல் படிவம் */}
        <form id="spiritual-crm-form" onSubmit={handleSubmit} className="mt-8 pt-5 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-2">
            <span>🚗</span> ஆன்மிக யாத்திரை கார், தங்குமிடம் மற்றும் தரிசன முன்பதிவு உதவி:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <input
              type="text"
              placeholder="உங்கள் பெயர் *"
              required
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
              placeholder="ஊர் / மாவட்டம் (எ.கா: சென்னை / மதுரை)"
              value={leadForm.district}
              onChange={(e) => setLeadForm({ ...leadForm, district: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <select
              value={leadForm.need}
              onChange={(e) => setLeadForm({ ...leadForm, need: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="நவகிரக யாத்திரை கார் & வழிகாட்டி">🚗 நவகிரக யாத்திரை கார் & பிளான்</option>
              <option value="அறுபடை வீடு ஆன்மிக டூர்">🦚 அறுபடை வீடு ஆன்மிக டூர்</option>
              <option value="பரிகார கோவில் சிறப்பு தரிசன உதவி">🎯 பரிகார கோவில் சிறப்பு தரிசனம்</option>
              <option value="கிராமப் பூசாரி நலவாரிய விண்ணப்பம்">📜 பூசாரி நலவாரிய விண்ணப்பம்</option>
              <option value="ஒரு கால பூசை எண்ணெய் / நிதியுதவி">🪔 கிராமக் கோவிலுக்கு தீப உதவி</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <input
              type="text"
              placeholder="பயணிகள் எண்ணிக்கை (எ.கா: குடும்பத்துடன் 5 நபர்கள்)"
              value={leadForm.members}
              onChange={(e) => setLeadForm({ ...leadForm, members: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder="உத்தேச பயண தேதி (எ.கா: அடுத்த மாதம் முதல் வாரம்)"
              value={leadForm.date}
              onChange={(e) => setLeadForm({ ...leadForm, date: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-950/40 transition-all flex items-center gap-1.5"
            >
              {loading ? 'தயாராகிறது...' : 'ஆன்மிக வழிகாட்டல் பெற (WhatsApp) ↗'}
            </button>
          </div>
        </form>
      </div>

      {/* 5. 360° எகோசிஸ்டம் பாலங்கள் */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('jobs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🚗</span>
          <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">ஆன்மிக டிராவல்ஸ் ஓட்டுநர்கள்</h4>
          <p className="text-xs text-slate-400">கும்பகோணம், திருச்சி, மதுரை உள்ளூர் கோவில் வழிகாட்டி மற்றும் ஓட்டுநர்கள்.</p>
          <span className="text-[11px] text-blue-400 font-bold block pt-1 underline">Jobs Hub செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('astrology');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-purple-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🔮</span>
          <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">AI ஜோதிடம் & ஜாதக ஆய்வு</h4>
          <p className="text-xs text-slate-400">உங்கள் தசா புக்திக்கு ஏற்ற இஷ்ட தெய்வம் மற்றும் கிரக பரிகாரங்களை அறிய.</p>
          <span className="text-[11px] text-purple-400 font-bold block pt-1 underline">ஜோதிட மையம் செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('finance');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-emerald-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🏦</span>
          <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">குடும்பப் பாதுகாப்பு & காப்பீடு</h4>
          <p className="text-xs text-slate-400">குடும்ப யாத்திரைக்கான விபத்துக் காப்பீடு மற்றும் மருத்துவக் காப்பீடு பாதுகாப்பு.</p>
          <span className="text-[11px] text-emerald-400 font-bold block pt-1 underline">காப்பீடு மையம் செல்ல ↗</span>
        </div>
      </div>
    </div>
  );
}