'use client';

import React from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Footer } from '@/components/layout/Footer';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useStudio } from '@/context/StudioContext';

const STEP_LABELS = ['YOUR PRODUCT', 'YOUR AUDIENCE', 'YOUR FRAMEWORK', 'TONE & GENERATE'];

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  const { state } = useStudio();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-page-bg)' }}>
      <AppHeader showStep showStartOver={state.currentStep > 1} />

      {/* Progress bar below header */}
      <div style={{
        position: 'fixed',
        top: '56px',
        left: 0,
        right: 0,
        padding: '12px 24px',
        background: 'var(--color-card-dark)',
        borderBottom: '1px solid var(--color-card-dark-border)',
        zIndex: 40,
      }}>
        <ProgressBar current={state.currentStep} total={4} labels={STEP_LABELS} />
      </div>

      <main style={{ flex: 1, paddingTop: '120px', paddingBottom: '60px' }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
