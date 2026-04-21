'use client';

import React from 'react';
import { useWizardStore } from '@/store/wizardStore';
import { Hospital, Bed, User, Activity } from 'lucide-react';

export function StepPatientSituation() {
  const { patientStatus, hospitalType, setPatientSituation, nextStep } = useWizardStore();

  const handleNext = () => {
    if (patientStatus && hospitalType) {
      nextStep();
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-slide-in-right">
      <div>
        <h2 className="text-xl font-bold mb-2">Ano ang sitwasyon ng pasyente?</h2>
        <p className="text-slate-500 mb-4">Piliin ang naaangkop na sitwasyon para malaman ang tamang dokumento.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setPatientSituation('confined', hospitalType || 'public')}
            className={`card p-6 flex flex-col items-center justify-center gap-3 text-center border-2 transition-all ${
              patientStatus === 'confined' ? 'border-bayani-blue-500 bg-bayani-blue-50/50 scale-[1.02]' : 'border-transparent hover:border-bayani-blue-200'
            }`}
          >
            <Bed className={`w-10 h-10 ${patientStatus === 'confined' ? 'text-bayani-blue-600' : 'text-slate-400'}`} />
            <div>
              <div className="font-bold text-lg text-slate-800">Naka-confine</div>
              <div className="text-sm text-slate-500">Nasa loob ng ospital (Admitted)</div>
            </div>
          </button>

          <button
            onClick={() => setPatientSituation('outpatient', hospitalType || 'public')}
            className={`card p-6 flex flex-col items-center justify-center gap-3 text-center border-2 transition-all ${
              patientStatus === 'outpatient' ? 'border-bayani-blue-500 bg-bayani-blue-50/50 scale-[1.02]' : 'border-transparent hover:border-bayani-blue-200'
            }`}
          >
            <User className={`w-10 h-10 ${patientStatus === 'outpatient' ? 'text-bayani-blue-600' : 'text-slate-400'}`} />
            <div>
              <div className="font-bold text-lg text-slate-800">Outpatient</div>
              <div className="text-sm text-slate-500">Pumunta lang para magpa-checkup o kumuha ng gamot</div>
            </div>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Anong uri ng ospital?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setPatientSituation(patientStatus || 'confined', 'public')}
            className={`card p-6 flex flex-col items-center justify-center gap-3 text-center border-2 transition-all ${
              hospitalType === 'public' ? 'border-bayani-blue-500 bg-bayani-blue-50/50 scale-[1.02]' : 'border-transparent hover:border-bayani-blue-200'
            }`}
          >
            <Hospital className={`w-10 h-10 ${hospitalType === 'public' ? 'text-bayani-blue-600' : 'text-slate-400'}`} />
            <div>
              <div className="font-bold text-lg text-slate-800">Pampubliko</div>
              <div className="text-sm text-slate-500">Government/Public Hospital</div>
            </div>
          </button>

          <button
            onClick={() => setPatientSituation(patientStatus || 'confined', 'private')}
            className={`card p-6 flex flex-col items-center justify-center gap-3 text-center border-2 transition-all ${
              hospitalType === 'private' ? 'border-bayani-blue-500 bg-bayani-blue-50/50 scale-[1.02]' : 'border-transparent hover:border-bayani-blue-200'
            }`}
          >
            <Activity className={`w-10 h-10 ${hospitalType === 'private' ? 'text-bayani-blue-600' : 'text-slate-400'}`} />
            <div>
              <div className="font-bold text-lg text-slate-800">Pribado</div>
              <div className="text-sm text-slate-500">Private Hospital</div>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button 
          onClick={handleNext} 
          disabled={!patientStatus || !hospitalType}
          className="btn-primary w-full sm:w-auto"
        >
          Susunod (Next)
        </button>
      </div>
    </div>
  );
}
