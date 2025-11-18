// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-8">
        {/* TOP TEST BANNER */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-200">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            <span>✅ Tailwind test layout active on HOME PAGE</span>
          </span>
          <span className="hidden text-[11px] text-emerald-100/80 sm:inline">
            If you see this glowing green bar, Tailwind is working here.
          </span>
        </div>

        {/* MAIN GRID */}
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* LEFT: HERO */}
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] text-sky-200">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
              <span>Home hero · Tailwind sanity check</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                This is the{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                  PUBLIC homepage
                </span>
                .
              </h1>
              <p className="max-w-xl text-sm text-slate-300 sm:text-base">
                If everything is wired correctly, this hero should be centered,
                colorful, and clearly not just a stack of plain text blocks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400"
              >
                Go to editor
              </Link>
              <span className="text-[11px] text-slate-400">
                If the editor looks fancy but this doesn&apos;t, something is
                off with layout or Tailwind on the root route.
              </span>
            </div>
          </section>

          {/* RIGHT: FUN PREVIEW CARD */}
          <section className="relative">
            <div className="pointer-events-none absolute -inset-10 rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.35),_transparent_55%)] blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-950/80 shadow-2xl shadow-sky-900/80 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-0.5 text-[10px]">
                  nebula-sites.ai (home)
                </span>
                <span className="rounded-full border border-slate-700/70 bg-slate-900/80 px-2 py-0.5 text-[10px] text-emerald-300">
                  Tailwind: ON
                </span>
              </div>

              <div className="space-y-4 px-6 py-5 text-[11px] text-slate-300">
                <div>
                  <div className="mb-1 text-slate-400">
                    Layout check · Root vs editor
                  </div>
                  <p>
                    This card only exists to prove the root page is getting the
                    same level of styling as your editor experience.
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-2">
                    <div className="text-[10px] text-slate-500">
                      Root route
                    </div>
                    <div className="mt-1 text-xs font-semibold text-sky-300">
                      /
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-2">
                    <div className="text-[10px] text-slate-500">
                      Editor route
                    </div>
                    <div className="mt-1 text-xs font-semibold text-sky-300">
                      /site/[siteId]/page/[pageId]
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-2">
                    <div className="text-[10px] text-slate-500">
                      Expectation
                    </div>
                    <div className="mt-1 text-xs font-semibold text-emerald-300">
                      Both feel like real UIs
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500">
                  Once this looks right, we&apos;ll replace it with your real
                  high-gloss marketing hero.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
