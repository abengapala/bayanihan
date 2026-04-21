import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Search, MapPin, Users, HeartPulse, Building2 } from 'lucide-react';
import { providers, offices } from '@/data/seed-data';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="hero-bg rounded-[2rem] p-8 md:p-12 lg:p-16 text-white shadow-xl">
        <div className="max-w-3xl relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20">
            Libreng Medical Assistance Guide
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight drop-shadow-sm">
            Saan Ka Kukuha ng <br/><span className="text-bayani-gold-500">Tulong Medikal?</span>
          </h1>
          <p className="text-lg md:text-xl text-bayani-blue-50 mb-10 max-w-2xl leading-relaxed">
            Isang sentralisadong gabay para sa mga Pilipinong nangangailangan ng Guarantee Letter (GL) at tulong pinansyal mula sa PCSO, DSWD, at Malasakit Centers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/wizard" className="btn-gold text-lg px-8 py-4 w-full sm:w-auto shadow-lg shadow-bayani-gold-500/20">
              Hanapin ang mga Dokumento <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
            <Link href="/directory" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20 w-full sm:w-auto backdrop-blur-sm">
              Tingnan ang Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links / Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { 
            title: 'Requirements Wizard', 
            desc: 'Alamin kung anong mga papeles ang kailangan para sa iyong sitwasyon.',
            icon: FileText, href: '/wizard', color: 'bg-emerald-50 text-emerald-600' 
          },
          { 
            title: 'Office Directory', 
            desc: 'Hanapin ang eksaktong address ng mga sangay ng gobyerno at NGOs.',
            icon: Search, href: '/directory', color: 'bg-bayani-blue-50 text-bayani-blue-600' 
          },
          { 
            title: 'Interactive Map', 
            desc: 'Tingnan sa mapa ang mga pinakamalapit na Malasakit Centers.',
            icon: MapPin, href: '/map', color: 'bg-amber-50 text-amber-600' 
          },
          { 
            title: 'Mga Senador', 
            desc: 'Listahan ng mga senador na nagbibigay ng medical GL.',
            icon: Users, href: '/legislators', color: 'bg-purple-50 text-purple-600' 
          }
        ].map((feat, idx) => (
          <Link key={idx} href={feat.href} className="card group hover:-translate-y-1">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.color}`}>
              <feat.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-bayani-blue-600 transition-colors">{feat.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
          </Link>
        ))}
      </section>

      {/* Explainer Section */}
      <section className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <HeartPulse className="w-12 h-12 text-bayani-red-500 mx-auto mb-6" />
          <h2 className="mb-4">Ano ang Guarantee Letter (GL)?</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Ang Guarantee Letter (GL) ay isang pormal na sulat mula sa isang ahensya ng gobyerno o opisyal na nagsisigurong sila ang magbabayad ng bahagi o buong halaga ng iyong hospital bill o gamot. Dahil sa 2026 GAA "Anti-Epal" provisions, mas pinadali na ang pag-access sa tulong diretso sa mga ospital.
          </p>
          <Link href="/about" className="text-bayani-blue-600 font-bold hover:underline inline-flex items-center gap-1">
            Basahin ang kumpletong gabay <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-6">
          <div className="text-4xl font-black text-bayani-blue-500 mb-2">{providers.length}+</div>
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Ahensya</div>
        </div>
        <div className="p-6">
          <div className="text-4xl font-black text-bayani-blue-500 mb-2">{offices.length}+</div>
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Opisina</div>
        </div>
        <div className="p-6">
          <div className="text-4xl font-black text-bayani-blue-500 mb-2">150+</div>
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Malasakit Centers</div>
        </div>
        <div className="p-6">
          <div className="text-4xl font-black text-bayani-blue-500 mb-2">24/7</div>
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Offline Access</div>
        </div>
      </section>
    </div>
  );
}
