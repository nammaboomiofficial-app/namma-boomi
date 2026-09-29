const RASHIS = [
  "மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்", 
  "சிம்மம்", "கன்னி", "துலாம்", "விருச்சிகம்", 
  "தனுசு", "மகரம்", "கும்பம்", "மீனம்"
];

const RASI_LORDS = [
  "செவ்வாய்", "சுக்கிரன்", "புதன்", "சந்திரன்", 
  "சூரியன்", "புதன்", "சுக்கிரன்", "செவ்வாய்", 
  "குரு", "சனி", "சனி", "குரு"
];

function runVedicRuleEngine(lagnaIdx, computedPlanets, question) {
  const safeLagna = (lagnaIdx >= 0 && lagnaIdx < 12) ? lagnaIdx : 9; // இயல்பு: மகரம்
  const tenthHouseIdx = (safeLagna + 9) % 12;
  const tenthHouseName = RASHIS[tenthHouseIdx];
  const tenthLord = RASI_LORDS[tenthHouseIdx];

  const lordPlanet = computedPlanets[tenthLord] || computedPlanets['சுக்கிரன்'] || {};
  const lordPos = lordPlanet.rasiIndex !== undefined 
    ? `லக்னத்திலிருந்து ${((lordPlanet.rasiIndex - safeLagna + 12) % 12) + 1}-ஆம் வீடு (${RASHIS[lordPlanet.rasiIndex]})` 
    : "சுப பலம் பெற்ற ஸ்தானம்";

  return {
    tenthHouse: tenthHouseName,
    tenthLord: tenthLord,
    lordPosition: lordPos
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, profile, astroData, birthDetails } = req.body;

    // 1. பிறந்த தேதி பிரித்தெடுத்தல்
    let day = 26, month = 8, year = 1979;
    const dobStr = profile?.dob || birthDetails?.birthDate || profile?.birthDate || "";
    if (dobStr) {
      const cleanDob = dobStr.trim();
      let parts = [];
      if (cleanDob.includes('/')) {
        parts = cleanDob.split('/');
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
      } else if (cleanDob.includes('-')) {
        parts = cleanDob.split('-');
        if (parts[0].length === 4) {
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          day = parseInt(parts[2], 10);
        } else {
          day = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          year = parseInt(parts[2], 10);
        }
      }
    }

    // 2. பிறந்த நேரம் (AM/PM மாற்றி 24-மணி நேரக் கணக்கீடு)
    let hour = 16, minute = 19;
    const tobStr = profile?.tob || birthDetails?.birthTime || profile?.birthTime || "";
    const hasBirthTime = Boolean(tobStr && tobStr.trim() !== "" && !profile?.isTimeUnknown);

    if (hasBirthTime) {
      const isPM = /pm/i.test(tobStr);
      const isAM = /am/i.test(tobStr);
      const cleanTime = tobStr.replace(/[^0-9:]/g, '').trim();
      const tParts = cleanTime.split(':');
      if (tParts.length >= 2) {
        let h = parseInt(tParts[0], 10);
        minute = parseInt(tParts[1], 10);
        if (isPM && h < 12) h += 12;
        if (isAM && h === 12) h = 0;
        hour = h;
      }
    }

    // 3. பைத்தான் ஜோதிட கணித சேவை அழைப்பு (Port 8001)
    let pyData = {};
    try {
      const pyRes = await fetch('http://127.0.0.1:8001/calculate-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year, month, day, hour, minute,
          lat: 12.6841, lon: 79.9836 // செங்கல்பட்டு
        })
      });

      if (pyRes.ok) {
        pyData = await pyRes.json();
      }
    } catch (pyErr) {
      console.warn("Python Service offline:", pyErr.message);
    }

    const lagnaInfo = pyData?.lagna || {};
    const computedPlanets = pyData?.planets || {};

    // 4. லக்னம், ராசி, நட்சத்திரம் பிரித்தெடுத்தல் (எந்த வடிவில் வந்தாலும் எடுக்கும் Fail-Safe முறை)
    const rawLagna = astroData?.lagna || astroData?.lagnaName || lagnaInfo?.tamil_name || lagnaInfo?.rasi_name || "";
    let finalLagnaName = "மகரம்";
    let finalLagnaIndex = 9;

    if (rawLagna && RASHIS.some(r => rawLagna.includes(r))) {
      finalLagnaName = RASHIS.find(r => rawLagna.includes(r));
      finalLagnaIndex = RASHIS.indexOf(finalLagnaName);
    } else if (lagnaInfo?.rasiIndex !== undefined && lagnaInfo.rasiIndex >= 0) {
      finalLagnaIndex = lagnaInfo.rasiIndex;
      finalLagnaName = RASHIS[finalLagnaIndex];
    }

    const rawRasi = astroData?.rasi || astroData?.rasiName || computedPlanets['சந்திரன்']?.tamil_name || "கன்னி";
    const finalRasi = RASHIS.find(r => rawRasi.includes(r)) || "கன்னி";

    const finalNakshatra = astroData?.nakshatra || astroData?.nakshatraName || "அஸ்தம் (3-ஆம் பாதம்)";
    const dasaDetails = astroData?.dasa || astroData?.dasaBalance || "சந்திரன் தசை இருப்பு: 2.7 ஆண்டுகள்";

    // 5. பாவக ஆய்வு கணிதம்
    const vedicMath = runVedicRuleEngine(finalLagnaIndex, computedPlanets, question);

    // 6. AI பிராம்ட்
    const promptText = `
நீங்கள் ஒரு தலைசிறந்த பாரம்பரிய வேத ஜோதிடர். அன்பருக்கு 100% சாஸ்திர பூர்வமாக, உண்மை கிரக நிலைகளின்படி விரிவான வழிகாட்டலை வழங்கவும்.

ஜாதகர் உண்மை விவரங்கள்:
- பெயர்: ${profile?.name || "அன்பர்"}
- லக்னம்: ${finalLagnaName}
- ராசி: ${finalRasi}
- நட்சத்திரம்: ${finalNakshatra}
- தசா இருப்பு: ${dasaDetails}

கேள்வி: "${question}"

10-ஆம் பாவக விபரம்:
- 10-ஆம் வீடு: ${vedicMath.tenthHouse} (தொழில்/பதவி ஸ்தானம்)
- பாவாதிபதி: ${vedicMath.tenthLord} (${vedicMath.lordPosition})

கட்டாய பதில் வடிவம்:
வணக்கம் ${profile?.name || "அன்பர்"} அவர்களுக்கு!

## 1. சாஸ்திர உண்மை & பாவக ஆய்வு
- **ஜன்ம லக்னம்**: ${finalLagnaName} (கடின உழைப்பு மற்றும் சவால்களை வெல்லும் மனோபலம்)
- **10-ஆம் வீடு (தொழில்/காரிய ஸ்தானம்)**: ${vedicMath.tenthHouse} (சுக்கிரனின் ஆளுமை பெற்ற தர்ம-கர்மாதிபதி அமைப்பு)
- **10-ஆம் அதிபதியின் நிலை**: ${vedicMath.tenthLord} - ${vedicMath.lordPosition}
- **முக்கிய கிரக பார்வை**: கர்ம காரகனான சனி பகவான் மற்றும் குருவின் அனுகூல பார்வை தொழில் ரீதியான வளர்ச்சியைத் தரும்.

## 2. காரியம் கைகூடும் துல்லிய காலம் (எப்போது நடக்கும்?)
- **முதல் சாதகமான கட்டம்**: அடுத்த 3 முதல் 5 மாதங்களுக்குள் புதிய தொழில் தொடர்புகள் மற்றும் பணி மாற்றப் பேச்சுவார்த்தைகள் தொடங்கும்.
- **முழு பலன் தரும் காலம்**: அடுத்த 6 முதல் 9 மாத காலத்திற்குள் நடப்பு தசா-புக்தி பலத்தால் உறுதியான பணி மாற்றம் அல்லது தொழில் திருப்பம் கைகூடும்.
- **குறிப்பிடத்தக்க மாதங்கள்**: தை, சித்திரை மற்றும் ஆவணி மாதங்கள் உத்தியோக உயர்வு மற்றும் புதிய ஒப்பந்தங்களுக்கு மிகச் சாதகமானவை.

## 3. முக்கிய முன்னெச்சரிக்கைகள் (எப்போது, எதில் கவனமாக இருக்க வேண்டும்?)
- **பணி மாற்றம் & அவசரம்**: புதிய பணி ஆணை கையில் கிடைக்கும் வரை, உணர்ச்சிவசப்பட்டு தற்போதைய வேலையை விடவோ அல்லது உயர் அதிகாரிகளிடம் தர்க்கம் செய்யவோ கூடாது.
- **பணப் பரிவர்த்தனை & ஆவணங்கள்**: நிலம் அல்லது முதலீட்டு ஆவணங்களை முழுமையாகச் சரிபார்க்காமல் கையெழுத்திடுவதைத் தவிர்க்கவும்; பிறருக்கு ஜாமீன் (Surety) போடுவதைத் தவிர்க்கவும்.
- **கூட்டுத் தொழில் எச்சரிக்கை**: நண்பர்கள் அல்லது உறவினர்களுடன் இணைந்து கூட்டுத் தொழில் செய்யும் போது நிதி சார்ந்த விதிகளை எழுத்துப்பூர்வமாகப் பதிவு செய்து கொள்ளவும்.
- **மனக் கட்டுப்பாடு**: அவசரப்பட்டு முடிவெடுக்கும் போது சந்திர சஞ்சாரம் பலவீனமாக உள்ள அஷ்டமி, நவமி நாட்களைப் புதிய ஒப்பந்தங்களுக்குத் தவிர்க்கவும்.

## 4. சாதகமான தொழில் களங்கள் & திசைகள்
- **பொருத்தமான துறைகள்**: நிலம்/ரியல் எஸ்டேட், நிர்வாக மேலாண்மை, பொறியியல் & கணினி சார்ந்த திட்டங்கள், ஆலோசனைப் பணிகள்.
- **அனுகூல திசை & எண்கள்**: மேற்கு மற்றும் தெற்கு திசைகள்; அதிர்ஷ்ட எண்கள் 6, 8.

## 5. நடைமுறை வழிகாட்டல் & எளிய பரிகாரம்
- **வழிபாடு**: சனிக்கிழமைகளில் ஆஞ்சநேயர் வழிபாடு செய்வதும், நல்லெண்ணெய் தீபம் ஏற்றி உழைக்கும் எளியோருக்கு அன்னதானம் வழங்குவதும் தடைகளை நீக்கி சுப யோகத்தை உண்டாக்கும்.
- **நல்வாழ்த்து**: முறையான திட்டமிடல் மற்றும் விவேகமான முன்னெச்சரிக்கையுடன் கூடிய உங்கள் உழைப்பு உரிய நற்பலன்களைத் தரும்.
`;

    // 7. Groq AI அழைப்பு & பாதுகாப்பான Fallback
    const apiKey = process.env.GROQ_API_KEY;
    let reply = "";

    if (apiKey) {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: promptText }],
            temperature: 0.4
          })
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          reply = groqData.choices?.[0]?.message?.content || "";
        }
      } catch (e) {
        console.warn("Groq fetch error:", e.message);
      }
    }

    if (!reply) {
      reply = `வணக்கம் ${profile?.name || "அன்பர்"} அவர்களுக்கு!\n\n## 1. சாஸ்திர உண்மை & பாவக ஆய்வு\n- **ஜன்ம லக்னம்**: ${finalLagnaName} (கடின உழைப்பு, பொறுமை, விடாமுயற்சியால் தலைமை ஏற்கும் அமைப்பு)\n- **10-ஆம் வீடு (தொழில்/காரிய ஸ்தானம்)**: ${vedicMath.tenthHouse} (சுக்கிரனின் ஆளுமை பெற்ற யோக ஸ்தானம்)\n- **10-ஆம் அதிபதியின் நிலை**: ${vedicMath.tenthLord} - ${vedicMath.lordPosition}\n- **முக்கிய கிரக பார்வை**: கர்ம காரகனான சனி பகவான் மற்றும் சுப கிரக சஞ்சாரம் தொழிலில் புதிய அந்தஸ்தை அமைக்கும்.\n\n## 2. காரியம் கைகூடும் துல்லிய காலம் (எப்போது நடக்கும்?)\n- **முதல் சாதகமான கட்டம்**: அடுத்த 3 முதல் 5 மாதங்களுக்குள் புதிய தொழில் வாய்ப்புகள் மற்றும் உத்தியோக பேச்சுவார்த்தைகள் தொடங்கும்.\n- **முழு பலன் தரும் காலம்**: அடுத்த 6 முதல் 9 மாத காலத்திற்குள் தசா-புக்தி அமைப்பின் பலத்தால் பணி மாற்றம் அல்லது புதிய பொறுப்புகள் உறுதியாகும்.\n- **குறிப்பிடத்தக்க மாதங்கள்**: தை, சித்திரை, ஆனி மற்றும் ஐப்பசி மாதங்கள் தொழில் ரீதியான ஒப்பந்தங்களுக்கு மிகச் சாதகமானவை.\n\n## 3. முக்கிய முன்னெச்சரிக்கைகள் (எப்போது, எதில் கவனமாக இருக்க வேண்டும்?)\n- **பணி மாற்றம் & அவசரம்**: புதிய பணி நியமன ஆணை கையில் கிடைக்கும் வரை, உணர்ச்சிவசப்பட்டு தற்போதைய வேலையை விடவோ அல்லது எதிர்த்துப் பேசவோ கூடாது.\n- **பணப் பரிவர்த்தனை & ஆவணங்கள்**: ஆவணங்களைச் சரிபார்க்காமல் கையெழுத்திடுவதைத் தவிர்க்கவும்; பிறருக்கு ஜாமீன் (Surety) போடுவதோ கடன் கொடுப்பதோ பண முடக்கத்தை உண்டாக்கலாம்.\n- **கூட்டுத் தொழில் எச்சரிக்கை**: நண்பர்கள் அல்லது உறவினர்களுடன் இணைந்து கூட்டுத் தொழில் செய்யும் போது அனைத்து விதிகளையும் வெளிப்படையாகப் பதிவு செய்து கொள்ளவும்.\n- **மனக் கட்டுப்பாடு**: அவசரப்பட்டு முடிவெடுக்கும் போது சந்திர சஞ்சாரம் பலவீனமாக உள்ள அஷ்டமி, நவமி நாட்களைப் புதிய ஒப்பந்தங்களுக்குத் தவிர்க்கவும்.\n\n## 4. சாதகமான தொழில் களங்கள் & திசைகள்\n- **பொருத்தமான துறைகள்**: நிலம்/ரியல் எஸ்டேட், நிர்வாக மேலாண்மை, வர்த்தகம், இயந்திரங்கள் மற்றும் திட்டமிடல் சார்ந்த துறைகள்.\n- **அனுகூல திசை & எண்கள்**: மேற்கு மற்றும் தெற்கு திசைகள்; அதிர்ஷ்ட எண்கள் 6, 8.\n\n## 5. நடைமுறை வழிகாட்டல் & எளிய பரிகாரம்\n- **வழிபாடு**: சனிக்கிழமைகளில் ஆஞ்சநேயர் வழிபாடு செய்வதும், நல்லெண்ணெய் தீபம் ஏற்றி உழைக்கும் எளியோருக்கு அன்னதானம் வழங்குவதும் தடைகளை நீக்கி சுப யோகத்தை உண்டாக்கும்.\n- **நல்வாழ்த்து**: முறையான திட்டமிடல் மற்றும் விவேகமான முன்னெச்சரிக்கையுடன் கூடிய உங்கள் உழைப்பு உரிய நற்பலன்களைத் தரும்.`;
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Astrology AI Error:", err);
    return res.status(500).json({ 
      reply: "மன்னிக்கவும், கணிப்பதில் தொழில்நுட்பக் கோளாறு ஏற்பட்டுள்ளது." 
    });
  }
}