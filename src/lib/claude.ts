import Anthropic from '@anthropic-ai/sdk';
import { CarouselOutput, StudioState } from '@/types/studio';
import { FRAMEWORK_PROMPT_INJECTIONS } from './frameworks';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a world-class luxury brand content strategist and Instagram carousel copywriter. You specialize in psychological copywriting frameworks for high-end product and digital product brands.

WRITING PRINCIPLES:
- Write at the level of the audience's self-image, not where they are
- Luxury copy never begs, explains too much, or oversells
- Specificity is luxury. Vague = cheap. Precise = premium.
- Every slide must earn the scroll to the next one
- Use strategic white space in copy — short lines, punchy ideas
- The hook slide is everything. Write it last, then rewrite it twice.

OUTPUT FORMAT:
Return a JSON object ONLY. No preamble, no explanation. Exactly this structure:

{
  "carousel_title": "Short internal title for this carousel",
  "framework": "framework name",
  "tone": "tone name",
  "slides": [
    {
      "slide_number": 1,
      "slide_type": "hook",
      "headline": "Main headline text",
      "body": "Optional body copy. Omit if slide is headline-only.",
      "design_note": "One-line design direction for this slide."
    }
  ],
  "layout_suggestion": "Overall layout recommendation",
  "font_suggestion": "Suggested font pairing and why",
  "color_palette": ["#HEX1", "#HEX2", "#HEX3", "#HEX4", "#HEX5"],
  "background_suggestion": "Background treatment description",
  "short_caption": "Instagram caption under 150 chars",
  "seo_caption": "Full Instagram caption with hashtags",
  "hook_alternatives": ["Alt hook 1", "Alt hook 2", "Alt hook 3"],
  "cta_variations": ["CTA 1", "CTA 2", "CTA 3"]
}

slide_type must be one of: hook, body, transformation, proof, objection, cta, bridge, reveal, list, quote, poll, countdown, saveable`;

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

export function parseCarouselOutput(rawText: string): CarouselOutput | null {
  try {
    const clean = rawText
      .replace(/^```json\n?/m, '')
      .replace(/^```\n?/m, '')
      .replace(/```$/m, '')
      .trim();
    return JSON.parse(clean) as CarouselOutput;
  } catch {
    return null;
  }
}

export async function generateCarousel(
  prompt: string,
  signal?: AbortSignal
): Promise<CarouselOutput> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  }, { signal });

  const rawText = message.content[0].type === 'text' ? message.content[0].text : '';
  const output = parseCarouselOutput(rawText);

  if (!output) {
    // Retry with explicit format reminder
    const retryMessage = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: prompt },
        { role: 'assistant', content: rawText },
        { role: 'user', content: 'IMPORTANT: Return ONLY valid JSON. No text before or after the JSON object. Try again.' },
      ],
    }, { signal });

    const retryRaw = retryMessage.content[0].type === 'text' ? retryMessage.content[0].text : '';
    const retryOutput = parseCarouselOutput(retryRaw);
    if (!retryOutput) throw new Error('Failed to parse carousel output after retry');
    return retryOutput;
  }

  return output;
}
