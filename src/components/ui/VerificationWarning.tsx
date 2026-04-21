import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface VerificationWarningProps {
  lastVerifiedAt: string;
  className?: string;
}

export function VerificationWarning({ lastVerifiedAt, className = '' }: VerificationWarningProps) {
  const verifiedDate = new Date(lastVerifiedAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - verifiedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // If verified within the last 90 days, don't show a warning
  if (diffDays <= 90) return null;

  return (
    <div className={`flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg text-sm ${className}`}>
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Hindi pa na-verify ngayong buwan</p>
        <p className="text-amber-700 text-xs mt-0.5">
          I-double check po muna dahil baka nagbago na ang impormasyon. (Huling na-update: {verifiedDate.toLocaleDateString()})
        </p>
      </div>
    </div>
  );
}
