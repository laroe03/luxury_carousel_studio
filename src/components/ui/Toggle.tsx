'use client';

import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  onLabel?: string;
  offLabel?: string;
}

export function Toggle({ checked, onChange, label, onLabel, offLabel }: ToggleProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
      onClick={() => onChange(!checked)}
    >
      <div style={{
        width: '32px',
        height: '18px',
        borderRadius: '9px',
        background: checked ? 'var(--color-brand)' : 'var(--color-card-dark-border)',
        position: 'relative',
        transition: 'background 200ms ease',
        flexShrink: 0,
      }}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') onChange(!checked); }}
      >
        <div style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '16px' : '2px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 200ms ease',
        }} />
      </div>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '14px',
        color: 'var(--color-text-on-dark)',
      }}>
        {label ?? (checked ? (onLabel ?? 'ON') : (offLabel ?? 'OFF'))}
      </span>
    </div>
  );
}
