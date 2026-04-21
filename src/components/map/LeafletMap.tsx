'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { OfficeLocation, AssistanceProvider } from '@/data/types';
import { Navigation, Phone, MapPin, Route, X, Clock, Milestone } from 'lucide-react';

// Fix default marker icons (webpack issue with Leaflet)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Create colored SVG marker icons for different location types
function createColoredIcon(color: string, emoji: string) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 36px; height: 36px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
      ">
        <span style="transform: rotate(45deg); font-size: 14px; line-height: 1;">${emoji}</span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
}

function createUserIcon() {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 40px; height: 40px;
        background: #2563eb;
        border-radius: 50%;
        border: 4px solid white;
        box-shadow: 0 0 0 3px #2563eb55, 0 4px 14px rgba(0,0,0,0.35);
        display: flex; align-items: center; justify-content: center;
        font-size: 18px;
      ">
        📍
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -24],
  });
}

const icons = {
  malasakit: createColoredIcon('#CE1126', '❤️'),
  hospital:  createColoredIcon('#059669', '🏥'),
  pcso:      createColoredIcon('#0038A8', '🏛️'),
  dswd:      createColoredIcon('#7c3aed', '🤝'),
  office:    createColoredIcon('#d97706', '📋'),
};

interface MapLocation extends Partial<OfficeLocation> {
  id: string;
  branch_name: string;
  address_line: string;
  city_municipality: string;
  coordinates: { lat: number; lng: number };
  google_maps_url?: string | null;
  contact_number?: string | null;
  is_malasakit_center?: boolean;
  markerType?: 'malasakit' | 'hospital' | 'office';
  provider?: AssistanceProvider;
}

interface OsrmStep {
  maneuver: { instruction?: string; type: string; modifier?: string };
  name: string;
  distance: number;
  duration: number;
}

interface RouteInfo {
  distanceKm: number;
  durationMin: number;
  steps: OsrmStep[];
  polyline: [number, number][];
}

interface LeafletMapProps {
  locations: MapLocation[];
  userLocation: { lat: number; lng: number } | null;
}

// Inner component to access the map instance for fitBounds
function RouteFitter({ bounds }: { bounds: L.LatLngBoundsExpression | null }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) map.fitBounds(bounds, { padding: [60, 60] });
  }, [bounds, map]);
  return null;
}

function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 14, { duration: 1.5 });
  }, [center, map]);
  return null;
}

// Format OSRM maneuver into Filipino-friendly text
function formatStep(step: OsrmStep): string {
  const type = step.maneuver.type;
  const modifier = step.maneuver.modifier || '';
  const name = step.name ? `sa ${step.name}` : '';
  const distM = Math.round(step.distance);

  if (type === 'depart') return `Magsimula — ${name}`;
  if (type === 'arrive') return `Dumating sa destinasyon ${name}`;
  if (type === 'turn') {
    if (modifier === 'left') return `Kumaliwa ${name} (${distM}m)`;
    if (modifier === 'right') return `Kumanan ${name} (${distM}m)`;
    if (modifier === 'straight') return `Diretso ${name} (${distM}m)`;
    return `Lumiko ${name} (${distM}m)`;
  }
  if (type === 'roundabout' || type === 'rotary') return `Pumasok sa rotonda ${name} (${distM}m)`;
  if (type === 'merge') return `Sumali sa kalsada ${name} (${distM}m)`;
  if (type === 'fork') {
    if (modifier === 'left') return `Sa sangaan, pumunta sa kaliwa ${name} (${distM}m)`;
    if (modifier === 'right') return `Sa sangaan, pumunta sa kanan ${name} (${distM}m)`;
    return `Sa sangaan ${name} (${distM}m)`;
  }
  return `Magpatuloy ${name} (${distM}m)`;
}

export default function LeafletMap({ locations, userLocation }: LeafletMapProps) {
  const defaultCenter: [number, number] = [14.5995, 120.9842];

  const [mounted, setMounted] = useState(false);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [routeBounds, setRouteBounds] = useState<L.LatLngBoundsExpression | null>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [showDirections, setShowDirections] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const fetchRoute = useCallback(async (dest: MapLocation) => {
    if (!userLocation) {
      alert("Pindutin muna ang 'Hanapin ang Lokasyon Ko' para malaman ang iyong posisyon.");
      return;
    }
    setLoadingRoute(true);
    setShowDirections(false);
    setRouteInfo(null);

    try {
      const { lat: uLat, lng: uLng } = userLocation;
      const { lat: dLat, lng: dLng } = dest.coordinates;
      const url = `https://router.project-osrm.org/route/v1/driving/${uLng},${uLat};${dLng},${dLat}?overview=full&geometries=geojson&steps=true`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('OSRM request failed');
      const data = await res.json();
      if (!data.routes?.length) throw new Error('Walang nahanap na ruta.');

      const route = data.routes[0];
      const distanceKm = +(route.distance / 1000).toFixed(2);
      const durationMin = Math.ceil(route.duration / 60);
      const coords: [number, number][] = route.geometry.coordinates.map(
        ([lng, lat]: [number, number]) => [lat, lng]
      );
      const steps: OsrmStep[] = route.legs[0]?.steps || [];

      setRouteInfo({ distanceKm, durationMin, steps, polyline: coords });
      setRouteBounds(coords.map(c => c as [number, number]));
      setShowDirections(true);
    } catch (err) {
      alert('Hindi makuha ang ruta. Subukan muli o gamitin ang Google Maps.');
    } finally {
      setLoadingRoute(false);
    }
  }, [userLocation]);

  const clearRoute = () => {
    setRouteInfo(null);
    setRouteBounds(null);
    setShowDirections(false);
  };

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[400px] bg-slate-100 flex items-center justify-center rounded-2xl">
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <div className="text-4xl">🗺️</div>
          <p className="font-medium">Nilo-load ang mapa...</p>
        </div>
      </div>
    );
  }

  function getIcon(location: MapLocation) {
    if (location.markerType === 'hospital') return icons.hospital;
    if (location.is_malasakit_center || location.markerType === 'malasakit') return icons.malasakit;
    const acronym = location.provider?.acronym?.toLowerCase() || '';
    if (acronym.includes('pcso')) return icons.pcso;
    if (acronym.includes('dswd')) return icons.dswd;
    return icons.office;
  }

  const googleMapsLink = (loc: MapLocation) =>
    `https://www.google.com/maps/dir/?api=1&destination=${loc.coordinates.lat},${loc.coordinates.lng}&travelmode=transit`;

  return (
    <div className="w-full h-full relative" style={{ minHeight: '350px' }}>
      <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter}
        zoom={userLocation ? 13 : 12}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', minHeight: '350px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routeBounds && <RouteFitter bounds={routeBounds} />}
        {!routeBounds && userLocation && (
          <MapController center={[userLocation.lat, userLocation.lng]} />
        )}

        {/* Route polyline */}
        {routeInfo && (
          <Polyline
            positions={routeInfo.polyline}
            pathOptions={{ color: '#2563eb', weight: 5, opacity: 0.85, dashArray: undefined }}
          />
        )}

        {/* User location marker */}
        {userLocation && (
          <>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={300}
              pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.12, weight: 1.5 }}
            />
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={createUserIcon()}
            >
              <Popup><strong>📍 Ang Iyong Lokasyon</strong></Popup>
            </Marker>
          </>
        )}

        {/* Office / hospital markers */}
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.coordinates.lat, loc.coordinates.lng]}
            icon={getIcon(loc)}
            eventHandlers={{ click: () => setSelectedLocation(loc) }}
          >
            <Popup>
              <div style={{ minWidth: '220px', fontFamily: 'system-ui, sans-serif' }}>
                <div style={{ fontWeight: 800, fontSize: '15px', color: '#0038A8', marginBottom: '4px' }}>
                  {loc.provider?.name_fil || loc.branch_name}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                  {loc.branch_name}
                </div>
                <div style={{ fontSize: '12px', color: '#374151', marginBottom: '8px', lineHeight: '1.5' }}>
                  📍 {loc.address_line}
                </div>
                {loc.is_malasakit_center && (
                  <div style={{ background: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, marginBottom: '8px' }}>
                    ❤️ May Malasakit Center
                  </div>
                )}
                {loc.provider?.status_note && (
                  <div style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', marginBottom: '8px' }}>
                    {loc.provider.status_note}
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {loc.contact_number && (
                    <a
                      href={`tel:${loc.contact_number}`}
                      style={{ background: '#eff6ff', color: '#1d4ed8', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', display: 'block' }}
                    >
                      📞 {loc.contact_number}
                    </a>
                  )}

                  {/* Kunin ang Ruta button */}
                  <button
                    onClick={() => fetchRoute(loc)}
                    disabled={loadingRoute}
                    style={{
                      background: loadingRoute ? '#94a3b8' : '#0038A8',
                      color: 'white',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: loadingRoute ? 'not-allowed' : 'pointer',
                      display: 'block',
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {loadingRoute ? '⏳ Hihintayin ang ruta...' : '🗺️ Kunin ang Ruta'}
                  </button>

                  {/* Google Maps fallback */}
                  <a
                    href={googleMapsLink(loc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: '#f1f5f9', color: '#475569', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, textDecoration: 'none', display: 'block', textAlign: 'center' }}
                  >
                    🔗 Buksan sa Google Maps
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-slate-200 z-[1000] text-xs font-medium space-y-1.5">
        <div className="font-bold text-slate-700 mb-2">Alamat ng Mapa</div>
        {[
          { color: '#CE1126', label: 'Malasakit Center' },
          { color: '#059669', label: 'Ospital' },
          { color: '#0038A8', label: 'PCSO' },
          { color: '#7c3aed', label: 'DSWD' },
          { color: '#d97706', label: 'Iba pang Opisina' },
          { color: '#2563eb', label: 'Iyong Lokasyon' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-slate-600">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Directions panel */}
      {showDirections && routeInfo && selectedLocation && (
        <div
          className="absolute top-3 right-3 z-[1000] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col"
          style={{ width: '300px', maxHeight: '75%', overflow: 'hidden' }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-3 bg-blue-700 text-white rounded-t-2xl shrink-0">
            <div>
              <div className="font-bold text-sm leading-tight">{selectedLocation.branch_name}</div>
              <div className="text-blue-200 text-xs mt-0.5" style={{ lineHeight: '1.4' }}>{selectedLocation.address_line}</div>
            </div>
            <button
              onClick={clearRoute}
              className="text-white/70 hover:text-white ml-2 shrink-0"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              aria-label="Isara"
            >
              <X size={18} />
            </button>
          </div>

          {/* Distance / ETA */}
          <div className="flex gap-3 px-4 py-3 border-b border-slate-100 shrink-0 bg-blue-50">
            <div className="flex items-center gap-1.5 text-blue-800 font-semibold text-sm">
              <Route size={14} />
              {routeInfo.distanceKm} km
            </div>
            <div className="flex items-center gap-1.5 text-blue-700 text-sm">
              <Clock size={14} />
              ~{routeInfo.durationMin} minuto (sasakyan)
            </div>
          </div>

          {/* Step-by-step directions */}
          <div className="overflow-y-auto flex-1 px-4 py-3 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Mga Direksyon</div>
            {routeInfo.steps.map((step, i) => (
              <div key={i} className="flex gap-2 text-xs text-slate-700">
                <Milestone size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <span>{formatStep(step)}</span>
              </div>
            ))}
          </div>

          {/* Footer: open in Google Maps */}
          <div className="px-4 py-3 border-t border-slate-100 shrink-0">
            <a
              href={googleMapsLink(selectedLocation)}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              🔗 Buksan sa Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
