'use client';

import React from 'react';
import { DesignPreviewState } from '@/types/studio';
import { DARK_THEMES, LIGHT_THEMES } from '@/lib/themes';
import { FONT_PAIRINGS } from '@/lib/fontPairings';
import { SectionLabel } from '@/components/ui/SectionLabel';

const LAYOUTS = ['Centered', 'Split', 'Quote', 'List', 'Gradient', 'Card', 'Magazine'];

interface DesignControlPanelProps {
  value: DesignPreviewState;
  onChange: (updates: Partial<DesignPreviewState>) => void;
}

function PillButton({
  label,
  selected,
  onClick,
  fontFamily,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  fontFamily?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        borderRadius: '9999px',
        border: selected ? '1px solid var(--color-brand)' : '1px solid var(--color-card-dark-border)',
        background: selected ? 'rgba(255,107,157,0.12)' : 'var(--color-card-dark-border)',
        color: selected ? 'var(--color-brand)' : 'var(--color-text-muted)',
        cursor: 'pointer',
        fontFamily: fontFamily ?? "'DM Sans', sans-serif",
        fontSize: '13px',
        fontWeight: 600,
        transition: 'all 150ms ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

function SizeControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <SectionLabel style={{ marginBottom: 0, minWidth: '40px' }}>{label}</SectionLabel>
      <button
        onClick={() => onChange(Math.max(60, value - 10))}
        style={{ background: 'var(--color-card-dark-border)', border: 'none', color: '#fff', width: '28px', height: '28px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
      >−</button>
      <span style={{
        fontFamily: "'Sora', sans-serif",
        fontWeight: 600,
        fontSize: '18px',
        color: 'var(--color-accent-mint)',
        minWidth: '50px',
        textAlign: 'center',
      }}>{value}%</span>
      <button
        onClick={() => onChange(Math.min(160, value + 10))}
        style={{ background: 'var(--color-card-dark-border)', border: 'none', color: '#fff', width: '28px', height: '28px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
      >+</button>
    </div>
  );
}

export function DesignControlPanel({ value, onChange }: DesignControlPanelProps) {
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--color-card-dark-border)',
  };

  const pillGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Row 1: Theme */}
      <div style={rowStyle}>
        <SectionLabel>Theme</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Dark</p>
            <div style={pillGroupStyle}>
              {DARK_THEMES.map(t => (
                <PillButton key={t.name} label={t.name} selected={value.theme === t.name} onClick={() => onChange({ theme: t.name })} />
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Light</p>
            <div style={pillGroupStyle}>
              {LIGHT_THEMES.map(t => (
                <PillButton key={t.name} label={t.name} selected={value.theme === t.name} onClick={() => onChange({ theme: t.name })} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Font */}
      <div style={rowStyle}>
        <SectionLabel>Font Pairing</SectionLabel>
        <div style={pillGroupStyle}>
          {FONT_PAIRINGS.map(fp => (
            <PillButton
              key={fp.name}
              label={fp.name}
              selected={value.fontPairing === fp.name}
              onClick={() => onChange({ fontPairing: fp.name })}
              fontFamily={`'${fp.previewFont}', serif`}
            />
          ))}
        </div>
      </div>

      {/* Row 3: Layout */}
      <div style={rowStyle}>
        <SectionLabel>Layout</SectionLabel>
        <div style={pillGroupStyle}>
          {LAYOUTS.map(l => (
            <PillButton key={l} label={l} selected={value.layout === l} onClick={() => onChange({ layout: l })} />
          ))}
        </div>
      </div>

      {/* Row 4: Text Size */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <SectionLabel>Text Size</SectionLabel>
        <SizeControl label="TITLE" value={value.titleSizePercent} onChange={v => onChange({ titleSizePercent: v })} />
        <SizeControl label="SUB" value={value.subSizePercent} onChange={v => onChange({ subSizePercent: v })} />
      </div>
    </div>
  );
}
