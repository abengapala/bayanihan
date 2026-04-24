'use client';

import React, { useState } from 'react';
import { providers, offices } from '@/data/seed-data';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { HowToApplyModal } from '@/components/ui/HowToApplyModal';
import { Search, MapPin, Phone, Building2, BookOpen } from 'lucide-react';

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [activeGuide, setActiveGuide] = useState<{ providerId: string; providerName: string } | null>(null);

  const filteredOffices = offices.filter(office => {
    const provider = providers.find(p => p.id === office.provider_id);
    const matchesSearch =
      office.branch_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.city_municipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider?.name_fil.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || provider?.provider_type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <HowToApplyModal
        providerId={activeGuide?.providerId ?? null}
        providerName={activeGuide?.providerName ?? ''}
        onClose={() => setActiveGuide(null)}
      />

      <div className="mb-2">
        <h1 className="text-3xl font-bold mb-2 text-bayani-blue-900">Office Directory</h1>
        <p className="text-slate-500">Hanapin ang mga opisina ng PCSO, DSWD, at iba pang ahensya.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-bayani-blue-500 focus:border-bayani-blue-500 sm:text-sm transition-shadow"
            placeholder="Maghanap ng opisina o lokasyon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 md:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`filter-chip ${filterType === 'all' ? 'filter-chip-active' : ''}`}
          >
            Lahat
          </button>
          <button
            onClick={() => setFilterType('government')}
            className={`filter-chip ${filterType === 'government' ? 'filter-chip-active' : ''}`}
          >
            Gobyerno
          </button>
          <button
            onClick={() => setFilterType('ngo')}
            className={`filter-chip ${filterType === 'ngo' ? 'filter-chip-active' : ''}`}
          >
            NGO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffices.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">Walang Nahanap</h3>
            <p className="text-slate-500">Subukang ibahin ang iyong hinahanap.</p>
          </div>
        ) : (
          filteredOffices.map(office => {
            const provider = providers.find(p => p.id === office.provider_id);

            return (
              <div key={office.id} className="card flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-bold text-lg text-slate-800 leading-tight">
                      {provider?.acronym || provider?.name_fil} — {office.branch_name}
                    </h3>
                    <StatusBadge status={office.status} />
                  </div>
                  <p className="text-sm font-medium text-bayani-blue-600 mb-3">{provider?.name_en}</p>

                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                      <span>{office.address_line}, {office.city_municipality}, {office.region}</span>
                    </div>
                    {office.contact_number && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 shrink-0 text-slate-400" />
                        <a href={`tel:${office.contact_number}`} className="text-bayani-blue-600 hover:underline">
                          {office.contact_number}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                  {/* How to Apply button */}
                  <button
                    onClick={() => setActiveGuide({
                      providerId: office.provider_id,
                      providerName: provider?.name_en ?? office.branch_name,
                    })}
                    className="btn-secondary py-2 flex-1 text-sm bg-slate-50 border-slate-200 text-slate-700 hover:bg-bayani-blue-50 hover:text-bayani-blue-700 hover:border-bayani-blue-200 flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Paano Mag-apply
                  </button>

                  {office.google_maps_url && (
                    <a
                      href={office.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 py-2 text-sm"
                    >
                      Mapa
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
