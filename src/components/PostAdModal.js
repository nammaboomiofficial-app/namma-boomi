import React, { useState, useEffect } from 'react';

const TAMIL_NADU_DISTRICTS = [
  'அரியலூர்', 'செங்கல்பட்டு', 'சென்னை', 'கோயம்புத்தூர்', 'கடலூர்', 
  'தருமபுரி', 'திண்டுக்கல்', 'ஈரோடு', 'கள்ளக்குறிச்சி', 'காஞ்சிபுரம்', 
  'கன்னியாகுமரி', 'கரூர்', 'கிருஷ்ணகிரி', 'மதுரை', 'மயிலாடுதுறை', 
  'நாகப்பட்டினம்', 'நாமக்கல்', 'நீலகிரி', 'பெரம்பலூர்', 'புதுக்கோட்டை', 
  'ராமநாதபுரம்', 'ராணிப்பேட்டை', 'சேலம்', 'சிவகங்கை', 'தென்காசி', 
  'தஞ்சாவூர்', 'தேனி', 'தூத்துக்குடி', 'திருச்சிராப்பள்ளி', 'திருநெல்வேலி', 
  'திருப்பத்தூர்', 'திருப்பூர்', 'திருவள்ளூர்', 'திருவண்ணாமலை', 'திருவாரூர்', 
  'வேலூர்', 'விழுப்புரம்', 'விருதுநகர்'
];

const MODULE_OPTIONS = [
  { key: 'realestate', label: 'பூமி & நிலம் (Real Estate)', icon: '🏡' },
  { key: 'finance', label: 'நிதி & கடன்கள் (Finance)', icon: '💰' },
  { key: 'insurance', label: 'காப்பீடு (Insurance)', icon: '🛡️' },
  { key: 'agriculture', label: 'விவசாயம் (Agriculture)', icon: '🌾' },
  { key: 'education', label: 'கல்வி & படிப்பு (Education)', icon: '🎓' },
  { key: 'jobs', label: 'வேலைவாய்ப்பு (Jobs)', icon: '💼' },
  { key: 'business', label: 'தொழில் & MSME', icon: '🏭' },
  { key: 'wholesale', label: 'மொத்த விற்பனை (Wholesale)', icon: '📦' },
  { key: 'spiritual', label: 'ஆன்மீகம் (Spiritual)', icon: '🛕' },
  { key: 'tourism', label: 'சுற்றுலா (Tourism)', icon: '🚗' },
  { key: 'astro', label: 'AI ஜோதிடம் (Astrology)', icon: '🔮' },
  { key: 'heritage', label: 'தமிழர் மரபு (Tamil Heritage)', icon: '🏛️' }
];

// 12 மாட்யூல்களுக்கான துல்லியமான, மக்கள் மனதில் பதியும் தமிழ் வாசகத் தொகுப்பு
const MODULE_DATA_PRESETS = {
  realestate: {
    options: ['தனி வீடு / வில்லா', 'DTCP மனை', 'விவசாய பூமி', 'வணிக இடம் / கடை'],
    templates: {
      'தனி வீடு / வில்லா': {
        title: 'புதிய தனி வீடு / சொகுசு வில்லா உடனடி விற்பனைக்கு',
        desc: 'அழகிய குடியிருப்புப் பகுதி; விசாலமான கார் பார்க்கிங், 24 மணி நேரக் குடிநீர் வசதி மற்றும் சுத்தமான காற்றுடன் கூடிய நவீன தனி வீடு. உடனடி குடியேறத் தயார்.'
      },
      'DTCP மனை': {
        title: 'DTCP / RERA அங்கீகாரம் பெற்ற வீட்டு மனை விற்பனைக்கு',
        desc: 'தெளிவான தாய் பத்திரம், உடனடி பட்டா மாறுதல் வசதி, அகலமான தார் சாலை மற்றும் குடிநீர் வசதியுடன் கூடிய வீட்டு மனை. உடனடி கிரயம்.'
      },
      'விவசாய பூமி': {
        title: 'வளமான விவசாய பூமி / பண்ணை நிலம் நேரடி விற்பனைக்கு',
        desc: 'செழிப்பான மண் வளம், தடையற்ற போர்வெல் வசதி, இலவச விவசாய மின் இணைப்பு மற்றும் கம்பி வேலியுடன் கூடிய சிறந்த பண்ணை நிலம்.'
      },
      'வணிக இடம் / கடை': {
        title: 'மெயின் ரோடு வணிக இடம் / கடை வாடகை & விற்பனைக்கு',
        desc: 'அதிக மக்கள் நடமாட்டம் உள்ள பிரதான சாலை பகுதி; அலுவலகம், ஷோரூம் அல்லது கடைகளுக்கு ஏற்ற தரை தளம் / முதல் தளம் உடனடியாகக் கிடைக்கும்.'
      }
    }
  },
  finance: {
    options: [
      'தனிநபர் கடன் (Personal Loan)',
      'வணிக & MSME கடன் (Business Loan)',
      'புதிய வீட்டுக் கடன் (Home Loan)',
      'மனை வாங்கும் கடன் (Plot Purchase Loan)',
      'சொத்து அடமானக் கடன் (LAP / Mortgage)',
      'இருசக்கர வாகனக் கடன் (Two Wheeler Loan)',
      'வணிக வாகனக் கடன் (Commercial Vehicle Loan)',
      'திட்ட அறிக்கை (Project Report / DPR)'
    ],
    templates: {
      'தனிநபர் கடன் (Personal Loan)': {
        title: 'உடனடி ஒப்புதலுடன் குறைந்த வட்டியில் தனிநபர் கடன் (Personal Loan)',
        desc: 'அவசரப் பணத் தேவைகளுக்கு சம்பளதாரர்கள் & சுயதொழில் செய்வோருக்கு குறைந்த ஆவணங்களுடன் மிக விரைவான தனிநபர் கடன் ஏற்பாடு.'
      },
      'வணிக & MSME கடன் (Business Loan)': {
        title: 'அரசு மானியத்துடன் கூடிய MSME & முத்ரா சிறுதொழில் கடன்',
        desc: 'புதிய தொழில் தொடங்க, கடை மற்றும் தொழில் விரிவாக்கத்திற்கு குறைந்த வட்டியில் துரிதமான வங்கி வணிகக் கடன் ஏற்பாடுகள்.'
      },
      'புதிய வீட்டுக் கடன் (Home Loan)': {
        title: 'புதிய வீடு கட்ட & வாங்க எளிய தவணையில் வீட்டுக் கடன் (Home Loan)',
        desc: 'முன்னணி வங்கிகள் மூலம் நீண்ட காலத் தவணை, குறைந்த செயலாக்கக் கட்டணத்துடன் விரைவான புதிய வீட்டுக் கடன் ஒப்புதல்.'
      },
      'மனை வாங்கும் கடன் (Plot Purchase Loan)': {
        title: 'வீட்டு மனை வாங்க & கட்டுமானப் பணிக்கான உடனடி வங்கி கடன்',
        desc: 'அங்கீகாரம் பெற்ற வீட்டு மனைகள் வாங்கவும், கட்டுமானப் பணிகளைத் தொடங்கவும் வங்கிகள் மூலம் நேரடி கடன் உதவி.'
      },
      'சொத்து அடமானக் கடன் (LAP / Mortgage)': {
        title: 'சொத்து மற்றும் பட்டா நிலத்தின் மீது குறைந்த வட்டியில் அடமானக் கடன்',
        desc: 'வீடு, வணிகக் கட்டடம் அல்லது மனையை அடமானம் வைத்து அதிகபட்ச நிதி உதவி; குறைந்த வட்டி மற்றும் எளிதான ஆவணச் சரிபார்ப்பு.'
      },
      'இருசக்கர வாகனக் கடன் (Two Wheeler Loan)': {
        title: 'குறைந்த முன்பணத்தில் (Low Downpayment) புதிய இருசக்கர வாகனக் கடன்',
        desc: 'அனைத்து முன்னணி பைக் & ஸ்கூட்டர்களுக்கு உடனடி லோன் வசதி; ஆதார் அட்டை அடிப்படையில் எளிய மாதத் தவணை (EMI).'
      },
      'வணிக வாகனக் கடன் (Commercial Vehicle Loan)': {
        title: 'ஆட்டோ, வேன் & லாரி வாங்க கமர்சியல் வாகனக் கடன்',
        desc: 'புதிய மற்றும் ரீ-சேல் வணிக வாகனங்களுக்கு 90% வரை துரித பைனான்ஸ் மற்றும் சுலப தவணைத் திட்டங்கள்.'
      },
      'திட்ட அறிக்கை (Project Report / DPR)': {
        title: 'வங்கிக் கடன்களுக்கான முறையான திட்ட அறிக்கை (DPR & CMA Data)',
        desc: 'முத்ரா, PMEGP, NEEDS அரசு மானியக் கடன்களுக்கான விரிவான திட்ட அறிக்கை மற்றும் ஆடிட்டிங் பணிகள் துரிதமாகச் செய்து தரப்படும்.'
      }
    }
  },
  insurance: {
    options: ['பணமில்லா மருத்துவக் காப்பீடு', 'வாகன விபத்துக் காப்பீடு'],
    templates: {
      'பணமில்லா மருத்துவக் காப்பீடு': {
        title: 'குடும்பத்திற்கான பணமில்லா மருத்துவக் காப்பீடு (Cashless)',
        desc: 'அவசர மருத்துவச் செலவுகளிலிருந்து குடும்பத்தைப் பாதுகாக்க குறைந்த பிரீமியத்தில் அதிக கவரேஜ்; உடனடி கிளைம் உதவி மற்றும் 24/7 மருத்துவமனை வசதி.'
      },
      'வாகன விபத்துக் காப்பீடு': {
        title: 'இருசக்கர மற்றும் நான்கு சக்கர வாகனங்களுக்கான உடனடி இன்சூரன்ஸ்',
        desc: 'குறைந்த கட்டணத்தில் முழுமையான வாகன விபத்துக் காப்பீடு மற்றும் மூன்றாம் நபர் பாலிசி புதுப்பித்தல்; 5 நிமிடத்தில் பாலிசி நகல் கிடைக்கும்.'
      }
    }
  },
  agriculture: {
    options: ['இயற்கை மண்புழு உரம் & சாணம்', 'உழவு இயந்திரங்கள் வாடகை'],
    templates: {
      'இயற்கை மண்புழு உரம் & சாணம்': {
        title: 'தரமான இயற்கை மண்புழு உரம் & நாட்டு மாட்டுச் சாணம்',
        desc: 'ரசாயனக் கலப்பற்ற 100% தூய இயற்கை உரம்; பயிர் விளைச்சலை அதிகரிக்கவும் மண் வளத்தைக் காக்கவும் மொத்தமாகவும் சில்லறையாகவும் கிடைக்கும்.'
      },
      'உழவு இயந்திரங்கள் வாடகை': {
        title: 'டிராக்டர் மற்றும் நவீன விவசாய உழவு இயந்திரங்கள் வாடகைக்கு',
        desc: 'அனுபவம் வாய்ந்த ஓட்டுநர்களுடன் சரியான நேரத்தில் உழவுப் பணிகள் செய்து தரப்படும்; நியாயமான வாடகைக் கட்டணம்.'
      }
    }
  },
  education: {
    options: ['போட்டித் தேர்வு பயிற்சி', 'கணினி & ஆங்கிலப் பயிற்சி'],
    templates: {
      'போட்டித் தேர்வு பயிற்சி': {
        title: 'TNPSC / TET / வங்கித் தேர்வு நேரடி மற்றும் ஆன்லைன் பயிற்சி',
        desc: 'அனுபவமிக்க பயிற்றுநர்களின் வழிகாட்டுதல், முந்தைய ஆண்டு வினாத்தாள் தீர்வுகள் மற்றும் வாராந்திர மாதிரித் தேர்வுகளுடன் கூடிய நேரடிப் பயிற்சி வகுப்புகள்.'
      },
      'கணினி & ஆங்கிலப் பயிற்சி': {
        title: 'வேலைவாய்ப்பை உறுதி செய்யும் பிராக்டிகல் கணினி & ஆங்கிலப் பயிற்சி',
        desc: 'எளிய தமிழ் வழியில் MS Office, Tally, மற்றும் Spoken English நேரடிப் பயிற்சி; சுயதொழில் மற்றும் அலுவலகப் பணிகளுக்கு உடனடி வேலைவாய்ப்பு உதவி.'
      }
    }
  },
  jobs: {
    options: ['நிறுவன ஆட்கள் தேவை', 'வாகன ஓட்டுநர் தேவை'],
    templates: {
      'நிறுவன ஆட்கள் தேவை': {
        title: 'நிறுவனத்திற்குத் திறமையான ஆண் / பெண் பணியாளர்கள் தேவை',
        desc: 'அலுவலகப் பணி, விற்பனை மற்றும் களப்பணிக்கு உடனடி ஆட்கள் சேர்க்கை; தகுதிக்கேற்ற சிறப்பான மாத ஊதியம், ஊக்கத்தொகை மற்றும் முறையான பணிப் பாதுகாப்பு.'
      },
      'வாகன ஓட்டுநர் தேவை': {
        title: 'கனரக / இலகுரக வாகன ஓட்டுநர்கள் உடனடி தேவை',
        desc: 'உள்ளூர் மற்றும் வெளியூர் பயணங்களுக்கு அனுபவமுள்ள டிரைவர்கள் தேவை; தங்குமிடம் மற்றும் உணவு வசதியுடன் கூடிய சிறந்த மாதச் சம்பளம்.'
      }
    }
  },
  business: {
    options: ['உற்பத்தி இயந்திரங்கள் & தொழில்', 'தொழில் உரிமங்கள் & பதிவு'],
    templates: {
      'உற்பத்தி இயந்திரங்கள் & தொழில்': {
        title: 'குறைந்த முதலீட்டில் தொழில் தொடங்க நவீன உற்பத்தி இயந்திரங்கள்',
        desc: 'பேப்பர் கப், கற்பூரம், சோப் மற்றும் பேக்கிங் இயந்திரங்கள் நேரடி சப்ளை; இலவச நேரடி செயல்முறைப் பயிற்சி மற்றும் சந்தைப்படுத்தல் ஆலோசனைகள்.'
      },
      'தொழில் உரிமங்கள் & பதிவு': {
        title: 'புதிய தொழில் பதிவு: GST, MSME & FSSAI உடனடி அரசு அங்கீகாரம்',
        desc: 'உங்கள் வணிகத்திற்கான தொழில் உரிமங்கள் மற்றும் வரிப் பதிவுகள் எளிய முறையில் குறைந்த கட்டணத்தில் 48 மணி நேரத்தில் செய்து தரப்படும்.'
      }
    }
  },
  wholesale: {
    options: ['ஜவுளி & ஆயத்த ஆடைகள்', 'மளிகைப் பொருட்கள் மொத்த சப்ளை'],
    templates: {
      'ஜவுளி & ஆயத்த ஆடைகள்': {
        title: 'ஆலை நேரடி கொள்முதல் விலையில் ஆயத்த ஆடைகள் மொத்த விற்பனை',
        desc: 'திருப்பூர் மற்றும் சூரத் நேரடி தயாரிப்புகள்; சில்லறை வியாபாரிகள் மற்றும் சுயதொழில் செய்வோருக்கு மிகக் குறைந்த விலையில் பாதுகாப்பான டோர் டெலிவரி.'
      },
      'மளிகைப் பொருட்கள் மொத்த சப்ளை': {
        title: 'மொத்த விலையில் பிரீமியம் தர மளிகை & உணவுப் பொருட்கள்',
        desc: 'ஹோட்டல்கள், மளிகைக் கடைகளுக்குத் தேவையான அத்தியாவசியப் பொருட்கள் நேரடி மண்டி விலையில் தரமாகவும் துரிதமாகவும் விநியோகம் செய்யப்படும்.'
      }
    }
  },
  spiritual: {
    options: ['விசேஷ பூஜைகள் & ஹோமம்', 'ஆன்மிக யாத்திரை பேக்கேஜ்'],
    templates: {
      'விசேஷ பூஜைகள் & ஹோமம்': {
        title: 'வாஸ்து சாந்தி, கிரகப்பிரவேசம் & கணபதி ஹோமம் விசேஷ பூஜைகள்',
        desc: 'வேத விற்பன்னர்கள் மூலம் இல்லத் திருவிழாக்கள் மற்றும் தொடக்க விழா பூஜைகள் ஆகம முறைப்படி நேர்த்தியாகவும் சிறப்பாகவும் நடத்தித் தரப்படும்.'
      },
      'ஆன்மிக யாத்திரை பேக்கேஜ்': {
        title: 'புகழ்பெற்ற புண்ணியத் தலங்களுக்கான ஆன்மிக யாத்திரை ஏற்பாடுகள்',
        desc: 'முதியவர்கள் மற்றும் குடும்பத்தினர் பாதுகாப்பாகப் பயணிக்கும் வகையில் உணவு, வசதியான தங்குமிடம் மற்றும் சிறப்பு தரிசன ஏற்பாடுகளுடன் கூடிய யாத்திரை.'
      }
    }
  },
  tourism: {
    options: ['24 மணி நேர டாக்ஸி சேவை', 'குடும்ப சுற்றுலா பேக்கேஜ்'],
    templates: {
      '24 மணி நேர டாக்ஸி சேவை': {
        title: '24 மணி நேர பாதுகாப்பான கால் டாக்ஸி & உள்ளூர் வாடகை கார்',
        desc: 'தமிழ்நாடு முழுவதும் சுத்தமான ஏசி/நான்-ஏசி கார்கள்; பண்பான அனுபவ ஓட்டுநர்களுடன் குறைந்த கி.மீ கட்டணத்தில் பாதுகாப்பான குடும்பப் பயணம்.'
      },
      'குடும்ப சுற்றுலா பேக்கேஜ்': {
        title: 'ஏற்காடு, ஊட்டி, கொடைக்கானல் சிறப்பு குடும்ப சுற்றுலா பேக்கேஜ்',
        desc: 'சொகுசு தங்குமிடம், சுவையான உணவு, சுற்றுலா இடங்களைச் சுற்றிப் பார்க்கும் வழிகாட்டுதலுடன் கூடிய மகிழ்ச்சியான பயண பேக்கேஜ்.'
      }
    }
  },
  astro: {
    options: ['ஜாதகக் கணிப்பு & பலன்', 'வாஸ்து & எண் கணித வழிகாட்டல்'],
    templates: {
      'ஜாதகக் கணிப்பு & பலன்': {
        title: 'பாரம்பரிய முறைப்படி துல்லியமான ஜாதகக் கணிப்பு & எளிய பரிகாரங்கள்',
        desc: 'பிறந்த தேதி, நேர அடிப்படையில் நவகிரக தோஷங்கள், திருமணப் பொருத்தம், தொழில் வளர்ச்சி மற்றும் கல்விக்கான துல்லியமான பலன்கள் & எளிய பரிகாரங்கள்.'
      },
      'வாஸ்து & எண் கணித வழிகாட்டல்': {
        title: 'தொழில் வெற்றி & மன அமைதிக்கான பிரத்யேக வாஸ்து, எண் கணித வழிகாட்டல்',
        desc: 'வீடு, அலுவலக வாஸ்து குறைபாடுகளை இடிக்காமல் சரிசெய்யும் ஆலோசனைகள் மற்றும் அதிர்ஷ்டப் பெயர் அமைக்கும் முறை சிறந்த முறையில் பார்க்கப்படும்.'
      }
    }
  },
  heritage: {
    options: ['தூய மரச்செக்கு எண்ணெய்', 'பாரம்பரிய அரிசி & சிறுதானியங்கள்'],
    templates: {
      'தூய மரச்செக்கு எண்ணெய்': {
        title: 'மரபு மாறாத தூய மரச்செக்கு நல்லெண்ணெய், கடலை எண்ணெய் & தேங்காய் எண்ணெய்',
        desc: 'வாகை மரச்செக்கில் பிழியப்பட்ட சுத்தமான, ரசாயனக் கலப்பற்ற பாரம்பர்ய சமையல் எண்ணெய்கள்; ஆரோக்கிய வாழ்விற்கு நேரடி தயாரிப்பு சப்ளை.'
      },
      'பாரம்பரிய அரிசி & சிறுதானியங்கள்': {
        title: 'நாட்டு சர்க்கரை, பனைவெல்லம் & பாரம்பரிய சிறுதானியங்கள் நேரடி விற்பனை',
        desc: 'இயற்கை விவசாய முறையில் விளைந்த ரசாயனமற்ற வெல்லம், மாப்பிள்ளை சம்பா, கருப்புக் கவுனி மற்றும் தினை, சாமை உள்ளிட்ட அரிய பாரம்பரிய உணவுப் பொருட்கள்.'
      }
    }
  }
};

export default function PostAdModal({ isOpen, onClose, currentDistrict = 'செங்கல்பட்டு', defaultModule = 'realestate' }) {
  const [formData, setFormData] = useState({
    module_key: defaultModule,
    district: (!currentDistrict || currentDistrict === 'அனைத்தும்') ? 'செங்கல்பட்டு' : currentDistrict,
    taluk: '',
    pincode: '',
    map_link: '',
    image_url: '',
    business_name: '',
    contact_person: '',
    phone_number: '',
    whatsapp_number: '',
    ad_title: '',
    ad_description: '',
    location_address: '',
    ad_tier: 'basic'
  });

  const [moduleFields, setModuleFields] = useState({
    subCategory: '',
    priceOrSalary: '',
    unitOrRole: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // மாட்யூல் மாறும்போது அதற்குரிய முதல் வகையை தானாகத் தேர்வு செய்து வாக்கியங்களை அமைக்கும் லாஜிக்
  const setPresetByModuleAndCategory = (mKey, catName) => {
    const config = MODULE_DATA_PRESETS[mKey];
    if (config && config.templates[catName]) {
      const template = config.templates[catName];
      setFormData(prev => ({
        ...prev,
        ad_title: template.title,
        ad_description: template.desc
      }));
    }
  };

  useEffect(() => {
    if (isOpen) {
      const initialMod = defaultModule || 'realestate';
      const initialDistrict = (!currentDistrict || currentDistrict === 'அனைத்தும்') ? 'செங்கல்பட்டு' : currentDistrict;
      const initialConfig = MODULE_DATA_PRESETS[initialMod];
      const initialSub = initialConfig ? initialConfig.options[0] : '';

      setFormData(prev => ({
        ...prev,
        module_key: initialMod,
        district: initialDistrict,
        ad_title: initialConfig?.templates[initialSub]?.title || '',
        ad_description: initialConfig?.templates[initialSub]?.desc || ''
      }));

      setModuleFields({
        subCategory: initialSub,
        priceOrSalary: '',
        unitOrRole: ''
      });
    }
  }, [defaultModule, currentDistrict, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (e) => {
    const newModule = e.target.value;
    const config = MODULE_DATA_PRESETS[newModule];
    const firstOption = config ? config.options[0] : '';

    setFormData(prev => ({
      ...prev,
      module_key: newModule,
      ad_title: config?.templates[firstOption]?.title || '',
      ad_description: config?.templates[firstOption]?.desc || ''
    }));

    setModuleFields({
      subCategory: firstOption,
      priceOrSalary: '',
      unitOrRole: ''
    });
  };

  const handleSubCategoryChange = (e) => {
    const newSub = e.target.value;
    setModuleFields(prev => ({ ...prev, subCategory: newSub }));
    setPresetByModuleAndCategory(formData.module_key, newSub);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('படத்தின் அளவு 2MB-க்குள் இருக்க வேண்டும்.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      ...formData,
      extra_details: {
        ...moduleFields,
        map_link: formData.map_link
      }
    };

    try {
      const res = await fetch('/api/module-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'விளம்பரம் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!' });
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1200);
      } else {
        setMessage({ type: 'error', text: data.error || 'பதிவு செய்வதில் பிழை ஏற்பட்டது.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'இணைப்பில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.' });
    } finally {
      setLoading(false);
    }
  };

  const currentConfig = MODULE_DATA_PRESETS[formData.module_key] || { options: [], templates: {} };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-white my-8 max-h-[90vh] overflow-y-auto">
        
        {/* தலைப்பு பகுதி */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <div>
            <h3 className="text-lg font-bold text-emerald-400">உள்ளூர் வணிக விளம்பரம் சேர்க்க</h3>
            <p className="text-xs text-slate-400">
              மாவட்டம்: <span className="text-emerald-300 font-semibold">{formData.district}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold p-1 leading-none"
          >
            ✕
          </button>
        </div>

        {message && (
          <div className={`my-3 p-3 rounded-lg text-xs font-semibold ${message.type === 'success' ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-600' : 'bg-red-900/80 text-red-200 border border-red-600'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          
          {/* மாட்யூல் மற்றும் மாவட்ட தேர்வு */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-slate-300 font-medium">பிரிவு (12 மாட்யூல்கள்) *</label>
              <select
                name="module_key"
                value={formData.module_key}
                onChange={handleModuleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                {MODULE_OPTIONS.map((m) => (
                  <option key={m.key} value={m.key}>{m.icon} {m.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-slate-300 font-medium">மாவட்டம் *</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              >
                {TAMIL_NADU_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>

          {/* டைனமிக் துணைப் பிரிவு மற்றும் மதிப்பு விவரங்கள் */}
          <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl space-y-3">
            <span className="text-[11px] font-bold text-emerald-400 block">
              🏷️ தேர்ந்தெடுக்கப்பட்ட பிரிவின் பிரத்யேக விவரங்கள்:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block mb-1 text-slate-300">வகை / உப பிரிவு *</label>
                <select
                  name="subCategory"
                  value={moduleFields.subCategory}
                  onChange={handleSubCategoryChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500 font-medium"
                >
                  {currentConfig.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-slate-300">அளவு / பணி / விவரம்</label>
                <input
                  type="text"
                  name="unitOrRole"
                  value={moduleFields.unitOrRole}
                  onChange={(e) => setModuleFields({ ...moduleFields, unitOrRole: e.target.value })}
                  placeholder="எ.கா: 1200 ச.அடி / 10 மூட்டை"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-300">விலை / சம்பளம் / கட்டணம்</label>
                <input
                  type="text"
                  name="priceOrSalary"
                  value={moduleFields.priceOrSalary}
                  onChange={(e) => setModuleFields({ ...moduleFields, priceOrSalary: e.target.value })}
                  placeholder="எ.கா: ₹45 லட்சம் / ₹500"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* சொத்து / வணிகத்திற்கான மேப் & புகைப்படம் (பூமி & நிலம்) */}
          {formData.module_key === 'realestate' && (
            <div className="space-y-3 p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl">
              <div>
                <label className="block mb-1 text-slate-300 font-medium flex justify-between items-center">
                  <span>Google Maps லிங்க்</span>
                  <span className="text-[10px] text-amber-400">கார்டில் மேப் பட்டன் தோன்றும்</span>
                </label>
                <input
                  type="url"
                  name="map_link"
                  value={formData.map_link}
                  onChange={handleChange}
                  placeholder="https://maps.app.goo.gl/... (Google Map Link)"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-300 font-medium flex justify-between items-center">
                  <span>📷 நிலம் / மனை / வில்லா புகைப்படம்</span>
                  <span className="text-[10px] text-slate-400">கார்டின் முகப்புப் படமாக அமையும்</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-500 cursor-pointer"
                />
                {formData.image_url && (
                  <div className="relative inline-block mt-2">
                    <img
                      src={formData.image_url}
                      alt="Uploaded Preview"
                      className="h-20 w-32 object-cover rounded-lg border border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* விளம்பர தலைப்பு - தானாகவே சரியான வாக்கியம் அமையும் */}
          <div>
            <label className="block mb-1 text-slate-300 font-medium">விளம்பரத் தலைப்பு *</label>
            <input
              type="text"
              name="ad_title"
              required
              value={formData.ad_title}
              onChange={handleChange}
              placeholder="விளம்பரத் தலைப்பு"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 font-semibold text-emerald-300"
            />
          </div>

          {/* விளம்பர விவரம் - தானாகவே தொழில்முறை வாசகம் அமையும் */}
          <div>
            <label className="block mb-1 text-slate-300 font-medium">விளம்பர விவரம் *</label>
            <textarea
              name="ad_description"
              rows="3"
              required
              value={formData.ad_description}
              onChange={handleChange}
              placeholder="விளம்பர விவரங்கள்..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
            ></textarea>
          </div>

          {/* வணிகப் பெயர், வட்டம், பின்கோட் */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-slate-300 font-medium">வணிகப் பெயர் / நிறுவனம் *</label>
              <input
                type="text"
                name="business_name"
                required
                value={formData.business_name}
                onChange={handleChange}
                placeholder="எ.கா: வெற்றி ஃபர்னிச்சர்"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300 font-medium">வட்டம் / பகுதி (Taluk)</label>
              <input
                type="text"
                name="taluk"
                value={formData.taluk}
                onChange={handleChange}
                placeholder="எ.கா: காட்டாங்கொளத்தூர்"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300 font-medium">அஞ்சல் குறியீடு (Pincode) *</label>
              <input
                type="text"
                name="pincode"
                maxLength={6}
                required
                value={formData.pincode}
                onChange={handleChange}
                placeholder="603203"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* தொடர்பாளர் விவரங்கள் */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-slate-300 font-medium">தொடர்பாளர் பெயர் *</label>
              <input
                type="text"
                name="contact_person"
                required
                value={formData.contact_person}
                onChange={handleChange}
                placeholder="உரிமையாளர் பெயர்"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300 font-medium">அழைப்பு எண் *</label>
              <input
                type="tel"
                name="phone_number"
                required
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300 font-medium">WhatsApp எண்</label>
              <input
                type="tel"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-slate-300 font-medium">கடை / அலுவலக முகவரி</label>
            <input
              type="text"
              name="location_address"
              value={formData.location_address}
              onChange={handleChange}
              placeholder="கடை அல்லது முகவரி விவரம்"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-700 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
            >
              ரத்து செய்
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition disabled:opacity-50"
            >
              {loading ? 'பதிவாகிறது...' : 'விளம்பரம் வெளியிடு'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}