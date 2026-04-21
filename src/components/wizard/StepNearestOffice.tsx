'use client';

import React, { useState, useEffect } from 'react';
import { useWizardStore } from '@/store/wizardStore';
import { offices as allOffices, providers as allProviders } from '@/data/seed-data';
import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { VerificationWarning } from '@/components/ui/VerificationWarning';

// Haversine formula to calculate distance between two coordinates
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function StepNearestOffice() {
  const { userLocation, setUserLocation, nearestOffices, setNearestOffices } = useWizardStore();
  const [isLocating, setIsLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // If we haven't asked for location yet, let's just show all offices by default initially
    if (!userLocation && nearestOffices.length === 0) {
      const mergedOffices = allOffices.map(office => ({
        ...office,
        provider: allProviders.find(p => p.id === office.provider_id)
      }));
      setNearestOffices(mergedOffices);
    }
  }, [userLocation, nearestOffices.length, setNearestOffices]);

  const requestLocation = () => {
    setIsLocating(true);
    setErrorMsg(null);

    if (!navigator.geolocation) {
      setErrorMsg('Hindi suportado ng iyong browser ang geolocation.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation(latitude, longitude);
        
        // Calculate distances and sort
        const sorted = allOffices
          .map(office => ({
            ...office,
            distance: getDistanceFromLatLonInKm(latitude, longitude, office.coordinates.lat, office.coordinates.lng),
            provider: allProviders.find(p => p.id === office.provider_id)
          }))
          .sort((a, b) => (a.distance || 0) - (b.distance || 0))
          .slice(0, 5); // Take top 5

        setNearestOffices(sorted);
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location', error);
        setErrorMsg('Hindi makuha ang iyong lokasyon. Siguraduhing naka-on ang GPS.');
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="flex flex-col h-full animate-slide-in-right">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold">Pinakamalapit na Opisina</h2>
          <p className="text-slate-500 text-sm">Dalhin ang mga kumpletong dokumento sa mga opisina na ito.</p>
        </div>
        
        <button 
          onClick={requestLocation}
          disabled={isLocating}
          className="btn-secondary whitespace-nowrap text-sm py-2"
        >
          <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
          {isLocating ? 'Hinahanap...' : 'Gamitin ang aking Lokasyon'}
        </button>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4 border border-red-200">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {nearestOffices.map((office, idx) => (
          <div key={office.id} className="card p-5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-bayani-blue-900">{office.provider?.name_fil}</h3>
                  {office.distance !== undefined && (
                    <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {office.distance.toFixed(1)} km
                    </span>
                  )}
                </div>
                <p className="font-medium text-slate-700 mb-1">{office.branch_name}</p>
                <p className="text-sm text-slate-500 flex items-start gap-1">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  {office.address_line}, {office.city_municipality}
                </p>
              </div>
              <StatusBadge status={office.status} className="shrink-0" />
            </div>

            <VerificationWarning lastVerifiedAt={office.last_verified_at} className="mb-4" />

            <div className="bg-slate-50 rounded-lg p-3 text-sm mb-4">
              <span className="font-semibold text-slate-700 block mb-1">Paano Pumunta:</span>
              <p className="text-slate-600">{office.transit_directions_fil}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
              {office.contact_number && (
                <a href={`tel:${office.contact_number}`} className="btn-secondary flex-1 py-2 text-sm">
                  <Phone className="w-4 h-4" /> Tawagan: {office.contact_number}
                </a>
              )}
              {office.google_maps_url && (
                <a 
                  href={office.google_maps_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary flex-1 py-2 text-sm"
                >
                  <ExternalLink className="w-4 h-4" /> Google Maps
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="bg-bayani-blue-50 border border-bayani-blue-100 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
          <div className="w-12 h-12 bg-white text-bayani-blue-600 rounded-full shrink-0 flex items-center justify-center font-bold shadow-sm">
            📧
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-bayani-blue-900 text-lg mb-1">Magpadala ng Email Request</h3>
            <p className="text-bayani-blue-800 text-sm mb-4 leading-relaxed">
              Kung hindi ka makakapunta nang personal, maaari kang humingi ng tulong medikal sa mga Senador o Party-List online. 
              Awtomatikong isasama ng system ang mga dokumentong chineck mo sa email template!
            </p>
            <a href="/legislators" className="btn-primary inline-flex items-center gap-2 py-2 px-6 text-sm whitespace-nowrap w-full sm:w-auto justify-center">
              Pumili ng Opisyal <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
