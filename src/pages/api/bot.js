export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY.trim();
    
    const promptText = `
நீ "நம்ம பூமி 360" சூப்பர் ஆப்-ன் AI உதவியாளர். 
நமது ஆப்பில் உள்ள 12 முதன்மை சேவைகளான பூமி & நிலம், நிதி & கடன்கள், காப்பீடு, விவசாயம், கல்வி & படிப்பு, வேலைவாய்ப்பு, தொழில் & MSME, மொத்த விற்பனை, ஆன்மீகம், சுற்றுலா, AI ஜோதிடம், தமிழர் மரபு ஆகிய தலைப்புகளில் பயனர்கள் கேள்வி கேட்பார்கள். இந்தத் துறைகளில் துல்லியமான தகவல்களை வழங்கவும்.
விதிகள்:
1. சுருக்கமான, நேரடியான பதிலை தமிழில் மட்டும் கொடு.
2. எந்த மார்க்டவுன் குறியீடுகளும் (#, *) பயன்படுத்தக் கூடாது.
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