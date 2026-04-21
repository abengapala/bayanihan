'use client';

import React from 'react';
import { useWizardStore } from '@/store/wizardStore';
import { StepPatientSituation } from '@/components/wizard/StepPatientSituation';
import { StepAssistanceType } from '@/components/wizard/StepAssistanceType';
import { StepRequirements } from '@/components/wizard/StepRequirements';
import { StepNearestOffice } from '@/components/wizard/StepNearestOffice';
import { ArrowLeft } from 'lucide-react';

export default function WizardPage() {
  const { currentStep, prevStep } = useWizardStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    { num: 1, label: 'Pasyente' },
    { num: 2, label: 'Tulong' },
    { num: 3, label: 'Dokumento' },
    { num: 4, label: 'Lokasyon' },
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-[80vh]">
      {/* Header & Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          {currentStep > 1 && (
            <button 
              onClick={prevStep}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              aria-label="Bumalik (Go Back)"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-heading font-bold text-bayani-blue-900">
            Requirements Checker
          </h1>
        </div>

        <div className="step-indicator">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.num;
            const isComplete = currentStep > step.num;
            const isPending = currentStep < step.num;

            return (
              <React.Fragment key={step.num}>
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <div 
                    className={`step-dot ${
                      isActive ? 'step-dot-active' : 
                      isComplete ? 'step-dot-complete' : 
                      'step-dot-pending'
                    }`}
                  >
                    {step.num}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block ${
                    isActive ? 'text-bayani-blue-600' : 
                    isComplete ? 'text-emerald-600' : 
                    'text-slate-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
                
                {idx < steps.length - 1 && (
                  <div className={`step-line ${
                    isComplete ? 'step-line-active' : 'step-line-pending'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-grow bg-white rounded-card shadow-sm border border-slate-100 p-6 md:p-8 animate-fade-in relative overflow-hidden">
        {!mounted ? (
          <div className="w-full h-40 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-bayani-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {currentStep === 1 && <StepPatientSituation />}
            {currentStep === 2 && <StepAssistanceType />}
            {currentStep === 3 && <StepRequirements />}
            {currentStep === 4 && <StepNearestOffice />}
          </>
        )}
      </div>
    </div>
  );
}
