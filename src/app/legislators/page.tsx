'use client';

import React, { useState } from 'react';
import { legislators, assistanceTypes } from '@/data/seed-data';
import { useWizardStore } from '@/store/wizardStore';
import { Mail, AlertTriangle, Users, Clock, ExternalLink, Copy, Check } from 'lucide-react';
import { ReportWrongInfo } from '@/components/ui/ReportWrongInfo';

// Build email body shared by both app and web links
function buildEmailParts(gl_email: string, subject_format: string, documentsList?: string[]) {
  const subject = subject_format
    .replace('[Patient Name]', '')
    .replace('[Hospital Name]', '')
    .replace('[Diagnosis]', '');

  const defaultDocs = [
    '1. Medical Certificate / Clinical Abstract',
    '2. Statement of Account (SOA) o Reseta',
    '3. Barangay Certificate of Indigency',
    '4. Valid Government ID (pasyente at kamag-anak)',
  ];

  const docsToUse = documentsList && documentsList.length > 0
    ? documentsList.map((d, i) => `${i + 1}. ${d}`)
    : defaultDocs;

  const body = [
    'Magandang araw po,',
    '',
    'Ako po si [IYONG PANGALAN], kamag-anak ni [PANGALAN NG PASYENTE]',
    'na kasalukuyang naka-confine/nagpapagamot sa [PANGALAN NG OSPITAL].',
    '',
    'Humihingi po kami ng tulong medikal (Guarantee Letter) para sa',
    '[SAKIT / OPERASYON / GAMOT].',
    '',
    'Kasama po sa email na ito ang mga sumusunod na dokumento:',
    ...docsToUse,
    '',
    'Maraming salamat po at nawa ay mapaglingkuran ninyo kami.',
    '',
    'Lubos na gumagalang,',
    '[IYONG PANGALAN]',
    '[IYONG CONTACT NUMBER]',
  ].join('\n');

  return { to: gl_email, subject, body };
}

// Gmail web compose URL (desktop + browser fallback)
function buildGmailWebLink(gl_email: string, subject_format: string, documentsList?: string[]) {
  const { to, subject, body } = buildEmailParts(gl_email, subject_format, documentsList);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Handler: opens Gmail app on mobile, Gmail web on desktop
function openGmail(gl_email: string, subject_format: string, documentsList?: string[]) {
  const { to, subject, body } = buildEmailParts(gl_email, subject_format, documentsList);

  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isAndroid) {
    // Android Intent URL — directly opens Gmail app (not just any email app)
    const webLink = buildGmailWebLink(gl_email, subject_format, documentsList);
    const intentUrl = `intent:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}#Intent;scheme=mailto;package=com.google.android.gm;action=android.intent.action.SENDTO;S.browser_fallback_url=${encodeURIComponent(webLink)};end`;
    window.location.href = intentUrl;

  } else if (isIOS) {
    // iOS: try Gmail app via deep link using hidden iframe (avoids navigating away from page)
    const appLink = `googlegmail://co?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const webLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = appLink;
    document.body.appendChild(iframe);

    // After 1.5s, if Gmail app didn't open, fall back to Gmail web
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.open(webLink, '_blank');
    }, 1500);

  } else {
    // Desktop: open Gmail web compose in new tab — this IS the Gmail compose window
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      '_blank'
    );
  }
}

export default function LegislatorsPage() {
  const [filter, setFilter] = useState<'all' | 'senator' | 'party_list' | 'executive' | 'accepting'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // Pull checked documents from Wizard state (only after mount to avoid SSR hydration mismatch)
  const { checkedDocuments } = useWizardStore();
  const checkedDocNames = mounted && Array.isArray(checkedDocuments)
    ? assistanceTypes
        .flatMap(t => t.providerRequirements)
        .flatMap(p => p.requirements)
        .filter(req => checkedDocuments.includes(req.id))
        .map(req => req.label)
    : [];

  const filteredLegislators = legislators.filter(leg => {
    if (filter === 'senator') return leg.legislator_type === 'senator';
    if (filter === 'party_list') return leg.legislator_type === 'party_list_rep';
    if (filter === 'executive') return leg.legislator_type === 'executive';
    if (filter === 'accepting') return leg.currently_accepting;
    return true;
  });

  const handleCopyEmail = async (email: string, id: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const typeLabel: Record<string, string> = {
    senator: '🏛️ Senador',
    party_list_rep: '📋 Party-List',
    executive: '🇵🇭 Ehekutibo',
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="mb-2">
        <h1 className="text-3xl font-bold mb-2 text-bayani-blue-900">GL mula sa mga Opisyal</h1>
        <p className="text-slate-500 max-w-3xl leading-relaxed">
          Maaaring humingi ng Guarantee Letter sa mga opisina ng mga senador, party-list reps, at mga ehekutibong opisyal.
          Pindutin ang <strong>"Mag-email"</strong> para buksan ang iyong email app na may handa nang sulat.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 mb-2 shadow-sm">
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
        <div className="text-sm">
          <p className="font-bold mb-1">Paalala (2026 MAIFIP Policy)</p>
          <p>
            Kung nasa pampublikong ospital ka, <strong>lumapit muna sa Malasakit Center o Medical Social Worker</strong> —
            mas mabilis at libre. Ang paghingi sa mga opisyal ay pangalawa lamang na opsyon.
          </p>
        </div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
        {[
          { key: 'all', label: 'Lahat' },
          { key: 'senator', label: '🏛️ Senador' },
          { key: 'party_list', label: '📋 Party-List' },
          { key: 'executive', label: '🇵🇭 Ehekutibo (Pangulo/OVP)' },
          { key: 'accepting', label: '✅ Tumatanggap Ngayon' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as any)}
            className={`filter-chip whitespace-nowrap ${filter === f.key ? 'filter-chip-active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLegislators.map(leg => (
          <div key={leg.id} className="card p-0 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex gap-4 items-start">
              <div className="w-14 h-14 bg-bayani-blue-50 rounded-full shrink-0 flex items-center justify-center text-2xl">
                {leg.legislator_type === 'executive' ? '🇵🇭' : leg.legislator_type === 'party_list_rep' ? '📋' : '🏛️'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-lg text-slate-800 leading-tight">{leg.preferred_name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded shrink-0">
                    {typeLabel[leg.legislator_type] || leg.legislator_type}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-500 mb-2 truncate">{leg.full_name}</p>

                {leg.currently_accepting ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Tumatanggap ng Request
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    Hindi Muna Tumatanggap
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="p-5 bg-slate-50 flex-grow text-sm space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider font-medium block mb-0.5">Programa</span>
                  <span className="font-semibold text-slate-800 text-xs leading-snug">{leg.program_name || 'Medical Assistance'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider font-medium block mb-0.5">Processing</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    ~{leg.processing_days_estimate || 7} araw
                  </span>
                </div>
              </div>

              {leg.indigency_required && (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs px-3 py-2 rounded-lg font-medium">
                  ⚠️ Kailangan ng Barangay Certificate of Indigency
                </div>
              )}

              {leg.gl_email && (
                <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500 font-mono truncate">{leg.gl_email}</span>
                  <button
                    onClick={() => handleCopyEmail(leg.gl_email!, leg.id + '-copy')}
                    className="text-slate-400 hover:text-bayani-blue-500 shrink-0 transition-colors"
                    title="Kopyahin ang email"
                  >
                    {copiedId === leg.id + '-copy'
                      ? <Check className="w-4 h-4 text-emerald-500" />
                      : <Copy className="w-4 h-4" />
                    }
                  </button>
                </div>
              )}

              {leg.facebook_page_url && (
                <a
                  href={leg.facebook_page_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-bayani-blue-500 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> Official Facebook Page
                </a>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-white flex flex-col sm:flex-row gap-2 items-center justify-between border-t border-slate-100">
              <ReportWrongInfo recordId={leg.id} recordType="legislators" />

              {(!leg.currently_accepting || !leg.gl_email) ? (
                <button
                  className="btn-primary w-full sm:w-auto py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled
                  title={!leg.gl_email ? 'Walang email address' : 'Hindi muna tumatanggap'}
                >
                  <Mail className="w-4 h-4" />
                  Walk-in / Facebook lang
                </button>
              ) : (
                <button
                  onClick={() => openGmail(leg.gl_email!, leg.email_subject_format, checkedDocNames)}
                  className="btn-primary w-full sm:w-auto py-2 text-sm flex items-center justify-center gap-2"
                  title="Mag-email sa Gmail"
                >
                  <Mail className="w-4 h-4" />
                  Mag-email gamit ang Gmail
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
