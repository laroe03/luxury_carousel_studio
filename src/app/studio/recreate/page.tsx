'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStudio } from '@/context/StudioContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { RangeSlider } from '@/components/ui/RangeSlider';
import { Button } from '@/components/ui/Button';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { buildRecreatePrompt, generateCarousel } from '@/lib/claude';
import { useToast } from '@/components/ui/Toast';

const TONES = ['Bold', 'Mentor', 'Authority', 'Polarizing', 'Soft'];

export default function RecreatePage() {
  const router = useRouter();
  const { state, dispatch } = useStudio();
  const { viralRecreate } = state;
  const { showToast } = useToast();
  const abortRef = useRef<AbortController | null>(null);

  const update = (updates: Partial<typeof viralRecreate>) => {
    dispatch({ type: 'UPDATE_VIRAL_RECREATE', payload: updates });
  };

  const canGenerate =
    viralRecreate.originalCarousel.trim() &&
    viralRecreate.niche.trim() &&
    viralRecreate.productDetails.trim() &&
    viralRecreate.targetAudience.trim() &&
    viralRecreate.tone;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    dispatch({ type: 'SET_GENERATING', payload: true });
    const controller = new AbortController();
    abortRef.current = controller;
    let retries = 0;
    while (retries <= 2) {
      try {
        const prompt = buildRecreatePrompt(state);
        const output = await generateCarousel(prompt, controller.signal);
        dispatch({ type: 'SET_OUTPUT', payload: output });
        router.push('/studio/results');
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        retries++;
        if (retries > 2) {
          const msg = 'Generation failed. Please try again.';
          dispatch({ type: 'SET_ERROR', payload: msg });
          showToast(msg, 'error');
          return;
        }
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    dispatch({ type: 'SET_GENERATING', payload: false });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--color-input-bg)',
    color: 'var(--color-text-on-dark)',
    border: '1px solid var(--color-card-dark-border)',
    borderRadius: '12px',
    padding: '14px 16px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical',
    transition: 'border-color 150ms ease',
  };

  return (
    <>
      {state.isGenerating && <LoadingOverlay onCancel={handleCancel} />}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-page-bg)' }}>
        <AppHeader showStartOver />
        <main style={{ flex: 1, paddingTop: '80px', paddingBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px 60px' }}>
          <Card style={{ maxWidth: '720px', width: '100%' }}>
            <SectionLabel>RECREATE VIRAL</SectionLabel>
            <h2 style={{ fontFamily: "'Sora', sans-serif", marginBottom: '8px' }}>Rebuild a viral carousel as your own</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: 'var(--color-text-muted)', marginBottom: '36px', lineHeight: 1.6 }}>
              Paste the text from a carousel that stopped your scroll. We'll rebuild it with your brand, offer, and audience — optimized to outperform the original.
            </p>

            {/* Field 1: Original carousel */}
            <div style={{ marginBottom: '32px' }}>
              <SectionLabel>PASTE THE VIRAL CAROUSEL</SectionLabel>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                Copy and paste the slide text from the carousel you want to recreate. Include each slide as a new line or paragraph.
              </p>
              <div style={{ position: 'relative' }}>
                <textarea
                  rows={10}
                  value={viralRecreate.originalCarousel}
                  onChange={e => update({ originalCarousel: e.target.value })}
                  placeholder={"Slide 1: 3 things luxury buyers never do...\nSlide 2: They never explain their budget\nSlide 3: They never chase discounts..."}
                  style={inputStyle}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '12px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                }}>
                  {viralRecreate.originalCarousel.length}
                </span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                Tip: Screenshot the carousel and use the text from each slide. Don't worry about formatting — just paste what you see.
              </p>
            </div>

            {/* Field 2: Your Details */}
            <div style={{ marginBottom: '32px' }}>
              <SectionLabel>YOUR DETAILS</SectionLabel>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Tell us who you are and what you're selling.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <SectionLabel>BRAND NAME</SectionLabel>
                  <input type="text" value={viralRecreate.brandName} onChange={e => update({ brandName: e.target.value })} placeholder="e.g., Maison Soleil" style={{ ...inputStyle, resize: undefined }} />
                </div>
                <div>
                  <SectionLabel>YOUR NICHE</SectionLabel>
                  <input type="text" value={viralRecreate.niche} onChange={e => update({ niche: e.target.value })} placeholder="e.g., Luxury home fragrance" style={{ ...inputStyle, resize: undefined }} />
                </div>
                <div>
                  <SectionLabel>WHAT YOU'RE SELLING</SectionLabel>
                  <textarea rows={2} value={viralRecreate.productDetails} onChange={e => update({ productDetails: e.target.value })} placeholder="e.g., Hand-poured soy candles, $85–$240, for high-income interior design lovers" style={inputStyle} />
                </div>
                <div>
                  <SectionLabel>TARGET AUDIENCE</SectionLabel>
                  <textarea rows={2} value={viralRecreate.targetAudience} onChange={e => update({ targetAudience: e.target.value })} placeholder="e.g., Women 30–50 who follow luxury design accounts and spend intentionally on home goods" style={inputStyle} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <SectionLabel style={{ marginBottom: 0 }}>DESIRED CTA</SectionLabel>
                    <Badge color="lavender">OPTIONAL</Badge>
                  </div>
                  <input type="text" value={viralRecreate.desiredCTA} onChange={e => update({ desiredCTA: e.target.value })} placeholder='e.g., "DM me LUXE" or "Shop the link"' style={{ ...inputStyle, resize: undefined }} />
                </div>
              </div>
            </div>

            {/* Field 3: Tone */}
            <div style={{ marginBottom: '32px' }}>
              <SectionLabel>TONE</SectionLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
                {TONES.map(tone => (
                  <button
                    key={tone}
                    onClick={() => update({ tone: viralRecreate.tone === tone.toLowerCase() ? null : tone.toLowerCase() })}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '9999px',
                      border: viralRecreate.tone === tone.toLowerCase() ? '1px solid var(--color-brand)' : '1px solid var(--color-card-dark-border)',
                      background: viralRecreate.tone === tone.toLowerCase() ? 'var(--color-brand)' : 'var(--color-card-dark-border)',
                      color: '#fff',
                      cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: '14px',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 4: Slide Count */}
            <div style={{ marginBottom: '32px' }}>
              <SectionLabel>NUMBER OF SLIDES</SectionLabel>
              <div style={{ marginTop: '12px' }}>
                <RangeSlider min={1} max={20} value={viralRecreate.slideCount} onChange={v => update({ slideCount: v })} ticks={[1, 5, 10, 15, 20]} />
              </div>
            </div>

            {/* Field 5: Viral Optimization */}
            <div style={{ marginBottom: '40px' }}>
              <SectionLabel style={{ marginBottom: '12px' }}>OPTIMIZE TO MAKE THIS 10x MORE VIRAL</SectionLabel>
              <Toggle
                checked={viralRecreate.viralOptimization}
                onChange={v => update({ viralOptimization: v })}
                onLabel="Applying stronger hook, more tension, tighter CTA — built to outperform the original."
                offLabel="OFF"
              />
              {viralRecreate.viralOptimization && (
                <div style={{
                  marginTop: '12px',
                  padding: '10px 16px',
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.3)',
                  borderRadius: '10px',
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-warning)' }}>
                    ⚠ This may significantly change the structure and style of the original.
                  </span>
                </div>
              )}
            </div>

            {/* Generate */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleGenerate}
              disabled={!canGenerate || state.isGenerating}
            >
              RECREATE CAROUSEL ✦
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    </>
  );
}
