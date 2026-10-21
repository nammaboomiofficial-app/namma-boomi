import React, { useState } from 'react';
import propertiesData from '../data/landsData.json';
import { getWhatsAppLink } from '../data/contactConfig';

export default function PropertyDirectory({ onSelectMapLocation }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [activeMedia, setActiveMedia] = useState(null);

  const filteredProperties = (propertiesData || []).filter((prop) => {
    const matchCategory = selectedCategory === 'all' || prop.category === selectedCategory;
    const matchType = selectedType === 'all' || prop.listingType === selectedType;
    return matchCategory && matchType;
  });

  const getListingBadge = (type) => {
    switch (type) {
      case 'விற்பனை':
      case 'sale':
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">🏷️ விற்பனைக்கு</span>;
      case 'வாடகை':
      case 'rent':
        return <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">🔑 வாடகைக்கு</span>;
      case 'lease':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">📜 லீசுக்கு</span>;
      default:
        return null;
    }
  };

  const handleVisitPass = (prop) => {
    const message = `வணக்கம் நம்ம பூமி 360! 🏡\nநான் விசிட் பாஸ் மற்றும் உரிமையாளர் எண் பெற விரும்புகிறேன்:\n\n📌 சொத்து: ${prop.title}\n📍 இடம்: ${prop.village || ''}, ${prop.taluk || ''}, ${prop.district || ''}\n🆔 நில ஐடி: ${prop.id || 'N/A'}\n💰 கேட்கும் விலை: ${prop.askingPrice || prop.price || ''}`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  const handleLoanGuidance = (prop) => {
    const message = `வணக்கம் நம்ம பூமி 360! 📑\nஇந்த சொத்திற்கான கடன் (Loan), EMI மற்றும் ஆவண வழிகாட்டல் (DAB) தேவைப்படுகிறது:\n\n📌 சொத்து: ${prop.title}\n📍 இடம்: ${prop.village || ''}, ${prop.district || ''}\n💰 மதிப்பு: ₹${(prop.approxValue || 0).toLocaleString('en-IN')}`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  const handleGetDirections = (prop) => {
    const destination = (prop.lat && prop.lng)
      ? `${prop.lat},${prop.lng}`
      : encodeURIComponent(`${prop.village || ''}, ${prop.taluk || ''}, ${prop.district || ''}, Tamil Nadu`);
    
    // எந்தத் தடையுமின்றி நேரடியாகக் கூகுள் மேப்ஸ் நேவிகேஷனைத் திறக்கும்
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    window.open(mapUrl, '_blank');
  };

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto" id="property-marketplace">
      {/* தலைப்பு & புள்ளிவிவரம் */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 pb-4 border-b border-slate-800 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
            🌐 360° நேரலை நில & சொத்து சந்தை
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            சரிபார்க்கப்பட்ட <span className="text-emerald-400">நிலங்கள் & மனைகள்</span>
          </h2>
        </div>
        <div className="text-xs text-slate-300 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
          மொத்தம் <strong className="text-emerald-400 font-bold">{filteredProperties.length}</strong> சரிபார்க்கப்பட்ட சொத்துக்கள்
        </div>
      </div>

      {/* வடிகட்டிகள் */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {[
            { id: 'all', label: 'அனைத்தும்' },
            { id: 'விவசாய பூமி', label: '🌾 விவசாய பூமி' },
            { id: 'DTCP மனைகள்', label: '📐 DTCP மனைகள்' },
            { id: 'மெயின் ரோடு பேசிங்', label: '🛣️ மெயின் ரோடு' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'all', label: 'அனைத்து வகை' },
            { id: 'விற்பனை', label: 'விற்பனை' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                selectedType === type.id
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* கார்டுகளின் கட்டமைப்பு */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((prop) => (
          <div
            key={prop.id}
            className="group bg-slate-900/95 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* படம், பேட்ஜ்கள் & வீடியோ பட்டன் */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={prop.image || prop.media?.featured || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef'}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* மேல் இடது பேட்ஜ்கள் */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                  <div className="flex items-center gap-1.5">
                    {prop.badge && (
                      <span className="bg-slate-950/80 backdrop-blur-sm text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded">
                        {prop.badge}
                      </span>
                    )}
                    {getListingBadge(prop.listingType)}
                  </div>
                  {prop.verifiedBoundary && (
                    <span className="bg-blue-950/80 backdrop-blur-sm text-blue-300 text-[10px] px-2 py-0.5 rounded border border-blue-500/30 font-medium">
                      ✓ எல்லை சரிபார்க்கப்பட்டது
                    </span>
                  )}
                </div>

                {/* மேல் வலது ஸ்கோர் & 360 பேட்ஜ் */}
                <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1">
                  {prop.trustScore && (
                    <span className="bg-emerald-500/90 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                      ஸ்கோர்: {prop.trustScore}
                    </span>
                  )}
                  {prop.has360 && (
                    <span className="bg-slate-950/80 backdrop-blur-sm text-cyan-300 border border-cyan-500/40 text-[9px] font-bold px-1.5 py-0.5 rounded">
                      🧭 360° பார்வை
                    </span>
                  )}
                </div>

                {/* நேரலை வீடியோ பொத்தான் */}
                {prop.videoUrl && (
                  <button
                    onClick={() => setActiveMedia({ type: 'video', url: prop.videoUrl, title: prop.title })}
                    className="absolute bottom-2.5 right-2.5 bg-red-600 hover:bg-red-500 text-white text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg font-bold cursor-pointer transition-all"
                  >
                    <span>▶</span> நேரலை வீடியோ
                  </button>
                )}
              </div>

              {/* விவரங்கள் */}
              <div className="p-4 space-y-2.5">
                <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                  {prop.title}
                </h3>

                <div className="text-[11px] text-slate-300 flex items-center gap-1 truncate">
                  <span className="text-red-400">📍</span> {prop.village}, {prop.taluk}, {prop.district}
                </div>

                <div className="text-[11px] text-slate-300 flex items-center justify-between">
                  <span><span className="text-amber-400">📄</span> சர்வே: {prop.surveyNo || 'சரிபார்க்கப்பட்டது'}</span>
                  <span className="text-emerald-400 font-semibold">{prop.extent}</span>
                </div>

                {/* விலை மற்றும் கெட் டைரக்ஷன்ஸ் பட்டன் */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">கேட்கும் விலை:</span>
                    <strong className="text-base font-extrabold text-white">
                      {prop.askingPrice}
                    </strong>
                  </div>

                  {/* கூகுள் மேப்ஸ் நேரடி வழித்தடப் பட்டன் */}
                 <a
  href={`https://www.google.com/maps/dir/?api=1&destination=${prop.lat},${prop.lng}&travelmode=driving`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-blue-600 hover:bg-blue-500 text-white shadow-md px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all inline-flex cursor-pointer no-underline"
>
  <span>🧭</span> வழித்தடம் (Route)
</a>
                </div>
              </div>
            </div>

            {/* கால்-டு-ஆக்ஷன் பட்டன்கள் */}
            <div className="p-4 pt-0 space-y-2">
              <button
                onClick={() => handleVisitPass(prop)}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>🎫</span> விசிட் பாஸ் & எண் பெறுக
              </button>

              <button
                onClick={() => handleLoanGuidance(prop)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>📑</span> கடன், EMI & ஆவண வழிகாட்டல் (DAB)
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* வீடியோ பாப்-அப் மாடல் */}
      {activeMedia && activeMedia.type === 'video' && (
        <div
          onClick={() => setActiveMedia(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
          >
            <div className="flex items-center justify-between p-3.5 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2 text-white text-xs font-bold truncate">
                <span className="text-red-500">🎥</span>
                <span className="truncate">{activeMedia.title}</span>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="text-slate-400 hover:text-white font-bold text-base px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <video
                src={activeMedia.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                உங்கள் உலாவி வீடியோவை ஆதரிக்கவில்லை.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}