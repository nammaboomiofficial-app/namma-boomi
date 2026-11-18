import { askGemini } from '../../lib/gemini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formData, selectedForm, applicationMode, customNote } = req.body;

    const prompt = `நீ தமிழ்நாடு அரசு வருவாய்த் துறை, மின்சார வாரியம் மற்றும் வங்கி நடைமுறைகளை நன்கு அறிந்த மூத்த சட்ட ஆலோசகர்.
கீழ்க்கண்ட மனுதாரரின் விவரம் மற்றும் சூழ்நிலைக்கு ஏற்ப, அதிகாரி உடனடியாக நடவடிக்கை எடுக்கும் வகையில் 1 அல்லது 2 பத்திகளில் மிக நேர்த்தியான, அதிகாரப்பூர்வ தமிழ் சட்ட வாசகங்களை (எந்த மார்க்டவுன் குறியீடுகளும் #, *, ** இல்லாமல்) எழுதிக் கொடு:

மனு வகை: ${selectedForm} (${applicationMode})
மனுதாரர்: ${formData.applicantName} (${formData.taluk}, ${formData.district})
பொருள்: ${formData.subject}
கூடுதல் சூழ்நிலை: ${customNote || 'நீண்ட நாட்களாக நிலுவையில் உள்ளதால் விரைந்து நடவடிக்கை எடுக்கக் கோருதல்'}

நேரடியாக மனுவில் சேர்க்கும் கூடுதல் சட்டக் கோரிக்கைப் பத்தியை மட்டும் எழுது.`;

    const polishedText = await askGemini(prompt, 'flash', 'tamil legal petition');
    return res.status(200).json({ polishedText });
  } catch (error) {
    console.error('Petition AI Error:', error);
    return res.status(500).json({ error: error.message || 'AI வாசகம் உருவாக்குவதில் பிழை.' });
  }
}