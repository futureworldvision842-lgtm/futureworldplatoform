# Netlify Site Open Nahi Ho Rahi? (Fix)

**Yaad rahe: pehle localhost par test karo, jab sab theek ho tab hi push karo.**  
Jab push karo tab Netlify nayi deploy lagata hai. Agar site open nahi ho rahi (blank / error), ye steps follow karo.

---

## 1. Netlify Dashboard Check karo

1. **https://app.netlify.com** → apna site select karo.
2. **Deploys** tab → sabse latest deploy pe click karo.
3. **Build log** dekho:
   - Agar **"Build failed"** hai → neeche "Build fail kyon?" padho.
   - Agar **"Published"** hai lekin site blank/error → **"Runtime / env"** check karo (step 2).

---

## 2. Environment Variables (Zaroori)

**Site settings** → **Environment variables** → ye **3** honi chahiye:

| Key | Value |
|-----|--------|
| `DATABASE_URL` | Postgres connection string (postgresql://...) – Neon ya Netlify wala |
| `NEXTAUTH_SECRET` | Strong random string (e.g. `node scripts/generate-secret.js` se) |
| `NEXTAUTH_URL` | **Apne site ka exact URL – bina trailing slash**<br>Example: `https://your-site-name.netlify.app` |

**NEXTAUTH_URL galat hai to login/auth kaam nahi karega.** Deploy ke baad **Trigger deploy** ek bar phir chala do taake nayi env load ho.

---

## 3. Ab Jo Code Change Kiye Gaye (Is Push Ke Saath)

- **netlify.toml** mein **@netlify/plugin-nextjs** add kiya – Next.js SSR/API/auth sahi chalegi.
- **next.config.js** mein production origins add kiye – Netlify URL se server actions chalenge.
- **package.json** mein plugin devDependency add ki – build consistent rahegi.

---

## 4. Ab Kya Karo

1. **Ye changes push karo** (agar abhi tak nahi kiye):
   ```bash
   node do-push-now.js
   ```
2. Netlify **automatically nayi deploy** shuru karega.
3. **Deploys** → latest deploy ka **Build log** dekho – koi error to nahi.
4. Build success ke baad **site URL** open karo (e.g. `https://your-site.netlify.app`).
5. Agar phir bhi blank/error: **Site settings** → **Environment variables** → **NEXTAUTH_URL** sahi hai na? Phir **Trigger deploy** → **Clear cache and deploy site**.

---

## 5. Agar Build Fail Ho

Build log mein error copy karo. Common:

- **"DATABASE_URL" / Prisma** → Netlify env mein `DATABASE_URL` set karo (Neon connection string).
- **Module not found** → Repo mein `npm install` / `package.json` theek hai na, phir **Clear cache and deploy**.

Is file ko bhi dekh sakte ho: **LOGIN-FIX-BABY-STEPS.md**, **SETUP-AND-DEPLOY.md**.
