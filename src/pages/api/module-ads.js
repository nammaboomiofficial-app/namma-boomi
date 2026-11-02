import pool from '@/lib/db';

// தடைசெய்யப்பட்ட ஸ்பேம் மற்றும் மோசடி வார்த்தைகள் பட்டியல்
const SPAM_KEYWORDS = [
  'சூதாட்டம்', 'ரம்மி', 'rummy', 'casino', 'betting', 'teen patti', 
  'sex', 'call girl', 'dating', 'escort', 'மாத்திரை', 'போதை', 
  'hack', 'வட்டி இன்றி 1 நிமிடம்', 'instant double money', 'crypto profit'
];

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const { module_key, district, pincode, include_pending } = req.query;

      // அடிப்படை விதியில் 'active' விளம்பரங்கள் மட்டுமே பொதுமக்களுக்குத் தெரியும்
      let queryText = "SELECT * FROM public.module_advertisements WHERE (status = 'active' OR status IS NULL)";
      const queryParams = [];
      let paramIndex = 1;

      // அட்மின் பேனல் தேவைப்பட்டால் மட்டும் pending விளம்பரங்களை எடுக்கலாம்
      if (include_pending === 'true') {
        queryText = 'SELECT * FROM public.module_advertisements WHERE 1=1';
      }

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

      // பிரீமியம் (featured) விளம்பரங்கள் முதலில் வரவும், பின் புதிய விளம்பரங்கள் வரவும் வரிசைப்படுத்தப்படுகிறது
      queryText += " ORDER BY CASE WHEN ad_tier = 'featured' THEN 0 ELSE 1 END, id DESC";

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

      const cleanPhone = phone_number.trim();

      // 1. தினசரி விளம்பர வரம்பு சோதனை (Daily Limit Check: ஒரு நாளைக்கு 2 விளம்பரங்கள்)
      const limitCheckQuery = `
        SELECT COUNT(*) as count 
        FROM public.module_advertisements 
        WHERE phone_number = $1 
          AND created_at >= CURRENT_DATE
      `;
      
      try {
        const countRes = await pool.query(limitCheckQuery, [cleanPhone]);
        const dailyCount = parseInt(countRes.rows[0]?.count || 0, 10);

        if (dailyCount >= 2) {
          return res.status(429).json({
            success: false,
            error: 'இன்றைய தினத்திற்கான இலவச விளம்பர வரம்பு (2 விளம்பரங்கள்) முடிந்துவிட்டது. நாளை மீண்டும் முயற்சிக்கவும் அல்லது பிரீமியம் ஆதரவைத் தொடர்பு கொள்ளவும்.'
          });
        }
      } catch (limitErr) {
        // ஒருவேளை டேட்டாபேஸில் created_at நிரல் இல்லை எனில் பிழை வராமல் தவிர்க்கப்படுகிறது
        console.warn('Daily limit check bypassed (created_at column might be missing):', limitErr.message);
      }

      // 2. ஸ்பேம் மற்றும் மோசடி வார்த்தைகள் ஆய்வு (Spam Keyword Detection)
      const combinedContent = `${business_name} ${ad_title} ${ad_description || ''}`.toLowerCase();
      const containsSpam = SPAM_KEYWORDS.some(kw => combinedContent.includes(kw.toLowerCase()));

      // ஸ்பேம் வார்த்தை இருந்தால் 'pending', இல்லையெனில் உடனே 'active'
      const adStatus = containsSpam ? 'pending' : 'active';

      // 3. தரவுத்தளத்தில் விளம்பரத்தைச் சேமித்தல்
      const insertText = `
        INSERT INTO public.module_advertisements (
          module_key, district, taluk, pincode, business_name, contact_person,
          phone_number, whatsapp_number, ad_title, ad_description,
          location_address, image_url, ad_tier, extra_details, status
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        ) RETURNING *;
      `;

      const values = [
        module_key || 'agriculture',
        district || 'செங்கல்பட்டு',
        taluk || null,
        pincode || null,
        business_name,
        contact_person || null,
        cleanPhone,
        whatsapp_number ? whatsapp_number.trim() : null,
        ad_title,
        ad_description || null,
        location_address || null,
        image_url || null,
        ad_tier || 'basic',
        extra_details ? JSON.stringify(extra_details) : null,
        adStatus
      ];

      const result = await pool.query(insertText, values);

      // ஸ்பேம் வார்த்தை இருந்திருந்தால் பயனருக்குத் தகவல் தெரிவித்தல்
      if (adStatus === 'pending') {
        return res.status(201).json({
          success: true,
          data: result.rows[0],
          warning: 'உங்கள் விளம்பரம் ஆய்வுக்குப் பின் (Admin Review) நேரலையாகும்.'
        });
      }

      return res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('API Error saving ad:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}