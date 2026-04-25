'use client';

import React, { useState, useEffect } from 'react';
import {
  X, Mail, MapPin, Phone, ExternalLink,
  Globe, Building2, Navigation, Facebook,
} from 'lucide-react';
import { Legislator, OfficeLocation } from '@/data/types';
import { providers } from '@/data/seed-data';

// ── Types ──────────────────────────────────────────────────
type TabId = 'apply' | 'map';

// ── Disclaimer banner ─────────────────────────────────────
function DisclaimerBanner() {
  return (
    <div className="shrink-0 mx-5 mb-4 bg-red-50 border border-red-200 rounded-2xl p-3.5 flex gap-2.5 items-start">
      <span className="text-lg leading-none shrink-0 mt-0.5">⚠️</span>
      <div className="text-xs text-red-800 leading-relaxed">
        <strong className="block mb-0.5">Paalala: Ito ay gabay lamang.</strong>
        Hindi garantisado ang tulong. Maraming opisina at senador ay <strong>maaaring walang budget</strong> o pansamantalang hindi tumatanggap.
        <span className="block mt-1">📞 <strong>Tawagan o i-message muna</strong> bago pumunta o magpadala ng email para maiwasan ang aksaya ng panahon at gastos.</span>
      </div>
    </div>
  );
}

// ── Gmail helper ───────────────────────────────────────────
function buildGmailLink(email: string, subjectFormat: string) {
  const subject = subjectFormat
    .replace('[Patient Name]', '')
    .replace('[Hospital Name]', '')
    .replace('[Diagnosis]', '');
  const body = [
    'Magandang araw po,',
    '',
    'Ako po si [IYONG PANGALAN], kamag-anak ni [PANGALAN NG PASYENTE]',
    'na kasalukuyang naka-confine/nagpapagamot sa [PANGALAN NG OSPITAL].',
    '',
    'Humihingi po kami ng tulong medikal (Guarantee Letter) para sa [SAKIT / GAMOT].',
    '',
    'Kasama po ang mga sumusunod na dokumento:',
    '1. Medical Certificate / Clinical Abstract',
    '2. Hospital Bill / SOA / Reseta',
    '3. Barangay Certificate of Indigency',
    '4. Valid ID ng pasyente at representative',
    '',
    'Maraming salamat po.',
    '',
    'Lubos na gumagalang,',
    '[IYONG PANGALAN]',
    '[CONTACT NUMBER]',
  ].join('\n');
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ── Tab button ─────────────────────────────────────────────
function Tab({ id, active, onClick, children }: {
  id: TabId; active: boolean; onClick: (id: TabId) => void; children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex-1 py-2.5 text-sm font-bold transition-colors rounded-xl ${
        active
          ? 'bg-bayani-blue-500 text-white shadow-sm'
          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
      }`}
    >
      {children}
    </button>
  );
}

// ── LEGISLATOR modal content ───────────────────────────────
function LegislatorContent({ leg, tab }: { leg: Legislator; tab: TabId }) {
  const hasEmail = !!leg.gl_email;

  if (tab === 'apply') {
    return (
      <div className="space-y-4 py-4">
        {/* Email */}
        {hasEmail ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              📧 Mag-email ng Request
            </p>
            <a
              href={buildGmailLink(leg.gl_email!, leg.email_subject_format)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-bayani-blue-50 border border-bayani-blue-200 hover:bg-bayani-blue-100 transition-colors"
            >
              <Mail className="w-4 h-4 text-bayani-blue-600 shrink-0" />
              <span className="text-sm font-semibold text-bayani-blue-700 break-all">{leg.gl_email}</span>
              <ExternalLink className="w-3.5 h-3.5 text-bayani-blue-400 shrink-0 ml-auto" />
            </a>
            {leg.gl_email_secondary && (
              <a
                href={buildGmailLink(leg.gl_email_secondary, leg.email_subject_format)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="text-sm text-slate-600 break-all">{leg.gl_email_secondary}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-auto" />
              </a>
            )}
            {/* Subject format tip */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              <span className="font-bold block mb-1">📋 Email Subject Format:</span>
              <span className="font-mono break-all">{leg.email_subject_format}</span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-500 text-center">
            ⚠️ Walang personal na email. Pumunta sa opisina o makipag-ugnayan sa Facebook page.
          </div>
        )}

        {/* Facebook */}
        {leg.facebook_page_url && (
          <a
            href={leg.facebook_page_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <Facebook className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-sm font-semibold text-blue-700">Official Facebook Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400 shrink-0 ml-auto" />
          </a>
        )}

        {/* Tip */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-800">
          💡 <strong>Tip:</strong> I-attach ang Medical Certificate, Hospital Bill, at valid ID sa email. Mag-follow up pagkatapos ng 3–7 araw kung walang sagot.
        </div>
      </div>
    );
  }


  // Walk-in tab
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <Building2 className="w-5 h-5 text-bayani-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-slate-800 text-sm mb-1">Opisina</p>
          <p className="text-sm text-slate-600">{leg.office_address || 'Senate of the Philippines, GSIS Bldg., Financial Center, Diokno Blvd., Pasay City'}</p>
        </div>
      </div>

      {leg.office_hotline && (
        <a
          href={`tel:${leg.office_hotline}`}
          className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
        >
          <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold text-emerald-700">{leg.office_hotline}</span>
        </a>
      )}

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(leg.office_address || 'Senate of the Philippines Pasay City')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-bayani-blue-500 text-white font-bold text-sm hover:bg-bayani-blue-600 transition-colors"
      >
        <Navigation className="w-4 h-4" />
        Buksan sa Google Maps
      </a>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-800">
        💡 <strong>Tip:</strong> Magdala ng lahat ng requirements (original + photocopy). Pumunta ng maaga — usually 8AM–5PM, Lunes–Biyernes.
      </div>
    </div>
  );
}

// ── OFFICE modal content ───────────────────────────────────
function OfficeContent({ office, tab }: { office: OfficeLocation; tab: TabId }) {
  const provider = providers.find(p => p.id === office.provider_id);

  // Online application URLs per provider
  const onlineUrl: Record<string, { url: string; label: string }> = {
    'pcso-id': { url: 'https://map.pcso.gov.ph', label: '🌐 PCSO Online MAP Application' },
    'dswd-id': { url: 'https://www.dswd.gov.ph', label: '🌐 DSWD Website' },
  };
  const online = onlineUrl[office.provider_id];

  if (tab === 'apply') {
    return (
      <div className="space-y-4 py-4">
        {online ? (
          <a
            href={online.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-bayani-blue-500 to-bayani-blue-700 text-white hover:opacity-95 transition-opacity"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold text-sm">{online.label}</div>
              <div className="text-xs text-white/80">{online.url.replace('https://', '')}</div>
            </div>
            <ExternalLink className="w-4 h-4 text-white/70 shrink-0" />
          </a>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800 text-center font-medium">
            🏢 Walk-in lamang — walang online application
          </div>
        )}

        <div className="bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-200">
          {office.floor_room_number && (
            <div className="px-4 py-3 flex items-start gap-3">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 font-semibold">{office.floor_room_number}</span>
            </div>
          )}
          {office.contact_number && (
            <a href={`tel:${office.contact_number}`} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-100 transition-colors">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-sm text-slate-700">{office.contact_number}</span>
            </a>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-800 leading-relaxed">
          💡 {office.is_malasakit_center
            ? 'Ang Malasakit Center ay nasa loob ng ospital. Pumunta sa reception para malaman ang lokasyon.'
            : provider?.name_fil === 'PCSO'
            ? 'Puwedeng mag-apply online sa map.pcso.gov.ph o pumunta personal sa branch.'
            : 'Magdala ng lahat ng requirements. Operating hours: Lunes–Biyernes, 8AM–5PM.'}
        </div>
      </div>
    );
  }

  // Map tab
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <MapPin className="w-5 h-5 text-bayani-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-slate-800 text-sm mb-1">{office.branch_name}</p>
          <p className="text-sm text-slate-600">{office.address_line}, {office.city_municipality}</p>
        </div>
      </div>

      {office.transit_directions_fil && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs font-bold text-amber-800 mb-1">🚌 Paano Pumunta:</p>
          <p className="text-sm text-amber-900 leading-relaxed">{office.transit_directions_fil}</p>
        </div>
      )}

      {office.google_maps_url ? (
        <a
          href={office.google_maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-bayani-blue-500 text-white font-bold text-sm hover:bg-bayani-blue-600 transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Buksan sa Google Maps
        </a>
      ) : (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address_line + ' ' + office.city_municipality)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-bayani-blue-500 text-white font-bold text-sm hover:bg-bayani-blue-600 transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Hanapin sa Google Maps
        </a>
      )}
    </div>
  );
}

// ── Main ProviderModal ─────────────────────────────────────
interface ProviderModalProps {
  legislator?: Legislator | null;
  office?: OfficeLocation | null;
  defaultTab?: TabId;
  onClose: () => void;
}

export function ProviderModal({ legislator, office, defaultTab = 'apply', onClose }: ProviderModalProps) {
  const [tab, setTab] = useState<TabId>(defaultTab);

  useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab, legislator, office]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!legislator && !office) return null;

  const title = legislator ? legislator.preferred_name : office?.branch_name ?? '';
  const subtitle = legislator
    ? (legislator.program_name ?? 'Medical Assistance')
    : (providers.find(p => p.id === office?.provider_id)?.name_en ?? '');

  const icon = legislator
    ? (legislator.legislator_type === 'executive' ? '🇵🇭' : legislator.legislator_type === 'party_list_rep' ? '📋' : '🏛️')
    : '🏢';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-0 sm:px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] animate-slide-up">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-slate-100 shrink-0">
          <div className="w-12 h-12 rounded-full bg-bayani-blue-50 flex items-center justify-center text-2xl shrink-0">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-slate-900 text-base leading-tight truncate">{title}</h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 shrink-0 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-4 flex gap-2 shrink-0">
          <Tab id="apply" active={tab === 'apply'} onClick={setTab}>
            {legislator ? '📧 Online / Email' : '📋 Paano Mag-apply'}
          </Tab>
          <Tab id="map" active={tab === 'map'} onClick={setTab}>
            {legislator ? '🏛️ Walk-in' : '📍 Mapa / Lokasyon'}
          </Tab>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-2">
          {legislator ? (
            <LegislatorContent leg={legislator} tab={tab} />
          ) : office ? (
            <OfficeContent office={office} tab={tab} />
          ) : null}
        </div>

        {/* Sticky disclaimer */}
        <DisclaimerBanner />
      </div>
    </div>
  );
}
