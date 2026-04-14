import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return NextResponse.json({ message: "Korisnik ne postoji" }, { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ message: "Neispravna lozinka" }, { status: 401 });

  const token = await createToken({ id: user.id, role: user.role, name: user.name, email: user.email });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24
  });

  await audit(user.id, "LOGIN", { email: user.email });
  return response;
}
