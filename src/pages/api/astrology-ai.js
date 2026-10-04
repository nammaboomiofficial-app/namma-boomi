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

  // ஹார்ட்கோட் செய்யாமல் மொத்த ஜாதகத் தகவலையும் எடுத்தல்
  const { question: _q, query: _qy, ...completeAstroData } = body;
  const astroDetailsString = JSON.stringify(completeAstroData, null, 2);

  // நடப்புத் தேதி மற்றும் ஆண்டை சிஸ்டத்திலிருந்து தானாக எடுத்தல்
 const today = new Date();
  const currentPeriod = today.toLocaleDateString('ta-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const prompt = `
நீங்கள் ஒரு பாரம்பரிய வேத ஜோதிடர். கீழே வழங்கப்பட்டுள்ள ஜாதகக் குறிப்புகளை அடிப்படையாகக் கொண்டு, பயனர் கேட்கும் கேள்விக்குரிய பலனை நல்வாழ்த்து வரை முழுமையாக, சுருக்கமான 4 பத்திகளில் விரைவாக வழங்கவும்.

முக்கியக் குறிப்பு:
- நடப்புத் தேதி: ${currentPeriod} (நடப்பது ${today.getFullYear()}-ஆம் ஆண்டு. எதிர்கால பலன்களை மட்டுமே கூறவும்).
- பதில் பாதியில் நிற்காமல், இறுதியாக பரிகாரம் மற்றும் நல்வாழ்த்துரை வரை முழுமையாக எழுதி முடிக்க வேண்டும்.

ஜாதக விவரங்கள்:
${astroDetailsString}

பயனர் கேள்வி:
"${question}"
`;

  try {
    const replyText = await askGemini(prompt);
    return res.status(200).json({ reply: replyText });
  } catch (error) {
    console.error("Gemini Error:", error.message);
    return res.status(500).json({ reply: "மன்னிக்கவும், பிழை: " + error.message });
  }
}