# Genijalci Boravak MVP

Moderni **mobile-first** MVP za produženi boravak djece (1–4 razred), fokusiran na brz rad nastavnika na telefonu.

## Šta je implementirano

- ✅ Login (JWT cookie + role-based API zaštita)
- ✅ Dashboard za staff: lista djece, veliki check-in/check-out dugmići, stanje prisustva
- ✅ Prikaz roditelja i kontakt podataka
- ✅ Sedmični jelovnik (7 dana)
- ✅ Osnovni chat API (1:1 + broadcast prema roditeljima)
- ✅ Audit log za ključne akcije

## Tehnologija

- Next.js 15 (React 19, App Router)
- TailwindCSS (responsive, mobile-first)
- PostgreSQL + Prisma ORM

## Pokretanje

1. Kopiraj env varijable:

```bash
cp .env.example .env
```

2. Instaliraj dependency-je:

```bash
npm install
```

3. Generiši Prisma klijent i migriraj bazu:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

4. Seed demo podataka:

```bash
npm run prisma:seed
```

5. Start dev server:

```bash
npm run dev
```

## Demo nalozi

- Staff: `staff@boravak.ba` / `demo1234`
- Admin: `admin@boravak.ba` / `demo1234`
- Parent: `roditelj@boravak.ba` / `demo1234`

## Napomena za produkciju

Za produkciju dodati:
- refresh token / logout endpoint
- push notifikacije (arrival/departure)
- UI za zadaće i chat na frontendu (API već postoji)
- detaljne izvještaje i finansije za admin panel
