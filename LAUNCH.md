# G.A.I.G.S. Platform — Launch Checklist

**Full upgrade plan (Phases 0–7) is implemented.** Use this checklist to finalize and launch.

---

## 1. Local finalize (your machine)

**Option A — One-click (Windows):**  
Double-click **`launch-localhost.bat`** in the project folder. It runs Prisma generate, db push, then `npm run dev`. If db push fails (no DATABASE_URL), you can still continue to start the dev server for UI testing.

**Option B — Manual (project folder):**

```bash
# 1) Ensure .env has valid DATABASE_URL (postgresql://... from Neon/Netlify)
# 2) Generate Prisma client and push schema
npx prisma generate
npx prisma db push

# 3) Production build (must pass)
npm run build

# 4) Run locally to test
npm run dev
```

- If `prisma db push` fails: fix `DATABASE_URL` in `.env` (see [LOCAL-SETUP.md](LOCAL-SETUP.md)).
- If `npm run build` fails: fix any TypeScript/errors shown, then repeat.

---

## 2. Push to GitHub

```bash
node do-push-now.js
```

Or in PowerShell: `.\push-to-github.bat`

Repo: **https://github.com/futureworldvision842-lgtm/futureworldplatoform**

---

## 3. Netlify deploy

1. **Site** → **Environment variables** — ensure these are set:
   - `DATABASE_URL` = your Postgres connection string (e.g. from Neon)
   - `NEXTAUTH_SECRET` = strong random secret (e.g. output of `node scripts/generate-secret.js`)
   - `NEXTAUTH_URL` = your site URL **with no trailing slash** (e.g. `https://yoursite.netlify.app`)
   - Optional: `GEMINI_API_KEY` for AI features

2. **Deploy** → **Trigger deploy** (or push to `main` to auto-deploy).

3. After deploy, test: **Register**, **Login**, **Dashboard**, **Society browse**, **Wallet**, **AI Assistant**, **Global**.

---

## 4. What’s included (Phases 0–7)

| Phase | Feature |
|-------|--------|
| 0 | Auth helpers, secure PATCH /api/users |
| 1 | Profile: CNIC, address; register & edit |
| 2 | Society join request → admin approve/reject; Join Requests page |
| 3 | Wallet hierarchy (Personal → Society → City → Country → Global); transaction level badges |
| 4 | Service providers: societyId, approvedBySociety; society admin approves at /society/services |
| 5 | Disaster & Relief card on Global; DonationCampaign triggerType |
| 6 | AI suggestions: /api/ai/suggest; AI Assistant “Get AI solutions”; voting “Get AI suggestions” per proposal |
| 7 | Dashboard “Governance & Science Game — Coming soon” card |

---

## 5. Quick test list after launch

- [ ] Homepage loads
- [ ] Register new user
- [ ] Login
- [ ] Dashboard (Game card, hierarchy section)
- [ ] Profile edit (CNIC, address)
- [ ] Society browse → Request to join (if applicable)
- [ ] Society dashboard (admin: Join Requests, Service Providers)
- [ ] Wallet (hierarchy, transaction badges)
- [ ] AI Assistant (“Get AI solutions” card)
- [ ] Society Voting (“Get AI suggestions” on a proposal)
- [ ] Global (Disaster & Relief, donations link)

---

**You’re ready to launch.** Run steps 1 → 2 → 3, then use section 5 to verify.
