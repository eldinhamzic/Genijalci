"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { bs } from "date-fns/locale";
import DemoRoleSwitcher from "@/components/demo-role-switcher";
import { NavButton, SectionHeader, StatCard, StatusBadge } from "@/components/ui";
import {
  appDate,
  ownerChats,
  ownerTasks,
  departures,
  employees,
  financeRows,
  groups,
  ownerChildren,
  ownerDashboardNotes,
  ownerMenu,
  ownerStats,
  ownerToday,
  parentChildren,
  parentChats,
  parentNotifications,
  type Child,
  type ChatThread,
  type FinanceRow,
  type MenuDay,
  type OwnerSection,
  type ParentChild,
  type ParentSection,
  type Role,
  type WorkTask,
  type WorkerChild,
  type WorkerSection,
  workerChats,
  workerChildren,
  workerMenu
} from "@/data/mock-data";

type OwnerDetailTab = "pregled" | "prisustvo" | "finansije" | "napomene";

const ownerNav: { label: string; value: OwnerSection }[] = [
  { label: "Pregled", value: "dashboard" },
  { label: "Djeca", value: "children" },
  { label: "Dijete", value: "child-detail" },
  { label: "Finansije", value: "finance" },
  { label: "Tim", value: "team" },
  { label: "Grupe", value: "groups" },
  { label: "Jelovnik", value: "menu" },
  { label: "Poruke", value: "messages" },
  { label: "Oglasna ploča", value: "board" }
];

const workerNav: { label: string; value: WorkerSection }[] = [
  { label: "Danas", value: "today" },
  { label: "Djeca", value: "children" },
  { label: "Dijete", value: "child-detail" },
  { label: "Odlasci", value: "departures" },
  { label: "Jelovnik", value: "menu" },
  { label: "Poruke", value: "messages" },
  { label: "Obaveze", value: "board" }
];

const parentNav: { label: string; value: ParentSection }[] = [
  { label: "Početna", value: "home" },
  { label: "Zadaća", value: "tasks" },
  { label: "Jelovnik", value: "menu" },
  { label: "Članarina", value: "membership" },
  { label: "Preuzimanje", value: "pickup" },
  { label: "Obavijesti", value: "notifications" },
  { label: "Poruke", value: "messages" }
];

const groupNames = ["Sve grupe", ...groups.map((group) => group.name)];

const emptyChild = {
  name: "",
  grade: "1. razred",
  school: "",
  groupId: "leptirici"
};

function todayLabel() {
  return format(new Date(2026, 7, 16), "EEEE, d. MMMM", { locale: bs });
}

function statusTone(status: string) {
  if (status.includes("Prisutan") || status.includes("Plaćeno") || status.includes("Završeno") || status.includes("Na poslu")) return "success";
  if (status.includes("Kasni") || status.includes("Očekujemo") || status.includes("Smjena još nije počela") || status.includes("Dospijeva")) return "warning";
  if (status.includes("Odsutan") || status.includes("Otišao") || status.includes("Nije došao")) return "danger";
  return "neutral";
}

function findGroupName(groupId: string) {
  return groups.find((group) => group.id === groupId)?.name ?? "Nepoznata grupa";
}

function toTime() {
  return new Date().toLocaleTimeString("bs-BA", { hour: "2-digit", minute: "2-digit" });
}

function roleTone(role: Role) {
  return role === "worker" ? "green" : role === "parent" ? "rose" : "indigo";
}

export default function DemoApp() {
  const [role, setRole] = useState<Role>("owner");
  const [ownerSection, setOwnerSection] = useState<OwnerSection>("dashboard");
  const [workerSection, setWorkerSection] = useState<WorkerSection>("today");
  const [parentSection, setParentSection] = useState<ParentSection>("home");
  const [ownerChildrenState, setOwnerChildrenState] = useState<Child[]>(ownerChildren);
  const [workerChildrenState, setWorkerChildrenState] = useState<WorkerChild[]>(workerChildren);
  const [parentChildrenState, setParentChildrenState] = useState<ParentChild[]>(parentChildren);
  const [financeState, setFinanceState] = useState<FinanceRow[]>(financeRows);
  const [ownerChildId, setOwnerChildId] = useState(ownerChildren[0].id);
  const [workerChildId, setWorkerChildId] = useState(workerChildren[0].id);
  const [parentChildId, setParentChildId] = useState(parentChildren[0].id);
  const [ownerDetailTab, setOwnerDetailTab] = useState<OwnerDetailTab>("pregled");
  const [ownerGroupFilter, setOwnerGroupFilter] = useState("Sve grupe");
  const [ownerStatusFilter, setOwnerStatusFilter] = useState("Svi");
  const [ownerSearch, setOwnerSearch] = useState("");
  const [ownerFinanceFilter, setOwnerFinanceFilter] = useState<"Sve" | "Plaćeno" | "Neplaćeno" | "Kasni">("Sve");
  const [ownerNewChildOpen, setOwnerNewChildOpen] = useState(false);
  const [ownerNewChild, setOwnerNewChild] = useState(emptyChild);
  const [workerDetailTab, setWorkerDetailTab] = useState<"pregled" | "akcije" | "preuzimanje">("pregled");
  const [pickupDraft, setPickupDraft] = useState({ name: "", relation: "", phone: "" });
  const [menuState, setMenuState] = useState<MenuDay[]>(ownerMenu);
  const navTone = roleTone(role);

  useEffect(() => {
    const saved = window.localStorage.getItem("genijalac-role");
    if (saved === "owner" || saved === "worker" || saved === "parent") {
      setRole(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("genijalac-role", role);
  }, [role]);

  useEffect(() => {
    if (role === "owner") setOwnerSection("dashboard");
    if (role === "worker") setWorkerSection("today");
    if (role === "parent") setParentSection("home");
  }, [role]);

  const ownerChild = ownerChildrenState.find((child) => child.id === ownerChildId) ?? ownerChildrenState[0];
  const workerChild = workerChildrenState.find((child) => child.id === workerChildId) ?? workerChildrenState[0];
  const parentChild = parentChildrenState.find((child) => child.id === parentChildId) ?? parentChildrenState[0];

  function setActiveRole(next: Role) {
    setRole(next);
  }

  function updateWorkerChild(id: string, patch: Partial<WorkerChild>) {
    setWorkerChildrenState((current) => current.map((child) => (child.id === id ? { ...child, ...patch } : child)));
  }

  function markWorkerArrival(id: string) {
    const now = toTime();
    updateWorkerChild(id, { status: "Prisutan", arrivalTime: now, leaveTime: "" });
  }

  function markWorkerLunch(id: string) {
    setWorkerChildrenState((current) => current.map((child) => (child.id === id ? { ...child, lunch: !child.lunch } : child)));
  }

  function markWorkerHomework(id: string) {
    setWorkerChildrenState((current) => current.map((child) => (child.id === id ? { ...child, homework: !child.homework } : child)));
  }

  function markWorkerExit(id: string) {
    const now = toTime();
    updateWorkerChild(id, { status: "Otišao", leaveTime: now });
  }

  function markPaid(id: string) {
    const paidAt = format(new Date(2026, 7, 16), "dd.MM.yyyy.", { locale: bs });
    setFinanceState((current) =>
      current.map((row) =>
        row.id === id
          ? {
              ...row,
              status: "Plaćeno",
              paidAt,
              due: `Plaćeno ${paidAt}`
            }
          : row
      )
    );
  }

  function addOwnerChild() {
    if (!ownerNewChild.name.trim() || !ownerNewChild.school.trim()) return;
    const id = ownerNewChild.name.trim().toLowerCase().replace(/\s+/g, "-");
    setOwnerChildrenState((current) => [
      ...current,
      {
        id,
        name: ownerNewChild.name.trim(),
        grade: ownerNewChild.grade,
        school: ownerNewChild.school.trim(),
        groupId: ownerNewChild.groupId,
        parentName: "Roditelj",
        parentPhone: "+38761110000",
        parentEmail: "roditelj@mail.ba",
        pickupPeople: [{ name: "Roditelj", relation: "roditelj", phone: "+38761110000" }],
        term: "13:00–17:00",
        statusToday: "Očekujemo",
        lunchDone: false,
        homeworkDone: false,
        allergies: [],
        notes: ["Novi zapis."],
        attendanceHistory: [],
        invoices: [{ month: "August 2026", status: "Čeka uplatu", amount: "220 KM" }],
        homework: [],
        todayTimeline: [
          { label: "Stiglo", done: false },
          { label: "Ručalo", done: false },
          { label: "Zadaća završena", done: false },
          { label: "Odlazak", done: false }
        ]
      }
    ]);
    setOwnerNewChild(emptyChild);
    setOwnerNewChildOpen(false);
    setOwnerSection("children");
    setOwnerChildId(id);
    setOwnerDetailTab("pregled");
  }

  function addPickupPerson() {
    if (!pickupDraft.name.trim() || !pickupDraft.relation.trim() || !pickupDraft.phone.trim()) return;
    setParentChildrenState((current) =>
      current.map((child) =>
        child.id === parentChildId
          ? {
              ...child,
              pickupPeople: [...child.pickupPeople, { name: pickupDraft.name.trim(), relation: pickupDraft.relation.trim(), phone: pickupDraft.phone.trim() }]
            }
          : child
      )
    );
    setPickupDraft({ name: "", relation: "", phone: "" });
  }

  const ownerVisibleChildren = ownerChildrenState.filter((child) => {
    const byGroup = ownerGroupFilter === "Sve grupe" || findGroupName(child.groupId) === ownerGroupFilter;
    const byStatus =
      ownerStatusFilter === "Svi" ||
      (ownerStatusFilter === "Aktivni" && child.statusToday === "Prisutan") ||
      (ownerStatusFilter === "Odsutni" && child.statusToday === "Odsutan") ||
      (ownerStatusFilter === "Dugovanje" && child.invoices.some((invoice) => invoice.status !== "Plaćeno"));
    const bySearch = [child.name, child.parentName, child.school, child.grade, findGroupName(child.groupId)].join(" ").toLowerCase().includes(ownerSearch.toLowerCase());
    return byGroup && byStatus && bySearch;
  });

  const ownerVisibleFinance = financeState.filter((row) => {
    if (ownerFinanceFilter === "Sve") return true;
    if (ownerFinanceFilter === "Plaćeno") return row.status === "Plaćeno";
    if (ownerFinanceFilter === "Neplaćeno") return row.status === "Čeka uplatu";
    return row.status === "Kasni";
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc,_#eef2f7_65%,_#e2e8f0)] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[96rem] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Genijalac</p>
              <h1 className="text-lg font-semibold text-slate-900">Edukativni centar</h1>
            </div>
            <div className="lg:hidden">
              <DemoRoleSwitcher role={role} onChange={setActiveRole} />
            </div>
          </div>
          <div className="hidden lg:block">
            <DemoRoleSwitcher role={role} onChange={setActiveRole} />
          </div>
        </div>
      </header>

        <div className="mx-auto flex w-full max-w-[96rem] gap-0 px-3 pb-24 pt-4 lg:gap-8 lg:px-8">
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 space-y-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Genijalac</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">Edukativni centar</p>
                <p className="mt-1 text-sm text-slate-500">Organizovan pregled za roditelje, radnike i direktora</p>
              </div>
              <div className="space-y-2">
                {(role === "owner" ? ownerNav : role === "worker" ? workerNav : parentNav).map((item) => (
                  <NavButton
                    key={item.label}
                    label={item.label}
                    tone={navTone}
                    active={
                      role === "owner"
                        ? ownerSection === item.value
                        : role === "worker"
                          ? workerSection === item.value
                          : parentSection === item.value
                    }
                    onClick={() => {
                      if (role === "owner") setOwnerSection(item.value as OwnerSection);
                      if (role === "worker") setWorkerSection(item.value as WorkerSection);
                      if (role === "parent") setParentSection(item.value as ParentSection);
                    }}
                  />
                ))}
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Amir Kovač</p>
                <p className="text-sm text-slate-500">Direktor</p>
                <button type="button" className="mt-3 text-sm font-medium text-slate-500 hover:text-slate-900">
                  Odjava
                </button>
              </div>
            </div>
          </aside>

        <main className="min-w-0 flex-1 space-y-4">
          {role === "owner" ? (
            <OwnerView
              section={ownerSection}
              setSection={setOwnerSection}
              child={ownerChild}
              children={ownerChildrenState}
              setChildren={setOwnerChildrenState}
              childId={ownerChildId}
              setChildId={setOwnerChildId}
              detailTab={ownerDetailTab}
              setDetailTab={setOwnerDetailTab}
              groupFilter={ownerGroupFilter}
              setGroupFilter={setOwnerGroupFilter}
              statusFilter={ownerStatusFilter}
              setStatusFilter={setOwnerStatusFilter}
              search={ownerSearch}
              setSearch={setOwnerSearch}
              finance={financeState}
              setFinance={setFinanceState}
              financeFilter={ownerFinanceFilter}
              setFinanceFilter={setOwnerFinanceFilter}
              visibleChildren={ownerVisibleChildren}
              visibleFinance={ownerVisibleFinance}
              newChildOpen={ownerNewChildOpen}
              setNewChildOpen={setOwnerNewChildOpen}
              newChild={ownerNewChild}
              setNewChild={setOwnerNewChild}
              addChild={addOwnerChild}
              menu={menuState}
              setMenu={setMenuState}
              markPaid={markPaid}
            />
          ) : role === "worker" ? (
            <WorkerView
              section={workerSection}
              setSection={setWorkerSection}
              child={workerChild}
              children={workerChildrenState}
              setChildren={setWorkerChildrenState}
              childId={workerChildId}
              setChildId={setWorkerChildId}
              detailTab={workerDetailTab}
              setDetailTab={setWorkerDetailTab}
              markArrival={markWorkerArrival}
              markLunch={markWorkerLunch}
              markHomework={markWorkerHomework}
              markExit={markWorkerExit}
            />
          ) : (
            <ParentView
              section={parentSection}
              setSection={setParentSection}
              child={parentChild}
              children={parentChildrenState}
              childId={parentChildId}
              setChildId={setParentChildId}
              pickupDraft={pickupDraft}
              setPickupDraft={setPickupDraft}
              addPickupPerson={addPickupPerson}
            />
          )}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex gap-2 overflow-x-auto p-2">
          {(role === "owner" ? ownerNav : role === "worker" ? workerNav : parentNav).map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                if (role === "owner") setOwnerSection(item.value as OwnerSection);
                if (role === "worker") setWorkerSection(item.value as WorkerSection);
                if (role === "parent") setParentSection(item.value as ParentSection);
              }}
              className={[
                "min-w-20 flex-1 rounded-2xl px-2 py-3 text-xs font-medium",
                role === "owner"
                  ? ownerSection === item.value
                    ? "bg-slate-900 text-white"
                    : "text-slate-600"
                  : role === "worker"
                    ? workerSection === item.value
                      ? "bg-slate-900 text-white"
                      : "text-slate-600"
                    : parentSection === item.value
                      ? "bg-slate-900 text-white"
                      : "text-slate-600"
              ].join(" ")}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

type OwnerViewProps = {
  section: OwnerSection;
  setSection: (section: OwnerSection) => void;
  child: Child;
  children: Child[];
  setChildren: React.Dispatch<React.SetStateAction<Child[]>>;
  childId: string;
  setChildId: (id: string) => void;
  detailTab: OwnerDetailTab;
  setDetailTab: (tab: OwnerDetailTab) => void;
  groupFilter: string;
  setGroupFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  finance: FinanceRow[];
  setFinance: React.Dispatch<React.SetStateAction<FinanceRow[]>>;
  financeFilter: "Sve" | "Plaćeno" | "Neplaćeno" | "Kasni";
  setFinanceFilter: React.Dispatch<React.SetStateAction<"Sve" | "Plaćeno" | "Neplaćeno" | "Kasni">>;
  visibleChildren: Child[];
  visibleFinance: FinanceRow[];
  newChildOpen: boolean;
  setNewChildOpen: (value: boolean) => void;
  newChild: { name: string; grade: string; school: string; groupId: string };
  setNewChild: React.Dispatch<React.SetStateAction<{ name: string; grade: string; school: string; groupId: string }>>;
  addChild: () => void;
  menu: MenuDay[];
  setMenu: React.Dispatch<React.SetStateAction<MenuDay[]>>;
  markPaid: (id: string) => void;
};

function OwnerView({
  section,
  setSection,
  child,
  children,
  setChildren,
  childId,
  setChildId,
  detailTab,
  setDetailTab,
  groupFilter,
  setGroupFilter,
  statusFilter,
  setStatusFilter,
  search,
  setSearch,
  finance,
  setFinance,
  financeFilter,
  setFinanceFilter,
  visibleChildren,
  visibleFinance,
  newChildOpen,
  setNewChildOpen,
  newChild,
  setNewChild,
  addChild,
  menu,
  setMenu,
  markPaid
}: OwnerViewProps) {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0].id);
  const [selectedGroup, setSelectedGroup] = useState(groups[0].id);

  const employee = employees.find((item) => item.id === selectedEmployee) ?? employees[0];
  const group = groups.find((item) => item.id === selectedGroup) ?? groups[0];
  const quickQuery = search.trim().toLowerCase();
  const quickMatches = quickQuery
    ? children.filter((child) =>
        [child.name, child.parentName, child.parentPhone, child.grade, findGroupName(child.groupId), child.allergies.join(" "), child.statusToday]
          .join(" ")
          .toLowerCase()
          .includes(quickQuery)
      )
    : [];
  const quickChild = quickMatches[0];

  return (
    <>
      {section === "dashboard" ? (
        <div className="mx-auto w-full max-w-[1600px] space-y-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Dobrodošli, Amir</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{todayLabel()}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {ownerStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader title="Smart search" subtitle="Upiši ime i odmah vidi ključne podatke djeteta." />
            <div className="mt-4 grid gap-4 xl:grid-cols-[0.7fr_1.3fr]">
              <div className="space-y-3">
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                  placeholder="Npr. Sara"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <p className="text-sm text-slate-500">
                  {quickQuery ? `${quickMatches.length} rezultat${quickMatches.length === 1 ? "" : "a"}` : "Kucaj ime, prezime, roditelja ili telefon."}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                {quickChild ? (
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">{quickChild.name}</p>
                        <p className="text-sm text-slate-500">
                          {quickChild.grade} · {findGroupName(quickChild.groupId)}
                        </p>
                      </div>
                      <StatusBadge tone={statusTone(quickChild.statusToday)}>{quickChild.statusToday}</StatusBadge>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <InfoRow label="Grupa" value={findGroupName(quickChild.groupId)} />
                      <InfoRow label="Roditelj" value={quickChild.parentName} />
                      <InfoRow label="Telefon" value={quickChild.parentPhone} />
                      <InfoRow label="Dugovanje" value={quickChild.invoices.some((invoice) => invoice.status !== "Plaćeno") ? "Ima" : "Nema"} />
                      <InfoRow label="Alergija" value={quickChild.allergies.length ? quickChild.allergies.join(", ") : "Nema"} />
                      <InfoRow label="Prisustvo" value={quickChild.statusToday === "Prisutan" ? "Prisutna" : quickChild.statusToday === "Otišao" ? "Nije prisutna" : "Očekujemo"} />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
                    Rezultat će se pojaviti ovdje čim nešto upišeš.
                  </div>
                )}
              </div>
            </div>
          </section>

          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader title="Danas" subtitle="Kratak pregled radnog dana" />
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {ownerToday.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <SectionHeader title="Grupe" subtitle="Popunjenost i odgovorni radnik" />
              <div className="space-y-3">
                {groups.map((item) => {
                  const fill = Math.round((item.childrenCount / item.capacity) * 100);
                  return (
                    <button key={item.id} type="button" onClick={() => setSection("groups")} className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-500">
                            {item.childrenCount} / {item.capacity} djece · {item.lead}
                          </p>
                        </div>
                        <StatusBadge tone={fill > 90 ? "warning" : "success"}>{fill}% popunjeno</StatusBadge>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-slate-900" style={{ width: `${fill}%` }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader title="Finansije" action={<button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white" onClick={() => setSection("finance")}>Otvori finansije</button>} />
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Naplaćeno ovaj mjesec</p>
                <p className="mt-1 text-2xl font-semibold">8.420 KM</p>
                <p className="mt-1 text-sm text-slate-600">Nenaplaćeno: 1.260 KM</p>
                <p className="mt-1 text-sm text-slate-600">5 roditelja kasni sa uplatom</p>
              </div>

              <SectionHeader title="Radnici danas" />
              <div className="space-y-3">
                {employees.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-slate-500">{item.shift} · {item.group}</p>
                      </div>
                      <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
                    </div>
                  </div>
                ))}
              </div>

              <SectionHeader title="Zahtijeva pažnju" />
              <div className="space-y-2">
                {ownerDashboardNotes.map((note) => (
                  <div key={note} className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{note}</div>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : section === "children" ? (
        <div className="mx-auto w-full max-w-[1280px] space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold">Djeca</h2>
              <p className="text-sm text-slate-500">Pregled djece, prisustva i uplata.</p>
            </div>
            <button type="button" onClick={() => setNewChildOpen(true)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">+ Novo dijete</button>
          </div>

          <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
            <select className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm" value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)}>
              {groupNames.map((groupName) => (
                <option key={groupName}>{groupName}</option>
              ))}
            </select>
            <select className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {["Svi", "Aktivni", "Odsutni", "Dugovanje"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <input
              className="rounded-2xl border border-slate-200 px-3 py-3 text-sm"
              placeholder="Pretraga"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {newChildOpen ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader title="Novo dijete" subtitle="Demo unos ostaje lokalno u browseru." />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <input className="rounded-2xl border border-slate-200 px-3 py-3 text-sm" placeholder="Ime i prezime" value={newChild.name} onChange={(event) => setNewChild((current) => ({ ...current, name: event.target.value }))} />
                <input className="rounded-2xl border border-slate-200 px-3 py-3 text-sm" placeholder="Škola" value={newChild.school} onChange={(event) => setNewChild((current) => ({ ...current, school: event.target.value }))} />
                <input className="rounded-2xl border border-slate-200 px-3 py-3 text-sm" placeholder="Razred" value={newChild.grade} onChange={(event) => setNewChild((current) => ({ ...current, grade: event.target.value }))} />
                <select className="rounded-2xl border border-slate-200 px-3 py-3 text-sm" value={newChild.groupId} onChange={(event) => setNewChild((current) => ({ ...current, groupId: event.target.value }))}>
                  {groups.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex gap-3">
                <button type="button" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white" onClick={addChild}>Sačuvaj</button>
                <button type="button" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700" onClick={() => setNewChildOpen(false)}>Odustani</button>
              </div>
            </section>
          ) : null}

          <div className="grid gap-3">
            {visibleChildren.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setChildId(item.id);
                  setDetailTab("pregled");
                  setSection("child-detail");
                }}
                className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:bg-slate-50"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-slate-500">
                      {item.grade} · {findGroupName(item.groupId)} · {item.term}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">Roditelj: {item.parentName}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge tone={statusTone(item.statusToday)}>{item.statusToday}</StatusBadge>
                    <StatusBadge tone={statusTone(item.invoices[0]?.status ?? "Čeka uplatu")}>{item.invoices[0]?.status ?? "Čeka uplatu"}</StatusBadge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : section === "child-detail" ? (
        <div className="space-y-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{child.name}</h2>
                <p className="text-sm text-slate-500">
                  {child.grade} · {child.school}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusBadge tone={statusTone(child.statusToday)}>{child.statusToday}</StatusBadge>
                  <StatusBadge tone="info">{findGroupName(child.groupId)}</StatusBadge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["pregled", "prisustvo", "finansije", "napomene"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setDetailTab(tab as OwnerDetailTab)}
                    className={[
                      "rounded-full px-4 py-2 text-sm font-medium",
                      detailTab === tab ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700"
                    ].join(" ")}
                  >
                    {tab === "pregled" ? "Pregled" : tab === "prisustvo" ? "Prisustvo" : tab === "finansije" ? "Finansije" : "Napomene"}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {detailTab === "pregled" ? (
            <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <SectionHeader title="Osnovno" />
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <InfoRow label="Grupa" value={findGroupName(child.groupId)} />
                  <InfoRow label="Termin" value={child.term} />
                  <InfoRow label="Roditelj" value={child.parentName} />
                  <InfoRow label="Kontakt" value={child.parentPhone} />
                  <InfoRow label="Alergije" value={(child.allergies ?? []).join(", ") || "Nema"} />
                  <InfoRow label="Napomena" value={child.notes[0] ?? "Nema"} />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-slate-700">Osobe koje smiju preuzeti dijete</p>
                  {child.pickupPeople.map((person) => (
                    <div key={person.phone} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                      {person.name} · {person.relation} · {person.phone}
                    </div>
                  ))}
                </div>
              </section>
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <SectionHeader title="Današnji tok" />
                <div className="mt-4 space-y-3">
                  {child.todayTimeline.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                      <span>{item.label}</span>
                      <StatusBadge tone={item.done ? "success" : "neutral"}>{item.done ? item.time ?? "Zabilježeno" : "Čeka"}</StatusBadge>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : detailTab === "prisustvo" ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader title="Prisustvo" subtitle="Zadnjih nekoliko dana" />
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Datum</th>
                      <th className="px-4 py-3">Dolazak</th>
                      <th className="px-4 py-3">Odlazak</th>
                      <th className="px-4 py-3">Ukupno</th>
                    </tr>
                  </thead>
                  <tbody>
                    {child.attendanceHistory.map((entry) => (
                      <tr key={entry.date} className="border-t border-slate-200">
                        <td className="px-4 py-3">{entry.date}</td>
                        <td className="px-4 py-3">{entry.arrival}</td>
                        <td className="px-4 py-3">{entry.leave}</td>
                        <td className="px-4 py-3">{entry.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : detailTab === "finansije" ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader title="Finansije" subtitle="Pregled uplata za dijete" />
              <div className="mt-4 space-y-3">
                {child.invoices.map((invoice) => (
                  <div key={invoice.month} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                    <div>
                      <p className="font-medium">{invoice.month}</p>
                      <p className="text-sm text-slate-500">{invoice.amount}</p>
                    </div>
                    <StatusBadge tone={statusTone(invoice.status)}>{invoice.status}</StatusBadge>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader title="Napomene" />
              <div className="mt-4 space-y-2">
                {child.notes.map((note) => (
                  <div key={note} className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">{note}</div>
                ))}
              </div>
            </section>
          )}
        </div>      ) : section === "messages" ? (
        <div className="space-y-4">
          <SectionHeader title="Poruke" subtitle="Grupni i individualni chatovi" />
          <div className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
            <aside className="space-y-3">
              {ownerChats.map((thread, index) => {
                const last = thread.messages[thread.messages.length - 1];
                return (
                  <button
                    key={thread.id}
                    type="button"
                    className={[
                      "w-full rounded-3xl border p-4 text-left shadow-sm transition",
                      index === 0 ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white hover:bg-slate-50"
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
                        {thread.title.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">{thread.title}</p>
                            <p className="text-sm text-slate-500">{thread.subtitle}</p>
                          </div>
                          <StatusBadge tone={thread.category === "group" ? "info" : "neutral"}>{thread.category === "group" ? "Grupno" : "Pojedinacno"}</StatusBadge>
                        </div>
                        {last ? <p className="mt-3 truncate text-sm text-slate-600">{last.sender}: {last.text}</p> : null}
                      </div>
                    </div>
                  </button>
                );
              })}
            </aside>
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Aktivni razgovor</p>
                    <h3 className="text-lg font-semibold text-slate-900">{ownerChats[0].title}</h3>
                  </div>
                  <StatusBadge tone="info">{ownerChats[0].category === "group" ? "Grupni chat" : "Pojedinacno"}</StatusBadge>
                </div>
              </div>
              <div className="space-y-3 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-5 py-5">
                {ownerChats[0].messages.map((message) => (
                  <div key={message.id} className={["flex", message.from === "owner" ? "justify-end" : "justify-start"].join(" ")}>
                    <div className={[
                      "max-w-[82%] rounded-3xl px-4 py-3 text-sm shadow-sm",
                      message.from === "owner" ? "rounded-br-lg bg-slate-900 text-white" : "rounded-bl-lg border border-slate-200 bg-white text-slate-800"
                    ].join(" ")}>
                      <p className="text-xs uppercase tracking-[0.18em] opacity-70">{message.sender} · {message.time}</p>
                      <p className="mt-1 leading-6">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 bg-white px-5 py-4">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-400">Napiši poruku...</span>
                  <div className="ml-auto flex gap-2">
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">foto</span>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">pošalji</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : section === "finance" ? (
        <div className="space-y-4">
          <SectionHeader
            title="Finansije"
            subtitle="Mock pregled uplata i dugovanja"
            action={<StatusBadge tone="warning">5 računa kasni</StatusBadge>}
          />
          <div className="grid gap-3 md:grid-cols-4">
            <StatCard label="Očekivano ovaj mjesec" value="9.680 KM" />
            <StatCard label="Naplaćeno" value="8.420 KM" />
            <StatCard label="Nenaplaćeno" value="1.260 KM" />
            <StatCard label="Broj dugovanja" value="5" />
          </div>
          <div className="flex flex-wrap gap-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            {["Sve", "Plaćeno", "Neplaćeno", "Kasni"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFinanceFilter(item as "Sve" | "Plaćeno" | "Neplaćeno" | "Kasni")}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium",
                  financeFilter === item ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700"
                ].join(" ")}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {visibleFinance.map((row) => (
              <div key={row.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">{row.parent}</p>
                    <p className="text-sm text-slate-500">
                      {row.child} · {row.amount} · {row.due}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge tone={statusTone(row.status)}>{row.status}</StatusBadge>
                    {row.status !== "Plaćeno" ? (
                      <button type="button" onClick={() => markPaid(row.id)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                        Označi kao plaćeno
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : section === "team" ? (
        <div className="space-y-4">
          <SectionHeader title="Tim" subtitle="Radnici i danasšnje smjene" />
          <div className="grid gap-3 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-3">
              {employees.map((item) => (
                <button key={item.id} type="button" onClick={() => setSelectedEmployee(item.id)} className="w-full rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-slate-500">
                        {item.role} · {item.shift}
                      </p>
                    </div>
                    <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
                  </div>
                </button>
              ))}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader title={employee.name} subtitle={employee.role} />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <InfoRow label="Telefon" value={employee.phone} />
                <InfoRow label="Smjena" value={employee.shift} />
                <InfoRow label="Grupa" value={employee.group} />
                <InfoRow label="Sati" value={employee.hours} />
                <InfoRow label="Odsustva" value={employee.absences} />
                <InfoRow label="Status" value={employee.status} />
              </div>
            </div>
          </div>
        </div>
      ) : section === "groups" ? (
        <div className="space-y-4">
          <SectionHeader title="Grupe" subtitle="Kapacitet, odgajatelj i raspored" />
          <div className="grid gap-3 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-3">
              {groups.map((item) => (
                <button key={item.id} type="button" onClick={() => setSelectedGroup(item.id)} className="w-full rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:bg-slate-50">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-sm text-slate-500">
                    {item.grades} · {item.childrenCount} / {item.capacity} djece
                  </p>
                </button>
              ))}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader title={group.name} subtitle={group.notes} />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <InfoRow label="Odgajatelj" value={group.lead} />
                <InfoRow label="Termin" value={group.shift} />
                <InfoRow label="Kapacitet" value={`${group.childrenCount} / ${group.capacity}`} />
                <InfoRow label="Uzrast" value={group.grades} />
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                U ovoj sekciji su prikazana djeca, prisutni i napomene za grupu.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <SectionHeader title="Jelovnik" subtitle="Sedmični pregled obroka" />
          <div className="grid gap-3">
            {menu.map((day, index) => (
              <div key={day.day} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold">
                      {day.day} {day.date}
                    </p>
                    <p className="text-sm text-slate-500">{day.note}</p>
                  </div>
                  {index === 0 ? <StatusBadge tone="info">Danas</StatusBadge> : null}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {day.meals.map((meal) => (
                    <StatusBadge key={meal}>{meal}</StatusBadge>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {day.allergens.map((allergen) => (
                    <StatusBadge key={allergen} tone="warning">
                      {allergen}
                    </StatusBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader title="Uredi meni" subtitle="Demo izmjena ostaje lokalna." action={<button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white" onClick={() => setMenu([...menu])}>Sačuvaj</button>} />
            <p className="mt-3 text-sm text-slate-500">Za prezentaciju je dovoljan ovaj jednostavan mock urednik.</p>
          </div>
        </div>
      )}

      <div className="lg:hidden">
        {newChildOpen ? <div className="fixed inset-0 z-20 bg-slate-900/20" /> : null}
      </div>
    </>
  );
}

type WorkerViewProps = {
  section: WorkerSection;
  setSection: (section: WorkerSection) => void;
  child: WorkerChild;
  children: WorkerChild[];
  setChildren: React.Dispatch<React.SetStateAction<WorkerChild[]>>;
  childId: string;
  setChildId: (id: string) => void;
  detailTab: "pregled" | "akcije" | "preuzimanje";
  setDetailTab: (tab: "pregled" | "akcije" | "preuzimanje") => void;
  markArrival: (id: string) => void;
  markLunch: (id: string) => void;
  markHomework: (id: string) => void;
  markExit: (id: string) => void;
};

function WorkerView({
  section,
  setSection,
  child,
  children,
  childId,
  setChildId,
  detailTab,
  setDetailTab,
  markArrival,
  markLunch,
  markHomework,
  markExit
}: WorkerViewProps) {
  const presentCount = children.filter((item) => item.status === "Prisutan").length;
  const leftCount = children.filter((item) => item.status === "Otišao").length;
  const missingCount = children.filter((item) => item.status === "Nije došao").length;

  return (
    <>
      {section === "today" ? (
        <div className="space-y-4">
          <MobileSectionTabs
            active={section}
            onChange={(value) => setSection(value as WorkerSection)}
            items={workerNav}
          />
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Dobar dan, Amina</p>
              <h2 className="mt-1 text-2xl font-semibold">Grupa: Leptirići</h2>
            <div className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-emerald-950">
              <p className="text-sm text-emerald-700">Trenutno u grupi</p>
              <p className="mt-1 text-3xl font-semibold">{presentCount} djece</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <StatCard label="Ukupno danas" value="16" />
              <StatCard label="Prisustvo" value={`${presentCount}`} />
              <StatCard label="Otišlo" value={`${leftCount}`} />
            </div>
          </section>

          <div className="grid gap-3 sm:grid-cols-3">
            <button type="button" onClick={() => setSection("children")} className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm">
              <p className="font-semibold">Djeca</p>
              <p className="mt-1 text-sm text-slate-500">Brze akcije i statusi</p>
            </button>
            <button type="button" onClick={() => setSection("departures")} className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm">
              <p className="font-semibold">Odlasci</p>
              <p className="mt-1 text-sm text-slate-500">Ko dolazi po dijete</p>
            </button>
            <button type="button" onClick={() => setSection("menu")} className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm">
              <p className="font-semibold">Jelovnik</p>
              <p className="mt-1 text-sm text-slate-500">Danas i alergeni</p>
            </button>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader title="Danas u grupi" subtitle="Brzi pregled za rad na telefonu" />
            <div className="mt-4 space-y-3">
              {children.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setChildId(item.id);
                    setDetailTab("pregled");
                    setSection("child-detail");
                  }}
                  className="w-full rounded-3xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-slate-500">
                        {item.status === "Nije došao" ? `Očekivani dolazak: ${item.expectedArrival}` : item.arrivalTime ? `Došla ${item.arrivalTime}` : `Otišla ${item.leaveTime ?? "—"}`}
                      </p>
                    </div>
                    <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <StatusBadge tone={item.status === "Prisutan" ? "success" : "neutral"}>Prisustvo {item.status === "Prisutan" ? "✓" : "○"}</StatusBadge>
                    <StatusBadge tone={item.lunch ? "success" : "neutral"}>Ručak {item.lunch ? "✓" : "○"}</StatusBadge>
                    <StatusBadge tone={item.homework ? "success" : "neutral"}>Zadaća {item.homework ? "✓" : "○"}</StatusBadge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.allergies.length ? <StatusBadge tone="warning">Alergija: {item.allergies.join(", ")}</StatusBadge> : null}
                    {!item.homework ? <StatusBadge tone="warning">Zadaća od juče nije završena</StatusBadge> : null}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      ) : section === "children" ? (
        <div className="space-y-3">
          <MobileSectionTabs
            active={section}
            onChange={(value) => setSection(value as WorkerSection)}
            items={workerNav}
          />
          <SectionHeader title="Lista djece" subtitle="Brze dnevne akcije" />
          {children.map((item) => (
            <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-slate-500">
                    {item.status === "Nije došao"
                      ? `Očekivani dolazak: ${item.expectedArrival}`
                      : item.status === "Otišao"
                        ? `Otišao ${item.leaveTime}`
                        : `Došao ${item.arrivalTime}`}
                  </p>
                </div>
                <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.status !== "Prisutan" ? (
                  <button type="button" onClick={() => markArrival(item.id)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                    Evidentiraj dolazak
                  </button>
                ) : null}
                <button type="button" onClick={() => markLunch(item.id)} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium">
                  Ručao {item.lunch ? "✓" : "○"}
                </button>
                <button type="button" onClick={() => markHomework(item.id)} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium">
                  Zadaća {item.homework ? "✓" : "○"}
                </button>
                <button type="button" onClick={() => markExit(item.id)} className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white">
                  Odlazak
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : section === "child-detail" ? (
        <div className="mx-auto w-full max-w-[1280px] space-y-4">
          <MobileSectionTabs
            active={section}
            onChange={(value) => setSection(value as WorkerSection)}
            items={workerNav}
          />
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold text-rose-700">ALERGIJA: {child.name === "Hana Kovač" ? "ORAŠASTI PLODOVI" : child.name === "Sara Hadžić" ? "MLIJEKO" : "NEMA"}</p>
                <h2 className="mt-1 text-2xl font-semibold">{child.name}</h2>
                <p className="text-sm text-slate-500">
                  Grupa: {child.group} · {child.status === "Prisutan" ? "Trenutno u boravku" : child.status === "Otišao" ? "Otišla kući" : "Još nije došla"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["pregled", "akcije", "preuzimanje"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setDetailTab(tab as "pregled" | "akcije" | "preuzimanje")}
                    className={[
                      "rounded-full px-4 py-2 text-sm font-medium",
                      detailTab === tab ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700"
                    ].join(" ")}
                  >
                    {tab === "pregled" ? "Pregled" : tab === "akcije" ? "Akcije" : "Preuzimanje"}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {detailTab === "pregled" ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader title="Danas" subtitle="Sažetak današnjeg statusa" />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <InfoRow label="Došla" value={child.arrivalTime ?? "—"} />
                <InfoRow label="Ručno označeno" value={child.lunch ? "Ručala" : "Nije ručala"} />
                <InfoRow label="Zadaća" value={child.homework ? "Završena" : "Nije završena"} />
                <InfoRow label="Odlazak" value={child.leaveTime ?? "—"} />
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                {child.note}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(child.allergies ?? []).length ? <StatusBadge tone="warning">Alergija: {(child.allergies ?? []).join(", ")}</StatusBadge> : null}
                {!child.homework ? <StatusBadge tone="warning">Zadaća od juče nije završena</StatusBadge> : null}
              </div>
            </section>
          ) : detailTab === "akcije" ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader title="Dnevne akcije" subtitle="Veliki dugmići za brz rad" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => markArrival(child.id)} className="rounded-3xl bg-slate-900 px-4 py-5 text-left text-white">
                  Evidentiraj dolazak
                </button>
                <button type="button" onClick={() => markLunch(child.id)} className="rounded-3xl border border-slate-200 px-4 py-5 text-left">
                  {child.lunch ? "✓ Ručao" : "○ Ručao"}
                </button>
                <button type="button" onClick={() => markHomework(child.id)} className="rounded-3xl border border-slate-200 px-4 py-5 text-left">
                  {child.homework ? "✓ Zadaća" : "○ Zadaća"}
                </button>
                <button type="button" onClick={() => markExit(child.id)} className="rounded-3xl bg-rose-600 px-4 py-5 text-left text-white">
                  Odlazak
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(child.allergies ?? []).length ? <StatusBadge tone="warning">Alergija: {(child.allergies ?? []).join(", ")}</StatusBadge> : null}
                {!child.homework ? <StatusBadge tone="warning">Zadaća od juče nije završena</StatusBadge> : null}
              </div>
            </section>
          ) : (
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader title="Ko može preuzeti" subtitle="Klik na broj je dovoljan za poziv" />
              <div className="mt-4 space-y-3">
                {child.pickupPeople.map((person) => (
                  <div key={person.phone} className="rounded-2xl border border-slate-200 px-4 py-3">
                    <p className="font-medium">{person.name} · {person.relation}</p>
                    <a className="text-sm text-slate-600" href={`tel:${person.phone}`}>
                      {person.phone}
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                {child.name === "Hana Kovač" ? "Pozovi roditelja" : "Pozovi kontakt osobe"}
              </div>
            </section>
          )}
        </div>
      ) : section === "departures" ? (
        <div className="space-y-4">
          <MobileSectionTabs
            active={section}
            onChange={(value) => setSection(value as WorkerSection)}
            items={workerNav}
          />
          <SectionHeader title="Odlasci" subtitle="Ko dolazi po dijete" />
          <div className="space-y-3">
            {departures.map((item) => (
              <div key={`${item.time}-${item.name}`} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{item.time}</p>
                <p className="mt-1 text-lg font-semibold">{item.name}</p>
                <p className="text-sm text-slate-600">{item.note}</p>
              </div>
            ))}
          </div>
        </div>      ) : section === "messages" ? (
        <div className="space-y-4">
          <MobileSectionTabs
            active={section}
            onChange={(value) => setSection(value as WorkerSection)}
            items={workerNav}
          />
          <SectionHeader title="Poruke" subtitle="Roditelji i direktor" />
          <div className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
            <aside className="space-y-3">
              {workerChats.map((thread, index) => {
                const last = thread.messages[thread.messages.length - 1];
                return (
                  <button
                    key={thread.id}
                    type="button"
                    className={[
                      "w-full rounded-3xl border p-4 text-left shadow-sm transition",
                      index === 0 ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white hover:bg-slate-50"
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-semibold text-white">
                        {thread.title.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">{thread.title}</p>
                            <p className="text-sm text-slate-500">{thread.subtitle}</p>
                          </div>
                          <StatusBadge tone="info">Chat</StatusBadge>
                        </div>
                        {last ? <p className="mt-3 truncate text-sm text-slate-600">{last.sender}: {last.text}</p> : null}
                      </div>
                    </div>
                  </button>
                );
              })}
            </aside>
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Aktivni razgovor</p>
                    <h3 className="text-lg font-semibold text-slate-900">{workerChats[0].title}</h3>
                  </div>
                  <StatusBadge tone="info">Danas</StatusBadge>
                </div>
              </div>
              <div className="space-y-3 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-5 py-5">
                {workerChats[0].messages.map((message) => (
                  <div key={message.id} className={["flex", message.from === "worker" ? "justify-end" : "justify-start"].join(" ")}>
                    <div className={[
                      "max-w-[82%] rounded-3xl px-4 py-3 text-sm shadow-sm",
                      message.from === "worker" ? "rounded-br-lg bg-emerald-600 text-white" : "rounded-bl-lg border border-slate-200 bg-white text-slate-800"
                    ].join(" ")}>
                      <p className="text-xs uppercase tracking-[0.18em] opacity-70">{message.sender} · {message.time}</p>
                      <p className="mt-1 leading-6">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 bg-white px-5 py-4">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-400">Napiši poruku roditelju ili direktoru...</span>
                  <div className="ml-auto flex gap-2">
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">foto</span>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">pošalji</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <MobileSectionTabs
            active={section}
            onChange={(value) => setSection(value as WorkerSection)}
            items={workerNav}
          />
          <SectionHeader title="Današnji ručak" subtitle="Brzi pregled za grupu i alergije" />
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {workerMenu.lunch.map((item) => (
                <StatusBadge key={item}>{item}</StatusBadge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {workerMenu.allergens.map((item) => (
                <StatusBadge key={item} tone="warning">
                  {item}
                </StatusBadge>
              ))}
            </div>
          </section>
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader title="Alergije u tvojoj grupi" />
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <div>Hana Kovač — orašasti plodovi</div>
              <div>Sara Hadžić — mlijeko</div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

type ParentViewProps = {
  section: ParentSection;
  setSection: (section: ParentSection) => void;
  child: ParentChild;
  children: ParentChild[];
  childId: string;
  setChildId: (id: string) => void;
  pickupDraft: { name: string; relation: string; phone: string };
  setPickupDraft: React.Dispatch<React.SetStateAction<{ name: string; relation: string; phone: string }>>;
  addPickupPerson: () => void;
};

function ParentView({ section, setSection, child, children, childId, setChildId, pickupDraft, setPickupDraft, addPickupPerson }: ParentViewProps) {
  const hasMultipleChildren = children.length > 1;

  return (
    <div className="space-y-4">
      <MobileSectionTabs
        active={section}
        onChange={(value) => setSection(value as ParentSection)}
        items={parentNav}
      />
      {section === "home" ? (
        <>
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Zdravo, Mirza </p>
              <h2 className="mt-1 text-2xl font-semibold">{child.name}</h2>
              {hasMultipleChildren ? (
                <div className="mt-4 flex flex-nowrap gap-2 overflow-x-auto pb-1">
                  {children.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setChildId(item.id)}
                      className={[
                        "shrink-0 rounded-full px-4 py-2 text-sm font-medium",
                        childId === item.id ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700"
                      ].join(" ")}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              ) : null}

            <div className="mt-5 rounded-3xl border border-rose-100 bg-rose-50 p-5 text-rose-950">
              <p className="text-sm text-rose-700">{child.name} je trenutno {child.status === "U boravku" ? "u boravku" : "van boravka"}</p>
              <p className="mt-1 text-3xl font-semibold">{child.status === "U boravku" ? "Trenutno u boravku" : "Nije u boravku"}</p>
              <p className="mt-1 text-sm text-rose-700">Došla u {child.arrivalTime ?? "—"}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <button type="button" onClick={() => setSection("tasks")} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800">
                Zadaća
              </button>
              <button type="button" onClick={() => setSection("menu")} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800">
                Jelovnik
              </button>
              <button type="button" onClick={() => setSection("membership")} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800">
                Članarina
              </button>
              <button type="button" onClick={() => setSection("pickup")} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800">
                Preuzimanje
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {child.timeline.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-1 font-medium">{item.done ? item.time ?? "Zabilježeno" : "Čeka"}</p>
                  </div>
                ))}
              </div>
            </section>
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader title="Danas sa djetetom je" subtitle={child.teacher} />
            <p className="mt-3 text-sm text-slate-700">Odgajateljica koja vodi grupu: {child.teacher}</p>
          </section>
        </>
      ) : section === "tasks" ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <SectionHeader title="Zadaća" subtitle="Danas i sutra" />
          <div className="mt-4 space-y-3">
            {child.homework.map((homework) => (
              <div key={homework.title} className="rounded-2xl border border-slate-200 px-4 py-3">
                <p className="font-medium">{homework.title}</p>
                <p className="text-sm text-slate-500">{homework.details}</p>
                <StatusBadge tone={homework.status === "Završeno" ? "success" : "warning"}>{homework.status}</StatusBadge>
              </div>
            ))}
          </div>
        </section>
      ) : section === "menu" ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <SectionHeader title="Jelovnik" subtitle="Današnji meni je označen" />
          <div className="mt-4 space-y-3">
            {child.menu.map((meal, index) => (
              <div key={meal.meal} className="rounded-2xl border border-slate-200 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{meal.meal}</p>
                  {index === 0 ? <StatusBadge tone="info">Danas</StatusBadge> : null}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {meal.allergens.map((allergen) => (
                    <StatusBadge key={allergen} tone="warning">
                      {allergen}
                    </StatusBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {(child.allergies ?? []).length ? <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">Hanin meni je prilagođen alergiji na {(child.allergies ?? []).join(", ")}.</p> : null}
        </section>
      ) : section === "membership" ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <SectionHeader title="Članarina" />
          <div className="mt-4 rounded-3xl border border-rose-100 bg-rose-50 p-5 text-rose-950">
            <p className="text-sm text-rose-700">{child.membership.month} — {child.membership.status}</p>
            <p className="mt-1 text-3xl font-semibold">{child.membership.amount}</p>
            <p className="mt-1 text-sm text-rose-700">{child.membership.paidAt ? `Plaćeno ${child.membership.paidAt}` : "Plaćanje dospijeva za 4 dana"}</p>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-600">Pregled članarine</span>
              <StatusBadge tone={statusTone(child.membership.status)}>{child.membership.status}</StatusBadge>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              {child.membership.month} · {child.membership.amount}
            </p>
          </div>
        </section>      ) : section === "messages" ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <SectionHeader title="Poruke" subtitle="Radnik i direktor" />
          <div className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
            <aside className="space-y-3">
              {parentChats.map((thread, index) => {
                const last = thread.messages[thread.messages.length - 1];
                return (
                  <button
                    key={thread.id}
                    type="button"
                    className={[
                      "w-full rounded-3xl border p-4 text-left shadow-sm transition",
                      index === 0 ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white hover:bg-slate-50"
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-600 text-sm font-semibold text-white">
                        {thread.title.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">{thread.title}</p>
                            <p className="text-sm text-slate-500">{thread.subtitle}</p>
                          </div>
                          <StatusBadge tone="info">Cat</StatusBadge>
                        </div>
                        {last ? <p className="mt-3 truncate text-sm text-slate-600">{last.sender}: {last.text}</p> : null}
                      </div>
                    </div>
                  </button>
                );
              })}
            </aside>
            <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Aktivni razgovor</p>
                    <h3 className="text-lg font-semibold text-slate-900">{parentChats[0].title}</h3>
                  </div>
                  <StatusBadge tone="info">Danas</StatusBadge>
                </div>
              </div>
              <div className="space-y-3 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-5 py-5">
                {parentChats[0].messages.map((message) => (
                  <div key={message.id} className={["flex", message.from === "parent" ? "justify-end" : "justify-start"].join(" ")}>
                    <div className={[
                      "max-w-[82%] rounded-3xl px-4 py-3 text-sm shadow-sm",
                      message.from === "parent" ? "rounded-br-lg bg-rose-600 text-white" : "rounded-bl-lg border border-slate-200 bg-white text-slate-800"
                    ].join(" ")}>
                      <p className="text-xs uppercase tracking-[0.18em] opacity-70">{message.sender} · {message.time}</p>
                      <p className="mt-1 leading-6">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 bg-white px-5 py-4">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-400">Napiši poruku...</span>
                  <div className="ml-auto flex gap-2">
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">foto</span>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">pošalji</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      ) : section === "pickup" ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <SectionHeader title="Preuzimanje djeteta" subtitle="Ko trenutno može preuzeti dijete" action={<button onClick={addPickupPerson} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">+ Dodaj osobu</button>} />
          <div className="mt-4 space-y-3">
            {child.pickupPeople.map((person) => (
              <div key={person.phone} className="rounded-2xl border border-slate-200 px-4 py-3">
                <p className="font-medium">{person.name} · {person.relation}</p>
                <a href={`tel:${person.phone}`} className="text-sm text-slate-600">{person.phone}</a>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <input className="rounded-2xl border border-slate-200 px-3 py-3 text-sm" placeholder="Ime i prezime" value={pickupDraft.name} onChange={(event) => setPickupDraft((current) => ({ ...current, name: event.target.value }))} />
            <input className="rounded-2xl border border-slate-200 px-3 py-3 text-sm" placeholder="Odnos" value={pickupDraft.relation} onChange={(event) => setPickupDraft((current) => ({ ...current, relation: event.target.value }))} />
            <input className="rounded-2xl border border-slate-200 px-3 py-3 text-sm" placeholder="Telefon" value={pickupDraft.phone} onChange={(event) => setPickupDraft((current) => ({ ...current, phone: event.target.value }))} />
          </div>
        </section>
      ) : (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <SectionHeader title="Obavijesti" subtitle="Danas i jučer" />
          <div className="mt-4 space-y-3">
            {parentNotifications.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.section}</p>
                <p className="mt-1 font-medium">{item.time}</p>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

function MobileSectionTabs({
  items,
  active,
  onChange
}: {
  items: { label: string; value: string }[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="lg:hidden">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onChange(item.value)}
            className={[
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium",
              active === item.value ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700"
            ].join(" ")}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}









