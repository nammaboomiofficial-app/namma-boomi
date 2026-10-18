import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    skills: '',
    achievements: '',
    certifications: '',
    languages: '',
    experience: [{ role: '', company: '', period: '', desc: '' }],
    education: [{ degree: '', institution: '', year: '' }]
  });

  const [showAchievements, setShowAchievements] = useState(false);
  const [showCertifications, setShowCertifications] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('harvard');
  const handleResetForm = () => {
    if (window.confirm("படிவத்தில் உள்ள அனைத்து விவரங்களையும் அழித்து புதிய ரெஸ்யூம் உருவாக்க விரும்புகிறீர்களா?")) {
      localStorage.removeItem('nb360_resume_data');
      window.location.reload();
    }
  };
  // தகவல்களை தானாக மீட்டெடுத்தல் (Load saved data on start)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nb360_resume_data');
      if (saved) {
        setResumeData(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading resume:', e);
    }
  }, []);

  // தகவல்களை தானாக சேமித்தல் (Auto-save on change)
  useEffect(() => {
    try {
      localStorage.setItem('nb360_resume_data', JSON.stringify(resumeData));
    } catch (e) {
      console.error('Error saving resume:', e);
    }
  }, [resumeData]);

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleExpChange = (index, field, value) => {
    const updated = [...resumeData.experience];
    updated[index][field] = value;
    setResumeData({ ...resumeData, experience: updated });
  };

  const addExperience = () => {
    if (resumeData.experience.length < 4) {
      setResumeData({
        ...resumeData,
        experience: [...resumeData.experience, { role: '', company: '', period: '', desc: '' }]
      });
    }
  };

  const removeExperience = (index) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index)
    });
  };

  const handleEduChange = (index, field, value) => {
    const updated = [...resumeData.education];
    updated[index][field] = value;
    setResumeData({ ...resumeData, education: updated });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { degree: '', institution: '', year: '' }]
    });
  };

  const removeEducation = (index) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index)
    });
  };

  // ==========================================
  // யுனிவர்சல் பொதுவான ATS டிரான்ஸ்பார்மேஷன் என்ஜின்
  // (IT, Finance, Sales, HR, Engineering, Admin etc.)
  // ==========================================
  const handleCompleteWorldClassPolish = () => {
    // 1. உலகளாவிய பொதுவான டைட்டில் கேஸ் & எழுத்துப் பிழை திருத்தி
    const titleCase = (str) => {
      if (!str) return '';
      return str
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
    };

    const commonTypoFixer = (text) => {
      if (!text) return '';
      return text
        .replace(/\bmanger\b/gi, 'Manager')
        .replace(/\benglsih\b/gi, 'English')
        .replace(/\bexcell\b/gi, 'Excel')
        .replace(/\bchemistrey\b/gi, 'Chemistry')
        .replace(/\btraning\b|\btranning\b/gi, 'Training')
        .replace(/\bdevelopement\b|\bdevlopment\b/gi, 'Development')
        .replace(/\bdisburesment\b|\bdisbresment\b/gi, 'Disbursement')
        .replace(/\brcovery\b/gi, 'Recovery')
        .replace(/\bcolletion\b/gi, 'Collection')
        .replace(/\bmanagment\b/gi, 'Management');
    };

    // 2. யுனிவர்சல் புல்லட் பாயிண்ட் என்ஜின் (எந்தத் துறையின் வார்த்தைகளையும் கார்ப்பரேட் ஆக்ஷன் வெர்பாக மாற்றும்)
    const polishUniversalBullets = (desc) => {
      if (!desc) return '';
      const lines = desc
        .split('\n')
        .map((l) => commonTypoFixer(l.replace(/^[•\-\*]\s*/, '').trim()))
        .filter(Boolean);

      const universalActionRules = [
        // சாப்ட்வேர் / ஐடி / தொழில்நுட்பம் (Software, IT, Dev, Code, Data)
        {
          regex: /(code|program|develop|software|build|frontend|backend|fullstack|api|cloud|app|web|database)/i,
          action: 'Architected and implemented end-to-end scalable solutions, driving optimal system reliability, security, and peak performance.'
        },
        // நிதி / வங்கி / லோன் / அக்கவுண்ட்ஸ் (Finance, Accounts, Banking, Audit)
        {
          regex: /(loan|disbur|credit|disburs|sanction|kadan|finance|banking|fund)/i,
          action: 'Streamlined credit underwriting protocols and disbursement lifecycles, ensuring rigorous statutory compliance and portfolio health.'
        },
        {
          regex: /(recovery|recov|collect|vasool|overdue|npa|arrear|debt)/i,
          action: 'Spearheaded proactive debt recovery workflows and risk-mitigation strategies, sustaining industry-benchmark collection efficiency.'
        },
        {
          regex: /(account|tally|tax|gst|balance|ledger|bookkeep)/i,
          action: 'Managed comprehensive financial reconciliations, taxation audits, and statutory financial reporting with zero-defect accuracy.'
        },
        // விற்பனை / வர்த்தக வளர்ச்சி / மார்க்கெட்டிங் (Sales, BD, Growth, Clients)
        {
          regex: /(sales|business\s*dev|market|growth|revenue|client\s*acq|expansion|crm)/i,
          action: 'Drove high-impact business development initiatives and market penetration, consistently expanding client footprint and revenue benchmarks.'
        },
        // தளம் / சர்வே / ஃபீல்டு ஆபரேஷன்ஸ் (Field Ops, Survey, Catchment, Site)
        {
          regex: /(survey|field|area|sourcing|catchment|outreach|site|logistic)/i,
          action: 'Conducted systematic field evaluations and catchment surveys to accelerate client acquisition and territory expansion.'
        },
        // மனிதவளம் / பயிற்சி / டீம் தலைமை (HR, Team Lead, Training, Recruitment)
        {
          regex: /(train|training|coach|mentor|skill|session|teach)/i,
          action: 'Conducted high-impact training and capability-building programs, elevating cross-functional workforce productivity and domain excellence.'
        },
        {
          regex: /(team|lead|supervis|manage|staff|officer|recruit|hire|talent|hr)/i,
          action: 'Supervised, coached, and empowered cross-functional teams, fostering a high-performance culture, accountability, and seamless execution.'
        },
        // ஆடிட் / தரக்கட்டுப்பாடு / கம்ப்ளையன்ஸ் (Audit, QA, Policy, Compliance, ISO)
        {
          regex: /(audit|complian|statutory|quality|qa|qc|iso|rbi|policy|inspection)/i,
          action: 'Instituted robust governance frameworks and quality audits, ensuring 100% adherence to regulatory benchmarks and SOPs.'
        },
        // டேட்டா அனலிட்டிக்ஸ் / ரிப்போர்ட்டிங் (Data, BI, MIS, Excel, Dashboard)
        {
          regex: /(report|mis|data|dashboard|excel|analytics|power\s*bi|metrics)/i,
          action: 'Synthesized complex operational datasets into executive-level MIS reports and interactive dashboards to enable data-backed strategic decisions.'
        },
        // வாடிக்கையாளர் சேவை / ஆதரவு (Customer Service, Support, Operations)
        {
          regex: /(customer|client|service|support|helpdesk|retention)/i,
          action: 'Delivered customer-centric operational excellence and escalated issue resolution, maximizing client satisfaction ratings and trust.'
        }
      ];

      const converted = lines.map((line) => {
        const matched = universalActionRules.find((rule) => rule.regex.test(line));
        if (matched) return `• ${matched.action}`;

        // குறிப்பிட்ட விதி இல்லாவிட்டால் - தானாகவே தொழில்முறை Action Verbs கொண்டு வாக்கியத்தை உருவாக்குதல்
        let clean = line.replace(/[.]+$/, '');
        clean = clean.charAt(0).toUpperCase() + clean.slice(1);
        if (clean.split(/\s+/).length <= 2) {
          return `• Successfully spearheaded end-to-end ${clean.toLowerCase()} initiatives, achieving targeted operational goals.`;
        }
        return `• ${clean}.`;
      });

      return Array.from(new Set(converted)).join('\n');
    };

    // 3. யுனிவர்சல் சாதனைகள் (Achievements) என்ஜின் - எந்தத் துறையின் புள்ளிவிவரத்தையும் கார்ப்பரேட்டாக மாற்றும்
    const polishUniversalAchievements = (text) => {
      if (!text) return '';
      const lines = text
        .split('\n')
        .map((l) => commonTypoFixer(l.replace(/^[•\-\*]\s*/, '').trim()))
        .filter(Boolean);

      let usedCategories = new Set();

      const converted = lines.map((line) => {
        const l = line.toLowerCase();

        // 1. நிதி / விற்பனை அளவுகள் (Crores, Lakhs, Millions, Currency)
        if ((l.includes('cr') || l.includes('crore') || l.includes('lakh') || l.includes('million') || l.includes('disbur') || l.includes('sales')) && !usedCategories.has('volume')) {
          const numMatch = l.match(/(\d+[\.\d]*)\s*(cr|crore|lakh|million|m)?/i);
          const val = numMatch ? `₹${numMatch[1]}+ Crores` : 'multi-million volume';
          usedCategories.add('volume');
          return `• Spearheaded high-volume operational portfolio, achieving ${val} in annual throughput with exemplary execution discipline.`;
        }

        // 2. உயர் சதவீத சாதனைகள் (90% - 100% Recovery, Quality, SLA, Efficiency)
        if ((l.match(/(9\d|100)\s*(%|percent)/) || l.includes('recovery') || l.includes('sla')) && !usedCategories.has('high_percent')) {
          const numMatch = l.match(/(\d+[\.\d]*)\s*(%|percent)?/i);
          const val = numMatch && numMatch[1] ? `${numMatch[1]}%` : '99%+';
          usedCategories.add('high_percent');
          return `• Sustained an industry-benchmark ${val}+ efficiency and compliance rating across challenging business cycles through disciplined monitoring.`;
        }

        // 3. நடுத்தர சதவீத வளர்ச்சி சாதனைகள் (Growth, Penetration, Target 50% - 89%)
        if ((l.includes('%') || l.includes('percent') || l.includes('growth') || l.includes('target')) && !usedCategories.has('growth')) {
          const numMatch = l.match(/(\d+[\.\d]*)\s*(%|percent)?/i);
          const val = numMatch && numMatch[1] ? `${numMatch[1]}%` : '75%+';
          usedCategories.add('growth');
          return `• Accelerated core operational metrics and regional penetration by ${val}, consistently outperforming organizational quarterly benchmarks.`;
        }

        // 4. டிஜிட்டல் முறை, தானியங்கி, புதுமை (Digital, Tech, Automation, Process)
        if ((l.includes('digital') || l.includes('tech') || l.includes('automati') || l.includes('cashless') || l.includes('online')) && !usedCategories.has('digital')) {
          usedCategories.add('digital');
          return `• Pioneered digital transformation initiatives, driving seamless digital tool adoption and modern workflow automation across diverse teams.`;
        }

        // பொதுவான சாதனை வரி
        let clean = line.replace(/[.]+$/, '');
        clean = clean.charAt(0).toUpperCase() + clean.slice(1);
        return `• Recognized for outstanding contributions in ${clean.toLowerCase()}, delivering measurable organizational impact.`;
      });

      return Array.from(new Set(converted)).join('\n');
    };

    // 4. யுனிவர்சல் சான்றிதழ்கள் (Certifications)
    const polishUniversalCerts = (text) => {
      if (!text) return '';
      return text
        .split('\n')
        .map((l) => commonTypoFixer(l.replace(/^[•\-\*]\s*/, '').trim()))
        .filter(Boolean)
        .map((line) => {
          let clean = titleCase(line)
            .replace(/\biit\b/gi, 'IIT')
            .replace(/\baws\b/gi, 'AWS')
            .replace(/\biim\b/gi, 'IIM')
            .replace(/\bnit\b/gi, 'NIT')
            .replace(/\bgcp\b/gi, 'GCP')
            .replace(/\bmadrss\b/gi, 'Madras')
            .replace(/\bmadras\b/gi, 'Madras');
          return `• ${clean}`;
        })
        .join('\n');
    };

    // 5. பதவி மற்றும் சுருக்கம் (Summary)
    let job = commonTypoFixer(resumeData.jobTitle) || 'Business Operations Professional';
    let rawSummary = resumeData.summary || '';
    
    // எந்த மொழியில் வருடங்களை உள்ளீடு செய்தாலும் கண்டறிதல் (எ.கா: 16 years, 5 varudam, 10 aandu)
    const yearsMatch = rawSummary.match(/\b(\d+)\s*(varudam|varusham|aandu|years?|yrs?)\b/i);
    const yearsCount = yearsMatch ? `${yearsMatch[1]}+ years` : '';

    let polishedSummary = '';
    if (yearsCount) {
      polishedSummary = `Accomplished and performance-driven ${titleCase(job)} with over ${yearsCount} of comprehensive industry experience. Proven track record of operational excellence, strategic leadership, and sustainable organizational growth across competitive business environments.`;
    } else if (rawSummary.length > 20) {
      polishedSummary = `${titleCase(job)} offering strong domain capabilities and dedicated expertise. Known for driving organizational value, operational efficiency, and team performance aligned with corporate strategic objectives.`;
    } else {
      polishedSummary = `Strategic and result-oriented ${titleCase(job)} equipped with cross-functional leadership acumen, dedicated to operational excellence and business impact.`;
    }

    // 6. கால அளவு (Period) யுனிவர்சல் திருத்தி (எ.கா: 2010 aug, aug - 2010, 2015 to 2020)
    const fixPeriod = (period) => {
      if (!period) return '';
      let clean = period
        .replace(/\bto\b/gi, '-')
        .replace(/\s+/g, ' ')
        .replace(/\b(now|present\s*present)\b/gi, 'Present')
        .replace(/\baugust\b|\baug\b/gi, 'Aug')
        .replace(/\bjanuary\b|\bjan\b/gi, 'Jan')
        .replace(/\bfebruary\b|\bfeb\b/gi, 'Feb')
        .replace(/\bmarch\b|\bmar\b/gi, 'Mar')
        .replace(/\bapril\b|\bapr\b/gi, 'Apr')
        .replace(/\bseptember\b|\bsep\b/gi, 'Sep')
        .replace(/\boctober\b|\boct\b/gi, 'Oct')
        .replace(/\bnovember\b|\bnov\b/gi, 'Nov')
        .replace(/\bdecember\b|\bdec\b/gi, 'Dec')
        .trim();

      // "Aug - 2010" அல்லது "2010 Aug" என வந்தால் "Aug 2010" ஆக்குதல்
      clean = clean.replace(/([a-zA-Z]+)\s*-\s*(\d{4})/, '$1 $2');
      const yearMonthMatch = clean.match(/^(\d{4})\s*([a-zA-Z]+)(.*)$/);
      if (yearMonthMatch) {
        clean = `${titleCase(yearMonthMatch[2])} ${yearMonthMatch[1]}${yearMonthMatch[3]}`;
      }

      if (!clean.includes('-') && !clean.includes('–')) {
        clean = `${clean} – Present`;
      }
      return clean.replace(/\s*-\s*/, ' – ');
    };

    // 7. யுனிவர்சல் திறன்கள் (Skills) - எந்தத் துறை திறன்களையும் அழகிய பேட்ஜ்களாக மாற்றுதல்
    let rawSkills = commonTypoFixer(resumeData.skills) || '';
    let skillTokens = rawSkills.includes(',') ? rawSkills.split(',') : rawSkills.split(/\s+/);
    let finalSkills = [];

    for (let i = 0; i < skillTokens.length; i++) {
      let t = skillTokens[i].trim();
      if (!t) continue;
      let lower = t.toLowerCase();
      let nextLower = skillTokens[i + 1] ? skillTokens[i + 1].trim().toLowerCase() : '';

      if (lower === 'power' && nextLower === 'bi') {
        finalSkills.push('Power BI');
        i++;
      } else if (lower.includes('excel')) {
        finalSkills.push('Advanced Excel');
      } else if (lower === 'team' && nextLower.startsWith('lead')) {
        finalSkills.push('Team Leadership');
        i++;
      } else if (['sql', 'aws', 'gcp', 'mis', 'sap', 'hrms', 'tally', 'seo', 'crm'].includes(lower)) {
        finalSkills.push(t.toUpperCase());
      } else if (t.length > 1) {
        finalSkills.push(titleCase(t));
      }
    }

    // கல்வி திருத்தங்கள்
    const fixEduDegree = (deg) => {
      if (!deg) return '';
      let clean = titleCase(commonTypoFixer(deg));
      clean = clean
        .replace(/\bmba\b/gi, 'MBA')
        .replace(/\bmca\b/gi, 'MCA')
        .replace(/\bbba\b/gi, 'BBA')
        .replace(/\bmsc\b|\bm\.sc\b/gi, 'M.Sc')
        .replace(/\bbsc\b|\bb\.sc\b/gi, 'B.Sc')
        .replace(/\bbe\b|\bb\.e\b/gi, 'B.E')
        .replace(/\bbtech\b|\bb\.tech\b/gi, 'B.Tech');
      return clean;
    };

    const fixEduYear = (yr) => {
      if (!yr) return '';
      let clean = yr.replace(/april/gi, 'Apr').replace(/august/gi, 'Aug').trim();
      const match = clean.match(/^(\d{4})\s*([a-zA-Z]+)$/);
      if (match) {
        return `${titleCase(match[2])} ${match[1]}`;
      }
      return titleCase(clean);
    };

    // மொழிகள் திருத்தி
    const fixLanguages = (langStr) => {
      if (!langStr) return '';
      return commonTypoFixer(langStr)
        .split(',')
        .map((l) => titleCase(l))
        .filter(Boolean)
        .join(', ');
    };

    setResumeData((prev) => ({
      ...prev,
      fullName: titleCase(prev.fullName),
      jobTitle: titleCase(job),
      location: titleCase(prev.location),
      summary: polishedSummary,
      skills: Array.from(new Set(finalSkills)).join(', '),
      achievements: polishUniversalAchievements(prev.achievements),
      certifications: polishUniversalCerts(prev.certifications),
      languages: fixLanguages(prev.languages),
      experience: prev.experience.map((exp) => ({
        ...exp,
        role: titleCase(commonTypoFixer(exp.role)),
        company: titleCase(exp.company),
        period: fixPeriod(exp.period),
        desc: polishUniversalBullets(exp.desc)
      })),
      education: prev.education.map((edu) => ({
        ...edu,
        degree: fixEduDegree(edu.degree),
        institution: titleCase(edu.institution),
        year: fixEduYear(edu.year)
      }))
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-16 print:bg-white print:p-0 print:m-0">
      <Head>
        <title>Universal Fortune-500 ATS Resume Studio | நம்ம பூமி 360</title>
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page {
              size: A4 portrait;
              margin: 8mm 12mm 8mm 12mm;
            }
            body {
              background: #ffffff !important;
              color: #000000 !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .print\\:hidden {
              display: none !important;
            }
            #resume-sheet {
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              min-height: auto !important;
            }
          }
        `}} />
      </Head>

      <header className="border-b border-slate-800 bg-slate-950/80 sticky top-0 z-50 backdrop-blur px-4 py-3 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded text-sm">நம்ம பூமி 360</span>
            <span className="text-sm font-semibold text-emerald-400">Universal Harvard ATS Studio</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md transition flex items-center gap-1.5"
            >
              🖨️ PDF ஆக பதிவிறக்குக (Harvard ATS PDF)
            </button>
            {/* Template Switcher */}
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate('harvard')}
                  className={`px-2.5 py-1 text-xs rounded transition-all ${
                    selectedTemplate === 'harvard'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Harvard
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate('modern')}
                  className={`px-2.5 py-1 text-xs rounded transition-all ${
                    selectedTemplate === 'modern'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Modern
                </button>
              </div>

              {/* Reset Form Button */}
              <button
                type="button"
                onClick={handleResetForm}
                className="px-2.5 py-1 text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-all"
              >
                Reset
              </button>
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
              ← முகப்பு
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 mt-6 print:m-0 print:p-0 print:max-w-none">
        <div className="text-center mb-6 print:hidden">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">உலகத்தரம் வாய்ந்த Fortune-500 ATS ரெஸ்யூம் பில்டர்</h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            எந்தத் துறையைச் சேர்ந்தவராக இருந்தாலும் (IT, Finance, Sales, HR, Engineering, Admin), உங்கள் தகவல்கள் தானாகவே சர்வதேச தரத்திலான ஒற்றைப் பக்க ரெஸ்யூமாக மாறும்.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start print:block">
          {/* உள்ளீட்டு படிவம் */}
          <div className="lg:col-span-5 bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 shadow-lg print:hidden space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <h2 className="text-sm font-semibold text-emerald-400">1. தனிநபர் விவரங்கள்</h2>
              <button
                type="button"
                onClick={handleCompleteWorldClassPolish}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition shadow flex items-center gap-1"
              >
                ✨ முழு உலகத் தரமாக மாற்று (Transform All)
              </button>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">முழுப் பெயர் *</label>
              <input
                type="text"
                name="fullName"
                placeholder="எ.கா: சு. உதயகுமார்"
                value={resumeData.fullName}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">பணிப் பதவி (Target Job Title) *</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="எ.கா: Branch Manager / Software Engineer"
                value={resumeData.jobTitle}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">மின்னஞ்சல் *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@email.com"
                  value={resumeData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">கைபேசி எண் *</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="கைபேசி எண்"
                  value={resumeData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">இருப்பிடம் (City / State)</label>
              <input
                type="text"
                name="location"
                placeholder="எ.கா: சென்னை, தமிழ்நாடு"
                value={resumeData.location}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">சுயவிவரக் குறிப்பு (Executive Summary)</label>
              <textarea
                name="summary"
                rows={3}
                placeholder="எந்த மொழியிலும் உள்ளிடலாம் (எ.கா: 16 years experience in management / 5 varudam IT anupavam...)"
                value={resumeData.summary}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Experience Section */}
            <div className="pt-2 border-t border-slate-700">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold text-emerald-400">2. பணி அனுபவம்</h2>
                {resumeData.experience.length < 4 && (
                  <button
                    type="button"
                    onClick={addExperience}
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-emerald-300 px-2 py-0.5 rounded transition"
                  >
                    + அனுபவம் சேர்
                  </button>
                )}
              </div>

              {resumeData.experience.map((exp, idx) => (
                <div key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/80 mb-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-400">பணி #{idx + 1}</span>
                    {resumeData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(idx)}
                        className="text-rose-400 hover:text-rose-300 text-xs"
                      >
                        நீக்கு
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="பதவி (Designation)"
                    value={exp.role}
                    onChange={(e) => handleExpChange(idx, 'role', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="நிறுவனப் பெயர்"
                      value={exp.company}
                      onChange={(e) => handleExpChange(idx, 'company', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="காலம் (எ.கா: Aug 2015 – Present)"
                      value={exp.period}
                      onChange={(e) => handleExpChange(idx, 'period', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="பொறுப்புகள் (எந்த வரிசையிலும் உள்ளிடலாம்):&#10;sales development&#10;team leadership&#10;customer service&#10;data analytics mis"
                    value={exp.desc}
                    onChange={(e) => handleExpChange(idx, 'desc', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div className="pt-2 border-t border-slate-700">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold text-emerald-400">3. கல்வித் தகுதி</h2>
                <button
                  type="button"
                  onClick={addEducation}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-emerald-300 px-2 py-0.5 rounded transition"
                >
                  + கல்வி சேர்
                </button>
              </div>

              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/80 mb-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-400">கல்வி #{idx + 1}</span>
                    {resumeData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(idx)}
                        className="text-rose-400 hover:text-rose-300 text-xs"
                      >
                        நீக்கு
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="படிப்பு / பட்டம் (எ.கா: B.E Computer Science / B.Sc / MBA)"
                    value={edu.degree}
                    onChange={(e) => handleEduChange(idx, 'degree', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="கல்லூரி / பல்கலைக்கழகம்"
                      value={edu.institution}
                      onChange={(e) => handleEduChange(idx, 'institution', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="ஆண்டு (எ.கா: May 2018)"
                      value={edu.year}
                      onChange={(e) => handleEduChange(idx, 'year', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="pt-2 border-t border-slate-700">
              <label className="block text-xs text-slate-300 mb-1">4. முக்கிய திறன்கள் (Skills)</label>
              <input
                type="text"
                name="skills"
                placeholder="எ.கா: Python, SQL, Excel, Management, Communication"
                value={resumeData.skills}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* விருப்பப் பிரிவுகள் */}
            <div className="pt-3 border-t border-slate-700 space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">கூடுதல் விருப்பப் பிரிவுகள்:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setShowAchievements(!showAchievements)}
                  className={`text-xs px-2.5 py-1 rounded transition ${showAchievements ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                >
                  {showAchievements ? '✓ சாதனைகள் நீக்கு' : '+ முக்கிய சாதனைகள் (Achievements)'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCertifications(!showCertifications)}
                  className={`text-xs px-2.5 py-1 rounded transition ${showCertifications ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                >
                  {showCertifications ? '✓ சான்றிதழ்கள் நீக்கு' : '+ சான்றிதழ்கள் (Certifications)'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowLanguages(!showLanguages)}
                  className={`text-xs px-2.5 py-1 rounded transition ${showLanguages ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                >
                  {showLanguages ? '✓ மொழிகள் நீக்கு' : '+ மொழிகள் (Languages)'}
                </button>
              </div>

              {showAchievements && (
                <div className="mt-2">
                  <label className="block text-xs text-emerald-400 mb-1">முக்கிய சாதனைகள்:</label>
                  <textarea
                    name="achievements"
                    rows={2}
                    placeholder="sales growth 10 cr&#10;99% customer rating&#10;digital process adoption"
                    value={resumeData.achievements}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              )}

              {showCertifications && (
                <div className="mt-2">
                  <label className="block text-xs text-emerald-400 mb-1">சான்றிதழ்கள்:</label>
                  <textarea
                    name="certifications"
                    rows={2}
                    placeholder="Cloud certification google, data analytics iit madras"
                    value={resumeData.certifications}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              )}

              {showLanguages && (
                <div className="mt-2">
                  <label className="block text-xs text-emerald-400 mb-1">தெரிந்த மொழிகள்:</label>
                  <input
                    type="text"
                    name="languages"
                    placeholder="Tamil, English"
                    value={resumeData.languages}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              )}
            </div>

          </div>

          {/* பிரீவியூ தாள் (1-Page Harvard ATS Output) */}
          <div className="lg:col-span-7 print:w-full print:m-0 print:p-0">
            <div
              id="resume-sheet"
              className={`bg-white text-slate-900 rounded-xl shadow-2xl p-7 sm:p-9 border border-slate-200 transition-all ${
  selectedTemplate === 'harvard' ? 'font-serif' : 'font-sans'
}`}
            >
              
              {/* Header */}
              {(resumeData.fullName || resumeData.jobTitle) && (
                <div className={`pb-2 mb-3.5 transition-all ${
  selectedTemplate === 'harvard'
    ? 'border-b-2 border-slate-900 text-center'
    : 'border-b-4 border-emerald-600 text-left'
}`}>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide text-slate-900 uppercase">
                    {resumeData.fullName}
                  </h1>
                  <p className="text-[11px] font-bold text-emerald-800 tracking-widest uppercase mt-0.5">
                    {resumeData.jobTitle}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-x-2 text-[11px] text-slate-600 mt-1 font-medium">
                    {resumeData.phone && <span>📱 {resumeData.phone}</span>}
                    {resumeData.phone && resumeData.email && <span className="text-slate-300">|</span>}
                    {resumeData.email && <span>✉️ {resumeData.email}</span>}
                    {(resumeData.phone || resumeData.email) && resumeData.location && <span className="text-slate-300">|</span>}
                    {resumeData.location && <span>📍 {resumeData.location}</span>}
                  </div>
                </div>
              )}

              {/* Executive Summary */}
              {resumeData.summary && (
                <div className="mb-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Executive Summary
                  </h2>
                  <p className="text-[10.5px] text-slate-800 leading-relaxed text-justify font-normal">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* Key Achievements */}
              {showAchievements && resumeData.achievements && (
                <div className="mb-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Key Career Milestones & Achievements
                  </h2>
                  <div className="text-[10.5px] text-slate-800 leading-relaxed space-y-1 pl-1">
                    {resumeData.achievements.split('\n').map((bullet, idx) => (
                      bullet.trim() && <p key={idx}>{bullet.trim()}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Experience */}
              {resumeData.experience.some((e) => e.role || e.company) && (
                <div className="mb-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                    Professional Experience
                  </h2>
                  <div className="space-y-2.5">
                    {resumeData.experience.map(
                      (exp, idx) =>
                        (exp.role || exp.company) && (
                          <div key={idx}>
                            <div className="flex justify-between items-baseline mb-0.5">
                              <span className="text-[11px] font-bold text-slate-900">{exp.role}</span>
                              <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">{exp.period}</span>
                            </div>
                            {exp.company && (
                              <div className="text-[10.5px] font-semibold text-emerald-800 italic mb-0.5">
                                {exp.company}
                              </div>
                            )}
                            {exp.desc && (
                              <div className="text-[10px] text-slate-800 leading-relaxed space-y-0.5 pl-1">
                                {exp.desc.split('\n').map((bullet, bIdx) => (
                                  bullet.trim() && <p key={bIdx}>{bullet.trim()}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education.some((e) => e.degree || e.institution) && (
                <div className="mb-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Education & Credentials
                  </h2>
                  <div className="space-y-1">
                    {resumeData.education.map(
                      (edu, idx) =>
                        (edu.degree || edu.institution) && (
                          <div key={idx} className="flex justify-between items-baseline">
                            <div>
                              <div className="text-[10.5px] font-bold text-slate-900">{edu.degree}</div>
                              <div className="text-[10px] text-slate-600 italic">{edu.institution}</div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">{edu.year}</span>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}

              {/* Core Skills */}
              {resumeData.skills && (
                <div className="mb-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                    Core Competencies & Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills
                      .split(',')
                      .filter((s) => s.trim())
                      .map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-300 shadow-sm"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {showCertifications && resumeData.certifications && (
                <div className="mb-2.5">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Professional Certifications
                  </h2>
                  <div className="text-[10px] text-slate-800 leading-relaxed space-y-0.5 pl-1">
                    {resumeData.certifications.split('\n').map((bullet, idx) => (
                      bullet.trim() && <p key={idx}>{bullet.trim()}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {showLanguages && resumeData.languages && (
                <div>
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-0.5">
                    Languages
                  </h2>
                  <p className="text-[10.5px] text-slate-800 font-medium">
                    {resumeData.languages}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}