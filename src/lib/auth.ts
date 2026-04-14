import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret");

export type SessionUser = {
  id: string;
  role: Role;
  name: string;
  email: string;
};

export async function createToken(user: SessionUser) {
  return new SignJWT(user as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

export async function requireRoles(roles: Role[]) {
  const user = await getSessionUser();
  if (!user || !roles.includes(user.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return user;
}
