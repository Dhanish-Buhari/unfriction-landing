# Quick Start Guide

Get your Unfriction landing page running in 5 minutes! ⚡

## Step 1: Install Dependencies

```bash
cd "/Users/dhanishbuhari/Projects/Landing Pages/Unfriction"
npm install
```

⏱️ Takes ~2 minutes depending on internet speed.

## Step 2: Run Development Server

```bash
npm run dev
```

🌐 Open [http://localhost:3000](http://localhost:3000)

You should see the landing page with placeholder content!

## Step 3: Update Product Links

Replace Gumroad/LemonSqueezy URLs in two files:

**File 1: `components/HeroSection.tsx`**
```tsx
// Line 24: Replace this URL
window.open('YOUR_GUMROAD_OR_LEMONSQUEEZY_URL', '_blank')
```

**File 2: `components/PricingSection.tsx`**
```tsx
// Line 12: Replace this URL
window.open('YOUR_GUMROAD_OR_LEMONSQUEEZY_URL', '_blank')
```

## Step 4: Add Your Media (Optional for Testing)

See `ASSETS_CHECKLIST.md` for full list. At minimum, add:

```
public/assets/
  ├── hero-demo.mp4      # Your app demo video
  └── og-placeholder.png # Social media preview image
```

## Step 5: Deploy to Vercel

### Option A: GitHub + Vercel (Recommended)

```bash
# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: Unfriction landing page"

# 4. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/unfriction-landing.git
git push -u origin main

# 5. Go to vercel.com
# - Click "New Project"
# - Import your GitHub repo
# - Click "Deploy"
```

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🎉 That's It!

Your landing page is now live!

### Next Steps:

1. ✅ Add custom domain in Vercel dashboard
2. ✅ Set up analytics (Plausible/Fathom)
3. ✅ Test purchase flow
4. ✅ Launch on social media!

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Run production build locally
npm run lint         # Check for errors

# Deployment
vercel               # Deploy to preview
vercel --prod        # Deploy to production
```

---

## Need Help?

- 📖 Full documentation: See `README.md`
- 🎨 Asset guide: See `ASSETS_CHECKLIST.md`
- 🚀 Deployment guide: See `DEPLOYMENT.md`
- 📧 Questions: support@unfriction.app

---

## Tips for Success

💡 **Test locally first**: Run `npm run build && npm run start` before deploying

💡 **Optimize assets**: Keep videos under 1MB, images under 100KB

💡 **Test on mobile**: 60% of traffic will be mobile

💡 **Set up analytics early**: Track what works from day 1

💡 **Launch with UTM params**: Track where your traffic comes from
   ```
   ?utm_source=twitter&utm_medium=social&utm_campaign=launch
   ```

---

**Ready to ship? Let's go! 🚀**




