"use client";

import React from "react";
import type { Block, PricingBlock, Features3Block } from "@/lib/blocks";

interface CanvasProps {
  blocks: Block[];
}

/**
 * Main canvas: renders a nice, centered "real website" view
 * of the current page blocks.
 */
export function Canvas({ blocks }: CanvasProps) {
  return (
    <div style={outerStyle}>
      <div style={pageFrameStyle}>
        {blocks.length === 0 ? (
          <EmptyState />
        ) : (
          blocks.map((block, index) => (
            <section key={index} style={sectionWrapperStyle}>
              {renderBlock(block)}
            </section>
          ))
        )}
      </div>
    </div>
  );
}

export default Canvas;

/* ─────────────────────────────────────────────────────────────
   Block dispatcher
   ──────────────────────────────────────────────────────────── */

function renderBlock(block: Block) {
  switch (block.type) {
    case "Hero":
      return <HeroSection {...(block as any).props} />;
    case "RichText":
      return <RichTextSection {...(block as any).props} />;
    case "Pricing":
      return <PricingSection block={block as PricingBlock} />;
    case "Features3":
      return <Features3Section block={block as Features3Block} />;
    default:
      return (
        <div style={unknownBlockStyle}>
          <code>Unknown block type: {(block as any).type}</code>
        </div>
      );
  }
}

/* ─────────────────────────────────────────────────────────────
   Individual sections
   ──────────────────────────────────────────────────────────── */

function HeroSection(props: { headline: string; subheadline?: string }) {
  const { headline, subheadline } = props;

  return (
    <div style={heroContainerStyle}>
      <div style={heroBadgeRowStyle}>
        <span style={heroBadgeStyle}>AI Website Builder</span>
        <span style={heroBadgeSubStyle}>Live preview</span>
      </div>
      <h1 style={heroHeadlineStyle}>{headline || "Your product headline"}</h1>
      {subheadline && (
        <p style={heroSubheadlineStyle}>{subheadline}</p>
      )}
      <div style={heroCtaRowStyle}>
        <button style={primaryButtonStyle}>Get Started</button>
        <button style={ghostButtonStyle}>Learn More</button>
      </div>
    </div>
  );
}

function RichTextSection(props: { content: string }) {
  return (
    <div style={cardStyle}>
      <div style={cardBodyStyle}>
        <p style={richTextStyle}>
          {props.content || "Write anything here with the AI editor."}
        </p>
      </div>
    </div>
  );
}

function PricingSection({ block }: { block: PricingBlock }) {
  const { headline, subheadline, plans = [] } = block.props || {};

  return (
    <div>
      <div style={sectionHeaderStyle}>
        <h2 style={sectionTitleStyle}>
          {headline || "Pricing"}
        </h2>
        {subheadline && (
          <p style={sectionSubtitleStyle}>{subheadline}</p>
        )}
      </div>
      <div style={pricingGridStyle}>
        {plans.map((plan, index) => (
          <div key={index} style={pricingCardStyle}>
            <div style={pricingHeaderStyle}>
              <div style={pricingNameStyle}>{plan.name}</div>
              <div style={pricingPriceStyle}>{plan.price}</div>
            </div>
            {Array.isArray(plan.features) && plan.features.length > 0 && (
              <ul style={pricingFeatureListStyle}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={pricingFeatureItemStyle}>
                    <span style={checkIconStyle}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            <button style={primaryButtonFullStyle}>
              {plan.ctaLabel || `Choose ${plan.name}`}
            </button>
          </div>
        ))}
        {plans.length === 0 && (
          <div style={emptyPricingStyle}>
            <p>No plans yet. Try: <code>add basic plan at $19</code> in the AI dock.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Features3Section({ block }: { block: Features3Block }) {
  const { headline, subheadline, items = [] } = block.props || {};

  return (
    <div>
      <div style={sectionHeaderStyle}>
        <h2 style={sectionTitleStyle}>
          {headline || "Features"}
        </h2>
        {subheadline && (
          <p style={sectionSubtitleStyle}>{subheadline}</p>
        )}
      </div>
      <div style={featuresGridStyle}>
        {items.map((item, index) => (
          <div key={index} style={featureCardStyle}>
            <div style={featureIconStyle}>{item.icon || "✨"}</div>
            <div style={featureTitleStyle}>{item.title}</div>
            {item.desc && (
              <div style={featureDescStyle}>{item.desc}</div>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <div style={emptyFeaturesStyle}>
            <p>No features yet. Try: <code>add feature card anchor stability</code>.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Empty / unknown states
   ──────────────────────────────────────────────────────────── */

function EmptyState() {
  return (
    <div style={emptyStateStyle}>
      <h2 style={emptyStateTitleStyle}>Start building your page</h2>
      <p style={emptyStateTextStyle}>
        Use the AI dock on the right to add a hero, pricing, or feature sections.
      </p>
      <p style={emptyStateHintStyle}>
        Example commands:
      </p>
      <ul style={emptyStateListStyle}>
        <li>“Create a hero section for a marine-grade umbrella brand.”</li>
        <li>“Add a pricing section with Starter, Pro, and Agency plans.”</li>
        <li>“Add three feature cards about stability, durability, and lifestyle.”</li>
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Styles
   ──────────────────────────────────────────────────────────── */

const outerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top, #0f172a 0%, #020617 50%, #020617 100%)",
  padding: "32px 16px",
  display: "flex",
  justifyContent: "center",
  overflowY: "auto",
};

const pageFrameStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 960,
  background: "rgba(15, 23, 42, 0.95)",
  borderRadius: 24,
  boxShadow: "0 24px 80px rgba(15, 23, 42, 0.8)",
  border: "1px solid rgba(148, 163, 184, 0.2)",
  padding: "40px 32px 48px",
  color: "#e5e7eb",
};

const sectionWrapperStyle: React.CSSProperties = {
  marginBottom: 40,
};

const unknownBlockStyle: React.CSSProperties = {
  padding: 24,
  borderRadius: 16,
  border: "1px dashed rgba(148, 163, 184, 0.4)",
  background: "rgba(15, 23, 42, 0.6)",
  fontSize: 13,
  color: "#9ca3af",
};

/* Hero styles */

const heroContainerStyle: React.CSSProperties = {
  textAlign: "left",
};

const heroBadgeRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 16,
};

const heroBadgeStyle: React.CSSProperties = {
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 11,
  letterSpacing: 0.5,
  textTransform: "uppercase",
  background: "rgba(34, 197, 94, 0.12)",
  color: "#bbf7d0",
  border: "1px solid rgba(34, 197, 94, 0.3)",
};

const heroBadgeSubStyle: React.CSSProperties = {
  fontSize: 11,
  color: "#9ca3af",
};

const heroHeadlineStyle: React.CSSProperties = {
  fontSize: 40,
  lineHeight: 1.1,
  fontWeight: 800,
  margin: 0,
  color: "#f9fafb",
};

const heroSubheadlineStyle: React.CSSProperties = {
  marginTop: 16,
  marginBottom: 0,
  fontSize: 16,
  lineHeight: 1.6,
  color: "#cbd5f5" as any,
};

const heroCtaRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  marginTop: 24,
};

const primaryButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 999,
  border: "none",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  background:
    "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "#022c22",
  boxShadow: "0 12px 30px rgba(22, 163, 74, 0.4)",
};

const ghostButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 999,
  border: "1px solid rgba(148, 163, 184, 0.5)",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  background: "transparent",
  color: "#e5e7eb",
};

/* Generic card + section header */

const cardStyle: React.CSSProperties = {
  borderRadius: 20,
  border: "1px solid rgba(148, 163, 184, 0.25)",
  background:
    "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.96))",
};

const cardBodyStyle: React.CSSProperties = {
  padding: 20,
};

const sectionHeaderStyle: React.CSSProperties = {
  marginBottom: 20,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 24,
  margin: 0,
  color: "#f9fafb",
};

const sectionSubtitleStyle: React.CSSProperties = {
  margin: "8px 0 0",
  fontSize: 14,
  color: "#9ca3af",
};

const richTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.7,
  color: "#e5e7eb",
};

/* Pricing styles */

const pricingGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
};

const pricingCardStyle: React.CSSProperties = {
  borderRadius: 18,
  border: "1px solid rgba(148, 163, 184, 0.35)",
  background:
    "radial-gradient(circle at top left, rgba(34, 197, 94, 0.08), rgba(15, 23, 42, 0.98))",
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const pricingHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: 8,
};

const pricingNameStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: "#e5e7eb",
};

const pricingPriceStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: "#bbf7d0",
};

const pricingFeatureListStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: "8px 0 0",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  fontSize: 13,
};

const pricingFeatureItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  color: "#cbd5f5" as any,
};

const checkIconStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#4ade80",
};

const primaryButtonFullStyle: React.CSSProperties = {
  marginTop: 10,
  width: "100%",
  padding: "9px 14px",
  borderRadius: 999,
  border: "none",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  background:
    "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "#022c22",
};

const emptyPricingStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#9ca3af",
  borderRadius: 16,
  border: "1px dashed rgba(148, 163, 184, 0.4)",
  padding: 16,
};

/* Features styles */

const featuresGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
};

const featureCardStyle: React.CSSProperties = {
  borderRadius: 18,
  border: "1px solid rgba(148, 163, 184, 0.3)",
  background:
    "radial-gradient(circle at top, rgba(148, 163, 184, 0.12), rgba(15, 23, 42, 0.98))",
  padding: 16,
};

const featureIconStyle: React.CSSProperties = {
  fontSize: 22,
};

const featureTitleStyle: React.CSSProperties = {
  marginTop: 8,
  fontSize: 15,
  fontWeight: 600,
  color: "#e5e7eb",
};

const featureDescStyle: React.CSSProperties = {
  marginTop: 6,
  fontSize: 13,
  color: "#cbd5f5" as any,
};

const emptyFeaturesStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#9ca3af",
  borderRadius: 16,
  border: "1px dashed rgba(148, 163, 184, 0.4)",
  padding: 16,
};

/* Empty state */

const emptyStateStyle: React.CSSProperties = {
  textAlign: "left",
};

const emptyStateTitleStyle: React.CSSProperties = {
  fontSize: 24,
  margin: 0,
  color: "#f9fafb",
};

const emptyStateTextStyle: React.CSSProperties = {
  marginTop: 8,
  fontSize: 14,
  color: "#cbd5f5" as any,
};

const emptyStateHintStyle: React.CSSProperties = {
  marginTop: 16,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: 0.6,
  color: "#9ca3af",
};

const emptyStateListStyle: React.CSSProperties = {
  marginTop: 8,
  paddingLeft: 16,
  fontSize: 13,
  color: "#e5e7eb",
};
