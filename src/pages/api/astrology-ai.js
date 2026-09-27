export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { question, profile, astroData } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key விடுபட்டுள்ளது' });
  }

 const todayDate = new Date().toLocaleDateString('ta-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const prompt = `
நீங்கள் ஒரு மிகச்சிறந்த தமிழ் ஜோதிடர். 
இன்றைய நடப்புத் தேதி: ${todayDate}. 
எதிர்காலக் கணிப்புகள், கோச்சாரப் பலன்களைக் கூறும்போது கட்டாயமாக இந்த நடப்புத் தேதியை அடிப்படையாகக் கொண்டு, இனிவரும் மாதங்கள் மற்றும் ஆண்டுகளை மட்டுமே கூற வேண்டும் (கடந்த கால ஆண்டுகளையோ மாதங்களையோ குறிப்பிடக் கூடாது).

பயனரின் குறிப்புகள்:
- பிறந்த விவரம்: ${profile?.dob || ''} ${profile?.birthTime || ''}
- லக்னம்: ${astroData?.lagna || 'மகரம்'}
- ராசி: ${astroData?.rasi || ''}
- நடப்பு தசை: ${astroData?.currentDasa || 'விம்சொத்தரி தசை'}
- விதி எண்: ${astroData?.destinyNumber || '6'}
கேள்வி: "${question}"

இதை ஆராய்ந்து மிகத் தெளிவான, பயனுள்ள பாரம்பரிய தமிழ் ஜோதிடப் பலனை 3 முதல் 4 வரிகளில் கனிவாகக் கூறவும்.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini Response Data:", JSON.stringify(data));

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "மன்னிக்கவும், தற்போது பலன்களைக் கணிக்க இயலவில்லை. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("API Route Error:", error);
    return res.status(500).json({ error: 'AI கணிப்பில் பிழை ஏற்பட்டுள்ளது' });
  }
}