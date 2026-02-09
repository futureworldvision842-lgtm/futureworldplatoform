# G.A.I.G.S. Platform Upgrade Plan — Full Vision to Reality

This document captures the **current state**, the **target vision** (banking hierarchy, Binance-style transparency, Facebook-like profiles, Uber-like services, admin control, global disaster relief, AI, game), and a **phased implementation plan**. Priority: **first make login and hierarchy rock-solid**, then add features phase by phase. Deploy stays **Netlify-ready** at every step.

---

## Part 1 — Current Project Summary

### What Exists Today

**Auth & users**
- Register: name, email, password, phone (no CNIC, no address/home yet).
- Login: NextAuth (credentials), JWT, roles: USER, SOCIETY_ADMIN, CITY_ADMIN, COUNTRY_ADMIN, GLOBAL_ADMIN, SUPER_ADMIN.
- Profile: view + edit (name, bio, phone, location, skills). No CNIC, no full address, no social graph.

**Governance hierarchy**
- **Society** → admin, members, funds, proposals, posts, teams; linked to City.
- **City** → admin, societies, proposals; linked to Country.
- **Country** → admin, cities, proposals.
- **Global** → UI for issues, donations, analytics (no separate Global entity in DB).
- **SocietyMember** links User to Society (role MEMBER/MODERATOR). No “join request → admin approve” flow.

**Finance & blockchain-style**
- **Wallet**: personal, business, society; balance, currency.
- **Transaction**: amount, type, blockchainHash, fromUser/toUser (no society/city/country “branch” accounts yet).
- **Vote**: choice, blockchainHash, proposal, user.
- Society has `fundsBalance`; no explicit City/Country/Global treasury models yet.

**Social & content**
- **Post**: content, type (DISCUSSION, ANNOUNCEMENT, etc.), author, society; **Comment** on posts.
- **Feed** page; no per-user timeline, no “friends” or follow system.

**Services & business**
- **Business**, **Service** (provider, price, category, location), **ServiceRequest** (requester, budget, status).
- No “register as service provider with CNIC/location → society admin approves” flow; no Uber-style provider dashboard.

**Donations**
- **DonationCampaign** (title, target, raised, level SOCIETY/CITY/COUNTRY/GLOBAL), **Donation** (amount, donor, campaign, blockchainHash).
- No disaster/event-driven campaigns; no AI-triggered “disaster X needs Y people / Z fund” and auto-create campaign.

**AI & notifications**
- **AIConversation**, **Notification** (title, message, type, link).
- AI assistant and analyze APIs exist; no structured “AI suggests solution for every problem” or global disaster alerts.

**Deploy**
- Next.js 14, Prisma, Neon Postgres, Netlify; build and login working.

---

## Part 2 — Target Vision (What We Are Adding)

1. **Banking + blockchain (Binance-style hierarchy)**  
   - Every user: **personal “bank account”** (wallet) they control (like mobile banking).  
   - **Society** = branch (society admin = branch manager); **City** = city branch; **Country** = national; **Global** = international.  
   - Full hierarchy: Personal → Society → City → Country → Global.  
   - All flows (transfers, donations, funds) **blockchain-style transparent** (hashes, ledger, visible to permitted levels).

2. **Voting**  
   - Stays integrated with this hierarchy; votes tied to proposals at society/city/country/global; blockchain-style where applicable.

3. **Facebook-like profile & social**  
   - Profile: **CNIC**, full name, phone, **address/home**, location, photo, bio, skills.  
   - User can **socialize**: feed, posts, comments, reactions; optional “connections” or “follow” later.  
   - Profile visible to society/community when they are a member.

4. **Uber-like services & provider dashboard**  
   - Person registers **as service provider**: CNIC, name, number, **location, home address**, what they offer.  
   - **Society admin approves** membership for the society/community they want to join.  
   - After approval: they appear in that **community dashboard**; can participate in decisions, voting, transparent society account, services list.  
   - **Services dashboard**: list services, set availability, location; requesters can find and request (Uber-like flow).

5. **Society / City / Global admin control**  
   - **Society admin**: full dashboard — approve members, handle society issues, funds, proposals, announcements, services.  
   - **City admin**: city-level branches, societies, budget, projects.  
   - **Country / Global**: same idea at higher level.

6. **Global disaster & transparent relief**  
   - When **global** (or national) disaster/event: **AI** can trigger **notifications** (e.g. “X region needs Y people / Z fund”).  
   - System can **auto-create a public transparent campaign** (like DonationCampaign at GLOBAL level).  
   - People **donate**; everyone can **see transparent use of funds** (ledger, allocations).

7. **AI help**  
   - AI gives **suggestions and solutions** for problems (society/city/country/global); integrated in proposals, issues, and assistant.

8. **Game (dashboard)**  
   - A **game** in the dashboard where playing connects to **real-world scientific / governance solutions** (e.g. learning, simulations).  
   - For now: **“Coming soon”** + short description so everyone knows what kind of game to expect; full detail later.

9. **Login & hierarchy first**  
   - **Login** and **role-based hierarchy** (who sees what at Society / City / Country / Global) must be **solid and clear** before piling on features.

---

## Part 3 — Priority Order

- **Phase 0 — Foundation (do first)**  
  - Harden **login** (already working; keep stable, add optional 2FA later if needed).  
  - **Hierarchy & roles**: clear rules for who can access Society/City/Country/Global; fix any gaps in middleware and API.  
  - **Netlify**: keep build and env best practices; ensure every phase stays deployable.

- **Phase 1 — Profile & identity (Facebook-like base)**  
  - Add **CNIC**, **address/home**, improve profile; profile page more “social” (posts, activity).  
  - Optional: follow/connections later.

- **Phase 2 — Society join & approval (Uber-like onboarding)**  
  - User can **request to join** a society (with CNIC, name, number, location, home).  
  - **Society admin approves/rejects**.  
  - After approval: full access to that society (decisions, voting, transparent account, services).

- **Phase 3 — Banking hierarchy & transparency (Binance-like)**  
  - Explicit **branch** concept: Society = branch, City = branch, Country = branch, Global = branch.  
  - User’s **personal account** (wallet) + society/city/country/global **treasury/ledger**.  
  - All money flows with **blockchain-style hashes** and visibility by level.

- **Phase 4 — Services dashboard (Uber-like)**  
  - **Provider registration** (CNIC, name, number, location, services).  
  - Society admin approves **provider** for community.  
  - **Services dashboard**: offer services, set location/availability; requesters find and request; status tracking.

- **Phase 5 — Global disaster & AI-driven campaigns**  
  - **Disaster/event** model or flag; **AI** (or admin) can create **notifications** (“X needs Y people, Z fund”).  
  - **Auto-create transparent donation campaign**; public can donate and see use of funds.

- **Phase 6 — AI suggestions everywhere**  
  - AI attached to proposals, issues, and assistant: **suggestions and solutions** for each problem.

- **Phase 7 — Game (Coming soon)**  
  - Dashboard section: **“Governance & Science Game — Coming soon”** + 2–3 lines description (real-world solutions, learning).  
  - No full game build yet; just clear messaging.

---

## Part 4 — Implementation Outline (Step by Step)

### Phase 0 — Login & hierarchy (best for Netlify)

**Goals**
- Login remains reliable on Netlify (trustHost, node runtime, NEXTAUTH_URL, NEXTAUTH_SECRET).
- One place that defines “who can see what” for Society / City / Country / Global.

**Tasks**
1. **Auth**
   - Keep current NextAuth setup; document env and deploy steps (already in SETUP-AND-DEPLOY.md).
   - Optional: add `emailVerified` or `verified` to User and show in profile.
2. **Roles & middleware**
   - Review `middleware.ts`: protect routes by role (e.g. society admin only for society admin pages).
   - Add a small **auth helper** (e.g. `canAccessSocietyAdmin(societyId)`, `canAccessCityAdmin(cityId)`) and use in API routes.
3. **API**
   - Every society/city/country/global API checks: user has role or membership for that level; return 403 if not.
4. **Netlify**
   - Ensure `runtime = "nodejs"` for auth and any Prisma/bcrypt routes; no Edge for those.  
   - After each phase: `npm run build` passes and deploy to Netlify succeeds.

**Deliverables**
- Login and deploy unchanged and stable.  
- Clear access control for hierarchy; no unauthorized access to admin areas.

---

### Phase 1 — Profile & identity (Facebook-like)

**DB (Prisma)**
- Add to **User**: `cnic` (String?, unique), `address` (String? e.g. home address), keep `location` for city/country text.
- Optional: `dateOfBirth` (DateTime?), `gender` (String?).

**API**
- **PATCH /api/users** (or /api/profile): allow updating cnic, address (and any new fields); validate CNIC format if needed.
- **GET /api/users?id=** (existing): return new fields to self and to society admin when user is member.

**UI**
- **Register**: add optional CNIC, address (or move to “complete profile” after first login).
- **Profile / Edit profile**: add CNIC, full address; make it look more “profile” (avatar, cover, bio, skills, recent activity).
- **Public profile** (for society members): show name, avatar, role, bio; hide sensitive data (CNIC, email) from non-admins.

**Deliverables**
- Users can add CNIC and address; profile feels more like a social profile.

---

### Phase 2 — Society join & approval

**DB**
- Add **SocietyJoinRequest** (userId, societyId, status PENDING/APPROVED/REJECTED, message?, reviewedById?, reviewedAt?, createdAt).
- Optional: store “requested with” snapshot (name, cnic, phone, address) for audit.

**API**
- **POST /api/societies/[id]/join-request**: create SocietyJoinRequest (PENDING); user must be logged in; body can include message.
- **GET /api/societies/[id]/join-requests**: society admin only; list PENDING (and optionally APPROVED/REJECTED).
- **PATCH /api/societies/[id]/join-requests/[requestId]**: society admin only; set status APPROVED/REJECTED; on APPROVED, create SocietyMember.

**UI**
- **Society browse**: “Request to join” button (if not member); form: optional message, confirm CNIC/address from profile.
- **Society admin dashboard**: “Join requests” tab; list requests; Approve / Reject with optional message.
- **Notifications**: notify user when request is approved or rejected.

**Deliverables**
- Users request to join a society; society admin approves; after approval, user gets full society access (voting, funds, etc.).

---

### Phase 3 — Banking hierarchy & transparency (Binance-like)

**DB**
- **Wallet** already has type PERSONAL, SOCIETY; ensure we have (or add) CITY, COUNTRY, GLOBAL wallet types or equivalent (e.g. one “branch” wallet per society/city/country/global).
- **Transaction**: already has blockchainHash; add optional `level` (PERSONAL/SOCIETY/CITY/COUNTRY/GLOBAL) and optional `fromWalletId`/`toWalletId` or equivalent so we can show “branch” movements.
- City/Country: add `fundsBalance` or link to Wallet if not already.
- **Global**: add **GlobalTreasury** or use a special Wallet/entity for global fund; link DonationCampaign to it.

**API**
- **GET /api/wallet**: return user’s personal wallet; if member of society, also return society wallet summary (or link to society funds).
- **GET /api/societies/[id]/funds** (or existing funds route): return society balance + list of transactions (with hashes); same idea for city/country/global.
- **POST /api/transactions**: support transfer to society/city/country/global “branch” and record level + hash.

**UI**
- **Wallet page**: “My account” (personal) + “Society/City/Country/Global” sections when user has access; show balances and last N transactions with “blockchain” hash/link.
- **Society/City/Country/Global funds**: public transparent ledger (who paid in, who got what); same style as Binance transparency pages.

**Deliverables**
- Clear “personal account + branch hierarchy”; all major flows visible with hashes; Netlify build still passes.

---

### Phase 4 — Services dashboard (Uber-like)

**DB**
- **Service**: already has providerId, title, description, price, category, location, status. Add optional `societyId` (service offered in this society) and `approvedBySocietyAdmin` (Boolean) if we want society-scoped approval.
- **ServiceRequest**: link to **Service** (serviceId); requester, status, budget; optional: societyId, location.
- Optional: **ProviderProfile** (userId, cnic, vehicleType?, etc.) for richer provider info.

**API**
- **POST /api/services** (or provider register): create service; optionally in “pending” until society admin approves (if service is society-scoped).
- **GET /api/services**: list services (filter by society, location, category); show only approved when society approval is on.
- **PATCH /api/societies/[id]/services/[serviceId]/approve**: society admin approves service.
- **POST /api/services/request**: create ServiceRequest for a service; notify provider.

**UI**
- **“Become a provider”** flow: form (CNIC, name, phone, location, address, what you offer); submit → society admin approves (reuse or mirror join-request flow for “provider in this society”).
- **Services dashboard**: “My services” (provider): add/edit, set availability, see requests. “Find services” (requester): search by location/category, request service.
- **Society admin**: “Service providers” / “Approve services” tab.

**Deliverables**
- Provider registers with CNIC/location; society admin approves; provider dashboard and requester flow work; deployable on Netlify.

---

### Phase 5 — Global disaster & transparent relief

**DB**
- **DonationCampaign**: add optional `triggerType` (MANUAL, AI_DISASTER, etc.), `relatedEventId` or `metadata` (JSON) for disaster details; already has level GLOBAL.
- Optional: **DisasterEvent** (title, description, region, neededPeople, neededAmount, status, createdAt); DonationCampaign links to it.

**API**
- **POST /api/global/disaster-alert** (admin or AI): create DisasterEvent; optionally auto-create DonationCampaign (GLOBAL, target amount, transparent).
- **GET /api/global/campaigns**: list global campaigns (including disaster-driven); include raised amount and use-of-funds summary.
- **POST /api/donations**: already exists; ensure campaign has public ledger (GET endpoint for allocations/spending).

**UI**
- **Global dashboard**: “Disaster / Relief” section; AI or admin can add “Disaster: X — Y people, Z fund needed”; show “Donate” and “Transparent use of funds”.
- **Notifications**: “New global relief campaign: …” to users (or to selected regions).

**Deliverables**
- Disaster/event → campaign creation; public donations; transparent fund usage visible; Netlify OK.

---

### Phase 6 — AI suggestions for every problem

**API**
- **POST /api/ai/analyze** (existing): extend to “suggest solutions” for a proposal or issue (e.g. pass proposalId or issue text; return bullet points).
- **GET /api/proposals/[id]** (or similar): include `aiSuggestions` (or fetch on demand) and show in UI.

**UI**
- Proposal/issue detail page: “AI suggestions” section; button “Get AI solutions”; show suggestions in a clear box.
- AI Assistant: “Suggest solutions for this problem” input; same backend.

**Deliverables**
- Every major “problem” (proposal, issue) can get AI-powered suggestions; deploy unchanged.

---

### Phase 7 — Game (Coming soon)

**DB**
- None required for “Coming soon”.

**API**
- Optional: **GET /api/game** returning `{ status: "coming_soon", description: "…" }`.

**UI**
- **Dashboard** or new **Game** item in sidebar: card “Governance & Science Game — Coming soon” with 2–3 lines: e.g. “Play to explore real-world scientific and governance solutions. Launching soon.”
- Optional: “Notify me” email or in-app signup for when game launches.

**Deliverables**
- Everyone sees what the game will be about; no full game build yet; platform stays deployable.

---

## Part 5 — Netlify Deploy (Best Practice)

- **Build**: keep `prisma generate && next build`; no `prisma db push` in build (run once locally or in CI if needed).
- **Env**: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL (no trailing slash).
- **Runtime**: all auth and DB routes use `runtime = "nodejs"`.
- **Suspense**: any page using `useSearchParams()` wrapped in `<Suspense>`.
- After each phase: run `npm run build` and fix type/lint errors; then push and deploy to Netlify.

---

## Part 6 — Next Steps (Reality)

1. **Implement Phase 0** (login + hierarchy hardening) first; deploy to Netlify and confirm.
2. Then **Phase 1** (profile + CNIC + address); then **Phase 2** (join request + approval).
3. Proceed in order: Phase 3 → 4 → 5 → 6 → 7, with a quick deploy check after each.
4. Keep **UPGRADE-PLAN.md** updated as you complete each phase (e.g. “Phase 0 done”, “Phase 1 in progress”).

This plan turns the full vision (banking hierarchy, Binance-like transparency, Facebook-like profile, Uber-like services, admin control, global disaster + AI + transparent funds, AI suggestions, game coming soon) into a clear, step-by-step reality while keeping login and hierarchy best and Netlify deploy solid.

---

## Implementation status (Phases 0–7 complete)

**Phase 0:** Auth helpers (`src/lib/auth-helpers.ts`), PATCH /api/users now requires auth and only allows updating own profile.

**Phase 1:** User has `cnic` and `address` in Prisma; register and profile edit (and API) support both; GET /api/users returns them.

**Phase 2:** `SocietyJoinRequest` model (PENDING/APPROVED/REJECTED); POST/GET `/api/societies/[id]/join-request`, PATCH `/api/societies/[id]/join-request/[requestId]` (approve/reject). Society browse: “Request to join” / “Pending approval” / “View Dashboard”. Society admin: “Join Requests” in sidebar and on dashboard; approve/reject from `/society/join-requests?societyId=...`.

**Phase 3:** Wallet type includes CITY, COUNTRY, GLOBAL; Transaction has optional level. Wallet page shows Account hierarchy and transaction level badge.

**Phase 4:** Service has societyId, approvedBySociety. GET /api/societies/[id]/services, PATCH /api/services/[id]. Society dashboard Service Providers; /society/services for pending and approved.

**Phase 5:** DonationCampaign triggerType. Global dashboard Disaster & Relief card.

**Phase 6:** suggestSolutions in gemini; POST /api/ai/suggest. AI Assistant and society voting Get AI suggestions.

**Phase 7:** Dashboard Governance & Science Game Coming soon card.

**After pulling this code, run:**
```bash
npx prisma generate
npx prisma db push
```
Then restart dev server or redeploy to Netlify.
