import { prisma } from "@/lib/prisma";

export async function audit(userId: string, action: string, payload?: unknown) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      payload: payload as object | undefined
    }
  });
}
