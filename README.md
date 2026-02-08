# Future World Platform – Global AI Governance System

**By Muhammad Qureshi**

A governance platform combining blockchain-style transparency, AI (Gemini), and democratic tools: societies, voting, funds, discussions, teams, and role-based dashboards (Society, City, Country, Global, Super Admin).

## Tech

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, **shadcn/ui**
- **NextAuth v5** (credentials), **Prisma** (PostgreSQL / Neon)
- **Google Gemini** for AI features

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).  
Set `NEXTAUTH_SECRET`, `DATABASE_URL` (Postgres/Neon URL), and `GEMINI_API_KEY` in `.env.local` if needed.

## Deploy

- **GitHub:** Run `node do-push-now.js` in the project folder.
- **Netlify:** See [NETLIFY-BABY-STEPS.md](NETLIFY-BABY-STEPS.md).

Details: [DEPLOY.md](DEPLOY.md)
