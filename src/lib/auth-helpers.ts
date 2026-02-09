import { auth } from "./auth";
import prisma from "./prisma";

export type SessionUser = { id: string; email?: string | null; name?: string | null; role?: string; avatar?: string | null };

/**
 * Get current session (use in API routes / server components).
 */
export async function getSession() {
  return auth();
}

/**
 * Get current user ID or null.
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  const id = (session?.user as SessionUser)?.id;
  return id ?? null;
}

/**
 * Require auth; returns 401 JSON if not logged in.
 */
export async function requireAuth(): Promise<{ id: string; role: string } | { error: Response }> {
  const session = await getSession();
  const id = (session?.user as SessionUser)?.id;
  const role = (session?.user as SessionUser)?.role ?? "USER";
  if (!id) {
    return { error: new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } }) };
  }
  return { id, role };
}

/**
 * Check if user is super admin (can access /admin).
 */
export function isSuperAdmin(role: string): boolean {
  return role === "SUPER_ADMIN";
}

/**
 * Check if user is society admin for this society.
 */
export async function isSocietyAdmin(userId: string, societyId: string): Promise<boolean> {
  const society = await prisma.society.findUnique({
    where: { id: societyId },
    select: { adminId: true },
  });
  return society?.adminId === userId;
}

/**
 * Check if user is member of society (any role).
 */
export async function isSocietyMember(userId: string, societyId: string): Promise<boolean> {
  const m = await prisma.societyMember.findUnique({
    where: { userId_societyId: { userId, societyId } },
  });
  return !!m;
}

/**
 * Check if user can access society admin actions (is society admin or super admin).
 */
export async function canAccessSocietyAdmin(userId: string, role: string, societyId: string): Promise<boolean> {
  if (isSuperAdmin(role)) return true;
  return isSocietyAdmin(userId, societyId);
}
