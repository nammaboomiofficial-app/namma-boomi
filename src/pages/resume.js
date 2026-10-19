import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// பயனர் உள்ளிட்ட வரிகளை மட்டும் சுத்தமாக புல்லட் பாயிண்டுகளாக ஒழுங்குபடுத்தும் ஃபங்ஷன் (No hardcoded text)
const formatUserBullets = (text) => {
  if (!text) return [];
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      // பயனர் தட்டச்சு செய்த புல்லட் குறியீடுகளை மட்டும் நீக்குதல்
      let clean = line.replace(/^[•\-\*]\s*/, '').trim();
      if (!clean) return '';
      // முதல் எழுத்தை மட்டும் பெரிய எழுத்தாக மாற்றுதல்
      return clean.charAt(0).toUpperCase() + clean.slice(1);
    })
    .filter((line) => line.length > 0);
};

export default function ResumeBuilder() {
  const [template, setTemplate] = useState('harvard'); // 'harvard' | 'modern'

  // தொடக்க மாதிரி தரவுகள் (பயனர் தங்கள் விவரங்களை நேரடியாக உள்ளிடலாம்)
  const [resumeData, setResumeData] = useState({
    fullName: '',
    jobTitle: '',
    phone: '',
    email: '',
    location: '',
    linkedin: '',
    portfolio: '',
    summary: '',
    achievements: '',
    experience: [
      {
        id: 1,
        title: '',
        company: '',
        location: '',
        period: '',
        responsibilities: '',
      },
    ],
    education: [
      {
        id: 1,
        degree: '',
        institution: '',
        location: '',
        year: '',
      },
    ],
    projects: [
      {
        id: 1,
        name: '',
        role: '',
        technologies: '',
        description: '',
      },
    ],
    skills: '',
    certifications: '',
    languages: '',
  });

  // பிரவுசர் லோக்கல் ஸ்டோரேஜில் இருந்து தரவுகளை ஏற்றும் பகுதி
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nb_resume_user_data');
      if (saved) {
        setResumeData(JSON.parse(saved));
      } else {
        // முதல் முறை வருபவர்களுக்கு மாதிரி உள்ளீடு
        setResumeData({
          fullName: 'உதயகுமார் சு',
          jobTitle: 'Assistant Manager',
          phone: '9876543210',
          email: 'udayakumar@example.com',
          location: 'சென்னை, தமிழ்நாடு',
          linkedin: '',
          portfolio: '',
          summary: '16 ஆண்டுகளுக்கும் மேலான அனுபவம் கொண்ட வங்கி மற்றும் நிதித்துறை சார்ந்த நிர்வாகப் பணியாளர்.',
          achievements: 'கிளை நிர்வாகம் மற்றும் நிதி செயல்பாடுகளைத் திறம்பட வழிநடத்தியது.\nகுழு செயல்பாடுகளை ஒருங்கிணைத்து நிறுவன இலக்குகளை அடைந்தது.',
          experience: [
            {
              id: 1,
              title: 'Assistant Manager',
              company: 'Microfinance Institution',
              location: 'சென்னை',
              period: '2010 - தற்போது வரை',
              responsibilities: 'களப்பணிகள் மற்றும் கிளை நிர்வாகச் செயல்பாடுகளைத் திட்டமிடுதல்.\nவாடிக்கையாளர் சேவைகள் மற்றும் நிதி அறிக்கைகளைத் துல்லியமாகப் பராமரித்தல்.',
            },
          ],
          education: [
            {
              id: 1,
              degree: 'பட்டப்படிப்பு (Undergraduate)',
              institution: "Pachaiyappa's College",
              location: 'சென்னை',
              year: '2001',
            },
          ],
          projects: [
            {
              id: 1,
              name: 'நம்ம பூமி 360',
              role: 'Project Lead',
              technologies: 'Next.js, Tailwind CSS',
              description: 'பயனர்களுக்கான பன்முக டிஜிட்டல் சேவைத் தளத்தை வடிவமைத்து உருவாக்குதல்.',
            },
          ],
          skills: 'Branch Management, Operations, Excel, Data Analytics, Team Leadership',
          certifications: 'வங்கி மற்றும் நிதி மேலாண்மைச் சான்றிதழ்கள்',
          languages: 'தமிழ், ஆங்கிலம்',
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // தரவு மாறும் போதெல்லாம் பாதுகாப்பாக பயனரின் பிரவுசரிலேயே சேமித்தல்
  const handleChange = (field, val) => {
    const updated = { ...resumeData, [field]: val };
    setResumeData(updated);
    try {
      localStorage.setItem('nb_resume_user_data', JSON.stringify(updated));
    } catch (e) {}
  };

  // பணி அனுபவம் சேர்த்தல் & நீக்குதல்
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Date.now(), title: '', company: '', location: '', period: '', responsibilities: '' },
      ],
    }));
  };

  const updateExperience = (id, field, val) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  const removeExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  // கல்வி சேர்த்தல் & நீக்குதல்
  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now(), degree: '', institution: '', location: '', year: '' },
      ],
    }));
  };

  const updateEducation = (id, field, val) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  const removeEducation = (id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  // புராஜெக்ட் சேர்த்தல் & நீக்குதல்
  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: Date.now(), name: '', role: '', technologies: '', description: '' },
      ],
    }));
  };

  const updateProject = (id, field, val) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  const removeProject = (id) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  // பிரிண்ட் / PDF பதிவிறக்கும் ஃபங்ஷன்
  const handlePrint = () => {
    window.print();
  };

  // புதிய படிவமாக மாற்ற Reset
  const handleReset = () => {
    if (confirm('அனைத்து உள்ளீடுகளையும் அழித்துவிட்டுப் புதிய படிவத்தைத் தொடங்க விரும்புகிறீர்களா?')) {
      const emptyData = {
        fullName: '',
        jobTitle: '',
        phone: '',
        email: '',
        location: '',
        linkedin: '',
        portfolio: '',
        summary: '',
        achievements: '',
        experience: [{ id: 1, title: '', company: '', location: '', period: '', responsibilities: '' }],
        education: [{ id: 1, degree: '', institution: '', location: '', year: '' }],
        projects: [{ id: 1, name: '', role: '', technologies: '', description: '' }],
        skills: '',
        certifications: '',
        languages: '',
      };
      setResumeData(emptyData);
      localStorage.removeItem('nb_resume_user_data');
    }
  };

  return (
    <>
      <Head>
        <title>Universal ATS Resume Studio | நம்ம பூமி 360</title>
        <meta name="description" content="100% தூய்மையான, உலகத்தரம் வாய்ந்த ஒற்றைப் பக்க A4 ATS ரெஸ்யூம் பில்டர்" />
        <style dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body * { visibility: hidden; }
              #resume-sheet, #resume-sheet * { visibility: visible; }
              #resume-sheet {
                position: absolute;
                left: 0;
                top: 0;
                width: 100% !important;
                margin: 0 !important;
                padding: 12mm 15mm !important;
                box-shadow: none !important;
                border: none !important;
              }
              @page {
                size: A4 portrait;
                margin: 0mm;
              }
            }
          `
        }} />
      </Head>

      {/* Header Navigation Bar - மொபைலில் மடங்கக்கூடிய நேர்த்தியான வடிவமைப்பு */}
      <header className="w-full bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-50 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <Link href="/" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded text-sm transition">
              நம்ம பூமி 360
            </Link>
            <span className="text-slate-200 text-xs sm:text-sm font-semibold tracking-wide">
              Universal ATS Resume Studio
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-lg shadow transition flex items-center gap-1.5"
            >
              <span>🖨️</span> PDF ஆக பதிவிறக்குக
            </button>

            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setTemplate('harvard')}
                className={`px-3 py-1 rounded font-medium transition ${
                  template === 'harvard' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Harvard
              </button>
              <button
                onClick={() => setTemplate('modern')}
                className={`px-3 py-1 rounded font-medium transition ${
                  template === 'modern' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Modern
              </button>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 transition border border-rose-900/50 rounded"
            >
              Reset
            </button>
          </div>

        </div>
      </header>

      {/* Main Studio Container */}
      <main className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 print:p-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* இடதுபுறம்: உள்ளீட்டுப் படிவம் (Input Form) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-5 print:hidden">
            <div>
              <h2 className="text-base font-bold text-emerald-400">1. தனிநபர் & தொடர்பு விவரங்கள்</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <input
                  type="text"
                  placeholder="முழுப் பெயர்"
                  value={resumeData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="பணிப் பதவி (Target Job Title)"
                  value={resumeData.jobTitle}
                  onChange={(e) => handleChange('jobTitle', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="தொலைபேசி எண்"
                  value={resumeData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white"
                />
                <input
                  type="email"
                  placeholder="மின்னஞ்சல் முகவரி"
                  value={resumeData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="இருப்பிடம் (City, Country)"
                  value={resumeData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full sm:col-span-2 bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-emerald-400">2. சுயவிவரக் குறிப்பு (Executive Summary)</h2>
              <textarea
                rows="3"
                placeholder="உங்கள் அனுபவம் மற்றும் நிபுணத்துவச் சுருக்கம்..."
                value={resumeData.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                className="w-full mt-2 bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white"
              />
            </div>

            <div>
              <h2 className="text-base font-bold text-emerald-400">3. முக்கிய சாதனைகள் (Achievements)</h2>
              <p className="text-[11px] text-slate-400">ஒவ்வொரு சாதனையும் தனித்தனி வரியாகத் தட்டச்சு செய்யவும்.</p>
              <textarea
                rows="3"
                placeholder="சாதனை 1&#10;சாதனை 2"
                value={resumeData.achievements}
                onChange={(e) => handleChange('achievements', e.target.value)}
                className="w-full mt-1.5 bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white"
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-emerald-400">4. தொழில்முறை அனுபவம் (Experience)</h2>
                <button
                  type="button"
                  onClick={addExperience}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-1 rounded border border-slate-700"
                >
                  + சேர்
                </button>
              </div>
              {resumeData.experience.map((exp, idx) => (
                <div key={exp.id} className="mt-3 p-3 bg-slate-800/60 rounded border border-slate-700/80 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                    <span>அனுபவம் #{idx + 1}</span>
                    {resumeData.experience.length > 1 && (
                      <button onClick={() => removeExperience(exp.id)} className="text-rose-400 hover:text-rose-300">
                        நீக்கு
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="பதவி"
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="நிறுவனத்தின் பெயர்"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="கால அளவு (Period)"
                      value={exp.period}
                      onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="இடம்"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                    />
                  </div>
                  <textarea
                    rows="2"
                    placeholder="பொறுப்புகள் & சாதனைகள் (தனித்தனி வரிகளாக)"
                    value={exp.responsibilities}
                    onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-emerald-400">5. கல்வி (Education)</h2>
                <button
                  type="button"
                  onClick={addEducation}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-1 rounded border border-slate-700"
                >
                  + சேர்
                </button>
              </div>
              {resumeData.education.map((edu, idx) => (
                <div key={edu.id} className="mt-3 p-3 bg-slate-800/60 rounded border border-slate-700/80 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                    <span>கல்வி #{idx + 1}</span>
                    {resumeData.education.length > 1 && (
                      <button onClick={() => removeEducation(edu.id)} className="text-rose-400 hover:text-rose-300">
                        நீக்கு
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="படிப்பு / பட்டம் (Degree)"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="கல்லூரி / பல்கலைக்கழகம்"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="வருடம்"
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="இடம்"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-emerald-400">6. திட்டங்கள் (Projects)</h2>
                <button
                  type="button"
                  onClick={addProject}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-1 rounded border border-slate-700"
                >
                  + சேர்
                </button>
              </div>
              {resumeData.projects.map((proj, idx) => (
                <div key={proj.id} className="mt-3 p-3 bg-slate-800/60 rounded border border-slate-700/80 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                    <span>திட்டம் #{idx + 1}</span>
                    {resumeData.projects.length > 1 && (
                      <button onClick={() => removeProject(proj.id)} className="text-rose-400 hover:text-rose-300">
                        நீக்கு
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="திட்டப் பெயர்"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="பங்கு (Role)"
                      value={proj.role}
                      onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="பயன்படுத்திய தொழில்நுட்பங்கள்"
                    value={proj.technologies}
                    onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                  <textarea
                    rows="2"
                    placeholder="திட்ட விவரம்"
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-base font-bold text-emerald-400">7. திறன்கள், சான்றிதழ்கள் & மொழிகள்</h2>
              <div className="space-y-3 mt-2">
                <input
                  type="text"
                  placeholder="திறன்கள் (கமாவால் பிரிக்கவும்: SQL, Excel, Management)"
                  value={resumeData.skills}
                  onChange={(e) => handleChange('skills', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="சான்றிதழ்கள்"
                  value={resumeData.certifications}
                  onChange={(e) => handleChange('certifications', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="தெரிந்த மொழிகள்"
                  value={resumeData.languages}
                  onChange={(e) => handleChange('languages', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white"
                />
              </div>
            </div>

          </div>

          {/* வலதுபுறம்: ஒற்றைப் பக்க A4 பிரிவியூ (Clean Single-Page A4 Sheet) */}
          <div className="lg:col-span-7 flex justify-center w-full overflow-x-auto">
            <div
              id="resume-sheet"
              className={`w-full max-w-[210mm] bg-white text-slate-900 rounded-lg shadow-2xl p-6 sm:p-9 text-[11px] sm:text-[12px] leading-snug border border-slate-300 print:shadow-none print:border-none ${
                template === 'harvard' ? 'font-serif' : 'font-sans'
              }`}
            >
              {/* தலைப்பு பகுதி (Header) */}
              <div className="text-center pb-2.5">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-slate-950">
                  {resumeData.fullName || 'YOUR NAME'}
                </h1>
                {resumeData.jobTitle && (
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-widest mt-0.5">
                    {resumeData.jobTitle}
                  </p>
                )}
                
                {/* தொடர்பு விவரங்கள் */}
                <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5 text-[10.5px] text-slate-600 mt-1.5">
                  {resumeData.phone && <span>{resumeData.phone}</span>}
                  {resumeData.email && (
                    <>
                      <span>•</span>
                      <span>{resumeData.email}</span>
                    </>
                  )}
                  {resumeData.location && (
                    <>
                      <span>•</span>
                      <span>{resumeData.location}</span>
                    </>
                  )}
                </div>

                {template === 'modern' ? (
                  <div className="w-full h-1 bg-emerald-600 mt-2.5 rounded-full" />
                ) : (
                  <hr className="border-t border-slate-400 mt-2.5" />
                )}
              </div>

              {/* சுயவிவரக் குறிப்பு (Executive Summary) */}
              {resumeData.summary && (
                <div className="mt-2.5">
                  <h2 className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Executive Summary
                  </h2>
                  <p className="text-slate-800 text-justify leading-relaxed">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* சாதனைகள் (Key Achievements) */}
              {resumeData.achievements && (
                <div className="mt-2.5">
                  <h2 className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Key Career Milestones & Achievements
                  </h2>
                  <ul className="list-disc ml-4 space-y-0.5 text-slate-800">
                    {formatUserBullets(resumeData.achievements).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* பணி அனுபவம் (Experience) */}
              {resumeData.experience && resumeData.experience.some(e => e.title || e.company) && (
                <div className="mt-2.5">
                  <h2 className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Professional Experience
                  </h2>
                  <div className="space-y-2 mt-1">
                    {resumeData.experience.map((exp) => (
                      (exp.title || exp.company) && (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline text-slate-950 font-bold">
                            <span>{exp.title}</span>
                            <span className="text-[10px] sm:text-[11px] font-medium text-slate-600 whitespace-nowrap">
                              {exp.period}
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline text-slate-700 italic text-[10.5px]">
                            <span>{exp.company}</span>
                            <span>{exp.location}</span>
                          </div>
                          {exp.responsibilities && (
                            <ul className="list-disc ml-4 mt-1 space-y-0.5 text-slate-800">
                              {formatUserBullets(exp.responsibilities).map((resp, i) => (
                                <li key={i}>{resp}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* கல்வி (Education) - பல்கலைக்கழகப் பெயர் உடையாமல் தடுக்கப்பட்ட வடிவம் */}
              {resumeData.education && resumeData.education.some(e => e.degree || e.institution) && (
                <div className="mt-2.5">
                  <h2 className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Education & Credentials
                  </h2>
                  <div className="space-y-1.5 mt-1">
                    {resumeData.education.map((edu) => (
                      (edu.degree || edu.institution) && (
                        <div key={edu.id} className="flex justify-between items-baseline gap-2">
                          <div className="text-slate-800">
                            <span className="font-bold">{edu.degree}</span>
                            {edu.institution && (
                              <span className="italic"> — {edu.institution}</span>
                            )}
                            {edu.location && (
                              <span className="text-slate-500 text-[10px]">, {edu.location}</span>
                            )}
                          </div>
                          {edu.year && (
                            <span className="text-[10px] sm:text-[11px] text-slate-600 whitespace-nowrap font-medium">
                              {edu.year}
                            </span>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* திட்டங்கள் (Key Projects) */}
              {resumeData.projects && resumeData.projects.some(p => p.name) && (
                <div className="mt-2.5">
                  <h2 className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Key Projects
                  </h2>
                  <div className="space-y-1.5 mt-1">
                    {resumeData.projects.map((proj) => (
                      proj.name && (
                        <div key={proj.id}>
                          <div className="flex justify-between items-baseline">
                            <span className="font-bold text-slate-900">
                              {proj.name} {proj.role && <span className="font-normal italic text-slate-600">| {proj.role}</span>}
                            </span>
                            {proj.technologies && (
                              <span className="text-[10px] text-slate-500 font-mono">
                                {proj.technologies}
                              </span>
                            )}
                          </div>
                          {proj.description && (
                            <p className="text-slate-700 text-[10.5px] mt-0.5">{proj.description}</p>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* திறன்கள் (Skills) */}
              {resumeData.skills && (
                <div className="mt-2.5">
                  <h2 className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Core Competencies & Technical Skills
                  </h2>
                  {template === 'modern' ? (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {resumeData.skills.split(',').map((skill, i) => (
                        <span key={i} className="bg-slate-100 text-slate-800 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-800 mt-1">
                      {resumeData.skills.split(',').map(s => s.trim()).filter(Boolean).join('  •  ')}
                    </p>
                  )}
                </div>
              )}

              {/* சான்றிதழ்கள் (Certifications) */}
              {resumeData.certifications && (
                <div className="mt-2.5">
                  <h2 className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Professional Certifications
                  </h2>
                  <ul className="list-disc ml-4 mt-1 space-y-0.5 text-slate-800">
                    {formatUserBullets(resumeData.certifications).map((cert, idx) => (
                      <li key={idx}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* மொழிகள் (Languages) */}
              {resumeData.languages && (
                <div className="mt-2.5">
                  <h2 className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Languages
                  </h2>
                  <p className="text-slate-800 mt-0.5">
                    {resumeData.languages}
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>
    </>
  );
}