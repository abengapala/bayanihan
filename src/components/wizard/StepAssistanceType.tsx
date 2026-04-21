'use client';

import React from 'react';
import { useWizardStore } from '@/store/wizardStore';
import { AssistanceCategory } from '@/data/types';
import { Syringe, Pill, Droplets, Bed, HeartPulse, ActivitySquare } from 'lucide-react';

export function StepAssistanceType() {
  const { assistanceCategory, setAssistanceCategory, nextStep } = useWizardStore();

  const categories: { id: AssistanceCategory; labelFil: string; labelEn: string; icon: any }[] = [
    { id: 'surgery', labelFil: 'Operasyon', labelEn: 'Surgery', icon: ActivitySquare },
    { id: 'chemotherapy', labelFil: 'Chemotherapy', labelEn: 'Cancer Treatment', icon: HeartPulse },
    { id: 'dialysis', labelFil: 'Dialysis', labelEn: 'Hemodialysis', icon: Droplets },
    { id: 'medicines', labelFil: 'Gamot', labelEn: 'Medicines', icon: Pill },
    { id: 'confinement', labelFil: 'Pag-confine', labelEn: 'Hospital Bill', icon: Bed },
    { id: 'others', labelFil: 'Iba pa', labelEn: 'Labs / Procedures', icon: Syringe },
  ];

  const handleNext = () => {
    if (assistanceCategory) {
      nextStep();
    }
  };

  return (
    <div className="flex flex-col h-full animate-slide-in-right">
      <h2 className="text-xl font-bold mb-2">Anong tulong ang kailangan?</h2>
      <p className="text-slate-500 mb-6">Piliin ang pinaka-pangunahing dahilan kung bakit humihingi ng Guarantee Letter.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
        {categories.map((cat) => {
          const isSelected = assistanceCategory === cat.id;
          const Icon = cat.icon;
          
          return (
            <button
              key={cat.id}
              onClick={() => setAssistanceCategory(cat.id)}
              className={`card p-4 flex flex-col items-center justify-center gap-2 text-center border-2 transition-all ${
                isSelected 
                  ? 'border-bayani-blue-500 bg-bayani-blue-50/50 scale-[1.02] shadow-md' 
                  : 'border-transparent hover:border-bayani-blue-200'
              }`}
            >
              <div className={`p-3 rounded-full ${isSelected ? 'bg-bayani-blue-100' : 'bg-slate-100'}`}>
                <Icon className={`w-6 h-6 ${isSelected ? 'text-bayani-blue-600' : 'text-slate-500'}`} />
              </div>
              <div>
                <div className="font-bold text-sm md:text-base text-slate-800 leading-tight mb-0.5">{cat.labelFil}</div>
                <div className="text-xs text-slate-500">{cat.labelEn}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto flex justify-end pt-4 border-t border-slate-100">
        <button 
          onClick={handleNext} 
          disabled={!assistanceCategory}
          className="btn-primary w-full sm:w-auto"
        >
          Tingnan ang Dokumento
        </button>
      </div>
    </div>
  );
}
