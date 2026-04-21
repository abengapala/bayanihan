'use client';

import React from 'react';
import Link from 'next/link';
import { WifiOff, Home } from 'lucide-react';
import { EmergencyHotlines } from '@/components/ui/EmergencyHotlines';

export default function OfflinePage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center animate-fade-in text-center px-4">
      <div className="w-24 h-24 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
        <WifiOff className="w-12 h-12" />
      </div>
      
      <h1 className="text-3xl font-black text-bayani-blue-900 mb-4">Walang Internet Connection</h1>
      
      <p className="text-lg text-slate-600 max-w-md mx-auto mb-8">
        Huwag mag-alala! Maaari mo pa ring gamitin ang app para makita ang mga naka-save na requirements at mga opisina na huli mong hinanap.
      </p>

      <div className="w-full max-w-md bg-white rounded-card shadow-sm border border-slate-200 p-6 mb-8 text-left">
        <h3 className="font-bold text-slate-800 mb-4">Maaari mo pa ring i-access ang:</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-slate-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Requirements Checker (Wizard)
          </li>
          <li className="flex items-center gap-3 text-slate-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Basic Office Directory
          </li>
          <li className="flex items-center gap-3 text-slate-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Emergency Hotlines
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link href="/" className="btn-primary flex-1">
          <Home className="w-5 h-5" /> Bumalik sa Home
        </Link>
        <button onClick={() => window.location.reload()} className="btn-secondary flex-1">
          I-refresh
        </button>
      </div>
    </div>
  );
}
