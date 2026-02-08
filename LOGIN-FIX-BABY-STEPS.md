# Login 100% fix – baby steps (Netlify par)

Register chal raha hai, login nahi – ye steps follow karo **bilkul isi order mein**. Next time login zaroor chalega.

---

## Part A: Netlify Environment Variables (sabse zaroori)

### Step 1: NEXTAUTH_URL – trailing slash hatao

1. Netlify → apna site **futureoworldvision** → **Site configuration** → **Environment variables**
2. **NEXTAUTH_URL** wale variable pe click karo (Edit).
3. Value **abhi** hai: `https://futureoworldvision.netlify.app/`  
   **Change karo to:** `https://futureoworldvision.netlify.app`  
   **(End se slash `/` hata do – NextAuth ko bina slash chahiye.)**
4. **Save** karo.

---

### Step 2: NEXTAUTH_SECRET – strong secret set karo

Placeholder secret kabhi-kabhi login fail karwa deta hai. Strong random secret use karo.

**Option A – Online (easy)**  
- Browser mein jao: https://generate-secret.vercel.app/32  
- Jo 32+ character string aaye, **copy** karo.

**Option B – Project se (PowerShell safe)**  
- Project folder mein terminal kholo, phir:  
  `node scripts/generate-secret.js`  
- Jo ek line output aaye (random string), **copy** karo — yahi NEXTAUTH_SECRET ki value hai.

**Netlify par set karo:**  
1. **Environment variables** → **NEXTAUTH_SECRET** → **Edit** (ya delete karke naya banao).  
2. **Value** mein jo abhi copy kiya woh **paste** karo (sirf ek line, no spaces).  
3. **Save** karo.

---

### Step 3: DATABASE_URL – confirm karo

- **DATABASE_URL** already set hai (Neon wala) to **kuch mat badlo**.
- Agar kabhi change karna ho to **Neon** dashboard se connection string copy karke yahan paste karo (same format: `postgresql://...?sslmode=require`).

---

### Step 4: Env vars ke baad deploy zaroor chalao

Env variables change karne ke **baad** naya deploy lazmi hai.

1. Netlify → **Deploys** tab.
2. **Trigger deploy** → **Deploy site** (ya **Clear cache and deploy site**).
3. Build complete hone tak wait karo (2–4 min).
4. Jab **Published** dikhe, tab login try karo.

---

## Part B: Code side (agar abhi bhi login fail ho)

Yeh cheezein project mein **already** add hain. Agar tumne abhi tak latest code push nahi kiya to push karo.

1. **trustHost: true** – `src/lib/auth.ts` (Netlify proxy ke liye).
2. **runtime = "nodejs"** – `src/app/api/auth/[...nextauth]/route.ts` aur `src/app/api/auth/register/route.ts` (bcrypt/Prisma ke liye).

**Push kaise karo:**  
- Project folder mein: `node do-push-now.js` ya `.\push-to-github.bat` (PowerShell).  
- Netlify auto-deploy ho jayega; phir **Part A** ke Step 4 ki tarah confirm karo deploy **Published** hai.

---

## Part C: Login test

1. Site kholo: **https://futureoworldvision.netlify.app** (bina trailing slash)
2. **Register** se naya account banao (agar pehle se nahi hai).
3. **Log out** karo (agar logged in ho).
4. **Login** page pe jao, wahi email/password daalo.
5. **Sign In** dabao – dashboard pe redirect hona chahiye.

---

## Summary checklist

| # | Kya karna hai | Done? |
|---|----------------|-------|
| 1 | NEXTAUTH_URL = `https://futureoworldvision.netlify.app` (**no /** end pe) | ☐ |
| 2 | NEXTAUTH_SECRET = strong random 32+ char (placeholder mat chhodna) | ☐ |
| 3 | DATABASE_URL = Neon connection string (already set to theek hai) | ☐ |
| 4 | Env save ke baad **Trigger deploy** chalao | ☐ |
| 5 | Deploy **Published** hone ke baad login try karo | ☐ |

---

## Agar phir bhi "Sign in failed" aaye

- **Invalid email or password** = galat email/password; wahi use karo jisse register kiya.
- **Configuration / Something went wrong** = NEXTAUTH_URL (no slash) + NEXTAUTH_SECRET + **deploy after env change** dobara check karo.
- Browser **Developer Tools** (F12) → **Console** aur **Network** tab mein koi error dikhe to uski screenshot bhej sakte ho.

Is order mein karo to **next time login pehli baar hi sahi chalega.**
