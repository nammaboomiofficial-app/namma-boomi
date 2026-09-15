import React, { useState } from 'react';

const ECOSYSTEM_JOBS = [
  {
    id: 'field_loan',
    title: 'மைக்ரோபைனான்ஸ் & களக்கடன் அலுவலர்',
    category: 'நிதி & வங்கி சேவை',
    desc: 'கிராமப்புற மற்றும் மகளிர் சுயஉதவிக் குழுக்களுக்கு கடன் வழிகாட்டல் மற்றும் தவணை மேற்பார்வை.',
    salary: '₹18,000 - ₹28,000 + TA/DA',
    locations: 'சென்னை, செங்கல்பட்டு, காஞ்சிபுரம் & தமிழக மாவட்டங்கள்',
    qualification: '12th / Any Degree (டூ-வீலர் அவசியம்)',
    badge: 'உடனடித் தேவை • ஆண்கள்/பெண்கள்',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: '💼'
  },
  {
    id: 'site_exec',
    title: 'ரியல் எஸ்டேட் & நில ஒருங்கிணைப்பாளர்',
    category: 'நிலம் & கட்டுமானப் பிரிவு',
    desc: 'அங்கீகரிக்கப்பட்ட வீட்டுமனைகளை வாடிக்கையாளர்களுக்கு நேரில் காண்பித்தல் மற்றும் விற்பனை ஒருங்கிணைப்பு.',
    salary: '₹20,000 - ₹35,000 + கவர்ச்சிகர இன்சென்டிவ்',
    locations: 'தாம்பரம், திருப்போரூர், வண்டலூர், OMR & சுற்றுவட்டாரம்',
    qualification: 'Diploma / பட்டப்படிப்பு (பேச்சுத்திறன்)',
    badge: 'அதிக கமிஷன் வாய்ப்பு',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    icon: '🏡'
  },
  {
    id: 'mis_tally',
    title: 'டேட்டா என்ட்ரி & MIS எக்ஸிகியூட்டிவ்',
    category: 'அலுவலகப் பணிகள்',
    desc: 'நிறுவனங்களின் தினசரி கணக்கு வழக்குகள், எக்செல் அறிக்கைகள் (Excel & BI) மற்றும் பில்லிங் பணிகள்.',
    salary: '₹16,000 - ₹25,000',
    locations: 'சென்னை, புறநகர் & உள்ளூர் அலுவலகங்கள்',
    qualification: 'Excel / Tally அடிப்படை அறிவு (பயிற்சி பெற்றவர்களுக்கு முன்னுரிமை)',
    badge: 'கல்வி மாடியூல் பயிற்சி இணைப்பு',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    icon: '💻'
  },
  {
    id: 'agri_supervisor',
    title: 'பண்ணை மேற்பார்வையாளர் & அக்ரி டெக்',
    category: 'விவசாயப் பிரிவு',
    desc: 'சொட்டு நீர் பாசனம், இயற்கை உரம், பண்ணை பராமரிப்பு மற்றும் நவீன வேளாண் உபகரணங்கள் கையாளுதல்.',
    salary: '₹15,000 - ₹24,000 + தங்குமிடம் வசதி',
    locations: 'செங்கல்பட்டு, திருவள்ளூர் & வேளாண் மண்டலங்கள்',
    qualification: 'விவசாய ஆர்வம் / அனுபவம் அல்லது 10th/12th',
    badge: 'உணவு/தங்குமிடம் உதவி',
    badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
    icon: '🌾'
  },
  {
    id: 'store_billing',
    title: 'உள்ளூர் வணிகர் கடை & குடோன் மேலாளர்',
    category: 'வர்த்தகம் & தளவாடங்கள்',
    desc: 'MSME கடைகள் மற்றும் குடோன்களில் சரக்கு இருப்பு சரிபார்ப்பு, பேக்கிங் மற்றும் வாடிக்கையாளர் பில்லிங்.',
    salary: '₹14,000 - ₹22,000',
    locations: 'உங்கள் சொந்த ஊர் / வட்டாரப் பகுதிகள்',
    qualification: '10th / 12th / ITI',
    badge: 'உள்ளூரிலேயே வேலை',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    icon: '📦'
  },
  {
    id: 'survey_assistant',
    title: 'நில அளவை & ஆவண ஆய்வு உதவியாளர்',
    category: 'சட்ட தணிக்கைப் பிரிவு',
    desc: 'FMB நில அளவை பணிகளில் உதவுதல் மற்றும் சார்பதிவாளர் அலுவலக ஆவண சேகரிப்பு களப்பணி.',
    salary: '₹18,000 - ₹26,000',
    locations: 'வட்டார தாலுகா மற்றும் பதிவு மையங்கள்',
    qualification: 'ITI Survey / Diploma Civil / Any Degree',
    badge: 'பிரத்யேக தணிக்கைப் பணி',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    icon: '📐'
  },
  {
    id: 'machinery_driver',
    title: 'டிராக்டர், ஹார்வெஸ்டர் & சரக்கு ஓட்டுநர்',
    category: 'போக்குவரத்து & பண்ணை இயந்திரங்கள்',
    desc: 'விவசாய நிலங்களில் டிராக்டர் உழவு, அறுவடை இயந்திரம் (Harvester) மற்றும் B2B விளைபொருள் சரக்கு லாரி/பிக்கப் இயக்குதல்.',
    salary: '₹18,000 - ₹32,000 + தினசரி பேட்டா',
    locations: 'உங்கள் சொந்த தாலுகா & தமிழக மாவட்டங்கள்',
    qualification: 'Heavy / Commercial ஓட்டுநர் உரிமம் (டிரைவிங் லைசென்ஸ்)',
    badge: 'உடனடி தேவை • Daily Bata',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    icon: '🚜'
  },
  {
    id: 'govt_exam_prep',
    title: 'TNPSC (குரூப் 4 / VAO) & கூட்டுறவு வங்கி தேர்வுகள்',
    category: 'அரசுத் தேர்வுகள் & நேரடி வழிகாட்டல்',
    desc: 'TNPSC குரூப் 4/VAO, தமிழ்நாடு கூட்டுறவு வங்கி உதவியாளர், அஞ்சல் துறை GDS மற்றும் சீருடைப் பணியாளர் (போலீஸ்) தேர்வு நேரடி வழிகாட்டல்.',
    salary: 'அரசு ஊதிய விகிதம் (Govt Pay Scale)',
    locations: 'தமிழ்நாடு முழுவதும் (அரசுப் பணிகள்)',
    qualification: '10th / 12th / ஏதேனும் ஒரு பட்டப்படிப்பு (Any Degree)',
    badge: 'அரசு வேலை வழிகாட்டி',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: '🏛️'
  }
];

export default function JobModule() {
  const [tab, setTab] = useState('seeker'); // 'seeker' அல்லது 'employer'
  const [loading, setLoading] = useState(false);

  // வேலை தேடுபவர் படிவம்
  const [seekerData, setSeekerData] = useState({
    name: '',
    phone: '',
    location: '',
    qualification: 'பட்டதாரி (Degree)',
    jobRole: 'மைக்ரோபைனான்ஸ் & களக்கடன் அலுவலர்'
  });

  // நிறுவனங்களுக்கான படிவம் (Employer)
  const [employerData, setEmployerData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    location: '',
    staffNeeded: 'களப்பணியாளர்கள் / விற்பனை'
  });

  // கூகுள் ஷீட் CRM & வாட்ஸ்அப் ஒருங்கிணைப்பு
  const handleSeekerSubmit = (e) => {
    e.preventDefault();
    if (!seekerData.phone || seekerData.phone.length < 10) {
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
          name: seekerData.name || 'வேலை நாடுநர்',
          phone: seekerData.phone,
          village: seekerData.location || 'குறிப்பிடப்படவில்லை',
          taluk: seekerData.qualification,
          surveyNo: seekerData.jobRole,
          feeStatus: 'இலவச வேலை விண்ணப்பம்',
          status: 'வேலை விண்ணப்பம் (Job Application)'
        })
      });
    } catch (err) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! நான் வேலைவாய்ப்பிற்கு விண்ணப்பிக்க விரும்புகிறேன்.\n\n👤 பெயர்: ${seekerData.name || '-'}\n📱 வாட்ஸ்அப்: ${seekerData.phone}\n📍 இருப்பிடம்: ${seekerData.location || '-'}\n🎓 கல்வி: ${seekerData.qualification}\n🎯 விரும்பும் பணி: ${seekerData.jobRole}\n\nஅடுத்தகட்ட நேர்காணல் வழிகாட்டலை பகிரவும்.`;
    const waUrl = `https://wa.me/919962369131?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  const handleEmployerSubmit = (e) => {
    e.preventDefault();
    if (!employerData.phone || employerData.phone.length < 10) {
      alert('தயவுசெய்து சரியான 10 இலக்க தொடர்பு எண்ணை உள்ளிடவும்.');
      return;
    }

    setLoading(true);

    try {
      fetch('https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZB0YKKbWNIKD7CzSh0M0qvfkHhORCw53YMBZX1nKCB1AcSAu/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${employerData.companyName} (${employerData.contactPerson})`,
          phone: employerData.phone,
          village: employerData.location || 'குறிப்பிடப்படவில்லை',
          taluk: 'நிறுவன ஆள்தேர்வு',
          surveyNo: employerData.staffNeeded,
          feeStatus: 'ஆள்தேவை பதிவு',
          status: 'ஆட்கள் தேவை (Employer Requirement)'
        })
      });
    } catch (err) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! எங்கள் நிறுவனத்திற்கு தகுதியான ஆட்கள் தேவைப்படுகிறார்கள்.\n\n🏢 நிறுவனம்: ${employerData.companyName}\n👤 தொடர்பாளர்: ${employerData.contactPerson}\n📱 எண்: ${employerData.phone}\n📍 இடம்: ${employerData.location}\n👥 தேவைப்படும் பணி: ${employerData.staffNeeded}\n\nதகுதியான நபர்களை ஒருங்கிணைக்க உதவவும்.`;
    const waUrl = `https://wa.me/919962369131?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  const handleCardApply = (jobTitle) => {
    setSeekerData((prev) => ({ ...prev, jobRole: jobTitle }));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. பிரதான பேனர் & இருவழி விண்ணப்ப முறை (Seeker vs Employer) */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/70 via-slate-900/90 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md">
        
        {/* தலைப்பு */}
        <div className="text-center space-y-2 mb-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-full">
            360° வேலைவாய்ப்பு & மனிதவள மையம் • 100% இலவச சேவை
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            உள்ளூர் & நிறுவன வேலைவாய்ப்புகள் (Jobs & Career Desk)
          </h2>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto">
            நிதி, நிலம், விவசாயம் மற்றும் அலுவலகப் பணிகளுக்கு நேரடி ஆள்தேர்வு மற்றும் தொழில் வழிகாட்டல்.
          </p>

          {/* பயனர் வகை சுவிட்ச் (Tabs) */}
          <div className="flex justify-center gap-2 pt-3">
            <button
              onClick={() => setTab('seeker')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === 'seeker'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              🎯 எனக்கு வேலை வேண்டும் (Job Seeker)
            </button>
            <button
              onClick={() => setTab('employer')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === 'employer'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              🏢 எனக்கு ஆட்கள் தேவை (Hire Staff)
            </button>
          </div>
        </div>

        {/* படிவம் 1: வேலை தேடுபவர் (Job Seeker Desk) */}
        {tab === 'seeker' && (
          <form onSubmit={handleSeekerSubmit} className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 md:p-6 max-w-4xl mx-auto shadow-inner text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">உங்கள் பெயர்:</label>
                <input
                  type="text"
                  placeholder="உதாரணம்: கார்த்திக்"
                  value={seekerData.name}
                  onChange={(e) => setSeekerData({ ...seekerData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  வாட்ஸ்அப் எண் <span className="text-red-400">*</span>:
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  placeholder="10 இலக்க எண்"
                  value={seekerData.phone}
                  onChange={(e) => setSeekerData({ ...seekerData, phone: e.target.value.replace(/\D/g, '') })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">கல்வித் தகுதி:</label>
                <select
                  value={seekerData.qualification}
                  onChange={(e) => setSeekerData({ ...seekerData, qualification: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="10th / 12th">10th / 12th</option>
                  <option value="ITI / Diploma">ITI / Diploma</option>
                  <option value="பட்டதாரி (Degree)">பட்டதாரி (Any Degree)</option>
                  <option value="முதுகலை (PG)">முதுகலை (Post Graduate)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">விரும்பும் பணி:</label>
                <select
                  value={seekerData.jobRole}
                  onChange={(e) => setSeekerData({ ...seekerData, jobRole: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  {ECOSYSTEM_JOBS.map((j) => (
                    <option key={j.id} value={j.title}>{j.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <input
                type="text"
                placeholder="உங்கள் ஊர் / மாவட்டம் (எ.கா: திருப்போரூர் / செங்கல்பட்டு)"
                value={seekerData.location}
                onChange={(e) => setSeekerData({ ...seekerData, location: e.target.value })}
                className="w-full sm:w-80 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                {loading ? 'இணைகிறது...' : 'உடனடி வேலை பெற (WhatsApp) ↗'}
              </button>
            </div>
          </form>
        )}

        {/* படிவம் 2: ஆட்கள் தேவைப்படும் நிறுவனங்கள் (Employer Corner) */}
        {tab === 'employer' && (
          <form onSubmit={handleEmployerSubmit} className="bg-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 md:p-6 max-w-4xl mx-auto shadow-inner text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">நிறுவனம் / வணிகப் பெயர்:</label>
                <input
                  type="text"
                  required
                  placeholder="உதாரணம்: ஸ்ரீ ரியல்டர்ஸ்"
                  value={employerData.companyName}
                  onChange={(e) => setEmployerData({ ...employerData, companyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">தொடர்பாளர் பெயர்:</label>
                <input
                  type="text"
                  placeholder="உதாரணம்: ரமேஷ் (மேலாளர்)"
                  value={employerData.contactPerson}
                  onChange={(e) => setEmployerData({ ...employerData, contactPerson: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  தொடர்பு எண் <span className="text-red-400">*</span>:
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  placeholder="10 இலக்க மொபைல் எண்"
                  value={employerData.phone}
                  onChange={(e) => setEmployerData({ ...employerData, phone: e.target.value.replace(/\D/g, '') })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">தேவைப்படும் ஆட்கள்:</label>
                <input
                  type="text"
                  placeholder="எ.கா: 2 களப்பணியாளர்கள்"
                  value={employerData.staffNeeded}
                  onChange={(e) => setEmployerData({ ...employerData, staffNeeded: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <input
                type="text"
                placeholder="நிறுவனம் உள்ள இடம் / ஊர்"
                value={employerData.location}
                onChange={(e) => setEmployerData({ ...employerData, location: e.target.value })}
                className="w-full sm:w-80 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                {loading ? 'பதிவாகிறது...' : 'ஆட்கள் தேவை பதிவு செய்க (WhatsApp) ↗'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 2. கல்வி - வேலை வாய்ப்பு பாலம் (Skill to Job Banner) */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
            படிப்பு ➔ நேரடி வேலை வாய்ப்பு
          </span>
          <h4 className="text-base font-bold text-white">
            கம்ப்யூட்டர் & டேட்டா பணிகளுக்குத் தயாராக வேண்டுமா?
          </h4>
          <p className="text-xs text-slate-300">
            நம்ம பூமி 360-ன் "Advanced Excel & BI" பயிற்சியில் இணைந்து சான்றிதழுடன் கூடிய வேலைவாய்ப்பைப் பெறுங்கள்.
          </p>
        </div>
        <button
          onClick={() => {
            const wa = `https://wa.me/919962369131?text=${encodeURIComponent('வணக்கம்! எனக்கு எக்செல் பயிற்சி மற்றும் வேலைவாய்ப்பு விவரங்கள் தேவை.')}`;
            window.open(wa, '_blank');
          }}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs whitespace-nowrap transition-all"
        >
          பயிற்சி & வேலை விவரம் ↗
        </button>
      </div>

      {/* 3. தளம் சார்ந்த 6 பிரத்யேக வேலை கார்டுகள் */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ECOSYSTEM_JOBS.map((job) => (
          <div
            key={job.id}
            className="group relative rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900/95 hover:border-blue-500/50 p-5 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-blue-950/30 text-left"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-2xl p-2 bg-slate-800/80 rounded-xl border border-slate-700/50">
                  {job.icon}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${job.badgeColor}`}>
                  {job.badge}
                </span>
              </div>

              <span className="text-[11px] font-semibold text-blue-400 block">{job.category}</span>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mt-0.5">
                {job.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {job.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[11px]">சம்பளம் / வருமானம்:</span>
                  <span className="text-emerald-400 font-bold">{job.salary}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[11px]">தகுதி:</span>
                  <span className="text-slate-300 font-medium">{job.qualification}</span>
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  📍 {job.locations}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCardApply(job.title)}
              className="mt-4 w-full py-2 px-4 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 hover:border-blue-500 transition-all flex items-center justify-center gap-1"
            >
              விண்ணப்பிக்க (Apply Now) ↗
            </button>
          </div>
        ))}
      </div>

      {/* 4. உத்தரவாதம் & வெளிப்படைத்தன்மை பேட்ஜ்கள் */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-slate-400 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div className="p-1.5">🚫 பதிவுக் கட்டணம் ஏதுமில்லை</div>
        <div className="p-1.5">🤝 நேரடி நேர்காணல் வழிகாட்டல்</div>
        <div className="p-1.5">🛡️ 100% சரிபார்க்கப்பட்ட வேலைகள்</div>
        <div className="p-1.5">📄 பயோடேட்டா (Resume) உதவி</div>
      </div>
    </div>
  );
}