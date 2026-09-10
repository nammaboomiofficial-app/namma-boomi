import React, { useState } from 'react';
import { getWhatsAppLink } from '../data/contactConfig';

export default function SellLandModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    location: '',
    landType: 'விவசாய நிலம்',
    area: '',
    surveyNo: '',
    price: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `வணக்கம் நம்ம பூமி 360, எனது நிலத்தை விற்பனை செய்ய / பதிவிட விரும்புகிறேன்:
👤 பெயர்: ${formData.name}
📞 தொடர்பு: ${formData.phone}
📍 மாவட்டம்: ${formData.district}
📌 இடம்/ஊர்: ${formData.location}
🏷️ வகை: ${formData.landType}
📐 பரப்பளவு: ${formData.area}
📑 சர்வே எண்: ${formData.surveyNo || 'நேரில் பகிரப்படும்'}
💰 கேட்கும் விலை: ${formData.price}`;

    window.open(getWhatsAppLink(message), '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"
        >
          ✕
        </button>

        <div className="mb-5">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            🏡 விற்பனையாளர் படிவம்
          </span>
          <h3 className="text-xl font-bold text-white mt-1.5">உங்கள் நிலத்தை விற்பனைக்கு பதிவிடுங்கள்</h3>
          <p className="text-xs text-slate-400 mt-0.5">விவரங்களைப் பூர்த்தி செய்தால் எங்கள் குழு உங்களை நேரடியாகத் தொடர்பு கொள்ளும்.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">உரிமையாளர் பெயர் *</label>
              <input
                required
                type="text"
                placeholder="எ.கா. ராஜா"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">வாட்ஸ்அப் எண் *</label>
              <input
                required
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">மாவட்டம் *</label>
              <input
                required
                type="text"
                placeholder="எ.கா. செங்கல்பட்டு"
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">ஊர் / கிராமம் *</label>
              <input
                required
                type="text"
                placeholder="எ.கா. திருப்போரூர்"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">நிலத்தின் வகை *</label>
              <select
                value={formData.landType}
                onChange={(e) => setFormData({...formData, landType: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="விவசாய நிலம்">விவசாய நிலம்</option>
                <option value="வீட்டு மனை (DTCP/CMDA)">வீட்டு மனை (DTCP/CMDA)</option>
                <option value="வணிக நிலம்">வணிக நிலம்</option>
                <option value="பண்ணை நிலம் (Farm Land)">பண்ணை நிலம் (Farm Land)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">பரப்பளவு *</label>
              <input
                required
                type="text"
                placeholder="எ.கா. 2 ஏக்கர் / 2400 ச.அடி"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">சர்வே எண் (விருப்பத்தேர்வு)</label>
              <input
                type="text"
                placeholder="எ.கா. 124/2A"
                value={formData.surveyNo}
                onChange={(e) => setFormData({...formData, surveyNo: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">கேட்கும் விலை *</label>
              <input
                required
                type="text"
                placeholder="எ.கா. ₹45 லட்சம் / சென்ட் ₹2 லட்சம்"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2"
            >
              <span>📲 வாட்ஸ்அப்பில் விவரங்களை அனுப்பவும்</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}