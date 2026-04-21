import React from 'react';
import { hospitals } from '@/data/seed-data';
import { Hospital as HospitalIcon, MapPin, Phone, CheckCircle2, XCircle } from 'lucide-react';

export default function HospitalsPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="mb-2">
        <h1 className="text-3xl font-bold mb-2 text-bayani-blue-900">Hospital Finder</h1>
        <p className="text-slate-500 max-w-3xl leading-relaxed">
          Hanapin ang mga pampubliko at pribadong ospital. 
          Unahin ang mga pampublikong ospital na may Malasakit Center para sa mas mabilis at libreng serbisyo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map(hospital => (
          <div key={hospital.id} className="card flex flex-col h-full border-t-4 border-t-bayani-blue-500">
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="font-bold text-lg text-slate-800 leading-tight">
                  {hospital.name}
                </h3>
              </div>
              
              <div className="flex gap-2 mb-4">
                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                  hospital.hospital_type === 'public' 
                    ? 'bg-bayani-blue-100 text-bayani-blue-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {hospital.hospital_type === 'public' ? 'Pampubliko (Public)' : 'Pribado (Private)'}
                </span>
                {hospital.has_malasakit_center && (
                  <span className="text-xs font-bold px-2 py-1 rounded bg-red-100 text-red-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> May Malasakit Center
                  </span>
                )}
              </div>
              
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                  <span>{hospital.address}, {hospital.city_municipality}, {hospital.region}</span>
                </div>
                
                {hospital.emergency_hotline && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 shrink-0 text-slate-400" />
                    <div>
                      <span className="text-xs text-slate-500 block">Emergency Hotline</span>
                      <a href={`tel:${hospital.emergency_hotline}`} className="text-red-600 font-bold hover:underline">
                        {hospital.emergency_hotline}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Tumatanggap ng PhilHealth?</span>
                {hospital.accepts_philhealth ? (
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold"><CheckCircle2 className="w-4 h-4"/> Oo</span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600 font-semibold"><XCircle className="w-4 h-4"/> Hindi</span>
                )}
              </div>
              
              {hospital.has_malasakit_center && hospital.malasakit_floor_room && (
                <div className="bg-slate-50 p-3 rounded-lg text-sm mt-3 border border-slate-200">
                  <span className="font-semibold text-slate-700 block mb-1">📍 Lokasyon ng Malasakit:</span>
                  <p className="text-slate-600">{hospital.malasakit_floor_room}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
