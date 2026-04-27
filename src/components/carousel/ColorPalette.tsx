'use client';

import React from 'react';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';

interface ColorPaletteProps {
  colors: string[];
}

export function ColorPalette({ colors }: ColorPaletteProps) {
  const { showToast } = useToast();

  const handleCopy = () => {
    const labels = ['primary', 'secondary', 'accent', 'highlight', 'neutral'];
    const obj = Object.fromEntries(colors.map((c, i) => [labels[i] ?? `color${i + 1}`, c]));
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2)).then(() => {
      showToast('Palette copied ✓', 'success');
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {colors.map(color => (
          <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div
              aria-label={`Color ${color}`}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: color,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.03em',
            }}>{color}</span>
          </div>
        ))}
      </div>
      <Button variant="secondary" size="sm" onClick={handleCopy} style={{ alignSelf: 'flex-start' }}>
        Copy Palette
      </Button>
    </div>
  );
}
