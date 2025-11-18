"use client";

import type { FC } from "react";

export const NebulaPreviewCanvas: FC = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10">
      <div className="mx-auto flex max-w-5xl justify-center">
        {/* FUTURISTIC “MONITOR” */}
        <div
          className="
            relative w-full max-w-3xl
            rounded-[2.5rem]
            border-4 border-cyan-400/80
            bg-slate-950/95
            px-8 py-10
            shadow-[0_0_80px_rgba(34,211,238,0.8)]
            overflow-hidden
          "
        >
          {/* Background glows */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/30 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0),_rgba(15,23,42,1))]" />
          </div>

          {/* Tiny browser chrome */}
          <div className="mb-6 flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500/80" />
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-3 rounded-full bg-slate-900/90 px-3 py-0.5 text-slate-400">
                nebula-sites.ai/demo
              </span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/90 px-2 py-0.5 text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              Live · 100%
            </span>
          </div>

          {/* MAIN CONTENT */}
          <div className="space-y-8">
            {/* HERO */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-200">
                <span className="text-xs">⚡</span>
                <span>AI website · generated in seconds</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                  Launch a stunning site{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                    from a single prompt.
                  </span>
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-slate-300">
                  Describe your idea once. Nebula Sites designs the layout,
                  writes the copy, and wires pages to your data — with undo/redo
                  and AI-powered refinements built in.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-[0_18px_40px_rgba(8,47,73,0.7)] hover:bg-cyan-400">
                  Generate my website
                </button>
                <button className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-100 hover:border-slate-500">
                  Watch it edit live
                </button>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>No credit card</span>
                  <span className="text-slate-600">·</span>
                  <span>Keep the generated code</span>
                </div>
              </div>
            </section>

            {/* FEATURES */}
            <section className="space-y-4">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Built for real workflows
                </h2>
                <p className="mt-1 text-[11px] text-slate-400">
                  Not just a pretty landing page — a living editor you can ship
                  with.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: "⚡",
                    title: "One-prompt setup",
                    desc: "Start from a single description. The canvas builds your hero, features, and pricing automatically.",
                  },
                  {
                    icon: "🧠",
                    title: "Smart edits",
                    desc: "Ask for changes in plain language: “Add a Pro plan” or “Rewrite features for agencies.”",
                  },
                  {
                    icon: "🪢",
                    title: "Undo & history",
                    desc: "Every change is tracked to your database with clean undo/redo.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-[0_0_30px_rgba(15,23,42,0.9)] hover:border-cyan-400/70"
                  >
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800/90 text-lg">
                      {item.icon}
                    </div>
                    <div className="text-sm font-medium text-slate-50">
                      {item.title}
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* PRICING */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                    Flexible pricing for any project
                  </h2>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Mirrors your <span className="font-mono">Pricing</span>{" "}
                    block in the database.
                  </p>
                </div>
                <span className="hidden rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-400 sm:inline-flex">
                  Try:{" "}
                  <span className="ml-1 text-cyan-300">
                    “Add an Agency plan”
                  </span>
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { name: "Starter", price: "$19/mo", highlight: false },
                  { name: "Pro", price: "$49/mo", highlight: true, badge: "Most popular" },
                  { name: "Agency", price: "$99/mo", highlight: false },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className={[
                      "relative flex flex-col rounded-2xl border bg-slate-950/90 p-4 text-[11px]",
                      plan.highlight
                        ? "border-cyan-400/80 shadow-[0_0_45px_rgba(34,211,238,0.7)]"
                        : "border-slate-800",
                    ].join(" ")}
                  >
                    {"badge" in plan && plan.badge && (
                      <div className="absolute -top-2 right-3 rounded-full bg-cyan-500 px-2 py-0.5 text-[9px] font-semibold text-slate-950">
                        {plan.badge}
                      </div>
                    )}
                    <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-400">
                      {plan.name}
                    </div>
                    <div className="mb-2 text-lg font-semibold text-slate-50">
                      {plan.price}
                    </div>
                    <ul className="mb-4 space-y-1 text-slate-400">
                      <li>• AI-generated layout & copy</li>
                      <li>• Supabase-backed undo/redo</li>
                      <li>• Export-ready Next.js project</li>
                    </ul>
                    <button
                      className={[
                        "mt-auto inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-[11px] font-medium",
                        plan.highlight
                          ? "border-cyan-400 bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                          : "border-slate-700 bg-slate-900/80 text-slate-100 hover:border-slate-500",
                      ].join(" ")}
                    >
                      Choose {plan.name}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
