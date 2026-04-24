'use client';

import React, { useMemo } from 'react';
import { useWizardStore } from '@/store/wizardStore';
import { assistanceTypes } from '@/data/seed-data';
import { ShareChecklist } from '@/components/ui/ShareChecklist';
import { Check, Info, FileText, FileWarning, Printer } from 'lucide-react';

export function StepRequirements() {
  const {
    assistanceCategory,
    checkedDocuments,
    toggleDocument,
    nextStep,
  } = useWizardStore();

  // Find the selected assistance type
  const selectedType = useMemo(() =>
    assistanceTypes.find(t => t.id === assistanceCategory) ?? null,
    [assistanceCategory]
  );

  const reqs = selectedType?.requirements ?? [];
  const checkedSet = new Set(checkedDocuments);
  const progressPercentage = reqs.length > 0
    ? Math.round((checkedSet.size / reqs.length) * 100)
    : 0;

  const handlePrint = () => {
    window.print();
  };

  // Build a flat list compatible with ShareChecklist (id + document_name_fil)
  const shareableReqs = reqs.map(r => ({
    id: r.id,
    document_name_fil: r.label,
    document_name_en: r.label,
    is_required: r.isRequired,
    provider_id: '',
    hospital_type: 'both' as const,
    assistance_category: 'confinement' as const,
    patient_status: 'either' as const,
    copies_needed: 1,
    needs_notarization: false,
    where_to_get: '',
    tip_fil: r.note,
    sort_order: 0,
  }));

  return (
    <div className="flex flex-col h-full animate-slide-in-right">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold">Mga Kailangang Dokumento</h2>
        <div className="text-sm font-bold text-bayani-blue-600 bg-bayani-blue-50 px-3 py-1 rounded-full">
          {checkedSet.size} / {reqs.length} Nakumpleto
        </div>
      </div>

      {selectedType && (
        <p className="text-slate-500 mb-1 text-sm">
          <span className="mr-1">{selectedType.icon}</span>
          <strong>{selectedType.title}</strong> — {selectedType.titleEnglish}
        </p>
      )}

      <p className="text-slate-500 mb-4 text-sm">
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
        {reqs.length === 0 ? (
          <div className="text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Walang nakitang listahan para sa kategoryang ito sa ngayon.</p>
          </div>
        ) : (
          reqs.map((req) => {
            const isChecked = checkedSet.has(req.id);
            return (
              <div
                key={req.id}
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
                    <h3 className="font-bold text-slate-800 leading-tight">{req.label}</h3>
                    {!req.isRequired && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium shrink-0">
                        Kung Meron Lang
                      </span>
                    )}
                  </div>

                  {req.note && (
                    <div className="tip-box flex items-start gap-2 mt-2">
                      <Info className="w-4 h-4 shrink-0 text-bayani-gold-600 mt-0.5" />
                      <span className="text-xs">{req.note}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          <ShareChecklist
            requirements={shareableReqs}
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
