'use client';

import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: Option[];
  value: string | null;
  onChange: (val: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div style={{
      display: 'flex',
      background: 'var(--color-card-dark-border)',
      borderRadius: '9999px',
      padding: '4px',
      gap: '4px',
    }}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            flex: 1,
            padding: '10px 20px',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.02em',
            transition: 'all 150ms ease',
            background: value === opt.value ? 'var(--color-brand)' : 'transparent',
            color: value === opt.value ? '#fff' : 'var(--color-text-muted)',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
