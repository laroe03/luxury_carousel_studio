'use client';

import React from 'react';
import { CarouselOutput } from '@/types/studio';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { ColorPalette } from './ColorPalette';
import { useToast } from '@/components/ui/Toast';

interface ContextCardsProps {
  output: CarouselOutput;
}

function CopyCard({
  label,
  text,
  copyLabel = 'Copy',
}: {
  label: string;
  text: string;
  copyLabel?: string;
}) {
  const { showToast } = useToast();
  const copy = () =>
    navigator.clipboard.writeText(text).then(() => showToast(`${label} copied ✓`, 'success'));

  return (
    <Card variant="light" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <SectionLabel color="var(--color-text-on-light)">{label}</SectionLabel>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '14px',
        color: 'var(--color-text-on-light)',
        lineHeight: 1.7,
      }}>{text}</p>
      <Button variant="secondary" size="sm" onClick={copy} style={{ alignSelf: 'flex-start' }}>
        {copyLabel}
      </Button>
    </Card>
  );
}

function ListCopyCard({ label, items }: { label: string; items: string[] }) {
  const { showToast } = useToast();
  return (
    <Card variant="light" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <SectionLabel color="var(--color-text-on-light)">{label}</SectionLabel>
      <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', listStyle: 'none', paddingLeft: '0', marginLeft: '-20px' }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              color: 'var(--color-brand)',
              minWidth: '20px',
            }}>{i + 1}.</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              color: 'var(--color-text-on-light)',
              lineHeight: 1.6,
              flex: 1,
            }}>{item}</span>
            <button
              onClick={() => navigator.clipboard.writeText(item).then(() => showToast('Copied ✓', 'success'))}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                fontSize: '12px',
                padding: '2px 6px',
                borderRadius: '4px',
                flexShrink: 0,
              }}
              title="Copy"
            >⎘</button>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export function ContextCards({ output }: ContextCardsProps) {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={gridStyle}>
        <Card variant="light" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SectionLabel color="var(--color-text-on-light)">Layout Suggestion</SectionLabel>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--color-text-on-light)', lineHeight: 1.7 }}>
            {output.layout_suggestion}
          </p>
        </Card>

        <Card variant="light" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SectionLabel color="var(--color-text-on-light)">Fonts</SectionLabel>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--color-text-on-light)', lineHeight: 1.7 }}>
            {output.font_suggestion}
          </p>
        </Card>

        <Card variant="light" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SectionLabel color="var(--color-text-on-light)">Colors</SectionLabel>
          <ColorPalette colors={output.color_palette} />
        </Card>

        <Card variant="light" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SectionLabel color="var(--color-text-on-light)">Background</SectionLabel>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--color-text-on-light)', lineHeight: 1.7 }}>
            {output.background_suggestion}
          </p>
        </Card>
      </div>

      <div style={gridStyle}>
        <CopyCard label="Short Caption" text={output.short_caption} copyLabel="Copy Caption" />
        <CopyCard label="SEO Caption" text={output.seo_caption} copyLabel="Copy SEO Caption" />
      </div>

      <div style={gridStyle}>
        <ListCopyCard label="Hook Alternatives" items={output.hook_alternatives} />
        <ListCopyCard label="CTA Variations" items={output.cta_variations} />
      </div>
    </div>
  );
}
