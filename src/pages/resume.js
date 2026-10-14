import React, { useState } from 'react';
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
    experience: [{ role: '', company: '', period: '', desc: '' }],
    education: [{ degree: '', institution: '', year: '' }]
  });

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleExpChange = (index, field, value) => {
    const updated = [...resumeData.experience];
    updated[index][field] = value;
    setResumeData({ ...resumeData, experience: updated });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { role: '', company: '', period: '', desc: '' }]
    });
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

  // பயனர் உள்ளிட்டதை மட்டும் பிழை திருத்தி ஒழுங்குபடுத்தும் தூய லாஜிக் (No default fake values)
  const handleCleanFormat = () => {
    const cleanWord = (str) => {
      if (!str) return '';
      return str
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
    };

    let cleanedSummary = resumeData.summary || '';
    const replacements = {
      'micro finance': 'Microfinance',
      'microfinabce': 'Microfinance',
      'postive maind': 'Positive Mindset',
      'panipurinthu varugiren': 'Working diligently',
      'aaga': 'as',
      'vil': 'in'
    };

    Object.keys(replacements).forEach((word) => {
      const regex = new RegExp(word, 'gi');
      cleanedSummary = cleanedSummary.replace(regex, replacements[word]);
    });

    setResumeData((prev) => ({
      ...prev,
      fullName: cleanWord(prev.fullName),
      jobTitle: cleanWord(prev.jobTitle),
      location: cleanWord(prev.location),
      summary: cleanedSummary.trim(),
      skills: prev.skills
        ? prev.skills
            .split(',')
            .map((s) => cleanWord(s))
            .filter(Boolean)
            .join(', ')
        : '',
      experience: prev.experience.map((exp) => ({
        ...exp,
        role: cleanWord(exp.role),
        company: cleanWord(exp.company),
        desc: exp.desc ? exp.desc.trim() : ''
      })),
      education: prev.education.map((edu) => ({
        ...edu,
        degree: cleanWord(edu.degree),
        institution: cleanWord(edu.institution),
        year: edu.year ? edu.year.trim() : ''
      }))
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-16">
      <Head>
        <title>ATS தொழில்முறை ரெஸ்யூம் பில்டர் | நம்ம பூமி 360</title>
      </Head>

      <header className="border-b border-slate-800 bg-slate-950/80 sticky top-0 z-50 backdrop-blur px-4 py-3 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded text-sm">நம்ம பூமி 360</span>
            <span className="text-sm font-semibold text-emerald-400">ATS Resume Studio</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md transition flex items-center gap-1.5"
            >
              🖨️ PDF ஆக பதிவிறக்குக (Print / Save PDF)
            </button>
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
              ← முகப்பு
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="text-center mb-6 print:hidden">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">ATS-Friendly தொழில்முறை ரெஸ்யூம் பில்டர்</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            உங்கள் விவரங்களை உள்ளிட்டதும், நிறுவனங்கள் ஏற்கும் வகையில் எளிதாக வடிவமைத்து உடனுக்குடன் PDF வடிவில் சேமியுங்கள்.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* படிவம் பகுதி */}
          <div className="lg:col-span-5 bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 shadow-lg print:hidden space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <h2 className="text-sm font-semibold text-emerald-400">1. தனிநபர் விவரங்கள்</h2>
              <button
                type="button"
                onClick={handleCleanFormat}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-2.5 py-1 rounded text-xs transition shadow"
              >
                ✨ எழுத்துச் சீரமைப்பு (Auto-Format)
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
                placeholder="எ.கா: Branch Manager"
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
                  placeholder="9876543210"
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
                placeholder="எ.கா: காஞ்சிபுரம், தமிழ்நாடு"
                value={resumeData.location}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">சுயவிவரக் குறிப்பு (Professional Summary)</label>
              <textarea
                name="summary"
                rows={3}
                placeholder="உங்கள் அனுபவத்தை சுருக்கமாக விவரிக்கவும்..."
                value={resumeData.summary}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Experience List */}
            <div className="pt-2 border-t border-slate-700">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold text-emerald-400">2. பணி அனுபவம்</h2>
                <button
                  type="button"
                  onClick={addExperience}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-emerald-300 px-2 py-0.5 rounded transition"
                >
                  + அனுபவம் சேர்
                </button>
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
                      placeholder="காலம் (எ.கா: 2010 - 2026)"
                      value={exp.period}
                      onChange={(e) => handleExpChange(idx, 'period', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="பொறுப்புகள் மற்றும் சாதனைகள்..."
                    value={exp.desc}
                    onChange={(e) => handleExpChange(idx, 'desc', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              ))}
            </div>

            {/* Education List */}
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
                    placeholder="படிப்பு / பட்டம் (எ.கா: B.Sc)"
                    value={edu.degree}
                    onChange={(e) => handleEduChange(idx, 'degree', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="கல்லூரி / பள்ளி"
                      value={edu.institution}
                      onChange={(e) => handleEduChange(idx, 'institution', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="ஆண்டு (Year)"
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
                placeholder="எ.கா: Team Leadership, Branch Operations, Target Achievement"
                value={resumeData.skills}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* நிகழ்நேர ரெஸ்யூம் தாள் */}
          <div className="lg:col-span-7">
            <div className="bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 print:p-0 print:shadow-none print:m-0 min-h-[750px] font-sans border border-slate-200">
              
              {/* Header */}
              {(resumeData.fullName || resumeData.jobTitle) && (
                <div className="border-b-2 border-slate-900 pb-4 mb-5">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
                    {resumeData.fullName}
                  </h1>
                  <p className="text-sm font-semibold text-emerald-800 mt-0.5 uppercase tracking-wide">
                    {resumeData.jobTitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 font-medium">
                    {resumeData.phone && <span>📞 {resumeData.phone}</span>}
                    {resumeData.email && <span>✉️ {resumeData.email}</span>}
                    {resumeData.location && <span>📍 {resumeData.location}</span>}
                  </div>
                </div>
              )}

              {/* Summary */}
              {resumeData.summary && (
                <div className="mb-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Professional Summary
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line text-justify">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience.some(e => e.role || e.company) && (
                <div className="mb-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp, idx) => (
                      (exp.role || exp.company) && (
                        <div key={idx}>
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-slate-800">{exp.role}</span>
                            <span className="text-[11px] text-slate-500 font-medium">{exp.period}</span>
                          </div>
                          {exp.company && <div className="text-xs font-semibold text-emerald-800 mb-1">{exp.company}</div>}
                          {exp.desc && <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line text-justify">{exp.desc}</p>}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education.some(e => e.degree || e.institution) && (
                <div className="mb-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Education
                  </h2>
                  <div className="space-y-2">
                    {resumeData.education.map((edu, idx) => (
                      (edu.degree || edu.institution) && (
                        <div key={idx} className="flex justify-between items-baseline">
                          <div>
                            <div className="text-xs font-bold text-slate-800">{edu.degree}</div>
                            <div className="text-xs text-slate-600">{edu.institution}</div>
                          </div>
                          <span className="text-[11px] text-slate-500 font-medium">{edu.year}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Key Competencies & Core Skills
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.split(',').filter(s => s.trim()).map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-800 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}