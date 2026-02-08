# Netlify par site chalane ke baby steps (sirf yeh karo)

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

1. Browser mein jao: **https://app.netlify.com**
2. Apna site **euphonious-mousse-03f8b8** kholo (click karo).
3. Left side se **Site configuration** pe click karo.
4. **Environment variables** pe click karo.
5. **"Add a variable"** / **"Add variable"** button pe click karo (teal/green button).
6. **"Add a single variable"** choose karo (agar option aaye).
7. **Key** box mein ye likho (copy-paste):
   ```
   DATABASE_URL
   ```
8. **Value** ke liye: upar jo **NETLIFY_DATABASE_URL** dikh raha hai, us par click karo → **Options** / **Edit** → value **copy** karo (reveal karke). Wahi value **DATABASE_URL** ki **Value** box mein **paste** karo.
9. **Save** / **Create variable** pe click karo.

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
