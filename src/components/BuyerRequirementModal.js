import React, { useState } from 'react';

export default function BuyerRequirementModal({ isOpen, onClose }) {
  const initialFormState = {
    buyer_name: '',
    buyer_phone: '',
    preferred_district: 'செங்கல்பட்டு',
    preferred_location: '',
    land_category: 'விவசாய நிலம்',
    area_required: '',
    budget_range: '',
    specific_demands: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // 10 இலக்க போன் எண் சரிபார்ப்பு
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.buyer_phone.trim())) {
      setErrorMsg('தயவுசெய்து சரியான 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/buyer-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg('உங்கள் சொத்துத் தேவை வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!');
        setFormData(initialFormState); // படிவத்தை மீட்டமைத்தல்
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 text-slate-100 shadow-2xl relative my-8">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold p-1"
          type="button"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-emerald-400 mb-1">வாங்குபவர் தேவைப் பதிவு</h2>
        <p className="text-xs text-slate-400 mb-4">உங்களுக்குத் தேவையான நிலம் / சொத்தின் விவரங்களைக் குறிப்பிடவும்</p>

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

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 mb-1 block">உங்கள் பெயர் *</label>
              <input
                type="text"
                name="buyer_name"
                required
                value={formData.buyer_name}
                onChange={handleChange}
                placeholder="எ.கா: குமார்"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 mb-1 block">விரும்பும் மாவட்டம்</label>
              <select
                name="preferred_district"
                value={formData.preferred_district}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="செங்கல்பட்டு">செங்கல்பட்டு</option>
                <option value="காஞ்சிபுரம்">காஞ்சிபுரம்</option>
                <option value="சென்னை">சென்னை</option>
                <option value="திருவள்ளூர்">திருவள்ளூர்</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-300 mb-1 block">விரும்பும் இடம் / ஊர்</label>
              <input
                type="text"
                name="preferred_location"
                value={formData.preferred_location}
                onChange={handleChange}
                placeholder="எ.கா: திருப்போரூர்"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

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
              <label className="text-xs text-slate-300 mb-1 block">தேவையான அளவு</label>
              <input
                type="text"
                name="area_required"
                value={formData.area_required}
                onChange={handleChange}
                placeholder="எ.கா: 1 ஏக்கர் / 1200 ச.அடி"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 mb-1 block">எதிர்பார்க்கும் பட்ஜெட்</label>
            <input
              type="text"
              name="budget_range"
              value={formData.budget_range}
              onChange={handleChange}
              placeholder="எ.கா: ₹25 லட்சம் - ₹40 லட்சம்"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 mb-1 block">கூடுதல் குறிப்புகள் / தேவைகள்</label>
            <textarea
              name="additional_notes"
              rows="2"
              value={formData.additional_notes}
              onChange={handleChange}
              placeholder="ரோடு வசதி, கிணறு அல்லது மின் இணைப்பு போன்ற குறிப்புகள்..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 rounded-lg shadow-lg mt-2 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'பதிவாகிறது...' : 'தேவையைச் சமர்ப்பிக்கவும்'}
          </button>
        </form>
      </div>
    </div>
  );
}