import React, { useState } from 'react';

export default function DocumentAnalysisBureau() {
  const [surveyType, setSurveyType] = useState('dgps');
  const whatsappNumber = "919962369131"; // உங்கள் வாட்ஸ்அப் எண்

  const handleWhatsAppBooking = (serviceName, details = "") => {
    const text = `வணக்கம், நம்ம பூமி 360 DAB தளம் மூலம் *${serviceName}* சேவை பெற விரும்புகிறேன்.${details ? `\nவிவரம்: ${details}` : ''}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const govtServices = [
    {
      title: "பட்டா / சிட்டா நகல்",
      desc: "வருவாய்த்துறை இணையதளம் மூலம் நிலத்தின் உண்மை உரிமை சரிபார்ப்பு.",
      link: "https://eservices.tn.gov.in/eservicesnew/index.html",
      badge: "உடனடி பதிவிறக்கம்"
    },
    {
      title: "30 வருட வில்லங்கச் சான்று (EC)",
      desc: "Tnreginet போர்ட்டலில் முந்தைய அடமானங்கள் மற்றும் விற்பனை வரலாறு ஆய்வு.",
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

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6 text-slate-100">
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-2xl">📜</span>
          <h2 className="text-xl md:text-2xl font-bold tracking-wide text-emerald-400">
            அரசு ஆவண வழிகாட்டல் & ஆய்வு மையம் (DAB)
          </h2>
        </div>
        <p className="text-sm text-slate-300">
          போலிப் பத்திரங்களைத் தடுக்கும் டிஜிட்டல் அரண் — பட்டா, EC முதல் 30 ஆண்டுகால தாய் பத்திர சட்ட ஆய்வு வரை.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-md font-semibold text-emerald-300 flex items-center gap-2">
          <span>🏛️</span> அரசு நேரடி மின்-சேவைகள் (இலவச வழிகாட்டல்)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {govtServices.map((item, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-slate-100">{item.title}</h4>
                  <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">{item.desc}</p>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs text-center rounded-lg border border-slate-700 transition"
              >
                அரசு இணையதளத்தில் பார்க்க ↗
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 shadow-lg">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-full font-semibold">
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
          பத்திரப்பதிவு வழக்கறிஞர்கள் குழு மூலம் வில்லங்கப் பதிவு, பாகப்பிரிவினை, வாரிசு சான்றிதழ் மற்றும் மூல ஆவணங்களின் வரிசையை முழுமையாக ஆய்வு செய்து சட்ட அறிக்கை வழங்கப்படும்.
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mb-5">
          <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 30 ஆண்டு வில்லங்க ஆய்வு</div>
          <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> வாரிசு / பாகப்பிரிவினை சரிபார்ப்பு</div>
          <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> வழக்கறிஞர் சட்ட அறிக்கை</div>
          <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 48 மணிநேர விரைவு சேவை</div>
        </div>

        <button
          onClick={() => handleWhatsAppBooking("30-Year Legal Title Clearance", "கட்டணம்: ₹1,999")}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2"
        >
          <span>💬</span> சட்ட ஆய்வுக்கு ஆவணங்களை அனுப்ப (WhatsApp)
        </button>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-md font-semibold text-slate-100 mb-2 flex items-center gap-2">
          <span>📐</span> டிஜிட்டல் நில அளவையர் முன்பதிவு (Land Survey)
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          அரசு உரிமம் பெற்ற சர்வேயர்கள் மூலம் சாட்டிலைட் DGPS / டோட்டல் ஸ்டேஷன் முறையில் துல்லியமான எல்லைக் கல் நடுதல்.
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setSurveyType('dgps')}
            className={`py-2 px-3 text-xs rounded-lg border transition font-medium ${
              surveyType === 'dgps'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            DGPS சாட்டிலைட் அளவீடு
          </button>
          <button
            onClick={() => setSurveyType('boundary')}
            className={`py-2 px-3 text-xs rounded-lg border transition font-medium ${
              surveyType === 'boundary'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            எல்லை கல் நடுதல் / தகராறு
          </button>
        </div>

        <button
          onClick={() => handleWhatsAppBooking("நில அளவையர் முன்பதிவு", `வகை: ${surveyType === 'dgps' ? 'DGPS Satellite Survey' : 'Boundary Fixing'}`)}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40 font-medium text-xs rounded-xl transition flex items-center justify-center gap-2"
        >
          <span>📅</span> சர்வேயர் முன்பதிவு செய்ய தொடர்பு கொள்க
        </button>
      </div>
    </div>
  );
}