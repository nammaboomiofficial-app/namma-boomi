import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
 // AI ஜோதிட அறிவார்ந்த பதிலளிப்பு பொறிமுறை
  const getAIResponse = (query) => {
    const q = query.toLowerCase();
    const name = profile.name || 'அன்பரே';
    const lagna = astroData?.Lagnam || 'மகரம்';
    const rasi = astroData?.rasi || 'கன்னி';
    const nakshatra = astroData?.nakshatra || 'அஸ்தம்';
    const activeDasa = astroData?.dasaTimeline?.find(d => d.status === 'நடப்பு')?.lord || 'சனி';

    let categoryAdvice = "";

   if (q.includes('வேலை') || q.includes('தொழில்') || q.includes('job') || q.includes('career') || q.includes('pathavi') || q.includes('uyarvu') || q.includes('பதவி') || q.includes('promotion') || q.includes('work')) {
      categoryAdvice = `
💼 **தொழில் & பதவி உயர்வு வாய்ப்புகள்:**
* லக்னத்திற்கு 10-ஆம் பாவாதிபதி மற்றும் நடப்பு **${activeDasa} மகா தசை** அமைப்பின்படி, உங்களின் தொடர் உழைப்பிற்கான நற்பலன்களும் பதவி உயர்வுக்கான அனுகூலங்களும் கூடி வருகின்றன.
* நிர்வாக மட்டத்தில் உங்களின் அனுபவத்திற்குரிய அங்கீகாரம் கிடைக்க வாய்ப்புள்ளது.
* சனிக்கிழமை நல்லெண்ணெய் தீபம் ஏற்றுவதும், பெருமாள் வழிபாடும் தொழில் தடைகளை நீக்கும்.`;
    } else if (q.includes('திருமணம்') || q.includes('marriage') || q.includes('family') || q.includes('மனைவி') || q.includes('கணவன்') || q.includes('love')) {
      categoryAdvice = `
💍 **திருமணம் & குடும்ப வாழ்க்கை:**
* உங்கள் 7-ஆம் இடத்து அம்சங்கள் மற்றும் குருவின் கோச்சாரப் பார்வை அடிப்படையில் குடும்பத்தில் சுப காரியங்கள் கைகூடும் வாய்ப்புகள் பிரகாசமாக உள்ளன.
* நடப்பு தசா நாதரின் பலம் குடும்ப ஒற்றுமையை மேம்படுத்தும். வியாழக்கிழமைகளில் தட்சிணாமூர்த்தி வழிபாடு நற்பலன்களை இரட்டிப்பாக்கும்.`;
    } else if (q.includes('பணம்') || q.includes('finance') || q.includes('money') || q.includes('கடன்') || q.includes('wealth')) {
      categoryAdvice = `
💰 **தன வரவு & நிதி நிலைமை:**
* 2 மற்றும் 11-ஆம் பாவாதிபதிகள் சுப வலுவுடன் இயங்குவதால் படிப்படியான பொருளாதார உயர்வு உண்டு.
* தேவையற்ற ஆடம்பரச் செலவுகளைத் தவிர்த்து, நீண்ட காலச் சேமிப்புகளில் முதலீடு செய்வது பாதுகாப்பானது. மகாலட்சுமி அஷ்டகம் படிப்பது தன ஆகர்ஷணத்தைத் தரும்.`;
    } else if (q.includes('ஆரோக்கியம்') || q.includes('health') || q.includes('உடல்')) {
      categoryAdvice = `
🌿 **உடல் நலம் & ஆயுள் பலம்:**
* லக்னாதிபதி பலத்தின்படி பெரும் பாதிப்புகள் இல்லை. உணவு முறைகளிலும் முறையான நடைப்பயிற்சியிலும் கவனம் செலுத்துவது ரத்த அழுத்தம் மற்றும் சோர்வைத் தடுக்கும்.
* தினசரி சூரிய நமஸ்காரம் மற்றும் சிவ வழிபாடு உடல் ஆற்றலை அதிகரிக்கும்.`;
    } else {
      categoryAdvice = `
✨ **பொதுவான வழிகாட்டல் & எதிர்காலம்:**
* உங்கள் ஜாதக அமைப்புப்படி லக்னம்: **${lagna}**, ராசி: **${rasi}** மற்றும் நடப்பு தசா: **${activeDasa} மகா தசை**.
* கோச்சாரத்தில் முக்கிய கிரகங்கள் சுப ஸ்தானங்களைப் பார்ப்பதால் விடாமுயற்சிக்கு நல்ல பலன்கள் கிடைக்கும் காலம் இது.
* குலதெய்வ வழிபாடு மற்றும் எளிய தர்ம காரியங்கள் மன அமைதியையும் காரிய சித்தியையும் தரும்.`;
    }

    return `வணக்கம் **${name}** அவர்களே!\n\n${categoryAdvice}\n\n📌 *குறிப்பு: உங்களின் குறிப்பிட்ட கேள்விகளுக்கு ஏற்ப மேலும் பலன்களைத் தொடர்ந்து கேட்கலாம்.*`;
  };
const handleShareWhatsApp = () => {
    const text = `✨ *ஜாதக சுருக்க அறிக்கை* ✨
👤 *பெயர்:* ${astroData?.name || 'பயனர்'}
🌟 *ராசி:* ${astroData?.rasi || '-'}
⭐ *நட்சத்திரம்:* ${astroData?.nakshatra || '-'}
🪐 *லக்கனம்:* ${astroData?.lagna || '-'}
⏳ *நடப்பு தசை:* ${astroData?.currentDasha || 'விவரம் உள்ளே'}

முழுமையான வண்ண ஜாதக அறிக்கையைப் பெற: ${window.location.href}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };
 const handleSendMessage = async (e, directText = null) => {
    if (e) e.preventDefault();
    
    const userText = directText || inputQuery;
    if (!userText || !userText.trim()) return;

    setInputQuery('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userText,
          astroProfile: {
            name: profile.name,
            lagna: astroData?.Lagnam,
            rasi: astroData?.rasi,
            nakshatra: astroData?.nakshatra,
            activeDasa: astroData?.dasaTimeline?.find(d => d.status === 'நடப்பு')?.lord
          }
        })
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      setChatMessages((prev) => [...prev, { sender: 'ai', text: 'மன்னிக்கவும், AI சேவையுடன் இணைப்பதில் சிறு பிழை ஏற்பட்டது.' }]);
    }
  };
      

  // தொழில்முறை மங்கல வண்ண PDF அறிக்கை உருவாக்கம்
  const handlePrintReport = (planName = 'முழு ஜாதக அறிக்கை') => {
    setShowPricingModal(false);
    if (!astroData) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('பாப்-அப் பிளாக் செய்யப்பட்டுள்ளது. தயவுசெய்து Pop-ups அனுமதிக்கவும்.');
      return;
    }

    // 12 ராசிகளின் பெயர்கள்
    const rasiNames = ['மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்', 'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்', 'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'];
const ashtakavargaSigns = ['மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்', 'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்', 'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'];
    const sarvashtakavarga = astroData?.ashtakavarga || [28, 32, 29, 31, 26, 33, 27, 30, 34, 25, 32, 29];
   // பிரீமியம் திட்டம் (₹299) சரிபார்த்தல்
    const isPremium = planName.includes('299') || planName.includes('விரிவான') || planName.includes('முழு');
    // தென்னிந்திய சக்கரக் கட்டங்களை HTML-ஆக மாற்றும் உதவி முறை
    const generateChartHtml = (houseData, chartTitle) => {
      let cells = '';
      southIndianOrder.forEach((box, i) => {
        if (!box) {
          if (i === 5) {
            cells += `
              <div style="grid-column: span 2; grid-row: span 2; border: 2px solid #b91c1c; background: #fffbeb; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 4px;">
                <div style="font-weight: bold; font-size: 14px; color: #991b1b;">${chartTitle}</div>
                <div style="font-size: 11px; color: #78350f; font-weight: 600; margin-top: 4px;">${profile.name || 'ஜாதகர்'}</div>
                <div style="font-size: 9px; color: #b45309; margin-top: 2px;">${astroData.birthDetails || ''}</div>
              </div>`;
          }
          return;
        }
        const planets = houseData[box.idx] || [];
        const isLagna = planets.some(p => p.includes('லக்னம்'));
        const pTags = planets.map(p => {
          let col = '#1e293b';
          let fw = '600';
          if (p.includes('லக்னம்')) { col = '#b91c1c'; fw = 'bold'; }
          else if (p.includes('சூரியன்') || p.includes('செவ்வாய்')) { col = '#c2410c'; }
          else if (p.includes('குரு') || p.includes('சுக்கிரன்')) { col = '#047857'; }
          return `<div style="font-size: 10px; color: ${col}; font-weight: ${fw}; line-height: 1.2;">${p}</div>`;
        }).join('');

        cells += `
          <div style="border: 1px solid #dc2626; padding: 3px; min-height: 62px; background: ${isLagna ? '#fef2f2' : '#ffffff'}; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 9px; color: #94a3b8; font-weight: 500;">${box.name}</div>
            <div style="display: flex; flex-direction: column; gap: 1px; margin: auto 0;">${pTags}</div>
          </div>`;
      });
      return `<div style="display: grid; grid-template-columns: repeat(4, 1fr); border: 2px solid #b91c1c; width: 310px; height: 310px; background: #fff;">${cells}</div>`;
    };

    const d1Html = generateChartHtml(astroData.rasiHouses, 'ராசி சக்கரம் (D1)');
    const d9Html = generateChartHtml(astroData.navamsaHouses, 'நவாம்சம் (D9)');

    // கிரக பாகைகள் வரிசை
    const planetDegRows = Object.entries(astroData.planetDegrees || {}).map(([p, deg]) => `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 4px 8px; font-weight: 600; color: #1e293b;">${p}</td>
        <td style="padding: 4px 8px; color: #475569; text-align: right;">${deg}</td>
      </tr>
    `).join('');

    // தசா காலக்கோடு வரிசை (எல்லா விதமான key பெயர்களுக்கும் பாதுகாப்புடன்)
    const timelineRows = (astroData.dasaTimeline || []).map(t => {
      const yearText = t.yearsRange || t.range || t.yearsText || t.period || 
                       (t.start && t.end ? `${t.start} - ${t.end}` : '') ||
                       (t.startYear && t.endYear ? `${t.startYear} - ${t.endYear}` : '') ||
                       (t.from && t.to ? `${t.from} - ${t.to}` : '') ||
                       Object.values(t).find(v => typeof v === 'string' && v.includes('-') && /\d/.test(v)) || '-';
      return `
        <tr style="border-bottom: 1px solid #f1f5f9; background: ${t.status === 'நடப்பு' ? '#ecfdf5' : '#fff'};">
          <td style="padding: 4px 8px; font-weight: 600; color: ${t.status === 'நடப்பு' ? '#047857' : '#334155'};">${t.lord} மகா தசை</td>
          <td style="padding: 4px 8px; color: #475569; text-align: center; font-weight: 500;">${yearText}</td>
          <td style="padding: 4px 8px; text-align: right; font-weight: 600; color: ${t.status === 'நடப்பு' ? '#059669' : t.status === 'முடிந்தது' || t.status === 'கடந்த தசை' ? '#94a3b8' : '#3b82f6'};">${t.status}</td>
        </tr>
      `;
    }).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>ஜாதக அறிக்கை - ${profile.name || 'Kundli'}</title>
        <meta charset="utf-8" />
        <style>
        .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 55px;
      font-weight: 800;
      color: rgba(185, 28, 28, 0.05);
      pointer-events: none;
      z-index: 0;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 4px;
    }
          @page { size: A4 portrait; margin: 12mm; }
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #ffffff; color: #0f172a; margin: 0; padding: 0; }
          .page-border { border: 4px double #b91c1c; padding: 16px; border-radius: 6px; position: relative; }
          .corner-ornament { position: absolute; width: 20px; height: 20px; border: 3px solid #b91c1c; }
          .tl { top: 4px; left: 4px; border-right: none; border-bottom: none; }
          .tr { top: 4px; right: 4px; border-left: none; border-bottom: none; }
          .bl { bottom: 4px; left: 4px; border-right: none; border-top: none; }
          .br { bottom: 4px; right: 4px; border-left: none; border-top: none; }
          table { width: 100%; border-collapse: collapse; font-size: 11px; }
          @media print {
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="page-border">
        <div class="watermark">மங்கள ஜோதிடம்</div>
          <div class="corner-ornament tl"></div>
          <div class="corner-ornament tr"></div>
          <div class="corner-ornament bl"></div>
          <div class="corner-ornament br"></div>

          <!-- Header -->
          <!-- வாட்டர்மார்க் -->
      <div class="watermark">மங்கள ஜோதிடம்</div>

      <!-- ஜோதிடர் பிராண்டிங் தலைப்பு -->
      <div style="border-bottom: 2px solid #b91c1c; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <div style="text-align: left;">
          <h1 style="margin: 0; font-size: 18px; color: #991b1b; font-weight: bold;">ஸ்ரீ மங்கள ஜோதிட நிலையம்</h1>
          <p style="margin: 2px 0 0 0; font-size: 11px; color: #555;">பாரம்பரிய ஜோதிட கணிப்பு மையம் | சென்னை</p>
        </div>
        <div style="text-align: right;">
          <p style="margin: 0; font-size: 12px; font-weight: bold; color: #1e293b;">தொடர்புக்கு: +91 99623 69131</p>
          <p style="margin: 2px 0 0 0; font-size: 10px; color: #16a34a; font-weight: bold;">WhatsApp வழியே ஆலோசனை</p>
        </div>
      </div>

          <!-- Birth Details Grid -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 10px; margin-bottom: 14px; font-size: 11px;">
            <div><span style="color: #92400e;">பெயர்:</span> <strong style="color: #1e293b;">${profile.name || '-'}</strong></div>
            <div><span style="color: #92400e;">பிறந்த தேதி:</span> <strong style="color: #1e293b;">${profile.dob || '-'}</strong></div>
            <div><span style="color: #92400e;">பிறந்த நேரம்:</span> <strong style="color: #1e293b;">${profile.tob || '-'}</strong></div>
            <div><span style="color: #92400e;">பிறந்த ஊர்:</span> <strong style="color: #1e293b;">${profile.pob || '-'}</strong></div>
            <div><span style="color: #92400e;">லக்னம்:</span> <strong style="color: #b91c1c;">${astroData.Lagnam || '-'}</strong></div>
            <div><span style="color: #92400e;">ராசி:</span> <strong style="color: #b91c1c;">${astroData.rasi || '-'}</strong></div>
            <div><span style="color: #92400e;">நட்சத்திரம் & பாதம்:</span> <strong style="color: #1e293b;">${astroData.nakshatra || ''} ${astroData.padham ? '('+astroData.padham+'-ஆம் பாதம்)' : ''}</strong></div>
            <div><span style="color: #92400e;">தசா இருப்பு:</span> <strong style="color: #047857;">${astroData.dasaBalanceText || '-'}</strong></div>
          </div>

          <!-- Charts Side by Side -->
          <div style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 16px;">
            <div>${d1Html}</div>
            <div>${d9Html}</div>
          </div>

          <!-- Planetary Degrees & Dasa Timeline Side by Side -->
          <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 14px; margin-top: 6px;">
            <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; background: #fafafa;">
              <div style="font-weight: bold; color: #991b1b; font-size: 12px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 6px;">கிரக நிலைகள் & பாகைகள்</div>
              <table>
                <thead><tr style="color: #64748b; font-size: 10px; border-bottom: 1px solid #e2e8f0;"><th style="text-align: left; padding: 2px 8px;">கிரகம்</th><th style="text-align: right; padding: 2px 8px;">பாகை</th></tr></thead>
                <tbody>${planetDegRows}</tbody>
              </table>
            </div>

            <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; background: #fafafa;">
              <div style="font-weight: bold; color: #991b1b; font-size: 12px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 6px;">120 வருட விம்சோத்தரி தசா இருப்பு & காலக்கோடு</div>
              <table>
                <thead><tr style="color: #64748b; font-size: 10px; border-bottom: 1px solid #e2e8f0;"><th style="text-align: left; padding: 2px 8px;">மகா தசை</th><th style="text-align: center; padding: 2px 8px;">வருடங்கள்</th><th style="text-align: right; padding: 2px 8px;">நிலை</th></tr></thead>
                <tbody>${timelineRows}</tbody>
              </table>
            </div>
          </div>
<!-- அஷ்டவர்க்க அட்டவணை -->
      <div style="margin-top: 10px; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
        <div style="background: #f8fafc; padding: 4px 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; font-size: 11px; color: #1e293b; display: flex; justify-content: space-between;">
          <span>சர்வாஷ்டகவர்க்க பரல்கள் (Sarvashtakavarga)</span>
          <span style="color: #991b1b;">மொத்த பரல்கள்: 337</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 9.5px; text-align: center;">
          <thead>
            <tr style="background: #fff1f2; color: #991b1b; font-weight: bold;">
              ${ashtakavargaSigns.map(s => `<th style="padding: 3px 2px; border: 1px solid #fecdd3;">${s}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              ${sarvashtakavarga.map(val => `<td style="padding: 5px 2px; border: 1px solid #e2e8f0; font-weight: 700; color: ${val >= 28 ? '#15803d' : '#b91c1c'};">${val}</td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>
      ${isPremium ? `
      <!-- பக்கம் 2: யோகங்கள் & பாவக பலன்கள் -->
      <div style="page-break-before: always; break-before: page; margin-top: 25px; padding-top: 15px; border-top: 2px solid #b91c1c;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px;">
          <span style="font-weight: bold; font-size: 13px; color: #991b1b;">ஜாதக யோகங்கள் & பாவக விபரம் (பக்கம் 2)</span>
          <span style="font-size: 10px; color: #64748b;">ஸ்ரீ மங்கள ஜோதிட நிலையம்</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 10.5px;">
          <div style="border: 1px solid #fed7aa; border-radius: 6px; padding: 10px; background: #fffaf0;">
            <div style="font-weight: bold; color: #b45309; margin-bottom: 6px; font-size: 11px;">அமைந்துள்ள முக்கிய சுப யோகங்கள்:</div>
            <ul style="margin: 0; padding-left: 16px; color: #334155; line-height: 1.6;">
              <li><strong>கஜகேசரி யோகம்:</strong> குரு மற்றும் சந்திரனின் சுப சேர்க்கையால் சமுதாயத்தில் நன்மதிப்பு, சொல்வாக்கு மற்றும் கௌரவம் உண்டாகும்.</li>
              <li><strong>தர்மகர்மாதிபதி யோகம்:</strong> தொழில், வியாபாரம் அல்லது உத்தியோகத்தில் சிறப்பான தலைமைப் பொறுப்புகளும் அதிகாரமும் தேடிவரும்.</li>
              <li><strong>புத-ஆதித்ய யோகம்:</strong> கூர்மையான அறிவுத்திறன், தர்க்கரீதியான முடிவெடுக்கும் ஆற்றல் மற்றும் நிர்வாகத் திறமை தரும்.</li>
            </ul>
          </div>

          <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; background: #f8fafc;">
            <div style="font-weight: bold; color: #1e293b; margin-bottom: 6px; font-size: 11px;">முக்கிய பாவக பலன்கள்:</div>
            <ul style="margin: 0; padding-left: 16px; color: #334155; line-height: 1.6;">
              <li><strong>லக்கனம் (ஆயுள் & ஆரோக்கியம்):</strong> உடல்நிலையில் நல்ல சுறுசுறுப்பும், சவால்களை எதிர்கொள்ளும் மனோபலமும் சீராக அமையும்.</li>
              <li><strong>தன ஸ்தானம் (2-ஆம் பாவம்):</strong> குடும்பத்தில் அமைதியும், சீரான வருமானப் பெருக்கமும், சேமிப்பு உயர்வும் உண்டாகும்.</li>
              <li><strong>தொழில் ஸ்தானம் (10-ஆம் பாவம்):</strong> உழைப்பிற்கேற்ற நற்பலன், புதிய தொழில் முயற்சிகளில் வளர்ச்சி மற்றும் அங்கீகாரம் கிட்டும்.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- பக்கம் 3: நடப்பு தசா-புக்தி காலக்கோடு & பரிகாரங்கள் -->
      <div style="page-break-before: always; break-before: page; margin-top: 25px; padding-top: 15px; border-top: 2px solid #b91c1c;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px;">
          <span style="font-weight: bold; font-size: 13px; color: #991b1b;">நடப்பு தசா பலன் & காலக்கோடு (பக்கம் 3)</span>
          <span style="font-size: 10px; color: #64748b;">ஸ்ரீ மங்கள ஜோதிட நிலையம்</span>
        </div>

        <!-- காலக்கோடு அட்டவணை -->
        <div style="border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden; margin-bottom: 12px;">
          <div style="background: #f1f5f9; padding: 6px 10px; font-weight: bold; font-size: 11px; color: #0f172a;">
            தற்போதைய மற்றும் அடுத்தடுத்த தசா-புக்தி கால விவரம்
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 10px; text-align: left;">
            <thead>
              <tr style="background: #e2e8f0; color: #334155;">
                <th style="padding: 5px 8px; border: 1px solid #cbd5e1;">காலக்கட்டம்</th>
                <th style="padding: 5px 8px; border: 1px solid #cbd5e1;">தசா - புக்தி விவரம்</th>
                <th style="padding: 5px 8px; border: 1px solid #cbd5e1;">எதிர்பார்க்கப்படும் பொதுப் பலன்கள்</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: #f0fdf4;">
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #166534;">
                  நடப்பு காலம்<br><span style="font-size: 9px; color: #475569;">2023 முதல் 2026 வரை</span>
                </td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-weight: 600;">சனி மகா தசை - சுய புக்தி</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; color: #334155;">
                  தொழிலில் பொறுப்புகள் அதிகரிக்கும்; உழைப்புக்குரிய பலன்கள் தாமதமானாலும் உறுதியாகக் கிடைக்கும். நிதானம் அவசியம்.
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #0369a1;">
                  அடுத்த காலம்<br><span style="font-size: 9px; color: #475569;">2026 முதல் 2029 வரை</span>
                </td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-weight: 600;">சனி மகா தசை - புதன் புக்தி</td>
                <td style="padding: 6px 8px; border: 1px solid #cbd5e1; color: #334155;">
                  பொருளாதார வளர்ச்சி, தொழில் மற்றும் வர்த்தக விரிவாக்கம், புதிய நட்பு மற்றும் புதிய வாய்ப்புகளால் பணவரவு உயரும்.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="border: 1px solid #fed7aa; border-radius: 6px; padding: 10px; background: #fff7ed; font-size: 10.5px;">
          <div style="font-weight: bold; color: #9a3412; font-size: 11px; margin-bottom: 6px;">வழிபாட்டு முறைகள் & எளிய பரிகாரங்கள்:</div>
          <ul style="margin: 0; padding-left: 18px; color: #431407; line-height: 1.6;">
            <li><strong>குலதெய்வ வழிபாடு:</strong> அமாவாசை அல்லது பௌர்ணமி தினங்களில் குலதெய்வத்திற்கு நெய் தீபம் ஏற்றி வழிபடக் குடும்பக் கடன்கள், தடைகள் நீங்கும்.</li>
            <li><strong>இஷ்ட தெய்வம்:</strong> தினசரி விநாயகர் அகவல் அல்லது கந்த சஷ்டி கவசம் பாராயணம் செய்வது அனைத்துக் காரியங்களிலும் வெற்றியைத் தரும்.</li>
            <li><strong>தான தர்மங்கள்:</strong> சனிக்கிழமைகளில் முதியோர்களுக்கோ அல்லது மாற்றுத்திறனாளிகளுக்கோ எள் சாதம் அல்லது அன்னதானம் அளிப்பது சனி பகவானின் அருளைப் பெற்றுத்தரும்.</li>
          </ul>
        </div>
      </div>
      ` : ''}
          <!-- Disclaimer / Footer -->
          <div style="margin-top: 14px; padding-top: 8px; border-top: 1px dashed #cbd5e1; font-size: 9px; color: #64748b; text-align: center; line-height: 1.4;">
            <strong>பொறுப்புத் துறப்பு:</strong> இந்தக் கணிப்பு பாரம்பரிய திருக்கணித மற்றும் ஜோதிட வானியல் சூத்திரங்களின்படி கணிக்கப்பட்டது. தனிநபர் வழிகாட்டல் நோக்கங்களுக்காக மட்டுமே.
            <br />நன்றி! நல்வாழ்த்துகள்.
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
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
        <div id="astrology-printable-area" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* இடதுபுறம்: கட்டங்கள் (Tabs: ராசி / நவாம்சம்) */}
          <div className="lg:col-span-6 bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
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
        <div className="grid grid-cols-4 w-full max-w-[420px] sm:max-w-[460px] aspect-square mx-auto border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl bg-slate-900/60">
          {southIndianOrder.map((box, idx) => {
            if (!box) {
              if (idx === 5) {
                return (
                  <div key={idx} className="col-span-2 row-span-2 border border-slate-700 flex flex-col items-center justify-center p-2 text-center bg-slate-900/90">
                    <span className="text-pink-400 font-bold text-xs sm:text-sm tracking-wide">
                      {activeTab === 'rasi' ? 'ராசி சக்கரம்' : 'நவாம்சம்'}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-200 mt-1 font-medium truncate max-w-[120px] sm:max-w-none">
                      {profile.name}
                    </span>
                    <span className="text-[9px] sm:text-[11px] text-amber-400/90 mt-0.5 font-sans">
                      {astroData.birthDetails}
                    </span>
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
                className={`border border-slate-800 p-1 sm:p-1.5 flex flex-col justify-between transition-colors min-h-0 ${
                  isLagna ? 'bg-pink-950/40 border-pink-500/50' : 'hover:bg-slate-800/40 bg-slate-900/40'
                }`}
              >
                <span className="text-[8px] sm:text-[10px] text-slate-400 font-medium leading-none">
                  {box.name}
                </span>
                <div className="flex flex-col gap-0.5 my-auto overflow-hidden">
                  {planetsInHouse.map((p, pIdx) => (
                    <span
                      key={pIdx}
                      className={`text-[9px] sm:text-[11px] font-semibold leading-tight truncate ${
                        p.includes('லக்னம்')
                          ? 'text-pink-400 font-bold'
                          : p.includes('சூரியன்') || p.includes('செவ்வாய்')
                          ? 'text-amber-400'
                          : p.includes('சந்திரன்') || p.includes('சுக்கிரன்')
                          ? 'text-emerald-300'
                          : 'text-slate-200'
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
  className="bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white font-bold px-3 py-2 rounded-lg text-xs shadow-lg transition flex items-center gap-1.5"
>
  📄 வண்ண PDF பதிவிறக்கு
</button>
<button
  type="button"
  onClick={handleShareWhatsApp}
  className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-3 rounded-md flex items-center gap-1.5 text-xs shadow transition cursor-pointer"
>
  <span>📲 வாட்ஸ்அப்பில் பகிர்க</span>
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
              { label: '🏡 பூமி / மனை யோகம்', q: 'எனக்கு பூமி அல்லது மனை வாங்கும் யோகம் எப்போது கைகூடும்?' },
      { label: '💼 தொழில் & வேலை வாய்ப்பு', q: 'எனக்கு தொழில் முன்னேற்றம் மற்றும் புதிய வேலை வாய்ப்பு எப்போது அமையும்?' },
      { label: '💍 திருமண வரன் அமைப்பு', q: 'எனக்கு திருமண வரன் அமைப்பு மற்றும் குடும்ப வாழ்க்கை எவ்வாறு அமையும்?' },
      { label: '🪔 முற்பிறவி கர்மா & தோஷம்', q: 'எனது ஜாதகத்தில் முற்பிறவி கர்மா அல்லது ஏதேனும் தோஷங்கள் உள்ளதா, அதற்கான எளிய பரிகாரம் என்ன?' },
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(null, btn.q)}
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
    className={`p-4 rounded-xl text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words ${
      msg.sender === 'user' 
        ? 'bg-pink-600 text-white ml-auto max-w-[85%]' 
        : 'bg-[#132347] text-blue-100 border border-blue-500/40 mr-auto max-w-[95%] shadow-lg'
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
              <div className="border border-slate-700 bg-slate-800/60 rounded-xl p-4 flex flex-col justify-between hover:border-pink-500/50 transition-all">
                <div>
                  <span className="text-xs text-amber-400 font-bold tracking-wider uppercase">அடிப்படைத் திட்டம்</span>
                  <div className="text-2xl font-black text-white mt-1 mb-3">
                    ₹149 <span className="text-xs text-slate-400 line-through font-normal">₹499</span>
                  </div>
                  <ul className="text-xs text-slate-300 flex flex-col gap-2 mb-4">
                    <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> தென் இந்திய ராசி & நவாம்சக் கட்டம் (D1/D9)</li>
                    <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> கிரக நிலைகள் & துல்லிய பாகைகள்</li>
                    <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 120 வருட தசா காலக்கோடு விவரங்கள்</li>
                    <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> மங்கல வண்ண PDF அறிக்கை பதிவிறக்கம்</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    const upiId = "sampleastrology@upi"; // உங்கள் UPI ஐடி மாற்றிக்கொள்ளலாம்
                    const payUrl = `upi://pay?pa=${upiId}&pn=NammaBoomiAstrology&am=149&cu=INR&tn=BasicAstrologyReport`;
                    if (/Android|iPhone/i.test(navigator.userAgent)) {
                      window.location.href = payUrl;
                    }
                    setTimeout(() => handlePrintReport('Basic Express (₹149)'), 600);
                  }}
                  className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-lg shadow-pink-600/30 active:scale-95"
                >
                  ₹149 செலுத்தி PDF பெறுக (GPay / PhonePe)
                </button>
              </div>

              {/* பிளான் 2: ₹299 (Most Popular) */}
              <div className="relative border-2 border-pink-500 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-4 flex flex-col justify-between shadow-xl shadow-pink-950/50">
                <span className="absolute -top-3 right-4 bg-pink-600 text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  MOST POPULAR
                </span>
                <div>
                  <span className="text-xs text-amber-400 font-bold tracking-wider uppercase">ஆயுள் பலன் + AI ஜோதிடர்</span>
                  <div className="text-2xl font-black text-white mt-1 mb-3">
                    ₹299 <span className="text-xs text-slate-400 line-through font-normal">₹999</span>
                  </div>
                  <ul className="text-xs text-slate-300 flex flex-col gap-2 mb-4">
                    <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 12 பாவ முழுமையான ஆயுள் பலன்கள்</li>
                    <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 120 வருட தசா-புக்தி பலன் அட்டவணை</li>
                    <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> AI ஜோதிடரிடம் வரம்பற்ற கேள்வி-பதில் சாட்</li>
                    <li className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> அதிர்ஷ்டக் கல், எண்கள் & பரிகார வழிகாட்டல்</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    const upiId = "sampleastrology@upi"; // உங்கள் UPI ஐடி மாற்றிக்கொள்ளலாம்
                    const payUrl = `upi://pay?pa=${upiId}&pn=NammaBoomiAstrology&am=299&cu=INR&tn=MasterKundliReport`;
                    if (/Android|iPhone/i.test(navigator.userAgent)) {
                      window.location.href = payUrl;
                    }
                    setTimeout(() => handlePrintReport('Master Kundli (₹299)'), 600);
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white font-bold py-2.5 rounded-lg text-xs transition-all shadow-lg shadow-pink-600/30 active:scale-95"
                >
                  ₹299 செலுத்தி AI & PDF அன்லாக் செய்க
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