import React, { useState } from 'react';

export default function LegalAuditPromo() {
  const [showSample, setShowSample] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    surveyNo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.surveyNo) {
      alert('தயவுசெய்து உங்கள் வாட்ஸ்அப் எண் மற்றும் சர்வே எண்ணை உள்ளிடவும்');
      return;
    }

    // 1. கூகுள் ஷீட்டில் தானாக லீட் பதிவு செய்தல்
    const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZBOYKKBWNIKD7CzSh0M0qvfkHhORCw53YMBZXlnKCB1AcSAu/exec";

    try {
      fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name || "பெயர் குறிப்பிடவில்லை",
          phone: formData.phone || "",
          location: formData.location || formData.district || "",
          surveyNo: formData.surveyNo || "",
        }),
      });
    } catch (err) {
      console.error("Sheet saving error:", err);
    }

    // 2. வாட்ஸ்அப் மெசேஜ் அனுப்புதல்
    const adminWhatsApp = '919962369131';
    const message = `வணக்கம் நம்ம பூமி 360! 🛡️\n\nஎனது நிலத்திற்கான ₹499 டிஜிட்டல் ஆவண தணிக்கை பெற விரும்புகிறேன்:\n\n👤 பெயர்: ${formData.name || ''}\n📱 வாட்ஸ்அப்: ${formData.phone || ''}\n📍 இடம்: ${formData.location || formData.district || ''}\n📜 சர்வே எண்: ${formData.surveyNo || ''}\n\nகட்டண விவரம் மற்றும் சரிபார்ப்பு அறிக்கையை அனுப்பி வைக்கவும். நன்றி!`;

    window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto" id="legal-audit-service">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
        
        {/* பின்னணி அழகு வெளிச்சம் */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* இடதுபுறம்: சேவையின் விவரங்கள் */}
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

            {/* மாதிரி அறிக்கை பார்க்கும் பட்டன் */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowSample(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40 text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
              >
                <span>👁️</span> மாதிரி ஆடிட் அறிக்கையைப் பார்க்க (View Sample Report)
              </button>
            </div>
          </div>

          {/* வலதுபுறம்: முன்பதிவு படிவம் */}
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

      {/* மாதிரி அறிக்கை பாப்-அப் மாடல் (Sample Certificate Modal) */}
      {showSample && (
        // ✅ புதிய வரிகள் (167 & 168):
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
  <div className="relative w-full max-w-xl bg-white text-slate-800 rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            
            {/* மாடல் மூடும் பட்டன் */}
            <button
              onClick={() => setShowSample(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* சான்றிதழ் மாதிரி தலைப்பு */}
            <div className="flex items-center justify-between border-b pb-4 border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
                  360
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">நம்ம பூமி 360</h3>
                 <p className="text-[11px] text-emerald-700 font-semibold">டிஜிட்டல் நில ஆவண சரிபார்ப்புப் பிரிவு</p>
                </div>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-bold border border-amber-300">
                மாதிரி அறிக்கை / SAMPLE
              </span>
            </div>

            {/* வாட்டர்மார்க் உடன் கூடிய சான்றிதழ் விவரங்கள் */}
            <div className="relative my-4 space-y-3 text-xs text-slate-700">
              
              {/* பின்னணி வாட்டர்மார்க் */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 text-4xl sm:text-6xl font-black rotate-[-25deg] text-slate-900">
                NAMMABOOMI 360
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div><strong>வாடிக்கையாளர்:</strong> செல்வகுமார்</div>
                <div><strong>சரிபார்க்கப்பட்ட நிலம்:</strong> சர்வே எண்: #142/1B</div>
                <div><strong>மாவட்டம் / தாலுகா:</strong> செங்கல்பட்டு / திருப்போரூர்</div>
                <div><strong>சான்றிதழ் எண்:</strong> NB-847958</div>
              </div>

             {/* 8 அடுக்கு சோதனை அட்டவணை */}
            <div className="border border-slate-200 rounded-xl overflow-hidden mt-2">
              <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-900 text-xs">
                8 அடுக்கு விரிவான அரசு ஆவணச் சரிபார்ப்பு முடிவுகள்
              </div>
              <div className="divide-y divide-slate-200 text-xs">
                <div className="p-2 flex justify-between items-center">
                  <span className="text-slate-600">1. பட்டா & உரிமை நிலை</span>
                  <span className="font-bold text-emerald-700">பட்டாதாரர்: ராமநாதன் (உறுதியானது)</span>
                </div>
                <div className="p-2 flex justify-between items-center">
                  <span className="text-slate-600">2. நில வகைப்பாடு & மண்டலம்</span>
                  <span className="font-bold text-slate-800">ரயத்துவாரி புஞ்சை (குடியிருப்பு பகுதி)</span>
                </div>
                <div className="p-2 flex justify-between items-center">
                  <span className="text-slate-600">3. DTCP / CMDA அப்ரூவல் நிலை</span>
                  <span className="font-bold text-emerald-700">அங்கீகரிக்கப்பட்ட மனை (#124/2018)</span>
                </div>
                <div className="p-2 flex justify-between items-center">
                  <span className="text-slate-600">4. வில்லங்க சான்றிதழ் (30 ஆண்டு EC)</span>
                  <span className="font-bold text-emerald-700">முழுமையான வில்லங்கமற்றது (Nil EC)</span>
                </div>
                <div className="p-2 flex justify-between items-center">
                  <span className="text-slate-600">5. அரசு வழிகாட்டி மதிப்பு</span>
                  <span className="font-bold text-amber-700">₹1,250 / சதுர அடி</span>
                </div>
                <div className="p-2 flex justify-between items-center">
                  <span className="text-slate-600">6. உத்தேச பதிவுச் செலவு (~9%)</span>
                  <span className="font-bold text-slate-800">வழிகாட்டி மதிப்பில் 9% (முத்திரை + பதிவு)</span>
                </div>
                <div className="p-2 flex justify-between items-center">
                  <span className="text-slate-600">7. கள அணுகு பாதை</span>
                  <span className="font-bold text-slate-800">30 அடி தார் சாலை இணைப்பு உறுதி</span>
                </div>
                <div className="p-2 flex justify-between items-center">
                  <span className="text-slate-600">8. நீர்நிலை / புறம்போக்கு எல்லை</span>
                  <span className="font-bold text-emerald-700">ஆட்சேபணையற்ற எல்லை (Safe Zone)</span>
                </div>
              </div>
            </div>

              {/* ஸ்கோர் பேட்ஜ் */}
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div>
                  <div className="text-xs font-bold text-emerald-900">பாதுகாப்பு மதிப்பீடு: 98/100 (A+ மிக உயர் பாதுகாப்பு)</div>
                  <div className="text-[11px] text-emerald-700">பட்டா மற்றும் வில்லங்கம் அரசு பதிவுகளுடன் 100% ஒத்துப் போகிறது.</div>
                </div>
                <div className="text-xl font-black text-emerald-600">✓ PASS</div>
              </div>
            </div>

            {/* கால்-டு-ஆக்ஷன் பட்டன் */}
            {/* கால்-டு-ஆக்ஷன் பட்டன் & பொறுப்புத் துறப்பு */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowSample(false);
                  document.getElementById('legal-audit-service')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
              >
                எனது நிலத்திற்கும் சரிபார்ப்பு செய்க (₹499)
              </button>

              <p className="text-[9px] text-slate-400 text-center leading-tight">
                ⚖️ <strong>பொறுப்புத் துறப்பு:</strong> இந்த அறிக்கை தமிழ்நாடு அரசின் Tnreginet மற்றும் e-Services அதிகாரப்பூர்வ பொதுத் தரவுகளின் அடிப்படையில் ஆய்வு செய்து வழங்கப்படும் டிஜிட்டல் சரிபார்ப்பு அறிக்கையாகும்.
              </p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}