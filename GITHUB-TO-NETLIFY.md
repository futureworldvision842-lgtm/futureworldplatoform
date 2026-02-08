# GitHub push → Netlify par 100% deploy (step-by-step)

Isi order mein karo. Pehle code GitHub par push, phir Netlify par same repo connect + env vars, phir deploy.

---

## Step 1: Code GitHub par push karo

1. Project folder kholo: `E:\Muhammad's Work VP automation\mq prject\Platform Project`
2. **Double-click** `push-to-github.bat` (File Explorer se).  
   **Ya** terminal se:  
   - **PowerShell** mein: `.\push-to-github.bat` ya `node do-push-now.js`  
   - **CMD** mein: `push-to-github.bat` ya `node do-push-now.js`
3. Jab "Done" / "Pushing to GitHub" success dikhe, repo yahan open karo:  
   **https://github.com/futureworldvision842-lgtm/futureworldplatoform**
4. Latest commit dikh raha ho to Step 2 par jao.

---

## Step 2: Netlify par site GitHub se connect karo

1. **https://app.netlify.com** → login
2. **Add new site** → **Import an existing project**
3. **GitHub** choose karo → **Authorize** (agar pehle se na ho)
4. Repo list se **futureworldplatoform** (futureworldvision842-lgtm) select karo
5. Netlify khud detect karega: **Next.js**, build command `npm run build`, publish dir `.next` (plugin set karega)
6. **Site name** jo chaho (e.g. futureworld-platform) — ya default rahne do
7. **Environment variables** abhi **skip** karo (next step mein add karenge)
8. **Deploy site** pe click karo — pehli baar build **fail** ho sakti hai jab tak env vars nahi daaloge; theek hai

---

## Step 3: Netlify par 3 env variables (zaroori)

1. Apne site par jao → **Site configuration** (ya **Site settings**) → **Environment variables**
2. **Add a variable** / **Add environment variables** → **Add a single variable** (ya **Add one by one**)

Ye **3** add karo:

| Key | Value |
|-----|--------|
| `DATABASE_URL` | Neon Postgres connection string. Netlify ne **Neon** add kiya hai to **NETLIFY_DATABASE_URL** ki value **copy** karo (reveal → copy). Wahi value yahan paste karo. Ya Neon dashboard (neon.tech) → Connection string copy karo. |
| `NEXTAUTH_SECRET` | Koi bhi 32+ character secret. Example: `my-super-secret-key-12345-change-in-production` |
| `NEXTAUTH_URL` | Aapki live site URL **bina trailing slash**. Example: `https://futureoworldvision.netlify.app` (end pe `/` mat rakho) |

3. **Save** karo. **Trigger deploy** (Deploys → Trigger deploy → Deploy site) zaroor chalao taake nayi env vars use hon.

---

## Step 4: Deploy chalao / dobara chalao

1. **Deploys** tab → **Trigger deploy** → **Deploy site** (ya **Clear cache and deploy site**)
2. Build complete hone do (2–5 min). **Published** aane par site live hai.
3. Site URL open karo: `https://your-site-name.netlify.app`

---

## Summary

| Step | Kya karna hai |
|------|----------------|
| 1 | `push-to-github.bat` ya `node do-push-now.js` — code GitHub par |
| 2 | Netlify: Add site → Import from GitHub → repo **futureworldplatoform** |
| 3 | Netlify: **DATABASE_URL**, **NEXTAUTH_SECRET**, **NEXTAUTH_URL** add karo |
| 4 | **Trigger deploy** chalao → site 100% chalni chahiye |

---

## Agar build fail ho

- **Type error / session null:** Ab fix ho chuka hai (profile edit, profile, society pages). Latest code push karke dobara deploy karo.
- **DATABASE_URL missing:** Build chal sakti hai lekin login/signup error de sakta hai. Step 3 check karo.
- **Site not found:** Netlify mein **same repo** use ho raha ho: **futureworldvision842-lgtm/futureworldplatoform** (futureworldplatoform, **-10f26** wala nahi).

Build command project mein already sahi hai: `prisma generate && next build` (db push build time par nahi hota).
