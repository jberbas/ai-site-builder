import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { pageId } = await req.json();
    if (!pageId) {
      return NextResponse.json({ ok: false, error: "Missing pageId" }, { status: 400 });
    }

    // Get the current head of the undo stack
    const page = await prisma.page.findUnique({
      where: { id: pageId },
      select: { historyHeadId: true },
    });
    if (!page) {
      return NextResponse.json({ ok: false, error: "Page not found" }, { status: 404 });
    }
    if (!page.historyHeadId) {
      // nothing to undo
      return NextResponse.json({ ok: true, note: "Nothing to undo" });
    }

    // Load the edit at the head of the undo stack
    const headEdit = await prisma.edit.findUnique({
      where: { id: page.historyHeadId },
      select: { id: true, before: true, prevEditId: true },
    });
    if (!headEdit) {
      return NextResponse.json({ ok: false, error: "Head edit not found" }, { status: 404 });
    }

    // Apply the BEFORE snapshot, move history head back, and set redo head to the applied edit
    await prisma.page.update({
      where: { id: pageId },
      data: {
        blocks: headEdit.before as Prisma.InputJsonValue,
        historyHeadId: headEdit.prevEditId,
        redoHeadId: headEdit.id,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[AI-UNDO] error", err);
    return NextResponse.json({ ok: false, error: "Undo failed" }, { status: 500 });
  }
}
