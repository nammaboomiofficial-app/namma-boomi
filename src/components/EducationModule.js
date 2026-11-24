import React, { useState, useMemo } from 'react';
import courses from '../data/educationData.json';
import { getWhatsAppUrl } from '../config';

const GOVT_EDU_PORTALS = [
  {
    code: 'SWAYAM',
    name: 'மத்திய அரசின் இலவச ஆன்லைன் படிப்புகள் & சான்றிதழ்',
    tag: '100% இலவசம் (UGC / AICTE)',
    url: 'https://swayam.gov.in/'
  },
  {
    code: 'NPTEL (IIT)',
    name: 'IIT மெட்ராஸ் தொழில்நுட்பம் & டேட்டா சயின்ஸ் படிப்புகள்',
    tag: 'IIT சான்றிதழ் தேர்வு',
    url: 'https://nptel.ac.in/'
  },
  {
    code: 'NAAN MUDHALVAN',
    name: 'தமிழ்நாடு அரசு நான் முதல்வன் திறன் மேம்பாட்டுத் தளம்',
    tag: 'கல்லூரி மாணவர்களுக்கான சிறப்புப் பயிற்சி',
    url: 'https://www.naanmudhalvan.tn.gov.in/'
  },
  {
    code: 'SKILL INDIA',
    name: 'Skill India Digital Hub (NSDC இலவச சான்றிதழ்கள்)',
    tag: 'AI, Excel, Tally & தொழில்நுட்பம்',
    url: 'https://www.skillindiadigital.gov.in/'
  },
  {
    code: 'NSP SCHOLARSHIP',
    name: 'தேசிய கல்வி உதவித்தொகை தளம் (National Scholarship Portal)',
    tag: 'மத்திய & மாநில உதவித்தொகை',
    url: 'https://scholarships.gov.in/'
  },
  {
    code: 'TN SCHOLARSHIP',
    name: 'தமிழ்நாடு புதுமைப் பெண் / தமிழ்ப் புதல்வன் & UMIS தளம்',
    tag: 'மாதம் ₹1,000 உதவித்தொகை',
    url: 'https://umis.tn.gov.in/'
  },
  {
    code: 'DIKSHA / TN KALVI',
    name: 'பள்ளி மாணவர்களுக்கான டிஜிட்டல் பாடப்புத்தகம் & வீடியோ',
    tag: '1 முதல் 12-ம் வகுப்பு வரை',
    url: 'https://diksha.gov.in/tn/'
  },
  {
    code: 'AICTE INTERNSHIP',
    name: 'அகில இந்திய தொழில்நுட்பக் கல்வி குழு Internship தளம்',
    tag: 'Stipend உடன் பயிற்சி',
    url: 'https://internship.aicte-india.org/'
  }
];

const TN_SCHOLARSHIPS = [
  {
    title: 'புதுமைப் பெண் திட்டம் (தமிழ்நாடு அரசு)',
    benefit: 'மாதம் ₹1,000 நேரடி வங்கிக் கணக்கில்',
    eligibility: '6 முதல் 12-ம் வகுப்பு வரை அரசுப் பள்ளியில் படித்து உயர்கல்வி சேரும் மாணவிகள்.'
  },
  {
    title: 'தமிழ்ப் புதல்வன் திட்டம் (தமிழ்நாடு அரசு)',
    benefit: 'மாதம் ₹1,000 நேரடி வங்கிக் கணக்கில்',
    eligibility: 'அரசுப் பள்ளி மற்றும் அரசு உதவிபெறும் தமிழ் வழிப் பள்ளிகளில் படித்த மாணவர்கள்.'
  },
  {
    title: 'முதல் தலைமுறைப் பட்டதாரி சலுகை (FG)',
    benefit: 'கல்லூரி கல்விக் கட்டணத்தில் முழு விலக்கு',
    eligibility: 'குடும்பத்தில் முதன்முதலாகப் பட்டப்படிப்பு சேரும் மாணவ-மாணவிகள்.'
  },
  {
    title: 'BC / MBC / SC / ST போஸ்ட் மெட்ரிக் உதவித்தொகை',
    benefit: 'கல்விக் கட்டணம் + விடுதி உதவித்தொகை',
    eligibility: 'அரசு நிர்ணயித்த குடும்ப ஆண்டு வருமான வரம்பிற்குள் உள்ள மாணவர்கள்.'
  }
];

export default function EducationModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'ai_tutor' | 'scholarship_calc' | 'govt_portals' | 'institute_partner'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.title || 'Advanced Excel & Power BI');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentMode, setStudentMode] = useState('ஆன்லைன் / வார இறுதி வகுப்பு (Weekend)');
  const [submitted, setSubmitted] = useState(false);

  // AI டியூட்டர் & படிப்பு வழிகாட்டி
  const [aiGoal, setAiGoal] = useState('Data Analyst / MIS வேலைக்குச் செல்ல வேண்டும்');
  const [aiRoadmap, setAiRoadmap] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // கல்விக் கடன் EMI கணிப்பான்
  const [eduLoanAmount, setEduLoanAmount] = useState(300000);
  const [eduLoanYears, setEduLoanYears] = useState(5);
  const [eduInterestRate, setEduInterestRate] = useState(8.5);

  // கல்வி நிறுவனங்கள் கூட்டணிப் படிவம்
  const [instForm, setInstForm] = useState({
    instName: '',
    contactPerson: '',
    phone: '',
    city: '',
    needType: 'மாணவர்களுக்கான AI / Excel / Tally பட்டறை'
  });

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.title?.toLowerCase().includes(q) ||
        c.desc?.toLowerCase().includes(q) ||
        c.badge?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // கல்விக் கடன் EMI கணக்கீடு
  const eduLoanStats = useMemo(() => {
    const P = Number(eduLoanAmount) || 0;
    const r = (Number(eduInterestRate) || 0) / 12 / 100;
    const n = (Number(eduLoanYears) || 1) * 12;
    if (r === 0) return { emi: Math.round(P / n), totalPayable: P };
    const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    return { emi, totalPayable: emi * n };
  }, [eduLoanAmount, eduLoanYears, eduInterestRate]);

  const handleEnquiry = (courseName) => {
    const course = courseName || selectedCourse;
    if (!studentPhone || studentPhone.length < 10) {
      alert('தயவுசெய்து உங்கள் 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.');
      return;
    }

    try {
      fetch(
        'https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZB0YKKbWNIKD7CzSh0M0qvfkHhORCw53YMBZX1nKCB1AcSAu/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: studentName || 'மாணவர் லீட்',
            phone: studentPhone,
            village: course,
            taluk: studentMode,
            district: 'Education Lead',
            leadType: 'கல்வி & பயிற்சி',
            feeStatus: 'புதிய சேர்க்கை',
            status: 'Course Enquiry'
          })
        }
      );
    } catch (e) {
      console.error(e);
    }

    const msg = `வணக்கம் நம்ம பூமி 360! நான் "${course}" பயிற்சியில் இணைய விரும்புகிறேன்.\n\n👤 பெயர்: ${studentName || '-'}\n📱 எண்: ${studentPhone}\n🎓 படிப்பு: ${course}\n🕒 பயிற்சி முறை: ${studentMode}\n\nபாடத்திட்டம் (Syllabus), கட்டணம் மற்றும் இலவச டெமோ வகுப்பு விவரங்களை அனுப்பவும்.`;
    window.open(getWhatsAppUrl(msg), '_blank');
    setSubmitted(true);
  };

  // AI 30-Day Study Roadmap உருவாக்கி
  const handleGenerateRoadmap = async () => {
    setIsAiLoading(true);
    setAiRoadmap('');
    try {
      const res = await fetch('/api/polish-petition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: {
            applicantName: studentName || 'மாணவர்',
            taluk: 'தமிழ்நாடு',
            district: 'தமிழ்நாடு',
            subject: `${selectedCourse} — இலக்கு: ${aiGoal}`
          },
          selectedForm: '30-Day Skill Mastery & Career Roadmap',
          applicationMode: 'education',
          customNote: `தமிழ்நாடு மாணவர்/பணியாளருக்கு இந்தப் படிப்பிற்கான 1) வாரம் 1 முதல் 4 வரையிலான 30-நாள் கற்றல் திட்டம் (30-Day Study Plan), 2) செய்ய வேண்டிய 2 Practical Projects, 3) இந்தத் திறனால் கிடைக்கும் வேலைவாய்ப்புகள் & சம்பள வரம்பு ஆகியவற்றை எளிய தமிழில் வழிகாட்டு.`
        })
      });
      const data = await res.json();
      if (data.polishedText) {
        setAiRoadmap(data.polishedText);
      }
    } catch (err) {
      console.error('AI Tutor Error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleInstitutionSubmit = (e) => {
    e.preventDefault();
    if (!instForm.phone || instForm.phone.length < 10) {
      alert('சரியான 10 இலக்க தொடர்பு எண்ணை உள்ளிடவும்.');
      return;
    }
    const msg = `வணக்கம் நம்ம பூமி 360! எங்கள் கல்வி நிறுவனத்தில் திறன் மேம்பாட்டுப் பயிற்சி / வளாக நேர்காணல் நடத்த விரும்புகிறோம்.\n\n🏫 நிறுவனம்: ${instForm.instName}\n👤 தொடர்பாளர்: ${instForm.contactPerson}\n📱 எண்: ${instForm.phone}\n📍 ஊர்: ${instForm.city}\n🎯 தேவை: ${instForm.needType}`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <section className="w-full space-y-8 text-left">
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/60 via-slate-900/95 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md text-white">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">
              360° கல்வி, AI டியூட்டர் & அரசு உதவித்தொகை மையம் • Good Skills • Good Life
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
              நவீன தொழில்நுட்பப் பயிற்சி & கல்வி வழிகாட்டி மையம்
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl">
              Excel, SQL, Power BI, Python, Tally, AI பயிற்சிகள் • AI 30-நாள் படிப்புத் திட்டம் • அரசு உதவித்தொகை & 8 இலவச சான்றிதழ் போர்ட்டல்கள்.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-200">
            <span className="bg-slate-950 border border-emerald-500/30 px-3 py-1.5 rounded-xl">🎓 Practical Projects</span>
            <span className="bg-slate-950 border border-emerald-500/30 px-3 py-1.5 rounded-xl">💼 100% வேலைவாய்ப்பு வழிகாட்டல்</span>
          </div>
        </div>

        {/* 5 தெளிவான 360° நேவிகேஷன் டேப்கள் */}
        <div className="flex flex-wrap gap-2 mt-6 pb-4 border-b border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('courses')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            💻 1. தொழில்நுட்பப் பயிற்சிகள் ({courses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai_tutor')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ai_tutor'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🤖 2. AI டியூட்டர் & 30-நாள் திட்டம்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scholarship_calc')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'scholarship_calc'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/50'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🎓 3. உதவித்தொகை & கல்விக் கடன் EMI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('govt_portals')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'govt_portals'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🏛️ 4. இலவச அரசு கற்றல் தளங்கள் (8)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('institute_partner')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'institute_partner'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🏫 5. கல்லூரி / பயிற்சி மையம் இணைப்பு
          </button>
        </div>

        {/* TAB 1: தொழில்நுட்பப் பயிற்சிகள் + சேர்க்கைப் படிவம் */}
        {activeTab === 'courses' && (
          <div className="mt-6 space-y-6">
            {/* Quick Lead Input */}
            <div className="bg-slate-900/90 p-4 md:p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-emerald-300">
                    🎯 கட்டணம், பாடத்திட்டம் (Syllabus) & இலவச டெமோ வகுப்பு அறிய:
                  </p>
                  <p className="text-[11px] text-slate-200">
                    தேர்ந்தெடுக்கப்பட்ட படிப்பு: <strong className="text-amber-300">{selectedCourse}</strong>
                  </p>
                </div>
                {submitted && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    ✓ வாட்ஸ்அப் வழிகாட்டல் தொடங்கப்பட்டது
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="உங்கள் பெயர் (எ.கா: அருண்)"
                  className="px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-white"
                />
                <input
                  type="tel"
                  maxLength={10}
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="வாட்ஸ்அப் எண் (10 இலக்கம்) *"
                  className="px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-white"
                />
                <select
                  value={studentMode}
                  onChange={(e) => setStudentMode(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-white"
                >
                  <option value="ஆன்லைன் / வார இறுதி வகுப்பு (Weekend)">ஆன்லைன் / வார இறுதி (Weekend)</option>
                  <option value="தினசரி மாலை நேர வகுப்பு (Evening)">தினசரி மாலை நேர வகுப்பு (Evening)</option>
                  <option value="நேரடி வகுப்பறை பயிற்சி (Offline)">நேரடி வகுப்பறை பயிற்சி (Offline)</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleEnquiry(selectedCourse)}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  பாடத்திட்டம் & கட்டணம் பெற ↗
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 கோர்ஸ் தேடுக (எ.கா: Excel, SQL, Power BI, Python, Tally, AI)..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
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

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course.title)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedCourse === course.title
                      ? 'bg-slate-800/90 border-emerald-400 shadow-lg shadow-emerald-900/30 ring-1 ring-emerald-400'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl p-2 bg-slate-950 rounded-xl border border-slate-800">{course.icon}</span>
                      <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded-full font-bold">
                        {course.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-white mt-1">{course.title}</h3>
                    <p className="text-slate-200 text-xs mt-1.5 leading-relaxed">{course.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course.title);
                      handleEnquiry(course.title);
                    }}
                    className="mt-4 w-full py-2 bg-slate-800 hover:bg-emerald-600 text-slate-100 hover:text-white rounded-xl text-xs font-bold border border-slate-700 hover:border-emerald-500 transition-all cursor-pointer"
                  >
                    விசாரிக்க & சேர (Enquire) ↗
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: AI டியூட்டர் & 30-நாள் கற்றல் திட்டம் */}
        {activeTab === 'ai_tutor' && (
          <div className="mt-6 space-y-4 bg-slate-950 p-5 rounded-2xl border border-indigo-500/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-indigo-300">
                  🤖 AI டியூட்டர் — 30-நாள் திறன் மேம்பாட்டுத் திட்டம் (30-Day Study Roadmap)
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  நீங்கள் கற்க விரும்பும் படிப்பையும் இலக்கையும் தேர்ந்தெடுத்தால், AI உங்களுக்கான 4-வார செயல்முறைப் பயிற்சித் திட்டத்தை உருவாக்கும்.
                </p>
              </div>
              <button
                type="button"
                onClick={handleGenerateRoadmap}
                disabled={isAiLoading}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg cursor-pointer shrink-0"
              >
                {isAiLoading ? 'AI திட்டம் தயாராகிறது... ⚡' : '✨ 30-நாள் படிப்புத் திட்டம் உருவாக்கு'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">கற்க விரும்பும் பாடப்பிரிவு:</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-slate-300 block mb-1">உங்கள் தொழில் இலக்கு (Career Goal):</label>
                <input
                  type="text"
                  value={aiGoal}
                  onChange={(e) => setAiGoal(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            {aiRoadmap && (
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-100 whitespace-pre-line leading-relaxed">
                {aiRoadmap}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: தமிழ்நாடு அரசு உதவித்தொகைகள் & கல்விக் கடன் EMI கணிப்பான் */}
        {activeTab === 'scholarship_calc' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TN_SCHOLARSHIPS.map((sc, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                  <h4 className="text-sm font-bold text-amber-400">{sc.title}</h4>
                  <p className="text-xs font-bold text-emerald-400">🎁 சலுகை: {sc.benefit}</p>
                  <p className="text-xs text-slate-300">✓ தகுதி: {sc.eligibility}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3 text-xs">
                <h4 className="text-sm font-bold text-white">🏦 உயர்கல்விக் கடன் (Education Loan) EMI கணிப்பான்</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">கடன் தொகை (₹):</label>
                    <input
                      type="number"
                      value={eduLoanAmount}
                      onChange={(e) => setEduLoanAmount(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">காலம் (ஆண்டுகள்):</label>
                    <input
                      type="number"
                      min={1}
                      max={15}
                      value={eduLoanYears}
                      onChange={(e) => setEduLoanYears(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">வட்டி விகிதம் (%):</label>
                    <input
                      type="number"
                      step={0.1}
                      value={eduInterestRate}
                      onChange={(e) => setEduInterestRate(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-900 p-4 rounded-xl border border-slate-800 grid grid-cols-2 gap-3 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">மாதாந்திர EMI:</span>
                  <span className="text-lg font-black text-emerald-400">
                    ₹{eduLoanStats.emi.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">மொத்தத் தொகை:</span>
                  <span className="text-base font-bold text-white">
                    ₹{eduLoanStats.totalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 8 இலவச அரசு & IIT கற்றல் தளங்கள் */}
        {activeTab === 'govt_portals' && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {GOVT_EDU_PORTALS.map((portal) => (
              <div
                key={portal.url}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-blue-500/40 flex flex-col justify-between space-y-3 transition"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30 inline-block">
                    {portal.code}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-snug">{portal.name}</h4>
                  <p className="text-[11px] text-emerald-400">{portal.tag}</p>
                </div>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold text-center transition"
                >
                  தளம் செல்ல ↗
                </a>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: பள்ளிகள், கல்லூரிகள் & பயிற்சி மையங்கள் கூட்டணி */}
        {activeTab === 'institute_partner' && (
          <form
            onSubmit={handleInstitutionSubmit}
            className="mt-6 bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-4 max-w-4xl mx-auto"
          >
            <h3 className="text-sm font-bold text-purple-300">
              🏫 கல்லூரிகள் & பயிற்சி மையங்களுக்கான MoU / Workshop கூட்டணிப் பதிவு
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <input
                type="text"
                required
                placeholder="கல்லூரி / நிறுவனப் பெயர் *"
                value={instForm.instName}
                onChange={(e) => setInstForm({ ...instForm, instName: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
              />
              <input
                type="text"
                placeholder="தொடர்பாளர் / பேராசிரியர் பெயர்"
                value={instForm.contactPerson}
                onChange={(e) => setInstForm({ ...instForm, contactPerson: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
              />
              <input
                type="tel"
                maxLength={10}
                required
                placeholder="தொடர்பு எண் *"
                value={instForm.phone}
                onChange={(e) => setInstForm({ ...instForm, phone: e.target.value.replace(/\D/g, '') })}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
              />
              <input
                type="text"
                placeholder="ஊர் / மாவட்டம்"
                value={instForm.city}
                onChange={(e) => setInstForm({ ...instForm, city: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <input
                type="text"
                value={instForm.needType}
                onChange={(e) => setInstForm({ ...instForm, needType: e.target.value })}
                className="w-full sm:w-96 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer"
              >
                கூட்டணி விண்ணப்பம் அனுப்பு (WhatsApp) ↗
              </button>
            </div>
          </form>
        )}

        {/* Feature Highlights Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] text-slate-300">
          <div>✓ Hands-on Real Projects</div>
          <div>✓ AI 30-Day Study Plan</div>
          <div>✓ Direct Placement Support</div>
          <div>✓ Govt Scholarship Guide</div>
        </div>
      </div>

      {/* 360° எகோசிஸ்டம் பாலம் */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('jobs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">💼</span>
          <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
            பயிற்சி முடித்தவுடன் நேரடி வேலை!
          </h4>
          <p className="text-xs text-slate-100">
            Excel, SQL, Power BI & Tally முடித்தவர்களுக்கு நிறுவனங்களில் நேரடி நேர்காணல் மற்றும் A4 ரெஸ்யூம் ஸ்டுடியோ.
          </p>
          <span className="text-[11px] text-blue-400 font-bold block pt-1 underline">வேலைவாய்ப்பு மையம் செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('finance');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-emerald-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🏦</span>
          <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
            உயர்கல்விக் கடன் & நிதி வழிகாட்டல்
          </h4>
          <p className="text-xs text-slate-100">
            பொதுத்துறை வங்கிகளில் குறைந்த வட்டியில் உயர்கல்விக் கடன் மற்றும் வித்யாலட்சுமி போர்ட்டல் இணைப்பு.
          </p>
          <span className="text-[11px] text-emerald-400 font-bold block pt-1 underline">நிதி & கடன்கள் பிரிவு செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('business');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-amber-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🚀</span>
          <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
            சொந்தத் தொழில் & ஃப்ரீலான்சிங்
          </h4>
          <p className="text-xs text-slate-100">
            கணக்கியல், ஜிஎஸ்டி ஆலோசனை மையம் அல்லது டிஜிட்டல் சேவை மையம் தொடங்க 35% அரசு மானிய வழிகாட்டல்.
          </p>
          <span className="text-[11px] text-amber-400 font-bold block pt-1 underline">தொழில் & MSME மையம் செல்ல ↗</span>
        </div>
      </div>
    </section>
  );
}