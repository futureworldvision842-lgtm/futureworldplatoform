# Future World Platform – Global AI Governance System

**By Muhammad Qureshi**

A governance platform combining blockchain-style transparency, AI (Gemini), and democratic tools: societies, voting, funds, discussions, teams, and role-based dashboards (Society, City, Country, Global, Super Admin).

## Tech

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, **shadcn/ui**
- **NextAuth v5** (credentials), **Prisma** (PostgreSQL / Neon)
- **Google Gemini** for AI features

## Run locally

**Windows:** Double-click `run-localhost.bat` (installs deps and starts dev server).

**Or from terminal:**
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).  
Set `NEXTAUTH_SECRET`, `DATABASE_URL` (Postgres/Neon URL), and `GEMINI_API_KEY` in `.env.local` if needed.

## Deploy (GitHub → Netlify 100%)

1. **Push to GitHub:** Double-click `push-to-github.bat` or run `node do-push-now.js`
2. **Netlify:** Import repo **futureworldplatoform** → set **DATABASE_URL**, **NEXTAUTH_SECRET**, **NEXTAUTH_URL** → Trigger deploy

Full steps: **[GITHUB-TO-NETLIFY.md](GITHUB-TO-NETLIFY.md)**  
Also: [NETLIFY-BABY-STEPS.md](NETLIFY-BABY-STEPS.md), [DEPLOY.md](DEPLOY.md)
