import { z } from "zod";

/** ---------- Block Schemas ---------- */
export const HeroSchema = z.object({
  type: z.literal("Hero"),
  props: z.object({
    headline: z.string().min(1).default("Hero headline"),
    subheadline: z.string().default("Subheadline"),
  }),
});

export const RichTextSchema = z.object({
  type: z.literal("RichText"),
  props: z.object({
    content: z.string().default("Rich text…"),
  }),
});

export const PricingPlanSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1), // e.g. "$19/mo"
  features: z.array(z.string()).default([]),
  ctaLabel: z.string().default("Choose"),
});

export const PricingSchema = z.object({
  type: z.literal("Pricing"),
  props: z.object({
    headline: z.string().default("Pricing"),
    subheadline: z.string().default("Choose your plan"),
    plans: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        features: z.array(z.string()).default([]),
        ctaLabel: z.string().default("Get started"),
      })
    ).default([]),
  }),
});

export const FeatureItemSchema = z.object({
  icon: z.string().default("✨"),
  title: z.string().min(1),
  desc: z.string().default(""),
});

export const Features3Schema = z.object({
  type: z.literal("Features3"),
  props: z.object({
    headline: z.string().default("Features"),
    subheadline: z.string().default("Why people love this"),
    items: z.array(
      z.object({
        icon: z.string().default("✨"),
        title: z.string(),
        desc: z.string().default(""),
      })
    ).default([]),
  }),
});

/** ---------- Union + Types ---------- */
export const BlockSchema = z.discriminatedUnion("type", [
  HeroSchema,
  RichTextSchema,
  PricingSchema,
  Features3Schema,
]);

export type Block = z.infer<typeof BlockSchema>;
export type PricingBlock = z.infer<typeof PricingSchema>;
export type Features3Block = z.infer<typeof Features3Schema>;

/** ---------- Array + Validator (after BlockSchema) ---------- */
export const BlocksArraySchema = z.array(BlockSchema);

export function validateBlocks(input: unknown): Block[] {
  // Throws if the shape is wrong
  return BlocksArraySchema.parse(input);
}

/** ---------- Defaults & Helpers ---------- */

export function makeDefaultPricing(): Block {
  return {
    type: "Pricing",
    props: {
      headline: "Simple, transparent pricing",
      subheadline: "Pick the plan that fits you",
      plans: [
        {
          name: "Starter",
          price: "$19/mo",
          features: ["1 site", "Basic support"],
          ctaLabel: "Choose Starter",
        },
        {
          name: "Pro",
          price: "$49/mo",
          features: ["3 sites", "Priority support"],
          ctaLabel: "Choose Pro",
        },
        {
          name: "Agency",
          price: "$99/mo",
          features: ["Unlimited", "White-label"],
          ctaLabel: "Choose Agency",
        },
      ],
    },
  } as const satisfies Block;
}

export function findLastPricing(blocks: Block[]): PricingBlock | null {
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i];
    if (b.type === "Pricing") return b as PricingBlock;
  }
  return null;
}

export function addPlanToPricing(
  p: PricingBlock,
  name: string,
  price: string,
  features: string[] = [],
  ctaLabel = "Get started"
) {
  p.props.plans.push({ name, price, features, ctaLabel });
}

export function addFeatureToPlan(
  p: PricingBlock,
  planName: string,
  feature: string
) {
  const plan = p.props.plans.find(
    (pl) => pl.name.toLowerCase() === planName.toLowerCase()
  );
  if (!plan) return;
  if (!Array.isArray(plan.features)) plan.features = [];
  plan.features.push(feature);
}

export function makeDefaultFeatures3(): Features3Block {
  return Features3Schema.parse({
    type: "Features3",
    props: {
      headline: "Features",
      subheadline: "Why people love this",
      items: [
        {
          icon: "⚓",
          title: "Anchored Stability",
          desc: "Hold fast with reliable tension.",
        },
        {
          icon: "🛡️",
          title: "Marine-Grade",
          desc: "Built to last in harsh conditions.",
        },
      ],
    },
  });
}

export function findLastFeatures3(blocks: Block[]): Features3Block | null {
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i];
    if (b.type === "Features3") return b as Features3Block;
  }
  return null;
}

export function addFeatureCard(
  f: Features3Block,
  icon: string,
  title: string,
  desc: string
) {
  if (!Array.isArray(f.props.items)) f.props.items = [];
  f.props.items.push({ icon, title, desc });
}
