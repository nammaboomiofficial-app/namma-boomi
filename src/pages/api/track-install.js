export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const payload = req.body || {};
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  // உங்கள் Firebase Firestore REST API வழியாக நேரடியாகச் சேமித்தல் (Zero Extra Package)
  if (projectId) {
    try {
      const collectionName = payload.event === 'vip_user_registered' ? 'vip_users' : 'app_install_logs';
      const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}`;

      const fields = {};
      Object.entries(payload).forEach(([key, val]) => {
        fields[key] = { stringValue: String(val) };
      });

      await fetch(firestoreUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields })
      });
    } catch (e) {
      // பிழை வந்தாலும் பயனர் அனுபவம் பாதிக்கப்படாது
    }
  }

  return res.status(200).json({ success: true });
}