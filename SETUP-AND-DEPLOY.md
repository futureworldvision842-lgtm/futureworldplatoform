# Pura setup aur deploy – word-by-word baby steps

Is doc ko **step-by-step, bilkul order mein** follow karo. Har step complete karke next pe jao. End tak sab theek chalega (build, register, login).

---

## Pehle ye cheezein tayar hon

- GitHub account (futureworldvision842-lgtm)
- Netlify account (netlify.com)
- Neon database (neon.tech) – free Postgres; agar Netlify ne already add kiya hai to use karo

---

# PART 1: Project local par chalana

## Step 1.1 – Project folder kholna

1. File Explorer kholo.
2. Is path pe jao: `E:\Muhammad's Work VP automation\mq prject\Platform Project`
3. Ye hi project folder hai. Yahan se aage sab commands isi folder mein chalani hain.

---

## Step 1.2 – Dependencies install karna

1. Isi project folder mein **right-click** karo → **Open in Terminal** (ya **Open PowerShell window here**).
2. Ye command type karo aur **Enter** dabao:
   ```
   npm install
   ```
3. Jab tak "added XXX packages" na dikhe, wait karo (1–2 min).
4. Agar koi error aaye to screenshot lo; warna next step.

---

## Step 1.3 – Environment file banana (local ke liye)

1. Project folder ke andar dekho: `.env.local` naam ki file honi chahiye. Agar nahi hai to **new file** banao naam: `.env.local`
2. Us file mein ye **teen lines** daalo (apne values se replace karo):

   ```
   DATABASE_URL=postgresql://USER:PASSWORD@HOST/neondb?sslmode=require
   NEXTAUTH_SECRET=my-super-secret-key-12345-change-in-production
   NEXTAUTH_URL=http://localhost:3000
   ```

   - **DATABASE_URL:** Neon dashboard (neon.tech) → apna project → **Connection string** copy karo. Wahi yahan paste karo.
   - **NEXTAUTH_SECRET:** Abhi ke liye jo line upar di hai wahi chhod sakte ho; production (Netlify) pe strong secret use karenge.
   - **NEXTAUTH_URL:** Local ke liye `http://localhost:3000` hi rakhna hai.

3. File **save** karo.

---

## Step 1.4 – Database ready karna

1. Same terminal (project folder) mein ye command chalao:
   ```
   npx prisma generate
   ```
2. Phir ye:
   ```
   npx prisma db push
   ```
3. Dono error ke bina complete honi chahiye. Phir next step.

---

## Step 1.5 – Local par site chalana

1. Terminal mein:
   ```
   npm run dev
   ```
2. Jab "Ready in X ms" dikhe, browser mein jao: **http://localhost:3000**
3. **Register** pe click karo → naya account banao (name, email, password).
4. Phir **Login** karo usi email/password se.
5. Agar dashboard dikh jaye to local setup **theek** hai. Server band karne ke liye terminal mein **Ctrl+C** dabao.

---

# PART 2: GitHub par code push karna

## Step 2.1 – Sirf ek command

1. Project folder mein terminal kholo (jahan `npm run dev` chalaya tha).
2. Ye **sirf ye** type karo aur Enter dabao:
   ```
   node do-push-now.js
   ```
3. Agar pehli baar ho to browser mein GitHub login/authorize ho sakta hai.
4. Jab last line mein **"Done: https://github.com/..."** dikhe, matlab push **success**.
5. Agar "Pull failed" aaye to ye chalao, phir dobara `node do-push-now.js`:
   ```
   git pull origin main --allow-unrelated-histories --no-edit
   ```

**PowerShell mein:** Agar `push-to-github.bat` use karna ho to `.\push-to-github.bat` likhna (dot-backslash ke sath).

---

# PART 3: Netlify par deploy karna

## Step 3.1 – Site connect karna (agar pehle se nahi hai)

1. Browser mein jao: **https://app.netlify.com**
2. Login karo.
3. **Add new site** → **Import an existing project**
4. **GitHub** choose karo, authorize karo agar puche.
5. Repo list se **futureworldplatoform** (futureworldvision842-lgtm) **select** karo.
6. Netlify khud **Next.js** detect karega. Build command aur publish dir **mat badlo** (default theek hai).
7. **Deploy site** pe click karo. Pehli build 2–4 min le sakti hai; env vars abhi add karenge.

---

## Step 3.2 – Environment variables daalna (ye sabse zaroori – login ke liye)

1. Netlify dashboard mein apni site (e.g. **futureoworldvision**) pe jao.
2. **Site configuration** (ya **Site settings**) → **Environment variables** → **Add a variable** / **Add environment variables** → **Add a single variable**.

**Variable 1 – DATABASE_URL**

- **Key:** `DATABASE_URL`
- **Value:** Wahi Neon Postgres connection string.  
  - Agar Netlify ne Neon add kiya hai to **NETLIFY_DATABASE_URL** (ya similar) ki value **reveal** karke **copy** karo.  
  - Ya neon.tech → apna project → **Connection string** copy karo.  
- Format: `postgresql://...?sslmode=require` (ek line, no space).
- **Save** / **Create variable**.

**Variable 2 – NEXTAUTH_SECRET**

- **Key:** `NEXTAUTH_SECRET`
- **Value:** Strong random string (32+ characters). **Placeholder mat use karo.**
  - **Option A:** Browser mein jao: **https://generate-secret.vercel.app/32** → jo string aaye **copy** karo.
  - **Option B:** Project folder mein terminal: `node scripts/generate-secret.js` → jo ek line output aaye **copy** karo.
- **Value** mein wahi paste karo (sirf ek line, no extra space).
- **Save** / **Create variable**.

**Variable 3 – NEXTAUTH_URL**

- **Key:** `NEXTAUTH_URL`
- **Value:** Sirf apni **production** site URL, **bina trailing slash**.  
  Example: `https://futureoworldvision.netlify.app`  
  **Galat:** `https://futureoworldvision.netlify.app/` (end pe `/` nahi hona chahiye.)
- Netlify → **Site overview** mein jo **Site URL** dikhe (e.g. something.netlify.app), usko use karo: `https://that-name.netlify.app`
- **Save** / **Create variable**.

---

## Step 3.3 – Deploy dobara chalaana (zaroori)

Env variables change karne ke **baad** naya deploy lazmi hai.

1. Netlify → **Deploys** tab.
2. **Trigger deploy** → **Deploy site** (ya **Clear cache and deploy site**).
3. 2–4 min wait karo. Jab status **Published** ho jaye, tab next step.

---

## Step 3.4 – Login test karna

1. Browser mein **production** URL kholo: **https://futureoworldvision.netlify.app** (apna site name use karo; **deploy preview URL mat use karo** – jis URL mein random ID ho woh preview hoti hai, us par login fail ho sakta hai).
2. **Register** se naya account banao (agar DB fresh hai), ya pehle se bana hua account use karo.
3. **Login** pe jao, wahi email/password daalo, **Sign In** dabao.
4. Dashboard pe redirect hona chahiye. Agar ho gaya to **login theek** hai.

---

# PART 4: Agar kuch kaam na kare

## Build fail

- Netlify build log dekho. Agar "useSearchParams" ya "session null" jaisa error ho to **latest code** push karo: `node do-push-now.js`, phir Netlify par **Trigger deploy**.

## Register chal raha hai, login nahi

1. **NEXTAUTH_URL** check karo: **bilkul** production URL, **end pe slash nahi**. Edit karke slash hatao, **Save**, phir **Trigger deploy**.
2. **NEXTAUTH_SECRET** check karo: **placeholder mat chhodna**. `node scripts/generate-secret.js` se naya copy karke Netlify mein paste karo, **Save**, phir **Trigger deploy**.
3. Login **sirf production URL** pe try karo (e.g. `https://futureoworldvision.netlify.app`), deploy preview URL pe nahi.

## Push fail (GitHub)

- Terminal mein: `git pull origin main --allow-unrelated-histories --no-edit` chalao. Phir `node do-push-now.js` dobara chalao.

---

# Short checklist (sab kuch theek hai ya nahi)

| # | Kaam | Done? |
|---|------|-------|
| 1 | `npm install` in project folder | ☐ |
| 2 | `.env.local` with DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL=http://localhost:3000 | ☐ |
| 3 | `npx prisma generate` + `npx prisma db push` | ☐ |
| 4 | Local par `npm run dev` → Register + Login test | ☐ |
| 5 | `node do-push-now.js` → "Done" dikhe | ☐ |
| 6 | Netlify: site GitHub repo se connect | ☐ |
| 7 | Netlify: DATABASE_URL, NEXTAUTH_SECRET (strong), NEXTAUTH_URL (no slash) | ☐ |
| 8 | Netlify: **Trigger deploy** → Published | ☐ |
| 9 | Production URL pe Login test (preview URL pe nahi) | ☐ |

Is order mein karo to **setup aur deploy dono theek rahenge, aur login bhi chalega.**
