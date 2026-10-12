import React, { useState } from 'react';
import { getWhatsAppLink } from '../data/contactConfig';
import sellConfig from '../data/sellLandConfig.json';

export default function SellLandModal({ isOpen, onClose }) {
  const {
    uiLabels = {},
    listingPurposes = [],
    propertyCategories = [],
    fields = {},
    whatsAppTemplate = {}
  } = sellConfig;

  const defaultPurpose = listingPurposes[0]?.label || 'விற்பனைக்கு (For Sale)';
  const defaultCategory = propertyCategories[0]?.label || 'நிலம் / மனை (Land/Plot)';

  const [formData, setFormData] = useState({
    purpose: defaultPurpose,
    category: defaultCategory,
    name: '',
    phone: '',
    district: '',
    location: '',
    area: '',
    price: '',
    mediaNote: 'நேரடி போட்டோ / வீடியோ வாட்ஸ்அப்பில் பகிரப்படும்'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `${whatsAppTemplate.greeting || 'வணக்கம் நம்ம பூமி 360, புதிய சொத்து விவரங்களை பதிவிட விரும்புகிறேன்:'}
${whatsAppTemplate.purposeLabel || '🎯 நோக்கம்:'} ${formData.purpose}
${whatsAppTemplate.categoryLabel || '🏢 சொத்து வகை:'} ${formData.category}
${whatsAppTemplate.nameLabel || '👤 உரிமையாளர்:'} ${formData.name}
${whatsAppTemplate.phoneLabel || '📞 தொடர்பு:'} ${formData.phone}
${whatsAppTemplate.districtLabel || '📍 மாவட்டம்:'} ${formData.district}
${whatsAppTemplate.locationLabel || '📌 ஊர்/பகுதி:'} ${formData.location}
${whatsAppTemplate.areaLabel || '📐 அளவு/பரப்பு:'} ${formData.area}
${whatsAppTemplate.priceLabel || '💰 எதிர்பார்க்கும் தொகை:'} ${formData.price}
${whatsAppTemplate.mediaLabel || '📸 மீடியா விவரம்:'} ${formData.mediaNote}`;

    window.open(getWhatsAppLink(message), '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* மூடும் பொத்தான் */}
        <button 
          onClick={onClose}
          title={uiLabels.closeBtnTitle}
          className="absolute top-4 right-4 text-slate-100 hover:text-white text-lg w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer transition-colors"
        >
          ✕
        </button>

        <div className="mb-5">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {uiLabels.badge}
          </span>
          <h3 className="text-xl font-bold text-white mt-1.5">{uiLabels.title}</h3>
          <p className="text-xs text-slate-300 mt-0.5">{uiLabels.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* பரிவர்த்தனை நோக்கம் & சொத்து வகை */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                {fields.purpose?.label}
              </label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                {listingPurposes.map((p) => (
                  <option key={p.id} value={p.label}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                {fields.category?.label}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                {propertyCategories.map((c) => (
                  <option key={c.id} value={c.label}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* பெயர் & வாட்ஸ்அப் எண் */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                {fields.name?.label}
              </label>
              <input
                required
                type="text"
                placeholder={fields.name?.placeholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                {fields.phone?.label}
              </label>
              <input
                required
                type="tel"
                placeholder={fields.phone?.placeholder}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* மாவட்டம் & இடம் */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                {fields.district?.label}
              </label>
              <input
                required
                type="text"
                placeholder={fields.district?.placeholder}
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                {fields.location?.label}
              </label>
              <input
                required
                type="text"
                placeholder={fields.location?.placeholder}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* அளவு & கேட்கும் தொகை */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                {fields.area?.label}
              </label>
              <input
                required
                type="text"
                placeholder={fields.area?.placeholder}
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                {fields.price?.label}
              </label>
              <input
                required
                type="text"
                placeholder={fields.price?.placeholder}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* போட்டோ & வீடியோ நிலை */}
          <div>
            <label className="text-xs text-slate-300 font-medium block mb-1">
              {fields.mediaNote?.label}
            </label>
            <input
              type="text"
              value={formData.mediaNote}
              onChange={(e) => setFormData({ ...formData, mediaNote: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{uiLabels.submitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}