'use client';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import landsData from '../data/landsData.json';
import unitsData from '../data/landUnits.json';
import mapConfig from '../data/mapConfig.json';

const { mapDefaults = {}, districtCenters = {}, defaultLocations = [], uiLabels = {} } = mapConfig;
const { conversionRates = {} } = unitsData;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: mapDefaults.pinIconRetina,
  iconUrl: mapDefaults.pinIcon,
  shadowUrl: mapDefaults.pinShadow,
});

function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = mapDefaults.earthRadiusMeters || 6371000;
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

function calculateLandMetrics(coords) {
  let perimeterMeters = 0;
  for (let i = 0; i < coords.length; i++) {
    const nextIdx = (i + 1) % coords.length;
    perimeterMeters += getDistanceMeters(
      coords[i][0], coords[i][1],
      coords[nextIdx][0], coords[nextIdx][1]
    );
  }

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

  const perimeterFeet = Math.round(perimeterMeters * (mapDefaults.metersToFeet || 3.28084));
  const areaSqFt = Math.round(areaSqM * (mapDefaults.sqMetersToSqFt || 10.7639104));
  const centRate = conversionRates.cent || 435.6;
  const areaCents = (areaSqFt / centRate).toFixed(2);

  return {
    perimeterFeet,
    perimeterMeters: Math.round(perimeterMeters),
    areaSqFt,
    areaCents
  };
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = mapDefaults.earthRadiusKm || 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

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

  const [gpsLoading, setGpsLoading] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

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

    activePolygonRef.current = polygon;
    setSelectedMetrics(metrics);
  };

  const buildPopupContent = (land, landId, metrics, targetLat, targetLng, distText = '') => {
    const placeQuery = encodeURIComponent(`${land.village || ''}, ${land.taluk || ''}, ${land.district || ''}, Tamil Nadu`);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${placeQuery}&travelmode=driving`;
    return `
      <div style="font-family: sans-serif; min-width: 210px; padding: 2px; color: #0f172a;">
        <span style="font-size: 10px; font-weight: bold; background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 9999px;">
          ${land.tag || land.type || uiLabels.defaultTag || 'விற்பனைக்கு'}
        </span>
        <h4 style="margin: 4px 0 2px 0; font-size: 12px; font-weight: bold; color: #0f172a; line-height: 1.3;">
          ${land.title || uiLabels.defaultTitle || 'நில விவரம்'}
        </h4>
        <p style="margin: 0; font-size: 11px; color: #64748b;">
          📍 ${land.location || land.district || ''}
        </p>

        <div style="margin: 5px 0; padding: 5px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 11px;">
          <div style="color: #0f172a; font-weight: 600;">📐 ${uiLabels.perimeterLabel || 'சுற்றளவு'}: <span style="color: #059669;">${metrics.perimeterFeet} ${uiLabels.feetUnit || 'அடி'}</span></div>
          <div style="color: #0f172a; font-weight: 600; margin-top: 2px;">🌾 ${uiLabels.areaLabel || 'பரப்பளவு'}: <span style="color: #059669;">${metrics.areaCents} ${uiLabels.centsUnit || 'சென்ட்'}</span></div>
        </div>

        ${distText ? `<p style="margin: 4px 0; font-size: 11px; font-weight: bold; color: #2563eb;">🚗 ${uiLabels.distanceFromYou || 'உங்கள் இடத்திலிருந்து'}: ${distText}${uiLabels.kmUnit || 'கி.மீ'}</p>` : ''}
        
        <div style="margin: 4px 0; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 11px; font-weight: bold; color: #059669;">
            💰 ${land.price || uiLabels.defaultPrice || 'விலை தகவல்'}
          </span>
        </div>

        <div style="display: flex; gap: 6px; margin-top: 6px;">
          <button 
            onclick="window.handleMapVisitPass('${landId}')" 
            style="flex: 1; background: #059669; color: white; border: none; padding: 6px 4px; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;"
          >
            ${uiLabels.visitPassBtn || 'பாஸ் பெறுக'}
          </button>
          <a 
            href="${directionsUrl}" 
            target="_blank" 
            rel="noopener noreferrer"
            style="flex: 1; background: #2563eb; color: white; text-align: center; text-decoration: none; padding: 6px 4px; border-radius: 6px; font-size: 11px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 4px;"
          >
            ${uiLabels.directionsBtn || '🧭 வழித்தடம்'}
          </a>
        </div>
      </div>
    `;
  };

  const updateUserPinAndDistances = (lat, lng, isLiveGps = false, accuracy = 0) => {
    setGpsLoading(false);

    if (mapInstanceRef.current) {
      if (userMarkerRef.current) {
        mapInstanceRef.current.removeLayer(userMarkerRef.current);
      }

      const uMarker = L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: '#2563eb',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.95
      }).addTo(mapInstanceRef.current);

      const title = isLiveGps ? (uiLabels.userPinLiveTitle || '📍 உங்கள் நேரலை இருப்பிடம்') : (uiLabels.userPinManualTitle || '📍 நீங்கள் தேர்ந்தெடுத்த இடம்');
      const sub = isLiveGps 
        ? `${uiLabels.userPinLiveSubtitle || 'நேரலை ஜிபிஎஸ்'} (${uiLabels.accuracyLabel || 'துல்லியம்: ±'}${accuracy} ${uiLabels.meterUnit || 'மீ'})` 
        : (uiLabels.userPinManualSubtitle || 'தேர்ந்தெடுக்கப்பட்ட புள்ளி');

      uMarker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; text-align: center; padding: 4px;">
          <b>${title}</b><br/>
          <span style="color: #64748b; font-size: 10px;">${sub}</span>
        </div>
      `).openPopup();
      userMarkerRef.current = uMarker;

      if (markersRef.current) {
        Object.keys(markersRef.current).forEach((key) => {
          const item = markersRef.current[key];
          if (item && item.lat && item.lng && item.marker) {
            const dist = calculateDistance(lat, lng, item.lat, item.lng);
            item.marker.setPopupContent(
              buildPopupContent(item.land, key, item.metrics, item.lat, item.lng, dist)
            );
          }
        });
      }
    }
  };

  // ஊர் பெயரை வைத்துத் தேடும் Geocoding
  const handleSearchLocation = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !mapInstanceRef.current) return;

    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ', Tamil Nadu')}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const foundLat = parseFloat(data[0].lat);
        const foundLng = parseFloat(data[0].lon);
        mapInstanceRef.current.flyTo([foundLat, foundLng], 14, { duration: 1.5 });
        updateUserPinAndDistances(foundLat, foundLng, false);
      }
    } catch (err) {
      console.warn("Geocoding error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const fitAllProjectLands = () => {
    setGpsLoading(false);
    if (mapInstanceRef.current && markersRef.current) {
      const coords = Object.values(markersRef.current)
        .filter((m) => m && m.lat && m.lng)
        .map((m) => [m.lat, m.lng]);

      if (coords.length > 0) {
        mapInstanceRef.current.fitBounds(coords, { padding: [50, 50] });
      }
    }
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView(
        mapDefaults.center || [12.75, 80.1], 
        mapDefaults.zoom || 10
      );
      mapInstanceRef.current = map;

      const streetLayer = L.tileLayer(mapDefaults.tileLayerStreet || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      const satelliteLayer = L.tileLayer(mapDefaults.tileLayerSatellite || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri World Imagery'
      });

      L.control.layers({
        [uiLabels.streetMapLayer || '🗺️ வரைபடம்']: streetLayer,
        [uiLabels.satelliteMapLayer || '🛰️ செயற்கைக்கோள்']: satelliteLayer
      }, null, { position: 'topright' }).addTo(map);

      if (Array.isArray(landsData) && landsData.length > 0) {
        landsData.forEach((land, index) => {
          const fallback = defaultLocations[index % defaultLocations.length] || { lat: 12.6939, lng: 79.9757 };
          const lat = land.lat || (land.location_coords && land.location_coords[0]) || fallback.lat;
          const lng = land.lng || (land.location_coords && land.location_coords[1]) || fallback.lng;
          const landId = land.id || land._id || `land-${index}`;

          const offset = mapDefaults.boundaryOffset || 0.0018;
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

          marker.bindPopup(buildPopupContent(land, landId, metrics, lat, lng, ''), {
            autoPan: true,
            autoPanPaddingTopLeft: [20, 40],
            autoPanPaddingBottomRight: [20, 20],
            offset: [0, -12]
          });

          marker.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            drawBoundary(boundaryCoords, metrics);
          });
        });
      }

      // வரைபடத்தில் எங்கு தொட்டாலும் பயனர் இடம் மாறும் (Pin-Drop)
      map.on('click', (e) => {
        updateUserPinAndDistances(e.latlng.lat, e.latlng.lng, false);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  
  const handleLocateMe = () => {
    setGpsLoading(true);

    if (!navigator.geolocation) {
      alert("உங்கள் சாதனத்தில் ஜிபிஎஸ் வசதி ஆதரிக்கப்படவில்லை.");
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;
        setGpsLoading(false);

        if (mapInstanceRef.current && window.L) {
          const L = window.L;

          // பழைய பயனர் மார்க்கர் இருந்தால் நீக்குதல்
          if (userMarkerRef.current) {
            mapInstanceRef.current.removeLayer(userMarkerRef.current);
          }

          // பயனர் இருக்கும் இடத்தில் நீல நிற வட்டம் (Live Location Marker)
          const userIcon = L.divIcon({
            className: 'custom-user-pin',
            html: `
              <div style="position: relative; width: 26px; height: 26px;">
                <div style="position: absolute; width: 26px; height: 26px; background: rgba(37, 99, 235, 0.35); border-radius: 50%;"></div>
                <div style="position: absolute; top: 4px; left: 4px; width: 18px; height: 18px; background: #2563eb; border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>
              </div>
            `,
            iconSize: [26, 26],
            iconAnchor: [13, 13]
          });

          // மார்க்கரை மேப்பில் பதித்து பாப்-அப் திறத்தல்
          userMarkerRef.current = L.marker([uLat, uLng], { icon: userIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`<div style="font-family: sans-serif; font-weight: bold; color: #1e40af; text-align: center; padding: 2px;">📍 நீங்கள் இருக்கும் இடம்</div>`)
            .openPopup();

          // வரைபடம் பயனர் இருக்கும் இடத்திற்கு நேராகப் பறந்து செல்லும்
          mapInstanceRef.current.flyTo([uLat, uLng], 14, { duration: 1.5 });
        }
      },
      (error) => {
        setGpsLoading(false);
        console.warn("GPS issue:", error);
        fitAllProjectLands();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between pb-3 px-1 gap-2 border-b border-slate-800">
        <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
          {uiLabels.title || 'நேரலை நில அமைவிடம் & எல்லை வரைபடம் (GPS Boundary Map)'}
        </h4>
        <div className="flex items-center gap-2">
          
          <span className="text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
            {uiLabels.satelliteBadge || 'செயற்கைக்கோள் வசதியுடன்'}
          </span>
        </div>
      </div>

      {/* ஊர் பெயர் தேடல் பெட்டி (Search Box) */}
      <div className="mt-3 flex items-center gap-2">
        <form onSubmit={handleSearchLocation} className="flex-1 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={uiLabels.searchPlaceholder || "ஊர் பெயர் அல்லது லொகேஷன் தேடுக..."}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-1.5 rounded-lg font-medium transition cursor-pointer disabled:opacity-50"
          >
            {isSearching ? (uiLabels.searching || "தேடப்படுகிறது...") : (uiLabels.searchBtn || "தேடு")}
          </button>
        </form>
      </div>

      {selectedMetrics && (
        <div className="my-3 p-3 bg-slate-950/80 border border-emerald-500/30 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
            <span className="text-base">📐</span>
            <span>{uiLabels.boundaryInfo || 'நில எல்லைத் தகவல்:'}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-1.5 rounded-lg flex items-center gap-2">
              <span className="text-emerald-300 text-xs">{uiLabels.perimeterLabel || 'சுற்றளவு'}</span>
              <strong className="text-white text-sm font-bold">
                {selectedMetrics.perimeterFeet} {uiLabels.feetUnit || 'அடி'}
              </strong>
              <span className="text-emerald-400/70 text-xs">({selectedMetrics.perimeterMeters} {uiLabels.meterUnit || 'மீ'})</span>
            </div>

            <div className="bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-1.5 rounded-lg flex items-center gap-2">
              <span className="text-emerald-300 text-xs">{uiLabels.areaLabel || 'பரப்பளவு'}</span>
              <strong className="text-white text-sm font-bold">
                {selectedMetrics.areaCents} {uiLabels.centsUnit || 'சென்ட்'}
              </strong>
              <span className="text-emerald-400/70 text-xs">({selectedMetrics.areaSqFt} {uiLabels.sqftUnit || 'ச.அடி'})</span>
            </div>
          </div>
        </div>
      )}

      <div
        ref={mapContainerRef}
        className="mt-2"
        style={{ height: '430px', width: '100%', borderRadius: '12px', zIndex: 10 }}
      />
    </div>
  );
}