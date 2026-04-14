import bcrypt from "bcryptjs";
import { addDays, startOfDay } from "date-fns";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const pass = await bcrypt.hash("demo1234", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@boravak.ba" },
    update: {},
    create: { name: "Admin", email: "admin@boravak.ba", role: Role.ADMIN, passwordHash: pass }
  });

  const staff = await prisma.user.upsert({
    where: { email: "staff@boravak.ba" },
    update: {},
    create: { name: "Nastavnik Ena", email: "staff@boravak.ba", role: Role.STAFF, passwordHash: pass }
  });

  const parentUser = await prisma.user.upsert({
    where: { email: "roditelj@boravak.ba" },
    update: {},
    create: { name: "Amra K.", email: "roditelj@boravak.ba", role: Role.PARENT, passwordHash: pass }
  });

  const parent = await prisma.parent.upsert({
    where: { userId: parentUser.id },
    update: {},
    create: { userId: parentUser.id, phone: "+38761111222", pickups: ["Djed Alija", "Tetka Selma"] }
  });

  const child = await prisma.child.upsert({
    where: { id: "demo-child-sara-k" },
    update: {},
    create: {
      id: "demo-child-sara-k",
      name: "Sara K.",
      grade: 3,
      school: "OŠ Meša Selimović",
      notes: "Alergija na kikiriki",
      groupId: "A"
    }
  });

  await prisma.childParent.upsert({
    where: { childId_parentId: { childId: child.id, parentId: parent.id } },
    update: {},
    create: { childId: child.id, parentId: parent.id }
  });

  const base = startOfDay(new Date());
  for (let i = 0; i < 7; i++) {
    await prisma.menu.upsert({
      where: { date: addDays(base, i) },
      update: { mealDescription: "Pileća supa, riža, salata, voće" },
      create: { date: addDays(base, i), mealDescription: "Pileća supa, riža, salata, voće" }
    });
  }

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: "SEED_COMPLETED",
      payload: { ok: true }
    }
  });

  await prisma.message.create({
    data: {
      senderId: staff.id,
      receiverId: parentUser.id,
      content: "Dobrodošli u aplikaciju produženog boravka 👋"
    }
  });
}

main().finally(() => prisma.$disconnect());
