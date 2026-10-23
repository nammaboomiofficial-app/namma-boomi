import React, { useState } from 'react';

// தமிழ்நாட்டின் அனைத்து மாவட்டங்கள்
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

// நமது பிளாட்பார்மின் 12 முக்கிய மாட்யூல்கள்
const MODULE_OPTIONS = [
  { key: 'realestate', label: 'பூமி & நிலம் (Real Estate)' },
  { key: 'finance', label: 'நிதி & கடன்கள் (Finance)' },
  { key: 'insurance', label: 'காப்பீடு (Insurance)' },
  { key: 'agriculture', label: 'விவசாயம் (Agriculture)' },
  { key: 'education', label: 'கல்வி & படிப்பு (Education)' },
  { key: 'jobs', label: 'வேலைவாய்ப்பு (Jobs)' },
  { key: 'business', label: 'தொழில் & MSME' },
  { key: 'wholesale', label: 'மொத்த விற்பனை (Wholesale)' },
  { key: 'spiritual', label: 'ஆன்மீகம் (Spiritual)' },
  { key: 'tourism', label: 'சுற்றுலா (Tourism)' },
  { key: 'astrology', label: 'AI ஜோதிடம் (Astrology)' },
  { key: 'heritage', label: 'தமிழர் மரபு (Tamil Heritage)' }
];

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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/module-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-white my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <div>
            <h3 className="text-lg font-bold text-emerald-400">உள்ளூர் வணிக விளம்பரம் சேர்க்க</h3>
            <p className="text-xs text-slate-400">பின்கோட் மற்றும் வட்டார வாரியாக வாடிக்கையாளர்களை அடையுங்கள்</p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-slate-300 font-medium">பிரிவு (12 மாட்யூல்கள்) *</label>
              <select
                name="module_key"
                value={formData.module_key}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              >
                {MODULE_OPTIONS.map((m) => (
                  <option key={m.key} value={m.key}>{m.label}</option>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-slate-300 font-medium">வணிகப் பெயர் *</label>
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
              placeholder="எ.கா: அனைத்து மரச் சாமான்களுக்கும் அதிரடி தள்ளுபடி"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
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
              placeholder="உங்கள் தயாரிப்பு, சலுகைகள் பற்றிய விவரங்கள்..."
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