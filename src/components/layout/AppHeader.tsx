'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { useStudio } from '@/context/StudioContext';

interface AppHeaderProps {
  showStep?: boolean;
  showStartOver?: boolean;
}

export function AppHeader({ showStep = false, showStartOver = false }: AppHeaderProps) {
  const { state, dispatch } = useStudio();

  const handleStartOver = () => {
    if (confirm('Are you sure you want to start over? Your progress will be lost.')) {
      dispatch({ type: 'RESET' });
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '56px',
      background: 'var(--color-card-dark)',
      borderBottom: '1px solid var(--color-card-dark-border)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
    }}>
      {/* Left: Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
        <div style={{
          width: '20px',
          height: '20px',
          background: 'var(--color-brand)',
          borderRadius: '4px',
        }} />
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: '13px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
        }}>
          <Link href="/studio">Luxury Carousel Studio</Link>
        </span>
      </div>

      {/* Center: Step indicator */}
      {showStep && state.mode === 'create' && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <StepIndicator current={state.currentStep} total={4} />
        </div>
      )}

      {/* Right: Start Over */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {showStartOver && (
          <Button variant="ghost" size="sm" onClick={handleStartOver}>
            ← Start Over
          </Button>
        )}
      </div>
    </header>
  );
}
