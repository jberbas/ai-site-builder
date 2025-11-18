// app/(editor)/layout.tsx
import type { ReactNode } from "react";
import { Sidebar } from "@/components/editor/Sidebar";
// If you have ChatDock and want it visible globally, you can import it too:
// import { ChatDock } from "@/components/ai/ChatDock";

export default function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* LEFT: Nebula sidebar */}
      <Sidebar />

      {/* RIGHT: editor canvas + page content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1">{children}</div>
      </main>

      {/* Optional: AI dock on the far right */}
      {/* <ChatDock /> */}
    </div>
  );
}

