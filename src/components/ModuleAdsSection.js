import React, { useEffect, useState } from 'react';
import { getWhatsAppUrl } from '../config';

export default function ModuleAdsSection({ selectedDistrict, moduleKey, title = "உள்ளூர் வர்த்தக விளம்பரங்கள்" }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAds() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        
        if (selectedDistrict && selectedDistrict !== 'அனைத்தும்') {
          params.append('district', selectedDistrict);
        }
        
        if (moduleKey && moduleKey !== 'all') {
          params.append('module_key', moduleKey);
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
  }, [selectedDistrict, moduleKey]);

  if (loading) {
    return (
      <div className="my-4 text-center text-xs text-emerald-300 animate-pulse">
        விளம்பரங்கள் ஏற்றப்படுகின்றன...
      </div>
    );
  }

  if (!ads || ads.length === 0) {
    return null;
  }

  return (
    <div className="my-4 w-full">
      <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <span>📍</span>
            <span>
              {selectedDistrict && selectedDistrict !== 'அனைத்தும்'
                ? `${selectedDistrict} மாவட்ட விளம்பரங்கள்`
                : 'தமிழ்நாடு - அனைத்து மாவட்ட விளம்பரங்கள்'}
            </span>
          </h4>
        </div>
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
          தொடர்புடைய விளம்பரம்
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {ads.map((ad) => (
          <div 
            key={ad.id} 
            className="relative bg-slate-800/90 hover:bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-md"
          >
            {ad.ad_tier === 'featured' && (
              <span className="absolute -top-2 right-3 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                ★ FEATURED
              </span>
            )}

            <div>
              <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-1">
                {/* பகுதி மற்றும் பின்கோட் காட்டும் பேட்ஜ் */}
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

            <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs mt-auto">
              <span className="text-[11px] text-slate-400">
                {ad.contact_person || 'தொடர்புக்கு'}
              </span>

              <div className="flex space-x-1.5">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}