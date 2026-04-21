'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { offices as allOffices, providers, hospitals as allHospitals } from '@/data/seed-data';
import { useWizardStore } from '@/store/wizardStore';
import { Navigation, Hospital, Building2 } from 'lucide-react';

const Map = dynamic(
  () => import('@/components/map/LeafletMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] bg-slate-100 flex items-center justify-center rounded-2xl border border-slate-200 animate-pulse">
        <p className="text-slate-500 font-medium">Kinakarga ang mapa...</p>
      </div>
    )
  }
);

// Combine offices + hospitals into a unified OfficeLocation-compatible shape for the map
function buildMapLocations(officeFilter: string) {
  const officeLocations = allOffices
    .filter(office => {
      if (officeFilter === 'all' || officeFilter === 'hospitals') return officeFilter === 'all';
      if (officeFilter === 'malasakit') return office.is_malasakit_center;
      const provider = providers.find(p => p.id === office.provider_id);
      return provider?.acronym.toLowerCase() === officeFilter.toLowerCase();
    })
    .map(office => ({
      ...office,
      provider: providers.find(p => p.id === office.provider_id),
      markerType: office.is_malasakit_center ? 'malasakit' as const : 'office' as const,
    }));

  // Add hospitals as special "office" entries so the same map component handles them
  const hospitalLocations = (officeFilter === 'all' || officeFilter === 'hospitals')
    ? allHospitals.map(h => ({
        id: h.id,
        provider_id: 'hospital',
        branch_name: h.name,
        address_line: h.address,
        barangay: null,
        city_municipality: h.city_municipality,
        province: 'Metro Manila',
        region: h.region,
        coordinates: h.coordinates,
        google_maps_url: `https://maps.google.com/?q=${h.coordinates.lat},${h.coordinates.lng}`,
        is_malasakit_center: h.has_malasakit_center,
        host_hospital_name: h.name,
        landmark_description: h.malasakit_floor_room,
        accessible_via_public_transit: true,
        transit_directions_fil: null,
        floor_room_number: h.malasakit_floor_room,
        contact_number: h.emergency_hotline,
        status: 'active' as const,
        last_verified_at: new Date().toISOString(),
        provider: {
          id: 'hospital',
          name_en: h.name,
          name_fil: h.name,
          acronym: h.hospital_type === 'public' ? '🏥 Pampubliko' : '🏥 Pribado',
          provider_type: 'government' as const,
          logo_url: null,
          hotline_numbers: h.emergency_hotline ? [h.emergency_hotline] : [],
          email_gl_request: null,
          facebook_page_url: null,
          website_url: null,
          status: 'active' as const,
          status_note: h.has_malasakit_center ? `May Malasakit Center: ${h.malasakit_floor_room}` : null,
          operating_hours: '24/7',
          walk_in_accepted: true,
          coverage_scope: 'city' as const,
          eligibility_notes: null,
          max_assistance_amount: null,
          last_verified_at: new Date().toISOString(),
          verified_by: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        markerType: 'hospital' as const,
      }))
    : [];

  return [...officeLocations, ...hospitalLocations];
}

export default function MapPage() {
  const { userLocation, setUserLocation } = useWizardStore();
  const [filter, setFilter] = useState<string>('all');
  const [isLocating, setIsLocating] = useState(false);

  const locations = useMemo(() => buildMapLocations(filter), [filter]);

  const requestLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert('Hindi suportado ng iyong browser ang geolocation.');
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(position.coords.latitude, position.coords.longitude);
        setIsLocating(false);
      },
      () => {
        alert('Hindi makuha ang iyong lokasyon. Siguraduhing naka-on ang GPS.');
        setIsLocating(false);
      }
    );
  };

  const filters = [
    { key: 'all',       label: 'Lahat', icon: null },
    { key: 'malasakit', label: 'Malasakit Centers', icon: null },
    { key: 'hospitals', label: 'Mga Ospital', icon: null },
    { key: 'pcso',      label: 'PCSO Branches', icon: null },
    { key: 'dswd',      label: 'DSWD Offices', icon: null },
  ];

  return (
    // Use full viewport height minus the hotlines strip (~40px) and bottom nav on mobile (~64px)
    <div className="flex flex-col gap-3 animate-fade-in" style={{ height: 'calc(100dvh - 160px)' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-bayani-blue-900">Interactive Map</h1>
          <p className="text-sm text-slate-500">
            {locations.length} lokasyon — mga opisina, Malasakit Centers, at ospital
          </p>
        </div>
        <button
          onClick={requestLocation}
          disabled={isLocating}
          className="btn-secondary py-2 text-sm whitespace-nowrap w-full sm:w-auto"
        >
          <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
          {userLocation ? 'I-update ang Lokasyon Ko' : 'Hanapin ang Lokasyon Ko'}
        </button>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 shrink-0">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`filter-chip whitespace-nowrap ${filter === f.key ? 'filter-chip-active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-grow w-full relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 min-h-[350px]">
        <Map locations={locations} userLocation={userLocation} />
      </div>
    </div>
  );
}
