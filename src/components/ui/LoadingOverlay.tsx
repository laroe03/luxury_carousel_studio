'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './Button';

const MESSAGES = [
  'Analyzing your psychological framework...',
  'Crafting your hook copy...',
  'Building slide structure...',
  'Optimizing for your buyer stage...',
  'Adding tension and conversion flow...',
];

interface LoadingOverlayProps {
  onCancel?: () => void;
}

export function LoadingOverlay({ onCancel }: LoadingOverlayProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,26,26,0.92)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{
        background: 'var(--color-card-dark)',
        border: '1px solid var(--color-card-dark-border)',
        borderRadius: '16px',
        padding: '48px 40px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}>
        {/* Pulsing icon */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'var(--color-brand)',
          animation: 'pulse 1.5s infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}>✦</div>

        <div>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: '24px',
            color: 'var(--color-text-on-dark)',
            marginBottom: '12px',
          }}>
            Building your carousel...
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '15px',
            color: 'var(--color-text-muted)',
            minHeight: '24px',
            transition: 'opacity 300ms ease',
          }}>
            {MESSAGES[msgIndex]}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: '4px',
          borderRadius: '2px',
          overflow: 'hidden',
          background: 'var(--color-card-dark-border)',
        }}>
          <div className="shimmer" style={{ height: '100%', borderRadius: '2px' }} />
        </div>

        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
