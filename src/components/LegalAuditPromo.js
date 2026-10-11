import React, { useState } from 'react';
import auditConfigData from '../data/legalAuditData.json';

export default function LegalAuditPromo() {
  const {
    config = {},
    uiLabels = {},
    features = [],
    sampleReport = {},
    tamilNaduDistricts = []
  } = auditConfigData;

  const [showSample, setShowSample] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    taluk: '',
    village: '',
    surveyNo: '',
    subDivision: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.surveyNo || !formData.district) {
      alert(uiLabels.requiredAlert || 'தயவுசெய்து வாட்ஸ்அப் எண், மாவட்டம் மற்றும் சர்வே எண்ணை உள்ளிடவும்');
      return;
    }

    try {
      await fetch(config.googleSheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name || "பெயர் குறிப்பிடவில்லை",
          phone: formData.phone,
          location: `${formData.district}, ${formData.taluk}, ${formData.village}`,
          surveyNo: `${formData.surveyNo}/${formData.subDivision || 'முழு எண்'}`
        })
      });
    } catch (err) {
      console.error("Sheet saving error:", err);
    }

    const message = `வணக்கம் நம்ம பூமி 360! 🛡️\n\nஎனது நிலத்திற்கான ₹${config.priceDiscounted} டிஜிட்டல் ஆவண தணிக்கை பெற விரும்புகிறேன்.\n\n👤 பெயர்: ${formData.name}\n📞 எண்: ${formData.phone}\n📍 இடம்: ${formData.district}, ${formData.taluk}, ${formData.village}\n📑 சர்வே எண்: ${formData.surveyNo}/${formData.subDivision}`;

    window.open(`https://wa.me/${config.adminWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // சுத்தமாக 1 பக்கம் மட்டும் அச்சிட புதிய விண்டோ முறை
  const handlePrint = () => {
    const printContent = document.getElementById('printable-audit-report');
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=800,height=900');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${sampleReport.brandName || 'நம்ம பூமி 360'} - மாதிரி அறிக்கை</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { size: A4 portrait; margin: 10mm; }
            body { font-family: sans-serif; background: #ffffff; color: #1e293b; padding: 0; margin: 0; }
            .no-print { display: none !important; }
          </style>
        </head>
        <body class="p-6">
          ${printContent.innerHTML}
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 600);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const submitButtonText = (uiLabels.submitBtn || '₹{price}-ல் தணிக்கை கோருங்கள் (WhatsApp)').replace(
    '{price}',
    config.priceDiscounted
  );

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto" id="legal-audit-service">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* இடதுபுறம்: சேவையின் விவரங்கள் */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              {uiLabels.badge}
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {uiLabels.mainTitle} <span className="text-emerald-400">{uiLabels.mainTitleHighlight}</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              பத்திரம் பதிவு செய்வதற்கு முன் வெறும் <strong>₹{config.priceDiscounted}-ல்</strong> {uiLabels.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                  <span className="text-emerald-400 font-black text-base">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowSample(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40 text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
              >
                {uiLabels.viewSampleBtn}
              </button>
            </div>
          </div>

          {/* வலதுபுறம்: முன்பதிவு படிவம் */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white">{uiLabels.formTitle}</h3>
                <p className="text-xs text-slate-400">{uiLabels.formSubtitle}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 line-through block">₹{config.priceOriginal}</span>
                <span className="text-xl font-extrabold text-emerald-400">₹{config.priceDiscounted}</span>
              </div>
            </div>

            <form onSubmit={handleOrder} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">{uiLabels.nameLabel}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={uiLabels.namePlaceholder}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">{uiLabels.phoneLabel}</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={uiLabels.phonePlaceholder}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 text-xs">{uiLabels.districtLabel}</label>
                  <select
                    name="district"
                    required
                    value={formData.district}
                    onChange={(e) => {
                      handleChange(e);
                      setFormData(prev => ({ ...prev, district: e.target.value, taluk: '' }));
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">{uiLabels.districtPlaceholder}</option>
                    {tamilNaduDistricts.map((dist) => (
                      <option key={dist.id} value={dist.name}>{dist.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 text-xs">{uiLabels.talukLabel}</label>
                  <select
                    name="taluk"
                    required
                    disabled={!formData.district}
                    value={formData.taluk}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none disabled:opacity-50"
                  >
                    <option value="">{uiLabels.talukPlaceholder}</option>
                    {tamilNaduDistricts
                      .find((d) => d.name === formData.district)
                      ?.taluks.map((t, idx) => (
                        <option key={idx} value={t}>{t}</option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 text-xs">{uiLabels.villageLabel}</label>
                <input
                  type="text"
                  name="village"
                  required
                  value={formData.village}
                  onChange={handleChange}
                  placeholder={uiLabels.villagePlaceholder}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 text-xs">{uiLabels.surveyNoLabel}</label>
                  <input
                    type="text"
                    name="surveyNo"
                    required
                    value={formData.surveyNo}
                    onChange={handleChange}
                    placeholder={uiLabels.surveyNoPlaceholder}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 text-xs">{uiLabels.subDivLabel}</label>
                  <input
                    type="text"
                    name="subDivision"
                    value={formData.subDivision}
                    onChange={handleChange}
                    placeholder={uiLabels.subDivPlaceholder}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitButtonText}
              </button>

              <p className="text-[10px] text-center text-slate-400">
                {uiLabels.securityNote}
              </p>
            </form>
          </div>

        </div>
      </div>

      {/* மாதிரி அறிக்கை பாப்-அப் மாடல் */}
      {showSample && (
        <div onClick={() => setShowSample(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm cursor-pointer">
          <div id="printable-audit-report" onClick={(e) => e.stopPropagation()} className="relative w-full max-w-xl bg-white text-slate-800 rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            
            {/* பொத்தான்கள் (அச்சில் தெரியாது) */}
            <div className="no-print absolute top-3 right-3 flex items-center gap-1.5 z-20">
              <button
                type="button"
                onClick={handlePrint}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow font-medium transition-all cursor-pointer"
                title="PDF பதிவிறக்கம் செய்க"
              >
                <span>📥</span> PDF டவுன்லோட்
              </button>
              <button
                type="button"
                onClick={() => setShowSample(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold px-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* சான்றிதழ் தலைப்பு */}
            <div className="flex items-center justify-between border-b pb-4 border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
                  360
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{sampleReport.brandName}</h3>
                  <p className="text-[11px] text-emerald-700 font-semibold">{sampleReport.deptName}</p>
                </div>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-bold border border-amber-300">
                {sampleReport.sampleBadge}
              </span>
            </div>

            {/* சான்றிதழ் விவரங்கள் */}
            <div className="relative my-4 space-y-3 text-xs text-slate-700">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 text-4xl sm:text-6xl font-black rotate-[-25deg] text-slate-900">
                NAMMABOOMI 360
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div><strong>வாடிக்கையாளர்:</strong> {sampleReport.client}</div>
                <div><strong>சரிபார்க்கப்பட்ட நிலம்:</strong> சர்வே எண்: {sampleReport.surveyNo}</div>
                <div><strong>மாவட்டம் / தாலுகா:</strong> {sampleReport.location}</div>
                <div><strong>சான்றிதழ் எண்:</strong> {sampleReport.certificateNo}</div>
              </div>

              {/* 8 அடுக்கு சோதனை முடிவுகள் */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mt-2">
                <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-900 text-xs">
                  {sampleReport.tableTitle}
                </div>
                <div className="divide-y divide-slate-200 text-xs">
                  {sampleReport.checklist?.map((item, idx) => (
                    <div key={idx} className="p-2 flex justify-between items-center">
                      <span className="text-slate-600">{item.step}</span>
                      <span className={`font-bold ${item.statusColor}`}>{item.result}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* பாதுகாப்பு மதிப்பீடு */}
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div>
                  <div className="text-xs font-bold text-emerald-900">{sampleReport.scoreTitle}</div>
                  <div className="text-[11px] text-emerald-700">{sampleReport.scoreDesc}</div>
                </div>
                <div className="text-xl font-black text-emerald-600">{sampleReport.scoreBadge}</div>
              </div>
            </div>

            {/* ஆர்டர் பொத்தான் (அச்சில் தெரியாது) */}
            <div className="no-print pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowSample(false);
                  document.getElementById('legal-audit-service')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
              >
                எனது நிலத்திற்கும் சரிபார்ப்பு செய்க (₹{config.priceDiscounted})
              </button>

              <p className="text-[9px] text-slate-400 text-center leading-tight mt-2">
                {sampleReport.disclaimer}
              </p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}