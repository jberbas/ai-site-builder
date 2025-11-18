"use client";

import type { FC } from "react";
import { NebulaPreviewCanvas } from "@/components/site-render";

const EditorPage: FC = () => {
  return (
    <div className="flex h-full flex-col gap-4">
      <header className="flex items-center justify-between text-[11px] text-slate-400">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          <span>Live canvas</span>
          <span className="text-slate-600">·</span>
          <span>AI-powered preview</span>
        </div>
        <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-0.5 text-[10px]">
          Connected to Supabase
        </span>
      </header>

      <NebulaPreviewCanvas />
    </div>
  );
};

export default EditorPage;

