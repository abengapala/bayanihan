'use client';

import React, { useState } from 'react';
import { Flag, X } from 'lucide-react';
import { FlagReason } from '@/data/types';

interface ReportWrongInfoProps {
  recordId: string;
  recordType: 'assistance_providers' | 'office_locations' | 'legislators' | 'hospitals';
  className?: string;
}

export function ReportWrongInfo({ recordId, recordType, className = '' }: ReportWrongInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reason, setReason] = useState<FlagReason>('wrong_info');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to Supabase via server action or API route.
    // For now, we simulate success since we're offline-first.
    console.log('Report submitted:', { recordId, recordType, reason, note });
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setNote('');
    }, 2000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`text-xs text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors ${className}`}
      >
        <Flag className="w-3 h-3" />
        Mag-report ng Mali
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-card shadow-2xl w-full max-w-md overflow-hidden relative animate-slide-up">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Mag-report ng Mali</h3>
              <p className="text-sm text-slate-500 mb-6">
                Salamat sa pagtulong na panatilihing tama ang impormasyon natin.
              </p>

              {submitted ? (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg text-center font-medium">
                  Salamat! Naipadala na ang iyong report.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-700">Dahilan (Reason)</label>
                    <select 
                      value={reason}
                      onChange={(e) => setReason(e.target.value as FlagReason)}
                      className="border border-slate-300 rounded-lg p-2.5 text-sm focus:border-bayani-blue-500 focus:ring-1 focus:ring-bayani-blue-500 outline-none"
                    >
                      <option value="wrong_info">Mali ang impormasyon (Wrong Info)</option>
                      <option value="office_closed">Sarado na ang opisina (Office Closed)</option>
                      <option value="email_invalid">Hindi gumagana ang email/number (Invalid Contact)</option>
                      <option value="other">Iba pa (Other)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-700">Detalye (Details)</label>
                    <textarea 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ilagay dito ang tamang impormasyon kung alam mo..."
                      className="border border-slate-300 rounded-lg p-2.5 text-sm h-24 resize-none focus:border-bayani-blue-500 focus:ring-1 focus:ring-bayani-blue-500 outline-none"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary mt-2">
                    Ipadala (Submit)
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
