import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// பொதுவான டைட்டில் கேசிங் ஃபங்ஷன் (கல்வி, கம்பெனி, ஊர் பெயர்களுக்கு)
const toTitleCase = (str) => {
  if (!str) return '';
  const acronyms = ['IT', 'HR', 'MBA', 'BSC', 'B.SC', 'BE', 'B.E', 'B.TECH', 'BTECH', 'MCA', 'BCA', 'SQL', 'AWS', 'GCP', 'IIT', 'IIM', 'NIT'];
  return str
    .trim()
    .split(/\s+/)
    .map((word) => {
      const cleanUpper = word.replace(/[^a-zA-Z]/g, '').toUpperCase();
      if (acronyms.includes(cleanUpper)) return word.toUpperCase();
      const minor = ['in', 'at', 'of', 'and', 'for', 'the', 'on', 'with', 'to'];
      if (minor.includes(word.toLowerCase())) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

export default function ResumeBuilder() {
  const [template, setTemplate] = useState('harvard'); // 'harvard' | 'modern'

  const emptyForm = {
    fullName: '',
    jobTitle: '',
    phone: '',
    email: '',
    location: '',
    summary: '',
    achievements: '',
    experience: [
      { id: 1, title: '', company: '', location: '', period: '', responsibilities: '' }
    ],
    education: [
      { id: 1, degree: '', institution: '', location: '', year: '' }
    ],
    projects: [
      { id: 1, name: '', role: '', technologies: '', description: '' }
    ],
    skills: '',
    certifications: '',
    languages: ''
  };

  const [resumeData, setResumeData] = useState(emptyForm);

  // பயனர் சேமித்த விவரங்கள் இருந்தால் மட்டும் மீட்டெடுக்கும்
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nb_resume_user_data');
      if (saved) {
        setResumeData(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleChange = (field, val) => {
    const updated = { ...resumeData, [field]: val };
    setResumeData(updated);
    try {
      localStorage.setItem('nb_resume_user_data', JSON.stringify(updated));
    } catch (e) {}
  };

  // பணி அனுபவம்
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Date.now(), title: '', company: '', location: '', period: '', responsibilities: '' }
      ]
    }));
  };

  const updateExperience = (id, field, val) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    }));
  };

  const removeExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id)
    }));
  };

  // கல்வி
  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now(), degree: '', institution: '', location: '', year: '' }
      ]
    }));
  };

  const updateEducation = (id, field, val) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    }));
  };

  const removeEducation = (id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id)
    }));
  };

  // திட்டங்கள்
  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: Date.now(), name: '', role: '', technologies: '', description: '' }
      ]
    }));
  };

  const updateProject = (id, field, val) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    }));
  };

  const removeProject = (id) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id)
    }));
  };

  // உலகத்தரம் வாய்ந்த ஸ்மார்ட் பார்ச்சூன்-500 ஆக்ஷன் வெர்ப் என்ஜின் (Context-Aware Action Verbs)
  const transformToWorldClass = () => {
    const roleContext = (resumeData.jobTitle || '').toLowerCase();
    const isTech = /software|developer|engineer|tech|it|frontend|backend|fullstack|data|ai/i.test(roleContext);
    const isFinance = /finance|bank|account|audit|credit|microfinance|cashier/i.test(roleContext);
    const isLogistics = /transit|transport|driver|logistics|fleet|route|delivery/i.test(roleContext);

    // பயனர் உள்ளீட்டின் அடிப்படையில் கார்ப்பரேட் புல்லட்டுகளை உருவாக்கும் ஃபங்ஷன்
    const polishBullets = (rawText, isExp = false) => {
      if (!rawText) return '';
      return rawText
        .split('\n')
        .map((l) => l.trim().replace(/^[•\-\*\d\.\)]+\s*/, ''))
        .filter(Boolean)
        .map((line) => {
          const l = line.toLowerCase();
          
          // ஏற்கனவே கார்ப்பரேட் ஸ்டைலில் இருந்தால் அப்படியே வைத்தல்
          if (/^(spearheaded|orchestrated|engineered|championed|directed|executed|designed|formulated|accelerated|delivered)\b/i.test(l)) {
            return line.charAt(0).toUpperCase() + line.slice(1).replace(/[.]+$/, '') + '.';
          }

          // உள்ளீட்டின் சூழலைப் புரிந்து மாற்றும் எக்ஸிகியூட்டிவ் ஃபார்முலா
          if (l.includes('develop') || l.includes('software') || l.includes('code') || l.includes('build')) {
            return `Architected and developed mission-critical solutions, improving overall operational performance and delivery speed.`;
          }
          if (l.includes('manage') || l.includes('lead') || l.includes('team') || l.includes('handle')) {
            return `Orchestrated end-to-end project workflows, coordinating cross-functional teams to consistently achieve deliverables on schedule.`;
          }
          if (l.includes('sale') || l.includes('revenue') || l.includes('growth') || l.includes('target')) {
            return `Accelerated pipeline performance and client acquisition, outperforming organizational milestones and target metrics.`;
          }
          if (l.includes('customer') || l.includes('client') || l.includes('service') || l.includes('support')) {
            return `Cultivated key stakeholder partnerships and optimized client-facing workflows to elevate service excellence ratings.`;
          }

          // துறை சார்ந்த தனிப்பயனாக்கம் (Role Specific)
          if (isLogistics) {
            return `Executed fleet management and route optimization protocols, maintaining an exemplary transit safety record.`;
          }
          if (isFinance) {
            return `Spearheaded rigorous financial auditing and portfolio governance, upholding 100% regulatory compliance.`;
          }
          if (isTech) {
            return `Spearheaded technical development and system architecture, ensuring scalable and resilient platform performance.`;
          }

          // பொதுவான தொழில்முறை வாக்கிய அமைப்பு
          return `Spearheaded key initiatives in ${line.toLowerCase().replace(/[.]+$/, '')}, driving measurable organizational excellence.`;
        })
        .join('\n');
    };

    // சுருக்கக் குறிப்பை (Summary) பார்ச்சூன்-500 தரத்தில் மாற்றுதல்
    let polishedSummary = resumeData.summary;
    if (resumeData.summary && resumeData.summary.length > 5) {
      const yearsMatch = resumeData.summary.match(/\b(\d+)\+?\s*(years|ஆண்டு|வருட|yrs)/i);
      const yearsText = yearsMatch ? `with ${yearsMatch[1]}+ years of proven track record` : 'with an extensive track record';
      const roleDisplay = resumeData.jobTitle ? toTitleCase(resumeData.jobTitle) : 'Accomplished Professional';
      
      polishedSummary = `${roleDisplay} ${yearsText} in driving operational efficiency, strategic execution, and sustainable organizational growth. Adept at cross-functional leadership, high-impact problem solving, and delivering measurable performance metrics.`;
    }

    const updated = {
      ...resumeData,
      fullName: resumeData.fullName.toUpperCase(),
      jobTitle: toTitleCase(resumeData.jobTitle),
      summary: polishedSummary,
      achievements: polishBullets(resumeData.achievements),
      experience: resumeData.experience.map((exp) => ({
        ...exp,
        title: toTitleCase(exp.title),
        company: toTitleCase(exp.company),
        location: toTitleCase(exp.location),
        period: exp.period ? toTitleCase(exp.period) : '',
        responsibilities: polishBullets(exp.responsibilities, true)
      })),
      education: resumeData.education.map((edu) => ({
        ...edu,
        degree: toTitleCase(edu.degree),
        institution: toTitleCase(edu.institution),
        location: toTitleCase(edu.location),
      })),
      projects: resumeData.projects.map((proj) => ({
        ...proj,
        name: toTitleCase(proj.name),
        role: toTitleCase(proj.role),
        description: proj.description ? `Architected and deployed an integrated platform for ${proj.name}, enhancing user workflows and system capability.` : ''
      })),
      certifications: resumeData.certifications
        .split('\n')
        .map(c => toTitleCase(c.trim()))
        .filter(Boolean)
        .join('\n'),
      languages: toTitleCase(resumeData.languages)
    };

    setResumeData(updated);
    try {
      localStorage.setItem('nb_resume_user_data', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleReset = () => {
    if (confirm('அனைத்து உள்ளீடுகளையும் அழித்துவிட்டுப் புதிய படிவத்தைத் தொடங்க விரும்புகிறீர்களா?')) {
      setResumeData(emptyForm);
      try {
        localStorage.removeItem('nb_resume_user_data');
      } catch (e) {}
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Head>
        <title>Universal ATS Resume Studio | நம்ம பூமி 360</title>
        <meta name="description" content="Fortune-500 Harvard Style Single Page ATS Resume Builder" />
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
                padding: 8mm 14mm !important;
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

      {/* ஹெடர் பார் (Header Bar) */}
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
              className="text-xs text-rose-400 hover:text-rose-300 px-2.5 py-1 transition border border-rose-900/50 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* பிரதான தளம் */}
      <main className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 print:p-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* இடதுபுறம்: உள்ளீட்டுப் படிவம் */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 print:hidden shadow-xl">
            
            {/* மேஜிக் ஆக்ஷன் பட்டன் */}
            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 p-3 rounded-lg border border-emerald-600/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 block">✨ Fortune-500 Smart Polisher</span>
                <span className="text-[11px] text-slate-400">எளிய வரிகளை சர்வதேச ATS ஆக்ஷன் வெர்ப்ஸாக மாற்றும்</span>
              </div>
              <button
                type="button"
                onClick={transformToWorldClass}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded shadow transition whitespace-nowrap"
              >
                🪄 உலகத் தரமாக மாற்று
              </button>
            </div>

            <div>
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">1. தனிநபர் & தொடர்பு விவரங்கள்</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <input
                  type="text"
                  placeholder="முழுப் பெயர் (Full Name)"
                  value={resumeData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="பணிப் பதவி (Target Job Title)"
                  value={resumeData.jobTitle}
                  onChange={(e) => handleChange('jobTitle', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="தொலைபேசி எண்"
                  value={resumeData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="email"
                  placeholder="மின்னஞ்சல்"
                  value={resumeData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="இருப்பிடம் (City, State / Country)"
                  value={resumeData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full sm:col-span-2 bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">2. சுருக்கக் குறிப்பு (Executive Summary)</h2>
              <textarea
                rows="2"
                placeholder="எ.கா: 10 years work experience in IT management..."
                value={resumeData.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                className="w-full mt-1.5 bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
              />
            </div>

            <div>
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">3. முக்கிய சாதனைகள் (Achievements)</h2>
              <textarea
                rows="2"
                placeholder="எ.கா: new software develop&#10;project handle"
                value={resumeData.achievements}
                onChange={(e) => handleChange('achievements', e.target.value)}
                className="w-full mt-1.5 bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">4. பணி அனுபவம் (Experience)</h2>
                <button
                  type="button"
                  onClick={addExperience}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-0.5 rounded border border-slate-700"
                >
                  + அனுபவம் சேர்
                </button>
              </div>
              {resumeData.experience.map((exp, idx) => (
                <div key={exp.id} className="mt-2 p-2.5 bg-slate-800/60 rounded border border-slate-700/80 space-y-2">
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>அனுபவம் #{idx + 1}</span>
                    {resumeData.experience.length > 1 && (
                      <button onClick={() => removeExperience(exp.id)} className="text-rose-400 hover:text-rose-300">
                        நீக்கு
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="text"
                      placeholder="பதவி"
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="நிறுவனம்"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="கால அளவு (எ.கா: 2020 - Present)"
                      value={exp.period}
                      onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="இடம்"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                  </div>
                  <textarea
                    rows="2"
                    placeholder="பொறுப்புகள் (தனித்தனி வரியில் எழுதவும்)"
                    value={exp.responsibilities}
                    onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                  />
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">5. கல்வி விவரம் (Education)</h2>
                <button
                  type="button"
                  onClick={addEducation}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-0.5 rounded border border-slate-700"
                >
                  + கல்வி சேர்
                </button>
              </div>
              {resumeData.education.map((edu, idx) => (
                <div key={edu.id} className="mt-2 p-2.5 bg-slate-800/60 rounded border border-slate-700/80 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>கல்வி #{idx + 1}</span>
                    {resumeData.education.length > 1 && (
                      <button onClick={() => removeEducation(edu.id)} className="text-rose-400 hover:text-rose-300">
                        நீக்கு
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="text"
                      placeholder="படிப்பு / பட்டம் (எ.கா: MBA)"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="கல்லூரி / பல்கலைக்கழகம்"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="வருடம்"
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="இடம்"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">6. திட்டங்கள் (Projects)</h2>
                <button
                  type="button"
                  onClick={addProject}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-0.5 rounded border border-slate-700"
                >
                  + திட்டம் சேர்
                </button>
              </div>
              {resumeData.projects.map((proj, idx) => (
                <div key={proj.id} className="mt-2 p-2.5 bg-slate-800/60 rounded border border-slate-700/80 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>திட்டம் #{idx + 1}</span>
                    {resumeData.projects.length > 1 && (
                      <button onClick={() => removeProject(proj.id)} className="text-rose-400 hover:text-rose-300">
                        நீக்கு
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="text"
                      placeholder="திட்டப் பெயர்"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="பங்கு (Role)"
                      value={proj.role}
                      onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="தொழில்நுட்பங்கள்"
                    value={proj.technologies}
                    onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                  />
                  <textarea
                    rows="1"
                    placeholder="திட்ட விவரம்"
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                  />
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">7. திறன்கள், சான்றிதழ்கள் & மொழிகள்</h2>
              <div className="space-y-2 mt-1.5">
                <input
                  type="text"
                  placeholder="திறன்கள் (கமாவால் பிரிக்கவும்: SQL, Excel, Management)"
                  value={resumeData.skills}
                  onChange={(e) => handleChange('skills', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="சான்றிதழ்கள்"
                  value={resumeData.certifications}
                  onChange={(e) => handleChange('certifications', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="மொழிகள்"
                  value={resumeData.languages}
                  onChange={(e) => handleChange('languages', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
              </div>
            </div>

          </div>

          {/* வலதுபுறம்: பார்ச்சூன்-500 ஹார்வர்ட் ஒற்றைப் பக்க தாள் */}
          <div className="lg:col-span-7 flex justify-center w-full overflow-x-auto">
            <div
              id="resume-sheet"
              className={`w-full max-w-[210mm] bg-white text-slate-900 rounded shadow-2xl p-6 sm:p-8 text-[11px] leading-[1.3] border border-slate-300 print:shadow-none print:border-none ${
                template === 'harvard' ? 'font-serif' : 'font-sans'
              }`}
            >
              {!resumeData.fullName && !resumeData.jobTitle && !resumeData.summary && (
                <div className="text-center py-20 text-slate-400 italic">
                  <p className="text-base font-semibold text-slate-500">Universal Harvard ATS Studio</p>
                  <p className="text-xs mt-1">விவரங்களைத் தட்டச்சு செய்து 'உலகத் தரமாக மாற்று' பட்டனை அழுத்தவும்.</p>
                </div>
              )}

              {/* தலைப்பு பகுதி */}
              {(resumeData.fullName || resumeData.jobTitle || resumeData.phone || resumeData.email || resumeData.location) && (
                <div className="text-center pb-1">
                  {resumeData.fullName && (
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-slate-950">
                      {resumeData.fullName}
                    </h1>
                  )}
                  {resumeData.jobTitle && (
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-widest mt-0.5">
                      {resumeData.jobTitle}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap justify-center items-center gap-x-2 text-[10.5px] text-slate-600 mt-1">
                    {resumeData.phone && <span>{resumeData.phone}</span>}
                    {resumeData.email && (
                      <>
                        {resumeData.phone && <span>•</span>}
                        <span>{resumeData.email}</span>
                      </>
                    )}
                    {resumeData.location && (
                      <>
                        {(resumeData.phone || resumeData.email) && <span>•</span>}
                        <span>{resumeData.location}</span>
                      </>
                    )}
                  </div>

                  {template === 'modern' ? (
                    <div className="w-full h-1 bg-emerald-600 mt-2 rounded-full" />
                  ) : (
                    <hr className="border-t border-slate-400 mt-2" />
                  )}
                </div>
              )}

              {/* எக்ஸிகியூட்டிவ் சுருக்கம் (Executive Summary) */}
              {resumeData.summary && (
                <div className="mt-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1">
                    Executive Summary
                  </h2>
                  <p className="text-slate-800 text-justify leading-relaxed">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* முக்கிய சாதனைகள் (Achievements) */}
              {resumeData.achievements && (
                <div className="mt-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1">
                    Key Career Milestones & Achievements
                  </h2>
                  <ul className="list-disc ml-4 space-y-0.5 text-slate-800">
                    {resumeData.achievements.split('\n').filter(Boolean).map((bullet, idx) => (
                      <li key={idx} className="leading-tight">{bullet}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* பணி அனுபவம் (Experience) */}
              {resumeData.experience.some(e => e.title || e.company) && (
                <div className="mt-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1">
                    Professional Experience
                  </h2>
                  <div className="space-y-1.5 mt-1">
                    {resumeData.experience.map((exp) => (
                      (exp.title || exp.company) && (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline text-slate-950 font-bold">
                            <span>{exp.title}</span>
                            <span className="text-[10px] font-medium text-slate-600 whitespace-nowrap">
                              {exp.period}
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline text-slate-700 italic text-[10.5px]">
                            <span>{exp.company}</span>
                            <span>{exp.location}</span>
                          </div>
                          {exp.responsibilities && (
                            <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-slate-800">
                              {exp.responsibilities.split('\n').filter(Boolean).map((resp, i) => (
                                <li key={i} className="leading-tight">{resp}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* கல்வி விவரம் (Education) - பல்கலைக்கழகப் பெயர் உடையாத வடிவம் */}
              {resumeData.education.some(e => e.degree || e.institution) && (
                <div className="mt-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1">
                    Education & Credentials
                  </h2>
                  <div className="space-y-1 mt-1">
                    {resumeData.education.map((edu) => (
                      (edu.degree || edu.institution) && (
                        <div key={edu.id} className="flex justify-between items-baseline gap-2">
                          <div className="text-slate-800 leading-tight">
                            <span className="font-bold">{edu.degree}</span>
                            {edu.institution && (
                              <span className="italic"> — {edu.institution}</span>
                            )}
                            {edu.location && (
                              <span className="text-slate-600 text-[10px]">, {edu.location}</span>
                            )}
                          </div>
                          {edu.year && (
                            <span className="text-[10px] text-slate-600 whitespace-nowrap font-medium">
                              {edu.year}
                            </span>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* திட்டங்கள் (Projects) */}
              {resumeData.projects.some(p => p.name) && (
                <div className="mt-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1">
                    Key Projects
                  </h2>
                  <div className="space-y-1 mt-1">
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
                            <p className="text-slate-700 text-[10.5px] mt-0.5 leading-tight">{proj.description}</p>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* திறன்கள் (Skills) */}
              {resumeData.skills && (
                <div className="mt-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1">
                    Core Competencies & Technical Skills
                  </h2>
                  {template === 'modern' ? (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {resumeData.skills.split(',').map((skill, i) => (
                        skill.trim() && (
                          <span key={i} className="bg-slate-100 text-slate-800 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200">
                            {skill.trim()}
                          </span>
                        )
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
                <div className="mt-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1">
                    Professional Certifications
                  </h2>
                  <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-slate-800">
                    {resumeData.certifications.split('\n').filter(Boolean).map((cert, idx) => (
                      <li key={idx} className="leading-tight">{cert}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* மொழிகள் (Languages) */}
              {resumeData.languages && (
                <div className="mt-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-1">
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