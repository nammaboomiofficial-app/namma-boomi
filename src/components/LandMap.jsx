'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet இயல்புநிலை மார்க்கர் ஐகான்கள் சரியாகத் தெரிய:
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function LandMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // தமிழ்நாடு மைய அமைவிடம் (திருச்சி/சென்னை அல்லது பொதுவான அமைவிடம்)
      const map = L.map(mapContainerRef.current).setView([10.7905, 78.7047], 7);
      mapInstanceRef.current = map;

      // OpenStreetMap அடுக்கு
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // மாதிரி நில அமைவிட மார்க்கர்
      L.marker([10.7905, 78.7047])
        .addTo(map)
        .bindPopup('<b>நம்ம பூமி 360</b><br/>விவசாய நிலங்கள் & மனைப் பிரிவு அமைவிடம்.')
        .openPopup();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/60 p-3 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between pb-3 px-2">
        <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
          📍 நில வரைபடம் & அமைவிடம் (Land Mapping)
        </h4>
        <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
          நேரலை ஜிபிஎஸ்
        </span>
      </div>
      <div 
        ref={mapContainerRef} 
        style={{ height: '360px', width: '100%', borderRadius: '12px', zIndex: 10 }} 
      />
    </div>
  );
}