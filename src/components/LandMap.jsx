'use client';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import landsData from '../data/landsData.json';
import unitsData from '../data/landUnits.json';
import mapConfig from '../data/mapConfig.json';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const { mapDefaults, districtCenters, defaultLocations, uiLabels } = mapConfig;
const { conversionRates = {} } = unitsData;

// இரு புள்ளிகளுக்கு இடையிலான தூரத்தை மீட்டரில் கணக்கிடுதல்
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

// நில எல்லையின் சுற்றளவு மற்றும் பரப்பளவு கணக்கீடு
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

    activePolygonRef.current = polygon;
    setSelectedMetrics(metrics);
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView(
        mapDefaults.center || [12.75, 80.1], 
        mapDefaults.zoom || 9
      );
      mapInstanceRef.current = map;

      const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri World Imagery'
      });

      L.control.layers({
        '🗺️ வரைபடம் (Map)': streetLayer,
        '🛰️ செயற்கைக்கோள் (Satellite)': satelliteLayer
      }, null, { position: 'topright' }).addTo(map);

      if (Array.isArray(landsData) && landsData.length > 0) {
        landsData.forEach((land, index) => {
          const fallback = defaultLocations[index % defaultLocations.length];
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

          const updatePopup = (distText = '') => {
            const popupHtml = `
              <div style="font-family: sans-serif; min-width: 200px; padding: 2px; color: #0f172a;">
                <span style="font-size: 10px; font-weight: bold; background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 9999px;">
                  ${land.tag || land.type || uiLabels.defaultTag}
                </span>
                <h4 style="margin: 4px 0 2px 0; font-size: 12px; font-weight: bold; color: #0f172a; line-height: 1.3;">
                  ${land.title || uiLabels.defaultTitle}
                </h4>
                <p style="margin: 0; font-size: 11px; color: #64748b;">
                  📍 ${land.location || land.district || uiLabels.defaultLocation}
                </p>

                <div style="margin: 5px 0; padding: 5px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 11px;">
                  <div style="color: #0f172a; font-weight: 600;">📐 ${uiLabels.perimeterLabel} <span style="color: #059669;">${metrics.perimeterFeet} ${uiLabels.feetUnit}</span></div>
                  <div style="color: #0f172a; font-weight: 600; margin-top: 2px;">🌾 ${uiLabels.areaLabel} <span style="color: #059669;">${metrics.areaCents} ${uiLabels.centsUnit}</span></div>
                </div>

                ${distText ? `<p style="margin: 3px 0; font-size: 10px; font-weight: bold; color: #2563eb;">${uiLabels.distanceFromYou} ${distText}${uiLabels.kmUnit}</p>` : ''}
                <div style="margin: 4px 0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 11px; font-weight: bold; color: #059669;">
                    💰 ${land.price || uiLabels.defaultPrice}
                  </span>
                </div>
                <button 
                  onclick="window.handleMapVisitPass('${landId}')" 
                  style="width: 100%; background: #059669; color: white; border: none; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;"
                >
                  ${uiLabels.visitPassBtn}
                </button>
              </div>
            `;
            // பாப்அப் வரைபடத்தின் உச்சிக்கு வெளியே போகாமல் இருக்க autoPan வசதி
            marker.bindPopup(popupHtml, {
              autoPan: true,
              autoPanPaddingTopLeft: [20, 40],
              autoPanPaddingBottomRight: [20, 20],
              offset: [0, -12]
            });
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

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert(uiLabels.gpsUnsupported);
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

          uMarker.bindPopup(`<b>${uiLabels.userLocationTitle}</b>`).openPopup();
          userMarkerRef.current = uMarker;

          mapInstanceRef.current.flyTo([uLat, uLng], 12, { duration: 1.5 });

          Object.keys(markersRef.current).forEach((key) => {
            const item = markersRef.current[key];
            const dist = calculateDistance(uLat, uLng, item.lat, item.lng);
            const popupHtml = `
              <div style="font-family: sans-serif; min-width: 200px; padding: 2px; color: #0f172a;">
                <span style="font-size: 10px; font-weight: bold; background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 9999px;">
                  ${item.land.tag || item.land.type || uiLabels.defaultTag}
                </span>
                <h4 style="margin: 4px 0 2px 0; font-size: 12px; font-weight: bold; color: #0f172a; line-height: 1.3;">
                  ${item.land.title || uiLabels.defaultTitle}
                </h4>
                <p style="margin: 0; font-size: 11px; color: #64748b;">
                  📍 ${item.land.location || item.land.district || uiLabels.defaultLocation}
                </p>

                <div style="margin: 5px 0; padding: 5px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 11px;">
                  <div style="color: #0f172a; font-weight: 600;">📐 ${uiLabels.perimeterLabel} <span style="color: #059669;">${item.metrics.perimeterFeet} ${uiLabels.feetUnit}</span></div>
                  <div style="color: #0f172a; font-weight: 600; margin-top: 2px;">🌾 ${uiLabels.areaLabel} <span style="color: #059669;">${item.metrics.areaCents} ${uiLabels.centsUnit}</span></div>
                </div>

                <p style="margin: 3px 0; font-size: 10px; font-weight: bold; color: #2563eb;">${uiLabels.distanceFromYou} ${dist} ${uiLabels.kmUnit}</p>
                <div style="margin: 4px 0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 11px; font-weight: bold; color: #059669;">
                    💰 ${item.land.price || uiLabels.defaultPrice}
                  </span>
                </div>
                <button 
                  onclick="window.handleMapVisitPass('${key}')" 
                  style="width: 100%; background: #059669; color: white; border: none; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;"
                >
                  ${uiLabels.visitPassBtn}
                </button>
              </div>
            `;
            item.marker.bindPopup(popupHtml, {
              autoPan: true,
              autoPanPaddingTopLeft: [20, 40],
              autoPanPaddingBottomRight: [20, 20],
              offset: [0, -12]
            });
          });
        }
      },
      () => {
        setGpsLoading(false);
        alert(uiLabels.gpsError);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    if (focusedLandId && mapInstanceRef.current && markersRef.current[focusedLandId]) {
      const target = markersRef.current[focusedLandId];
      // பாப்அப் முழுமையாகத் தெரிய மேப்பை சற்றே இறக்கி மையப்படுத்துதல் (+0.0018)
      mapInstanceRef.current.flyTo(
        [target.lat + 0.0018, target.lng], 
        mapDefaults.focusedZoom || 16, 
        { duration: 1.8 }
      );
      drawBoundary(target.boundaryCoords, target.metrics);
      target.marker.openPopup();
    }
  }, [focusedLandId]);

  useEffect(() => {
    if (!mapInstanceRef.current || !filterDistrict || filterDistrict === 'அனைத்தும்') return;
    const targetCoords = districtCenters[filterDistrict];
    if (targetCoords) {
      mapInstanceRef.current.flyTo(targetCoords, mapDefaults.districtZoom || 11, { duration: 1.5 });
    }
  }, [filterDistrict]);

  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl">
      {/* 1. முதன்மைத் தலைப்புப் பட்டை */}
      <div className="flex flex-wrap items-center justify-between pb-3 px-1 gap-2 border-b border-slate-800">
        <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
          {uiLabels.title}
        </h4>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLocateMe}
            disabled={gpsLoading}
            className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1.5 rounded-full transition flex items-center gap-1 shadow-md disabled:opacity-50 cursor-pointer"
          >
            {gpsLoading ? uiLabels.locating : uiLabels.locateMe}
          </button>
          <span className="text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
            {uiLabels.satelliteBadge}
          </span>
        </div>
      </div>

      {/* 2. நில எல்லை & சுற்றளவு தகவல் கார்டுகள் (பளிச்சென்ற வடிவம்) */}
      {selectedMetrics && (
        <div className="my-3 p-3 bg-slate-950/80 border border-emerald-500/30 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
            <span className="text-base">📐</span>
            <span>{uiLabels.boundaryInfo}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* சுற்றளவு கார்டு */}
            <div className="bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-1.5 rounded-lg flex items-center gap-2">
              <span className="text-emerald-300 text-xs">{uiLabels.perimeterLabel}</span>
              <strong className="text-white text-sm font-bold">
                {selectedMetrics.perimeterFeet} {uiLabels.feetUnit}
              </strong>
              <span className="text-emerald-400/70 text-xs">({selectedMetrics.perimeterMeters} {uiLabels.meterUnit})</span>
            </div>

            {/* பரப்பளவு கார்டு */}
            <div className="bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-1.5 rounded-lg flex items-center gap-2">
              <span className="text-emerald-300 text-xs">{uiLabels.areaLabel}</span>
              <strong className="text-white text-sm font-bold">
                {selectedMetrics.areaCents} {uiLabels.centsUnit}
              </strong>
              <span className="text-emerald-400/70 text-xs">({selectedMetrics.areaSqFt} {uiLabels.sqftUnit})</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. வரைபடம் */}
      <div
        ref={mapContainerRef}
        className="mt-2"
        style={{ height: '430px', width: '100%', borderRadius: '12px', zIndex: 10 }}
      />
    </div>
  );
}