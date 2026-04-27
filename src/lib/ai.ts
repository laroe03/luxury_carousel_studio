import { CarouselOutput, StudioState } from '@/types/studio';
import { FRAMEWORK_PROMPT_INJECTIONS } from './frameworks';

// ─── Prompt builders ──────────────────────────────────────────────────────────

export function buildCreatePrompt(state: StudioState): string {
  const { productInfo, brandAudience, frameworkSelection, toneSelection } = state;

  const priceTierLabel =
    productInfo.priceTier === 'affordable' ? 'Affordable Luxury ($1–$600)' :
    productInfo.priceTier === 'contemporary' ? 'Contemporary Luxury ($600–$1,500)' :
    'Heritage Luxury ($1,500–$10,000+)';

  const frameworkDesc = FRAMEWORK_PROMPT_INJECTIONS[frameworkSelection.frameworkName] ?? '';

  let prompt = `Create a ${productInfo.slideCount}-slide Instagram carousel for a luxury brand.

PRODUCT DETAILS:
- Type: ${productInfo.productType}
- Offer: ${productInfo.productDescription}
- Price tier: ${priceTierLabel}
- Desired CTA: ${productInfo.desiredCTA || 'Suggest the most effective CTA'}

AUDIENCE:
- Who they are: ${brandAudience.audienceDefinition}
- Their pain points: ${brandAudience.painPoints}
- Funnel stage: ${brandAudience.funnelStage}
- Buyer status: ${brandAudience.buyerStatus}

PSYCHOLOGICAL FRAMEWORK: ${frameworkSelection.frameworkName}
${frameworkDesc}

TONE: ${toneSelection.tone}`;

  if (toneSelection.styleModifier) {
    prompt += `\nStyle influence: ${toneSelection.styleModifier}`;
  }

  if (toneSelection.conversionBoost) {
    prompt += `\n\nCONVERSION BOOST ACTIVE:
Apply advanced conversion principles:
1. Hook must pattern interrupt within the first 5 words
2. Build emotional tension across slides 2-4
3. Final CTA must create FOMO without sounding desperate
4. Use specificity to signal premium positioning throughout`;
  }

  if (brandAudience.brandGuidelines) {
    prompt += `\n\nBRAND CONTEXT:\n${brandAudience.brandGuidelines}`;
  }

  prompt += `\n\nReturn the carousel as a JSON object with the exact structure specified. IMPORTANT: Return ONLY valid JSON. No text before or after the JSON object.`;
  return prompt;
}

export function buildRecreatePrompt(state: StudioState): string {
  const { viralRecreate } = state;

  let prompt = `Recreate this viral Instagram carousel in a new voice for a different brand.

ORIGINAL CAROUSEL:
${viralRecreate.originalCarousel}

NEW BRAND DETAILS:
- Brand name: ${viralRecreate.brandName}
- Niche: ${viralRecreate.niche}
- What they're selling: ${viralRecreate.productDetails}
- Target audience: ${viralRecreate.targetAudience}
- Desired CTA: ${viralRecreate.desiredCTA || 'Suggest one'}

TONE: ${viralRecreate.tone}
SLIDES: ${viralRecreate.slideCount}`;

  if (viralRecreate.viralOptimization) {
    prompt += `\n\nVIRAL OPTIMIZATION ACTIVE:
Analyze what made the original carousel go viral (hook structure, tension mechanics, format pattern). Amplify those elements by:
1. Writing a stronger opening hook — more specific, more disruptive
2. Adding emotional tension in the middle slides
3. Creating a sharper, more action-specific CTA
4. Making at least 2 slides "saveable" (contain information worth returning to)

Rebuild the carousel completely in the new brand's voice — not a rewrite of the original, but a reimagining of it.`;
  }

  prompt += `\n\nReturn the carousel as a JSON object with the exact structure specified. IMPORTANT: Return ONLY valid JSON. No text before or after the JSON object.`;
  return prompt;
}

// ─── Client-side generate — calls the server API route ───────────────────────
// The AI SDKs (Anthropic, OpenAI) run server-side only in /api/generate.
// This function is safe to call from any 'use client' component.

export async function generateCarousel(
  prompt: string,
  provider: 'anthropic' | 'openai',
  signal?: AbortSignal
): Promise<CarouselOutput> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, provider }),
    signal,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string; rateLimited?: boolean };
    if (res.status === 429 || data.rateLimited) {
      throw Object.assign(new Error(data.error ?? 'Rate limited'), { rateLimited: true });
    }
    throw new Error(data.error ?? 'Generation failed');
  }

  return res.json() as Promise<CarouselOutput>;
}
