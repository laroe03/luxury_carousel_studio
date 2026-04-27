'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStudio } from '@/context/StudioContext';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SelectionCard } from '@/components/ui/SelectionCard';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { buildCreatePrompt, generateCarousel } from '@/lib/claude';
import { useToast } from '@/components/ui/Toast';

const TONES = [
  { value: 'bold',       label: 'Bold',        description: 'Direct, high-energy, no apologies' },
  { value: 'mentor',     label: 'Mentor',       description: 'Guiding, wise, like a trusted advisor' },
  { value: 'sassy',      label: 'Sassy',        description: 'Confident, a little edgy, pulls no punches' },
  { value: 'luxury-ceo', label: 'Luxury CEO',   description: 'Aspirational, elevated, speaks to the top' },
  { value: 'authority',  label: 'Authority',    description: 'Expert-led, data-backed, commanding' },
  { value: 'polarizing', label: 'Polarizing',   description: 'Opinion-led, designed to divide and attract your people' },
  { value: 'soft',       label: 'Soft',         description: 'Warm, emotionally led, gentle persuasion' },
  { value: 'data-driven',label: 'Data-Driven',  description: 'Evidence-backed, analytical, proof-first' },
];

const STYLE_MODIFIERS = [
  { value: 'mel-robbins',    label: 'Mel Robbins-style',    description: 'Science-backed, motivational, relatable urgency' },
  { value: 'leila-hormozi',  label: 'Leila Hormozi-style',  description: 'Business-direct, results-focused, no-fluff' },
  { value: 'natalie-dawson', label: 'Natalie Dawson-style', description: 'Feminine leadership, brand authority, elegant conviction' },
  { value: 'authority-mod',  label: 'Authority',            description: 'Expert voice, structured, credibility-first' },
  { value: 'soft-mod',       label: 'Soft',                 description: 'Emotionally intelligent, empathy-led' },
  { value: 'bold-mod',       label: 'Bold',                 description: 'Big energy, unapologetic, scroll-stopping' },
];

const RECOMMENDED_STYLES: Record<string, string[]> = {
  'bold':        ['bold-mod', 'leila-hormozi'],
  'mentor':      ['mel-robbins', 'natalie-dawson'],
  'soft':        ['soft-mod', 'natalie-dawson'],
  'authority':   ['authority-mod', 'leila-hormozi'],
  'luxury-ceo':  ['natalie-dawson', 'authority-mod'],
  'polarizing':  ['bold-mod', 'leila-hormozi'],
  'data-driven': ['authority-mod', 'leila-hormozi'],
  'sassy':       ['bold-mod'],
};

export default function Step4Page() {
  const router = useRouter();
  const { state, dispatch } = useStudio();
  const { toneSelection, productInfo, brandAudience, frameworkSelection } = state;
  const { showToast } = useToast();
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  const update = (updates: Partial<typeof toneSelection>) => {
    dispatch({ type: 'UPDATE_TONE', payload: updates });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 3 });
    router.push('/studio/create/step-3');
  };

  const handleGenerate = async () => {
    if (!toneSelection.tone) {
      setError('Please select a tone.');
      return;
    }
    setError('');
    dispatch({ type: 'SET_GENERATING', payload: true });

    const controller = new AbortController();
    abortRef.current = controller;

    let retries = 0;
    const maxRetries = 2;

    while (retries <= maxRetries) {
      try {
        const prompt = buildCreatePrompt(state);
        const output = await generateCarousel(prompt, controller.signal);
        dispatch({ type: 'SET_OUTPUT', payload: output });
        router.push('/studio/results');
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        retries++;
        if (retries > maxRetries) {
          const msg = err instanceof Error && err.message.includes('rate')
            ? 'Rate limited. Please try again in a moment.'
            : 'Generation failed. Please try again.';
          dispatch({ type: 'SET_ERROR', payload: msg });
          showToast(msg, 'error');
          return;
        }
        showToast('Retrying generation...', 'info');
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    dispatch({ type: 'SET_GENERATING', payload: false });
  };

  const priceTierLabel = productInfo.priceTier === 'affordable' ? 'Affordable Luxury' : productInfo.priceTier === 'contemporary' ? 'Contemporary Luxury' : 'Heritage Luxury';

  return (
    <>
      {state.isGenerating && <LoadingOverlay onCancel={handleCancel} />}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
        <Card style={{ maxWidth: '680px', width: '100%' }}>
          <SectionLabel>STEP 4 OF 4</SectionLabel>
          <h2 style={{ fontFamily: "'Sora', sans-serif", marginBottom: '8px' }}>Set the tone and generate</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: 'var(--color-text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
            This is the final layer. Tone shapes how the framework is delivered — the energy behind the words.
          </p>

          {/* Tone Selection */}
          <div style={{ marginBottom: '32px' }}>
            <SectionLabel>HOW SHOULD THIS CAROUSEL FEEL?</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginTop: '8px' }}>
              {TONES.map(t => (
                <SelectionCard
                  key={t.value}
                  title={t.label}
                  description={t.description}
                  selected={toneSelection.tone === t.value}
                  onClick={() => { update({ tone: t.value }); setError(''); }}
                />
              ))}
            </div>
            {error && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
          </div>

          {/* Style Modifier */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <SectionLabel style={{ marginBottom: 0 }}>STYLE MODIFIER</SectionLabel>
              <Badge color="lavender">OPTIONAL</Badge>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
              Layer a specific style influence on top of your tone.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {STYLE_MODIFIERS.map(sm => {
                const isRecommended = toneSelection.tone && RECOMMENDED_STYLES[toneSelection.tone]?.includes(sm.value);
                return (
                  <SelectionCard
                    key={sm.value}
                    title={sm.label}
                    description={sm.description}
                    selected={toneSelection.styleModifier === sm.value}
                    recommended={!!isRecommended}
                    onClick={() => update({ styleModifier: toneSelection.styleModifier === sm.value ? null : sm.value })}
                  />
                );
              })}
            </div>
          </div>

          {/* Conversion Boost */}
          <div style={{ marginBottom: '32px' }}>
            <SectionLabel style={{ marginBottom: '12px' }}>CONVERSION BOOST</SectionLabel>
            <Toggle
              checked={toneSelection.conversionBoost}
              onChange={v => update({ conversionBoost: v })}
              onLabel="ON — Stronger hook, added tension, tighter CTA"
              offLabel="OFF"
            />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '10px', lineHeight: 1.6 }}>
              Applies advanced conversion copywriting principles: pattern interrupt hook, emotional tension arc, and a more direct CTA.
            </p>
          </div>

          {/* Summary Card */}
          {toneSelection.tone && (
            <div style={{
              background: 'var(--color-card-dark-border)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '32px',
            }}>
              <SectionLabel style={{ marginBottom: '12px' }}>YOUR CAROUSEL AT A GLANCE</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>
                {[
                  ['Product', `${productInfo.productType} — ${priceTierLabel}`],
                  ['Slides', productInfo.slideCount],
                  ['Audience', productInfo.productDescription.slice(0, 80) + (productInfo.productDescription.length > 80 ? '...' : '')],
                  ['Funnel Stage', brandAudience.funnelStage],
                  ['Buyer Status', brandAudience.buyerStatus],
                  ['Framework', frameworkSelection.frameworkName],
                  ['Tone', toneSelection.tone],
                  ['Style Modifier', toneSelection.styleModifier ?? 'None'],
                  ['Conv. Boost', toneSelection.conversionBoost ? 'ON' : 'OFF'],
                ].map(([label, val]) => (
                  <div key={label as string} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                    <span style={{ color: 'var(--color-text-on-dark)', fontWeight: 500 }}>{val ?? '—'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <Button variant="ghost" onClick={handleBack}>← Back</Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleGenerate}
              disabled={!toneSelection.tone || state.isGenerating}
              fullWidth
            >
              GENERATE CAROUSEL ✦
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
