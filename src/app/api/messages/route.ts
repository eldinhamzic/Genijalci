import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { audit } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { requireRoles } from "@/lib/auth";

export async function GET() {
  const user = await requireRoles([Role.ADMIN, Role.STAFF, Role.PARENT]);
  if (user instanceof NextResponse) return user;

  const messages = await prisma.message.findMany({
    where: { OR: [{ senderId: user.id }, { receiverId: user.id }] },
    orderBy: { timestamp: "desc" },
    take: 50
  });

  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const user = await requireRoles([Role.ADMIN, Role.STAFF, Role.PARENT]);
  if (user instanceof NextResponse) return user;

  const { receiverId, content, broadcast } = await req.json();

  if (broadcast && (user.role === Role.ADMIN || user.role === Role.STAFF)) {
    const parents = await prisma.user.findMany({ where: { role: Role.PARENT }, select: { id: true } });
    await prisma.message.createMany({
      data: parents.map((p) => ({ senderId: user.id, receiverId: p.id, content }))
    });
    await audit(user.id, "BROADCAST", { count: parents.length });
    return NextResponse.json({ ok: true });
  }

  const msg = await prisma.message.create({ data: { senderId: user.id, receiverId, content } });
  await audit(user.id, "MESSAGE_SENT", { receiverId });
  return NextResponse.json(msg);
}
