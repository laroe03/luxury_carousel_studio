'use client';

import React, { useState } from 'react';
import { CarouselSlide } from '@/types/studio';
import { useStudio } from '@/context/StudioContext';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface SlideCardProps {
  slide: CarouselSlide;
  index: number;
  total: number;
}

const SLIDE_TYPE_COLOR: Record<string, 'mint' | 'lavender' | 'pink' | 'gray'> = {
  hook:           'pink',
  cta:            'mint',
  transformation: 'lavender',
  proof:          'mint',
  body:           'gray',
  objection:      'lavender',
  bridge:         'gray',
  reveal:         'lavender',
  list:           'gray',
  quote:          'lavender',
  poll:           'mint',
  countdown:      'pink',
  saveable:       'mint',
};

const editableStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: '1px solid transparent',
  borderRadius: '8px',
  padding: '6px 8px',
  margin: '-6px -8px',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  resize: 'none',
  outline: 'none',
  transition: 'border-color 150ms ease, background 150ms ease',
  cursor: 'text',
};

export function SlideCard({ slide, index, total }: SlideCardProps) {
  const { dispatch } = useStudio();
  const [copied, setCopied] = useState(false);

  const update = (fields: Partial<CarouselSlide>) =>
    dispatch({ type: 'UPDATE_OUTPUT_SLIDE', payload: { index, fields } });

  const handleCopy = () => {
    const text = `SLIDE ${slide.slide_number}\n${slide.headline}${slide.body ? '\n\n' + slide.body : ''}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Auto-grow textarea height to fit content
  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div style={{
      background: 'var(--color-card-dark)',
      border: '1px solid var(--color-card-dark-border)',
      borderRadius: '16px',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <SectionLabel style={{ marginBottom: 0 }}>
          SLIDE {slide.slide_number} OF {total}
        </SectionLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {slide.slide_type && (
            <Badge color={SLIDE_TYPE_COLOR[slide.slide_type] ?? 'gray'}>
              {slide.slide_type.toUpperCase()}
            </Badge>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            style={{ color: copied ? 'var(--color-accent-mint)' : undefined, borderRadius: '9999px' }}
          >
            {copied ? 'Copied ✓' : 'Copy Slide'}
          </Button>
        </div>
      </div>

      {/* Headline */}
      <textarea
        rows={1}
        value={slide.headline}
        onChange={e => { update({ headline: e.target.value }); autoResize(e.target); }}
        onFocus={e => {
          e.target.style.borderColor = 'var(--color-brand)';
          e.target.style.background = 'rgba(255,107,157,0.04)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'transparent';
          e.target.style.background = 'transparent';
        }}
        style={{
          ...editableStyle,
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: '18px',
          color: 'var(--color-text-on-dark)',
          lineHeight: 1.4,
          overflow: 'hidden',
        }}
      />

      {/* Body */}
      <textarea
        rows={slide.body ? undefined : 1}
        value={slide.body}
        placeholder="Add body copy..."
        onChange={e => { update({ body: e.target.value }); autoResize(e.target); }}
        onFocus={e => {
          e.target.style.borderColor = 'var(--color-brand)';
          e.target.style.background = 'rgba(255,107,157,0.04)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'transparent';
          e.target.style.background = 'transparent';
        }}
        style={{
          ...editableStyle,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.7,
          overflow: 'hidden',
        }}
      />

      {/* Design notes */}
      <div style={{
        border: '1px solid rgba(123,245,165,0.3)',
        borderRadius: '10px',
        padding: '14px 16px',
        background: 'rgba(123,245,165,0.05)',
      }}>
        <SectionLabel color="var(--color-accent-mint)" style={{ marginBottom: '6px' }}>
          Design Notes
        </SectionLabel>
        <textarea
          rows={1}
          value={slide.design_note}
          placeholder="Add a design note..."
          onChange={e => { update({ design_note: e.target.value }); autoResize(e.target); }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--color-accent-mint)';
            e.target.style.background = 'rgba(123,245,165,0.06)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'transparent';
            e.target.style.background = 'transparent';
          }}
          style={{
            ...editableStyle,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
            overflow: 'hidden',
          }}
        />
      </div>
    </div>
  );
}
