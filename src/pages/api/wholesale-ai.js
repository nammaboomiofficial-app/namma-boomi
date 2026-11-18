import { askGemini } from '../../lib/gemini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed' });
  }

  const { product = '', district = 'அனைத்து மாவட்டங்கள்', quantity = '' } = req.body || {};
  const cleanProduct = product.trim();

  if (!cleanProduct) {
    return res.status(400).json({ reply: 'தயவுசெய்து தேட வேண்டிய பொருளின் பெயரை உள்ளிடவும்.' });
  }

  const prompt = `
நீங்கள் "நம்ம பூமி 360" தளத்தின் தமிழ்நாடு B2B மொத்த வர்த்தக ஆலோசகர்.
தேடும் பொருள்: "${cleanProduct}" | மாவட்டம்: "${district}" | அளவு: "${quantity || 'மொத்த ஆர்டர்'}"

கண்டிப்பான விதிமுறைகள்:
- எந்த Markdown குறியீடுகளையும் (**, ##, *, #) பயன்படுத்த வேண்டாம்.
- முகவுரை ("நம்ம பூமி 360 தளத்திற்கு வரவேற்கிறோம்" போன்றவை) எதுவும் எழுத வேண்டாம் — நேரடியாக 1-வது புள்ளியில் தொடங்கி 4 புள்ளிகளையும் முழுமையாக எழுதி முடிக்கவும்.
- ஒவ்வொரு புள்ளியும் மிகச் சுருக்கமாக 1 முதல் 2 வரிகளில் மட்டுமே இருக்க வேண்டும்:

1. முதன்மை மொத்த மண்டி & உற்பத்தி ஊர்கள்:
2. உத்தேச மொத்த விலை & குறைந்தபட்ச ஆர்டர் (MOQ):
3. GST விகிதம் & சரக்கு போக்குவரத்து (Lorry/Parcel):
4. லாபகரமாகக் கொள்முதல் செய்யும் வணிகக் குறிப்பு:
`;

  try {
    const replyText = await askGemini(prompt, 'fast', cleanProduct);
    return res.status(200).json({ reply: replyText });
  } catch (error) {
    console.error('Wholesale AI Error:', error.message);
    return res.status(500).json({
      reply: 'மன்னிக்கவும், மண்டி விவரங்களைப் பெறுவதில் சிறிய தாமதம் ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.'
    });
  }
}