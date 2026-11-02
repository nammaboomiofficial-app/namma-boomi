import React, { useEffect, useState } from 'react';
import { getWhatsAppUrl } from '../config';

// 12 முக்கிய வணிகப் பிரிவுகள்
const MODULE_CATEGORIES = [
  { key: 'all', label: 'அனைத்தும்', icon: '🌐' },
  { key: 'realestate', label: 'ரியல் எஸ்டேட்', icon: '🏡' },
  { key: 'agriculture', label: 'விவசாயம்', icon: '🌾' },
  { key: 'finance', label: 'வணிகம் & நிதி', icon: '💼' },
  { key: 'vehicles', label: 'வாகனங்கள்', icon: '🚗' },
  { key: 'machinery', label: 'இயந்திரங்கள்', icon: '⚙️' },
  { key: 'jobs', label: 'வேலைவாய்ப்பு', icon: '👔' },
  { key: 'services', label: 'சேவைகள்', icon: '🛠️' },
  { key: 'building', label: 'கட்டுமானம்', icon: '🏗️' },
  { key: 'livestock', label: 'கால்நடைகள்', icon: '🐄' },
  { key: 'food', label: 'உணவு & தானியங்கள்', icon: '🍲' },
  { key: 'education', label: 'கல்வி', icon: '📚' }
];

export default function ModuleAdsSection({ 
  selectedDistrict, 
  moduleKey = 'all', 
  title = "உள்ளூர் வர்த்தக விளம்பரங்கள்",
  onPostAdClick // விளம்பரம் சேர்க்கும் மோடலைத் திறக்கும் செயல்பாடு
}) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(moduleKey);
  const [revealedNumbers, setRevealedNumbers] = useState({});

  useEffect(() => {
    setActiveCategory(moduleKey);
  }, [moduleKey]);

  useEffect(() => {
    async function fetchAds() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        
        if (selectedDistrict && selectedDistrict !== 'அனைத்தும்') {
          params.append('district', selectedDistrict);
        }
        
        if (activeCategory && activeCategory !== 'all') {
          params.append('module_key', activeCategory);
        }

        const res = await fetch(`/api/module-ads?${params.toString()}`);
        const result = await res.json();
        if (result.success) {
          setAds(result.data || []);
        }
      } catch (err) {
        console.error('விளம்பரங்கள் பெறுவதில் பிழை:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAds();
  }, [selectedDistrict, activeCategory]);

  const handleReveal = (adId) => {
    setRevealedNumbers(prev => ({
      ...prev,
      [adId]: true
    }));
  };

  const maskPhoneNumber = (phone) => {
    if (!phone) return '';
    const clean = phone.toString().trim();
    if (clean.length <= 5) return clean;
    return clean.slice(0, 5) + 'XXXXX';
  };

  return (
    <div className="my-6 w-full">
      {/* மேல் பகுதி: தலைப்பு & விளம்பரம் சேர்க்கும் பட்டன் */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-700 gap-3">
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div>
            <h4 className="text-sm md:text-base font-bold text-slate-900 flex items-center gap-1.5">
              <span>📍</span>
              <span>
                {selectedDistrict && selectedDistrict !== 'அனைத்தும்'
                  ? `${selectedDistrict} மாவட்ட வர்த்தக விளம்பரங்கள்`
                  : 'தமிழ்நாடு - அனைத்து மாவட்ட வர்த்தக விளம்பரங்கள்'}
              </span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              உள்ளூர் உற்பத்தியாளர்கள் மற்றும் நேரடி வணிகர்கள்
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onPostAdClick ? (
            <button
              onClick={onPostAdClick}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow transition flex items-center gap-1.5"
            >
              <span>➕</span>
              <span>இலவச விளம்பரம் சேர்க்க</span>
            </button>
          ) : (
            <a
              href="#post-ad"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow transition flex items-center gap-1.5"
            >
              <span>➕</span>
              <span>இலவச விளம்பரம் சேர்க்க</span>
            </a>
          )}
        </div>
      </div>

      {/* பிரிவு வடிகட்டி (Category Pills Bar) */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
        {MODULE_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition flex items-center gap-1 ${
              activeCategory === cat.key
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* விளம்பரப் பட்டியல் */}
      {loading ? (
        <div className="my-8 text-center text-xs text-emerald-300 animate-pulse">
          விளம்பரங்கள் ஏற்றப்படுகின்றன...
        </div>
      ) : ads.length === 0 ? (
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-6 text-center my-4">
          <span className="text-3xl block mb-2">📢</span>
          <p className="text-slate-300 text-xs font-medium">
            இப்பிரிவில் தற்போது விளம்பரங்கள் ஏதுமில்லை.
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            உங்கள் வணிக விளம்பரத்தை முதல் நபராக உடனே பதிவிடுங்கள்!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-2">
          {ads.map((ad) => {
            const mapUrl = ad.map_link || (ad.extra_details && ad.extra_details.map_link);
            const isRevealed = revealedNumbers[ad.id];

            return (
              <div 
                key={ad.id} 
                className="relative bg-slate-800/90 hover:bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-md"
              >
                {ad.ad_tier === 'featured' && (
                  <span className="absolute top-2 right-3 z-10 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                    ★ FEATURED
                  </span>
                )}

                {ad.module_key === 'realestate' && ad.image_url && (
                  <div className="w-full h-40 bg-slate-900 border-b border-slate-700 overflow-hidden">
                    <img
                      src={ad.image_url}
                      alt={ad.ad_title || ad.business_name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                )}

                <div className="p-4 flex-1">
                  <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-1">
                    <span className="text-[10px] bg-slate-700 text-emerald-300 font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                      <span>📍 {ad.taluk || ad.district}</span>
                      {ad.pincode && <span className="text-slate-300 font-mono">({ad.pincode})</span>}
                    </span>
                  </div>

                  <h5 className="font-bold text-white text-sm mb-1 line-clamp-1">
                    {ad.business_name}
                  </h5>
                  
                  <p className="text-xs font-semibold text-emerald-400 mb-1">
                    {ad.ad_title}
                  </p>

                  {ad.extra_details && (
                    <div className="flex flex-wrap gap-1.5 my-2">
                      {ad.extra_details.subCategory && (
                        <span className="px-2 py-0.5 text-[10px] bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 rounded font-medium">
                          🏷️ {ad.extra_details.subCategory}
                        </span>
                      )}
                      {ad.extra_details.unitOrRole && (
                        <span className="px-2 py-0.5 text-[10px] bg-slate-800 border border-slate-600 text-slate-300 rounded">
                          📐 {ad.extra_details.unitOrRole}
                        </span>
                      )}
                      {ad.extra_details.priceOrSalary && (
                        <span className="px-2 py-0.5 text-[10px] bg-amber-900/60 border border-amber-500/40 text-amber-300 rounded font-semibold">
                          💰 {ad.extra_details.priceOrSalary}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-[11px] text-slate-300 mb-3 line-clamp-2 leading-relaxed">
                    {ad.ad_description}
                  </p>
                </div>

                <div className="p-4 pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-400">
                      {ad.contact_person || 'தொடர்புக்கு'}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                      {isRevealed ? (ad.phone_number || ad.whatsapp_number) : maskPhoneNumber(ad.phone_number || ad.whatsapp_number)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {ad.module_key === 'realestate' && mapUrl && (
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-medium px-2 py-1 rounded-md transition flex items-center gap-1"
                        title="கூகுள் மேப்பில் பார்க்க"
                      >
                        <span>🗺️ மேப்</span>
                      </a>
                    )}

                    {!isRevealed ? (
                      <button
                        onClick={() => handleReveal(ad.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-md transition shadow flex items-center gap-1"
                      >
                        <span>📞</span>
                        <span>எண் காண்க</span>
                      </button>
                    ) : (
                      <>
                        {ad.whatsapp_number && (
                          <a
                            href={getWhatsAppUrl('வணக்கம், உங்கள் விளம்பரம் பார்த்து தொடர்பு கொள்கிறேன்.', ad.whatsapp_number)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-medium px-2.5 py-1 rounded-md transition"
                          >
                            WhatsApp
                          </a>
                        )}
                        {ad.phone_number && (
                          <a
                            href={`tel:${ad.phone_number}`}
                            className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium px-2.5 py-1 rounded-md transition"
                          >
                            அழைக்க
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}