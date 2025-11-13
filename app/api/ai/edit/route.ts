import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  BlockSchema,
  type Block,
  makeDefaultPricing,
  makeDefaultFeatures3,
  findLastPricing,
  findLastFeatures3,
  addPlanToPricing,
  addFeatureToPlan,
  addFeatureCard,
  validateBlocks, 
} from "@/lib/blocks";


// ───────────────────────────────────────────────────────────
// Persist an edit (with logs so we can see it happen)
// ───────────────────────────────────────────────────────────
async function recordEdit(pageId: string, beforeBlocks: any[], afterBlocks: any[]) {
  console.log("[AI-EDIT] recordEdit:start pageId=", pageId);

  const page = await prisma.page.findUnique({ where: { id: pageId } });
  if (!page) {
    console.log("[AI-EDIT] recordEdit:pageNotFound");
    throw new Error("Page not found in recordEdit");
  }

  const edit = await prisma.edit.create({
    data: {
      pageId,
      prevEditId: page.historyHeadId ?? null,
      before: beforeBlocks,
      after: afterBlocks,
    },
  });

  await prisma.page.update({
    where: { id: pageId },
    data: {
      historyHeadId: edit.id, // move head forward
      redoHeadId: null,       // new edit clears redo
    },
  });

  console.log("[AI-EDIT] recordEdit:ok id=", edit.id);
  return edit.id;
}

// ───────────────────────────────────────────────────────────
// Tiny command parser (Features/Pricing/Hero/RichText)
// ───────────────────────────────────────────────────────────
function applyCommand(blocks: any[], command: string) {
  const c = command.trim();
  const lc = c.toLowerCase();

  // Add basic blocks
  if (lc.startsWith("add hero")) {
    blocks.push({
      type: "Hero",
      props: { headline: "New Hero", subheadline: "Describe your product here" },
    });
    return { ok: true, note: "Hero added" };
  }
  if (lc.startsWith("add text") || lc.startsWith("add paragraph") || lc.startsWith("add richtext")) {
    blocks.push({ type: "RichText", props: { content: "New paragraph..." } });
    return { ok: true, note: "RichText added" };
  }
  if (lc.startsWith("add pricing")) {
    blocks.push(makeDefaultPricing());
    return { ok: true, note: "Pricing added" };
  }
  if (lc.startsWith("add features")) {
    blocks.push(makeDefaultFeatures3());
    return { ok: true, note: "Features3 added" };
  }
  // if (lc.startsWith("add cta")) {
  //   blocks.push(makeDefaultCta());
  //   return { ok: true, note: "CTA added" };
  // }

  // Pricing updates
  if (lc.startsWith("set pricing headline to ")) {
    const value = c.slice("set pricing headline to ".length).trim();
    const p = findLastPricing(blocks as any);
    if (!p) return { ok: false, note: "No Pricing block found" };
    p.props.headline = value;
    return { ok: true, note: "Pricing headline updated" };
  }
  if (lc.startsWith("set pricing subheadline to ")) {
    const value = c.slice("set pricing subheadline to ".length).trim();
    const p = findLastPricing(blocks as any);
    if (!p) return { ok: false, note: "No Pricing block found" };
    p.props.subheadline = value;
    return { ok: true, note: "Pricing subheadline updated" };
  }
  if (lc.startsWith("add plan ")) {
    const tail = c.slice("add plan ".length).trim();
    const m = tail.match(/^(.*)\s+(\$?\d+[^ ]*)$/);
    const name = m?.[1]?.trim();
    const price = m?.[2]?.trim();
    if (!name || !price) return { ok: false, note: `Couldn't parse plan. Try: add plan Basic $9/mo` };
    const p = findLastPricing(blocks as any);
    if (!p) return { ok: false, note: "No Pricing block found" };
    addPlanToPricing(p as any, name, price);
    return { ok: true, note: `Plan "${name}" added` };
  }
  if (lc.startsWith("add feature to ")) {
    const rest = c.slice("add feature to ".length);
    const [planPart, featurePart] = rest.split(":");
    const planName = planPart?.trim();
    const feature = featurePart?.trim();
    if (!planName || !feature) return { ok: false, note: `Try: add feature to Pro: Unlimited Sites` };
    const p = findLastPricing(blocks as any);
    if (!p) return { ok: false, note: "No Pricing block found" };
    addFeatureToPlan(p as any, planName, feature);
    return { ok: true, note: `Feature added to ${planName}` };
  }

  // Features3 updates
  if (lc.startsWith("set features headline to ")) {
    const value = c.slice("set features headline to ".length).trim();
    const f = findLastFeatures3(blocks as any);
    if (!f) return { ok: false, note: "No Features block found" };
    f.props.headline = value;
    return { ok: true, note: "Features headline updated" };
  }
  if (lc.startsWith("set features subheadline to ")) {
    const value = c.slice("set features subheadline to ".length).trim();
    const f = findLastFeatures3(blocks as any);
    if (!f) return { ok: false, note: "No Features block found" };
    f.props.subheadline = value;
    return { ok: true, note: "Features subheadline updated" };
  }
  if (lc.startsWith("add feature card ")) {
    const tail = c.slice("add feature card ".length);
    const parts = tail.split("|").map((s) => s.trim());
    let icon = "✨", title = "", desc = "";
    if (parts.length === 3) [icon, title, desc] = parts;
    else if (parts.length === 2) [title, desc] = parts;
    else return { ok: false, note: 'Try: add feature card ⚓ | Anchored Stability | Holds under tension' };

    const f = findLastFeatures3(blocks as any);
    if (!f) return { ok: false, note: "No Features block found" };
    addFeatureCard(f as any, icon, title, desc);
    return { ok: true, note: `Feature card "${title}" added` };
  }

  // // CTA updates (uncomment if you added CTA)
  // if (lc.startsWith("set cta headline to ")) { ... }
  // if (lc.startsWith("set cta subheadline to ")) { ... }
  // if (lc.startsWith("set cta button to ")) { ... }

  return { ok: false, note: "Command not recognized" };
}

// ───────────────────────────────────────────────────────────
// POST handler
// ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { pageId, command } = await req.json();
    if (!pageId || !command) {
      return NextResponse.json({ ok: false, error: "Missing pageId or command" }, { status: 400 });
    }

    const page = await prisma.page.findUnique({ where: { id: pageId } });
    if (!page) return NextResponse.json({ ok: false, error: "Page not found" }, { status: 404 });

    const current = Array.isArray(page.blocks) ? page.blocks : [];
    const working = structuredClone(current);

    // apply
    const result = applyCommand(working, command);

    // validate
    const validated = validateBlocks(working);

    if (result.ok) {
      // record BEFORE saving
      console.log("[AI-EDIT] willRecordEdit pageId=", pageId);
      await recordEdit(pageId, validateBlocks(current), validated);

      await prisma.page.update({
        where: { id: pageId },
        data: { blocks: validated },
      });
      console.log("[AI-EDIT] page updated");
    } else {
      console.log("[AI-EDIT] result not ok:", result.note);
    }

    return NextResponse.json({ ok: result.ok, note: result.note, blocks: validated });
  } catch (e: any) {
    console.error("[AI-EDIT] ERROR:", e);
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
