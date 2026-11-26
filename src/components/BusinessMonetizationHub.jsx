import React, { useState } from 'react';
import { Crown, Megaphone, Handshake, MapPin, TrendingUp, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function BusinessMonetizationHub() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantDistrict, setApplicantDistrict] = useState('காஞ்சிபுரம்');

  const plans = [
    {
      id: 'ads',
      icon: <Megaphone className="w-6 h-6 text-amber-400" />,
      badge: 'LOCAL ADS',
      title: '📢 மாவட்ட விளம்பர பேனர்',
      price: '₹499 / மாதம்',
      desc: 'ரியல் எஸ்டேட் மனைப் பிரிவுகள் & உள்ளூர் கடைகளை உங்கள் மாவட்டப் பயனர்கள் முன் முதலில் காட்டுங்கள்.',
      features: [
        'முகப்புப் பக்க Top Featured Banner இடம்',
        'நேரடி WhatsApp & Call பட்டன் இணைப்பு',
        '38 மாவட்ட வாரியான இலக்கு விளம்பரம்'
      ],
      cta: 'விளம்பரம் பதிவு செய்க'
    },
    {
      id: 'pro',
      icon: <Crown className="w-6 h-6 text-emerald-400" />,
      badge: 'MOST POPULAR',
      title: '💳 நம்ம பூமி Pro மெம்பர்ஷிப்',
      price: '₹999 / வருடம்',
      desc: 'ஏஜென்ட்கள் & சிறு வணிகர்களுக்கான முழுமையான டிஜிட்டல் பிசினஸ் பேக்கேஜ் (மாதம் வெறும் ₹83).',
      features: [
        'வாட்டர்மார்க் இல்லாத HD போஸ்டர் & Visiting Card',
        'வரம்பற்ற GST இன்வாய்ஸ் & கொட்டேஷன் PDF',
        'நிலம் வாங்க/விற்க விரும்பும் நேரடி Customer Leads'
      ],
      cta: 'Pro சந்தாவில் இணைக'
    },
    {
      id: 'franchise',
      icon: <MapPin className="w-6 h-6 text-sky-400" />,
      badge: 'TALUK PARTNER',
      title: '🏢 Founding தாலுகா பார்ட்னர் உரிமம்',
      price: '₹2,999 / வாழ்நாள்',
      desc: 'உங்கள் தாலுகாவின் அதிகாரப்பூர்வ "நம்ம பூமி 360°" பிரதிநிதியாகி முதல் மாதம் 75% & தொடர் 50% வருமானப் பங்கு பெறுங்கள்.',
      features: [
        'ஒரு தாலுகாவுக்கு ஒருவர் மட்டுமே Exclusive உரிமம் & ID',
        'உங்கள் தாலுகா விளம்பர வருமானத்தில் 50%–75% பங்கு',
        'ரியல் எஸ்டேட் & கடன் லீட்களில் 1%–2% நேரடி கமிஷன்'
      ],
      cta: 'தாலுகா பார்ட்னராக விண்ணப்பிக்க'
    }
  ];

  const handleApplyWhatsApp = (e) => {
    e.preventDefault();
    const activePlan = plans.find((p) => p.id === selectedPlan);
    const msg = `🚀 *நம்ம பூமி 360° பிசினஸ் & பார்ட்னர் விண்ணப்பம்*\n\n📌 *தேர்ந்தெடுத்த திட்டம்:* ${activePlan.title} (${activePlan.price})\n👤 *பெயர்:* ${applicantName || 'குறிப்பிடவில்லை'}\n📞 *தொலைபேசி:* ${applicantPhone || 'குறிப்பிடவில்லை'}\n📍 *மாவட்டம்:* ${applicantDistrict}\n\nவணக்கம் பார்ட்னர்! நான் இந்தத் திட்டத்தில் இணைய விரும்புகிறேன். மேல் விவரங்கள் அனுப்பவும்.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 my-6 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 rounded-3xl border border-emerald-800/50 text-white shadow-2xl">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-extrabold px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" /> NAMMA BOOMI 360° PARTNER & BUSINESS HUB
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold mt-3 bg-gradient-to-r from-white via-emerald-200 to-amber-300 bg-clip-text text-transparent">
          உங்கள் தொழிலை 38 மாவட்டங்களுக்கும் கொண்டு செல்லுங்கள்
        </h2>
        <p className="text-slate-300 text-xs md:text-sm mt-2">
          விளம்பரம், Pro வணிகக் கருவிகள், ரியல் எஸ்டேட் ரெஃபரல் மற்றும் தாலுகா பார்ட்னர் உரிமம் மூலம் நிலையான வருமானம் ஈட்டுங்கள்.
        </p>
      </div>

      {/* 3 Core Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => {
                if (plan.id === 'franchise') {
                  window.location.href = '/partner-apply';
                } else {
                  setSelectedPlan(plan.id);
                }
              }}
              className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-900/40 border-amber-400 shadow-lg shadow-amber-500/10 scale-[1.01]'
                  : 'bg-white/5 border-white/10 hover:border-emerald-500/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-white/10">{plan.icon}</div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900">
                    {plan.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{plan.title}</h3>
                <p className="text-2xl font-extrabold text-amber-300 mt-1">{plan.price}</p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{plan.desc}</p>

                <ul className="mt-4 space-y-2 border-t border-white/10 pt-3">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (plan.id === 'franchise') {
                    window.location.href = '/partner-apply';
                  } else {
                    setSelectedPlan(plan.id);
                  }
                }}
                className={`mt-5 w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                  plan.id === 'franchise'
                    ? 'bg-gradient-to-r from-sky-400 to-emerald-400 text-slate-950 hover:opacity-95 shadow-md'
                    : isSelected
                    ? 'bg-amber-400 text-slate-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick Lead / Registration Bar */}
      <form
        onSubmit={handleApplyWhatsApp}
        className="bg-slate-900/90 border border-emerald-700/50 rounded-2xl p-4 md:p-5 grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
      >
        <div>
          <label className="block text-[11px] font-bold text-emerald-300 mb-1">உங்கள் பெயர் / நிறுவனம்</label>
          <input
            type="text"
            required
            placeholder="எ.கா: எஸ். உதயகுமார்"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-emerald-300 mb-1">WhatsApp எண்</label>
          <input
            type="tel"
            required
            placeholder="98400 XXXXX"
            value={applicantPhone}
            onChange={(e) => setApplicantPhone(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-emerald-300 mb-1">உங்கள் மாவட்டம்</label>
          <input
            type="text"
            placeholder="காஞ்சிபுரம் / சென்னை / மதுரை..."
            value={applicantDistrict}
            onChange={(e) => setApplicantDistrict(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg transition"
        >
          <Handshake className="w-4 h-4" /> உடனே இணைந்து தொடங்குக
        </button>
      </form>

      {/* Bottom Trust & Commission Strip */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> ரியல் எஸ்டேட் & கடன் லீட்களுக்கு 1%–2% நேரடி ரெஃபரல் கமிஷன்
        </span>
        <span>•</span>
        <span>பத்திரப்பதிவு & லீகல் ஆடிட் சேவை (₹499)</span>
        <span>•</span>
        <span>Google AdSense & SEO Ready Architecture</span>
      </div>
    </section>
  );
}