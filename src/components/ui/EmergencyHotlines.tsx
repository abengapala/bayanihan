import React from 'react';
import { PhoneCall } from 'lucide-react';

export function EmergencyHotlines() {
  const hotlines = [
    { name: 'Malasakit Hotline', number: '1555' },
    { name: 'PCSO', number: '8241-4244' },
    { name: 'DSWD', number: '8-951-7000' },
    { name: 'DOH', number: '8651-7800' },
  ];

  return (
    <div className="hotline-strip">
      <span className="font-bold flex items-center gap-2">
        <PhoneCall className="w-4 h-4" />
        Emergency Hotlines:
      </span>
      {hotlines.map((hotline, index) => (
        <React.Fragment key={hotline.name}>
          <a 
            href={`tel:${hotline.number.replace(/-/g, '')}`} 
            className="hover:underline focus:outline-white rounded"
            aria-label={`Tawagan ang ${hotline.name}: ${hotline.number}`}
          >
            {hotline.name}: {hotline.number}
          </a>
          {index < hotlines.length - 1 && <span className="opacity-50">•</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
