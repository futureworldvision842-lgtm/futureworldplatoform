# Localhost par Login / Register ke liye — .env setup

Jab tak **DATABASE_URL** sahi set nahi hoga, login aur register **"Database not connected"** dikhate rahenge. Ye steps sirf local test ke liye.

---

## Step 1: Postgres URL lao (free)

**Option A — Neon (recommended, free)**  
1. https://neon.tech par jao → **Sign up** (free).  
2. **New project** banao → region choose karo.  
3. Project open hone ke baad **Connection string** dikhega.  
4. **Copy** karo — jaisa: `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

**Option B — Pehle se Netlify / Neon use karte ho**  
- Netlify → Site → **Environment variables** → **DATABASE_URL** (ya **NETLIFY_DATABASE_URL**) → **Reveal** → value copy karo.  
- Wahi value local `.env` mein use karo (Step 2).

---

## Step 2: .env file mein paste karo

Project root mein **`.env`** file kholo (jahan `package.json` hai).

**Ye line add / update karo** (apne copied URL se replace karo, **koi space ya quotes mat lagao**):

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

Example (fake — apna real wala use karo):

```
DATABASE_URL=postgresql://myuser:mypass123@ep-cool-name-12345.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**.env** mein ye bhi ho to theek (localhost ke liye):

```
NEXTAUTH_SECRET=any-long-random-string-at-least-32-chars
NEXTAUTH_URL=http://localhost:3000
```

Save karo.

---

## Step 3: Database tables banao

Terminal mein (project folder se):

```
npx prisma db push
```

Agar koi error aaye to check karo: `.env` ki line mein `postgresql://` ya `postgres://` **sahi** hai na, aur koi extra space/comma nahi.

---

## Step 4: Dev server dubara chalao

Server band karo (Ctrl+C), phir:

```
npm run dev
```

Browser mein http://localhost:3000 → **Create Account** se naya user banao, phir **Sign In** karo.

---

**Short:** `.env` mein sahi **DATABASE_URL** → `npx prisma db push` → `npm run dev` → register / login theek chalenge.
