import { handlers } from "@/lib/auth";

// Force Node runtime so bcrypt + Prisma work on Netlify (no Edge)
export const runtime = "nodejs";

export const { GET, POST } = handlers;
