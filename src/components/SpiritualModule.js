import React, { useState, useMemo } from 'react';
import spiritualData from '../data/spiritualData.json';
import { getWhatsAppUrl } from '../config';

const { TEMPLE_CIRCUITS, DOSHA_RADAR, KUMB_ITINERARY } = spiritualData;

const TN_38_DISTRICTS = [
  'தமிழ்நாடு முழுவதும் (27 நட்சத்திரப் பரிகாரத் தலங்கள்)',
  'அரியலூர்', 'இராணிப்பேட்டை', 'இராமநாதபுரம்', 'ஈரோடு', 'கடலூர்', 'கரூர்',
  'கள்ளக்குறிச்சி', 'கன்னியாகுமரி', 'காஞ்சிபுரம்', 'கிருஷ்ணகிரி', 'கோயம்புத்தூர்',
  'சிவகங்கை', 'செங்கல்பட்டு', 'சென்னை', 'சேலம்', 'தஞ்சாவூர்', 'தருமபுரி',
  'திண்டுக்கல்', 'திருச்சிராப்பள்ளி', 'திருநெல்வேலி', 'திருப்பத்தூர்', 'திருப்பூர்',
  'திருவண்ணாமலை', 'திருவள்ளூர்', 'திருவாரூர்', 'தூத்துக்குடி', 'தென்காசி', 'தேனி',
  'நாகப்பட்டினம்', 'நாமக்கல்', 'நீலகிரி', 'புதுக்கோட்டை', 'பெரம்பலூர்', 'மதுரை',
  'மயிலாடுதுறை', 'விருதுநகர்', 'விழுப்புரம்', 'வேலூர்'
];

const DEITY_FILTERS = [
  { id: 'all', label: '🕉️ அனைத்து பிரசித்தி பெற்ற கோவில்கள்' },
  { id: 'shiva', label: '🔱 சிவன் கோவில்கள் (சிவாலயங்கள்)' },
  { id: 'perumal', label: '🪔 பெருமாள் கோவில்கள் (வைணவ தலங்கள்)' },
  { id: 'amman', label: '🌺 அம்மன் & சக்தி கோவில்கள்' },
  { id: 'murugan', label: '🦚 முருகன் கோவில்கள்' },
  { id: 'vinayagar', label: '🐘 விநாயகர் & ஆஞ்சநேயர் கோவில்கள்' }
];

const RASI_NAKSHATRA_MAP = {
  'அனைத்து ராசிகளுக்கும் (பொது தரிசனம்)': ['அனைத்து நட்சத்திரங்களும்'],
  'மேஷம் (Mesham)': ['அனைத்து மேஷ நட்சத்திரங்கள்', 'அசுவினி (Ashwini)', 'பரணி (Bharani)', 'கார்த்திகை - 1ம் பாதம் (Krittika)'],
  'ரிஷபம் (Rishabam)': ['அனைத்து ரிஷப நட்சத்திரங்கள்', 'கார்த்திகை - 2,3,4 பாதம் (Krittika)', 'ரோகிணி (Rohini)', 'மிருகசீரிஷம் - 1,2 பாதம் (Mrigashira)'],
  'மிதுனம் (Mithunam)': ['அனைத்து மிதுன நட்சத்திரங்கள்', 'மிருகசீரிஷம் - 3,4 பாதம் (Mrigashira)', 'திருவாதிரை (Ardra)', 'புனர்பூசம் - 1,2,3 பாதம் (Punarvasu)'],
  'கடகம் (Kadagam)': ['அனைத்து கடக நட்சத்திரங்கள்', 'புனர்பூசம் - 4ம் பாதம் (Punarvasu)', 'பூசம் (Pushya)', 'ஆயில்யம் (Ashlesha)'],
  'சிம்மம் (Simmam)': ['அனைத்து சிம்ம நட்சத்திரங்கள்', 'மகம் (Magha)', 'பூரம் (Purva Phalguni)', 'உத்திரம் - 1ம் பாதம் (Uttara Phalguni)'],
  'கன்னி (Kanni)': ['அனைத்து கன்னி நட்சத்திரங்கள்', 'உத்திரம் - 2,3,4 பாதம் (Uttara Phalguni)', 'அஸ்தம் (Hasta)', 'சித்திரை - 1,2 பாதம் (Chitra)'],
  'துலாம் (Thulam)': ['அனைத்து துலாம் நட்சத்திரங்கள்', 'சித்திரை - 3,4 பாதம் (Chitra)', 'சுவாதி (Swati)', 'விசாகம் - 1,2,3 பாதம் (Vishakha)'],
  'விருச்சிகம் (Viruchigam)': ['அனைத்து விருச்சிக நட்சத்திரங்கள்', 'விசாகம் - 4ம் பாதம் (Vishakha)', 'அனுஷம் (Anuradha)', 'கேட்டை (Jyeshtha)'],
  'தனுசு (Dhanusu)': ['அனைத்து தனுசு நட்சத்திரங்கள்', 'மூலம் (Mula)', 'பூராடம் (Purva Ashadha)', 'உத்திராடம் - 1ம் பாதம் (Uttara Ashadha)'],
  'மகரம் (Magaram)': ['அனைத்து மகர நட்சத்திரங்கள்', 'உத்திராடம் - 2,3,4 பாதம் (Uttara Ashadha)', 'திருவோணம் (Shravana)', 'அவிட்டம் - 1,2 பாதம் (Dhanishta)'],
  'கும்பம் (Kumbam)': ['அனைத்து கும்ப நட்சத்திரங்கள்', 'அவிட்டம் - 3,4 பாதம் (Dhanishta)', 'சதயம் (Shatabhisha)', 'பூரட்டாதி - 1,2,3 பாதம் (Purva Bhadrapada)'],
  'மீனம் (Meenam)': ['அனைத்து மீன நட்சத்திரங்கள்', 'பூரட்டாதி - 4ம் பாதம் (Purva Bhadrapada)', 'உத்திரட்டாதி (Uttara Bhadrapada)', 'ரேவதி (Revati)']
};

const RASI_LIST = Object.keys(RASI_NAKSHATRA_MAP);

const DAILY_TIMINGS_BY_DAY = [
  { day: 'ஞாயிறு', rahu: 'மாலை 04:30 - 06:00', yama: 'மதியம் 12:00 - 01:30', kuligai: 'மதியம் 03:00 - 04:30', good: 'காலை 07:30 - 09:00 | மாலை 06:15 - 07:30' },
  { day: 'திங்கள்', rahu: 'காலை 07:30 - 09:00', yama: 'காலை 10:30 - 12:00', kuligai: 'மதியம் 01:30 - 03:00', good: 'காலை 06:15 - 07:15 | மாலை 04:45 - 06:00' },
  { day: 'செவ்வாய்', rahu: 'மதியம் 03:00 - 04:30', yama: 'காலை 09:00 - 10:30', kuligai: 'மதியம் 12:00 - 01:30', good: 'காலை 07:45 - 08:45 | மாலை 05:00 - 06:30' },
  { day: 'புதன்', rahu: 'மதியம் 12:00 - 01:30', yama: 'காலை 07:30 - 09:00', kuligai: 'காலை 10:30 - 12:00', good: 'காலை 09:15 - 10:15 | மாலை 04:45 - 06:15' },
  { day: 'வியாழன்', rahu: 'மதியம் 01:30 - 03:00', yama: 'காலை 06:00 - 07:30', kuligai: 'காலை 09:00 - 10:30', good: 'காலை 10:45 - 11:45 | மாலை 06:00 - 07:30' },
  { day: 'வெள்ளி', rahu: 'காலை 10:30 - 12:00', yama: 'மதியம் 03:00 - 04:30', kuligai: 'காலை 07:30 - 09:00', good: 'காலை 09:15 - 10:15 | மாலை 04:45 - 06:00' },
  { day: 'சனி', rahu: 'காலை 09:00 - 10:30', yama: 'மதியம் 01:30 - 03:00', kuligai: 'காலை 06:00 - 07:30', good: 'காலை 07:45 - 08:45 | மாலை 05:00 - 06:30' }
];

const SACRED_MANTRAS = [
  {
    deity: '🐘 ஸ்ரீ மகா கணபதி (தடைகள் நீங்க)',
    mantra: 'ஓம் ஏகதந்தாய வித்மஹே வக்ரதுண்டாய தீமஹி தன்னோ தந்தி ப்ரசோதயாத் ||',
    benefit: 'புதிய தொழில், வீடு கட்டுதல் மற்றும் சுப காரியங்கள் தடையின்றி நிறைவேற.'
  },
  {
    deity: '🦚 ஸ்ரீ முருகப்பெருமான் (பகை & கடன் தீர)',
    mantra: 'ஓம் தத்புருஷாய வித்மஹே மஹாசேனாய தீமஹி தன்னோ சண்முக ப்ரசோதயாத் ||',
    benefit: 'கடன் சுமை நீங்க, நிலம்-வீடு யோகம் அமைய மற்றும் செவ்வாய் தோஷம் விலக.'
  },
  {
    deity: '🔱 ஸ்ரீ பரமசிவன் (ஆயுள் & ஆரோக்கியம்)',
    mantra: 'ஓம் நமசிவாய வாழ்க நாதன் தாள் வாழ்க இமைப்பொழுதும் என் நெஞ்சில் நீங்காதான் தாள் வாழ்க ||',
    benefit: 'பிரதோஷ காலத்தில் பாராயணம் செய்ய மன அமைதி, ஆரோக்கியம் மற்றும் பாவ விமோசனம் கிட்டும்.'
  },
  {
    deity: '🪔 ஸ்ரீ மகாலட்சுமி (ஐஸ்வர்யம் பெருக)',
    mantra: 'ஓம் மஹாதேவ்யை ச வித்மஹே விஷ்ணுபத்ந்யை ச தீமஹி தன்னோ லக்ஷ்மீ ப்ரசோதயாத் ||',
    benefit: 'வெள்ளிக்கிழமைகளில் விளக்கேற்றி வழிபட குடும்பத்தில் செல்வ வளம் பெருகும்.'
  }
];

const VRATHAM_GUIDE = [
  { name: 'பிரதோஷம் (வளர்பிறை & தேய்பிறை திரயோதசி)', time: 'மாலை 04:30 - 06:00', benefit: 'நந்தி பகவானுக்கு வில்வம், அறுகம்புல் சாற்றி வழிபட அனைத்து தோஷங்களும் நீங்கும்.' },
  { name: 'சஷ்டி விரதம் (வளர்பிறை சஷ்டி)', time: 'காலை & மாலை முருகன் வழிபாடு', benefit: 'குழந்தை பாக்கியம், திருமண வரம் மற்றும் தீராத பிணிகள் நீங்க மிகச் சிறந்தது.' },
  { name: 'ஏகாதசி விரதம் (பெருமாள் வழிபாடு)', time: 'துளசி தீர்த்தம் & விஷ்ணு சகஸ்ரநாமம்', benefit: 'குடும்ப ஒற்றுமை, மனத்தெளிவு மற்றும் முன்னோர் ஆசி கிடைக்கும்.' },
  { name: 'அமாவாசை & பௌர்ணமி வழிபாடு', time: 'முன்னோர் தர்ப்பணம் / கிரிவலம்', benefit: 'அமாவாசையில் முன்னோர் வழிபாடும், பௌர்ணமியில் திருவண்ணாமலை கிரிவலமும் கோடி புண்ணியம் தரும்.' }
];

export default function SpiritualModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('radar'); // 'radar' | 'ai_guide' | 'circuits' | 'itinerary' | 'hrce' | 'poosari'
  const [circuitType, setCircuitType] = useState('navagraha');
  const [selectedDosha, setSelectedDosha] = useState(DOSHA_RADAR[0].id);

  // 38 மாவட்ட AI கோவில் தேடல் + தெய்வம் + 12 ராசி + 27 நட்சத்திரம் ஃபில்டர்
  const [selectedDistrict38, setSelectedDistrict38] = useState('தமிழ்நாடு முழுவதும் (27 நட்சத்திரப் பரிகாரத் தலங்கள்)');
  const [selectedDeity, setSelectedDeity] = useState(DEITY_FILTERS[0].label);
  const [selectedRasi38, setSelectedRasi38] = useState(RASI_LIST[0]);
  const [selectedNakshatra38, setSelectedNakshatra38] = useState('அனைத்து நட்சத்திரங்களும்');
  const [aiGuideText, setAiGuideText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // சிஆர்எம் முன்பதிவு படிவம்
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    district: '',
    need: 'நவகிரக யாத்திரை கார் & வழிகாட்டி முன்பதிவு',
    members: '4 நபர்கள்',
    date: ''
  });
  const [loading, setLoading] = useState(false);

  const availableNakshatras = useMemo(() => {
    return RASI_NAKSHATRA_MAP[selectedRasi38] || ['அனைத்து நட்சத்திரங்களும்'];
  }, [selectedRasi38]);

  const todayTiming = useMemo(() => {
    const dayIdx = new Date().getDay();
    return DAILY_TIMINGS_BY_DAY[dayIdx] || DAILY_TIMINGS_BY_DAY[0];
  }, []);

  const matchedDosha = useMemo(() => {
    return DOSHA_RADAR.find((d) => d.id === selectedDosha) || DOSHA_RADAR[0];
  }, [selectedDosha]);

  const handleGetAiSpiritualGuide = async (overrideDeity = null, overrideRasi = null, overrideNakshatra = null) => {
    const deityCategory = overrideDeity || selectedDeity;
    const rasiFilter = overrideRasi || selectedRasi38;
    const nakshatraFilter = overrideNakshatra || selectedNakshatra38;
    const isSpecificRasi = !rasiFilter.includes('அனைத்து ராசிகளுக்கும்');
    const isSpecificNakshatra = !nakshatraFilter.includes('அனைத்து');
    const isWholeTN = selectedDistrict38.includes('தமிழ்நாடு முழுவதும்');

    setIsAiLoading(true);
    setAiGuideText('');
    try {
      const res = await fetch('/api/polish-petition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: {
            applicantName: leadForm.name || 'பக்தர்',
            taluk: selectedDistrict38,
            district: selectedDistrict38,
            subject: `${selectedDistrict38} | ${deityCategory} | ராசி: ${rasiFilter} | நட்சத்திரம்: ${nakshatraFilter}`
          },
          selectedForm: '38 District Tamil Nadu Rasi & 27 Nakshatra Parihara Temple Explorer',
          applicationMode: 'education',
          customNote: `தமிழ்நாடு ஜோதிட மற்றும் ஆகம சாஸ்திரப்படி கீழ்க்கண்ட விவரங்களுக்கு ஏற்ற திருக்கோயில்களைத் துல்லியமாகப் பட்டியலிடு:
- பகுதி: ${selectedDistrict38}
- தெய்வப் பிரிவு: ${deityCategory}
- ராசி: ${rasiFilter}
- நட்சத்திரம்: ${nakshatraFilter}

${
  isSpecificNakshatra
    ? `முதலில் "${nakshatraFilter}" நட்சத்திரத்திற்கான தமிழ்நாட்டின் முதன்மை ஆதிகால நட்சத்திரப் பரிகாரத் திருக்கோயில் (Nakshatra Parihara Temple), தல விருட்சம், வழிபட வேண்டிய முறை ஆகியவற்றை முழுமையாகக் கொடு. தொடர்ந்து ${isWholeTN ? 'தமிழ்நாட்டின் பிற முக்கிய' : `${selectedDistrict38} மாவட்டத்திற்கு உள்ளேயே உள்ள`} 4 முக்கிய பரிகாரக் கோவில்களையும் வரிசைப்படுத்து.`
    : isSpecificRasi
    ? `"${rasiFilter}" ராசிக்காரர்கள் வழிபட வேண்டிய ${isWholeTN ? 'தமிழ்நாட்டின் 6 மிகச் சிறந்த' : `${selectedDistrict38} மாவட்டத்திற்கு உள்ளேயே உள்ள 5 முக்கிய`} பரிகாரத் திருக்கோயில்களை ("${deityCategory}" பிரிவில்) மட்டும் வடிகட்டிப் பட்டியலிடு.`
    : `${isWholeTN ? 'தமிழ்நாட்டின் மிகப் பிரசித்தி பெற்ற 7' : `${selectedDistrict38} மாவட்டத்தில் உள்ள 6 மிகப் பிரசித்தி பெற்ற`} திருக்கோயில்களை ("${deityCategory}" பிரிவில்) வடிகட்டிப் பட்டியலிடு.`
}

ஒவ்வொரு கோவிலுக்கும்: 1) கோவில் பெயர் & மாவட்டம்/ஊர், 2) மூலவர் & ராசி/நட்சத்திரப் பரிகார சிறப்பு, 3) நடை திறக்கும் நேரம் & எளிய வழிபாட்டு முறை ஆகியவற்றைத் தெளிவான தமிழில் கொடு.`
        })
      });
      const data = await res.json();
      if (data.polishedText) {
        setAiGuideText(data.polishedText);
      }
    } catch (err) {
      console.error('AI Spiritual Guide Error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.phone || leadForm.phone.length < 10) {
      alert('தயவுசெய்து சரியான 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்.');
      return;
    }
    setLoading(true);

    try {
      fetch('https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZB0YKKbWNIKD7CzSh0M0qvfkHhORCw53YMBZX1nKCB1AcSAu/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name || 'பக்தர் / யாத்ரீகர்',
          phone: leadForm.phone,
          village: leadForm.district || 'தமிழ்நாடு',
          taluk: leadForm.need,
          surveyNo: `நபர்கள்: ${leadForm.members} | தேதி: ${leadForm.date || 'உடனடி'}`,
          feeStatus: 'Spiritual Tour Booking Inquiry',
          status: 'Spiritual Desk'
        })
      });
    } catch (err) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! நான் ஆன்மிக யாத்திரை & கோவில் தரிசன வழிகாட்டல் பெற விரும்புகிறேன்.\n\n👤 பெயர்: ${leadForm.name || '-'}\n📱 எண்: ${leadForm.phone}\n📍 மாவட்டம்: ${leadForm.district || '-'}\n🎯 தேவை: ${leadForm.need}\n👥 பயணிகள் எண்ணிக்கை: ${leadForm.members}\n📅 திட்டமிடும் தேதி: ${leadForm.date || 'உடனடி'}\n\nபூஜை நேரம், கார் வாடகை மற்றும் தங்கும் விடுதி விவரங்களை அனுப்பவும்.`;
    const waUrl = getWhatsAppUrl(msg);
    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="w-full space-y-8 text-left">
      {/* 1. முதன்மை பேனர் + இன்றைய ராகு காலம் / சுப நேரம் ரேடார் */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/60 via-slate-900/95 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/40 rounded-full">
              தமிழ்நாடு 38 மாவட்ட ஆன்மிக & திருக்கோவில் வழிகாட்டி 360°
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2 flex items-center gap-2">
              <span>🛕</span> திருக்கோயில்கள், 12 ராசி-27 நட்சத்திர & 38-மாவட்ட தரிசன மையம்
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              12 ராசி & 27 நட்சத்திரப் பரிகாரத் தலங்கள், 38 மாவட்ட பிரசித்தி பெற்ற கோவில்கள், நவகிரகம் & அறுபடை வீடுகள், தோஷப் பரிகார ரேடார் & HR&CE சேவைகள்.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-950/90 px-4 py-3 rounded-xl border border-amber-500/30">
            <span className="text-3xl">🕉️</span>
            <div className="text-xs">
              <span className="text-amber-400 font-bold block">27 நட்சத்திர & 38 மாவட்டத் தலங்கள்</span>
              <span className="text-slate-100 text-[11px]">ராசி, நட்சத்திரம் & தெய்வம் வாரியாக AI தேடல்</span>
            </div>
          </div>
        </div>

        {/* இன்றைய சுப நேரம், ராகு காலம் & எமகண்டம் பார் */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2.5 bg-slate-950/90 p-3.5 rounded-2xl border border-amber-500/20 text-xs">
          <div className="bg-slate-900/90 p-2.5 rounded-xl border border-emerald-500/30">
            <span className="text-[10px] text-emerald-400 font-bold block">✨ இன்று ({todayTiming.day}) சுப நேரம்:</span>
            <span className="text-white font-bold mt-0.5 block">{todayTiming.good}</span>
          </div>
          <div className="bg-slate-900/90 p-2.5 rounded-xl border border-rose-500/30">
            <span className="text-[10px] text-rose-400 font-bold block">⛔ ராகு காலம்:</span>
            <span className="text-rose-200 font-bold mt-0.5 block">{todayTiming.rahu}</span>
          </div>
          <div className="bg-slate-900/90 p-2.5 rounded-xl border border-amber-500/30">
            <span className="text-[10px] text-amber-400 font-bold block">⚠️ எமகண்டம்:</span>
            <span className="text-amber-200 font-bold mt-0.5 block">{todayTiming.yama}</span>
          </div>
          <div className="bg-slate-900/90 p-2.5 rounded-xl border border-blue-500/30">
            <span className="text-[10px] text-blue-400 font-bold block">🌟 குளிகை (சுப வளர்ச்சி):</span>
            <span className="text-blue-200 font-bold mt-0.5 block">{todayTiming.kuligai}</span>
          </div>
        </div>

        {/* 2. நேவிகேஷன் டேப்கள் (6 டேப்கள்) */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('radar')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'radar' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🎯 1. பரிகார ரேடார் (தோஷம் & பிரார்த்தனை)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai_guide')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ai_guide' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🤖 2. 12 ராசி-27 நட்சத்திரம் & 38 மாவட்ட கோவில்கள் (AI)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('circuits')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'circuits' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🛕 3. புனித சுற்றுப்பாதைகள் (நவகிரகம் / அறுபடை / பஞ்சபூதம்)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('itinerary')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'itinerary' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            ⏱️ 4. 2-நாள் &apos;ஜீரோ டிராஃபிக்&apos; ரூட் பிளானர்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hrce')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'hrce' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🏛️ 5. HR&CE அரசு தேவஸ்தான சேவைகள்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('poosari')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'poosari' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🙏 6. கிராமப் பூசாரிகள் நலன் & கோவில் உதவி
          </button>
        </div>

        {/* 3. டேப் வாரியான உள்ளடக்கங்கள் */}
        <div className="mt-6">
          {/* TAB 1: பரிகார ரேடார் */}
          {activeTab === 'radar' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  உங்கள் தற்போதைய தேவை அல்லது தோஷப் பரிகாரத்தைத் தேர்ந்தெடுக்கவும்:
                </label>
                <select
                  value={selectedDosha}
                  onChange={(e) => setSelectedDosha(e.target.value)}
                  className="w-full md:w-2/3 bg-slate-900 border border-amber-500/40 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-amber-400"
                >
                  {DOSHA_RADAR.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-amber-500/40 bg-slate-950 p-5 md:p-6 space-y-4 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded">
                      பரிந்துரைக்கப்படும் முதன்மை பரிகார க்ஷேத்திரம்
                    </span>
                    <h3 className="text-xl font-black text-white mt-1.5">{matchedDosha.temple}</h3>
                    <span className="text-xs text-amber-400 font-semibold">📍 இடம்: {matchedDosha.place}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLeadForm({
                        ...leadForm,
                        need: `பரிகார தரிசனம்: ${matchedDosha.temple} (${matchedDosha.label})`
                      });
                      document.getElementById('spiritual-crm-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
                  >
                    இக்கோவிலுக்கு கார் & தரிசனம் முன்பதிவு ↗
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-100 block text-[10px] uppercase">செய்ய வேண்டிய பூஜை:</span>
                    <span className="font-bold text-white mt-0.5 block">{matchedDosha.pooja}</span>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-100 block text-[10px] uppercase">உகந்த நாள் & காலம்:</span>
                    <span className="font-bold text-amber-300 mt-0.5 block">{matchedDosha.bestDay}</span>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-100 block text-[10px] uppercase">முக்கிய வழிகாட்டல்:</span>
                    <span className="font-bold text-emerald-400 mt-0.5 block">{matchedDosha.note}</span>
                  </div>
                </div>
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-300 border-b border-slate-800">
                  அனைத்து முக்கிய பரிகாரத் தலங்கள் ஒரு பார்வையில்:
                </div>
                <div className="divide-y divide-slate-800 text-xs">
                  {DOSHA_RADAR.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setSelectedDosha(d.id)}
                      className="p-3 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-slate-900/60 transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="font-bold text-white block">{d.label}</span>
                        <span className="text-slate-100 text-[11px]">
                          🛕 {d.temple} ({d.place})
                        </span>
                      </div>
                      <span className="text-amber-400 font-semibold text-[11px] whitespace-nowrap">✨ {d.pooja}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 12 ராசி-27 நட்சத்திரம் & 38 மாவட்ட கோவில்கள் AI Explorer */}
          {activeTab === 'ai_guide' && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/30 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-indigo-300">
                      🤖 12 ராசி - 27 நட்சத்திரப் பரிகார & 38 மாவட்ட திருக்கோவில்கள் (AI Explorer)
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      உங்கள் ராசி + நட்சத்திரம் அல்லது 38 மாவட்டங்களில் ஒன்றைத் தேர்வு செய்தால், தமிழ்நாட்டில் உள்ள உரிய பரிகார & பிரசித்தி பெற்ற திருக்கோயில்கள் உடனே கிடைக்கும்.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleGetAiSpiritualGuide()}
                    disabled={isAiLoading}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg cursor-pointer shrink-0"
                  >
                    {isAiLoading ? 'கோவில்கள் ஆய்வு நடக்கிறது... ⚡' : '✨ கோவில்கள் பட்டியல் பெறுக'}
                  </button>
                </div>

                {/* 4-அடுக்கு ஸ்மார்ட் ஃபில்டர் (மாவட்டம் + தெய்வம் + 12 ராசி + 27 நட்சத்திரம்) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-amber-400 font-bold block mb-1">1. மாவட்டம் / தமிழ்நாடு:</label>
                    <select
                      value={selectedDistrict38}
                      onChange={(e) => setSelectedDistrict38(e.target.value)}
                      className="w-full bg-slate-900 border border-indigo-500/40 rounded-xl px-3 py-2 text-white font-bold"
                    >
                      {TN_38_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist.includes('தமிழ்நாடு') ? dist : `${dist} மாவட்டம்`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-emerald-400 font-bold block mb-1">2. தெய்வம் / பிரிவு ஃபில்டர்:</label>
                    <select
                      value={selectedDeity}
                      onChange={(e) => setSelectedDeity(e.target.value)}
                      className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl px-3 py-2 text-white font-bold"
                    >
                      {DEITY_FILTERS.map((deity) => (
                        <option key={deity.id} value={deity.label}>
                          {deity.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-pink-400 font-bold block mb-1">3. ராசி தேர்வு (12 ராசிகள்):</label>
                    <select
                      value={selectedRasi38}
                      onChange={(e) => {
                        const newRasi = e.target.value;
                        setSelectedRasi38(newRasi);
                        const firstNak = RASI_NAKSHATRA_MAP[newRasi]?.[0] || 'அனைத்து நட்சத்திரங்களும்';
                        setSelectedNakshatra38(firstNak);
                      }}
                      className="w-full bg-slate-900 border border-pink-500/40 rounded-xl px-3 py-2 text-white font-bold"
                    >
                      {RASI_LIST.map((rasi) => (
                        <option key={rasi} value={rasi}>
                          {rasi}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-cyan-400 font-bold block mb-1">4. நட்சத்திரம் (27 நட்சத்திரங்கள்):</label>
                    <select
                      value={selectedNakshatra38}
                      onChange={(e) => setSelectedNakshatra38(e.target.value)}
                      className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl px-3 py-2 text-white font-bold"
                    >
                      {availableNakshatras.map((nak) => (
                        <option key={nak} value={nak}>
                          {nak}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* தெய்வம் வாரியான விரைவு ஃபில்டர் பட்டன்கள் */}
                <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                  <span className="text-slate-400 py-1 font-semibold">உடனடித் தேர்வு:</span>
                  {DEITY_FILTERS.map((deity) => (
                    <button
                      key={deity.id}
                      type="button"
                      onClick={() => {
                        setSelectedDeity(deity.label);
                        handleGetAiSpiritualGuide(deity.label, selectedRasi38, selectedNakshatra38);
                      }}
                      className={`px-3 py-1 rounded-lg border transition cursor-pointer font-semibold ${
                        selectedDeity === deity.label
                          ? 'bg-indigo-600 text-white border-indigo-400'
                          : 'bg-slate-900 hover:bg-indigo-950 text-indigo-300 border-slate-700'
                      }`}
                    >
                      {deity.label}
                    </button>
                  ))}
                </div>

                {aiGuideText && (
                  <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-100 whitespace-pre-line leading-relaxed">
                    {aiGuideText}
                  </div>
                )}
              </div>

              {/* தினசரி காயத்ரி & போற்றி மந்திரங்கள் */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SACRED_MANTRAS.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-amber-500/20 space-y-2">
                    <h4 className="text-xs font-bold text-amber-400">{m.deity}</h4>
                    <p className="text-xs font-semibold text-white bg-slate-900 p-3 rounded-xl border border-slate-800 leading-relaxed">
                      {m.mantra}
                    </p>
                    <p className="text-[11px] text-emerald-400">✨ பலன்: {m.benefit}</p>
                  </div>
                ))}
              </div>

              {/* முக்கிய விரத நாட்கள் */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-400">📅 மாதாந்திர முக்கிய விரத நாட்கள் & பலன்கள்</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {VRATHAM_GUIDE.map((v, idx) => (
                    <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="font-bold text-white">{v.name}</div>
                      <div className="text-[11px] text-amber-300">🕒 {v.time}</div>
                      <div className="text-[11px] text-slate-300">{v.benefit}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: புனித சுற்றுப்பாதைகள் */}
          {activeTab === 'circuits' && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
                <button
                  type="button"
                  onClick={() => setCircuitType('navagraha')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    circuitType === 'navagraha' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-100'
                  }`}
                >
                  ☀️ நவகிரகத் தலங்கள் (கும்பகோணம் & மயிலாடுதுறை)
                </button>
                <button
                  type="button"
                  onClick={() => setCircuitType('murugan')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    circuitType === 'murugan' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-100'
                  }`}
                >
                  🦚 அறுபடை வீடுகள் (முருகன் க்ஷேத்திரங்கள்)
                </button>
                <button
                  type="button"
                  onClick={() => setCircuitType('panchabhootham')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    circuitType === 'panchabhootham' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-100'
                  }`}
                >
                  🔥 பஞ்சபூத ஸ்தலங்கள் (சிவன் லிங்கங்கள்)
                </button>
              </div>

              {circuitType === 'navagraha' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {TEMPLE_CIRCUITS.navagraha.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all space-y-2.5"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-500/30 rounded">
                          {item.planet}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold">{item.specialDay}</span>
                      </div>
                      <h4 className="text-sm font-black text-white">{item.name}</h4>
                      <p className="text-[11px] text-slate-100">📍 {item.place}</p>
                      <div className="text-[11px] bg-slate-900 p-2 rounded border border-slate-800/80 space-y-1">
                        <div>
                          <span className="text-slate-200">மூலவர்:</span>{' '}
                          <span className="text-slate-300 font-semibold">{item.deity}</span>
                        </div>
                        <div>
                          <span className="text-slate-200">நடை நேரம்:</span>{' '}
                          <span className="text-amber-300">{item.timing}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-100 leading-relaxed italic border-t border-slate-900 pt-1.5">
                        💡 {item.highlight}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {circuitType === 'murugan' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TEMPLE_CIRCUITS.murugan.map((m) => (
                    <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-amber-400">{m.padai}</span>
                        <span className="text-[11px] text-slate-100">📍 {m.place}</span>
                      </div>
                      <h4 className="text-sm font-black text-white">{m.name}</h4>
                      <div className="text-xs text-slate-300 bg-slate-900 p-2 rounded">
                        🕒 நடை நேரம்: <span className="text-emerald-400 font-semibold">{m.timing}</span>
                      </div>
                      <p className="text-xs text-slate-100 leading-relaxed">🌟 {m.highlight}</p>
                    </div>
                  ))}
                </div>
              )}

              {circuitType === 'panchabhootham' && (
                <div className="space-y-3">
                  {TEMPLE_CIRCUITS.panchabhootham.map((pb) => (
                    <div
                      key={pb.id}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-black bg-blue-950 text-cyan-300 border border-blue-500/30 rounded">
                            {pb.element}
                          </span>
                          <h4 className="text-sm font-black text-white">{pb.temple}</h4>
                        </div>
                        <p className="text-xs text-amber-400 font-semibold">லிங்கம்: {pb.lingam}</p>
                        <p className="text-xs text-slate-100">நடை நேரம்: {pb.timing}</p>
                        <p className="text-xs text-emerald-400 font-medium">✨ {pb.highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: 2-நாள் 'ஜீரோ டிராஃபிக்' ரூட் பிளானர் */}
          {activeTab === 'itinerary' && (
            <div className="space-y-5">
              <div className="p-3.5 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-slate-300 space-y-1">
                <span className="text-amber-400 font-bold block">💡 நவகிரக யாத்திரை ரகசியம் (Zero-Wasted Kilometers):</span>
                <p>
                  கிராமப்புற நவகிரகக் கோவில்கள் <strong>மதியம் 12:30 மணி முதல் மாலை 4:00 மணி வரை நடை சாத்தப்படும்</strong>.
                  தவறான வரிசையில் சென்றால் நடுவழியில் காத்திருக்க நேரிடும். கீழே கொடுக்கப்பட்டுள்ள 2 நாள் கால அட்டவணை
                  அலைச்சலையும் தூரத்தையும் 40% குறைக்கும்.
                </p>
              </div>

              <div className="space-y-4">
                {KUMB_ITINERARY.map((plan, idx) => (
                  <div key={idx} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                    <div className="bg-slate-900/90 px-4 py-2.5 font-bold text-xs text-amber-400 border-b border-slate-800">
                      {plan.day}
                    </div>
                    <div className="divide-y divide-slate-900 text-xs">
                      {plan.slots.map((s, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-slate-900/40"
                        >
                          <div className="w-48 text-emerald-400 font-bold tracking-tight">⏱️ {s.time}</div>
                          <div className="flex-1">
                            <span className="font-bold text-white block">{s.temple}</span>
                            <span className="text-slate-100 text-[11px]">{s.note}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HR&CE நேரடி அரசு தேவஸ்தான கவுண்ட்டர் */}
          {activeTab === 'hrce' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-300">
                தமிழக அரசின் இந்து சமய அறநிலையத்துறையின் (HR&CE) அதிகாரப்பூர்வ இணையதளம் மூலம் இடைத்தரகர்கள் இன்றி
                பக்தர்கள் நேரடியாகப் பதிவு செய்ய வேண்டிய நேரடி இணைப்புகள்:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block text-sm">1. சிறப்பு தரிசன டிக்கெட்</span>
                  <p className="text-slate-100">
                    பழனி, திருச்செந்தூர், சமயபுரம், திருத்தணி, மற்றும் திருவண்ணாமலை ₹100/₹200 கட்டண விரைவு தரிசன
                    முன்பதிவு.
                  </p>
                  <a
                    href="https://hrce.tn.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block pt-1 text-emerald-400 font-bold underline"
                  >
                    அரசு HR&CE போர்ட்டல் செல்ல ↗
                  </a>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block text-sm">2. தேவஸ்தான காட்டேஜ் தங்குமிடம்</span>
                  <p className="text-slate-100">
                    அரசு தேவஸ்தான விடுதிகளில் பாதுகாப்பான, குறைந்த கட்டண குடும்ப தங்குமிடம் ஆன்லைனில் முன் கூட்டியே
                    பதிவு செய்யும் முறை.
                  </p>
                  <a
                    href="https://hrce.tn.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block pt-1 text-emerald-400 font-bold underline"
                  >
                    தேவஸ்தான அறை புக் செய்ய ↗
                  </a>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block text-sm">3. ஒரு நாள் அன்னதானத் திட்டம்</span>
                  <p className="text-slate-100">
                    உங்கள் பிறந்தநாள் அல்லது திருமண நாளில் பக்தர்களுக்கு முழு நாள் அன்னதானம் வழங்க அரசு ரசீதுடன் கூடிய
                    நேரடி பங்களிப்பு.
                  </p>
                  <a
                    href="https://hrce.tn.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block pt-1 text-emerald-400 font-bold underline"
                  >
                    அன்னதான பங்களிப்பு ↗
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: கிராமப் பூசாரிகள் நலன் & நலிந்த கோவில்கள் */}
          {activeTab === 'poosari' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-5 rounded-xl border border-amber-500/30 space-y-3">
                  <span className="text-amber-400 font-bold block text-sm">
                    📜 தமிழ்நாடு கிராமக் கோவில் பூசாரிகள் நல வாரியம்
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    அறநிலையத்துறை கட்டுப்பாட்டில் இல்லாத கிராமப்புற சிறு திருக்கோயில்களில் பணிபுரியும் அர்ச்சகர் மற்றும்
                    பூசாரிகளுக்கு அரசு வழங்கும் நலத்திட்டங்கள்:
                  </p>
                  <ul className="space-y-1.5 text-slate-100 list-disc list-inside">
                    <li>
                      மாதாந்திர ஓய்வூதியம்: <strong>மாதம் ₹4,000</strong> (60 வயது பூர்த்தியடைந்த பூசாரிகளுக்கு).
                    </li>
                    <li>இலவச மிதிவண்டி (சைக்கிள்) மற்றும் புத்தாடைகள் (வேட்டி / சேலை).</li>
                    <li>பூசாரிகளின் வாரிசுகளுக்கு தொழிற்கல்வி & உயர் கல்வி உதவித்தொகை.</li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      setLeadForm({
                        ...leadForm,
                        need: 'கிராமப் பூசாரிகள் நல வாரிய ஓய்வூதிய பதிவு உதவி'
                      });
                      document.getElementById('spiritual-crm-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer"
                  >
                    பூசாரி நலவாரிய விண்ணப்ப உதவி ↗
                  </button>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 space-y-3">
                  <span className="text-emerald-400 font-bold block text-sm">🪔 ஒரு கால பூசை ஆதரவு & கோவில் தத்தெடுப்பு</span>
                  <p className="text-slate-300 leading-relaxed">
                    தமிழகத்தில் வருமானமின்றி ஒரு கால பூசை கூட நடைபெறச் சிரமப்படும் கிராமப்புற சிவாலயங்கள் மற்றும் அம்மன்
                    கோவில்களுக்கு தீப எண்ணெய், நெய் மற்றும் பூஜைப் பொருட்களை நேரடியாக அனுப்ப விரும்பும் பக்தர்களை
                    இணைக்கிறோம்.
                  </p>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                    🤝 <strong>நேரடி பங்களிப்பு:</strong> எவ்வித நிர்வாகக் கட்டணமும் இன்றி உங்கள் நிதி நேரடியாக அந்தந்த
                    கிராமக் கோவில் அர்ச்சகரின் வங்கிக் கணக்கிற்கே மாற்றப்படும்.
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLeadForm({
                        ...leadForm,
                        need: 'நலிந்த கிராமக் கோவிலுக்கு தீப எண்ணெய் / நிதியுதவி செய்ய விரும்புகிறேன்'
                      });
                      document.getElementById('spiritual-crm-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                  >
                    கிராமக் கோவிலுக்கு உதவ பதிவு ↗
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. ஆன்மிக யாத்திரை & தரிசன வழிகாட்டல் படிவம் */}
        <form id="spiritual-crm-form" onSubmit={handleSubmit} className="mt-8 pt-5 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-2">
            <span>🚗</span> ஆன்மிக யாத்திரை கார், தங்குமிடம் மற்றும் தரிசன முன்பதிவு உதவி:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <input
              type="text"
              placeholder="உங்கள் பெயர் *"
              required
              value={leadForm.name}
              onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="tel"
              maxLength={10}
              required
              placeholder="வாட்ஸ்அப் எண் *"
              value={leadForm.phone}
              onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value.replace(/\D/g, '') })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder="ஊர் / மாவட்டம் (எ.கா: சென்னை / மதுரை)"
              value={leadForm.district}
              onChange={(e) => setLeadForm({ ...leadForm, district: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <select
              value={leadForm.need}
              onChange={(e) => setLeadForm({ ...leadForm, need: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="நவகிரக யாத்திரை கார் & வழிகாட்டி">🚗 நவகிரக யாத்திரை கார் & பிளான்</option>
              <option value="அறுபடை வீடு ஆன்மிக டூர்">🦚 அறுபடை வீடு ஆன்மிக டூர்</option>
              <option value="பரிகார கோவில் சிறப்பு தரிசன உதவி">🎯 பரிகார கோவில் சிறப்பு தரிசனம்</option>
              <option value="கிராமப் பூசாரி நலவாரிய விண்ணப்பம்">📜 பூசாரி நலவாரிய விண்ணப்பம்</option>
              <option value="ஒரு கால பூசை எண்ணெய் / நிதியுதவி">🪔 கிராமக் கோவிலுக்கு தீப உதவி</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <input
              type="text"
              placeholder="பயணிகள் எண்ணிக்கை (எ.கா: குடும்பத்துடன் 5 நபர்கள்)"
              value={leadForm.members}
              onChange={(e) => setLeadForm({ ...leadForm, members: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder="உத்தேச பயண தேதி (எ.கா: அடுத்த மாதம் முதல் வாரம்)"
              value={leadForm.date}
              onChange={(e) => setLeadForm({ ...leadForm, date: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {loading ? 'தயாராகிறது...' : 'ஆன்மிக வழிகாட்டல் பெற (WhatsApp) ↗'}
            </button>
          </div>
        </form>
      </div>

      {/* 5. 360° எகோசிஸ்டம் பாலங்கள் */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('jobs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🚗</span>
          <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
            ஆன்மிக டிராவல்ஸ் ஓட்டுநர்கள்
          </h4>
          <p className="text-xs text-slate-100">கும்பகோணம், திருச்சி, மதுரை உள்ளூர் கோவில் வழிகாட்டி மற்றும் ஓட்டுநர்கள்.</p>
          <span className="text-[11px] text-blue-400 font-bold block pt-1 underline">Jobs Hub செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('astrology');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-purple-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🔮</span>
          <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
            AI ஜோதிடம் & ஜாதக ஆய்வு
          </h4>
          <p className="text-xs text-slate-100">உங்கள் தசா புக்திக்கு ஏற்ற இஷ்ட தெய்வம் மற்றும் கிரக பரிகாரங்களை அறிய.</p>
          <span className="text-[11px] text-purple-400 font-bold block pt-1 underline">ஜோதிட மையம் செல்ல ↗</span>
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
            தமிழ்நாடு சுற்றுலா & தங்கும் விடுதி
          </h4>
          <p className="text-xs text-slate-100">குடும்பச் சுற்றுலா திட்டங்கள், TTDC விடுதிகள் மற்றும் பயண வழித்தடங்கள்.</p>
          <span className="text-[11px] text-emerald-400 font-bold block pt-1 underline">சுற்றுலா மையம் செல்ல ↗</span>
        </div>
      </div>
    </div>
  );
}