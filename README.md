# Future World Platform – Global AI Governance System (G.A.I.G.S.)

**By Muhammad Qureshi**

A governance platform combining blockchain-style transparency, AI (Gemini), and democratic tools: societies, voting, funds, discussions, teams, and role-based dashboards (Society, City, Country, Global, Super Admin). Full upgrade (Phases 0–7) implemented: join requests, wallet hierarchy, service provider approval, disaster & relief, AI suggestions, game coming soon.

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
**Prisma needs `.env`** (not only `.env.local`) with `DATABASE_URL=postgresql://...`. See [LOCAL-SETUP.md](LOCAL-SETUP.md). Set `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and optionally `GEMINI_API_KEY`.

## Launch

**Pehle localhost par test, phir push.** → **[LAUNCH.md](LAUNCH.md)** — local test steps first, then GitHub push & Netlify when ready.

## Deploy (GitHub → Netlify 100%)

**Sab kuch word-by-word chahiye (setup + deploy + login fix)?** → **[SETUP-AND-DEPLOY.md](SETUP-AND-DEPLOY.md)** (yahi se start karo.)

1. **Push to GitHub:** `node do-push-now.js` (PowerShell: `.\push-to-github.bat`)
2. **Netlify:** Import repo **futureworldplatoform** → set **DATABASE_URL**, **NEXTAUTH_SECRET**, **NEXTAUTH_URL** (no trailing slash) → Trigger deploy

Also: [GITHUB-TO-NETLIFY.md](GITHUB-TO-NETLIFY.md), [LOGIN-FIX-BABY-STEPS.md](LOGIN-FIX-BABY-STEPS.md), [NETLIFY-BABY-STEPS.md](NETLIFY-BABY-STEPS.md), [DEPLOY.md](DEPLOY.md)
