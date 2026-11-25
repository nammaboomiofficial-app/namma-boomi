export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { password } = req.body || {};
  const adminPassword = process.env.ADMIN_DASHBOARD_PASSWORD || '3600';

  if (password !== adminPassword) {
    return res.status(401).json({ success: false, message: 'தவறான கடவுச்சொல் (Wrong Password)' });
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    return res.status(500).json({
      success: false,
      message: 'Vercel-ல் NEXT_PUBLIC_FIREBASE_PROJECT_ID செட் செய்யப்படவில்லை.',
    });
  }

  const parseFirestoreDocs = (documents = []) => {
    return documents
      .map((doc) => {
        const fields = doc.fields || {};
        const parsed = { id: doc.name.split('/').pop() };
        Object.entries(fields).forEach(([key, valObj]) => {
          parsed[key] = valObj.stringValue || valObj.integerValue || valObj.booleanValue || '';
        });
        return parsed;
      })
      .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
  };

  try {
    const [vipRes, installRes] = await Promise.all([
      fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/vip_users?pageSize=200`),
      fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/app_install_logs?pageSize=500`),
    ]);

    const vipData = vipRes.ok ? await vipRes.json() : { documents: [] };
    const installData = installRes.ok ? await installRes.json() : { documents: [] };

    return res.status(200).json({
      success: true,
      vipUsers: parseFirestoreDocs(vipData.documents),
      installLogs: parseFirestoreDocs(installData.documents),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'டேட்டாபேஸ் இணைப்பில் பிழை.' });
  }
}