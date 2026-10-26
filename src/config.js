// src/config.js
export const SITE_CONFIG = {
  appName: 'நம்ம பூமி 360',
  supportWhatsApp: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '919962369131',
  supportEmail: 'contact@nammaboomi360.com',
  merchantUpi: process.env.NEXT_PUBLIC_MERCHANT_UPI || 'business@upi',
};
// வாட்ஸ்அப் URL உருவாக்கும் மையச் செயல்பாடு
export const getWhatsAppUrl = (message = '', phone = SITE_CONFIG.supportWhatsApp) => {
  const cleanPhone = String(phone).replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
// 1. 12 முதன்மை வாழ்வியல் மெனுக்கள் (அசல் ID அமைப்பில்)
export const LIFE_SERVICES_NAV = [
  // 1. நிலம் & நிதிப் பிரிவு
  { id: 'land', label: 'பூமி & நிலம்', icon: '🌐' },
  { id: 'finance', label: 'நிதி & கடன்கள்', icon: '🏢' },
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
  { id: 'heritage', label: 'தமிழர் மரபு', icon: '🏛️' }
];

// 2. 3 முதன்மை டிஜிட்டல் ஸ்டுடியோக்கள்
export const DIGITAL_STUDIOS = [
  {
    id: 'resume',
    icon: '💼',
    badge: 'Harvard ATS 1-Page',
    title: 'ATS Resume Studio',
    desc: 'முன்னணி நிறுவனங்கள் ஏற்கும் வகையில் உலகத்தரம் வாய்ந்த ஒற்றைப் பக்க ரெஸ்யூம்களை நொடியில் உருவாக்கலாம்.',
    link: '/resume',
    btnText: 'ரெஸ்யூம் உருவாக்குக',
    borderHover: 'hover:border-emerald-500/50',
    badgeStyle: 'text-emerald-400 bg-emerald-950/70 border-emerald-500/20',
    iconBg: 'bg-emerald-500/10 border-emerald-500/30',
    btnBg: 'bg-emerald-600 hover:bg-emerald-500'
  },
  {
    id: 'dpr',
    icon: '📊',
    badge: 'PMEGP • UYEGP • MUDRA',
    title: 'வங்கி கடன் திட்ட அறிக்கை (DPR)',
    desc: 'அரசு மானியக் கடன்களுக்கு வங்கிகள் ஏற்கும் விரிவான தொழில் திட்ட அறிக்கைகளைத் தயார் செய்யலாம்.',
    link: '/msme-project',
    btnText: 'அறிக்கை உருவாக்குக',
    borderHover: 'hover:border-indigo-500/50',
    badgeStyle: 'text-indigo-400 bg-indigo-950/70 border-indigo-500/20',
    iconBg: 'bg-indigo-500/10 border-indigo-500/30',
    btnBg: 'bg-indigo-600 hover:bg-indigo-500'
  },
  {
    id: 'applications',
    icon: '🏛️',
    badge: 'Revenue • EB • Bank • NOC',
    title: 'அரசு & வங்கி விண்ணப்ப மையம்',
    desc: 'பட்டா பெயர் மாற்றம், EB இணைப்பு, வங்கி வாரிசுரிமை, RTI மனு & வாரிசுகளின் NOC பத்திரம்.',
    link: '/applications',
    btnText: 'விண்ணப்பம் உருவாக்குக',
    borderHover: 'hover:border-teal-500/50',
    badgeStyle: 'text-teal-400 bg-teal-950/70 border-teal-500/20',
    iconBg: 'bg-teal-500/10 border-teal-500/30',
    btnBg: 'bg-teal-600 hover:bg-teal-500'
  }
];
// மாவட்ட & தாலுகா வழிகாட்டித் தரவு
export const LOCATION_DATA = {
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
// சர்வே சரிபார்ப்பு நிலத் தகவல் தரவுத்தளம் (Survey Lookup Database)
export const FULL_LAND_DATABASE = {
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
    futureGrowth: 'அடுத்த 3-5 ஆண்டுகளில் 35% முதல் 50% வரை மதிப்பு உயர்...',
    trustScore: 98,
    trustGrade: 'A+ (உயர் நம்பகத்தன்மை)',
    legalChecks: [
      { label: 'நீர்நிலை / கால்வாய் புறம்போக்கு சோதனை', status: 'பாதுகாப்பானது' },
      { label: 'அரசு கையகப்படுத்துதல் (Land Acquisition) நோட்டீஸ்', status: 'நோட்டீஸ் எதுவுமில்லை' },
      { label: 'HR&CE கோவில் / வக்பு வாரிய உரிமைச் சோதனை', status: 'தனிநபர் பட்டா' },
      { label: 'பஞ்சமி / பூமிதான நிபந்தனை நில சோதனை', status: 'ரயத்துவாரி வகைப்பாடு' },
      { label: 'உயர் மின்னழுத்த கம்பி (HT Line) & கேஸ் பைப்லைன்', status: 'பாதுகாப்பான தொலைவு' },
      { label: '30 ஆண்டுகள் வில்லங்க ஆய்வு (EC Verification)', status: 'வில்லங்கங்கள் ஏதுமில்லை' }
    ],
    waterLevel: '80 முதல் 110 அடியில் வற்றாத நல்ல குடிநீர் ஊற்று கிடைக்கு...',
    soilType: 'செம்பொறை மண் கலந்த சரளை (Red Gravel Soil) - அதிக எடை தாங்கும்...',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Thiruporur,+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed'
  }
};
// மாதிரி சர்வே தரவு உருவாக்கும் ஹெல்பர் (Mock Land Fallback Generator)
export const generateMockLandSurvey = ({ cleanSurvey, selectedDistrict, selectedTaluk, village }) => {
  return {
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
    futureGrowth: 'அடுத்த 3-5 ஆண்டுகளில் 30% முதல் 40% வரை மதிப்பு வளர்ச்சி',
    trustScore: 96,
    trustGrade: 'A+ (உயர் நம்பகத்தன்மை)',
    legalChecks: [
      { label: 'நீர்நிலை / கால்வாய் புறம்போக்கு சோதனை', status: 'பாதுகாப்பானது' },
      { label: 'அரசு கையகப்படுத்துதல் நோட்டீஸ்', status: 'நோட்டீஸ் எதுவுமில்லை' },
      { label: 'HR&CE கோவில் / வக்பு வாரிய உரிமைச் சோதனை', status: 'தனிநபர் பட்டா' },
      { label: 'பஞ்சமி நில சோதனை', status: 'ரயத்துவாரி வகைப்பாடு' },
      { label: 'உயர் மின்னழுத்த கம்பி & கேஸ் பைப்லைன்', status: 'பாதுகாப்பான தொலைவு' },
      { label: '30 ஆண்டுகள் வில்லங்க ஆய்வு (EC Verification)', status: 'வில்லங்கங்கள் ஏதுமில்லை' }
    ],
    waterLevel: '80 முதல் 100 அடியில் நல்ல குடிநீர் ஆதாரம்'
  };
};
// நிதி சார்ந்த அமைப்புகள்
export const FINANCE_CONFIG = {
  defaultHomeLoanRate: 8.5
};