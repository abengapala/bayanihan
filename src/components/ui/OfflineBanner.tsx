'use client';

import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  // Don't render anything if we are online
  if (isOnline) return null;

  return (
    <div className="offline-banner flex items-center justify-center gap-2">
      <WifiOff className="w-4 h-4" />
      <span>
        Ikaw ay offline — ginagamit ang naka-save na datos.
      </span>
    </div>
  );
}
