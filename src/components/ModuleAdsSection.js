import React, { useEffect, useState } from 'react';
import { getWhatsAppUrl } from '../config';
import PostAdModal from './PostAdModal';
import DISTRICT_TALUKS from '../data/tnTaluksData.json';

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



// 38 மாவட்டங்களின் பட்டியல்
const ALL_DISTRICT_NAMES = Object.keys(DISTRICT_TALUKS);

export default function ModuleAdsSection({ 
  selectedDistrict: propDistrict, 
  moduleKey = 'all', 
  title = "உள்ளூர் வர்த்தக விளம்பரங்கள்",
  onPostAdClick 
}) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(moduleKey);
  const [currentDistrict, setCurrentDistrict] = useState(propDistrict || 'அனைத்தும்');
  const [selectedTaluk, setSelectedTaluk] = useState('அனைத்தும்');
  const [revealedNumbers, setRevealedNumbers] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(30);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // பயனர் செயலியைத் திறக்கும்போது லொகேஷன் அனுமதி கோருதல்
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationEnabled(true);
        },
        (error) => {
          console.log("இருப்பிட அனுமதி மறுக்கப்பட்டது, இயல்பான மாவட்ட வாரியான வடிகட்டல் தொடரும்.");
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  useEffect(() => {
    setActiveCategory(moduleKey);
  }, [moduleKey]);

  useEffect(() => {
    if (propDistrict) {
      setCurrentDistrict(propDistrict);
    }
  }, [propDistrict]);

  // மாவட்டம் மாறும்போது தாலுகாவை மீட்டமைத்தல்
  useEffect(() => {
    setSelectedTaluk('அனைத்தும்');
  }, [currentDistrict]);

  useEffect(() => {
    async function fetchAds() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        
        if (currentDistrict && currentDistrict !== 'அனைத்தும்') {
          params.append('district', currentDistrict);
        }

        if (selectedTaluk && selectedTaluk !== 'அனைத்தும்') {
          params.append('taluk', selectedTaluk);

          // அந்த தாலுகாவின் ஆங்கிலப் பெயரையும் கூடவே அனுப்புகிறோம்
          const matched = availableTaluks.find(t => t.ta === selectedTaluk);
          if (matched && matched.en) {
            params.append('taluk_en', matched.en);
          }
        }
        if (userLocation && locationEnabled) {
        params.append('user_lat', userLocation.lat);
        params.append('user_lng', userLocation.lng);
        params.append('radius', selectedRadius);
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
  }, [currentDistrict, selectedTaluk, activeCategory, userLocation, locationEnabled, selectedRadius]);

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

  // தேர்ந்தெடுக்கப்பட்ட மாவட்டத்தின் தாலுகாக்கள் மட்டுமே வரும்
  const availableTaluks = (currentDistrict && DISTRICT_TALUKS[currentDistrict])
    ? DISTRICT_TALUKS[currentDistrict]
    : [];

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
            <h4 className="text-sm md:text-base font-bold text-slate-100 flex items-center gap-1.5">
              <span>📍</span>
              <span>
                {currentDistrict && currentDistrict !== 'அனைத்தும்'
                  ? `${currentDistrict} மாவட்ட வர்த்தக விளம்பரங்கள்`
                  : 'தமிழ்நாடு - அனைத்து மாவட்ட வர்த்தக விளம்பரங்கள்'}
              </span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              உள்ளூர் உற்பத்தியாளர்கள் மற்றும் நேரடி வணிகர்கள்
            </p>
          </div>
        </div>

        
      </div>
      
      {/* 🏛️ 38 மாவட்டங்கள் & 📍 தொடர்புடைய தாலுகா வடிகட்டி பகுதி */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pt-3 border-t border-slate-700/60">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* மாவட்டத் தேர்வு (38 மாவட்டங்கள்) */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="district-select" className="text-xs font-bold text-slate-300 whitespace-nowrap">
              🏛️ மாவட்டம்:
            </label>
            <select
              id="district-select"
              value={currentDistrict}
              onChange={(e) => {
                const newDist = e.target.value;
                setCurrentDistrict(newDist);
                setSelectedTaluk('அனைத்தும்');
              }}
              className="bg-slate-900 border border-slate-700 focus:border-emerald-500 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg outline-none cursor-pointer shadow-inner min-w-[170px]"
            >
              <option value="அனைத்தும்">அனைத்து மாவட்டங்கள் (All 38)</option>
              {ALL_DISTRICT_NAMES.map((dist, idx) => (
                <option key={idx} value={dist} className="bg-slate-900 text-slate-200">
                  {dist}
                </option>
              ))}
            </select>
            {locationEnabled && userLocation && (
              <div className="inline-flex items-center gap-1.5 ml-2 bg-slate-900/90 border border-slate-700/80 rounded-full px-2.5 py-1 shadow-sm">
                <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold pl-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  📍 சுற்றளவு:
                </span>
                {[5, 15, 30].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
  setSelectedRadius(r);
  setCurrentDistrict('அனைத்தும்');
  setSelectedTaluk('அனைத்தும்');
}}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all duration-200 ${
                      selectedRadius === r
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {r} கி.மீ
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* தாலுகா தேர்வு - மாவட்டம் தேர்வானால் மட்டுமே அதன் தாலுகாக்கள் வரும் */}
          {currentDistrict && currentDistrict !== 'அனைத்தும்' && availableTaluks.length > 0 && (
            <div className="flex items-center gap-1.5">
              <label htmlFor="taluk-filter" className="text-xs font-bold text-slate-300 whitespace-nowrap">
                📍 தாலுகா:
              </label>
              <select
                id="taluk-filter"
                value={selectedTaluk}
                onChange={(e) => setSelectedTaluk(e.target.value)}
                className="bg-slate-900 border border-slate-700 focus:border-emerald-500 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg outline-none cursor-pointer shadow-inner min-w-[170px]"
              >
                <option value="அனைத்தும்">அனைத்து தாலுகாக்களும் (All)</option>
                {availableTaluks.map((item, idx) => (
                  <option key={idx} value={item.ta} className="bg-slate-900 text-slate-200">
                    {item.ta} ({item.en})
                  </option>
                ))}
              </select>
            </div>
          )}

        </div>

        {(currentDistrict !== 'அனைத்தும்' || selectedTaluk !== 'அனைத்தும்') && (
          <button
            type="button"
            onClick={() => {
              setCurrentDistrict('அனைத்தும்');
              setSelectedTaluk('அனைத்தும்');
            }}
            className="text-xs text-rose-400 hover:text-rose-300 bg-rose-950/40 border border-rose-800/60 px-2.5 py-1 rounded-md transition font-medium"
          >
            ✕ அனைத்து வடிகட்டலையும் நீக்கு
          </button>
        )}
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
                {/* டைனமிக் தூரக் குறிப்பான் (Featured மோதல் தவிர்ப்பு) */}
        {(ad.distance_km != null || ad.distance != null) && (
          <div 
           className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-slate-950/90 backdrop-blur-md border border-emerald-500/70 text-emerald-300 text-[11px] font-bold rounded-md shadow-md flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>📍 {Number(ad.distance_km ?? ad.distance).toFixed(1)} கி.மீ</span>
          </div>
        )}
                {ad.ad_tier === 'featured' && (
                  <span className="absolute top-2 right-2 z-10 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow flex items-center gap-1">
                    <span>★ FEATURED</span>
                    {ad.featured_until && (
                      <span className="bg-amber-600/30 text-slate-950 px-1 rounded text-[9px] font-bold border border-amber-600/40">
                        {Math.max(0, Math.ceil((new Date(ad.featured_until) - new Date()) / (1000 * 60 * 60 * 24)))} நாள்
                      </span>
                    )}
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

                <div className={`p-4 flex-1 ${!ad.image_url ? 'pt-10' : ''}`}>
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
                    {/* கூகுள் மேப் நேரடி வழித்தடப் பொத்தான் */}
                  <a
                    href={
                      ad.latitude && ad.longitude
                        ? `https://www.google.com/maps/dir/?api=1&destination=${ad.latitude},${ad.longitude}`
                        : mapUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((ad.taluk || '') + ' ' + (ad.district || '') + ' Tamil Nadu')}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-[11px] rounded transition-all duration-200 shadow-sm"
                    title="கூகுள் மேப்பில் வழித்தடம் பார்க்க"
                  >
                    <span>🧭</span>
                    <span>வழி</span>
                  </a>

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
      {/* புதிய விளம்பரம் சேர்க்கும் படிவம் */}
      {isPostModalOpen && (
        <PostAdModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          currentDistrict="செங்கல்பட்டு"
          defaultModule="realestate"
        />
      )}
    </div>
  );
}