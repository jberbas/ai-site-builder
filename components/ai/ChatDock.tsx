"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ChatDock({
  pageId,
  canUndo = false,
  canRedo = false,
}: {
  pageId: string;
  canUndo?: boolean;
  canRedo?: boolean;
}) {
  const [cmd, setCmd] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!cmd.trim()) return;
    setNote(null);

    const res = await fetch("/api/ai/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageId, command: cmd }),
    });
    const data = await res.json();
    setNote(data.note || (data.ok ? "Updated" : data.error || "Something went wrong"));
    if (data.ok) setCmd("");
    startTransition(() => router.refresh());
  }

  async function doUndo() {
    const res = await fetch("/api/ai/undo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageId }),
    });
    const data = await res.json();
    setNote(data.note || (data.ok ? "Undone" : "Nothing to undo"));
    startTransition(() => router.refresh());
  }

  async function doRedo() {
    const res = await fetch("/api/ai/redo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageId }),
    });
    const data = await res.json();
    setNote(data.note || (data.ok ? "Redone" : "Nothing to redo"));
    startTransition(() => router.refresh());
  }

  // Optional: Ctrl+Z / Ctrl+Shift+Z
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const ctrlOrMeta = e.ctrlKey || e.metaKey;
      if (!ctrlOrMeta) return;
      if (e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) doUndo();
      } else if ((e.key.toLowerCase() === "z" && e.shiftKey) || e.key.toLowerCase() === "y") {
        e.preventDefault();
        if (canRedo) doRedo();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canUndo, canRedo]);

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        padding: 12,
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        width: 380,
        zIndex: 50,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 8 }}>AI Builder</div>

      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          placeholder='Try: add features · add pricing · add plan Pro $29/mo'
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #d1d5db",
            outline: "none",
          }}
        />
        <button
          disabled={isPending || !cmd.trim()}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #111827",
            background: isPending || !cmd.trim() ? "#6b7280" : "#111827",
            color: "white",
            fontWeight: 600,
            cursor: isPending || !cmd.trim() ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Applying..." : "Apply"}
        </button>
      </form>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button
          type="button"
          onClick={doUndo}
          disabled={!canUndo}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
            background: canUndo ? "white" : "#f3f4f6",
            color: canUndo ? "inherit" : "#9ca3af",
            cursor: canUndo ? "pointer" : "not-allowed",
            flex: 1,
          }}
          title="Ctrl+Z"
        >
          Undo
        </button>

        <button
          type="button"
          onClick={doRedo}
          disabled={!canRedo}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
            background: canRedo ? "white" : "#f3f4f6",
            color: canRedo ? "inherit" : "#9ca3af",
            cursor: canRedo ? "pointer" : "not-allowed",
            flex: 1,
          }}
          title="Ctrl+Shift+Z"
        >
          Redo
        </button>
      </div>

      {note && <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>{note}</div>}

      <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
        Examples: “add pricing”, “add features”, “add feature card ⚓ | Anchored Stability | Holds under tension”
      </div>
    </div>
  );
}
