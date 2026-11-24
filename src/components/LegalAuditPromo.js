import React, { useState, useMemo } from 'react';
import auditConfigData from '../data/legalAuditData.json';
import { getWhatsAppUrl } from '../config';

const PETITION_TEMPLATES = [
  {
    id: 'patta_transfer',
    title: 'பட்டா பெயர் மாற்றம் / உட்பிரிவு மனு (Patta Transfer)',
    officer: 'வட்டாட்சியர் (Tahsildar) அவர்கள்',
    subject: 'பத்திரப் பதிவின் அடிப்படையில் பட்டா பெயர் மாற்றம் மற்றும் உட்பிரிவு செய்யக் கோருதல்'
  },
  {
    id: 'fmb_survey',
    title: 'நில அளவை & எல்லை நிர்ணய மனு (Land Survey / FMB)',
    officer: 'வட்டாட்சியர் / வட்ட நில அளவையர் (Taluk Surveyor) அவர்கள்',
    subject: 'எனது பட்டா நிலத்தை FMB வரைபடப்படி அளவீடு செய்து எல்லைக் கல் நட்டுத் தரக் கோருதல்'
  },
  {
    id: 'rti_2005',
    title: 'தகவல் அறியும் உரிமைச் சட்டம் (RTI Act 2005) மனு',
    officer: 'பொதுத் தகவல் அலுவலர் (Public Information Officer) அவர்கள்',
    subject: 'தகவல் அறியும் உரிமைச் சட்டம் 2005 பிரிவு 6(1)-ன் கீழ் அதிகாரப்பூர்வ தகவல் கோருதல்'
  },
  {
    id: 'eb_name_change',
    title: 'மின் இணைப்பு பெயர் மாற்றம் (TANGEDCO Name Transfer)',
    officer: 'உதவி செயற்பொறியாளர் (AE - TANGEDCO) அவர்கள்',
    subject: 'சொத்து விற்பனைப் பத்திரத்தின் அடிப்படையில் மின் இணைப்பு பெயர் மாற்றம் செய்யக் கோருதல்'
  },
  {
    id: 'legal_heir',
    title: 'வாரிசு சான்றிதழ் கோரும் மனு (Legal Heir Certificate)',
    officer: 'வட்டாட்சியர் (Tahsildar) அவர்கள்',
    subject: 'காலமான குடும்ப உறுப்பினருக்கு சட்டப்பூர்வ வாரிசு சான்றிதழ் வழங்கக் கோருதல்'
  },
  {
    id: 'consumer_notice',
    title: 'நுகர்வோர் குறைதீர் & சேவை குறைபாடு நோட்டீஸ் (Legal Notice)',
    officer: 'சம்பந்தப்பட்ட நிறுவனம் / சேவை வழங்குநர்',
    subject: 'சேவை குறைபாட்டிற்கு உரிய இழப்பீடு மற்றும் தீர்வு வழங்கக் கோரும் சட்ட அறிவிப்பு'
  }
];

const GOVT_LEGAL_PORTALS = [
  {
    code: 'TNREGINET',
    name: 'தமிழ்நாடு பத்திரப் பதிவு & வில்லங்கச் சான்று (EC) தளம்',
    tag: 'இலவச EC & வழிகாட்டி மதிப்பு',
    url: 'https://tnreginet.gov.in/'
  },
  {
    code: 'TAMIL NILAM',
    name: 'பட்டா / சிட்டா / A-பதிவேடு & FMB வரைபடத் தளம்',
    tag: 'வருவாய்த் துறை நில ஆவணங்கள்',
    url: 'https://eservices.tn.gov.in/eservicesnew/home.html'
  },
  {
    code: 'e-DISTRICT TN',
    name: 'வருமானம், சாதி, இருப்பிடம் & வாரிசு சான்றிதழ் தளம்',
    tag: 'தமிழ்நாடு அரசு இ-சேவை',
    url: 'https://edistricts.tn.gov.in/'
  },
  {
    code: 'e-COURTS INDIA',
    name: 'நீதிமன்ற வழக்கு நிலை & தீர்ப்பு நகல் தேடல் (Case Status)',
    tag: 'மாவட்ட & உயர் நீதிமன்றங்கள்',
    url: 'https://services.ecourts.gov.in/'
  },
  {
    code: 'RTI ONLINE',
    name: 'மத்திய & மாநில தகவல் அறியும் உரிமை (RTI) விண்ணப்பம்',
    tag: 'வெளிப்படைத்தன்மை சட்டம் 2005',
    url: 'https://rtionline.gov.in/'
  },
  {
    code: 'NALSA / TNSLSA',
    name: 'தமிழ்நாடு மாநில இலவச சட்ட உதவி ஆணையம் (Free Legal Aid)',
    tag: '100% இலவச வழக்கறிஞர் உதவி',
    url: 'https://www.tnslsa.org/'
  },
  {
    code: 'TNRERA',
    name: 'தமிழ்நாடு ரியல் எஸ்டேட் ஒழுங்குமுறை ஆணையம் (DTCP/CMDA)',
    tag: 'அங்கீகரிக்கப்பட்ட மனைகள் சரிபார்ப்பு',
    url: 'https://rera.tn.gov.in/'
  },
  {
    code: 'CONSUMER HELPLINE',
    name: 'தேசிய நுகர்வோர் குறைதீர் தளம் (1915 Helpline)',
    tag: 'நுகர்வோர் உரிமைப் பாதுகாப்பு',
    url: 'https://consumerhelpline.gov.in/'
  }
];

export default function LegalAuditPromo() {
  const {
    config = {},
    uiLabels = {},
    features = [],
    sampleReport = {},
    tamilNaduDistricts = []
  } = auditConfigData;

  const [activeTab, setActiveTab] = useState('audit'); // 'audit' | 'petition_studio' | 'stamp_calc' | 'legal_portals'
  const [showSample, setShowSample] = useState(false);

  // 1. நில ஆவண தணிக்கை படிவம்
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    taluk: '',
    village: '',
    surveyNo: '',
    subDivision: ''
  });

  // 2. AI அரசு மனு & சட்ட ஆவண ஸ்டுடியோ
  const [selectedPetitionId, setSelectedPetitionId] = useState(PETITION_TEMPLATES[0].id);
  const [petitionForm, setPetitionForm] = useState({
    applicantName: '',
    fatherOrSpouse: '',
    address: '',
    district: 'செங்கல்பட்டு',
    taluk: 'திருப்போரூர்',
    surveyOrRef: '',
    customNote: ''
  });
  const [aiPolishedParagraph, setAiPolishedParagraph] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // 3. பத்திரப் பதிவு & முத்திரைத் தாள் கட்டணக் கணிப்பான்
  const [deedType, setDeedType] = useState('sale'); // 'sale' | 'family_settlement' | 'gift_others' | 'release_family'
  const [propertyValue, setPropertyValue] = useState(1500000);

  const activePetition = useMemo(() => {
    return PETITION_TEMPLATES.find((p) => p.id === selectedPetitionId) || PETITION_TEMPLATES[0];
  }, [selectedPetitionId]);

  const stampDutyStats = useMemo(() => {
    const val = Number(propertyValue) || 0;
    let stampDuty = 0;
    let regFee = 0;
    let note = '';

    if (deedType === 'sale') {
      stampDuty = Math.round(val * 0.07); // 7% முத்திரைத் தாள் கட்டணம்
      regFee = Math.round(val * 0.02); // 2% பதிவுக் கட்டணம்
      note = 'விற்பனைப் பத்திரம் (Sale Deed): 7% Stamp Duty + 2% Registration Fee';
    } else if (deedType === 'family_settlement') {
      stampDuty = Math.min(25000, Math.round(val * 0.01)); // 1% அதிகபட்சம் ₹25,000
      regFee = Math.min(4000, Math.round(val * 0.01)); // 1% அதிகபட்சம் ₹4,000
      note = 'குடும்ப உறுப்பினர்களுக்குள் தான செட்டில்மென்ட்: அதிகபட்ச உச்சவரம்பு ₹25,000 + ₹4,000';
    } else if (deedType === 'release_family') {
      stampDuty = Math.min(25000, Math.round(val * 0.01));
      regFee = Math.min(4000, Math.round(val * 0.01));
      note = 'குடும்ப பாகப்பிரிவினை / விடுதலைப் பத்திரம் (Release Deed within Family)';
    } else {
      stampDuty = Math.round(val * 0.07);
      regFee = Math.round(val * 0.02);
      note = 'குடும்பத்திற்கு வெளியே தானப் பத்திரம் (Gift Deed to Non-Family)';
    }

    return { stampDuty, regFee, total: stampDuty + regFee, note };
  }, [deedType, propertyValue]);

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
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || 'பெயர் குறிப்பிடவில்லை',
          phone: formData.phone,
          location: `${formData.district}, ${formData.taluk}, ${formData.village}`,
          surveyNo: `${formData.surveyNo}/${formData.subDivision || 'முழு எண்'}`
        })
      });
    } catch (err) {
      console.error('Sheet saving error:', err);
    }

    const message = `வணக்கம் நம்ம பூமி 360! 🛡️\n\nஎனது நிலத்திற்கான ₹${config.priceDiscounted} டிஜிட்டல் ஆவண தணிக்கை பெற விரும்புகிறேன்.\n\n👤 பெயர்: ${formData.name}\n📞 எண்: ${formData.phone}\n📍 இடம்: ${formData.district}, ${formData.taluk}, ${formData.village}\n📑 சர்வே எண்: ${formData.surveyNo}/${formData.subDivision}`;

    window.open(getWhatsAppUrl(message, config.adminWhatsApp), '_blank');
  };

  // AI சட்ட மனு வாசகம் உருவாக்கி
  const handleGenerateLegalDraft = async () => {
    setIsAiLoading(true);
    setAiPolishedParagraph('');
    try {
      const res = await fetch('/api/polish-petition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: {
            applicantName: petitionForm.applicantName || 'மனுதாரர்',
            taluk: petitionForm.taluk,
            district: petitionForm.district,
            subject: `${activePetition.subject} (ஆவண/சர்வே எண்: ${petitionForm.surveyOrRef || '-'})`
          },
          selectedForm: activePetition.title,
          applicationMode: 'legal',
          customNote: petitionForm.customNote
        })
      });
      const data = await res.json();
      if (data.polishedText) {
        setAiPolishedParagraph(data.polishedText);
      }
    } catch (err) {
      console.error('AI Legal Petition Error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // சுத்தமாக 1 பக்கம் மட்டும் அச்சிட புதிய விண்டோ முறை (மாதிரி அறிக்கை & மனு இரண்டிற்கும்)
  const handlePrintElement = (elementId, docTitle) => {
    const printContent = document.getElementById(elementId);
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=800,height=900');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${docTitle}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { size: A4 portrait; margin: 12mm; }
            body { font-family: sans-serif; background: #ffffff; color: #0f172a; padding: 0; margin: 0; }
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
    <section className="py-6 px-2 sm:px-4 max-w-6xl mx-auto text-left space-y-6" id="legal-audit-service">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border border-emerald-500/30 p-5 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* 4-பிரிவு 360° சட்ட நேவிகேஷன் டேப்கள் */}
        <div className="relative z-10 flex flex-wrap gap-2 pb-6 mb-6 border-b border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                : 'bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700'
            }`}
          >
            🛡️ 1. ₹{config.priceDiscounted} நில ஆவண தணிக்கை (8-Layer Audit)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('petition_studio')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'petition_studio'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
                : 'bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700'
            }`}
          >
            📝 2. AI அரசு மனு & RTI உருவாக்கி (A4 PDF)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stamp_calc')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'stamp_calc'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/50'
                : 'bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700'
            }`}
          >
            🧮 3. பத்திரப் பதிவு & முத்திரைத் தாள் கணிப்பான்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('legal_portals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'legal_portals'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50'
                : 'bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700'
            }`}
          >
            🏛️ 4. TNREGINET, பட்டா & சட்ட போர்ட்டல்கள் (8)
          </button>
        </div>

        {/* TAB 1: ₹499 டிஜிட்டல் நில ஆவண தணிக்கை (உங்கள் முழுமையான original கோடு) */}
        {activeTab === 'audit' && (
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
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs text-slate-200 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50"
                  >
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
                        setFormData((prev) => ({ ...prev, district: e.target.value, taluk: '' }));
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="">{uiLabels.districtPlaceholder}</option>
                      {tamilNaduDistricts.map((dist) => (
                        <option key={dist.id} value={dist.name}>
                          {dist.name}
                        </option>
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
                          <option key={idx} value={t}>
                            {t}
                          </option>
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

                <p className="text-[10px] text-center text-slate-400">{uiLabels.securityNote}</p>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: AI அரசு மனு & RTI சட்ட ஆவண உருவாக்கி */}
        {activeTab === 'petition_studio' && (
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-slate-950/90 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <h3 className="text-sm font-bold text-indigo-300">
                📝 1. அரசு மனு / RTI / சட்ட நோட்டீஸ் விவரங்கள்
              </h3>
              <div>
                <label className="text-slate-300 block mb-1">மனு வகையைத் தேர்ந்தெடுக்கவும்:</label>
                <select
                  value={selectedPetitionId}
                  onChange={(e) => {
                    setSelectedPetitionId(e.target.value);
                    setAiPolishedParagraph('');
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  {PETITION_TEMPLATES.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">மனுதாரர் பெயர்:</label>
                  <input
                    type="text"
                    placeholder="உங்கள் பெயர்"
                    value={petitionForm.applicantName}
                    onChange={(e) => setPetitionForm({ ...petitionForm, applicantName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">தந்தை / கணவர் பெயர்:</label>
                  <input
                    type="text"
                    placeholder="தந்தை / கணவர் பெயர்"
                    value={petitionForm.fatherOrSpouse}
                    onChange={(e) => setPetitionForm({ ...petitionForm, fatherOrSpouse: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">தாலுகா:</label>
                  <input
                    type="text"
                    value={petitionForm.taluk}
                    onChange={(e) => setPetitionForm({ ...petitionForm, taluk: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">மாவட்டம்:</label>
                  <input
                    type="text"
                    value={petitionForm.district}
                    onChange={(e) => setPetitionForm({ ...petitionForm, district: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">சர்வே எண் / பத்திர எண் / EB எண்:</label>
                <input
                  type="text"
                  placeholder="எ.கா: சர்வே எண் 124/2B, பத்திர எண் 3450/2024"
                  value={petitionForm.surveyOrRef}
                  onChange={(e) => setPetitionForm({ ...petitionForm, surveyOrRef: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">உங்கள் சூழ்நிலை / கூடுதல் குறிப்பு:</label>
                <textarea
                  rows={2}
                  placeholder="எ.கா: 3 மாதங்களுக்கு முன் ஆன்லைனில் விண்ணப்பித்தும் இன்னும் நடவடிக்கை எடுக்கப்படவில்லை..."
                  value={petitionForm.customNote}
                  onChange={(e) => setPetitionForm({ ...petitionForm, customNote: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <button
                type="button"
                onClick={handleGenerateLegalDraft}
                disabled={isAiLoading}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg cursor-pointer"
              >
                {isAiLoading ? 'AI சட்ட வாசகம் தயாராகிறது... ⚡' : '✨ AI அதிகாரப்பூர்வ சட்ட வாசகம் சேர்'}
              </button>
            </div>

            {/* A4 Petition Preview & Print */}
            <div className="lg:col-span-7 bg-white text-slate-900 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-4">
              <div id="printable-legal-petition" className="space-y-3 text-xs leading-relaxed">
                <div className="text-right text-[11px] text-slate-600">
                  தேதி: {new Date().toLocaleDateString('ta-IN')}
                </div>

                <div>
                  <strong className="block">அனுப்புநர்:</strong>
                  <div>{petitionForm.applicantName || '[மனுதாரர் பெயர்]'},</div>
                  {petitionForm.fatherOrSpouse && <div>த/பெ (அ) க/பெ: {petitionForm.fatherOrSpouse},</div>}
                  <div>
                    {petitionForm.taluk}, {petitionForm.district} மாவட்டம்.
                  </div>
                </div>

                <div>
                  <strong className="block">பெறுநர்:</strong>
                  <div>உயர்திரு {activePetition.officer},</div>
                  <div>
                    {petitionForm.taluk}, {petitionForm.district} மாவட்டம்.
                  </div>
                </div>

                <div className="pt-1">
                  <strong>பொருள்:</strong> {activePetition.subject}{' '}
                  {petitionForm.surveyOrRef ? `(${petitionForm.surveyOrRef})` : ''} — தொடர்பாக.
                </div>

                <div>மதிப்பிற்குரிய ஐயா / அம்மா,</div>

                <p>
                  வணக்கம். மேற்கண்ட முகவரியில் வசித்து வரும் நான், எனது{' '}
                  <strong>{petitionForm.surveyOrRef || '[ஆவண / சர்வே விவரம்]'}</strong> தொடர்பாக உரிய அரசு
                  நடவடிக்கை எடுக்குமாறு பணிவுடன் கேட்டுக்கொள்கிறேன்.
                </p>

                {aiPolishedParagraph ? (
                  <p className="whitespace-pre-line">{aiPolishedParagraph}</p>
                ) : (
                  <p className="text-slate-600 italic">
                    (இடதுபுறம் உள்ள &quot;✨ AI அதிகாரப்பூர்வ சட்ட வாசகம் சேர்&quot; பொத்தானை அழுத்தினால், உரிய அரசு
                    விதிகளின்படியான சட்டக் கோரிக்கைப் பத்தி இங்கே தானாக இணையும்.)
                  </p>
                )}

                <p>
                  ஆகவே, தாங்கள் எனது மனுவையும் இணைக்கப்பட்டுள்ள ஆவண நகல்களையும் பரிசீலித்து, காலதாமதமின்றி உரிய
                  உத்தரவு பிறப்பிக்குமாறு தாழ்மையுடன் கேட்டுக்கொள்கிறேன்.
                </p>

                <div className="pt-4 flex justify-between items-end">
                  <div>
                    <div>இடம்: {petitionForm.taluk}</div>
                    <div>இணைப்பு: ஆதார், பத்திரம் & பட்டா நகல்கள்</div>
                  </div>
                  <div className="text-center">
                    <div>இப்படிக்கு,</div>
                    <div className="font-bold mt-4">({petitionForm.applicantName || 'மனுதாரர் கையொப்பம்'})</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex gap-2">
                <button
                  type="button"
                  onClick={() => handlePrintElement('printable-legal-petition', activePetition.title)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer"
                >
                  🖨️ A4 PDF மனுவாக பிரிண்ட் எடு
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: தமிழ்நாடு பத்திரப் பதிவு & முத்திரைத் தாள் கட்டணக் கணிப்பான் */}
        {activeTab === 'stamp_calc' && (
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 bg-slate-950/90 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-amber-400">
                🧮 தமிழ்நாடு பத்திரப் பதிவு & முத்திரைத் தாள் கட்டணக் கணிப்பான்
              </h3>
              <div>
                <label className="text-slate-300 block mb-1">பத்திரத்தின் வகை (Deed Type):</label>
                <select
                  value={deedType}
                  onChange={(e) => setDeedType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="sale">விற்பனைப் பத்திரம் (Sale Deed — 7% + 2%)</option>
                  <option value="family_settlement">குடும்ப உறுப்பினர்களுக்குள் தான செட்டில்மென்ட் (1% Cap ₹25k+₹4k)</option>
                  <option value="release_family">குடும்ப விடுதலை / பாகப்பிரிவினைப் பத்திரம் (Release Deed)</option>
                  <option value="gift_others">குடும்பத்திற்கு வெளியே தானப் பத்திரம் (Gift Deed — 7% + 2%)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">சொத்தின் வழிகாட்டி / சந்தை மதிப்பு (₹):</label>
                <input
                  type="number"
                  step={50000}
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold text-sm"
                />
              </div>
              <p className="text-[11px] text-slate-400">{stampDutyStats.note}</p>
            </div>

            <div className="lg:col-span-6 bg-slate-950/90 p-5 rounded-2xl border border-amber-500/30 space-y-3 text-xs">
              <span className="text-xs font-bold text-amber-400">அரசு பத்திரப் பதிவுக் கட்டண விவரம்</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">முத்திரைத் தாள் (Stamp Duty):</span>
                  <span className="text-base font-black text-white">
                    ₹{stampDutyStats.stampDuty.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">பதிவுக் கட்டணம் (Reg Fee):</span>
                  <span className="text-base font-black text-blue-300">
                    ₹{stampDutyStats.regFee.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/30">
                  <span className="text-emerald-400 block text-[10px]">மொத்த அரசு கட்டணம்:</span>
                  <span className="text-lg font-black text-emerald-400">
                    ₹{stampDutyStats.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 8 தமிழ்நாடு & மத்திய அரசு சட்டப் போர்ட்டல்கள் */}
        {activeTab === 'legal_portals' && (
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {GOVT_LEGAL_PORTALS.map((portal) => (
              <div
                key={portal.url}
                className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 hover:border-blue-500/40 flex flex-col justify-between space-y-3 transition"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30 inline-block">
                    {portal.code}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-snug">{portal.name}</h4>
                  <p className="text-[11px] text-emerald-400">{portal.tag}</p>
                </div>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold text-center transition"
                >
                  தளம் செல்ல ↗
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* மாதிரி அறிக்கை பாப்-அப் மாடல் (Original Sample Audit Modal) */}
      {showSample && (
        <div
          onClick={() => setShowSample(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm cursor-pointer"
        >
          <div
            id="printable-audit-report"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-white text-slate-800 rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
          >
            {/* பொத்தான்கள் (அச்சில் தெரியாது) */}
            <div className="no-print absolute top-3 right-3 flex items-center gap-1.5 z-20">
              <button
                type="button"
                onClick={() =>
                  handlePrintElement('printable-audit-report', `${sampleReport.brandName || 'நம்ம பூமி 360'} - மாதிரி அறிக்கை`)
                }
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
                <div>
                  <strong>வாடிக்கையாளர்:</strong> {sampleReport.client}
                </div>
                <div>
                  <strong>சரிபார்க்கப்பட்ட நிலம்:</strong> சர்வே எண்: {sampleReport.surveyNo}
                </div>
                <div>
                  <strong>மாவட்டம் / தாலுகா:</strong> {sampleReport.location}
                </div>
                <div>
                  <strong>சான்றிதழ் எண்:</strong> {sampleReport.certificateNo}
                </div>
              </div>

              {/* 8 அடுக்கு சோதனை முடிவுகள் */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mt-2">
                <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-900 text-xs">{sampleReport.tableTitle}</div>
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

              <p className="text-[9px] text-slate-400 text-center leading-tight mt-2">{sampleReport.disclaimer}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}