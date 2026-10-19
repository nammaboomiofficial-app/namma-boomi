import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const toTitleCase = (str) => {
  if (!str) return '';
  const acronyms = ['IT', 'HR', 'MBA', 'BBA', 'BSC', 'B.SC', 'BE', 'B.E', 'B.TECH', 'MCA', 'BCA', 'SQL', 'RBI', 'OD', 'NPA', 'CR', 'ATS', 'UI', 'UX', 'BI', 'IIT'];
  const minor = ['in', 'at', 'of', 'and', 'for', 'the', 'on', 'with', 'to', 'by', 'under'];
  
  return str
    .trim()
    .split(/\s+/)
    .map((word, idx) => {
      const cleanUpper = word.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      if (acronyms.includes(cleanUpper)) return word.toUpperCase();
      const lower = word.toLowerCase();
      if (idx !== 0 && minor.includes(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
};

const transformToExecutiveActionLine = (raw) => {
  if (!raw) return '';
  let clean = raw.replace(/^[•\-\*\d\.\)\%\:\;\,\#\@\!]+\s*/, '').trim().replace(/[.]+$/, '');
  if (!clean) return '';
  const l = clean.toLowerCase();

  if (l.includes('disburse') || l.includes('disbures') || l.includes('loan') || l.includes('10cr') || l.includes('10 cr') || l.includes('rural')) {
    return 'Spearheaded rural credit underwriting and scalable loan disbursements, achieving an annual portfolio milestone of ₹10+ Crores.';
  }
  if (l.includes('nil od') || l.includes('od npa') || l.includes('rcovery') || l.includes('recovery') || l.includes('overdue') || l.includes('npa')) {
    return 'Maintained an unblemished zero-overdue (0% OD/NPA) portfolio record through proactive credit governance and rigorous collection follow-ups.';
  }
  if (l.includes('complaint') || l.includes('grievance') || l.includes('no complaint')) {
    return 'Instituted a customer-first service culture, sustaining an exemplary operational record of zero unresolved customer grievances.';
  }
  if (l.includes('branch development') || l.includes('development') || l.includes('growth')) {
    return 'Directed end-to-end branch expansion and business development initiatives, substantially increasing customer reach and operating margins.';
  }
  if (l.includes('rbi') || l.includes('rule') || l.includes('norm') || l.includes('follow') || l.includes('compliance')) {
    return 'Enforced 100% statutory compliance with Reserve Bank of India (RBI) guidelines, operational auditing frameworks, and microfinance norms.';
  }
  if (l.includes('service') || l.includes('customer') || l.includes('quality')) {
    return 'Championed high-quality financial service delivery, significantly enhancing borrower retention and community trust.';
  }
  if (l.includes('app') || l.includes('software') || l.includes('code') || l.includes('develop')) {
    return 'Architected and deployed resilient application modules, enhancing user experience and streamlining digital service workflows.';
  }

  let pureContent = clean
    .replace(/spearheaded key initiatives in/gi, '')
    .replace(/driving measurable operational efficiency and institutional excellence/gi, '')
    .replace(/^in\s*/i, '')
    .replace(/[,\.]+/g, '')
    .trim();

  if (/^spearheaded key initiatives in/i.test(clean)) return clean;
  return `Spearheaded key initiatives in ${pureContent.toLowerCase()}, driving measurable operational efficiency and institutional excellence.`;
};

export default function ResumeBuilder() {
  const [template, setTemplate] = useState('harvard');
  const [viewMode, setViewMode] = useState('resume');

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

  // முழுமையான Fortune-500 ஆட்டோமேஷன்
  const transformToFortune500 = () => {
    let rawSummary = (resumeData.summary || '').trim();
    const yearsMatch = rawSummary.match(/\b(\d+)\+?\s*(years?|ஆண்டு|வருட|yrs)/i);
    const yearsNum = yearsMatch ? yearsMatch[1] : '16';
    const roleTitle = resumeData.jobTitle ? toTitleCase(resumeData.jobTitle.replace(/branach/i, 'Branch')) : 'Branch Manager';
    
    const polishedSummary = `${roleTitle} with ${yearsNum}+ years of extensive leadership across microfinance branch operations, portfolio governance, and field credit risk management. Proven expertise in rural credit disbursements, sustaining zero NPA/OD portfolios, ensuring 100% statutory compliance with RBI norms, and mentoring high-performing teams to achieve sustainable institutional profitability.`;

    const processLines = (raw) => {
      if (!raw) return '';
      const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
      const seen = new Set();
      const output = [];

      for (let l of lines) {
        const converted = transformToExecutiveActionLine(l);
        if (converted && !seen.has(converted.toLowerCase())) {
          seen.add(converted.toLowerCase());
          output.push(converted);
        }
      }
      return output.join('\n');
    };

    const cleanRole = (str) => {
      if (!str) return '';
      return toTitleCase(str.replace(/branach/i, 'Branch'));
    };

    const updated = {
      ...resumeData,
      fullName: (resumeData.fullName || '').toUpperCase().trim(),
      jobTitle: cleanRole(resumeData.jobTitle),
      location: toTitleCase(resumeData.location),
      summary: polishedSummary,
      achievements: processLines(resumeData.achievements),
      experience: resumeData.experience.map((exp) => {
        let cleanPeriod = exp.period ? exp.period.trim() : '';
        // வெறும் 4 இலக்க ஆண்டாக இருந்தால் தானாகவே - Present சேர்த்தல்
        if (/^\d{4}$/.test(cleanPeriod)) {
          cleanPeriod = `${cleanPeriod} – Present`;
        }
        return {
          ...exp,
          title: cleanRole(exp.title),
          company: toTitleCase(exp.company.replace(/finanace/i, 'Finance')),
          location: toTitleCase(exp.location),
          period: cleanPeriod,
          responsibilities: processLines(exp.responsibilities)
        };
      }),
      education: resumeData.education.map((edu) => ({
        ...edu,
        degree: toTitleCase(edu.degree),
        institution: toTitleCase(edu.institution),
        location: toTitleCase(edu.location),
        year: edu.year ? edu.year.trim() : ''
      })),
      projects: resumeData.projects.map((proj) => ({
        ...proj,
        name: toTitleCase(proj.name),
        role: toTitleCase(proj.role),
        technologies: proj.technologies
          ? proj.technologies.split(/[,|]/).map(t => toTitleCase(t.trim())).join(', ')
          : '',
        description: proj.description ? `Architected and implemented platform capabilities for ${toTitleCase(proj.name)}, delivering seamless end-to-end user experience.` : ''
      })),
      skills: resumeData.skills
        ? resumeData.skills.split(/[,•|]/).map(s => toTitleCase(s.trim())).filter(Boolean).join('  •  ')
        : 'Branch Operations  •  Microfinance Portfolio Governance  •  RBI Statutory Compliance  •  Credit Risk Underwriting  •  Team Leadership  •  Financial Auditing',
      certifications: resumeData.certifications
        ? resumeData.certifications.split(/[\n,]/).map(c => toTitleCase(c.trim())).filter(Boolean).map(c => c.endsWith('.') ? c : `${c}.`).join('\n')
        : '',
      languages: resumeData.languages
        ? resumeData.languages.split(/[,/]/).map(l => toTitleCase(l.trim())).filter(Boolean).join(', ')
        : 'Tamil, English'
    };

    setResumeData({ ...updated });
    try {
      localStorage.setItem('nb_resume_user_data', JSON.stringify(updated));
    } catch (e) {}
  };

  const atsScore = useMemo(() => {
    let score = 0;
    if (resumeData.fullName) score += 10;
    if (resumeData.phone && resumeData.email) score += 15;
    if (resumeData.summary && resumeData.summary.length > 50) score += 20;
    if (resumeData.experience.some(e => e.title && e.responsibilities)) score += 25;
    if (resumeData.skills && resumeData.skills.length > 10) score += 15;
    if (resumeData.education.some(e => e.degree)) score += 10;
    if (resumeData.achievements) score += 5;
    return Math.min(score, 100);
  }, [resumeData]);

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
        <title>Universal ATS Resume & Executive Studio | நம்ம பூமி 360</title>
        <meta name="description" content="Fortune-500 Single Page ATS Resume & Cover Letter Studio" />
        <style dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body * { visibility: hidden; }
              #print-sheet, #print-sheet * { visibility: visible; }
              #print-sheet {
                position: absolute;
                left: 0;
                top: 0;
                width: 100% !important;
                margin: 0 !important;
                padding: 10mm 14mm !important;
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

      {/* Header Bar */}
      <header className="w-full bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-50 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded text-sm transition">
              நம்ம பூமி 360
            </Link>
            <span className="text-slate-200 text-xs sm:text-sm font-semibold tracking-wide">
              Universal ATS Resume Studio
            </span>
            <div className="hidden md:flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-full text-xs">
              <span className="text-slate-400">ATS Score:</span>
              <span className={`font-extrabold ${atsScore >= 80 ? 'text-emerald-400' : atsScore >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                {atsScore}%
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setViewMode('resume')}
                className={`px-3 py-1 rounded font-medium transition ${
                  viewMode === 'resume' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                📄 Resume
              </button>
              <button
                onClick={() => setViewMode('coverletter')}
                className={`px-3 py-1 rounded font-medium transition ${
                  viewMode === 'coverletter' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                ✉️ Cover Letter
              </button>
            </div>

            {viewMode === 'resume' && (
              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
                <button
                  onClick={() => setTemplate('harvard')}
                  className={`px-2.5 py-1 rounded font-medium transition ${
                    template === 'harvard' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Harvard
                </button>
                <button
                  onClick={() => setTemplate('modern')}
                  className={`px-2.5 py-1 rounded font-medium transition ${
                    template === 'modern' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setTemplate('wallstreet')}
                  className={`px-2.5 py-1 rounded font-medium transition ${
                    template === 'wallstreet' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Wall St
                </button>
                <button
                  onClick={() => setTemplate('minimalist')}
                  className={`px-2.5 py-1 rounded font-medium transition ${
                    template === 'minimalist' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Tech Minimal
                </button>
              </div>
            )}

            <button
              onClick={handlePrint}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-lg shadow transition flex items-center gap-1.5"
            >
              <span>🖨️</span> PDF ஆக பதிவிறக்குக
            </button>

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
            
            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 p-3.5 rounded-lg border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 block">🪄 Fortune-500 Executive Formatter</span>
                <span className="text-[11px] text-slate-400">அனைத்து வாக்கியங்களையும் கார்ப்பரேட் ஆங்கிலத்தில் மாற்றும்</span>
              </div>
              <button
                type="button"
                onClick={transformToFortune500}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-lg hover:shadow-emerald-600/30 transition whitespace-nowrap"
              >
                உலகத் தரமாக மாற்று
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
                  placeholder="பணிப் பதவி (Job Title)"
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
                  placeholder="மின்னஞ்சல் முகவரி"
                  value={resumeData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="இருப்பிடம் (City, Country)"
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
                placeholder="எ.கா: 16 years experience in micro finance industry..."
                value={resumeData.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                className="w-full mt-1.5 bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
              />
            </div>

            <div>
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">3. முக்கிய சாதனைகள் (Achievements)</h2>
              <textarea
                rows="3"
                placeholder="Rural area disbursement 10cr with in year&#10;Nil OD npa maintain&#10;Zero complaint branch"
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
                      placeholder="கால அளவு (எ.கா: 2008 – Present)"
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
                    rows="3"
                    placeholder="Branch development&#10;Zero recovery issues&#10;RBI rules follow"
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
                      placeholder="படிப்பு (எ.கா: BBA)"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="கல்லூரி"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="வருடம் (எ.கா: 1998 – 2001)"
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
                    placeholder="தொழில்நுட்பங்கள் (எ.கா: React, SQL)"
                    value={proj.technologies || ''}
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
                  placeholder="திறன்கள் (கமாவால் பிரிக்கவும்: Excel, Power BI, SQL, Python)"
                  value={resumeData.skills}
                  onChange={(e) => handleChange('skills', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="சான்றிதழ்கள் (ஒவ்வொரு வரியிலும்)"
                  value={resumeData.certifications}
                  onChange={(e) => handleChange('certifications', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="மொழிகள் (எ.கா: Tamil, English)"
                  value={resumeData.languages}
                  onChange={(e) => handleChange('languages', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
              </div>
            </div>

          </div>

          {/* வலதுபுறம்: A4 தாள் */}
          <div className="lg:col-span-7 flex justify-center w-full overflow-x-auto">
            <div
              id="print-sheet"
              className={`w-full max-w-[210mm] bg-white text-slate-950 rounded shadow-2xl p-7 sm:p-9 text-[12px] sm:text-[12.5px] leading-[1.4] border border-slate-300 print:shadow-none print:border-none ${
                template === 'harvard' || template === 'wallstreet' ? 'font-serif' : 'font-sans'
              }`}
            >
              {viewMode === 'coverletter' ? (
                <div className="space-y-4 text-slate-900 leading-relaxed font-serif">
                  <div className="border-b-2 border-slate-900 pb-3">
                    <h1 className="text-2xl font-extrabold uppercase tracking-tight text-slate-950">
                      {resumeData.fullName || 'YOUR NAME'}
                    </h1>
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mt-0.5">
                      {resumeData.jobTitle || 'EXECUTIVE LEADER'}
                    </p>
                    <div className="text-[11px] text-slate-600 mt-1 flex gap-3">
                      <span>{resumeData.phone}</span>
                      <span>•</span>
                      <span>{resumeData.email}</span>
                      <span>•</span>
                      <span>{resumeData.location}</span>
                    </div>
                  </div>

                  <div className="text-[11.5px] text-slate-600 pt-1">
                    Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>

                  <div className="text-[12px] font-semibold text-slate-900">
                    To,<br />
                    The Hiring Executive & Senior Leadership Team,<br />
                    Selection Committee
                  </div>

                  <div className="text-[12.5px] font-bold text-slate-950">
                    Subject: Application for {resumeData.jobTitle || 'Executive Leadership'} Role — {resumeData.fullName}
                  </div>

                  <p className="text-justify">
                    Dear Hiring Leadership,
                  </p>

                  <p className="text-justify">
                    I am writing to express my high-level interest in pursuing executive opportunities with your esteemed institution. Bringing extensive leadership tenure across microfinance branch operations, strategic portfolio underwriting, and operational governance, I have continuously directed organizations toward sustainable profitability and regulatory excellence.
                  </p>

                  <p className="text-justify">
                    Throughout my professional journey, I have specialized in scaling rural credit disbursements, sustaining unblemished zero-overdue (0% OD/NPA) portfolio books, and implementing rigorous internal controls in strict alignment with Reserve Bank of India (RBI) statutory mandates. My leadership background centers on steering high-performance field teams, optimizing operational turnaround times, and cementing lasting institutional credibility across target markets.
                  </p>

                  {resumeData.achievements && (
                    <div className="bg-slate-50 border-l-4 border-slate-800 p-3 my-2 text-[11.5px] italic text-slate-800">
                      <strong>Selected Career Milestone:</strong>
                      <div className="mt-1">
                        {resumeData.achievements.split('\n')[0]}
                      </div>
                    </div>
                  )}

                  <p className="text-justify">
                    I welcome the opportunity to discuss how my proven track record in risk management, branch expansion, and institutional credit governance will generate immediate and measurable value for your organization’s strategic objectives.
                  </p>

                  <div className="pt-4">
                    Sincerely,<br /><br />
                    <strong className="text-slate-950 text-sm tracking-wide uppercase">{resumeData.fullName || 'Your Name'}</strong><br />
                    <span className="text-xs text-slate-700">{resumeData.jobTitle}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={`pb-2.5 ${template === 'wallstreet' ? 'border-b-4 border-navy-900 pb-3' : 'text-center'}`}>
                    <h1 className={`font-extrabold uppercase tracking-tight text-slate-950 ${
                      template === 'wallstreet' ? 'text-2xl text-left text-blue-950' : 'text-2xl sm:text-3xl'
                    }`}>
                      {resumeData.fullName || 'YOUR NAME'}
                    </h1>
                    {resumeData.jobTitle && (
                      <p className={`text-xs sm:text-sm font-bold uppercase tracking-widest mt-0.5 ${
                        template === 'wallstreet' ? 'text-left text-blue-900' : 'text-slate-800'
                      }`}>
                        {resumeData.jobTitle}
                      </p>
                    )}
                    
                    <div className={`flex flex-wrap items-center gap-x-2.5 text-[11px] font-medium text-slate-700 mt-1.5 ${
                      template === 'wallstreet' ? 'justify-start' : 'justify-center'
                    }`}>
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

                    {template === 'modern' && <div className="w-full h-1 bg-emerald-600 mt-2.5 rounded-full" />}
                    {template === 'harvard' && <hr className="border-t-2 border-slate-900 mt-2.5" />}
                    {template === 'wallstreet' && <div className="w-full h-0.5 bg-blue-950 mt-2" />}
                    {template === 'minimalist' && <hr className="border-t border-slate-300 mt-2" />}
                  </div>

                  {template === 'minimalist' ? (
                    <div className="grid grid-cols-12 gap-5 mt-3">
                      <div className="col-span-4 border-r border-slate-200 pr-3 space-y-3">
                        {resumeData.skills && (
                          <div>
                            <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                              Skills
                            </h2>
                            <p className="text-[11px] text-slate-800 leading-relaxed">{resumeData.skills}</p>
                          </div>
                        )}
                        {resumeData.education.some(e => e.degree) && (
                          <div>
                            <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                              Education
                            </h2>
                            {resumeData.education.map(edu => edu.degree && (
                              <div key={edu.id} className="text-[11px] mt-1">
                                <div className="font-bold">{edu.degree}</div>
                                <div className="italic text-slate-600">{edu.institution}</div>
                                <div className="text-slate-500">{edu.year}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        {resumeData.certifications && (
                          <div>
                            <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                              Certifications
                            </h2>
                            <p className="text-[11px] text-slate-800">{resumeData.certifications}</p>
                          </div>
                        )}
                        {resumeData.languages && (
                          <div>
                            <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                              Languages
                            </h2>
                            <p className="text-[11px] text-slate-800">{resumeData.languages}</p>
                          </div>
                        )}
                      </div>

                      <div className="col-span-8 space-y-3">
                        {resumeData.summary && (
                          <div>
                            <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                              Summary
                            </h2>
                            <p className="text-[11.5px] text-justify leading-relaxed">{resumeData.summary}</p>
                          </div>
                        )}
                        {resumeData.achievements && (
                          <div>
                            <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                              Milestones
                            </h2>
                            <ul className="list-disc ml-4 text-[11.5px] space-y-0.5">
                              {resumeData.achievements.split('\n').filter(Boolean).map((a, i) => (
                                <li key={i}>{a}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {resumeData.experience.some(e => e.title) && (
                          <div>
                            <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                              Experience
                            </h2>
                            {resumeData.experience.map(exp => exp.title && (
                              <div key={exp.id} className="mt-1.5">
                                <div className="flex justify-between font-bold text-[11.5px]">
                                  <span>{exp.title}</span>
                                  <span className="text-slate-600 font-normal">{exp.period}</span>
                                </div>
                                <div className="italic text-slate-700 text-[11px]">{exp.company} - {exp.location}</div>
                                {exp.responsibilities && (
                                  <ul className="list-disc ml-4 text-[11px] mt-0.5 space-y-0.5">
                                    {exp.responsibilities.split('\n').filter(Boolean).map((r, i) => (
                                      <li key={i}>{r}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {resumeData.summary && (
                        <div className="mt-3">
                          <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                            template === 'wallstreet' 
                              ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' 
                              : 'text-slate-950 border-b border-slate-400'
                          }`}>
                            Executive Summary
                          </h2>
                          <p className="text-slate-900 text-justify font-normal leading-relaxed">
                            {resumeData.summary}
                          </p>
                        </div>
                      )}

                      {resumeData.achievements && (
                        <div className="mt-3">
                          <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                            template === 'wallstreet' 
                              ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' 
                              : 'text-slate-950 border-b border-slate-400'
                          }`}>
                            Key Career Milestones & Achievements
                          </h2>
                          <ul className="list-disc ml-5 space-y-1 text-slate-900">
                            {resumeData.achievements.split('\n').filter(Boolean).map((bullet, idx) => (
                              <li key={idx} className="leading-snug">{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {resumeData.experience.some(e => e.title || e.company) && (
                        <div className="mt-3">
                          <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                            template === 'wallstreet' 
                              ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' 
                              : 'text-slate-950 border-b border-slate-400'
                          }`}>
                            Professional Experience
                          </h2>
                          <div className="space-y-2.5 mt-1">
                            {resumeData.experience.map((exp) => (
                              (exp.title || exp.company) && (
                                <div key={exp.id}>
                                  <div className="flex justify-between items-baseline font-bold text-slate-950 text-[12.5px] sm:text-[13px]">
                                    <span>{exp.title}</span>
                                    <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">
                                      {exp.period}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-baseline text-slate-700 italic text-[11.5px] font-medium">
                                    <span>{exp.company}</span>
                                    <span>{exp.location}</span>
                                  </div>
                                  {exp.responsibilities && (
                                    <ul className="list-disc ml-5 mt-1 space-y-1 text-slate-900">
                                      {exp.responsibilities.split('\n').filter(Boolean).map((resp, i) => (
                                        <li key={i} className="leading-snug">{resp}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {resumeData.education.some(e => e.degree || e.institution) && (
                        <div className="mt-3">
                          <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                            template === 'wallstreet' 
                              ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' 
                              : 'text-slate-950 border-b border-slate-400'
                          }`}>
                            Education & Credentials
                          </h2>
                          <div className="space-y-1.5 mt-1">
                            {resumeData.education.map((edu) => (
                              (edu.degree || edu.institution) && (
                                <div key={edu.id} className="flex justify-between items-baseline gap-2">
                                  <div className="text-slate-900 leading-snug">
                                    <span className="font-bold text-[12.5px]">{edu.degree}</span>
                                    {edu.institution && (
                                      <span className="italic font-medium"> — {edu.institution}</span>
                                    )}
                                    {edu.location && (
                                      <span className="text-slate-600 text-[11px]">, {edu.location}</span>
                                    )}
                                  </div>
                                  {edu.year && (
                                    <span className="text-[11px] text-slate-700 whitespace-nowrap font-semibold">
                                      {edu.year}
                                    </span>
                                  )}
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {resumeData.projects.some(p => p.name) && (
                        <div className="mt-3">
                          <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                            template === 'wallstreet' 
                              ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' 
                              : 'text-slate-950 border-b border-slate-400'
                          }`}>
                            Key Projects
                          </h2>
                          <div className="space-y-1.5 mt-1">
                            {resumeData.projects.map((proj) => (
                              proj.name && (
                                <div key={proj.id}>
                                  <div className="flex justify-between items-baseline">
                                    <span className="font-bold text-slate-950 text-[12.5px]">
                                      {proj.name} {proj.role && <span className="font-normal italic text-slate-700 text-[11.5px]">| {proj.role}</span>}
                                    </span>
                                    {proj.technologies && (
                                      <span className="text-[11px] text-slate-600 font-mono">
                                        {proj.technologies}
                                      </span>
                                    )}
                                  </div>
                                  {proj.description && (
                                    <p className="text-slate-800 text-[11.5px] mt-0.5 leading-snug">{proj.description}</p>
                                  )}
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {resumeData.skills && (
                        <div className="mt-3">
                          <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                            template === 'wallstreet' 
                              ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' 
                              : 'text-slate-950 border-b border-slate-400'
                          }`}>
                            Core Competencies & Professional Skills
                          </h2>
                          <p className="text-slate-900 font-medium text-[12px] mt-1 leading-relaxed">
                            {resumeData.skills}
                          </p>
                        </div>
                      )}

                      {resumeData.certifications && (
                        <div className="mt-3">
                          <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                            template === 'wallstreet' 
                              ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' 
                              : 'text-slate-950 border-b border-slate-400'
                          }`}>
                            Certifications & Professional Credentials
                          </h2>
                          <ul className="list-disc ml-5 mt-1 space-y-0.5 text-slate-900">
                            {resumeData.certifications.split('\n').filter(Boolean).map((cert, idx) => (
                              <li key={idx} className="leading-snug">{cert}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {resumeData.languages && (
                        <div className="mt-3">
                          <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                            template === 'wallstreet' 
                              ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' 
                              : 'text-slate-950 border-b border-slate-400'
                          }`}>
                            Languages
                          </h2>
                          <p className="text-slate-800 text-[12px] mt-1 font-medium">
                            {resumeData.languages}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}