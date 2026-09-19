export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { query, astroProfile } = req.body;
   const apiKey = process.env.GEMINI_API_KEY;

    const promptText = `
நீ ஒரு பாரம்பரிய தமிழ் வேத ஜோதிடர். நடப்பு ஆண்டு 2026.

ஜாதகர்:
- லக்னம்: ${astroProfile?.lagna || 'மகரம்'}
- ராசி: ${astroProfile?.rasi || 'கன்னி'}
- நட்சத்திரம்: ${astroProfile?.nakshatra || 'அஸ்தம்'}
- தசை: ${astroProfile?.activeDasa || 'சனி மகா தசை'}

கேள்வி: ${query}

விதிகள்:
1. பழைய கடந்த கால வருடங்களை (2024, 2025) எக்காரணம் கொண்டும் குறிப்பிடக் கூடாது. நடப்பு ஆண்டு 2026 அல்லது 2027-ல் சாதகமான காலத்தைக் குறிப்பிடவும்.
2. எந்த மார்க்டவுன் குறியீடுகளும் (#, *) இல்லாமல் சாதாரண உரைநடையில் எழுதவும்.
3. கீழே உள்ள மூன்று பிரிவுகளுடன் கூடிய பதிலை உடனடியாகத் தரவும்:
1. ஜோதிடக் காரணம் (2, 10, 11-ஆம் பாவ பலன்கள்)
2. உத்தேச காலக்கட்டம் (குறிப்பிட்ட மாதம் மற்றும் வருடம்)
3. எளிய பரிகாரம்
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: promptText }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 2500,
          temperature: 0.4,
          thinkingConfig: {
            thinkingBudget: 100
          }
        }
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return res.status(200).json({ reply: `பிழை: ${data.error.message}` });
    }

    let text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(200).json({ reply: "தகவல் கிடைக்கவில்லை. மீண்டும் ஒருமுறை கேட்கவும்." });
    }

    text = text.replace(/[*#_~`]/g, '').trim();
    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Server Crash Error:", error);
    return res.status(500).json({ error: 'AI சேவை தற்காலிகமாக இயங்கவில்லை' });
  }
}