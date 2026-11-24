import { query } from '../../../lib/db';

export default async function handler(req, res) {
  // 1. அங்கீகரிக்கப்பட்ட நிலங்களை முகப்புப் பக்கத்திற்கு எடுத்தல் (GET)
  if (req.method === 'GET') {
    try {
      const result = await query(
        "SELECT * FROM lands ORDER BY created_at DESC"
      );
      return res.status(200).json({ success: true, lands: result.rows });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // 2. புதிய நிலத்தைப் பதிவு செய்தல் - இயல்பாக 'pending' நிலையில் சேமிக்கப்படும் (POST)
  if (req.method === 'POST') {
    try {
      const {
        seller_name,
        seller_phone,
        seller_type,
        title,
        category,
        listing_type,
        district,
        taluk,
        village,
        survey_number,
        latitude,
        longitude,
        land_area,
        total_price,
        features,
        images,
        patta_document_url
      } = req.body;

      const insertQuery = `
        INSERT INTO lands (
          seller_name, seller_phone, seller_type, title, category,
          listing_type, district, taluk, village, survey_number,
          latitude, longitude, land_area, total_price, features,
          images, patta_document_url, status, is_verified, verification_score
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15,
          $16, $17, 'pending', FALSE, 90
        ) RETURNING *;
      `;

      const values = [
        seller_name,
        seller_phone,
        seller_type || 'நேரடி உரிமையாளர்',
        title,
        category,
        listing_type || 'விற்பனை',
        district,
        taluk || '',
        village,
        survey_number || '',
        latitude || null,
        longitude || null,
        land_area,
        total_price,
        features || [],
        images || [],
        patta_document_url || ''
      ];

      const result = await query(insertQuery, values);
      return res.status(201).json({
        success: true,
        message: 'நில விவரங்கள் வெற்றிகரமாகப் பதிவு செய்யப்பட்டன! நிர்வாகியின் சரிபார்ப்பிற்குப் பின் தளத்தில் தோன்றும்.',
        land: result.rows[0]
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // பிற முறைகள் அனுமதிக்கப்படாது
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}