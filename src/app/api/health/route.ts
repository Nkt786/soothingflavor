import { NextResponse } from "next/server";

export const GET = () => NextResponse.json({ ok: true, now: Date.now() });
