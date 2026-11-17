import { askGemini } from '../../lib/gemini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formData, report } = req.body;

    if (!formData || !report) {
      return res.status(400).json({ error: 'திட்ட விவரங்கள் முழுமையாக இல்லை.' });
    }

    const prompt = `நீ "நம்ம பூமி 360" தளத்தின் மூத்த வங்கித் திட்ட அறிக்கை (MSME & Bank DPR) ஆலோசகர்.
கீழ்க்கண்ட தொழில் திட்டத்திற்கு வங்கி மேலாளர் (Bank Manager) கடன் ஒப்புதல் அளிக்கும் வகையில், மிக நேர்த்தியான, தொழில்முறைத் தமிழில் (எந்த மார்க்டவுன் குறியீடுகளும் #, *, ** இல்லாமல்) ஒரு சுருக்கமான திட்ட அறிக்கை (Executive DPR Note) தயாரித்துக் கொடு:

விண்ணப்பதாரர்: ${formData.applicantName}
மாவட்டம்: ${formData.district}
திட்ட வகை: ${formData.projectType}
கடன் திட்டம்: ${formData.scheme}
மொத்த திட்ட மதிப்பு: ₹${Number(report.totalProjectCost).toLocaleString('en-IN')}
விண்ணப்பதாரர் பங்கு: ₹${Number(report.promoterContribution).toLocaleString('en-IN')}
கோரப்படும் வங்கிக் கடன்: ₹${Number(report.bankLoan).toLocaleString('en-IN')}
உத்தேச ஆண்டு விற்பனை: ₹${Number(report.annualTurnover).toLocaleString('en-IN')}
உத்தேச நிகர லாபம்: ₹${Number(report.netProfit).toLocaleString('en-IN')}
DSCR விகிதம்: ${report.dscr}

கீழ்க்கண்ட 4 தலைப்புகளில் தெளிவாக எழுது:
1. திட்ட அறிமுகம் & நோக்கம்
2. சந்தை வாய்ப்பு & வருவாய் சாத்தியக்கூறு
3. தொழில்நுட்பம் & செயல்பாட்டுத் திட்டம்
4. வங்கிக் கடன் திருப்பிச் செலுத்தும் தகுதி (DSCR பகுப்பாய்வு)`;

    const aiSummary = await askGemini(prompt, 'pro', 'dpr project report');

    return res.status(200).json({ aiSummary });
  } catch (error) {
    console.error('DPR AI Error:', error);
    return res.status(500).json({
      error: error.message || 'திட்ட அறிக்கை உருவாக்குவதில் பிழை ஏற்பட்டது.'
    });
  }
}