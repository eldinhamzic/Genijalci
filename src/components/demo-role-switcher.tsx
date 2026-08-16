"use client";

import type { Role } from "@/data/mock-data";

type DemoRoleSwitcherProps = {
  role: Role;
  onChange: (role: Role) => void;
};

const roles: { id: Role; label: string }[] = [
  { id: "owner", label: "Vlasnik" },
  { id: "worker", label: "Radnik" },
  { id: "parent", label: "Roditelj" }
];

export default function DemoRoleSwitcher({ role, onChange }: DemoRoleSwitcherProps) {
  const activeClass =
    role === "worker"
      ? "bg-emerald-600 text-white shadow-sm"
      : role === "parent"
        ? "bg-rose-500 text-white shadow-sm"
        : "bg-indigo-600 text-white shadow-sm";

  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
      {roles.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={[
            "rounded-full px-3.5 py-2 text-sm font-medium transition",
            role === item.id ? activeClass : "text-slate-600 hover:bg-slate-100"
          ].join(" ")}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
