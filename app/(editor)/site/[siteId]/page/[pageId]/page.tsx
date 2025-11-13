export const dynamic = "force-dynamic";
export const revalidate = 0;
import { prisma } from "@/lib/prisma";
import Canvas from "@/components/editor/Canvas";
import ChatDock from "@/components/ai/ChatDock";

export default async function EditorPage({
  params,
}: {
  params: { siteId: string; pageId: string };
}) {
  const page = await prisma.page.findUnique({ where: { id: params.pageId } });

  if (!page) {
    return <main style={{ padding: 24 }}>Page not found.</main>;
  }

  const blocks = (page.blocks as any) ?? [];

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>
        Editor — <span style={{ opacity: 0.6 }}>{page.title}</span>
      </h2>
      <Canvas blocks={blocks} />
      {/* AI builder dock */}
      <ChatDock
  pageId={page.id}
  canUndo={!!page.historyHeadId}
  canRedo={!!page.redoHeadId}
/>
    </main>
  );
}
