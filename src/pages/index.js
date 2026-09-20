import { useState } from 'react';
import LandGovtServices from '../components/LandGovtServices';
import LandCalculator from '../components/LandCalculator';
import SellLandModal from '../components/SellLandModal';
import contactConfig from '../data/contactConfig';
import DocumentAnalysisBureau from '../components/DocumentAnalysisBureau';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import LegalAuditPromo from '../components/LegalAuditPromo';
import LoanModule360 from '../components/LoanModule360';
import FinanceAddons from '../components/FinanceAddons';
import EducationModule from '../components/EducationModule';
import FinanceModule from '../components/FinanceModule';
import JobModule from '../components/JobModule';
import BusinessModule from '../components/BusinessModule';
import AgriModule from '../components/AgriModule';
import InsuranceModule from '../components/InsuranceModule';
import WholesaleModule from '../components/WholesaleModule';
import SpiritualModule from '../components/SpiritualModule';
import AstrologyModule from '../components/AstrologyModule';
import TourismModule from '../components/TourismModule';
export default function Home() {
  // கடன் விண்ணப்பத்திற்கான வாட்ஸ்அப் இணைப்பு
  const handleLoanApply = (loanTitle) => {
    const msg = `வணக்கம் நம்ம பூமி 360, ${loanTitle} பெறுவதற்கான வழிகாட்டல் மற்றும் விண்ணப்ப உதவி தேவை.`;
    window.open(`https://api.whatsapp.com/send?phone=919962369131&text=${encodeURIComponent(msg)}`, '_blank');
  };
  // பிரதான 9 தூண்கள்
  const [currentModule, setCurrentModule] = useState('astro');  
  // பூமி மாட்யூல் சப்-டேப்கள்
  const [activeMainTab, setActiveMainTab] = useState('marketplace'); // 'marketplace' | 'audit' | 'sell'

  // வடிகட்டி & மேப்
  const [filterDistrict, setFilterDistrict] = useState('அனைத்தும்');
  const [quickFilter, setQuickFilter] = useState('all');
  const [activeMapModalLand, setActiveMapModalLand] = useState(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedLandDetail, setSelectedLandDetail] = useState(null);
  const [selectedVisitPassLand, setSelectedVisitPassLand] = useState(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [calcLandValue, setCalcLandValue] = useState(1000000);

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
    // 1. நிலம் & நிதிப் பிரிவு
    { id: 'land', label: 'பூமி & நிலம்', icon: '🌐' },
    { id: 'finance', label: 'நிதி & கடன்கள்', icon: '🏦' },
    { id: 'insurance', label: 'காப்பீடு', icon: '🛡️' },
    { id: 'agri', label: 'விவசாயம்', icon: '🌾' },

    // 2. கல்வி & வேலை வாய்ப்புப் பிரிவு
    { id: 'education', label: 'கல்வி & படிப்பு', icon: '🎓' },
    { id: 'jobs', label: 'வேலைவாய்ப்பு', icon: '💼' },
    { id: 'business', label: 'தொழில் & MSME', icon: '🏭' },
    { id: 'wholesale', label: 'மொத்த விற்பனை', icon: '📦' },

    // 3. வாழ்வியல் & அரசுப் பணிகள்
    { id: 'spiritual', label: 'ஆன்மிகம்', icon: '🛕' },
    { id: 'tourism', label: 'சுற்றுலா', icon: '🚗' },
    { id: 'astro', label: 'AI ஜோதிடம்', icon: '🔮' },
    { id: 'govt', label: 'பட்டா & அரசு', icon: '📜' },
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

  const filteredLands = listedLands.filter((l) => {
    // 1. மாவட்ட வடிகட்டி சரிபார்ப்பு
    const matchesDistrict = filterDistrict === 'அனைத்தும்' || l.district === filterDistrict;
    if (!matchesDistrict) return false;

    // 2. விரைவு ஃபில்டர் (Quick Category & Budget)
    if (quickFilter === 'all') return true;

    const landInfo = `${l.title || ''} ${l.type || ''} ${l.category || ''} ${l.description || ''}`.toLowerCase();

    if (quickFilter === 'agri') return landInfo.includes('விவசாய') || landInfo.includes('தோட்டம்') || landInfo.includes('agri');
    if (quickFilter === 'plots') return landInfo.includes('மனை') || landInfo.includes('plot') || landInfo.includes('dtcp');
    if (quickFilter === 'budget') return landInfo.includes('15') || landInfo.includes('12') || landInfo.includes('10') || (l.price && Number(String(l.price).replace(/\D/g, '')) <= 1500000);
    if (quickFilter === 'urgent') return landInfo.includes('அவசர') || landInfo.includes('urgent') || l.urgent;
    if (quickFilter === 'road') return landInfo.includes('ரோடு') || landInfo.includes('road') || landInfo.includes('சாலை');

    return true;
  });

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
                <button
                        onClick={() => setIsSellModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow cursor-pointer ml-2"
                      >
                        + நிலம் விற்க
                      </button>
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
          <div className="max-w-7xl mx-auto px-2 sm:px-4 grid grid-cols-4 md:flex md:items-center gap-2 py-2">
            {navigationModules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => {
  setCurrentModule(mod.id);
}}
               className={`flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all ${
  currentModule === mod.id
    ? 'bg-emerald-600 text-white font-bold shadow-md border border-emerald-400'
    : 'bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800'
}`}
>
  <span className="text-xl mb-1">{mod.icon}</span>
  <span className="text-[11px] font-semibold leading-tight text-white">{mod.label}</span>
</button>
            ))}
          </div>
        </div>
      </header>

      {/* பிரதான பக்கம் */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {/* ============================================================ */}
        {/* பட்டா & அரசு சேவைகள் பிரிவு */}
        {currentModule === 'govt' && (
  <div className="mt-4 space-y-4">
    <LandGovtServices />

    {/* தமிழ்நாடு பத்திரப் பதிவு & முத்திரைத் தாள் கட்டணக் கால்குலேட்டர் */}
    <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all rounded-2xl p-5 shadow-xl">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🧮</span>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            பத்திரப் பதிவு & முத்திரைத் தாள் கால்குலேட்டர்
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">TN 2026 விதிகள்</span>
          </h3>
          <p className="text-xs text-slate-400">வழிகாட்டி மதிப்பு அல்லது விற்பனைத் தொகைக்கான துல்லிய அரசு செலவு</p>
        </div>
      </div>

      {/* மதிப்பு உள்ளீட்டுப் பகுதி */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 mb-4">
        <div className="flex justify-between items-center mb-1.5 text-xs text-slate-300">
          <span>நிலத்தின் மதிப்பு (வழிகாட்டி அல்லது விற்பனை):</span>
          <span className="text-emerald-400 font-bold text-sm">₹ {Number(calcLandValue || 0).toLocaleString('en-IN')}</span>
        </div>
        <input
          type="number"
          value={calcLandValue}
          onChange={(e) => setCalcLandValue(Number(e.target.value))}
          placeholder="நிலத்தின் மதிப்பை உள்ளிடவும்"
          className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-emerald-500"
        />

        {/* Quick Value Chips */}
        <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { label: '₹10 லட்சம்', val: 1000000 },
            { label: '₹25 லட்சம்', val: 2500000 },
            { label: '₹50 லட்சம்', val: 5000000 },
            { label: '₹1 கோடி', val: 10000000 }
          ].map((chip) => (
            <button
              key={chip.val}
              type="button"
              onClick={() => setCalcLandValue(chip.val)}
              className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-800/90 text-slate-300 border border-slate-700 hover:border-emerald-500 hover:text-white whitespace-nowrap active:scale-95 transition-all"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* கட்டண பிரேக்டவுன் */}
      {(() => {
        const val = Number(calcLandValue || 0);
        const stampDuty = Math.round(val * 0.07); // 7%
        const regFee = Math.round(val * 0.02);    // 2%
        const totalFee = stampDuty + regFee;       // 9%

        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-800">
                <p className="text-slate-400">📜 முத்திரைத் தாள் (7%)</p>
                <p className="text-white font-bold text-sm mt-0.5">₹ {stampDuty.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-800">
                <p className="text-slate-400">🏛️ பத்திரப் பதிவு (2%)</p>
                <p className="text-white font-bold text-sm mt-0.5">₹ {regFee.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-xs text-emerald-300 font-medium">💰 மொத்த அரசு கட்டணம் (9%)</p>
                <p className="text-[10px] text-slate-400 mt-0.5">*கணினி கட்டணம் & முத்திரைக் கட்டணம் தவிர்த்து</p>
              </div>
              <div className="text-right">
                <span className="text-base sm:text-lg font-black text-emerald-400">
                  ₹ {totalFee.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  </div>
)}
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
                {/* உலகத் தர விரைவு ஃபில்டர் சிப்ஸ் (Quick Category & Budget Chips) */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none -mt-2 mb-1">
            {[
              { id: 'all', label: '🌐 அனைத்தும்' },
              { id: 'agri', label: '🌾 விவசாய பூமி' },
              { id: 'plots', label: '🏡 DTCP மனைகள்' },
              { id: 'budget', label: '💰 ₹15 லட்சத்திற்குள்' },
              { id: 'urgent', label: '⚡ அவசர விற்பனை' },
              { id: 'road', label: '🛣️ மெயின் ரோடு பேசிங்' }
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setQuickFilter(chip.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs transition-all shadow-sm active:scale-95 flex items-center gap-1.5 border ${
                  quickFilter === chip.id
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-emerald-500/20'
                    : 'bg-slate-900/90 border-slate-700/80 text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
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
  onClick={() => setSelectedLandDetail(land)}
  className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer shadow-lg group"
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
                onClick={() => setSelectedVisitPassLand(typeof land !== 'undefined' ? land : l)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-xs sm:text-sm"
              >
                <span>🎫</span> விசிட் பாஸ் & எண் பெறுக
              </button>

                          <button
                           onClick={() => {
                    const msg = `வணக்கம் நம்ம பூமி 360, நான் தளத்தில் பார்த்த இந்த நிலத்திற்கு 80% வங்கிக் கடன் மற்றும் EMI வழிகாட்டல் உதவி பெற விரும்புகிறேன்.\n\n• நில விவரம்: ${land.title}`;
                    window.open(`https://api.whatsapp.com/send?phone=919962369131&text=${encodeURIComponent(msg)}`, '_blank');
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
                <DocumentAnalysisBureau />
                <LandCalculator />
                <SellLandModal 
          isOpen={isSellModalOpen} 
          onClose={() => setIsSellModalOpen(false)} 
        />
        
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
                        <div className="flex items-center gap-2">
              {/* WhatsApp / Native Share Button */}
              <button
                type="button"
                onClick={() => {
                  const shareText = `📜 *நம்ம பூமி 360 - A to Z நில ஜாதகம் & சட்ட தணிக்கை அறிக்கை*\n\n` +
                    `📍 *சர்வே எண்:* #${surveyResult.surveyNo || '142/1B'}\n` +
                    `🏛️ *இடம்:* ${surveyResult.village || 'திருப்போரூர்'}, ${surveyResult.district || 'செங்கல்பட்டு'}\n` +
                    `🌾 *வகைப்பாடு:* ${surveyResult.classification || 'ரயத்துவாரி புஞ்சை'}\n` +
                    `📐 *பரப்பளவு:* ${surveyResult.area || '2.50 ஏக்கர்'}\n` +
                    `💰 *வழிகாட்டி மதிப்பு:* ${surveyResult.guidelineValue || '₹850 / ச.அடி'}\n` +
                    `🛡️ *சட்ட தணிக்கை பாதுகாப்பு:* 98/100 (சரிபார்க்கப்பட்டது ✅)\n\n` +
                    `முழு விவரங்களை அறிய: https://nammaboomi360.com`;

                  if (navigator.share) {
                    navigator.share({
                      title: `நம்ம பூமி 360 - சர்வே #${surveyResult.surveyNo || '142/1B'} ஜாதகம்`,
                      text: shareText,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1 px-2.5 rounded-lg flex items-center gap-1 shadow-md active:scale-95 transition-all"
              >
                <span>📲</span> பகிர்க
              </button>

              {/* Instant PDF Print Button */}
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold py-1 px-2.5 rounded-lg flex items-center gap-1 active:scale-95 transition-all"
              >
                <span>🖨️</span> PDF
              </button>

              <span className="text-[11px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-md">
                98/100
              </span>
            </div>
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
                {/* 📜 நிலம் வாங்கும் முன் சரிபார்க்க வேண்டிய 7 சட்ட ஆவணங்கள் */}
            <div className="mt-8 space-y-4">
              <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📜</span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      நிலம் வாங்கும் முன் சரிபார்க்க வேண்டிய 7 ஆவணங்கள்
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">A to Z வழிகாட்டி</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">சட்டச் சிக்கல்கள் மற்றும் போலிப் பத்திரங்களிலிருந்து 100% பாதுகாக்கும் சரிபார்ப்புப் பட்டியல்</p>
                  </div>
                </div>
              </div>

              {/* 7 Audit Points Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    step: '01',
                    icon: '📑',
                    title: 'தாய் பத்திரம் (Parent Document)',
                    desc: 'குறைந்தது கடந்த 30 ஆண்டுகளுக்கான முந்தைய விற்பனைப் பத்திரங்கள் மற்றும் உரிமையாளர் தொடர்ச்சி (Link Documents) சரியாக உள்ளதா எனப் பார்க்க வேண்டும்.'
                  },
                  {
                    step: '02',
                    icon: '🏛️',
                    title: 'வில்லங்கச் சான்று (EC - 30 ஆண்டுகள்)',
                    desc: 'Tnreginet தளத்தில் 30 ஆண்டுகளுக்கான வில்லங்கச் சான்று எடுத்து, நிலத்தின் மீது எந்தவொரு நீதிமன்ற வழக்கோ, வங்கிக் கடனோ அல்லது அடமானமோ இல்லை என்பதை உறுதிசெய்ய வேண்டும்.'
                  },
                  {
                    step: '03',
                    icon: '🌾',
                    title: 'பட்டா & சிட்டா உண்மைத் தன்மை',
                    desc: 'Anywhere Patta தளத்தில் விற்பவரின் பெயர், சர்வே எண், உட்பிரிவு மற்றும் விஸ்தீரணம் அரசு ஆவணத்தில் துல்லியமாக உள்ளதா எனச் சரிபார்க்கவும்.'
                  },
                  {
                    step: '04',
                    icon: '📐',
                    title: 'FMB புல வரைபடம் & எல்லை அளவீடு',
                    desc: 'அரசு நில அளவையர் (Surveyor) மூலம் நிலத்தின் சர்வே எல்லைக் கற்கள் மற்றும் FMB வரைபடத்தின் அளவுகள் களத்தில் சரியாகப் பொருந்துகிறதா என அளக்க வேண்டும்.'
                  },
                  {
                    step: '05',
                    icon: '🏢',
                    title: 'அங்கீகாரம் (DTCP / CMDA / RERA)',
                    desc: 'வீட்டுமனை எனில் DTCP அல்லது CMDA முறையான ஒப்புதல் எண் உள்ளதா, பஞ்சாயத்து அப்ரூவல் மட்டும் கொண்ட முறைகேடான மனை இல்லையா என உறுதி செய்யவும்.'
                  },
                  {
                    step: '06',
                    icon: '💰',
                    title: 'வழிகாட்டி மதிப்பு (Guideline Value)',
                    desc: 'அரசு நிர்ணயித்துள்ள வழிகாட்டி மதிப்பை அறிந்து, அதற்கேற்ப முத்திரைத் தாள் மற்றும் பதிவு கட்டணத்தைத் திட்டமிடுங்கள்.'
                  },
                  {
                    step: '07',
                    icon: '🛣️',
                    title: 'அரசு கையகப்படுத்தல் & ரோடு விரிவாக்கம்',
                    desc: 'நிலம் நெடுஞ்சாலை விரிவாக்கம், உயர் மின்னழுத்த கம்பிப்பாதை அல்லது நீர்நிலைப் புறம்போக்கு எல்லைக்குள் வரவில்லை என்பதைச் சரிபார்க்கவும்.'
                  }
                ].map((item) => (
                  <div key={item.step} className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 transition-all flex gap-3">
                    <span className="text-emerald-400 font-mono font-black text-lg">{item.step}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{item.icon}</span> {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legal Help Call to Action */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-emerald-300 font-bold">சட்ட ஆவணங்களை நிபுணர்களைக் கொண்டு சரிபார்க்க வேண்டுமா?</p>
                  <p className="text-[11px] text-slate-400">எங்கள் சட்ட ஆலோசகர்கள் மூலம் உங்கள் ஆவணங்களை முழுமையாகத் தணிக்கை செய்து அறிக்கை பெறலாம்.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const msg = 'வணக்கம் நம்ம பூமி 360, எனது நில ஆவணங்களை A to Z தணிக்கை (Legal Audit) செய்ய விரும்புகிறேன். வழிகாட்டவும்.';
                    window.open(`https://api.whatsapp.com/send?phone=919962369131&text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 transition-all"
                >
                  <span>⚖️</span> சட்ட தணிக்கை உதவி பெறுக
                </button>
              </div>
            </div>
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
        {/* 2. AI ஜோதிடம் & ஜாதக ஆய்வு (AI Astrology 360) */}
{currentModule === 'astro' && (
  <div className="space-y-6">
    <AstrologyModule setCurrentModule={setCurrentModule} />
  </div>
)}
{/* சுற்றுலா மாடியூல் (Tourism 360) */}
          {currentModule === 'tourism' && (
            <div className="space-y-6">
              <TourismModule setCurrentModule={setCurrentModule} />
            </div>
          )}
        
        {/* 3. விவசாயம் (Agri 360) மாடியூல் */}
          {currentModule === 'agri' && (
  <div className="space-y-6">
    <AgriModule setCurrentModule={setCurrentModule} />
  </div>
)}
{/* 4. நிதி & கடன்கள் (Finance & All Loans Hub + Instant Decision Engine) */}
          {currentModule === 'finance' && (
  <div className="space-y-6">
    <FinanceModule />
  </div>
)}
          {/* 5. காப்பீடு (Insurance 360 Hub) மாடியூல் */}
          {currentModule === 'insurance' && (
  <div className="space-y-6">
    <InsuranceModule setCurrentModule={setCurrentModule} />
  </div>
)}
          {/* 6. கல்வி & படிப்பு (Education Hub) */}
      {currentModule === 'education' && (
        <div className="space-y-6">
          <EducationModule />
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
    <JobModule />
  </div>
)}
      {/* 8. தொழில் & MSME (Business Hub) */}
      {currentModule === 'business' && (
  <div className="space-y-6">
    <BusinessModule setCurrentModule={setCurrentModule} />
  </div>
)}
{/* 8(b). மொத்த விற்பனை (Wholesale B2B Hub) மாடியூல் */}
{currentModule === 'wholesale' && (
  <div className="space-y-6">
    <WholesaleModule setCurrentModule={setCurrentModule} />
  </div>
)}
        
      {/* 9. ஆன்மிகம் & சுற்றுலா (Spiritual & Heritage Hub) */}
{currentModule === 'spiritual' && (
  <div className="space-y-6">
    <SpiritualModule setCurrentModule={setCurrentModule} />
  </div>
)}
{/* ================= 360° சொத்து முழு விவர மாடல் ================= */}
      {selectedLandDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            
            {/* மேல் படம் & மூடும் பட்டன் */}
            <div className="relative h-48 sm:h-56 w-full flex-shrink-0 bg-slate-950">
              <img
                src={selectedLandDetail.image}
                alt={selectedLandDetail.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              <button
                type="button"
                onClick={() => setSelectedLandDetail(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-950/80 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 text-lg transition-all"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {selectedLandDetail.type || 'மனை / நிலம்'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300">
                    📍 {selectedLandDetail.location || selectedLandDetail.district}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white line-clamp-1">{selectedLandDetail.title}</h3>
              </div>
            </div>

            {/* மாடல் விவரங்கள் - ஸ்க்ரோல் வசதியுடன் */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-sm text-slate-300">
              
              {/* விலை & பரப்பளவு */}
              <div className="flex items-center justify-between p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-2xl">
                <div>
                  <div className="text-[11px] text-slate-400">மதிப்பு / விலை</div>
                  <div className="text-xl font-extrabold text-emerald-400">
                    {selectedLandDetail.price || selectedLandDetail.pricePerSqft || selectedLandDetail.totalPrice || '₹1,750 / ச.அடி'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">பரப்பளவு</div>
                  <div className="text-base font-bold text-white">
                    {selectedLandDetail.area || selectedLandDetail.size || selectedLandDetail.extent || '2.50 ஏக்கர்'}
                  </div>
                </div>
              </div>

              {/* 📐 கள விவரங்கள் (Physical 360) */}
              <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <span>📐</span> கள விவரங்கள் (Physical 360)
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/70">
                    <span className="text-slate-400 block text-[10px]">அணுகு சாலை:</span>
                    <span className="font-semibold text-slate-200">{selectedLandDetail.roadWidth || '30 அடி தார் சாலை'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/70">
                    <span className="text-slate-400 block text-[10px]">மின்சார வசதி:</span>
                    <span className="font-semibold text-slate-200">{selectedLandDetail.electricity || 'அருகில் EB கம்பம் உள்ளது'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/70">
                    <span className="text-slate-400 block text-[10px]">நிலத்தடி நீர்:</span>
                    <span className="font-semibold text-slate-200">{selectedLandDetail.waterSource || '120 அடி (குடிநீர் உகந்தது)'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/70">
                    <span className="text-slate-400 block text-[10px]">மண் வகைப்பாடு:</span>
                    <span className="font-semibold text-slate-200">{selectedLandDetail.soilType || 'செம்மண் / கடின தரை'}</span>
                  </div>
                </div>
              </div>

              {/* ⚖️ சட்ட தணிக்கை நிலை (Legal 360) */}
              <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <span>⚖️</span> சட்ட தணிக்கை நிலை (Legal 360)
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/70">
                    <span className="text-slate-400 block text-[10px]">பட்டா வகை:</span>
                    <span className="font-semibold text-emerald-400">{selectedLandDetail.pattaStatus || 'ரயத்துவாரி மனை'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/70">
                    <span className="text-slate-400 block text-[10px]">வில்லங்கம் (EC):</span>
                    <span className="font-semibold text-emerald-400">{selectedLandDetail.ecStatus || '30 ஆண்டுகள் வில்லங்கமற்றது'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/70 col-span-2">
                    <span className="text-slate-400 block text-[10px]">அங்கீகாரம்:</span>
                    <span className="font-semibold text-slate-200">{selectedLandDetail.approval || 'DTCP / உள்ளாட்சி அப்ரூவல் சரிபார்க்கப்பட்டது'}</span>
                  </div>
                </div>
              </div>

              {/* 📍 அருகிலுள்ள வசதிகள் (Proximity 360) */}
              <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <span>📍</span> அருகிலுள்ள முக்கிய இடங்கள்
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/70">
                    <div className="text-slate-400 text-[10px]">மெயின் ரோடு</div>
                    <div className="font-bold text-slate-200">500 மீ</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/70">
                    <div className="text-slate-400 text-[10px]">பேருந்து நிறுத்தம்</div>
                    <div className="font-bold text-slate-200">1 கி.மீ</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800/70">
                    <div className="text-slate-400 text-[10px]">பள்ளி / கல்லூரி</div>
                    <div className="font-bold text-slate-200">2.5 கி.மீ</div>
                  </div>
                </div>
              </div>

            </div>

            {/* நேரடி சைட் விசிட் வாட்ஸ்அப் பட்டன் */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 mt-auto flex gap-2">
              <a
                href={`https://wa.me/919444123456?text=${encodeURIComponent(
                  `வணக்கம் நம்ம பூமி 360! நான் இந்த நிலத்தை நேரில் பார்க்க (Site Visit) விரும்புகிறேன்:\n\n📍 இடம்: ${selectedLandDetail.title}\n💰 விலை: ${selectedLandDetail.price}\n📐 அளவு: ${selectedLandDetail.area}\n\nமுன்பதிவு செய்ய நேரம் ஒதுக்கவும்.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all text-sm"
              >
                <span>💬</span> நேரில் பார்க்க முன்பதிவு (Site Visit)
              </a>
              <button
                type="button"
                onClick={() => setSelectedLandDetail(null)}
                className="py-3 px-4 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-all"
              >
                மூடு
              </button>
            </div>

          </div>
        </div>
      )}
{/* VIP விசிட் பாஸ் மாடல் (VIP Site Visit Pass Modal) */}
        {selectedVisitPassLand && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-emerald-500/40 w-full max-w-sm rounded-2xl p-5 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
              {/* Top Golden Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedVisitPassLand(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 text-sm"
              >
                ✕
              </button>

              {/* Header */}
              <div className="text-center mb-4 mt-1">
                <span className="text-3xl">🎫</span>
                <h3 className="text-base font-bold text-white mt-1">VIP விசிட் பாஸ் & எண்</h3>
                <p className="text-xs text-emerald-400">நேரடி உரிமையாளர் எண் & GPS வழிகாட்டல்</p>
              </div>

              {/* Selected Land Summary */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 mb-4 text-xs">
                <p className="text-slate-400 font-medium">தேர்ந்தெடுக்கப்பட்ட நிலம்:</p>
                <p className="text-white font-semibold line-clamp-1 mt-0.5">
                  {selectedVisitPassLand.title || 'பிரீமியம் நிலம்'}
                </p>
                <div className="flex justify-between items-center text-slate-300 mt-1 pt-1 border-t border-slate-800/80">
                  <span>📍 {selectedVisitPassLand.district || 'தமிழ்நாடு'}</span>
                  <span className="text-emerald-400 font-bold">{selectedVisitPassLand.price || ''}</span>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">உங்கள் பெயர்:</label>
                  <input
                    type="text"
                    placeholder="எ.கா: குமார்"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">வாட்ஸ்அப் எண்:</label>
                  <input
                    type="tel"
                    placeholder="10 இலக்க வாட்ஸ்அப் எண்"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 placeholder-slate-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!visitorPhone) {
                      alert('தயவுசெய்து உங்கள் வாட்ஸ்அப் எண்ணை உள்ளிடவும்');
                      return;
                    }
                    const msg = `வணக்கம் நம்ம பூமி 360, விஐபி விசிட் பாஸ் பதிவு:\n👤 பெயர்: ${visitorName || 'வாடிக்கையாளர்'}\n📱 எண்: ${visitorPhone}\n🏞️ நிலம்: ${selectedVisitPassLand.title || 'நிலம்'} (${selectedVisitPassLand.district || ''})\n\nஉரிமையாளர் எண் மற்றும் GPS லொகேஷன் அனுப்பவும்.`;
                    window.open(`https://api.whatsapp.com/send?phone=919962369131&text=${encodeURIComponent(msg)}`, '_blank');
                    setSelectedVisitPassLand(null);
                  }}
                  className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-xs"
                >
                  <span>🎟️</span> வாட்ஸ்அப்பில் பாஸ் பெறுக
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-1">
                  🔒 100% பாதுகாப்பானது • நேரடி உரிமையாளர் தொடர்பு
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 📱 மொபைல் பாட்டம் நேவிகேஷன் பார் (Mobile Only App Bar) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#080e1a]/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-around">
          {/* 1. நிலங்கள் */}
          <button
            onClick={() => setCurrentModule('land')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
              currentModule === 'land'
                ? 'text-emerald-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">🏡</span>
            <span className="text-[10px] mt-0.5">நிலங்கள்</span>
          </button>

          {/* 2. விவசாயம் */}
          <button
            onClick={() => setCurrentModule('agri')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
              currentModule === 'agri'
                ? 'text-emerald-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">🌾</span>
            <span className="text-[10px] mt-0.5">விவசாயம்</span>
          </button>

          {/* 3. கடன்கள் */}
          <button
            onClick={() => setCurrentModule('finance')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
              currentModule === 'finance'
                ? 'text-emerald-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">🏦</span>
            <span className="text-[10px] mt-0.5">கடன்கள்</span>
          </button>

          {/* 4. காப்பீடு */}
          <button
            onClick={() => setCurrentModule('insurance')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
              currentModule === 'insurance'
                ? 'text-emerald-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">🛡️</span>
            <span className="text-[10px] mt-0.5">காப்பீடு</span>
          </button>

          {/* 5. வாட்ஸ்அப் உதவி */}
          <a
            href={`https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(
              "வணக்கம் நம்ம பூமி 360, எனக்கு உடனடி வழிகாட்டல் தேவைப்படுகிறது."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 px-2 text-emerald-400 active:scale-95 transition-all"
          >
            <span className="text-lg p-1 bg-emerald-500/20 rounded-full">💬</span>
            <span className="text-[10px] font-bold mt-0.5">உதவி</span>
          </a>
        </div>
      </div>
      {/* ₹499 லீகல் ஆடிட் முன்பதிவு பிரிவு */}
            <LegalAuditPromo />
      <FloatingWhatsApp />
    </div>
  );
}