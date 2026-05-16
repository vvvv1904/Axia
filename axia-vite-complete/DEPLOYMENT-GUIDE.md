# Axia — Deploy to Vercel (3 Steps)

> Convex backend: `https://agile-ladybug-573.convex.cloud` — already running, no changes needed.

---

## Step 1: Push Latest Code to GitHub

You already pushed. If you made local changes since:

```bash
cd axia-vite
git add .
git commit -m "SEO + security updates"
git push
```

## Step 2: Deploy on Vercel

1. Go to **vercel.com/new**
2. Import your `axia-vite` GitHub repo
3. Vercel auto-detects Vite — keep defaults
4. **Add Environment Variable** (important!):
   - Name: `VITE_CONVEX_URL`
   - Value: `https://agile-ladybug-573.convex.cloud`
   - Check all 3: Production, Preview, Development
5. Click **Deploy**

That's it. Your site is live.

## Step 3: Push Convex Backend (if you changed it)

Only needed if you modified `convex/` files:

```bash
npx convex deploy
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Site says "demo mode" | Vercel Dashboard → Settings → Environment Variables → add `VITE_CONVEX_URL` = `https://agile-ladybug-573.convex.cloud`, then Redeploy |
| Build fails | Run `npm run build` locally first to find errors |
| Old site still shows | Hard refresh (Ctrl+Shift+R) or open in incognito |

---

## Security & SEO Included

**Security headers** (in `vercel.json`):
- HSTS, CSP, X-Frame-Options DENY, X-Content-Type-Options, XSS Protection, Referrer-Policy, Permissions-Policy

**SEO** (in `index.html`):
- Title, meta description, keywords, Open Graph, Twitter cards, JSON-LD structured data, canonical URL, robots.txt, sitemap.xml, theme-color

**Semantic HTML** (in `App.tsx`):
- Single H1 in hero, H2 per section, H3 for features/tiers, aria-labels on all sections, proper nav/main/footer

**Convex security** (in `convex/waitlist.ts`):
- Email length validation, referral code format validation, blocked test domains, admin key protection
