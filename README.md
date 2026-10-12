# Chef AI

Chef AI is a Next.js app that turns a list of ingredients into a recipe. Its API route calls the Groq API using the OpenAI-compatible client.

## Requirements

- Node.js 20.9 or later
- A Groq API key

## Run locally

1. From the project root, install dependencies and create your local environment file:

   ```powershell
   npm install
   Copy-Item -Path .env.example -Destination .env
   ```

2. Add your Groq API key as the value of `GROQ_API` in `.env`. Do not commit this file.

3. Start the app:

   ```powershell
   npm run dev
   ```

   Open `http://localhost:3000`. Check the API at `http://localhost:3000/health`.

## Deploy

Deploy this as one Next.js project (for example, import it into Vercel). If the Git repository contains the parent `Projects` folder, set the Vercel project's root directory to `ChefAi`; otherwise use the repository root. Let Vercel detect Next.js and use the standard install and build commands (`npm install` and `npm run build`).

Add `GROQ_API` in the deployment's server-side environment variables for production, and redeploy. Never use a `NEXT_PUBLIC_` prefix for the key or commit it. The UI and `/api/recipe` endpoint are served from the same origin.

## Useful commands

Run these from the project root:

```powershell
npm run dev
npm run build
npm run lint
npm start
```
