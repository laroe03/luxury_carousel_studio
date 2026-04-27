'use client';

import React, { useState } from 'react';
import { CarouselSlide } from '@/types/studio';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

interface CopyBlockProps {
  slides: CarouselSlide[];
}

function buildFullCopy(slides: CarouselSlide[]): string {
  return slides.map(s =>
    [
      `SLIDE ${s.slide_number} [${s.slide_type?.toUpperCase()}]`,
      s.headline,
      s.body ? `\n${s.body}` : '',
      s.design_note ? `\nDesign Note: ${s.design_note}` : '',
    ].filter(Boolean).join('\n')
  ).join('\n\n' + '─'.repeat(40) + '\n\n');
}

export function CopyBlock({ slides }: CopyBlockProps) {
  const { showToast } = useToast();
  const fullCopy = buildFullCopy(slides);

  const handleCopyAll = () => {
    navigator.clipboard.writeText(fullCopy).then(() => {
      showToast('Copied to clipboard ✓', 'success');
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <SectionLabel>Full Carousel Copy</SectionLabel>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            color: 'var(--color-text-muted)',
          }}>
            Copy everything at once — ready to paste into Canva or your notes.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={handleCopyAll}>
          COPY ALL
        </Button>
      </div>

      <textarea
        readOnly
        value={fullCopy}
        style={{
          width: '100%',
          height: '300px',
          background: 'var(--color-code-bg)',
          color: 'var(--color-text-on-dark)',
          border: '1px solid var(--color-card-dark-border)',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: "'Fira Code', 'Courier New', monospace",
          fontSize: '13px',
          lineHeight: 1.7,
          resize: 'vertical',
          outline: 'none',
          cursor: 'text',
        }}
      />
    </div>
  );
}
