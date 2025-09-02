// src/lib/prisma.ts
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
    return null; // don't throw during build or when client isn't generated yet
  }
}

// Default export for API routes
export const prisma = await getPrisma();
