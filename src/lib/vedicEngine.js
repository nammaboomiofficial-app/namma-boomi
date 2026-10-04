import { Body, GeoVector, SiderealTime } from 'astronomy-engine';

// 12 ராசிகள்
export const RASHIS = [
  "மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்", 
  "சிம்மம்", "கன்னி", "துலாம்", "விருச்சிகம்", 
  "தனுசு", "மகரம்", "கும்பம்", "மீனம்"
];

// ராசி அதிபதிகள்
export const RASHI_LORDS = [
  "செவ்வாய்", "சுக்கிரன்", "புதன்", "சந்திரன்", 
  "சூரியன்", "புதன்", "சுக்கிரன்", "செவ்வாய்", 
  "குரு", "சனி", "சனி", "குரு"
];

// 27 நட்சத்திரங்கள் (தசா கணக்கீட்டிற்கு)
export const NAKSHATRAS = [
  "அஸ்வினி", "பரணி", "கார்த்திகை", "ரோகிணி", "மிருகசீரிஷம்", "திருவாதிரை",
  "புனர்பூசம்", "பூசம்", "ஆயில்யம்", "மகம்", "பூரம்", "உத்திரம்",
  "ஹஸ்தம்", "சித்திரை", "சுவாதி", "விசாகம்", "அனுஷம்", "கேட்டை",
  "மூலம்", "பூராடம்", "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதயம்",
  "பூரட்டாதி", "உத்திரட்டாதி", "ரேவதி"
];

// விம்சோத்தரி தசா அதிபதிகள் & வருடங்கள் (வருட வரிசை: கேது 7, சுக்கிரன் 20, சூரியன் 6...)
const DASHA_LORDS = [
  { lord: "கேது", years: 7 },
  { lord: "சுக்கிரன்", years: 20 },
  { lord: "சூரியன்", years: 6 },
  { lord: "சந்திரன்", years: 10 },
  { lord: "செவ்வாய்", years: 7 },
  { lord: "ராகு", years: 18 },
  { lord: "குரு", years: 16 },
  { lord: "சனி", years: 19 },
  { lord: "புதன்", years: 17 }
];

// லாஹிரி அயனாம்சம்
export function getLahiriAyanamsha(date) {
  const epoch2000 = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
  const diffYears = (date.getTime() - epoch2000.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return 23.85 + (diffYears * (50.29 / 3600));
}

function normalizeDeg(deg) {
  let d = deg % 360;
  return d < 0 ? d + 360 : d;
}

// பாகையை ராசி மற்றும் நட்சத்திரமாக மாற்றுதல்
export function getRasiAndNakshatra(tropicalDeg, ayanamsha) {
  const siderealDeg = normalizeDeg(tropicalDeg - ayanamsha);
  const rasiIndex = Math.floor(siderealDeg / 30);
  const degreeInRasi = (siderealDeg % 30).toFixed(2);
  
  // நட்சத்திரக் கணிப்பு (ஒரு நட்சத்திரம் = 13° 20' = 13.3333°)
  const nakshatraIndex = Math.floor(siderealDeg / (360 / 27));
  const nakshatraDegree = siderealDeg % (360 / 27);
  
  return {
    rasiIndex,
    rasiName: RASHIS[rasiIndex],
    degreeInRasi: parseFloat(degreeInRasi),
    totalDegree: siderealDeg,
    nakshatraIndex,
    nakshatraName: NAKSHATRAS[nakshatraIndex],
    nakshatraDegree
  };
}

// லக்னம் கணிப்பு (துல்லியமான பிறந்த நேரம் + அட்ச/தீர்க்கரேகை)
export function calculateLagna(date, lat, lon) {
  const ayanamsha = getLahiriAyanamsha(date);
  const gast = SiderealTime(date); // Sidereal time in hours
  const ramc = normalizeDeg(gast * 15 + lon);
  const eps = 23.4392911 * (Math.PI / 180);
  const radRamc = ramc * (Math.PI / 180);
  const radLat = lat * (Math.PI / 180);

  const y = Math.cos(radRamc);
  const x = - (Math.sin(radRamc) * Math.cos(eps) + Math.tan(radLat) * Math.sin(eps));
  let ascDeg = Math.atan2(y, x) * (180 / Math.PI);
  ascDeg = normalizeDeg(ascDeg + 90);

  return getRasiAndNakshatra(ascDeg, ayanamsha);
}

// 7 கிரகங்கள் கணிப்பு
export function calculatePlanetaryPositions(date) {
  const ayanamsha = getLahiriAyanamsha(date);
  const bodies = [
    { name: "சூரியன்", body: Body.Sun },
    { name: "சந்திரன்", body: Body.Moon },
    { name: "புதன்", body: Body.Mercury },
    { name: "சுக்கிரன்", body: Body.Venus },
    { name: "செவ்வாய்", body: Body.Mars },
    { name: "குரு", body: Body.Jupiter },
    { name: "சனி", body: Body.Saturn }
  ];

  const results = {};
  for (const b of bodies) {
    const geo = GeoVector(b.body, date, false);
    let lonDeg = Math.atan2(geo.y, geo.x) * (180 / Math.PI);
    results[b.name] = getRasiAndNakshatra(normalizeDeg(lonDeg), ayanamsha);
  }
  return results;
}

// சந்திரனின் பாகையை வைத்து நடப்பு தசா-புக்தி கணக்கிடுதல் (Dynamic Vimshottari Dasha)
export function calculateCurrentDasha(birthDate, moonInfo, currentDate = new Date()) {
  const nakSpan = 360 / 27; // 13.3333°
  const dashaLordIndex = moonInfo.nakshatraIndex % 9;
  const balanceRatio = 1 - (moonInfo.nakshatraDegree / nakSpan);
  
  const firstDasha = DASHA_LORDS[dashaLordIndex];
  const balanceYears = firstDasha.years * balanceRatio;
  
  let passedYears = (currentDate.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  
  if (passedYears < balanceYears) {
    return `${firstDasha.lord} மகா தசை`;
  }
  
  passedYears -= balanceYears;
  let currIdx = (dashaLordIndex + 1) % 9;
  
  while (passedYears > DASHA_LORDS[currIdx].years) {
    passedYears -= DASHA_LORDS[currIdx].years;
    currIdx = (currIdx + 1) % 9;
  }
  
  const activeMahaDasha = DASHA_LORDS[currIdx].lord;
  return `${activeMahaDasha} மகா தசை`;
}

// பொதுவான சாஸ்திர விதி என்ஜின் (0% Hardcode)
export function runVedicRuleEngine(lagnaIdx, planets, question) {
  const q = (question || "").toLowerCase();

  let targetHouse = 1;
  let topic = "பொதுவான வாழ்க்கை & ஆளுமை நிலை";
  let karaka = "சூரியன்";

  if (q.includes("வீடு") || q.includes("சொத்து") || q.includes("நிலம்") || q.includes("மனை") || q.includes("வாகனம்")) {
    targetHouse = 4;
    topic = "சொந்த வீடு / மனை / சொத்து யோகம்";
    karaka = "செவ்வாய்";
  } else if (q.includes("தொழில்") || q.includes("வேலை") || q.includes("உத்தியோகம்") || q.includes("வியாபாரம்")) {
    targetHouse = 10;
    topic = "தொழில் / உத்தியோக நிலை";
    karaka = "சனி";
  } else if (q.includes("பணம்") || q.includes("வரவு") || q.includes("வருமானம்") || q.includes("சேமிப்பு") || q.includes("கடன்")) {
    targetHouse = 2;
    topic = "பண வரவு & தன பாக்கியம்";
    karaka = "குரு";
  } else if (q.includes("திருமணம்") || q.includes("மணம்") || q.includes("மனைவி") || q.includes("கணவன்") || q.includes("வாழ்க்கைத்துணை")) {
    targetHouse = 7;
    topic = "திருமண வாழ்க்கை & கூட்டு யோகம்";
    karaka = "சுக்கிரன்";
  } else if (q.includes("குழந்தை") || q.includes("பிள்ளை") || q.includes("படிப்பு") || q.includes("கல்வி")) {
    targetHouse = 5;
    topic = "புத்திர பாக்கியம் & உயர் கல்வி";
    karaka = "குரு";
  } else if (q.includes("ஆரோக்கியம்") || q.includes("உடல்") || q.includes("நோய்")) {
    targetHouse = 6;
    topic = "உடல்நலம் & ஆரோக்கிய யோகம்";
    karaka = "சூரியன்";
  }

  // கணிதம்: லக்னத்திலிருந்து எந்த ராசி என்று தானாகக் கணக்கிடுதல்
  const houseRasiIdx = (lagnaIdx + (targetHouse - 1)) % 12;
  const houseRasiName = RASHIS[houseRasiIdx];
  const lordPlanetName = RASHI_LORDS[houseRasiIdx];
  const lordInfo = planets[lordPlanetName];

  // லக்னத்தில் இருந்து பாவாதிபதி அமர்ந்த வீடு
  const lordPlacedHouse = lordInfo ? (((lordInfo.rasiIndex - lagnaIdx + 12) % 12) + 1) : 1;

  // பார்வை விதிகளின் கணிதம்
  let aspectsOnTargetHouse = [];
  const marsHouse = planets["செவ்வாய்"] ? (((planets["செவ்வாய்"].rasiIndex - lagnaIdx + 12) % 12) + 1) : null;
  const saturnHouse = planets["சனி"] ? (((planets["சனி"].rasiIndex - lagnaIdx + 12) % 12) + 1) : null;
  const jupiterHouse = planets["குரு"] ? (((planets["குரு"].rasiIndex - lagnaIdx + 12) % 12) + 1) : null;

  if (marsHouse) {
    const diff = ((targetHouse - marsHouse + 12) % 12) + 1;
    if ([4, 7, 8].includes(diff)) aspectsOnTargetHouse.push("செவ்வாய் பார்வை");
  }
  if (saturnHouse) {
    const diff = ((targetHouse - saturnHouse + 12) % 12) + 1;
    if ([3, 7, 10].includes(diff)) aspectsOnTargetHouse.push("சனி பார்வை");
  }
  if (jupiterHouse) {
    const diff = ((targetHouse - jupiterHouse + 12) % 12) + 1;
    if ([5, 7, 9].includes(diff)) aspectsOnTargetHouse.push("சுப குரு பார்வை");
  }

  // பாவாதிபதிக்குரிய பராசர மரபு வழிபாடு
  const DEITY_MAP = {
    "செவ்வாய்": "செவ்வாய்க்கிழமைகளில் முருகப்பெருமான் வழிபாடு, கந்த சஷ்டி கவசம் பாராயணம் மற்றும் செவ்வாய் ஓரையில் நெய்தீபம் ஏற்றுவது சிறப்பு.",
    "சுக்கிரன்": "வெள்ளிக்கிழமைகளில் மகாலட்சுமி தாயார் வழிபாடு மற்றும் நெய்தீபம் ஏற்றி வழிபடுவது நற்பலன் தரும்.",
    "புதன்": "புதன்கிழமைகளில் பெருமாள் வழிபாடு மற்றும் துளசி சமர்ப்பித்து வழிபடுவது சிறந்த விவேகத்தைத் தரும்.",
    "சனி": "சனிக்கிழமைகளில் அனுமன் வழிபாடு மற்றும் உழைக்கும் எளியோருக்கு அன்னதானம் வழங்குவது தடைகளை உடைக்கும்.",
    "குரு": "வியாழக்கிழமைகளில் தட்சிணாமூர்த்தி வழிபாடு மற்றும் முல்லை மலர் சமர்ப்பிப்பது சுப பலனை விரைவுபடுத்தும்.",
    "சூரியன்": "ஞாயிற்றுக்கிழமைகளில் சூரிய நமஸ்காரம் மற்றும் சிவபெருமானை வழிபடுவது ஆத்ம பலம் தரும்.",
    "சந்திரன்": "திங்கட்கிழமைகளில் அம்பாள் வழிபாடு மற்றும் சந்திர தரிசனம் செய்வது மன அமைதியை நிலைநிறுத்தும்."
  };

  return {
    topic,
    targetHouse,
    houseRasiName,
    lordPlanetName,
    lordPlacedHouse,
    lordRasiName: lordInfo?.rasiName || "கணிக்கப்படுகிறது",
    aspects: aspectsOnTargetHouse.length > 0 ? aspectsOnTargetHouse.join(", ") : "நேரடி விசேஷ பார்வைகள் இல்லை",
    karakaPlanet: karaka,
    karakaRasi: planets[karaka]?.rasiName || "கணிக்கப்படுகிறது",
    remedyText: DEITY_MAP[lordPlanetName] || DEITY_MAP[karaka]
  };
}