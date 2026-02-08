# Netlify problems – sab fix (step by step)

---

## Problem 1: "Build script returned non-zero exit code: 2" (build fail)

**Fix:** Code mein already change kar diya – build ab sirf `prisma generate && next build` chalega (db push build se hata diya).

**Tum karo:**
1. Code GitHub par push karo: `node do-push-now.js`
2. Netlify par **Trigger deploy** chalao (Deploys → Trigger deploy).

---

## Problem 2: "Site not found" (404)

**Reason:** Jab tak build success nahi hoti, site publish nahi hoti. Build fix (Problem 1) ke baad deploy success hoga to site dikh jayegi.

---

## Problem 3: Netlify galat repo se deploy kar raha hai (futureworldplatoform-10f26)

**Check karo:** Netlify dashboard → **Site configuration** → **Build & deploy** → **Continuous deployment** → **Repository**.  
Wahan **futureworldvision842-lgtm/futureworldplatoform** hona chahiye (**-10f26** wala nahi).

**Agar galat repo dikhe:**
1. **Link repository** / **Change repository** pe click karo.
2. **futureworldplatoform** (bina -10f26) select karo.
3. Save karo, phir **Trigger deploy** chalao.

---

## Problem 4: Neon database "Expires in 7 days"

**Fix:** Database ko claim karo taake delete na ho.

1. Netlify → apna site → **Integrations** / **Extensions** → **Neon** kholo.
2. **"Claim database"** button pe click karo.
3. Neon account se login/claim karo – iske baad DB active rehegi.

---

## Problem 5: Database tables nahi bani (login/register error)

Pehli baar deploy ke baad tables create karne ke liye **ek baar** ye chalao:

1. Apne PC par project folder kholo.
2. `.env` ya `.env.local` mein **DATABASE_URL** = Neon wali value (wohi jo Netlify par DATABASE_URL mein daali thi).
3. Terminal mein:
   ```bash
   npx prisma db push
   ```
4. Jab "done" dikhe, site par login/register try karo.

---

## Order (sab ek saath)

| Step | Kya karo |
|------|----------|
| 1 | README + build fix already code mein hai. **Push karo:** `node do-push-now.js` |
| 2 | Netlify → **Site configuration** → **Build & deploy** → repo check karo → **futureworldplatoform** (no -10f26) |
| 3 | **Environment variables** mein **DATABASE_URL**, **NEXTAUTH_SECRET**, **NEXTAUTH_URL** set karo (see NETLIFY-BABY-STEPS.md) |
| 4 | **Deploys** → **Trigger deploy** |
| 5 | Build success hone ke baad **Neon** → **Claim database** |
| 6 | Local se **npx prisma db push** (DATABASE_URL set karke) taake tables ban jayein |
| 7 | Site URL kholo – ab "Site not found" nahi aana chahiye |

Bas in order se karo – sab problems address ho jayengi.
