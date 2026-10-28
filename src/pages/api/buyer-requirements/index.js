import { query } from '../../../lib/db';

export default async function handler(req, res) {
  // 1. வாங்குபவர்களின் தேவைகளைப் பட்டியலிடுதல் (GET)
  if (req.method === 'GET') {
    try {
      const result = await query(
        `SELECT * FROM buyer_requirements WHERE status = 'active' ORDER BY created_at DESC`
      );
      return res.status(200).json({ success: true, requirements: result.rows });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // 2. புதிய தேவை சமர்ப்பித்தல் (POST)
  if (req.method === 'POST') {
    try {
      const {
        buyer_name,
        buyer_phone,
        preferred_district,
        preferred_location,
        land_category,
        area_required,
        budget_range,
        specific_demands,
        additional_notes
      } = req.body;

      const insertQuery = `
        INSERT INTO buyer_requirements (
          buyer_name, buyer_phone, preferred_district, preferred_location,
          land_category, area_required, budget_range, specific_demands,
          additional_notes, status
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, 'active'
        ) RETURNING *;
      `;

      const formattedDemands = Array.isArray(specific_demands)
          ? specific_demands
          : (specific_demands ? [specific_demands] : []);

        const values = [
          buyer_name,
          buyer_phone,
          preferred_district,
          preferred_location || '',
          land_category,
          area_required,
          budget_range,
          formattedDemands,
          additional_notes || ''
        ];

      const result = await query(insertQuery, values);
      return res.status(201).json({
        success: true,
        message: 'உங்கள் தேவை வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!',
        requirement: result.rows[0]
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}