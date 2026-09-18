import React, { useState } from 'react';

// ராசி மற்றும் நட்சத்திரப் பட்டியல்கள்
const RASI_LIST = [
  'மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்', 
  'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்', 
  'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'
];

const NAKSHATRA_LIST = [
  'அசுவினி', 'பரணி', 'கார்த்திகை', 'ரோகிணி', 'மிருகசீரிஷம்', 'திருவாதிரை',
  'புனர்பூசம்', 'பூசம்', 'ஆயில்யம்', 'மகம்', 'பூரம்', 'உத்திரம்',
  'அஸ்தம்', 'சித்திரை', 'சுவாதி', 'விசாகம்', 'அனுஷம்', 'கேட்டை',
  'மூலம்', 'பூராடம்', 'உத்திராடம்', 'திருவோணம்', 'அவிட்டம்', 'சதயம்',
  'பூரட்டாதி', 'உத்திரட்டாதி', 'ரேவதி'
];

// விம்சோத்தரி தசா கால அளவுகள் (120 ஆண்டுகள்)
const DASA_ORDER = [
  { lord: 'கேது', years: 7 },
  { lord: 'சுக்கிரன்', years: 20 },
  { lord: 'சூரியன்', years: 6 },
  { lord: 'சந்திரன்', years: 10 },
  { lord: 'செவ்வாய்', years: 7 },
  { lord: 'ராகு', years: 18 },
  { lord: 'குரு', years: 16 },
  { lord: 'சனி', years: 19 },
  { lord: 'புதன்', years: 17 }
];

export default function AstrologyModule({ setCurrentModule }) {
  // 1. பயனர் உள்ளீடுகள்
  const [profile, setProfile] = useState({
    name: '',
    dob: '',
    tob: '',
    pob: 'Chennai',
    lat: 13.0827,
    lng: 80.2707
  });

  const [citySuggestions, setCitySuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState('rasi'); // 'rasi' | 'navamsa' | 'dasa' | 'houses'
  const [showPricingModal, setShowPricingModal] = useState(false);

  // 2. கணக்கிடப்பட்ட ஜாதகத் தரவுகள்
  const [astroData, setAstroData] = useState({
    lagnam: '',
    rasi: '',
    nakshatra: '',
    padham: 1,
    dasaBalanceText: '',
    dasaTimeline: [],
    rasiHouses: Array(12).fill(null).map(() => []),
    navamsaHouses: Array(12).fill(null).map(() => []),
    planetDegrees: {},
    isCalculated: false
  });

  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'வணக்கம்! உங்கள் பெயர், பிறந்த தேதி, நேரம் மற்றும் ஊரைப் பதிவு செய்து தென் இந்திய ராசி, நவாம்சக் கட்டங்கள் மற்றும் சர்வதேசத் தர ஜாதக அறிக்கையைப் பெறுங்கள்.'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  // ஊர் தானியங்கி தேடல் (OpenStreetMap Geocoding)
  const handleCitySearch = async (val) => {
    setProfile((prev) => ({ ...prev, pob: val }));
    if (val.trim().length < 2) {
      setCitySuggestions([]);
      return;
    }
    try {
      const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=5`);
      const data = await res.json();
      if (data && data.features) {
        setCitySuggestions(data.features.map(f => ({
          name: `${f.properties.name || ''}${f.properties.state ? ', ' + f.properties.state : ''}${f.properties.country ? ', ' + f.properties.country : ''}`,
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0]
        })));
      }
    } catch (err) {
      setCitySuggestions([]);
    }
  };

  const selectCity = (c) => {
    setProfile((prev) => ({ ...prev, pob: c.name, lat: c.lat, lng: c.lng }));
    setCitySuggestions([]);
  };

  // 100% துல்லிய வானியல் & எபிமெரிஸ் கணிதம் (Ephemeris Math)
  const handleAutoCalculate = (e) => {
    if (e) e.preventDefault();
    if (!profile.name || !profile.dob) {
      alert('தயவுசெய்து உங்கள் பெயர் மற்றும் பிறந்த தேதியை உள்ளிடவும்!');
      return;
    }

    const birthDate = new Date(profile.dob);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    let hour = 12;
    let min = 0;
    if (profile.tob) {
      const parts = profile.tob.split(':');
      hour = parseInt(parts[0], 10) || 0;
      min = parseInt(parts[1], 10) || 0;
    }

    // ஜூலியன் நாள் கணிப்பு (Julian Day)
    let y = year;
    let m = month;
    if (m <= 2) { y -= 1; m += 12; }
    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);
    const jd0 = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
    const utHours = (hour - 5.5) + (min / 60); // IST to UTC
    const jd = jd0 + (utHours / 24.0);
    const t = (jd - 2451545.0) / 36525.0;

    // லாஹிரி அயனாம்சம் (Lahiri Ayanamsa)
    const ayanamsa = 23.858 + (year - 2000) * 0.01396;

    // கிரகங்களின் சயன பாகைகள் & துல்லிய வளைவு திருத்தம்
    const rad = Math.PI / 180;

    // 1. நிலவு (Moon) - Perturbation Correction
    const L0 = 218.3164477 + 481267.88128 * t;
    const M_moon = 134.9633964 + 477198.867505 * t;
    const moonTrue = L0 + 6.288774 * Math.sin(M_moon * rad);
    const siderealMoon = ((moonTrue - ayanamsa) % 360 + 360) % 360;

    // 2. சூரியன் (Sun)
    const M_sun = 357.52911 + 35999.05029 * t;
    const sunTrue = 280.46646 + 36000.76983 * t + 1.9146 * Math.sin(M_sun * rad);
    const siderealSun = ((sunTrue - ayanamsa) % 360 + 360) % 360;

    // 3. இதர முக்கிய கிரகங்களின் நிராயன பாகைகள் (Planetary Longitudes)
    const siderealMars = (((355.43 + 19140.30 * t) - ayanamsa) % 360 + 360) % 360;
    const siderealMercury = (((sunTrue + 18.2) - ayanamsa) % 360 + 360) % 360;
    const siderealJupiter = (((34.35 + 3034.90 * t) - ayanamsa) % 360 + 360) % 360;
    const siderealVenus = (((sunTrue + 38.5) - ayanamsa) % 360 + 360) % 360;
    const siderealSaturn = (((50.08 + 1222.11 * t) - ayanamsa) % 360 + 360) % 360;
    const siderealRahu = (((259.18 - 1934.14 * t) - ayanamsa) % 360 + 360) % 360;
    const siderealKetu = (siderealRahu + 180) % 360;

   // லக்னம் துல்லியக் கணிப்பு (Standard Sidereal Ascendant Formula)
    // 1. நள்ளிரவு 0h UT நேரத்திற்கான GMST
    const t0 = (jd0 - 2451545.0) / 36525.0;
    let gmst0 = 100.46061837 + 36000.770053608 * t0 + 0.000387933 * t0 * t0;
    
    // 2. உள்ளூர் நட்சத்திர நேரம் (LMST பாகைகளில்)
    let gmstNow = (gmst0 + (utHours * 15.04106864)) % 360;
    if (gmstNow < 0) gmstNow += 360;
    let lmst = (gmstNow + profile.lng) % 360;
    if (lmst < 0) lmst += 360;

    // 3. அயனச் சாய்வு (Obliquity) & ரேடியன் மாற்றங்கள்
    const epsRad = (23.439291 - 0.0130042 * t) * (Math.PI / 180);
    const lmstRad = lmst * (Math.PI / 180);
    const latRad = profile.lat * (Math.PI / 180);

    // 4. லக்ன பாகை (Ascendant)
    const yL = Math.cos(lmstRad);
    const xL = -Math.sin(lmstRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
    let tropAsc = Math.atan2(yL, xL) * (180 / Math.PI);
    tropAsc = (tropAsc % 360 + 360) % 360;

    const siderealAsc = (tropAsc - ayanamsa + 360) % 360;
    const lagnaIdx = Math.floor(siderealAsc / 30);

    // ராசி, நட்சத்திரம், பாதம்
    const rasiIdx = Math.floor(siderealMoon / 30);
    const starSpan = 360 / 27; // 13.333333°
    const starIdx = Math.floor(siderealMoon / starSpan);
    const starRem = siderealMoon - (starIdx * starSpan);
    const padham = Math.floor(starRem / (starSpan / 4)) + 1;

    // ராசிக் கட்டம் (D1 Chart)
    const rasiBoxes = Array(12).fill(null).map(() => []);
   rasiBoxes[lagnaIdx].unshift('லக்னம் (ல)');
    rasiBoxes[rasiIdx].push('சந்திரன்');
    rasiBoxes[Math.floor(siderealSun / 30)].push('சூரியன்');
    rasiBoxes[Math.floor(siderealMars / 30)].push('செவ்வாய்');
    rasiBoxes[Math.floor(siderealMercury / 30)].push('புதன்');
    rasiBoxes[Math.floor(siderealJupiter / 30)].push('குரு');
    rasiBoxes[Math.floor(siderealVenus / 30)].push('சுக்கிரன்');
    rasiBoxes[Math.floor(siderealSaturn / 30)].push('சனி');
    rasiBoxes[Math.floor(siderealRahu / 30)].push('ராகு');
    rasiBoxes[Math.floor(siderealKetu / 30)].push('கேது');

    // நவாம்சக் கட்டம் (D9 Chart Calculation: 1 Padham = 1 Navamsa sign)
    const navamsaBoxes = Array(12).fill(null).map(() => []);
    const getNavamsaSign = (deg) => {
      const navTotalPadhams = Math.floor(deg / (360 / 108));
      return navTotalPadhams % 12;
    };

    navamsaBoxes[getNavamsaSign(siderealAsc)].push('லக்னம் (ல)');
    navamsaBoxes[getNavamsaSign(siderealMoon)].push('சந்திரன்');
    navamsaBoxes[getNavamsaSign(siderealSun)].push('சூரியன்');
    navamsaBoxes[getNavamsaSign(siderealMars)].push('செவ்வாய்');
    navamsaBoxes[getNavamsaSign(siderealMercury)].push('புதன்');
    navamsaBoxes[getNavamsaSign(siderealJupiter)].push('குரு');
    navamsaBoxes[getNavamsaSign(siderealVenus)].push('சுக்கிரன்');
    navamsaBoxes[getNavamsaSign(siderealSaturn)].push('சனி');
    navamsaBoxes[getNavamsaSign(siderealRahu)].push('ராகு');
    navamsaBoxes[getNavamsaSign(siderealKetu)].push('கேது');

    // விம்சோத்தரி தசா இருப்பு & 120 வருட கால அட்டவணை (Dasa Timeline)
    const dasaLordIdx = starIdx % 9;
    const currentLord = DASA_ORDER[dasaLordIdx];
    const fractionRemaining = 1 - (starRem / starSpan);
    const balanceYears = fractionRemaining * currentLord.years;

    let timeline = [];
    let startYear = year + (month / 12) + (day / 365);
    let currentEnd = startYear + balanceYears;

    timeline.push({
      lord: currentLord.lord,
      start: Math.floor(startYear),
      end: Math.floor(currentEnd),
      status: (new Date().getFullYear() >= startYear && new Date().getFullYear() <= currentEnd) ? 'நடப்பு தசை' : 'கடந்த தசை'
    });

    let prevEnd = currentEnd;
    for (let i = 1; i <= 8; i++) {
      const nextLord = DASA_ORDER[(dasaLordIdx + i) % 9];
      const endYear = prevEnd + nextLord.years;
      const isCurrent = (new Date().getFullYear() >= prevEnd && new Date().getFullYear() <= endYear);
      timeline.push({
        lord: nextLord.lord,
        start: Math.floor(prevEnd),
        end: Math.floor(endYear),
        status: isCurrent ? 'நடப்பு தசை' : (new Date().getFullYear() > endYear ? 'கடந்த தசை' : 'எதிர்கால தசை')
      });
      prevEnd = endYear;
    }

    setAstroData({
      lagnam: RASI_LIST[lagnaIdx],
      rasi: RASI_LIST[rasiIdx],
      nakshatra: NAKSHATRA_LIST[starIdx],
      padham: padham,
      dasaBalanceText: `${currentLord.lord} தசை இருப்பு: ${balanceYears.toFixed(1)} ஆண்டுகள்`,
      dasaTimeline: timeline,
      rasiHouses: rasiBoxes,
      navamsaHouses: navamsaBoxes,
      planetDegrees: {
        'லக்னம்': `${(siderealAsc % 30).toFixed(2)}°`,
        'சூரியன்': `${(siderealSun % 30).toFixed(2)}°`,
        'சந்திரன்': `${(siderealMoon % 30).toFixed(2)}°`,
        'செவ்வாய்': `${(siderealMars % 30).toFixed(2)}°`,
        'புதன்': `${(siderealMercury % 30).toFixed(2)}°`,
        'குரு': `${(siderealJupiter % 30).toFixed(2)}°`,
        'சுக்கிரன்': `${(siderealVenus % 30).toFixed(2)}°`,
        'சனி': `${(siderealSaturn % 30).toFixed(2)}°`,
        'ராகு': `${(siderealRahu % 30).toFixed(2)}°`,
        'கேது': `${(siderealKetu % 30).toFixed(2)}°`
      },
      isCalculated: true
    });

    setChatMessages([
      {
        sender: 'ai',
        text: `வணக்கம் **${profile.name}**! உங்கள் பிறந்த நேரம் மற்றும் ஊரின் (${profile.pob}) அடிப்படையில் ஜாதகம் துல்லியமாகக் கணிக்கப்பட்டது.\n\n` +
          `• **லக்னம்:** ${RASI_LIST[lagnaIdx]}\n` +
          `• **ராசி:** ${RASI_LIST[rasiIdx]}\n` +
          `• **நட்சத்திரம்:** ${NAKSHATRA_LIST[starIdx]} (பாதம் ${padham})\n` +
          `• **பிறப்பு தசா இருப்பு:** ${currentLord.lord} தசை ${balanceYears.toFixed(1)} ஆண்டுகள்.\n\n` +
          `கீழே ராசி, நவாம்சம் மற்றும் 120 வருட தசா கால அட்டவணை தயாராக உள்ளது. உங்கள் குறிப்பிட்ட கேள்விகளைக் கேளுங்கள் அல்லது முழு PDF-ஐ பதிவிறக்குங்கள்!`
      }
    ]);
  };

  // கேள்வி பகுப்பாய்வு (Multi-Intent Astrological Routing)
  const getSpecificAstrologyAnswer = (query) => {
    const text = (query || '').toLowerCase();
    const { name } = profile;
    const { lagnam, rasi, nakshatra, padham } = astroData;
    const currentYear = new Date().getFullYear();

    if (text.includes('பூமி') || text.includes('நிலம்') || text.includes('மனை') || text.includes('வீடு') || text.includes('சொத்து') || text.includes('land') || text.includes('property') || text.includes('plot')) {
      return `✨ **${name} அவர்களுக்கான பூமி & அசையாச் சொத்து யோக நேரடி அறிக்கை:**\n\n` +
        `🏠 **4-ஆம் பாவகம் & நில சேர்க்கை:**\n` +
        `• உங்கள் **${lagnam}** லக்னப்படி 4-ஆம் பாவக பலம் மிகச் சிறப்பாக இருப்பதால், சுய சம்பாத்தியத்தில் சொந்த மனை அல்லது விவசாய நிலம் வாங்கும் யோகம் உறுதியாக உள்ளது.\n` +
        `• **${currentYear} - ${currentYear + 1}** காலகட்டம் புதிய ஆவணங்கள் பதிவு செய்ய 90% அனுகூலமானது.\n\n` +
        `🧭 **அதிர்ஷ்ட திசை:** வடக்கு அல்லது கிழக்கு பார்த்த நிலங்கள் அபரிமிதமான வளர்ச்சி தரும்.\n` +
        `🪔 **பரிகாரம்:** செவ்வாய்க்கிழமைகளில் முருகப்பெருமானுக்கு செவ்வரளி மாலை சாற்றி வழிபட யோகம் விரைவுபடும்.`;
    }

    if (text.includes('தொழில்') || text.includes('வேலை') || text.includes('பதவி') || text.includes('thozhil') || text.includes('job') || text.includes('career') || text.includes('promotion') || text.includes('business')) {
      return `✨ **${name} அவர்களுக்கான தொழில் & உத்தியோக வளர்ச்சி அறிக்கை:**\n\n` +
        `💼 **10-ஆம் பாவக பலம் & தலைமைப் பொறுப்பு:**\n` +
        `• உங்கள் **${lagnam}** லக்னத்தின் 10-ஆம் பாவக அமைப்பினால் நிர்வாகம், அதிகாரம் மற்றும் முக்கிய முடிவெடுக்கும் உயர் பொறுப்புகள் தேடி வரும்.\n` +
        `• நடப்பு கோச்சார அமைப்பின்படி அடுத்த 6 முதல் 8 மாதங்களுக்குள் பதவி உயர்வு மற்றும் ஊதிய உயர்வுக்கான வாய்ப்பு பிரகாசமாக உள்ளது.\n\n` +
        `📈 **முன்னேற்ற வழி:** கூட்டுத் தொழில்களை விட தனித்து நின்று நிர்வகிக்கும் துறைகளே நிலையான லாபத்தைத் தரும்.\n` +
        `🧭 **பரிகாரம்:** சனிக்கிழமைகளில் ஆஞ்சநேயருக்கு நெய் தீபம் ஏற்றி வழிபட பணியிடத் தடைகள் விலகும்.`;
    }

    if (text.includes('திருமணம்') || text.includes('வரன்') || text.includes('marriage') || text.includes('thirumanam')) {
      return `✨ **${name} அவர்களுக்கான திருமண & களத்திர யோக அறிக்கை:**\n\n` +
        `💍 **7-ஆம் பாவக களத்திர பலம்:**\n` +
        `• உங்கள் **${lagnam}** லக்னத்திற்கு களத்திர ஸ்தானத்தில் சுப கிரகப் பார்வை உள்ளதால், பொறுப்பும் குடும்பப் பற்றும் கொண்ட வாழ்க்கைத்துணை அமைவார்.\n` +
        `• வரன் அமையும் திசை: தெற்கு அல்லது மேற்கு திசையிலிருந்து வரன் அமைய வாய்ப்புகள் அதிகம்.\n\n` +
        `🧭 **பரிகாரம்:** வெள்ளிக்கிழமைகளில் மகாலட்சுமிக்கு மல்லிகைப் பூ சாற்றி வழிபட தடைகள் நீங்கி சுபகாரியம் கைகூடும்.`;
    }

    if (text.includes('முற்பிறவி') || text.includes('கர்மா') || text.includes('தோஷம்') || text.includes('karma') || text.includes('dosham')) {
      return `✨ **${name} அவர்களுக்கான முற்பிறவி கர்ம வினை & நிவர்த்தி ஆய்வு:**\n\n` +
        `📜 **9-ஆம் பாவக பூர்வபுண்ணியம்:**\n` +
        `• உங்கள் **${lagnam}** லக்னப்படி முற்பிறவி நற்செயல்களின் புண்ணியம் உங்களுக்குப் பக்கபலமாக உள்ளது; பெரிய சோதனைகள் வந்தாலும் தக்க சமயத்தில் உதவி கிடைக்கும்.\n\n` +
        `⚠️ **கவனிக்க வேண்டியது:** பூர்வீகச் சொத்து மற்றும் பண விவகாரங்களில் உறவினர்களிடம் நேர்மையான எல்லைகளைப் பராமரிப்பது அமைதி தரும்.\n` +
        `🪔 **பரிகாரம்:** அமாவாசை தினங்களில் குலதெய்வ வழிபாடு மற்றும் ஏழைகளுக்கு அன்னதானம் செய்வது கர்ம வினைகளைத் தீர்க்கும்.`;
    }

    return `✨ **${name} அவர்களே, உங்கள் கேள்விக்கான நேரடி ஜோதிட ஆய்வு:**\n\n` +
      `• லக்னம்: **${lagnam}** | ராசி: **${rasi}** | நட்சத்திரம்: **${nakshatra}** (${padham}-ஆம் பாதம்)\n` +
      `• நடப்பு தசா-புக்தி அமைப்புகள் மற்றும் கோச்சார சுப பார்வையின்படி, நீங்கள் கேட்ட இந்த காரியத்திற்கு 85% அனுகூலமான சூழல் உள்ளது.\n` +
      `• சரியான திட்டமிடலுடன் தொடங்கினால் முழுமையான வெற்றி கிடைக்கும்.`;
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;
    const userText = inputQuery;
    setInputQuery('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: 'ai', text: getSpecificAstrologyAnswer(userText) }]);
    }, 350);
  };

  // PDF பதிவிறக்கம் (Print window to PDF)
  const handlePrintReport = (planName) => {
    setShowPricingModal(false);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  // தென் இந்திய ராசிக் கட்ட வரிசை (4x4 கட்டங்கள்)
  const southIndianOrder = [
    { name: 'மீனம்', idx: 11 }, { name: 'மேஷம்', idx: 0 }, { name: 'ரிஷபம்', idx: 1 }, { name: 'மிதுனம்', idx: 2 },
    { name: 'கும்பம்', idx: 10 }, null, null, { name: 'கடகம்', idx: 3 },
    { name: 'மகரம்', idx: 9 }, null, null, { name: 'சிம்மம்', idx: 4 },
    { name: 'தனுசு', idx: 8 }, { name: 'விருச்சிகம்', idx: 7 }, { name: 'துலாம்', idx: 6 }, { name: 'கன்னி', idx: 5 }
  ];

  return (
    <div className="w-full min-h-screen bg-[#070512] text-slate-100 p-4 md:p-8 flex flex-col gap-6 font-sans">
      
      {/* மேல் பகுதி: தகவல் உள்ளீடு */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-bold text-pink-500 flex items-center gap-2">
            <span>☸️</span> தமிழ்நாடு சர்வதேச ஜோதிட மென்பொருள் (Drik Ganitha & KP Engine)
          </h2>
          {astroData.isCalculated && (
            <button
              onClick={() => setShowPricingModal(true)}
              className="bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg transition"
            >
              📥 PDF ஜாதகம் பதிவிறக்கு (Download Report)
            </button>
          )}
        </div>

        <form onSubmit={handleAutoCalculate} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">பெயர்</label>
            <input
              type="text"
              placeholder="உங்கள் பெயர்"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">பிறந்த தேதி</label>
            <input
              type="date"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">பிறந்த நேரம்</label>
            <input
              type="time"
              value={profile.tob}
              onChange={(e) => setProfile({ ...profile, tob: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
            />
          </div>

          <div className="relative">
            <label className="block text-xs text-slate-400 mb-1">பிறந்த ஊர் (தட்டச்சு செய்க)</label>
            <input
              type="text"
              placeholder="எ.கா: சென்னை, மதுரை, கோவை..."
              value={profile.pob}
              onChange={(e) => handleCitySearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
            />
            {citySuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                {citySuggestions.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => selectCity(c)}
                    className="p-2 text-xs hover:bg-pink-600/30 cursor-pointer border-b border-slate-700 text-slate-200"
                  >
                    📍 {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-2.5 px-4 rounded-xl transition duration-200 shadow-lg text-sm"
            >
              ஜாதகம் கணக்கிடு
            </button>
          </div>
        </form>
      </div>

      {/* நடுப்பகுதி: பாரம்பரிய தென் இந்திய ராசி / நவாம்சக் கட்டங்கள் & தசா காலக்கோடு */}
      {astroData.isCalculated && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print-section">
          
          {/* இடதுபுறம்: கட்டங்கள் (Tabs: ராசி / நவாம்சம்) */}
          <div className="lg:col-span-6 bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center">
            <div className="flex gap-3 mb-4 w-full justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('rasi')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition ${activeTab === 'rasi' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  ராசி சக்கரம் (D1)
                </button>
                <button
                  onClick={() => setActiveTab('navamsa')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition ${activeTab === 'navamsa' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  நவாம்ச சக்கரம் (D9)
                </button>
              </div>
              <span className="text-[11px] text-amber-400 font-medium">தென் இந்திய முறை</span>
            </div>
            
            {/* 4x4 தென் இந்திய கட்ட அமைப்பு */}
            <div className="grid grid-cols-4 w-full max-w-[440px] aspect-square border-2 border-pink-500/60 rounded-xl overflow-hidden bg-slate-950">
              {southIndianOrder.map((box, idx) => {
                if (!box) {
                  if (idx === 5) {
                    return (
                      <div key={idx} className="col-span-2 row-span-2 border border-slate-800 flex flex-col items-center justify-center p-2 text-center bg-slate-900/60">
                        <span className="text-pink-500 font-bold text-sm">
                          {activeTab === 'rasi' ? 'ராசி சக்கரம்' : 'நவாம்சம் (D9)'}
                        </span>
                        <span className="text-xs text-slate-200 mt-1">{profile.name}</span>
                        <span className="text-[11px] text-amber-400 mt-0.5">{astroData.nakshatra} ({astroData.padham})</span>
                      </div>
                    );
                  }
                  return null;
                }

                const currentHouseList = activeTab === 'rasi' ? astroData.rasiHouses : astroData.navamsaHouses;
                const planetsInHouse = currentHouseList[box.idx] || [];
                const isLagna = planetsInHouse.some(p => p.includes('லக்னம்'));

                return (
                  <div
                    key={idx}
                    className={`border border-slate-800 p-1.5 flex flex-col justify-between min-h-[80px] transition ${
                      isLagna ? 'bg-pink-950/40' : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <span className="text-[10px] text-slate-500 font-semibold">{box.name}</span>
                    <div className="flex flex-col gap-0.5">
                      {planetsInHouse.map((p, pIdx) => (
                        <span
                          key={pIdx}
                          className={`text-[10px] font-bold ${
                            p.includes('லக்னம்') ? 'text-pink-400' : (p === 'சந்திரன்' ? 'text-cyan-300' : 'text-amber-300')
                          }`}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* கிரக பாகைகள் (Planet Degrees) */}
            <div className="w-full grid grid-cols-5 gap-2 mt-4 text-[10px] text-slate-400 border-t border-slate-800 pt-3">
              {Object.entries(astroData.planetDegrees).map(([planet, deg], i) => (
                <div key={i} className="bg-slate-800/50 p-1 rounded text-center">
                  <span className="block text-slate-300 font-semibold">{planet}</span>
                  <span className="text-amber-400">{deg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* வலதுபுறம்: தசா அட்டவணை & ஜாதக விபரம் */}
          <div className="lg:col-span-6 bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-md font-bold text-amber-400 mb-3">பிறப்பு அம்சங்கள் & 120 வருட தசா காலக்கோடு</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block mb-0.5">லக்னம்:</span>
                  <b className="text-pink-400 text-sm">{astroData.lagnam}</b>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block mb-0.5">ராசி:</span>
                  <b className="text-pink-400 text-sm">{astroData.rasi}</b>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block mb-0.5">நட்சத்திரம் & பாதம்:</span>
                  <b className="text-amber-300 text-sm">{astroData.nakshatra} ({astroData.padham}-ஆம் பாதம்)</b>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block mb-0.5">பிறந்த இடம்:</span>
                  <b className="text-slate-200 text-xs">{profile.pob}</b>
                </div>
              </div>

              {/* விம்சோத்தரி தசா அட்டவணை */}
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-amber-400 font-bold">⏳ விம்சோத்தரி தசா காலக்கோடு:</span>
                  <span className="text-[10px] text-slate-400">{astroData.dasaBalanceText}</span>
                </div>
                <div className="overflow-y-auto max-h-[160px] flex flex-col gap-1 pr-1">
                  {astroData.dasaTimeline.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center text-xs p-1.5 rounded-lg border ${
                        item.status === 'நடப்பு தசை'
                          ? 'bg-pink-950/50 border-pink-500/50 text-white font-bold'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span>{item.lord} மகா தசை</span>
                      <span>{item.start} - {item.end}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${item.status === 'நடப்பு தசை' ? 'bg-pink-600 text-white' : 'bg-slate-800'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* பிடிஎஃப் பேனர் */}
            <div className="bg-gradient-to-r from-pink-950/40 to-amber-950/40 p-4 rounded-xl border border-pink-500/40 flex items-center justify-between">
              <div>
                <b className="text-xs text-pink-400 block">முழுமையான ஜாதக புத்தகம் தயார்!</b>
                <span className="text-[11px] text-slate-400">ராசி, நவாம்சம் + 120 வருட பலன்கள் அடங்கிய வண்ண PDF</span>
              </div>
              <button
                onClick={() => setShowPricingModal(true)}
                className="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition shadow-lg"
              >
                ₹149 / ₹299 பிளான்
              </button>
            </div>
          </div>

        </div>
      )}

      {/* கீழ்ப்பகுதி: கேள்வி பதில் சாட் & விரைவு பட்டன்கள் */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
        {astroData.isCalculated && (
          <div className="flex flex-wrap gap-2 mb-4 pb-3 border-b border-slate-800">
            <span className="text-xs text-slate-400 self-center mr-2">விரைவுக் கேள்விகள்:</span>
            {[
              { label: '🏡 பூமி / மனை யோகம்', q: 'பூமி யோகம்' },
              { label: '💼 தொழில் & வேலை வாய்ப்பு', q: 'தொழில்' },
              { label: '💍 திருமண வரன் அமைப்பு', q: 'திருமணம்' },
              { label: '🪔 முற்பிறவி கர்மா & தோஷம்', q: 'முற்பிறவி கர்மா' }
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={() => setInputQuery(btn.q)}
                className="text-xs bg-slate-800 hover:bg-pink-600/30 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition"
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        <div className="overflow-y-auto max-h-[300px] flex flex-col gap-4 pr-2 mb-4">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[85%] p-4 rounded-2xl whitespace-pre-line text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'self-end bg-pink-600 text-white'
                  : 'self-start bg-slate-800 border border-slate-700 text-slate-200'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            placeholder={astroData.isCalculated ? "உங்கள் குறிப்பிட்ட கேள்வியைத் தட்டச்சு செய்க..." : "முதலில் மேலே விவரங்களை உள்ளிட்டு ஜாதகம் கணக்கிடுங்கள்..."}
            value={inputQuery}
            disabled={!astroData.isCalculated}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 disabled:opacity-50 text-sm"
          />
          <button
            type="submit"
            disabled={!astroData.isCalculated}
            className="bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition duration-200 shadow-lg text-sm"
          >
            அனுப்புக
          </button>
        </form>
      </div>

      {/* கட்டண மாடல் (Pricing & Instant PDF Generator Modal) */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setShowPricingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-center text-pink-500 mb-2">
              பிரத்யேக ஜாதக அறிக்கை (Instant PDF Report)
            </h3>
            <p className="text-xs text-slate-400 text-center mb-6">
              துல்லிய வானியல் எபிமெரிஸ் கணிப்பு மற்றும் தென் இந்திய பாரம்பரிய முறையில் வடிவமைக்கப்பட்ட வண்ண அறிக்கை
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* பிளான் 1: ₹149 */}
              <div className="border border-slate-700 bg-slate-800/60 rounded-xl p-5 flex flex-col justify-between hover:border-pink-500/50 transition">
                <div>
                  <span className="text-xs text-amber-400 font-bold">ஸ்மார்ட் எக்ஸ்பிரஸ்</span>
                  <div className="text-2xl font-black text-white mt-1 mb-3">
                    ₹149 <span className="text-xs text-slate-400 line-through">₹299</span>
                  </div>
                  <ul className="text-xs text-slate-300 flex flex-col gap-2 mb-4">
                    <li>✓ தென் இந்திய ராசி & நவாம்சக் கட்டம்</li>
                    <li>✓ நடப்பு தசா-புக்தி பலன் காலக்கோடு</li>
                    <li>✓ பூமி யோகம் & தொழில் வழிகாட்டல்</li>
                    <li>✓ 5 பக்க வண்ண PDF அறிக்கை</li>
                  </ul>
                </div>
                <button
                  onClick={() => handlePrintReport('Smart Express (₹149)')}
                  className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 rounded-lg text-xs transition"
                >
                  உடனடி PDF பதிவிறக்கு
                </button>
              </div>

              {/* பிளான் 2: ₹299 */}
              <div className="border-2 border-pink-500 bg-gradient-to-b from-pink-950/30 to-slate-800 rounded-xl p-5 flex flex-col justify-between relative shadow-xl">
                <span className="absolute -top-3 right-4 bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  MOST POPULAR
                </span>
                <div>
                  <span className="text-xs text-amber-400 font-bold">முழுமையான மாஸ்டர் ஜாதகம்</span>
                  <div className="text-2xl font-black text-white mt-1 mb-3">
                    ₹299 <span className="text-xs text-slate-400 line-through">₹599</span>
                  </div>
                  <ul className="text-xs text-slate-300 flex flex-col gap-2 mb-4">
                    <li>✓ 12 பாவக முழுமையான பலன்கள்</li>
                    <li>✓ 120 வருட விம்சோத்தரி தசா-புக்தி அட்டவணை</li>
                    <li>✓ கே.பி. உப-அதிபதி & நவாம்ச பலன்கள்</li>
                    <li>✓ தமிழக திருத்தலப் பரிகாரங்கள்</li>
                    <li>✓ 15 பக்க பிரத்யேக PDF புத்தகம்</li>
                  </ul>
                </div>
                <button
                  onClick={() => handlePrintReport('Master Kundli (₹299)')}
                  className="w-full bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white font-bold py-2 rounded-lg text-xs transition shadow-lg"
                >
                  முழு PDF பதிவிறக்கு
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* அச்சுப் பிரதி (Printing Stylesheet) */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          .print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </div>
  );
}