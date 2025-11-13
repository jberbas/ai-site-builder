import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();
  console.log("DATABASE_URL =", process.env.DATABASE_URL);
  const pages = await prisma.page.findMany({ select: { id: true, title: true } });
  console.log("OK. Pages:", pages);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("DB CHECK ERROR:", e);
  process.exit(1);
});
