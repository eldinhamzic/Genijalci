"use client";

import { useState } from "react";
import { format } from "date-fns";
import { bs } from "date-fns/locale";

type AttendanceStatus = "PRESENT" | "ABSENT" | "LEFT";

type Attendance = {
  id: string;
  status: AttendanceStatus;
  checkInTime: string | null;
  checkOutTime: string | null;
};

type Child = {
  id: string;
  name: string;
  grade: number;
  school: string;
  notes: string | null;
  attendance: Attendance | null;
  homework: { id: string; description: string; completed: boolean }[];
};

type Contact = {
  childId: string;
  childName: string;
  parents: { parentName: string; phone: string; email: string; pickups: string[] }[];
};

type MenuItem = {
  date: string;
  mealDescription: string;
};

type DashboardProps = {
  user: { name: string; role: string; id: string };
  initialChildren: Child[];
  contacts: Contact[];
  weeklyMenu: MenuItem[];
};

export default function DashboardClient({ user, initialChildren, contacts, weeklyMenu }: DashboardProps) {
  const [children, setChildren] = useState(initialChildren);

  function setAttendance(childId: string, status: AttendanceStatus) {
    const now = new Date().toISOString();

    setChildren((currentChildren) =>
      currentChildren.map((child) => {
        if (child.id !== childId) return child;

        return {
          ...child,
          attendance: {
            id: child.attendance?.id ?? `attendance-${child.id}`,
            status,
            checkInTime: status === "PRESENT" ? now : child.attendance?.checkInTime ?? null,
            checkOutTime: status === "LEFT" ? now : null
          }
        };
      })
    );
  }

  const activeCount = children.filter((child) => child.attendance?.status === "PRESENT").length;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-3 pb-24 md:p-6">
      <section className="card">
        <p className="text-sm text-slate-500">Prijavljen: {user.name}</p>
        <h1 className="text-2xl font-bold">Trenutno u boravku: {activeCount} djece</h1>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Prisustvo i dnevni rad</h2>
        {children.map((child) => (
          <article key={child.id} className="card space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold">{child.name}</h3>
                <p className="text-sm text-slate-600">
                  {child.grade}. razred • {child.school}
                </p>
                {child.notes && <p className="mt-1 text-sm text-amber-700">Napomena: {child.notes}</p>}
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                {child.attendance?.status === "PRESENT"
                  ? "✅ Prisutan"
                  : child.attendance?.status === "LEFT"
                    ? "🕒 Otišao"
                    : child.attendance?.status === "ABSENT"
                      ? "❌ Nije došao"
                      : "—"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <button
                type="button"
                className="big-btn bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={() => setAttendance(child.id, "PRESENT")}
                disabled={child.attendance?.status === "PRESENT"}
              >
                Check-in
              </button>
              <button
                type="button"
                className="big-btn bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => setAttendance(child.id, "LEFT")}
                disabled={child.attendance?.status === "LEFT"}
              >
                Check-out
              </button>
              <button
                type="button"
                className="big-btn bg-slate-200 hover:bg-slate-300"
                onClick={() => setAttendance(child.id, "ABSENT")}
                disabled={child.attendance?.status === "ABSENT"}
              >
                Nije došao
              </button>
            </div>

            {child.homework.length > 0 && (
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="mb-2 text-sm font-semibold">Zadaće:</p>
                {child.homework.map((homework) => (
                  <p key={homework.id} className="text-sm">
                    {homework.completed ? "✅" : "⬜"} {homework.description}
                  </p>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>

      <section className="card space-y-2">
        <h2 className="text-lg font-semibold">Roditelji i kontakt</h2>
        {contacts.map((item) => (
          <div key={item.childId} className="rounded-xl bg-slate-50 p-3">
            <p className="font-medium">{item.childName}</p>
            {item.parents.map((parent) => (
              <div key={parent.email} className="text-sm text-slate-700">
                {parent.parentName} • <a href={`tel:${parent.phone}`}>{parent.phone}</a> •{" "}
                <a href={`mailto:${parent.email}`}>{parent.email}</a>
                <p className="text-xs text-slate-500">Preuzimanje: {parent.pickups.join(", ")}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="card space-y-2">
        <h2 className="text-lg font-semibold">Jelovnik (7 dana)</h2>
        {weeklyMenu.map((menuItem) => (
          <p key={menuItem.date} className="text-sm">
            <span className="font-medium">
              {format(new Date(menuItem.date), "EEEE, dd.MM", { locale: bs })}:
            </span>{" "}
            {menuItem.mealDescription}
          </p>
        ))}
      </section>
    </main>
  );
}
