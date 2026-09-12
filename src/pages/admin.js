import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function AdminAuditGenerator() {
  // வாடிக்கையாளர் மற்றும் நிலத் தகவல்கள் ஸ்டேட் (Hydration Safe)
  const [formData, setFormData] = useState({
    clientName: 'செல்வகுமார்',
    clientPhone: '9876543210',
    auditId: 'NB-845210',
    date: '13/09/2026',
    district: 'செங்கல்பட்டு',
    taluk: 'திருப்போரூர்',
    village: 'திருப்போரூர்',
    surveyNo: '142/1B',
    pattaNo: '1894',
    ownerName: 'ராமநாதன் & குடும்பத்தினர்',
    landClassification: 'ரயத்துவாரி புஞ்சை (Ryotwari Punjai)',
    ecPeriod: '30 ஆண்டுகள் (1995 - 2025 வரை)',
    ecStatus: 'முழுமையான வில்லங்கமற்றது (Nil Encumbrance)',
    guidelineValue: '₹1,250 / சதுர அடி',
    marketValueEstimate: '₹1,750 / சதுர அடி',
    roadAccess: '30 அடி தார் சாலை இணைப்பு உறுதி செய்யப்பட்டது',
    safetyScore: '98/100 (A+ மிக உயர் பாதுகாப்பு)',
    auditorNotes: 'பட்டா, வில்லங்கம் மற்றும் FMB வரைபடம் அரசு பதிவுகளுடன் துல்லியமாக ஒத்துப் போகிறது. எல்லைப் பிணக்குகளோ, அரசு நில ஆக்கிரமிப்புகளோ இல்லை. நேரடி பத்திரப் பதிவிற்கு 100% தகுதியானது.'
  });

  // பிரவுசரில் லோட் ஆன பிறகு இன்றைய தேதியையும் ரேண்டம் ஐடியையும் அமைத்தல்
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    const randomId = `NB-${Math.floor(100000 + Math.random() * 900000)}`;
    setFormData((prev) => ({
      ...prev,
      auditId: randomId,
      date: formattedDate
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // PDF பிரிண்ட் எடுக்கும் வசதி
  const handlePrintPDF = () => {
    window.print();
  };

  // வாடிக்கையாளருக்கு வாட்ஸ்அப் மெசேஜ் அனுப்பும் வசதி
  const sendWhatsAppUpdate = () => {
    const message = `வணக்கம் ${formData.clientName}! 🌟\n\nநம்ம பூமி 360 மூலமாக நீங்கள் கோரிய நிலச் சட்டத் தணிக்கை (Legal Audit) வெற்றிகரமாக நிறைவடைந்தது.\n\n📄 அறிக்கை எண்: ${formData.auditId}\n📍 சர்வே எண்: #${formData.surveyNo} (${formData.village})\n🛡️ பாதுகாப்பு தகுதி: ${formData.safetyScore}\n📜 வில்லங்க நிலை: ${formData.ecStatus}\n\nமுழுமையான அதிகாரப்பூர்வ டிஜிட்டல் சரிபார்ப்பு அறிக்கை பிடிஎஃப் (PDF) இணைக்கப்பட்டுள்ளது. மேலும் விபரங்களுக்கு தொடர்பு கொள்ளவும்.`;
    window.open(`https://wa.me/91${formData.clientPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans print:bg-white print:text-black print:min-h-0">
      <Head>
        <title>Smart Admin - ₹499 Legal Audit PDF Generator | நம்ம பூமி 360</title>
      </Head>

      {/* அட்மின் கண்ட்ரோல் பார் (No-Print) */}
      <div className="print:hidden bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-black text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> நம்ம பூமி 360 - ஸ்மார்ட் அட்மின் பேனல்
            </h1>
            <p className="text-xs text-slate-400">₹499 டிஜிட்டல் லீகல் ஆடிட் அறிக்கை ஆட்டோமேஷன்</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrintPDF}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <span>🖨️</span> PDF ஆகச் சேமி / பிரிண்ட் எடு
            </button>
            <button
              onClick={sendWhatsAppUpdate}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-semibold rounded-xl text-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>💬</span> வாட்ஸ்அப்பில் அனுப்பு
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 print:p-0 print:m-0 print:max-w-none">
        
        {/* இடதுபுறம்: அட்மின் உள்ளீட்டுப் படிவம் (No-Print) */}
        <div className="print:hidden lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 h-fit">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-200">அரசு தரவு உள்ளீடு (Tnreginet / e-Services)</h2>
            <p className="text-[11px] text-slate-400">இங்கு தகவல்களை மாற்றினால் வலதுபுற அறிக்கை உடனே மாறும்</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">வாடிக்கையாளர் பெயர்</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">வாட்ஸ்அப் எண்</label>
                <input
                  type="text"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">மாவட்டம்</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">தாலுகா</label>
                <input
                  type="text"
                  name="taluk"
                  value={formData.taluk}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">கிராமம்</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">சர்வே எண் & உட்பிரிவு</label>
                <input
                  type="text"
                  name="surveyNo"
                  value={formData.surveyNo}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">பட்டா எண்</label>
                <input
                  type="text"
                  name="pattaNo"
                  value={formData.pattaNo}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">பட்டாதாரர் பெயர்</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">நில வகைப்பாடு (Classification)</label>
              <input
                type="text"
                name="landClassification"
                value={formData.landClassification}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">வில்லங்க விவரம் (EC Status)</label>
              <input
                type="text"
                name="ecStatus"
                value={formData.ecStatus}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">வழிகாட்டி மதிப்பு (Guideline)</label>
                <input
                  type="text"
                  name="guidelineValue"
                  value={formData.guidelineValue}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">பாதுகாப்பு மதிப்பெண்</label>
                <input
                  type="text"
                  name="safetyScore"
                  value={formData.safetyScore}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">தணிக்கையாளர் கருத்து (Auditor Notes)</label>
              <textarea
                name="auditorNotes"
                rows={3}
                value={formData.auditorNotes}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* வலதுபுறம்: பிராண்டட் லீகல் ஆடிட் PDF நேரடி முன்னோட்டம் (Print Preview) */}
        <div className="lg:col-span-7 print:w-full">
          <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200 relative overflow-hidden print:border-none print:shadow-none print:p-0">
            
            {/* வாட்டர்மார்க் (Watermark) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none rotate-[-30deg]">
              <span className="text-7xl font-black text-slate-950 uppercase tracking-widest">NAMMA BOOMI 360</span>
            </div>

            {/* தலைப்பு பகுதி */}
            <div className="flex items-start justify-between border-b-2 border-emerald-600 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                    360
                  </div>
                  <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">நம்ம பூமி 360</h2>
                </div>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">டிஜிட்டல் நிலச் சட்ட தணிக்கைப் பிரிவு (Land Legal Audit Bureau)</p>
                <p className="text-[10px] text-slate-500">அரசு நிலப் பதிவேடு மற்றும் பத்திரத் தணிக்கை அறிக்கை</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-900 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md inline-block">
                  சான்றிதழ் எண்: {formData.auditId}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">நாள்: {formData.date}</div>
              </div>
            </div>

            {/* வாடிக்கையாளர் & சொத்து முக்கிய சுருக்கம் */}
            <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">தணிக்கை கோரியவர்:</span>
                <span className="font-bold text-slate-900">{formData.clientName}</span>
                <span className="text-slate-500 text-[10px] block">அலைபேசி: +91 {formData.clientPhone}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">சரிபார்க்கப்பட்ட நிலம்:</span>
                <span className="font-bold text-emerald-700">சர்வே எண்: #{formData.surveyNo}</span>
                <span className="text-slate-600 text-[10px] block">{formData.village}, {formData.taluk} தாலுகா</span>
              </div>
            </div>

            {/* 6 அடுக்கு சட்டப் பாதுகாப்பு அட்டவணை */}
            <div className="mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <span>📋</span> 6 அடுக்கு அரசு ஆவணச் சரிபார்ப்பு முடிவுகள்
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <td className="p-2.5 font-bold text-slate-600 w-1/3">1. பட்டா & உரிமை நிலை</td>
                      <td className="p-2.5 font-semibold text-slate-900">
                        பட்டா எண்: #{formData.pattaNo} | பட்டாதாரர்: {formData.ownerName}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-bold text-slate-600">2. நில வகைப்பாடு</td>
                      <td className="p-2.5 font-semibold text-slate-900">{formData.landClassification}</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <td className="p-2.5 font-bold text-slate-600">3. வில்லங்க சான்றிதழ் (EC)</td>
                      <td className="p-2.5 font-semibold text-emerald-700">
                        {formData.ecStatus} ({formData.ecPeriod})
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-bold text-slate-600">4. வழிகாட்டி & சந்தை மதிப்பு</td>
                      <td className="p-2.5 font-semibold text-slate-900">
                        வழிகாட்டி: {formData.guidelineValue} | உத்தேச சந்தை: {formData.marketValueEstimate}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <td className="p-2.5 font-bold text-slate-600">5. கள அணுகு சாலை நிலை</td>
                      <td className="p-2.5 font-semibold text-slate-900">{formData.roadAccess}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-600">6. ஆக்கிரமிப்பு / ஆட்சேபனை</td>
                      <td className="p-2.5 font-semibold text-emerald-700">எந்தவித அரசு ஆட்சேபனைகளும் இல்லை (Clear Title)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* பாதுகாப்பு மதிப்பெண் & தணிக்கையாளர் கருத்து */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="col-span-1 bg-emerald-50 border-2 border-emerald-500 rounded-xl p-3 text-center flex flex-col justify-center">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">பாதுகாப்பு தகுதி</span>
                <span className="text-xl font-black text-emerald-700 mt-0.5">{formData.safetyScore}</span>
                <span className="text-[9px] font-bold text-emerald-600 mt-1">100% பாதுகாப்பானது</span>
              </div>
              <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                <span className="font-bold text-slate-800 block text-[11px] mb-1">தணிக்கைக் குழுவின் இறுதிக் குறிப்பு:</span>
                <p className="text-slate-600 text-[10px] leading-relaxed">{formData.auditorNotes}</p>
              </div>
            </div>

            {/* கையொப்பம் & டிஜிட்டல் முத்திரை */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
              <div>
                <p className="font-bold text-slate-800">நம்ம பூமி 360 டிஜிட்டல் சரிபார்ப்புக் குழு</p>
                <p>தமிழ்நாடு பத்திரப்பதிவு & வருவாய்த்துறை தரவு அடிப்படையிலானது</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-10 border border-dashed border-slate-400 rounded flex items-center justify-center text-[9px] font-bold text-emerald-700 uppercase bg-emerald-50/50">
                  DIGITALLY VERIFIED
                </div>
                <span className="text-[8px] text-slate-400 block mt-0.5">டிஜிட்டல் முத்திரை</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}