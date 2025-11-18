// app/(editor)/page.tsx
"use client";

import type { ReactNode } from "react";

export default function EditorPage(): ReactNode {
  return (
    <div className="flex h-full flex-col gap-6">
      {/* TOP BAR INSIDE CANVAS */}
      <header className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 shadow-lg shadow-black/40 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
            Page editor
          </p>
          <p className="mt-1 text-sm text-slate-300">
            Live canvas · AI-powered changes &amp; undo/redo
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]" />
            <span>Connected to Supabase</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950 px-3 py-1 text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400/80" />
            <span>Preview</span>
            <span className="text-slate-400">· 100%</span>
          </span>
          <span className="hidden text-[11px] text-slate-500 md:inline">
            nebula-sites.ai/your-project
          </span>
        </div>
      </header>

      {/* MAIN GRID: LEFT = PAGE PREVIEW, RIGHT = AI / STRUCTURE */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.15fr)]">
        {/* LEFT: PAGE PREVIEW CARD */}
        <section className="space-y-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-xl shadow-black/40">
          {/* HERO */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 md:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-200">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
              <span>Preview · Hero section</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
              AI website, generated in seconds
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-300 md:text-base">
              Launch a stunning site from a single prompt. Nebula Sites designs the
              layout, writes the copy, and wires pages to your data — all with
              undo/redo and AI refinements built in.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="rounded-xl border border-sky-500/60 bg-sky-500/90 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/40 hover:bg-sky-400 transition">
                Generate my website
              </button>
              <button className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800 transition">
                Watch it edit live
              </button>
              <span className="text-xs text-slate-400">
                No credit card · Sandbar to SaaS ready
              </span>
            </div>
          </div>

          {/* FEATURES GRID */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-100">
                  Built for real workflows
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Not just a pretty landing page — a living editor you can ship with.
                </p>
              </div>
              <span className="hidden text-[11px] text-slate-500 md:inline">
                Section: Features grid (3 cards)
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon="⚡"
                title="One-prompt setup"
                desc="Start from a single description. The canvas builds your hero, features, and pricing automatically."
              />
              <FeatureCard
                icon="🧠"
                title="Smart edits"
                desc='Ask for changes in plain language: “Add a new Pro plan” or “Rewrite features for agencies.”'
              />
              <FeatureCard
                icon="🪢"
                title="Undo & history"
                desc="Every change is tracked in your database, with clean undo/redo wired into your editor."
              />
            </div>
          </div>

          {/* PRICING SECTION */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-100">
                  Flexible pricing for any project
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  These cards mirror your actual Pricing block in the database.
                </p>
              </div>
              <p className="text-[11px] text-sky-300">
                Try: <span className="font-mono">“Add an Agency plan”</span> in the chat.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <PricingCard
                name="Starter"
                price="$19/mo"
                features={[
                  "AI-generated layout & copy",
                  "Supabase-backed undo/redo",
                  "Export-ready Next.js code",
                ]}
                highlighted={false}
              />
              <PricingCard
                name="Pro"
                price="$49/mo"
                features={[
                  "AI-generated layout & copy",
                  "Supabase-backed undo/redo",
                  "Export-ready Next.js code",
                ]}
                highlighted
              />
              <PricingCard
                name="Agency"
                price="$99/mo"
                features={[
                  "AI-generated layout & copy",
                  "Supabase-backed undo/redo",
                  "Export-ready Next.js code",
                ]}
                highlighted={false}
              />
            </div>
          </div>
        </section>

        {/* RIGHT: AI STREAM + STRUCTURE */}
        <aside className="space-y-4">
          {/* AI EDIT STREAM */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-5 shadow-lg shadow-black/40">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                AI edit stream
              </h2>
              <span className="rounded-full bg-slate-900 px-2 py-1 text-[11px] text-slate-400">
                Live
              </span>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <LogLine
                role="user"
                text='“Make the hero more premium and ocean-themed.”'
              />
              <LogLine
                role="ai"
                text="Updated headline, colors, and feature icons."
              />
              <LogLine
                role="ai"
                text="Recorded edit · undo/redo available."
              />
            </div>
          </div>

          {/* PAGE STRUCTURE CARD */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Page structure · auto-synced
            </h2>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li>• Hero section — headline, subheadline, primary CTA</li>
              <li>• Features grid — 3 feature cards</li>
              <li>• Pricing section — 3 plans (Starter, Pro, Agency)</li>
            </ul>
            <p className="mt-4 text-[11px] text-slate-500">
              Edits you make via AI will reflow this structure in real time.
            </p>
          </div>

          {/* NEXT STEPS / HELP CARD */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-5 text-xs text-slate-300">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Next step
            </h2>
            <p className="mt-2">
              Wire this canvas to your real <span className="font-mono">Page</span> and{" "}
              <span className="font-mono">blocks</span> data. We’ll reuse the same
              layout but hydrate it with content from the database.
            </p>
            <p className="mt-3 text-[11px] text-slate-500">
              Once connected, every AI change updates both the visual layout and your
              Prisma models, with full undo/redo history.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- Small presentational helpers ---------- */

type FeatureCardProps = {
  icon: string;
  title: string;
  desc: string;
};

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-200 shadow-sm shadow-black/30">
      <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800/80 text-lg">
        {icon}
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-xs text-slate-400">{desc}</p>
    </div>
  );
}

type PricingCardProps = {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
};

function PricingCard({ name, price, features, highlighted }: PricingCardProps) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-4 text-sm shadow-sm shadow-black/30 ${
        highlighted
          ? "border-sky-500/70 bg-slate-900/90"
          : "border-slate-800 bg-slate-900/80"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-50">{name}</h3>
        <span className="text-xs text-slate-400">{price}</span>
      </div>
      <ul className="mt-3 space-y-1 text-xs text-slate-300">
        {features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
      <button
        className={`mt-4 w-full rounded-xl px-3 py-2 text-xs font-medium transition ${
          highlighted
            ? "bg-sky-500 text-slate-950 hover:bg-sky-400"
            : "bg-slate-800 text-slate-100 hover:bg-slate-700"
        }`}
      >
        Choose {name}
      </button>
    </div>
  );
}

type LogLineProps = {
  role: "user" | "ai";
  text: string;
};

function LogLine({ role, text }: LogLineProps) {
  const isUser = role === "user";
  return (
    <div className="flex gap-2">
      <span
        className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
          isUser
            ? "bg-slate-800 text-slate-200"
            : "bg-sky-500/15 text-sky-300"
        }`}
      >
        {isUser ? "U" : "AI"}
      </span>
      <p className="flex-1 text-slate-300">{text}</p>
    </div>
  );
}

