export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!projectId) {
    return res.status(500).json({
      success: false,
      message: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID செட் செய்யப்படவில்லை.',
    });
  }

  try {
    const { name, whatsapp, district, taluk, occupation, notes, offerType } = req.body || {};

    if (!name || !whatsapp || !district || !taluk) {
      return res.status(400).json({
        success: false,
        message: 'பெயர், WhatsApp எண், மாவட்டம் மற்றும் தாலுகா அவசியம்.',
      });
    }

    const cleanPhone = String(whatsapp).replace(/\D/g, '');
    const submittedAt = new Date().toISOString();

    const firestoreDoc = {
      fields: {
        name: { stringValue: String(name).trim() },
        whatsapp: { stringValue: cleanPhone },
        district: { stringValue: String(district).trim() },
        taluk: { stringValue: String(taluk).trim() },
        occupation: { stringValue: String(occupation || '').trim() },
        notes: { stringValue: String(notes || '').trim() },
        offerType: {
          stringValue: offerType || 'Founding Taluk Partner (75% First Month Offer)',
        },
        status: { stringValue: 'pending' },
        submittedAt: { stringValue: submittedAt },
        timestamp: { stringValue: submittedAt },
      },
    };

    const keyParam = apiKey ? `?key=${encodeURIComponent(apiKey)}` : '';
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/partner_applications${keyParam}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(firestoreDoc),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firestore REST write error:', data);
      return res.status(response.status).json({
        success: false,
        message: data?.error?.message || 'Firestore டேட்டாபேஸில் சேமிப்பதில் பிழை ஏற்பட்டது.',
      });
    }

    const docId = data.name ? data.name.split('/').pop() : '';

    return res.status(200).json({
      success: true,
      id: docId,
      message: 'விண்ணப்பம் வெற்றிகரமாகப் பதிவானது!',
    });
  } catch (error) {
    console.error('submit-partner error:', error);
    return res.status(500).json({
      success: false,
      message: 'சர்வர் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.',
    });
  }
}