import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { CarouselOutput } from '@/types/studio';

// ─── Shared system prompt ─────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseOutput(rawText: string): CarouselOutput | null {
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

async function runAnthropic(prompt: string): Promise<CarouselOutput> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const rawText = message.content[0].type === 'text' ? message.content[0].text : '';
  const output = parseOutput(rawText);
  if (output) return output;

  // Retry
  const retry = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      { role: 'user', content: prompt },
      { role: 'assistant', content: rawText },
      { role: 'user', content: 'IMPORTANT: Return ONLY valid JSON. No text before or after the JSON object. Try again.' },
    ],
  });
  const retryRaw = retry.content[0].type === 'text' ? retry.content[0].text : '';
  const retryOutput = parseOutput(retryRaw);
  if (!retryOutput) throw new Error('Failed to parse carousel output after retry');
  return retryOutput;
}

async function runOpenAI(prompt: string): Promise<CarouselOutput> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 4096,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
  });

  const rawText = completion.choices[0]?.message?.content ?? '';
  const output = parseOutput(rawText);
  if (output) return output;

  // Retry
  const retry = await client.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 4096,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt },
      { role: 'assistant', content: rawText },
      { role: 'user', content: 'IMPORTANT: Return ONLY valid JSON. No text before or after the JSON object. Try again.' },
    ],
  });
  const retryRaw = retry.choices[0]?.message?.content ?? '';
  const retryOutput = parseOutput(retryRaw);
  if (!retryOutput) throw new Error('Failed to parse carousel output after retry');
  return retryOutput;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { prompt, provider } = await req.json() as {
      prompt: string;
      provider: 'anthropic' | 'openai';
    };

    if (!prompt || !provider) {
      return NextResponse.json({ error: 'Missing prompt or provider' }, { status: 400 });
    }

    const output = provider === 'openai'
      ? await runOpenAI(prompt)
      : await runAnthropic(prompt);

    return NextResponse.json(output);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Generation failed';
    const isRateLimit = message.toLowerCase().includes('rate') || message.includes('429');
    return NextResponse.json(
      { error: message, rateLimited: isRateLimit },
      { status: isRateLimit ? 429 : 500 }
    );
  }
}
