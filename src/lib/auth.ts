import type { NextAuthOptions } from "next-auth";

// No Prisma adapter, pure JWT sessions.
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "dev_secret_change_me",
  session: { strategy: "jwt" },
  providers: [], // keep empty for now; admin/auth can be enabled later
  debug: false,
};
