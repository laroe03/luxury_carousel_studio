'use client';

import React, { useState } from 'react';
import { CarouselSlide } from '@/types/studio';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface SlideCardProps {
  slide: CarouselSlide;
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

export function SlideCard({ slide, total }: SlideCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `SLIDE ${slide.slide_number}\n${slide.headline}${slide.body ? '\n\n' + slide.body : ''}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
            style={{
              color: copied ? 'var(--color-accent-mint)' : undefined,
              borderRadius: '9999px',
            }}
          >
            {copied ? 'Copied ✓' : 'Copy Slide'}
          </Button>
        </div>
      </div>

      {/* Headline */}
      <p style={{
        fontFamily: "'Sora', sans-serif",
        fontWeight: 600,
        fontSize: '18px',
        color: 'var(--color-text-on-dark)',
        lineHeight: 1.4,
      }}>
        {slide.headline}
      </p>

      {/* Body */}
      {slide.body && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.7,
        }}>
          {slide.body}
        </p>
      )}

      {/* Design notes */}
      {slide.design_note && (
        <div style={{
          border: '1px solid rgba(123,245,165,0.3)',
          borderRadius: '10px',
          padding: '14px 16px',
          background: 'rgba(123,245,165,0.05)',
        }}>
          <SectionLabel color="var(--color-accent-mint)" style={{ marginBottom: '6px' }}>
            Design Notes
          </SectionLabel>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
          }}>
            {slide.design_note}
          </p>
        </div>
      )}
    </div>
  );
}
