'use client';

import React, { useMemo } from 'react';
import { useWizardStore } from '@/store/wizardStore';
import { requirements as allRequirements } from '@/data/seed-data';
import { ShareChecklist } from '@/components/ui/ShareChecklist';
import { Check, Info, FileText, FileWarning, Printer } from 'lucide-react';

export function StepRequirements() {
  const { 
    hospitalType, 
    assistanceCategory, 
    patientStatus, 
    checkedDocuments, 
    toggleDocument,
    nextStep 
  } = useWizardStore();

  // Filter requirements based on current state
  const filteredRequirements = useMemo(() => {
    return allRequirements.filter(req => {
      const matchHospital = req.hospital_type === 'both' || req.hospital_type === hospitalType;
      // DSWD (and any provider using 'confinement' as a universal category) shows for ALL selected categories.
      // This is intentional — DSWD AICS covers all medical emergencies regardless of category type.
      const isDswd = req.provider_id === 'dswd-id';
      const matchCategory = isDswd || req.assistance_category === assistanceCategory;
      // 'either' means the requirement applies regardless of patient_status
      const matchStatus = req.patient_status === 'either' || req.patient_status === patientStatus;

      return matchHospital && matchCategory && matchStatus;
    }).sort((a, b) => {
      // Group by provider first (PCSO before DSWD), then sort_order within each group
      if (a.provider_id !== b.provider_id) return a.provider_id.localeCompare(b.provider_id);
      return a.sort_order - b.sort_order;
    });
  }, [hospitalType, assistanceCategory, patientStatus]);

  const checkedSet = new Set(checkedDocuments);
  const progressPercentage = filteredRequirements.length > 0 
    ? Math.round((checkedSet.size / filteredRequirements.length) * 100) 
    : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full animate-slide-in-right">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold">Mga Kailangang Dokumento</h2>
        <div className="text-sm font-bold text-bayani-blue-600 bg-bayani-blue-50 px-3 py-1 rounded-full">
          {checkedSet.size} / {filteredRequirements.length} Nakumpleto
        </div>
      </div>
      
      <p className="text-slate-500 mb-4">
        Ihanda ang mga sumusunod. I-check ang kahon kapag nakuha mo na ang dokumento.
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
        <div 
          className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {filteredRequirements.length === 0 ? (
          <div className="text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Walang nakitang listahan para sa kategoryang ito sa ngayon.</p>
          </div>
        ) : (
          (() => {
            let lastProviderId = '';
            return filteredRequirements.map(req => {
              const isChecked = checkedSet.has(req.id);
              const showProviderHeader = req.provider_id !== lastProviderId;
              lastProviderId = req.provider_id;
              const providerLabel = req.provider_id === 'pcso-id' ? '📋 PCSO — Individual Medical Assistance Program (IMAP)' :
                                   req.provider_id === 'dswd-id' ? '🏛️ DSWD — Assistance to Individuals in Crisis Situation (AICS)' :
                                   req.provider_id;
              return (
                <div key={req.id}>
                  {showProviderHeader && (
                    <div className="text-xs font-bold uppercase tracking-wider text-bayani-blue-600 bg-bayani-blue-50 border border-bayani-blue-100 px-4 py-2 rounded-lg mb-2 mt-4 first:mt-0">
                      {providerLabel}
                    </div>
                  )}
                  <div
                    onClick={() => toggleDocument(req.id)}
                    className={`checklist-item ${isChecked ? 'checklist-item-checked' : ''}`}
                  >
                    <div className={`mt-1 shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                    }`}>
                      {isChecked && <Check className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-slate-800 leading-tight">{req.document_name_fil}</h3>
                        {!req.is_required && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium shrink-0">
                            Kung Meron Lang
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{req.document_name_en}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          📍 {req.where_to_get}
                        </span>
                        <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded">
                          📄 {req.copies_needed} Kopya
                        </span>
                        {req.needs_notarization && (
                          <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-1 rounded flex items-center gap-1 border border-amber-200">
                            <FileWarning className="w-3 h-3" /> Kailangan Notaryado
                          </span>
                        )}
                      </div>

                      {req.tip_fil && (
                        <div className="tip-box flex items-start gap-2">
                          <Info className="w-4 h-4 shrink-0 text-bayani-gold-600 mt-0.5" />
                          <span>{req.tip_fil}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            });
          })()
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          <ShareChecklist 
            requirements={filteredRequirements} 
            checkedIds={checkedSet} 
            className="flex-1 sm:flex-none py-2 px-4 text-sm"
          />
          <button 
            onClick={handlePrint}
            className="btn-secondary py-2 px-4 flex-1 sm:flex-none text-sm"
            aria-label="I-print ang Checklist"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
        
        <button 
          onClick={nextStep} 
          className="btn-primary w-full sm:w-auto mt-2 sm:mt-0"
        >
          Saan Pupunta (Next)
        </button>
      </div>
    </div>
  );
}
