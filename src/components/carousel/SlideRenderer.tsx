'use client';

import React, { forwardRef } from 'react';
import { CarouselSlide, DesignPreviewState } from '@/types/studio';
import { getTheme } from '@/lib/themes';
import { getFontPairing } from '@/lib/fontPairings';

interface SlideRendererProps {
  slide: CarouselSlide;
  total: number;
  designPreview: DesignPreviewState;
}

export const SlideRenderer = forwardRef<HTMLDivElement, SlideRendererProps>(
  ({ slide, total, designPreview }, ref) => {
    const theme = getTheme(designPreview.theme);
    const pairing = getFontPairing(designPreview.fontPairing);
    const layout = designPreview.layout;
    const titleScale = designPreview.titleSizePercent / 100;
    const subScale = designPreview.subSizePercent / 100;

    const baseTitleSize = 28 * titleScale;
    const baseBodySize = 14 * subScale;

    const containerStyle: React.CSSProperties = {
      width: '100%',
      paddingBottom: '100%', // 1:1 aspect ratio trick
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      background: theme.background,
    };

    const innerStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      background: theme.background,
      color: theme.text,
      overflow: 'hidden',
    };

    const headlineStyle: React.CSSProperties = {
      fontFamily: `'${pairing.headingFont}', serif`,
      fontWeight: 700,
      fontSize: `${baseTitleSize}px`,
      color: theme.text,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    };

    const bodyStyle: React.CSSProperties = {
      fontFamily: `'${pairing.bodyFont}', sans-serif`,
      fontSize: `${baseBodySize}px`,
      color: theme.text,
      lineHeight: 1.6,
      opacity: 0.8,
    };

    const accentStyle: React.CSSProperties = {
      color: theme.accent,
    };

    const renderContent = () => {
      switch (layout) {
        case 'Centered':
          return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '12px' }}>
              <p style={headlineStyle}>{slide.headline}</p>
              {slide.body && <p style={bodyStyle}>{slide.body}</p>}
            </div>
          );
        case 'Split':
          return (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, borderRight: `2px solid ${theme.accent}`, paddingRight: '16px' }}>
                <p style={headlineStyle}>{slide.headline}</p>
              </div>
              {slide.body && (
                <div style={{ flex: 1 }}>
                  <p style={bodyStyle}>{slide.body}</p>
                </div>
              )}
            </div>
          );
        case 'Quote':
          return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '16px' }}>
              <span style={{ ...accentStyle, fontSize: `${baseTitleSize * 2}px`, lineHeight: 0.5, fontFamily: 'Georgia, serif' }}>"</span>
              <p style={{ ...headlineStyle, fontSize: `${baseTitleSize * 1.1}px` }}>{slide.headline}</p>
            </div>
          );
        case 'List':
          return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
              <p style={{ ...headlineStyle, fontSize: `${baseTitleSize * 0.85}px` }}>{slide.headline}</p>
              {slide.body && (
                <ul style={{ paddingLeft: '16px' }}>
                  {slide.body.split('\n').filter(Boolean).map((line, i) => (
                    <li key={i} style={{ ...bodyStyle, marginBottom: '6px' }}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        case 'Gradient':
          return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px', background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)`, margin: '-24px', padding: '24px' }}>
              <p style={headlineStyle}>{slide.headline}</p>
              {slide.body && <p style={bodyStyle}>{slide.body}</p>}
            </div>
          );
        case 'Card':
          return (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '12px',
                padding: '20px',
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                <p style={{ ...headlineStyle, color: '#111', fontSize: `${baseTitleSize * 0.8}px` }}>{slide.headline}</p>
                {slide.body && <p style={{ ...bodyStyle, color: '#444' }}>{slide.body}</p>}
              </div>
            </div>
          );
        case 'Magazine':
          return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ ...headlineStyle, fontSize: `${baseTitleSize * 1.1}px`, maxWidth: '60%' }}>{slide.headline}</p>
              {slide.body && (
                <p style={{ ...bodyStyle, alignSelf: 'flex-end', textAlign: 'right', maxWidth: '60%' }}>{slide.body}</p>
              )}
            </div>
          );
        default:
          return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '12px' }}>
              <p style={headlineStyle}>{slide.headline}</p>
              {slide.body && <p style={bodyStyle}>{slide.body}</p>}
            </div>
          );
      }
    };

    return (
      <div style={containerStyle}>
        <div ref={ref} style={innerStyle}>
          {/* Slide number pill */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            borderRadius: '9999px',
            padding: '3px 10px',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: '11px',
            zIndex: 2,
          }}>
            {slide.slide_number} / {total}
          </div>

          {/* Accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: theme.accent }} />

          {/* Content */}
          {renderContent()}
        </div>
      </div>
    );
  }
);

SlideRenderer.displayName = 'SlideRenderer';
