# Run on localhost – quick setup

**Prisma needs `DATABASE_URL` in a `.env` file** (not only `.env.local`). Follow these steps so `npx prisma generate` and `npx prisma db push` work.

---

### If `npx prisma db push` says "the URL must start with the protocol postgresql://"

Your **`.env`** file has `DATABASE_URL` missing, empty, or invalid.

1. Open **`.env`** in the project root (create it from `.env.example` if needed).
2. Set **one line** with no quotes, no spaces around `=`:
   ```env
   DATABASE_URL=postgresql://user:password@host.neon.tech/neondb?sslmode=require
   ```
3. Replace with **your real** Postgres URL:
   - **Neon:** [neon.tech](https://neon.tech) → your project → **Connection string** → copy and paste.
   - **Netlify:** Site → Environment variables → `DATABASE_URL` or `NETLIFY_DATABASE_URL` → **Reveal** → copy the value (the long `postgresql://...` string) into `.env` as `DATABASE_URL=...`.
4. Save `.env` and run again: `npx prisma db push`.

---

## Step 1: Create `.env` in the project root

1. Copy `.env.example` to a new file named **`.env`** (in the same folder as `package.json`).
2. Open `.env` and set:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
NEXTAUTH_SECRET=your-32-char-secret
NEXTAUTH_URL=http://localhost:3000
```

- **DATABASE_URL** must start with `postgresql://` or `postgres://`.  
  Get it from [Neon](https://neon.tech) → your project → Connection string (or from Netlify env **NETLIFY_DATABASE_URL** – copy the **value**, not the variable name).
- **NEXTAUTH_SECRET**: run `node scripts/generate-secret.js` and paste the output.
- **NEXTAUTH_URL**: use `http://localhost:3000` for local.

---

## Step 2: Generate Prisma client and push schema

In the project folder run:

```bash
npx prisma generate
npx prisma db push
```

If you see *"URL must start with the protocol postgresql://"*, your `.env` is missing or `DATABASE_URL` is wrong. Fix it and run again.

**If you see *"EPERM: operation not permitted, rename ... query_engine-windows.dll.node"*:**  
Something is locking the Prisma engine file (Cursor, Node, antivirus). Use **fix-prisma.bat**: close Cursor and all terminals, then right‑click **fix-prisma.bat** → **Run as administrator**. It removes the old client and runs `prisma generate`. After that, **launch-localhost.bat** will skip generate when the client already exists and start the dev server.

---

## Step 3: Start the app

```bash
npm run dev
```

Open **http://localhost:3000**. Register, log in, and test.

---

**Summary:** Create `.env` with a valid `postgresql://` **DATABASE_URL**, then `npx prisma generate` and `npx prisma db push`, then `npm run dev`.

---

### If you see 404s for `/api/auth/session` or `_next/static/...` or "Can't resolve vendor-chunks"

The Next.js cache can get out of sync (e.g. after a full reload or interrupted build). **Stop the dev server (Ctrl+C)**, then run `npm run dev` again — the script clears `.next` and `node_modules/.cache` before starting. If it still happens, manually delete the `.next` folder in the project root and run `npm run dev`.
