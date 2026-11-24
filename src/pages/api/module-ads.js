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
      const { module_key, district, taluk, pincode, include_pending, user_lat, user_lng, radius = 30, taluk_en } = req.query;

      const queryParams = [];
      let paramIndex = 1;
      let distanceSelect = '';
      let distanceWhere = '';

      // 1. பயனர் லொகேஷன் இருந்தால் தூரத்தைக் கணக்கிட்டு distance_km ஆக எடுத்தல்
      if (user_lat && user_lng) {
        distanceSelect = `, (6371 * acos(
          least(1.0, greatest(-1.0, 
            cos(radians($${paramIndex})) * cos(radians(latitude)) * 
            cos(radians(longitude) - radians($${paramIndex + 1})) + 
            sin(radians($${paramIndex})) * sin(radians(latitude))
          ))
        )) AS distance_km`;

        distanceWhere = ` AND (
          latitude IS NOT NULL AND longitude IS NOT NULL AND
          (6371 * acos(
            least(1.0, greatest(-1.0, 
              cos(radians($${paramIndex})) * cos(radians(latitude)) * 
              cos(radians(longitude) - radians($${paramIndex + 1})) + 
              sin(radians($${paramIndex})) * sin(radians(latitude))
            ))
          )) <= $${paramIndex + 2}
        )`;

        queryParams.push(parseFloat(user_lat), parseFloat(user_lng), parseFloat(radius));
        paramIndex += 3;
      }

      // அடிப்படை விதியில் 'active' விளம்பரங்கள் மட்டுமே பொதுமக்களுக்குத் தெரியும்
      let queryText = `SELECT * ${distanceSelect} FROM public.module_advertisements WHERE (status = 'active' OR status IS NULL)`;

      // அட்மின் பேனல் தேவைப்பட்டால் மட்டும் pending விளம்பரங்களை எடுக்கலாம்
      if (include_pending === 'true') {
        queryText = `SELECT * ${distanceSelect} FROM public.module_advertisements WHERE 1=1`;
      }

      // லொகேஷன் சுற்றளவு வடிகட்டல்
      if (distanceWhere) {
        queryText += distanceWhere;
      }

      if (district && district !== 'அனைத்தும்') {
        queryText += ` AND district = $${paramIndex}`;
        queryParams.push(district);
        paramIndex++;
      }

      if (taluk && taluk !== 'அனைத்தும்' && taluk !== 'all') {
        if (taluk_en && taluk_en !== taluk) {
          queryText += ` AND (taluk ILIKE $${paramIndex} OR taluk ILIKE $${paramIndex + 1})`;
          queryParams.push(`%${taluk}%`, `%${taluk_en}%`);
          paramIndex += 2;
        } else {
          queryText += ` AND taluk ILIKE $${paramIndex}`;
          queryParams.push(`%${taluk}%`);
          paramIndex++;
        }
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

      // பிரீமியம் (featured) விளம்பரங்கள் முதலில், பின் மிக அருகில் உள்ளவை, பின் புதிய விளம்பரங்கள்
      let orderByClause = " ORDER BY CASE WHEN ad_tier = 'featured' AND (featured_until IS NULL OR featured_until > NOW()) THEN 0 ELSE 1 END";
      if (user_lat && user_lng) {
        orderByClause += ", distance_km ASC";
      }
      orderByClause += ", id DESC";

      queryText += orderByClause;

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
  extra_details,
  transaction_ref,
  latitude,   // <-- இதைச் சேர்க்கவும்
  longitude   // <-- இதைச் சேர்க்கவும்
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

        if (dailyCount >= 2 && ad_tier !== 'featured') {
  return res.status(429).json({
    success: false,
    error: 'இன்றைய தினத்திற்கான இலவச விளம்பர வரம்பு (2 விளம்பரங்கள்) முடிந்துவிட்டது. கூடுதல் விளம்பரங்களுக்கு Featured திட்டத்தைத் தேர்ந்தெடுக்கவும்.'
  });
}
      } catch (limitErr) {
        console.warn('Daily limit check bypassed (created_at column might be missing):', limitErr.message);
      }

      // 2. ஸ்பேம் மற்றும் மோசடி வார்த்தைகள் ஆய்வு (Spam Keyword Detection)
      const combinedContent = `${business_name} ${ad_title} ${ad_description || ''}`.toLowerCase();
      const containsSpam = SPAM_KEYWORDS.some(kw => combinedContent.includes(kw.toLowerCase()));

      const isFeatured = ad_tier === 'featured';
      const featuredUntil = isFeatured ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null;

// ஸ்பேம் இருந்தால் மட்டுமே pending; Featured விளம்பரம் உடனே முகப்புப் பக்கத்தில் தெரியும்
const adStatus = (isFeatured || containsSpam) ? 'pending' : 'active';
const paymentStatus = isFeatured ? 'pending_verification' : 'free';

      // 3. தரவுத்தளத்தில் விளம்பரத்தைச் சேமித்தல் (payment_status மற்றும் transaction_ref உடன்)
      const insertText = `
  INSERT INTO public.module_advertisements (
    module_key, district, taluk, pincode, business_name, contact_person,
    phone_number, whatsapp_number, ad_title, ad_description,
    location_address, image_url, ad_tier, extra_details, status,
    payment_status, transaction_ref, latitude, longitude,
    featured_until
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
  ) RETURNING *;
`;

     const values = [
  module_key || 'realestate',
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
  adStatus,
  paymentStatus,
  transaction_ref ? transaction_ref.trim() : null,
  latitude ? parseFloat(latitude) : null,     // $18
  longitude ? parseFloat(longitude) : null,   // $19
  featuredUntil                               // $20
];
      

      const result = await pool.query(insertText, values);

      // நிலுவையில் வைக்கப்பட்ட விளம்பரங்களுக்கான அறிவிப்பு
      if (adStatus === 'pending') {
        const warningMsg = isFeatured 
          ? 'உங்கள் Featured விளம்பரம் மற்றும் கட்டண UTR பெறப்பட்டது. நிர்வாகி சரிபார்த்ததும் (Admin Review) நேரலையாகும்.'
          : 'உங்கள் விளம்பரம் ஆய்வுக்குப் பின் (Admin Review) நேரலையாகும்.';

        return res.status(201).json({
          success: true,
          data: result.rows[0],
          warning: warningMsg
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