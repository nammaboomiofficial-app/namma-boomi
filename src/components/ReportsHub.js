import React, { useState } from 'react';
import reportsData from '../data/reportsData.json';

export default function ReportsHub({ profile, onOpenChatWithTopic }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPreview, setSelectedPreview] = useState(null);

 const reports = reportsData.reports.map(r => 
  r.id === 'baby_name' ? { ...r, highlight: `${profile?.nakshatra || 'அஸ்தம்'} பாத நாமகரணம்` } : r
);

  const filteredReports = activeCategory === 'all' 
    ? reports 
    : reports.filter(r => r.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* மேல் விபரம் பேனர் */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-500/30">
            BASED ON YOUR KUNDALI
          </span>
          <h2 className="text-xl md:text-2xl font-black text-white mt-2">
            {profile.name}, உங்கள் வாழ்வியல் சிறப்பு அறிக்கைகள்
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            ராசி: <b className="text-amber-300">{profile.rasi || 'கன்னி'}</b> | நட்சத்திரம்: <b className="text-cyan-300">{profile.nakshatra || 'அஸ்தம்'}</b> | லக்னம்: <b className="text-emerald-300">{profile.lagna || 'மகரம்'}</b>
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800">
          <span className="text-lg">👛</span>
          <div>
            <div className="text-[10px] text-slate-400">வேலட் இருப்பு</div>
            <div className="text-sm font-bold text-amber-400">₹100 போனஸ் கிரெடிட்</div>
          </div>
        </div>
      </div>

      {/* பில்டர் பட்டன்கள் */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
        {[
          { id: 'all', label: 'அனைத்து அறிக்கைகள்', icon: '📑' },
          { id: 'foryou', label: 'உங்களுக்காக (For You)', icon: '⭐' },
          { id: 'monthly', label: 'மாதாந்திர கணிப்பு', icon: '📅' },
          { id: 'onetime', label: 'வாழ்நாள் அறிக்கைகள்', icon: '⏳' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* கார்டுகள் பட்டியல் */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/40 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl">
                    {report.icon}
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 font-semibold block">● {report.orders}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{report.tamilTitle}</h3>
                    <div className="text-xs text-slate-400 font-mono">{report.title}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-black text-emerald-400 font-mono">{report.price}</div>
                  <div className="text-[10px] text-slate-500 line-through font-mono">{report.originalPrice}</div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    {report.discount}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mt-4">{report.tagline}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <div className="text-[11px] text-cyan-300 flex items-center gap-1">
                <span>⚡</span>
                <span>{report.highlight}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedPreview(report)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold cursor-pointer"
                >
                  👁️ மாதிரி
                </button>
                <button
 onClick={() => {
  const adminPhone = '919962369131';
  const msg = `வணக்கம் நம்ம பூமி 360, நான் "${report.tamilTitle} (${report.title})" முழு அறிக்கையைப் பெற விரும்புகிறேன். கட்டணம்: ${report.price}. என்னை வழிகாட்டவும்.`;
  window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(msg)}`, '_blank');
}}
  style={{
    backgroundColor: '#db2777',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '11px',
    padding: '6px 14px',
    borderRadius: '10px',
    border: '1px solid #f472b6',
    cursor: 'pointer'
  }}
>
  <span style={{ color: '#ffffff', fontWeight: 'bold' }}>
    திறக்க (Unlock) →
  </span>
</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* மாதிரி அறிக்கை பாப்-அப் மாடல் */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-pink-500/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedPreview.icon}</span>
                <h3 className="text-base font-bold text-white">{selectedPreview.tamilTitle} — மாதிரி</h3>
              </div>
              <button
                onClick={() => setSelectedPreview(null)}
                className="w-8 h-8 rounded-full bg-slate-950 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-2.5">
              {selectedPreview.previewPoints.map((point, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
                  <span className="text-pink-400 font-bold">•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs text-amber-400 font-bold">விலை: {selectedPreview.price}</span>
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  const title = selectedPreview.tamilTitle;
                  setSelectedPreview(null);
                  onOpenChatWithTopic(title);
                }}
                style={{
                  backgroundColor: '#e11d48',
                  color: '#ffffff',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  userSelect: 'none'
                }}
              >
                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>
                  முழு அறிக்கையைப் படி →
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}