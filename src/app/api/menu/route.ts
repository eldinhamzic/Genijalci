import { Role } from "@prisma/client";
import { addDays, startOfDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { audit } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { requireRoles } from "@/lib/auth";

export async function GET() {
  const start = startOfDay(new Date());
  const rows = await prisma.menu.findMany({ where: { date: { gte: start } }, orderBy: { date: "asc" }, take: 7 });
  return NextResponse.json(rows);
}

export async function PUT(req: NextRequest) {
  const user = await requireRoles([Role.ADMIN]);
  if (user instanceof NextResponse) return user;

  const items: { dayOffset: number; mealDescription: string }[] = await req.json();
  const base = startOfDay(new Date());

  await Promise.all(
    items.map((item) =>
      prisma.menu.upsert({
        where: { date: addDays(base, item.dayOffset) },
        update: { mealDescription: item.mealDescription },
        create: { date: addDays(base, item.dayOffset), mealDescription: item.mealDescription }
      })
    )
  );

  await audit(user.id, "MENU_UPDATED", { size: items.length });
  return NextResponse.json({ ok: true });
}
