# Genijalci Boravak - frontend

Samostalni frontend MVP za produženi boravak djece, izdvojen iz pune aplikacije. Login, dashboard i akcije prisustva rade sa lokalnim demo podacima i ne zahtijevaju bazu, Prisma migracije ni API server.

## Tehnologija

- Next.js 15 (React 19, App Router)
- TypeScript
- Tailwind CSS
- date-fns

## Pokretanje

```bash
npm install
npm run dev
```

Otvori `http://localhost:3000` i koristi demo nalog:

- Email: `staff@boravak.ba`
- Lozinka: `demo1234`

## Opseg

- frontend-only demo prijava
- pregled djece i trenutnog prisustva
- lokalne check-in, check-out i absent akcije
- pregled kontakata roditelja i ovlaštenih osoba za preuzimanje
- sedmodnevni jelovnik

Podaci i promjene postoje samo u memoriji browsera i resetuju se osvježavanjem stranice.
