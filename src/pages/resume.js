import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// வார்த்தைகளின் முதல் எழுத்தை Capital எழுத்தாக மாற்ற (Title Case)
const toTitleCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// வாக்கியத்தின் முதல் எழுத்தை Capital ஆக்கி, இறுதியில் புள்ளி வைக்க (Sentence Case)
const formatSentence = (str) => {
  if (!str) return '';
  const trimmed = str.trim();
  const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return capitalized.endsWith('.') ? capitalized : capitalized + '.';
};

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
    projects: [{ title: '', role: '', techStack: '', desc: '' }],
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

  const handleProjectChange = (index, field, value) => {
    const updated = [...resumeData.projects];
    updated[index][field] = value;
    setResumeData({ ...resumeData, projects: updated });
  };

  const addProject = () => {
    const currentProjects = resumeData.projects || [];
    if (currentProjects.length < 3) {
      setResumeData({
        ...resumeData,
        projects: [...currentProjects, { title: '', role: '', techStack: '', desc: '' }]
      });
    }
  };

  const removeProject = (index) => {
    const currentProjects = resumeData.projects || [];
    setResumeData({
      ...resumeData,
      projects: currentProjects.filter((_, i) => i !== index)
    });
  };

  // ==========================================
  // யுனிவர்சல் பொதுவான ATS டிரான்ஸ்பார்மேஷன் என்ஜின்
  // ==========================================
  const handleCompleteWorldClassPolish = () => {
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

    // =========================================================================
    // 100% துல்லியமான யுனிவர்சல் செமாண்டிக் புல்லட் என்ஜின் (Universal Intent Engine)
    // ஒற்றைச் சொல் அல்லது உடைந்த வாக்கியம் எதுவாக இருந்தாலும் Fortune-500 தரத்திற்கு மாற்றும்
    // =========================================================================
    const polishUniversalBullets = (desc) => {
      if (!desc) return '';
      const lines = desc
        .split('\n')
        .map((l) => l.replace(/^[•\-\*]\s*/, '').trim())
        .filter(Boolean);

      // தொழில் துறை மற்றும் முக்கியக் குறிச்சொற்களுக்கான முழுமையான அகராதி
      const masterDictionary = [
        // 1. போக்குவரத்து, ஓட்டுநர், வாகனக் கட்டுப்பாடு (Transport, Driver, Fleet)
        {
          keys: /(time|timing|punctual|delay|on-time|keep\s*up|நேரம்)/i,
          action: 'Championed strict turnaround and dispatch protocols, sustaining a 99.4% on-time departure and arrival benchmark across all assigned routes.'
        },
        {
          keys: /(driv|drivng|driver|pilot|chauffeur|vehicle|van|bus|lorry|truck|auto|cab|trip|route|speed|வண்டி|ஓட்டுநர்)/i,
          action: 'Executed seamless vehicle transit and route navigation protocols, maintaining an exemplary record of zero traffic violations and zero-incident transit safety.'
        },
        {
          keys: /(maintain|service|repair|breakdown|mechanic|diesel|petrol|fuel|mileage|fitness|fc|oil|பழுது|பராமரிப்பு)/i,
          action: 'Conducted rigorous preventive maintenance inspections and fuel-efficiency audits, curtailing equipment downtime and operational wear-and-tear by over 30%.'
        },
        {
          keys: /(fleet|transport|logistics|dispatch|cargo|load|goods|shipment|delivery|ஏற்றுமதி)/i,
          action: 'Orchestrated end-to-end fleet logistics, scheduling, and driver allocations, ensuring 100% regulatory compliance with transport authority standards.'
        },

        // 2. அலுவலக மேலாண்மை, அட்மின், எழுத்தர் (Admin, Clerk, Typing, Office)
        {
          keys: /(typing|data\s*entry|entry|clerk|admin|reception|filing|xerox|office|paper|அலுவலகம்)/i,
          action: 'Supervised routine administrative workflows, confidential records management, and high-speed data processing with 100% procedural accuracy.'
        },
        {
          keys: /(attendance|shift|leave|schedule|payroll|salary|பணியாளர்)/i,
          action: 'Administered employee attendance logs, roster scheduling, and workforce operational compliance, ensuring seamless day-to-day office workflow.'
        },

        // 3. பில்லிங், கேஷியர், சில்லறை வர்த்தகம், ஸ்டோர் (Retail, Billing, Cashier, Store)
        {
          keys: /(bill|billing|cashier|counter|pos|slip|பில்)/i,
          action: 'Managed high-volume cash and digital point-of-sale (POS) billing cycles, ensuring precise ledger balance and zero end-of-day cash discrepancies.'
        },
        {
          keys: /(store|stock|inventory|godown|warehouse|shelf|rack|பொருட்கள்|கிடங்கு)/i,
          action: 'Monitored real-time inventory counts and store replenishment schedules, preventing stock-outs and reducing inventory holding shrinkage.'
        },

        // 4. விற்பனை, வணிக வளர்ச்சி, மார்க்கெட்டிங் (Sales, Marketing, Growth)
        {
          keys: /(sales|sell|target|market|growth|revenue|client|customer|enquiry|booking|lead|விற்பனை)/i,
          action: 'Spearheaded strategic customer outreach and pipeline development, consistently surpassing quarterly targets and driving business revenue growth.'
        },

        // 5. வாடிக்கையாளர் சேவை, அழைப்புகள் (Customer Support, BPO, Calls)
        {
          keys: /(call|calling|phone|support|help|service|complaint|telecaller|bpo|chat|feedback)/i,
          action: 'Delivered professional first-contact issue resolution, exceeding customer satisfaction (CSAT) benchmarks and reducing turnaround resolution times.'
        },

        // 6. நிதி, கணக்கு, வங்கி, கடன், வசூல் (Accounts, Finance, Banking, Loan)
        {
          keys: /(account|tally|gst|tax|audit|ledger|voucher|balance|கணக்கு)/i,
          action: 'Maintained exhaustive corporate general ledgers, tax filings, and bank reconciliations in strict alignment with statutory accounting standards.'
        },
        {
          keys: /(loan|disbur|credit|sanction|kadan|finance|banking|fund|கடன்)/i,
          action: 'Administered disciplined credit appraisal evaluations and risk-mitigated disbursement workflows, maintaining impeccable portfolio quality.'
        },
        {
          keys: /(recovery|recov|collect|vasool|overdue|npa|arrear|debt|வசூல்)/i,
          action: 'Devised proactive risk monitoring and field recovery initiatives, sustaining high collection efficiencies and restricting overdue accounts.'
        },

        // 7. தொழில்நுட்பம், கோடிங், சாப்ட்வேர், டேட்டா (Tech, IT, Software, Data)
        {
          keys: /(code|program|develop|software|build|frontend|backend|api|app|web|database|bug|java|python|react|node)/i,
          action: 'Architected and implemented scalable, secure software solutions, driving system resilience, optimized response speeds, and clean code principles.'
        },
        {
          keys: /(report|mis|data|dashboard|excel|analytics|power\s*bi|chart|sql)/i,
          action: 'Transformed complex operational data into automated executive dashboards and KPI metrics, powering data-driven operational decision making.'
        },

        // 8. எலக்ட்ரீசியன், தொழினுட்பம், பாதுகாப்பு, தொழிற்சாலை (Electrician, Technical, Safety)
        {
          keys: /(electric|wiring|power|panel|current|generator|machine|wire|லைட்)/i,
          action: 'Executed preventive electrical maintenance, diagnostic troubleshooting, and plant power installations with stringent compliance to safety norms.'
        },
        {
          keys: /(safe|safety|accident|quality|qa|qc|iso|security|guard|பாதுகாப்பு)/i,
          action: 'Enforced rigorous zero-harm safety standards and quality inspection audits, ensuring complete statutory adherence and workplace security.'
        },

        // 9. மேற்பார்வை, மனிதவளம், தலைமை (Team Leader, Supervisor, HR)
        {
          keys: /(team|lead|supervis|manage|staff|crew|people|hire|recruit|hr|தலைமை)/i,
          action: 'Directed, coached, and inspired cross-functional personnel, instilling strong accountability, operational excellence, and team cohesion.'
        },
        {
          keys: /(train|training|teach|coach|guide|பயிற்சி)/i,
          action: 'Structured and led intensive onboarding and technical training sessions, directly boosting frontline workforce operational productivity.'
        }
      ];

      const converted = lines.map((line) => {
        // கொடுக்கப்பட்ட வரியில் அகராதியின் ஏதேனும் முக்கிய சொல் உள்ளதா எனப் பார்த்தல்
        const matched = masterDictionary.find((item) => item.keys.test(line));
        if (matched) {
          return `• ${matched.action}`;
        }

        // அகராதியில் முற்றிலும் இல்லாத புதிய சொல்லாக இருந்தால் - கிராமர் தவறுகளைத் தானாகச் சரிசெய்து தரமான வாக்கியமாக்குதல்:
        let clean = line.replace(/^[•\-\*]\s*/, '').replace(/[.]+$/, '').trim();
        clean = clean.charAt(0).toUpperCase() + clean.slice(1);

        if (clean.split(/\s+/).length <= 2) {
          return `• Successfully spearheaded end-to-end ${clean.toLowerCase()} workflows, achieving targeted organizational goals.`;
        }
        return `• Proactively managed and executed ${clean.toLowerCase()}, ensuring high-impact delivery aligned with corporate standards.`;
      });

      // ஒரே புல்லட் திரும்ப வராமல் தனித்துவமாக அடுக்குதல்
      return Array.from(new Set(converted)).join('\n');
    };

    const polishUniversalAchievements = (text) => {
      if (!text) return '';
      const lines = text
        .split('\n')
        .map((l) => commonTypoFixer(l.replace(/^[•\-\*]\s*/, '').trim()))
        .filter(Boolean);

      let usedCategories = new Set();

      const converted = lines.map((line) => {
        const l = line.toLowerCase();

        if ((l.includes('cr') || l.includes('crore') || l.includes('lakh') || l.includes('million') || l.includes('disbur') || l.includes('sales')) && !usedCategories.has('volume')) {
          const numMatch = l.match(/(\d+[\.\d]*)\s*(cr|crore|lakh|million|m)?/i);
          const val = numMatch ? `₹${numMatch[1]}+ Crores` : 'multi-million volume';
          usedCategories.add('volume');
          return `Spearheaded high-volume operational portfolio, achieving ${val} in annual throughput with exemplary execution discipline.`;
        }

        if ((l.match(/(9\d|100)\s*(%|percent)/) || l.includes('recovery') || l.includes('sla')) && !usedCategories.has('high_percent')) {
          const numMatch = l.match(/(\d+[\.\d]*)\s*(%|percent)?/i);
          const val = numMatch && numMatch[1] ? `${numMatch[1]}%` : '99%+';
          usedCategories.add('high_percent');
          return `Sustained an industry-benchmark ${val}+ efficiency and compliance rating across challenging business cycles through disciplined monitoring.`;
        }

        if ((l.includes('%') || l.includes('percent') || l.includes('growth') || l.includes('target')) && !usedCategories.has('growth')) {
          const numMatch = l.match(/(\d+[\.\d]*)\s*(%|percent)?/i);
          const val = numMatch && numMatch[1] ? `${numMatch[1]}%` : '75%+';
          usedCategories.add('growth');
          return `Accelerated core operational metrics and regional penetration by ${val}, consistently outperforming organizational quarterly benchmarks.`;
        }

        if ((l.includes('digital') || l.includes('tech') || l.includes('automati') || l.includes('cashless') || l.includes('online')) && !usedCategories.has('digital')) {
          usedCategories.add('digital');
          return `Pioneered digital transformation initiatives, driving seamless digital tool adoption and modern workflow automation across diverse teams.`;
        }

        let clean = line.replace(/[.]+$/, '');
        clean = clean.charAt(0).toUpperCase() + clean.slice(1);
        return `Recognized for outstanding contributions in ${clean.toLowerCase()}, delivering measurable organizational impact.`;
      });

      return Array.from(new Set(converted)).join('\n');
    };

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
          return clean;
        })
        .join('\n');
    };

    let job = commonTypoFixer(resumeData.jobTitle) || 'Business Operations Professional';
    let rawSummary = resumeData.summary || '';
    
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
        .replace(/\bbtech\b|\bb\.tech\b/gi, 'B.Tech')
        .replace(/\bba\b|\bb\.a\b/gi, 'B.A');
      return clean;
    };

    const fixEduYear = (yr) => {
      if (!yr) return '';
      let clean = yr.replace(/april/gi, 'Apr').replace(/august/gi, 'Aug').replace(/\bto\b/gi, '–').trim();
      const match = clean.match(/^(\d{4})\s*([a-zA-Z]+)$/);
      if (match) {
        return `${titleCase(match[2])} ${match[1]}`;
      }
      return titleCase(clean);
    };

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
              margin: 10mm 12mm 10mm 12mm;
            }
            body {
              background: #ffffff !important;
              color: #000000 !important;
              padding: 0 !important;
              margin: 0 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
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
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-2 sm:px-0">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded text-sm shadow-sm">நம்ம பூமி 360</span>
            <span className="text-sm font-semibold text-emerald-400">Universal Harvard ATS Studio</span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md transition flex items-center gap-1.5"
            >
              🖨️ PDF ஆக பதிவிறக்குக (Harvard ATS PDF)
            </button>
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setSelectedTemplate('harvard')}
                className={`px-2.5 py-1 text-xs rounded transition-all ${
                  selectedTemplate === 'harvard'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
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
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Modern
              </button>
            </div>

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
                placeholder="எ.கா: Transport Manager / Software Engineer"
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
                    placeholder="பொறுப்புகள் (எந்த வரிசையிலும் உள்ளிடலாம்):&#10;sales development&#10;team leadership&#10;fleet maintenance"
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
                    placeholder="படிப்பு / பட்டம் (எ.கா: B.E Computer Science / B.Sc / MBA / B.A)"
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
                      placeholder="ஆண்டு (எ.கா: 2017 – 2020)"
                      value={edu.year}
                      onChange={(e) => handleEduChange(idx, 'year', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Projects / திட்டங்கள் */}
            <div className="mt-4 pt-4 border-t border-slate-700/60">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  திட்டங்கள் (Key Projects)
                </label>
                <button
                  type="button"
                  onClick={addProject}
                  className="text-xs bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/50 px-2.5 py-1 rounded transition-colors"
                >
                  + திட்டம் சேர்க்க
                </button>
              </div>

              <div className="space-y-4">
                {resumeData.projects && resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-700/80 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-400">திட்டம் #{idx + 1}</span>
                      {resumeData.projects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProject(idx)}
                          className="text-rose-400 hover:text-rose-300 text-xs transition-colors"
                        >
                          நீக்கு
                        </button>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="திட்டப் பெயர் (எ.கா: நம்ம பூமி 360 போர்ட்டல்)"
                        value={proj.title}
                        onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="பங்கு (எ.கா: Lead Developer / Manager)"
                        value={proj.role}
                        onChange={(e) => handleProjectChange(idx, 'role', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        placeholder="தொழில்நுட்பங்கள் (எ.கா: React, SQL, Power BI)"
                        value={proj.techStack}
                        onChange={(e) => handleProjectChange(idx, 'techStack', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="திட்டத்தின் சிறப்பம்சங்கள் / முக்கிய சாதனைகள்"
                        value={proj.desc}
                        rows={2}
                        onChange={(e) => handleProjectChange(idx, 'desc', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="pt-2 border-t border-slate-700">
              <label className="block text-xs text-slate-300 mb-1">4. முக்கிய திறன்கள் (Skills)</label>
              <input
                type="text"
                name="skills"
                placeholder="எ.கா: Power BI, Advanced Excel, Team Leadership, Fleet Management"
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
                    placeholder="sales growth 10 cr&#10;99% customer rating&#10;fleet optimization"
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
                    placeholder="Power BI Certificate, Supply Chain Management"
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
              className={`bg-white text-slate-950 rounded-xl shadow-2xl p-8 sm:p-10 border border-slate-300 transition-all leading-normal ${
                selectedTemplate === 'harvard' ? 'font-serif' : 'font-sans'
              }`}
            >
              
              {/* Header */}
              {(resumeData.fullName || resumeData.jobTitle) && (
                <div className={`pb-2.5 mb-4 transition-all ${
                  selectedTemplate === 'harvard'
                    ? 'border-b-2 border-slate-950 text-center'
                    : 'border-b-4 border-emerald-600 text-left'
                }`}>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-slate-950 uppercase">
                    {resumeData.fullName || 'YOUR NAME'}
                  </h1>
                  <p className="text-[12px] font-bold text-slate-800 tracking-wider uppercase mt-1">
                    {resumeData.jobTitle || 'TARGET DESIGNATION'}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-x-3 text-[11px] text-slate-700 mt-2 font-medium">
                    {resumeData.phone && <span>{resumeData.phone}</span>}
                    {resumeData.phone && resumeData.email && <span className="text-slate-400 font-bold">•</span>}
                    {resumeData.email && <span>{resumeData.email}</span>}
                    {(resumeData.phone || resumeData.email) && resumeData.location && <span className="text-slate-400 font-bold">•</span>}
                    {resumeData.location && <span>{resumeData.location}</span>}
                  </div>
                </div>
              )}

              {/* Executive Summary */}
              {resumeData.summary && (
                <div className="mb-4">
                  <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-0.5 mb-1.5">
                    Executive Summary
                  </h2>
                  <p className="text-[11px] text-slate-900 leading-relaxed text-justify font-normal">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* Key Achievements */}
              {showAchievements && resumeData.achievements && (
                <div className="mb-4">
                  <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-0.5 mb-1.5">
                    Key Career Milestones & Achievements
                  </h2>
                  <ul className="text-[10.5px] text-slate-900 leading-relaxed list-disc list-outside pl-4 space-y-1">
                    {resumeData.achievements.split('\n').map((bullet, idx) => (
                      bullet.trim() && <li key={idx}>{bullet.replace(/^[•\-\*]\s*/, '').trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Work Experience */}
              {resumeData.experience.some((e) => e.role || e.company) && (
                <div className="mb-4">
                  <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-0.5 mb-2">
                    Professional Experience
                  </h2>
                  <div className="space-y-3">
                    {resumeData.experience.map(
                      (exp, idx) =>
                        (exp.role || exp.company) && (
                          <div key={idx}>
                            <div className="flex justify-between items-baseline mb-0.5">
                              <span className="text-[12px] font-bold text-slate-950">{exp.role}</span>
                              <span className="text-[10.5px] font-bold text-slate-900">{exp.period}</span>
                            </div>
                            {exp.company && (
                              <div className="text-[11px] font-semibold text-slate-800 italic mb-1">
                                {exp.company}
                              </div>
                            )}
                            {exp.desc && (
                              <ul className="text-[10.5px] text-slate-900 leading-relaxed list-disc list-outside pl-4 space-y-1">
                                {exp.desc.split('\n').map((bullet, bIdx) => (
                                  bullet.trim() && <li key={bIdx}>{bullet.replace(/^[•\-\*]\s*/, '').trim()}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education.some((e) => e.degree || e.institution) && (
                <div className="mb-4">
                  <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-0.5 mb-1.5">
                    Education & Credentials
                  </h2>
                  <div className="space-y-1.5">
                    {resumeData.education.map(
                      (edu, idx) =>
                        (edu.degree || edu.institution) && (
                          <div key={idx} className="flex justify-between items-baseline">
                            <div>
                              <span className="text-[11px] font-bold text-slate-950">{edu.degree}</span>
                              {edu.institution && (
                                <span className="text-[10.5px] text-slate-800 italic"> — {edu.institution}</span>
                              )}
                            </div>
                            <span className="text-[10.5px] font-bold text-slate-900">{edu.year}</span>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}

              {/* Projects */}
              {resumeData.projects && resumeData.projects.some(p => p.title && p.title.trim() !== '') && (
                <div className="mb-4">
                  <h2 className={`text-[11.5px] font-bold uppercase tracking-wider text-slate-950 border-b pb-0.5 mb-1.5 ${
                    selectedTemplate === 'harvard' ? 'border-slate-950' : 'border-emerald-600 text-emerald-800'
                  }`}>
                    Key Projects
                  </h2>
                  <div className="space-y-2">
                    {resumeData.projects.map((proj, idx) => {
                      if (!proj.title || !proj.title.trim()) return null;
                      return (
                        <div key={idx} className="text-slate-900">
                          <div className="flex justify-between items-baseline">
                            <span className="text-[11px] font-bold text-slate-950">
                              {toTitleCase(proj.title)}
                              {proj.role && <span className="font-semibold text-slate-800"> | {toTitleCase(proj.role)}</span>}
                            </span>
                            {proj.techStack && (
                              <span className="text-[10.5px] font-semibold text-slate-800">
                                {toTitleCase(proj.techStack)}
                              </span>
                            )}
                          </div>
                          {proj.desc && (
                            <p className="text-[10.5px] text-slate-800 leading-relaxed mt-0.5">
                              {formatSentence(proj.desc)}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Core Skills */}
              {resumeData.skills && (
                <div className="mb-3.5">
                  <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-0.5 mb-1.5">
                    Core Competencies & Technical Skills
                  </h2>
                  {selectedTemplate === 'harvard' ? (
                    <p className="text-[10.5px] text-slate-900 leading-relaxed font-medium">
                      {resumeData.skills.split(',').map(s => s.trim()).filter(Boolean).join('  •  ')}
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {resumeData.skills
                        .split(',')
                        .filter((s) => s.trim())
                        .map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded border border-slate-300 shadow-sm"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* Certifications */}
              {showCertifications && resumeData.certifications && (
                <div className="mb-3">
                  <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-0.5 mb-1.5">
                    Professional Certifications
                  </h2>
                  <ul className="text-[10.5px] text-slate-900 leading-relaxed list-disc list-outside pl-4 space-y-0.5">
                    {resumeData.certifications.split('\n').map((bullet, idx) => (
                      bullet.trim() && <li key={idx}>{bullet.replace(/^[•\-\*]\s*/, '').trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {showLanguages && resumeData.languages && (
                <div>
                  <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-0.5 mb-1">
                    Languages
                  </h2>
                  <p className="text-[10.5px] text-slate-900 font-medium">
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