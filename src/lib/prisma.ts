// src/lib/prisma.ts
// Safe, optional Prisma loader (Prisma generate na bhi ho to crash nahi)
let cached: any | null = null;

export async function getPrisma() {
  if (cached) return cached;
  try {
    const { PrismaClient } = await import("@prisma/client");
    const g = globalThis as any;
    if (!g.__prisma) g.__prisma = new PrismaClient();
    cached = g.__prisma;
    return cached;
  } catch {
    // @prisma/client available nahi – local dev me thik hai
    return null;
  }
}
