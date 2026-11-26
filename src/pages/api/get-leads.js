export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { password } = req.body || {};
  const adminPassword = process.env.ADMIN_DASHBOARD_PASSWORD || '3600';

  if (password !== adminPassword) {
    return res.status(401).json({ success: false, message: 'தவறான கடவுச்சொல் (Wrong Password)' });
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!projectId) {
    return res.status(500).json({
      success: false,
      message: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID செட் செய்யப்படவில்லை.',
    });
  }

  const keyQuery = apiKey ? `&key=${encodeURIComponent(apiKey)}` : '';

  const parseFirestoreDocs = (documents = []) => {
    return documents
      .map((doc) => {
        const fields = doc.fields || {};
        const parsed = { id: doc.name.split('/').pop() };
        Object.entries(fields).forEach(([key, valObj]) => {
          parsed[key] =
            valObj.stringValue ??
            valObj.integerValue ??
            valObj.booleanValue ??
            valObj.timestampValue ??
            '';
        });
        return parsed;
      })
      .sort((a, b) => {
        const timeA = new Date(a.submittedAt || a.timestamp || 0).getTime() || 0;
        const timeB = new Date(b.submittedAt || b.timestamp || 0).getTime() || 0;
        return timeB - timeA;
      });
  };

  try {
    const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

    const [vipRes, installRes, partnerRes] = await Promise.all([
      fetch(`${baseUrl}/vip_users?pageSize=200${keyQuery}`),
      fetch(`${baseUrl}/app_install_logs?pageSize=500${keyQuery}`),
      fetch(`${baseUrl}/partner_applications?pageSize=200${keyQuery}`),
    ]);

    const warnings = [];

    const vipData = vipRes.ok ? await vipRes.json() : { documents: [] };
    if (!vipRes.ok) warnings.push(`vip_users (${vipRes.status})`);

    const installData = installRes.ok ? await installRes.json() : { documents: [] };
    if (!installRes.ok) warnings.push(`app_install_logs (${installRes.status})`);

    const partnerData = partnerRes.ok ? await partnerRes.json() : { documents: [] };
    if (!partnerRes.ok) warnings.push(`partner_applications (${partnerRes.status})`);

    return res.status(200).json({
      success: true,
      vipUsers: parseFirestoreDocs(vipData.documents),
      installLogs: parseFirestoreDocs(installData.documents),
      partnerApplications: parseFirestoreDocs(partnerData.documents),
      warning:
        warnings.length > 0
          ? `Firestore அனுமதி/இணைப்பைச் சரிபார்க்கவும்: ${warnings.join(', ')}`
          : '',
    });
  } catch (error) {
    console.error('get-leads error:', error);
    return res.status(500).json({ success: false, message: 'டேட்டாபேஸ் இணைப்பில் பிழை.' });
  }
}