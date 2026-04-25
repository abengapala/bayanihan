'use client';

import React from 'react';
import { useWizardStore } from '@/store/wizardStore';
import { assistanceTypes } from '@/data/seed-data';
import { useTranslation } from 'react-i18next';

export function StepAssistanceType() {
  const { assistanceCategory, setAssistanceCategory, nextStep } = useWizardStore();
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const handleSelect = (id: string) => {
    setAssistanceCategory(id as any);
  };

  const handleNext = () => {
    if (assistanceCategory) {
      nextStep();
    }
  };

  return (
    <div className="flex flex-col h-full animate-slide-in-right">
      <h2 className="text-xl font-bold mb-2">{t('wizard.step2.title')}</h2>
      <p className="text-slate-500 mb-6">{t('wizard.step2.subtitle')}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
        {assistanceTypes.map((type) => {
          const isSelected = assistanceCategory === type.id;

          return (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`card p-4 flex flex-col items-center justify-center gap-2 text-center border-2 transition-all ${
                isSelected
                  ? 'border-bayani-blue-500 bg-bayani-blue-50/50 scale-[1.02] shadow-md'
                  : 'border-transparent hover:border-bayani-blue-200'
              }`}
            >
              <div className={`w-12 h-12 flex items-center justify-center text-2xl rounded-full ${isSelected ? 'bg-bayani-blue-100' : 'bg-slate-100'}`}>
                {type.icon}
              </div>
              <div>
                <div className="font-bold text-sm md:text-base text-slate-800 leading-tight mb-0.5">
                  {isEnglish ? type.titleEnglish : type.title}
                </div>
                <div className="text-xs text-slate-500">
                  {isEnglish ? type.title : type.titleEnglish}
                </div>
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
          {t('wizard.step2.next')}
        </button>
      </div>
    </div>
  );
}
