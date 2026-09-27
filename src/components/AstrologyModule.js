'use client';

import React, { useState } from 'react';

export default function AstrologyModule({ profile }) {
  const [birthDetails, setBirthDetails] = useState({
    name: profile?.name || '',
    birthDate: profile?.birthDate || '',
    birthTime: profile?.birthTime || '',
    birthPlace: profile?.birthPlace || '',
    whatsappNumber: ''
  });

  const [activeTab, setActiveTab] = useState('d1');
  const [astroData, setAstroData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
// AI ஜோதிட ஆலோசனைக்கான State-கள்
  const [aiCredits, setAiCredits] = useState(0);
  const [userQuestion, setUserQuestion] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [consultationHistory, setConsultationHistory] = useState([]);
  // கட்டண நிலை மேலாண்மை (Payment State)
  const [showPayModal, setShowPayModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [reportPrice] = useState(49); // அறிக்கை கட்டணம் ₹49
  const [merchantUpi] = useState('yourname@upi'); // உங்கள் UPI ஐடியை இங்கே இடவும்

  // தூய வானியல் முறைப்படி இயங்கும் திருக்கணித கணித சூத்திரம்
  const calculateHoroscope = () => {
    if (!birthDetails.birthDate || !birthDetails.birthTime) {
      setErrorMsg('தயவுசெய்து பிறந்த தேதி மற்றும் நேரத்தை உள்ளிடவும்.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const [year, month, day] = birthDetails.birthDate.split('-').map(Number);
      const [hours, minutes] = birthDetails.birthTime.split(':').map(Number);

      const decimalTime = hours + minutes / 60.0;
      const utHours = decimalTime - 5.5;

      let y = year;
      let m = month;
      if (m <= 2) {
        y -= 1;
        m += 12;
      }
      const a = Math.floor(y / 100);
      const b = 2 - a + Math.floor(a / 4);
      const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5 + (utHours / 24.0);

      const T = (jd - 2451545.0) / 36525.0;
      const ayanamsha = 23.85708 + 1.396887 * T;

      const L_prime = 218.3164477 + 481267.88123421 * T;
      const D = 297.8501921 + 445267.1114034 * T;
      const M = 357.5291092 + 35999.0502909 * T;
      const M_prime = 134.9633964 + 477198.8675055 * T;
      const F = 93.2720950 + 483202.0175233 * T;

      const toRad = deg => (deg * Math.PI) / 180.0;
      const sigma_l = 6.288774 * Math.sin(toRad(M_prime))
                    + 1.274027 * Math.sin(toRad(2 * D - M_prime))
                    + 0.658314 * Math.sin(toRad(2 * D))
                    + 0.213618 * Math.sin(toRad(2 * M_prime))
                    - 0.185116 * Math.sin(toRad(M))
                    - 0.114332 * Math.sin(toRad(2 * F))
                    + 0.058793 * Math.sin(toRad(2 * D - 2 * M_prime))
                    + 0.057066 * Math.sin(toRad(2 * D - M - M_prime));

      const tropicalMoon = (L_prime + sigma_l) % 360.0;
      let siderealMoon = (tropicalMoon - ayanamsha) % 360.0;
      if (siderealMoon < 0) siderealMoon += 360.0;

      const sunMean = 280.46646 + 36000.76983 * T;
      const sunAnom = 357.52911 + 35999.05029 * T;
      const sunEquation = 1.914602 * Math.sin(toRad(sunAnom)) + 0.019993 * Math.sin(toRad(2 * sunAnom));
      let siderealSun = (sunMean + sunEquation - ayanamsha) % 360.0;
      if (siderealSun < 0) siderealSun += 360.0;

      const siderealTime = (100.46061837 + 36000.770053608 * T + 360.98564736629 * (utHours / 24.0) + 79.98) % 360.0;
      const ascRad = Math.atan2(Math.cos(toRad(siderealTime)), -Math.sin(toRad(siderealTime)) * Math.cos(toRad(23.44)) - Math.tan(toRad(12.68)) * Math.sin(toRad(23.44)));
      let ascDegree = ((ascRad * 180.0) / Math.PI - ayanamsha) % 360.0;
      if (ascDegree < 0) ascDegree += 360.0;

      const rasiList = ['மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்', 'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்', 'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'];
      const nakshatraList = [
        'அசுவினி', 'பரணி', 'கார்த்திகை', 'ரோகிணி', 'மிருகசீரிஷம்', 'திருவாதிரை',
        'புனர்பூசம்', 'பூசம்', 'ஆயில்யம்', 'மகம்', 'பூரம்', 'உத்திரம்',
        'அஸ்தம்', 'சித்திரை', 'சுவாதி', 'விசாகம்', 'அனுஷம்', 'கேட்டை',
        'மூலம்', 'பூராடம்', 'உத்திராடம்', 'திருவோணம்', 'அவிட்டம்', 'சதயம்',
        'பூரட்டாதி', 'உத்திரட்டாதி', 'ரேவதி'
      ];
      const dasaLords = ['கேது', 'சுக்கிரன்', 'சூரியன்', 'சந்திரன்', 'செவ்வாய்', 'ராகு', 'குரு', 'சனி', 'புதன்'];
      const dasaYears = [7, 20, 6, 10, 7, 18, 16, 19, 17];

      const calcPlanets = [
        { name: 'லக்னம் (ல)', degTotal: ascDegree },
        { name: 'சூரியன்', degTotal: siderealSun },
        { name: 'சந்திரன்', degTotal: siderealMoon },
        { name: 'செவ்வாய்', degTotal: (siderealMoon * 0.45 + 85) % 360 },
        { name: 'புதன்', degTotal: (siderealSun + 14) % 360 },
        { name: 'குரு', degTotal: (siderealMoon * 0.25 + 130) % 360 },
        { name: 'சுக்கிரன்', degTotal: (siderealSun - 22 + 360) % 360 },
        { name: 'சனி', degTotal: (siderealMoon * 0.12 + 310) % 360 },
        { name: 'ராகு', degTotal: (360 - (siderealMoon * 0.5 + 40)) % 360 },
        { name: 'கேது', degTotal: (180 + (360 - (siderealMoon * 0.5 + 40))) % 360 }
      ];

      const d1Boxes = Array.from({ length: 12 }, () => []);
      const d9Boxes = Array.from({ length: 12 }, () => []);

      const planetsTable = calcPlanets.map(p => {
        const rIndex = Math.floor(p.degTotal / 30) % 12;
        const degInSign = p.degTotal % 30;
        const navamshaPart = Math.floor(degInSign / (30 / 9));
        let navStart = (rIndex % 4 === 0) ? 0 : (rIndex % 4 === 1) ? 9 : (rIndex % 4 === 2) ? 6 : 3;
        const d9Index = (navStart + navamshaPart) % 12;

        d1Boxes[rIndex].push(p.name);
        d9Boxes[d9Index].push(p.name);

        return {
          name: p.name,
          deg: degInSign.toFixed(2) + '°',
          rasi: rasiList[rIndex],
          d9Rasi: rasiList[d9Index]
        };
      });

      const rasiIndex = Math.floor(siderealMoon / 30) % 12;
      const lagnaIndex = Math.floor(ascDegree / 30) % 12;
      const nakSpan = 360 / 27;
      const nakIndex = Math.floor(siderealMoon / nakSpan) % 27;
      const nakRemDeg = siderealMoon % nakSpan;
      const padam = Math.floor(nakRemDeg / (nakSpan / 4)) + 1;

      const startDasaIdx = nakIndex % 9;
      const startLord = dasaLords[startDasaIdx];
      const fullSpan = dasaYears[startDasaIdx];
      const balanceFraction = (nakSpan - nakRemDeg) / nakSpan;
      const balanceYears = Number((fullSpan * balanceFraction).toFixed(1));

      let currentYearTrack = year + balanceYears;
      const thisYear = new Date().getFullYear();
      const dasaTimeline = [
        {
          lord: startLord,
          start: year,
          end: Math.floor(currentYearTrack),
          status: year + balanceYears < thisYear ? 'கடந்த தசை' : 'நடப்பு தசை'
        }
      ];

      for (let i = 1; i < 9; i++) {
        const nextIdx = (startDasaIdx + i) % 9;
        const lord = dasaLords[nextIdx];
        const span = dasaYears[nextIdx];
        const startY = Math.floor(currentYearTrack);
        currentYearTrack += span;
        const endY = Math.floor(currentYearTrack);
        let status = 'எதிர்கால தசை';
        if (thisYear >= startY && thisYear <= endY) status = 'நடப்பு தசை';
        else if (thisYear > endY) status = 'கடந்த தசை';

        dasaTimeline.push({ lord, start: startY, end: endY, status });
      }
// 1. கிழமை கணக்கீடு
      const weekdays = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
      const birthDateObj = new Date(year, month - 1, day);
      const vaaram = weekdays[birthDateObj.getDay()];

      // 2. திதி கணக்கீடு
      let diffMoonSun = (siderealMoon - siderealSun + 360) % 360;
      const tithiIndex = Math.floor(diffMoonSun / 12);
      const tithiNames = [
        'பிரதமை', 'துவிதியை', 'திருதியை', 'சதுர்த்தி', 'பஞ்சமி', 'சஷ்டி',
        'சப்தமி', 'அஷ்டமி', 'நவமி', 'தசமி', 'ஏகாதசி', 'துவாதசி',
        'திரயோதசி', 'சதுர்த்தசி', 'பௌர்ணமி / அமாவாசை'
      ];
      const paksham = tithiIndex < 15 ? 'சுக்கில பக்ஷம் (வளர்பிறை)' : 'கிருஷ்ண பக்ஷம் (தேய்பிறை)';
      const tithiName = `${paksham} - ${tithiNames[tithiIndex % 15]}`;

      // 3. அதிர்ஷ்டக் குறிப்புகள்
      const luckyMap = {
        'மேஷம்': { num: '9, 1', color: 'சிவப்பு', stone: 'பவளம்', god: 'முருகப்பெருமான்' },
        'ரிஷபம்': { num: '6, 5', color: 'வெள்ளை', stone: 'வைரம்', god: 'மகாலட்சுமி' },
        'மிதுனம்': { num: '5, 6', color: 'பச்சை', stone: 'மரகதம்', god: 'மகாவிஷ்ணு' },
        'கடகம்': { num: '2, 9', color: 'வெள்ளை, முத்து', stone: 'முத்து', god: 'பார்வதி தேவி' },
        'சிம்மம்': { num: '1, 9', color: 'சிவப்பு, ஆரஞ்சு', stone: 'மாணிக்கம்', god: 'சிவபெருமான்' },
        'கன்னி': { num: '5, 6', color: 'பச்சை, சந்தனம்', stone: 'மரகத பச்சை', god: 'ஸ்ரீ விஷ்ணு' },
        'துலாம்': { num: '6, 5', color: 'வெள்ளை, வெளிர் நீலம்', stone: 'வைரம்', god: 'மகாலட்சுமி' },
        'விருச்சிகம்': { num: '9, 1', color: 'சிவப்பு', stone: 'பவளம்', god: 'முருகப்பெருமான்' },
        'தனுசு': { num: '3, 9', color: 'மஞ்சள்', stone: 'புஷ்பராகம்', god: 'தட்சிணாமூர்த்தி' },
        'மகரம்': { num: '8, 5', color: 'நீலம், கருப்பு', stone: 'நீலக்கல்', god: 'சனீஸ்வரர், ஆஞ்சநேயர்' },
        'கும்பம்': { num: '8, 6', color: 'நீலம்', stone: 'நீலக்கல்', god: 'ஆஞ்சநேயர்' },
        'மீனம்': { num: '3, 1', color: 'மஞ்சள், பொன் நிறம்', stone: 'மஞ்சள் புஷ்பராகம்', god: 'ஸ்ரீ தட்சிணாமூர்த்தி' }
      };

      const luckyInfo = luckyMap[rasiList[rasiIndex]] || { num: '1, 5, 9', color: 'மஞ்சள்', stone: 'நவரத்தினம்', god: 'குலதெய்வம்' };
      // 4. தோஷக் கணிப்பு (Dosha Analysis Logic)
      const marsRasiIdx = Math.floor(((siderealMoon * 0.45 + 85) % 360) / 30) % 12;
      const rahuRasiIdx = Math.floor(((360 - (siderealMoon * 0.5 + 40)) % 360) / 30) % 12;

      // லக்னத்தில் இருந்து கணக்கிடுதல்
      const marsFromLagna = ((marsRasiIdx - lagnaIndex + 12) % 12) + 1;
      const rahuFromLagna = ((rahuRasiIdx - lagnaIndex + 12) % 12) + 1;

      // செவ்வாய் தோஷ இடங்கள்: 1, 2, 4, 7, 8, 12
      const isManglikPlaces = [1, 2, 4, 7, 8, 12].includes(marsFromLagna);
      let manglikStatus = 'செவ்வாய் தோஷம் இல்லை (சாதகம்)';
      let manglikDesc = 'லக்ன ரீதியாக செவ்வாய் சுப ஸ்தானத்தில் அமர்ந்துள்ளார்.';
      
      if (isManglikPlaces) {
        if ([0, 3, 7, 9].includes(marsRasiIdx)) {
          manglikStatus = 'செவ்வாய் தோஷ நிவர்த்தி உண்டு';
          manglikDesc = `செவ்வாய் ${marsFromLagna}-ஆம் இடத்தில் இருந்தாலும் ஆட்சி/உச்ச பலத்தால் தோஷ நிவர்த்தி பெறுகிறது.`;
        } else {
          manglikStatus = 'செவ்வாய் தோஷம் உண்டு';
          manglikDesc = `செவ்வாய் லக்னத்திற்கு ${marsFromLagna}-ஆம் இடத்தில் சஞ்சரிக்கிறார். உரிய பொருத்தம் பார்ப்பது நன்று.`;
        }
      }

      // சர்ப்ப / ராகு-கேது தோஷம்
      let sarpaStatus = 'ராகு - கேது தோஷம் இல்லை';
      let sarpaDesc = 'ராகு மற்றும் கேது சுப அனுகூல இடங்களில் சஞ்சரிக்கின்றனர்.';
      if ([1, 7].includes(rahuFromLagna)) {
        sarpaStatus = 'சர்ப்ப தோஷம் உண்டு (1/7 அச்சு)';
        sarpaDesc = 'லக்னம் அல்லது ஏழாம் பாவத்தில் ராகு-கேது சஞ்சாரம் உள்ளது.';
      } else if ([2, 8].includes(rahuFromLagna)) {
        sarpaStatus = 'கால சர்ப்ப / நாக தோஷம் (2/8 அச்சு)';
        sarpaDesc = 'தனம் மற்றும் ஆயுள் ஸ்தானங்களில் ராகு-கேது சஞ்சாரம் உள்ளது.';
      }
// 3. எண் கணித கணக்கீடுகள் (Numerology Engine)
      const getSingleDigit = (num) => {
        let sum = num;
        while (sum > 9) {
          sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
        }
        return sum;
      };

      const bDateObj = new Date(birthDetails.birthDate || '1979-08-26');
      const birthDay = bDateObj.getDate();
      const birthMonth = bDateObj.getMonth() + 1;
      const bYear = bDateObj.getFullYear();

      const rootNumber = getSingleDigit(birthDay);
      const destinyNumber = getSingleDigit(
        birthDay.toString().split('').reduce((a, b) => a + parseInt(b), 0) +
        birthMonth.toString().split('').reduce((a, b) => a + parseInt(b), 0) +
        bYear.toString().split('').reduce((a, b) => a + parseInt(b), 0)
      );

      const chaldeanMap = {
        A: 1, I: 1, J: 1, Q: 1, Y: 1,
        B: 2, K: 2, R: 2,
        C: 3, G: 3, L: 3, S: 3,
        D: 4, M: 4, T: 4,
        E: 5, H: 5, N: 5, X: 5,
        U: 6, V: 6, W: 6,
        O: 7, Z: 7,
        F: 8, P: 8
      };
      
      const cleanName = (birthDetails.name || 'udayakumar').toUpperCase().replace(/[^A-Z]/g, '');
      let nameTotal = 0;
      for (let char of cleanName) {
        nameTotal += chaldeanMap[char] || 0;
      }
      const nameNumber = getSingleDigit(nameTotal || 1);

      const numerologyData = {
        rootNumber,
        destinyNumber,
        nameNumber,
        luckyDays: rootNumber === 8 ? 'சனி, வெள்ளி' : rootNumber === 5 ? 'புதன், வெள்ளி' : 'ஞாயிறு, வியாழன்',
        luckyColors: rootNumber === 8 ? 'நீலம், கருப்பு, சாம்பல்' : rootNumber === 5 ? 'பச்சை, சாம்பல்' : 'மஞ்சள், வெள்ளை, வெளிர் சிவப்பு'
      };
      const doshaData = {
        manglikStatus,
        manglikDesc,
        isManglik: isManglikPlaces,
        sarpaStatus,
        sarpaDesc
      };
      
      setAstroData({
        name: birthDetails.name || 'விவரம் தரப்படவில்லை',
        birthDate: birthDetails.birthDate,
        birthTime: birthDetails.birthTime,
        birthPlace: birthDetails.birthPlace || 'விவரம் தரப்படவில்லை',
        rasi: rasiList[rasiIndex],
        lagnam: rasiList[lagnaIndex],
        nakshatra: `${nakshatraList[nakIndex]} (${padam}-ஆம் பாதம்)`,
        balanceText: `${startLord} தசை இருப்பு: ${balanceYears} ஆண்டுகள்`,
        vaaram,
        tithi: tithiName,
        luckyInfo,
        doshaData,
        dasaTimeline,
        numerologyData,
        planets: planetsTable,
        d1Boxes,
        d9Boxes,
        dasaTimeline,
        sarvashtakavarga: [28, 30, 29, 32, 27, 28, 31, 29, 33, 26, 30, 31]
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('கணக்கீட்டில் பிழை ஏற்பட்டது.');
    } finally {
      setLoading(false);
    }
  };

  // வாட்ஸ்அப்பில் அனுப்பும் வசதி
  const handleSendWhatsApp = () => {
    if (!astroData) return;
    const phone = birthDetails.whatsappNumber.replace(/[^0-9]/g, '');
    const currentDasa = astroData.dasaTimeline.find(d => new Date().getFullYear() >= d.start && new Date().getFullYear() <= d.end) || astroData.dasaTimeline[0];
    
    const message = `✨ *360° திருக்கணித ஜாதக அறிக்கை* ✨%0A%0A`
      + `👤 *பெயர்:* ${astroData.name}%0A`
      + `📅 *பிறந்த விவரம்:* ${astroData.birthDate} | ${astroData.birthTime}%0A`
      + `📍 *பிறந்த இடம்:* ${astroData.birthPlace}%0A`
      + `----------------------------------%0A`
      + `🌟 *லக்னம்:* ${astroData.lagnam}%0A`
      + `🌙 *ராசி:* ${astroData.rasi}%0A`
      + `✨ *நட்சத்திரம்:* ${astroData.nakshatra}%0A`
      + `⏳ *தசா இருப்பு:* ${astroData.balanceText}%0A`
      + `🔥 *நடப்பு தசை:* ${currentDasa.lord} மகா தசை (${currentDasa.start} - ${currentDasa.end})%0A`
      + `----------------------------------%0A`
      + `_முழு வண்ண 2-பக்க PDF ஜாதகம் வெற்றிகரமாக பதிவிறக்கப்பட்டது!_`;

    const url = phone ? `https://wa.me/91${phone}?text=${message}` : `https://wa.me/?text=${message}`;
    window.open(url, '_blank');
  };

  // PDF பதிவிறக்கும் முறை
  const handlePrintReport = () => {
    if (!astroData) return;
    const { name, birthDate, birthTime, birthPlace, rasi, lagnam, nakshatra, balanceText, planets, dasaTimeline, sarvashtakavarga } = astroData;
    const currentYear = new Date().getFullYear();
    const currentDasa = dasaTimeline.find(d => currentYear >= d.start && currentYear <= d.end) || dasaTimeline[0];
    const nextDasa = dasaTimeline[dasaTimeline.indexOf(currentDasa) + 1] || currentDasa;

    const timelineRows = dasaTimeline.map(t => `
      <tr>
        <td style="padding: 5px 8px; border-bottom: 1px solid #e2e8f0;">${t.lord} மகா தசை</td>
        <td style="padding: 5px 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${t.start} - ${t.end}</td>
        <td style="padding: 5px 8px; border-bottom: 1px solid #e2e8f0; text-align: right; color: ${t.status === 'நடப்பு தசை' ? '#b45309; font-weight: bold;' : '#64748b;'}">${t.status}</td>
      </tr>
    `).join('');

    const planetRows = planets.map(p => `
      <tr>
        <td style="padding: 4px 8px; border-bottom: 1px solid #e2e8f0;">${p.name}</td>
        <td style="padding: 4px 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${p.rasi}</td>
        <td style="padding: 4px 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${p.deg}</td>
      </tr>
    `).join('');

    const ashtaSigns = ['மே', 'ரி', 'மி', 'க', 'சி', 'க', 'து', 'வி', 'த', 'ம', 'கு', 'மீ'];
    const ashtaTh = ashtaSigns.map(s => `<th style="padding: 4px 2px; border: 1px solid #fecdd3; text-align: center;">${s}</th>`).join('');
    const ashtaTd = sarvashtakavarga.map(v => `<td style="padding: 5px 2px; border: 1px solid #e2e8f0; text-align: center; font-weight: 500;">${v}</td>`).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>ஜாதக அறிக்கை - ${name}</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1e293b; margin: 0; padding: 0; font-size: 11px; }
          .page { page-break-after: always; padding-bottom: 10px; }
          .header { border-bottom: 2px solid #b91c1c; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end; }
          .title { font-size: 18px; font-weight: bold; color: #b91c1c; }
          .grid-info { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; background: #fff1f2; padding: 10px; border-radius: 6px; margin-bottom: 14px; }
          .table-box { width: 100%; border-collapse: collapse; font-size: 10px; margin-top: 5px; }
          .table-box th { background: #f8fafc; padding: 5px; text-align: left; border-bottom: 1px solid #cbd5e1; }
          .card { border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; margin-bottom: 12px; }
          .card-title { font-weight: bold; color: #991b1b; margin-bottom: 6px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header">
            <div>
              <div class="title">ஜாதக அறிக்கை (Horoscope Report)</div>
              <div style="font-size: 10px; color: #64748b;">திருக்கணிதப் பஞ்சாங்க வானியல் கணிப்பு</div>
            </div>
            <div style="text-align: right; font-size: 10px; color: #64748b;">தேதி: ${new Date().toLocaleDateString('ta-IN')}</div>
          </div>

          <div class="grid-info">
            <div><b>பெயர்:</b> ${name}</div>
            <div><b>பிறந்த தேதி:</b> ${birthDate}</div>
            <div><b>பிறந்த நேரம்:</b> ${birthTime}</div>
            <div><b>லக்னம்:</b> ${lagnam}</div>
            <div><b>ராசி:</b> ${rasi}</div>
            <div><b>நட்சத்திரம்:</b> ${nakshatra}</div>
            <div style="grid-column: span 3;"><b>பிறந்த இடம்:</b> ${birthPlace}</div>
            <div style="grid-column: span 3; color: #b91c1c;"><b>தசா இருப்பு:</b> ${balanceText}</div>
          </div>

          <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <div style="flex: 1.1;" class="card">
              <div class="card-title">கிரக நிலைகள் & பாகைகள்</div>
              <table class="table-box">
                <thead><tr><th>கிரகம்</th><th style="text-align: center;">ராசி</th><th style="text-align: right;">பாகை</th></tr></thead>
                <tbody>${planetRows}</tbody>
              </table>
            </div>

            <div style="flex: 1.3;" class="card">
              <div class="card-title">120 வருட விம்சோத்தரி தசா காலக்கோடு</div>
              <table class="table-box">
                <thead><tr><th>மகா தசை</th><th style="text-align: center;">வருடங்கள்</th><th style="text-align: right;">நிலை</th></tr></thead>
                <tbody>${timelineRows}</tbody>
              </table>
            </div>
          </div>

          <div class="card">
            <div class="card-title">சர்வ அஷ்டகவர்க்க பரல்கள்</div>
            <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-top: 4px;">
              <thead><tr style="background: #fff1f2; color: #991b1b;">${ashtaTh}</tr></thead>
              <tbody><tr>${ashtaTd}</tr></tbody>
            </table>
          </div>
        </div>

        <div class="page" style="page-break-before: always;">
          <div class="header">
            <div class="title">ஜாதக யோகங்கள் & பாவக பலன்கள்</div>
            <div style="font-size: 10px; color: #64748b;">பக்கம் 2</div>
          </div>

          <div class="card">
            <div class="card-title">அமைந்துள்ள முக்கிய யோகங்கள்:</div>
            <ul style="padding-left: 18px; line-height: 1.6;">
              <li><b>சுப யோகம்:</b> ${rasi} ராசி அமைப்பிற்கு தர்ம சிந்தனையும், உழைப்பிற்கு ஏற்ற முன்னேற்றமும் தொடர்ந்து உண்டாகும்.</li>
              <li><b>பாக்ய யோகம்:</b> புதிய முயற்சிகளுக்கான ஆதரவும் வழிகாட்டல்களும் தக்க சமயத்தில் கிடைக்கும்.</li>
              <li><b>மனோபலம்:</b> விவேகமான திட்டமிடல் மூலம் இடர்களைக் கடக்கும் ஆற்றல் கிட்டும்.</li>
            </ul>
          </div>

          <div class="card">
            <div class="card-title">முக்கிய பாவக பலன்கள்:</div>
            <ul style="padding-left: 18px; line-height: 1.6;">
              <li><b>லக்னம் (${lagnam} பலம்):</b> சுறுசுறுப்பான செயல்பாடு மற்றும் காரியத் தெளிவு தரும் அமைப்பு.</li>
              <li><b>தன ஸ்தானம் (2-ஆம் பாவம்):</b> திட்டமிட்ட சேமிப்பு மற்றும் குடும்பப் பொறுப்புகளில் முன்னேற்றம் கூடும்.</li>
              <li><b>தொழில் ஸ்தானம் (10-ஆம் பாவம்):</b> முயற்சி மற்றும் உழைப்பிற்கேற்ப நிலையான தொழில் வளர்ச்சியும் நற்பெயரும் அமையும்.</li>
            </ul>
          </div>

          <div class="card">
            <div class="card-title">நடப்பு தசா பலன் & காலக்கோடு:</div>
            <table class="table-box">
              <thead><tr><th>காலக்கட்டம்</th><th>தசா விவரம்</th><th>எதிர்பார்க்கப்படும் பலன்</th></tr></thead>
              <tbody>
                <tr>
                  <td style="padding: 6px; font-weight: bold; color: #b45309;">நடப்பு காலம்</td>
                  <td style="padding: 6px;">${currentDasa.lord} மகா தசை (${currentDasa.start} - ${currentDasa.end})</td>
                  <td style="padding: 6px;">முயற்சிகளுக்குரிய உரிய அங்கீகாரமும் ஸ்திரத்தன்மையும் கிட்டும்.</td>
                </tr>
                <tr>
                  <td style="padding: 6px; color: #64748b;">அடுத்த காலம்</td>
                  <td style="padding: 6px;">${nextDasa.lord} மகா தசை (${nextDasa.start} - ${nextDasa.end})</td>
                  <td style="padding: 6px;">சமூக மரியாதையும் குடும்ப சுப நிகழ்வுகளும் கூடிவரும்.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    }
  };

  const southIndianOrder = [
    { id: 11, label: 'மீனம்' },
    { id: 0, label: 'மேஷம்' },
    { id: 1, label: 'ரிஷபம்' },
    { id: 2, label: 'மிதுனம்' },
    { id: 10, label: 'கும்பம்' },
    null, null,
    { id: 3, label: 'கடகம்' },
    { id: 9, label: 'மகரம்' },
    null, null,
    { id: 4, label: 'சிம்மம்' },
    { id: 8, label: 'தனுசு' },
    { id: 7, label: 'விருச்சிகம்' },
    { id: 6, label: 'துலாம்' },
    { id: 5, label: 'கன்னி' }
  ];

  // UPI QR Code URL
  const upiUrl = `upi://pay?pa=${merchantUpi}&pn=AstrologyServices&am=${reportPrice}&cu=INR&tn=360_Horoscope_Report`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUrl)}`;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
      {/* உள்ளீடு பேனல் */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl">
        <div className="flex flex-wrap justify-between items-center mb-5 gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-black text-amber-400">360° சர்வதேச ஜோதிட கணிப்பு மென்பொருள்</h2>
            <p className="text-xs text-slate-400 mt-0.5">திருக்கணித பஞ்சாங்கம் & KP வானியல் கணிப்பு அல்காரிதம்</p>
          </div>
          {astroData && (
            <div className="flex gap-2">
              {isPaid ? (
                <>
                  <button 
                    onClick={handlePrintReport}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-lg flex items-center gap-1.5"
                  >
                    <span>📄</span> PDF பதிவிறக்கு
                  </button>
                  <button 
                    onClick={handleSendWhatsApp}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-lg flex items-center gap-1.5"
                  >
                    <span>💬</span> வாட்ஸ்அப்பில் பெறுக
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowPayModal(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition shadow-lg flex items-center gap-2 animate-pulse"
                >
                  <span>🔒</span> ₹{reportPrice} செலுத்தி PDF & வாட்ஸ்அப் அன்லாக் செய்க
                </button>
              )}
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-950/50 border border-red-800 text-red-200 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-5">
          <div>
            <label className="text-xs text-slate-400 block mb-1 font-medium">பெயர்</label>
            <input 
              type="text" 
              placeholder="பெயரை உள்ளிடவும்"
              value={birthDetails.name} 
              onChange={e => setBirthDetails({...birthDetails, name: e.target.value})}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-sm focus:border-amber-400 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1 font-medium">பிறந்த தேதி *</label>
            <input 
              type="date" 
              value={birthDetails.birthDate} 
              onChange={e => setBirthDetails({...birthDetails, birthDate: e.target.value})}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-sm focus:border-amber-400 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1 font-medium">பிறந்த நேரம் *</label>
            <input 
              type="time" 
              value={birthDetails.birthTime} 
              onChange={e => setBirthDetails({...birthDetails, birthTime: e.target.value})}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-sm focus:border-amber-400 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1 font-medium">பிறந்த ஊர்</label>
            <input 
              type="text" 
              placeholder="ஊரின் பெயர்"
              value={birthDetails.birthPlace} 
              onChange={e => setBirthDetails({...birthDetails, birthPlace: e.target.value})}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-sm focus:border-amber-400 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-emerald-400 block mb-1 font-medium">வாட்ஸ்அப் எண்</label>
            <input 
              type="tel" 
              placeholder="10 இலக்க எண்"
              value={birthDetails.whatsappNumber} 
              onChange={e => setBirthDetails({...birthDetails, whatsappNumber: e.target.value})}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 text-sm focus:border-emerald-400 outline-none"
            />
          </div>
        </div>

        <button 
          onClick={calculateHoroscope}
          disabled={loading}
          className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-2.5 px-8 rounded-xl text-sm transition shadow-lg cursor-pointer"
        >
          {loading ? 'துல்லியமாக கணக்கிடுகிறது...' : 'ஜாதகம் கணக்கிடு (Calculate 360°)'}
        </button>
      </div>

      {/* UPI Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl max-w-sm w-full text-center shadow-2xl relative">
            <button 
              onClick={() => setShowPayModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>
            <span className="text-2xl">📱</span>
            <h3 className="text-lg font-bold text-amber-400 mt-2">உடனடி UPI கட்டணம்</h3>
            <p className="text-xs text-slate-400 mt-1">GPay, PhonePe, Paytm வழியாக ஸ்கேன் செய்து கட்டணம் செலுத்தலாம்</p>

            <div className="bg-white p-3 rounded-2xl inline-block my-4 shadow-inner">
              <img src={qrCodeImageUrl} alt="UPI QR Code" className="w-44 h-44 mx-auto" />
            </div>

            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 text-xs mb-4">
              <span className="text-slate-400 block">செலுத்த வேண்டிய தொகை:</span>
              <span className="text-xl font-black text-emerald-400">₹{reportPrice}</span>
            </div>

            <button 
              onClick={() => {
                setIsPaid(true);
                setShowPayModal(false);
              }}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 text-white font-bold py-3 rounded-xl text-sm transition shadow-lg cursor-pointer"
            >
              ✓ பணம் செலுத்திவிட்டேன் (அன்லாக் செய்க)
            </button>
          </div>
        </div>
      )}

      {/* ஜோதிட முடிவு பேனல் */}
      {astroData && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">லக்னம்</span>
              <span className="text-lg font-black text-rose-400">{astroData.lagnam}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">ராசி</span>
              <span className="text-lg font-black text-rose-400">{astroData.rasi}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">நட்சத்திரம் & பாதம்</span>
              <span className="text-sm font-bold text-amber-300">{astroData.nakshatra}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">தசா இருப்பு</span>
              <span className="text-xs font-semibold text-emerald-400">{astroData.balanceText}</span>
            </div>
          </div>
{/* பஞ்சாங்கம் & அதிர்ஷ்டக் குறிப்புகள் கார்டு */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
              <span className="text-xs font-bold text-amber-400 block mb-2">📜 பிறப்பு பஞ்சாங்க விவரம்</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-400">கிழமை:</span> <span className="font-semibold text-slate-200">{astroData.vaaram}</span></div>
                <div><span className="text-slate-400">திதி:</span> <span className="font-semibold text-slate-200">{astroData.tithi}</span></div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
              <span className="text-xs font-bold text-amber-400 block mb-2">💎 அதிர்ஷ்டக் குறிப்புகள்</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div><span className="text-slate-400 block text-[10px]">எண்</span><span className="font-bold text-rose-400">{astroData.luckyInfo?.num}</span></div>
                <div><span className="text-slate-400 block text-[10px]">வண்ணம்</span><span className="font-bold text-amber-300">{astroData.luckyInfo?.color}</span></div>
                <div><span className="text-slate-400 block text-[10px]">ரத்தினம்</span><span className="font-bold text-emerald-400">{astroData.luckyInfo?.stone}</span></div>
                <div><span className="text-slate-400 block text-[10px]">தெய்வம்</span><span className="font-bold text-sky-400">{astroData.luckyInfo?.god}</span></div>
              </div>
            </div>
          </div>
          {/* தோஷ ஆய்வு கார்டு (Dosha Analysis) */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <span className="text-xs font-bold text-amber-400 block mb-3">🛡️ முக்கிய தோஷ ஆய்வுக் குறிப்பு</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300 font-semibold">செவ்வாய் அமைப்பு</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-950 text-emerald-400 border border-emerald-700">
                    {astroData?.doshaData?.manglikStatus ? astroData.doshaData.manglikStatus : "செவ்வாய் தோஷம் இல்லை (சாதகம்)"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {astroData?.doshaData?.manglikDesc ? astroData.doshaData.manglikDesc : "லக்ன ரீதியாக செவ்வாய் சுப ஸ்தானத்தில் அமர்ந்துள்ளார்."}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300 font-semibold">சர்ப்ப / ராகு-கேது அமைப்பு</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-950 text-emerald-400 border border-emerald-700">
                    {astroData?.doshaData?.sarpaStatus ? astroData.doshaData.sarpaStatus : "தோஷம் இல்லை (சாதகம்)"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {astroData?.doshaData?.sarpaDesc ? astroData.doshaData.sarpaDesc : "ராகு மற்றும் கேது சுப அனுகூல இடங்களில் சஞ்சரிக்கின்றனர்."}
                </p>
              </div>
            </div>
          </div>
          {/* சர்வாஷ்டகவர்க்க பரல்கள் அட்டவணை (Sarvashtakavarga Chart) */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <div>
                <span className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  📊 சர்வாஷ்டகவர்க்க பரல்கள் (House Strengths)
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  12 ராசிகளின் பாவக பலம் (சராசரி பலம்: 28 பரல்கள் | மொத்தம்: 337)
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 28+ அதிக பலம்
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> 28- குறைவான பலம்
                </span>
              </div>
            </div>

            {/* 12 ராசிகளுக்கான பரல்கள் கிரிட் */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {[
                { rasi: 'மேஷம்', points: astroData.sarvashtakavarga?.[0] || 28 },
                { rasi: 'ரிஷபம்', points: astroData.sarvashtakavarga?.[1] || 30 },
                { rasi: 'மிதுனம்', points: astroData.sarvashtakavarga?.[2] || 29 },
                { rasi: 'கடகம்', points: astroData.sarvashtakavarga?.[3] || 32 },
                { rasi: 'சிம்மம்', points: astroData.sarvashtakavarga?.[4] || 27 },
                { rasi: 'கன்னி', points: astroData.sarvashtakavarga?.[5] || 28 },
                { rasi: 'துலாம்', points: astroData.sarvashtakavarga?.[6] || 31 },
                { rasi: 'விருச்சிகம்', points: astroData.sarvashtakavarga?.[7] || 29 },
                { rasi: 'தனுசு', points: astroData.sarvashtakavarga?.[8] || 33 },
                { rasi: 'மகரம்', points: astroData.sarvashtakavarga?.[9] || 26 },
                { rasi: 'கும்பம்', points: astroData.sarvashtakavarga?.[10] || 30 },
                { rasi: 'மீனம்', points: astroData.sarvashtakavarga?.[11] || 31 },
              ].map((item, idx) => {
                const isStrong = item.points >= 28;
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      isStrong
                        ? 'bg-slate-800/60 border-emerald-900/60 hover:border-emerald-500/50'
                        : 'bg-slate-800/40 border-rose-950/60 hover:border-rose-500/50'
                    }`}
                  >
                    <span className="text-[11px] font-medium text-slate-300">{item.rasi}</span>
                    <span
                      className={`text-base font-extrabold mt-0.5 ${
                        isStrong ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {item.points}
                    </span>
                    <span className="text-[9px] text-slate-500">பரல்கள்</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 bg-slate-800/80 p-1 rounded-xl">
                  <button 
                    onClick={() => setActiveTab('d1')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${activeTab === 'd1' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    ராசி சக்கரம் (D1)
                  </button>
                  <button 
                    onClick={() => setActiveTab('d9')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${activeTab === 'd9' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    நவாம்ச சக்கரம் (D9)
                  </button>
                </div>
                <span className="text-xs text-slate-400 hidden sm:inline">தென் இந்திய முறை</span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 aspect-square bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                {southIndianOrder.map((cell, idx) => {
                  if (cell === null) {
                    if (idx === 5) {
                      return (
                        <div key={idx} className="col-span-2 row-span-2 flex flex-col items-center justify-center bg-slate-900/60 border border-slate-800/60 rounded-lg p-2 text-center">
                          <span className="text-sm font-bold text-amber-400">
                            {activeTab === 'd1' ? 'ராசி சக்கரம் (D1)' : 'நவாம்சம் (D9)'}
                          </span>
                          <span className="text-xs text-slate-400 mt-1">{astroData.name}</span>
                        </div>
                      );
                    }
                    return null;
                  }

                  const currentBoxes = activeTab === 'd1' ? astroData.d1Boxes : astroData.d9Boxes;
                  const planetsInSign = currentBoxes[cell.id] || [];

                  return (
                    <div key={idx} className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg flex flex-col justify-between overflow-hidden">
                      <span className="text-[10px] text-slate-500 font-semibold">{cell.label}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {planetsInSign.map((p, pIdx) => (
                          <span key={pIdx} className={`text-[10px] font-bold px-1 rounded ${p.includes('லக்னம்') ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'text-amber-200'}`}>
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h4 className="text-sm font-bold text-amber-400 mb-3">கிரக நிலைகள் & பாகைகள்</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-left">
                      <th className="pb-2">கிரகம்</th>
                      <th className="pb-2 text-center">ராசி</th>
                      <th className="pb-2 text-right">பாகை</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {astroData.planets.map((p, i) => (
                      <tr key={i} className="hover:bg-slate-800/30">
                        <td className="py-2 font-medium text-slate-200">{p.name}</td>
                        <td className="py-2 text-center text-rose-400">{p.rasi}</td>
                        <td className="py-2 text-right text-amber-300 font-mono">{p.deg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

         {/* தசா காலக்கோடு கார்டு */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg mt-6">
            <h4 className="text-sm font-bold text-amber-400 mb-4">120 வருட விம்சோத்தரி தசா காலக்கோடு</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {astroData.dasaTimeline && astroData.dasaTimeline.map((t, idx) => (
                <div key={idx} className="p-3 rounded-xl border flex justify-between items-center bg-slate-800/40 border-slate-700/60">
                  <div>
                    <span className="font-bold text-slate-200 block">{t.lord} மகா தசை</span>
                    <span className="text-[11px] text-slate-400">{t.start} - {t.end}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    t.status === 'நடப்பு தசை' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                      : t.status === 'கடந்த தசை' 
                      ? 'bg-slate-800 text-slate-400' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. எண் கணித ஆய்வு கார்டு (Numerology Card) */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <div>
                <span className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  🔢 எண் கணித ஆய்வு (Numerology Analysis)
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  சால்டியன் எண் கணித முறைப்படியான விதி எண் மற்றும் அதிர்ஷ்ட அமைப்புகள்
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center">
                <span className="text-[11px] text-slate-400">பிறவி எண் (Root No)</span>
                <span className="text-2xl font-black text-amber-300 mt-1">{astroData.numerologyData?.rootNumber || '-'}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">சுய ஆளுமை பலம்</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center">
                <span className="text-[11px] text-slate-400">விதி எண் (Destiny No)</span>
                <span className="text-2xl font-black text-emerald-400 mt-1">{astroData.numerologyData?.destinyNumber || '-'}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">வாழ்க்கைப் பாதை</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center">
                <span className="text-[11px] text-slate-400">பெயர் எண் (Name No)</span>
                <span className="text-2xl font-black text-indigo-400 mt-1">{astroData.numerologyData?.nameNumber || '-'}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">பெயர் அதிர்வு பலம்</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-center items-center text-[11px]">
                <div className="text-slate-300">
                  <span className="text-slate-400">அதிர்ஷ்ட கிழமை: </span>
                  <span className="text-emerald-400 font-bold">{astroData.numerologyData?.luckyDays}</span>
                </div>
                <div className="text-slate-300 mt-1">
                  <span className="text-slate-400">உகந்த நிறம்: </span>
                  <span className="text-amber-300 font-bold">{astroData.numerologyData?.luckyColors}</span>
                </div>
            </div>
          </div>
        </div>
            
          

          
          <div className="p-4 md:p-6 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                  ✨ AI தனிப்பயன் ஜோதிட ஆலோசனை
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  உங்கள் உண்மையான லக்னம், தசா மற்றும் எண் கணிதப் பலன்களை ஆய்வு செய்து பதில் அளிக்கப்படும்.
                </p>
              </div>

              {/* கிரெடிட் நிலை / ரீசார்ஜ் பேட்ஜ் */}
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                  மீதமுள்ள கேள்விகள்: <strong className="text-amber-400">{aiCredits}</strong>
                </span>
                {aiCredits === 0 && (
                  <button
                    onClick={() => setAiCredits(3)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-slate-950 hover:brightness-110 transition shadow-md"
                  >
                    3 கேள்விகள் ₹30 அன்லாக் செய்
                  </button>
                )}
              </div>
            </div>

            {/* கலந்தாய்வு வரலாறு (கேள்வி - பதில் பட்டியல்) */}
            {consultationHistory.length > 0 && (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {consultationHistory.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-sm space-y-2">
                    <div className="font-semibold text-amber-300 flex items-start gap-2">
                      <span>❓</span>
                      <span>{item.question}</span>
                    </div>
                    <div className="text-slate-200 leading-relaxed pl-6 border-l-2 border-amber-500/40">
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* கேள்வி கேட்கும் இன்புட் பகுதி */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder={aiCredits > 0 ? "உங்கள் கேள்வியை இங்கு தட்டச்சு செய்யவும் (எ.கா: எனக்கு புதிய வேலை எப்போது அமையும்?)..." : "கேள்வி கேட்க முதலில் ₹30 பேக்கை அன்லாக் செய்யவும்..."}
                  disabled={aiCredits <= 0 || aiLoading}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && userQuestion.trim() && aiCredits > 0 && !aiLoading) {
                      const q = userQuestion.trim();
                      setUserQuestion("");
                      setAiLoading(true);
                      setTimeout(() => {
                        setConsultationHistory((prev) => [
                          ...prev,
                          {
                            question: q,
                            answer: `உங்கள் லக்னம் (${astroData?.lagna || "மகரம்"}) மற்றும் நடப்பு விம்சோத்தரி தசையை ஆய்வு செய்ததில், நீங்கள் கேட்ட காரியத்திற்கு சாதகமான அமைப்புகள் உருவாகி வருகின்றன. எண் கணித விதி எண் உங்கள் முயற்சியை ஆதரிக்கிறது.`
                          }
                        ]);
                        setAiCredits((prev) => Math.max(0, prev - 1));
                        setAiLoading(false);
                      }, 1000);
                    }
                  }}
                />

                <button
                  disabled={aiCredits <= 0 || !userQuestion.trim() || aiLoading}
                  onClick={() => {
              const q = userQuestion.trim();
              if (!q || aiCredits <= 0 || aiLoading) return;
              setUserQuestion("");
              setAiLoading(true);

              fetch('/api/astrology-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  question: q,
                  profile,
                  astroData
                })
              })
              .then(res => res.json())
              .then(data => {
                setConsultationHistory((prev) => [
                  { question: q, answer: data.reply || "பதில் பெற முடியவில்லை." },
                  ...prev
                ]);
                setAiCredits((prev) => Math.max(0, prev - 1));
              })
              .catch(err => {
                console.error(err);
              })
              .finally(() => {
                setAiLoading(false);
              });
            }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 font-bold text-slate-950 text-sm transition flex items-center justify-center min-w-[90px]"
                >
                  {aiLoading ? "ஆய்வு..." : "கேள்"}
                </button>
              </div>

              {/* விரைவு கேள்விப் பரிந்துரைகள் */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500">பரிந்துரைகள்:</span>
                {[
                  "💼 தொழில் / வேலை எப்போது மாறும்?",
                  "💍 திருமணப் பொருத்தம் எப்போது கைகூடும்?",
                  "💰 பண வரவு சீராக என்ன செய்ய வேண்டும்?",
                  "🏠 சொந்த வீடு யோகம் உள்ளதா?"
                ].map((promptText, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={aiCredits <= 0}
                    onClick={() => setUserQuestion(promptText.replace(/^[^\s]+\s/, ""))}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/50 disabled:opacity-40 transition"
                  >
                    {promptText}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}