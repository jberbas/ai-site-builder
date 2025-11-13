import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  makeDefaultFeatures3,
  makeDefaultPricing,
} from "@/lib/blocks";

export async function GET(request: Request) {
  // 1) Create a Site
  const site = await prisma.site.create({
    data: {
      name: "Starter Site",
    },
  });

  // 2) Create a Page with default blocks (Hero + Features + Pricing)
  const page = await prisma.page.create({
    data: {
      title: "Home",
      siteId: site.id,
      blocks: [
        { type: "Hero", props: { headline: "Welcome to your AI site", subheadline: "Edit me with ChatDock →" } },
        makeDefaultFeatures3(),
        makeDefaultPricing(),
      ] as any,
    },
  });

  // 3) Redirect into your existing editor route
  const to = `/site/${site.id}/page/${page.id}`;
  const url = new URL(to, request.url);
  return NextResponse.redirect(url);
}
