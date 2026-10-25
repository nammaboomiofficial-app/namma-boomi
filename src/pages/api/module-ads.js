import pool from '@/lib/db';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const { module_key, district, pincode } = req.query;

      let queryText = 'SELECT * FROM public.module_advertisements WHERE 1=1';
      const queryParams = [];
      let paramIndex = 1;

      if (district && district !== 'அனைத்தும்') {
        queryText += ` AND district = $${paramIndex}`;
        queryParams.push(district);
        paramIndex++;
      }

      if (module_key && module_key !== 'all') {
        queryText += ` AND module_key = $${paramIndex}`;
        queryParams.push(module_key);
        paramIndex++;
      }

      if (pincode) {
        queryText += ` AND pincode = $${paramIndex}`;
        queryParams.push(pincode);
        paramIndex++;
      }

      queryText += ' ORDER BY id DESC';

      const result = await pool.query(queryText, queryParams);

      return res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
      console.error('API Error fetching ads:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (method === 'POST') {
    try {
      const {
        module_key,
        district,
        taluk,
        pincode,
        business_name,
        contact_person,
        phone_number,
        whatsapp_number,
        ad_title,
        ad_description,
        location_address,
        image_url,
        ad_tier,
        extra_details
      } = req.body;

      if (!business_name || !ad_title || !phone_number) {
        return res.status(400).json({ success: false, error: 'கட்டாய விவரங்களைப் பூர்த்தி செய்யவும்' });
      }

      // extra_details-ஐ 14-வது வேல்யூவாக டேட்டாபேஸில் சேர்க்கிறோம்
      const insertText = `
        INSERT INTO public.module_advertisements (
          module_key, district, taluk, pincode, business_name, contact_person,
          phone_number, whatsapp_number, ad_title, ad_description,
          location_address, image_url, ad_tier, extra_details
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        ) RETURNING *;
      `;

      const values = [
        module_key || 'agriculture',
        district || 'செங்கல்பட்டு',
        taluk || null,
        pincode || null,
        business_name,
        contact_person || null,
        phone_number,
        whatsapp_number || null,
        ad_title,
        ad_description || null,
        location_address || null,
        image_url || null,
        ad_tier || 'basic',
        extra_details ? JSON.stringify(extra_details) : null
      ];

      const result = await pool.query(insertText, values);

      return res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('API Error saving ad:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}