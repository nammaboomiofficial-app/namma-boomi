import React, { useState } from 'react';

export default function LegalAuditPromo() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    surveyNo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.surveyNo) {
      alert('தயவுசெய்து உங்கள் வாட்ஸ்அப் எண் மற்றும் சர்வே எண்ணை உள்ளிடவும்.');
      return;
    }

    // உங்கள் அதிகாரப்பூர்வ வாட்ஸ்அப் எண்ணிற்கு வாடிக்கையாளர் ஆர்டர் செல்லும்
    const adminWhatsApp = '919962369131'; // உங்கள் வாட்ஸ்அப் எண்ணை இங்கே மாற்றிக்கொள்ளலாம்
    const message = `வணக்கம் நம்ம பூமி 360! 🛡️\n\nஎனது நிலத்திற்கான *₹499 டிஜிட்டல் லீகல் ஆடிட் (Legal Audit)* அறிக்கையைப் பெற விரும்புகிறேன்.\n\n👤 பெயர்: ${formData.name || 'வழங்கப்படவில்லை'}\n📱 வாட்ஸ்அப்: ${formData.phone}\n📍 இடம் / ஊர்: ${formData.location || 'வழங்கப்படவில்லை'}\n📜 சர்வே எண்: ${formData.surveyNo}\n\nகட்டண விவரம் மற்றும் சரிபார்ப்பு அறிக்கையை அனுப்பி வைக்கவும். நன்றி!`;

    window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto" id="legal-audit-service">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
        
        {/* பின்னணி அழகு வெளிச்சம் */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* இடதுபுறம்: சேவையின் முக்கியத்துவம் */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>🛡️</span> பிரத்யேக சட்டத் தணிக்கைச் சேவை
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              நீங்கள் வாங்கும் நிலம் <span className="text-emerald-400">100% பாதுகாப்பானதா?</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              பத்திரம் பதிவு செய்வதற்கு முன் வெறும் <strong>₹499-ல்</strong> அரசு ஆவணங்களை (Tnreginet & e-Services) முழுமையாக ஆய்வு செய்து, 6-அடுக்கு டிஜிட்டல் லீகல் ஆடிட் அறிக்கையை உங்கள் வாட்ஸ்அப்பிற்கே பெறுங்கள்!
            </p>

            {/* 4 முக்கிய பலன்கள் */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-200 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="text-emerald-400 font-black text-base">✓</span>
                <span>30 ஆண்டு வில்லங்க ஆய்வு (EC Verification)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="text-emerald-400 font-black text-base">✓</span>
                <span>அரசு பட்டா & பட்டாதாரர் உண்மைத்தன்மை</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="text-emerald-400 font-black text-base">✓</span>
                <span>அரசு வழிகாட்டி மதிப்பு ஒப்பீடு</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="text-emerald-400 font-black text-base">✓</span>
                <span>அதிகாரப்பூர்வ டிஜிட்டல் PDF சான்றிதழ்</span>
              </div>
            </div>
          </div>

          {/* வலதுபுறம்: உடனடி முன்பதிவு படிவம் */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white">ஆடிட் அறிக்கை முன்பதிவு</h3>
                <p className="text-xs text-slate-400">உடனடி சரிபார்ப்பு & வாட்ஸ்அப் டெலிவரி</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 line-through block">₹1,999</span>
                <span className="text-xl font-extrabold text-emerald-400">₹499</span>
              </div>
            </div>

            <form onSubmit={handleOrder} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">உங்கள் பெயர்</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="உதாரணம்: குமார்"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">வாட்ஸ்அப் எண் *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 இலக்க எண் (அறிக்கை அனுப்ப)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">நிலம் உள்ள ஊர் / மாவட்டம்</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="உதாரணம்: திருப்போரூர், செங்கல்பட்டு"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">நிலத்தின் சர்வே எண் *</label>
                <input
                  type="text"
                  name="surveyNo"
                  required
                  value={formData.surveyNo}
                  onChange={handleChange}
                  placeholder="உதாரணம்: சர்வே எண் 142/1B அல்லது பட்டா எண்"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🛡️</span> ₹499-ல் தணிக்கை கோருங்கள் (WhatsApp)
              </button>

              <p className="text-[10px] text-center text-slate-400">
                🔒 100% பாதுகாப்பானது • உங்கள் தகவல்கள் ரகசியமாக வைக்கப்படும்
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}