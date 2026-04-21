import React from 'react';
import Link from 'next/link';
import { ArrowRight, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-12 animate-fade-in pb-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-block bg-bayani-blue-50 text-bayani-blue-600 font-bold px-4 py-2 rounded-full mb-4">
          Gabay sa Pasyenteng Pilipino
        </div>
        <h1 className="text-4xl font-black text-bayani-blue-900 mb-4">Ano ang Guarantee Letter (GL)?</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Simpleng paliwanag kung paano gumagana ang medical assistance sa Pilipinas, 
          lalo na para sa mga walang kakayahang magbayad ng malaking hospital bill.
        </p>
      </div>

      {/* Basic Definition */}
      <section className="bg-white rounded-card shadow-sm border border-slate-100 p-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-bayani-blue-500" />
          Ibig Sabihin ng GL
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4 text-lg">
          Ang <strong>Guarantee Letter (GL)</strong> ay isang pormal na dokumento o "pangako" mula sa isang ahensya ng gobyerno (tulad ng DSWD, PCSO, DOH) o politiko na nagsasabing sila ang magbabayad ng bahagi o kabuuan ng iyong hospital bill, operasyon, o gamot.
        </p>
        <p className="text-slate-700 leading-relaxed text-lg">
          Ibinibigay ito sa Billing Section o Pharmacy ng ospital. Halimbawa, kung ang bill mo ay ₱50,000 at mayroon kang GL mula sa DSWD na nagkakahalaga ng ₱30,000, ₱20,000 na lang ang kailangan mong bayaran out-of-pocket (o maaari kang humingi pa ng GL sa ibang ahensya tulad ng PCSO para mapunan ito).
        </p>
      </section>

      {/* Malasakit Center */}
      <section className="bg-emerald-50 rounded-card border border-emerald-200 p-8">
        <h2 className="text-2xl font-bold mb-4 text-emerald-900">Pinakamabilis na Paraan: Malasakit Centers</h2>
        <p className="text-emerald-800 leading-relaxed mb-6">
          Upang hindi ka na magpalipat-lipat ng opisina, itinatag ang Malasakit Centers. Ito ay "one-stop shop" sa loob mismo ng mga pampublikong ospital kung saan magkakasama na ang mga desk ng apat na pangunahing ahensya:
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {['PhilHealth (Insurance)', 'PCSO (Charity)', 'DSWD (Social Welfare)', 'DOH (Health/MAIFIP)'].map((agency, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-bold text-slate-800">{agency}</span>
            </div>
          ))}
        </div>

        <p className="text-emerald-800 text-sm italic">
          Basta't ikaw ay nasa pampublikong ospital, lumapit muna sa Medical Social Service (MSS) o Malasakit Center bago lumabas at maghanap ng tulong sa mga politiko.
        </p>
      </section>

      {/* Policy Change Alert */}
      <section className="bg-amber-50 rounded-card border border-amber-200 p-8">
        <h2 className="text-xl font-bold mb-3 text-amber-900">2026 Policy Update: Hindi Na Kailangan ng Politiko</h2>
        <p className="text-amber-800 leading-relaxed">
          Dahil sa mga reporma sa budget noong 2026, unti-unti nang ipinagbabawal ang sistema kung saan kailangan mo pang pumunta sa opisina ng Mayor, Congressman, o Senador para "maka-hingi" ng GL para sa government funds (ang tinatawag na MAIFIP). Ang pondo ay ibinababa na diretso sa mga pampublikong ospital. Lumapit nang diretso sa Social Worker ng inyong ospital.
        </p>
      </section>

      {/* General Steps */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-bayani-blue-900">Pangkalahatang Hakbang</h2>
        <div className="space-y-4">
          {[
            { step: '1', title: 'Kunin ang Clinical Abstract / Medical Certificate', desc: 'Hingin ito sa attending physician. Siguraduhing may pirma at license number.' },
            { step: '2', title: 'Kunin ang SOA (Statement of Account) o Reseta', desc: 'Hingin ang official bill mula sa Billing Section, o ang official reseta / quotation ng gamot.' },
            { step: '3', title: 'Pumunta sa Social Worker (MSS)', desc: 'Sila ang mag-i-interview sa pasyente o kaanak at gagawa ng Social Case Study Report upang patunayan na kailangan ninyo ng tulong pinansyal.' },
            { step: '4', title: 'Ipasa sa Malasakit o sa Ahensya', desc: 'Kung walang Malasakit Center ang ospital, dalhin ang mga dokumento sa opisina ng DSWD o PCSO.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white rounded-card border border-slate-100 shadow-sm">
              <div className="w-10 h-10 shrink-0 bg-bayani-blue-100 text-bayani-blue-600 rounded-full flex items-center justify-center font-black text-xl">
                {item.step}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center pt-8 border-t border-slate-200">
        <p className="mb-6 text-slate-600">Handa na bang alamin kung anong mga dokumento ang kailangan ninyo?</p>
        <Link href="/wizard" className="btn-primary inline-flex items-center px-8 py-4 text-lg">
          <FileText className="w-5 h-5 mr-2" />
          Gamitin ang Requirements Wizard <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
}
