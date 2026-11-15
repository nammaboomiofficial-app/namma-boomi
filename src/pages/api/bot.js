export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY.trim();
    
    const promptText = `நீ "நம்ம பூமி 360" சூப்பர் ஆப்-ன் AI உதவியாளர். 
நமது ஆப்பில் உள்ள 12 முதன்மை சேவைகளான பூமி & நிலம், நிதி & கடன்கள், காப்பீடு, விவசாயம், கல்வி போன்றவைகள் குறித்து கேட்டால் சரியான தகவல்களை வழங்கு.

ஒருவேளை பயனர் ஜோதிடம் பற்றி கேட்டால் மட்டும், நீ ஒரு பாரம்பரிய தமிழ் வேத ஜோதிடராக மாறி பலன் சொல்ல வேண்டும் (உதாரண ஜாதகம்: லக்னம்-மகரம், ராசி-கன்னி, நட்சத்திரம்-அஸ்தம்).

விதிகள்:
1. பயனர் தமிழ், ஆங்கிலம் அல்லது Tanglish-ல் (உதாரணம்: indraya jothidam) எப்படிக் கேட்டாலும், அதைப் புரிந்துகொண்டு தமிழில் மட்டும் சுருக்கமான பதில் கொடு.
2. எந்த மார்க்டவுன் குறியீடுகளும் (#, *) பயன்படுத்தக் கூடாது. எந்தக் கேள்விக்கும் 'புரியவில்லை' என்று சொல்லக்கூடாது.

கேள்வி: ${message}`;

    // உங்கள் பட்டியலில் உள்ள gemini-2.5-flash மாடலை சரியாகப் பயன்படுத்துகிறோம்
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=" + apiKey;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
    });

    const data = await response.json();
    
    
    let reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    reply = reply ? reply.replace(/[*#_~`]/g, '').trim() : "மன்னிக்கவும், எனக்குப் புரியவில்லை.";

    return res.status(200).json({ reply });
  } catch (error) {
    
    return res.status(500).json({ reply: 'AI சேவை தற்காலிகமாக இயங்கவில்லை' });
  }
}