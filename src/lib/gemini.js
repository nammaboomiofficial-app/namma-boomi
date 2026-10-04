// src/lib/gemini.js
export async function askGemini(promptText) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            maxOutputTokens: 2500, // 1200 டோக்கன் போதும் (வேகமாகவும் வரும், பாதியில் நிற்காது)
            temperature: 0.7
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "பதில் பெற முடியவில்லை.";
      }

      const isHighDemand = data.error?.message?.includes('high demand') || response.status === 503;
      if (isHighDemand && attempt < 3) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }

      throw new Error(data.error?.message || 'Gemini API Error');
    } catch (err) {
      if (attempt === 3) throw err;
    }
  }
}