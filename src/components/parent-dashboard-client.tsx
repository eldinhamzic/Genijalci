"use client";

import { format } from "date-fns";
import { bs } from "date-fns/locale";

type ParentChild = {
  id: string;
  name: string;
  grade: number;
  school: string;
  notes: string | null;
  attendance: {
    status: "PRESENT" | "ABSENT" | "LEFT";
    checkInTime: string | null;
    checkOutTime: string | null;
  } | null;
  homework: { id: string; description: string; completed: boolean }[];
};

export default function ParentDashboardClient({
  user,
  children,
  pickups,
  staff,
  weeklyMenu
}: {
  user: { name: string };
  children: ParentChild[];
  pickups: string[];
  staff: { id: string; name: string; email: string }[];
  weeklyMenu: { date: string; mealDescription: string }[];
}) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-3 pb-24 md:p-6">
      <section className="card">
        <p className="text-sm text-slate-500">Roditeljski portal</p>
        <h1 className="text-2xl font-bold">Dobrodošli, {user.name}</h1>
        <p className="mt-2 text-sm text-slate-700">Osobe za preuzimanje: {pickups.length ? pickups.join(", ") : "Nije uneseno"}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Moje dijete / djeca</h2>
        {children.map((child) => (
          <article key={child.id} className="card space-y-3">
            <div>
              <h3 className="text-lg font-bold">{child.name}</h3>
              <p className="text-sm text-slate-600">
                {child.grade}. razred • {child.school}
              </p>
              {child.notes && <p className="mt-1 text-sm text-amber-700">Napomena: {child.notes}</p>}
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-sm">
              <p className="font-medium">
                Status danas: {child.attendance?.status === "PRESENT" ? "✅ Prisutan" : child.attendance?.status === "LEFT" ? "🕒 Otišao" : child.attendance?.status === "ABSENT" ? "❌ Nije došao" : "—"}
              </p>
              {child.attendance?.checkInTime && <p>Dolazak: {format(new Date(child.attendance.checkInTime), "HH:mm")}</p>}
              {child.attendance?.checkOutTime && <p>Odlazak: {format(new Date(child.attendance.checkOutTime), "HH:mm")}</p>}
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="mb-2 text-sm font-semibold">Zadaće danas:</p>
              {child.homework.length === 0 && <p className="text-sm text-slate-500">Nema unosa za danas.</p>}
              {child.homework.map((hw) => (
                <p key={hw.id} className="text-sm">
                  {hw.completed ? "✅" : "⬜"} {hw.description}
                </p>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="card space-y-2">
        <h2 className="text-lg font-semibold">Kontakt osoblja</h2>
        {staff.map((item) => (
          <p key={item.id} className="text-sm">
            {item.name} • <a href={`mailto:${item.email}`}>{item.email}</a>
          </p>
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
