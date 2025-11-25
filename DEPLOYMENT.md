# Deployment Guide

## Quick Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Unfriction landing page"
   git remote add origin https://github.com/yourusername/unfriction-landing.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Configure Custom Domain** (Optional)
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain (e.g., unfriction.app)
   - Follow DNS instructions

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Environment Variables

No environment variables are required for the basic setup. If you add analytics:

### For Plausible (Optional)
Add this script to `app/layout.tsx`:
```tsx
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### For Fathom (Optional)
Add this script to `app/layout.tsx`:
```tsx
<script src="https://cdn.usefathom.com/script.js" data-site="YOUR_SITE_ID" defer></script>
```

## Pre-Deployment Checklist

- [ ] Update Gumroad/LemonSqueezy links in:
  - `components/HeroSection.tsx`
  - `components/PricingSection.tsx`
- [ ] Add all media assets to `public/assets/`
- [ ] Replace placeholder favicon (`public/favicon-32.png`)
- [ ] Test locally: `npm run build && npm run start`
- [ ] Update `README.md` with your repository URL
- [ ] Add analytics script (optional)
- [ ] Configure custom domain in Vercel

## Build Settings

Vercel will auto-detect these, but for reference:

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x (specified in `.nvmrc`)

## Post-Deployment

1. **Test the site**
   - Check all CTAs work
   - Test Gumroad/LemonSqueezy link
   - Verify responsive design on mobile
   - Test accessibility (keyboard navigation)

2. **Monitor Analytics**
   - Track `landing_loaded` events
   - Monitor `cta_download_click` conversions
   - Check `download_initiated` analytics

3. **Launch Marketing**
   - Post on X/Twitter with UTM: `?utm_source=twitter&utm_medium=social`
   - Submit to Product Hunt
   - Post in r/macapps
   - Share in relevant communities

## Troubleshooting

### Build Fails
- Check Node version matches `.nvmrc`
- Ensure all dependencies are in `package.json`
- Clear `.next` and `node_modules`, reinstall

### Images Not Loading
- Verify files are in `public/` directory
- Check file paths match exactly
- Ensure images are optimized (<1MB for videos)

### Styles Not Applied
- Check Tailwind config paths
- Verify `globals.css` is imported in `layout.tsx`
- Clear browser cache

## Continuous Deployment

Once connected to GitHub, Vercel automatically:
- Deploys on every push to `main`
- Creates preview deployments for pull requests
- Provides deployment URLs for testing

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Contact: support@unfriction.app









