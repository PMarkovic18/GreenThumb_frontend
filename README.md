# GreenThumb_frontend

Frontend za INFSUS projekt GreenThumb

## Opis

Ovaj projekt je frontend aplikacija za GreenThumb, sustav za praćenje i upravljanje rastom biljaka. Omogućuje pregled, dodavanje, uređivanje i brisanje biljaka i dnevnika rasta putem preglednog web sučelja.

## Pokretanje aplikacije

1. Instalirajte potrebne pakete:
   ```
   npm install
   ```
2. Pokrenite razvojni server:
   ```
   npm run dev
   ```

Aplikacija će biti dostupna na `http://localhost:5173` (ili port koji je prikazan u konzoli).

## Povezivanje s backendom

Frontend koristi REST API backend aplikacije na adresi definiranoj u `.env` datoteci (npr. `VITE_API_BASE_URL=http://localhost:3000`). Provjerite da je backend pokrenut i dostupan.

## Funkcionalnosti

- Pregled svih biljaka i njihovih dnevnika rasta
- Dodavanje, uređivanje i brisanje biljaka
- Dodavanje, uređivanje i brisanje dnevnika rasta
- Pretraga biljaka i dnevnika rasta
- Navigacija kroz aplikaciju putem jednostavne navigacijske trake

## Tehnologije

- React + Vite
- Tailwind CSS
- React Router

## Napomena

Za potpuno funkcioniranje aplikacije potrebno je pokrenuti i backend dio projekta (`GreenThumb_backend`).
