import React from 'react';
import { ProviderStatus, OfficeStatus } from '@/data/types';
import { CheckCircle2, AlertCircle, XCircle, CalendarClock } from 'lucide-react';

interface StatusBadgeProps {
  status: ProviderStatus | OfficeStatus;
  statusNote?: string | null;
  className?: string;
}

export function StatusBadge({ status, statusNote, className = '' }: StatusBadgeProps) {
  let badgeClass = '';
  let label = '';
  let Icon = CheckCircle2;

  switch (status) {
    case 'active':
      badgeClass = 'badge-active';
      label = 'Aktibo (Active)';
      Icon = CheckCircle2;
      break;
    case 'temporarily_closed':
    case 'relocated':
      badgeClass = 'badge-closed';
      label = 'Sarado (Closed)';
      Icon = AlertCircle;
      break;
    case 'closed':
      badgeClass = 'badge-closed';
      label = 'Sarado (Closed)';
      Icon = AlertCircle;
      break;
    case 'no_funds':
      badgeClass = 'badge-nofunds';
      label = 'Puno na ang Pondo (No Funds)';
      Icon = XCircle;
      break;
    case 'seasonal':
      badgeClass = 'badge-seasonal';
      label = 'Pamanahon (Seasonal)';
      Icon = CalendarClock;
      break;
    default:
      badgeClass = 'bg-slate-100 text-slate-800 border-slate-200';
      label = 'Hindi Tiyak (Unknown)';
      Icon = AlertCircle;
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className={`badge ${badgeClass} w-fit`}>
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
      {statusNote && (
        <span className="text-xs text-slate-500 italic ml-1">
          Paalala: {statusNote}
        </span>
      )}
    </div>
  );
}
