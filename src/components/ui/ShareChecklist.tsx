'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Requirement } from '@/data/types';

interface ShareChecklistProps {
  requirements: Requirement[];
  checkedIds: Set<string>;
  className?: string;
}

export function ShareChecklist({ requirements, checkedIds, className = '' }: ShareChecklistProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const textToShare = generateChecklistText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mga Kailangan para sa Medical Assistance',
          text: textToShare,
        });
      } catch (err) {
        // Fallback to clipboard if share is cancelled or fails
        copyToClipboard(textToShare);
      }
    } else {
      copyToClipboard(textToShare);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const generateChecklistText = () => {
    let text = '🏥 BAYANIHAN HEALTH PORTAL\n\nMga kinakailangang dokumento:\n\n';
    
    requirements.forEach((req, index) => {
      const isChecked = checkedIds.has(req.id);
      text += `${isChecked ? '✅' : '⬜'} ${req.document_name_fil}\n`;
      text += `   📍 Saan kukunin: ${req.where_to_get}\n`;
      text += `   📄 Kopya: ${req.copies_needed}${req.needs_notarization ? ' (Kailangan i-Notaryo)' : ''}\n\n`;
    });

    text += 'ℹ️ I-check ang kumpletong detalye sa Bayanihan Health Portal app.';
    return text;
  };

  return (
    <button 
      onClick={handleShare}
      className={`btn-secondary ${className}`}
      aria-label="I-share ang Checklist"
    >
      {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
      {copied ? 'Nakopya (Copied)' : 'I-share (Share)'}
    </button>
  );
}
