import React, { useState } from 'react';

export default function DocumentAnalysisBureau() {
  const [surveyType, setSurveyType] = useState('dgps');
  const whatsappNumber = "919962369131"; // உங்கள் வாட்ஸ்அப் எண்

  // பாப்-அப் மாடல் நிலவரங்கள் (State)
  const [activeModalService, setActiveModalService] = useState(null); // 'legal' அல்லது 'survey'
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [landLocation, setLandLocation] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');

  // அரசு மின்-சேவை இணைப்புகள்
  const govtServices = [
    {
      title: "பட்டா / சிட்டா நகல்",
      desc: "வருவாய்த்துறை இணையதளம் மூலம் நிலத்தின் உண்மை உரிமை சரிபார்ப்பு.",
      link: "https://eservices.tn.gov.in/eservicesnew/index.html",
      badge: "உடனடி பதிவிறக்கம்"
    },
    {
      title: "30 வருட வில்லங்கச் சான்று (EC)",
      desc: "TNreginet போர்ட்டலில் முந்தைய அடமானங்கள் மற்றும் விற்பனை வரலாறு ஆய்வு.",
      link: "https://tnreginet.gov.in/",
      badge: "அரசு தளம்"
    },
    {
      title: "புல வரைபடம் (FMB Sketch)",
      desc: "நிலத்தின் எல்லைக் கோடுகள் மற்றும் துல்லியமான வடிவம் காணும் வரைபடம்.",
      link: "https://eservices.tn.gov.in/eservicesnew/index.html",
      badge: "வரைபடம்"
    },
    {
      title: "நகர நில ஆவணம் (TSLR)",
      desc: "நகராட்சி மற்றும் மாநகராட்சி எல்லைக்குட்பட்ட மனைகளின் டிஜிட்டல் பதிவு.",
      link: "https://eservices.tn.gov.in/eservicesnew/index.html",
      badge: "நகர மனை"
    }
  ];

  // முழுமையான வாட்ஸ்அப் லீட் அனுப்பும் முறை
  const submitLeadToWhatsApp = () => {
    if (!applicantName || !landLocation) {
      alert("தயவுசெய்து உங்கள் பெயர் மற்றும் நிலத்தின் ஊர்/மாவட்டத்தைக் குறிப்பிடவும்.");
      return;
    }

    const isLegal = activeModalService === 'legal';
    const serviceTitle = isLegal 
      ? "30 ஆண்டுகால தாய் பத்திர சட்ட ஆய்வு (Legal Title Clearance)" 
      : `டிஜிட்டல் நில அளவையர் முன்பதிவு (${surveyType === 'dgps' ? 'DGPS Satellite Survey' : 'எல்லைக் கல் நடுதல் / தகராறு தீர்வு'})`;

    const feeDetail = isLegal ? "ஆய்வுக் கட்டணம்: ₹1,999" : "கள ஆய்வு & அளவீடு";

    const text = `*⚖️ நம்ம பூமி 360 - ஆவண & கள ஆய்வு விண்ணப்பம்*\n\n` +
      `📋 *கோரப்படும் சேவை:* ${serviceTitle}\n` +
      `💰 *கட்டண விவரம்:* ${feeDetail}\n\n` +
      `👤 *விண்ணப்பதாரர் பெயர்:* ${applicantName}\n` +
      `📞 *தொடர்பு எண்:* ${applicantPhone || 'வாட்ஸ்அப் எண்'}\n` +
      `📍 *நிலத்தின் அமைவிடம் / மாவட்டம்:* ${landLocation}\n` +
      `🔢 *சர்வே எண்:* ${surveyNumber || 'சரிபார்க்கப்பட வேண்டும்'}\n\n` +
      `✅ எனது நிலத்திற்கான ஆவணங்களைச் சரிபார்த்து அடுத்தகட்ட வழிகாட்டலைத் தர வேண்டுகிறேன்.`;

    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(text)}`, '_blank');
    setActiveModalService(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6 text-slate-100">
      {/* ஹெடர் */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-2xl">🏛️</span>
          <h2 className="text-xl md:text-2xl font-bold tracking-wide text-emerald-400">
            அரசு ஆவண வழிகாட்டல் & ஆய்வு மையம் (DAB)
          </h2>
        </div>
        <p className="text-sm text-slate-300">
          போலிப் பத்திரங்களைத் தடுக்கும் டிஜிட்டல் அரண் – பட்டா, EC முதல் 30 ஆண்டுகால தாய் பத்திர சட்ட ஆய்வு வரை.
        </p>
      </div>

      {/* பிரிவு 1: அரசு நேரடி மின்-சேவைகள் */}
      <div className="space-y-3">
        <h3 className="text-md font-semibold text-emerald-300 flex items-center gap-2">
          <span>🏛️</span> அரசு நேரடி மின்-சேவைகள் (இலவச வழிகாட்டல்)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {govtServices.map((item, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between transition">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-slate-100">{item.title}</h4>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">{item.desc}</p>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs text-center rounded-lg font-medium transition block"
              >
                அரசு இணையதளத்தில் பார்க்க ↗
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* பிரிவு 2: 30 ஆண்டுகால தாய் பத்திர சட்ட ஆய்வு */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-full font-bold">
              சட்டப் பாதுகாப்பு
            </span>
            <h3 className="text-lg font-bold text-slate-100 mt-2">
              30 ஆண்டுகால தாய் பத்திர சட்ட ஆய்வு (Title Clearance)
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">ஆய்வுக் கட்டணம்</span>
            <span className="text-lg font-extrabold text-cyan-400">₹1,999</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          பத்திரப்பதிவு வழக்கறிஞர்கள் குழு மூலம் வில்லங்கப் பதிவு, பாகப்பிரிவினை, வாரிசு சான்றிதழ் மற்றும் நீதிமன்ற வழக்கு ஆய்வறிக்கை.
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-200 mb-5">
          <div className="flex items-center gap-1.5"><span className="text-emerald-400 font-bold">✓</span> 30 ஆண்டு வில்லங்க ஆய்வு</div>
          <div className="flex items-center gap-1.5"><span className="text-emerald-400 font-bold">✓</span> வாரிசு / பாகப்பிரிவினை சரிபார்ப்பு</div>
          <div className="flex items-center gap-1.5"><span className="text-emerald-400 font-bold">✓</span> வழக்கறிஞர் சட்ட சான்றிதழ்</div>
          <div className="flex items-center gap-1.5"><span className="text-emerald-400 font-bold">✓</span> 48 மணிநேர விரிவான அறிக்கை</div>
        </div>

        <button
          type="button"
          onClick={() => setActiveModalService('legal')}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-sm rounded-xl transition cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-2"
        >
          <span>💬</span> <span>சட்ட ஆய்வுக்கு விவரங்களை உள்ளிடவும் (WhatsApp)</span>
        </button>
      </div>

      {/* பிரிவு 3: டிஜிட்டல் நில அளவையர் முன்பதிவு */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-md font-semibold text-slate-100 mb-2 flex items-center gap-2">
          <span>📐</span> டிஜிட்டல் நில அளவையர் முன்பதிவு (Land Survey)
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          அரசு உரிமம் பெற்ற சர்வேயர்கள் மூலம் சாட்லைட் DGPS / டோட்டல் ஸ்டேஷன் முறையில் துல்லியமான எல்லை நிர்ணயம்.
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            type="button"
            onClick={() => setSurveyType('dgps')}
            className={`py-2 px-3 text-xs rounded-lg border transition font-medium cursor-pointer ${
              surveyType === 'dgps'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            DGPS Satellite Survey
          </button>
          <button
            type="button"
            onClick={() => setSurveyType('boundary')}
            className={`py-2 px-3 text-xs rounded-lg border transition font-medium cursor-pointer ${
              surveyType === 'boundary'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            எல்லைக் கல் நடுதல் / தகராறு
          </button>
        </div>

        <button
          type="button"
          onClick={() => setActiveModalService('survey')}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
        >
          <span>📐</span> <span>சர்வேயர் முன்பதிவு செய்ய விவரங்களை உள்ளிடவும்</span>
        </button>
      </div>

      {/* 🌟 பெஸ்ட் அண்ட் பெஸ்ட்: விவரங்கள் உள்ளிடும் பாப்-அப் மாடல் */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 p-5 shadow-2xl text-white">
            <button
              type="button"
              onClick={() => setActiveModalService(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
            >
              ✕
            </button>

            <div className="text-center mb-4">
              <span className="text-2xl">{activeModalService === 'legal' ? '⚖️' : '📐'}</span>
              <h3 className="text-sm font-bold text-white mt-1">
                {activeModalService === 'legal' ? 'சட்ட ஆய்வு முன்பதிவு படிவம்' : 'சர்வேயர் முன்பதிவு படிவம்'}
              </h3>
              <p className="text-[11px] text-emerald-400 mt-0.5">
                {activeModalService === 'legal' ? '30 ஆண்டு தாய் பத்திர ஆய்வு (₹1,999)' : `வகை: ${surveyType === 'dgps' ? 'DGPS Survey' : 'எல்லைக் கல் நடுதல்'}`}
              </p>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">உங்கள் பெயர் *</label>
                <input
                  type="text"
                  placeholder="எ.கா: உதயகுமார்"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-300 block mb-1">தொடர்பு எண் (Phone)</label>
                <input
                  type="tel"
                  placeholder="எ.கா: 9876543210"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-300 block mb-1">நிலம் உள்ள இடம் / தாலுகா / மாவட்டம் *</label>
                <input
                  type="text"
                  placeholder="எ.கா: மறைமலை நகர், செங்கல்பட்டு மாவட்டம்"
                  value={landLocation}
                  onChange={(e) => setLandLocation(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-300 block mb-1">சர்வே எண் (இருப்பின்)</label>
                <input
                  type="text"
                  placeholder="எ.கா: 142/3B"
                  value={surveyNumber}
                  onChange={(e) => setSurveyNumber(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={submitLeadToWhatsApp}
              className="w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer active:scale-95 transition bg-emerald-600 hover:bg-emerald-500 text-slate-950"
            >
              <span>💬</span> <span>வாட்ஸ்அப் மூலம் உடனடியாகச் சமர்ப்பிக்க</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}