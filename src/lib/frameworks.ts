export interface Framework {
  id: number;
  name: string;
  hook: string;
  description: string;
  bullets: string[];
}

export const FRAMEWORKS: Framework[] = [
  {
    id: 1,
    name: 'Pattern Interrupt',
    hook: 'Stop the scroll with a disruptive opening',
    description: 'Open with something unexpected that forces a second look.',
    bullets: [
      'Violate a pattern the audience has seen before',
      'The hook must be counterintuitive',
      'Creates a cognitive dissonance that demands resolution',
    ],
  },
  {
    id: 2,
    name: 'Belief Shifting',
    hook: 'Challenge existing beliefs and reframe thinking',
    description: 'Identify and systematically dismantle one limiting belief.',
    bullets: [
      'Name the limiting belief your audience holds',
      'Challenge it slide by slide with evidence',
      'End with the new belief they should hold',
    ],
  },
  {
    id: 3,
    name: 'Beginner Awareness',
    hook: 'Educate newcomers about the problem space',
    description: 'Assume the audience doesn\'t know the problem exists yet.',
    bullets: [
      'Gently introduce the problem space',
      'Make them aware of the gap',
      'Show the solution without overwhelming',
    ],
  },
  {
    id: 4,
    name: 'Problem Awareness',
    hook: 'Amplify the pain point they\'re experiencing',
    description: 'They know they have a problem but haven\'t named it.',
    bullets: [
      'Name the problem precisely and clearly',
      'Describe the emotional weight of it',
      'Create desire for resolution',
    ],
  },
  {
    id: 5,
    name: 'Solution Awareness',
    hook: 'Show them what\'s possible with a solution',
    description: 'They know solutions exist but haven\'t chosen one.',
    bullets: [
      'Show what the right solution feels like from the inside',
      'Focus on transformation, not features',
      'Position the category before the product',
    ],
  },
  {
    id: 6,
    name: 'Product Awareness',
    hook: 'Position your product as the answer',
    description: 'They know your product category — now differentiate.',
    bullets: [
      'Use specificity, proof, and premium positioning',
      'Differentiate from alternatives directly',
      'Make the choice feel inevitable',
    ],
  },
  {
    id: 7,
    name: 'Authority Builder',
    hook: 'Establish expertise and credibility',
    description: 'Establish credibility before making any offer.',
    bullets: [
      'Lead with data, credentials, experience, or results',
      'Build trust systematically across slides',
      'Let authority create desire organically',
    ],
  },
  {
    id: 8,
    name: 'Case Study / Proof',
    hook: 'Real results and social proof',
    description: 'Lead with a real transformation story.',
    bullets: [
      'Structure: Before → Turning point → Method → After',
      'Make the transformation feel real and specific',
      'Close with the offer that made it possible',
    ],
  },
  {
    id: 9,
    name: 'Myth Busting',
    hook: 'Debunk common misconceptions',
    description: 'Identify and bust 3–5 beliefs keeping people from the outcome.',
    bullets: [
      'Name each myth directly and confidently',
      'Replace with truth using specificity and conviction',
      'End with what\'s actually true',
    ],
  },
  {
    id: 10,
    name: 'Comparison / Objection Handling',
    hook: 'Address objections head-on',
    description: 'Name the objections directly, then reframe each one.',
    bullets: [
      'Show why perceived barriers prove they need the solution',
      'Use contrast to highlight value',
      'Close the gap between hesitation and action',
    ],
  },
  {
    id: 11,
    name: 'Soft Story Sell',
    hook: 'Narrative-driven persuasion',
    description: 'Lead with narrative — invite the audience into a specific scene.',
    bullets: [
      'Build empathy through vivid storytelling',
      'Organically introduce the product as natural resolution',
      'Emotion drives action, story drives emotion',
    ],
  },
  {
    id: 12,
    name: 'Direct Hard Sell',
    hook: 'Straight to the offer',
    description: 'No storytelling. No warmup. Straight to value.',
    bullets: [
      'State what it is, what it costs, why it\'s worth it',
      'Exactly how to get it — nothing more',
      'Works best for warm/hot audiences',
    ],
  },
  {
    id: 13,
    name: 'Launch Countdown',
    hook: 'Urgency-driven launch content',
    description: 'Create urgency using scarcity and time.',
    bullets: [
      'Make the deadline feel real and specific',
      'Use stakes, specificity, and loss aversion',
      'Every slide builds toward the moment of action',
    ],
  },
  {
    id: 14,
    name: 'Poll Engagement',
    hook: 'Interactive engagement carousel',
    description: 'Design the carousel to generate a response.',
    bullets: [
      'Each slide prompts a thought, feeling, or reaction',
      'Creates micro-commitments across the carousel',
      'End with a direct engagement CTA',
    ],
  },
  {
    id: 15,
    name: 'Saveable Educational',
    hook: 'High-value educational content',
    description: 'Make this carousel worth saving.',
    bullets: [
      'Pack it with genuine insight, frameworks, or step-by-step knowledge',
      'Every slide stands alone as a useful piece of information',
      'Design for return visits and shares',
    ],
  },
];

export const FRAMEWORK_PROMPT_INJECTIONS: Record<string, string> = {
  'Pattern Interrupt': 'Open with something unexpected that forces a second look. Violate a pattern the audience has seen before. The hook must be counterintuitive.',
  'Belief Shifting': 'Identify one limiting belief your audience holds. Challenge it systematically across slides. End with the new belief they should hold.',
  'Beginner Awareness': 'Assume the audience doesn\'t know the problem exists yet. Educate gently — introduce the problem space, make them aware of the gap, then show the solution.',
  'Problem Awareness': 'They know they have a problem but haven\'t named it. Name it precisely, describe the emotional weight of it, then create desire for resolution.',
  'Solution Awareness': 'They know solutions exist but haven\'t chosen one. Show what the right solution feels like from the inside. Focus on transformation, not features.',
  'Product Awareness': 'They know your product category. Now differentiate. Position this specific product as the answer — use specificity, proof, and premium positioning.',
  'Authority Builder': 'Establish credibility first. Use data, credentials, experience, or results to build trust before making any offer.',
  'Case Study / Proof': 'Lead with a real transformation. Structure: Before state → Turning point → Method → After state → The offer that made it possible.',
  'Myth Busting': 'Identify 3–5 beliefs the audience holds that keep them from the outcome. Bust each one with truth, specificity, and conviction.',
  'Comparison / Objection Handling': 'Name the objections directly. Reframe each one. Show why the perceived barrier is actually proof they need the solution.',
  'Soft Story Sell': 'Lead with narrative. Invite the audience into a specific scene or moment. Build empathy, then organically introduce the product as the natural resolution.',
  'Direct Hard Sell': 'No storytelling. No warmup. Straight to the value proposition — what it is, what it costs, why it\'s worth it, and exactly how to get it.',
  'Launch Countdown': 'Create urgency using scarcity and time. Make the deadline feel real. Use stakes, specificity, and loss aversion as the driving emotional force.',
  'Poll Engagement': 'Design the carousel to generate a response. Each slide should prompt a thought, a feeling, or a reaction. End with a direct engagement CTA.',
  'Saveable Educational': 'Make this carousel worth saving. Pack it with genuine insight, frameworks, or step-by-step knowledge the audience can use and return to.',
};
