import React, { useState, useMemo } from 'react';
import { getWhatsAppUrl } from '../config';

const TN_38_DISTRICTS = [
  'அரியலூர்', 'இராணிப்பேட்டை', 'இராமநாதபுரம்', 'ஈரோடு', 'கடலூர்', 'கரூர்',
  'கள்ளக்குறிச்சி', 'கன்னியாகுமரி', 'காஞ்சிபுரம்', 'கிருஷ்ணகிரி', 'கோயம்புத்தூர்',
  'சிவகங்கை', 'செங்கல்பட்டு', 'சென்னை', 'சேலம்', 'தஞ்சாவூர்', 'தருமபுரி',
  'திண்டுக்கல்', 'திருச்சிராப்பள்ளி', 'திருநெல்வேலி', 'திருப்பத்தூர்', 'திருப்பூர்',
  'திருவண்ணாமலை', 'திருவள்ளூர்', 'திருவாரூர்', 'தூத்துக்குடி', 'தென்காசி', 'தேனி',
  'நாகப்பட்டினம்', 'நாமக்கல்', 'நீலகிரி', 'புதுக்கோட்டை', 'பெரம்பலூர்', 'மதுரை',
  'மயிலாடுதுறை', 'விருதுநகர்', 'விழுப்புரம்', 'வேலூர்'
];

const HERITAGE_TOPICS = [
  'மாவட்டத்தின் சங்ககால வரலாறு & கல்வெட்டுகள்',
  'புவிசார் குறியீடு (GI Tag) பெற்ற பாரம்பரியப் பொருட்கள்',
  'பாரம்பரிய நாட்டுப்புறக் கலைகள் & திருவிழாக்கள்',
  'பாரம்பரிய உணவு வகைகள் & சமையல் முறைகள்',
  'கோவில் கட்டிடக்கலை & சிற்பக் கலைச் சிறப்பு'
];

const THIRUKKURAL_GEMS = [
  {
    number: 'குறள் 396',
    adhigaram: 'கல்வி',
    kural: 'தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்குக்\nகற்றனைத் தூறும் அறிவு.',
    meaning: 'மணற்பாங்கான இடத்தில் தோண்டத் தோண்ட நீர் ஊறுவது போல, மக்கள் நூல்களைக் கற்கக் கற்க அறிவு வளரும்.',
    lifeTip: 'தினமும் புதிய தொழில்நுட்பத்தையும் வரலாற்றையும் கற்றுக்கொள்பவர்களே காலத்தை வெல்வார்கள்.'
  },
  {
    number: 'குறள் 423',
    adhigaram: 'அறிவுடைமை',
    kural: 'எப்பொருள் யார்யார்வாய்க் கேட்பினும் அப்பொருள்\nமெய்ப்பொருள் காண்ப தறிவு.',
    meaning: 'எந்த ஒரு செய்தியை யார் சொன்னாலும், அதன் உண்மைத் தன்மையை ஆராய்ந்து அறிவதே சிறந்த அறிவாகும்.',
    lifeTip: 'தகவல் யுகத்தில் வதந்திகளை நம்பாமல் உண்மையைச் சரிபார்ப்பதே வெற்றியின் அடிப்படை.'
  },
  {
    number: 'குறள் 1031',
    adhigaram: 'உழவு',
    kural: 'சுழன்றும்ஏர்ப் பின்னது உலகம் அதனால்\nஉழந்தும் உழவே தலை.',
    meaning: 'உலகம் எத்தனை தொழில்களைச் செய்து சுழன்றாலும் ஏரின் பின்னாலேயே நிற்கிறது; அதனால் உழவுத் தொழிலே முதன்மையானது.',
    lifeTip: 'விவசாயத்தையும் மண்ணையும் பாதுகாப்பதே மனிதகுலத்தின் எதிர்காலத்தைக் காக்கும்.'
  },
  {
    number: 'குறள் 942',
    adhigaram: 'மருந்து',
    kural: 'மருந்தென வேண்டாவாம் யாக்கைக்கு அருந்தியது\nஅற்றது போற்றி உணின்.',
    meaning: 'முன் உண்ட உணவு செரித்ததை அறிந்து, அதன் பின் அளவோடு உண்டால் உடலுக்கு மருந்து என ஒன்று தேவையில்லை.',
    lifeTip: 'பசித்த பின் புசிப்பதே சித்த மருத்துவத்தின் முதல் விதி.'
  },
  {
    number: 'குறள் 86',
    adhigaram: 'விருந்தோம்பல்',
    kural: 'செல்விருந்து ஓம்பி வருவிருந்து பார்த்திருப்பான்\nநல்விருந்து வானத் தவர்க்கு.',
    meaning: 'வந்த விருந்தினரைப் போற்றி உபசரித்து, மேலும் வரும் விருந்தினரை எதிர்பார்த்து இருப்பவன் தேவர்களுக்கும் நல்விருந்தாவான்.',
    lifeTip: 'பகிர்ந்துண்ணும் பண்பே தமிழர் இல்லங்களின் அடையாளம்.'
  }
];

const ARCHAEOLOGY_SITES = [
  {
    name: 'கீழடி அகழ்வாராய்ச்சி (சிவகங்கை மாவட்டம்)',
    era: 'கி.மு. 6-ம் நூற்றாண்டு (சங்க காலம்)',
    highlight: 'வைகை நதிக்கரை நகர நாகரிகம், தமிழி எழுத்துக்கள், செங்கல் கட்டுமானங்கள் & சிந்துவெளி குறியீடுகளுடன் ஒற்றுமை.',
    status: 'உலகப் புகழ்பெற்ற அருங்காட்சியகம் செயல்பாட்டில் உள்ளது'
  },
  {
    name: 'ஆதிச்சநல்லூர் & சிவகளை (தூத்துக்குடி மாவட்டம்)',
    era: 'கி.மு. 1155 - இரும்புக் கால நாகரிகம்',
    highlight: 'தாமிரபரணி நதிக்கரையில் கண்டெடுக்கப்பட்ட முதுமக்கள் தாழிகள், இரும்பு ஆயுதங்கள் மற்றும் உலகின் மிகப் பழமையான இரும்புப் பயன்பாட்டுச் சான்றுகள்.',
    status: 'மத்திய & மாநில தொல்லியல் ஆய்வுத் தளம்'
  },
  {
    name: 'தஞ்சை பெரிய கோவில் & கங்கைகொண்ட சோழபுரம்',
    era: 'கி.பி. 1010 - மாமன்னன் இராஜராஜ சோழன் & இராஜேந்திர சோழன்',
    highlight: '80 டன் எடையுள்ள ஒரே கல்லாலான விமானக் கலசம், நிழல் விழாத கோபுரம் மற்றும் உலகப் பாரம்பரியச் சின்னம் (UNESCO).',
    status: 'UNESCO World Heritage Monument'
  },
  {
    name: 'மாமல்லபுரம் குடைவரை & ஒற்றைக்கல் ரதங்கள்',
    era: 'கி.பி. 7-8ம் நூற்றாண்டு - பல்லவர் காலம்',
    highlight: 'அர்ஜுனன் தபசு புடைப்புச் சிற்பம், கடற்கரை கோவில் மற்றும் ஐந்து ரதங்கள்.',
    status: 'UNESCO World Heritage Monument'
  }
];

const GI_TAG_TREASURES = [
  { item: 'காஞ்சிபுரம் பட்டுப் புடவை', district: 'காஞ்சிபுரம்', specialty: 'தூய மல்பெரி பட்டு மற்றும் கோர்வை நெசவு முறை.' },
  { item: 'மதுரை மல்லிகை', district: 'மதுரை', specialty: 'தனித்துவமான நறுமணம் மற்றும் அடர்த்தியான இதழ்கள்.' },
  { item: 'பத்தமடை பாய்', district: 'திருநெல்வேலி', specialty: 'தாமிரபரணி கோரைப் புல்லால் பட்டுப் போல் நெய்யப்படும் பாரம்பரியப் பாய்.' },
  { item: 'தஞ்சாவூர் ஓவியம் & தலையாட்டி பொம்மை', district: 'தஞ்சாவூர்', specialty: 'தங்க இழை வேலைப்பாடு ஓவியங்கள் மற்றும் புவியீர்ப்பு மைய தலையாட்டி பொம்மை.' },
  { item: 'நாச்சியார்கோவில் குத்துவிளக்கு', district: 'தஞ்சாவூர்', specialty: 'வண்டல் மண் அச்சில் வார்க்கப்படும் பாரம்பரிய பித்தளை விளக்குகள்.' },
  { item: 'திண்டுக்கல் பூட்டு & சிறுமலை வாழை', district: 'திண்டுக்கல்', specialty: 'உறுதியான கைத்தொழில் பூட்டுகள் மற்றும் மருத்துவ குணம் கொண்ட மலை வாழை.' },
  { item: 'பழனி பஞ்சாமிர்தம்', district: 'திண்டுக்கல்', specialty: 'இயற்கை முறையில் தயாரிக்கப்படும் புவிசார் குறியீடு பெற்ற பிரசாதம்.' },
  { item: 'ஸ்ரீவில்லிபுத்தூர் பால்கோவா', district: 'விருதுநகர்', specialty: 'தூய பசும்பாலில் தயாரிக்கப்படும் பாரம்பரிய இனிப்பு.' }
];

const TRADITIONAL_ARTS = [
  {
    name: 'சிலம்பாட்டம் & வர்மக்கலை',
    origin: 'தமிழர் தற்காப்புக் கலை',
    desc: 'மூங்கில் கம்பைச் சுழற்றி உடலையும் மனதையும் ஒருமுகப்படுத்தும் ஆதிகாலத் தமிழர் வீரக்கலை.'
  },
  {
    name: 'ஜல்லிக்கட்டு (ஏறுதழுவுதல்)',
    origin: 'முல்லை நில வீர விளையாட்டு',
    desc: 'காங்கேயம், புலிக்குளம், உம்பளச்சேரி போன்ற நாட்டு மாடு இனங்களைப் பாதுகாக்கும் தமிழர் பாரம்பரியம்.'
  },
  {
    name: 'பறையாட்டம் & கரகாட்டம்',
    origin: 'தமிழர் நாட்டுப்புறக் கலைகள்',
    desc: 'தலையில் கரகம் ஏந்தி ஆடும் நடனமும், தமிழ் மண்ணின் ஆதி இசைக்கருவியான பறை இசையும்.'
  },
  {
    name: 'தெருக்கூத்து & பொம்மலாட்டம்',
    origin: 'கிராமிய நாடகக் கலை',
    desc: 'இதிகாசம் மற்றும் சமூக நீதிக் கதைகளை இசையோடு இரவு முழுவதும் நிகழ்த்தும் மக்கள் கலை.'
  }
];

const TAMIL_FESTIVALS = [
  {
    name: 'தைப் பொங்கல் (உழவர் திருநாள்)',
    month: 'தை மாதம் (ஜனவரி)',
    significance: 'சூரிய பகவானுக்கும், உழவுக்கு உதவும் கால்நடைகளுக்கும் (மாட்டுப் பொங்கல்), இயற்கைக்கும் நன்றி செலுத்தும் தமிழர் பெருவிழா.',
    rituals: 'புதுப்பானையில் பச்சரிசி, வெல்லம், நெய் இட்டுப் பொங்கல் வைத்தல், கோலமிடுதல், ஜல்லிக்கட்டு & காணும் பொங்கல் உறவுச் சந்திப்பு.'
  },
  {
    name: 'தமிழ்ப் புத்தாண்டு & சித்திரைத் திருவிழா',
    month: 'சித்திரை மாதம் (ஏப்ரல்)',
    significance: 'இளவேனில் காலத் தொடக்கம், மதுரை மீனாட்சி திருக்கல்யாணம், கள்ளழகர் வைகை ஆற்றில் இறங்கும் வைபவம்.',
    rituals: 'மா, பலா, வாழை (முக்கனி), வேப்பம்பூ பச்சடி (அறுசுவை) படைத்து புத்தாண்டை வரவேற்றல்.'
  },
  {
    name: 'ஆடிப் பெருக்கு & ஆடித் திருவிழாக்கள்',
    month: 'ஆடி மாதம் (ஜூலை - ஆகஸ்ட்)',
    significance: 'காவிரி, தாமிரபரணி, வைகை உள்ளிட்ட நதிகளில் புதுவெள்ளம் பெருக்கெடுத்து வரும் நன்றித் திருவிழா.',
    rituals: 'நதிக்கரை வழிபாடு, முளைப்பாரி எடுத்தல், கூழ் ஊற்றுதல் மற்றும் விதை விதைப்புத் தொடக்கம்.'
  },
  {
    name: 'திருக்கார்த்திகை தீபத் திருவிழா',
    month: 'கார்த்திகை மாதம் (நவம்பர் - டிசம்பர்)',
    significance: 'திருவண்ணாமலை மகாதீபம் மற்றும் வீடுகள்தோறும் அகல் விளக்கேற்றி இருளை நீக்கும் ஒளித் திருவிழா.',
    rituals: 'மண் அகல் விளக்குகள் ஏற்றுதல், நெல் பொரி உருண்டை & அப்பம் நைவேத்தியம்.'
  },
  {
    name: 'தைப்பூசம் & பங்குனி உத்திரம்',
    month: 'தை & பங்குனி மாதங்கள்',
    significance: 'முருகப் பெருமான் ஆலயங்களில் காவடி எடுத்தல், பாதயாத்திரை மற்றும் தெய்வத் திருக்கல்யாண வைபவங்கள்.',
    rituals: 'பால் குடம், காவடி ஆட்டம், அன்னதானம் மற்றும் கூட்டு வழிபாடு.'
  },
  {
    name: 'மார்கழி கோலங்கள் & திருப்பாவை / திருவெம்பாவை',
    month: 'மார்கழி மாதம் (டிசம்பர் - ஜனவரி)',
    significance: 'அதிகாலை ஓசோன் காற்றும், இசையும், வாசல் கோலங்களும் நிறைந்த ஆன்மீக & ஆரோக்கிய மாதம்.',
    rituals: 'அரிசி மாவு கோலமிடுதல் (எறும்பு, பறவைகளுக்கு உணவு), பஜனை மற்றும் பொங்கல் பிரசாதம்.'
  }
];

const FOOD_HABITS = [
  {
    title: 'வாழை இலை விருந்து & பரிமாறும் முறை',
    detail: 'வாழை இலையின் நுனி இடதுபுறம் இருக்க, உப்பு, ஊறுகாய், இனிப்பு, கூட்டு, பொரியல், சாதம், பருப்பு, நெய், சாம்பார், ரசம், மோர் என அறிவியல் வரிசையில் பரிமாறும் உயரிய பண்பாடு.'
  },
  {
    title: 'மண்பாண்டம் & மரச்செக்கு சமையல்',
    detail: 'மண்பானை சமையல் உணவின் சத்துக்களைப் பாதுகாக்கும்; மரச்செக்கு நல்லெண்ணெய், கடலெண்ணெய் மற்றும் தேங்காய் எண்ணெய் இதய ஆரோக்கியத்தைக் காக்கும்.'
  },
  {
    title: 'நீராகாரம் & பழைய சாதம் (இயற்கை புரோபயாடிக்)',
    detail: 'மண்பானையில் இரவு ஊறவைத்த பழைய சாதமும் நீராகாரமும் உடலுக்கு குளிர்ச்சியையும், வைட்டமின் B12 மற்றும் குடல் நன்மை செய்யும் பாக்டீரியாக்களையும் தருகிறது.'
  },
  {
    title: 'பருவகால உணவு ஒழுக்கம் (6 பருவங்கள்)',
    detail: 'வெயில் காலத்தில் கம்பங்கூழ், இளநீர், நீர்மோர்; மழை மற்றும் குளிர் காலத்தில் மிளகு ரசம், சுக்கு காபி, தூதுவளை துவையல் எனப் பருவத்திற்கேற்ற உணவு முறை.'
  }
];

const TRADITIONAL_LIFESTYLE = [
  {
    title: 'திண்ணை & விருந்தோம்பல் பண்பாடு',
    detail: 'முன்பின் தெரியாத வழிப்போக்கர்களும் இளைப்பாற வீட்டின் முன்புறம் திண்ணை கட்டி, தண்ணீரும் உணவும் வழங்கிய தமிழர் மனிதநேயம்.'
  },
  {
    title: 'ஏரி, குளம் & குடிமராமத்து நீர் மேலாண்மை',
    detail: 'மழைநீரைச் சேமிக்க சங்கிலித் தொடர் ஏரிகள், கண்மாய்கள், ஊருணிகள் அமைத்து ஊர் கூடித் தூர்வாரும் தற்சார்பு நீர் மேலாண்மை.'
  },
  {
    title: 'கூட்டுக் குடும்பம் & உறவுமுறை விழுமியங்கள்',
    detail: 'தாத்தா-பாட்டி கதைகள் மூலம் அறநெறிகளைக் கற்று, சுப-துக்க நிகழ்வுகளில் ஊரே ஒன்றாகத் துணை நிற்கும் சமூகப் பிணைப்பு.'
  },
  {
    title: 'இயற்கையோடு இணைந்த தற்சார்பு வாழ்வியல்',
    detail: 'வீட்டுத் தோட்டம், நாட்டு மாடு வளர்ப்பு, பனை ஓலை & மூங்கில் பொருட்கள் பயன்பாடு எனச் சுற்றுச்சூழலை மாசுபடுத்தாத பசுமை வாழ்க்கை.'
  }
];

const TAMIL_BABY_NAMES = [
  { name: 'அகிலன்', gender: 'ஆண்', initial: 'அ', meaning: 'உலகம் முழுவதையும் ஆள்பவன்' },
  { name: 'அறிவழகன்', gender: 'ஆண்', initial: 'அ', meaning: 'அறிவிலும் அழகிலும் சிறந்தவன்' },
  { name: 'அமுதன்', gender: 'ஆண்', initial: 'அ', meaning: 'அமிழ்தம் போன்ற இனியவன்' },
  { name: 'இளமாறன்', gender: 'ஆண்', initial: 'இ', meaning: 'இளமையான வீரன் / பாண்டிய மன்னன்' },
  { name: 'இனியவன்', gender: 'ஆண்', initial: 'இ', meaning: 'அனைவருக்கும் இனிமையானவன்' },
  { name: 'எழிலன்', gender: 'ஆண்', initial: 'எ', meaning: 'பேரழகு கொண்டவன்' },
  { name: 'கதிர்வேலன்', gender: 'ஆண்', initial: 'க', meaning: 'சூரிய ஒளி போன்ற பிரகாசமானவன்' },
  { name: 'கபிலன்', gender: 'ஆண்', initial: 'க', meaning: 'சங்ககாலப் பெரும்புலவர்' },
  { name: 'காவியன்', gender: 'ஆண்', initial: 'க', meaning: 'காவியம் போன்ற புகழ் கொண்டவன்' },
  { name: 'சிலம்பரசன்', gender: 'ஆண்', initial: 'சி', meaning: 'சிலம்பக் கலையில் சிறந்தவன்' },
  { name: 'செந்தமிழன்', gender: 'ஆண்', initial: 'செ', meaning: 'தூய தமிழ் போன்றவன்' },
  { name: 'தமிழ்ச்செல்வன்', gender: 'ஆண்', initial: 'த', meaning: 'தமிழையே செல்வமாகக் கொண்டவன்' },
  { name: 'திருமாவளவன்', gender: 'ஆண்', initial: 'தி', meaning: 'கரிகால் சோழனின் சிறப்புப் பெயர்' },
  { name: 'நெடுமாறன்', gender: 'ஆண்', initial: 'நெ', meaning: 'புகழ்மிக்க பெருவீரன்' },
  { name: 'பாரிவேந்தன்', gender: 'ஆண்', initial: 'பா', meaning: 'வள்ளல் பாரி போன்ற கொடையாளன்' },
  { name: 'மதிவாணன்', gender: 'ஆண்', initial: 'ம', meaning: 'நிலவு போன்ற குளிர்ச்சியான அறிவுடையவன்' },
  { name: 'முகிலன்', gender: 'ஆண்', initial: 'மு', meaning: 'மழைமேகம் போன்ற கருணையுள்ளவன்' },
  { name: 'யாழோன்', gender: 'ஆண்', initial: 'யா', meaning: 'யாழ் இசை வல்லவன்' },
  { name: 'வளவன்', gender: 'ஆண்', initial: 'வ', meaning: 'சோழ மன்னன் / வளம் மிக்கவன்' },
  { name: 'வெற்றிவேல்', gender: 'ஆண்', initial: 'வெ', meaning: 'எப்போதும் வெற்றி பெறுபவன்' },
  // பெண் குழந்தைகள்
  { name: 'அகிலா', gender: 'பெண்', initial: 'அ', meaning: 'உலகம் போற்றும் பெண்மணி' },
  { name: 'அமுதவல்லி', gender: 'பெண்', initial: 'அ', meaning: 'அமிழ்தம் போன்ற இனியவள்' },
  { name: 'அருள்மொழி', gender: 'பெண்', initial: 'அ', meaning: 'அருள் நிறைந்த சொல் பேசுபவள்' },
  { name: 'இனியாள்', gender: 'பெண்', initial: 'இ', meaning: 'அனைவருக்கும் இனிமையானவள்' },
  { name: 'இசைவாணி', gender: 'பெண்', initial: 'இ', meaning: 'இசையில் சிறந்தவள்' },
  { name: 'எழிலரசி', gender: 'பெண்', initial: 'எ', meaning: 'அழகின் அரசி' },
  { name: 'கயல்விழி', gender: 'பெண்', initial: 'க', meaning: 'கயல் மீன் போன்ற அழகிய கண்களை உடையவள்' },
  { name: 'கார்முகிலி', gender: 'பெண்', initial: 'க', meaning: 'கருமேகம் போன்ற கூந்தல் உடையவள்' },
  { name: 'காவியா', gender: 'பெண்', initial: 'க', meaning: 'இலக்கியக் காவியம் போன்றவள்' },
  { name: 'தமிழரசி', gender: 'பெண்', initial: 'த', meaning: 'தமிழ் மொழியின் அரசி' },
  { name: 'தேன்மொழி', gender: 'பெண்', initial: 'தே', meaning: 'தேன் போன்ற இனிய மொழி பேசுபவள்' },
  { name: 'நிலாவதி', gender: 'பெண்', initial: 'நி', meaning: 'நிலவு போன்ற ஒளி கொண்டவள்' },
  { name: 'பூங்குழலி', gender: 'பெண்', initial: 'பூ', meaning: 'மலர் சூடிய கூந்தல் உடையவள்' },
  { name: 'மதிவதனி', gender: 'பெண்', initial: 'ம', meaning: 'முழு நிலவு போன்ற ஒளிவீசும் முகம் கொண்டவள்' },
  { name: 'மலர்விழி', gender: 'பெண்', initial: 'ம', meaning: 'மலர் போன்ற கண்களை உடையவள்' },
  { name: 'யாழினி', gender: 'பெண்', initial: 'யா', meaning: 'யாழ் இசை போன்ற இனிமையானவள்' },
  { name: 'வளர்மதி', gender: 'பெண்', initial: 'வ', meaning: 'வளரும் பிறை நிலவு போன்றவள்' },
  { name: 'வெண்பா', gender: 'பெண்', initial: 'வெ', meaning: 'அழகிய தமிழ் இலக்கணப் பாடல்' }
];

const SIDDHA_HERBS_DIRECTORY = [
  { name: 'துளசி & கற்பூரவள்ளி', category: 'சுவாசம் & சளி', benefit: 'நெஞ்சுச் சளி, இருமல், தொண்டைக் கரகரப்பு மற்றும் நோய் எதிர்ப்பு சக்தியை அதிகரிக்க உதவும்.' },
  { name: 'ஆடாதொடை இலை', category: 'நுரையீரல் ஆரோக்கியம்', benefit: 'ஆஸ்துமா, மூச்சுத்திணறல் மற்றும் நாள்பட்ட சளியைக் கரைக்கும் சித்த மருத்துவ மூலிகை.' },
  { name: 'கீழாநெல்லி', category: 'கல்லீரல் பாதுகாப்பு', benefit: 'மஞ்சள் காமாலை மற்றும் கல்லீரல் செயல்பாட்டைச் சீராக்கும் மிகச்சிறந்த மூலிகை.' },
  { name: 'நிலவேம்பு குடிநீர்', category: 'காய்ச்சல் & எதிர்ப்பு சக்தி', benefit: 'வைரஸ் காய்ச்சல், உடல் வலி மற்றும் நோய் எதிர்ப்பு ஆற்றலை மேம்படுத்தும் கஷாயம்.' },
  { name: 'தூதுவளை', category: 'கபம் & குரல் வளம்', benefit: 'கபத்தை நீக்கி, குரல் வளத்தை மேம்படுத்தி, உடலுக்குப் பலம் தரும் காயகற்ப மூலிகை.' },
  { name: 'வல்லாரை கீரை', category: 'மூளை & நினைவாற்றல்', benefit: 'மாணவர்களின் நினைவாற்றல், கவனச்சிதறல் குறைப்பு மற்றும் நரம்பு மண்டல வலிமைக்குச் சிறந்தது.' },
  { name: 'கரிசலாங்கண்ணி (பிருங்கராஜ்)', category: 'கண் & கூந்தல்', benefit: 'கண் பார்வைத் திறன், முடி உதிர்வு தடுப்பு மற்றும் இரத்த சோகையைக் குறைக்க உதவும்.' },
  { name: 'சுக்கு, மிளகு, திப்பிலி (திரிகடுகம்)', category: 'செரிமானம் & வாயு', benefit: 'அஜீரணம், வயிற்று உப்புசம், பசியின்மை மற்றும் தொண்டை நோய்களைப் போக்கும்.' },
  { name: 'ஆவாரம்பூ', category: 'சர்க்கரை & சருமம்', benefit: 'இரத்த சர்க்கரை அளவைக் கட்டுப்படுத்தவும், சருமப் பொலிவு மற்றும் உடல் சூட்டைத் தணிக்கவும் உதவும்.' },
  { name: 'முடக்கத்தான் கீரை', category: 'மூட்டு வலி & வாதம்', benefit: 'கை, கால் மூட்டு வலி, வாத நோய்கள் மற்றும் உடல் பிடிப்புகளைக் குறைக்கும் பாரம்பரியக் கீரை.' },
  { name: 'திரிபலா சூரணம்', category: 'குடல் சுத்தம்', benefit: 'மலச்சிக்கலை நீக்கி, குடலைச் சுத்தப்படுத்தி, முதுமையைத் தடுக்கும் காயகற்ப மருந்து.' },
  { name: 'நன்னாரி வேர் & இளநீர்', category: 'உடல் குளிர்ச்சி', benefit: 'கோடை வெப்பம், சிறுநீர் எரிச்சல் மற்றும் பித்த சூட்டைத் தணிக்கும் இயற்கை பானம்.' }
];

const SIDDHA_TOPICS = [
  'சளி, இருமல் & சுவாச ஆரோக்கியத்திற்கான மூலிகைகள்',
  'செரிமானம், அஜீரணம் & வயிறு ஆரோக்கிய குறிப்புகள்',
  'உடல் சூடு தணிப்பு & கோடைகால உணவு முறை',
  'மூட்டு வலி & வாதம் குறைக்கும் பாரம்பரிய உணவுகள்',
  'நோய் எதிர்ப்பு சக்தி & காயகற்ப வாழ்வியல் முறைகள்',
  'தலைவலி, ஒற்றைத் தலைவலி & தூக்கமின்மை குறிப்புகள்',
  'வாய் புண், அல்சர் & குடல் ஆரோக்கிய உணவுகள்',
  'முடி உதிர்வு தடுப்பு & கூந்தல் பராமரிப்பு மூலிகைகள்',
  'கண் சோர்வு நீக்கம் & பார்வைத் திறன் உணவுகள்',
  'சர்க்கரை கட்டுப்பாடு & சிறுதானிய வாழ்வியல்'
];

const FALLBACK_SIDDHA_GUIDES = {
  'சளி, இருமல் & சுவாச ஆரோக்கியத்திற்கான மூலிகைகள்':
    `🌿 சளி, இருமல் & சுவாச ஆரோக்கியத்திற்கான சித்த மருத்துவக் குறிப்பு:\n\n1️⃣ சமையலறை & வீட்டு மூலிகைகள்:\n• துளசி, கற்பூரவள்ளி இலை, தூதுவளை இலை ஆகியவற்றைச் சுத்தம் செய்து மிளகு, சீரகம், சிறிது இஞ்சி சேர்த்து கஷாயமாகக் காய்ச்சி வெதுவெதுப்பாக அருந்தலாம்.\n• இரவு உறங்கும் முன் பாலில் சிறிது மஞ்சள் தூள் மற்றும் மிளகுத் தூள் சேர்த்துப் பருகுவது தொண்டை கரகரப்பைக் குறைக்கும்.\n\n2️⃣ உணவுப் பழக்கம்:\n• குளிர்ந்த நீர், ஐஸ்கிரீம் மற்றும் எண்ணெயில் பொரித்த உணவுகளைத் தவிர்த்து, மிளகு ரசம், சுக்கு மல்லி காபி சேர்த்துக் கொள்ளவும்.\n\n⚕️ பொது நலக் குறிப்பு: இது பாரம்பரிய உணவு மற்றும் வாழ்வியல் தகவல் மட்டுமே; தொடர்ந்து காய்ச்சல் அல்லது மூச்சுத்திணறல் இருந்தால் மருத்துவரை அணுகவும்.`,
  'செரிமானம், அஜீரணம் & வயிறு ஆரோக்கிய குறிப்புகள்':
    `🌿 செரிமானம் & வயிறு ஆரோக்கியத்திற்கான சித்த மருத்துவக் குறிப்பு:\n\n1️⃣ சமையலறை மூலிகைகள்:\n• சுக்கு, மிளகு, திப்பிலி (திரிகடுகம்) அல்லது சீரகம், ஓமம் ஆகியவற்றை வெந்நீரில் கொதிக்க வைத்து அருந்துவது வாயு மற்றும் அஜீரணத்தைக் குறைக்கும்.\n• உணவில் இஞ்சி, பூண்டு, பெருங்காயம் மற்றும் கறிவேப்பிலை சேர்ப்பது செரிமானத் தீயைச் சீராக்கும்.\n\n2️⃣ உணவுப் பழக்கம்:\n• "பசித்த பின் புசி" என்ற சித்த மருத்துவ விதிப்படி முன் உண்ட உணவு செரித்த பின்னரே அடுத்த உணவை உண்ணவும்.\n\n⚕️ பொது நலக் குறிப்பு: இது பாரம்பரிய வாழ்வியல் வழிகாட்டுதல் மட்டுமே; நாள்பட்ட வயிற்றுப் பிரச்சினைகளுக்கு மருத்துவர் ஆலோசனை அவசியம்.`,
  'உடல் சூடு தணிப்பு & கோடைகால உணவு முறை':
    `🌿 உடல் சூடு தணிப்பு & கோடைகால உணவு முறை:\n\n1️⃣ இயற்கை பானங்கள் & மூலிகைகள்:\n• நன்னாரி வேர் சர்பத், இளநீர், நீர்மோர் (இஞ்சி, கறிவேப்பிலை, பெருங்காயம் சேர்த்தது) மற்றும் பதநீர் ஆகியவை உடல் வெப்பத்தைச் சமநிலையில் வைக்கும்.\n• வெந்தயம் மற்றும் சீரகத்தை இரவு ஊறவைத்து காலையில் அந்த நீரை அருந்துவது பித்த சூட்டைக் குறைக்கும்.\n\n2️⃣ உணவுப் பழக்கம்:\n• பழைய சாதம் (நீராகாரம்), கேழ்வரகு கூழ், வெள்ளரி மற்றும் தர்பூசணி போன்ற நீர்ச்சத்துள்ள உணவுகளைச் சேர்த்துக் கொள்ளவும்.\n\n⚕️ பொது நலக் குறிப்பு: இது பாரம்பரிய உணவுத் தகவல் மட்டுமே; மருத்துவ ஆலோசனைக்கு மாற்றல்ல.`,
  'மூட்டு வலி & வாதம் குறைக்கும் பாரம்பரிய உணவுகள்':
    `🌿 மூட்டு வலி & வாதம் குறைக்கும் பாரம்பரிய உணவுகள்:\n\n1️⃣ பாரம்பரிய கீரைகள் & மூலிகைகள்:\n• முடக்கத்தான் கீரையை தோசை மாவில் அரைத்தோ அல்லது சூப் வைத்தோ வாரம் இருமுறை உணவில் சேர்ப்பது மூட்டுப் பிடிப்புகளைக் குறைக்க உதவும்.\n• பூண்டு, இஞ்சி, மஞ்சள் மற்றும் நல்லெண்ணெய் உணவுகள் வாத சமநிலைக்கு உதவும்.\n\n2️⃣ வாழ்வியல் முறை:\n• தினமும் காலை இளவெயிலில் நடைப்பிற்சி மற்றும் மிதமான உடற்பயிற்சி செய்வது மூட்டு நெகிழ்வுத்தன்மையை மேம்படுத்தும்.\n\n⚕️ பொது நலக் குறிப்பு: தீவிர மூட்டு வலி அல்லது வீக்கம் இருந்தால் தகுதிவாய்ந்த மருத்துவரின் ஆலோசனையைப் பெறவும்.`,
  'நோய் எதிர்ப்பு சக்தி & காயகற்ப வாழ்வியல் முறைகள்':
    `🌿 நோய் எதிர்ப்பு சக்தி & காயகற்ப வாழ்வியல் முறைகள்:\n\n1️⃣ காயகற்ப மூலிகைகள் & உணவுகள்:\n• நெல்லிக்காய், கடுக்காய், தான்றிக்காய் சேர்ந்த திரிபலா, நிலவேம்பு குடிநீர் மற்றும் அஸ்வகந்தா ஆகியவை சித்த மருத்துவத்தில் நோய் எதிர்ப்பு ஆற்றலுக்குப் போற்றப்படுகின்றன.\n• கேழ்வரகு, கம்பு, தினை, சாமை, வரகு ஆகிய சிறுதானியங்களை அன்றாட உணவில் சேர்ப்பது உடலுக்கு நீடித்த வலிமை தரும்.\n\n2️⃣ வாழ்வியல் ஒழுக்கம்:\n• அதிகாலை விழிப்பு, மூச்சுப் பயிற்சி (பிராணாயாமம்) மற்றும் அறுசுவை சமச்சீர் உணவு ஆகியவையே சித்தர்களின் காயகற்ப ரகசியம்.\n\n⚕️ பொது நலக் குறிப்பு: இது பொது நல வாழ்வியல் தகவல் மட்டுமே; நாள்பட்ட நோய்களுக்கு மருத்துவர் ஆலோசனை அவசியம்.`,
  'தலைவலி, ஒற்றைத் தலைவலி & தூக்கமின்மை குறிப்புகள்':
    `🌿 தலைவலி, ஒற்றைத் தலைவலி & தூக்கமின்மைக்கான பாட்டி வைத்தியம்:\n\n1️⃣ சமையலறை மூலிகைகள்:\n• சுக்குப் பொடியை சிறிது நீர் விட்டு அரைத்து நெற்றியில் பற்றுப் போடுவது நீர்க்கோவை தலைவலியைக் குறைக்கும்.\n• இரவு உறங்கும் முன் வெதுவெதுப்பான பாலில் சிறிது ஜாதிக்காய் பொடி அல்லது கசகசா அரைத்துச் சேர்த்து அருந்துவது ஆழ்ந்த உறக்கத்திற்கு உதவும்.\n\n2️⃣ வாழ்வியல் முறை:\n• வாரம் இருமுறை நல்லெண்ணெய் தேய்த்துக் குளிப்பது (எண்ணெய்க் குளியல்) உடல் உஷ்ணத்தைத் தணித்து நரம்புகளை அமைதிப்படுத்தும்.\n\n⚕️ பொது நலக் குறிப்பு: தொடர்ந்து கடுமையான தலைவலி இருந்தால் மருத்துவரை அணுகவும்.`,
  'வாய் புண், அல்சர் & குடல் ஆரோக்கிய உணவுகள்':
    `🌿 வாய் புண், அல்சர் & குடல் ஆரோக்கிய உணவுகள்:\n\n1️⃣ பாரம்பரிய மூலிகைகள்:\n• மணத்தக்காளி கீரை சூப் அல்லது பொரியல், தேங்காய்ப் பால் மற்றும் அகத்திக்கீரை (மாதம் இருமுறை) ஆகியவை வாய் மற்றும் வயிற்றுப் புண்களை ஆற்றும்.\n• அதிமதுரப் பொடியை தேன் அல்லது வெந்நீரில் கலந்து உட்கொள்வது தொண்டை மற்றும் வயிற்று எரிச்சலைக் குறைக்கும்.\n\n2️⃣ உணவுப் பழக்கம்:\n• காரம், புளிப்பு மற்றும் எண்ணெய் உணவுகளைக் குறைத்து, மோர் சாதம், வாழைப்பழம் சேர்த்துக் கொள்ளவும்.\n\n⚕️ பொது நலக் குறிப்பு: நாள்பட்ட வயிற்று வலிக்கு மருத்துவர் ஆலோசனை அவசியம்.`,
  'முடி உதிர்வு தடுப்பு & கூந்தல் பராமரிப்பு மூலிகைகள்':
    `🌿 முடி உதிர்வு தடுப்பு & கூந்தல் பராமரிப்பு மூலிகைகள்:\n\n1️⃣ பாரம்பரிய மூலிகைகள்:\n• கரிசலாங்கண்ணி, நெல்லிக்காய், செம்பருத்தி இலை, மருதாணி மற்றும் வெந்தயம் சேர்த்துக் காய்ச்சிய தேங்காய் எண்ணெய் கூந்தல் வேர்களை வலுப்படுத்தும்.\n• சீயக்காய், பூந்திக்கொட்டை மற்றும் வெந்தயம் அரைத்துத் தலைக்குக் குளிப்பது இயற்கை பொலிவைத் தரும்.\n\n2️⃣ உணவுப் பழக்கம்:\n• கறிவேப்பிலை துவையல், முருங்கைக்கீரை, எள்ளுருண்டை மற்றும் நெல்லிக்காய் உணவில் சேர்ப்பது இரும்புச்சத்தை அதிகரிக்கும்.\n\n⚕️ பொது நலக் குறிப்பு: இது பாரம்பரிய பராமரிப்புத் தகவல் மட்டுமே.`,
  'கண் சோர்வு நீக்கம் & பார்வைத் திறன் உணவுகள்':
    `🌿 கண் சோர்வு நீக்கம் & பார்வைத் திறன் உணவுகள்:\n\n1️⃣ மூலிகை & உணவுகள்:\n• பொன்னாங்கண்ணி கீரை, முருங்கைக்கீரை, கேரட் மற்றும் பசு நெய் ஆகியவை கண் நரம்புகளுக்கு வலு சேர்க்கும்.\n• திரிபலா பொடியை இரவு ஊறவைத்து, காலையில் தெளிந்த நீரால் கண்களைக் கழுவுவது கண் எரிச்சலைக் குறைக்கும்.\n\n2️⃣ வாழ்வியல் குறிப்பு:\n• மொபைல் மற்றும் கம்ப்யூட்டர் திரையைப் பார்ப்பவர்கள் 20 நிமிடத்திற்கு ஒருமுறை பசுமையான மரங்களைப் பார்ப்பது கண் சோர்வை நீக்கும்.\n\n⚕️ பொது நலக் குறிப்பு: கண் பார்வைக் குறைபாடுகளுக்கு கண் மருத்துவரை அணுகவும்.`,
  'சர்க்கரை கட்டுப்பாடு & சிறுதானிய வாழ்வியல்':
    `🌿 சர்க்கரை கட்டுப்பாடு & சிறுதானிய வாழ்வியல்:\n\n1️⃣ மூலிகைகள் & உணவுகள்:\n• ஆவாரம்பூ கஷாயம், நாவல் கொட்டைப் பொடி, வெந்தயம் மற்றும் கோவைக்காய் ஆகியவை பாரம்பரிய உணவில் முக்கியப் பங்கு வகிக்கின்றன.\n• வெள்ளை அரிசிக்குப் பதிலாக வரகு, சாமை, குதிரைவாலி, கம்பு மற்றும் கேழ்வரகு ஆகியவற்றைச் சுழற்சி முறையில் உணவில் சேர்க்கலாம்.\n\n2️⃣ வாழ்வியல் ஒழுக்கம்:\n• தினமும் 30 நிமிட நடைப்பயிற்சி மற்றும் இரவு உணவை 8 மணிக்குள் முடிப்பது சர்க்கரை அளவைச் சீராக வைக்க உதவும்.\n\n⚕️ பொது நலக் குறிப்பு: சர்க்கரை நோயாளிகள் மருத்துவர் பரிந்துரைத்த மருந்துகளை நிறுத்தாமல் ஆலோசனையுடன் உணவு முறையைப் பின்பற்றவும்.`
};

export default function TamilHeritageModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('ai_heritage');
  const [selectedDistrict, setSelectedDistrict] = useState('காஞ்சிபுரம்');
  const [selectedTopic, setSelectedTopic] = useState(HERITAGE_TOPICS[0]);
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // சித்த மருத்துவம் & Custom Symptom Search
  const [herbSearch, setHerbSearch] = useState('');
  const [customRemedyQuery, setCustomRemedyQuery] = useState('');
  const [selectedSiddhaTopic, setSelectedSiddhaTopic] = useState(SIDDHA_TOPICS[0]);
  const [siddhaAiResponse, setSiddhaAiResponse] = useState(FALLBACK_SIDDHA_GUIDES[SIDDHA_TOPICS[0]]);
  const [isSiddhaLoading, setIsSiddhaLoading] = useState(false);
  const [prakritiType, setPrakritiType] = useState('vata');

  // திருக்குறள் & தமிழ்ப் பெயர் தேடல் + AI Name Generator
  const [kuralIndex, setKuralIndex] = useState(0);
  const [nameGender, setNameGender] = useState('அனைத்தும்');
  const [nameSearch, setNameSearch] = useState('');
  const [selectedInitial, setSelectedInitial] = useState('அனைத்தும்');
  const [customNamePrompt, setCustomNamePrompt] = useState('');
  const [aiGeneratedNames, setAiGeneratedNames] = useState('');
  const [isNameLoading, setIsNameLoading] = useState(false);

  const [artistForm, setArtistForm] = useState({
    name: '',
    phone: '',
    district: '',
    category: 'சிலம்பம் / தற்காப்புக் கலை பயிற்சி',
    note: ''
  });

  const currentKural = useMemo(() => {
    return THIRUKKURAL_GEMS[kuralIndex % THIRUKKURAL_GEMS.length];
  }, [kuralIndex]);

  const filteredHerbs = useMemo(() => {
    const q = herbSearch.trim().toLowerCase();
    if (!q) return SIDDHA_HERBS_DIRECTORY;
    return SIDDHA_HERBS_DIRECTORY.filter(
      (h) => h.name.toLowerCase().includes(q) || h.category.toLowerCase().includes(q) || h.benefit.toLowerCase().includes(q)
    );
  }, [herbSearch]);

  const availableInitials = useMemo(() => {
    const set = new Set(TAMIL_BABY_NAMES.map((n) => n.initial));
    return ['அனைத்தும்', ...Array.from(set)];
  }, []);

  const filteredNames = useMemo(() => {
    return TAMIL_BABY_NAMES.filter((n) => {
      const genderMatch = nameGender === 'அனைத்தும்' || n.gender === nameGender;
      const initialMatch = selectedInitial === 'அனைத்தும்' || n.initial === selectedInitial;
      const q = nameSearch.trim().toLowerCase();
      const searchMatch = !q || n.name.toLowerCase().includes(q) || n.meaning.toLowerCase().includes(q);
      return genderMatch && initialMatch && searchMatch;
    });
  }, [nameGender, selectedInitial, nameSearch]);

  const handleExploreHeritageAi = async (overrideTopic = null) => {
    const topicToSearch = overrideTopic || selectedTopic;
    const instantFallback =
      `🏛️ ${selectedDistrict} மாவட்டம் — ${topicToSearch}\n\n` +
      `1️⃣ வரலாற்றுப் பின்னணி:\n${selectedDistrict} மாவட்டம் பண்டைய மூவேந்தர்கள் மற்றும் பல்லவ, நாயக்க மன்னர்களின் ஆட்சிக் காலத்தில் முக்கிய வணிக மற்றும் பண்பாட்டு மையமாகத் திகழ்ந்துள்ளது. இங்குள்ள பழமையான கல்வெட்டுகளும் திருக்கோயில்களும் தமிழர்களின் கட்டிடக்கலை மற்றும் நீர் மேலாண்மை அறிவுக்குச் சான்றாக உள்ளன.\n\n` +
      `2️⃣ பண்பாடு & புவிசார் சிறப்புகள்:\nஇம்மாவட்டத்தின் பாரம்பரிய கைத்தொழில்கள், கிராமிய நாட்டுப்புறக் கலைகள் மற்றும் உள்ளூர் திருவிழாக்கள் தலைமுறை தலைமுறையாகத் தமிழர் அடையாளத்தைப் பாதுகாத்து வருகின்றன.\n\n` +
      `3️⃣ முக்கிய பெருமைகள்:\n• தொன்மையான கோவில் சிற்பங்கள் மற்றும் ஏரி/குள நீர் மேலாண்மை அமைப்புகள்.\n• பாரம்பரிய உணவு வகைகள் மற்றும் கைவினைப் பொருட்கள்.\n• செம்மொழித் தமிழ் இலக்கியம் மற்றும் நாட்டுப்புறக் கலைஞர்களின் பங்களிப்பு.`;

    setAiResponse(instantFallback);
    setIsAiLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch('/api/polish-petition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          formData: {
            applicantName: 'தமிழ் ஆர்வலர்',
            taluk: selectedDistrict,
            district: selectedDistrict,
            subject: `${selectedDistrict} மாவட்டம் - ${topicToSearch}`
          },
          selectedForm: '360 Tamil Nadu Heritage & History Explorer',
          applicationMode: 'education',
          customNote: `தமிழ்நாட்டின் "${selectedDistrict}" மாவட்டத்தின் "${topicToSearch}" குறித்து வரலாற்று ஆதாரங்களுடன் விரிவாக விளக்கு.`
        })
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data.polishedText) setAiResponse(data.polishedText);
      }
    } catch (err) {
      // Fallback already displayed
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleExploreSiddhaAi = async (overrideTopic = null) => {
    const topic = (overrideTopic || selectedSiddhaTopic).trim();
    if (!topic) return;
    setSelectedSiddhaTopic(topic);
    setIsSiddhaLoading(true);

    const instantGuide =
      FALLBACK_SIDDHA_GUIDES[topic] ||
      `🌿 "${topic}" — பாரம்பரிய சித்த மருத்துவம் & சமையலறை மூலிகை வழிகாட்டி:\n\n` +
      `1️⃣ சமையலறை மூலிகைகள்:\n• துளசி, இஞ்சி, பூண்டு, மிளகு, சீரகம், மஞ்சள், வெந்தயம் மற்றும் கறிவேப்பிலை ஆகியவை அன்றாட உணவில் நோய் எதிர்ப்பு சக்தியையும் உடல் சமநிலையையும் காக்கும்.\n• காலையில் வெறும் வயிற்றில் வெதுவெதுப்பான நீர் அல்லது சீரகத் தண்ணீர் அருந்துவது உடலின் நச்சுக்களை வெளியேற்ற உதவும்.\n\n` +
      `2️⃣ உணவு & வாழ்வியல் முறை:\n• சிறுதானியங்கள் (கேழ்வரகு, கம்பு, தினை, சாமை), பச்சைக் காய்கறிகள் மற்றும் கீரைகளை உணவில் சேர்த்து, எண்ணெய் மற்றும் செயற்கை உணவுகளைத் தவிர்க்கவும்.\n\n` +
      `⚕️ பொது நலக் குறிப்பு: இது பாரம்பரிய உணவு மற்றும் வாழ்வியல் வழிகாட்டுதல் மட்டுமே; நாள்பட்ட அல்லது தீவிர உடல்நலக் குறைபாடுகளுக்குப் பதிவுபெற்ற சித்த மருத்துவர் அல்லது தகுதிவாய்ந்த மருத்துவரை அணுகவும்.`;

    setSiddhaAiResponse(instantGuide);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch('/api/polish-petition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          formData: {
            applicantName: 'ஆரோக்கிய ஆர்வலர்',
            taluk: selectedDistrict,
            district: selectedDistrict,
            subject: `சித்த மருத்துவம் - ${topic}`
          },
          selectedForm: 'Traditional Tamil Siddha & Herbal Wellness Guide',
          applicationMode: 'education',
          customNote: `தமிழர் பாரம்பரிய சித்த மருத்துவம் மற்றும் உணவு முறைப்படி "${topic}" குறித்து தெளிவான வாழ்வியல் வழிகாட்டுதல் வழங்கு.`
        })
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data.polishedText) setSiddhaAiResponse(data.polishedText);
      }
    } catch (err) {
      // Fallback already shown
    } finally {
      setIsSiddhaLoading(false);
    }
  };

  const handleGenerateCustomNames = async () => {
    const query = customNamePrompt.trim() || 'இயற்கை & சங்கத் தமிழ் சார்ந்த குழந்தைப் பெயர்கள்';
    setIsNameLoading(true);
    setAiGeneratedNames(
      `👶 "${query}" — பரிந்துரைக்கப்படும் தூய தமிழ்ப் பெயர்கள்:\n\n` +
      `• ஆண் குழந்தைகள்: தமிழ்ச்சுடர் (தமிழின் ஒளி), கதிர்மதி (சூரியனும் நிலவும்), இளவேந்தன் (இளம் அரசன்), அருள்செல்வன் (அருள் நிறைந்தவன்), யாழ்வேந்தன் (இசை அரசன்).\n` +
      `• பெண் குழந்தைகள்: தமிழ்ச்சோலை (தமிழ்ப் பூங்கா), கயல்மதி (மீன் போன்ற விழியும் நிலவு முகமும்), இசைமலர் (இசையும் மலரும்), அருள்விழி (கருணைப் பார்வை), வெண்மதி (தூய நிலவு).`
    );
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch('/api/polish-petition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          formData: {
            applicantName: 'பெற்றோர்',
            taluk: selectedDistrict,
            district: selectedDistrict,
            subject: `தூய தமிழ்ப் பெயர் சூட்டல் - ${query}`
          },
          selectedForm: 'Pure Tamil Baby Name Generator',
          applicationMode: 'education',
          customNote: `"${query}" என்ற விருப்பத்திற்கு ஏற்ப 5 ஆண் குழந்தை தூய தமிழ்ப் பெயர்களும், 5 பெண் குழந்தை தூய தமிழ்ப் பெயர்களும் அவற்றின் அழகான தமிழ் அர்த்தத்துடன் வழங்கு.`
        })
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data.polishedText) setAiGeneratedNames(data.polishedText);
      }
    } catch (err) {
      // Instant fallback shown
    } finally {
      setIsNameLoading(false);
    }
  };

  const handleShareWhatsApp = (text) => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n\n— நம்ம பூமி 360° தமிழர் மரபு மையம்')}`, '_blank');
  };

  const handleArtistConnect = (e) => {
    e.preventDefault();
    if (!artistForm.phone || artistForm.phone.length < 10) {
      alert('தயவுசெய்து சரியான 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்.');
      return;
    }
    const msg = `வணக்கம் நம்ம பூமி 360! நான் தமிழர் மரபு, சித்த மருத்துவம் & பாரம்பரியக் கலைகள் பிரிவில் இணைய / விவரம் பெற விரும்புகிறேன்.\n\n👤 பெயர்: ${artistForm.name || '-'}\n📱 எண்: ${artistForm.phone}\n📍 மாவட்டம்: ${artistForm.district || selectedDistrict}\n🎭 பிரிவு: ${artistForm.category}\n📝 குறிப்பு: ${artistForm.note || 'மேலும் விவரம் தேவை'}`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="w-full space-y-8 text-left">
      {/* 1. முதன்மை பேனர் */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-red-950/60 via-slate-900/95 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/40 rounded-full">
              யாதும் ஊரே யாவரும் கேளிர் • தமிழர் வாழ்வியல் களஞ்சியம் 360°
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2 flex items-center gap-2">
              <span>🏛️</span> தமிழர் மரபு, உணவுப் பண்பாடு, திருவிழாக்கள் & சித்த மருத்துவம்
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              38 மாவட்ட வரலாறு, பாரம்பரிய உணவுப் பழக்கம், திருவிழாக் கொண்டாட்டங்கள், தமிழர் வாழ்க்கை முறை, சித்த மருத்துவம் & திருக்குறள் ஞானம்.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-950/90 px-4 py-3 rounded-xl border border-amber-500/30">
            <span className="text-3xl">🪔</span>
            <div className="text-xs">
              <span className="text-amber-400 font-bold block">செம்மொழித் தமிழ் மரபு</span>
              <span className="text-slate-100 text-[11px]">3,000+ ஆண்டுகள் தொன்மையான வாழ்வியல்</span>
            </div>
          </div>
        </div>

        {/* 2. நேவிகேஷன் டேப்கள் */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('ai_heritage')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ai_heritage' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🤖 1. 38-மாவட்ட வரலாறு & மரபு
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lifestyle_food')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'lifestyle_food' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🍛 2. உணவுப் பழக்கம் & வாழ்க்கை முறை
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('festivals')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'festivals' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🎉 3. திருவிழாக் கொண்டாட்டங்கள்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('siddha')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'siddha' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🌿 4. சித்த மருத்துவம் & பாட்டி வைத்தியம்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kural_names')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'kural_names' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            📜 5. திருக்குறள் & தமிழ்ப் பெயர்கள் (40+)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('archaeology_arts')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'archaeology_arts' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🏺 6. கீழடி, கலைகள் & GI Tags
          </button>
        </div>

        {/* 3. டேப் உள்ளடக்கங்கள் */}
        <div className="mt-6">
          {/* TAB 1: 38 மாவட்ட வரலாறு & மரபு AI Explorer */}
          {activeTab === 'ai_heritage' && (
            <div className="space-y-5">
              <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-amber-400">
                      🤖 தமிழ்நாடு 38 மாவட்ட வரலாறு, கல்வெட்டு & மரபு ஆய்வாளர் (AI Explorer)
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      உங்கள் மாவட்டத்தைத் தேர்வு செய்து, அதன் சங்ககாலப் பெருமை, கலைகள் மற்றும் புவிசார் சிறப்புகளை அறிந்து கொள்ளுங்கள்.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleExploreHeritageAi()}
                    disabled={isAiLoading}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg cursor-pointer shrink-0"
                  >
                    {isAiLoading ? 'வரலாறு ஆய்வு செய்யப்படுகிறது... ⚡' : `✨ ${selectedDistrict} மரபு வரலாறு காண்க`}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-amber-400 font-bold block mb-1">1. மாவட்டம் தேர்வு செய்க (38 மாவட்டங்கள்):</label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full bg-slate-900 border border-amber-500/40 rounded-xl px-3 py-2 text-white font-bold"
                    >
                      {TN_38_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>{dist} மாவட்டம்</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-emerald-400 font-bold block mb-1">2. ஆய்வுத் தலைப்பு தேர்வு செய்க:</label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl px-3 py-2 text-white font-bold"
                    >
                      {HERITAGE_TOPICS.map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-[11px]">
                  {HERITAGE_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {
                        setSelectedTopic(topic);
                        handleExploreHeritageAi(topic);
                      }}
                      className={`px-3 py-1 rounded-lg border transition cursor-pointer font-semibold ${
                        selectedTopic === topic
                          ? 'bg-amber-600 text-white border-amber-400'
                          : 'bg-slate-900 hover:bg-amber-950 text-amber-300 border-slate-700'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                {aiResponse && (
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-slate-100 whitespace-pre-line leading-relaxed space-y-3">
                    <div>{aiResponse}</div>
                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(aiResponse)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold cursor-pointer"
                    >
                      📲 வாட்ஸ்அப்பில் பகிர்க
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: உணவுப் பழக்கவழக்கம் & பாரம்பரிய வாழ்க்கை முறை */}
          {activeTab === 'lifestyle_food' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider mb-3">
                  🍛 தமிழர் பாரம்பரிய உணவுப் பழக்கவழக்கம் & விருந்தோம்பல்
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FOOD_HABITS.map((food, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-1.5">
                      <h4 className="text-sm font-black text-white">🍲 {food.title}</h4>
                      <p className="text-xs text-slate-200 leading-relaxed">{food.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wider mb-3">
                  🏡 தமிழர் பாரம்பரிய வாழ்க்கை முறை & சமூக விழுமியங்கள்
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TRADITIONAL_LIFESTYLE.map((life, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-1.5">
                      <h4 className="text-sm font-black text-emerald-300">🌿 {life.title}</h4>
                      <p className="text-xs text-slate-200 leading-relaxed">{life.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  👅 அறுசுவை உணவு & உடல் நலத் தொடர்பு
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="font-bold text-amber-300 block">1. இனிப்பு</span>
                    <span className="text-[11px] text-slate-300">தசை வளர்ச்சி & ஆற்றல் (பனை வெல்லம், பழங்கள்)</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="font-bold text-emerald-300 block">2. புளிப்பு</span>
                    <span className="text-[11px] text-slate-300">உணவு செரிமானம் & பசித் தூண்டல் (எலுமிச்சை, புளி)</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="font-bold text-sky-300 block">3. உப்பு</span>
                    <span className="text-[11px] text-slate-300">உடல் நீர் சமநிலை & உமிழ்நீர் சுரப்பு (கல் உப்பு)</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="font-bold text-red-300 block">4. கார்ப்பு</span>
                    <span className="text-[11px] text-slate-300">சளி நீக்கம் & இரத்த ஓட்டம் (மிளகு, இஞ்சி, பூண்டு)</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="font-bold text-lime-300 block">5. கசப்பு</span>
                    <span className="text-[11px] text-slate-300">இரத்த சுத்திகரிப்பு & நோய் எதிர்ப்பு (வேப்பம்பூ, பாகற்காய்)</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="font-bold text-purple-300 block">6. துவர்ப்பு</span>
                    <span className="text-[11px] text-slate-300">இரத்தக் கசிவு தடுப்பு & குடல் பலம் (வாழைப்பூ, நெல்லிக்காய்)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: தமிழர் திருவிழாக் கொண்டாட்டங்கள் */}
          {activeTab === 'festivals' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-amber-400">🎉 தமிழர் திருவிழாக் கொண்டாட்டங்கள் & பண்பாட்டுப் பெருவிழாக்கள்</h3>
                  <p className="text-xs text-slate-300">இயற்கை, உழவு, உறவு மற்றும் ஆன்மீகத்தைக் கொண்டாடும் தமிழ் மண்ணின் பெருவிழாக்கள்.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 text-[11px] font-bold border border-amber-500/30 shrink-0">
                  12 தமிழ் மாதங்கள் • 6 பருவங்கள்
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TAMIL_FESTIVALS.map((fest, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition space-y-2.5">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-black text-white">🎊 {fest.name}</h4>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/30 rounded shrink-0">
                        {fest.month}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">{fest.significance}</p>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-emerald-300">
                      🪔 <strong>கொண்டாட்ட முறை:</strong> {fest.rituals}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: சித்த மருத்துவம், உடல் வாகு & 10+ பாட்டி வைத்திய வழிகாட்டி */}
          {activeTab === 'siddha' && (
            <div className="space-y-6">
              {/* 4A. Interactive உடல் வாகு கணிப்பான் */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/40 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-black text-amber-400">
                      🧬 உங்கள் சித்த உடல் வாகு (வாதம் / பித்தம் / கபம்) & உணவுப் பரிந்துரை
                    </h3>
                    <p className="text-xs text-slate-300">உங்கள் உடல் தன்மையைத் தேர்ந்தெடுத்து, உங்களுக்கு ஏற்ற உணவு முறையைப் பாருங்கள்:</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPrakritiType('vata')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        prakritiType === 'vata' ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'
                      }`}
                    >
                      💨 வாத உடல்
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrakritiType('pitta')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        prakritiType === 'pitta' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'
                      }`}
                    >
                      🔥 பித்த உடல்
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrakritiType('kapha')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        prakritiType === 'kapha' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'
                      }`}
                    >
                      💧 கப உடல்
                    </button>
                  </div>
                </div>

                {prakritiType === 'vata' && (
                  <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 text-xs text-slate-100 space-y-1.5">
                    <div className="font-bold text-sky-300">💨 வாத உடல் வாகு (காற்றுத் தன்மை — மெலிந்த உடல், சுறுசுறுப்பான மனம்):</div>
                    <p>• <strong>சேர்க்க வேண்டியவை:</strong> வெதுவெதுப்பான உணவுகள், நெய், நல்லெண்ணெய், பூண்டு, இஞ்சி, உளுந்து, முடக்கத்தான் கீரை & சூடான பால்.</p>
                    <p>• <strong>குறைக்க வேண்டியவை:</strong> குளிர்ந்த நீர், உலர்ந்த நொறுக்குத் தீனிகள் மற்றும் இரவு கண் விழித்தல்.</p>
                  </div>
                )}
                {prakritiType === 'pitta' && (
                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-slate-100 space-y-1.5">
                    <div className="font-bold text-red-300">🔥 பித்த உடல் வாகு (நெருப்புத் தன்மை — அதிக பசி, உடல் வெப்பம், கூர்மையான அறிவு):</div>
                    <p>• <strong>சேர்க்க வேண்டியவை:</strong> இளநீர், நீர்மோர், நன்னாரி, நெல்லிக்காய், கீழாநெல்லி, வெள்ளரி, வெந்தயம் & பசு நெய்.</p>
                    <p>• <strong>குறைக்க வேண்டியவை:</strong> அதிக காரம், புளிப்பு, எண்ணெயில் பொரித்த உணவுகள் மற்றும் கடும் வெயில் அலைச்சல்.</p>
                  </div>
                )}
                {prakritiType === 'kapha' && (
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-100 space-y-1.5">
                    <div className="font-bold text-emerald-300">💧 கப உடல் வாகு (நீர் & நிலத் தன்மை — திடமான உடல், அமைதியான குணம்):</div>
                    <p>• <strong>சேர்க்க வேண்டியவை:</strong> மிளகு, சுக்கு, திப்பிலி, துளசி, கற்பூரவள்ளி, தூதுவளை, கொள்ளு, சிறுதானியங்கள் & தேன்.</p>
                    <p>• <strong>குறைக்க வேண்டியவை:</strong> அதிக இனிப்பு, தயிர், பகல் தூக்கம் மற்றும் குளிர்சாதனப் பெட்டி உணவுகள்.</p>
                  </div>
                )}
              </div>

              {/* 4B. 10 தலைப்புகள் + Custom Symptom Search பாட்டி வைத்திய வழிகாட்டி */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/40 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-emerald-400">
                      🌿 சமையலறை மூலிகை & பாட்டி வைத்திய வழிகாட்டி (10 பிரிவுகள் + நேரடித் தேடல்)
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      கீழே உள்ள 10 தலைப்புகளில் ஒன்றைத் தேர்வு செய்யலாம் அல்லது உங்கள் தேவையை டைப் செய்து உடனடி மூலிகைக் குறிப்பு பெறலாம்.
                    </p>
                  </div>
                </div>

                {/* Custom Search Bar for Any Health/Herbal Query */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="உங்கள் தேவையை எழுதுங்கள் (எ.கா: தொண்டை வலி, பொடுகு, உடல் எடை, சர்க்கரை)..."
                    value={customRemedyQuery}
                    onChange={(e) => setCustomRemedyQuery(e.target.value)}
                    className="flex-1 bg-slate-900 border border-emerald-500/40 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleExploreSiddhaAi(customRemedyQuery || selectedSiddhaTopic)}
                    disabled={isSiddhaLoading}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg cursor-pointer shrink-0"
                  >
                    {isSiddhaLoading ? 'தயாராகிறது... 🌿' : '✨ மூலிகைக் குறிப்பு பெறுக'}
                  </button>
                </div>

                {/* 10 Curated Quick Topics */}
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {SIDDHA_TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleExploreSiddhaAi(t)}
                      className={`px-3 py-1.5 rounded-lg border transition cursor-pointer font-semibold ${
                        selectedSiddhaTopic === t
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-slate-900 hover:bg-emerald-950 text-emerald-300 border-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {siddhaAiResponse && (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-slate-100 whitespace-pre-line leading-relaxed space-y-3">
                    <div>{siddhaAiResponse}</div>
                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(siddhaAiResponse)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold cursor-pointer"
                    >
                      📲 இக்குறிப்பை வாட்ஸ்அப்பில் பகிர்க
                    </button>
                  </div>
                )}
              </div>

              {/* 4C. 12 முக்கிய சித்த மருத்துவ மூலிகைகள் & தேடல் */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    🌱 12 முக்கிய தமிழ் மூலிகைகள் & மருத்துவப் பயன்கள் ({filteredHerbs.length})
                  </h4>
                  <input
                    type="text"
                    placeholder="🔍 மூலிகை அல்லது பயன் தேடுக (எ.கா: சளி, சர்க்கரை, கண்)..."
                    value={herbSearch}
                    onChange={(e) => setHerbSearch(e.target.value)}
                    className="bg-slate-900 border border-emerald-500/40 rounded-lg px-3 py-1.5 text-xs text-white w-full sm:w-72 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {filteredHerbs.map((herb, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-black text-white text-sm">🌿 {herb.name}</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded shrink-0">
                          {herb.category}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{herb.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 text-[11px] text-slate-300">
                ⚕️ <strong>பொது நலக் குறிப்பு:</strong> இங்கு கொடுக்கப்பட்டுள்ளவை தமிழர் பாரம்பரிய சித்த மருத்துவம் மற்றும் உணவு வாழ்வியல் தகவல்கள் மட்டுமே; நாள்பட்ட உடல்நலக் குறைபாடுகளுக்குப் பதிவுபெற்ற சித்த மருத்துவர் அல்லது தகுதிவாய்ந்த மருத்துவரின் ஆலோசனையைப் பெறுவது அவசியம்.
              </div>
            </div>
          )}

          {/* TAB 5: திருக்குறள் & 38+ தூய தமிழ்ப் பெயர் களஞ்சியம் + AI Name Generator */}
          {activeTab === 'kural_names' && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/40 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 text-xs font-bold bg-amber-950 text-amber-300 border border-amber-500/30 rounded-full">
                    📜 {currentKural.number} • அதிகாரம்: {currentKural.adhigaram}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(`📜 ${currentKural.number} (${currentKural.adhigaram}):\n${currentKural.kural}\n\n💡 பொருள்: ${currentKural.meaning}`)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                    >
                      📲 பகிர்க
                    </button>
                    <button
                      type="button"
                      onClick={() => setKuralIndex((prev) => prev + 1)}
                      className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold cursor-pointer"
                    >
                      அடுத்த குறள் ➔
                    </button>
                  </div>
                </div>

                <pre className="text-base md:text-lg font-black text-amber-300 font-sans whitespace-pre-line leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                  {currentKural.kural}
                </pre>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-1">💡 தெளிவுரை:</span>
                    <p className="text-slate-100 leading-relaxed">{currentKural.meaning}</p>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-sky-400 font-bold block mb-1">🚀 இன்றைய வாழ்க்கை & தொழில் பாடம்:</span>
                    <p className="text-slate-100 leading-relaxed">{currentKural.lifeTip}</p>
                  </div>
                </div>
              </div>

              {/* AI குழந்தைப் பெயர் உருவாக்கி */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/40 space-y-3">
                <h4 className="text-sm font-black text-emerald-400">
                  ✨ AI தூய தமிழ்ப் பெயர் உருவாக்கி (நட்சத்திரம் / முதல் எழுத்து அடிப்படையில்)
                </h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="எ.கா: 'க' வரிசை ஆண் குழந்தை பெயர் / அஸ்வினி நட்சத்திரம் / இயற்கை சார்ந்த பெயர்..."
                    value={customNamePrompt}
                    onChange={(e) => setCustomNamePrompt(e.target.value)}
                    className="flex-1 bg-slate-900 border border-emerald-500/40 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateCustomNames}
                    disabled={isNameLoading}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shrink-0"
                  >
                    {isNameLoading ? 'பெயர்கள் உருவாகின்றன... ✨' : '👶 புதிய பெயர்கள் உருவாக்கு'}
                  </button>
                </div>
                {aiGeneratedNames && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-100 whitespace-pre-line leading-relaxed space-y-2">
                    <div>{aiGeneratedNames}</div>
                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(aiGeneratedNames)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold cursor-pointer"
                    >
                      📲 பெயர்களை வாட்ஸ்அப்பில் பகிர்க
                    </button>
                  </div>
                )}
              </div>

              {/* 38+ தூய தமிழ்ப் பெயர் சூட்டும் களஞ்சியம் (வடிகட்டலுடன்) */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-black text-amber-400">
                      👶 தூய தமிழ்ப் பெயர் சூட்டும் களஞ்சியம் ({filteredNames.length} பெயர்கள்)
                    </h4>
                    <p className="text-xs text-slate-300">பாலினம், முதல் எழுத்து அல்லது பெயரின் பொருள் அடிப்படையில் தேடுங்கள்.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="🔍 பெயர் / பொருள் தேடுக..."
                      value={nameSearch}
                      onChange={(e) => setNameSearch(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white"
                    />
                    {['அனைத்தும்', 'ஆண்', 'பெண்'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setNameGender(g)}
                        className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                          nameGender === g ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* முதல் எழுத்து Filter */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span className="text-slate-400 font-bold py-1 pr-1">முதல் எழுத்து:</span>
                  {availableInitials.map((init) => (
                    <button
                      key={init}
                      type="button"
                      onClick={() => setSelectedInitial(init)}
                      className={`px-2.5 py-0.5 rounded font-bold cursor-pointer ${
                        selectedInitial === init
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-900 text-amber-300 border border-slate-800'
                      }`}
                    >
                      {init}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {filteredNames.map((item, idx) => (
                    <div key={idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 hover:border-amber-500/40 transition space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-white text-sm">{item.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300">{item.gender}</span>
                      </div>
                      <p className="text-[11px] text-slate-300">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: கீழடி, தமிழர் கலைகள் & GI Tag பொக்கிஷங்கள் */}
          {activeTab === 'archaeology_arts' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                  🏺 கீழடி, ஆதிச்சநல்லூர் & உலகப் பாரம்பரியச் சின்னங்கள்
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ARCHAEOLOGY_SITES.map((site, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-black text-white">{site.name}</h4>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/30 rounded shrink-0">
                          {site.era}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{site.highlight}</p>
                      <div className="pt-1 flex justify-between items-center text-[11px]">
                        <span className="text-emerald-400 font-semibold">🏛️ {site.status}</span>
                        <button
                          type="button"
                          onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(site.name)}`, '_blank')}
                          className="text-sky-400 font-bold underline cursor-pointer"
                        >
                          மேப் காண்க ↗
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                  🥁 தமிழர் வீர விளையாட்டுகள் & பாரம்பரியக் கலைகள்
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {TRADITIONAL_ARTS.map((art, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-white">{art.name}</span>
                        <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded">{art.origin}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{art.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
                  🏅 தமிழ்நாட்டின் புவிசார் குறியீடு (GI Tag) பெற்ற பாரம்பரியப் பொக்கிஷங்கள்
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {GI_TAG_TREASURES.map((gi, idx) => (
                    <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-amber-400 font-bold block">📍 {gi.district}</span>
                      <div className="font-bold text-white">{gi.item}</div>
                      <p className="text-[11px] text-slate-300">{gi.specialty}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. பாரம்பரியக் கலைஞர்கள் & சித்த மருத்துவ ஆர்வலர் இணைப்புப் படிவம் */}
        <form onSubmit={handleArtistConnect} className="mt-8 pt-5 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-2">
            <span>🤝</span> கிராமியக் கலைஞர்கள், சிலம்பப் பயிற்சியாளர்கள், பாரம்பரிய உணவு & சித்த மருத்துவ ஆர்வலர்கள் இணைப்பு:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <input
              type="text"
              required
              placeholder="உங்கள் பெயர் *"
              value={artistForm.name}
              onChange={(e) => setArtistForm({ ...artistForm, name: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="tel"
              maxLength={10}
              required
              placeholder="வாட்ஸ்அப் எண் *"
              value={artistForm.phone}
              onChange={(e) => setArtistForm({ ...artistForm, phone: e.target.value.replace(/\D/g, '') })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder="மாவட்டம் (எ.கா: தஞ்சாவூர் / காஞ்சிபுரம்)"
              value={artistForm.district}
              onChange={(e) => setArtistForm({ ...artistForm, district: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <select
              value={artistForm.category}
              onChange={(e) => setArtistForm({ ...artistForm, category: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="சிலம்பம் / தற்காப்புக் கலை பயிற்சி">🥋 சிலம்பம் / தற்காப்புக் கலை பயிற்சி</option>
              <option value="கிராமிய நாட்டுப்புறக் கலை நிகழ்ச்சி">🥁 கிராமிய நாட்டுப்புறக் கலை நிகழ்ச்சி</option>
              <option value="சித்த மருத்துவம் & மூலிகை ஆலோசனை">🌿 சித்த மருத்துவம் & மூலிகை ஆலோசனை</option>
              <option value="பாரம்பரிய சிறுதானிய & இயற்கை உணவு">🍛 பாரம்பரிய சிறுதானிய & மண்பாண்ட உணவு</option>
              <option value="GI Tag கைவினைப் பொருட்கள் விற்பனை">🏅 GI Tag கைவினைப் பொருட்கள்</option>
            </select>
          </div>
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              மரபுக் கலைஞர் / ஆர்வலர் இணைப்பு (WhatsApp) ↗
            </button>
          </div>
        </form>
      </div>

      {/* 5. 360° எகோசிஸ்டம் பாலங்கள் */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('spiritual');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-amber-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🛕</span>
          <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
            38-மாவட்ட திருக்கோவில்கள் & தரிசனம்
          </h4>
          <p className="text-xs text-slate-100">சோழர், பல்லவர், பாண்டியர் காலப் பழமையான திருக்கோயில்கள் & நட்சத்திரத் தலங்கள்.</p>
          <span className="text-[11px] text-amber-400 font-bold block pt-1 underline">ஆன்மீக மையம் செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('tourism');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-emerald-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🗺️</span>
          <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
            பாரம்பரியச் சுற்றுலா & 38 மாவட்ட கையேடு
          </h4>
          <p className="text-xs text-slate-100">தஞ்சாவூர், மதுரை, மாமல்லபுரம், கீழடி சுற்றுலாத் திட்டங்கள் & நெடுஞ்சாலை வழிகாட்டி.</p>
          <span className="text-[11px] text-emerald-400 font-bold block pt-1 underline">சுற்றுலா மையம் செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('jobs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">💼</span>
          <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
            கைத்தறி, கைவினை & சுற்றுலா வழிகாட்டி வேலைகள்
          </h4>
          <p className="text-xs text-slate-100">பாரம்பரியத் தொழில்கள் மற்றும் சுற்றுலாத் துறையில் உள்ள உள்ளூர் வேலைவாய்ப்புகள்.</p>
          <span className="text-[11px] text-blue-400 font-bold block pt-1 underline">Jobs Hub செல்ல ↗</span>
        </div>
      </div>
    </div>
  );
}