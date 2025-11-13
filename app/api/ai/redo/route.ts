import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";


export async function POST(req: NextRequest) {
  try {
    const { pageId } = await req.json();
    if (!pageId) return NextResponse.json({ ok: false, error: "Missing pageId" }, { status: 400 });

    console.log("[AI-REDO] for page", pageId);

    const page = await prisma.page.findUnique({ where: { id: pageId } });
    if (!page || !page.redoHeadId) return NextResponse.json({ ok: false, note: "Nothing to redo" });

    const edit = await prisma.edit.findUnique({ where: { id: page.redoHeadId } });
    if (!edit) return NextResponse.json({ ok: false, note: "Nothing to redo" });

    await prisma.page.update({
  where: { id: pageId },
  data: {
    blocks: edit.after as Prisma.InputJsonValue,
    historyHeadId: edit.id,
    redoHeadId: null,
  },
});


    console.log("[AI-REDO] applied edit", edit.id);
    return NextResponse.json({ ok: true, note: "Redone", blocks: edit.after });
  } catch (e: any) {
    console.error("[AI-REDO] ERROR", e);
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
