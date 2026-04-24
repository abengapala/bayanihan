'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, MapPin, Mail, ExternalLink, Phone, Building2, Users, Landmark } from 'lucide-react';
import { legislators, hospitals, offices } from '@/data/seed-data';

type ResultType = 'legislator' | 'office' | 'hospital';

interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  subtitle: string;
  tags: string[];
  email?: string | null;
  email2?: string | null;
  phone?: string | null;
  facebook?: string | null;
  mapsUrl?: string | null;
  address?: string | null;
  program?: string | null;
  hotline?: string | null;
}

function buildAllResults(): SearchResult[] {
  const results: SearchResult[] = [];

  // Legislators (senators, party-lists, executive)
  for (const leg of legislators) {
    results.push({
      id: leg.id,
      type: 'legislator',
      title: leg.preferred_name,
      subtitle: leg.full_name,
      tags: [
        leg.legislator_type === 'senator' ? 'Senador' :
        leg.legislator_type === 'party_list_rep' ? 'Party-List' : 'Ehekutibo',
        leg.party_list_or_party ?? '',
        leg.program_name ?? '',
      ].filter(Boolean),
      email: leg.gl_email,
      email2: leg.gl_email_secondary,
      facebook: leg.facebook_page_url,
      address: leg.office_address,
      program: leg.program_name,
      hotline: leg.office_hotline,
    });
  }

  // Offices (PCSO, DSWD, Malasakit, etc.)
  for (const office of offices) {
    results.push({
      id: office.id,
      type: 'office',
      title: office.branch_name,
      subtitle: office.address_line,
      tags: [
        office.city_municipality,
        office.is_malasakit_center ? 'Malasakit Center' : '',
        office.host_hospital_name ?? '',
      ].filter(Boolean),
      phone: office.contact_number,
      mapsUrl: office.google_maps_url,
      address: office.address_line,
      hotline: office.contact_number,
    });
  }

  // Hospitals
  for (const hosp of hospitals) {
    results.push({
      id: hosp.id,
      type: 'hospital',
      title: hosp.name,
      subtitle: `${hosp.address} — ${hosp.city_municipality}`,
      tags: [hosp.hospital_type, hosp.city_municipality].filter(Boolean),
      phone: hosp.emergency_hotline,
      mapsUrl: hosp.google_maps_url
        ?? (hosp.coordinates
          ? `https://www.google.com/maps/?q=${hosp.coordinates.lat},${hosp.coordinates.lng}`
          : null),
      address: hosp.address,
    });
  }

  return results;
}

function matchesQuery(result: SearchResult, query: string): boolean {
  const q = query.toLowerCase();
  return (
    result.title.toLowerCase().includes(q) ||
    result.subtitle.toLowerCase().includes(q) ||
    result.tags.some(t => t.toLowerCase().includes(q)) ||
    (result.email?.toLowerCase().includes(q) ?? false) ||
    (result.address?.toLowerCase().includes(q) ?? false) ||
    (result.program?.toLowerCase().includes(q) ?? false)
  );
}

const typeIcon: Record<ResultType, React.ReactNode> = {
  legislator: <Users className="w-4 h-4 text-bayani-blue-500" />,
  office: <Building2 className="w-4 h-4 text-emerald-500" />,
  hospital: <Landmark className="w-4 h-4 text-red-500" />,
};

const typeLabel: Record<ResultType, string> = {
  legislator: 'Opisyal',
  office: 'Opisina',
  hospital: 'Ospital',
};

const typeBg: Record<ResultType, string> = {
  legislator: 'bg-bayani-blue-50 border-bayani-blue-100',
  office: 'bg-emerald-50 border-emerald-100',
  hospital: 'bg-red-50 border-red-100',
};

const ALL_RESULTS = buildAllResults();

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

export function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length >= 2
    ? ALL_RESULTS.filter(r => matchesQuery(r, query.trim())).slice(0, 20)
    : [];

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm px-4 pt-16 pb-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden border border-slate-200 animate-fade-in">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Hanapin ang opisyal, ospital, opisina..."
            className="flex-1 text-base bg-transparent outline-none placeholder:text-slate-400 text-slate-800"
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1">
          {query.trim().length < 2 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-slate-400 text-sm">Mag-type ng kahit 2 letra para maghanap</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {['PCSO', 'Bong Go', 'DSWD', 'PGH', 'Sagip', 'NCMH'].map(hint => (
                  <button
                    key={hint}
                    onClick={() => setQuery(hint)}
                    className="text-xs bg-slate-100 hover:bg-bayani-blue-50 hover:text-bayani-blue-700 text-slate-600 px-3 py-1 rounded-full transition-colors"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-slate-400 text-sm">Walang nahanap para sa <strong>"{query}"</strong></p>
              <p className="text-xs text-slate-300 mt-1">Subukan ang iba pang salita</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {results.map(result => (
                <li key={result.id} className={`p-4 ${typeBg[result.type]} border-l-4 mx-3 my-2 rounded-xl`}>
                  {/* Header */}
                  <div className="flex items-start gap-2 mb-2">
                    <div className="mt-0.5">{typeIcon[result.type]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-800 text-sm leading-snug">{result.title}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/70 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
                          {typeLabel[result.type]}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{result.subtitle}</p>
                    </div>
                  </div>

                  {/* Info chips */}
                  {result.program && (
                    <p className="text-xs text-slate-600 mb-2 italic">{result.program}</p>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.email && (
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${result.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs bg-bayani-blue-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-bayani-blue-600 transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        Mag-email
                      </a>
                    )}
                    {result.email2 && (
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${result.email2}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs bg-white border border-bayani-blue-200 text-bayani-blue-600 px-3 py-1.5 rounded-lg font-semibold hover:bg-bayani-blue-50 transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        Alt Email
                      </a>
                    )}
                    {result.mapsUrl && (
                      <a
                        href={result.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                      >
                        <MapPin className="w-3 h-3" />
                        Tingnan sa Mapa
                      </a>
                    )}
                    {result.facebook && (
                      <a
                        href={result.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Facebook
                      </a>
                    )}
                    {result.hotline && (
                      <a
                        href={`tel:${result.hotline}`}
                        className="flex items-center gap-1.5 text-xs bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        {result.hotline}
                      </a>
                    )}
                  </div>

                  {/* Address */}
                  {result.address && (
                    <p className="text-[11px] text-slate-400 mt-2 flex items-start gap-1">
                      <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                      {result.address}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
