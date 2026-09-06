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
  // நிதி & கடன்கள் மாடியூல் ஸ்டேட்கள்
  const [financeSubTab, setFinanceSubTab] = useState('all');
  const [loanIncome, setLoanIncome] = useState(50000);
  const [loanExistingEmi, setLoanExistingEmi] = useState(0);
  const [loanRequested, setLoanRequested] = useState(1500000);
  const [loanCibil, setLoanCibil] = useState('good');
  const [loanDecision, setLoanDecision] = useState(null);
  // காப்பீடு மாடியூல் ஸ்டேட்
  const [insuranceSubTab, setInsuranceSubTab] = useState('all');
  // கல்வி & படிப்பு மாடியூல் ஸ்டேட்கள்
  const [educationSubTab, setEducationSubTab] = useState('pathway');
  const [selectedCareer, setSelectedCareer] = useState('agri_officer');
  // வேலைவாய்ப்பு மாடியூல் ஸ்டேட்கள்
  const [jobsSubTab, setJobsSubTab] = useState('govt');
  // தொழில் & MSME மாடியூல் ஸ்டேட்கள்
  const [businessSubTab, setBusinessSubTab] = useState('schemes');
  const [bizProjectCost, setBizProjectCost] = useState(500000);
  const [bizCategory, setBizCategory] = useState('special');
  const [bizLocation, setBizLocation] = useState('rural');
  // ஆன்மிகம் & பாரம்பரிய சுற்றுலா மாடியூல் ஸ்டேட்கள்
  const [spiritualSubTab, setSpiritualSubTab] = useState('circuits');
  const [selectedCircuit, setSelectedCircuit] = useState('navagraha');
  // 10. A to Z மொத்த விற்பனை மாடியூல் ஸ்டேட்கள்
  const [wholesaleCategory, setWholesaleCategory] = useState('all');
  const [wholesaleSearch, setWholesaleSearch] = useState('');
  // 11. கருத்து & ஃபீட்பேக் மாடல் ஸ்டேட்கள்
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    phone: '',
    targetModule: 'அனைத்து தொகுதிகள்',
    rating: '5',
    comments: ''
  });
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
    { id: 'spiritual', label: 'ஆன்மிகம் & சுற்றுலா', icon: '🛕' },
    { id: 'wholesale', label: 'A-Z மொத்த விற்பனை', icon: '📦' },
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
        {/* 3. விவசாயம் (Agri 360) மாடியூல் */}
          {currentModule === 'agri' && (
            <div className="space-y-6">
              {/* தலைப்பு மற்றும் சப்-டேப் பட்டன்கள் */}
              <div className="bg-[#0f1d32]/90 border border-emerald-500/40 rounded-2xl p-6 shadow-xl backdrop-blur">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                      🌾 உழவர் களம் - விவசாயம் (Agri 360)
                    </h2>
                    <p className="text-xs text-emerald-400 mt-1 font-medium">
                      மண் சார்ந்த பயிர் வழிகாட்டல் • அரசு மானியத் திட்டங்கள் • விவசாய நிலக் குத்தகை மேசை
                    </p>
                  </div>

                  {/* 3 சப்-டேப் தேர்வுகள் */}
                  <div className="flex flex-wrap gap-2 bg-[#080e1a] p-1.5 rounded-xl border border-emerald-500/30">
                    <button
                      onClick={() => setAgriSubTab('crops')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                        agriSubTab === 'crops'
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      🌱 மண் & பயிர் ஆலோசனை
                    </button>
                    <button
                      onClick={() => setAgriSubTab('subsidies')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                        agriSubTab === 'subsidies'
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      🏛️ அரசு மானியங்கள் & திட்டங்கள்
                    </button>
                    <button
                      onClick={() => setAgriSubTab('lease')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                        agriSubTab === 'lease'
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      🤝 நிலக் குத்தகை மேசை
                    </button>
                  </div>
                </div>
              </div>

              {/* 1. மண் & பயிர் ஆலோசனை அட்டைகள் */}
              {agriSubTab === 'crops' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-[#0d1b2e] border border-blue-500/30 rounded-2xl p-5 shadow-lg">
                    <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold mb-3">
                      வகை 1
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">செம்மண் மற்றும் சரளை</h3>
                    <p className="text-xs text-slate-300 mb-2">
                      <strong className="text-emerald-400">உகந்த பயிர்கள்:</strong> மணிலா (வேர்க்கடலை), உளுந்து, மக்காச்சோளம், மாமரம், ரோஜா மற்றும் தோட்டக்கலை பயிர்கள்.
                    </p>
                    <p className="text-xs text-slate-400">
                      <strong className="text-blue-400">பாசன முறை:</strong> சொட்டு நீர் பாசனம் மூலம் 40% வரை நீர் மிச்சமாகும்.
                    </p>
                  </div>

                  <div className="bg-[#0d1b2e] border border-emerald-500/30 rounded-2xl p-5 shadow-lg">
                    <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold mb-3">
                      வகை 2
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">கரிசல் மண் (பருத்தி பூமி)</h3>
                    <p className="text-xs text-slate-300 mb-2">
                      <strong className="text-emerald-400">உகந்த பயிர்கள்:</strong> பருத்தி, சூரியகாந்தி, மிளகாய், வெங்காயம், சோளம் மற்றும் தானியங்கள்.
                    </p>
                    <p className="text-xs text-slate-400">
                      <strong className="text-blue-400">பாசன முறை:</strong> தெளிப்பு நீர் பாசனம் அல்லது வாய்க்கால் வழி சீரான நீர் மேலாண்மை.
                    </p>
                  </div>

                  <div className="bg-[#0d1b2e] border border-amber-500/30 rounded-2xl p-5 shadow-lg">
                    <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold mb-3">
                      வகை 3
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">வண்டல் மண் (நஞ்சை பூமி)</h3>
                    <p className="text-xs text-slate-300 mb-2">
                      <strong className="text-emerald-400">உகந்த பயிர்கள்:</strong> பாரம்பரிய நெல் இரகங்கள், கரும்பு, வாழை, மஞ்சள் மற்றும் காய்கறிகள்.
                    </p>
                    <p className="text-xs text-slate-400">
                      <strong className="text-blue-400">பாசன முறை:</strong> ஆற்றுப்படுகை மற்றும் நிலத்தடி நீர் கிணற்றுப் பாசனம் மிக உகந்தது.
                    </p>
                  </div>
                </div>
              )}

              {/* 2. அரசு மானியங்கள் & திட்டங்கள் */}
              {agriSubTab === 'subsidies' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-[#0d1b2e] border border-emerald-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                        மத்திய & மாநில அரசு திட்டம்
                      </span>
                      <h3 className="text-lg font-bold text-white mt-3 mb-2">
                        ☀️ PM-KUSUM சோலார் பம்புசெட் (70% மானியம்)
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        மின் இணைப்புக்காக காத்திருக்கும் விவசாயிகளுக்கு 5HP / 7.5HP சோலார் பம்புகளுக்கு 70% நேரடி அரசு மானியம் வழங்கப்படுகிறது.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400">
                      <span>தேவையான ஆவணங்கள்: பட்டா, ஆதார், சிட்டா</span>
                      <span className="text-emerald-400 font-semibold">வேளாண் பொறியியல் துறை</span>
                    </div>
                  </div>

                  <div className="bg-[#0d1b2e] border border-cyan-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full">
                        தோட்டக்கலைத் துறை
                      </span>
                      <h3 className="text-lg font-bold text-white mt-3 mb-2">
                        💧 நுண்ணீர் பாசனம் (100% மானியம்)
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        சிறு மற்றும் குறு விவசாயிகளுக்கு 100% முழு மானியத்திலும், இதர பெரு விவசாயிகளுக்கு 75% மானியத்திலும் சொட்டு நீர் பாசன கருவிகள் வழங்கப்படுகின்றன.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400">
                      <span>தண்ணீர் சேமிப்பு: 50% வரை</span>
                      <span className="text-cyan-400 font-semibold">TNAU / தோட்டக்கலைத் துறை</span>
                    </div>
                  </div>

                  <div className="bg-[#0d1b2e] border border-yellow-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                        வங்கி கடன் உதவி
                      </span>
                      <h3 className="text-lg font-bold text-white mt-3 mb-2">
                        💳 கிசான் கிரெடிட் கார்டு (KCC - 4% வட்டி)
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        ₹3 லட்சம் வரை சலுகை வட்டி விகிதத்தில் (4% வட்டி) விவசாயிகளுக்குப் பயிர்க்கடன் மற்றும் உழவு உபகரணங்கள் வாங்கும் கடன் வசதி.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400">
                      <span>அனைத்து தேசியமயமாக்கப்பட்ட வங்கிகள்</span>
                      <span className="text-yellow-400 font-semibold">KCC Scheme</span>
                    </div>
                  </div>

                  <div className="bg-[#0d1b2e] border border-purple-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full">
                        ஆண்டு நிதி உதவி
                      </span>
                      <h3 className="text-lg font-bold text-white mt-3 mb-2">
                        🌾 PM-கிசான் சம்மான் நிதி (ஆண்டுக்கு ₹6,000)
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        விவசாய குடும்பங்களுக்கு ஆண்டுதோறும் 3 தவணைகளில் தலா ₹2,000 வீதம் நேரடி வங்கிக் கணக்கில் உதவித்தொகை வரவு வைக்கப்படுகிறது.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400">
                      <span>நேரடி பயனாளி திட்டம் (DBT)</span>
                      <span className="text-purple-400 font-semibold">pmkisan.gov.in</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. விவசாய நிலக் குத்தகை மேசை & படிவம் */}
              {agriSubTab === 'lease' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* குத்தகை நிலங்கள் பட்டியல் (2/3 பங்கு) */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      📋 குத்தகைக்கு உள்ள விவசாய நிலங்கள் (Lease Listings)
                    </h3>

                    <div className="bg-[#0d1b2e] border border-emerald-500/30 rounded-2xl p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                            நஞ்சை நிலம்
                          </span>
                          <h4 className="text-base font-bold text-white mt-1">
                            4 ஏக்கர் பாசன நஞ்சை நிலம் குத்தகைக்கு
                          </h4>
                          <p className="text-xs text-slate-400">செங்கல்பட்டு, திருப்போரூர் பகுதி • 24 மணி நேர கிணற்றுப் பாசனம்</p>
                        </div>
                        <div className="text-right">
                          <span className="text-emerald-400 font-black text-sm">₹35,000 / ஏக்கர்</span>
                          <p className="text-[10px] text-slate-400">ஆண்டு குத்தகை</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-700/40 flex justify-between items-center text-xs">
                        <span className="text-slate-300">பயிரிட உகந்தது: நெல், உளுந்து, காய்கறிகள்</span>
                        <button 
                          onClick={() => alert("குத்தகை உரிமையாளர் எண்: +91 98400 12345")}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                        >
                          உரிமையாளரை அழைக்க
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#0d1b2e] border border-blue-500/30 rounded-2xl p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded">
                            தோட்டக்கலை பூமி
                          </span>
                          <h4 className="text-base font-bold text-white mt-1">
                            3 ஏக்கர் வேலி அமைக்கப்பட்ட செம்மண் தோட்டம்
                          </h4>
                          <p className="text-xs text-slate-400">காஞ்சிபுரம், ஸ்ரீபெரும்புதூர் வட்டம் • ஆழ்துளை கிணறு & மின் இணைப்பு உண்டு</p>
                        </div>
                        <div className="text-right">
                          <span className="text-blue-400 font-black text-sm">₹40,000 / ஏக்கர்</span>
                          <p className="text-[10px] text-slate-400">ஆண்டு குத்தகை</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-700/40 flex justify-between items-center text-xs">
                        <span className="text-slate-300">பயிரிட உகந்தது: கொய்யா, மாமரம், பூக்கள் சாகுபடி</span>
                        <button 
                          onClick={() => alert("குத்தகை உரிமையாளர் எண்: +91 94440 67890")}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs"
                        >
                          உரிமையாளரை அழைக்க
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* நிலத்தை குத்தகைக்கு விட / எடுக்க விரைவுப் படிவம் (1/3 பங்கு) */}
                  <div className="bg-[#0d1b2e] border border-emerald-500/40 rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-white mb-2">
                      ✍️ உங்கள் நிலத்தை குத்தகைக்கு விட
                    </h3>
                    <p className="text-[11px] text-slate-400 mb-4">
                      விவசாயிகள் மற்றும் முதலீட்டாளர்களை உடனடியாக இணைக்கிறோம்.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">உரிமையாளர் பெயர்</label>
                        <input
                          type="text"
                          placeholder="பெயர்"
                          className="w-full bg-[#080e1a] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">தொடர்பு எண்</label>
                        <input
                          type="tel"
                          placeholder="10 இலக்க எண்"
                          className="w-full bg-[#080e1a] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">பரப்பளவு & பகுதி</label>
                        <input
                          type="text"
                          placeholder="எ.கா. 2.5 ஏக்கர், திருப்போரூர்"
                          className="w-full bg-[#080e1a] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => alert("உங்கள் குத்தகை விபரங்கள் பெறப்பட்டது! எங்கள் விவசாய மேசை உங்களை தொடர்பு கொள்ளும்.")}
                        className="w-full mt-2 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg text-xs shadow-md"
                      >
                        குத்தகைக்கு சமர்ப்பிக்க 🌾
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
{/* 4. நிதி & கடன்கள் (Finance & All Loans Hub + Instant Decision Engine) */}
          {currentModule === 'finance' && (
            <div className="space-y-6">
              {/* தலைப்பு பேனர் */}
              <div className="bg-[#0f1d32]/95 border border-emerald-500/40 rounded-2xl p-6 shadow-xl backdrop-blur">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                      🏦 நம்ம பூமி நிதி & கடன் வழிகாட்டல் மையம் (A to Z Loans Hub)
                    </h2>
                    <p className="text-xs text-emerald-400 mt-1 font-medium">
                      அனைத்து வங்கிக் கடன்கள் • உடனடி தகுதி சரிபார்ப்பு முடிவு (Instant Eligibility Decision) • சலுகை வட்டி வழிகாட்டல்
                    </p>
                  </div>

                  {/* கடன் வகை வடிகட்டிகள் */}
                  <div className="flex flex-wrap gap-1.5 bg-[#080e1a] p-1.5 rounded-xl border border-slate-700/60">
                    <button
                      onClick={() => setFinanceSubTab('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${financeSubTab === 'all' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'}`}
                    >
                      அனைத்தும்
                    </button>
                    <button
                      onClick={() => setFinanceSubTab('property')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${financeSubTab === 'property' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'}`}
                    >
                      🏡 மனை & வீடு
                    </button>
                    <button
                      onClick={() => setFinanceSubTab('agri')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${financeSubTab === 'agri' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'}`}
                    >
                      🌾 உழவர் கடன்
                    </button>
                    <button
                      onClick={() => setFinanceSubTab('msme')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${financeSubTab === 'msme' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'}`}
                    >
                      🏭 MSME & வணிகம்
                    </button>
                    <button
                      onClick={() => setFinanceSubTab('gold')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${financeSubTab === 'gold' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'}`}
                    >
                      🪙 நகை & அவசரம்
                    </button>
                  </div>
                </div>
              </div>

              {/* 🎯 நேரடி கடன் தகுதி முடிவு இன்ஜின் */}
              <div className="bg-gradient-to-br from-[#0e1e38] to-[#0a1526] border-2 border-emerald-500/50 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-lg">⚡</span>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      உடனடி கடன் தகுதி கணிப்பொறி (Instant Loan Approval Check)
                    </h3>
                    <p className="text-xs text-slate-400">
                      வங்கி விதிமுறைகளின்படி (FOIR 50% Rule) உங்கள் கடன் தகுதியை இங்கேயே நேரடியாகத் தெரிந்துகொள்ளுங்கள்.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className="text-[11px] text-slate-300 font-semibold block mb-1">மாத நிகர வருமானம் (₹)</label>
                    <input
                      type="number"
                      value={loanIncome}
                      onChange={(e) => setLoanIncome(Number(e.target.value))}
                      className="w-full bg-[#080e1a] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                      placeholder="எ.கா. 50000"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-semibold block mb-1">தற்போது கட்டும் பிற EMI (₹)</label>
                    <input
                      type="number"
                      value={loanExistingEmi}
                      onChange={(e) => setLoanExistingEmi(Number(e.target.value))}
                      className="w-full bg-[#080e1a] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                      placeholder="எதுவும் இல்லை எனில் 0"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-semibold block mb-1">தேவைப்படும் கடன் தொகை (₹)</label>
                    <input
                      type="number"
                      value={loanRequested}
                      onChange={(e) => setLoanRequested(Number(e.target.value))}
                      className="w-full bg-[#080e1a] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                      placeholder="எ.கா. 1500000"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-semibold block mb-1">CIBIL ஸ்கோர் நிலை</label>
                    <select
                      value={loanCibil}
                      onChange={(e) => setLoanCibil(e.target.value)}
                      className="w-full bg-[#080e1a] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                    >
                      <option value="good">700 - 900 (சிறந்தது / Good)</option>
                      <option value="average">650 - 699 (நடுத்தரம் / Average)</option>
                      <option value="low">650-க்கு கீழ் (குறைவு / Low)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      const income = Number(loanIncome) || 0;
                      const emi = Number(loanExistingEmi) || 0;
                      const req = Number(loanRequested) || 0;
                      const maxAllowedEmi = (income * 0.5) - emi;

                      if (loanCibil === 'low') {
                        setLoanDecision({
                          status: 'rejected',
                          title: 'கடன் வாய்ப்பு குறைவு (CIBIL பிரச்சனை)',
                          msg: 'உங்கள் சிபில் ஸ்கோர் 650-க்குக் கீழ் உள்ளதால் தேசிய வங்கிகளில் மனை/தனிநபர் கடன் பெறுவதில் சிக்கல் எழலாம். இதற்கு மாற்றாக நகைக் கடன் அல்லது குடும்பத்தினரின் சிபில் கொண்டு விண்ணப்பிக்கலாம்.',
                          maxAmount: 0
                        });
                      } else if (maxAllowedEmi <= 500) {
                        setLoanDecision({
                          status: 'rejected',
                          title: 'தற்போதுள்ள EMI சுமை மிக அதிகம்',
                          msg: 'உங்கள் வருமானத்தில் 50%-க்கும் மேல் ஏற்கனவே EMI செல்வதால் புதிய கடன் ஒப்புதல் கடினம். பழைய கடனை அடைத்த பின் விண்ணப்பிக்கவும்.',
                          maxAmount: 0
                        });
                      } else {
                        const maxEligible = Math.round((maxAllowedEmi / 985) * 100000);
                        const estEmi = Math.round((req / 100000) * 985);

                        if (req <= maxEligible) {
                          setLoanDecision({
                            status: 'approved',
                            title: '🎉 வாழ்த்துகள்! கடன் ஒப்புதல் உறுதி (Eligible)',
                            msg: `நீங்கள் கோரிய ₹${req.toLocaleString('en-IN')} தொகைக்கு உங்கள் வருமானம் போதுமானது! உத்தேச மாத EMI: ₹${estEmi.toLocaleString('en-IN')} (15 ஆண்டுகள் தவணைக்கு).`,
                            maxAmount: maxEligible
                          });
                        } else {
                          setLoanDecision({
                            status: 'partial',
                            title: '⚠️ பகுதி கடன் தகுதி மட்டுமே உண்டு',
                            msg: `உங்கள் வருமானத்திற்கு அதிகபட்சமாக ₹${maxEligible.toLocaleString('en-IN')} வரை மட்டுமே அனுமதிக்க முடியும். நீங்கள் கோரிய முழுத் தொகையையும் பெற குடும்ப உறுப்பினரை (Co-applicant) சேர்க்கலாம்.`,
                            maxAmount: maxEligible
                          });
                        }
                      }
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-lg transition"
                  >
                    கடன் கிடைக்குமா என்று இங்கேயே சரிபார்க்க 🔍
                  </button>
                </div>

                {/* நேரடி முடிவு காட்டும் அட்டை */}
                {loanDecision && (
                  <div className={`mt-4 p-4 rounded-xl border ${
                    loanDecision.status === 'approved'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : loanDecision.status === 'partial'
                      ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                      : 'bg-rose-950/60 border-rose-500 text-rose-200'
                  }`}>
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      {loanDecision.title}
                    </h4>
                    <p className="text-xs mt-1 leading-relaxed">{loanDecision.msg}</p>
                    {loanDecision.maxAmount > 0 && (
                      <div className="mt-3 pt-2 border-t border-slate-700/50 flex justify-between items-center text-xs">
                        <span>உங்களின் அதிகபட்ச கடன் தகுதி வரம்பு:</span>
                        <span className="text-white font-black text-sm">₹{loanDecision.maxAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* A to Z அனைத்து வகையான கடன் திட்டங்கள் */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(financeSubTab === 'all' || financeSubTab === 'property') && (
                  <div className="bg-[#0d1b2e] border border-blue-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        வட்டி: 8.5% முதல்
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🏡 மனை வாங்கும் கடன் (Plot Loan)</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        DTCP / CMDA மனை வழிகாட்டி மதிப்பில் 80% வரை கடன் வசதி.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• தவணை: 15 - 20 ஆண்டுகள்</li>
                        <li>• அனுமதி: 48 மணி நேரத்தில்</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => alert("Plot Loan ஆலோசகர் தொடர்பு எண்: +91 98400 55667")}
                      className="w-full mt-3 py-1.5 bg-blue-600/80 hover:bg-blue-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {(financeSubTab === 'all' || financeSubTab === 'property') && (
                  <div className="bg-[#0d1b2e] border border-cyan-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        வட்டி: 8.4% முதல்
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🏗️ நிலம் + வீட்டுக் கட்டுமானம்</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        மனை வாங்கி வீடு கட்ட மொத்த மதிப்பீட்டில் 85% வரை ஒருங்கிணைந்த கடன்.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• தவணை: 30 ஆண்டுகள் வரை</li>
                        <li>• PMAY வட்டி மானியம் உண்டு</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => alert("Home Loan ஆலோசகர் தொடர்பு எண்: +91 98400 55668")}
                      className="w-full mt-3 py-1.5 bg-cyan-600/80 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {(financeSubTab === 'all' || financeSubTab === 'agri') && (
                  <div className="bg-[#0d1b2e] border border-emerald-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        சலுகை வட்டி: 4% மட்டும்
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🌾 கிசான் பயிர்க்கடன் (KCC)</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        விவசாயிகளுக்கு ₹3 லட்சம் வரை பிணையற்ற பயிர்க்கடன் & சாகுபடி உதவி.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• மத்திய அரசின் 3% வட்டி தள்ளுபடி</li>
                        <li>• பட்டா, சிட்டா போதுமானது</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => alert("KCC உதவி மையம்: தேசியமயமாக்கப்பட்ட வங்கிகள் அல்லது +91 98400 55669")}
                      className="w-full mt-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {(financeSubTab === 'all' || financeSubTab === 'agri') && (
                  <div className="bg-[#0d1b2e] border border-emerald-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        வட்டி: 9.0% முதல்
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🚜 டிராக்டர் & உபகரணக் கடன்</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        உழவு இயந்திரங்கள், அறுவடை இயந்திரங்கள் வாங்க 85% வரை கடன்.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• வேளாண் துறை மானிய இணைப்பு</li>
                        <li>• தவணை: 5 முதல் 7 ஆண்டுகள்</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => alert("விவசாய உபகரணக் கடன் மேசை: +91 98400 55670")}
                      className="w-full mt-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {(financeSubTab === 'all' || financeSubTab === 'msme') && (
                  <div className="bg-[#0d1b2e] border border-purple-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-purple-500/20 text-purple-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        ₹50,000 முதல் ₹10 லட்சம்
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🏭 முத்ரா சிறுதொழில் கடன் (PMMY)</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        எந்தப் பிணையமும் இன்றி சிறு வியாபாரிகள் தொழில் தொடங்க கடன் உதவி.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• ஷிஷு, Kishore, தருண் பிரிவுகள்</li>
                        <li>• செயலாக்கக் கட்டணம் இல்லை</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => alert("முத்ரா கடன் உதவி மேசை: +91 98400 55671")}
                      className="w-full mt-3 py-1.5 bg-purple-600/80 hover:bg-purple-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {(financeSubTab === 'all' || financeSubTab === 'msme') && (
                  <div className="bg-[#0d1b2e] border border-pink-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-pink-500/20 text-pink-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        குறைந்த வட்டி சலுகை
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">👩‍🌾 மகளிர் சுய உதவிக் குழுக் கடன்</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        கிராமப்புற மற்றும் நகர்ப்புற மகளிர் குழுக்களுக்கு உற்பத்தி & கைவினைத் தொழில் கடன்.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• ₹5 லட்சம் முதல் ₹20 லட்சம் வரை</li>
                        <li>• அரசு நலத்திட்ட மானிய இணைப்பு</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => alert("மகளிர் கடன் பிரிவு: +91 98400 55672")}
                      className="w-full mt-3 py-1.5 bg-pink-600/80 hover:bg-pink-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {(financeSubTab === 'all' || financeSubTab === 'gold') && (
                  <div className="bg-[#0d1b2e] border border-yellow-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-yellow-500/20 text-yellow-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        15 நிமிட அனுமதி
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🪙 உடனடி நகைக் கடன் (Gold Loan)</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        அவசர மருத்துவ மற்றும் விவசாயத் தேவைகளுக்குச் சவரனுக்கு அதிகபட்ச நிதி.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• வட்டி: 0.75% / மாதம் முதல்</li>
                        <li>• உடனடி வங்கிப் பெட்டகப் பாதுகாப்பு</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => alert("நகைக் கடன் மேசை: +91 98400 55673")}
                      className="w-full mt-3 py-1.5 bg-yellow-600/80 hover:bg-yellow-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {(financeSubTab === 'all' || financeSubTab === 'property') && (
                  <div className="bg-[#0d1b2e] border border-indigo-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        பெரிய கடன் நிதி
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🏛️ சொத்து அடமானக் கடன் (LAP)</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        சொந்த நிலம் அல்லது கட்டடத்தின் மதிப்பில் 65% வரை பெரிய வணிகத் தேவைகளுக்கு.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• ₹10 லட்சம் முதல் ₹5 கோடி வரை</li>
                        <li>• தவணை: 15 ஆண்டுகள் வரை</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => alert("LAP கடன் மேசை: +91 98400 55674")}
                      className="w-full mt-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}
                {/* 9. உடனடி தனிநபர் கடன் (Personal Loan - PL) */}
                {(financeSubTab === 'all' || financeSubTab === 'gold') && (
                  <div className="bg-[#0d1b2e] border border-violet-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-violet-500/20 text-violet-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        வட்டி: 10.5% முதல்
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">💼 உடனடி தனிநபர் கடன் (Personal Loan)</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        சம்பளதாரர்கள் மற்றும் வணிகர்களுக்கு எந்தப் பிணையமும் (No Collateral) இன்றி உடனடித் தொகை.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• ₹50,000 முதல் ₹20 லட்சம் வரை</li>
                        <li>• வங்கி கணக்கில் 24 மணி நேரத்தில் பட்டுவாடா</li>
                        <li>• குறைந்தபட்ச சம்பளம்: ₹15,000/மாதம்</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => alert("Personal Loan (PL) உதவி மேசை: +91 98400 55675")}
                      className="w-full mt-3 py-1.5 bg-violet-600/80 hover:bg-violet-500 text-white font-bold rounded-lg text-xs transition"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* 5. காப்பீடு (Insurance 360 Hub) மாடியூல் */}
          {currentModule === 'insurance' && (
            <div className="space-y-6">
              {/* தலைப்பு பேனர் */}
              <div className="bg-[#0f1d32]/95 border border-cyan-500/40 rounded-2xl p-6 shadow-xl backdrop-blur">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                      🛡️ நம்ம பூமி காப்பீட்டுப் பாதுகாப்பு மையம் (Insurance 360)
                    </h2>
                    <p className="text-xs text-cyan-400 mt-1 font-medium">
                      பயிர்க் காப்பீடு (PMFBY) • கால்நடை & டிராக்டர் • மனை & வீட்டுக் காப்பீடு • அரசு சமூகப் பாதுகாப்புத் திட்டங்கள்
                    </p>
                  </div>

                  {/* காப்பீட்டு வகை வடிகட்டிகள் */}
                  <div className="flex flex-wrap gap-1.5 bg-[#080e1a] p-1.5 rounded-xl border border-slate-700/60">
                    <button
                      onClick={() => setInsuranceSubTab('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${insuranceSubTab === 'all' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'}`}
                    >
                      அனைத்தும்
                    </button>
                    <button
                      onClick={() => setInsuranceSubTab('agri')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${insuranceSubTab === 'agri' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'}`}
                    >
                      🌾 உழவர் & பயிர்
                    </button>
                    <button
                      onClick={() => setInsuranceSubTab('cattle')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${insuranceSubTab === 'cattle' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'}`}
                    >
                      🐄 கால்நடை & பண்ணை
                    </button>
                    <button
                      onClick={() => setInsuranceSubTab('property')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${insuranceSubTab === 'property' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'}`}
                    >
                      🏡 மனை & வீடு
                    </button>
                    <button
                      onClick={() => setInsuranceSubTab('life')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${insuranceSubTab === 'life' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'}`}
                    >
                      👨‍👩‍👧 ஆயுள் & நலத்திட்டம்
                    </button>
                  </div>
                </div>
              </div>

              {/* அரசு மானியக் காப்பீட்டு வழிகாட்டி பேனர் */}
              <div className="bg-gradient-to-r from-blue-950/70 via-[#0d1b2e] to-cyan-950/70 border border-cyan-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🏛️</span>
                  <div>
                    <h3 className="text-sm font-bold text-white">மத்திய & மாநில அரசுகளின் ₹20 மற்றும் ₹436 சமூகப் பாதுகாப்புத் திட்டங்கள்</h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      அனைத்து வங்கிக் கணக்குகளுடனும் இணைக்கப்படும் PMSBY விபத்துக் காப்பீடு மற்றும் PMJJBY ஆயுள் காப்பீட்டு வழிகாட்டல்.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => alert("அரசு காப்பீட்டு உதவி மையம்: உங்கள் வங்கி கிளையை அணுகவும் அல்லது 1800 180 1111 எண்ணை அழைக்கவும்.")}
                  className="whitespace-nowrap px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow transition"
                >
                  திட்ட விவரங்கள் ↗
                </button>
              </div>

              {/* A to Z காப்பீட்டு அட்டைகள் (Cards Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. பயிர்க் காப்பீடு */}
                {(insuranceSubTab === 'all' || insuranceSubTab === 'agri') && (
                  <div className="bg-[#0d1b2e] border border-emerald-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        மானியம்: 80% வரை அரசு
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🌾 PMFBY பயிர்க் காப்பீடு</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        வறட்சி, புயல், வெள்ளம் மற்றும் பூச்சித் தாக்குதலால் ஏற்படும் பயிர் இழப்புகளுக்கு முழு இழப்பீடு.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• பிரீமியம்: 1.5% - 2% மட்டுமே</li>
                        <li>• நெல், பருத்தி, மக்காச்சோளம் பாதுகாப்பு</li>
                        <li>• நேரடி வங்கி இழப்பீட்டுப் பட்டுவாடா</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => alert("PMFBY பயிர்க் காப்பீடு போர்டல்: pmfby.gov.in அல்லது பொதுச் சேவை மையத்தை (CSC) அணுகவும்.")}
                      className="w-full mt-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {/* 2. கால்நடைக் காப்பீடு */}
                {(insuranceSubTab === 'all' || insuranceSubTab === 'cattle') && (
                  <div className="bg-[#0d1b2e] border border-amber-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        பசு & எருமைப் பாதுகாப்பு
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🐄 கால்நடைக் காப்பீடு (Livestock)</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        கறவை மாடுகள், செம்மறி ஆடுகள் எதிர்பாராத நோய் மற்றும் விபத்து மரணங்களுக்கு இழப்பீட்டு உத்தரவாதம்.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• அரசு மானியம்: பிரீமியத்தில் 50%</li>
                        <li>• கால்நடை மருத்துவச் சான்றிதழ் இணைப்பு</li>
                        <li>• இழப்பீடு: ₹30,000 முதல் ₹80,000 வரை</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => alert("கால்நடை காப்பீட்டு உதவிக்கு உங்கள் பகுதி அரசு கால்நடை மருத்துவரை அணுகவும்.")}
                      className="w-full mt-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {/* 3. டிராக்டர் & வேளாண் இயந்திரக் காப்பீடு */}
                {(insuranceSubTab === 'all' || insuranceSubTab === 'cattle') && (
                  <div className="bg-[#0d1b2e] border border-teal-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-teal-500/20 text-teal-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        விரிவான மோட்டார் பாலிசி
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🚜 டிராக்டர் & பண்ணை இயந்திரக் காப்பீடு</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        டிராக்டர்கள், பவர்டில்லர்கள், அறுவடை இயந்திரங்களுக்கு விபத்து & மூன்றாம் நபர் பொறுப்புக் காப்பீடு.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• தீ, கவிழ்தல், திருட்டு பாதுகாப்பு</li>
                        <li>• ஓட்டுநர் தனிநபர் விபத்து கவரேஜ்</li>
                        <li>• உடனடி க்ளெய்ம் தீர்வு வசதி</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => alert("பண்ணை இயந்திரக் காப்பீட்டு மேசை: +91 98400 55680")}
                      className="w-full mt-3 py-1.5 bg-teal-600/80 hover:bg-teal-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {/* 4. மனை & வீட்டுக் காப்பீடு */}
                {(insuranceSubTab === 'all' || insuranceSubTab === 'property') && (
                  <div className="bg-[#0d1b2e] border border-blue-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        ₹10 லட்சம் முதல் ₹2 கோடி வரை
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🏡 சொத்து & வீட்டுக் காப்பீடு (Home)</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        கட்டிடம், கட்டமைப்பு மற்றும் வீட்டிலுள்ள பொருட்களுக்கு தீ, புயல், நிலநடுக்க பாதிப்பு கவரேஜ்.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• மிகக் குறைந்த ஆண்டுக் கட்டணம்</li>
                        <li>• வீட்டுக் கடன் வாங்குவோருக்கு கட்டாயம்</li>
                        <li>• மின்சாதன பழுது இழப்பீட்டுப் பாதுகாப்பு</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => alert("Home Insurance உதவி மேசை: +91 98400 55681")}
                      className="w-full mt-3 py-1.5 bg-blue-600/80 hover:bg-blue-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {/* 5. பிரதான் மந்திரி சுரக்ஷா பீமா (PMSBY) */}
                {(insuranceSubTab === 'all' || insuranceSubTab === 'life') && (
                  <div className="bg-[#0d1b2e] border border-indigo-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        ஆண்டுக்கு ₹20 மட்டும்
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🛡️ PMSBY விபத்துக் காப்பீடு</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        மத்திய அரசின் அதிதீவிர மக்கள் நல விபத்துக் காப்பீடு. வங்கி கணக்கு உள்ள 18-70 வயதுக்குட்பட்டோருக்கு.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• விபத்து மரணம்: ₹2 லட்சம்</li>
                        <li>• நிரந்தர ஊனம்: ₹1 முதல் ₹2 லட்சம்</li>
                        <li>• தானியங்கி ஆட்டோ-டெபிட் முறை</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => alert("PMSBY பதிவு: உங்கள் சேமிப்பு வங்கி கணக்கில் எளிதாகத் தொடங்கலாம்.")}
                      className="w-full mt-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {/* 6. பிரதான் மந்திரி ஜீவன் ஜோதி (PMJJBY) */}
                {(insuranceSubTab === 'all' || insuranceSubTab === 'life') && (
                  <div className="bg-[#0d1b2e] border border-purple-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-purple-500/20 text-purple-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        ஆண்டுக்கு ₹436 மட்டும்
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">👨‍👩‍👧 PMJJBY ஆயுள் காப்பீடு</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        எந்தக் காரணத்தினாலும் ஏற்படும் மரணத்திற்கு குடும்பப் பாதுகாப்பு வழங்கும் மத்திய அரசின் ஆயுள் திட்டம்.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• ஆயுள் பாதுகாப்புத் தொகை: ₹2 லட்சம்</li>
                        <li>• வயது வரம்பு: 18 முதல் 50 ஆண்டுகள்</li>
                        <li>• மருத்துவப் பரிசோதனை தேவையில்லை</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => alert("PMJJBY பதிவு: உங்கள் சேமிப்பு வங்கி கணக்கு மூலம் உடனடியாக இணையலாம்.")}
                      className="w-full mt-3 py-1.5 bg-purple-600/80 hover:bg-purple-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}

                {/* 7. முதலமைச்சர் விரிவான மருத்துவக் காப்பீடு & AB-PMJAY */}
                {(insuranceSubTab === 'all' || insuranceSubTab === 'life') && (
                  <div className="bg-[#0d1b2e] border border-rose-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-rose-500/20 text-rose-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        ₹5 லட்சம் இலவச சிகிச்சை
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🏥 அரசு முதலமைச்சர் மருத்துவக் காப்பீடு</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        தமிழ்நாடு அரசு மற்றும் ஆயுஷ்மான் பாரத் இணைந்த கட்டணமில்லா அறுவை சிகிச்சை மற்றும் மருத்துவ உதவி.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• அரசு மற்றும் அங்கீகரிக்கப்பட்ட தனியார் மருத்துவமனை</li>
                        <li>• 1500+ சிகிச்சை மற்றும் அறுவை சிகிச்சைகள்</li>
                        <li>• குடும்ப அட்டை (Ration Card) அடிப்படை</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => alert("முதலமைச்சர் மருத்துவக் காப்பீடு: cmchistn.com அல்லது வட்டார மருத்துவமனையை அணுகவும்.")}
                      className="w-full mt-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white font-bold rounded-lg text-xs"
                    >
                      விவரங்கள் அறிய ↗
                    </button>
                  </div>
                )}

                {/* 8. குடும்ப நல மருத்துவ மெடிக்ளைம் (Private Health Mediclaim) */}
                {(insuranceSubTab === 'all' || insuranceSubTab === 'life') && (
                  <div className="bg-[#0d1b2e] border border-cyan-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        Cashless வசதி
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">🩺 குடும்பத் தனியார் மெடிக்ளைம்</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                        அனைத்து முன்னணி மல்டி-ஸ்பெஷாலிட்டி மருத்துவமனைகளிலும் பணமில்லா அவசர சிகிச்சை பாதுகாப்பு.
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5">
                        <li>• ₹5 லட்சம் முதல் ₹25 லட்சம் வரை கவரேஜ்</li>
                        <li>• முழு குடும்பத்திற்கும் ஒற்றைப் பாலிசி</li>
                        <li>• வரிச் சலுகை: Section 80D கீழ் உண்டு</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => alert("Mediclaim ஆலோசகர் உதவிக்கு: +91 98400 55682")}
                      className="w-full mt-3 py-1.5 bg-cyan-600/80 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs"
                    >
                      விண்ணப்பிக்க ↗
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* 6. கல்வி & படிப்பு (Education Hub) */}
      {currentModule === 'education' && (
        <div className="space-y-6">
          {/* தலைப்பு & அரசு நலத்திட்ட பேனர் */}
          <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full mb-2 border border-blue-500/40">
                  🎓 கல்வி & எதிர்கால வழிகாட்டி மையம்
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>நம்ம பூமி கல்வி 360</span>
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  "என்ன படித்தால் என்ன ஆகலாம்?" வழிகாட்டி • அரசு & தனியார் உதவித்தொகைகள் • இலவச விடுதிகள் & கல்விக் கடன்
                </p>
              </div>

              {/* சப்-டேப் பட்டன்கள் */}
              <div className="flex flex-wrap gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700">
                <button
                  onClick={() => setEducationSubTab('pathway')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    educationSubTab === 'pathway' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🎯 என்ன படித்தால் என்ன ஆகலாம்?
                </button>
                <button
                  onClick={() => setEducationSubTab('scholarships')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    educationSubTab === 'scholarships' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  💰 உதவித்தொகைகள் (Scholarships)
                </button>
                <button
                  onClick={() => setEducationSubTab('welfare')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    educationSubTab === 'welfare' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🏢 மாணவர் விடுதிகள் & கல்விக் கடன்
                </button>
              </div>
            </div>

            {/* முக்கிய அரசு சலுகைகள் அறிவிப்பு ஸ்ட்ரிப் */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-blue-500/20 flex items-center gap-2">
                <span className="text-pink-400 font-bold">👩 புதுமைப் பெண்:</span>
                <span className="text-slate-300">கல்லூரி மாணவிகளுக்கு மாதம் ₹1,000</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-blue-500/20 flex items-center gap-2">
                <span className="text-blue-400 font-bold">👨 தமிழ்ப் புதல்வன்:</span>
                <span className="text-slate-300">கல்லூரி மாணவர்களுக்கு மாதம் ₹1,000</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-blue-500/20 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">🏛️ 7.5% இடஒதுக்கீடு:</span>
                <span className="text-slate-300">அரசுப் பள்ளி மாணவர்களுக்கு முழுக் கட்டண விலக்கு</span>
              </div>
            </div>
          </div>

          {/* சப்-டேப் 1: என்ன படித்தால் என்ன ஆகலாம்? (Career Pathway) */}
          {educationSubTab === 'pathway' && (
            <div className="space-y-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <span>🎯 உங்கள் எதிர்காலக் கனவைத் தேர்ந்தெடுங்கள் (Select Career Goal):</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {[
                    { id: 'agri_officer', title: 'வேளாண் அலுவலர்', icon: '🌾' },
                    { id: 'bank_officer', title: 'வங்கி மேனேஜர்', icon: '🏦' },
                    { id: 'tech_ai', title: 'மென்பொருள் / AI', icon: '💻' },
                    { id: 'civil_service', title: 'IAS / IPS / DSP', icon: '🏛️' },
                    { id: 'doctor_nurse', title: 'மருத்துவர் / செவிலியர்', icon: '🏥' },
                    { id: 'entrepreneur', title: 'நவீன பண்ணைத் தொழில்', icon: '🚜' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedCareer(item.id)}
                      className={`p-2.5 rounded-xl text-center border transition flex flex-col items-center gap-1 ${
                        selectedCareer === item.id
                          ? 'bg-blue-600/30 border-blue-500 text-blue-200'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-xs font-semibold">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* தேர்ந்தெடுக்கப்பட்ட பணிக்கான வரைபடம் (Roadmap Card) */}
              {selectedCareer === 'agri_officer' && (
                <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                      🌾 வேளாண் அலுவலர் (Agricultural Officer / Bank AFO) ஆவதற்கான பாதை
                    </h4>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-md border border-emerald-500/30">
                      ஆரம்ப ஊதியம்: ₹40,000 - ₹65,000/மாதம்
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">1. பள்ளிப் படிப்பு (11 & 12)</p>
                      <p className="text-slate-300 leading-relaxed">பயாலஜி-மேக்ஸ் அல்லது தூய அறிவியல் (Pure Science) அல்லது வேளாண் தொழிற்கல்வி பிரிவு.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">2. கல்லூரி பட்டப்படிப்பு</p>
                      <p className="text-slate-300 leading-relaxed">B.Sc (Hons) Agriculture / Horticulture / Agricultural Engineering (TNAU & அங்கீகரிக்கப்பட்ட கல்லூரிகள்).</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">3. எழுத வேண்டிய தேர்வுகள்</p>
                      <p className="text-slate-300 leading-relaxed">TNPSC Agricultural Officer தேர்வு, வங்கி IBPS SO (Agriculture Field Officer) தேர்வு, அல்லது ICAR JRF.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">4. பணி வாய்ப்புகள்</p>
                      <p className="text-slate-300 leading-relaxed">தமிழக வேளாண் விரிவாக்கத் துறை, தேசியமயமாக்கப்பட்ட வங்கிகள், விதை & உரம் உற்பத்தி நிறுவனங்கள்.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("TNAU அதிகாரப்பூர்வ இணையதளம்: tnau.ac.in \nவிண்ணப்ப விவரங்கள் மற்றும் கட்-ஆப் மதிப்பெண்களை அங்கே சரிபார்க்கலாம்.")}
                    className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 rounded-xl text-xs font-semibold transition"
                  >
                    TNAU வேளாண் சேர்க்கை வழிகாட்டல் பார்க்க ↗
                  </button>
                </div>
              )}

              {selectedCareer === 'bank_officer' && (
                <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
                      🏦 வங்கி மேனேஜர் (Bank PO / Manager) ஆவதற்கான பாதை
                    </h4>
                    <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-md border border-blue-500/30">
                      ஆரம்ப ஊதியம்: ₹50,000 - ₹75,000/மாதம்
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">1. பள்ளிப் படிப்பு (11 & 12)</p>
                      <p className="text-slate-300 leading-relaxed">வணிகவியல் (Commerce), கணக்கியல், கணிதம் அல்லது ஏதேனும் ஒரு விருப்பப் பாடம்.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">2. கல்லூரி பட்டப்படிப்பு</p>
                      <p className="text-slate-300 leading-relaxed">B.Com, BBA, B.Sc, B.E அல்லது ஏதேனும் ஒரு பட்டப்படிப்பு (Any Degree with 50-60% marks).</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">3. எழுத வேண்டிய தேர்வுகள்</p>
                      <p className="text-slate-300 leading-relaxed">IBPS PO, SBI PO, RBI Grade B, கூட்டுறவு வங்கி உதவியாளர் தேர்வுகள்.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">4. பணி வாய்ப்புகள்</p>
                      <p className="text-slate-300 leading-relaxed">SBI, இந்தியன் வங்கி, கனரா வங்கி, கிராமப்புற வங்கிகள் மற்றும் முன்னணி தனியார் வங்கிகள்.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("IBPS அதிகாரப்பூர்வ போர்டல்: ibps.in \nஆண்டுதோறும் ஆகஸ்ட்-அக்டோபர் மாதங்களில் PO மற்றும் Clerk தேர்வுகள் நடத்தப்படும்.")}
                    className="w-full py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 rounded-xl text-xs font-semibold transition"
                  >
                    IBPS வங்கித் தேர்வு அறிவிப்புகளைப் பார்க்க ↗
                  </button>
                </div>
              )}

              {selectedCareer === 'tech_ai' && (
                <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                      💻 மென்பொருள் & செயற்கை நுண்ணறிவு (Software / AI Engineer)
                    </h4>
                    <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded-md border border-cyan-500/30">
                      ஆரம்ப ஊதியம்: ₹35,000 - ₹1,00,000/மாதம்
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">1. பள்ளிப் படிப்பு (11 & 12)</p>
                      <p className="text-slate-300 leading-relaxed">கணிதம் மற்றும் கணினி அறிவியல் அல்லது அறிவியல் பிரிவு (Maths mandatory).</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">2. கல்லூரி பட்டப்படிப்பு</p>
                      <p className="text-slate-300 leading-relaxed">B.E/B.Tech (CSE, IT, AI & Data Science) அல்லது BCA, B.Sc Computer Science.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">3. அவசியமான திறன்கள்</p>
                      <p className="text-slate-300 leading-relaxed">Python, SQL, Web Full Stack, AI & Cloud அடிப்படைகள் மற்றும் புராஜெக்ட் போர்ட்ஃபோலியோ.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">4. பணி வாய்ப்புகள்</p>
                      <p className="text-slate-300 leading-relaxed">சர்வதேச IT நிறுவனங்கள், ஸ்டார்ட்-அப்கள் மற்றும் வீட்டிலிருந்தே பணிபுரியும் தொலைதூர வேலைகள்.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("நான் முதல்வன் போர்டல்: naanmudhalvan.tn.gov.in \nகல்லூரி மாணவர்களுக்கான இலவச மென்பொருள் மற்றும் AI பயிற்சி வகுப்புகள்.")}
                    className="w-full py-2 bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200 rounded-xl text-xs font-semibold transition"
                  >
                    நான் முதல்வன் இலவச தொழில்நுட்பப் பயிற்சிகள் ↗
                  </button>
                </div>
              )}

              {selectedCareer === 'civil_service' && (
                <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                      🏛️ மாவட்ட ஆட்சியர் / டி.எஸ்.பி (IAS, IPS, TNPSC Group 1)
                    </h4>
                    <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-md border border-amber-500/30">
                      அரசு குரூப் 1 நிலை அதிகாரி
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">1. பள்ளிப் படிப்பு (11 & 12)</p>
                      <p className="text-slate-300 leading-relaxed">ஏதேனும் ஒரு பிரிவு (வரலாறு, தமிழ், வணிகவியல் அல்லது அறிவியல்).</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">2. கல்லூரி பட்டப்படிப்பு</p>
                      <p className="text-slate-300 leading-relaxed">அங்கீகரிக்கப்பட்ட ஏதேனும் ஒரு பட்டப்படிப்பு (Any UG Degree - B.A, B.Sc, B.Com, B.E).</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">3. எழுத வேண்டிய தேர்வுகள்</p>
                      <p className="text-slate-300 leading-relaxed">UPSC Civil Services (IAS/IPS) அல்லது TNPSC Group 1 (துணை ஆட்சியர், DSP) தேர்வுகள்.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">4. தயாரிப்பு முறை</p>
                      <p className="text-slate-300 leading-relaxed">NCERT & சமச்சீர் கல்வி புத்தகங்கள், தினசரி நாளிதழ் வாசிப்பு, பொது அறிவு மற்றும் நடப்பு நிகழ்வுகள்.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("TNPSC அதிகாரப்பூர்வ தளம்: tnpsc.gov.in \nகுரூப் 1, 2, மற்றும் 4 தேர்வு அறிவிப்புகளுக்கு இதில் விண்ணப்பிக்கலாம்.")}
                    className="w-full py-2 bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 rounded-xl text-xs font-semibold transition"
                  >
                    TNPSC அதிகாரப்பூர்வ தேர்வு போர்டல் ↗
                  </button>
                </div>
              )}

              {selectedCareer === 'doctor_nurse' && (
                <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                      🏥 மருத்துவம் & துணை மருத்துவம் (MBBS, BDS, Nursing, Allied Health)
                    </h4>
                    <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 text-xs font-semibold rounded-md border border-rose-500/30">
                      மக்களுக்கான மருத்துவச் சேவை
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">1. பள்ளிப் படிப்பு (11 & 12)</p>
                      <p className="text-slate-300 leading-relaxed">இயற்பியல், வேதியியல், உயிரியல் (Biology / Maths mandatory).</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">2. கல்லூரி பட்டப்படிப்பு</p>
                      <p className="text-slate-300 leading-relaxed">MBBS, BDS, B.Sc Nursing, B.Pharm, கார்டியாக் டெக்னாலஜி, ரேடியாலஜி.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">3. நுழைவுத் தேர்வுகள்</p>
                      <p className="text-slate-300 leading-relaxed">மருத்துவத்திற்கு NEET UG கட்டாயம்; நர்சிங் மற்றும் பாராமெடிக்கலுக்கு 12-ஆம் வகுப்பு கட்-ஆப் மதிப்பெண்.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">4. சிறப்புச் சலுகை</p>
                      <p className="text-slate-300 leading-relaxed">தமிழக அரசுப் பள்ளி மாணவர்களுக்கு 7.5% மருத்துவ உள்ஒதுக்கீடு மற்றும் முழு கட்டணச் சலுகை உண்டு.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("மருத்துவக் கலந்தாய்வு தேர்வுக் குழு போர்டல்: tnmedicalselection.net \nNEET மற்றும் பாராமெடிக்கல் சேர்க்கை விவரங்களை இங்கே பெறலாம்.")}
                    className="w-full py-2 bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/50 text-rose-200 rounded-xl text-xs font-semibold transition"
                  >
                    TN மருத்துவக் கல்வி சேர்க்கை வழிகாட்டல் ↗
                  </button>
                </div>
              )}

              {selectedCareer === 'entrepreneur' && (
                <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-lg font-bold text-lime-400 flex items-center gap-2">
                      🚜 நவீன பண்ணை & வேளாண் மதிப்புக்கூட்டு தொழில்முனைவோர்
                    </h4>
                    <span className="px-2.5 py-1 bg-lime-500/20 text-lime-300 text-xs font-semibold rounded-md border border-lime-500/30">
                      சுயதொழில் & வேலை தருபவர்
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">1. கல்வித் தகுதி</p>
                      <p className="text-slate-300 leading-relaxed">10th, 12th, ITI, அக்ரி டிப்ளமோ அல்லது ஏதேனும் ஒரு பட்டப்படிப்பு போதுமானது.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">2. தொழில் வாய்ப்புகள்</p>
                      <p className="text-slate-300 leading-relaxed">நாட்டுக்கோழி பண்ணை, பால் பண்ணை, சொட்டுநீர் பாசனம், இயற்கை உரம், உணவு பதப்படுத்துதல்.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">3. அரசு மானியங்கள்</p>
                      <p className="text-slate-300 leading-relaxed">PMEGP திட்டம் (35% வரை மானியம்), அக்ரி கிளினிக் (ACABC) திட்டம், மற்றும் NEEDS திட்டம்.</p>
                    </div>
                    <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-blue-400 font-bold mb-1">4. பயிற்சி மையங்கள்</p>
                      <p className="text-slate-300 leading-relaxed">மாவட்ட வேளாண்மை அறிவியல் மையம் (KVK) மற்றும் நபார்டு (NABARD) பயிற்சி மையங்கள்.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("KVK மாவட்ட மையங்கள் மற்றும் MSME வழிகாட்டலுக்கு மாவட்ட தொழில் மையம் (DIC)-ஐ அணுகலாம்.")}
                    className="w-full py-2 bg-lime-600/30 hover:bg-lime-600/50 border border-lime-500/50 text-lime-200 rounded-xl text-xs font-semibold transition"
                  >
                    வேளாண் தொழில் முனைவோர் மானியங்கள் பார்க்க ↗
                  </button>
                </div>
              )}
            </div>
          )}

          {/* சப்-டேப் 2: உதவித்தொகைகள் & அறக்கட்டளைகள் (Scholarships) */}
          {educationSubTab === 'scholarships' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'அகரம் பவுண்டேஷன் (Agaram Foundation)',
                  badge: 'முழு கல்விக் கட்டணம் + தங்குமிடம்',
                  desc: 'கிராமப்புற மற்றும் ஏழை எளிய குடும்பங்களைச் சேர்ந்த முதல் தலைமுறை மாணவர்களுக்கான முழு கல்விக் கட்டணம்.',
                  target: '12-ஆம் வகுப்பில் சிறந்த மதிப்பெண் பெற்ற ஏழை மாணவர்கள்',
                  action: () => alert("அகரம் பவுண்டேஷன் தொடர்பு எண்: 8448448948 \nஇணையதளம்: agaram.in \nவிண்ணப்பப் படிவங்களை இணையவழியாகப் பெறலாம்.")
                },
                {
                  title: 'புதுமைப் பெண் & தமிழ்ப் புதல்வன் திட்டம்',
                  badge: 'மாதம் ₹1,000 நேரடி வங்கி வரவு',
                  desc: 'அரசுப் பள்ளிகளில் 6 முதல் 12 வரை படித்து கல்லூரியில் சேரும் அனைத்து மாணவிகளுக்கும் மாணவர்களுக்கும் மாதம் ₹1,000.',
                  target: 'அரசுப் பள்ளி மாணவர்கள் (UG படிப்பு முடியும் வரை)',
                  action: () => alert("விண்ணப்பிக்கும் முறை: நீங்கள் படிக்கும் கல்லூரி அலுவலகம் மூலமாக UMIS போர்ட்டலில் சான்றிதழ் சமர்ப்பிக்க வேண்டும்.")
                },
                {
                  title: 'முதல் தலைமுறை பட்டதாரி சலுகை',
                  badge: 'முழு கல்விக் கட்டண விலக்கு',
                  desc: 'குடும்பத்தில் முதல் பட்டதாரியாக பொறியியல் மற்றும் மருத்துவக் கலந்தாய்வில் சேரும் மாணவர்களுக்கான கல்விக் கட்டண விலக்கு.',
                  target: 'குடும்பத்தில் வேறு பட்டதாரிகள் இல்லாத மாணவர்கள்',
                  action: () => alert("சான்றிதழ் பெறும் முறை: இ-சேவை மையம் மூலம் 'முதல் தலைமுறை பட்டதாரி சான்றிதழ்' (First Graduate Certificate) பெற்று சமர்ப்பிக்கவும்.")
                },
                {
                  title: 'வித்யாசாரதி போர்டல் (Vidyasaarathi NSDL)',
                  badge: 'ஆண்டுக்கு ₹20,000 முதல் ₹50,000',
                  desc: 'டாடா, ஏசிசி, அப்பல்லோ போன்ற 50-க்கும் மேற்பட்ட கார்ப்பரேட் நிறுவனங்களின் CSR கல்வி உதவித்தொகை ஒரே தளத்தில்.',
                  target: 'ITI, பாலிடெக்னிக், மற்றும் டிகிரி மாணவர்கள்',
                  action: () => alert("வித்யாசாரதி இணையதளம்: vidyasaarathi.co.in \nதளத்தில் பதிவு செய்து நிறுவனங்களின் ஸ்காலர்ஷிப்களுக்கு நேரடியாக விண்ணப்பிக்கலாம்.")
                },
                {
                  title: 'ரிலையன்ஸ் பவுண்டேஷன் உதவித்தொகை',
                  badge: 'ஆண்டுக்கு ₹2,00,000 வரை',
                  desc: 'இளங்கலை மற்றும் முதுகலை பயிலும் பொருளாதாரத்தில் பின்தங்கிய திறமை வாய்ந்த மாணவர்களுக்கான கல்வி உதவி நிதி.',
                  target: 'குடும்ப ஆண்டு வருமானம் ₹15 லட்சத்திற்குள் உள்ள மாணவர்கள்',
                  action: () => alert("ரிலையன்ஸ் பவுண்டேஷன் போர்டல்: scholarships.reliancefoundation.org \nஆண்டுதோறும் நுழைவுத் தேர்வு அடிப்படையில் தேர்வு செய்யப்படும்.")
                },
                {
                  title: 'HDFC பரிவர்த்தன் கல்வி நிதி (ECSS)',
                  badge: 'ஆண்டுக்கு ₹30,000 முதல் ₹75,000',
                  desc: 'குடும்பத்தில் எதிர்பாராத நிதி நெருக்கடி அல்லது பெற்றோர் இழப்பு ஏற்பட்ட பள்ளி, கல்லூரி மாணவர்களின் தொடர் கல்விக்கான உதவி.',
                  target: '1 முதல் 12 வகுப்பு, டிப்ளமோ, டிகிரி & PG மாணவர்கள்',
                  action: () => alert("HDFC போர்டல்: buddy4study.com/page/hdfc-bank-parivartan-ecss-programme \nவிண்ணப்ப விவரங்களை போர்ட்டலில் காணலாம்.")
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-blue-500/50 transition">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="text-sm font-bold text-white leading-tight">{item.title}</h4>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30 whitespace-nowrap">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.desc}</p>
                    <div className="bg-slate-800/60 p-2 rounded-lg text-[11px] text-slate-400 mb-4 border border-slate-700/60">
                      <strong className="text-slate-300">தகுதி: </strong>{item.target}
                    </div>
                  </div>
                  <button
                    onClick={item.action}
                    className="w-full py-2 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition border border-slate-700 hover:border-blue-500"
                  >
                    விவரம் & தொடர்பு எண்கள் ↗
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* சப்-டேப் 3: மாணவர் விடுதிகள் & கல்விக் கடன் (Student Welfare) */}
          {educationSubTab === 'welfare' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-2xl">🏢</span>
                <h4 className="text-base font-bold text-white">இலவச அரசு மாணவர் விடுதிகள்</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  பிற்படுத்தப்பட்டோர் (BC/MBC) மற்றும் ஆதிதிராவிடர் நலத்துறை மூலமாக அனைத்து மாவட்டத் தலைநகரங்களிலும் இலவச உணவு மற்றும் தங்குமிட விடுதிகள் இயங்குகின்றன.
                </p>
                <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-emerald-400 space-y-1">
                  <p>✔ முற்றிலும் இலவச உணவு & தங்குமிடம்</p>
                  <p>✔ கல்லூரி படிக்கும் வரை தங்கலாம்</p>
                </div>
                <button
                  onClick={() => alert("விண்ணப்பிக்கும் தளம்: tnbchostels.in மற்றும் adwhostels.tn.gov.in \nமாவட்ட கலெக்டர் அலுவலக நலத்துறை மூலமும் விண்ணப்பிக்கலாம்.")}
                  className="w-full py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 rounded-lg text-xs font-semibold transition"
                >
                  அரசு விடுதி போர்ட்டலில் விண்ணப்பிக்க ↗
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-2xl">💳</span>
                <h4 className="text-base font-bold text-white">CSIS வட்டியில்லாக் கல்விக் கடன்</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  மத்திய அரசின் CSIS திட்டத்தின் கீழ், குடும்ப ஆண்டு வருமானம் ₹4.5 லட்சத்திற்குள் உள்ள மாணவர்களுக்கு கல்லூரி படிக்கும் காலம் வரை முழுக் கடன் வட்டியை அரசே ஏற்கும்.
                </p>
                <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-emerald-400 space-y-1">
                  <p>✔ படிக்கும் போது வட்டி கட்ட வேண்டாம்</p>
                  <p>✔ வேலை கிடைத்த 1 ஆண்டுக்கு பின் திருப்பிச் செலுத்தலாம்</p>
                </div>
                <button
                  onClick={() => alert("வித்யா லக்ஷ்மி அதிகாரப்பூர்வ போர்டல்: vidyalakshmi.co.in \nஅனைத்து வங்கிகளின் கல்விக் கடன்களுக்கும் இந்த ஒரே தளத்தில் விண்ணப்பிக்கலாம்.")}
                  className="w-full py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 rounded-lg text-xs font-semibold transition"
                >
                  வித்யா லக்ஷ்மி கல்விக் கடன் போர்டல் ↗
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-2xl">💼</span>
                <h4 className="text-base font-bold text-white">NATS படிக்கும்போதே உதவித்தொகை வேலை</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  மத்திய அரசின் தேசிய அப்ரண்டிஸ்ஷிப் (NATS) மூலம் டிப்ளமோ மற்றும் டிகிரி முடித்த/படிக்கும் மாணவர்களுக்கு முன்னணி நிறுவனங்களில் ஊக்கத்தொகையுடன் தொழிற்பயிற்சி.
                </p>
                <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-emerald-400 space-y-1">
                  <p>✔ மாதம் ₹9,000 முதல் ₹15,000 ஊக்கத்தொகை</p>
                  <p>✔ அரசு அங்கீகரிக்கப்பட்ட பணி அனுபவ சான்றிதழ்</p>
                </div>
                <button
                  onClick={() => alert("NATS அதிகாரப்பூர்வ போர்டல்: nats.education.gov.in \nபதிவு செய்து தொழிற்சாலைப் பயிற்சிக்கு நேரடியாக விண்ணப்பிக்கலாம்.")}
                  className="w-full py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 rounded-lg text-xs font-semibold transition"
                >
                  NATS போர்ட்டலில் பதிவு செய்ய ↗
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* 7. வேலைவாய்ப்பு & வழிகாட்டல் (Jobs Hub) */}
      {currentModule === 'jobs' && (
        <div className="space-y-6">
          {/* தலைப்பு & போலி வேலை மோசடி தடுப்பு விழிப்புணர்வு பேனர் */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full mb-2 border border-emerald-500/40">
                  💼 வேலைவாய்ப்பு & திறன் வழிகாட்டி
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>நம்ம பூமி வேலைவாய்ப்பு 360</span>
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  நேரடி அரசு & தனியார் பணிகள் • மாவட்ட முகாம்கள் • வெளிநாட்டு வேலைகள் (OMCL) • WFH வாய்ப்புகள்
                </p>
              </div>

              {/* சப்-டேப் பட்டன்கள் */}
              <div className="flex flex-wrap gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700">
                <button
                  onClick={() => setJobsSubTab('govt')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    jobsSubTab === 'govt' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🏛️ அரசுப் பணிகள்
                </button>
                <button
                  onClick={() => setJobsSubTab('private')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    jobsSubTab === 'private' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🏢 தனியார் & தொழிற்துறை
                </button>
                <button
                  onClick={() => setJobsSubTab('wfh')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    jobsSubTab === 'wfh' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🏠 வீட்டிலிருந்தே வேலை / Gig
                </button>
                <button
                  onClick={() => setJobsSubTab('safety')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    jobsSubTab === 'safety' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🛡️ வெளிநாட்டு வேலை & பாதுகாப்பு
                </button>
              </div>
            </div>

            {/* வேலை தேடுவோர் பாதுகாப்பு எச்சரிக்கை ஸ்ட்ரிப் */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
                <span className="text-base">⚠️</span>
                <span><strong>பொன்விதி:</strong> நேர்மையான எந்தவொரு நிறுவனமும் வேலைக்காக முன்பணம் கேட்பதில்லை!</span>
              </div>
              <div className="text-slate-400">
                அரசு உதவி மையம்: <strong className="text-emerald-400">155255</strong> (சைபர் கிரைம் உதவி)
              </div>
            </div>
          </div>

          {/* சப்-டேப் 1: அரசுப் பணிகள் (Govt Jobs) */}
          {jobsSubTab === 'govt' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'TNPSC அரசுப் பணிகள் (Group 4, 2, 1)',
                  badge: '10th / Any Degree',
                  dept: 'தமிழக அரசுப் பணியாளர் தேர்வாணையம்',
                  roles: 'VAO, இளநிலை உதவியாளர், தட்டச்சர், சப்-கலெக்டர்',
                  action: () => alert("TNPSC போர்டல்: tnpsc.gov.in \nஒருமுறை பதிவு (OTR) செய்து விண்ணப்பிக்கலாம்.")
                },
                {
                  title: 'TNUSRB சீருடைப் பணியாளர் தேர்வு',
                  badge: '10th Pass / Degree',
                  dept: 'தமிழ்நாடு சீருடைப் பணியாளர் தேர்வு வாரியம்',
                  roles: 'இரண்டாம் நிலை காவலர், தீயணைப்பாளர், சப்-இன்ஸ்பெக்டர் (SI)',
                  action: () => alert("TNUSRB போர்டல்: tnusrb.tn.gov.in \nஉடற்தகுதி மற்றும் எழுத்துத்தேர்வு வழிகாட்டல் தளத்தில் உள்ளது.")
                },
                {
                  title: 'ரயில்வே பணியாளர் வாரியம் (RRB)',
                  badge: '10th / ITI / Degree',
                  dept: 'இந்திய ரயில்வே (தெற்கு ரயில்வே)',
                  roles: 'குரூப் D, அசிஸ்டென்ட் லோகோ பைலட் (ALP), NTPC கிளார்க்',
                  action: () => alert("RRB சென்னை இணையதளம்: rrbchennai.gov.in \nஅனைத்து தேர்வுகளும் தமிழ் மொழியிலும் எழுதலாம்.")
                },
                {
                  title: 'அஞ்சல் துறை நேரடி வேலைகள் (India Post)',
                  badge: '10-ஆம் வகுப்பு மதிப்பெண் போதும்',
                  dept: 'இந்திய அஞ்சல் துறை (GDS)',
                  roles: 'கிராமின் டாக் சேவக் (GDS), கிளை போஸ்ட்மாஸ்டர்',
                  action: () => alert("India Post GDS போர்டல்: indiapostgdsonline.gov.in \nஎழுத்துத்தேர்வு கிடையாது; 10th மதிப்பெண் அடிப்படையில் நேரடித் தேர்வு.")
                },
                {
                  title: 'வங்கிப் பணிகள் (IBPS & SBI)',
                  badge: 'ஏதேனும் ஒரு பட்டப்படிப்பு',
                  dept: 'தேசியமயமாக்கப்பட்ட வங்கிகள்',
                  roles: 'கிளார்க் (Clerk), புரொபேஷனரி ஆபிசர் (PO), அக்ரி ஆபிசர்',
                  action: () => alert("IBPS போர்டல்: ibps.in \nவருடாந்திரத் தேர்வு அட்டவணையை தளத்தில் சரிபார்க்கவும்.")
                },
                {
                  title: 'தமிழ்நாடு மாவட்ட வேலைவாய்ப்பு மையம்',
                  badge: 'அனைத்து கல்வித் தகுதியும்',
                  dept: 'வேலைவாய்ப்பு & பயிற்சித் துறை',
                  roles: 'அரசுப் பணி பதிவு மற்றும் மூப்பு நிலை (Seniority Renewal)',
                  action: () => alert("வேலைவாய்ப்பு போர்டல்: tnvelaivaaippu.gov.in \nபள்ளி/கல்லூரி சான்றிதழ்களைப் பதிவு செய்து 3 ஆண்டுகளுக்கு ஒருமுறை புதுப்பிக்கவும்.")
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/50 transition">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="text-sm font-bold text-white leading-tight">{item.title}</h4>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">துறை: {item.dept}</p>
                    <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-slate-300 mb-4 border border-slate-700/60">
                      <strong className="text-emerald-400">முக்கியப் பதவிகள்: </strong>{item.roles}
                    </div>
                  </div>
                  <button
                    onClick={item.action}
                    className="w-full py-2 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition border border-slate-700 hover:border-emerald-500"
                  >
                    அதிகாரப்பூர்வ தளம் செல்ல ↗
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* சப்-டேப் 2: தனியார் & தொழிற்துறை (Private Jobs) */}
          {jobsSubTab === 'private' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-2xl">🏭</span>
                  <h4 className="text-base font-bold text-white">உற்பத்தி & ஆட்டோமொபைல் தொழிற்துறை</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    சென்னை, ஓசூர், கோவை மற்றும் ஸ்ரீபெரும்புதூர் தொழிற்பேட்டைகளில் ITI, டிப்ளமோ மற்றும் பொறியியல் முடித்தவர்களுக்கான வேலைகள்.
                  </p>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-slate-300 space-y-1">
                    <p>• CNC ஆபரேட்டர், அசெம்பிளி லைன் டெக்னீசியன்</p>
                    <p>• சம்பளம்: ₹15,000 - ₹28,000 + உணவு & தங்குமிடம்</p>
                  </div>
                  <button
                    onClick={() => alert("தேசிய தொழில் சேவை போர்டல்: ncs.gov.in \nமத்திய அரசின் இலவச வேலைவாய்ப்பு போர்டல்.")}
                    className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 rounded-lg text-xs font-semibold transition"
                  >
                    NCS போர்ட்டலில் பதிவு செய்ய ↗
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-2xl">💻</span>
                  <h4 className="text-base font-bold text-white">IT & மென்பொருள் நிறுவனங்கள்</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    B.E, B.Tech, BCA, B.Sc முடித்த பிரஷ்ஷர்களுக்கான ஜூனியர் டெவலப்பர், டெஸ்டிங், டேட்டா என்ட்ரி மற்றும் சப்போர்ட் ரோல்கள்.
                  </p>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-slate-300 space-y-1">
                    <p>• தேவையானவை: Python/Java, SQL, ஆங்கிலத் தொடர்பு</p>
                    <p>• தொடக்க ஊதியம்: ₹25,000 - ₹45,000/மாதம்</p>
                  </div>
                  <button
                    onClick={() => alert("LinkedIn & Naukri தளங்களில் உங்கள் ரெஸ்யூமை இலவசமாகப் பதிவேற்றி நிறுவனங்களை அணுகலாம்.")}
                    className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 rounded-lg text-xs font-semibold transition"
                  >
                    முன்னணி IT போர்ட்டல்கள் பார்க்க ↗
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-2xl">🎪</span>
                  <h4 className="text-base font-bold text-white">மாவட்ட மாபெரும் தனியார் வேலைவாய்ப்பு முகாம்கள்</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    தமிழக அரசால் மாதம் தோறும் அனைத்து மாவட்டத் தலைநகரங்களிலும் இலவசமாக நடத்தப்படும் நேரடி கேம்பஸ் இன்டர்வியூ முகாம்கள்.
                  </p>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-slate-300 space-y-1">
                    <p>• 8th பாஸ் முதல் டிகிரி வரை அனைவருக்கும் வேலை</p>
                    <p>• ஒரே நாளில் 50+ நிறுவனங்களின் நேரடித் தேர்வு</p>
                  </div>
                  <button
                    onClick={() => alert("தனியார் வேலைவாய்ப்பு முகாம் போர்டல்: tnprivatejobs.tn.gov.in \nமாவட்ட வாரியான முகாம் தேதிகளை இதில் அறியலாம்.")}
                    className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 rounded-lg text-xs font-semibold transition"
                  >
                    அடுத்த முகாம் தேதி அறிய ↗
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* சப்-டேப் 3: வீட்டிலிருந்தே வேலை & பகுதிநேரம் (WFH & Gig) */}
          {jobsSubTab === 'wfh' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-2xl">👩‍💻</span>
                <h4 className="text-base font-bold text-white">பெண்கள் & மாணவர்களுக்கான WFH</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  வீட்டிலிருந்தே லேப்டாப் அல்லது மொபைல் மூலம் செய்யக்கூடிய வாடிக்கையாளர் சேவை (Tele-calling), டேட்டா என்ட்ரி மற்றும் தமிழ்/ஆங்கில தட்டச்சு பணிகள்.
                </p>
                <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-emerald-400 space-y-1">
                  <p>✔ விருப்பமான நேரத் தேர்வு (Flexible hours)</p>
                  <p>✔ சம்பாத்தியம்: ₹10,000 - ₹22,000/மாதம்</p>
                </div>
                <button
                  onClick={() => alert("முக்கிய நிறுவன போர்ட்டல்கள்: Amazon Virtual Customer Care, Flipkart Customer Support. அதிகாரப்பூர்வ தளங்கள் மூலம் மட்டுமே விண்ணப்பிக்கவும்.")}
                  className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 rounded-lg text-xs font-semibold transition"
                >
                  நம்பகமான WFH நிறுவனங்கள் ↗
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-2xl">🛵</span>
                <h4 className="text-base font-bold text-white">உள்ளூர் டெலிவரி & ஜிக் பணிகள் (Gig Economy)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  பைக் மற்றும் ஸ்மார்ட்போன் உள்ள இளைஞர்கள் உள்ளூரிலேயே பகுதிநேரமாகவோ முழுநேரமாகவோ தினசரி வருமானம் ஈட்டும் வாய்ப்பு.
                </p>
                <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-emerald-400 space-y-1">
                  <p>✔ Swiggy, Zomato, Porter, Amazon Flex</p>
                  <p>✔ வாராந்திர நேரடி வங்கி வரவு (Weekly Payout)</p>
                </div>
                <button
                  onClick={() => alert("தேவையான ஆவணங்கள்: ஆதார் அட்டை, டிரைவிங் லைசென்ஸ், RC புக் மற்றும் வங்கி கணக்கு புத்தகம்.")}
                  className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 rounded-lg text-xs font-semibold transition"
                >
                  டெலிவரி பார்ட்னர் இணைவு விவரம் ↗
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-2xl">✍️</span>
                <h4 className="text-base font-bold text-white">ஃப்ரீலான்சிங் & டிஜிட்டல் கிரியேட்டர்</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  போட்டோஷாப், வீடியோ எடிட்டிங், இணையதள வடிவமைப்பு, மொழிபெயர்ப்பு (Translation) பணிகளைத் தனிப்பட்ட முறையில் செய்து சம்பாதிக்கும் முறை.
                </p>
                <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-emerald-400 space-y-1">
                  <p>✔ Upwork, Fiverr போன்ற உலகளாவிய தளங்கள்</p>
                  <p>✔ திறமைக்கேற்ப வரம்பற்ற வருவாய் வாய்ப்பு</p>
                </div>
                <button
                  onClick={() => alert("Fiverr & Upwork தளங்களில் கணக்கு தொடங்கி உங்கள் முந்தைய மாதிரி பணிகளை (Portfolio) இணைத்து ஆர்டர்களைப் பெறலாம்.")}
                  className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 rounded-lg text-xs font-semibold transition"
                >
                  ஃப்ரீலான்சிங் வழிகாட்டல் ↗
                </button>
              </div>
            </div>
          )}

          {/* சப்-டேப் 4: வெளிநாட்டு வேலை & பாதுகாப்பு (Overseas & Safety) */}
          {jobsSubTab === 'safety' && (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span>✈️ தமிழ்நாடு அரசு வெளிநாட்டு வேலைவாய்ப்பு நிறுவனம் (OMCL)</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  துபாய், சிங்கப்பூர், மலேசியா, இங்கிலாந்து, சவுதி அரேபியா உள்ளிட்ட நாடுகளுக்கு செவிலியர்கள், டெக்னீசியன்கள், மற்றும் தொழிற்பணியாளர்களை அரசு மூலமாகப் பாதுகாப்பாக அனுப்பும் ஒரே நிறுவனம் OMCL.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-4">
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                    <p className="font-bold text-emerald-400 mb-1">100% அரசு உத்தரவாதம்</p>
                    <p className="text-slate-300">போலி விசா மற்றும் பாஸ்போர்ட் பறிமுதல் அபாயம் இல்லை.</p>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                    <p className="font-bold text-emerald-400 mb-1">குறைந்தபட்ச அரசு கட்டணம்</p>
                    <p className="text-slate-300">தனியார் ஏஜென்ட்கள் கேட்கும் லட்சக்கணக்கான கட்டணம் தேவையில்லை.</p>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                    <p className="font-bold text-emerald-400 mb-1">உரிய விசா & ஒப்பந்தம்</p>
                    <p className="text-slate-300">சட்டப்பூர்வ வேலை விசா மற்றும் பணிப் பாதுகாப்பு.</p>
                  </div>
                </div>
                <button
                  onClick={() => alert("OMCL அதிகாரப்பூர்வ தளம்: omcmanpower.tn.gov.in \nதொலைபேசி எண்: 044-22505886 / 22502267 \nகிண்டி, சென்னை முகவரியிலும் அணுகலாம்.")}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition shadow-lg"
                >
                  OMCL அரசு போர்ட்டலில் வெளிநாட்டு வேலைக்கு விண்ணப்பிக்க ↗
                </button>
              </div>

              {/* போலி வேலை மோசடிகளை அடையாளம் காணும் 4 விதிகள் */}
              <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5">
                <h4 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
                  <span>🚫 போலி வேலை மோசடிகளில் இருந்து தப்பிக்க 4 அவசியமான விதிகள்:</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="text-red-400 font-bold">1.</span>
                    <p className="text-slate-300"><strong>முன்பணம் கட்டச் சொன்னால் உடனே நிராகரியுங்கள்:</strong> ரெஜிஸ்ட்ரேஷன் கட்டணம், யூனிஃபார்ம் கட்டணம் என ஒரு ரூபாய் கூட கட்ட வேண்டாம்.</p>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="text-red-400 font-bold">2.</span>
                    <p className="text-slate-300"><strong>டெலிகிராம் & வாட்ஸ்அப் வேலை அறிவிப்புகள்:</strong> அரசுத் துறை மற்றும் அஞ்சல் துறை ஆணை வாட்ஸ்அப்பில் வராது; அஞ்சல் அல்லது அதிகாரப்பூர்வ தளம் மூலம் மட்டுமே வரும்.</p>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="text-red-400 font-bold">3.</span>
                    <p className="text-slate-300"><strong>ஏஜென்ட் உரிமம் சரிபார்க்கவும்:</strong> வெளிநாட்டு வேலைக்கு அனுப்பும் ஏஜென்சியிடம் மத்திய வெளியுறவு அமைச்சகத்தின் (MEA) பதிவு எண் உள்ளதா எனப் பாருங்கள்.</p>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="text-red-400 font-bold">4.</span>
                    <p className="text-slate-300"><strong>மோசடி நடந்தால் உடனே புகார்:</strong> பணத்தை இழந்தால் முதல் 2 மணி நேரத்திற்குள் <strong>1930</strong> அல்லது <strong>cybercrime.gov.in</strong> தளத்தில் புகார் அளியுங்கள்.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* 8. தொழில் & MSME (Business Hub) */}
      {currentModule === 'business' && (
        <div className="space-y-6">
          {/* தலைப்பு & உத்யம் இலவச பதிவு பேனர் */}
          <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-orange-950/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-full mb-2 border border-amber-500/40">
                  🏭 குறு, சிறு & நடுத்தர தொழில் வழிகாட்டி
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>நம்ம பூமி தொழில் & MSME 360</span>
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  அரசு மானியங்கள் (PMEGP, NEEDS) • பிணையில்லாக் கடன்கள் • PM விஸ்வகர்மா • உத்யம் & FSSAI வழிகாட்டல்
                </p>
              </div>

              {/* சப்-டேப் பட்டன்கள் */}
              <div className="flex flex-wrap gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700">
                <button
                  onClick={() => setBusinessSubTab('schemes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    businessSubTab === 'schemes' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🏛️ அரசு மானியங்கள் & கால்குலேட்டர்
                </button>
                <button
                  onClick={() => setBusinessSubTab('vishwakarma')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    businessSubTab === 'vishwakarma' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔨 விஸ்வகர்மா & உணவுப் பதப்படுத்துதல்
                </button>
                <button
                  onClick={() => setBusinessSubTab('women')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    businessSubTab === 'women' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  👩‍💼 மகளிர் & சுயஉதவிக் குழுக்கள்
                </button>
                <button
                  onClick={() => setBusinessSubTab('compliance')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    businessSubTab === 'compliance' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📋 உரிமங்கள் & DPR வழிகாட்டி
                </button>
              </div>
            </div>

            {/* குறுந்தகவல் அறிவிப்பு */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <span className="text-base">💡</span>
                <span><strong>முக்கியத் தகவல்:</strong> மத்திய அரசின் உத்யம் (Udyam) பதிவு முற்றிலும் இலவசம்; தனியார் ஏஜென்ட்களுக்குப் பணம் தர வேண்டாம்!</span>
              </div>
              <div className="text-slate-400">
                மாவட்ட தொழில் மையம் (DIC): <strong className="text-amber-400">ஒவ்வொரு மாவட்ட ஆட்சியர் அலுவலகத்திலும் உள்ளது</strong>
              </div>
            </div>
          </div>

          {/* சப்-டேப் 1: அரசு மானியங்கள் & கால்குலேட்டர் */}
          {businessSubTab === 'schemes' && (
            <div className="space-y-6">
              {/* இன்டராக்டிவ் PMEGP தொழில் மானியம் கணக்கீட்டுக் கருவி */}
              <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>🧮 PMEGP தொழில் மானியம் கணக்கீட்டுக் கருவி (Subsidy Calculator)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">உங்கள் திட்ட மதிப்பீட்டிற்கு அரசு தரும் நேரடி மானியத்தைக் கணக்கிடுங்கள்</p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-md border border-amber-500/30 self-start sm:self-auto">
                    35% வரை மானியம்
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* திட்ட மதிப்பீடு */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-semibold">திட்ட மொத்த மதிப்பீடு (Project Cost):</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="100000"
                        max="5000000"
                        step="50000"
                        value={bizProjectCost}
                        onChange={(e) => setBizProjectCost(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div className="text-amber-400 font-bold text-sm bg-slate-800/80 p-2 rounded-lg text-center border border-slate-700">
                      ₹{bizProjectCost.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* சமூகப் பிரிவு */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-semibold">விண்ணப்பதாரர் பிரிவு:</label>
                    <select
                      value={bizCategory}
                      onChange={(e) => setBizCategory(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="special">சிறப்புப் பிரிவு (பெண்கள் / SC / ST / BC / MBC / சிறுபான்மையினர்)</option>
                      <option value="general">பொதுப் பிரிவு (General Category)</option>
                    </select>
                    <p className="text-[11px] text-slate-400">சிறப்புப் பிரிவினருக்கு கூடுதல் மானியம் & குறைந்த முதலீடு</p>
                  </div>

                  {/* பகுதி தேர்வு */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-semibold">தொழில் அமையுமிடம்:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setBizLocation('rural')}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold transition border ${
                          bizLocation === 'rural' ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        🌾 கிராமப்புறம்
                      </button>
                      <button
                        type="button"
                        onClick={() => setBizLocation('urban')}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold transition border ${
                          bizLocation === 'urban' ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        🏙️ நகர்ப்புறம்
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">கிராமப்புறத் தொழில்களுக்கு 10% கூடுதல் மானியம்</p>
                  </div>
                </div>

                {/* கால்குலேட்டர் முடிவுகள் */}
                {(() => {
                  const ownPct = bizCategory === 'special' ? 5 : 10;
                  const subsidyPct = bizCategory === 'special'
                    ? (bizLocation === 'rural' ? 35 : 25)
                    : (bizLocation === 'rural' ? 25 : 15);
                  const bankLoanPct = 100 - ownPct - subsidyPct;

                  const ownAmt = Math.round((bizProjectCost * ownPct) / 100);
                  const subsidyAmt = Math.round((bizProjectCost * subsidyPct) / 100);
                  const bankLoanAmt = Math.round((bizProjectCost * bankLoanPct) / 100);

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-center">
                      <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                        <p className="text-[11px] text-slate-400">உங்கள் சொந்த முதலீடு ({ownPct}%):</p>
                        <p className="text-base font-bold text-white mt-1">₹{ownAmt.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40">
                        <p className="text-[11px] text-emerald-300 font-semibold">அரசு வழங்கும் நேரடி மானியம் ({subsidyPct}%):</p>
                        <p className="text-lg font-bold text-emerald-400 mt-1">₹{subsidyAmt.toLocaleString('en-IN')}</p>
                        <span className="text-[10px] text-emerald-300">திருப்பிச் செலுத்தத் தேவையில்லை</span>
                      </div>
                      <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                        <p className="text-[11px] text-slate-400">வங்கி வழங்கும் கடன் ({bankLoanPct}%):</p>
                        <p className="text-base font-bold text-amber-300 mt-1">₹{bankLoanAmt.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* முன்னணி அரசு மானியத் திட்டங்கள் */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'PMEGP பிரதமரின் வேலைவாய்ப்பு உருவாக்கும் திட்டம்',
                    badge: '35% வரை மானியம்',
                    cap: 'உற்பத்தி: ₹50 லட்சம் வரை | சேவை: ₹20 லட்சம் வரை',
                    desc: 'மத்திய அரசின் மிகப்பெரிய தொழில் மானியத் திட்டம். KVIC மற்றும் வங்கிகள் மூலம் நேரடி நிதி உதவி.',
                    eligibility: '8-ஆம் வகுப்பு தேர்ச்சி பெற்ற 18 வயது நிரம்பிய எவரும்',
                    action: () => alert("PMEGP ஆன்லைன் போர்டல்: kviconline.gov.in \nஆன்லைனிலேயே திட்ட அறிக்கை (DPR) பதிவேற்றி விண்ணப்பிக்கலாம்.")
                  },
                  {
                    title: 'NEEDS திட்டம் (புதிய தொழில்முனைவோர் திட்டம்)',
                    badge: '25% தமிழக அரசு மானியம்',
                    cap: 'திட்ட மதிப்பு: ₹10 லட்சம் முதல் ₹5 கோடி வரை',
                    desc: 'பட்டதாரிகள் மற்றும் டிப்ளமோ முடித்த முதல் தலைமுறை தொழில்முனைவோருக்கு அதிகபட்சமாக ₹75 லட்சம் வரை மானியம்.',
                    eligibility: 'பட்டப்படிப்பு அல்லது தொழிற்கல்வி முடித்த 21-35 வயதுடையோர்',
                    action: () => alert("NEEDS இணையதளம்: msmeonline.tn.gov.in \nமாவட்ட தொழில் மையம் (DIC) மூலமாக விண்ணப்பிக்கலாம்.")
                  },
                  {
                    title: 'UYEGP படித்த வேலைவாய்ப்பற்ற இளைஞர் திட்டம்',
                    badge: '25% நேரடி மானியம்',
                    cap: 'உற்பத்தி: ₹15 லட்சம் | சேவை: ₹5 லட்சம் | வியாபாரம்: ₹5 லட்சம்',
                    desc: 'குறைந்த கல்வித்தகுதி உடைய இளைஞர்கள் உள்ளூரிலேயே மளிகை, ஜெராக்ஸ், வாடகை வாகனம் அல்லது சிறு பட்டறை தொடங்க உதவி.',
                    eligibility: '8-ஆம் வகுப்பு தேர்ச்சி (18 முதல் 45 வயது வரை)',
                    action: () => alert("UYEGP விண்ணப்ப போர்டல்: msmeonline.tn.gov.in \nமாவட்ட தொழில் மையத்தை (DIC) நேரில் அணுகலாம்.")
                  },
                  {
                    title: 'பிரதமர் முத்ரா கடன் திட்டம் (PMMY)',
                    badge: 'பிணையில்லாக் கடன் (No Collateral)',
                    cap: 'சிசு: ₹50,000 | கிஷோர்: ₹5 லட்சம் | தருண்: ₹10 லட்சம்',
                    desc: 'சொத்து அடமானம் ஏதுமின்றி சிறு வியாபாரிகள், தள்ளுவண்டி, தையல், காய்கறி மற்றும் சிறு கடைகளுக்கு வங்கிகள் தரும் கடன்.',
                    eligibility: 'ஏற்கனவே தொழில் செய்வோர் அல்லது புதிய வியாபாரம் தொடங்குவோர்',
                    action: () => alert("முத்ரா போர்டல்: mudra.org.in \nஉங்கள் அருகிலுள்ள தேசியமயமாக்கப்பட்ட வங்கிக் கிளையை அணுகவும்.")
                  },
                  {
                    title: 'CGTMSE பிணையில்லா கடன் உத்தரவாத திட்டம்',
                    badge: '₹5 கோடி வரை கடன்',
                    cap: 'அடமானச் சொத்து தேவையில்லை (Govt Guarantee)',
                    desc: 'சொத்து ஜாமீன் இல்லாத காரணத்தால் வங்கிகள் கடன் மறுப்பதைத் தடுக்க மத்திய அரசு வழங்கும் 85% வரை கடன் உத்தரவாதம்.',
                    eligibility: 'உற்பத்தி மற்றும் சேவை சார்ந்த பதிவுசெய்யப்பட்ட MSME நிறுவனங்கள்',
                    action: () => alert("CGTMSE போர்டல்: cgtmse.in \nவங்கியாளரிடம் CGTMSE கீழ் கடன் வழங்குமாறு கோரலாம்.")
                  },
                  {
                    title: 'அண்ணல் அம்பேத்கர் வணிக சாம்பியன் திட்டம்',
                    badge: '35% மானியம் + 6% வட்டி மானியம்',
                    cap: 'திட்ட மதிப்பு வரம்பின்றி நேரடி உதவி',
                    desc: 'SC / ST சமூகத்தைச் சேர்ந்த புதிய மற்றும் வளர்ந்து வரும் தொழில்முனைவோருக்குத் தமிழ்நாடு அரசின் வரலாற்றுச் சிறப்புமிக்க திட்டம்.',
                    eligibility: 'SC / ST தொழில்முனைவோர் (கல்வித் தகுதி கட்டாயமில்லை)',
                    action: () => alert("விண்ணப்பிக்கும் தளம்: msmeonline.tn.gov.in \nமாவட்ட தொழில் மையம் (DIC) சிறப்பு முகாம்கள்.")
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/50 transition">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="text-sm font-bold text-white leading-tight">{item.title}</h4>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 whitespace-nowrap">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-amber-400 font-semibold mb-2">{item.cap}</p>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.desc}</p>
                      <div className="bg-slate-800/60 p-2 rounded-lg text-[11px] text-slate-400 mb-4 border border-slate-700/60">
                        <strong className="text-slate-300">தகுதி: </strong>{item.eligibility}
                      </div>
                    </div>
                    <button
                      onClick={item.action}
                      className="w-full py-2 bg-slate-800 hover:bg-amber-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition border border-slate-700 hover:border-amber-500"
                    >
                      விண்ணப்பிக்கும் முறை & போர்டல் ↗
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* சப்-டேப் 2: பாரம்பரிய & உணவுப் பதப்படுத்துதல் */}
          {businessSubTab === 'vishwakarma' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* PM விஸ்வகர்மா திட்டம் */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">🔨</span>
                    <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-md border border-amber-500/30 font-semibold">
                      ₹15,000 இலவச டூல்கிட்
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">பிரதமர் விஸ்வகர்மா திட்டம் (PM Vishwakarma)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    பாரம்பரிய கைவினைஞர்கள் மற்றும் தொழிலாளர்களுக்கு நவீன கருவிகள் வாங்க ₹15,000 மானியம், இலவசப் பயிற்சி மற்றும் வெறும் 5% வட்டியில் ₹3 லட்சம் வரை பிணையில்லாக் கடன்.
                  </p>
                  <div className="bg-slate-800/60 p-3 rounded-lg text-xs text-slate-300 space-y-1.5 border border-slate-700">
                    <p className="text-amber-400 font-bold">சேர்க்கப்பட்டுள்ள 18 பாரம்பரிய தொழில்கள்:</p>
                    <p className="leading-relaxed text-slate-300 text-[11px]">
                      தச்சர், பொற்கொல்லர், கொல்லர், கொத்தனார், தையல் கலைஞர், சிற்பி, குயவர், காலணி தைப்பவர், படகு கட்டுபவர், கூடை முடைபவர், மாலை கட்டுவோர், முடிதிருத்துவோர், சலவைத் தொழிலாளி, பூட்டு தயாரிப்பாளர் மற்றும் பொம்மை செய்பவர்கள்.
                    </p>
                  </div>
                  <button
                    onClick={() => alert("PM விஸ்வகர்மா போர்டல்: pmvishwakarma.gov.in \nஉங்கள் அருகிலுள்ள பொது சேவை மையம் (CSC) மூலம் இலவசமாகப் பதிவு செய்யலாம்.")}
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold transition shadow-md"
                  >
                    CSC மையத்தில் விஸ்வகர்மா பதிவு செய்ய ↗
                  </button>
                </div>

                {/* PMFME உணவு பதப்படுத்துதல் திட்டம் */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">🌾</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/30 font-semibold">
                      35% நேரடி மானியம் (அதிகபட்சம் ₹10 லட்சம்)
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">பிரதமரின் உணவுப் பதப்படுத்தும் திட்டம் (PMFME)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    கிராமப்புறங்களில் விவசாய விளைபொருட்களை மதிப்புக்கூட்டி விற்பனை செய்யும் மைக்ரோ உணவு பதப்படுத்தும் நிறுவனங்களுக்கு 35% மூலதன மானியம்.
                  </p>
                  <div className="bg-slate-800/60 p-3 rounded-lg text-xs text-slate-300 space-y-1.5 border border-slate-700">
                    <p className="text-emerald-400 font-bold">பொருந்தக்கூடிய உணவுத் தொழில்கள்:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                      <li>மரச்செக்கு எண்ணெய் & தேங்காய் எண்ணெய் ஆலை</li>
                      <li>சிறு தானிய பிஸ்கட், மாவு மில் & அவல் தயாரிப்பு</li>
                      <li>மசாலா பொடி, ஊறுகாய், வத்தல் & அப்பளம் தயாரிப்பு</li>
                      <li>பால் பண்ணை சார்ந்த நெய், பன்னீர் மற்றும் பழச்சாறு பேக்கிங்</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => alert("PMFME அதிகாரப்பூர்வ போர்டல்: pmfme.mofpi.gov.in \nமாவட்ட வள மையங்கள் (DPR தயாரிப்புக்கு இலவச உதவி) மூலம் விண்ணப்பிக்கலாம்.")}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition shadow-md"
                  >
                    PMFME உணவு மானிய போர்டல் ↗
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* சப்-டேப் 3: மகளிர் & சுயஉதவிக் குழுக்கள் */}
          {businessSubTab === 'women' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-2xl">👩‍🌾</span>
                <h4 className="text-base font-bold text-white">வாழ்ந்து காட்டுவோம் திட்டம் (TN-RTP)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  உலக வங்கி நிதியுதவியுடன் கிராமப்புற மகளிர் மற்றும் உற்பத்தியாளர் குழுக்களுக்கு (Producer Groups) நேரடி தொழில் மானியங்கள் மற்றும் இயந்திர உதவி.
                </p>
                <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-amber-300 space-y-1">
                  <p>✔ தனிநபர் தொழிலுக்கு 30% மானியம்</p>
                  <p>✔ உற்பத்தியாளர் குழுக்களுக்கு ₹1.5 லட்சம் வரை இணை நிதி</p>
                </div>
                <button
                  onClick={() => alert("வாழ்ந்து காட்டுவோம் திட்ட போர்டல்: vazhndhukaattuvom.tn.gov.in \nவட்டார அளவிலான திட்ட அலுவலகத்தை அணுகவும்.")}
                  className="w-full py-2 bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 rounded-lg text-xs font-semibold transition"
                >
                  TN-RTP மகளிர் மானிய விவரம் ↗
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-2xl">💼</span>
                <h4 className="text-base font-bold text-white">ஸ்டாண்ட்-அப் இந்தியா (Stand-Up India)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ஒவ்வொரு வங்கிக் கிளையும் குறைந்தபட்சம் ஒரு பெண் தொழில்முனைவோருக்கு புதிய உற்பத்தி அல்லது சேவைத் தொழில் தொடங்க கடன் வழங்கும் கட்டாயத் திட்டம்.
                </p>
                <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-emerald-400 space-y-1">
                  <p>✔ கடன் தொகை: ₹10 லட்சம் முதல் ₹1 கோடி வரை</p>
                  <p>✔ பசுமை திட்டங்களுக்கு (Greenfield) முன்னுரிமை</p>
                </div>
                <button
                  onClick={() => alert("ஸ்டாண்ட்-அப் இந்தியா போர்டல்: standupmitra.in \nஆன்லைன் மூலம் விண்ணப்பித்து அருகிலுள்ள வங்கியைத் தேர்வு செய்யலாம்.")}
                  className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 rounded-lg text-xs font-semibold transition"
                >
                  ஸ்டாண்ட்-அப் மித்ரா போர்டல் ↗
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-2xl">🤝</span>
                <h4 className="text-base font-bold text-white">சுயஉதவிக் குழுக்கள் வங்கிக் கடன் இணைப்பு</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  தமிழ்நாடு மகளிர் மேம்பாட்டு நிறுவனம் (TNSRLM) மூலமாக சுயஉதவிக் குழுக்களுக்கு 7% சலுகை வட்டியில் வங்கிக் கடன் மற்றும் சமுதாய முதலீட்டு நிதி.
                </p>
                <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-amber-300 space-y-1">
                  <p>✔ குழுவிற்கு ₹10 லட்சம் முதல் ₹20 லட்சம் வரை கடன்</p>
                  <p>✔ ஒழுங்காகத் திரும்பச் செலுத்தினால் வட்டி மானியம்</p>
                </div>
                <button
                  onClick={() => alert("தொடர்புக்கு: உங்கள் கிராம ஊராட்சி அளவிலான கூட்டமைப்பு (PLF) அல்லது மகளிர் திட்ட அலுவலர்.")}
                  className="w-full py-2 bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 rounded-lg text-xs font-semibold transition"
                >
                  மகளிர் திட்ட வழிகாட்டல் ↗
                </button>
              </div>
            </div>
          )}

          {/* சப்-டேப் 4: உரிமங்கள் & DPR வழிகாட்டி */}
          {businessSubTab === 'compliance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* உத்யம் பதிவு */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-2xl">📜</span>
                  <h4 className="text-base font-bold text-white">உத்யம் MSME பதிவு (இலவசம்)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    அரசு மானியங்கள், வங்கி முன்னுரிமைக் கடன்கள் மற்றும் டெண்டர்களில் பங்கேற்க மத்திய அரசின் உத்யம் சான்றிதழ் அவசியம்.
                  </p>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-emerald-400 space-y-1">
                    <p>✔ தேவையானவை: ஆதார் எண், பான் கார்டு, வங்கி கணக்கு</p>
                    <p>✔ கட்டணம் ஏதுமில்லை; 5 நிமிடங்களில் பதிவிறக்கம்</p>
                  </div>
                  <button
                    onClick={() => alert("அதிகாரப்பூர்வ தளம்: udyamregistration.gov.in \n(குறிப்பு: .gov.in முடிவடையும் அரசு தளத்தில் மட்டுமே பதிவு செய்யவும்; போலி தளங்களை நம்ப வேண்டாம்).")}
                    className="w-full py-2 bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 rounded-lg text-xs font-semibold transition"
                  >
                    உத்யம் அரசு தளத்தில் பதிவு செய்ய ↗
                  </button>
                </div>

                {/* FSSAI உணவு உரிமம் */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-2xl">🥗</span>
                  <h4 className="text-base font-bold text-white">FSSAI உணவுப் பாதுகாப்பு உரிமம்</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    உணவு, பேக்கிங், பேக்கரி, மளிகை, தேநீர் கடை மற்றும் கேட்டரிங் செய்பவர்களுக்கு ஆண்டுக்கு வெறும் ₹100 கட்டணத்தில் Basic Registration.
                  </p>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-emerald-400 space-y-1">
                    <p>✔ விற்றுமுதல் ₹12 லட்சத்திற்குள் இருந்தால் Basic பதிவு போதும்</p>
                    <p>✔ ஆன்லைனிலேயே விண்ணப்பித்து சான்றிதழ் பெறலாம்</p>
                  </div>
                  <button
                    onClick={() => alert("FSSAI அதிகாரப்பூர்வ போர்டல்: foscos.fssai.gov.in \nபாஸ்போர்ட் சைஸ் போட்டோ மற்றும் ஆதார் அட்டை போதுமானது.")}
                    className="w-full py-2 bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 rounded-lg text-xs font-semibold transition"
                  >
                    FSSAI உணவு உரிம போர்டல் ↗
                  </button>
                </div>

                {/* அரசு GeM போர்டல் */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-2xl">🛒</span>
                  <h4 className="text-base font-bold text-white">GeM போர்ட்டலில் அரசுக்கு விற்பனை</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    அரசுத் துறைகள், பள்ளிகள், மற்றும் அலுவலகங்களுக்கு உங்கள் பொருட்கள் அல்லது சேவைகளை இடைத்தரகர்கள் இன்றி நேரடியாக விற்கலாம்.
                  </p>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-emerald-400 space-y-1">
                    <p>✔ MSME நிறுவனங்களுக்கு 25% அரசு கொள்முதல் முன்னுரிமை</p>
                    <p>✔ நியாயமான விலையில் உடனடி அரசு ஆர்டர்கள்</p>
                  </div>
                  <button
                    onClick={() => alert("GeM அதிகாரப்பூர்வ போர்டல்: gem.gov.in \nவிற்பனையாளராகப் (Seller) பதிவு செய்து பொருட்களைப் பட்டியலிடலாம்.")}
                    className="w-full py-2 bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 rounded-lg text-xs font-semibold transition"
                  >
                    GeM அரசு சந்தை போர்டல் ↗
                  </button>
                </div>
              </div>

              {/* திட்ட அறிக்கை (DPR) செக்லிஸ்ட் அட்டை */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
                  <span>📄 வங்கி தொழில் கடன் பெற தேவையான 6 முக்கிய ஆவணங்கள் (DPR Checklist):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                    <p className="text-white font-semibold mb-1">1. திட்ட அறிக்கை (DPR)</p>
                    <p className="text-slate-400">தொழில் விளக்கம், இயந்திரங்களின் விலைப்பட்டியல் (Quotation), மற்றும் 3 ஆண்டு லாப-நஷ்ட உத்தேச கணக்கு.</p>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                    <p className="text-white font-semibold mb-1">2. தொழில் இட ஆவணம்</p>
                    <p className="text-slate-400">சொந்த இடமாக இருந்தால் பட்டா/பத்திர நகல்; வாடகை இடமாக இருந்தால் பதிவு செய்யப்பட்ட வாடகை ஒப்பந்தம் (Rental Agreement).</p>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                    <p className="text-white font-semibold mb-1">3. KYC & அடையாள ஆவணங்கள்</p>
                    <p className="text-slate-400">விண்ணப்பதாரரின் ஆதார் அட்டை, பான் கார்டு, சாதிச் சான்றிதழ் மற்றும் 3 பாஸ்போர்ட் சைஸ் புகைப்படங்கள்.</p>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                    <p className="text-white font-semibold mb-1">4. கல்வி & பயிற்சி சான்றிதழ்</p>
                    <p className="text-slate-400">பள்ளி/கல்லூரி மார்க்ஷீட், EDP தொழில்முனைவோர் பயிற்சி சான்றிதழ் அல்லது KVK தொழிற்பயிற்சி நகல்.</p>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                    <p className="text-white font-semibold mb-1">5. வங்கி கணக்கு புத்தகம்</p>
                    <p className="text-slate-400">விண்ணப்பதாரரின் கடந்த 6 மாத வங்கி கணக்கு அறிக்கை (Bank Statement) மற்றும் CIBIL அறிக்கை.</p>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                    <p className="text-white font-semibold mb-1">6. அரசு பதிவு சான்றிதழ்</p>
                    <p className="text-slate-400">உத்யம் (Udyam) பதிவு நகல் மற்றும் பொருந்தினால் FSSAI உணவு உரிமம் அல்லது உள்ளாட்சி தொழில் உரிமம்.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
        {/* 9. ஆன்மிகம் & சுற்றுலா (Spiritual & Heritage Hub) */}
      {currentModule === 'spiritual' && (
        <div className="space-y-6">
          {/* தலைப்பு & ஆன்மிக வழிகாட்டி பேனர் */}
          <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-orange-950/80 border border-orange-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-semibold rounded-full mb-2 border border-orange-500/40">
                  🛕 ஆன்மிகம் & பாரம்பரிய சுற்றுலா
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>நம்ம பூமி ஆன்மிகம் & சுற்றுலா 360</span>
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  நவக்கிரக & அறுபடை சுற்றுப்பாதைகள் • பரிகாரத் தலங்கள் • HR&CE அரசு நேரடி சேவைகள் • கிராம பூசாரிகள் நலன்
                </p>
              </div>

              {/* சப்-டேப் பட்டன்கள் */}
              <div className="flex flex-wrap gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700">
                <button
                  onClick={() => setSpiritualSubTab('circuits')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    spiritualSubTab === 'circuits' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🗺️ சுற்றுப்பாதை வழிகாட்டி
                </button>
                <button
                  onClick={() => setSpiritualSubTab('pariharam')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    spiritualSubTab === 'pariharam' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🙏 பரிகாரத் தலங்கள்
                </button>
                <button
                  onClick={() => setSpiritualSubTab('hrce')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    spiritualSubTab === 'hrce' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🏛️ HR&CE அரசு சேவைகள்
                </button>
                <button
                  onClick={() => setSpiritualSubTab('priests')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    spiritualSubTab === 'priests' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔔 கிராம பூசாரிகள் நலன்
                </button>
              </div>
            </div>

            {/* குறுந்தகவல் எச்சரிக்கை ஸ்ட்ரிப் */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
                <span className="text-base">ℹ️</span>
                <span><strong>நேரடி அரசு தரிசனம்:</strong> இடைத்தரகர்களை நம்பாமல் திருக்கோவில் போர்ட்டலில் மட்டுமே தரிசன டிக்கெட் பதிவு செய்யுங்கள்.</span>
              </div>
              <div className="text-slate-400">
                அறநிலையத்துறை உதவி மையம்: <strong className="text-orange-400">044-28334811</strong>
              </div>
            </div>
          </div>

          {/* சப்-டேப் 1: ஆன்மிகச் சுற்றுப்பாதை வழிகாட்டி */}
          {spiritualSubTab === 'circuits' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2 bg-slate-900 border border-slate-800 p-2 rounded-xl">
                <button
                  onClick={() => setSelectedCircuit('navagraha')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition ${
                    selectedCircuit === 'navagraha' ? 'bg-orange-600 text-white shadow' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  🪐 நவக்கிரகத் தலங்கள் (கும்பகோணம் பகுதி)
                </button>
                <button
                  onClick={() => setSelectedCircuit('arupadai')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition ${
                    selectedCircuit === 'arupadai' ? 'bg-orange-600 text-white shadow' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  🦚 அறுபடை வீடுகள் (முருகன் தலங்கள்)
                </button>
                <button
                  onClick={() => setSelectedCircuit('panchabhoota')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition ${
                    selectedCircuit === 'panchabhoota' ? 'bg-orange-600 text-white shadow' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  🔥 பஞ்சபூதத் தலங்கள் (சிவன் தலங்கள்)
                </button>
              </div>

              {/* நவக்கிரகத் தலங்கள் வழித்தடம் */}
              {selectedCircuit === 'navagraha' && (
                <div className="space-y-4">
                  <div className="bg-slate-900/80 border border-orange-500/30 rounded-xl p-4 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p>
                      💡 <strong className="text-orange-400">எளிய பயண வழிகாட்டி:</strong> கும்பகோணத்தை மையமாக வைத்து 2 நாட்களில் சுற்றி முடிக்க ஏதுவான நேரடி வழித்தட வரிசை.
                    </p>
                    <span className="bg-orange-950/60 text-orange-300 border border-orange-500/40 px-3 py-1 rounded-md font-semibold whitespace-nowrap">
                      மொத்த தூரம்: ~220 கி.மீ
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { planet: 'சூரியன்', temple: 'சூரியனார் கோவில்', deity: 'சூரிய நாராயணர்', loc: 'ஆடுதுறை அருகில்', tip: 'ஞாயிறு காலை தரிசனம் சிறப்பு' },
                      { planet: 'சந்திரன்', temple: 'கைலாசநாதர் கோவில்', deity: 'சந்திர பகவான்', loc: 'திங்களூர்', tip: 'திங்கட்கிழமை வெள்ளைத் துணி சாற்றி வழிபாடு' },
                      { planet: 'செவ்வாய் (அங்காரகன்)', temple: 'வைத்தியநாதர் கோவில்', deity: 'முத்துக்குமார சுவாமி', loc: 'வைத்தீஸ்வரன் கோவில்', tip: 'செவ்வாய்க்கிழமை ரத்தக் காவேரி தரிசனம்' },
                      { planet: 'புதன்', temple: 'சுவேதாரண்யேஸ்வரர் கோவில்', deity: 'புதன் பகவான்', loc: 'திருவெண்காடு', tip: 'புதன்கிழமை பச்சை வஸ்திரம் & பாசிப்பருப்பு' },
                      { planet: 'குரு (வியாழன்)', temple: 'ஆபத்சகாயேஸ்வரர் கோவில்', deity: 'குரு பகவான்', loc: 'ஆலங்குடி', tip: 'வியாழக்கிழமை மஞ்சள் கொண்டைக்கடலை மாலை' },
                      { planet: 'சுக்கிரன்', temple: 'அக்னீஸ்வரர் கோவில்', deity: 'சுக்கிர பகவான்', loc: 'கஞ்சனூர்', tip: 'வெள்ளிக்கிழமை மொச்சை சாற்றி நெய்தீபம்' },
                      { planet: 'சனி', temple: 'தர்பாரண்யேஸ்வரர் கோவில்', deity: 'சனீஸ்வர பகவான்', loc: 'திருநள்ளாறு', tip: 'நள தீர்த்தத்தில் நீராடி எள்தீபம் ஏற்றல்' },
                      { planet: 'ராகு', temple: 'நாகநாதசுவாமி கோவில்', deity: 'ராகு பகவான்', loc: 'திருநாகேஸ்வரம்', tip: 'ராகுகாலப் பாலாபிஷேகம் நீல நிறமாக மாறும் அற்புதம்' },
                      { planet: 'கேது', temple: 'நாகநாதர் கோவில்', deity: 'கேது பகவான்', loc: 'கீழப்பெரும்பள்ளம்', tip: 'கொள்ளுப் பொடி நிவேதனம் & பலவண்ண வஸ்திரம்' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-orange-500/40 transition">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded font-bold border border-orange-500/30">
                              {idx + 1}. {item.planet} தலம்
                            </span>
                            <span className="text-[11px] text-slate-400">{item.loc}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1">{item.temple}</h4>
                          <p className="text-xs text-orange-400 mb-2">மூலவர் / கிரகம்: {item.deity}</p>
                          <div className="bg-slate-800/60 p-2 rounded-lg text-[11px] text-slate-300 border border-slate-700/60">
                            {item.tip}
                          </div>
                        </div>
                        <button
                          onClick={() => alert(`${item.temple} (${item.loc}): \nமூலவர்: ${item.deity} \nபரிகாரம்: ${item.tip} \nகும்பகோணத்திலிருந்து பேருந்து மற்றும் வாடகை வாகன வசதிகள் உண்டு.`)}
                          className="w-full mt-3 py-1.5 bg-slate-800 hover:bg-orange-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition border border-slate-700 hover:border-orange-500"
                        >
                          கோவில் விவரம் ↗
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* முருகனின் அறுபடை வீடுகள் */}
              {selectedCircuit === 'arupadai' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { no: '1-ஆம் படை வீடு', name: 'திருப்பரங்குன்றம்', deity: 'சுப்பிரமணிய சுவாமி', loc: 'மதுரை', desc: 'தெய்வானை திருமணத் தலம்; குடவறை கோவில் அமைப்பு; திருமணத் தடை நீக்கும் திருத்தலம்.' },
                    { no: '2-ஆம் படை வீடு', name: 'திருச்செந்தூர்', deity: 'செந்தில் ஆண்டவர்', loc: 'தூத்துக்குடி (கடற்கரை)', desc: 'சூரபத்மனை ஆட்கொண்ட தலம்; கடற்கரையில் அமைந்த ஒரே படை வீடு; சத்ரு சம்ஹார பூஜை சிறப்பு.' },
                    { no: '3-ஆம் படை வீடு', name: 'பழனி (திருவாவினன்குடி)', deity: 'தண்டாயுதபாணி சுவாமி', loc: 'திண்டுக்கல்', desc: 'போகர் சித்தர் வடித்த நவபாஷாண சிலை; ஞானப்பழம் தலம்; தைப்பூசம் மற்றும் பங்குனி உத்திரம் சிறப்பு.' },
                    { no: '4-ஆம் படை வீடு', name: 'சுவாமிமலை', deity: 'சுவாமிநாத சுவாமி', loc: 'கும்பகோணம் அருகில்', desc: 'தந்தைக்கு உபதேசம் செய்த தகப்பன்சுவாமி தலம்; 60 தமிழ் வருடங்களைக் குறிக்கும் 60 படிகள்.' },
                    { no: '5-ஆம் படை வீடு', name: 'திருத்தணி', deity: 'தணிகைவேலன்', loc: 'திருவள்ளூர்', desc: 'வள்ளி திருமணத் தலம்; கோபம் தணிந்த அமைதித் தலம்; 365 படிகள்; திருப்புகழ் பாராயணம் சிறப்பு.' },
                    { no: '6-ஆம் படை வீடு', name: 'பழமுதிர்சோலை', deity: 'சோலைமலை முருகன்', loc: 'மதுரை அழகர்கோவில் மலை', desc: 'அவ்வையாருக்கு சுட்ட பழம் வேண்டுமா என வினவிய சோலை தலம்; இயற்கை எழில்சூழ்ந்த அழகிய மலைக்கோவில்.' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-orange-500/40 transition">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs bg-orange-500/20 text-orange-300 px-2.5 py-0.5 rounded font-bold border border-orange-500/30">
                            {item.no}
                          </span>
                          <span className="text-xs text-slate-400">📍 {item.loc}</span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-1">{item.name}</h4>
                        <p className="text-xs text-orange-400 mb-2">சுவாமி திருநாமம்: {item.deity}</p>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                          {item.desc}
                        </p>
                      </div>
                      <button
                        onClick={() => alert(`${item.name} (${item.no}): \nமாவட்டம்: ${item.loc} \n${item.desc} \nஅரசு இணையதளத்தில் சிறப்பு தரிசனம் புக் செய்யலாம்.`)}
                        className="w-full py-2 bg-slate-800 hover:bg-orange-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition border border-slate-700 hover:border-orange-500"
                      >
                        தரிசன முன்பதிவு வழிகாட்டல் ↗
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* பஞ்சபூதத் தலங்கள் */}
              {selectedCircuit === 'panchabhoota' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { elem: 'நிலம் (Earth)', temple: 'ஏகாம்பரேஸ்வரர் கோவில்', loc: 'காஞ்சிபுரம்', lingam: 'பிருத்வி லிங்கம் (மண்ணால் ஆனது)', note: 'பார்வதி தேவி ஆற்று மணலால் லிங்கம் செய்து வழிபட்ட தலம்.' },
                    { elem: 'நீர் (Water)', temple: 'ஜம்புகேஸ்வரர் கோவில்', loc: 'திருவானைக்காவல் (திருச்சி)', lingam: 'அப்பு லிங்கம் (எப்போதும் நீரூற்று)', note: 'கருவறையில் லிங்கத்தின் கீழ் எப்போதும் நீர் ஊறிக் கொண்டிருக்கும் அற்புதம்.' },
                    { elem: 'நெருப்பு (Fire)', temple: 'அருணாசலேஸ்வரர் கோவில்', loc: 'திருவண்ணாமலை', lingam: 'தேயு லிங்கம் (ஜோதி வடிவம்)', note: 'கிரிவலம் மற்றும் கார்த்திகை மகா தீபத் தலம்; நினைத்தாலே முக்தி தரும் தலம்.' },
                    { elem: 'காற்று (Air)', temple: 'காளஹஸ்தீஸ்வரர் கோவில்', loc: 'திருக்காளஹஸ்தி (ஆந்திரா எல்லை)', lingam: 'வாயு லிங்கம் (காற்று அசைவு)', note: 'மூடிய கருவறையிலும் விளக்குச்சுடர் எப்போதும் அசைந்தாடும் வாயு தலம்.' },
                    { elem: 'ஆகாயம் (Space)', temple: 'நடராஜர் திருக்கோவில்', loc: 'சிதம்பரம்', lingam: 'ஆகாய லிங்கம் (சிதம்பர ரகசியம்)', note: 'உருவமற்ற வெட்டவெளியையே இறைவனாக வழிபடும் மாபெரும் பஞ்சபூத தலம்.' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-orange-500/40 transition">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded font-bold border border-orange-500/30">
                            {item.elem}
                          </span>
                          <span className="text-xs text-slate-400">📍 {item.loc}</span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-1">{item.temple}</h4>
                        <p className="text-xs text-amber-400 font-semibold mb-2">லிங்க வடிவம்: {item.lingam}</p>
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                          {item.note}
                        </p>
                      </div>
                      <button
                        onClick={() => alert(`${item.temple} (${item.elem}): \nஅமைவிடம்: ${item.loc} \n${item.lingam} \n${item.note}`)}
                        className="w-full mt-4 py-2 bg-slate-800 hover:bg-orange-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition border border-slate-700 hover:border-orange-500"
                      >
                        திருக்கோவில் விவரம் ↗
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* சப்-டேப் 2: பரிகாரத் தலங்கள் */}
          {spiritualSubTab === 'pariharam' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  problem: '💍 திருமணத் தடை நீங்க',
                  temple: 'திருமணஞ்சேரி அருள்மிகு உத்வாகநாதசுவாமி',
                  loc: 'மயிலாடுதுறை மாவட்டம்',
                  ritual: 'மாலையும் மாலையுமாக அர்ச்சனை செய்து அந்த மாலையை வீட்டிற்கு எடுத்துவந்து வைக்க விரைவில் திருமணம் கைகூடும்.',
                  time: 'வெள்ளிக்கிழமை மற்றும் ஞாயிறு உச்சி வேளை சிறப்பு'
                },
                {
                  problem: '👶 குழந்தை பாக்கியம் பெற',
                  temple: 'திருக்கருகாவூர் அருள்மிகு கர்ப்பரட்சாம்பிகை',
                  loc: 'பாபநாசம், தஞ்சாவூர்',
                  ritual: 'அம்மன் திருப்பாதத்தில் வைத்து மந்திரித்துக் கொடுக்கப்படும் நெய் (பிரசாதம்) 48 நாட்கள் உட்கொள்ள குழந்தை வரம் கிட்டும்.',
                  time: 'பௌர்ணமி மற்றும் செவ்வாய்க்கிழமைகள் சிறப்பு'
                },
                {
                  problem: '💰 கடன் & தொழில் நஷ்டம் தீர',
                  temple: 'திருச்சேறை சாரபரமேஸ்வரர் (கடன் நிவர்த்தீஸ்வரர்)',
                  loc: 'கும்பகோணம் அருகில்',
                  ritual: 'தொடர்ந்து 3 திங்கட்கிழமைகள் பைரவர் மற்றும் கடன் நிவர்த்தீஸ்வரருக்கு சிறப்பு அர்ச்சனை செய்ய கடன் சுமை குறையும்.',
                  time: 'திங்கட்கிழமை ராகுகால வேளை'
                },
                {
                  problem: '📚 கல்வி & ஞான மேன்மைக்கு',
                  temple: 'கூத்தனூர் அருள்மிகு மகா சரஸ்வதி கோவில்',
                  loc: 'பூந்தோட்டம், திருவாரூர்',
                  ritual: 'சரஸ்வதி அம்மன் பாதத்தில் நோட்டுப் புத்தகம், பேனா வைத்து அர்ச்சனை செய்து குழந்தைகளுக்கு எழுத்தறிவித்தல் (வித்யாரம்பம்).',
                  time: 'புதன்கிழமை மற்றும் நவராத்திரி விஜயதசமி'
                },
                {
                  problem: '🩺 தீராத நோய் & ஆரோக்கியம்',
                  temple: 'வைத்தீஸ்வரன் கோவில் வைத்தியநாத சுவாமி',
                  loc: 'மயிலாடுதுறை அருகில்',
                  ritual: 'சித்தாமிர்த தீர்த்தத்தில் நீராடி, திருச்சாந்து உருண்டை உட்கொள்ள கடுமையான தோல் நோய் மற்றும் உடல் உபாதைகள் தீரும்.',
                  time: 'செவ்வாய்க்கிழமை மற்றும் கிருத்திகை நாள்'
                },
                {
                  problem: '⚖️ வழக்கு & எதிரிகள் தொல்லை நீங்க',
                  temple: 'திருப்பட்டூர் பிரம்மபுரீஸ்வரர் திருக்கோவில்',
                  loc: 'சிறுகனூர் அருகில், திருச்சி',
                  ritual: 'மனிதனின் தலையெழுத்தையே மாற்றி அமைக்கும் பிரம்மன் தலம்; குரு ஓரையில் 36 நெய்தீபம் ஏற்றி வழிபட வளம் பெருகும்.',
                  time: 'திங்கள் மற்றும் வியாழக்கிழமைகள் மிகச் சிறப்பு'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-orange-500/40 transition">
                  <div>
                    <span className="text-xs bg-orange-500/20 text-orange-300 px-2.5 py-1 rounded-md font-bold border border-orange-500/30 inline-block mb-2">
                      {item.problem}
                    </span>
                    <h4 className="text-sm font-bold text-white mb-1">{item.temple}</h4>
                    <p className="text-xs text-slate-400 mb-3">📍 {item.loc}</p>
                    <div className="bg-slate-800/60 p-3 rounded-lg text-xs text-slate-300 space-y-1.5 border border-slate-700/60 mb-3">
                      <p><strong className="text-amber-400">பரிகார முறை: </strong>{item.ritual}</p>
                      <p><strong className="text-orange-400">உகந்த நேரம்: </strong>{item.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`${item.temple}: \n\nபரிகாரம்: ${item.ritual} \n\nஉகந்த காலம்: ${item.time}`)}
                    className="w-full py-2 bg-slate-800 hover:bg-orange-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition border border-slate-700 hover:border-orange-500"
                  >
                    பரிகார வழிகாட்டல் அறிய ↗
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* சப்-டேப் 3: HR&CE அரசு ஆன்லைன் சேவைகள் */}
          {spiritualSubTab === 'hrce' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-3xl">🎫</span>
                  <h4 className="text-base font-bold text-white">தரிசனம் & அர்ச்சனை முன்பதிவு</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    பழனி, திருச்செந்தூர், மதுரை மீனாட்சி உள்ளிட்ட 50+ முதன்மைக் கோவில்களில் இடைத்தரகர்கள் இன்றி ஆன்லைனில் டிக்கெட் முன்பதிவு.
                  </p>
                  <button
                    onClick={() => alert("அறநிலையத்துறை போர்டல்: hrce.tn.gov.in \nதரிசன டிக்கெட்டுகள், சிறப்பு பிரசாதம் மற்றும் சேவைகளை இதில் புக் செய்யலாம்.")}
                    className="w-full py-2 bg-orange-600/30 hover:bg-orange-600/50 border border-orange-500/50 text-orange-200 rounded-lg text-xs font-semibold transition"
                  >
                    HR&CE தரிசன போர்டல் ↗
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-3xl">🍲</span>
                  <h4 className="text-base font-bold text-white">நாள்தோறும் அன்னதான நன்கொடை</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    உங்கள் பிறந்தநாள் அல்லது நினைவு நாளில் திருக்கோவில் அன்னதானத்திற்கு ஆன்லைனில் பணம் செலுத்தலாம் (80G வரி விலக்கு உண்டு).
                  </p>
                  <button
                    onClick={() => alert("அன்னதான நன்கொடை போர்டல்: hrce.tn.gov.in \nநன்கொடை செலுத்தியதும் அதிகாரப்பூர்வ மின்-ரசீது பதிவிறக்கம் செய்துகொள்ளலாம்.")}
                    className="w-full py-2 bg-orange-600/30 hover:bg-orange-600/50 border border-orange-500/50 text-orange-200 rounded-lg text-xs font-semibold transition"
                  >
                    அன்னதான நன்கொடை செலுத்த ↗
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-3xl">✨</span>
                  <h4 className="text-base font-bold text-white">தங்கத்தேர் & உற்சவ முன்பதிவு</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    விசேஷ வைபவங்கள், தங்கத்தேர் மற்றும் வெள்ளித்தேர் உலா நேர்த்திக்கடன்களுக்கு இணையவழியில் அதிகாரப்பூர்வ ரசீது பெறும் முறை.
                  </p>
                  <button
                    onClick={() => alert("தங்கத்தேர் உலா விவரங்கள் மற்றும் கட்டணங்களை hrce.tn.gov.in தளத்தில் கோவில் வாரியாகச் சரிபார்க்கலாம்.")}
                    className="w-full py-2 bg-orange-600/30 hover:bg-orange-600/50 border border-orange-500/50 text-orange-200 rounded-lg text-xs font-semibold transition"
                  >
                    தேரோட்டம் முன்பதிவு விவரம் ↗
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-3xl">🎪</span>
                  <h4 className="text-base font-bold text-white">திருக்கோவில் திருமண மண்டபங்கள்</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    அறநிலையத்துறைக்குச் சொந்தமான திருமண மண்டபங்களை எளிய வாடகையில் முன்பதிவு செய்வதற்கான வழிகாட்டல்.
                  </p>
                  <button
                    onClick={() => alert("திருமண மண்டபங்கள் முன்பதிவுக்கு அந்தந்த கோவில் நிர்வாக அலுவலகத்தையோ அல்லது இணையதளத்தையோ அணுகலாம்.")}
                    className="w-full py-2 bg-orange-600/30 hover:bg-orange-600/50 border border-orange-500/50 text-orange-200 rounded-lg text-xs font-semibold transition"
                  >
                    மண்டப விவரங்கள் அறிய ↗
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* சப்-டேப் 4: கிராம பூசாரிகள் நலன் & திட்டங்கள் */}
          {spiritualSubTab === 'priests' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-2xl">🪔</span>
                  <h4 className="text-base font-bold text-white">ஒரு கால பூஜை திட்டம்</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    வருமானமின்றி இருக்கும் கிராமப்புற திருக்கோவில்களில் தினசரி ஒரு கால பூஜையாவது தொடர்ந்து நடைபெற அரசு வழங்கும் நிரந்தர வைப்பு நிதி.
                  </p>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-amber-300 space-y-1">
                    <p>✔ கோவிலுக்கு ₹10,000 அரசு வைப்பு நிதி</p>
                    <p>✔ வட்டி மூலம் மாதாந்திர பூஜை பொருட்கள் உதவி</p>
                  </div>
                  <button
                    onClick={() => alert("விண்ணப்பிக்க: கிராம ஊராட்சி நிர்வாகச் சான்றுடன் மாவட்ட அறநிலையத்துறை இணை ஆணையர் அலுவலகத்தை அணுகவும்.")}
                    className="w-full py-2 bg-orange-600/30 hover:bg-orange-600/50 border border-orange-500/50 text-orange-200 rounded-lg text-xs font-semibold transition"
                  >
                    ஒரு கால பூஜை வழிகாட்டல் ↗
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-2xl">👴</span>
                  <h4 className="text-base font-bold text-white">கிராமக் கோவில் பூசாரிகள் ஓய்வூதியம்</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    கிராமப்புறக் கோவில்களில் 20 ஆண்டுகளுக்கும் மேலாகப் பணியாற்றி 60 வயது பூர்த்தியடைந்த முதிய பூசாரிகளுக்குத் தமிழக அரசின் மாதாந்திர ஓய்வூதியம்.
                  </p>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-emerald-400 space-y-1">
                    <p>✔ மாதாந்திர நேரடி வங்கி வரவு</p>
                    <p>✔ ஆயுள் முழுவதும் உதவித்தொகை</p>
                  </div>
                  <button
                    onClick={() => alert("தகுதி: 60 வயது நிறைவு மற்றும் 20 ஆண்டுகள் பூசாரி பணி சான்றிதழ். மாவட்ட ஆட்சியர் அல்லது HR&CE இணை ஆணையரிடம் விண்ணப்பிக்கலாம்.")}
                    className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 rounded-lg text-xs font-semibold transition"
                  >
                    ஓய்வூதிய விண்ணப்ப முறை ↗
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-2xl">🪪</span>
                  <h4 className="text-base font-bold text-white">பூசாரிகள் நலவாரிய அட்டை</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    அமைப்புசாரா பூசாரிகள் நலவாரியத்தில் பதிவு செய்தவர்களுக்கு விபத்து காப்பீடு, இயற்கை மரண உதவித்தொகை மற்றும் குழந்தைகளின் கல்வி நிதி.
                  </p>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg text-xs text-amber-300 space-y-1">
                    <p>✔ திருமண உதவித்தொகை & கல்வி உதவி</p>
                    <p>✔ இலவச வேஷ்டி, புடவை மற்றும் காப்பீடு</p>
                  </div>
                  <button
                    onClick={() => alert("நலவாரியப் பதிவு: தொழிலாளர் நலத்துறை அல்லது மாவட்ட அறநிலையத்துறை அலுவலகம் மூலம் இலவசமாகப் பதிவு செய்யலாம்.")}
                    className="w-full py-2 bg-orange-600/30 hover:bg-orange-600/50 border border-orange-500/50 text-orange-200 rounded-lg text-xs font-semibold transition"
                  >
                    நலவாரியப் பதிவு விவரம் ↗
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
{/* 10. A-Z மொத்த விற்பனை மையம் (Wholesale B2B Hub 360) */}
      {currentModule === 'wholesale' && (
        <div className="space-y-6">
          {/* தலைப்பு & பேனர் */}
          <div className="bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border border-blue-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full mb-2 border border-blue-500/40">
                  📦 B2B நேரடி மொத்தக் கொள்முதல் சந்தை
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>A-Z மொத்த விற்பனை மையங்கள் 360</span>
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  இடைத்தரகர்கள் இன்றி உற்பத்தியாளர்கள் & பாரம்பரிய மொத்த மண்டியிலிருந்து நேரடிக் கொள்முதல் வழிகாட்டி
                </p>
              </div>

              {/* தேடல் பட்டை */}
              <div className="w-full md:w-72">
                <div className="relative">
                  <input
                    type="text"
                    value={wholesaleSearch}
                    onChange={(e) => setWholesaleSearch(e.target.value)}
                    placeholder="பொருள் அல்லது சந்தை தேடுக..."
                    className="w-full bg-slate-900/90 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500 placeholder-slate-500"
                  />
                  {wholesaleSearch && (
                    <button
                      onClick={() => setWholesaleSearch('')}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* வழிகாட்டல் ஸ்ட்ரிப் */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-cyan-300 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/30">
                <span className="text-base">🛡️</span>
                <span><strong>நேரடி கொள்முதல் விதி:</strong> போலி ஆன்லைன் ஏஜென்ட்களுக்கு முன்பணம் அனுப்பாதீர்கள். சந்தைக்கு நேரில் சென்று சரக்கை ஆய்வு செய்து லாரி பார்சல் புக் செய்யுங்கள்.</span>
              </div>
              <div className="text-slate-400">
                போக்குவரத்து உதவி: <strong className="text-blue-400">ABT / VRL / ARC பார்சல் சர்வீஸ்</strong>
              </div>
            </div>
          </div>

          {/* துறை வாரியான ஃபில்டர்கள் */}
          <div className="flex flex-wrap gap-2 bg-slate-900 border border-slate-800 p-2 rounded-xl">
            {[
              { id: 'all', label: 'அனைத்து சந்தைகள்' },
              { id: 'textile', label: '👕 ஜவுளி & ஆடைகள்' },
              { id: 'electronics', label: '🔌 எலக்ட்ரானிக்ஸ் & மொபைல்' },
              { id: 'grocery', label: '🌾 மளிகை & நவதானியங்கள்' },
              { id: 'packaging', label: '📦 பேக்கிங், அச்சு & அட்டை' },
              { id: 'household', label: '🍽️ பாத்திரங்கள் & பிளாஸ்டிக்' },
              { id: 'leather', label: '👞 தோல் & காலணிகள்' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setWholesaleCategory(cat.id)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition ${
                  wholesaleCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* சந்தைகள் கட்டமைப்பு கார்டுகள் */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                id: 1,
                category: 'textile',
                name: 'ஈரோடு கனி மார்க்கெட் & டெக்ஸ்வேலி',
                location: 'ஈரோடு (மத்திய பேருந்து நிலையம் & NH-544)',
                specialty: 'காட்டன் சேலைகள், நைட்டி, லுங்கி, துண்டுகள், பெட்ஷீட்',
                marketDays: 'திங்கள் இரவு முதல் செவ்வாய் மதியம் வரை மாபெரும் வாரச்சந்தை',
                moq: '1 பண்டல் (50 முதல் 100 பீஸ்கள்)',
                address: 'கனி மார்க்கெட், மணிக்கூண்டு அருகில், ஈரோடு / Texvalley, சித்தார்',
                tips: 'நெசவாளர் கூட்டுறவு சங்கங்கள் மற்றும் நேரடி ஆலை விற்பனை நிலையங்கள் இங்குள்ளன.'
              },
              {
                id: 2,
                category: 'textile',
                name: 'திருப்பூர் காதர்பேட்டை & பின்னலாடை சந்தை',
                location: 'திருப்பூர் (ரயில் நிலையம் எதிரில்)',
                specialty: 'பனியன், காட்டன் டி-சர்ட், டிராக் பேண்ட், குழந்தைகள் ஆடைகள்',
                marketDays: 'தினசரி காலை 9 மணி முதல் இரவு 9 மணி வரை (ஞாயிறு மிகச் சிறப்பு)',
                moq: 'குறைந்தபட்சம் 12 அல்லது 24 பீஸ்கள் (டஜன் கணக்கில்)',
                address: 'காதர்பேட்டை மெயின் ரோடு, பழைய பேருந்து நிலையம் அருகில், திருப்பூர்',
                tips: 'ஏற்றுமதி உபரி ஆடைகள் (Export Surplus) மிகக் குறைந்த விலையில் கிடைக்கும்.'
              },
              {
                id: 3,
                category: 'textile',
                name: 'சேலம் இளம்பிள்ளை & செவ்வாய்ப்பேட்டை',
                location: 'சேலம் & இளம்பிள்ளை',
                specialty: 'இளம்பிள்ளை பட்டுப்புடவைகள், சாஃப்ட் சில்க், சிந்தடிக் & காட்டன் சேலைகள்',
                marketDays: 'அனைத்து வேலை நாட்களும் (வியாழன் மற்றும் வெள்ளி புதிய ரகங்கள் வரத்து)',
                moq: '10 சேலைகள் முதல் மொத்தக் கொள்முதல்',
                address: 'நெசவாளர் காலனி மெயின் ரோடு, இளம்பிள்ளை & செவ்வாய்ப்பேட்டை, சேலம்',
                tips: 'வீட்டுப் பெண்கள் மற்றும் சிறு ஜவுளிக்கடை தொடங்குவோருக்கு உகந்த நேரடி நெசவு மையம்.'
              },
              {
                id: 4,
                category: 'electronics',
                name: 'சென்னை ரிச்சி ஸ்ட்ரீட் (Richie Street)',
                location: 'மவுண்ட் ரோடு, சென்னை (அண்ணாசாலை)',
                specialty: 'கம்ப்யூட்டர் உதிரிபாகங்கள், சிசிடிவி கேமராக்கள், எல்இடி டிவிகள், கேஜெட்கள்',
                marketDays: 'திங்கள் முதல் சனி வரை (காலை 10:30 முதல் இரவு 8:30 வரை; ஞாயிறு விடுமுறை)',
                moq: '5 முதல் 10 பீஸ்கள் (மொத்த பில்லிங் விலையில்)',
                address: 'நரசிங்கபுரம் தெரு, ரேடியோ மார்க்கெட், மவுண்ட் ரோடு, சென்னை-2',
                tips: 'ஆசியாவின் 2-வது பெரிய எலக்ட்ரானிக்ஸ் சந்தை; GST பில் கட்டாயம் பெற்றுக்கொள்ளவும்.'
              },
              {
                id: 5,
                category: 'electronics',
                name: 'பாரிமுனை ஈவினிங் பஜார் & காசிசெட்டி தெரு',
                location: 'பாரிமுனை, சென்னை',
                specialty: 'மொபைல் போன் உதிரிபாகங்கள், டெம்பர்டு கிளாஸ், பேக் கவர், டேட்டா கேபிள்',
                marketDays: 'திங்கள் முதல் சனி வரை (ஞாயிறு கடைகள் இயங்காது)',
                moq: '50 முதல் 100 பீஸ்கள் கொண்ட பேக்குகள்',
                address: 'காசிசெட்டி தெரு & ஈவினிங் பஜார் ரோடு, பாரிஸ் கார்னர், சென்னை-1',
                tips: 'மொபைல் சர்வீஸ் மற்றும் உதிரிபாகக் கடைகளுக்குத் தமிழ்நாடு முழுவதும் இங்கிருந்தே சரக்கு செல்கிறது.'
              },
              {
                id: 6,
                category: 'grocery',
                name: 'விருதுநகர் உணவு தானிய & எண்ணெய் மண்டி',
                location: 'விருதுநகர் மார்க்கெட் ரோடு',
                specialty: 'உளுந்து, பாசிப்பருப்பு, குண்டு வத்தல் (மிளகாய்), செக்கு நல்லெண்ணெய்',
                marketDays: 'திங்கள் முதல் சனி வரை (தினசரி காலை வர்த்தக ஏலம்)',
                moq: '1 மூட்டை (50 கிலோ / 100 கிலோ பைகள்)',
                address: 'கடைத்தெரு & மண்டி வளாகம், விருதுநகர்',
                tips: 'தமிழகத்தின் பருப்பு மற்றும் சமையல் எண்ணெய் சந்தை விலையைத் தீர்மானிக்கும் முதன்மை மண்டி.'
              },
              {
                id: 7,
                category: 'grocery',
                name: 'கோயம்பேடு மொத்த உணவு தானிய வளாகம்',
                location: 'கோயம்பேடு, சென்னை',
                specialty: 'அரிசி மூட்டைகள், சர்க்கரை, பருப்பு வகைகள், கோதுமை, மளிகைப் பொருட்கள்',
                marketDays: 'தினசரி அதிகாலை 4:00 மணி முதல் மதியம் வரை',
                moq: 'குறைந்தபட்சம் 1 மூட்டை அல்லது முழு பெட்டி',
                address: 'கோயம்பேடு மொத்த தானிய அங்காடி (KWMC), சென்னை',
                tips: 'வட தமிழ்நாடு மற்றும் சென்னை சுற்றுவட்டார மளிகைக் கடைகளுக்கு மொத்த சப்ளை மையம்.'
              },
              {
                id: 8,
                category: 'grocery',
                name: 'ஈரோடு செம்மாம்பாளையம் மஞ்சள் வணிக வளாகம்',
                location: 'செம்மாம்பாளையம் & பெருந்துறை ரோடு, ஈரோடு',
                specialty: 'விரலி மஞ்சள், கிழங்கு மஞ்சள், அக்மார்க் தர சான்றிதழ் பெற்ற மஞ்சள் பொடி',
                marketDays: 'திங்கள் முதல் வெள்ளி வரை ஒழுங்குமுறை விற்பனைக்கூட ஏலம்',
                moq: 'குறைந்தபட்சம் 1 பை (மஞ்சள் சாக்கு மூட்டை)',
                address: 'ஈரோடு ஒழுங்குமுறை விற்பனைக் கூடம், பெருந்துறை ரோடு, ஈரோடு',
                tips: 'மசாலா பொடி மற்றும் ஏற்றுமதி தொழில் செய்வோருக்கான உலகத்தரம் வாய்ந்த சந்தை.'
              },
              {
                id: 9,
                category: 'packaging',
                name: 'சிவகாசி அச்சு & அட்டைப் பெட்டி தொழிற்பேட்டை',
                location: 'சிவகாசி & திருத்தங்கல்',
                specialty: 'ஸ்வீட் பாக்ஸ், அட்டைப் பெட்டிகள் (Corrugated Boxes), காலண்டர், லேபிள்கள்',
                marketDays: 'அனைத்து வேலை நாட்களும் (நேரடி ஆலை வர்த்தகம்)',
                moq: '1000 பாக்ஸ்கள் அல்லது பிரிண்டிங் ஆர்டர்கள்',
                address: 'பைபாஸ் ரோடு, சிவகாசி தொழிற்பேட்டை வளாகம்',
                tips: 'சொந்த பிராண்ட் தொடங்குவோர் பெட்டி மற்றும் ஸ்டிக்கர் அடிக்க நேரடியாக அணுகலாம்.'
              },
              {
                id: 10,
                category: 'packaging',
                name: 'பாரிமுனை ஆண்டர்சன் & மலையப்பெருமாள் தெரு',
                location: 'பாரிமுனை, சென்னை',
                specialty: 'திருமணப் பத்திரிகைகள், ஃபைல்கள், பேப்பர் ரோல்கள், ஸ்டேஷனரி & பைண்டிங்',
                marketDays: 'திங்கள் முதல் சனி வரை (காலை 10 மணி முதல் இரவு 8 மணி வரை)',
                moq: '100 பத்திரிகைகள் / மொத்த பேப்பர் ரீம்கள்',
                address: 'ஆண்டர்சன் தெரு & மலையப்பெருமாள் தெரு, பாரிஸ் கார்னர், சென்னை-1',
                tips: 'அனைத்து விதமான பேப்பர் வகைகள் மற்றும் இன்விடேஷன் கார்டுகள் மொத்த விலையில் கிடைக்கும்.'
              },
              {
                id: 11,
                category: 'household',
                name: 'மதுரை விளக்குத்தூண் & கீழ மாசி வீதி',
                location: 'விளக்குத்தூண், மதுரை',
                specialty: 'எவர்சில்வர் பாத்திரங்கள், பித்தளை விளக்குகள், அலுமினிய & வார்ப்பு பாத்திரங்கள்',
                marketDays: 'தினசரி காலை 9:30 முதல் இரவு 9:00 வரை',
                moq: 'மொத்த எடை (கிலோ கணக்கில்) அல்லது டஜன் கணக்கில்',
                address: 'தெற்கு மாசி வீதி & கீழ மாசி வீதி சந்திப்பு, விளக்குத்தூண், மதுரை',
                tips: 'பாத்திரக்கடை மற்றும் திருமண சீர்வரிசை பொருட்கள் மொத்தக் கொள்முதலுக்கு உகந்தது.'
              },
              {
                id: 12,
                category: 'household',
                name: 'சென்னை பந்தர் தெரு (Bunder Street)',
                location: 'பாரிமுனை, சென்னை',
                specialty: 'பிளாஸ்டிக் வாளிகள், கன்டெய்னர்கள், பிளாஸ்டிக் பாட்டில்கள், ஹவுஸ்கீப்பிங் பொருட்கள்',
                marketDays: 'திங்கள் முதல் சனி வரை',
                moq: '1 பண்டல் அல்லது மொத்த பார்சல் பெட்டி',
                address: 'பந்தர் தெரு, பாரிஸ் கார்னர், சென்னை-1',
                tips: 'ரூ.10 - ரூ.50 பிளாஸ்டிக் கடை மற்றும் வீட்டு உபயோக பொருட்கள் மொத்த சந்தை.'
              },
              {
                id: 13,
                category: 'leather',
                name: 'ஆம்பூர் & வாணியம்பாடி நேரடி லெதர் ஆலைகள்',
                location: 'திருப்பத்தூர் மாவட்டம் (NH-48)',
                specialty: 'லெதர் ஷூக்கள், பெல்ட், பர்ஸ், பாதுகாப்பு காலணிகள் (Safety Shoes)',
                marketDays: 'அனைத்து வேலை நாட்களும் (ஆலை ஷோரூம்கள் & மொத்த கவுண்ட்டர்கள்)',
                moq: '20 ஜோடிகள் முதல் மொத்த கொள்முதல்',
                address: 'சிட்கோ தொழிற்பேட்டை வளாகம், ஆம்பூர்',
                tips: 'சர்வதேச பிராண்டுகளுக்குத் தயாரிக்கும் அதே தரத்தில் நேரடி ஆலை விலையில் பெறலாம்.'
              }
            ]
              .filter(
                (item) =>
                  (wholesaleCategory === 'all' || item.category === wholesaleCategory) &&
                  (wholesaleSearch === '' ||
                    item.name.toLowerCase().includes(wholesaleSearch.toLowerCase()) ||
                    item.specialty.toLowerCase().includes(wholesaleSearch.toLowerCase()) ||
                    item.location.toLowerCase().includes(wholesaleSearch.toLowerCase()))
              )
              .map((market) => (
                <div
                  key={market.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-blue-500/40 transition shadow-lg"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-md font-bold border border-blue-500/30">
                        {market.name}
                      </span>
                    </div>
                    <p className="text-xs text-cyan-400 mb-2 font-medium">📍 {market.location}</p>
                    <div className="bg-slate-800/60 p-3 rounded-lg text-xs text-slate-300 space-y-2 border border-slate-700/60 mb-3">
                      <p>
                        <strong className="text-amber-300">பொருட்கள்: </strong>
                        {market.specialty}
                      </p>
                      <p>
                        <strong className="text-blue-300">சந்தை நேரம்: </strong>
                        {market.marketDays}
                      </p>
                      <p>
                        <strong className="text-emerald-400">குறைந்தபட்ச அளவு (MOQ): </strong>
                        {market.moq}
                      </p>
                      <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-700/60">
                        <strong>முகவரி: </strong> {market.address}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-400 italic">💡 {market.tips}</p>
                    <button
                      onClick={() =>
                        alert(
                          `${market.name}\n\nஅமைவிடம்: ${market.location}\nமுகவரி: ${market.address}\n\nகிடைக்கும் பொருட்கள்: ${market.specialty}\nசந்தை உகந்த நேரம்: ${market.marketDays}\nMOQ: ${market.moq}\n\nகொள்முதல் குறிப்பு: ${market.tips}\n\nசரக்கு போக்குவரத்து: தமிழ்நாட்டின் அனைத்து முக்கிய லாரி பார்சல் சர்வீஸ்கள் (ABT, VRL, KPN, ARC) அருகில் உள்ளன.`
                        )
                      }
                      className="w-full py-2 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition border border-slate-700 hover:border-blue-500"
                    >
                      நேரடி வழிகாட்டல் & பார்சல் விவரம் ↗
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* கொள்முதல் பாதுகாப்பு & டிரான்ஸ்போர்ட் வழிகாட்டி அட்டை */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-xs text-slate-300 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🚚</span>
              <span>மொத்தக் கொள்முதலாளர்களுக்கான பாதுகாப்பு & பார்சல் நடைமுறைகள்</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <p className="font-bold text-cyan-300 mb-1">1. பார்சல் லாரி புக்கிங் (LR Copy)</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  சரக்கு வாங்கியதும் கடைக்காரரே உள்ளூர் டிரான்ஸ்போர்ட்டில் போட்டு LR (Lorry Receipt) ரசீதை வழங்குவார். அந்த ரசீதை வைத்து உங்கள் ஊர் குடோனில் சரக்கை டெலிவரி எடுக்கலாம்.
                </p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <p className="font-bold text-emerald-400 mb-1">2. GST பில் மற்றும் E-Way Bill</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ரூ.50,000-க்கு மேல் மதிப்புள்ள சரக்குகளுக்கு E-Way Bill கட்டாயம் தேவை. இதனால் வழியில் கமர்ஷியல் டாக்ஸ் சோதனைகளில் எந்தச் சிக்கலும் இன்றிச் சரக்கு வந்து சேரும்.
                </p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <p className="font-bold text-amber-300 mb-1">3. ஆரம்ப மாதிரி (Sample) ஆர்டர்</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  புதிய சந்தைக்குச் செல்லும்போது முதல்முறை குறைந்தபட்ச அளவில் (MOQ) சாம்பிள் வாங்கித் தரம், பேக்கிங் மற்றும் உங்கள் ஊரில் அதன் விற்பனை வேகத்தைச் சோதித்த பின் பெருமளவில் முதலீடு செய்யுங்கள்.
                </p>
              </div>
            </div>
          </div>
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
        {/* மிதக்கும் கருத்துப் பட்டன் (Floating Feedback Button) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setShowFeedbackModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-3 rounded-full shadow-2xl transition transform hover:scale-105 border border-emerald-400/40 text-xs font-bold"
        >
          <span className="text-base">💬</span>
          <span>கருத்து & ஆலோசனை</span>
        </button>
      </div>

      {/* கருத்துப் பதிவு மாடல் (Feedback Modal) */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>💬</span>
                <span>உங்கள் மேலான கருத்துகள்</span>
              </h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              "நம்ம பூமி 360" தளத்தை மேலும் மேம்படுத்த உங்கள் அனுபவத்தையும் ஆலோசனைகளையும் பகிர்ந்துகொள்ளுங்கள்.
            </p>

            <form
  onSubmit={(e) => {
    e.preventDefault();
    const textMsg = `*நம்ம பூமி 360 - பயனர் கருத்து*%0A%0A👤 *பெயர்:* ${feedbackData.name || 'குறிப்பிடப்படவில்லை'}%0A📞 *எண்:* ${feedbackData.phone || 'குறிப்பிடப்படவில்லை'}%0A📂 *பிரிவு:* ${feedbackData.targetModule}%0A⭐ *மதிப்பீடு:* ${feedbackData.rating}/5 நட்சத்திரங்கள்%0A💬 *கருத்து:* ${feedbackData.comments}`;
    window.open('https://wa.me/919962369131?text=' + textMsg, '_blank');
    setShowFeedbackModal(false);
    setFeedbackData({ name: '', phone: '', targetModule: 'அனைத்து தொகுதிகள்', rating: '5', comments: '' });
    alert('உங்கள் கருத்துகளுக்கு மனமார்ந்த நன்றிகள்!');
  }}
  className="space-y-3">

            
              <div>
                <label className="block text-xs text-slate-400 mb-1">உங்கள் பெயர்</label>
                <input
                  type="text"
                  required
                  value={feedbackData.name}
                  onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })}
                  placeholder="உதாரணம்: ரமேஷ்"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">தொடர்பு எண் (விருப்பப்பட்டால்)</label>
                <input
                  type="tel"
                  value={feedbackData.phone}
                  onChange={(e) => setFeedbackData({ ...feedbackData, phone: e.target.value })}
                  placeholder="10 இலக்க மொபைல் எண்"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">எந்தத் தொகுதி பற்றிய கருத்து?</label>
                <select
                  value={feedbackData.targetModule}
                  onChange={(e) => setFeedbackData({ ...feedbackData, targetModule: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="அனைத்து தொகுதிகள்">அனைத்து தொகுதிகள் (ஒட்டுமொத்த தளம்)</option>
                  <option value="பூமி & நிலம்">பூமி & நிலம்</option>
                  <option value="AI ஜோதிடம் & பரிகாரம்">AI ஜோதிடம் & பரிகாரம்</option>
                  <option value="விவசாயம் (Agri 360)">விவசாயம் (Agri 360)</option>
                  <option value="நிதி & கடன்கள்">நிதி & கடன்கள்</option>
                  <option value="காப்பீடு (Insurance)">காப்பீடு (Insurance)</option>
                  <option value="கல்வி & படிப்பு">கல்வி & படிப்பு</option>
                  <option value="வேலைவாய்ப்பு">வேலைவாய்ப்பு</option>
                  <option value="தொழில் & MSME">தொழில் & MSME</option>
                  <option value="ஆன்மிகம் & சுற்றுலா">ஆன்மிகம் & சுற்றுலா</option>
                  <option value="A-Z மொத்த விற்பனை">A-Z மொத்த விற்பனை</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">செயலியின் தரம் (Rating)</label>
                <select
                  value={feedbackData.rating}
                  onChange={(e) => setFeedbackData({ ...feedbackData, rating: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value="5">⭐⭐⭐⭐⭐ 5/5 - மிகச் சிறப்பு</option>
                  <option value="4">⭐⭐⭐⭐ 4/5 - நன்று</option>
                  <option value="3">⭐⭐⭐ 3/5 - திருப்திகரம்</option>
                  <option value="2">⭐⭐ 2/5 - இன்னும் மேம்படுத்தலாம்</option>
                  <option value="1">⭐ 1/5 - திருப்தியில்லை</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">உங்கள் கருத்து / ஆலோசனைகள்</label>
                <textarea
                  rows="3"
                  required
                  value={feedbackData.comments}
                  onChange={(e) => setFeedbackData({ ...feedbackData, comments: e.target.value })}
                  placeholder="செயலியைப் பற்றிய உங்கள் கருத்து அல்லது புதிய அம்சங்கள்..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="w-1/2 py-2.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-700"
                >
                  ரத்து செய்க
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition shadow-lg flex items-center justify-center gap-1.5"
                >
                  <span>அனுப்புக</span>
                  <span>↗</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </main>
    </div>
  );
}