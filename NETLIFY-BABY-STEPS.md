# Netlify par site chalane ke baby steps (sirf yeh karo)

---

## ⚠️ Agar "New environment variable" screen par ho (Key = DATABASE_URL)

- **Value** box mein **NETLIFY_DATABASE_URL** mat chhodna – ye sirf variable ka naam hai, connection string nahi.
- **Cancel** dabao → Environment variables list par jao → **NETLIFY_DATABASE_URL** pe click karo → value **reveal** karke **copy** karo (postgresql://... wali string).
- Phir dubara **Add a variable** → Key = `DATABASE_URL`, Value = **jo abhi copy kiya woh paste** karo → **Create variable**.

---

## Part 1: Pehle code GitHub par bhejo

1. Cursor ya terminal kholo.
2. Project folder mein jao: `E:\Muhammad's Work VP automation\mq prject\Platform Project`
3. Ye type karo aur Enter dabao:
   ```
   node do-push-now.js
   ```
4. Jab "Done" dikhe, Part 2 par jao.

---

## Part 2: Netlify par 3 variables add karo

### Variable 1 – DATABASE_URL

**Important:** Value box mein **sirf word "NETLIFY_DATABASE_URL" mat likhna.** Wahan **actual connection string** (postgresql://...) paste karni hai. Neeche step-by-step hai.

1. **Pehle value copy karo**  
   - **Environment variables** list mein **NETLIFY_DATABASE_URL** wale variable pe click karo.  
   - Value **reveal** karo (••• ke paas eye icon ya "Options" → "Reveal").  
   - Puri value **copy** karo (woh `postgresql://...` jaisi long string).  
   - Copy ho gayi? Ab neeche wala form bharo.

2. **Naya variable banao**  
   - **"Add a variable"** pe click karo → **"Add a single variable"** (agar aaye).  
   - **Key** box: sirf ye likho (copy-paste):
   ```
   DATABASE_URL
   ```
   - **Values** wale section mein jo box hai (jahan ab "NETLIFY_DATABASE_URL" likha ho sakta hai):  
     - Us box ko **clear** karo.  
     - Ab jo **NETLIFY_DATABASE_URL** ki value copy ki thi (postgresql://... wali), **sirf woh** yahan **paste** karo.  
   - **Scopes:** "All scopes" hi rehne do.  
   - **Secret:** chaaho to "Contains secret values" check kar do (value hide ho jayegi).  
   - Last mein **"Create variable"** pe click karo.

Agar NETLIFY_DATABASE_URL ki value kahin se copy na ho paaye, to **Neon** dashboard (neon.tech) → apna project → **Connection string** se bhi copy kar sakte ho.

### Variable 2 – NEXTAUTH_SECRET

1. Phir se **"Add a variable"** pe click karo.
2. **Key** mein ye likho:
   ```
   NEXTAUTH_SECRET
   ```
3. **Value** mein ye paste karo (ya koi bhi 32+ character secret):
   ```
   gaigs-platform-secret-key-2024-change-this-later
   ```
4. **Save** karo.

### Variable 3 – NEXTAUTH_URL

1. Phir se **"Add a variable"** pe click karo.
2. **Key** mein ye likho:
   ```
   NEXTAUTH_URL
   ```
3. **Value** mein ye likho (apna site name same ho to):
   ```
   https://euphonious-mousse-03f8b8.netlify.app
   ```
   Agar Netlify ne koi aur URL diya ho (e.g. something.netlify.app), to woh wala URL yahan likho.
4. **Save** karo.

---

## Part 3: Deploy chalao

1. Netlify par hi **Deploys** tab pe jao (upar ya left side).
2. **"Trigger deploy"** button dhundho (ya **"Deploy site"** / **"Start deploy"**).
3. Us par click karo.
4. **"Clear cache and deploy site"** choose karo (agar option aaye).
5. 3–5 minute wait karo. Jab **Published** (green) dikhe, site live hai.

---

## Part 4: Site kholo

1. **Site URL** pe click karo (jaise `https://euphonious-mousse-03f8b8.netlify.app`).
2. Homepage load honi chahiye.
3. **Login** / **Register** try karo – ab kaam karna chahiye.

---

## Short checklist

| # | Kya karna hai | Done? |
|---|----------------|--------|
| 1 | Terminal: `node do-push-now.js` chalao | ☐ |
| 2 | Netlify → Site configuration → Environment variables | ☐ |
| 3 | DATABASE_URL add karo (value = NETLIFY_DATABASE_URL wali) | ☐ |
| 4 | NEXTAUTH_SECRET add karo | ☐ |
| 5 | NEXTAUTH_URL add karo | ☐ |
| 6 | Deploys → Trigger deploy | ☐ |
| 7 | Site URL open karo | ☐ |

Bas in 7 steps ko order se karo – sab set ho jayega.
