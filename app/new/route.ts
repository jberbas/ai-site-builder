// app/new/route.ts
import { NextResponse } from "next/server";

// Mark as dynamic so Next.js doesn't try to prerender/export this like a static route.
export const dynamic = "force-dynamic";

/**
 * Temporary safe /new route.
 *
 * We used to create a Site + Page here on every GET, which:
 * - Broke builds (Prisma + missing DATABASE_URL)
 * - Created extra rows on every build/request
 *
 * For now we disable that behavior so /new can't mutate data.
 * Later we can reintroduce a POST /api/sites/new that is authenticated.
 */
export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "The /new endpoint is disabled. Site + Page creation will be done via a secure POST endpoint.",
    },
    { status: 410 } // Gone
  );
}
