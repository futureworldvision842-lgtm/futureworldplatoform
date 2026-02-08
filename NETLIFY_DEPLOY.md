# Netlify par site deploy karo (100% working)

Aapka project **euphonious-mousse-03f8b8** already GitHub se connect hai. Ab sirf **pehla deploy** trigger karo aur **env vars** set karo.

---

## Step 1: Deploy trigger karo

1. Netlify dashboard mein apne project **euphonious-mousse-03f8b8** par jao.
2. **"Trigger deploy"** / **"Deploy site"** / **"Quick setup"** (jo bhi dikhe) pe click karo.
3. **"Clear cache and deploy site"** choose karo (optional, pehli baar theek hai).
4. Build complete hone tak wait karo (2–5 min). Green **"Published"** aane par site live ho jayegi.

---

## Step 2: Environment variables (zaroori)

Site load hone ke baad **login/signup** ke liye ye variables set karo:

1. Project → **Site configuration** (ya **Site settings**) → **Environment variables**.
2. **Add variable** / **Add env var** pe click karo.
3. Ye **3** add karo:

| Key | Value |
|-----|--------|
| `NEXTAUTH_SECRET` | Koi bhi long random string (32+ chars). Example: `my-super-secret-key-12345-change-in-production` |
| `NEXTAUTH_URL` | Aapki live site URL. Example: `https://euphonious-mousse-03f8b8.netlify.app` |
| `DATABASE_URL` | Production DB (step 3 dekho) |

4. **Save** karo, phir **Trigger deploy** dobara chalao taake nayi env vars build mein aayein.

---

## Step 3: Database (login/signup 100% ke liye)

Abhi app **SQLite** use karta hai (local file). Netlify par file-based DB kaam nahi karti, isliye **hosted database** chahiye.

**Option A – Supabase (free, easy)**  
1. [supabase.com](https://supabase.com) → sign up → **New project**.  
2. Project → **Settings** → **Database** → **Connection string** (URI) copy karo.  
3. Format: `postgresql://postgres:[PASSWORD]@...`  
4. Netlify env vars mein add karo: **Key** = `DATABASE_URL`, **Value** = wahi connection string.  
5. Prisma abhi **SQLite** use karta hai; Postgres ke liye schema change + migration chahiye (alag step).

**Option B – Bina DB (sirf static / demo)**  
- `DATABASE_URL` na do. Site **build** ho jayegi aur pages **open** honge, lekin **Login / Signup / API** error de sakte hain.  
- Sirf “site chal rahi hai” dekhna ho to Step 1 + Step 2 (NEXTAUTH_SECRET + NEXTAUTH_URL) kaafi hai; DB optional.

---

## Step 4: Deploy dobara

Env vars add/update ke baad:

1. **Deploys** tab → **Trigger deploy** → **Deploy site**.  
2. Naya deploy complete hone do.  
3. Site URL open karo: `https://euphonious-mousse-03f8b8.netlify.app` (ya jo Netlify ne diya ho).

---

## Summary

| Step | Kya karna hai |
|------|----------------|
| 1 | Netlify par **Trigger deploy** / **Deploy site** chalao |
| 2 | **NEXTAUTH_SECRET** aur **NEXTAUTH_URL** env vars set karo |
| 3 | (Optional) **DATABASE_URL** = Supabase ya koi hosted DB |
| 4 | Env vars ke baad ek aur **Deploy** trigger karo |

Build script already **prisma generate && next build** use karti hai, isliye Netlify par build theek se chalni chahiye.
