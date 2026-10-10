# RTK Query Posts

A React app for listing, adding, and editing posts with Redux Toolkit Query. Posts are served by JSON Server.

## Getting started

Install dependencies:

```sh
npm install
```

Start the JSON Server in one terminal:

```sh
npm run server
```

It serves the posts API at `http://localhost:3001/posts` using `db.json`.

Start the Vite app in a second terminal:

```sh
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). Keep both servers running while using the app. The app page and API are separate: Vite serves the interface, while JSON Server handles requests to `/posts` on port `3001`.

## Available commands

```sh
npm run build       # Type-check and build for production
npm run lint        # Run ESLint
npm run test -- --run # Run tests once
npm run preview     # Preview the production build
```