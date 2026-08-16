export type Role = "owner" | "worker" | "parent";

export type OwnerSection = "dashboard" | "children" | "child-detail" | "finance" | "team" | "groups" | "menu" | "messages" | "board";
export type WorkerSection = "today" | "children" | "child-detail" | "departures" | "menu" | "messages" | "board";
export type ParentSection = "home" | "tasks" | "menu" | "membership" | "pickup" | "notifications" | "messages";

export type Group = {
  id: string;
  name: string;
  grades: string;
  capacity: number;
  childrenCount: number;
  lead: string;
  shift: string;
  notes: string;
};

export type Child = {
  id: string;
  name: string;
  grade: string;
  school: string;
  groupId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  pickupPeople: { name: string; relation: string; phone: string }[];
  term: string;
  statusToday: "Prisutan" | "Otišao" | "Odsutan" | "Očekujemo";
  arrivalTime?: string;
  leaveTime?: string;
  lunchDone: boolean;
  homeworkDone: boolean;
  allergies: string[];
  notes: string[];
  attendanceHistory: { date: string; arrival: string; leave: string; total: string }[];
  invoices: { month: string; status: "Plaćeno" | "Čeka uplatu" | "Kasni"; amount: string; paidAt?: string }[];
  homework: { title: string; details: string; status: "Završeno" | "U toku" | "Za sutra" }[];
  todayTimeline: { label: string; time?: string; done: boolean }[];
};

export type Employee = {
  id: string;
  name: string;
  role: string;
  phone: string;
  shift: string;
  status: "Na poslu" | "Smjena još nije počela" | "Na pauzi" | "Slobodan dan";
  group: string;
  hours: string;
  absences: string;
};

export type FinanceRow = {
  id: string;
  parent: string;
  child: string;
  amount: string;
  due: string;
  status: "Plaćeno" | "Čeka uplatu" | "Kasni";
  paidAt?: string;
};

export type MenuDay = {
  day: string;
  date: string;
  meals: string[];
  allergens: string[];
  note: string;
};

export type Notification = {
  id: string;
  section: string;
  time: string;
  text: string;
  tone: "info" | "success" | "warning";
};

export type ChatMessage = {
  id: string;
  from: "owner" | "worker" | "parent" | "system";
  sender: string;
  time: string;
  text: string;
};

export type ChatThread = {
  id: string;
  title: string;
  subtitle: string;
  category: "group" | "individual";
  messages: ChatMessage[];
};

export type WorkTask = {
  id: string;
  title: string;
  target: string;
  scope: "group" | "individual";
  done: boolean;
  due: string;
  note: string;
};

export type WorkerChild = {
  id: string;
  name: string;
  status: "Prisutan" | "Nije došao" | "Otišao";
  arrivalTime?: string;
  leaveTime?: string;
  expectedArrival?: string;
  lunch: boolean;
  homework: boolean;
  canLeaveWith: string;
  note: string;
  allergies: string[];
  pickupPeople: { name: string; relation: string; phone: string }[];
  group: string;
};

export type ParentChild = {
  id: string;
  name: string;
  group: string;
  grade: string;
  teacher: string;
  status: "U boravku" | "Vani" | "Očekujemo";
  arrivalTime?: string;
  lunchTime?: string;
  homeworkTime?: string;
  leaveTime?: string;
  allergies: string[];
  timeline: { label: string; time?: string; done: boolean }[];
  homework: { title: string; details: string; status: "Završeno" | "Za sutra" }[];
  menu: { meal: string; allergens: string[] }[];
  membership: { month: string; amount: string; status: "Plaćeno" | "Dospijeva uskoro"; paidAt?: string };
  pickupPeople: { name: string; relation: string; phone: string }[];
  notifications: Notification[];
  note: string;
};

export const appDate = {
  label: "Nedjelja, 16. august",
  full: "16.08.2026."
};

export const ownerStats = [
  { label: "Ukupno aktivne djece", value: "48", detail: "14 mjesta slobodno" },
  { label: "Danas dolazi", value: "42", detail: "31 trenutno u boravku" },
  { label: "Mjesečni prihod", value: "8.420 KM", detail: "5 računa kasni" },
  { label: "Nenaplaćeno", value: "1.260 KM", detail: "5 roditelja u kašnjenju" }
];

export const ownerToday = [
  { label: "Prisustvo", value: "31 prisutno" },
  { label: "Odlazak", value: "7 otišlo" },
  { label: "Dolazak", value: "4 očekujemo" },
  { label: "Odsutni", value: "6 odsutno" }
];

export const groups: Group[] = [
  { id: "leptirici", name: "Leptirići", grades: "1. i 2. razred", capacity: 16, childrenCount: 14, lead: "Amina Hadžić", shift: "11:30–17:30", notes: "1 slobodno mjesto" },
  { id: "zvjezdice", name: "Zvjezdice", grades: "2. i 3. razred", capacity: 14, childrenCount: 12, lead: "Lejla Kovač", shift: "12:00–18:00", notes: "Jedno dijete ima alergiju na mlijeko" },
  { id: "pcelice", name: "Pčelice", grades: "3. i 4. razred", capacity: 16, childrenCount: 15, lead: "Adnan Begić", shift: "12:30–18:30", notes: "Blizu punog kapaciteta" }
];

export const employees: Employee[] = [
  { id: "a1", name: "Amina Hadžić", role: "Odgajateljica", phone: "+38761111222", shift: "08:00–16:00", status: "Na poslu", group: "Leptirići", hours: "8 h", absences: "1 slobodan dan u septembru" },
  { id: "l1", name: "Lejla Kovač", role: "Odgajateljica", phone: "+38761111333", shift: "09:00–17:00", status: "Na poslu", group: "Zvjezdice", hours: "8 h", absences: "Tražila slobodan petak" },
  { id: "a2", name: "Adnan Begić", role: "Asistent", phone: "+38761111444", shift: "12:00–18:00", status: "Smjena još nije počela", group: "Pčelice", hours: "6 h", absences: "Bez odsustava" },
  { id: "s1", name: "Sara Ibrić", role: "Pomoćnica u kuhinji", phone: "+38761111555", shift: "10:00–16:00", status: "Na pauzi", group: "Kuhinja", hours: "6 h", absences: "Nema prijavljenih odsustava" }
];

export const financeRows: FinanceRow[] = [
  { id: "f1", parent: "Mirza Kovač", child: "Hana Kovač", amount: "220 KM", due: "Plaćeno 03.08.", status: "Plaćeno", paidAt: "03.08.2026." },
  { id: "f2", parent: "Amela Delić", child: "Tarik Delić", amount: "240 KM", due: "Kasni 6 dana", status: "Kasni" },
  { id: "f3", parent: "Aida Hadžić", child: "Sara Hadžić", amount: "220 KM", due: "Čeka uplatu", status: "Čeka uplatu" },
  { id: "f4", parent: "Mirsad Karić", child: "Adin Karić", amount: "220 KM", due: "Plaćeno 01.08.", status: "Plaćeno", paidAt: "01.08.2026." },
  { id: "f5", parent: "Jasna Bešić", child: "Emin Bešić", amount: "240 KM", due: "Kasni 2 dana", status: "Kasni" }
];

export const ownerMenu: MenuDay[] = [
  { day: "Ponedjeljak", date: "17.08.", meals: ["Pileća supa", "Piletina + riža", "Salata", "Banana"], allergens: ["mlijeko", "gluten"], note: "Hani je obrok prilagođen zbog alergije na orašaste plodove." },
  { day: "Utorak", date: "18.08.", meals: ["Begova čorba", "Pasta sa povrćem", "Jogurt"], allergens: ["mlijeko", "gluten"], note: "Lakši ručak za sportsku aktivnost." },
  { day: "Srijeda", date: "19.08.", meals: ["Grah varivo", "Integralni hljeb", "Voće"], allergens: ["gluten"], note: "Više vlakana i povrća." }
];

export const ownerChildren: Child[] = [
  {
    id: "hana",
    name: "Hana Kovač",
    grade: "2. razred",
    school: "OŠ Grbavica I",
    groupId: "zvjezdice",
    parentName: "Mirza Kovač",
    parentPhone: "+38761111222",
    parentEmail: "mirza.kovac@mail.ba",
    pickupPeople: [
      { name: "Mirza Kovač", relation: "otac", phone: "+38761111222" },
      { name: "Aida Kovač", relation: "majka", phone: "+38761111223" },
      { name: "Selma Kovač", relation: "nana", phone: "+38761111224" }
    ],
    term: "13:00–17:30",
    statusToday: "Prisutan",
    arrivalTime: "12:42",
    leaveTime: "",
    lunchDone: true,
    homeworkDone: true,
    allergies: ["orašasti plodovi"],
    notes: ["Ne smije orašaste plodove.", "Četvrtkom ide na balet u 17:00."],
    attendanceHistory: [
      { date: "16.08.", arrival: "12:42", leave: "—", total: "04:18" },
      { date: "15.08.", arrival: "12:40", leave: "16:28", total: "03:48" },
      { date: "14.08.", arrival: "12:50", leave: "16:31", total: "03:41" }
    ],
    invoices: [
      { month: "August 2026", status: "Plaćeno", amount: "220 KM", paidAt: "03.08.2026." },
      { month: "Juli 2026", status: "Plaćeno", amount: "220 KM", paidAt: "03.07.2026." },
      { month: "Juni 2026", status: "Plaćeno", amount: "220 KM", paidAt: "03.06.2026." }
    ],
    homework: [
      { title: "Matematika", details: "Strana 42, zadaci 3–7", status: "Završeno" },
      { title: "Bosanski jezik", details: "Pročitati priču 'Ježeva kućica'", status: "Završeno" },
      { title: "Priroda i društvo", details: "Ponijeti kolaž papir", status: "Za sutra" }
    ],
    todayTimeline: [
      { label: "Stigla", time: "12:42", done: true },
      { label: "Ručala", time: "13:31", done: true },
      { label: "Zadaća završena", time: "14:18", done: true },
      { label: "Odlazak", done: false }
    ]
  },
  {
    id: "adin",
    name: "Adin Karić",
    grade: "4. razred",
    school: "OŠ Malta",
    groupId: "pcelice",
    parentName: "Mirsad Karić",
    parentPhone: "+38761111501",
    parentEmail: "mirsad.karic@mail.ba",
    pickupPeople: [
      { name: "Mirsad Karić", relation: "otac", phone: "+38761111501" },
      { name: "Lejla Karić", relation: "majka", phone: "+38761111502" }
    ],
    term: "13:30–18:00",
    statusToday: "Očekujemo",
    arrivalTime: "",
    leaveTime: "",
    lunchDone: false,
    homeworkDone: false,
    allergies: ["jaja"],
    notes: ["Ne voli mlijeko u čaju."],
    attendanceHistory: [
      { date: "16.08.", arrival: "—", leave: "—", total: "—" },
      { date: "15.08.", arrival: "13:31", leave: "17:58", total: "04:27" },
      { date: "14.08.", arrival: "13:35", leave: "18:02", total: "04:27" }
    ],
    invoices: [
      { month: "August 2026", status: "Čeka uplatu", amount: "220 KM" },
      { month: "Juli 2026", status: "Plaćeno", amount: "220 KM", paidAt: "02.07.2026." }
    ],
    homework: [
      { title: "Matematika", details: "Zadaci iz zbirke", status: "U toku" },
      { title: "Engleski", details: "Naučiti 10 riječi", status: "Za sutra" }
    ],
    todayTimeline: [
      { label: "Stigao", done: false },
      { label: "Ručao", done: false },
      { label: "Zadaća završena", done: false },
      { label: "Odlazak", done: false }
    ]
  },
  {
    id: "tarik",
    name: "Tarik Delić",
    grade: "3. razred",
    school: "OŠ Čengić Vila",
    groupId: "leptirici",
    parentName: "Amela Delić",
    parentPhone: "+38761111777",
    parentEmail: "amela.delic@mail.ba",
    pickupPeople: [{ name: "Amela Delić", relation: "majka", phone: "+38761111777" }],
    term: "12:30–17:00",
    statusToday: "Otišao",
    arrivalTime: "12:36",
    leaveTime: "16:21",
    lunchDone: true,
    homeworkDone: true,
    allergies: ["mlijeko"],
    notes: ["Danas došao bez užine."],
    attendanceHistory: [
      { date: "16.08.", arrival: "12:36", leave: "16:21", total: "03:45" },
      { date: "15.08.", arrival: "12:38", leave: "16:15", total: "03:37" }
    ],
    invoices: [
      { month: "August 2026", status: "Kasni", amount: "240 KM" },
      { month: "Juli 2026", status: "Plaćeno", amount: "240 KM", paidAt: "03.07.2026." }
    ],
    homework: [
      { title: "Matematika", details: "Strana 21", status: "Završeno" }
    ],
    todayTimeline: [
      { label: "Stigao", time: "12:36", done: true },
      { label: "Ručao", time: "13:20", done: true },
      { label: "Zadaća završena", time: "14:05", done: true },
      { label: "Odlazak", time: "16:21", done: true }
    ]
  },
  {
    id: "sara",
    name: "Sara Hadžić",
    grade: "1. razred",
    school: "OŠ Velešići",
    groupId: "leptirici",
    parentName: "Aida Hadžić",
    parentPhone: "+38761111888",
    parentEmail: "aida.hadzic@mail.ba",
    pickupPeople: [{ name: "Aida Hadžić", relation: "majka", phone: "+38761111888" }],
    term: "13:00–17:30",
    statusToday: "Odsutan",
    arrivalTime: "",
    leaveTime: "",
    lunchDone: false,
    homeworkDone: false,
    allergies: ["mlijeko"],
    notes: ["Umorna poslije treninga.", "Danas ne dolazi."],
    attendanceHistory: [
      { date: "16.08.", arrival: "—", leave: "—", total: "—" }
    ],
    invoices: [
      { month: "August 2026", status: "Plaćeno", amount: "220 KM", paidAt: "01.08.2026." }
    ],
    homework: [
      { title: "Priroda i društvo", details: "Nacrtati porodicu", status: "Za sutra" }
    ],
    todayTimeline: [
      { label: "Stigla", done: false },
      { label: "Ručala", done: false },
      { label: "Zadaća završena", done: false },
      { label: "Odlazak", done: false }
    ]
  }
];

export const ownerChildDetailId = "hana";

export const workerChildren: WorkerChild[] = [
  {
    id: "hana",
    name: "Hana Kovač",
    status: "Prisutan",
    arrivalTime: "12:42",
    leaveTime: "",
    lunch: true,
    homework: true,
    canLeaveWith: "Mirza Kovač, Aida Kovač, Selma Kovač",
    note: "Četvrtkom ide na balet u 17:00.",
    allergies: ["orašasti plodovi"],
    pickupPeople: ownerChildren[0].pickupPeople,
    group: "Zvjezdice"
  },
  {
    id: "tarik",
    name: "Tarik Delić",
    status: "Otišao",
    arrivalTime: "12:36",
    leaveTime: "16:21",
    lunch: true,
    homework: true,
    canLeaveWith: "Amela Delić",
    note: "Danas došao bez užine.",
    allergies: ["mlijeko"],
    pickupPeople: ownerChildren[2].pickupPeople,
    group: "Leptirići"
  },
  {
    id: "sara",
    name: "Sara Hadžić",
    status: "Nije došao",
    expectedArrival: "13:00",
    lunch: false,
    homework: false,
    canLeaveWith: "Aida Hadžić",
    note: "Zadaća od juče nije završena.",
    allergies: ["mlijeko"],
    pickupPeople: ownerChildren[3].pickupPeople,
    group: "Leptirići"
  },
  {
    id: "adin",
    name: "Adin Karić",
    status: "Prisutan",
    arrivalTime: "13:11",
    leaveTime: "",
    lunch: false,
    homework: false,
    canLeaveWith: "Mirsad Karić, Lejla Karić",
    note: "Očekuje se roditelj za raniji odlazak.",
    allergies: ["jaja"],
    pickupPeople: ownerChildren[1].pickupPeople,
    group: "Pčelice"
  }
];

export const departures = [
  { time: "15:30", name: "Tarik Delić", note: "dolazi majka" },
  { time: "16:00", name: "Hana Kovač", note: "dolazi otac" },
  { time: "16:30", name: "Sara Hadžić", note: "dolazi nana" },
  { time: "17:00", name: "Emin Bešić", note: "samostalni odlazak nije dozvoljen" }
];

export const workerMenu = {
  lunch: ["Pileća supa", "Riža sa piletinom", "Salata", "Banana"],
  allergens: ["Mlijeko", "Gluten"]
};

export const parentChildren: ParentChild[] = [
  {
    id: "hana",
    name: "Hana",
    group: "Zvjezdice",
    grade: "2. razred",
    teacher: "Amina Hadžić",
    status: "U boravku",
    arrivalTime: "12:42",
    lunchTime: "13:31",
    homeworkTime: "14:18",
    leaveTime: undefined,
    allergies: ["orašasti plodovi"],
    timeline: [
      { label: "Stigla", time: "12:42", done: true },
      { label: "Ručala", time: "13:31", done: true },
      { label: "Zadaća završena", time: "14:18", done: true },
      { label: "Odlazak", done: false }
    ],
    homework: [
      { title: "Matematika", details: "Strana 42, zadaci 3–7", status: "Završeno" },
      { title: "Bosanski jezik", details: "Pročitati priču 'Ježeva kućica'", status: "Završeno" },
      { title: "Priroda i društvo", details: "Ponijeti kolaž papir", status: "Za sutra" }
    ],
    menu: [
      { meal: "Pileća supa", allergens: ["mlijeko"] },
      { meal: "Piletina + riža", allergens: [] },
      { meal: "Salata", allergens: [] },
      { meal: "Banana", allergens: [] }
    ],
    membership: { month: "August 2026", amount: "220 KM", status: "Plaćeno", paidAt: "03.08.2026." },
    pickupPeople: ownerChildren[0].pickupPeople,
    notifications: [
      { id: "n1", section: "Danas", time: "12:42", text: "Hana je stigla u boravak.", tone: "success" },
      { id: "n2", section: "Danas", time: "13:31", text: "Hana je ručala.", tone: "info" },
      { id: "n3", section: "Danas", time: "14:18", text: "Hana je završila zadaću.", tone: "success" },
      { id: "n4", section: "Jučer", time: "16:34", text: "Hanu je preuzeo Mirza Kovač.", tone: "warning" }
    ],
    note: "Četvrtkom ide na balet u 17:00."
  },
  {
    id: "adin",
    name: "Adin",
    group: "Pčelice",
    grade: "4. razred",
    teacher: "Adnan Begić",
    status: "Očekujemo",
    arrivalTime: undefined,
    lunchTime: undefined,
    homeworkTime: undefined,
    leaveTime: undefined,
    allergies: ["mlijeko"],
    timeline: [
      { label: "Stigao", done: false },
      { label: "Ručao", done: false },
      { label: "Zadaća završena", done: false },
      { label: "Odlazak", done: false }
    ],
    homework: [
      { title: "Matematika", details: "Zadaci iz zbirke", status: "Za sutra" },
      { title: "Engleski", details: "Naučiti 10 riječi", status: "Za sutra" }
    ],
    menu: [
      { meal: "Begova čorba", allergens: ["jaja"] },
      { meal: "Povrtni rižoto", allergens: [] },
      { meal: "Jogurt", allergens: ["mlijeko"] }
    ],
    membership: { month: "August 2026", amount: "220 KM", status: "Dospijeva uskoro" },
    pickupPeople: ownerChildren[1].pickupPeople,
    notifications: [
      { id: "n5", section: "Danas", time: "10:12", text: "Podsjetnik: članarina dospijeva za 4 dana.", tone: "warning" }
    ],
    note: "Ne smije jaja u jutarnjem obroku."
  }
];

export const parentNotifications = parentChildren[0].notifications;

export const ownerDashboardNotes = [
  "5 neplaćenih članarina",
  "Grupa Pčelice ima samo 1 slobodno mjesto",
  "Sara H. ima alergiju - današnji meni sadrži mliječne proizvode",
  "Lejla tražila slobodan petak"
];

export const ownerChats: ChatThread[] = [
  {
    id: "owner-group-zvjezdice",
    title: "Grupa Zvjezdice",
    subtitle: "Amina Hadžić i Lejla Kovač",
    category: "group",
    messages: [
      { id: "m1", from: "owner", sender: "Amir Kovač", time: "08:10", text: "Podsjećam da danas dolaze fotografije za oglasnu ploču." },
      { id: "m2", from: "worker", sender: "Amina Hadžić", time: "08:14", text: "Primljeno, odmah postavljam djecu u grupu." }
    ]
  },
  {
    id: "owner-worker-amina",
    title: "Amina Hadžić",
    subtitle: "Pojedinačno",
    category: "individual",
    messages: [
      { id: "m3", from: "owner", sender: "Amir Kovač", time: "09:05", text: "Molim te provjeri Adinovu zadaću prije odlaska." },
      { id: "m4", from: "worker", sender: "Amina Hadžić", time: "09:08", text: "Uzet ću to odmah nakon ručka." }
    ]
  }
];

export const workerChats: ChatThread[] = [
  {
    id: "worker-parent-hana",
    title: "Mirza Kovač",
    subtitle: "Hana Kovač",
    category: "individual",
    messages: [
      { id: "m5", from: "parent", sender: "Mirza Kovač", time: "12:10", text: "Može li Hana ostati 15 minuta duže danas?" },
      { id: "m6", from: "worker", sender: "Amina Hadžić", time: "12:12", text: "Može, zabilježila sam." }
    ]
  },
  {
    id: "worker-director",
    title: "Direktor",
    subtitle: "Amir Kovač",
    category: "individual",
    messages: [
      { id: "m7", from: "owner", sender: "Amir Kovač", time: "10:00", text: "Danas dodaj novu napomenu za alergiju na mlijeko." },
      { id: "m8", from: "worker", sender: "Amina Hadžić", time: "10:04", text: "U redu, obavijestit ću kuhinju." }
    ]
  }
];

export const parentChats: ChatThread[] = [
  {
    id: "parent-worker-hana",
    title: "Amina Hadžić",
    subtitle: "Danas sa Hanom",
    category: "individual",
    messages: [
      { id: "m9", from: "worker", sender: "Amina Hadžić", time: "12:42", text: "Hana je stigla u boravak." },
      { id: "m10", from: "parent", sender: "Mirza Kovač", time: "12:44", text: "Hvala, javite ako treba nešto." }
    ]
  },
  {
    id: "parent-director",
    title: "Direktor",
    subtitle: "Amir Kovač",
    category: "individual",
    messages: [
      { id: "m11", from: "owner", sender: "Amir Kovač", time: "09:20", text: "Dobrodošli u demo pregled. Sve informacije su lokalne." }
    ]
  }
];

export const ownerTasks: WorkTask[] = [
  { id: "t1", title: "Postaviti fotografije za Leptiriće", target: "Leptirići", scope: "group", done: false, due: "Danas do 15:00", note: "Za oglasnu ploču." },
  { id: "t2", title: "Provjeriti Adinovu zadaću", target: "Adin Karić", scope: "individual", done: false, due: "Danas do 16:00", note: "Javiti roditelju nakon provjere." },
  { id: "t3", title: "Ažurirati jelovnik", target: "Pčelice", scope: "group", done: true, due: "Završeno", note: "Kuhinja je potvrdila." }
];
