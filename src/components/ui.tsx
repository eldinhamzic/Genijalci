import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  action?: ReactNode;
  subtitle?: string;
};

export function SectionHeader({ title, action, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  detail?: string;
};

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
      {detail ? <p className="mt-1 text-sm text-slate-600">{detail}</p> : null}
    </article>
  );
}

type StatusBadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
};

export function StatusBadge({ children, tone = "neutral" }: StatusBadgeProps) {
  const toneClass =
    tone === "success"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : tone === "warning"
        ? "bg-amber-50 text-amber-800 ring-amber-200"
        : tone === "danger"
          ? "bg-rose-50 text-rose-700 ring-rose-200"
          : tone === "info"
            ? "bg-sky-50 text-sky-700 ring-sky-200"
            : "bg-slate-100 text-slate-700 ring-slate-200";

  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${toneClass}`}>{children}</span>;
}

type NavButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
  hint?: string;
  tone?: "indigo" | "green" | "rose";
};

export function NavButton({ label, active, onClick, compact, hint, tone = "indigo" }: NavButtonProps) {
  const activeClass =
    tone === "green"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900 shadow-sm"
      : tone === "rose"
        ? "border-rose-200 bg-rose-50 text-rose-900 shadow-sm"
        : "border-indigo-200 bg-indigo-50 text-indigo-900 shadow-sm";
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-3xl border px-4 py-3 text-left transition",
        active ? activeClass : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
        compact ? "py-2.5" : ""
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={compact ? "text-sm font-medium" : "font-medium"}>{label}</span>
        {hint ? <span className={`text-xs ${active ? "text-current/70" : "text-slate-400"}`}>{hint}</span> : null}
      </div>
    </button>
  );
}

export { StatCard as სტატCard };
