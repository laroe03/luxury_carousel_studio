'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStudio } from '@/context/StudioContext';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { SelectionCard } from '@/components/ui/SelectionCard';
import { RangeSlider } from '@/components/ui/RangeSlider';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const PRICE_TIERS = [
  { value: 'affordable', title: 'Affordable Luxury', subtitle: '$1 – $600', description: 'Aspirational entry-point products' },
  { value: 'contemporary', title: 'Contemporary Luxury', subtitle: '$600 – $1,500', description: 'Mid-range investment pieces' },
  { value: 'heritage', title: 'Heritage Luxury', subtitle: '$1,500 – $10,000+', description: 'High-end, legacy, collector tier' },
];

export default function Step1Page() {
  const router = useRouter();
  const { state, dispatch } = useStudio();
  const { productInfo } = state;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (updates: Partial<typeof productInfo>) => {
    dispatch({ type: 'UPDATE_PRODUCT_INFO', payload: updates });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!productInfo.productType) newErrors.productType = 'Please select a product type.';
    if (!productInfo.productDescription.trim()) newErrors.productDescription = 'Please describe your product.';
    if (!productInfo.priceTier) newErrors.priceTier = 'Please select a price tier.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    dispatch({ type: 'SET_STEP', payload: 2 });
    router.push('/studio/create/step-2');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--color-input-bg)',
    color: 'var(--color-text-on-dark)',
    border: `1px solid ${errors.productDescription ? 'var(--color-error)' : 'var(--color-card-dark-border)'}`,
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
        <SectionLabel>STEP 1 OF 4</SectionLabel>
        <h2 style={{ fontFamily: "'Sora', sans-serif", marginBottom: '8px' }}>Tell us about your product</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: 'var(--color-text-muted)', marginBottom: '36px', lineHeight: 1.6 }}>
          The more specific you are, the more powerful your carousel.
        </p>

        {/* Field 1: Product Type */}
        <div style={{ marginBottom: '32px' }}>
          <SectionLabel>WHAT ARE YOU SELLING?</SectionLabel>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>Choose a product type</p>
          <SegmentedControl
            options={[
              { label: 'Physical Product', value: 'physical' },
              { label: 'Digital Product', value: 'digital' },
            ]}
            value={productInfo.productType}
            onChange={v => update({ productType: v as 'physical' | 'digital' })}
          />
          {errors.productType && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '6px' }}>{errors.productType}</p>}

          <div style={{ marginTop: '16px' }}>
            <textarea
              rows={3}
              value={productInfo.productDescription}
              onChange={e => update({ productDescription: e.target.value })}
              placeholder="e.g., A hand-poured soy candle with fine fragrance notes, designed for intentional living."
              style={inputStyle}
            />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
              Be specific. The more detail here, the better your copy.
            </p>
            {errors.productDescription && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '4px' }}>{errors.productDescription}</p>}
          </div>
        </div>

        {/* Field 2: Price Point */}
        <div style={{ marginBottom: '32px' }}>
          <SectionLabel>PRICE POINT</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            {PRICE_TIERS.map(tier => (
              <SelectionCard
                key={tier.value}
                title={tier.title}
                subtitle={tier.subtitle}
                description={tier.description}
                selected={productInfo.priceTier === tier.value}
                onClick={() => update({ priceTier: tier.value as 'affordable' | 'contemporary' | 'heritage' })}
              />
            ))}
          </div>
          {errors.priceTier && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '8px' }}>{errors.priceTier}</p>}
        </div>

        {/* Field 3: Desired CTA */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <SectionLabel style={{ marginBottom: 0 }}>DESIRED CTA</SectionLabel>
            <Badge color="lavender">OPTIONAL</Badge>
          </div>
          <input
            type="text"
            value={productInfo.desiredCTA}
            onChange={e => update({ desiredCTA: e.target.value })}
            placeholder='e.g., "DM me LUXE" or "Link in bio" or "Shop now"'
            style={{
              ...inputStyle,
              border: '1px solid var(--color-card-dark-border)',
            }}
          />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            Leave blank and we'll suggest the most effective CTA for your funnel stage.
          </p>
        </div>

        {/* Field 4: Slide Count */}
        <div style={{ marginBottom: '40px' }}>
          <SectionLabel>NUMBER OF SLIDES</SectionLabel>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
            Instagram recommends 7–10 for maximum saves.
          </p>
          <RangeSlider
            min={1}
            max={20}
            step={1}
            value={productInfo.slideCount}
            onChange={v => update({ slideCount: v })}
            ticks={[1, 5, 10, 15, 20]}
          />
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
          >
            NEXT →
          </Button>
        </div>
      </Card>
    </div>
  );
}
