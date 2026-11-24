import React, { useState, useMemo } from 'react';
import { getWhatsAppUrl } from '../config';
import ECOSYSTEM_JOBS from '../data/jobsData.json';

const GOVT_JOB_PORTALS = [
  {
    code: 'TNPSC',
    name: 'தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையம் (Group 1, 2, 4 & VAO)',
    tag: 'மாநில அரசு நிரந்தரப் பணி',
    url: 'https://www.tnpsc.gov.in/'
  },
  {
    code: 'TN VELAIVAAIPPU',
    name: 'தமிழ்நாடு வேலைவாய்ப்பு & பயிற்சித் துறை (Employment Exchange)',
    tag: 'ஆன்லைன் பதிவு & புதுப்பித்தல்',
    url: 'https://tnvelaivaaippu.gov.in/'
  },
  {
    code: 'NAAN MUDHALVAN',
    name: 'நான் முதல்வன் — திறன் மேம்பாடு & வளாக நேர்காணல் தளம்',
    tag: 'இலவச தொழில்நுட்பப் பயிற்சி',
    url: 'https://www.naanmudhalvan.tn.gov.in/'
  },
  {
    code: 'TNSDC',
    name: 'தமிழ்நாடு திறன் மேம்பாட்டுக் கழகம் (Free Skill & Placement)',
    tag: 'சான்றிதழுடன் வேலைவாய்ப்பு',
    url: 'https://www.tnskill.tn.gov.in/'
  },
  {
    code: 'NCS INDIA',
    name: 'தேசிய வேலைவாய்ப்பு சேவை தளம் (National Career Service)',
    tag: 'இந்தியா முழுவதும் தனியார் & அரசு',
    url: 'https://www.ncs.gov.in/'
  },
  {
    code: 'TN OVERSEAS',
    name: 'தமிழ்நாடு அரசு அயல்நாட்டு வேலைவாய்ப்பு நிறுவனம் (OMCL)',
    tag: 'பாதுகாப்பான வெளிநாட்டு வேலை',
    url: 'https://www.omcmanpower.tn.gov.in/'
  },
  {
    code: 'SSC INDIA',
    name: 'மத்திய அரசு பணியாளர் தேர்வாணையம் (SSC CGL / CHSL / GD)',
    tag: 'மத்திய அரசுப் பணிகள்',
    url: 'https://ssc.gov.in/'
  },
  {
    code: 'IBPS BANKING',
    name: 'பொதுத்துறை வங்கித் தேர்வுகள் (PO / Clerk / RRB)',
    tag: 'வங்கித் துறை வேலைவாய்ப்பு',
    url: 'https://www.ibps.in/'
  }
];

export default function JobModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('jobs_board'); // 'jobs_board' | 'resume_studio' | 'salary_calc' | 'govt_portals' | 'employer'
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // AI நேர்காணல் வழிகாட்டி
  const [aiTips, setAiTips] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // சம்பள & PF/ESI கணிப்பான்
  const [grossSalary, setGrossSalary] = useState(25000);
  const [pfApplicable, setPfApplicable] = useState(true);
  const [freelanceHourlyRate, setFreelanceHourlyRate] = useState(400);
  const [freelanceHoursPerWeek, setFreelanceHoursPerWeek] = useState(15);

  // ஸ்மார்ட் ரெஸ்யூம் ஸ்டுடியோ
  const [resume, setResume] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    targetRole: 'Data Analyst / MIS Executive',
    education: 'B.Com / B.Sc (University of Madras)',
    experience: '2 ஆண்டுகள் பணி அனுபவம் (அல்லது Fresher)',
    skills: 'MS Excel, SQL, Power BI, Tally Prime, வாடிக்கையாளர் சேவை',
    languages: 'தமிழ் (படிக்க, எழுத, பேச), ஆங்கிலம் (சரளமாக)'
  });

  // வேலை தேடுபவர் படிவம்
  const [seekerData, setSeekerData] = useState({
    name: '',
    phone: '',
    location: '',
    qualification: 'பட்டதாரி (Degree)',
    jobRole: ECOSYSTEM_JOBS[0]?.title || 'மைக்ரோபைனான்ஸ் & களக்கடன் அலுவலர்'
  });

  // நிறுவனங்களுக்கான படிவம் (Employer)
  const [employerData, setEmployerData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    location: '',
    staffNeeded: 'களப்பணியாளர்கள் / விற்பனை'
  });

  // வேலை தேடல் ஃபில்டர்
  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ECOSYSTEM_JOBS;
    return ECOSYSTEM_JOBS.filter(
      (j) =>
        j.title?.toLowerCase().includes(q) ||
        j.category?.toLowerCase().includes(q) ||
        j.locations?.toLowerCase().includes(q) ||
        j.desc?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // சம்பளக் கணக்கீடு
  const salaryStats = useMemo(() => {
    const gross = Number(grossSalary) || 0;
    const basic = Math.round(gross * 0.5);
    const employeePf = pfApplicable ? Math.min(1800, Math.round(basic * 0.12)) : 0;
    const employeeEsi = gross <= 21000 ? Math.round(gross * 0.0075) : 0;
    const netTakeHome = Math.max(0, gross - employeePf - employeeEsi);
    const annualCtc = (gross + employeePf) * 12;
    const monthlyFreelance = (Number(freelanceHourlyRate) || 0) * (Number(freelanceHoursPerWeek) || 0) * 4;
    return { basic, employeePf, employeeEsi, netTakeHome, annualCtc, monthlyFreelance };
  }, [grossSalary, pfApplicable, freelanceHourlyRate, freelanceHoursPerWeek]);

  // AI நேர்காணல் & திறன் ஆலோசனை
  const handleGetInterviewTips = async () => {
    setIsAiLoading(true);
    setAiTips('');
    try {
      const res = await fetch('/api/polish-petition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: {
            applicantName: seekerData.name || 'வேலை நாடுநர்',
            taluk: seekerData.location || 'தமிழ்நாடு',
            district: seekerData.location || 'தமிழ்நாடு',
            subject: `${seekerData.jobRole} (${seekerData.qualification})`
          },
          selectedForm: 'Job Interview & Career Success Guide',
          applicationMode: 'career',
          customNote: `இந்தப் பணிக்கு விண்ணப்பிக்கும் தமிழ்நாடு இளைஞருக்கு: 1) நேர்காணலில் கேட்கப்படும் 3 முக்கிய கேள்விகள், 2) ரெஸ்யூமில் சேர்க்க வேண்டிய 3 முக்கிய திறன்கள், 3) சம்பளப் பேச்சுவார்த்தை குறிப்பு ஆகியவற்றை சுருக்கமாகவும் தெளிவாகவும் வழிகாட்டு.`
        })
      });
      const data = await res.json();
      if (data.polishedText) {
        setAiTips(data.polishedText);
      }
    } catch (err) {
      console.error('AI Career Tips Error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // கூகுள் ஷீட் CRM & வாட்ஸ்அப் ஒருங்கிணைப்பு (Job Seeker)
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
    const waUrl = getWhatsAppUrl(msg);
    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  // நிறுவனங்களுக்கான படிவம் (Employer)
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
    const waUrl = getWhatsAppUrl(msg);
    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  const handleCardApply = (jobTitle) => {
    setSeekerData((prev) => ({ ...prev, jobRole: jobTitle }));
    setActiveTab('jobs_board');
    document.getElementById('seeker-apply-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShareResumeWhatsApp = () => {
    const msg = `📄 *நம்ம பூமி 360° — டிஜிட்டல் பயோடேட்டா (Resume)*\n\n👤 பெயர்: ${resume.fullName || '-'}\n📱 தொலைபேசி: ${resume.phone || '-'}\n✉️ மின்னஞ்சல்: ${resume.email || '-'}\n📍 ஊர்: ${resume.city || '-'}\n🎯 விரும்பும் பதவி: ${resume.targetRole}\n🎓 கல்வி: ${resume.education}\n💼 அனுபவம்: ${resume.experience}\n🛠️ திறன்கள்: ${resume.skills}\n🗣️ மொழிகள்: ${resume.languages}\n\nதகுதியான வேலைவாய்ப்பிற்குப் பரிசீலிக்கவும்.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="w-full space-y-8 text-left">
      {/* 1. பிரதான பேனர் & 5-பிரிவு 360° நேவிகேஷன் */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/70 via-slate-900/90 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-full">
              360° வேலைவாய்ப்பு, ரெஸ்யூம் ஸ்டுடியோ & அரசு போர்ட்டல் மையம்
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">
              உள்ளூர், கார்ப்பரேட் & அரசு வேலைவாய்ப்பு மையம்
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              நேரடி வேலைவாய்ப்புகள், A4 PDF ரெஸ்யூம் உருவாக்கி, சம்பள PF/ESI கணிப்பான், AI நேர்காணல் பயிற்சி மற்றும் 8 அரசு வேலைவாய்ப்பு போர்ட்டல்கள்.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-200">
            <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg">🚫 0% பதிவுக் கட்டணம்</span>
            <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg">🛡️ 100% சரிபார்க்கப்பட்ட நிறுவனங்கள்</span>
          </div>
        </div>

        {/* 5 தெளிவான 360° நேவிகேஷன் டேப்கள் */}
        <div className="flex flex-wrap gap-2 mt-6 pb-4 border-b border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('jobs_board')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'jobs_board'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🎯 1. வேலைவாய்ப்புகள் & விண்ணப்பம் ({ECOSYSTEM_JOBS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('resume_studio')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'resume_studio'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/40'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            📄 2. A4 ரெஸ்யூம் ஸ்டுடியோ (PDF)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('salary_calc')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'salary_calc'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            💰 3. சம்பளம், PF & ஃப்ரீலான்ஸ் கணிப்பான்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('govt_portals')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'govt_portals'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🏛️ 4. அரசு வேலை & திறன் போர்ட்டல்கள் (8)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('employer')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'employer'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🏢 5. ஆட்கள் தேவை பதிவு (Hire Staff)
          </button>
        </div>

        {/* TAB 1: வேலை தேடுபவர் விண்ணப்பம் + AI நேர்காணல் + நேரடி வேலை கார்டுகள் */}
        {activeTab === 'jobs_board' && (
          <div className="mt-6 space-y-6">
            {/* விரைவு வேலை விண்ணப்பப் படிவம் */}
            <form
              id="seeker-apply-form"
              onSubmit={handleSeekerSubmit}
              className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-inner"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-100 mb-1">உங்கள் பெயர்:</label>
                  <input
                    type="text"
                    placeholder="உதாரணம்: கார்த்திக்"
                    value={seekerData.name}
                    onChange={(e) => setSeekerData({ ...seekerData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-100 mb-1">
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
                  <label className="block text-xs font-medium text-slate-100 mb-1">கல்வித் தகுதி:</label>
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
                  <label className="block text-xs font-medium text-slate-100 mb-1">விரும்பும் பணி:</label>
                  <select
                    value={seekerData.jobRole}
                    onChange={(e) => setSeekerData({ ...seekerData, jobRole: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {ECOSYSTEM_JOBS.map((j) => (
                      <option key={j.id} value={j.title}>
                        {j.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="உங்கள் ஊர் / மாவட்டம் (எ.கா: திருப்போரூர் / செங்கல்பட்டு)"
                  value={seekerData.location}
                  onChange={(e) => setSeekerData({ ...seekerData, location: e.target.value })}
                  className="w-full sm:w-80 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleGetInterviewTips}
                    disabled={isAiLoading}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition cursor-pointer"
                  >
                    {isAiLoading ? 'AI ஆய்வு...' : '🤖 AI நேர்காணல் டிப்ஸ்'}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    {loading ? 'இணைகிறது...' : 'உடனடி வேலை பெற (WhatsApp) ↗'}
                  </button>
                </div>
              </div>

              {aiTips && (
                <div className="mt-4 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                  {aiTips}
                </div>
              )}
            </form>

            {/* தேடல் பார் */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 பணி அல்லது ஊர் பெயரைத் தேடுக (எ.கா: Excel, ஓட்டுநர், மைக்ரோபைனான்ஸ், செங்கல்பட்டு)..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-slate-200 hover:text-white shrink-0 cursor-pointer"
                >
                  ✕ அழி
                </button>
              )}
            </div>

            {/* தளம் சார்ந்த வேலை கார்டுகள் */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group relative rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900/95 hover:border-blue-500/50 p-5 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-blue-950/30"
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
                    <p className="text-xs text-slate-100 mt-1.5 leading-relaxed line-clamp-2">{job.desc}</p>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200 text-[11px]">சம்பளம் / வருமானம்:</span>
                        <span className="text-emerald-400 font-bold">{job.salary}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200 text-[11px]">தகுதி:</span>
                        <span className="text-slate-300 font-medium">{job.qualification}</span>
                      </div>
                      <div className="text-[11px] text-slate-100 pt-1">📍 {job.locations}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCardApply(job.title)}
                    className="mt-4 w-full py-2 px-4 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 hover:border-blue-500 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    விண்ணப்பிக்க (Apply Now) ↗
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ஸ்மார்ட் A4 பயோடேட்டா / ரெஸ்யூம் ஸ்டுடியோ */}
        {activeTab === 'resume_studio' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <h3 className="text-sm font-bold text-amber-400">
                📄 உங்கள் விவரங்களை உள்ளிடுங்கள் (A4 Resume Generator)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">முழுப் பெயர்:</label>
                  <input
                    type="text"
                    placeholder="எ.கா: சு. கார்த்திகேயன்"
                    value={resume.fullName}
                    onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">மொபைல் எண்:</label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={resume.phone}
                    onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">மின்னஞ்சல் (Email):</label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={resume.email}
                    onChange={(e) => setResume({ ...resume, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">ஊர் / மாவட்டம்:</label>
                  <input
                    type="text"
                    placeholder="செங்கல்பட்டு / சென்னை"
                    value={resume.city}
                    onChange={(e) => setResume({ ...resume, city: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">விரும்பும் பணிப் பிரிவு (Target Role):</label>
                <input
                  type="text"
                  value={resume.targetRole}
                  onChange={(e) => setResume({ ...resume, targetRole: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">கல்வித் தகுதி (Education):</label>
                <input
                  type="text"
                  value={resume.education}
                  onChange={(e) => setResume({ ...resume, education: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">பணி அனுபவம் (Experience):</label>
                <input
                  type="text"
                  value={resume.experience}
                  onChange={(e) => setResume({ ...resume, experience: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">தொழில்நுட்பத் திறன்கள் (Key Skills):</label>
                <input
                  type="text"
                  value={resume.skills}
                  onChange={(e) => setResume({ ...resume, skills: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            {/* Live A4 Resume Preview */}
            <div className="lg:col-span-6 bg-white text-slate-900 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="border-b-2 border-blue-600 pb-3 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black text-slate-950">
                      {resume.fullName || 'உங்கள் பெயர் (YOUR NAME)'}
                    </h3>
                    <p className="text-xs font-bold text-blue-700 mt-0.5">{resume.targetRole}</p>
                  </div>
                  <div className="text-right text-[11px] text-slate-600">
                    <div>📱 {resume.phone || '98XXXXXXXX'}</div>
                    <div>✉️ {resume.email || 'email@example.com'}</div>
                    <div>📍 {resume.city || 'தமிழ்நாடு'}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase text-blue-800 border-b border-slate-200 pb-1">
                    🎓 கல்வித் தகுதி (Education)
                  </h4>
                  <p className="text-xs text-slate-800 mt-1">{resume.education}</p>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase text-blue-800 border-b border-slate-200 pb-1">
                    💼 பணி அனுபவம் (Work Experience)
                  </h4>
                  <p className="text-xs text-slate-800 mt-1">{resume.experience}</p>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase text-blue-800 border-b border-slate-200 pb-1">
                    🛠️ முக்கியத் திறன்கள் (Core Skills)
                  </h4>
                  <p className="text-xs text-slate-800 mt-1">{resume.skills}</p>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase text-blue-800 border-b border-slate-200 pb-1">
                    🗣️ தெரிந்த மொழிகள் (Languages)
                  </h4>
                  <p className="text-xs text-slate-800 mt-1">{resume.languages}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer"
                >
                  🖨️ A4 PDF ரெஸ்யூம் பிரிண்ட்
                </button>
                <button
                  type="button"
                  onClick={handleShareResumeWhatsApp}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer"
                >
                  📲 வாட்ஸ்அப்பில் அனுப்பு
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: சம்பளம், PF/ESI & ஃப்ரீலான்சிங் வருமானக் கணிப்பான் */}
        {activeTab === 'salary_calc' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-emerald-400">
                💰 மாதச் சம்பளம் & Take-Home கணிப்பான்
              </h3>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">மொத்த மாதச் சம்பளம் (Gross Salary):</span>
                  <span className="text-emerald-400 font-bold">₹{Number(grossSalary).toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={8000}
                  max={150000}
                  step={1000}
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pfApplicable}
                  onChange={(e) => setPfApplicable(e.target.checked)}
                  className="accent-emerald-500"
                />
                <span>EPF (வருங்கால வைப்பு நிதி - 12%) பிடித்தம் சேர்க்க</span>
              </label>

              <div className="pt-3 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-400">💻 பகுதி நேர / Freelance வருமானக் கணிப்பான்:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">1 மணி நேரக் கட்டணம் (₹):</label>
                    <input
                      type="number"
                      value={freelanceHourlyRate}
                      onChange={(e) => setFreelanceHourlyRate(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">வாரத்திற்கு வேலை நேரம்:</label>
                    <input
                      type="number"
                      value={freelanceHoursPerWeek}
                      onChange={(e) => setFreelanceHoursPerWeek(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950/50 to-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-3 text-xs">
              <span className="text-xs font-bold text-emerald-400">சம்பள விவரப் பட்டியல் (Monthly Pay Breakdown)</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">கையில் கிடைக்கும் சம்பளம் (Net):</span>
                  <span className="text-lg font-black text-emerald-400">
                    ₹{salaryStats.netTakeHome.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">ஆண்டு CTC மதிப்பு:</span>
                  <span className="text-lg font-black text-white">
                    ₹{salaryStats.annualCtc.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">மாத PF + ESI பிடித்தம்:</span>
                  <span className="text-sm font-bold text-amber-300">
                    ₹{(salaryStats.employeePf + salaryStats.employeeEsi).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-amber-500/30">
                  <span className="text-amber-300 block text-[10px]">மாத Freelance கூடுதல் வருமானம்:</span>
                  <span className="text-sm font-black text-amber-400">
                    ₹{salaryStats.monthlyFreelance.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 8 தமிழ்நாடு & மத்திய அரசு வேலைவாய்ப்பு போர்ட்டல்கள் */}
        {activeTab === 'govt_portals' && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {GOVT_JOB_PORTALS.map((portal) => (
              <div
                key={portal.url}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-purple-500/40 flex flex-col justify-between space-y-3 transition"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 inline-block">
                    {portal.code}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-snug">{portal.name}</h4>
                  <p className="text-[11px] text-emerald-400">{portal.tag}</p>
                </div>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-bold text-center transition"
                >
                  இணையதளம் செல்ல ↗
                </a>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: ஆட்கள் தேவைப்படும் நிறுவனங்கள் (Employer Corner) */}
        {activeTab === 'employer' && (
          <form
            onSubmit={handleEmployerSubmit}
            className="mt-6 bg-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 md:p-6 max-w-4xl mx-auto shadow-inner"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-100 mb-1">நிறுவனம் / வணிகப் பெயர்:</label>
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
                <label className="block text-xs font-medium text-slate-100 mb-1">தொடர்பாளர் பெயர்:</label>
                <input
                  type="text"
                  placeholder="உதாரணம்: ரமேஷ் (மேலாளர்)"
                  value={employerData.contactPerson}
                  onChange={(e) => setEmployerData({ ...employerData, contactPerson: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-100 mb-1">
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
                <label className="block text-xs font-medium text-slate-100 mb-1">தேவைப்படும் ஆட்கள்:</label>
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
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                {loading ? 'பதிவாகிறது...' : 'ஆட்கள் தேவை பதிவு செய்க (WhatsApp) ↗'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 2. கல்வி - வேலை வாய்ப்பு பாலம் (Skill to Job Banner - Bug Fixed!) */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
            படிப்பு ➔ நேரடி வேலை வாய்ப்பு
          </span>
          <h4 className="text-base font-bold text-white">
            கம்ப்யூட்டர் & டேட்டா பணிகளுக்குத் தயாராக வேண்டுமா?
          </h4>
          <p className="text-xs text-slate-300">
            நம்ம பூமி 360-ன் "Advanced Excel, SQL & Power BI" பயிற்சியில் இணைந்து சான்றிதழுடன் கூடிய வேலைவாய்ப்பைப் பெறுங்கள்.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {setCurrentModule && (
            <button
              type="button"
              onClick={() => {
                setCurrentModule('education');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs whitespace-nowrap cursor-pointer"
            >
              கல்வி மையம் செல்ல
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              const wa = getWhatsAppUrl('வணக்கம் நம்ம பூமி 360! எனக்கு Advanced Excel, SQL & Power BI பயிற்சி மற்றும் வேலைவாய்ப்பு விவரங்கள் தேவை.');
              window.open(wa, '_blank');
            }}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs whitespace-nowrap transition-all cursor-pointer"
          >
            பயிற்சி & வேலை விவரம் ↗
          </button>
        </div>
      </div>

      {/* 3. உத்தரவாதம் & வெளிப்படைத்தன்மை பேட்ஜ்கள் */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-slate-100 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div className="p-1.5">🚫 பதிவுக் கட்டணம் ஏதுமில்லை</div>
        <div className="p-1.5">🤝 நேரடி நேர்காணல் வழிகாட்டல்</div>
        <div className="p-1.5">🛡️ 100% சரிபார்க்கப்பட்ட வேலைகள்</div>
        <div className="p-1.5">📄 A4 PDF ரெஸ்யூம் ஸ்டுடியோ</div>
      </div>
    </div>
  );
}