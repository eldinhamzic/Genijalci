import { addDays, startOfDay } from "date-fns";
import DashboardClient from "@/components/dashboard-client";

const today = startOfDay(new Date());

const weeklyMenu = Array.from({ length: 7 }, (_, dayOffset) => ({
  date: addDays(today, dayOffset).toISOString(),
  mealDescription: "Pileća supa, riža, salata, voće"
}));

export default function DashboardPage() {
  return (
    <DashboardClient
      user={{ id: "staff-demo", name: "Nastavnik Ena", role: "STAFF" }}
      initialChildren={[
        {
          id: "sara-demo",
          name: "Sara K.",
          grade: 3,
          school: "OŠ Meša Selimović",
          notes: "Alergija na kikiriki",
          attendance: null,
          homework: []
        }
      ]}
      contacts={[
        {
          childId: "sara-demo",
          childName: "Sara K.",
          parents: [
            {
              parentName: "Amra K.",
              phone: "+38761111222",
              email: "roditelj@boravak.ba",
              pickups: ["Djed Alija", "Tetka Selma"]
            }
          ]
        }
      ]}
      weeklyMenu={weeklyMenu}
    />
  );
}
