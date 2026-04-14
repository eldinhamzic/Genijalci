import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function audit(userId: string, action: string, payload?: Prisma.InputJsonValue) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      payload
    }
  });
}
