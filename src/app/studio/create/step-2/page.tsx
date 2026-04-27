'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStudio } from '@/context/StudioContext';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SelectionCard } from '@/components/ui/SelectionCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const FUNNEL_STAGES = [
  { value: 'top', title: 'Top of Funnel', subtitle: 'Awareness & Discovery', description: 'They don\'t know you yet. Make them stop and look.' },
  { value: 'middle', title: 'Middle of Funnel', subtitle: 'Consideration & Nurture', description: 'They know you. Now build desire and trust.' },
  { value: 'bottom', title: 'Bottom of Funnel', subtitle: 'Decision & Purchase', description: 'They\'re close. Close the gap and convert.' },
];

const BUYER_STATUSES = [
  { value: 'cold', title: 'Cold', description: 'New to my brand, not a follower or a new follower' },
  { value: 'warm', title: 'Warm', description: 'Familiar with my brand, a follower who hasn\'t purchased' },
  { value: 'hot', title: 'Hot', description: 'Follower who has purchased, active client/customer' },
  { value: 'vip', title: 'VIP', description: 'Recurring client, purchases multiple times' },
  { value: 'launch', title: 'Launch Mode', description: 'Launch-specific — for something being created or releasing' },
  { value: 'evergreen', title: 'Evergreen', description: 'Evergreen offer — works at any time, always on' },
];

export default function Step2Page() {
  const router = useRouter();
  const { state, dispatch } = useStudio();
  const { brandAudience } = state;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [brandOpen, setBrandOpen] = useState(false);

  const update = (updates: Partial<typeof brandAudience>) => {
    dispatch({ type: 'UPDATE_BRAND_AUDIENCE', payload: updates });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!brandAudience.audienceDefinition.trim()) e.audience = 'Please define your audience.';
    if (!brandAudience.painPoints.trim()) e.painPoints = 'Please describe their pain points.';
    if (!brandAudience.funnelStage) e.funnelStage = 'Please select a funnel stage.';
    if (!brandAudience.buyerStatus) e.buyerStatus = 'Please select a buyer status.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 1 });
    router.push('/studio/create/step-1');
  };

  const handleNext = () => {
    if (!validate()) return;
    dispatch({ type: 'SET_STEP', payload: 3 });
    router.push('/studio/create/step-3');
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
      <Card style={{ maxWidth: '680px', width: '100%' }}>
        <SectionLabel>STEP 2 OF 4</SectionLabel>
        <h2 style={{ fontFamily: "'Sora', sans-serif", marginBottom: '36px' }}>Your brand and audience</h2>

        {/* Brand Guidelines */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <SectionLabel style={{ marginBottom: 0 }}>BRAND GUIDELINES</SectionLabel>
            <Badge color="lavender">OPTIONAL</Badge>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
            Add any details that help us match your brand voice.
          </p>
          {!brandOpen ? (
            <button
              onClick={() => setBrandOpen(true)}
              style={{ background: 'none', border: 'none', color: 'var(--color-brand)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', padding: 0 }}
            >
              + Add brand guidelines
            </button>
          ) : (
            <textarea
              rows={8}
              value={brandAudience.brandGuidelines}
              onChange={e => update({ brandGuidelines: e.target.value })}
              placeholder="Paste or type any of the following:&#10;— Hex codes (e.g., #FF6B9D, #1A1A1A)&#10;— Font preferences&#10;— Core business model&#10;— Mission or company statement&#10;— Core value proposition&#10;— Brand positioning statement&#10;— Tone of voice notes"
              style={inputStyle}
            />
          )}
          {brandOpen && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
              This informs the copy style and any design preview suggestions.
            </p>
          )}
        </div>

        {/* Target Market */}
        <div style={{ marginBottom: '32px' }}>
          <SectionLabel>TARGET MARKET</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            <div>
              <SectionLabel>DEFINE YOUR AUDIENCE</SectionLabel>
              <textarea
                rows={3}
                value={brandAudience.audienceDefinition}
                onChange={e => update({ audienceDefinition: e.target.value })}
                placeholder="e.g., Women 28–45, luxury interior design enthusiasts, $150K+ household income, aspirational buyers who follow accounts like @archdigest and @the.aesthetic.edit."
                style={{ ...inputStyle, border: `1px solid ${errors.audience ? 'var(--color-error)' : 'var(--color-card-dark-border)'}` }}
              />
              {errors.audience && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '4px' }}>{errors.audience}</p>}
            </div>
            <div>
              <SectionLabel>THEIR MAIN PAIN POINTS</SectionLabel>
              <textarea
                rows={3}
                value={brandAudience.painPoints}
                onChange={e => update({ painPoints: e.target.value })}
                placeholder="e.g., They feel like their home doesn't reflect who they've become. They want to invest in quality but feel overwhelmed by choices and don't know where to start."
                style={{ ...inputStyle, border: `1px solid ${errors.painPoints ? 'var(--color-error)' : 'var(--color-card-dark-border)'}` }}
              />
              {errors.painPoints && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '4px' }}>{errors.painPoints}</p>}
            </div>
          </div>
        </div>

        {/* Funnel Stage */}
        <div style={{ marginBottom: '32px' }}>
          <SectionLabel>FUNNEL STAGE</SectionLabel>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
            Where is this carousel in the buyer journey?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            {FUNNEL_STAGES.map(stage => (
              <SelectionCard
                key={stage.value}
                title={stage.title}
                subtitle={stage.subtitle}
                description={stage.description}
                selected={brandAudience.funnelStage === stage.value}
                onClick={() => update({ funnelStage: stage.value as 'top' | 'middle' | 'bottom' })}
              />
            ))}
          </div>
          {errors.funnelStage && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '8px' }}>{errors.funnelStage}</p>}
        </div>

        {/* Buyer Status */}
        <div style={{ marginBottom: '40px' }}>
          <SectionLabel>BUYER STATUS</SectionLabel>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
            Who are you talking to specifically?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {BUYER_STATUSES.map(status => (
              <SelectionCard
                key={status.value}
                title={status.title}
                description={status.description}
                selected={brandAudience.buyerStatus === status.value}
                onClick={() => update({ buyerStatus: status.value as typeof brandAudience.buyerStatus })}
              />
            ))}
          </div>
          {errors.buyerStatus && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '8px' }}>{errors.buyerStatus}</p>}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="ghost" onClick={handleBack}>← Back</Button>
          <Button variant="primary" size="lg" onClick={handleNext}>NEXT →</Button>
        </div>
      </Card>
    </div>
  );
}
