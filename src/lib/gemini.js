// src/lib/gemini.js

// பயனரின் கேள்வியின் தன்மைக்கேற்ப சரியான Gemini மாடலைத் தேர்ந்தெடுக்கும் Smart Router
function selectBestModel(queryText, requestedMode = 'auto') {
  if (requestedMode === 'pro' || requestedMode === 'deep') {
    return { model: 'gemini-3.5-flash', maxTokens: 3500, temp: 0.6 };
  }
  if (requestedMode === 'fast') {
    return { model: 'gemini-3.5-flash-lite', maxTokens: 700, temp: 0.7 };
  }

  const text = (queryText || '').toLowerCase();

  // தமிழ், English மற்றும் Tanglish ஆகிய மூன்றிலும் ஆழமான பகுப்பாய்வு தேவைப்படும் வார்த்தைகள்
  const deepKeywords = [
    'dpr', 'project report', 'திட்ட அறிக்கை', 'கடன்', 'loan', 'kadan', 'msme', 'pmegp', 'mudra', 'emi',
    'பத்திரம்', 'pathiram', 'பட்டா', 'patta', 'சிட்டா', 'chitta', 'fmb', 'வில்லங்கம்', 'ec', 'encumbrance',
    'deed', 'சர்வே', 'survey', 'legal', 'audit', 'நிலம்', 'nilam', 'land', 'plot', 'bhoomi',
    'ஜோதிடம்', 'jothidam', 'ஜாதகம்', 'jathagam', 'ராசி', 'rasi', 'நட்சத்திரம்', 'nakshatra', 'astrology', 'horoscope',
    'resume', 'ats', 'ரெஸ்யூம்', 'விவசாயம்', 'vivasayam', 'மண்வளம்', 'பயிர்', 'agriculture', 'crop'
  ];

  const needsDeepAnalysis = deepKeywords.some(keyword => text.includes(keyword));

  if (needsDeepAnalysis) {
    return { model: 'gemini-3.5-flash', maxTokens: 3500, temp: 0.6 };
  }

  return { model: 'gemini-3.5-flash-lite', maxTokens: 2200, temp: 0.7 };
}

export async function askGemini(promptText, mode = 'auto', userQuery = '') {
  const apiKey = process.env.GEMINI_API_KEY;
  const textToAnalyze = userQuery || promptText;
  const { model, maxTokens, temp } = selectBestModel(textToAnalyze, mode);
  
  let currentModel = model;

  for (let attempt = 1; attempt <= 3; attempt++) {
    const url = `https://generativelanguage.googleapis.com/v1/models/${currentModel}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: temp
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "பதில் பெற முடியவில்லை.";
      }

      const isHighDemand = data.error?.message?.includes('high demand') || response.status === 503 || response.status === 429;
      if (isHighDemand && attempt < 3) {
        currentModel = 'gemini-3.5-flash-lite';
        await new Promise(r => setTimeout(r, 1500));
        continue;
      }

      throw new Error(data.error?.message || 'Gemini API Error');
    } catch (err) {
      if (attempt === 3) throw err;
    }
  }
}