import { PrismaClient } from "@prisma/client";

const pageId = process.argv[2]; // pass pageId as an arg

async function main() {
  if (!pageId) {
    console.log("Usage: npx tsx scripts/history.ts <pageId>");
    process.exit(1);
  }
  const prisma = new PrismaClient();
  const page = await prisma.page.findUnique({ where: { id: pageId } });
  console.log("page.historyHeadId:", page?.historyHeadId, "redoHeadId:", page?.redoHeadId);

  const edits = await prisma.edit.findMany({
    where: { pageId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  console.log("Recent edits:", edits.map(e => ({ id: e.id, prev: e.prevEditId, createdAt: e.createdAt })));
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
