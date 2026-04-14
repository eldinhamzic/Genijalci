import { AttendanceStatus, Role } from "@prisma/client";
import { startOfDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { audit } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { requireRoles } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await requireRoles([Role.ADMIN, Role.STAFF]);
  if (user instanceof NextResponse) return user;

  const { childId, markAbsent } = await req.json();
  const date = startOfDay(new Date());
  const now = new Date();

  const att = await prisma.attendance.upsert({
    where: { childId_date: { childId, date } },
    update: {
      status: markAbsent ? AttendanceStatus.ABSENT : AttendanceStatus.LEFT,
      checkOutTime: markAbsent ? null : now
    },
    create: {
      childId,
      date,
      status: markAbsent ? AttendanceStatus.ABSENT : AttendanceStatus.LEFT,
      checkOutTime: markAbsent ? null : now
    }
  });

  await audit(user.id, markAbsent ? "MARK_ABSENT" : "CHECK_OUT", { childId });
  return NextResponse.json(att);
}
