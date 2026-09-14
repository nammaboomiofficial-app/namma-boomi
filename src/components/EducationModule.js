import React, { useState } from 'react';

const courses = [
  { id: 1, title: "Data Analyst", desc: "Analyze & Make Decisions", category: "Data", badge: "High Demand", icon: "📊" },
  { id: 2, title: "AI / Machine Learning", desc: "Build Intelligent Solutions", category: "AI", badge: "Trending", icon: "🤖" },
  { id: 3, title: "Data Science", desc: "Turn Data into Real Insights", category: "Data", badge: "Hot", icon: "📈" },
  { id: 4, title: "DevOps & Cloud", desc: "Build • Deploy • Automate", category: "Cloud", badge: "Popular", icon: "⚙️" },
  { id: 5, title: "Cybersecurity", desc: "Protect • Detect • Defend", category: "Security", badge: "Secure", icon: "🛡️" },
  { id: 6, title: "DevSecOps", desc: "Next-Gen Secure Everything", category: "Cloud", badge: "Advanced", icon: "🔒" },
  { id: 7, title: "Deep Learning & GPT", desc: "Next-Gen AI Capabilities", category: "AI", badge: "New", icon: "🧠" },
  { id: 8, title: "Data Engineering", desc: "Build Big Data Pipelines", category: "Data", badge: "Core", icon: "🗄️" },
  { id: 9, title: "Advanced Excel & BI", desc: "Work Smarter With Data", category: "Office", badge: "Starter", icon: "📑" }
];

export default function EducationModule() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].title);
  const [studentPhone, setStudentPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEnquiry = (courseName) => {
    const course = courseName || selectedCourse;
    if (!studentPhone || studentPhone.length < 10) {
      alert("தயவுசெய்து உங்கள் 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.");
      return;
    }

    // கூகுள் ஷீட் சிஆர்எம்-ல் லீட் பதிவு செய்தல்
    try {
      fetch('https://script.google.com/macros/s/AKfycbz...', { // உங்கள் Apps Script URL
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'மாணவர் லீட்',
          phone: studentPhone,
          village: course,
          taluk: 'கல்வி மாடியூல்',
          district: 'Education Lead',
          leadType: 'கல்வி & பயிற்சி',
          feeStatus: 'புதிய சேர்க்கை',
          status: 'Course Enquiry'
        })
      });
    } catch (e) {
      console.error(e);
    }

    // வாட்ஸ்அப் நேரடி இணைப்பு
    const msg = encodeURIComponent(`வணக்கம் நம்ம பூமி 360! எனக்கு "${course}" கோர்ஸ் பற்றிய பாடத்திட்டம் (Syllabus) மற்றும் பயிற்சிக் கட்டண விவரங்கள் தேவை.\nஎன் எண்: ${studentPhone}`);
    window.open(`https://wa.me/919962369131?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-8 p-4 sm:p-6 bg-slate-900/90 border border-emerald-500/30 rounded-3xl backdrop-blur-md shadow-2xl text-white">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">
          Good Skills • Good Life
        </span>
        <h2 className="text-xl sm:text-2xl font-black mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
          நவீன தொழில்நுட்பப் பயிற்சிக் கூடம் (Tech & AI Hub)
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          செயல்முறைப் பயிற்சிகள் • நேரடி வழிகாட்டல் • வேலைவாய்ப்பு உதவி
        </p>
      </div>

      {/* Quick Lead Input */}
      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="text-left w-full sm:w-auto">
          <p className="text-xs font-bold text-emerald-300">கட்டணம் & பாடத்திட்டம் அறிய:</p>
          <p className="text-[11px] text-slate-400">மொபைல் எண்ணை இட்டு விருப்பமான படிப்பைத் தேர்ந்தெடுக்கவும்</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="tel"
            maxLength={10}
            value={studentPhone}
            onChange={(e) => setStudentPhone(e.target.value)}
            placeholder="வாட்ஸ்அப் எண் (10 இலக்கம்)"
            className="px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-white w-full sm:w-56"
          />
          <button
            onClick={() => handleEnquiry(selectedCourse)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            விவரம் பெற ↗
          </button>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(course.title)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              selectedCourse === course.title
                ? "bg-slate-800 border-emerald-400 shadow-lg shadow-emerald-900/30 ring-1 ring-emerald-400"
                : "bg-slate-800/40 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{course.icon}</span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-slate-700/60 text-emerald-300 rounded-md">
                  {course.badge}
                </span>
              </div>
              <h3 className="font-bold text-sm text-white">{course.title}</h3>
              <p className="text-slate-400 text-xs mt-1">{course.desc}</p>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCourse(course.title);
                handleEnquiry(course.title);
              }}
              className="mt-4 w-full py-1.5 bg-slate-700/50 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-all"
            >
              விசாரிக்க (Enquire) ↗
            </button>
          </div>
        ))}
      </div>

      {/* Feature Highlights Footer */}
      <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] text-slate-300">
        <div>✓ Hands-on Projects</div>
        <div>✓ Mentor Guidance</div>
        <div>✓ Placement Assistance</div>
        <div>✓ Flexible Batches</div>
      </div>
    </section>
  );
}