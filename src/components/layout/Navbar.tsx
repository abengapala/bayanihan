'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListChecks, Search, Map as MapIcon, Users } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Wizard', href: '/wizard', icon: ListChecks },
    { name: 'Directory', href: '/directory', icon: Search },
    { name: 'Map', href: '/map', icon: MapIcon },
    { name: 'Senators', href: '/legislators', icon: Users },
  ];

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="hidden md:flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-bayani-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-bayani-blue-600 transition-colors">
            B
          </div>
          <div>
            <div className="font-bold text-lg leading-tight text-bayani-blue-900">Bayanihan</div>
            <div className="text-xs text-slate-500 font-medium">Health Portal</div>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-bayani-blue-500 ${
                  isActive ? 'text-bayani-blue-500' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Tab Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-bottom z-40 flex justify-around">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center gap-1 px-3 py-3 w-full transition-colors ${
                isActive ? 'text-bayani-blue-500' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'fill-bayani-blue-50/50' : ''}`} />
              <span className="text-[10px] font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
