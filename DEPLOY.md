# Deploy: GitHub + Netlify

**Repo:** [futureworldvision842-lgtm/futureworldplatoform](https://github.com/futureworldvision842-lgtm/futureworldplatoform)

---

## 1. Push to GitHub

**Sabse aasan:** Project folder mein **`push-to-github.bat`** double-click karein. Ye script apne aap:
- `git init` (agar .git nahi hai)
- `git add .` + `git commit`
- `origin` = `https://github.com/futureworldvision842-lgtm/futureworldplatoform.git`
- `git push -u origin main`

Pehli dafa push pe GitHub login/credentials maangega (browser ya Git Credential Manager).

**Manual:** Terminal mein:
```bash
cd "E:\Muhammad's Work VP automation\mq prject\Platform Project"
git init
git add .
git commit -m "Deploy: GAIGS platform"
git branch -M main
git remote add origin https://github.com/futureworldvision842-lgtm/futureworldplatoform.git
git push -u origin main
```

---

## 2. Netlify par upload (deploy)

### One-click (GitHub connect)

1. Is link pe jao: **[Deploy to Netlify – futureworldplatoform](https://app.netlify.com/start/deploy?repository=https://github.com/futureworldvision842-lgtm/futureworldplatoform)**  
2. **Connect to GitHub** / **Authorize Netlify** (agar pehli baar ho).
3. Repo **futureworldplatoform** select ho chuka hoga. **Build command:** `npm run build` (default theek hai).
4. **Add environment variables** → **Add variable** → add karo:
   - `NEXTAUTH_SECRET` – koi bhi lambi random string (e.g. 32+ characters).
   - `NEXTAUTH_URL` – pehle `https://random-name.netlify.app` chhod sakte ho; deploy ke baad apna site URL daal dena.
5. **Deploy site** pe click karo. Build complete hone ke baad site live ho jayegi.

### Ya Netlify Dashboard se

1. [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project**.
2. **GitHub** choose karo, repo **futureworldplatoform** select karo.
5. Netlify Next.js detect karega. **Build command:** `npm run build` (default).
6. **Add environment variables** mein ye add karo:
   - `NEXTAUTH_SECRET` – a long random string (e.g. from `openssl rand -base64 32` or a password generator).
   - `NEXTAUTH_URL` – your live site URL, e.g. `https://your-site-name.netlify.app` (you can update this after the first deploy).
   - If you use a **database in production**, set `DATABASE_URL` (e.g. Supabase, PlanetScale).  
     Note: The default Prisma setup uses SQLite (`file:./dev.db`), which is not suitable for Netlify’s serverless environment; use a hosted DB for production.
7. **Deploy site** click karo. Site `https://<site-name>.netlify.app` par live ho jayegi.

---

## 3. Deploy ke baad

- Update **NEXTAUTH_URL** in Netlify to your final URL (e.g. `https://your-site-name.netlify.app`).
- For production auth and data, configure a real database and set **DATABASE_URL** in Netlify environment variables, then redeploy.
