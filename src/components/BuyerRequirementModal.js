import React, { useState } from 'react';

// தமிழ்நாட்டின் முழு 38 மாவட்டங்கள்
const TN_DISTRICTS = [
  'செங்கல்பட்டு', 'சென்னை', 'காஞ்சிபுரம்', 'திருவள்ளூர்',
  'வேலூர்', 'ராணிப்பேட்டை', 'திருப்பத்தூர்', 'திருவண்ணாமலை',
  'விழுப்புரம்', 'கள்ளக்குறிச்சி', 'கடலூர்', 'தருமபுரி',
  'கிருஷ்ணகிரி', 'சேலம்', 'நாமக்கல்', 'ஈரோடு',
  'திருப்பூர்', 'கோயம்புத்தூர்', 'நீலகிரி', 'கரூர்',
  'திருச்சிராப்பள்ளி', 'பெரம்பலூர்', 'அரியலூர்', 'தஞ்சாவூர்',
  'திருவாரூர்', 'நாகப்பட்டினம்', 'மயிலாடுதுறை', 'புதுக்கோட்டை',
  'திண்டுக்கல்', 'மதுரை', 'தேனி', 'விருதுநகர்',
  'சிவகங்கை', 'ராமநாதபுரம்', 'தூத்துக்குடி', 'திருநெல்வேலி',
  'தென்காசி', 'கன்னியாகுமரி'
];

// குறிப்பிட்ட வசதிகள் (Tags)
const COMMON_DEMANDS = [
  'தார் சாலை வசதி',
  'கிணறு / போர்வெல்',
  'இலவச மின் இணைப்பு',
  'சுற்றுச்சுவர் / வேலி',
  'மெயின் ரோடு பார்த்தது',
  'தெளிவான தாய் பத்திரம்',
  'உடனடி பட்டா மாறுதல்'
];

// கிளிக் செய்தால் இயல்பாக இணையும் தொழில்முறை வாக்கியங்கள்
const QUICK_NOTES = [
  'பிரதான சாலையிலிருந்து 1-2 கி.மீ தொலைவுக்குள் இருக்க வேண்டும்.',
  'லாரி, டிராக்டர் செல்லக்கூடிய அகலமான வழிப்பாதை தேவை.',
  'வங்கி கடன் (Bank Loan) பெறுவதற்கு உகந்த சொத்தாக இருக்க வேண்டும்.',
  'வில்லங்கமில்லாத உடனடி கிரையத்திற்குத் தயாராக உள்ள நிலம் தேவை.',
  'விவசாய பயன்பாட்டிற்கு ஏற்ற செழுமையான மண் மற்றும் தண்ணீர் வசதி வேண்டும்.'
];

const BUDGET_OPTIONS = [
  '₹15 லட்சத்திற்குள்',
  '₹15 லட்சம் - ₹30 லட்சம்',
  '₹30 லட்சம் - ₹50 லட்சம்',
  '₹50 லட்சம் - ₹1 கோடி',
  '₹1 கோடிக்கு மேல்'
];

const LAND_UNITS = [
  'ஏக்கர்',
  'சென்ட்',
  'சதுர அடி',
  'கிரவுண்ட்',
  'குழி'
];

export default function BuyerRequirementModal({ isOpen, onClose }) {
  const initialFormState = {
    buyer_name: '',
    buyer_phone: '',
    preferred_district: 'செங்கல்பட்டு',
    preferred_location: '',
    pincode: '',
    land_category: 'விவசாய நிலம்',
    area_value: '',
    area_unit: 'ஏக்கர்',
    budget_range: '₹30 லட்சம் - ₹50 லட்சம்',
    specific_demands: [],
    additional_notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setErrorMsg('');
    setSuccessMsg('');
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // வசதி டேக் தேர்வு
  const toggleDemand = (demand) => {
    setFormData((prev) => {
      const exists = prev.specific_demands.includes(demand);
      return {
        ...prev,
        specific_demands: exists
          ? prev.specific_demands.filter((d) => d !== demand)
          : [...prev.specific_demands, demand]
      };
    });
  };

  // விரைவு வாக்கியங்களை குறிப்பில் இணைத்தல்
  const appendQuickNote = (sentence) => {
    setFormData((prev) => {
      const current = prev.additional_notes.trim();
      if (current.includes(sentence)) return prev;
      return {
        ...prev,
        additional_notes: current ? `${current} ${sentence}` : sentence
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // போன் எண் சரிபார்ப்பு
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.buyer_phone.trim())) {
      setErrorMsg('தயவுசெய்து சரியான 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்.');
      setLoading(false);
      return;
    }

    // பின்கோடு சரிபார்ப்பு (உள்ளிட்டால் 6 இலக்கமாக இருக்க வேண்டும்)
    if (formData.pincode.trim() && !/^[0-9]{6}$/.test(formData.pincode.trim())) {
      setErrorMsg('தயவுசெய்து சரியான 6 இலக்க அஞ்சல் குறியீட்டு எண்ணை (Pincode) உள்ளிடவும்.');
      setLoading(false);
      return;
    }

    if (!formData.area_value.trim()) {
      setErrorMsg('தேவையான நிலத்தின் அளவை உள்ளிடவும்.');
      setLoading(false);
      return;
    }

    // இடத்தின் பெயருடன் பின்கோடைச் சேர்த்து சுத்தமான வடிவமைப்பாக மாற்றுதல்
    const locationWithPin = formData.pincode.trim()
      ? `${formData.preferred_location.trim()} (PIN: ${formData.pincode.trim()})`
      : formData.preferred_location.trim();

    const payload = {
      buyer_name: formData.buyer_name.trim(),
      buyer_phone: formData.buyer_phone.trim(),
      preferred_district: formData.preferred_district,
      preferred_location: locationWithPin,
      land_category: formData.land_category,
      area_required: `${formData.area_value.trim()} ${formData.area_unit}`,
      budget_range: formData.budget_range,
      specific_demands: formData.specific_demands,
      additional_notes: formData.additional_notes.trim()
    };

    try {
      const res = await fetch('/api/buyer-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg('உங்கள் சொத்துத் தேவை வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!');
        setFormData(initialFormState);
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setErrorMsg(data.error || 'பதிவு செய்வதில் பிழை ஏற்பட்டது.');
      }
    } catch (err) {
      setErrorMsg('சர்வர் இணைப்பு தோல்வி.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-5 sm:p-6 text-slate-100 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold p-1"
          type="button"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-emerald-400 mb-1">வாங்குபவர் தேவைப் பதிவு</h2>
        <p className="text-xs text-slate-400 mb-4">உங்கள் விருப்பத் தேர்வுகளைக் குறிப்பிட்டு நிலத் தேவையைப் பதிவு செய்யவும்</p>

        {successMsg && (
          <div className="p-3 mb-4 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="p-3 mb-4 rounded-lg bg-red-950/80 border border-red-500/50 text-red-300 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* பெயர் & போன் */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 mb-1 block">உங்கள் பெயர் *</label>
              <input
                type="text"
                name="buyer_name"
                required
                value={formData.buyer_name}
                onChange={handleChange}
                placeholder="எ.கா: சு. உதயகுமார்"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 mb-1 block">வாட்ஸ்அப் எண் *</label>
              <input
                type="tel"
                name="buyer_phone"
                required
                maxLength={10}
                value={formData.buyer_phone}
                onChange={handleChange}
                placeholder="10 இலக்க எண்"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* மாவட்டம், இடம் & பின்கோடு */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="text-xs text-slate-300 mb-1 block">விருப்ப மாவட்டம்</label>
              <select
                name="preferred_district"
                value={formData.preferred_district}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {TN_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-300 mb-1 block">இடம் / ஊர்</label>
              <input
                type="text"
                name="preferred_location"
                value={formData.preferred_location}
                onChange={handleChange}
                placeholder="எ.கா: திருப்போரூர்"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 mb-1 block">அஞ்சல் குறியீடு</label>
              <input
                type="text"
                name="pincode"
                maxLength={6}
                value={formData.pincode}
                onChange={handleChange}
                placeholder="603110"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* சொத்து வகை & அளவு */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 mb-1 block">சொத்து வகை</label>
              <select
                name="land_category"
                value={formData.land_category}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="விவசாய நிலம்">விவசாய நிலம்</option>
                <option value="DTCP மனைகள்">DTCP மனைகள்</option>
                <option value="தனி வீடு / அடுக்குமாடி">தனி வீடு / அடுக்குமாடி</option>
                <option value="வணிக இடம்">வணிக இடம்</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-300 mb-1 block">தேவையான அளவு *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="area_value"
                  required
                  step="any"
                  value={formData.area_value}
                  onChange={handleChange}
                  placeholder="3"
                  className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
                <select
                  name="area_unit"
                  value={formData.area_unit}
                  onChange={handleChange}
                  className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  {LAND_UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* பட்ஜெட் வரம்பு */}
          <div>
            <label className="text-xs text-slate-300 mb-1 block">எதிர்பார்க்கும் பட்ஜெட் வரம்பு</label>
            <select
              name="budget_range"
              value={formData.budget_range}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* குறிப்பிட்ட வசதிகள் */}
          <div>
            <label className="text-xs text-slate-300 mb-1.5 block">குறிப்பிட்ட தேவைகள் (கிளிக் செய்யவும்)</label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_DEMANDS.map((demand) => {
                const isSelected = formData.specific_demands.includes(demand);
                return (
                  <button
                    type="button"
                    key={demand}
                    onClick={() => toggleDemand(demand)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                      isSelected
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-medium'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{demand}
                  </button>
                );
              })}
            </div>
          </div>

          {/* கூடுதல் குறிப்புகள் & விரைவு வாக்கியங்கள் */}
          <div>
            <label className="text-xs text-slate-300 mb-1 block">கூடுதல் விவரங்கள்</label>
            
            {/* Quick Note Buttons */}
            <div className="flex flex-wrap gap-1 mb-2">
              {QUICK_NOTES.map((note, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => appendQuickNote(note)}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded px-2 py-1 text-left transition"
                >
                  + {note}
                </button>
              ))}
            </div>

            <textarea
              name="additional_notes"
              rows="2"
              value={formData.additional_notes}
              onChange={handleChange}
              placeholder="மேலே உள்ள வாக்கியங்களை கிளிக் செய்யலாம் அல்லது நேரடியாக உள்ளிடலாம்..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 rounded-lg shadow-lg mt-1 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'பதிவாகிறது...' : 'தேவையைச் சமர்ப்பிக்கவும்'}
          </button>
        </form>
      </div>
    </div>
  );
}