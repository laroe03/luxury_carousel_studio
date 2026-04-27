'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStudio } from '@/context/StudioContext';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function StudioPage() {
  const router = useRouter();
  const { dispatch } = useStudio();

  const startCreate = () => {
    dispatch({ type: 'SET_MODE', payload: 'create' });
    dispatch({ type: 'SET_STEP', payload: 1 });
    router.push('/studio/create/step-1');
  };

  const startRecreate = () => {
    dispatch({ type: 'SET_MODE', payload: 'recreate' });
    router.push('/studio/recreate');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-page-bg)' }}>
      {/* Header */}
      <header style={{
        height: '56px',
        background: 'var(--color-card-dark)',
        borderBottom: '1px solid var(--color-card-dark-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '10px',
      }}>
        <div style={{ width: '20px', height: '20px', background: 'var(--color-brand)', borderRadius: '4px' }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
          Luxury Carousel Studio
        </span>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
          LUXURY CAROUSEL STUDIO
        </p>
        <h1 style={{ textAlign: 'center', color: 'var(--color-text-on-light)', marginBottom: '16px', fontFamily: "'Sora', sans-serif" }}>
          What would you like to create?
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: 'var(--color-text-on-light)', opacity: 0.7, textAlign: 'center', maxWidth: '480px', marginBottom: '48px', lineHeight: 1.6 }}>
          AI-powered Instagram carousels built on psychological frameworks. Paste-ready for Canva.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
          maxWidth: '720px',
          width: '100%',
        }}>
          {/* Create New */}
          <div style={{
            background: 'var(--color-card-dark)',
            border: '1px solid var(--color-card-dark-border)',
            borderRadius: '16px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <div style={{ fontSize: '32px', color: 'var(--color-brand)' }}>✦</div>
            <div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", marginBottom: '8px' }}>Create New</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Build a carousel from scratch using psychological frameworks tailored to your product, audience, and funnel stage.
              </p>
            </div>
            <Badge color="lavender">4 Steps</Badge>
            <Button variant="primary" onClick={startCreate}>
              Start Creating →
            </Button>
          </div>

          {/* Recreate Viral */}
          <div style={{
            background: 'var(--color-card-dark)',
            border: '1px solid var(--color-card-dark-border)',
            borderRadius: '16px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <div style={{ fontSize: '32px', color: 'var(--color-accent-mint)' }}>↻</div>
            <div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", marginBottom: '8px' }}>Recreate Viral</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Paste a viral carousel and rebuild it with your brand, niche, and offer. Optimized to outperform the original.
              </p>
            </div>
            <Badge color="mint">Quick Setup</Badge>
            <Button variant="secondary" onClick={startRecreate}>
              Recreate Now →
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
