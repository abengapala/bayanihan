'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-6 mt-auto pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-bayani-blue-500 rounded flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="font-bold text-white text-lg">Bayanihan Health</span>
          </div>
          <p className="text-sm text-slate-400 max-w-xs">
            {t('footer.tagline')}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">{t('footer.quickLinks')}</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/wizard" className="hover:text-white transition-colors">Requirements Wizard</Link></li>
            <li><Link href="/directory" className="hover:text-white transition-colors">Directory</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">{t('footer.aboutGL')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">{t('footer.disclaimer')}</h4>
          <p className="text-xs text-slate-400">
            {t('footer.disclaimerText')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-xs text-center text-slate-500">
        &copy; {new Date().getFullYear()} Bayanihan Health Portal. {t('footer.madeBy')}
      </div>
    </footer>
  );
}
