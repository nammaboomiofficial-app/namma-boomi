export default async function handler(req, res) {
  // 1 மணி நேரத்திற்கு Vercel Edge-ல் Cache ஆகும் (பூஜ்ஜிய செலவு, அதிவேக பதில்)
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

  // இந்திய நேரப்படி (IST) இன்றைய தேதி & கிழமை கணக்கிடுதல்
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const dayIndex = istTime.getDay(); // 0 = ஞாயிறு, 1 = திங்கள்...

  const tamilDays = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
  const tamilMonths = [
    'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
    'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'
  ];

  const formattedDate = `${tamilDays[dayIndex]}, ${istTime.getDate()} ${tamilMonths[istTime.getMonth()]} ${istTime.getFullYear()}`;

  // கிழமை வாரியான துல்லியமான ராகு காலம் & நல்ல நேரம்
  const panchangamByDay = {
    0: { nallaNeram: 'காலை 07:45 - 08:45 • மாலை 03:15 - 04:15', rahuKalam: 'மாலை 04:30 - 06:00' },
    1: { nallaNeram: 'காலை 06:15 - 07:15 • மாலை 04:45 - 05:45', rahuKalam: 'காலை 07:30 - 09:00' },
    2: { nallaNeram: 'காலை 07:45 - 08:45 • மாலை 04:45 - 05:45', rahuKalam: 'மதியம் 03:00 - 04:30' },
    3: { nallaNeram: 'காலை 09:15 - 10:15 • மாலை 04:45 - 05:45', rahuKalam: 'மதியம் 12:00 - 01:30' },
    4: { nallaNeram: 'காலை 10:30 - 11:30 • மாலை 04:45 - 05:45', rahuKalam: 'மதியம் 01:30 - 03:00' },
    5: { nallaNeram: 'காலை 09:15 - 10:15 • மாலை 04:45 - 05:45', rahuKalam: 'காலை 10:30 - 12:00' },
    6: { nallaNeram: 'காலை 07:45 - 08:45 • மாலை 04:45 - 05:45', rahuKalam: 'காலை 09:00 - 10:30' },
  };

  // அடிப்படை சந்தை நிலவரம் (சர்வர் வழியாக)
  let gold22k = '₹11,715 / கிராம்';
  let mandiRate = 'தக்காளி ₹28 • சின்ன வெங்காயம் ₹54';

  // ஒருவேளை உங்களிடம் இலவச GOLD_API_KEY இருந்தால் தானாகவே எடுக்கும் (விருப்பத் தேர்வு)
  if (process.env.GOLD_API_KEY) {
    try {
      const response = await fetch('https://www.goldapi.io/api/XAU/INR', {
        headers: { 'x-access-token': process.env.GOLD_API_KEY }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.price_gram_22k) {
          const chennaiPrice = Math.round(data.price_gram_22k * 1.06); // சுங்க வரி + GST சரிசெய்தல்
          gold22k = `₹${chennaiPrice.toLocaleString('en-IN')} / கிராம்`;
        }
      }
    } catch (e) {
      // API வரவில்லை என்றால் Fallback மதிப்பை பாதுகாப்பாகப் பயன்படுத்தும்
    }
  }

  res.status(200).json({
    date: formattedDate,
    gold22k,
    mandiRate,
    nallaNeram: panchangamByDay[dayIndex].nallaNeram,
    rahuKalam: panchangamByDay[dayIndex].rahuKalam,
    updatedAt: istTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  });
}