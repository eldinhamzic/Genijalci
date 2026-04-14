import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardClient from "@/components/dashboard-client";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const children = await prisma.child.findMany({
    orderBy: { name: "asc" },
    include: {
      attendance: { where: { date: today }, take: 1 },
      parents: {
        include: {
          parent: {
            include: {
              user: true
            }
          }
        }
      },
      homework: {
        where: { date: today },
        orderBy: { id: "desc" }
      }
    }
  });

  const menu = await prisma.menu.findMany({
    where: { date: { gte: today } },
    orderBy: { date: "asc" },
    take: 7
  });

  const contacts = children.map((child) => ({
    childId: child.id,
    childName: child.name,
    parents: child.parents.map((cp) => ({
      parentName: cp.parent.user.name,
      phone: cp.parent.phone,
      email: cp.parent.user.email,
      pickups: cp.parent.pickups
    }))
  }));

  return (
    <DashboardClient
      user={user}
      initialChildren={children.map((child) => ({
        id: child.id,
        name: child.name,
        grade: child.grade,
        school: child.school,
        notes: child.notes,
        attendance: child.attendance[0]
          ? {
              id: child.attendance[0].id,
              status: child.attendance[0].status,
              checkInTime: child.attendance[0].checkInTime?.toISOString() ?? null,
              checkOutTime: child.attendance[0].checkOutTime?.toISOString() ?? null
            }
          : null,
        homework: child.homework.map((h) => ({ id: h.id, description: h.description, completed: h.completed }))
      }))}
      contacts={contacts}
      weeklyMenu={menu.map((m) => ({ date: m.date.toISOString(), mealDescription: m.mealDescription }))}
    />
  );
}
