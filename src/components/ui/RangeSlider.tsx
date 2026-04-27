'use client';

import React from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  ticks?: number[];
}

export function RangeSlider({ min, max, step = 1, value, onChange, ticks }: RangeSliderProps) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <span style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 700,
          fontSize: '48px',
          color: 'var(--color-accent-mint)',
          lineHeight: 1,
        }}>{value}</span>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: '12px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginTop: '4px',
        }}>SLIDES</p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%' }}
      />
      {ticks && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '8px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          color: 'var(--color-text-muted)',
        }}>
          {ticks.map(t => <span key={t}>{t}</span>)}
        </div>
      )}
    </div>
  );
}
