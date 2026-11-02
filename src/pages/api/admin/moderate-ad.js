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
    let params = [];

    if (action === 'approve') {
      updateQuery = "UPDATE public.module_advertisements SET status = 'active' WHERE id = $1 RETURNING *;";
      params = [ad_id];
    } else if (action === 'reject') {
      updateQuery = "UPDATE public.module_advertisements SET status = 'rejected' WHERE id = $1 RETURNING *;";
      params = [ad_id];
    } else {
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