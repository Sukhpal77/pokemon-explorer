# Pokémon Explorer

A simple Next.js, TypeScript, and Tailwind app using PokéAPI.

## Run

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000.

## Structure

- `app/`: homepage, detail route, and loading/error pages.
- `services/pokemon.ts`: PokéAPI calls.
- `types/pokemon.ts`: data types used by the app.
- `components/pokemon-list.tsx`: name search and pagination.
- `components/pokemon-card.tsx`: one Pokémon card.
- `components/pokemon-details.tsx`: image, types, abilities, stats, and moves.
- `components/header.tsx`: app title.
- `components/pokemon-image.tsx`: artwork with a fallback.

The homepage and detail route fetch data on the server. Search checks the full Pokémon name list and loads matching cards in pages of 24. Data and artwork come from [PokéAPI](https://pokeapi.co/).

## Checks

```sh
npm run typecheck
npm run lint
npm run build
npm start
```
