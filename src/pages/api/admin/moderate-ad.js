import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { ad_id, action } = req.body;

  if (!ad_id || !action) {
    return res.status(400).json({ success: false, error: 'விளம்பர எண் மற்றும் செயல்பாடு தேவை' });
  }

  try {
    let updateQuery = '';
    let params = [ad_id];

    switch (action) {
      // 1. கட்டணத்தை உறுதி செய்து Featured நிலைக்கு மாற்றுதல்
      case 'approve_payment':
        updateQuery = `
          UPDATE public.module_advertisements 
          SET status = 'active',
              payment_status = 'paid', 
              ad_tier = 'featured'
          WHERE id = $1 
          RETURNING *;
        `;
        break;

      // 2. தவறான UTR எனில் Basic ஆக மாற்றுதல்
      case 'reject_payment':
        updateQuery = `
          UPDATE public.module_advertisements 
          SET payment_status = 'failed', 
              ad_tier = 'basic'
          WHERE id = $1 
          RETURNING *;
        `;
        break;

      // 3. வழக்கமான விளம்பர அனுமதி
      case 'approve':
        updateQuery = `
          UPDATE public.module_advertisements 
          SET status = 'active'
          WHERE id = $1 
          RETURNING *;
        `;
        break;

      // 4. விளம்பரத்தை நிராகரித்தல்
      case 'reject':
        updateQuery = `
          UPDATE public.module_advertisements 
          SET status = 'rejected'
          WHERE id = $1 
          RETURNING *;
        `;
        break;

      default:
        return res.status(400).json({ success: false, error: 'தவறான செயல்பாடு' });
    }

    const result = await pool.query(updateQuery, params);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, error: 'விளம்பரம் காணப்படவில்லை' });
    }

    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Moderation API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}