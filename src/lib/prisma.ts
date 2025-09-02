// src/lib/prisma.ts
let cached: any | null = null;

export async function getPrisma() {
  // Don't try to connect during build time
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    return null;
  }
  
  if (cached) return cached;
  try {
    const { PrismaClient } = await import("@prisma/client");
    const g = globalThis as any;
    if (!g.__prisma) g.__prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
    cached = g.__prisma;
    return cached;
  } catch (error) {
    console.error('Prisma client initialization error:', error);
    return null; // don't throw during build or when client isn't generated yet
  }
}

// Default export for API routes
export const prisma = await getPrisma();
