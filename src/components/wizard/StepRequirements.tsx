'use client';

import React, { useMemo, useState } from 'react';
import { useWizardStore } from '@/store/wizardStore';
import { assistanceTypes } from '@/data/seed-data';
import { ProviderChannel } from '@/data/types';
import { Check, Info, FileText, AlertCircle, Printer, X } from 'lucide-react';

const CHANNEL_ORDER: ProviderChannel[] = ['pcso', 'dswd', 'senator'];

// ── Missing Docs Modal ─────────────────────────────────────────────────────
function MissingDocsModal({ missing, onClose, onProceed }: {
  missing: string[];
  onClose: () => void;
  onProceed: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-red-100 w-full max-w-sm animate-fade-in">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Hindi pa kumpleto!</h3>
            <p className="text-xs text-slate-500">May mga importanteng dokumento na hindi pa naka-check.</p>
          </div>
          <button onClick={onClose} className="ml-auto text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm text-slate-600 mb-3 font-medium">Mga dokumento na kailangan pa:</p>
          <ul className="space-y-2 mb-5">
            {missing.map((label, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">!</span>
                <span className="text-slate-700">{label}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2">
            <button
              onClick={onClose}
              className="btn-primary w-full py-2.5 text-sm"
            >
              Bumalik at kumpletuhin
            </button>
            <button
              onClick={onProceed}
              className="text-xs text-slate-400 hover:text-slate-600 underline text-center py-1"
            >
              Ituloy kahit kulang (hindi recommended)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Step Component ────────────────────────────────────────────────────
export function StepRequirements() {
  const {
    assistanceCategory,
    selectedChannel,
    setSelectedChannel,
    checkedDocuments,
    toggleDocument,
    nextStep,
  } = useWizardStore();

  const [showMissingModal, setShowMissingModal] = useState(false);
  const [missingDocs, setMissingDocs] = useState<string[]>([]);

  // Find the selected assistance type
  const selectedType = useMemo(() =>
    assistanceTypes.find(t => t.id === assistanceCategory) ?? null,
    [assistanceCategory]
  );

  // Get requirements for current channel
  const currentProviderReqs = useMemo(() => {
    if (!selectedType || !selectedChannel) return null;
    return selectedType.providerRequirements.find(p => p.channel === selectedChannel) ?? null;
  }, [selectedType, selectedChannel]);

  const reqs = currentProviderReqs?.requirements ?? [];
  const checkedSet = new Set(checkedDocuments);
  const requiredReqs = reqs.filter(r => r.isRequired);
  const checkedRequired = requiredReqs.filter(r => checkedSet.has(r.id));
  const progressPercentage = reqs.length > 0
    ? Math.round((checkedSet.size / reqs.length) * 100)
    : 0;

  const handleNext = () => {
    if (!selectedChannel) return;
    const missing = requiredReqs
      .filter(r => !checkedSet.has(r.id))
      .map(r => r.label);

    if (missing.length > 0) {
      setMissingDocs(missing);
      setShowMissingModal(true);
    } else {
      nextStep();
    }
  };

  return (
    <>
      {showMissingModal && (
        <MissingDocsModal
          missing={missingDocs}
          onClose={() => setShowMissingModal(false)}
          onProceed={() => { setShowMissingModal(false); nextStep(); }}
        />
      )}

      <div className="flex flex-col h-full animate-slide-in-right">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="text-xl font-bold">Mga Kailangang Dokumento</h2>
            {selectedType && (
              <p className="text-sm text-slate-500 mt-0.5">
                <span className="mr-1">{selectedType.icon}</span>
                {selectedType.title}
              </p>
            )}
          </div>
          {selectedChannel && (
            <div className="text-sm font-bold text-bayani-blue-600 bg-bayani-blue-50 px-3 py-1 rounded-full shrink-0">
              {checkedRequired.length} / {requiredReqs.length} Required
            </div>
          )}
        </div>

        {/* Channel Selector Tabs */}
        {selectedType && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Saan ka mag-a-apply?</p>
            <div className="grid grid-cols-3 gap-2">
              {CHANNEL_ORDER.map(ch => {
                const provReq = selectedType.providerRequirements.find(p => p.channel === ch);
                if (!provReq) return null;
                const isSelected = selectedChannel === ch;
                return (
                  <button
                    key={ch}
                    onClick={() => setSelectedChannel(ch)}
                    className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border-2 text-center transition-all duration-200 ${
                      isSelected
                        ? 'border-bayani-blue-500 bg-bayani-blue-50 shadow-sm'
                        : 'border-slate-200 hover:border-bayani-blue-200 bg-white'
                    }`}
                  >
                    <span className="text-xl">{provReq.icon}</span>
                    <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-bayani-blue-700' : 'text-slate-600'}`}>
                      {provReq.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* No channel selected yet */}
        {!selectedChannel ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">Pumili muna kung saan ka mag-a-apply</p>
            <p className="text-xs text-slate-400 mt-1">PCSO, DSWD, o Senador / Party-list</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 mb-3">
              I-check ang kahon kapag nakuha mo na ang dokumento.
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Requirements List */}
            <div className="flex flex-col gap-2.5 mb-6 overflow-y-auto flex-1 pr-1">
              {reqs.map((req) => {
                const isChecked = checkedSet.has(req.id);
                return (
                  <div
                    key={req.id}
                    onClick={() => toggleDocument(req.id)}
                    className={`checklist-item cursor-pointer ${isChecked ? 'checklist-item-checked' : ''}`}
                  >
                    <div className={`mt-1 shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                    }`}>
                      {isChecked && <Check className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <h3 className="font-bold text-slate-800 leading-tight text-sm">{req.label}</h3>
                        {!req.isRequired && (
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium shrink-0">
                            Optional
                          </span>
                        )}
                        {req.isRequired && !isChecked && (
                          <span className="text-[10px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-medium shrink-0">
                            Kailangan
                          </span>
                        )}
                      </div>
                      {req.note && (
                        <div className="tip-box flex items-start gap-1.5 mt-1.5">
                          <Info className="w-3.5 h-3.5 shrink-0 text-bayani-gold-600 mt-0.5" />
                          <span className="text-xs leading-relaxed">{req.note}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3 justify-between">
          <button
            onClick={() => window.print()}
            className="btn-secondary py-2 px-4 text-sm flex items-center gap-1.5"
            aria-label="I-print ang Checklist"
          >
            <Printer className="w-4 h-4" /> Print
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedChannel}
            className="btn-primary flex-1 py-2.5 text-sm"
          >
            Saan Pupunta →
          </button>
        </div>
      </div>
    </>
  );
}
