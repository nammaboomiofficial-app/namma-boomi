import { askGemini } from '../../lib/gemini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formData, selectedForm, applicationMode, customNote } = req.body;

    let prompt = '';
    let contextTag = 'tamil legal petition';

    if (applicationMode === 'education') {
      contextTag = 'tamil education mentor';
      prompt = `நீ தமிழ்நாடு மாணவர்கள் மற்றும் இளைஞர்களுக்கு வழிகாட்டும் சிறந்த தொழில்நுட்ப ஆசிரியர் (Tech & Career Mentor).
"மனுதாரர்", "சட்டப்பூர்வமாகக் கேட்டுக்கொள்ளப்படுகிறது" போன்ற அரசு மனு வார்த்தைகளைத் தவிர்த்து, நேரடியாக மாணவருக்குப் புரியும் எளிய, உற்சாகமான தமிழில் வழிகாட்டு.

படிப்பு: ${formData.subject}
பெயர்: ${formData.applicantName}
வழிகாட்டல் தேவை: ${customNote}

மார்க்டவுன் குறியீடுகள் (#, *, **) இல்லாமல், தெளிவான தலைப்புகள் மற்றும் வரிசை எண்களுடன் (1, 2, 3, 4) நேரடியாகப் பதில் மட்டும் கொடு.`;
    } else if (applicationMode === 'career') {
      contextTag = 'tamil career coach';
      prompt = `நீ தமிழ்நாடு இளைஞர்களுக்கு வேலைவாய்ப்பு மற்றும் நேர்காணல் பயிற்சி அளிக்கும் HR நிபுணர் (Career & Interview Coach).
"மனுதாரர்" போன்ற சட்ட வார்த்தைகளைத் தவிர்த்து, வேலை தேடும் நபருக்கு நேரடியாகப் பயன்படும் நடைமுறை டிப்ஸ்களை எளிய தமிழில் கொடு.

பணி & தகுதி: ${formData.subject}
வழிகாட்டல் தேவை: ${customNote}

மார்க்டவுன் குறியீடுகள் (#, *, **) இல்லாமல், தெளிவான வரிசை எண்களுடன் (1, 2, 3) நேரடியாகப் பதில் மட்டும் கொடு.`;
    } else if (
      applicationMode === 'rural_special' ||
      applicationMode === 'rural_general' ||
      applicationMode === 'urban' ||
      applicationMode === 'business'
    ) {
      contextTag = 'tamil msme business consultant';
      prompt = `நீ தமிழ்நாடு MSME தொழில்முனைவோருக்கு வழிகாட்டும் மூத்த வணிக மற்றும் வங்கி மானிய ஆலோசகர் (MSME Business Consultant).
"மனுதாரர்" போன்ற வார்த்தைகளைத் தவிர்த்து, தொழில் தொடங்குவோருக்கு நேரடியாகப் பயன்படும் வணிக உத்தி மற்றும் மானிய வழிகாட்டலை எளிய தமிழில் கொடு.

தொழில் & முதலீடு: ${formData.subject}
இடம்: ${formData.district}
வழிகாட்டல் தேவை: ${customNote}

மார்க்டவுன் குறியீடுகள் (#, *, **) இல்லாமல், 3 தெளிவான பத்திகளாக அல்லது வரிசை எண்களுடன் நேரடியாகப் பதில் மட்டும் கொடு.`;
    } else {
      prompt = `நீ தமிழ்நாடு அரசு வருவாய்த் துறை, மின்சார வாரியம் மற்றும் வங்கி நடைமுறைகளை நன்கு அறிந்த மூத்த சட்ட ஆலோசகர்.
கீழ்க்கண்ட மனுதாரரின் விவரம் மற்றும் சூழ்நிலைக்கு ஏற்ப, அதிகாரி உடனடியாக நடவடிக்கை எடுக்கும் வகையில் 1 அல்லது 2 பத்திகளில் மிக நேர்த்தியான, அதிகாரப்பூர்வ தமிழ் சட்ட வாசகங்களை (எந்த மார்க்டவுன் குறியீடுகளும் #, *, ** இல்லாமல்) எழுதிக் கொடு:

மனு வகை: ${selectedForm} (${applicationMode})
மனுதாரர்: ${formData.applicantName} (${formData.taluk}, ${formData.district})
பொருள்: ${formData.subject}
கூடுதல் சூழ்நிலை: ${customNote || 'நீண்ட நாட்களாக நிலுவையில் உள்ளதால் விரைந்து நடவடிக்கை எடுக்கக் கோருதல்'}

நேரடியாக மனுவில் சேர்க்கும் கூடுதல் சட்டக் கோரிக்கைப் பத்தியை மட்டும் எழுது.`;
    }

    const polishedText = await askGemini(prompt, 'flash', contextTag);
    return res.status(200).json({ polishedText });
  } catch (error) {
    console.error('Petition AI Error:', error);
    return res.status(500).json({ error: error.message || 'AI வாசகம் உருவாக்குவதில் பிழை.' });
  }
}