import React, { useState, useEffect } from 'react';

const TAMIL_NADU_DISTRICTS = [
  'அரியலூர்', 'செங்கல்பட்டு', 'சென்னை', 'கோயம்புத்தூர்', 'கடலூர்', 
  'தருமபுரி', 'திண்டுக்கல்', 'ஈரோடு', 'கள்ளக்குறிச்சி', 'காஞ்சிபுரம்', 
  'கன்னியாகுமரி', 'கரூர்', 'கிருஷ்ணகிரி', 'மதுரை', 'மயிலாடுதுறை', 
  'நாகப்பட்டினம்', 'நாமக்கல்', 'நீலகிரி', 'பெரம்பலூர்', 'புதுக்கோட்டை', 
  'ராமநாதபுரம்', 'ராணிப்பேட்டை', 'சேலம்', 'சிவகங்கை', 'தென்காசி', 
  'தஞ்சாவூர்', 'தேனி', 'தூத்துக்குடி', 'திருச்சிராப்பள்ளி', 'திருநெல்வேலி', 
  'திருப்பத்தூர்', 'திருப்பூர்', 'திருவள்ளூர்', 'திருவண்ணாமலை', 'திருவாரூர்', 
  'வேலூர்', 'விழுப்புரம்', 'விருதுநகர்'
];

const MODULE_OPTIONS = [
  { key: 'realestate', label: 'பூமி & நிலம் (Real Estate)', icon: '🏡' },
  { key: 'finance', label: 'நிதி & கடன்கள் (Finance)', icon: '💰' },
  { key: 'insurance', label: 'காப்பீடு (Insurance)', icon: '🛡️' },
  { key: 'agriculture', label: 'விவசாயம் (Agriculture)', icon: '🌾' },
  { key: 'education', label: 'கல்வி & படிப்பு (Education)', icon: '🎓' },
  { key: 'jobs', label: 'வேலைவாய்ப்பு (Jobs)', icon: '💼' },
  { key: 'business', label: 'தொழில் & MSME', icon: '🏭' },
  { key: 'wholesale', label: 'மொத்த விற்பனை (Wholesale)', icon: '📦' },
  { key: 'spiritual', label: 'ஆன்மீகம் (Spiritual)', icon: '🛕' },
  { key: 'tourism', label: 'சுற்றுலா (Tourism)', icon: '🚗' },
  { key: 'astro', label: 'AI ஜோதிடம் (Astrology)', icon: '🔮' },
  { key: 'heritage', label: 'தமிழர் மரபு (Tamil Heritage)', icon: '🏛️' }
];

const QUICK_TEMPLATES = {
  realestate: [
    { title: 'உடனடி விற்பனைக்கு DTCP மனை / விவசாய பூமி', desc: 'தெளிவான தாய் பத்திரம், பட்டா மாறுதல் உடனடி வசதி, தார் சாலை மற்றும் குடிநீர் வசதியுடன் கூடிய சிறந்த இடம்.' },
    { title: 'மெயின் ரோடு வணிக இடம் / தனி வீடு வாடகைக்கு', desc: 'அனைத்து அடிப்படை வசதிகளுடன் கூடிய வணிக பயன்பாட்டிற்கான கட்டடம் வாடகை மற்றும் குத்தகைக்கு உண்டு.' }
  ],
  finance: [
    { title: 'குறைந்த வட்டியில் MSME மற்றும் சிறுதொழில் கடன்', desc: 'அரசு மானியக் கடன்கள், முத்ரா திட்டம் மற்றும் தொழில் விரிவாக்கத்திற்கான துரித கடன் ஏற்பாடுகள்.' },
    { title: 'வங்கி கடன் திட்ட அறிக்கை (DPR) தயாரிப்பு சேவை', desc: 'அனைத்து வங்கிகளாலும் அங்கீகரிக்கப்படும் முறையான திட்ட அறிக்கை 24 மணி நேரத்தில் தயார் செய்து தரப்படும்.' }
  ],
  insurance: [
    { title: 'முழு குடும்பத்திற்கான மருத்துவ மற்றும் ஆயுள் காப்பீடு', desc: 'குறைந்த பிரீமியத்தில் அதிக பணமில்லா மருத்துவ கவரேஜ்; உடனடி கிளைம் உதவி மற்றும் ஆலோசனைகள்.' }
  ],
  agriculture: [
    { title: 'தரமான இயற்கை உரம் மற்றும் பண்ணை விளைபொருட்கள்', desc: 'ஆர்கானிக் முறையில் விளைவிக்கப்பட்ட பொருட்கள், மண்புழு உரம் மற்றும் மாட்டுச் சாணம் மொத்த விலையில் கிடைக்கும்.' },
    { title: 'டிராக்டர் மற்றும் நவீன உழவு உபகரணங்கள் வாடகைக்கு', desc: 'விவசாயப் பணிகளுக்கு அனுபவம் வாய்ந்த ஓட்டுநர்களுடன் உழவு இயந்திரங்கள் நியாயமான வாடகைக்குக் கிடைக்கும்.' }
  ],
  education: [
    { title: 'அரசுத் தேர்வுகள் மற்றும் கணினிப் பயிற்சி நேரடி வகுப்புகள்', desc: 'அனுபவமிக்க ஆசிரியர்களால் எளிய முறையில் பாடத்திட்டம் மற்றும் வாராந்திர மாதிரித் தேர்வுகள் நடத்தப்படும்.' }
  ],
  jobs: [
    { title: 'அலுவலகப் பணிக்கு ஆண் / பெண் பணியாளர்கள் தேவை', desc: 'தகுதிக்கேற்ற சிறந்த மாத ஊதியம், உணவு மற்றும் இருப்பிட வசதிகளுடன் கூடிய உடனடி வேலைவாய்ப்பு.' }
  ],
  business: [
    { title: 'தொழில் கூட்டாண்மை / உற்பத்திக்கான இயந்திரங்கள் விற்பனை', desc: 'புதிய தொழில் தொடங்குவதற்கான இயந்திரங்கள், ஜிஎஸ்டி பதிவு மற்றும் தொழில் உரிம ஆலோசனைகள்.' }
  ],
  wholesale: [
    { title: 'மொத்த விற்பனை: ஆலை நேரடி கொள்முதல் விலை', desc: 'தரமான வணிகப் பொருட்கள் குறைந்தபட்ச ஆர்டரில் தமிழ்நாடு முழுவதும் பாதுகாப்பாக டோர் டெலிவரி செய்யப்படும்.' }
  ],
  spiritual: [
    { title: 'இல்ல விசேஷங்களுக்கான வாஸ்து, ஹோமம் & வேத பூஜைகள்', desc: 'முறைப்படி பூஜைப் பொருட்கள் மற்றும் அனுபவமிக்க புரோகிதர்கள் மூலம் பூஜைகள் சிறப்பாகச் செய்து தரப்படும்.' }
  ],
  tourism: [
    { title: 'பாதுகாப்பான டூர் பேக்கேஜ் & கால் டாக்ஸி சேவை', desc: 'தமிழ்நாடு முழுவதும் அனுபவமிக்க ஓட்டுநர்களுடன் நியாயமான கி.மீ வாடகைக் கட்டணத்தில் சிறந்த வாகன சேவை.' }
  ],
  astro: [
    { title: 'துல்லியமான ஜாதகக் கணிப்பு மற்றும் எளிய பரிகாரங்கள்', desc: 'பாரம்பரிய முறைப்படி திருமணப் பொருத்தம், வாஸ்து ஆலோசனைகள் மற்றும் பெயர் எண் கணிதம் சிறந்த முறையில் பார்க்கப்படும்.' }
  ],
  heritage: [
    { title: 'பாரம்பரிய கைவினைப் பொருட்கள் & நாட்டு விதைகள்', desc: 'மரபு மாறாத கைவினை அழகுப் பொருட்கள் மற்றும் ஆரோக்கியமான பாரம்பரிய உணவு, மருத்துவப் பொருட்கள்.' }
  ]
};

export default function PostAdModal({ isOpen, onClose, currentDistrict = 'செங்கல்பட்டு', defaultModule = 'agriculture' }) {
  const [formData, setFormData] = useState({
    module_key: defaultModule,
    district: (!currentDistrict || currentDistrict === 'அனைத்தும்') ? 'செங்கல்பட்டு' : currentDistrict,
    taluk: '',
    pincode: '',
    business_name: '',
    contact_person: '',
    phone_number: '',
    whatsapp_number: '',
    ad_title: '',
    ad_description: '',
    location_address: '',
    ad_tier: 'basic'
  });

  const [moduleFields, setModuleFields] = useState({
    subCategory: '',
    priceOrSalary: '',
    unitOrRole: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        module_key: defaultModule || 'agriculture',
        district: (!currentDistrict || currentDistrict === 'அனைத்தும்') ? 'செங்கல்பட்டு' : currentDistrict
      }));
    }
  }, [defaultModule, currentDistrict, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModuleFieldChange = (e) => {
    setModuleFields({ ...moduleFields, [e.target.name]: e.target.value });
  };

  const applyTemplate = (tmpl) => {
    setFormData(prev => ({
      ...prev,
      ad_title: tmpl.title,
      ad_description: tmpl.desc
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      ...formData,
      extra_details: moduleFields
    };

    try {
      const res = await fetch('/api/module-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'விளம்பரம் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!' });
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.error || 'பதிவு செய்வதில் பிழை ஏற்பட்டது.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'இணைப்பில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.' });
    } finally {
      setLoading(false);
    }
  };

  const renderDynamicFields = () => {
    switch (formData.module_key) {
      case 'realestate':
        return (
          <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-3">
            <span className="text-[11px] font-bold text-amber-400 block">🏡 பூமி & நிலம் பிரத்யேக விவரங்கள்:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block mb-1 text-slate-300">சொத்து வகை</label>
                <select
                  name="subCategory"
                  value={moduleFields.subCategory}
                  onChange={handleModuleFieldChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="">தேர்வு செய்க</option>
                  <option value="விவசாய பூமி">விவசாய பூமி</option>
                  <option value="DTCP மனை">DTCP மனை</option>
                  <option value="தனி வீடு / வில்லா">தனி வீடு / வில்லா</option>
                  <option value="வணிக இடம் / கடை">வணிக இடம் / கடை</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-slate-300">பரப்பளவு / அளவு</label>
                <input
                  type="text"
                  name="unitOrRole"
                  value={moduleFields.unitOrRole}
                  onChange={handleModuleFieldChange}
                  placeholder="எ.கா: 1200 ச.அடி / 2 ஏக்கர்"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-300">எதிர்பார்க்கும் விலை</label>
                <input
                  type="text"
                  name="priceOrSalary"
                  value={moduleFields.priceOrSalary}
                  onChange={handleModuleFieldChange}
                  placeholder="எ.கா: ₹25 லட்சம்"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        );

      case 'finance':
        return (
          <div className="p-3 bg-blue-950/20 border border-blue-500/30 rounded-xl space-y-3">
            <span className="text-[11px] font-bold text-blue-400 block">💰 நிதி & கடன்கள் பிரத்யேக விவரங்கள்:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block mb-1 text-slate-300">கடன் / நிதிச் சேவை</label>
                <select
                  name="subCategory"
                  value={moduleFields.subCategory}
                  onChange={handleModuleFieldChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">தேர்வு செய்க</option>
                  <option value="MUDRA / சிறுதொழில் கடன்">MUDRA / சிறுதொழில் கடன்</option>
                  <option value="வீட்டு வசதிக் கடன் (Home Loan)">வீட்டு வசதிக் கடன் (Home Loan)</option>
                  <option value="அடமானக் கடன் (Mortgage)">அடமானக் கடன் (Mortgage)</option>
                  <option value="தனிநபர் கடன் (Personal)">தனிநபர் கடன் (Personal)</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-slate-300">கடன் வரம்பு / விவரம்</label>
                <input
                  type="text"
                  name="priceOrSalary"
                  value={moduleFields.priceOrSalary}
                  onChange={handleModuleFieldChange}
                  placeholder="எ.கா: ₹50,000 முதல் ₹25 லட்சம் வரை"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 'insurance':
        return (
          <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl space-y-3">
            <span className="text-[11px] font-bold text-cyan-400 block">🛡️ காப்பீடு பிரத்யேக விவரங்கள்:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block mb-1 text-slate-300">காப்பீட்டு வகை</label>
                <select
                  name="subCategory"
                  value={moduleFields.subCategory}
                  onChange={handleModuleFieldChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">தேர்வு செய்க</option>
                  <option value="ஆயுள் காப்பீடு (Life / Term)">ஆயுள் காப்பீடு (Life / Term)</option>
                  <option value="மருத்துவக் காப்பீடு (Health)">மருத்துவக் காப்பீடு (Health)</option>
                  <option value="வாகனக் காப்பீடு (Motor)">வாகனக் காப்பீடு (Motor)</option>
                  <option value="பயிர் & கால்நடை காப்பீடு">பயிர் & கால்நடை காப்பீடு</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-slate-300">கவரேஜ் / பிரீமியம் விவரம்</label>
                <input
                  type="text"
                  name="priceOrSalary"
                  value={moduleFields.priceOrSalary}
                  onChange={handleModuleFieldChange}
                  placeholder="எ.கா: ₹1 கோடி கவரேஜ் / ஆண்டு ₹6,000"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        );

      case 'agriculture':
        return (
          <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-3">
            <span className="text-[11px] font-bold text-emerald-400 block">🌾 விவசாயம் & பண்ணை பிரத்யேக விவரங்கள்:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block mb-1 text-slate-300">பொருட்கள் / சேவை</label>
                <select
                  name="subCategory"
                  value={moduleFields.subCategory}
                  onChange={handleModuleFieldChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">தேர்வு செய்க</option>
                  <option value="இயற்கை உரம் / சாணம்">இயற்கை உரம் / சாணம்</option>
                  <option value="நாட்டு விதைகள் & நாற்றுகள்">நாட்டு விதைகள் & நாற்றுகள்</option>
                  <option value="டிராக்டர் / உழவு வாடகை">டிராக்டர் / உழவு வாடகை</option>
                  <option value="பண்ணை விளைபொருட்கள்">பண்ணை விளைபொருட்கள்</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-slate-300">இருப்பு / அளவு</label>
                <input
                  type="text"
                  name="unitOrRole"
                  value={moduleFields.unitOrRole}
                  onChange={handleModuleFieldChange}
                  placeholder="எ.கா: 5 டன் / 10 எண்ணிக்கை"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-300">விலை விவரம்</label>
                <input
                  type="text"
                  name="priceOrSalary"
                  value={moduleFields.priceOrSalary}
                  onChange={handleModuleFieldChange}
                  placeholder="எ.கா: ₹450 / மூட்டை"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        );

      case 'jobs':
        return (
          <div className="p-3 bg-violet-950/20 border border-violet-500/30 rounded-xl space-y-3">
            <span className="text-[11px] font-bold text-violet-400 block">💼 வேலைவாய்ப்பு பிரத்யேக விவரங்கள்:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block mb-1 text-slate-300">பணிப் பிரிவு</label>
                <select
                  name="subCategory"
                  value={moduleFields.subCategory}
                  onChange={handleModuleFieldChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="">தேர்வு செய்க</option>
                  <option value="ஆட்கள் தேவை (Employer)">ஆட்கள் தேவை (Employer)</option>
                  <option value="வேலை தேடுவோர் (Job Seeker)">வேலை தேடுவோர் (Job Seeker)</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-slate-300">பணிப் பதவி (Role)</label>
                <input
                  type="text"
                  name="unitOrRole"
                  value={moduleFields.unitOrRole}
                  onChange={handleModuleFieldChange}
                  placeholder="எ.கா: டிரைவர் / அக்கவுண்டன்ட்"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-300">மாதச் சம்பளம்</label>
                <input
                  type="text"
                  name="priceOrSalary"
                  value={moduleFields.priceOrSalary}
                  onChange={handleModuleFieldChange}
                  placeholder="எ.கா: ₹15,000 - ₹20,000"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>
        );

      case 'astro':
      case 'astrology':
        return (
          <div className="p-3 bg-indigo-950/20 border border-indigo-500/30 rounded-xl space-y-3">
            <span className="text-[11px] font-bold text-indigo-400 block">🔮 AI ஜோதிடம் பிரத்யேக விவரங்கள்:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block mb-1 text-slate-300">ஜோதிட சேவை</label>
                <select
                  name="subCategory"
                  value={moduleFields.subCategory}
                  onChange={handleModuleFieldChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">தேர்வு செய்க</option>
                  <option value="ஜாதகம் கணித்தல் & பலன்">ஜாதகம் கணித்தல் & பலன்</option>
                  <option value="திருமணப் பொருத்தம்">திருமணப் பொருத்தம்</option>
                  <option value="வாஸ்து & பரிகாரங்கள்">வாஸ்து & பரிகாரங்கள்</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-slate-300">ஆலோசனை கட்டணம்</label>
                <input
                  type="text"
                  name="priceOrSalary"
                  value={moduleFields.priceOrSalary}
                  onChange={handleModuleFieldChange}
                  placeholder="எ.கா: ₹500 / ஜாதகம்"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentModuleTemplates = QUICK_TEMPLATES[formData.module_key] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-white my-8 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <div>
            <h3 className="text-lg font-bold text-emerald-400">உள்ளூர் வணிக விளம்பரம் சேர்க்க</h3>
            <p className="text-xs text-slate-400">
              மாவட்டம்: <span className="text-emerald-300 font-semibold">{formData.district}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold p-1 leading-none"
          >
            ✕
          </button>
        </div>

        {message && (
          <div className={`my-3 p-3 rounded-lg text-xs font-semibold ${message.type === 'success' ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-600' : 'bg-red-900/80 text-red-200 border border-red-600'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-slate-300 font-medium">பிரிவு (12 மாட்யூல்கள்) *</label>
              <select
                name="module_key"
                value={formData.module_key}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                {MODULE_OPTIONS.map((m) => (
                  <option key={m.key} value={m.key}>{m.icon} {m.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-slate-300 font-medium">மாவட்டம் *</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              >
                {TAMIL_NADU_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>

          {renderDynamicFields()}

          {/* விரைவுத் தேர்வு வார்ப்புருக்கள் (Quick Suggestion Buttons) */}
          {currentModuleTemplates.length > 0 && (
            <div className="p-2.5 bg-slate-800/80 border border-amber-500/30 rounded-xl space-y-1.5">
              <span className="text-[11px] text-amber-300 font-bold block">⚡ விரைவு வாசகப் பரிந்துரை (கிளிக் செய்தால் உடனே நிரம்பும்):</span>
              <div className="flex flex-col gap-1.5">
                {currentModuleTemplates.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyTemplate(tmpl)}
                    className="text-[11px] bg-slate-700/80 hover:bg-emerald-600/90 text-left text-slate-200 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-600 transition flex items-center justify-between"
                  >
                    <span className="font-medium truncate">👉 {tmpl.title}</span>
                    <span className="text-[9px] bg-black/40 px-1.5 py-0.5 rounded text-emerald-300 ml-2">நிரப்பு</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-slate-300 font-medium">வணிகப் பெயர் / நிறுவனம் *</label>
              <input
                type="text"
                name="business_name"
                required
                value={formData.business_name}
                onChange={handleChange}
                placeholder="எ.கா: வெற்றி ஃபர்னிச்சர்"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300 font-medium">வட்டம் / பகுதி (Taluk)</label>
              <input
                type="text"
                name="taluk"
                value={formData.taluk}
                onChange={handleChange}
                placeholder="எ.கா: காட்டாங்கொளத்தூர்"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300 font-medium">அஞ்சல் குறியீடு (Pincode) *</label>
              <input
                type="text"
                name="pincode"
                maxLength={6}
                required
                value={formData.pincode}
                onChange={handleChange}
                placeholder="603203"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-slate-300 font-medium">விளம்பரத் தலைப்பு *</label>
            <input
              type="text"
              name="ad_title"
              required
              value={formData.ad_title}
              onChange={handleChange}
              placeholder="விளம்பரத் தலைப்பு"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-300 font-medium">விளம்பர விவரம் *</label>
            <textarea
              name="ad_description"
              rows="3"
              required
              value={formData.ad_description}
              onChange={handleChange}
              placeholder="விளம்பர விவரங்கள்..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-slate-300 font-medium">தொடர்பாளர் பெயர் *</label>
              <input
                type="text"
                name="contact_person"
                required
                value={formData.contact_person}
                onChange={handleChange}
                placeholder="உரிமையாளர் பெயர்"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300 font-medium">அழைப்பு எண் *</label>
              <input
                type="tel"
                name="phone_number"
                required
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300 font-medium">WhatsApp எண்</label>
              <input
                type="tel"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-slate-300 font-medium">கடை / அலுவலக முகவரி</label>
            <input
              type="text"
              name="location_address"
              value={formData.location_address}
              onChange={handleChange}
              placeholder="கடை அல்லது முகவரி விவரம்"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-700 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
            >
              ரத்து செய்
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition disabled:opacity-50"
            >
              {loading ? 'பதிவாகிறது...' : 'விளம்பரம் வெளியிடு'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}