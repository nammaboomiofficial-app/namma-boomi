import { useState } from 'react';

export default function Home() {
  // பிரதான 9 தூண்கள்
  const [currentModule, setCurrentModule] = useState('land'); // 'land' | 'astro' | 'agri' ...
  
  // பூமி மாட்யூல் சப்-டேப்கள்
  const [activeMainTab, setActiveMainTab] = useState('marketplace'); // 'marketplace' | 'audit' | 'sell'

  // வடிகட்டி & மேப்
  const [filterDistrict, setFilterDistrict] = useState('அனைத்தும்');
  const [activeMapModalLand, setActiveMapModalLand] = useState(null);

  // விவசாயம் சப்-டேப்கள்
  const [agriSubTab, setAgriSubTab] = useState('crops');

  // AI ஜோதிடம் மாட்யூல் சப்-டேப்கள்
  const [astroMethodTab, setAstroMethodTab] = useState('vedic'); // 'vedic' | 'kp' | 'nadi' | 'numerology' | 'vastu' | 'muhurtha' | 'remedies'
  
  // ஜோதிட இன்புட் ஸ்டேட்ஸ்
  const [birthDetails, setBirthDetails] = useState({
    name: 'சுந்தரம்',
    dob: '1985-06-15',
    tob: '10:30',
    pob: 'சென்னை',
    rasi: 'ரிஷபம்',
    nakshatra: 'ரோகிணி'
  });
  const [astroResultReady, setAstroResultReady] = useState(false);

  // நில தேடல் & தணிக்கை
  const [selectedDistrict, setSelectedDistrict] = useState('செங்கல்பட்டு');
  const [selectedTaluk, setSelectedTaluk] = useState('திருப்போரூர்');
  const [selectedVillage, setSelectedVillage] = useState('திருப்போரூர்');
  const [searchSurveyNo, setSearchSurveyNo] = useState('142/1B');
  const [surveyResult, setSurveyResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // லோன் டெஸ்க் மாடல்
  const [activeLoanLand, setActiveLoanLand] = useState(null);
  const [loanName, setLoanName] = useState('');
  const [loanPhone, setLoanPhone] = useState('');
  const [loanAmount, setLoanAmount] = useState('1500000');
  const [loanTenure, setLoanTenure] = useState('15');
  const [loanSuccess, setLoanSuccess] = useState(false);

  // விசிட் பாஸ் மாடல்
  const [contactModalLand, setContactModalLand] = useState(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerType, setBuyerType] = useState('loan');
  const [generatedPass, setGeneratedPass] = useState(null);

  // நில விற்பனை படிவம்
  const [sellForm, setSellForm] = useState({
    ownerName: '',
    phone: '',
    district: 'செங்கல்பட்டு',
    taluk: 'திருப்போரூர்',
    village: 'திருப்போரூர்',
    surveyNo: '',
    extent: '',
    askingPrice: ''
  });
  const [sellSuccessMsg, setSellSuccessMsg] = useState(false);

  const navigationModules = [
    { id: 'land', label: 'பூமி & நிலம்', icon: '🌐' },
    { id: 'astro', label: 'AI ஜோதிடம் & பரிகாரம்', icon: '🔮' },
    { id: 'agri', label: 'விவசாயம் (Agri 360)', icon: '🌾' },
    { id: 'finance', label: 'நிதி & கடன்கள்', icon: '🏦' },
    { id: 'insurance', label: 'காப்பீடு (Insurance)', icon: '🛡️' },
    { id: 'education', label: 'கல்வி & படிப்பு', icon: '🎓' },
    { id: 'jobs', label: 'வேலைவாய்ப்பு', icon: '💼' },
    { id: 'business', label: 'தொழில் & MSME', icon: '🏭' },
    { id: 'spiritual', label: 'ஆன்மிகம் & சுற்றுலா', icon: '🛕' }
  ];

  const locationData = {
    'செங்கல்பட்டு': {
      'திருப்போரூர்': ['திருப்போரூர்', 'கேளம்பாக்கம்', 'திருக்கழுகுன்றம்'],
      'செங்கல்பட்டு': ['செங்கல்பட்டு டவுன்', 'ஆலப்பாக்கம்', 'வல்லம்'],
      'தாம்பரம்': ['தாம்பரம்', 'முடிச்சூர்', 'பெருங்களத்தூர்']
    },
    'காஞ்சிபுரம்': {
      'காஞ்சிபுரம்': ['வாலாஜாபாத்', 'சிறுகாவேரிப்பாக்கம்'],
      'ஸ்ரீபெரும்புதூர்': ['ஸ்ரீபெரும்புதூர்', 'இருங்காட்டுக்கோட்டை']
    }
  };

  const [listedLands, setListedLands] = useState([
    {
      id: 'LND-101',
      title: 'OMR பிரதான சாலை அருகே முதலீட்டு மனை & தோட்டம்',
      surveyNo: '142/1B',
      district: 'செங்கல்பட்டு',
      taluk: 'திருப்போரூர்',
      village: 'திருப்போரூர்',
      ownerName: 'ராமசாமி (த/பெ சுப்பையா)',
      phone: '+91 98400 12345',
      extent: '2.50 ஏக்கர் (1,08,900 ச.அடி)',
      askingPrice: '₹1,750 / ச.அடி',
      approxValue: 19000000,
      guidelineValue: '₹850 / ச.அடி',
      trustScore: 98,
      trustGrade: 'A+',
      waterNote: '90 அடியில் வற்றாத குடிநீர் ஊற்று',
      highwayDist: '400 மீ OMR சாலை இணைப்பு',
      badge: 'நேரடி உரிமையாளர்',
      verifiedBoundary: true,
      droneView: true,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Thiruporur,+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed'
    },
    {
      id: 'LND-102',
      title: 'GST நெடுஞ்சாலை & ரயில் நிலையம் அருகே குடியிருப்பு நிலம்',
      surveyNo: '88/4A',
      district: 'செங்கல்பட்டு',
      taluk: 'செங்கல்பட்டு',
      village: 'செங்கல்பட்டு டவுன்',
      ownerName: 'கணேசன் (த/பெ முத்து)',
      phone: '+91 98400 54321',
      extent: '1.20 ஏக்கர் (52,272 ச.அடி)',
      askingPrice: '₹2,350 / ச.அடி',
      approxValue: 12000000,
      guidelineValue: '₹1,200 / ச.அடி',
      trustScore: 92,
      trustGrade: 'A',
      waterNote: '50 அடியில் நிறைவான நிலத்தடி நீர்',
      highwayDist: '800 மீ GST தேசிய நெடுஞ்சாலை',
      badge: 'வங்கி கடன் தகுதியானது',
      verifiedBoundary: true,
      droneView: false,
      image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&auto=format&fit=crop&q=60',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Chengalpattu,+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed'
    },
    {
      id: 'LND-103',
      title: 'கேளம்பாக்கம் சந்திப்பு மிக அருகில் தனி ரெடி மனை',
      surveyNo: '56/2C',
      district: 'செங்கல்பட்டு',
      taluk: 'திருப்போரூர்',
      village: 'கேளம்பாக்கம்',
      ownerName: 'ராஜேந்திரன்',
      phone: '+91 98400 98765',
      extent: '2,400 ச.அடி (5.5 சென்ட்)',
      askingPrice: '₹2,900 / ச.அடி',
      approxValue: 6960000,
      guidelineValue: '₹1,800 / ச.அடி',
      trustScore: 95,
      trustGrade: 'A+',
      waterNote: '70 அடியில் நல்ல நன்னீர் ஆதாரம்',
      highwayDist: '300 மீ பேருந்து சந்திப்பு',
      badge: 'உடனடி பத்திரப் பதிவு',
      verifiedBoundary: true,
      droneView: true,
      image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&auto=format&fit=crop&q=60',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Kelambakkam,+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed'
    }
  ]);

  const fullLandDatabase = {
    'திருப்போரூர்-142/1B': {
      surveyNo: '142/1B',
      pattaNo: 'PT-89452',
      district: 'செங்கல்பட்டு',
      taluk: 'திருப்போரூர்',
      village: 'திருப்போரூர்',
      ownerName: 'ராமசாமி (த/பெ சுப்பையா)',
      phone: '+91 98400 12345',
      landType: 'ரயத்துவாரி புஞ்சை (Patta Dry Land)',
      extent: '2.50 ஏக்கர் (1,08,900 ச.அடி)',
      guidelineValue: '₹850 / சதுர அடி',
      marketValue: '₹1,650 - ₹1,800 / சதுர அடி',
      futureGrowth: 'அடுத்த 3-5 ஆண்டுகளில் 35% முதல் 50% வரை மதிப்பு உயர வாய்ப்பு',
      trustScore: 98,
      trustGrade: 'A+ (உயர் நம்பகத்தன்மை)',
      legalChecks: [
        { label: 'நீர்நிலை / கால்வாய் புறம்போக்கு சோதனை', status: 'பாதுகாப்பானது (எல்லைக்குள் நீர்நிலை இல்லை)' },
        { label: 'அரசு கையகப்படுத்தல் (Land Acquisition) நோட்டீஸ்', status: 'நோட்டீஸ் ஏதுமில்லை (Clear Title)' },
        { label: 'HR&CE கோவில் / வக்ஃபு வாரிய உரிமைச் சோதனை', status: 'தனிநபர் பட்டா (அறநிலையத்துறை எல்லை இல்லை)' },
        { label: 'பஞ்சமி / பூமிதான நிபந்தனை நில சோதனை', status: 'ரயத்துவாரி பட்டா (விற்பனைக்கு முழு தகுதி)' },
        { label: 'உயர் மின்னழுத்த கம்பி (HT Line) & கேஸ் பைப்லைன்', status: 'தடைகள் ஏதுமில்லை (Clear Airspace & Ground)' },
        { label: '30 ஆண்டுகள் வில்லங்க ஆய்வு (EC Verification)', status: 'முழு சுத்தம் (No Court Attachments / Mortgages)' }
      ],
      waterLevel: '80 முதல் 110 அடியில் வற்றாத நல்ல குடிநீர் ஊற்று கிடைக்கும் (TDS 280 - உகந்தது)',
      soilType: 'செம்பொறை மண் கலந்த சரளை (Red Gravel Soil) - அதிக எடை தாங்கும் திறன்',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Thiruporur,+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed'
    }
  };

  const filteredLands = filterDistrict === 'அனைத்தும்'
    ? listedLands
    : listedLands.filter((l) => l.district === filterDistrict);

  const shareOnWhatsApp = (text) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleDistrictChange = (e) => {
    const dist = e.target.value;
    setSelectedDistrict(dist);
    const taluks = Object.keys(locationData[dist] || {});
    const firstTaluk = taluks[0] || '';
    setSelectedTaluk(firstTaluk);
    const villages = locationData[dist]?.[firstTaluk] || [];
    setSelectedVillage(villages[0] || '');
    setSurveyResult(null);
  };

  const handleTalukChange = (e) => {
    const taluk = e.target.value;
    setSelectedTaluk(taluk);
    const villages = locationData[selectedDistrict]?.[taluk] || [];
    setSelectedVillage(villages[0] || '');
    setSurveyResult(null);
  };

  const runSurveyLookup = (village, survey) => {
    setIsSearching(true);
    setSurveyResult(null);

    setTimeout(() => {
      const cleanSurvey = survey.trim().toUpperCase();
      const lookupKey = `${village}-${cleanSurvey}`;
      const found = fullLandDatabase[lookupKey];

      if (found) {
        setSurveyResult(found);
      } else {
        setSurveyResult({
          surveyNo: cleanSurvey,
          pattaNo: `PT-${Math.floor(10000 + Math.random() * 90000)}`,
          district: selectedDistrict,
          taluk: selectedTaluk,
          village: village,
          ownerName: 'சரிபார்க்கப்பட்ட நில உரிமையாளர்',
          phone: '+91 98400 12345',
          landType: 'ரயத்துவாரி புஞ்சை (Patta Land)',
          extent: '1.50 ஏக்கர் (65,340 ச.அடி)',
          guidelineValue: '₹950 / சதுர அடி',
          marketValue: '₹1,600 / சதுர அடி',
          futureGrowth: 'அடுத்த 3-5 ஆண்டுகளில் 30% முதல் 40% வரை மதிப்பு வளர்ச்சி வாய்ப்பு',
          trustScore: 96,
          trustGrade: 'A+ (உயர் நம்பகத்தன்மை)',
          legalChecks: [
            { label: 'நீர்நிலை / கால்வாய் புறம்போக்கு சோதனை', status: 'பாதுகாப்பானது (எல்லைக்குள் நீர்நிலை இல்லை)' },
            { label: 'அரசு கையகப்படுத்தல் நோட்டீஸ்', status: 'நோட்டீஸ் ஏதுமில்லை (Clear Title)' },
            { label: 'HR&CE கோவில் / வக்ஃபு வாரிய உரிமை', status: 'தனிநபர் பட்டா நிலம்' },
            { label: 'பஞ்சமி நில சோதனை', status: 'ரயத்துவாரி வகைப்பாடு' },
            { label: 'உயர் மின்னழுத்த கம்பி (HT Line)', status: 'பாதுகாப்பான தொலைவு' },
            { label: '30 ஆண்டுகள் வில்லங்க ஆய்வு (EC)', status: 'வில்லங்கங்கள் ஏதுமில்லை (Clear EC)' }
          ],
          waterLevel: '80 முதல் 100 அடியில் நல்ல குடிநீர் ஆதாரம்',
          soilType: 'சரளை கலந்த செம்மண் - கட்டுமானத்திற்கு மிக உறுதியானது',
          mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(village + ', ' + selectedDistrict)}&t=&z=14&ie=UTF8&iwloc=&output=embed`
        });
      }
      setIsSearching(false);
    }, 400);
  };

  const handleSurveySearch = (e) => {
    e.preventDefault();
    if (!searchSurveyNo.trim()) return;
    runSurveyLookup(selectedVillage, searchSurveyNo);
  };

  const handleGeneratePass = (e) => {
    e.preventDefault();
    const passCode = `B360-PASS-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedPass({
      code: passCode,
      buyerName,
      buyerPhone,
      buyerType,
      land: contactModalLand
    });
  };

  const handleSellSubmit = (e) => {
    e.preventDefault();
    const newLand = {
      id: `LND-${Math.floor(104 + Math.random() * 800)}`,
      title: `${sellForm.village} பகுதியில் புதிய நில விற்பனை`,
      surveyNo: sellForm.surveyNo,
      district: sellForm.district,
      taluk: sellForm.taluk,
      village: sellForm.village,
      ownerName: sellForm.ownerName,
      phone: sellForm.phone,
      extent: sellForm.extent,
      askingPrice: `₹${sellForm.askingPrice} / ச.அடி`,
      approxValue: 8000000,
      guidelineValue: '₹900 / ச.அடி',
      trustScore: 94,
      trustGrade: 'A',
      waterNote: '80 அடியில் நிலத்தடி நீர்',
      highwayDist: 'அருகில் சாலை வசதி',
      badge: 'நேரடி உரிமையாளர்',
      verifiedBoundary: true,
      droneView: true,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60',
      mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(sellForm.village + ', ' + sellForm.district)}&t=&z=14&ie=UTF8&iwloc=&output=embed`
    };

    setListedLands([newLand, ...listedLands]);
    setSellSuccessMsg(true);
    setTimeout(() => {
      setSellSuccessMsg(false);
      setActiveMainTab('marketplace');
    }, 1800);
  };

  const calculateEMI = (principal, years) => {
    const p = parseFloat(principal) || 0;
    const r = 8.5 / 12 / 100;
    const n = (parseFloat(years) || 15) * 12;
    if (p <= 0 || n <= 0) return 0;
    return Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* 1. பிரதான ஹெடர் & பிராண்டிங் */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🧭</span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-2xl text-emerald-400 tracking-wide">
                  நம்ம பூமி 360
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded font-black tracking-wider">
                  SUPER APP
                </span>
              </div>
              <p className="text-[11px] text-slate-400">நிலம் • விவசாயம் • AI ஜோதிடம் • நிதி வாழ்வியல் டிஜிட்டல் தளம்</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700 flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">●</span> அரசு ஆவண வழிகாட்டல் & சரிபார்ப்பு மையம்
            </span>
          </div>
        </div>

        {/* 9 பெருந்தூண்களுக்கான நேவிகேஷன் மெனு பார் */}
        <div className="border-t border-slate-800/80 bg-slate-950/80 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1.5 py-2 min-w-max">
            {navigationModules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setCurrentModule(mod.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  currentModule === mod.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>{mod.icon}</span>
                <span>{mod.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* பிரதான பக்கம் */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {/* ============================================================ */}
        {/* 1. பூமி & நிலம் பிரிவு (REAL ESTATE & AUDIT) */}
        {/* ============================================================ */}
        {currentModule === 'land' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🌐</span> நம்ம பூமி நிலச் சந்தை & சரிபார்ப்பு மையம்
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">நேரடி உரிமையாளர் தொடர்பு • விசிட் பாஸ் • வாட்ஸ்அப் பகிர்வு • லைவ் மேப்</p>
              </div>

              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveMainTab('marketplace')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    activeMainTab === 'marketplace' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400'
                  }`}
                >
                  🏪 நிலச் சந்தை ({filteredLands.length})
                </button>
                <button
                  onClick={() => setActiveMainTab('audit')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    activeMainTab === 'audit' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400'
                  }`}
                >
                  📜 A to Z ஜாதகம்
                </button>
                <button
                  onClick={() => setActiveMainTab('sell')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    activeMainTab === 'sell' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-emerald-400'
                  }`}
                >
                  + நிலத்தை விற்க
                </button>
              </div>
            </div>

            {/* நிலச் சந்தை */}
            {activeMainTab === 'marketplace' && (
              <div className="space-y-6">
                <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <span>🔍 மாவட்ட வடிகட்டி:</span>
                    <button
                      onClick={() => setFilterDistrict('அனைத்தும்')}
                      className={`px-3 py-1 rounded-lg transition ${
                        filterDistrict === 'அனைத்தும்'
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      அனைத்தும்
                    </button>
                    <button
                      onClick={() => setFilterDistrict('செங்கல்பட்டு')}
                      className={`px-3 py-1 rounded-lg transition ${
                        filterDistrict === 'செங்கல்பட்டு'
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      செங்கல்பட்டு
                    </button>
                    <button
                      onClick={() => setFilterDistrict('காஞ்சிபுரம்')}
                      className={`px-3 py-1 rounded-lg transition ${
                        filterDistrict === 'காஞ்சிபுரம்'
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      காஞ்சிபுரம்
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400">
                    மொத்தம் {filteredLands.length} சரிபார்க்கப்பட்ட நிலங்கள்
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredLands.map((land) => (
                    <div
                      key={land.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl"
                    >
                      <div className="relative h-40 w-full overflow-hidden bg-slate-950">
                        <img
                          src={land.image}
                          alt={land.title}
                          className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          <span className="bg-slate-950/90 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                            {land.badge}
                          </span>
                          {land.verifiedBoundary && (
                            <span className="bg-blue-950/90 text-sky-300 border border-sky-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                              ✓ எல்லை சரிபார்க்கப்பட்டது
                            </span>
                          )}
                        </div>

                        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1">
                          <span className="bg-emerald-500 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded shadow">
                            {land.trustScore}/100 {land.trustGrade}
                          </span>
                          {land.droneView && (
                            <span className="bg-purple-950/90 text-purple-300 border border-purple-500/40 text-[9px] font-bold px-1.5 py-0.5 rounded">
                              📹 360° பார்வை
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h3 className="font-bold text-sm text-white line-clamp-1 mb-1.5">
                            {land.title}
                          </h3>

                          <div className="text-[11px] text-slate-400 space-y-1">
                            <div className="flex items-center gap-1">
                              <span className="text-emerald-400">📍</span>
                              <span>{land.village}, {land.taluk}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-emerald-400">📜</span>
                              <span>சர்வே எண்: <strong className="text-slate-200">#{land.surveyNo}</strong> • {land.extent}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-sky-400">💧</span>
                              <span>{land.waterNote}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                          <div>
                            <div className="text-[9px] text-slate-400">கேட்கும் விலை:</div>
                            <div className="text-base font-black text-emerald-400">{land.askingPrice}</div>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() =>
                                shareOnWhatsApp(
                                  `🏡 நம்ம பூமி 360 நிலப் பரிந்துரை:\n${land.title}\n📍 இடம்: ${land.village} (சர்வே #${land.surveyNo})\n💰 விலை: ${land.askingPrice}\nபார்க்க: http://localhost:3000`
                                )
                              }
                              className="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 text-[11px] font-bold px-2 py-1.5 rounded-lg border border-emerald-800/80 transition flex items-center gap-1"
                              title="வாட்ஸ்அப்பில் பகிர்க"
                            >
                              <span>📲</span>
                            </button>
                            <button
                              onClick={() => setActiveMapModalLand(land)}
                              className="bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-slate-700 transition flex items-center gap-1"
                            >
                              <span>🗺️</span> மேப்
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-800/80">
                          <button
                            onClick={() => {
                              setContactModalLand(land);
                              setGeneratedPass(null);
                              setBuyerName('');
                              setBuyerPhone('');
                            }}
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>🎫</span> விசிட் பாஸ் & எண் பெறுக
                          </button>

                          <button
                            onClick={() => {
                              setActiveLoanLand(land);
                              setLoanAmount(Math.round(land.approxValue * 0.75).toString());
                            }}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 font-bold py-2 rounded-xl text-xs transition border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>🏦</span> 80% கடன் & EMI உதவி
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* A to Z தணிக்கை அறிக்கை பகுதி */}
            {activeMainTab === 'audit' && (
              <div className="space-y-6">
                <section className="bg-slate-900 border border-emerald-700/40 rounded-3xl p-6 md:p-8 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    <span>📜</span> சர்வே எண் உடனடி A to Z நில ஜாதகம் & சட்டத் தணிக்கை
                  </h3>
                  <p className="text-xs text-slate-400 mb-5">
                    அரசு வருவாய்த்துறை பொது ஆவணங்கள், நிலத்தடி நீர் மட்டம், வழிகாட்டி மதிப்பு மற்றும் 6 அடுக்கு சட்டப் பாதுகாப்புச் சோதனை.
                  </p>

                  <form onSubmit={handleSurveySearch} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 mb-1 block">1. மாவட்டம்</label>
                        <select
                          value={selectedDistrict}
                          onChange={handleDistrictChange}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          {Object.keys(locationData).map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 mb-1 block">2. வட்டம்</label>
                        <select
                          value={selectedTaluk}
                          onChange={handleTalukChange}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          {Object.keys(locationData[selectedDistrict] || {}).map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 mb-1 block">3. கிராமம்</label>
                        <select
                          value={selectedVillage}
                          onChange={(e) => setSelectedVillage(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          {(locationData[selectedDistrict]?.[selectedTaluk] || []).map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 mb-1 block">4. சர்வே எண்</label>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            required
                            value={searchSurveyNo}
                            onChange={(e) => setSearchSurveyNo(e.target.value)}
                            placeholder="எ.கா. 142/1B"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                          />
                          <button
                            type="submit"
                            disabled={isSearching}
                            className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shrink-0 hover:bg-emerald-400 cursor-pointer"
                          >
                            {isSearching ? '...' : 'காண்க ⚡'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </section>

                {surveyResult && (
                  <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">📜</span>
                          <h4 className="font-extrabold text-lg text-white">
                            சர்வே எண் #{surveyResult.surveyNo} - அதிகாரப்பூர்வ A to Z ஜாதகம்
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {surveyResult.village}, {surveyResult.taluk}, {surveyResult.district} மாவட்டம்
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            shareOnWhatsApp(
                              `📜 நம்ம பூமி 360 சர்வே எண் #${surveyResult.surveyNo} A to Z தணிக்கை அறிக்கை:\nஇடம்: ${surveyResult.village}\nநம்பிக்கை ஸ்கோர்: ${surveyResult.trustScore}/100\nமுழு ஜாதகம் காண: http://localhost:3000`
                            )
                          }
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer"
                        >
                          <span>📲</span> பகிர்க
                        </button>
                        <button
                          onClick={() => window.print()}
                          className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1 cursor-pointer"
                        >
                          <span>🖨️</span> PDF
                        </button>
                        <div className="bg-slate-950 px-3 py-1 rounded-xl border border-emerald-500/40 text-right">
                          <span className="text-base font-black text-emerald-400">{surveyResult.trustScore}/100</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5">
                        1. அரசு வருவாய்த்துறை பொது ஆவண விவரங்கள்
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">பட்டா எண்</span>
                          <strong className="text-white text-sm">{surveyResult.pattaNo}</strong>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">உரிமையாளர்</span>
                          <strong className="text-white text-sm">{surveyResult.ownerName}</strong>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">வகைப்பாடு</span>
                          <strong className="text-emerald-400 text-sm">{surveyResult.landType}</strong>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">பரப்பளவு</span>
                          <strong className="text-white text-sm">{surveyResult.extent}</strong>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5">
                        2. இரட்டை மதிப்பீடு & முதலீட்டு வளர்ச்சி கணிப்பு (ROI)
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">அரசு வழிகாட்டி மதிப்பு</span>
                          <strong className="text-amber-400 text-base">{surveyResult.guidelineValue}</strong>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">நடப்பு சந்தை மதிப்பு</span>
                          <strong className="text-emerald-400 text-base">{surveyResult.marketValue}</strong>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">எதிர்கால வளர்ச்சி</span>
                          <span className="text-slate-300 text-[11px] block mt-0.5">{surveyResult.futureGrowth}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5">
                        3. பூமி சாஸ்திரம் - நீர் ஆதாரம் & மண் உறுதி
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                          <span className="text-xl">💧</span>
                          <div>
                            <strong className="text-sky-400 block mb-0.5">நிலத்தடி நீர் மட்டம்</strong>
                            <p className="text-slate-300 text-[11px]">{surveyResult.waterLevel}</p>
                          </div>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                          <span className="text-xl">🧱</span>
                          <div>
                            <strong className="text-amber-400 block mb-0.5">மண்ணின் கட்டிடத் தாங்குதிறன்</strong>
                            <p className="text-slate-300 text-[11px]">{surveyResult.soilType}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5">
                        4. பூமி ரக்ஷா - 6 அடுக்கு சட்டப் பாதுகாப்பு தணிக்கை
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {surveyResult.legalChecks.map((chk, idx) => (
                          <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                            <span className="text-slate-300 font-medium">{chk.label}</span>
                            <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded text-[11px]">
                              {chk.status} ✓
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5">
                        5. அமைவிடம் & நேரடி வரைபடம் (GPS Map)
                      </h5>
                      <div className="rounded-2xl overflow-hidden h-64 border border-slate-800">
                        <iframe
                          title="Audit Map View"
                          src={surveyResult.mapEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* நிலத்தை விற்கப் படிவம் */}
            {activeMainTab === 'sell' && (
              <div className="mt-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-2xl mx-auto shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📢</span>
                  <h3 className="text-xl font-bold text-white">உங்கள் நிலத்தை நேரடி விற்பனைக்கு பட்டியலிடுங்கள்</h3>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  இடைத்தரகர்கள் இன்றி, உண்மையான வாங்குபவர்களிடம் இருந்து நேரடியாக அழைப்புகள் மற்றும் விசிட் பாஸ்களைப் பெறுங்கள்.
                </p>

                {sellSuccessMsg && (
                  <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-semibold">
                    ✓ உங்கள் நிலம் வெற்றிகரமாக சந்தையில் பட்டியலிடப்பட்டது!
                  </div>
                )}

                <form onSubmit={handleSellSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">உரிமையாளர் பெயர் *</label>
                      <input
                        type="text"
                        required
                        value={sellForm.ownerName}
                        onChange={(e) => setSellForm({ ...sellForm, ownerName: e.target.value })}
                        placeholder="முழுப் பெயர் (பட்டாப்படி)"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">தொடர்பு எண் *</label>
                      <input
                        type="tel"
                        required
                        value={sellForm.phone}
                        onChange={(e) => setSellForm({ ...sellForm, phone: e.target.value })}
                        placeholder="10 இலக்க மொபைல் எண்"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">மாவட்டம் *</label>
                      <select
                        value={sellForm.district}
                        onChange={(e) => setSellForm({ ...sellForm, district: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"
                      >
                        <option value="செங்கல்பட்டு">செங்கல்பட்டு</option>
                        <option value="காஞ்சிபுரம்">காஞ்சிபுரம்</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">கிராமம் / பகுதி *</label>
                      <input
                        type="text"
                        required
                        value={sellForm.village}
                        onChange={(e) => setSellForm({ ...sellForm, village: e.target.value })}
                        placeholder="எ.கா. திருப்போரூர்"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">சர்வே எண் *</label>
                      <input
                        type="text"
                        required
                        value={sellForm.surveyNo}
                        onChange={(e) => setSellForm({ ...sellForm, surveyNo: e.target.value })}
                        placeholder="எ.கா. 142/1B"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">பரப்பளவு *</label>
                      <input
                        type="text"
                        required
                        value={sellForm.extent}
                        onChange={(e) => setSellForm({ ...sellForm, extent: e.target.value })}
                        placeholder="எ.கா. 2,400 ச.அடி"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">எதிர்பார்க்கும் விலை (சதுர அடிக்கு ₹) *</label>
                      <input
                        type="text"
                        required
                        value={sellForm.askingPrice}
                        onChange={(e) => setSellForm({ ...sellForm, askingPrice: e.target.value })}
                        placeholder="எ.கா. 1,800"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    நிலத்தை உடனடியாகப் பட்டியலிடுக ⚡
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. AI ஜோதிடம் & எளிய பரிகாரம் (UNIVERSAL AI ASTROLOGY HUB) */}
        {/* ============================================================ */}
        {currentModule === 'astro' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-3">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <span>🔮</span> AI மகா வேத ஜோதிட & எளிய பரிகார மையம் (Universal Astro Engine)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  வேத ஜாதகம் • KP முறை • நாடி ஜோதிடம் • எண் கணிதம் • மனை வாஸ்து • சுப முகூர்த்தம் • திருத்தல பரிகாரங்கள்
                </p>
              </div>

              {/* 7 வகையான ஜோதிட வழிமுறைகளுக்கான டேப்கள் */}
              <div className="flex flex-wrap gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px]">
                {[
                  { id: 'vedic', label: 'வேத ஜாதகம்' },
                  { id: 'kp', label: 'KP துல்லிய கணிப்பு' },
                  { id: 'nadi', label: 'நாடி சாரம்' },
                  { id: 'numerology', label: 'எண் கணிதம்' },
                  { id: 'vastu', label: 'மனை வாஸ்து' },
                  { id: 'muhurtha', label: 'சுப முகூர்த்தம்' },
                  { id: 'remedies', label: 'எளிய பரிகாரங்கள்' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setAstroMethodTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      astroMethodTab === tab.id
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* பொதுவான பிறந்த ஜாதக இன்புட் பார் */}
            <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 md:p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span>✨</span> ஜாதகப் பிறந்த விபரம் உள்ளிட்ட உடனடி AI பகுப்பாய்வு
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  துல்லிய வானியல் கணிப்பான் (Astronomical Ephemeris)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">பெயர்</label>
                  <input
                    type="text"
                    value={birthDetails.name}
                    onChange={(e) => setBirthDetails({ ...birthDetails, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">பிறந்த தேதி</label>
                  <input
                    type="date"
                    value={birthDetails.dob}
                    onChange={(e) => setBirthDetails({ ...birthDetails, dob: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">பிறந்த நேரம்</label>
                  <input
                    type="time"
                    value={birthDetails.tob}
                    onChange={(e) => setBirthDetails({ ...birthDetails, tob: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">பிறந்த ஊர்</label>
                  <input
                    type="text"
                    value={birthDetails.pob}
                    onChange={(e) => setBirthDetails({ ...birthDetails, pob: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">ராசி</label>
                  <select
                    value={birthDetails.rasi}
                    onChange={(e) => setBirthDetails({ ...birthDetails, rasi: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-2 text-white"
                  >
                    {['மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்', 'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்', 'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">நட்சத்திரம்</label>
                  <select
                    value={birthDetails.nakshatra}
                    onChange={(e) => setBirthDetails({ ...birthDetails, nakshatra: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-2 text-white"
                  >
                    {['அஸ்வினி', 'பரணி', 'கிருத்திகை', 'ரோகிணி', 'மிருகசீரிஷம்', 'திருவாதிரை', 'புனர்பூசம்', 'பூசம்', 'ஆயில்யம்', 'மகம்', 'பூரம்', 'உத்திரம்', 'ஹஸ்தம்', 'சித்திரை', 'சுவாதி', 'விசாகம்', 'அனுஷம்', 'கேட்டை', 'மூலம்', 'பூராடம்', 'உத்திராடம்', 'திருவோணம்', 'அவிட்டம்', 'சதயம்', 'பூரட்டாதி', 'உத்திரட்டாதி', 'ரேவதி'].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setAstroResultReady(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  AI ஜோதிடத்தை இயக்குக ⚡
                </button>
              </div>
            </div>

            {/* ஜோதிட முறைகள் வாரியான முடிவுகள் */}
            {/* 1. பாரம்பரிய வேத ஜோதிடம் */}
            {astroMethodTab === 'vedic' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 md:col-span-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="font-bold text-white text-base">🏛️ 4-ஆம் பாவ பூமி & சொத்து யோக ஆய்வு</h3>
                    <span className="text-emerald-400 text-xs font-black bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      யோகம்: 90% பலம்
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    உங்கள் பிறந்த ஜாதகப்படி 4-ஆம் பாவாதிபதி சுக்கிரன் மற்றும் பூமி காரகன் செவ்வாயின் அமைவு திரிகோண ஸ்தானத்தில் உள்ளது. 
                    இதனால் <strong>சொந்தமாக மனை வாங்கி வீடு கட்டும் சுப யோகம் மிக விரைவாகக் கூடிவருகிறது.</strong> பூர்வீகச் சொத்துக்களை விட, சுய உழைப்பில் அமையக்கூடிய நிலமே அதிக லாபம் தரும்.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">தற்போதைய தசா-புக்தி இருப்பு</span>
                      <strong className="text-emerald-400 text-sm">குரு தசை - சுக்கிர புக்தி</strong>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">சொத்து சேர உகந்த காலம்</span>
                      <strong className="text-amber-400 text-sm">அடுத்த 8 முதல் 14 மாதங்கள்</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h4 className="font-bold text-white text-sm">🧭 உகந்த திசை & நிறங்கள்</h4>
                  <div className="text-xs space-y-2 text-slate-300">
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">மனை பார்க்க வேண்டிய திசை:</span>
                      <strong className="text-white">வடக்கு அல்லது கிழக்கு பார்த்த மனை</strong>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">அதிர்ஷ்ட வஸ்திர நிறம்:</span>
                      <strong className="text-emerald-400">வெள்ளை, வெளிர் பச்சை, மஞ்சள்</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. KP ஜோதிட முறை */}
            {astroMethodTab === 'kp' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h3 className="text-base font-bold text-white">KP ஜோதிட முறை - உப அதிபதி (Sub-Lord) துல்லிய கணிப்பு</h3>
                    <p className="text-xs text-slate-400">கிருஷ்ணமூர்த்தி பத்ததி முறைப்படி நிகழ்வுகள் நடைபெறும் துல்லிய காலம்</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">4-ஆம் பாவக உப அதிபதி (4th Cusp Sub-Lord)</span>
                    <strong className="text-emerald-400 text-base">செவ்வாய் (Mars)</strong>
                    <p className="text-slate-400 text-[11px] pt-1">
                      4, 11-ஆம் பாவங்களுடன் தொடர்புகொள்வதால் நிலம் வாங்குவது 100% உறுதியாகும்.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">10-ஆம் பாவ தொழில் வெற்றி (Career Sub-Lord)</span>
                    <strong className="text-sky-400 text-base">புதன் (Mercury)</strong>
                    <p className="text-slate-400 text-[11px] pt-1">
                      ரியல் எஸ்டேட், விவசாயம் மற்றும் தகவல் தொழில்நுட்பம் சார்ந்த தொழிலில் உச்ச லாபம் கிடைக்கும்.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px]">கடன் அனுமதி காலம் (Loan Approval Date)</span>
                    <strong className="text-amber-400 text-base">சூரிய அந்தரம் (2026 இறுதிக்குள்)</strong>
                    <p className="text-slate-400 text-[11px] pt-1">
                      வங்கி மனை/வீட்டுக் கடன் தங்கு தடையின்றி உடனடியாக ஒப்புதலாகும்.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. நாடி ஜோதிட சாரம் */}
            {astroMethodTab === 'nadi' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📜</span>
                  <div>
                    <h3 className="text-base font-bold text-white">அகத்தியர் & சுகர் நாடி ஜோதிட சாரம்</h3>
                    <p className="text-xs text-slate-400">பூர்வ புண்ணியம், முற்பிறவி கர்ம வினைகள் மற்றும் ஆன்ம வழிகாட்டல்</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2 leading-relaxed text-slate-300">
                  <p>
                    🌿 <strong>நாடி ஓலைச்சுவடி வாசகம்:</strong> "பூமியின் பலத்தினால் மாளிகை அமையும், முற்பிறவியில் அன்னதானம் செய்த புண்ணியம் இவ்வேளையில் துணையாக வந்து சேரும்."
                  </p>
                  <p>
                    உங்கள் ஜாதகத்தில் உள்ள கர்மக் கட்டுகளின்படி, முற்பிறவியில் ஆற்று நீர் பாய்ச்சலில் ஏற்பட்ட சிறு தடைகளுக்குப் பரிகாரமாக, <strong>பறவைகளுக்கு நீர் வைப்பதும், ஏழை எளியோருக்குக் குடிநீர் பந்தல் அமைப்பதும்</strong> உங்கள் செல்வ வளத்தைப் பன்மடங்கு பெருக்கும்.
                  </p>
                </div>
              </div>
            )}

            {/* 4. அதிர்ஷ்ட எண் கணிதம் */}
            {astroMethodTab === 'numerology' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-1">
                  <span className="text-xs text-slate-400">பிறவி எண் (Birth Number)</span>
                  <div className="text-3xl font-black text-emerald-400">6</div>
                  <span className="text-[10px] text-slate-500">சுக்கிரனின் ஆதிக்கம் (அழகு, வசதி)</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-1">
                  <span className="text-xs text-slate-400">விதி எண் (Destiny Number)</span>
                  <div className="text-3xl font-black text-sky-400">9</div>
                  <span className="text-[10px] text-slate-500">செவ்வாயின் ஆதிக்கம் (பூமி, நிலம்)</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-1">
                  <span className="text-xs text-slate-400">அதிர்ஷ்ட தேதிகள்</span>
                  <div className="text-xl font-bold text-amber-400">6, 15, 24 & 9, 18, 27</div>
                  <span className="text-[10px] text-slate-500">ஒப்பந்தம் செய்ய உகந்தது</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-1">
                  <span className="text-xs text-slate-400">அதிர்ஷ்ட வாகன எண் கூட்டு</span>
                  <div className="text-2xl font-black text-purple-400">கூட்டு எண் 6</div>
                  <span className="text-[10px] text-slate-500">விபத்து தவிர்த்து வெற்றி தரும்</span>
                </div>
              </div>
            )}

            {/* 5. மனை வாஸ்து சாஸ்திரம் */}
            {astroMethodTab === 'vastu' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    title: 'ஈசானியம் (வடகிழக்கு மூலை)',
                    rule: 'சுத்தமாகவும், பாரம் இன்றியும், நீர் தொட்டி அல்லது பூசை அறை அமைக்க வேண்டும்.',
                    good: true
                  },
                  {
                    title: 'அக்னி மூலை (தென்கிழக்கு மூலை)',
                    rule: 'சமையலறை, மின்சார மீட்டர் மற்றும் ஜெனரேட்டர் வைக்க மிக உகந்த இடம்.',
                    good: true
                  },
                  {
                    title: 'குபேர மூலை / நிருதி (தென்மேற்கு மூலை)',
                    rule: 'குடும்பத் தலைவர் படுக்கை அறை மற்றும் பணப்பெட்டி வைக்க உகந்தது. நீர் நிலை வரக்கூடாது.',
                    good: true
                  }
                ].map((v, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{v.title}</h4>
                      <span className="text-emerald-400 font-black">வாஸ்து விதி ✓</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{v.rule}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 6. சுப முகூர்த்தம் */}
            {astroMethodTab === 'muhurtha' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    title: 'பத்திரப் பதிவு சுப முகூர்த்தம் (Land Registration)',
                    date: 'வளர்பிறை பஞ்சமி & ஏகாதசி தினங்கள்',
                    time: 'காலை 06:15 - 07:30 (சுக்கிர ஓரை) / காலை 09:15 - 10:15 (குரு ஓரை)',
                    avoid: 'ராகு காலம் (காலை 10:30 - 12:00) மற்றும் எமகண்டத்தை முற்றிலும் தவிர்க்கவும்.',
                    icon: '📜'
                  },
                  {
                    title: 'பூமி பூஜை & வாஸ்து நேரம் (Bhoomi Pooja)',
                    date: 'திங்கள், புதன், வியாழன் கிழமைகள் (ரோகிணி, உத்திரம்)',
                    time: 'காலை 06:00 - 07:00 மணிக்குள் வாஸ்து புருஷன் விழிக்கும் சுப வேளை.',
                    avoid: 'செவ்வாய், சனிக்கிழமைகள் மற்றும் அஷ்டமி/நவமி தினங்களைத் தவிர்க்கவும்.',
                    icon: '🧱'
                  }
                ].map((m, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{m.icon}</span>
                      <h4 className="font-bold text-white text-sm">{m.title}</h4>
                    </div>
                    <div className="text-xs space-y-2">
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">உகந்த திதி & நட்சத்திரம்</span>
                        <strong className="text-emerald-400">{m.date}</strong>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">சுப ஓரை நேரம்</span>
                        <strong className="text-white">{m.time}</strong>
                      </div>
                      <div className="text-[11px] text-rose-300 bg-rose-950/30 p-2 rounded-lg border border-rose-900/40">
                        ⚠️ <strong>விலக்க வேண்டியவை:</strong> {m.avoid}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 7. எளிய நடைமுறைப் பரிகாரங்கள் */}
            {astroMethodTab === 'remedies' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    title: 'வைத்தீஸ்வரன் கோவில் (செவ்வாய் தலம்)',
                    district: 'மயிலாடுதுறை',
                    dosha: 'செவ்வாய் தோஷம், பூமித் தடை, சொத்து வில்லங்கம் நீங்க',
                    remedy: 'செவ்வாய்க்கிழமைகளில் அங்காரக பகவானுக்குத் துவரம் பருப்பு படைத்து, சிவப்பு வஸ்திரம் சாற்றி வழிபடுதல்.',
                    icon: '🛕'
                  },
                  {
                    title: 'திருநாகேஸ்வரம் & காளஹஸ்தி',
                    district: 'தஞ்சாவூர் / ஆந்திர எல்லை',
                    dosha: 'ராகு-கேது சர்ப்ப தோஷம், திருமணத் தடை நீங்க',
                    remedy: 'ராகு காலத்தில் பாலாபிஷேகம் செய்து, உளுந்து தானம் அளித்தல்.',
                    icon: '🐍'
                  },
                  {
                    title: 'திருச்சேறை சாரபரமேஸ்வரர் (கடன் நிவர்த்தி)',
                    district: 'கும்பகோணம்',
                    dosha: 'தீராத கடன் சுமை மற்றும் தொழில் முடக்கம் நீங்க',
                    remedy: 'ரிண விமோசன லிங்கேஸ்வரருக்கு 3 திங்கட்கிழமைகள் விளக்கேற்றி அர்ச்சனை செய்தல்.',
                    icon: '🔱'
                  }
                ].map((rem, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                        {rem.district}
                      </span>
                      <h4 className="font-bold text-white text-base mt-2 mb-1">{rem.title}</h4>
                      <p className="text-xs text-rose-300 mb-3">🎯 {rem.dosha}</p>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                        <strong>எளிய பரிகார முறை:</strong> {rem.remedy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. விவசாயம் (AGRI 360) தொகுதி */}
        {/* ============================================================ */}
        {currentModule === 'agri' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <span>🌾</span> உழவர் களம் - விவசாயம் (Agri 360)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  மண் சார்ந்த பயிர் வழிகாட்டல் • அரசு மானியத் திட்டங்கள் • விவசாய நிலக் குத்தகை மேசை
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setAgriSubTab('crops')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    agriSubTab === 'crops' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  மண் & பயிர் ஆலோசனை
                </button>
              </div>
            </div>

            {agriSubTab === 'crops' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    soil: 'செம்மண் மற்றும் சரளை',
                    crops: 'மணிலா, உளுந்து, மக்காச்சோளம், மாமரம், ரோஜா',
                    irrigation: 'சொட்டு நீர் பாசனம் மூலம் 40% நீர் மிச்சமாகும்.'
                  },
                  {
                    soil: 'கரிசல் மண்',
                    crops: 'பருத்தி, சூரியகாந்தி, மிளகாய், வெங்காயம், சோளம்',
                    irrigation: 'தெளிப்பு நீர் பாசனம் அல்லது சீரான வாய்க்கால் பாசனம்.'
                  },
                  {
                    soil: 'வண்டல் மண் (நஞ்சை பூமி)',
                    crops: 'பாரம்பரிய நெல் இரகங்கள், கரும்பு, வாழை, மஞ்சள்',
                    irrigation: 'ஆற்றுப்படுகை & நிலத்தடி நீர் பாசனம் உகந்தது.'
                  }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <h4 className="font-bold text-white text-base">{s.soil}</h4>
                    <p className="text-xs text-emerald-400">உகந்த பயிர்கள்: {s.crops}</p>
                    <p className="text-xs text-slate-400">பாசனம்: {s.irrigation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* பிற தொகுதிகள் */}
        {['finance', 'insurance', 'education', 'jobs', 'business', 'spiritual'].includes(currentModule) && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 max-w-xl mx-auto shadow-2xl">
            <span className="text-5xl block">
              {navigationModules.find((m) => m.id === currentModule)?.icon}
            </span>
            <h3 className="text-xl font-black text-white">
              {navigationModules.find((m) => m.id === currentModule)?.label}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              நம்ம பூமி 360 பெருந்திட்டத்தின்படி இப்பிரிவின் சேவைகள் அடுத்த கட்டமாக இணைக்கப்பட்டு வருகின்றன.
            </p>
            <button
              onClick={() => setCurrentModule('land')}
              className="bg-emerald-500 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
            >
              மீண்டும் பூமி & நிலம் செல்ல ↩
            </button>
          </div>
        )}

        {/* லோன் டெஸ்க் மாடல் */}
        {activeLoanLand && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
              <button
                onClick={() => {
                  setActiveLoanLand(null);
                  setLoanSuccess(false);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>

              {!loanSuccess ? (
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">வங்கி மனை கடன் உதவி</span>
                    <h3 className="font-bold text-base text-white">{activeLoanLand.village} நிலத்திற்கான கடன் தகுதி</h3>
                    <p className="text-slate-400 text-[11px]">சர்வே எண் #{activeLoanLand.surveyNo}</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">மாதாந்திர தோராய EMI (8.5%)</span>
                      <span className="text-xl font-black text-emerald-400">
                        ₹{calculateEMI(loanAmount, loanTenure).toLocaleString('en-IN')} / மாதம்
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                      {loanTenure} ஆண்டுகள்
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">தேவைப்படும் கடன் தொகை (₹)</label>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">உங்கள் பெயர் *</label>
                      <input
                        type="text"
                        required
                        value={loanName}
                        onChange={(e) => setLoanName(e.target.value)}
                        placeholder="முழுப் பெயர்"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">மொபைல் எண் *</label>
                      <input
                        type="tel"
                        required
                        value={loanPhone}
                        onChange={(e) => setLoanPhone(e.target.value)}
                        placeholder="10 இலக்க மொபைல் எண்"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (loanName && loanPhone) setLoanSuccess(true);
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    80% கடன் தகுதிக்கு விண்ணப்பிக்க ⚡
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-3 py-4">
                  <span className="text-4xl block">🎉</span>
                  <h4 className="font-bold text-lg text-white">கடன் விண்ணப்பம் பெறப்பட்டது!</h4>
                  <p className="text-xs text-slate-300">
                    எங்கள் நிதி ஆலோசகர் <strong>{loanPhone}</strong> எண்ணில் அழைத்து குறைந்த வட்டியில் கடன் பெற வழிகாட்டுவார்.
                  </p>
                  <button
                    onClick={() => {
                      setActiveLoanLand(null);
                      setLoanSuccess(false);
                    }}
                    className="bg-slate-800 text-white px-5 py-2 rounded-xl text-xs font-bold mt-2 cursor-pointer"
                  >
                    மூடுக
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* லைவ் மேப் மாடல் */}
        {activeMapModalLand && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 max-w-2xl w-full shadow-2xl relative">
              <button
                onClick={() => setActiveMapModalLand(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🗺️</span>
                <h3 className="font-bold text-base text-white">
                  {activeMapModalLand.village} - சர்வே எண் #{activeMapModalLand.surveyNo} லைவ் அமைவிடம்
                </h3>
              </div>

              <div className="rounded-2xl overflow-hidden h-80 border border-slate-800 mb-4">
                <iframe
                  title="Interactive Map"
                  src={activeMapModalLand.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>📍 {activeMapModalLand.village}, {activeMapModalLand.district}</span>
                <button
                  onClick={() => setActiveMapModalLand(null)}
                  className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl cursor-pointer"
                >
                  மூடுக
                </button>
              </div>
            </div>
          </div>
        )}

        {/* விசிட் பாஸ் மாடல் */}
        {contactModalLand && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
              <button
                onClick={() => setContactModalLand(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>

              {!generatedPass ? (
                <div>
                  <h3 className="font-bold text-base text-white mb-1">நம்ம பூமி 360 விசிட் பாஸ்</h3>
                  <p className="text-[11px] text-slate-400 mb-4">சர்வே எண் #{contactModalLand.surveyNo} • {contactModalLand.village}</p>

                  <form onSubmit={handleGeneratePass} className="space-y-4 text-xs">
                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">உங்கள் பெயர் *</label>
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="முழுப் பெயர்"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold mb-1 block">தொடர்பு மொபைல் எண் *</label>
                      <input
                        type="tel"
                        required
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="10 இலக்க எண்"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setBuyerType('loan')}
                        className={`p-3 rounded-xl border text-left transition ${
                          buyerType === 'loan' ? 'bg-emerald-950/60 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="font-bold text-xs">🏦 வங்கிக் கடன்</div>
                        <div className="text-[10px] text-slate-400">80% உடனடி கடன் தகுதி</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBuyerType('cash')}
                        className={`p-3 rounded-xl border text-left transition ${
                          buyerType === 'cash' ? 'bg-amber-950/60 border-amber-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="font-bold text-xs text-amber-400">👑 நேரடி ரொக்கம் (VIP)</div>
                        <div className="text-[10px] text-slate-400">டோர்ஸ்டெப் அசல் சரிபார்ப்பு</div>
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      விசிட் பாஸ் & எண் பெறுக ⚡
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center">
                    <span className="text-xs uppercase text-emerald-400 font-bold block mb-1">அங்கீகரிக்கப்பட்ட விசிட் டோக்கன்</span>
                    <div className="text-2xl font-black text-white">{generatedPass.code}</div>
                    <span className="text-[10px] text-slate-400 block mt-1">பயனர்: {generatedPass.buyerName} ({generatedPass.buyerPhone})</span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="text-slate-400">நில உரிமையாளர்: <strong className="text-white">{generatedPass.land.ownerName}</strong></div>
                    <div className="text-slate-400">தொடர்பு எண்: <strong className="text-emerald-400 text-base">{generatedPass.land.phone}</strong></div>
                    <p className="text-[10px] text-slate-500">அழைக்கும் போது விசிட் டோக்கன் எண்ணைத் தெரிவிக்கவும்.</p>
                  </div>

                  <button
                    onClick={() => setContactModalLand(null)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    முடிந்தது
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}