"use client";

import { format } from "date-fns";
import { bs } from "date-fns/locale";

type Attendance = {
  id: string;
  status: "PRESENT" | "ABSENT" | "LEFT";
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

export default function DashboardClient({
  user,
  initialChildren,
  contacts,
  weeklyMenu
}: {
  user: { name: string; role: string; id: string };
  initialChildren: Child[];
  contacts: {
    childId: string;
    childName: string;
    parents: { parentName: string; phone: string; email: string; pickups: string[] }[];
  }[];
  weeklyMenu: { date: string; mealDescription: string }[];
}) {
  async function post(url: string, body: object) {
    await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    window.location.reload();
  }

  const activeCount = initialChildren.filter((c) => c.attendance?.status === "PRESENT").length;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-3 pb-24 md:p-6">
      <section className="card">
        <p className="text-sm text-slate-500">Prijavljen: {user.name}</p>
        <h1 className="text-2xl font-bold">Trenutno u boravku: {activeCount} djece</h1>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Prisustvo i dnevni rad</h2>
        {initialChildren.map((child) => (
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
                className="big-btn bg-emerald-600 text-white"
                onClick={() => post("/api/attendance/check-in", { childId: child.id })}
              >
                Check-in
              </button>
              <button
                className="big-btn bg-rose-600 text-white"
                onClick={() => post("/api/attendance/check-out", { childId: child.id })}
              >
                Check-out
              </button>
              <button
                className="big-btn bg-slate-200"
                onClick={() => post("/api/attendance/check-out", { childId: child.id, markAbsent: true })}
              >
                Nije došao
              </button>
            </div>

            {child.homework.length > 0 && (
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="mb-2 text-sm font-semibold">Zadaće:</p>
                {child.homework.map((hw) => (
                  <p key={hw.id} className="text-sm">
                    {hw.completed ? "✅" : "⬜"} {hw.description}
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
            {item.parents.map((p) => (
              <div key={p.email} className="text-sm text-slate-700">
                {p.parentName} • <a href={`tel:${p.phone}`}>{p.phone}</a> • <a href={`mailto:${p.email}`}>{p.email}</a>
                <p className="text-xs text-slate-500">Preuzimanje: {p.pickups.join(", ")}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="card space-y-2">
        <h2 className="text-lg font-semibold">Jelovnik (7 dana)</h2>
        {weeklyMenu.map((m) => (
          <p key={m.date} className="text-sm">
            <span className="font-medium">{format(new Date(m.date), "EEEE, dd.MM", { locale: bs })}:</span> {m.mealDescription}
          </p>
        ))}
      </section>
    </main>
  );
}
