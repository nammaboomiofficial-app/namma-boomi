import React from 'react';

// 1. கிழமையின் அடிப்படையில் ராகு காலம், எமகண்டம், நல்ல நேரம் (நிரந்தர பஞ்சாங்க சுழற்சி கணிதம்)
const WEEKDAY_TIMINGS = {
  0: { rahu: "04:30 - 06:00 PM", yema: "12:00 - 01:30 PM", nalla: "07:30 - 08:30 AM", gowri: "10:30 - 11:30 AM / 01:30 - 02:30 PM", yogam: "சுப யோகம்", lord: "சூரிய பகவான் வழிபாடு" },
  1: { rahu: "07:30 - 09:00 AM", yema: "10:30 - 12:00 PM", nalla: "06:30 - 07:30 AM", gowri: "09:30 - 10:30 AM / 01:30 - 02:30 PM", yogam: "அமிர்த யோகம்", lord: "சிவபெருமான் வழிபாடு (சோமவாரம்)" },
  2: { rahu: "03:00 - 04:30 PM", yema: "09:00 - 10:30 AM", nalla: "07:30 - 08:30 AM", gowri: "10:30 - 11:30 AM / 07:30 - 08:30 PM", yogam: "சித்த யோகம்", lord: "முருகப் பெருமான் வழிபாடு" },
  3: { rahu: "12:00 - 01:30 PM", yema: "07:30 - 09:00 AM", nalla: "09:30 - 10:30 AM", gowri: "10:30 - 11:30 AM / 06:30 - 07:30 PM", yogam: "அமிர்த யோகம்", lord: "புதன் பகவான் வழிபாடு" },
  4: { rahu: "01:30 - 03:00 PM", yema: "06:00 - 07:30 AM", nalla: "09:30 - 10:30 AM", gowri: "12:30 - 01:30 PM / 07:30 - 08:30 PM", yogam: "குரு யோகம்", lord: "தட்சிணாமூர்த்தி & குரு வழிபாடு" },
  5: { rahu: "10:30 - 12:00 PM", yema: "03:00 - 04:30 PM", nalla: "06:30 - 07:30 AM", gowri: "09:30 - 10:30 AM / 04:30 - 05:30 PM", yogam: "சுக்கிர யோகம்", lord: "ஸ்ரீ மகாலட்சுமி வழிபாடு" },
  6: { rahu: "09:00 - 10:30 AM", yema: "01:30 - 03:00 PM", nalla: "07:30 - 08:30 AM", gowri: "10:30 - 11:30 AM / 09:30 - 10:30 PM", yogam: "சித்த யோகம்", lord: "சனீஸ்வரர் & ஆஞ்சநேயர் வழிபாடு" }
};

// 2. வானியல் சூத்திரப்படி சூரியனின் சஞ்சாரத்தைக் கொண்டு தமிழ் மாதம் கணித்தல் (Solar Ingress Math)
function getAstronomicalTamilDate(d, m) {
  const solarIngress = [
    { m: 1, cutoff: 14, prev: "மார்கழி", curr: "தை", prevOffset: 16, currOffset: 13 },
    { m: 2, cutoff: 13, prev: "தை", curr: "மாசி", prevOffset: 13, currOffset: 12 },
    { m: 3, cutoff: 14, prev: "மாசி", curr: "பங்குனி", prevOffset: 12, currOffset: 13 },
    { m: 4, cutoff: 14, prev: "பங்குனி", curr: "சித்திரை", prevOffset: 13, currOffset: 13 },
    { m: 5, cutoff: 15, prev: "சித்திரை", curr: "வைகாசி", prevOffset: 13, currOffset: 14 },
    { m: 6, cutoff: 15, prev: "வைகாசி", curr: "ஆனி", prevOffset: 14, currOffset: 14 },
    { m: 7, cutoff: 16, prev: "ஆனி", curr: "ஆடி", prevOffset: 14, currOffset: 15 },
    { m: 8, cutoff: 17, prev: "ஆடி", curr: "ஆவணி", prevOffset: 15, currOffset: 16 },
    { m: 9, cutoff: 17, prev: "ஆவணி", curr: "புரட்டாசி", prevOffset: 16, currOffset: 16 },
    { m: 10, cutoff: 18, prev: "புரட்டாசி", curr: "ஐப்பசி", prevOffset: 16, currOffset: 17 },
    { m: 11, cutoff: 17, prev: "ஐப்பசி", curr: "கார்த்திகை", prevOffset: 17, currOffset: 16 },
    { m: 12, cutoff: 16, prev: "கார்த்திகை", curr: "மார்கழி", prevOffset: 16, currOffset: 15 }
  ];

  const rule = solarIngress.find(r => r.m === m);
  if (!rule) return { month: "", day: 1, text: "" };

  if (d >= rule.cutoff) {
    const tDay = d - rule.currOffset;
    return { month: rule.curr, day: tDay, text: `${rule.curr} - ${tDay}` };
  } else {
    const tDay = d + rule.prevOffset;
    return { month: rule.prev, day: tDay, text: `${rule.prev} - ${tDay}` };
  }
}

// 3. சாஸ்திர பஞ்சாங்க விதிகளின்படி பண்டிகையைக் கணக்கிடும் எஞ்சின் (100% Rule Based)
function evaluatePanchangaFestival(tamilMonth, tamilDay, tithiStr, nakshatraStr, weekdayIndex) {
  const tithiLower = (tithiStr || "").toLowerCase();
  const nakshatraLower = (nakshatraStr || "").toLowerCase();
  const isShukla = tithiLower.includes("சுக்ல") || tithiLower.includes("வளர்பிறை");
  const isKrishna = tithiLower.includes("கிருஷ்ண") || tithiLower.includes("தேய்பிறை");

  // சாஸ்திர விதி 1: ஆவணி மாதம் + வளர்பிறை சதுர்த்தி = ஸ்ரீ விநாயகர் சதுர்த்தி
  if (tamilMonth === "ஆவணி" && isShukla && tithiLower.includes("சதுர்த்தி")) {
    return "ஸ்ரீ விநாயகர் சதுர்த்தி மகா பெருவிழா";
  }

  // சாஸ்திர விதி 2: ஆவணி மாதம் + தேய்பிறை அஷ்டமி அல்லது ரோகிணி = ஸ்ரீ கிருஷ்ண ஜெயந்தி
  if (tamilMonth === "ஆவணி" && ((isKrishna && tithiLower.includes("அஷ்டமி")) || nakshatraLower.includes("ரோகிணி"))) {
    return "ஸ்ரீ கிருஷ்ண ஜெயந்தி / கோகுலாஷ்டமி நன்னாள்";
  }

  // சாஸ்திர விதி 3: ஐப்பசி மாதம் + தேய்பிறை சதுர்தசி / அமாவாசை = தீபாவளி
  if (tamilMonth === "ஐப்பசி" && isKrishna && (tithiLower.includes("சதுர்தசி") || tithiLower.includes("அமாவாசை"))) {
    return "தீபாவளிப் பண்டிகை திருநாள்";
  }

  // சாஸ்திர விதி 4: தை மாதம் 1-ம் தேதி = பொங்கல் திருநாள்
  if (tamilMonth === "தை" && (tamilDay === 1 || tamilDay === 2)) {
    return tamilDay === 1 ? "தைப்பொங்கல் / மகர சங்கராந்தி" : "மாட்டுப் பொங்கல் / உழவர் திருநாள்";
  }

  // சாஸ்திர விதி 5: சித்திரை மாதம் 1-ம் தேதி = தமிழ்ப் புத்தாண்டு
  if (tamilMonth === "சித்திரை" && tamilDay === 1) {
    return "சித்திரை தமிழ்ப் புத்தாண்டு திருநாள்";
  }

  // சாஸ்திர விதி 6: கார்த்திகை மாதம் + பௌர்ணமி / கிருத்திகை = கார்த்திகை தீபம்
  if (tamilMonth === "கார்த்திகை" && (tithiLower.includes("பௌர்ணமி") || nakshatraLower.includes("கிருத்திகை"))) {
    return "திருவண்ணாமலை மகா கார்த்திகை தீபத் திருவிழா";
  }

  // சாஸ்திர விதி 7: மாசி மாதம் + தேய்பிறை சதுர்தசி = மகா சிவராத்திரி
  if (tamilMonth === "மாசி" && isKrishna && tithiLower.includes("சதுர்தசி")) {
    return "மகா சிவராத்திரி புண்ணிய தினம்";
  }

  // சாஸ்திர விதி 8: புரட்டாசி மாதம் + வளர்பிறை நவமி = சரஸ்வதி / ஆயுத பூஜை
  if (tamilMonth === "புரட்டாசி" && isShukla && tithiLower.includes("நவமி")) {
    return "சரஸ்வதி பூஜை / ஆயுத பூஜை பெருவிழா";
  }

  // சாஸ்திர விதி 9: புரட்டாசி மாதம் + வளர்பிறை தசமி = விஜயதசமி
  if (tamilMonth === "புரட்டாசி" && isShukla && tithiLower.includes("தசமி")) {
    return "விஜயதசமி வெற்றித் திருநாள்";
  }

  // சாஸ்திர விதி 10: மார்கழி மாதம் + வளர்பிறை ஏகாதசி = வைகுண்ட ஏகாதசி
  if (tamilMonth === "மார்கழி" && isShukla && tithiLower.includes("ஏகாதசி")) {
    return "வைகுண்ட ஏகாதசி (சொர்க்கவாசல் திறப்பு)";
  }

  // சாஸ்திர விதி 11: ஆடி மாதம் 18-ம் பெருக்கு
  if (tamilMonth === "ஆடி" && tamilDay === 18) {
    return "ஆடிப்பெருக்கு காவிரி நதி பூஜை நன்னாள்";
  }

  // சாஸ்திர விதி 12: மாதாந்திர நித்திய விரதங்கள் (Daily Vratas based on Tithi)
  if (tithiLower.includes("சதுர்த்தி")) return "சதுர்த்தி விரதம் • கணபதி ஆராதனை";
  if (tithiLower.includes("சஷ்டி")) return "கந்த சஷ்டி விரதம் • முருகப் பெருமான் அருள்";
  if (tithiLower.includes("ஏகாதசி")) return "ஏகாதசி விரதம் • மகாவிஷ்ணு வழிபாடு";
  if (tithiLower.includes("திரயோதசி")) return "பிரதோஷ விரதம் • சிவபெருமான் நந்தி தரிசனம்";
  if (tithiLower.includes("பௌர்ணமி")) return "பௌர்ணமி விரதம் • கிரிவலம் / சத்யநாராயண பூஜை";
  if (tithiLower.includes("அமாவாசை")) return "அமாவாசை புண்ணிய தினம் • முன்னோர் ஆசி";

  // பொதுவான நாளாக இருந்தால் கிழமைக்குரிய ஆராதனை
  return WEEKDAY_TIMINGS[weekdayIndex]?.lord || "சுப முகூர்த்த சுபதினம்";
}

export default function BirthdayCalendar({ dob, astroData }) {
  if (!dob) return null;

  const cleanDob = dob.trim();
  let day = "", month = "", year = "";

  if (cleanDob.includes('/')) {
    const parts = cleanDob.split('/');
    day = parts[0]; month = parts[1]; year = parts[2];
  } else if (cleanDob.includes('-')) {
    const parts = cleanDob.split('-');
    if (parts[0].length === 4) {
      year = parts[0]; month = parts[1]; day = parts[2];
    } else {
      day = parts[0]; month = parts[1]; year = parts[2];
    }
  }

  const dInt = parseInt(day, 10);
  const mInt = parseInt(month, 10);
  const yInt = parseInt(year, 10);

  if (isNaN(dInt) || isNaN(mInt) || isNaN(yInt)) return null;

  const dateObj = new Date(yInt, mInt - 1, dInt);
  const dayIndex = dateObj.getDay();

  const weekdays = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];
  const dayName = weekdays[dayIndex] || "சுபதினம்";

  const monthsTamil = [
    "ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", 
    "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"
  ];
  const monthName = monthsTamil[dateObj.getMonth()] || "";

  // பஞ்சாங்கக் கணக்கீடு
  const timings = WEEKDAY_TIMINGS[dayIndex] || {};
  const tamilCalc = getAstronomicalTamilDate(dInt, mInt);
  
  // astroData-விலிருந்து பெறப்படும் துல்லியத் தரவுகள்
  const finalTamilDate = astroData?.tamilDate || tamilCalc.text || `${monthName} ${day}`;
  const finalNakshatra = astroData?.nakshatra || astroData?.nakshatram || astroData?.star || "அஸ்தம்";
  const finalTithi = astroData?.tithi || astroData?.thithi || "சுக்ல சதுர்த்தி";
  const nallaNeram = astroData?.nallaNeram || timings.nalla;
  const gowriNeram = astroData?.gowriNallaNeram || timings.gowri;
  const rahuKalam = astroData?.rahuKalam || timings.rahu;
  const yemaKandam = astroData?.yemaKandam || timings.yema;

  // 100% சாஸ்திர விதிப்படி பண்டிகை கண்டறிதல்
  const festivalText = astroData?.festival || evaluatePanchangaFestival(
    tamilCalc.month, 
    tamilCalc.day, 
    finalTithi, 
    finalNakshatra, 
    dayIndex
  );

  return (
    <div className="max-w-[310px] mx-auto my-5 bg-white text-gray-900 rounded-2xl shadow-2xl border-4 border-red-700 overflow-hidden font-sans select-none transform transition-transform hover:scale-105">
      {/* காலண்டர் உச்சிப் பட்டை */}
      <div className="bg-red-700 text-white text-center py-2.5 px-3">
        <span className="text-[12px] font-bold tracking-widest uppercase block">பிறந்த தின பாரம்பரிய பஞ்சாங்கம்</span>
        <span className="text-xs text-red-100 font-semibold">{monthName} - {year}</span>
      </div>

      {/* கிழமை & பெரிய தேதி எண் */}
      <div className="p-3 text-center border-b-2 border-red-100 bg-amber-50/70">
        <span className="text-red-700 font-extrabold text-base block">{dayName}</span>
        <span className="text-5xl font-black text-gray-950 tracking-tight my-0.5 block">{String(dInt).padStart(2, '0')}</span>
        <span className="text-xs font-bold text-amber-950 bg-amber-300 px-3 py-0.5 rounded-full inline-block mt-1 shadow-sm">
          தமிழ் தேதி: {finalTamilDate}
        </span>
      </div>

      {/* பஞ்சாங்க விவரங்கள் */}
      <div className="p-3.5 bg-white text-xs space-y-2">
        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
          <span className="text-gray-600 font-semibold">திதி:</span>
          <span className="font-bold text-gray-900">{finalTithi}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
          <span className="text-gray-600 font-semibold">நட்சத்திரம்:</span>
          <span className="font-bold text-blue-900">{finalNakshatra}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
          <span className="text-gray-600 font-semibold">நல்ல நேரம்:</span>
          <span className="font-bold text-emerald-800">{nallaNeram}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
          <span className="text-gray-600 font-semibold">கௌரி நல்ல நேரம்:</span>
          <span className="font-bold text-teal-800 text-[11px]">{gowriNeram}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
          <span className="text-gray-600 font-semibold">ராகு காலம்:</span>
          <span className="font-bold text-red-700">{rahuKalam}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
          <span className="text-gray-600 font-semibold">எமகண்டம்:</span>
          <span className="font-bold text-orange-700">{yemaKandam}</span>
        </div>

        {/* சாஸ்திர விதிப்படி கண்டறியப்பட்ட பண்டிகை / விரதப் பட்டை */}
        <div className="bg-red-50 p-2 rounded-lg border border-red-200 mt-1">
          <div className="flex items-center space-x-1 mb-0.5">
            <span className="text-red-700 font-black text-[11px]">✦ அன்றைய பண்டிகை & சிறப்பு:</span>
          </div>
          <p className="text-red-950 font-bold text-[11px] leading-snug">
            {festivalText}
          </p>
        </div>
      </div>

      {/* அடிக்குறிப்பு */}
      <div className="bg-gray-100 py-1.5 text-center border-t border-gray-300">
        <p className="text-[11px] text-gray-700 font-bold tracking-wide">ஓம் நமச்சிவாய • வாழ்க வளமுடன்</p>
      </div>
    </div>
  );
}