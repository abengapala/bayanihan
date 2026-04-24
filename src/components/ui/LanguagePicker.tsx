'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'bh-lang-chosen';

export function LanguagePicker() {
  const { i18n } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't picked a language yet
    const chosen = localStorage.getItem(STORAGE_KEY);
    if (!chosen) {
      setVisible(true);
    }
  }, []);

  const pick = (lang: 'en' | 'fil') => {
    i18n.changeLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden"
        style={{ animation: 'fadeScaleIn 0.35s cubic-bezier(.22,1,.36,1) both' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-bayani-blue-600 to-bayani-blue-400 px-8 pt-8 pb-6 text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-inner">
            B
          </div>
          <h1 className="text-white text-xl font-bold leading-tight">Bayanihan Health Portal</h1>
          <p className="text-blue-100 text-sm mt-1 leading-snug">
            Piliin ang wika / Choose your language
          </p>
        </div>

        {/* Buttons */}
        <div className="px-6 py-6 flex flex-col gap-3">
          <button
            id="lang-pick-filipino"
            onClick={() => pick('fil')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 border-bayani-blue-200 bg-bayani-blue-50 hover:bg-bayani-blue-100 hover:border-bayani-blue-400 text-bayani-blue-900 transition-all duration-200 group"
          >
            <span className="text-3xl">🇵🇭</span>
            <div className="text-left">
              <div className="font-bold text-base leading-tight">Filipino / Tagalog</div>
              <div className="text-sm text-slate-500">Gamitin ang Filipino</div>
            </div>
          </button>

          <button
            id="lang-pick-english"
            onClick={() => pick('en')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 text-slate-800 transition-all duration-200 group"
          >
            <span className="text-3xl">🇺🇸</span>
            <div className="text-left">
              <div className="font-bold text-base leading-tight">English</div>
              <div className="text-sm text-slate-500">Use English</div>
            </div>
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 pb-5">
          Maaari mong baguhin ito anumang oras • You can change this anytime
        </p>
      </div>

      <style>{`
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
