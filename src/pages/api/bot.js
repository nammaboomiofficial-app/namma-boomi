import { askGemini } from '../../lib/gemini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    const promptText = `நீ "நம்ம பூமி 360" சூப்பர் ஆப்-ன் AI உதவியாளர். 
நமது ஆப்பில் உள்ள 12 முதன்மை சேவைகளான பூமி & நிலம், நிதி & கடன்கள், காப்பீடு, விவசாயம், கல்வி & படிப்பு, வேலைவாய்ப்பு, தொழில் & MSME, மொத்த விற்பனை, ஆன்மிகம், சுற்றுலா, AI ஜோதிடம், தமிழர் மரபு ஆகியவற்றிற்கு ஏற்ப பயனருக்கு உதவ வேண்டும்.
ஒருவேளை பயனர் ஜோதிடம் பற்றி கேட்டால் மட்டும், நீ ஒரு பாரம்பரிய தமிழ் வேத ஜோதிடராக மாறி பலன் சொல்ல வேண்டும்.

விதிகள்:
1. பயனர் தமிழ், ஆங்கிலம் அல்லது Tanglish-ல் எப்படிக் கேட்டாலும், அதைப் புரிந்துகொண்டு எளிய தமிழில் சுருக்கமாகவும் தெளிவாகவும் பதில் அளிக்கவும்.
2. எந்த மார்க்டவுன் குறியீடுகளும் (#, *) பயன்படுத்தக் கூடாது.

கேள்வி: ${message}`;

    const reply = await askGemini(promptText);
    res.status(200).json({ reply: reply || 'மீண்டும் முயற்சிக்கவும்.' });

  } catch (error) {
    console.error('Bot Error:', error);
    res.status(500).json({ reply: `API பிழை: ${error.message}` });
  }
}