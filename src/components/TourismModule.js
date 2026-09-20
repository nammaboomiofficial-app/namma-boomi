import React, { useState } from 'react';

export default function TourismModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('planner'); // planner, encyclopedia, highway, expenses, passport
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // AI Trip Planner State
  const [tripForm, setTripForm] = useState({
    fromCity: 'சென்னை',
    theme: 'spiritual',
    days: '2',
    budgetTier: 'comfort'
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Expense Splitter State
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'டீசல் / பெட்ரோல்', amount: 3200, paidBy: 'குமார்' },
    { id: 2, title: 'ஹோட்டல் தங்குமிடம்', amount: 4500, paidBy: 'ரமேஷ்' },
    { id: 3, title: 'உணவு & பிரசாதம்', amount: 2800, paidBy: 'குமார்' }
  ]);
  const [newExp, setNewExp] = useState({ title: '', amount: '', paidBy: '' });
  const totalMembers = 4;

  // சுற்றுலாப் பிரிவுகள்
  const categories = [
    { id: 'all', name: 'அனைத்தும்', icon: '🌟' },
    { id: 'spiritual', name: 'ஆன்மீகம் & நவகிரகம்', icon: '🛕' },
    { id: 'hills', name: 'மலைகள் & அருவிகள்', icon: '⛰️' },
    { id: 'agri', name: 'அக்ரி & கிராமியச் சுற்றுலா', icon: '🌾' },
    { id: 'heritage', name: 'வரலாறு & தொல்லியல்', icon: '🏰' },
    { id: 'coastal', name: 'கடற்கரை & தீவுகள்', icon: '🏖️' },
    { id: 'wildlife', name: 'காடுகள் & சாகசம்', icon: '🐅' }
  ];

  // மாதிரி சுற்றுலாத் தலங்கள் தரவு
  const tourCircuits = [
    {
      id: 1,
      title: 'கும்பகோணம் நவகிரக பரிகார ஸ்தலங்கள் சுற்று',
      category: 'spiritual',
      district: 'தஞ்சாவூர் / மயிலாடுதுறை',
      duration: '2 நாட்கள் / 1 இரவு',
      highlights: ['சூரியனார் கோவில்', 'திருநள்ளாறு (சனி)', 'திருநாகேஸ்வரம் (ராகு)', 'சுவாமிமலை முருகன்'],
      templeTiming: 'காலை 6:00 - 12:30 | மாலை 4:00 - 8:30',
      crowdStatus: 'சராசரி கூட்டம் (காத்திருப்பு: ~30 நிமிடம்)',
      rating: '4.9',
      estimatedCost: '₹3,800'
    },
    {
      id: 2,
      title: 'நம்ம பூமி அக்ரி & கிராமிய வாழ்வியல் பண்ணை அனுபவம்',
      category: 'agri',
      district: 'பொள்ளாச்சி - ஆனைமலை அடிவாரம்',
      duration: '1 நாள் அல்லது வார இறுதி',
      highlights: ['நாட்டு மாட்டுப் பண்ணை', 'பாரம்பரிய கம்மங்கூழ் & விருந்து', 'தென்னந்தோப்பு வாக்கிங்', 'பண்ணை நிலம் பார்வை'],
      templeTiming: 'பார்வை நேரம்: காலை 8:00 - மாலை 6:00',
      crowdStatus: 'குறைந்த நெரிசல் (அமைதியான சூழல்)',
      rating: '5.0',
      estimatedCost: '₹1,500'
    },
    {
      id: 3,
      title: 'சோழ மண்டல மாபெரும் கலை & வரலாற்றுப் பயணம்',
      category: 'heritage',
      district: 'தஞ்சை - கங்கைகொண்ட சோழபுரம்',
      duration: '2 நாட்கள்',
      highlights: ['தஞ்சைப் பெரிய கோவில்', 'தாராசுரம் ஐராவதேஸ்வரர்', 'சரஸ்வதி மஹால் நூலகம்', 'கீழடி அருங்காட்சியகம்'],
      templeTiming: 'காலை 6:00 - இரவு 8:30 வரை',
      crowdStatus: 'மாலையில் மிதமான நெரிசல்',
      rating: '4.8',
      estimatedCost: '₹3,200'
    },
    {
      id: 4,
      title: 'நீலகிரி மலைச்சாரல் & சூழலியல் சுற்றுலா',
      category: 'hills',
      district: 'நீலகிரி / ஊட்டி - குன்னூர்',
      duration: '3 நாட்கள் / 2 இரவுகள்',
      highlights: ['தொட்டபெட்டா சிகரம்', 'பியூன் வியூ அருவி', 'டீ மியூசியம்', 'பைக்காரா படகு சவாரி'],
      templeTiming: 'சுற்றுலாத் தலங்கள்: காலை 9:00 - மாலை 5:30',
      crowdStatus: 'வார இறுதியில் அதிக நெரிசல்',
      rating: '4.9',
      estimatedCost: '₹5,500'
    }
  ];

  // நெடுஞ்சாலை நிறுத்துமிடங்கள் தரவு
  const highwayGems = [
    {
      name: 'உளுந்தூர்பேட்டை ஹைவே நிறுத்துமிடம்',
      highway: 'NH 45 (சென்னை - திருச்சி சாலை)',
      facilities: ['100% சுத்தமான ஏசி ஓய்வறை', 'EV பாஸ்ட் சார்ஜிங் மையம்', 'பாரம்பரிய சைவ உணவகம்'],
      specialty: 'மணப்பாறை முறுக்கு & புதிய ஆவின் இனிப்புகள்'
    },
    {
      name: 'மதுரை பைபாஸ் உணவு & ஓய்வு மையம்',
      highway: 'NH 44 (திண்டுக்கல் - மதுரை சாலை)',
      facilities: ['விசாலமான கார் பார்க்கிங்', 'குழந்தைகள் விளையாட்டுப் பகுதி', '24x7 பெட்ரோல் பங்க்'],
      specialty: 'பிரசித்தி பெற்ற மதுரை ஜிகர்தண்டா & மல்லிகைப்பூ ஸ்டால்'
    },
    {
      name: 'சேலம் - ஆத்தூர் வழித்தட பண்ணைக் கடை',
      highway: 'NH 79 (சேலம் - உளுந்தூர்பேட்டை)',
      facilities: ['இயற்கை விவசாயக் கடை', 'இளநீர் & பழச்சாறு அரங்கம்'],
      specialty: 'மரச்செக்கு நல்லெண்ணெய், பனங்கற்கண்டு & புதிய நாட்டுப் பழங்கள்'
    }
  ];

 // AI Trip Planner Generator (தேர்ந்தெடுக்கும் நாட்களுக்கு ஏற்ப மாறும் அமைப்பு)
  const handleGenerateAiPlan = (e) => {
    e.preventDefault();

    const day1Schedule = [
      { time: 'காலை 06:00 AM', event: `${tripForm.fromCity}-லிருந்து புறப்படுதல் & நெடுஞ்சாலை காலை உணவு.` },
      { time: 'காலை 10:30 AM', event: 'முக்கிய வழிபாட்டுத் தலம் / முதல் சுற்றுலாத் தலம் சென்றடைதல் & தரிசனம்.' },
      { time: 'மதியம் 01:30 PM', event: 'பாரம்பரிய உள்ளூர் மதிய உணவு & சிறிய ஓய்வு.' },
      { time: 'மாலை 04:30 PM', event: 'இரண்டாவது முக்கியத் தலம் & இயற்கை எழில் காட்சிகள் பார்வை.' },
      { time: 'இரவு 08:00 PM', event: tripForm.days === '1' ? `${tripForm.fromCity} நோக்கிப் புறப்படுதல் (பயணம் நிறைவு).` : 'இரவு தங்குமிடம் செக்-இன் & இரவு உணவு.' }
    ];

    const day2Schedule = [
      { time: 'காலை 07:00 AM', event: 'இரண்டாம் நாள் விடியல் தலம் & பாரம்பரியக் கலை நயங்கள் பார்வை.' },
      { time: 'காலை 11:00 AM', event: 'நம்ம பூமி இயற்கை விவசாயப் பண்ணை அனுபவம் & இளநீர் விருந்து.' },
      { time: 'மதியம் 01:30 PM', event: 'பாரம்பரிய மதிய உணவு & உள்ளூர் கைவினைப் பொருட்கள் அங்காடி.' },
      { time: 'மாலை 04:00 PM', event: tripForm.days === '2' ? `${tripForm.fromCity} நோக்கிப் புறப்படுதல் (பயணம் நிறைவு).` : 'அடுத்த தலம் நோக்கிப் பயணம்.' }
    ];

    const day3Schedule = [
      { time: 'காலை 08:00 AM', event: 'இயற்கை அருவி அல்லது வனவிலங்கு சரணாலயப் பார்வை.' },
      { time: 'மதியம் 01:00 PM', event: 'மதிய உணவு & உள்ளூர் சிறப்புகள் வாங்குதல்.' },
      { time: 'மாலை 03:30 PM', event: `${tripForm.fromCity} நோக்கிப் புறப்படுதல் (இனிதே நிறைவு).` }
    ];

    let fullTimeline = [{ day: 'நாள் 1', schedule: day1Schedule }];

    if (tripForm.days === '2') {
      fullTimeline.push({ day: 'நாள் 2', schedule: day2Schedule });
    } else if (tripForm.days === '3') {
      fullTimeline.push({ day: 'நாள் 2', schedule: day2Schedule });
      fullTimeline.push({ day: 'நாள் 3', schedule: day3Schedule });
    }

    setGeneratedPlan({
      title: `${tripForm.fromCity} ➔ ${tripForm.days} நாள் 360° சுற்றுலா திட்டம்`,
      days: tripForm.days,
      timeline: fullTimeline,
      totalEstimate: tripForm.days === '1' ? '₹1,500 / நபர்' : tripForm.days === '2' ? '₹3,500 / நபர்' : '₹5,500 / நபர்'
    });
  };

  // Expense கணக்கீடு
  const totalExpense = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const perPersonShare = Math.round(totalExpense / totalMembers);

  const handleAddExpense = () => {
    if (!newExp.title || !newExp.amount) return;
    setExpenses([...expenses, { id: Date.now(), title: newExp.title, amount: Number(newExp.amount), paidBy: newExp.paidBy || 'பொது' }]);
    setNewExp({ title: '', amount: '', paidBy: '' });
  };

  // 360 Travel Passport PDF Print Function
  const handlePrintPassport = () => {
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('பாப்-அப் பிளாக் செய்யப்பட்டுள்ளது. தயவுசெய்து Pop-ups அனுமதிக்கவும்.');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>நம்ம பூமி 360° டிராவல் பாஸ்போர்ட்</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; }
          .passport-box { border: 3px double #15803d; border-radius: 12px; padding: 20px; }
          .header { text-align: center; border-bottom: 2px solid #15803d; padding-bottom: 12px; margin-bottom: 15px; }
          .title { font-size: 20px; font-weight: bold; color: #15803d; }
          .subtitle { font-size: 12px; color: #64748b; }
          .tag { display: inline-block; background: #dcfce7; color: #166534; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 4px; }
          .timeline-table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
          .timeline-table th, .timeline-table td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
          .timeline-table th { background: #f1f5f9; }
          .qr-placeholder { border: 1px dashed #94a3b8; width: 90px; height: 90px; display: flex; align-items: center; justify-content: center; font-size: 10px; text-align: center; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div class="passport-box">
          <div class="header">
            <div class="title">🧭 நம்ம பூமி 360° - அதிகாரப்பூர்வ பயண பாஸ்போர்ட்</div>
            <div class="subtitle">Smart Tourism & Pilgrimage Travel Guide | தமிழ்நாடு சுற்றுலா வழிகாட்டி</div>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 12px;">
            <div>
              <strong>பயணத் திட்டம்:</strong> நவகிரகம் & சோழ மண்டல ஆன்மீகச் சுற்று<br>
              <strong>கால அளவு:</strong> 2 நாட்கள் | <strong>பயணிகள்:</strong> ${totalMembers} நபர்கள்<br>
              <strong>புறப்படும் இடம்:</strong> ${tripForm.fromCity}
            </div>
            <div class="qr-placeholder">
              GPS வழித்தடம் & அவசர உதவி QR
            </div>
          </div>

          <div style="font-weight: bold; font-size: 13px; color: #15803d; margin-bottom: 6px;">
            📅 நாள் வாரியான பயண அட்டவணை (Itinerary):
          </div>

          <table class="timeline-table">
            <thead>
              <tr>
                <th>நாள் / நேரம்</th>
                <th>இடம் & நிகழ்வு</th>
                <th>முக்கிய வழிகாட்டல்</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>நாள் 1</strong> - 06:00 AM</td>
                <td>புறப்படுதல் & NH 45 உளுந்தூர்பேட்டை நிறுத்துமிடம்</td>
                <td>சுத்தமான ஓய்வறை & காலை சிற்றுண்டி</td>
              </tr>
              <tr>
                <td><strong>நாள் 1</strong> - 10:30 AM</td>
                <td>திருநள்ளாறு தர்பாரண்யேஸ்வரர் கோவில்</td>
                <td>நள தீர்த்த நீராடல் & எள் தீபம் சாற்றுதல்</td>
              </tr>
              <tr>
                <td><strong>நாள் 1</strong> - 04:30 PM</td>
                <td>திருநாகேஸ்வரம் ராகு பகவான் கோவில்</td>
                <td>பால் அபிஷேக தரிசனம்</td>
              </tr>
              <tr>
                <td><strong>நாள் 2</strong> - 07:00 AM</td>
                <td>தஞ்சைப் பெரிய கோவில்</td>
                <td>கட்டிடக்கலை & யுனெஸ்கோ பாரம்பரிய ஆய்வு</td>
              </tr>
              <tr>
                <td><strong>நாள் 2</strong> - 11:30 AM</td>
                <td>நம்ம பூமி இயற்கை விவசாயப் பண்ணை அனுபவம்</td>
                <td>இயற்கை வேளாண்மை & இளநீர் விருந்து</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 15px; border-top: 1px solid #e2e8f0; padding-top: 10px; display: flex; justify-content: space-between; font-size: 11px; color: #475569;">
            <div>🚨 <strong>அவசர உதவி எண்கள்:</strong> காவல்: 100 | ஆம்புலன்ஸ்: 108 | சுற்றுலா உதவி: 1363</div>
            <div>நம்ம பூமி 360 சூப்பர் ஆப் மூலம் உருவாக்கப்பட்டது.</div>
          </div>
        </div>
      </body>
      </html>
    `;

    printWin.document.write(html);
    printWin.document.close();
    setTimeout(() => {
      printWin.print();
    }, 400);
  };

  const filteredCircuits = tourCircuits.filter(c => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesQuery = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)', color: '#f8fafc', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* மேல் பகுதி - ஹெடர் & பேக் பட்டன் */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <button 
              onClick={() => setCurrentModule && setCurrentModule('home')}
              style={{ padding: '6px 14px', background: 'rgba(255, 255, 255, 0.1)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', cursor: 'pointer', marginBottom: '8px', fontSize: '13px' }}
            >
              ⬅ முகப்புத் திரைக்கு
            </button>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', background: 'linear-gradient(90deg, #4ade80, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              🧭 நம்ம பூமி 360° உலகத் தர சுற்றுலா வழிகாட்டி
            </h1>
            <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '13px' }}>
              ஆன்மீகம் • இயற்கை • பண்ணைச் சுற்றுலா • நெடுஞ்சாலை வழிகாட்டி • செலவு கணக்கு • 360° பாஸ்போர்ட்
            </p>
          </div>

          <button
            onClick={handlePrintPassport}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#15803d', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(21, 128, 61, 0.4)' }}
          >
            <span>📄</span> 360° டிராவல் பாஸ்போர்ட் (PDF)
          </button>
        </div>

        {/* 4 முதன்மை Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '24px', overflowX: 'auto', paddingBottom: '6px' }}>
          {[
            { id: 'planner', label: '🎯 AI டூர் பிளானர் & சுற்றுகள்' },
            { id: 'encyclopedia', label: '🛕 தல வரலாறு & நெரிசல் விவரம்' },
            { id: 'highway', label: '🛣️ நெடுஞ்சாலை & உள்ளூர் ஸ்பெஷல்' },
            { id: 'expenses', label: '💰 டிராவல் செலவு கணக்கு (Splitter)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 18px',
                borderRadius: '8px 8px 0 0',
                border: 'none',
                background: activeTab === tab.id ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                color: activeTab === tab.id ? '#4ade80' : '#94a3b8',
                borderBottom: activeTab === tab.id ? '3px solid #22c55e' : 'none',
                fontWeight: activeTab === tab.id ? 'bold' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: AI TOUR PLANNER & CIRCUITS */}
        {activeTab === 'planner' && (
          <div>
            {/* AI Generator Box */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>⚡</span> AI நிமிட வாரியான பயணத் திட்டம் அமைப்பாளர்
              </div>

              <form onSubmit={handleGenerateAiPlan} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>புறப்படும் ஊர்:</label>
                  <input 
                    type="text" 
                    value={tripForm.fromCity} 
                    onChange={(e) => setTripForm({...tripForm, fromCity: e.target.value})}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>பயண வகை:</label>
                  <select 
                    value={tripForm.theme} 
                    onChange={(e) => setTripForm({...tripForm, theme: e.target.value})}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="spiritual">ஆன்மீகம் & நவகிரகம்</option>
                    <option value="hills">இயற்கை & மலைவாசஸ்தலம்</option>
                    <option value="agri">அக்ரி & பண்ணைச் சுற்றுலா</option>
                    <option value="heritage">வரலாறு & பாரம்பரியம்</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>கால அளவு:</label>
                  <select 
                    value={tripForm.days} 
                    onChange={(e) => setTripForm({...tripForm, days: e.target.value})}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="1">1 நாள் விரைவுப் பயணம்</option>
                    <option value="2">2 நாட்கள் / 1 இரவு</option>
                    <option value="3">3 நாட்கள் முழு டூர்</option>
                  </select>
                </div>

               <button 
                  type="submit"
                  style={{ padding: '10px 16px', background: '#22c55e', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
                >
                  பிளான் உருவாக்குக ➔
                </button>
              </form>

              {/* Generated Plan Modal / Preview */}
              {generatedPlan && (
                <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(21, 128, 61, 0.15)', border: '1px solid #22c55e', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold', color: '#4ade80', fontSize: '15px' }}>{generatedPlan.title}</span>
                    <span style={{ fontSize: '12px', background: '#166534', padding: '2px 8px', borderRadius: '4px' }}>மதிப்பீடு: {generatedPlan.totalEstimate}</span>
                  </div>

                  {generatedPlan.timeline.map((d, i) => (
                    <div key={i} style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fef08a', marginBottom: '6px' }}>{d.day}:</div>
                      <div style={{ display: 'grid', gap: '6px' }}>
                        {d.schedule.map((s, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#cbd5e1' }}>
                            <span style={{ color: '#38bdf8', fontWeight: '600', minWidth: '100px' }}>{s.time}</span>
                            <span>{s.event}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Chips & Search */}
            <div style={{ marginBottom: '20px' }}>
              <input 
                type="text"
                placeholder="ஊர் அல்லது சுற்றுலா தலத்தின் பெயரைத் தேடுங்கள்..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '14px', boxSizing: 'border-box', marginBottom: '12px' }}
              />

              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '20px',
                      border: '1px solid',
                      borderColor: selectedCategory === cat.id ? '#22c55e' : 'rgba(255,255,255,0.15)',
                      background: selectedCategory === cat.id ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.03)',
                      color: selectedCategory === cat.id ? '#4ade80' : '#cbd5e1',
                      fontSize: '12px',
                      fontWeight: selectedCategory === cat.id ? 'bold' : 'normal',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Curated Tour Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', paddingBottom: '80px' }}>
              {filteredCircuits.map(spot => (
                <div key={spot.id} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                        📍 {spot.district}
                      </span>
                      <span style={{ fontSize: '12px', color: '#facc15', fontWeight: 'bold' }}>★ {spot.rating}</span>
                    </div>

                    <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: '#f1f5f9', fontWeight: '700' }}>
                      {spot.title}
                    </h3>

                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                      ⏱️ {spot.duration} | 🛕 {spot.templeTiming}
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>முக்கிய தலங்கள்:</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {spot.highlights.map((h, idx) => (
                          <span key={idx} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', color: '#cbd5e1' }}>
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block' }}>மதிப்பீட்டு பட்ஜெட்:</span>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#4ade80' }}>{spot.estimatedCost}</span>
                    </div>
                    <button 
                      onClick={handlePrintPassport}
                      style={{ padding: '8px 14px', background: '#15803d', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      திட்டம் & PDF ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ENCYCLOPEDIA & CROWD */}
        {activeTab === 'encyclopedia' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {tourCircuits.map(item => (
              <div key={item.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
                <h3 style={{ margin: '0 0 6px', color: '#38bdf8', fontSize: '16px' }}>{item.title}</h3>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>📍 {item.district}</div>

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px', marginBottom: '10px', fontSize: '12px' }}>
                  <div style={{ color: '#facc15', fontWeight: 'bold', marginBottom: '4px' }}>⏰ நடை திறக்கும் நேரம்:</div>
                  <div style={{ color: '#cbd5e1' }}>{item.templeTiming}</div>
                </div>

                <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
                  <div style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '4px' }}>👥 நேரலை கூட்ட நெரிசல் நிலவரம்:</div>
                  <div style={{ color: '#f8fafc' }}>{item.crowdStatus}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: HIGHWAY & LOCAL SPECIALS */}
        {activeTab === 'highway' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {highwayGems.map((gem, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 'bold', marginBottom: '4px' }}>🛣️ {gem.highway}</div>
                <h3 style={{ margin: '0 0 10px', color: '#f8fafc', fontSize: '16px' }}>{gem.name}</h3>

                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>உள்ளூர் பிரசித்தி பெற்ற சிறப்பு:</div>
                  <div style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#fde047', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                    🛍️ {gem.specialty}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>கிடைக்கும் வசதிகள்:</div>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#cbd5e1', fontSize: '12px', lineHeight: '1.6' }}>
                    {gem.facilities.map((fac, fIdx) => (
                      <li key={fIdx}>{fac}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: EXPENSE SPLITTER */}
        {activeTab === 'expenses' && (
          <div style={{ maxWidth: '700px', margin: '0 auto', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ margin: '0 0 6px', fontSize: '18px', color: '#38bdf8' }}>💰 பயணச் செலவு பிரிப்பான் (Expense Splitter)</h2>
            <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94a3b8' }}>குழுப் பயணங்களில் நண்பர்கள்/குடும்பத்தினருக்குள் செலவை எளிதாகப் பிரிக்கவும்.</p>

            {/* Total Summary Card */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>மொத்த பயணச் செலவு:</span>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f8fafc' }}>₹{totalExpense.toLocaleString('en-IN')}</div>
              </div>
              <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#4ade80' }}>ஒரு நபருக்கான பங்கு ({totalMembers} பேர்):</span>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4ade80' }}>₹{perPersonShare.toLocaleString('en-IN')}</div>
              </div>
            </div>

            {/* Expense Input */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="செலவு விபரம் (எ.கா: டோல்கேட்)" 
                value={newExp.title}
                onChange={(e) => setNewExp({...newExp, title: e.target.value})}
                style={{ flex: '2', minWidth: '160px', padding: '8px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '13px' }}
              />
              <input 
                type="number" 
                placeholder="தொகை ₹" 
                value={newExp.amount}
                onChange={(e) => setNewExp({...newExp, amount: e.target.value})}
                style={{ flex: '1', minWidth: '100px', padding: '8px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '13px' }}
              />
              <button 
                onClick={handleAddExpense}
                style={{ padding: '8px 16px', background: '#22c55e', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
              >
                + சேர்
              </button>
            </div>

            {/* Expenses List */}
            <div style={{ display: 'grid', gap: '8px' }}>
              {expenses.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '13px' }}>
                  <span>{item.title}</span>
                  <span style={{ fontWeight: 'bold', color: '#facc15' }}>₹{item.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}