import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const toTitleCase = (str) => {
  if (!str) return '';
  const acronyms = ['IT', 'HR', 'MBA', 'BBA', 'BSC', 'B.SC', 'BE', 'B.E', 'B.TECH', 'MCA', 'BCA', 'SQL', 'RBI', 'OD', 'NPA', 'CR', 'ATS', 'UI', 'UX', 'BI', 'IIT', 'API', 'AWS'];
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

// துறைசார் புல்லட் பாயிண்ட் சீரமைப்பு
const transformActionLine = (raw, domain, careerLevel) => {
  if (!raw) return '';
  let clean = raw.replace(/^[•\-\*\d\.\)\%\:\;\,\#\@\!]+\s*/, '').trim().replace(/[.]+$/, '');
  if (!clean) return '';
  const l = clean.toLowerCase();

  // IT & Software துறை
  if (domain === 'it') {
    if (l.includes('react') || l.includes('front') || l.includes('ui') || l.includes('next')) {
      return 'Engineered dynamic and accessible web interfaces using React and Next.js, elevating end-user performance benchmarks.';
    }
    if (l.includes('api') || l.includes('backend') || l.includes('node') || l.includes('sql') || l.includes('python')) {
      return 'Designed robust backend services and structured SQL databases, optimizing query execution and data throughput.';
    }
    if (l.includes('git') || l.includes('deploy') || l.includes('test') || l.includes('bug')) {
      return 'Enforced structured Git version workflows and rigorous testing protocols, ensuring seamless production releases.';
    }
    return `Spearheaded software development modules in ${clean}, driving technical efficiency and scalable digital architecture.`;
  }

  // Sales & Business துறை
  if (domain === 'sales') {
    if (l.includes('lead') || l.includes('client') || l.includes('customer') || l.includes('meet')) {
      return 'Cultivated and converted strategic enterprise client pipelines, driving sustainable quarterly revenue acceleration.';
    }
    if (l.includes('target') || l.includes('sale') || l.includes('revenue') || l.includes('achieve')) {
      return 'Consistently surpassed ambitious sales quotas and regional growth metrics through disciplined negotiation and relationship governance.';
    }
    return `Directed business development outreach in ${clean}, substantially increasing market reach and client retention.`;
  }

  // Accounts & Corporate Finance துறை
  if (domain === 'accounts') {
    if (l.includes('audit') || l.includes('tax') || l.includes('gst') || l.includes('compliance')) {
      return 'Executed precision financial audits, corporate tax governance, and statutory filings with 100% regulatory compliance.';
    }
    if (l.includes('ledger') || l.includes('reconcil') || l.includes('sheet') || l.includes('entry')) {
      return 'Orchestrated end-to-end ledger balance reconciliations and cash-flow management, eliminating reporting discrepancies.';
    }
    return `Maintained rigorous financial oversight in ${clean}, ensuring corporate fiscal integrity and auditing precision.`;
  }

  // இயல்புநிலை: Banking & Microfinance
  if (l.includes('disburse') || l.includes('loan') || l.includes('10cr') || l.includes('10 cr') || l.includes('rural')) {
    return 'Spearheaded rural credit underwriting and scalable loan disbursements, achieving an annual portfolio milestone of ₹10+ Crores.';
  }
  if (l.includes('nil od') || l.includes('od npa') || l.includes('recovery') || l.includes('overdue') || l.includes('npa')) {
    return 'Maintained an unblemished zero-overdue (0% OD/NPA) portfolio record through proactive credit governance and rigorous collection follow-ups.';
  }
  if (l.includes('rbi') || l.includes('rule') || l.includes('norm') || l.includes('compliance')) {
    return 'Enforced 100% statutory compliance with Reserve Bank of India (RBI) guidelines, operational auditing frameworks, and microfinance norms.';
  }
  if (l.includes('branch development') || l.includes('development') || l.includes('growth')) {
    return 'Directed end-to-end branch expansion and business development initiatives, substantially increasing customer reach and operating margins.';
  }
  if (l.includes('complaint') || l.includes('grievance')) {
    return 'Instituted a customer-first service culture, sustaining an exemplary operational record of zero unresolved customer grievances.';
  }

  let pureContent = clean
    .replace(/spearheaded key initiatives in/gi, '')
    .replace(/driving measurable operational efficiency and institutional excellence/gi, '')
    .trim();

  if (/^spearheaded/i.test(clean)) return clean;
  return `Spearheaded key initiatives in ${pureContent.toLowerCase()}, driving measurable operational efficiency and institutional excellence.`;
};

export default function ResumeBuilder() {
  const [template, setTemplate] = useState('harvard'); // 'harvard' | 'modern' | 'wallstreet' | 'minimalist'
  const [viewMode, setViewMode] = useState('resume'); // 'resume' | 'coverletter'
  const [careerLevel, setCareerLevel] = useState('experienced'); // 'experienced' | 'fresher'
  const [domain, setDomain] = useState('banking'); // 'banking' | 'it' | 'sales' | 'accounts'

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
      const saved = localStorage.getItem('nb_resume_user_data_v2');
      if (saved) {
        setResumeData(JSON.parse(saved));
      } else {
        const legacy = localStorage.getItem('nb_resume_user_data');
        if (legacy) setResumeData(JSON.parse(legacy));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleChange = (field, val) => {
    const updated = { ...resumeData, [field]: val };
    setResumeData(updated);
    try {
      localStorage.setItem('nb_resume_user_data_v2', JSON.stringify(updated));
    } catch (e) {}
  };

  // மாதிரித் தரவு ஏற்றுதல் (1-Click Sample Data)
  const loadSampleProfile = (type) => {
    if (type === 'fresher_it') {
      setCareerLevel('fresher');
      setDomain('it');
      const sample = {
        fullName: 'ARUN KUMAR R',
        jobTitle: 'Junior Software Engineer',
        phone: '9876543210',
        email: 'arun.tech@email.com',
        location: 'Chennai, India',
        summary: 'Driven and analytically adept Computer Applications graduate with solid foundational competence in modern JavaScript (React, Next.js), SQL database architecture, and Python. Passionate about engineering high-efficiency digital solutions with zero latency and structured version workflows.',
        achievements: 'Developed full-stack web applications securing 1st place in university hackathon.\nAchieved top 5% rank in academic coursework across data structures and algorithms.',
        experience: [],
        education: [
          { id: 1, degree: 'B.Sc Computer Science', institution: 'Chennai University', location: 'Chennai', year: '2022 – 2025' }
        ],
        projects: [
          { id: 1, name: 'Smart Property Hub', role: 'Full Stack Developer', technologies: 'React, SQL, Python', description: 'Architected an automated property portal streamlining listing search algorithms and responsive UI components.' }
        ],
        skills: 'React.js  •  Next.js  •  SQL  •  Python  •  Git & GitHub  •  RESTful APIs  •  Data Structures',
        certifications: 'Full Stack Development Certification - IIT Madras Online.',
        languages: 'Tamil, English'
      };
      setResumeData(sample);
      localStorage.setItem('nb_resume_user_data_v2', JSON.stringify(sample));
    } else {
      // Experienced Banking Profile
      setCareerLevel('experienced');
      setDomain('banking');
      const sample = {
        fullName: 'UDAYAKUMAR S',
        jobTitle: 'Branch Manager',
        phone: '9962369131',
        email: 'test@mail.com',
        location: 'Chennai-603107',
        summary: 'Branch Manager with 16+ years of extensive leadership across microfinance branch operations, portfolio governance, and field credit risk management. Proven expertise in rural credit disbursements, sustaining zero NPA/OD portfolios, ensuring 100% statutory compliance with RBI norms, and mentoring high-performing teams to achieve sustainable institutional profitability.',
        achievements: 'Spearheaded rural credit underwriting and scalable loan disbursements, achieving an annual portfolio milestone of ₹10+ Crores.\nMaintained an unblemished zero-overdue (0% OD/NPA) portfolio record through proactive credit governance and rigorous collection follow-ups.\nDirected end-to-end branch expansion and business development initiatives, substantially increasing customer reach and operating margins.',
        experience: [
          {
            id: 1,
            title: 'Branch Manager',
            company: 'Rich Finance',
            location: 'Chennai',
            period: '2010 – Present',
            responsibilities: 'Enforced 100% statutory compliance with Reserve Bank of India (RBI) guidelines, operational auditing frameworks, and microfinance norms.\nChampioned high-quality financial service delivery, significantly enhancing borrower retention and community trust.\nSpearheaded key initiatives in digital process, driving measurable operational efficiency and institutional excellence.'
          }
        ],
        education: [
          { id: 1, degree: 'BBA', institution: 'Chennai College', location: 'Chennai', year: '1998 – 2001' }
        ],
        projects: [
          { id: 1, name: 'Namma Boomi 360', role: 'Developer', technologies: 'React, SQL, Python', description: 'Architected and implemented platform capabilities for Namma Boomi 360, delivering seamless end-to-end user experience.' }
        ],
        skills: 'Power BI  •  Advanced Excel  •  Branch Operations  •  Microfinance Portfolio Governance  •  RBI Statutory Compliance  •  Credit Risk Underwriting',
        certifications: 'Data Analytical Course in IIT Madras.',
        languages: 'Tamil, English'
      };
      setResumeData(sample);
      localStorage.setItem('nb_resume_user_data_v2', JSON.stringify(sample));
    }
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

  // எக்ஸிகியூட்டிவ் ஃபார்மேட்டர் என்ஜின்
  const transformToFortune500 = () => {
    let rawSummary = (resumeData.summary || '').trim();
    const roleTitle = resumeData.jobTitle ? toTitleCase(resumeData.jobTitle.replace(/branach/i, 'Branch')) : (careerLevel === 'fresher' ? 'Associate Professional' : 'Branch Manager');
    
    let polishedSummary = '';
    if (careerLevel === 'fresher') {
      polishedSummary = `Motivated and detail-oriented ${roleTitle} with strong academic credentials and practical project implementation skills. Eager to contribute foundational problem-solving competencies, rapid learning capabilities, and disciplined technical workflows to support institutional growth and team success.`;
    } else {
      const yearsMatch = rawSummary.match(/\b(\d+)\+?\s*(years?|ஆண்டு|வருட|yrs)/i);
      const yearsNum = yearsMatch ? yearsMatch[1] : '16';
      polishedSummary = `${roleTitle} with ${yearsNum}+ years of extensive leadership across microfinance branch operations, portfolio governance, and field credit risk management. Proven expertise in rural credit disbursements, sustaining zero NPA/OD portfolios, ensuring 100% statutory compliance with RBI norms, and mentoring high-performing teams to achieve sustainable institutional profitability.`;
    }

    const processLines = (raw) => {
      if (!raw) return '';
      const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
      const seen = new Set();
      const output = [];

      for (let l of lines) {
        const converted = transformActionLine(l, domain, careerLevel);
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
        : (domain === 'it' 
            ? 'React.js  •  Next.js  •  SQL  •  Python  •  Git  •  REST APIs'
            : 'Branch Operations  •  Microfinance Portfolio Governance  •  RBI Statutory Compliance  •  Credit Risk Underwriting  •  Power BI  •  Advanced Excel'),
      certifications: resumeData.certifications
        ? resumeData.certifications.split(/[\n,]/).map(c => toTitleCase(c.trim())).filter(Boolean).map(c => c.endsWith('.') ? c : `${c}.`).join('\n')
        : '',
      languages: resumeData.languages
        ? resumeData.languages.split(/[,/]/).map(l => toTitleCase(l.trim())).filter(Boolean).join(', ')
        : 'Tamil, English'
    };

    setResumeData({ ...updated });
    try {
      localStorage.setItem('nb_resume_user_data_v2', JSON.stringify(updated));
    } catch (e) {}
  };

  // நிகழ்நேர ATS மதிப்பெண் கணக்கீடு
  const atsScore = useMemo(() => {
    let score = 0;
    if (resumeData.fullName) score += 10;
    if (resumeData.phone && resumeData.email) score += 15;
    if (resumeData.summary && resumeData.summary.length > 40) score += 20;
    if (careerLevel === 'experienced') {
      if (resumeData.experience.some(e => e.title && e.responsibilities)) score += 25;
    } else {
      // Fresher-க்கு Projects அதிக மதிப்பெண்
      if (resumeData.projects.some(p => p.name)) score += 25;
    }
    if (resumeData.skills && resumeData.skills.length > 8) score += 15;
    if (resumeData.education.some(e => e.degree)) score += 10;
    if (resumeData.achievements) score += 5;
    return Math.min(score, 100);
  }, [resumeData, careerLevel]);

  const handleReset = () => {
    if (confirm('அனைத்து உள்ளீடுகளையும் அழித்துவிட்டுப் புதிய படிவத்தைத் தொடங்க விரும்புகிறீர்களா?')) {
      setResumeData(emptyForm);
      try {
        localStorage.removeItem('nb_resume_user_data_v2');
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
        <meta name="description" content="Fortune-500 Universal ATS Resume & Cover Letter Studio for Freshers & Experienced" />
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
            {/* Resume vs Cover Letter */}
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

            {/* Template Selector */}
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

      {/* Main Container */}
      <main className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 print:p-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* இடதுபுறம்: ஸ்மார்ட் படிவம் */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 print:hidden shadow-xl">
            
            {/* Career Level & Domain Switcher Bar */}
            <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">விண்ணப்பதாரர் நிலை:</span>
                <div className="flex bg-slate-900 p-0.5 rounded border border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => setCareerLevel('experienced')}
                    className={`px-2.5 py-1 rounded ${careerLevel === 'experienced' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Experienced (அனுபவம்)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCareerLevel('fresher')}
                    className={`px-2.5 py-1 rounded ${careerLevel === 'fresher' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Fresher (புதியவர்)
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-700/60">
                <span className="text-xs font-bold text-slate-300">தொழில் துறை:</span>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-xs text-emerald-400 rounded px-2 py-1 focus:outline-none"
                >
                  <option value="banking">Banking & Microfinance</option>
                  <option value="it">IT & Software Engineering</option>
                  <option value="sales">Sales & Business Development</option>
                  <option value="accounts">Accounts & Corporate Finance</option>
                </select>
              </div>

              {/* Sample Profile Quick Buttons */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <span>மாதிரித் தரவு ஏற்று:</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => loadSampleProfile('experienced_banking')}
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-emerald-300 px-2 py-0.5 rounded"
                  >
                    Banking Exp
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleProfile('fresher_it')}
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-indigo-300 px-2 py-0.5 rounded"
                  >
                    IT Fresher
                  </button>
                </div>
              </div>
            </div>

            {/* உலகத் தரம் மாற்றும் மாஸ்டர் பொத்தான் */}
            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 p-3.5 rounded-lg border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 block">🪄 Fortune-500 Universal Formatter</span>
                <span className="text-[11px] text-slate-400">துறைக்கு ஏற்ப வாக்கியங்களை சர்வதேச தரத்தில் மாற்றும்</span>
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
                placeholder="சுருக்கக் குறிப்பு..."
                value={resumeData.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                className="w-full mt-1.5 bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
              />
            </div>

            <div>
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                3. {careerLevel === 'fresher' ? 'கல்வி சிறப்புகள் & சாதனைகள்' : 'முக்கிய சாதனைகள் (Key Milestones)'}
              </h2>
              <textarea
                rows="3"
                placeholder="ஒவ்வொரு வரியிலும் ஒரு சாதனை..."
                value={resumeData.achievements}
                onChange={(e) => handleChange('achievements', e.target.value)}
                className="w-full mt-1.5 bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
              />
            </div>

            {/* பணி அனுபவம் (Experienced நபர்களுக்கு மட்டும்) */}
            {careerLevel === 'experienced' && (
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
                        placeholder="கால அளவு (எ.கா: 2010 – Present)"
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
                      placeholder="பொறுப்புகள் மற்றும் சாதனைகள்..."
                      value={exp.responsibilities}
                      onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                  </div>
                ))}
              </div>
            )}

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
                      placeholder="படிப்பு (எ.கா: BBA, B.Sc)"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="கல்லூரி / பள்ளி"
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
                <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">6. திட்டங்கள் (Key Projects)</h2>
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
                    placeholder="தொழில்நுட்பங்கள் (எ.கா: React, SQL, Python)"
                    value={proj.technologies || ''}
                    onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white"
                  />
                  <textarea
                    rows="1"
                    placeholder="திட்ட விளக்கம்"
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
                  placeholder="திறன்கள் (கமாவால் பிரிக்கவும்)"
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

          {/* வலதுபுறம்: A4 தாள் (Universal Sheet) */}
          <div className="lg:col-span-7 flex justify-center w-full overflow-x-auto">
            <div
              id="print-sheet"
              className={`w-full max-w-[210mm] bg-white text-slate-950 rounded shadow-2xl p-7 sm:p-9 text-[12px] sm:text-[12.5px] leading-[1.4] border border-slate-300 print:shadow-none print:border-none ${
                template === 'harvard' || template === 'wallstreet' ? 'font-serif' : 'font-sans'
              }`}
            >
              {viewMode === 'coverletter' ? (
                /* Cover Letter Mode (Fresher & Experienced) */
                <div className="space-y-4 text-slate-900 leading-relaxed font-serif">
                  <div className="border-b-2 border-slate-900 pb-3">
                    <h1 className="text-2xl font-extrabold uppercase tracking-tight text-slate-950">
                      {resumeData.fullName || 'YOUR NAME'}
                    </h1>
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mt-0.5">
                      {resumeData.jobTitle || (careerLevel === 'fresher' ? 'GRADUATE APPLICANT' : 'EXECUTIVE LEADER')}
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
                    The Hiring Team & Selection Committee,<br />
                    Recruitment Department
                  </div>

                  <div className="text-[12.5px] font-bold text-slate-950">
                    Subject: Application for {resumeData.jobTitle || 'Professional Role'} — {resumeData.fullName}
                  </div>

                  <p className="text-justify">
                    Dear Hiring Leadership,
                  </p>

                  {careerLevel === 'fresher' ? (
                    <>
                      <p className="text-justify">
                        I am writing to express my enthusiastic interest in beginning my professional journey with your esteemed organization. Having recently completed rigorous academic coursework with strong analytical competencies, I am eager to apply my practical skills in {domain === 'it' ? 'modern software engineering and database workflows' : 'institutional analysis and problem solving'}.
                      </p>
                      <p className="text-justify">
                        During my academic projects, I have demonstrated a steadfast commitment to disciplined execution, collaborative teamwork, and continuous technical improvement. I take pride in adhering to high standards of quality and best industry practices.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-justify">
                        I am writing to express my high-level interest in pursuing executive opportunities with your esteemed institution. Bringing extensive leadership tenure across microfinance branch operations, strategic portfolio underwriting, and operational governance, I have continuously directed organizations toward sustainable profitability and regulatory excellence.
                      </p>
                      <p className="text-justify">
                        Throughout my professional journey, I have specialized in scaling rural credit disbursements, sustaining unblemished zero-overdue (0% OD/NPA) portfolio books, and implementing rigorous internal controls in strict alignment with Reserve Bank of India (RBI) statutory mandates.
                      </p>
                    </>
                  )}

                  {resumeData.achievements && (
                    <div className="bg-slate-50 border-l-4 border-slate-800 p-3 my-2 text-[11.5px] italic text-slate-800">
                      <strong>Highlighted Career Milestone:</strong>
                      <div className="mt-1">
                        {resumeData.achievements.split('\n')[0]}
                      </div>
                    </div>
                  )}

                  <p className="text-justify">
                    I welcome the opportunity to discuss how my disciplined work ethic, domain expertise, and dedication will create immediate and enduring value for your organization’s strategic vision.
                  </p>

                  <div className="pt-4">
                    Sincerely,<br /><br />
                    <strong className="text-slate-950 text-sm tracking-wide uppercase">{resumeData.fullName || 'Your Name'}</strong><br />
                    <span className="text-xs text-slate-700">{resumeData.jobTitle}</span>
                  </div>
                </div>
              ) : (
                /* Resume Mode (Universal Layout) */
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

                  {/* Minimalist 2-Column Mode */}
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
                              {careerLevel === 'fresher' ? 'Academic Honors' : 'Key Milestones'}
                            </h2>
                            <ul className="list-disc ml-4 text-[11.5px] space-y-0.5">
                              {resumeData.achievements.split('\n').filter(Boolean).map((a, i) => (
                                <li key={i}>{a}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Projects (Fresher Mode Prioritized) */}
                        {careerLevel === 'fresher' && resumeData.projects.some(p => p.name) && (
                          <div>
                            <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                              Key Projects
                            </h2>
                            {resumeData.projects.map(proj => proj.name && (
                              <div key={proj.id} className="mt-1">
                                <div className="font-bold text-[11.5px]">{proj.name} | {proj.technologies}</div>
                                <p className="text-[11px] text-slate-700">{proj.description}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Experience (Experienced Mode) */}
                        {careerLevel === 'experienced' && resumeData.experience.some(e => e.title) && (
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
                    /* Full Width Single-Column Layouts (Harvard, Modern, Wall Street) */
                    <div>
                      {/* Summary */}
                      {resumeData.summary && (
                        <div className="mt-3">
                          <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                            template === 'wallstreet' 
                              ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' 
                              : 'text-slate-950 border-b border-slate-400'
                          }`}>
                            {careerLevel === 'fresher' ? 'Professional Summary' : 'Executive Summary'}
                          </h2>
                          <p className="text-slate-900 text-justify font-normal leading-relaxed">
                            {resumeData.summary}
                          </p>
                        </div>
                      )}

                      {/* Milestones / Honors */}
                      {resumeData.achievements && (
                        <div className="mt-3">
                          <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                            template === 'wallstreet' 
                              ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' 
                              : 'text-slate-950 border-b border-slate-400'
                          }`}>
                            {careerLevel === 'fresher' ? 'Academic Honors & Key Highlights' : 'Key Career Milestones & Achievements'}
                          </h2>
                          <ul className="list-disc ml-5 space-y-1 text-slate-900">
                            {resumeData.achievements.split('\n').filter(Boolean).map((bullet, idx) => (
                              <li key={idx} className="leading-snug">{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* FRESHER MODE: Education & Projects First */}
                      {careerLevel === 'fresher' && (
                        <>
                          {resumeData.education.some(e => e.degree) && (
                            <div className="mt-3">
                              <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                                template === 'wallstreet' ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' : 'text-slate-950 border-b border-slate-400'
                              }`}>
                                Education & Academic Credentials
                              </h2>
                              <div className="space-y-1 mt-1">
                                {resumeData.education.map(edu => edu.degree && (
                                  <div key={edu.id} className="flex justify-between items-baseline">
                                    <span className="font-bold text-[12.5px]">{edu.degree} — <span className="font-normal italic">{edu.institution}, {edu.location}</span></span>
                                    <span className="text-[11px] font-semibold text-slate-700">{edu.year}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {resumeData.projects.some(p => p.name) && (
                            <div className="mt-3">
                              <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                                template === 'wallstreet' ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' : 'text-slate-950 border-b border-slate-400'
                              }`}>
                                Capstone & Technical Projects
                              </h2>
                              <div className="space-y-1.5 mt-1">
                                {resumeData.projects.map(proj => proj.name && (
                                  <div key={proj.id}>
                                    <div className="flex justify-between items-baseline font-bold text-slate-950">
                                      <span>{proj.name} {proj.role && <span className="font-normal italic text-slate-600">| {proj.role}</span>}</span>
                                      <span className="text-[11px] text-slate-600 font-mono">{proj.technologies}</span>
                                    </div>
                                    {proj.description && <p className="text-slate-800 text-[11.5px] mt-0.5">{proj.description}</p>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* EXPERIENCED MODE: Experience First */}
                      {careerLevel === 'experienced' && resumeData.experience.some(e => e.title || e.company) && (
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

                      {/* EXPERIENCED MODE: Education */}
                      {careerLevel === 'experienced' && resumeData.education.some(e => e.degree || e.institution) && (
                        <div className="mt-3">
                          <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider pb-0.5 mb-1 ${
                            template === 'wallstreet' 
                              ? 'text-blue-950 border-b-2 border-blue-900/60 font-sans' 
                              : 'text-slate-950 border-b border-slate-400'
                          }`}>
                            Education & Credentials
                          </h2>
                          <div className="space-y-1 mt-1">
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

                      {/* EXPERIENCED MODE: Key Projects */}
                      {careerLevel === 'experienced' && resumeData.projects.some(p => p.name) && (
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

                      {/* Skills */}
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

                      {/* Certifications */}
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

                      {/* Languages */}
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