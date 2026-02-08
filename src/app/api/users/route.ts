import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch users
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          bio: true,
          phone: true,
          location: true,
          skills: true,
          role: true,
          verified: true,
          createdAt: true,
          wallets: true,
          societyMemberships: {
            include: { society: { select: { id: true, name: true, type: true, cityName: true, countryName: true } } },
          },
          teamMemberships: { include: { team: { select: { id: true, name: true } } } },
          businesses: true,
          _count: {
            select: { posts: true, votes: true, services: true },
          },
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({ user });
    }

    // List all users (for admin)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        verified: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// PATCH - Update user (own profile: name, bio, phone, location, skills)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, bio, phone, location, skills } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (typeof name === "string" && name.trim()) data.name = name.trim();
    if (typeof bio === "string") data.bio = bio.trim() || null;
    if (typeof phone === "string") data.phone = phone.trim() || null;
    if (typeof location === "string") data.location = location.trim() || null;
    if (Array.isArray(skills)) data.skills = JSON.stringify(skills.filter((s: unknown) => typeof s === "string" && s.trim()));

    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        phone: true,
        location: true,
        skills: true,
        role: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
