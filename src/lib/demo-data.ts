export type AttendanceStatus = "PRESENT" | "ABSENT" | "LEFT" | "NONE";

export type DemoChild = {
  id: string;
  name: string;
  initials: string;
  grade: number;
  school: string;
  notes: string | null;
  status: AttendanceStatus;
  time: string | null;
  homework: { id: string; description: string; completed: boolean }[];
  parent: { name: string; phone: string; email: string; pickups: string[] };
};

export const initialChildren: DemoChild[] = [
  {
    id: "sara-k",
    name: "Sara K.",
    initials: "SK",
    grade: 3,
    school: "OŠ Meša Selimović",
    notes: "Alergija na kikiriki",
    status: "PRESENT",
    time: "11:42",
    homework: [
      { id: "sara-1", description: "Matematika, zadaci 4–8", completed: true },
      { id: "sara-2", description: "Pročitati priču iz čitanke", completed: false }
    ],
    parent: { name: "Amra K.", phone: "+387 61 111 222", email: "amra@example.ba", pickups: ["Djed Alija", "Tetka Selma"] }
  },
  {
    id: "faris-h",
    name: "Faris H.",
    initials: "FH",
    grade: 2,
    school: "OŠ Grbavica I",
    notes: null,
    status: "PRESENT",
    time: "11:55",
    homework: [{ id: "faris-1", description: "Vježba pisanja slova Lj", completed: false }],
    parent: { name: "Haris H.", phone: "+387 62 333 440", email: "haris@example.ba", pickups: ["Mama Lejla"] }
  },
  {
    id: "ema-s",
    name: "Ema S.",
    initials: "ES",
    grade: 1,
    school: "OŠ Malta",
    notes: "Preuzima je samo roditelj",
    status: "LEFT",
    time: "14:08",
    homework: [{ id: "ema-1", description: "Brojevi do 20", completed: true }],
    parent: { name: "Senada S.", phone: "+387 61 455 909", email: "senada@example.ba", pickups: ["Mama Senada", "Tata Emir"] }
  },
  {
    id: "david-m",
    name: "David M.",
    initials: "DM",
    grade: 4,
    school: "OŠ Kovačići",
    notes: null,
    status: "ABSENT",
    time: null,
    homework: [{ id: "david-1", description: "Priroda, lekcija 12", completed: false }],
    parent: { name: "Marina M.", phone: "+387 60 220 118", email: "marina@example.ba", pickups: ["Tata Marko"] }
  }
];

export const weeklyMenu = [
  ["Ponedjeljak", "Pileća supa, riža i salata"],
  ["Utorak", "Grah sa povrćem i domaći hljeb"],
  ["Srijeda", "Tjestenina sa piletinom i voće"],
  ["Četvrtak", "Ćufte, pire krompir i salata"],
  ["Petak", "Pita od sira i jogurt"]
] as const;
