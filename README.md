# Astik GatePass Frontend

React frontend for Astik GatePass, the digital gate pass system for Ateneo de Naga
University. This is the "R" of our MERN stack, built with Vite and React Router.

## Getting started

Requires Node.js 20.19 or newer.

```
npm install
npm run dev
```

Open http://localhost:5173. The app opens on the login page.

## Project structure

```
src/
  main.jsx      Starts React
  App.jsx       Lists the routes (one <Route> per page)
  api.js        Sends requests to the backend
  index.css     Global styles and design colours
  mockData.js   Sample data for the admin pages
  utils.js      Text and date helpers
  context/      Sign-in state shared across the admin pages
  components/   Shared pieces, grouped into admin/, auth/ and student/
  pages/        One component per page, grouped into admin/, auth/ and student/
```

## Connecting to the backend

During development, Vite forwards every request starting with `/api` to
`http://localhost:5000` (see `vite.config.js`), so the backend must run on port 5000.

Call the backend with the `api` helper. It adds the `/api` prefix, parses the JSON
response, and throws if the request fails:

```js
import { api } from '../api.js'

const data = await api('/health')
```

The `/status` page calls `GET /api/health` and shows whether the backend answered. The backend
needs that route to return a 200 status with a JSON body.
