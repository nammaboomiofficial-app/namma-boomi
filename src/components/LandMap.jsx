'use client';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import landsData from '../data/landsData.json';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// இரு புள்ளிகளுக்கு இடையிலான தூரத்தை மீட்டரில் (Meters) கணக்கிடுதல்
function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // பூமியின் ஆரம் மீட்டரில்
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// நில எல்லையின் சுற்றளவு (Perimeter) மற்றும் பரப்பளவு (Area) கணக்கீடு
function calculateLandMetrics(coords) {
  let perimeterMeters = 0;
  for (let i = 0; i < coords.length; i++) {
    const nextIdx = (i + 1) % coords.length;
    perimeterMeters += getDistanceMeters(
      coords[i][0], coords[i][1],
      coords[nextIdx][0], coords[nextIdx][1]
    );
  }

  // Shoelace Formula - Planar approximation for parcel area
  const midLat = coords.reduce((acc, c) => acc + c[0], 0) / coords.length;
  const metersPerDegLat = 111132.92;
  const metersPerDegLng = 111412.84 * Math.cos((midLat * Math.PI) / 180);

  let areaSqM = 0;
  for (let i = 0; i < coords.length; i++) {
    const j = (i + 1) % coords.length;
    const xi = coords[i][1] * metersPerDegLng;
    const yi = coords[i][0] * metersPerDegLat;
    const xj = coords[j][1] * metersPerDegLng;
    const yj = coords[j][0] * metersPerDegLat;
    areaSqM += xi * yj - xj * yi;
  }
  areaSqM = Math.abs(areaSqM) / 2;

  const perimeterFeet = Math.round(perimeterMeters * 3.28084);
  const areaSqFt = Math.round(areaSqM * 10.7639);
  const areaCents = (areaSqFt / 435.6).toFixed(2); // 1 Cent = 435.6 Sq.Ft

  return {
    perimeterFeet,
    perimeterMeters: Math.round(perimeterMeters),
    areaSqFt,
    areaCents
  };
}

// இரு புள்ளிகளுக்கு இடையிலான தூரத்தை (KM) கணக்கிடும் ஃபார்முலா
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

// தனித்துவமான மார்க்கர் ஐகான்
const createCustomIcon = (color = '#10b981') => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.35);">
        <div style="width: 8px; height: 8px; background: white; border-radius: 50%; transform: rotate(45deg);"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
};

export default function LandMap({ onSelectVisitPass, focusedLandId, filterDistrict }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const activePolygonRef = useRef(null);
  const userMarkerRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState(null);

  useEffect(() => {
    window.handleMapVisitPass = (landId) => {
      const selected = landsData.find((l) => (l.id || l._id) === landId);
      if (selected && onSelectVisitPass) {
        onSelectVisitPass(selected);
      }
    };

    return () => {
      delete window.handleMapVisitPass;
    };
  }, [onSelectVisitPass]);

  const drawBoundary = (coords, metrics) => {
    if (!mapInstanceRef.current) return;
    if (activePolygonRef.current) {
      mapInstanceRef.current.removeLayer(activePolygonRef.current);
    }

    const polygon = L.polygon(coords, {
      color: '#10b981',
      weight: 3,
      fillColor: '#34d399',
      fillOpacity: 0.35,
      dashArray: '4, 4'
    }).addTo(mapInstanceRef.current);

    if (metrics) {
      polygon.bindTooltip(`📐 சுற்றளவு: ${metrics.perimeterFeet} அடி | ${metrics.areaCents} சென்ட்`, {
        permanent: false,
        direction: 'center',
        className: 'bg-slate-900 text-emerald-400 font-bold px-2 py-1 rounded text-xs border border-emerald-500'
      });
    }

    activePolygonRef.current = polygon;
    setSelectedMetrics(metrics);
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([12.75, 80.1], 9);
      mapInstanceRef.current = map;

      // 1. தெரு வரைபடம் (Street Map)
      const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      // 2. செயற்கைக்கோள் பார்வை (Satellite Imagery)
      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri World Imagery'
      });

      L.control.layers({
        '🗺️ வரைபடம் (Map)': streetLayer,
        '🛰️ செயற்கைக்கோள் (Satellite)': satelliteLayer
      }, null, { position: 'topright' }).addTo(map);

      const defaultLocations = [
        { lat: 12.7480, lng: 80.1980 },
        { lat: 12.6840, lng: 79.9830 },
        { lat: 12.7880, lng: 80.2220 },
        { lat: 11.0168, lng: 76.9558 },
        { lat: 9.9252, lng: 78.1198 }
      ];

      if (Array.isArray(landsData) && landsData.length > 0) {
        landsData.forEach((land, index) => {
          const lat = land.lat || (land.location_coords && land.location_coords[0]) || defaultLocations[index % defaultLocations.length].lat;
          const lng = land.lng || (land.location_coords && land.location_coords[1]) || defaultLocations[index % defaultLocations.length].lng;
          const landId = land.id || land._id || `land-${index}`;

          const offset = 0.0018;
          const boundaryCoords = [
            [lat + offset, lng - offset],
            [lat + offset, lng + offset],
            [lat - offset, lng + offset],
            [lat - offset, lng - offset]
          ];

          const metrics = calculateLandMetrics(boundaryCoords);

          const marker = L.marker([lat, lng], {
            icon: createCustomIcon(land.type === 'plots' ? '#f59e0b' : '#10b981'),
          }).addTo(map);

          markersRef.current[landId] = { marker, lat, lng, boundaryCoords, land, metrics };

          const updatePopup = (distText = '') => {
            const popupHtml = `
              <div style="font-family: sans-serif; min-width: 210px; padding: 4px; color: #0f172a;">
                <span style="font-size: 10px; font-weight: bold; background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 9999px;">
                  ${land.tag || land.type || 'விவசாய நிலம்'}
                </span>
                <h4 style="margin: 6px 0 2px 0; font-size: 13px; font-weight: bold; color: #0f172a; line-height: 1.3;">
                  ${land.title || 'பிரீமியம் நிலம்'}
                </h4>
                <p style="margin: 0; font-size: 11px; color: #64748b;">
                  📍 ${land.location || land.district || 'தமிழ்நாடு'}
                </p>

                <!-- சுற்றளவு & எல்லை விவர பேட்ஜ் -->
                <div style="margin: 6px 0; padding: 6px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 11px;">
                  <div style="color: #0f172a; font-weight: 600;">📐 சுற்றளவு: <span style="color: #059669;">${metrics.perimeterFeet} அடி</span> (${metrics.perimeterMeters} மீ)</div>
                  <div style="color: #0f172a; font-weight: 600; margin-top: 2px;">🌾 பரப்பளவு: <span style="color: #059669;">${metrics.areaCents} சென்ட்</span> (${metrics.areaSqFt} ச.அடி)</div>
                </div>

                ${distText ? `<p style="margin: 4px 0 0 0; font-size: 11px; font-weight: bold; color: #2563eb;">🚗 உங்கள் இடத்திலிருந்து: ${distText} கி.மீ</p>` : ''}
                <div style="margin: 6px 0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: bold; color: #059669;">
                    💰 ${land.price || 'விலை தகவல்'}
                  </span>
                </div>
                <button 
                  onclick="window.handleMapVisitPass('${landId}')" 
                  style="width: 100%; background: #059669; color: white; border: none; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;"
                >
                  🎫 விசிட் பாஸ் பெறுக
                </button>
              </div>
            `;
            marker.bindPopup(popupHtml);
          };

          updatePopup();

          marker.on('click', () => {
            drawBoundary(boundaryCoords, metrics);
          });
        });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // பயனர் நேரலை இருப்பிடத்தைக் கண்டறியும் செயல்பாடு (Live GPS)
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('உங்கள் உலாவியில் GPS வசதி ஆதரிக்கப்படவில்லை.');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;
        setUserLocation({ lat: uLat, lng: uLng });
        setGpsLoading(false);

        if (mapInstanceRef.current) {
          if (userMarkerRef.current) {
            mapInstanceRef.current.removeLayer(userMarkerRef.current);
          }

          const uMarker = L.circleMarker([uLat, uLng], {
            radius: 8,
            fillColor: '#3b82f6',
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
          }).addTo(mapInstanceRef.current);

          uMarker.bindPopup('<b>📍 உங்கள் தற்போதைய இருப்பிடம்</b>').openPopup();
          userMarkerRef.current = uMarker;

          mapInstanceRef.current.flyTo([uLat, uLng], 12, { duration: 1.5 });

          Object.keys(markersRef.current).forEach((key) => {
            const item = markersRef.current[key];
            const dist = calculateDistance(uLat, uLng, item.lat, item.lng);
            const popupHtml = `
              <div style="font-family: sans-serif; min-width: 210px; padding: 4px; color: #0f172a;">
                <span style="font-size: 10px; font-weight: bold; background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 9999px;">
                  ${item.land.tag || item.land.type || 'விவசாய நிலம்'}
                </span>
                <h4 style="margin: 6px 0 2px 0; font-size: 13px; font-weight: bold; color: #0f172a; line-height: 1.3;">
                  ${item.land.title || 'பிரீமியம் நிலம்'}
                </h4>
                <p style="margin: 0; font-size: 11px; color: #64748b;">
                  📍 ${item.land.location || item.land.district || 'தமிழ்நாடு'}
                </p>

                <div style="margin: 6px 0; padding: 6px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 11px;">
                  <div style="color: #0f172a; font-weight: 600;">📐 சுற்றளவு: <span style="color: #059669;">${item.metrics.perimeterFeet} அடி</span></div>
                  <div style="color: #0f172a; font-weight: 600; margin-top: 2px;">🌾 பரப்பளவு: <span style="color: #059669;">${item.metrics.areaCents} சென்ட்</span></div>
                </div>

                <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: bold; color: #2563eb;">🚗 உங்கள் இடத்திலிருந்து: ${dist} கி.மீ</p>
                <div style="margin: 6px 0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: bold; color: #059669;">
                    💰 ${item.land.price || 'விலை தகவல்'}
                  </span>
                </div>
                <button 
                  onclick="window.handleMapVisitPass('${key}')" 
                  style="width: 100%; background: #059669; color: white; border: none; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;"
                >
                  🎫 விசிட் பாஸ் பெறுக
                </button>
              </div>
            `;
            item.marker.bindPopup(popupHtml);
          });
        }
      },
      (err) => {
        setGpsLoading(false);
        alert('இருப்பிட அனுமதி மறுக்கப்பட்டது அல்லது பிழை ஏற்பட்டது.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    if (focusedLandId && mapInstanceRef.current && markersRef.current[focusedLandId]) {
      const target = markersRef.current[focusedLandId];
      mapInstanceRef.current.flyTo([target.lat, target.lng], 16, { duration: 1.8 });
      drawBoundary(target.boundaryCoords, target.metrics);
      target.marker.openPopup();
    }
  }, [focusedLandId]);

  // மாவட்ட வடிகட்டி
  useEffect(() => {
    if (!mapInstanceRef.current || !filterDistrict || filterDistrict === 'அனைத்தும்') return;

    const districtCenters = {
      'செங்கல்பட்டு': [12.6939, 79.9757],
      'காஞ்சிபுரம்': [12.8342, 79.7036],
      'திருவள்ளூர்': [13.1437, 79.9079],
      'சென்னை': [13.0827, 80.2707],
    };

    const targetCoords = districtCenters[filterDistrict];
    if (targetCoords) {
      mapInstanceRef.current.flyTo(targetCoords, 11, { duration: 1.5 });
    }
  }, [filterDistrict]);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/60 p-3 backdrop-blur-md shadow-2xl">
      <div className="flex flex-wrap items-center justify-between pb-3 px-2 gap-2">
        <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
          📍 நேரலை நில அமைவிடம் & எல்லை வரைபடம் (GPS Boundary Map)
        </h4>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLocateMe}
            disabled={gpsLoading}
            className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1 rounded-full transition flex items-center gap-1 shadow-md disabled:opacity-50"
          >
            {gpsLoading ? '⏳ கண்டறிகிறது...' : '📍 என் இருப்பிடம் (Live GPS)'}
          </button>
          <span className="text-xs text-slate-100 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
            செயற்கைக்கோள் வசதியுடன்
          </span>
        </div>
      </div>

      {/* நில எல்லை & சுற்றளவு நேரலை தகவல் பட்டை */}
      {selectedMetrics && (
        <div className="mb-3 mx-1 p-2.5 bg-emerald-950/70 border border-emerald-500/40 rounded-xl flex flex-wrap items-center justify-between text-xs text-emerald-200">
          <span className="font-bold flex items-center gap-1.5 text-white">
            📐 நில எல்லைத் தகவல்:
          </span>
          <div className="flex items-center gap-4 font-medium">
            <span>சுற்றளவு: <strong className="text-emerald-400">{selectedMetrics.perimeterFeet} அடி</strong> ({selectedMetrics.perimeterMeters} மீ)</span>
            <span>பரப்பளவு: <strong className="text-emerald-400">{selectedMetrics.areaCents} சென்ட்</strong> ({selectedMetrics.areaSqFt} ச.அடி)</span>
          </div>
        </div>
      )}

      <div
        ref={mapContainerRef}
        style={{ height: '400px', width: '100%', borderRadius: '12px', zIndex: 10 }}
      />
    </div>
  );
}