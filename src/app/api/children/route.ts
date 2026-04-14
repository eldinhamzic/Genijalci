import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRoles } from "@/lib/auth";

export async function GET() {
  const user = await requireRoles([Role.ADMIN, Role.STAFF, Role.PARENT]);
  if (user instanceof NextResponse) return user;

  if (user.role === Role.PARENT) {
    const parent = await prisma.parent.findUnique({
      where: { userId: user.id },
      include: { children: { include: { child: true } } }
    });
    return NextResponse.json(parent?.children.map((c) => c.child) ?? []);
  }

  const children = await prisma.child.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(children);
}
