Radi isključivo na **izgledu, rasporedu i UI/UX-u** postojeće aplikacije **Genijalci**.

Ne mijenjaj backend.
Ne uvodi bazu.
Ne radi autentikaciju.
Ne mijenjaj poslovnu logiku osim minimalno ako je potrebno da UI radi.
Ne troši vrijeme na arhitekturu.

Cilj je da aplikacija izgleda kao **gotov, moderan SaaS proizvod za produžene boravke djece**, spreman za prezentaciju potencijalnim kupcima.

Vizuelni pravac treba pratiti stil ovog koncepta:

* svijetao interfejs
* bijele površine
* veoma svijetla siva pozadina
* diskretni borderi
* soft shadows
* veliki radius kartica
* čista moderna tipografija
* jasna hijerarhija
* elegantni status badgevi
* nježne akcentne boje
* puno whitespacea
* moderan B2B SaaS osjećaj
* prijateljski, ali profesionalno
* aplikacija za djecu, ali nikako infantilna

Najvažnije:

**Mobile prikaz treba izgledati kao prava moderna mobilna aplikacija.**

**Desktop prikaz treba izgledati kao pravi web SaaS dashboard, a ne kao razvučena mobilna aplikacija.**

---

# 1. OPĆI VIZUELNI IDENTITET

Aplikacija treba imati veoma čist i premium izgled.

Glavna pozadina:

* `#F7F8FC`
* ili vrlo slična hladna svijetlo-siva

Kartice:

* bijele
* border `#E8EAF0`
* veoma lagana sjena
* radius otprilike `16px–20px`

Glavni tekst:

* tamno siva / skoro crna
* primjer `#171A21`

Sekundarni tekst:

* `#667085`
* `#7A8191`

Izbjegavati potpuno crnu boju.

---

# 2. BOJE PO ULOGAMA

Svaka uloga može imati svoju suptilnu akcentnu boju.

## Vlasnik

Glavni accent:

* ljubičasta / indigo

Primjeri:

* `#635BFF`
* `#6C63FF`
* `#5D5FEF`

Koristiti za:

* active navigation
* primary CTA
* icons
* highlight
* selected state

Ne praviti cijeli ekran ljubičast.

---

## Radnik

Glavni accent:

* zelena

Primjeri:

* `#249C61`
* `#2FA36B`

Koristiti za:

* prisutnost
* check-in
* završene dnevne aktivnosti
* active navigation

---

## Roditelj

Glavni accent:

* topla pink / coral

Primjeri:

* `#F43F68`
* `#F65375`

Koristiti za:

* aktivne elemente
* parent status
* CTA
* navigaciju

---

# 3. STATUS BOJE

Status boje moraju biti konzistentne kroz cijelu aplikaciju.

## Pozitivno

Zelena:

* prisutno
* plaćeno
* završeno
* ručalo
* aktivno

## Warning

Narandžasta:

* očekujemo
* uskoro
* treba pažnju
* uplata dospijeva

## Negativno

Crvena:

* dugovanje
* odsutno
* upozorenje
* alergija ako je kritična

## Neutralno

Sivo:

* otišlo
* neaktivno
* još nije počelo

Nikad se ne oslanjati samo na boju.

Uvijek imati i tekst/status.

---

# 4. TYPOGRAPHY

Koristi moderan sans-serif font.

Ako projekat već koristi dobar sistemski font, ne instalirati novu biblioteku bez potrebe.

Hijerarhija:

## Page title

Desktop:

* 28–32px
* bold

Mobile:

* 22–26px
* bold

## Section title

* 18–20px
* semibold

## Card title

* 15–17px
* semibold

## Body

* 14–16px

## Secondary labels

* 12–14px

## KPI broj

Desktop:

* 28–34px
* bold

Mobile:

* 24–30px
* bold

Ne koristiti previše različitih veličina.

---

# 5. GLOBALNI LAYOUT — DESKTOP

Desktop aplikacija treba izgledati kao pravi business SaaS proizvod.

Za širine preko približno `1024px` koristiti:

**fixed/sticky left sidebar + main content area**

Primjer strukture:

```text
┌──────────────┬──────────────────────────────────────────┐
│              │ Header                                   │
│ Sidebar      ├──────────────────────────────────────────┤
│              │                                          │
│              │ Main dashboard                           │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

Sidebar širina:

* približno `220–250px`

Main sadržaj:

* maksimalna širina `1400–1500px`
* centriran ili fluidan
* padding `28–36px`

Ne razvlačiti sadržaj potpuno do ivica monitora.

---

# 6. SIDEBAR DESKTOP

Sidebar treba biti:

* bijel
* diskretan desni border
* full-height
* sticky

Na vrhu:

logo / naziv

**Genijalci**

ispod mali tekst:

**Produženi boravak**

Navigacija ispod.

Primjer vlasnik:

* Pregled
* Djeca
* Grupe
* Finansije
* Tim
* Jelovnik
* Postavke

Svaka stavka:

* ikonica lijevo
* tekst
* visina oko `44–48px`
* border radius `10–12px`

Active stavka:

* vrlo blijeda ljubičasta pozadina
* ljubičasta ikonica
* ljubičasti tekst
* mali accent marker sa lijeve strane je opcionalan

Ne koristiti jake pune boje za active sidebar item.

Na dnu sidebara:

mini profil kartica:

* avatar
* ime
* uloga

primjer:

**Amir Kovač**
Direktor

Ispod:

**Odjava**

---

# 7. DESKTOP TOP HEADER

Main content treba imati vlastiti header.

Lijevo:

**Dobrodošli, Amir 👋**

ispod:

**Nedjelja, 16. august**

Desno:

* search opcionalno
* notification button
* user avatar opcionalno

Notification button:

* kvadratna soft-white kartica
* radius 12px
* bell icon
* mali crveni badge broj

Ne praviti veliki header.

---

# 8. DEMO ROLE SWITCHER

Pošto nema prave autentikacije, napraviti vrlo elegantan demo switcher.

Može biti na samom vrhu stranice kao mali floating segmented control.

Tekst:

**Pregled kao:**

zatim:

[Vlasnik] [Radnik] [Roditelj]

Desktop:

* centrirano na vrhu
* širina oko 350px
* bijela površina
* border
* soft shadow
* radius `12–14px`

Active role:

* puna accent boja
* bijeli tekst

Mobile:

* full-width ili skoro full-width
* sticky top
* dovoljno veliki touch targets

Switcher mora izgledati kao prezentacijski alat, a ne dio stvarnog poslovnog sistema.

---

# 9. DESKTOP DASHBOARD — VLASNIK

Desktop dashboard vlasnika treba biti organizovan u više redova.

Ne praviti sve kartice iste veličine.

Vizuelna hijerarhija je veoma bitna.

---

## RED 1 — KPI

Na vrhu koristiti 4 ili maksimalno 5 KPI kartica.

Primjer:

* Ukupno djece
* Danas prisutno
* Mjesečni prihod
* Nenaplaćeno

Layout:

```text
[ Ukupno ] [ Prisutno ] [ Prihod ] [ Nenaplaćeno ]
```

Sve kartice iste visine.

Svaka kartica:

* mala ikonica gore/lijevo
* velika vrijednost
* mali opis

Primjer:

```text
👥

48

Ukupno djece
```

Ikonica treba biti unutar malog colored square backgrounda.

Primjer:

* purple pale bg
* green pale bg
* blue pale bg
* red pale bg

Ne koristiti velike šarene pozadine.

---

# 10. DESKTOP — DANAS SEKCIJA

Ispod KPI kartica jedna šira kartica.

Header:

**Danas**

desno:

**Detaljnije**

Unutra 4 mala status boxa:

* 31 prisutno
* 7 otišlo
* 4 očekujemo
* 6 odsutno

Na desktopu u jednom redu.

Svaki status:

* mali colored background
* veliki broj
* label ispod

---

# 11. DESKTOP — DVA STUPCA

Sljedeći red može biti:

```text
┌───────────────────────────────┬───────────────────────────────┐
│ Finansije                     │ Grupe                         │
│                               │                               │
└───────────────────────────────┴───────────────────────────────┘
```

---

## Finansije kartica

Prikazati:

**Naplaćeno ovaj mjesec**

8.420 KM

zeleno

ispod:

**Nenaplaćeno**

1.260 KM

crveno

tekst:

**5 roditelja kasni sa uplatom**

Primary button:

**Otvori finansije**

---

## Grupe kartica

Prikazati:

Leptirići — 14 / 16

progress bar

Zvjezdice — 12 / 14

progress bar

Pčelice — 15 / 16

progress bar

Progress bar:

* vrlo tanak
* radius
* siva pozadina
* accent fill

---

# 12. DESKTOP DONJI RED

Dva stupca:

* Radnici danas
* Zahtijeva pažnju

---

## Radnici danas

Lista sa avatarima.

Primjer:

Amina Hadžić

08:00 – 16:00

desno:

**Prisutna**

zeleni tekst/badge

---

## Zahtijeva pažnju

Lista kao mini alert feed.

Svaki item:

* mala status tačka
* naslov
* sekundarni tekst

Primjeri:

**5 neplaćenih članarina**

**Pčelice imaju samo 1 slobodno mjesto**

**Sara H. — alergija na mlijeko**

**Lejla tražila slobodan petak**

Ne koristiti ogromne alert kartice.

---

# 13. DESKTOP LISTA DJECE

Za stranicu Djeca na desktopu koristiti kombinaciju:

* toolbar
* search
* filter
* tabelu ili modernu data listu

Header:

**Djeca**

desno:

**+ Novo dijete**

Ispod:

Search input širok oko `280px`.

Filter dropdowni:

* Sve grupe
* Status
* Uplata

Tabela:

Kolone:

* Dijete
* Grupa
* Razred
* Termin
* Status danas
* Uplata
* arrow/menu

Avatar ili inicijali uz ime.

Red visine otprilike `64–72px`.

Hover state:

* vrlo lagani gray background

Ne praviti hard enterprise tabelu.

Treba ostati toplo i čisto.

---

# 14. DETAIL PAGE DESKTOP

Child detail treba izgledati kao prava profile stranica.

Na vrhu:

avatar

**Hana Kovač**

2. razred · OŠ Grbavica I

desno status:

**Trenutno u boravku**

Ispod horizontalni tabovi:

* Pregled
* Prisustvo
* Finansije
* Napomene

Glavni sadržaj može biti 2-column layout.

Lijevo:

* osnovni podaci
* roditelji
* pickup osobe

Desno:

* današnji status
* alergije
* napomene

---

# 15. RADNIK — MOBILE-FIRST

Radnikov ekran mora izgledati najviše kao mobilna aplikacija.

Na desktopu NE rastegnuti kartice preko cijele širine.

Desktop radnik može imati centralni content width:

* približno `900–1100px`

I dalje koristiti sidebar na desktopu, ali glavni radni sadržaj treba ostati kompaktan.

---

# 16. RADNIK HEADER

Header:

**Dobar dan, Amina ☀️**

ispod:

**Grupa: Leptirići**

Desno:

notification icon

---

# 17. RADNIK — GLAVNI STATUS

Velika zelena kartica:

**11 djece**

**trenutno u grupi**

Kartica može imati blag gradient unutar zelene nijanse, ali vrlo suptilno.

Ispod u istoj kartici ili attached white section:

* 16 ukupno
* 11 prisutno
* 3 otišlo
* 2 još nisu došli

Na desktopu horizontalno.

Na mobile 2x2 grid ako nema prostora.

---

# 18. RADNIK — LISTA DJECE

Svako dijete ima zasebnu horizontalnu karticu.

Desktop primjer:

```text
[avatar] Hana Kovač              [Prisutan] [Ručak] [Zadaća] [Odlazak]
         Došla 12:42
```

Mobile:

```text
[avatar] Hana Kovač
         Došla 12:42

[✓ Prisutan] [✓ Ručak]
[✓ Zadaća]   [Odlazak]
```

Kartica:

* white
* radius 16px
* border
* padding 16px

Avatar:

* 48px desktop
* 44px mobile

Action chips:

* pill shape
* visina oko 34–38px

Primarni CTA:

* outlined ili full accent, zavisno od statusa

---

# 19. MOBILE BOTTOM NAVIGATION

Za Radnik i Roditelj prikaze mobile mora imati bottom navigation.

Fixed bottom.

Bijela pozadina.

Gornji border.

5 ikonica maksimalno.

Primjer Radnik:

* Danas
* Djeca
* Odlasci
* Jelovnik

Active:

* accent boja
* filled icon ili jasniji weight
* tekst accent boje

Inactive:

* gray

Height:

* otprilike 64–72px
* safe-area padding

---

# 20. RODITELJ — MOBILE LOOK

Roditeljski prikaz mora izgledati najviše kao potrošačka mobilna aplikacija.

Na desktopu može biti prikazan u širem content layoutu, ali i dalje elegantno i jednostavno.

Na velikom desktopu može koristiti:

* sidebar
* glavni content max 1000px

ili

* desktop top navigation

Ali mobile ostaje glavni UX pravac.

---

# 21. RODITELJ HEADER

Mobile:

**Zdravo, Mirza 👋**

desno notification icon.

Ispod child selector:

[ Hana ] [ Adin ]

Svaki tab:

* avatar
* ime
* pill background

Active child:

* pink pale background
* pink border

---

# 22. CHILD STATUS CARD

Glavna kartica treba vizuelno dominirati roditeljskim home ekranom.

Blaga roze/pink pozadina.

Ne potpuno puna boja.

Naslov:

**Hana je trenutno u boravku**

ispod:

**Došla u 12:42**

Timeline:

green check circle

**Stigla**
12:42

vertikalna linija

green check circle

**Ručala**
13:31

green check circle

**Zadaća završena**
14:18

empty circle

**Odlazak**

Kartica treba izgledati veoma uredno i emocionalno umirujuće.

---

# 23. ODGAJATELJ CARD

Na dnu status kartice dodati divider.

Avatar.

Tekst:

**Danas je sa Hanom Amina**

ispod:

**Odgajateljica**

Ne koristiti veliku karticu.

Samo elegantan horizontalni item.

---

# 24. QUICK ACTION GRID — RODITELJ

Ispod main kartice grid opcija.

Mobile:

2 ili 3 kolone zavisno od širine.

Primjer:

* Zadaća
* Jelovnik
* Članarina
* Preuzimanje
* Obavijesti

Svaka quick card:

* skoro square
* pale accent background
* centered icon
* tekst
* radius 16px

Ne pretjerivati s bojama.

Primjer:

Zadaća — pale purple

Jelovnik — pale violet

Članarina — pale orange

Preuzimanje — pale peach

Obavijesti — pale pink

---

# 25. DESKTOP RODITELJ

Na desktopu nikako samo povećati mobilnu verziju preko cijelog ekrana.

Koristi:

```text
┌──────────────┬──────────────────────────────────────────┐
│ Sidebar      │ Zdravo, Mirza                           │
│              │                                          │
│              │ [Child status velika kartica]           │
│              │                                          │
│              │ [Zadaća] [Jelovnik] [Članarina]         │
│              │                                          │
│              │ [Obavijesti / quick info]               │
└──────────────┴──────────────────────────────────────────┘
```

Main sadržaj neka bude max približno `1100px`.

---

# 26. FORME I MODALI

Forme moraju biti vrlo čiste.

Input:

* visina `44–48px`
* radius `10–12px`
* border gray
* focus accent border
* label iznad

Modal:

* white
* radius 20px
* soft shadow
* max-width 480–600px
* dosta paddinga

Footer:

Cancel secondary.

Save primary.

Ne praviti ogromne modal prozore.

---

# 27. BUTTON SYSTEM

## Primary

* accent background
* white text
* radius 10–12px
* medium font weight

## Secondary

* white
* border
* dark text

## Ghost

* transparent
* gray text

## Danger

* red pale background ili red outline
* koristiti rijetko

Visina desktop:

`40–44px`

Mobile CTA:

`44–50px`

---

# 28. BADGES

Badges neka budu pill-shaped.

Primjeri:

**Prisutna**

pale green bg

dark green text

**Plaćeno**

pale green

**Kasni**

pale red

**Očekujemo**

pale orange

**Otišla**

pale gray

Padding:

* horizontal 10–12px
* vertical 5–7px

Font:

12–13px medium

---

# 29. IKONICE

Koristi jedan konzistentan icon set ako već postoji.

Ako nije instaliran icon paket, koristiti vrlo jednostavna rješenja bez dodavanja teške biblioteke.

Ikonice:

* outline stil
* 18–20px sidebar
* 20–24px quick action
* 16px unutar malih UI elemenata

Ne koristiti emoji kao glavne UI ikonice, osim eventualno pozdravnog emoji elementa.

---

# 30. SPACING SYSTEM

Koristi konzistentan spacing.

Primjeri:

* page padding desktop: 32px
* page padding mobile: 16px
* card padding desktop: 20–24px
* card padding mobile: 16–18px
* gap između velikih sekcija: 24px
* gap između kartica: 16px
* mali element gap: 8px

Izbjegavati random `13px`, `19px`, `27px`.

---

# 31. MOBILE RESPONSIVENESS

Na širini do otprilike `768px`:

* sakriti desktop sidebar
* koristiti bottom nav
* smanjiti page padding
* KPI grid prelazi u 2 kolone
* table view prelazi u cards/list
* long forms full width
* modal postaje skoro full screen ako treba
* header ostaje kompaktan

Nikakav horizontalni scroll.

---

# 32. TABLET

Na tablet uređaju:

* može koristiti collapsible sidebar
* ili compact icon sidebar

KPI:

* 2x2 grid

Liste:

* mogu ostati tabelarne ako ima prostora

---

# 33. HOVER I MICROINTERACTIONS

Desktop:

card hover samo gdje je element klikabilan.

Primjer:

* border malo tamniji
* shadow minimalno jači
* translateY maksimalno 1px ili nikako

Button hover:

* malo tamnija accent boja

Navigation:

* soft background

Ne koristiti velike scale animacije.

Transition:

`150–200ms`

---

# 34. EMPTY STATE

Ako neka lista nema podatke:

ne ostavljati prazan ekran.

Primjer:

ikona

**Nema neplaćenih članarina 🎉**

ispod:

**Sve uplate za august su evidentirane.**

Ali ne koristiti emoji svuda.

---

# 35. SKELETON / LOADING LOOK

Ako trenutno ima loading state, koristiti vrlo jednostavne skeleton blokove.

* light gray
* radius
* bez shimmer efekta ako nije potrebno

Pošto je demo, ovo nije prioritet.

---

# 36. VAŽNA RAZLIKA MOBILE VS WEB

Ovo je ključno.

Nemoj koristiti isti layout i samo povećavati širinu.

## Mobile

* cards stacked
* bottom navigation
* veliki touch controls
* 1 column
* česta upotreba cards/chips
* compact header
* prioritet trenutne akcije

## Desktop

* sidebar
* više kolona
* data tables kada imaju smisla
* širi information density
* jasne sekcije
* više sadržaja vidljivo bez skrolanja
* dashboard layout poput profesionalnog SaaS proizvoda

Desktop mora izgledati kao **web aplikacija**.

Mobile mora izgledati kao **mobilna aplikacija**.

---

# 37. VLASNIK DESKTOP — REFERENTNI RASPORED

Koristi približno ovaj koncept:

```text
┌──────────────────┬────────────────────────────────────────────────────────┐
│ GENIJALCI        │ Dobrodošli, Amir                          🔔          │
│                  │ Nedjelja, 16. august                                   │
│ Pregled          │                                                        │
│ Djeca            │ [48]      [31]        [8.420 KM]       [1.260 KM]      │
│ Grupe            │ Djeca     Prisutno    Prihod           Nenaplaćeno     │
│ Finansije        │                                                        │
│ Tim              │ ┌────────────────────────────────────────────────────┐ │
│ Jelovnik         │ │ Danas                                              │ │
│                  │ │ 31 prisutno | 7 otišlo | 4 očekujemo | 6 odsutno │ │
│                  │ └────────────────────────────────────────────────────┘ │
│                  │                                                        │
│                  │ ┌──────────────────────┐ ┌──────────────────────────┐ │
│                  │ │ Finansije            │ │ Grupe                    │ │
│                  │ │                      │ │ Leptirići 14/16         │ │
│                  │ │ 8.420 KM             │ │ ███████████░            │ │
│                  │ │ 1.260 KM dugovanja   │ │                          │ │
│                  │ └──────────────────────┘ └──────────────────────────┘ │
│                  │                                                        │
│                  │ ┌──────────────────────┐ ┌──────────────────────────┐ │
│                  │ │ Radnici danas        │ │ Zahtijeva pažnju         │ │
│                  │ └──────────────────────┘ └──────────────────────────┘ │
└──────────────────┴────────────────────────────────────────────────────────┘
```

---

# 38. RADNIK MOBILE — REFERENTNI RASPORED

```text
Dobar dan, Amina ☀️
Grupa: Leptirići                      🔔

┌──────────────────────────────────┐
│                                  │
│      11 djece                    │
│      trenutno u grupi            │
│                                  │
├──────────────────────────────────┤
│ 16 ukupno  11 prisutno           │
│ 3 otišlo   2 još nisu došli      │
└──────────────────────────────────┘

Lista djece

┌──────────────────────────────────┐
│ 👧 Hana Kovač                    │
│ Došla 12:42                      │
│                                  │
│ ✓ Prisutan  ✓ Ručak  ✓ Zadaća   │
│                         Odlazak  │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ 👦 Tarik Delić                   │
│ Očekivani dolazak 13:00          │
│                                  │
│   Evidentiraj dolazak            │
│   Označi odsustvo                │
└──────────────────────────────────┘

────────────────────────────────────
 Danas     Djeca     Odlasci    Meni
```

---

# 39. RODITELJ MOBILE — REFERENTNI RASPORED

```text
Zdravo, Mirza 👋                        🔔

[ 👧 Hana ]   [ 👦 Adin ]

┌────────────────────────────────────┐
│                                    │
│ Hana je trenutno u boravku         │
│ Došla u 12:42                      │
│                                    │
│ ● Stigla                12:42      │
│ │                                  │
│ ● Ručala                13:31      │
│ │                                  │
│ ● Zadaća završena       14:18      │
│ │                                  │
│ ○ Odlazak                          │
│                                    │
├────────────────────────────────────┤
│ 👩 Danas je sa Hanom Amina         │
│    Odgajateljica                   │
└────────────────────────────────────┘

[ Zadaća ] [ Jelovnik ] [ Članarina ]

[ Preuzimanje ] [ Obavijesti ]

──────────────────────────────────────
 Početna  Zadaća  Jelovnik  Članarina  Profil
```

---

# 40. KONAČNI CILJ

Kada se aplikacija otvori, treba izgledati kao proizvod koji već postoji na tržištu.

Vlasnik treba pomisliti:

**"Ovo izgleda kao ozbiljan softver kojim mogu voditi firmu."**

Radnik treba pomisliti:

**"Ovo je jednostavnije od papira i WhatsApp grupa."**

Roditelj treba pomisliti:

**"Ovdje odmah vidim sve što me zanima za moje dijete."**

Ne pokušavati impresionirati količinom elemenata.

Impresionirati:

* jasnoćom
* organizacijom
* spacingom
* konzistentnošću
* kvalitetom kartica
* responsive ponašanjem
* dobrim statusima
* realnim informacijama

Prioritet je da UI izgleda kao **premium, jednostavan i ozbiljan SaaS proizvod za tržište BiH**.

