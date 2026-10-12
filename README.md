# Chef AI

Chef AI is a React/Vite app that turns a list of ingredients into a recipe. The frontend sends requests to an Express API, which calls the Groq API using the OpenAI-compatible client.

## Requirements

- Node.js 20.19+ or 22.12+ (required by the Vite version in this project)
- A Groq API key

## Run locally

1. In `backend`, install dependencies and create your local environment file:

   ```powershell
   cd backend
   npm install
   Copy-Item .env.example .env
   ```

2. Add your Groq API key as the value of `GROQ_API` in `backend/.env`. Do not commit this file.

3. Start the API in that terminal:

   ```powershell
   npm start
   ```

   The API listens on `http://localhost:5000` by default. You can check it at `http://localhost:5000/health`.

4. In a second terminal, install and start the frontend:

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

   Open the local URL printed by Vite. The frontend uses `http://localhost:5000` for the API unless `VITE_API_URL` is set.

## Deploy

Deploy the frontend and API as separate services.

## Useful commands

Run these from `frontend`:

```powershell
npm run dev
npm run build
npm run preview
npm run lint
```

Run these from `backend`:

```powershell
npm start
```
