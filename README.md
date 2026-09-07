# Tour of Heroes

A modern rewrite of the classic Tour of Heroes demo: a small SPA for listing, adding, renaming, and deleting heroes.

This repository originally shipped a 2017 Create React App + Redux 3 implementation. The app now uses current React tooling while keeping the same product: dashboard of featured heroes, a full roster, and a detail editor. Data is still in-memory (no backend).

## Stack

- Vite 8
- React 19
- TypeScript
- React Router 7
- React Context + `useReducer` for app state
- Vitest + Testing Library

## Scripts

```bash
npm install
npm start          # dev server
npm test           # unit/UI tests
npm run build      # production build
npm run preview    # serve the production build
```

## What you can do

- **Dashboard (`/`)** — featured heroes (even-numbered IDs, same rule as the original app). Click a tile to open details.
- **Heroes (`/heroes`)** — full roster. Add a hero, delete one, or open a hero to rename them.
- **Hero detail (`/heroes/:heroId`)** — edit a name, save, or go back.

Heroes load from a simulated API with a short delay so the loading state is visible.
