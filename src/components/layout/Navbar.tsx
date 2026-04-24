'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListChecks, Search, Map as MapIcon, Users } from 'lucide-react';
import { GlobalSearch } from '@/components/ui/GlobalSearch';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Wizard', href: '/wizard', icon: ListChecks },
    { name: 'Directory', href: '/directory', icon: Search },
    { name: 'Map', href: '/map', icon: MapIcon },
    { name: 'Senators', href: '/legislators', icon: Users },
  ];

  return (
    <>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Desktop: glassmorphism pill */}
      <div className="hidden md:flex justify-center pt-2 pb-3 transition-colors duration-300" style={{ background: 'transparent' }}>
        <nav
          className={`w-full max-w-full rounded-2xl border px-6 py-2 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'bg-white/60 backdrop-blur-xl border-white/40 shadow-lg shadow-black/5'
              : 'bg-white/20 backdrop-blur-sm border-white/20 shadow-sm'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-bayani-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-bayani-blue-600 transition-colors">
              B
            </div>
            <div>
              <div className="font-bold text-base leading-tight text-bayani-blue-900">Bayanihan</div>
              <div className="text-xs text-slate-500 font-medium">Health Portal</div>
            </div>
          </Link>

          {/* Nav links + Search */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive
                      ? 'bg-bayani-blue-500 text-white'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Desktop Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="ml-2 flex items-center justify-center w-9 h-9 rounded-lg bg-bayani-blue-50 hover:bg-bayani-blue-100 text-bayani-blue-700 border border-bayani-blue-200 transition-all duration-200"
              title="Maghanap"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile: Floating pill bottom tab bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="mx-4 mb-3 bg-white rounded-2xl border border-slate-200 shadow-lg flex justify-around px-2 py-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex flex-col items-center flex-1 transition-all duration-200"
              >
                <div
                  className={`flex flex-col items-center gap-0.5 w-full py-1.5 px-1 rounded-xl transition-all duration-200 ${isActive ? 'bg-bayani-blue-500' : ''
                    }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-200 ${isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    strokeWidth={isActive ? 2.5 : 1.75}
                  />
                  <span
                    className={`text-[10px] font-medium transition-all duration-200 ${isActive ? 'text-white' : 'text-slate-400'
                      }`}
                  >
                    {link.name}
                  </span>
                </div>
              </Link>
            );
          })}

          {/* Mobile Search button — extra pill */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center flex-1 transition-all duration-200"
          >
            <div className="flex flex-col items-center gap-0.5 w-full py-1.5 px-1 rounded-xl transition-all duration-200 bg-bayani-blue-50">
              <Search className="w-5 h-5 text-bayani-blue-500" strokeWidth={2} />
              <span className="text-[10px] font-medium text-bayani-blue-600">Hanapin</span>
            </div>
          </button>
        </div>
      </nav>


    </>
  );
}
