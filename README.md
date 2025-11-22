# Unfriction Landing Page — Production-Ready Edition

A premium, indie-product landing page for Unfriction — the macOS overlay note app that launches in <400ms.

## ✨ Features

- ⚡ **Premium design** with Apple-esque aesthetics
- 🎥 **Hero video** with MP4 support and fallbacks
- 📱 **Mobile sticky CTA** for better conversions
- 🎭 **Framer Motion animations** with `prefers-reduced-motion` support
- 💳 **Pay-what-you-want pricing** via Gumroad/LemonSqueezy
- 🔒 **Notarization badge** for trust
- 📧 **Email capture** for updates
- 🎨 **Glass-card effects** and hover animations
- ♿ **Fully accessible** with keyboard navigation
- 🚀 **Optimized for performance** with lazy loading

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** with custom utility classes
- **Framer Motion** for animations
- **System font stack** (Inter/SF Pro fallback)

## 📁 Project Structure

```
Unfriction/
├── app/
│   ├── layout.tsx          # Root layout with SEO + preload
│   ├── page.tsx            # Main landing page (all sections)
│   ├── globals.css         # Tailwind + utility classes
│   └── privacy/page.tsx    # Privacy policy
├── components/
│   ├── Nav.tsx             # Top navigation with logo
│   ├── Hero.tsx            # Hero with video + CTAs
│   ├── MobileStickyCTA.tsx # Sticky bottom CTA (mobile only)
│   ├── ValueTrio.tsx       # 3 key values with glass icons
│   ├── FeaturesGrid.tsx    # 6 features with hover effects
│   ├── Demo.tsx            # Demo video + screenshots + lightbox
│   ├── Testimonial.tsx     # Single testimonial with left border
│   ├── Pricing.tsx         # PWYW + notarization badge
│   ├── EmailCapture.tsx    # Newsletter signup
│   ├── Footer.tsx          # Links + social + copyright
│   └── Button.tsx          # Reusable button component
├── lib/
│   ├── analytics.ts        # Analytics tracking helper
│   └── useReducedMotion.ts # Hook for motion preferences
└── public/
    ├── logo-unfriction.svg # Logo (32x32)
    ├── og-unfriction-1200x630.png # OG image
    └── media/              # Video & screenshot assets
        ├── hero-demo.mp4
        ├── demo-quick.mp4
        ├── ss-1.png
        ├── ss-2.png
        ├── ss-3.png
        └── notarized-badge.svg
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

### Build for Production

```bash
npm run build
npm run start
```

## 📦 Required Assets

Place these files in `/public/media/` before deploying:

### Videos
- **hero-demo.mp4** — 5-7s loop, 1080x640, muted, ~1MB
- **demo-quick.mp4** — 5-10s full demo

### Screenshots
- **ss-1.png** — "Instant overlay" (1024×640 or similar)
- **ss-2.png** — "Auto-saves"
- **ss-3.png** — "Lock-aware behaviour"

### Graphics
- **notarized-badge.svg** — Security badge icon

### Root Assets
- **logo-unfriction.svg** — App logo (already has placeholder)
- **og-unfriction-1200x630.png** — Social share image

**Missing assets will show placeholders with instructions.**

## 🔗 Update Gumroad/LemonSqueezy Link

Replace the placeholder link in these files:

1. **components/Hero.tsx** (line 14)
2. **components/MobileStickyCTA.tsx** (line 23)
3. **components/Pricing.tsx** (line 13)

Change:
```tsx
window.open('https://gumroad.com/l/unfriction', '_blank')
```

To your actual product URL.

## 🎨 Customization

### Utility Classes (in `globals.css`)

- `.btn-primary` — Primary CTA button
- `.btn-ghost` — Secondary outline button
- `.glass-card` — Glass morphism card effect
- `.hero-h1` — Large hero headline

### Colors

Using Tailwind's default palette:
- **Accent**: `teal-500` (#0EA5A4)
- **Text**: `slate-900` (#0F172A)
- **Muted**: `slate-500` (#6B7280)

### Animations

All animations respect `prefers-reduced-motion`. To disable:
- Framer Motion detects via `useReducedMotion()` hook
- CSS animations are disabled via media query in `globals.css`

## 📊 Analytics

Comprehensive analytics tracking for all key metrics:

### Automatic Metrics (Plausible/Fathom)
- Page views, unique visitors, bounce rate
- Average session duration, traffic sources
- Device/browser breakdown, geographic data

### Custom Event Tracking
- **Downloads** — Every download button click
- **Demo clicks** — "Watch demo" button interactions
- **Email signups** — Newsletter subscriptions
- **Section views** — Hero, Features, Demo, Pricing engagement
- **Scroll depth** — 25%, 50%, 75%, 100% (conversion funnel drop-off)
- **Time on page** — Engagement at 30s, 60s, 120s, 300s
- **Exit intent** — When users try to leave without converting (churn indicator)

### Setup Analytics

**Plausible** (recommended):
1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Create `.env.local` file:
   ```bash
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=unfriction.app
   ```
4. Deploy - Analytics automatically starts tracking

**Fathom**:
1. Sign up at [usefathom.com](https://usefathom.com)
2. Get your Site ID
3. Create `.env.local` file:
   ```bash
   NEXT_PUBLIC_FATHOM_SITE_ID=YOUR_SITE_ID
   ```
4. Deploy - Analytics automatically starts tracking

**See `ANALYTICS_SETUP.md` for detailed setup and metrics explanation.**

## 🌐 Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

### Manual Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Unfriction landing page v2"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Add Custom Domain** (optional)
   - In Vercel dashboard: Settings → Domains
   - Add your domain (e.g., `unfriction.app`)
   - Follow DNS instructions

### Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## ♿ Accessibility

- All interactive elements have min 44×44px touch targets
- Keyboard navigation support throughout
- ARIA labels on all icon buttons
- Focus rings on all focusable elements
- Semantic HTML structure
- `prefers-reduced-motion` respected

## 🔍 SEO

- Complete meta tags (title, description)
- Open Graph tags for social sharing
- Twitter Card support
- JSON-LD structured data (SoftwareApplication)
- Preloaded hero video for performance
- Semantic HTML5 markup

## ⚡ Performance Tips

1. **Optimize Videos**
   ```bash
   # Convert GIF to MP4 (much smaller)
   ffmpeg -i input.gif -vf "scale=1080:-1" -c:v libx264 -pix_fmt yuv420p -crf 23 hero-demo.mp4
   ```

2. **Compress Images**
   - Use [Squoosh](https://squoosh.app/)
   - Target: <100KB for PNGs, <1MB for videos

3. **Lazy Loading**
   - Below-the-fold images/videos use `loading="lazy"`
   - Hero video is preloaded via `<link rel="preload">`

## 📝 Checklist Before Launch

- [ ] Add all media assets to `/public/media/`
- [ ] Update Gumroad/LemonSqueezy links (3 locations)
- [ ] Replace placeholder logo with actual design
- [ ] Add OG image (1200×630)
- [ ] Set up analytics (Plausible/Fathom)
- [ ] Test on Safari, Chrome, Firefox
- [ ] Test on iOS/Android mobile
- [ ] Verify accessibility (keyboard nav)
- [ ] Run Lighthouse audit
- [ ] Test Gumroad purchase flow
- [ ] Deploy to Vercel
- [ ] Set up custom domain
- [ ] Submit to Product Hunt

## 🐛 Troubleshooting

### Videos Not Loading
- Ensure videos are in `/public/media/`
- Check video format (MP4 with H.264 codec)
- Verify file names match exactly

### Animations Not Working
- Check browser console for errors
- Verify Framer Motion is installed: `npm list framer-motion`
- Test with reduced-motion disabled

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules/.cache
npm run build
```

## 📧 Support

- **Email**: support@unfriction.app
- **Issues**: Open on GitHub (if public repo)

## 📄 License

All rights reserved. © 2025 Dhanish Buhari

---

**Built with ❤️ in Bangalore**

Ready to launch? Run `npm install && npm run dev` 🚀
