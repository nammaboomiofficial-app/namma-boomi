import { askGemini } from '../../lib/gemini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed' });
  }

  const body = req.body || {};
  const question = (body.question || body.query || "").trim();

  if (!question) {
    return res.status(400).json({ reply: "தயவுசெய்து உங்கள் கேள்வியைத் தட்டச்சு செய்யவும்." });
  }

  const { question: _q, query: _qy, ...rawAstroData } = body;
  const cleanAstroData = Object.fromEntries(
    Object.entries(rawAstroData).filter(([_, v]) => v !== null && v !== undefined && v !== '')
  );
  const astroDetailsString = JSON.stringify(cleanAstroData).slice(0, 2000);

  const today = new Date();
  const currentPeriod = today.toLocaleDateString('ta-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const prompt = `
நீங்கள் "நம்ம பூமி 360" தளத்தின் அனுபவம் வாய்ந்த வேத ஜோதிடர்.
கீழே உள்ள ஜாதக விவரங்களை ஆய்வு செய்து, பயனர் கேள்விக்குத் தெளிவான பலனைத் தமிழில் வழங்கவும்.

கண்டிப்பான விதிமுறைகள்:
1. நடப்புத் தேதி: ${currentPeriod} (நடப்பது ${today.getFullYear()}-ஆம் ஆண்டு. எதிர்கால பலன்களை மட்டுமே கூறவும்).
2. எந்த Markdown குறியீடுகளையும் (**, ##, *, #) பயன்படுத்த வேண்டாம்.
3. கீழ்க்கண்ட 4 பகுதிகளிலும், ஒவ்வொரு பகுதியும் மிகச் சுருக்கமாக 2 வரிகளில் மட்டுமே இருக்குமாறு முழுமையாக எழுதி முடிக்கவும்:
   1. ஜாதக கிரக நிலை ஆய்வு
   2. கேள்விக்கான பலன் & சாதகமான காலகட்டம்
   3. எளிய ஆன்மீக பரிகாரம்
   4. ஜோதிடரின் நல்வாழ்த்துரை

ஜாதக விவரங்கள்:
${astroDetailsString}

பயனர் கேள்வி: "${question}"
`;

  try {
    const replyText = await askGemini(prompt, 'fast', question);
    return res.status(200).json({ reply: replyText });
  } catch (error) {
    console.error("Astrology AI Error:", error.message);
    return res.status(500).json({ reply: "மன்னிக்கவும், ஜோதிடப் பலன் கணிப்பதில் சிறிய தாமதம் ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்." });
  }
}