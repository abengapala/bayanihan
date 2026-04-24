'use client';

import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

interface Step {
  label: string;
  detail: string;
}

interface HowToApplyGuide {
  title: string;
  subtitle: string;
  applyUrl?: string;
  applyLabel?: string;
  isOnline: boolean;
  sections: {
    label: string;
    icon: string;
    steps: Step[];
  }[];
  notes?: string[];
}

// ── Guide definitions per provider ────────────────────────
const guides: Record<string, HowToApplyGuide> = {
  'pcso-id': {
    title: 'PCSO MAP Online Application',
    subtitle: 'Medical Assistance Program — Online Procedure',
    applyUrl: 'https://www.pcso.gov.ph',
    applyLabel: 'Pumunta sa PCSO Website',
    isOnline: true,
    sections: [
      {
        label: 'A. REGISTRATION',
        icon: '🖱️',
        steps: [
          {
            label: 'Pumunta sa official website',
            detail: 'Buksan ang www.pcso.gov.ph sa iyong browser.',
          },
          {
            label: 'I-click ang "E-Services" → "Online MAP Application"',
            detail: 'Hanapin ito sa menu ng website.',
          },
          {
            label: 'I-click ang "Create an Account"',
            detail: 'Fill-up-an mo lahat ng info na kailangan para ma-validate ang account mo.',
          },
          {
            label: 'I-check ang iyong email',
            detail: 'Hanapin ang message mula sa PCSO, tapos i-click o i-copy-paste ang "Validate Registration". Ma-re-redirect ka pabalik sa login page.',
          },
        ],
      },
      {
        label: 'B. LOGIN',
        icon: '🔑',
        steps: [
          {
            label: 'Bumalik sa www.pcso.gov.ph',
            detail: 'Piliin ang "E-Services" at i-click ang "Online MAP Application".',
          },
          {
            label: 'I-type ang iyong impormasyon',
            detail: 'First Name, Last Name, Birthday, at Email, tapos i-click ang "Login".',
          },
          {
            label: 'I-check ang email para sa OTP',
            detail: 'Copy-paste ang security code sa box tapos i-click ang "Submit".',
          },
        ],
      },
      {
        label: 'C. PAG-APPLY NG MEDICAL ASSISTANCE',
        icon: '🏥',
        steps: [
          {
            label: 'I-click ang "Application" → "Apply Now"',
            detail: 'Makikita ito sa menu pagkatapos mag-login.',
          },
          {
            label: 'Piliin ang ospital at uri ng tulong',
            detail: 'I-type ang pangalan ng Partner Health Facility at piliin ito sa listahan. Piliin ang City/Municipality at kung anong tulong ang kailangan.',
          },
          {
            label: 'Kumuha ng Queuing Number',
            detail: 'I-click ang "Get Queuing Number". Kapag lumabas na, pwede ka nang mag-upload ng requirements.',
          },
          {
            label: 'I-upload ang mga requirements',
            detail: 'Dapat PDF format ang files at hindi lalampas sa 2MB ang bawat isa.',
          },
          {
            label: 'I-click ang "Submit Application"',
            detail: 'Tapos na! Abangan ang resulta sa email o i-check sa portal.',
          },
        ],
      },
    ],
    notes: [
      'Kung lumabas ang "system has reached limit," quota na sila for the day. Subukan uli bukas ng 8:00 AM.',
      'Tanggap ang PDF files na hindi lalampas sa 2MB.',
      'Maaari ring mag-walk-in sa pinakamalapit na PCSO Branch Office.',
    ],
  },

  'dswd-id': {
    title: 'DSWD AICS — Assistance to Individuals in Crisis Situation',
    subtitle: 'Walk-in procedure sa pinakamalapit na DSWD Office o Malasakit Center',
    isOnline: false,
    sections: [
      {
        label: 'A. HAKBANG 1 — Pumunta sa DSWD o Malasakit Center',
        icon: '🏢',
        steps: [
          {
            label: 'Pumunta ng personal sa DSWD Office',
            detail: 'Puntahan ang pinakamalapit na DSWD Field Office NCR o ang Malasakit Center sa inyong ospital (kung mayroon). Walang online application para sa AICS.',
          },
          {
            label: 'Magdala ng lahat ng requirements',
            detail: 'Valid ID, Medical Certificate, SOA/Hospital Bill o Reseta, at Barangay Certificate of Indigency (kung mayroon).',
          },
        ],
      },
      {
        label: 'B. HAKBANG 2 — Social Worker Assessment',
        icon: '👥',
        steps: [
          {
            label: 'Makipag-usap sa Social Worker',
            detail: 'Susuriin ng DSWD Social Worker ang inyong sitwasyon. Ito ay tinatawag na Social Case Study.',
          },
          {
            label: 'Isumite ang mga dokumento',
            detail: 'Ibigay ang lahat ng inyong requirements sa Social Worker para sa assessment.',
          },
        ],
      },
      {
        label: 'C. HAKBANG 3 — Pag-apruba at Release',
        icon: '✅',
        steps: [
          {
            label: 'Abangan ang apruba',
            detail: 'Kapag naaprubahan, bibigyan kayo ng financial assistance o Guarantee Letter para sa ospital.',
          },
          {
            label: 'I-follow up kung kinakailangan',
            detail: 'Pumunta uli sa DSWD office o tumawag sa 8-951-7433 / 8-962-2813 para sa follow-up.',
          },
        ],
      },
    ],
    notes: [
      'Ang DSWD AICS ay para sa mga indigent at indibidwal na nasa krisis na sitwasyon.',
      'Kung nasa ospital na ang pasyente na may Malasakit Center, mas mabuting pumunta muna sa Medical Social Service (MSS) ng ospital para ma-endorse sa DSWD desk ng Malasakit Center.',
      'DSWD Hotline: 8-951-7433 / 8-962-2813 | Trunk Line: 8-931-81-01 to 07',
    ],
  },

  'malasakit-id': {
    title: 'Malasakit Center — One-Stop Shop',
    subtitle: 'Nasa loob ng pampublikong ospital — walk-in lamang',
    isOnline: false,
    sections: [
      {
        label: 'PAANO GAMITIN ANG MALASAKIT CENTER',
        icon: '🏥',
        steps: [
          {
            label: 'Pumunta sa Malasakit Center sa loob ng ospital',
            detail: 'Ang Malasakit Center ay nasa loob ng mga pampublikong ospital (PGH, NKTI, PCMC, EAMC, atbp.). Tanungin ang reception kung saan ito.',
          },
          {
            label: 'Kumuha ng number o pumila',
            detail: 'Mag-queue sa Malasakit Center. Pinagsama ang DSWD, DOH, PhilHealth, at PCSO sa isang lugar.',
          },
          {
            label: 'Magdala ng mga requirements',
            detail: 'Hospital Bill / SOA, Medical Certificate, at valid ID ng pasyente at processor.',
          },
          {
            label: 'Lalabasin kayo ng combined assistance',
            detail: 'Tutulong ang Malasakit Center na kumuha ng financial assistance mula sa iba\'t ibang ahensya nang sabay-sabay.',
          },
        ],
      },
    ],
    notes: [
      'Ito ang pinakamabilis na paraan kung naka-confine ang pasyente sa pampublikong ospital na may Malasakit Center.',
      'Operating hours: Lunes–Biyernes, 8AM–5PM. Depende sa ospital.',
      'DOH Hotline: 1555',
    ],
  },

  'doh-id': {
    title: 'DOH MAIFIP — Medical Assistance to Indigent Patients',
    subtitle: 'Sa pamamagitan ng Medical Social Worker ng ospital',
    isOnline: false,
    sections: [
      {
        label: 'PAANO MAG-APPLY NG DOH MAIFIP',
        icon: '🏥',
        steps: [
          {
            label: 'Lumapit sa Medical Social Worker (MSW) ng ospital',
            detail: 'Ang MAIFIP ay hindi direktang ina-apply — ang ospital mismo ang mag-a-apply para sa inyo sa pamamagitan ng MSW.',
          },
          {
            label: 'Isumite ang mga dokumento sa MSW',
            detail: 'Medical Certificate, Hospital Bill / SOA, at valid ID. Ang MSW ang mag-aasess ng inyong eligibility.',
          },
          {
            label: 'Abangan ang endorsement',
            detail: 'Kung qualified kayo, ie-endorse kayo ng MSW sa DOH para sa financial assistance.',
          },
        ],
      },
    ],
    notes: [
      'Para lamang sa mga pasyenteng naka-admit sa DOH-retained at pampublikong ospital.',
      'DOH Hotline: 1555 o (632) 8651-7800',
      'Email: callcenter@doh.gov.ph',
    ],
  },

  'philhealth-id': {
    title: 'PhilHealth — Philippine Health Insurance',
    subtitle: 'Awtomatikong benepisyo para sa mga aktibong miyembro',
    applyUrl: 'https://www.philhealth.gov.ph',
    applyLabel: 'PhilHealth Website',
    isOnline: false,
    sections: [
      {
        label: 'PAANO GAMITIN ANG PHILHEALTH SA OSPITAL',
        icon: '🏥',
        steps: [
          {
            label: 'Ipakita ang PhilHealth ID o membership number',
            detail: 'Sa oras ng admission sa ospital, ipakita ang inyong PhilHealth ID o ibigay ang PhilHealth Identification Number (PIN).',
          },
          {
            label: 'Siguraduhing aktibo ang membership',
            detail: 'Ang benepisyo ay matatanggap lamang kung ang membership ay aktibo at updated ang contributions.',
          },
          {
            label: 'Ang ospital ang mag-process para sa inyo',
            detail: 'Ang certified na ospital mismo ang mag-fi-file ng PhilHealth claim sa inyong pangalan. Hindi kayo kailangang pumunta ng PhilHealth office.',
          },
        ],
      },
    ],
    notes: [
      'Para sa mga katanungan tungkol sa membership status, tumawag sa (02) 8441-7442.',
      'Maaari ring i-check ang membership status sa philhealth.gov.ph.',
      'Kung hindi aktibo ang membership, maaaring bayaran ang contributions bago mag-ospital.',
    ],
  },
};

// ── Modal Component ────────────────────────────────────────
interface Props {
  providerId: string | null;
  providerName: string;
  onClose: () => void;
}

export function HowToApplyModal({ providerId, providerName, onClose }: Props) {
  const guide = providerId ? guides[providerId] : null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!providerId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm px-4 pt-12 pb-6 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-lg text-slate-800 leading-tight">
              {guide ? guide.title : providerName}
            </h2>
            {guide && (
              <p className="text-sm text-slate-500 mt-0.5">{guide.subtitle}</p>
            )}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 ml-3 shrink-0 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!guide ? (
          <div className="p-6 text-center text-slate-400">
            <AlertCircle className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p>Walang available na guide para sa provider na ito sa ngayon.</p>
          </div>
        ) : (
          <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Online badge */}
            <div className={`text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 ${
              guide.isOnline
                ? 'bg-bayani-blue-50 text-bayani-blue-700 border border-bayani-blue-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {guide.isOnline ? '💻 Online Application Available' : '🏢 Walk-in / Personal na Pumunta'}
            </div>

            {/* Apply button */}
            {guide.applyUrl && (
              <a
                href={guide.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full btn-primary py-2.5 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                {guide.applyLabel ?? 'Pumunta sa Website'}
              </a>
            )}

            {/* Sections */}
            {guide.sections.map((section, si) => (
              <div key={si}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{section.icon}</span>
                  <h3 className="font-bold text-sm text-bayani-blue-800 uppercase tracking-wide">{section.label}</h3>
                </div>
                <ol className="space-y-3">
                  {section.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-bayani-blue-100 text-bayani-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{step.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}

            {/* Notes */}
            {guide.notes && guide.notes.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-2">⚠️ Mga Paalala</p>
                {guide.notes.map((note, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">{note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-4 border-t border-slate-100">
          <button onClick={onClose} className="btn-secondary w-full py-2 text-sm">
            Isara
          </button>
        </div>
      </div>
    </div>
  );
}
