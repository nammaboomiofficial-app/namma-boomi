import { useState } from 'react';

export default function Home() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(1);
  const [error, setError] = useState('');

  // 1. நிலம் வாங்குதல்
  const [landRecords, setLandRecords] = useState([
    { id: 1, village: 'செங்கல்பட்டு', surveyNo: '142/2A', extent: '2.5 ஏக்கர்', owner: 'முருகன்', cost: '₹50,00,000', status: 'சரிபார்க்கப்பட்டது' }
  ]);
  const [landForm, setLandForm] = useState({ village: '', surveyNo: '', extent: '', owner: '', cost: '' });

  // 2. லேஅவுட் & திட்டமிடல்
  const [layoutRecords, setLayoutRecords] = useState([
    { id: 1, projectName: 'பூமி கார்டன் - பேஸ் 1', totalArea: '2.5 ஏக்கர்', totalPlots: '48', roadWidth: '30 அடி', parkArea: '10%', status: 'வரைபடம் தயார்' }
  ]);
  const [layoutForm, setLayoutForm] = useState({ projectName: '', totalArea: '', totalPlots: '', roadWidth: '', parkArea: '' });

  // 3. அரசு அனுமதிகள் & ஆவணங்கள்
  const [approvalRecords, setApprovalRecords] = useState([
    { id: 1, layoutName: 'பூமி கார்டன் - பேஸ் 1', authority: 'DTCP', appNumber: 'DTCP/2026/048', docStatus: 'EC, பட்டா சரிபார்க்கப்பட்டது', approvalStatus: 'அனுமதி வழங்கப்பட்டது' }
  ]);
  const [approvalForm, setApprovalForm] = useState({ layoutName: '', authority: 'DTCP', appNumber: '', docStatus: '', approvalStatus: 'பரிசீலனையில்' });

  // 4. மனை மேம்பாடு
  const [devRecords, setDevRecords] = useState([
    { id: 1, layoutName: 'பூமி கார்டன் - பேஸ் 1', workType: 'தார் சாலை & வடிகால்', contractor: 'SK இன்ஃப்ரா', cost: '₹12,00,000', progress: 'பணி நடக்கிறது' }
  ]);
  const [devForm, setDevForm] = useState({ layoutName: '', workType: 'தார் சாலை அமைத்தல்', contractor: '', cost: '', progress: 'பணி நடக்கிறது' });

  // 5. விலை நிர்ணயம் & செலவுகள்
  const [pricingRecords, setPricingRecords] = useState([
    { id: 1, layoutName: 'பூமி கார்டன் - பேஸ் 1', totalSqft: '60000', totalCost: '6200000', pricePerSqft: '1600', totalRevenue: '9600000', profit: '3400000' }
  ]);
  const [priceForm, setPriceForm] = useState({ layoutName: '', totalSqft: '', totalCost: '', pricePerSqft: '' });

  // 6. விளம்பரம் & மார்க்கெட்டிங்
  const [leadRecords, setLeadRecords] = useState([
    { id: 1, clientName: 'கார்த்திகேயன்', phone: '9876543210', project: 'பூமி கார்டன் - பேஸ் 1', source: 'Facebook Ads', status: 'Site Visit முடிந்தது' }
  ]);
  const [leadForm, setLeadForm] = useState({ clientName: '', phone: '', project: '', source: 'Facebook Ads', status: 'விசாரித்துள்ளார் (New Lead)' });

  // 7. விற்பனை & முன்பதிவு
  const [bookingRecords, setBookingRecords] = useState([
    { id: 1, layoutName: 'பூமி கார்டன் - பேஸ் 1', plotNo: 'Plot #12', clientName: 'ரமேஷ் பாபு', phone: '9444112233', totalCost: '1800000', advance: '300000', balance: '1500000', status: 'முன்பதிவு முடிந்தது' }
  ]);
  const [bookingForm, setBookingForm] = useState({ layoutName: '', plotNo: '', clientName: '', phone: '', totalCost: '', advance: '', status: 'முன்பதிவு முடிந்தது' });

  // 8. பத்திரம் & கிரையம்
  const [regRecords, setRegRecords] = useState([
    { id: 1, layoutName: 'பூமி கார்டன் - பேஸ் 1', plotNo: 'Plot #12', clientName: 'ரமேஷ் பாபு', sroOffice: 'திருப்போரூர் SRO', docNumber: 'Doc No: 4521/2026', stampDuty: '₹ 1,26,000', regStatus: 'பதிவு முடிந்தது' }
  ]);
  const [regForm, setRegForm] = useState({ layoutName: '', plotNo: '', clientName: '', sroOffice: '', docNumber: '', stampDuty: '', regStatus: 'வரைவு பத்திரம் தயார்' });

  // 9. வாடிக்கையாளர் சேவை
  const [supportRecords, setSupportRecords] = useState([
    { id: 1, plotNo: 'Plot #12', clientName: 'ரமேஷ் பாபு', serviceType: 'பட்டா பெயர் மாற்றம்', appNo: 'CAN-892110', status: 'பட்டா பெறப்பட்டது', remarks: 'இ-பட்டா நகல் வழங்கப்பட்டது' }
  ]);
  const [supportForm, setSupportForm] = useState({ plotNo: '', clientName: '', serviceType: 'பட்டா பெயர் மாற்றம்', appNo: '', status: 'விண்ணப்பிக்கப்பட்டுள்ளது', remarks: '' });

  // 10. சொத்து மேலாண்மை (Property Mgmt)
  const [mgmtRecords, setMgmtRecords] = useState([
    { id: 1, layoutName: 'பூமி கார்டன் - பேஸ் 1', taskType: 'செக்யூரிட்டி & சிசிடிவி கண்காணிப்பு', staff: 'காவலர் கண்ணன்', monthlyCost: '₹ 15,000', status: 'செயலில் உள்ளது' }
  ]);
  const [mgmtForm, setMgmtForm] = useState({ layoutName: '', taskType: 'பாதுகாப்பு & செக்யூரிட்டி', staff: '', monthlyCost: '', status: 'செயலில் உள்ளது' });

  const menuItems = [
    { id: 1, name: '1. நிலம் வாங்குதல் (Land Acquisition)', icon: '🏞️' },
    { id: 2, name: '2. லேஅவுட் & திட்டமிடல் (Layout & Planning)', icon: '📐' },
    { id: 3, name: '3. அரசு அனுமதிகள் & ஆவணங்கள் (Approvals)', icon: '📜' },
    { id: 4, name: '4. மனை மேம்பாடு (Plot Development)', icon: '🚜' },
    { id: 5, name: '5. விலை நிர்ணயம் & செலவுகள் (Costing & Pricing)', icon: '💰' },
    { id: 6, name: '6. விளம்பரம் & மார்க்கெட்டிங் (Marketing)', icon: '📢' },
    { id: 7, name: '7. விற்பனை & முன்பதிவு (Sales & Booking)', icon: '🤝' },
    { id: 8, name: '8. பத்திரம் & கிரையம் (Documentation & Reg.)', icon: '✍️' },
    { id: 9, name: '9. வாடிக்கையாளர் சேவை (Customer Support)', icon: '👥' },
    { id: 10, name: '10. சொத்து மேலாண்மை (Property Mgmt)', icon: '🛡️' },
    { id: 11, name: '+1 அட்மின் & கணக்குகள் (Admin & Finance)', icon: '⚙️' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('தவறான PIN! மீண்டும் முயற்சிக்கவும்.');
    }
  };

  const handleAddLand = (e) => {
    e.preventDefault();
    if (!landForm.village || !landForm.surveyNo) return;
    setLandRecords([...landRecords, { id: Date.now(), ...landForm, status: 'ஆய்வில் உள்ளது' }]);
    setLandForm({ village: '', surveyNo: '', extent: '', owner: '', cost: '' });
  };

  const handleAddLayout = (e) => {
    e.preventDefault();
    if (!layoutForm.projectName || !layoutForm.totalPlots) return;
    setLayoutRecords([...layoutRecords, { id: Date.now(), ...layoutForm, status: 'திட்டமிடலில் உள்ளது' }]);
    setLayoutForm({ projectName: '', totalArea: '', totalPlots: '', roadWidth: '', parkArea: '' });
  };

  const handleAddApproval = (e) => {
    e.preventDefault();
    if (!approvalForm.layoutName || !approvalForm.appNumber) return;
    setApprovalRecords([...approvalRecords, { id: Date.now(), ...approvalForm }]);
    setApprovalForm({ layoutName: '', authority: 'DTCP', appNumber: '', docStatus: '', approvalStatus: 'பரிசீலனையில்' });
  };

  const handleAddDev = (e) => {
    e.preventDefault();
    if (!devForm.layoutName || !devForm.contractor) return;
    setDevRecords([...devRecords, { id: Date.now(), ...devForm }]);
    setDevForm({ layoutName: '', workType: 'தார் சாலை அமைத்தல்', contractor: '', cost: '', progress: 'பணி நடக்கிறது' });
  };

  const handleAddPricing = (e) => {
    e.preventDefault();
    if (!priceForm.layoutName || !priceForm.totalSqft || !priceForm.pricePerSqft) return;
    const sqft = parseFloat(priceForm.totalSqft) || 0;
    const rate = parseFloat(priceForm.pricePerSqft) || 0;
    const cost = parseFloat(priceForm.totalCost) || 0;
    const totalRev = sqft * rate;
    const netProfit = totalRev - cost;

    setPricingRecords([...pricingRecords, {
      id: Date.now(),
      layoutName: priceForm.layoutName,
      totalSqft: priceForm.totalSqft,
      totalCost: priceForm.totalCost,
      pricePerSqft: priceForm.pricePerSqft,
      totalRevenue: totalRev.toString(),
      profit: netProfit.toString()
    }]);
    setPriceForm({ layoutName: '', totalSqft: '', totalCost: '', pricePerSqft: '' });
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!leadForm.clientName || !leadForm.phone) return;
    setLeadRecords([...leadRecords, { id: Date.now(), ...leadForm }]);
    setLeadForm({ clientName: '', phone: '', project: '', source: 'Facebook Ads', status: 'விசாரித்துள்ளார் (New Lead)' });
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    if (!bookingForm.plotNo || !bookingForm.clientName || !bookingForm.totalCost) return;
    const total = parseFloat(bookingForm.totalCost) || 0;
    const adv = parseFloat(bookingForm.advance) || 0;
    const bal = total - adv;

    setBookingRecords([...bookingRecords, {
      id: Date.now(),
      layoutName: bookingForm.layoutName,
      plotNo: bookingForm.plotNo,
      clientName: bookingForm.clientName,
      phone: bookingForm.phone,
      totalCost: bookingForm.totalCost,
      advance: bookingForm.advance,
      balance: bal.toString(),
      status: bookingForm.status
    }]);
    setBookingForm({ layoutName: '', plotNo: '', clientName: '', phone: '', totalCost: '', advance: '', status: 'முன்பதிவு முடிந்தது' });
  };

  const handleAddReg = (e) => {
    e.preventDefault();
    if (!regForm.plotNo || !regForm.clientName) return;
    setRegRecords([...regRecords, { id: Date.now(), ...regForm }]);
    setRegForm({ layoutName: '', plotNo: '', clientName: '', sroOffice: '', docNumber: '', stampDuty: '', regStatus: 'வரைவு பத்திரம் தயார்' });
  };

  const handleAddSupport = (e) => {
    e.preventDefault();
    if (!supportForm.plotNo || !supportForm.clientName) return;
    setSupportRecords([...supportRecords, { id: Date.now(), ...supportForm }]);
    setSupportForm({ plotNo: '', clientName: '', serviceType: 'பட்டா பெயர் மாற்றம்', appNo: '', status: 'விண்ணப்பிக்கப்பட்டுள்ளது', remarks: '' });
  };

  const handleAddMgmt = (e) => {
    e.preventDefault();
    if (!mgmtForm.layoutName || !mgmtForm.staff) return;
    setMgmtRecords([...mgmtRecords, { id: Date.now(), ...mgmtForm }]);
    setMgmtForm({ layoutName: '', taskType: 'பாதுகாப்பு & செக்யூரிட்டி', staff: '', monthlyCost: '', status: 'செயலில் உள்ளது' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-500/30">
            🌱
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">நம்ம பூமி 360</h1>
          <p className="text-slate-400 text-sm mb-6">ரியல் எஸ்டேட் லேஅவுட் மேலாண்மை தளம்</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN உள்ளிடவும் (1234)"
                className="w-full text-center tracking-widest text-2xl py-3 px-4 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            {error && <p className="text-rose-400 text-xs font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-emerald-900/40"
            >
              உள்நுழைக (Login)
            </button>
          </form>
        </div>
      </div>
    );
  }

  const currentMenu = menuItems.find(item => item.id === activeMenuId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* பக்கவாட்டு மெனு */}
      <aside className="w-full md:w-80 bg-slate-900 border-r border-slate-800 flex flex-col p-4 shrink-0">
        <div className="flex items-center space-x-3 px-2 py-4 mb-4 border-b border-slate-800">
          <span className="text-3xl">🌱</span>
          <div>
            <h2 className="font-bold text-lg text-emerald-400">நம்ம பூமி 360</h2>
            <p className="text-xs text-slate-400">ரியல் எஸ்டேட் மேனேஜர்</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenuId(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-3 transition ${
                activeMenuId === item.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-slate-800 mt-auto">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full text-left px-3 py-2 text-rose-400 hover:bg-rose-500/10 rounded-lg text-sm font-medium transition flex items-center space-x-2"
          >
            <span>🚪</span>
            <span>வெளியேறு (Logout)</span>
          </button>
        </div>
      </aside>

      {/* முதன்மைப் பகுதி */}
      <main className="flex-1 p-6 lg:p-8 bg-slate-950 overflow-y-auto">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{currentMenu?.name}</h1>
            <p className="text-sm text-slate-400">பிரிவின் தரவுகள் மற்றும் திட்டமிடல் படிவம்</p>
          </div>
        </header>

        {/* 1. நிலம் வாங்குதல் */}
        {activeMenuId === 1 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-md font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>➕</span> புதிய நில விவரம் சேர்த்தல்
              </h3>
              <form onSubmit={handleAddLand} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">கிராமம் / இடம்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. திருப்போரூர்"
                    value={landForm.village}
                    onChange={(e) => setLandForm({...landForm, village: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">சர்வே எண்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. 102/1B"
                    value={landForm.surveyNo}
                    onChange={(e) => setLandForm({...landForm, surveyNo: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">பரப்பளவு</label>
                  <input
                    type="text"
                    placeholder="எ.கா. 2.5 ஏக்கர்"
                    value={landForm.extent}
                    onChange={(e) => setLandForm({...landForm, extent: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">உரிமையாளர் பெயர்</label>
                  <input
                    type="text"
                    placeholder="உரிமையாளர் பெயர்"
                    value={landForm.owner}
                    onChange={(e) => setLandForm({...landForm, owner: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">மதிப்பு / தொகை</label>
                  <input
                    type="text"
                    placeholder="₹ 75,00,000"
                    value={landForm.cost}
                    onChange={(e) => setLandForm({...landForm, cost: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    சேமிக்க (Save Land)
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">பரிசீலனையில் உள்ள நிலங்களின் பட்டியல்</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="p-3">கிராமம்</th>
                      <th className="p-3">சர்வே எண்</th>
                      <th className="p-3">பரப்பளவு</th>
                      <th className="p-3">உரிமையாளர்</th>
                      <th className="p-3">தொகை</th>
                      <th className="p-3">நிலை</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {landRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-medium text-white">{rec.village}</td>
                        <td className="p-3">{rec.surveyNo}</td>
                        <td className="p-3">{rec.extent}</td>
                        <td className="p-3">{rec.owner}</td>
                        <td className="p-3 text-emerald-400 font-semibold">{rec.cost}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {rec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. லேஅவுட் & திட்டமிடல் */}
        {activeMenuId === 2 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-md font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>📐</span> புதிய லேஅவுட் திட்டம் உருவாக்குதல்
              </h3>
              <form onSubmit={handleAddLayout} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">லேஅவுட் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. பூமி கார்டன் பேஸ் 2"
                    value={layoutForm.projectName}
                    onChange={(e) => setLayoutForm({...layoutForm, projectName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">மொத்த பரப்பளவு</label>
                  <input
                    type="text"
                    placeholder="எ.கா. 3 ஏக்கர் 50 சென்ட்"
                    value={layoutForm.totalArea}
                    onChange={(e) => setLayoutForm({...layoutForm, totalArea: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">மொத்த மனைகள்</label>
                  <input
                    type="number"
                    placeholder="எ.கா. 60"
                    value={layoutForm.totalPlots}
                    onChange={(e) => setLayoutForm({...layoutForm, totalPlots: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">சாலை அகலம்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. 30 அடி"
                    value={layoutForm.roadWidth}
                    onChange={(e) => setLayoutForm({...layoutForm, roadWidth: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">பூங்கா / OSR</label>
                  <input
                    type="text"
                    placeholder="எ.கா. 10%"
                    value={layoutForm.parkArea}
                    onChange={(e) => setLayoutForm({...layoutForm, parkArea: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    லேஅவுட் சேமிக்க
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">திட்டமிடப்பட்ட லேஅவுட்களின் பட்டியல்</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="p-3">லேஅவுட் பெயர்</th>
                      <th className="p-3">மொத்த பரப்பளவு</th>
                      <th className="p-3">மனைகள்</th>
                      <th className="p-3">சாலை அகலம்</th>
                      <th className="p-3">OSR / பூங்கா</th>
                      <th className="p-3">நிலை</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {layoutRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-medium text-white">{rec.projectName}</td>
                        <td className="p-3">{rec.totalArea}</td>
                        <td className="p-3 text-emerald-400 font-bold">{rec.totalPlots} மனைகள்</td>
                        <td className="p-3">{rec.roadWidth}</td>
                        <td className="p-3">{rec.parkArea}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 rounded-full text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            {rec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. அரசு அனுமதிகள் */}
        {activeMenuId === 3 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-md font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>📜</span> அரசு அனுமதி & ஆவண விவரம் பதிவு
              </h3>
              <form onSubmit={handleAddApproval} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">லேஅவுட் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. பூமி கார்டன் - பேஸ் 1"
                    value={approvalForm.layoutName}
                    onChange={(e) => setApprovalForm({...approvalForm, layoutName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">அனுமதி ஆணையம்</label>
                  <select
                    value={approvalForm.authority}
                    onChange={(e) => setApprovalForm({...approvalForm, authority: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="DTCP">DTCP (நகர் ஊரமைப்பு)</option>
                    <option value="CMDA">CMDA (சென்னை பெருநகர்)</option>
                    <option value="TNRERA">TNRERA (ரெரா பதிவு)</option>
                    <option value="Panchayat">பஞ்சாயத்து யூனியன்</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">விண்ணப்பம் / LP எண்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. DTCP/2026/LP-12"
                    value={approvalForm.appNumber}
                    onChange={(e) => setApprovalForm({...approvalForm, appNumber: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">சரிபார்க்கப்பட்ட ஆவணங்கள்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. தாய் பத்திரம், EC, பட்டா"
                    value={approvalForm.docStatus}
                    onChange={(e) => setApprovalForm({...approvalForm, docStatus: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">ஒப்புதல் நிலை</label>
                  <select
                    value={approvalForm.approvalStatus}
                    onChange={(e) => setApprovalForm({...approvalForm, approvalStatus: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="பரிசீலனையில்">பரிசீலனையில்</option>
                    <option value="அனுமதி வழங்கப்பட்டது">அனுமதி வழங்கப்பட்டது</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    அனுமதியைச் சேமிக்க
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">அரசு அனுமதிகள் & ஆவண நிலவரம்</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="p-3">லேஅவுட் பெயர்</th>
                      <th className="p-3">ஆணையம்</th>
                      <th className="p-3">விண்ணப்பம் / LP எண்</th>
                      <th className="p-3">ஆவணங்கள்</th>
                      <th className="p-3">ஒப்புதல் நிலை</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {approvalRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-medium text-white">{rec.layoutName}</td>
                        <td className="p-3 font-semibold text-amber-400">{rec.authority}</td>
                        <td className="p-3">{rec.appNumber}</td>
                        <td className="p-3 text-xs text-slate-400">{rec.docStatus}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs ${
                            rec.approvalStatus === 'அனுமதி வழங்கப்பட்டது'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {rec.approvalStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. மனை மேம்பாடு */}
        {activeMenuId === 4 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-md font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>🚜</span> மனை மேம்பாட்டுப் பணி பதிவு
              </h3>
              <form onSubmit={handleAddDev} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">லேஅவுட் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. பூமி கார்டன் - பேஸ் 1"
                    value={devForm.layoutName}
                    onChange={(e) => setDevForm({...devForm, layoutName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">பணி வகை</label>
                  <select
                    value={devForm.workType}
                    onChange={(e) => setDevForm({...devForm, workType: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="தார் சாலை அமைத்தல்">தார் சாலை அமைத்தல்</option>
                    <option value="மழைநீர் வடிகால்">மழைநீர் வடிகால்</option>
                    <option value="மின் கம்பங்கள் & EB">மின் கம்பங்கள் & EB</option>
                    <option value="சுற்றுச்சுவர் & வளைவு">சுற்றுச்சுவர் & வளைவு</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">ஒப்பந்ததாரர் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. SK இன்ஃப்ரா"
                    value={devForm.contractor}
                    onChange={(e) => setDevForm({...devForm, contractor: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">செலவு ₹</label>
                  <input
                    type="text"
                    placeholder="எ.கா. ₹ 15,00,000"
                    value={devForm.cost}
                    onChange={(e) => setDevForm({...devForm, cost: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">பணி நிலை</label>
                  <select
                    value={devForm.progress}
                    onChange={(e) => setDevForm({...devForm, progress: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="பணி நடக்கிறது">பணி நடக்கிறது</option>
                    <option value="முடிக்கப்பட்டது">முடிக்கப்பட்டது</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    பணியைச் சேமிக்க
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">மேம்பாட்டுப் பணிகளின் நிலவரம்</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="p-3">லேஅவுட் பெயர்</th>
                      <th className="p-3">பணி வகை</th>
                      <th className="p-3">ஒப்பந்ததாரர்</th>
                      <th className="p-3">செலவு மதிப்பு</th>
                      <th className="p-3">பணி நிலை</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {devRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-medium text-white">{rec.layoutName}</td>
                        <td className="p-3 text-sky-400 font-semibold">{rec.workType}</td>
                        <td className="p-3">{rec.contractor}</td>
                        <td className="p-3 text-emerald-400 font-semibold">{rec.cost}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {rec.progress}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. விலை நிர்ணயம் */}
        {activeMenuId === 5 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-md font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>💰</span> விலை நிர்ணயம் & லாபக் கணக்கீடு
              </h3>
              <form onSubmit={handleAddPricing} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">லேஅவுட் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. பூமி கார்டன் - பேஸ் 1"
                    value={priceForm.layoutName}
                    onChange={(e) => setPriceForm({...priceForm, layoutName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">விற்பனைப் பரப்பளவு</label>
                  <input
                    type="number"
                    placeholder="எ.கா. 60000"
                    value={priceForm.totalSqft}
                    onChange={(e) => setPriceForm({...priceForm, totalSqft: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">மொத்த அடக்கம் ₹</label>
                  <input
                    type="number"
                    placeholder="எ.கா. 6200000"
                    value={priceForm.totalCost}
                    onChange={(e) => setPriceForm({...priceForm, totalCost: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">சதுர அடி விலை ₹</label>
                  <input
                    type="number"
                    placeholder="எ.கா. 1600"
                    value={priceForm.pricePerSqft}
                    onChange={(e) => setPriceForm({...priceForm, pricePerSqft: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div className="md:col-span-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-6 rounded-lg transition shadow-md"
                  >
                    கணக்கிட்டு சேமிக்க
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">திட்ட வாரியான விலை & லாப விவரங்கள்</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="p-3">லேஅவுட் பெயர்</th>
                      <th className="p-3">விற்பனை பரப்பளவு</th>
                      <th className="p-3">சதுர அடி விலை</th>
                      <th className="p-3">மொத்த அடக்கச் செலவு</th>
                      <th className="p-3">வருவாய்</th>
                      <th className="p-3">நிகர லாபம்</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {pricingRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-medium text-white">{rec.layoutName}</td>
                        <td className="p-3">{rec.totalSqft} Sq.ft</td>
                        <td className="p-3 font-bold text-sky-400">₹ {rec.pricePerSqft}</td>
                        <td className="p-3 text-rose-400">₹ {parseFloat(rec.totalCost).toLocaleString('en-IN')}</td>
                        <td className="p-3 text-emerald-400">₹ {parseFloat(rec.totalRevenue).toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            + ₹ {parseFloat(rec.profit).toLocaleString('en-IN')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 6. விளம்பரம் & மார்க்கெட்டிங் */}
        {activeMenuId === 6 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-md font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>📢</span> புதிய வாடிக்கையாளர் விசாரணைப் பதிவு
              </h3>
              <form onSubmit={handleAddLead} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">வாடிக்கையாளர் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. கார்த்திகேயன்"
                    value={leadForm.clientName}
                    onChange={(e) => setLeadForm({...leadForm, clientName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">கைபேசி எண்</label>
                  <input
                    type="tel"
                    placeholder="எ.கா. 9876543210"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">விரும்பும் திட்டம்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. பூமி கார்டன் - பேஸ் 1"
                    value={leadForm.project}
                    onChange={(e) => setLeadForm({...leadForm, project: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">விளம்பர மூலம்</label>
                  <select
                    value={leadForm.source}
                    onChange={(e) => setLeadForm({...leadForm, source: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Facebook Ads">Facebook Ads</option>
                    <option value="Direct Call / Banner">நேரடி அழைப்பு / பேனர்</option>
                    <option value="WhatsApp Campaign">வாட்ஸ்அப்</option>
                    <option value="Referral / Broker">பரிந்துரை</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">தொடர்பு நிலை</label>
                  <select
                    value={leadForm.status}
                    onChange={(e) => setLeadForm({...leadForm, status: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="விசாரித்துள்ளார் (New Lead)">விசாரித்துள்ளார்</option>
                    <option value="Site Visit முடிந்தது">Site Visit முடிந்தது</option>
                    <option value="முன்பதிவுக்குத் தயார்">முன்பதிவுக்குத் தயார்</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    விசாரணையைச் சேமிக்க
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">விளம்பர விசாரணைகள் & லீட்ஸ் பட்டியல்</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="p-3">வாடிக்கையாளர் பெயர்</th>
                      <th className="p-3">தொலைபேசி எண்</th>
                      <th className="p-3">திட்டம்</th>
                      <th className="p-3">விளம்பர மூலம்</th>
                      <th className="p-3">தற்போதைய நிலை</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leadRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-medium text-white">{rec.clientName}</td>
                        <td className="p-3 text-sky-400">{rec.phone}</td>
                        <td className="p-3">{rec.project}</td>
                        <td className="p-3 text-xs text-slate-400">{rec.source}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 rounded-full text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
                            {rec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 7. விற்பனை & முன்பதிவு */}
        {activeMenuId === 7 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-md font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>🤝</span> மனை முன்பதிவு பதிவு (Plot Booking Form)
              </h3>
              <form onSubmit={handleAddBooking} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">லேஅவுட் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. பூமி கார்டன் - பேஸ் 1"
                    value={bookingForm.layoutName}
                    onChange={(e) => setBookingForm({...bookingForm, layoutName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">மனை எண் (Plot No)</label>
                  <input
                    type="text"
                    placeholder="எ.கா. Plot #15"
                    value={bookingForm.plotNo}
                    onChange={(e) => setBookingForm({...bookingForm, plotNo: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">வாடிக்கையாளர் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. சுரேஷ் குமார்"
                    value={bookingForm.clientName}
                    onChange={(e) => setBookingForm({...bookingForm, clientName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">கைபேசி எண்</label>
                  <input
                    type="tel"
                    placeholder="எ.கா. 9876543210"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">மொத்த மனை மதிப்பு ₹</label>
                  <input
                    type="number"
                    placeholder="எ.கா. 1800000"
                    value={bookingForm.totalCost}
                    onChange={(e) => setBookingForm({...bookingForm, totalCost: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">முன்பதிவு அட்வான்ஸ் ₹</label>
                  <input
                    type="number"
                    placeholder="எ.கா. 200000"
                    value={bookingForm.advance}
                    onChange={(e) => setBookingForm({...bookingForm, advance: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">முன்பதிவு நிலை</label>
                  <select
                    value={bookingForm.status}
                    onChange={(e) => setBookingForm({...bookingForm, status: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="டோக்கன் அட்வான்ஸ்">டோக்கன் அட்வான்ஸ்</option>
                    <option value="முன்பதிவு முடிந்தது">முன்பதிவு முடிந்தது</option>
                    <option value="கிரையத்திற்குத் தயார்">கிரையத்திற்குத் தயார்</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition shadow-md"
                  >
                    முன்பதிவை உறுதிசெய்க
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">விற்பனை & முன்பதிவு செய்யப்பட்ட மனைகளின் பட்டியல்</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="p-3">மனை எண்</th>
                      <th className="p-3">வாடிக்கையாளர்</th>
                      <th className="p-3">மொத்த விலை</th>
                      <th className="p-3">பெறப்பட்ட அட்வான்ஸ்</th>
                      <th className="p-3">மீதித் தொகை</th>
                      <th className="p-3">நிலை</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {bookingRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-bold text-amber-400">{rec.plotNo}</td>
                        <td className="p-3 font-medium text-white">{rec.clientName} ({rec.phone})</td>
                        <td className="p-3">₹ {parseFloat(rec.totalCost).toLocaleString('en-IN')}</td>
                        <td className="p-3 text-emerald-400 font-semibold">₹ {parseFloat(rec.advance).toLocaleString('en-IN')}</td>
                        <td className="p-3 text-rose-400 font-semibold">₹ {parseFloat(rec.balance).toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                            {rec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 8. பத்திரம் & கிரையம் */}
        {activeMenuId === 8 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-md font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>✍️</span> பத்திரப் பதிவு & கிரைய விவரம் (Registration Form)
              </h3>
              <form onSubmit={handleAddReg} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">லேஅவுட் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. பூமி கார்டன் - பேஸ் 1"
                    value={regForm.layoutName}
                    onChange={(e) => setRegForm({...regForm, layoutName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">மனை எண் (Plot No)</label>
                  <input
                    type="text"
                    placeholder="எ.கா. Plot #12"
                    value={regForm.plotNo}
                    onChange={(e) => setRegForm({...regForm, plotNo: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">வாங்குபவர் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. ரமேஷ் பாபு"
                    value={regForm.clientName}
                    onChange={(e) => setRegForm({...regForm, clientName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">சார் பதிவாளர் அலுவலகம் (SRO)</label>
                  <input
                    type="text"
                    placeholder="எ.கா. திருப்போரூர் SRO"
                    value={regForm.sroOffice}
                    onChange={(e) => setRegForm({...regForm, sroOffice: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">பத்திர எண் (Doc No)</label>
                  <input
                    type="text"
                    placeholder="எ.கா. Doc No: 4521/2026"
                    value={regForm.docNumber}
                    onChange={(e) => setRegForm({...regForm, docNumber: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">முத்திரைத்தாள் கட்டணம் ₹</label>
                  <input
                    type="text"
                    placeholder="எ.கா. ₹ 1,26,000"
                    value={regForm.stampDuty}
                    onChange={(e) => setRegForm({...regForm, stampDuty: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">பத்திர நிலை</label>
                  <select
                    value={regForm.regStatus}
                    onChange={(e) => setRegForm({...regForm, regStatus: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="வரைவு பத்திரம் தயார்">வரைவு பத்திரம் தயார்</option>
                    <option value="டோக்கன் பெறப்பட்டது">டோக்கன் பெறப்பட்டது</option>
                    <option value="பதிவு முடிந்தது">பதிவு முடிந்தது</option>
                    <option value="அசல் பத்திரம் வழங்கப்பட்டது">அசல் பத்திரம் வழங்கப்பட்டது</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition shadow-md"
                  >
                    பத்திர விவரங்களைச் சேமிக்க
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">கிரையப் பதிவு மற்றும் பத்திர நிலவரப் பட்டியல்</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="p-3">மனை எண்</th>
                      <th className="p-3">வாங்குபவர் பெயர்</th>
                      <th className="p-3">SRO அலுவலகம்</th>
                      <th className="p-3">பத்திர எண்</th>
                      <th className="p-3">முத்திரைத்தாள்</th>
                      <th className="p-3">பத்திர நிலை</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {regRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-bold text-amber-400">{rec.plotNo}</td>
                        <td className="p-3 font-medium text-white">{rec.clientName}</td>
                        <td className="p-3">{rec.sroOffice}</td>
                        <td className="p-3 text-sky-400 font-mono">{rec.docNumber || '-'}</td>
                        <td className="p-3 text-emerald-400">{rec.stampDuty || '-'}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs ${
                            rec.regStatus === 'பதிவு முடிந்தது' || rec.regStatus === 'அசல் பத்திரம் வழங்கப்பட்டது'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {rec.regStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 9. வாடிக்கையாளர் சேவை & பட்டா மாற்றம் */}
        {activeMenuId === 9 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-md font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>👥</span> வாடிக்கையாளர் சேவை & பட்டா மாறுதல் கோரிக்கை
              </h3>
              <form onSubmit={handleAddSupport} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">மனை எண் (Plot No)</label>
                  <input
                    type="text"
                    placeholder="எ.கா. Plot #12"
                    value={supportForm.plotNo}
                    onChange={(e) => setSupportForm({...supportForm, plotNo: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">வாடிக்கையாளர் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. ரமேஷ் பாபு"
                    value={supportForm.clientName}
                    onChange={(e) => setSupportForm({...supportForm, clientName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">சேவை வகை</label>
                  <select
                    value={supportForm.serviceType}
                    onChange={(e) => setSupportForm({...supportForm, serviceType: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="பட்டா பெயர் மாற்றம்">பட்டா பெயர் மாற்றம் (Patta Transfer)</option>
                    <option value="எல்லைக் கல் நடுதல்">எல்லைக் கல் நடுதல் (Boundary Stones)</option>
                    <option value="EC / வில்லங்கம் எடுத்தல்">EC / வில்லங்கம் எடுத்தல்</option>
                    <option value="மனை பராமரிப்பு">மனை பராமரிப்பு உதவி</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">விண்ணப்ப எண்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. CAN-892110"
                    value={supportForm.appNo}
                    onChange={(e) => setSupportForm({...supportForm, appNo: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">சேவை நிலை</label>
                  <select
                    value={supportForm.status}
                    onChange={(e) => setSupportForm({...supportForm, status: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="விண்ணப்பிக்கப்பட்டுள்ளது">விண்ணப்பிக்கப்பட்டுள்ளது</option>
                    <option value="VAO / RI கள ஆய்வு">VAO / RI கள ஆய்வு</option>
                    <option value="பட்டா பெறப்பட்டது">பட்டா பெறப்பட்டது</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">குறிப்புகள்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. நகல் வழங்கப்பட்டது"
                    value={supportForm.remarks}
                    onChange={(e) => setSupportForm({...supportForm, remarks: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-6 rounded-lg transition shadow-md"
                  >
                    சேவைக் கோரிக்கையைச் சேமிக்க
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">வாடிக்கையாளர் சேவைகள் & பட்டா மாற்றம் நிலவரம்</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="p-3">மனை எண்</th>
                      <th className="p-3">வாடிக்கையாளர்</th>
                      <th className="p-3">சேவை வகை</th>
                      <th className="p-3">விண்ணப்ப எண்</th>
                      <th className="p-3">சேவை நிலை</th>
                      <th className="p-3">குறிப்புகள்</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {supportRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-bold text-amber-400">{rec.plotNo}</td>
                        <td className="p-3 font-medium text-white">{rec.clientName}</td>
                        <td className="p-3 text-sky-400 font-medium">{rec.serviceType}</td>
                        <td className="p-3 font-mono text-xs">{rec.appNo || '-'}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs ${
                            rec.status === 'பட்டா பெறப்பட்டது'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          }`}>
                            {rec.status}
                          </span>
                        </td>
                        <td className="p-3 text-xs text-slate-400">{rec.remarks || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 10. சொத்து மேலாண்மை & பராமரிப்பு */}
        {activeMenuId === 10 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-md font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>🛡️</span> லேஅவுட் சொத்து பராமரிப்பு & செக்யூரிட்டி மேலாண்மை
              </h3>
              <form onSubmit={handleAddMgmt} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">லேஅவுட் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. பூமி கார்டன் - பேஸ் 1"
                    value={mgmtForm.layoutName}
                    onChange={(e) => setMgmtForm({...mgmtForm, layoutName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">பராமரிப்பு வகை (Maintenance Task)</label>
                  <select
                    value={mgmtForm.taskType}
                    onChange={(e) => setMgmtForm({...mgmtForm, taskType: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="செக்யூரிட்டி & சிசிடிவி கண்காணிப்பு">செக்யூரிட்டி & சிசிடிவி கண்காணிப்பு</option>
                    <option value="காடு வெட்டுதல் & மனை சுத்தம்">காடு வெட்டுதல் & மனை சுத்தம்</option>
                    <option value="தெருவிளக்கு & மோட்டார் பராமரிப்பு">தெருவிளக்கு & மோட்டார் பராமரிப்பு</option>
                    <option value="பூங்கா & செடிகள் பராமரிப்பு">பூங்கா & செடிகள் பராமரிப்பு</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">பொறுப்பாளர் / பணியாளர் பெயர்</label>
                  <input
                    type="text"
                    placeholder="எ.கா. காவலர் கண்ணன் / முனிசாமி"
                    value={mgmtForm.staff}
                    onChange={(e) => setMgmtForm({...mgmtForm, staff: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">மாதாந்திர பராமரிப்புச் செலவு ₹</label>
                  <input
                    type="text"
                    placeholder="எ.கா. ₹ 15,000"
                    value={mgmtForm.monthlyCost}
                    onChange={(e) => setMgmtForm({...mgmtForm, monthlyCost: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">பராமரிப்பு நிலை</label>
                  <select
                    value={mgmtForm.status}
                    onChange={(e) => setMgmtForm({...mgmtForm, status: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="செயலில் உள்ளது">செயலில் உள்ளது (Active)</option>
                    <option value="பராமரிப்பு தேவை">பராமரிப்பு தேவை (Attention Required)</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition shadow-md"
                  >
                    பராமரிப்பைச் சேமிக்க
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">லேஅவுட் சொத்து பராமரிப்புப் பட்டியல்</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                    <tr>
                      <th className="p-3">லேஅவுட் பெயர்</th>
                      <th className="p-3">பராமரிப்பு வகை</th>
                      <th className="p-3">பொறுப்பாளர்</th>
                      <th className="p-3">மாதச் செலவு</th>
                      <th className="p-3">நிலை</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {mgmtRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-medium text-white">{rec.layoutName}</td>
                        <td className="p-3 text-sky-400 font-medium">{rec.taskType}</td>
                        <td className="p-3">{rec.staff}</td>
                        <td className="p-3 text-emerald-400 font-semibold">{rec.monthlyCost}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {rec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* +1 அட்மின் & கணக்குகள் (Executive Overview Dashboard) */}
        {activeMenuId === 11 && (
          <div className="space-y-6">
            {/* KPI சுருக்க அட்டைகள் */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                <div className="text-xs text-slate-400 mb-1">மொத்த நில முதலீடு & திட்டங்கள்</div>
                <div className="text-2xl font-bold text-white">{landRecords.length} திட்டங்கள்</div>
                <div className="text-xs text-emerald-400 mt-2">நிலங்கள் சரிபார்க்கப்பட்டது</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                <div className="text-xs text-slate-400 mb-1">மொத்த மனைகள் & லேஅவுட்</div>
                <div className="text-2xl font-bold text-sky-400">48 மனைகள்</div>
                <div className="text-xs text-slate-400 mt-2">DTCP / RERA அப்ரூவல் தயார்</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                <div className="text-xs text-slate-400 mb-1">விற்பனை & முன்பதிவு</div>
                <div className="text-2xl font-bold text-amber-400">{bookingRecords.length} மனைகள் புக்</div>
                <div className="text-xs text-amber-300/80 mt-2">அட்வான்ஸ் பெறப்பட்டது</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                <div className="text-xs text-slate-400 mb-1">எதிர்பார்க்கப்படும் நிகர லாபம்</div>
                <div className="text-2xl font-bold text-emerald-400">₹ 34,00,000</div>
                <div className="text-xs text-emerald-500 mt-2">+54% லாப வரம்பு</div>
              </div>
            </div>

            {/* நிதி நிலை சுருக்கம் */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>📊</span> வணிக மேலாண்மை & நிதி மேலோட்டம் (Finance & Executive Summary)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-semibold text-rose-400 mb-2">செலவினங்கள் (Total Outflow)</h4>
                  <p className="text-xs text-slate-400 mb-1">• நில அடக்க விலை: ₹ 50,00,000</p>
                  <p className="text-xs text-slate-400 mb-1">• மேம்பாட்டுப் பணிகள் (Dev): ₹ 12,00,000</p>
                  <p className="text-xs text-slate-400">• அரசு அனுமதி & ஆவணங்கள்: ₹ 3,50,000</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">வருவாய் நிலவரம் (Inflow)</h4>
                  <p className="text-xs text-slate-400 mb-1">• மொத்த விற்பனை மதிப்பு: ₹ 96,00,000</p>
                  <p className="text-xs text-slate-400 mb-1">• பெறப்பட்ட முன்பதிவு: ₹ 3,00,000</p>
                  <p className="text-xs text-slate-400">• வசூலிக்கப்பட வேண்டிய தொகை: ₹ 93,00,000</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">இயக்க நிலவரம் (Operations)</h4>
                  <p className="text-xs text-slate-400 mb-1">• புதிய லீட்ஸ் & விசாரணைகள்: {leadRecords.length}</p>
                  <p className="text-xs text-slate-400 mb-1">• பத்திரப் பதிவு முடிந்தது: {regRecords.length}</p>
                  <p className="text-xs text-slate-400">• பட்டா மாற்றம் தீர்வு: {supportRecords.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}