# Setup Instructions

## Prerequisites

Ensure you have Node.js installed:

```bash
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher
```

If not installed:
- **macOS**: `brew install node` or download from [nodejs.org](https://nodejs.org/)
- **Windows**: Download from [nodejs.org](https://nodejs.org/)
- **Linux**: Use your package manager or [nvm](https://github.com/nvm-sh/nvm)

## Installation Steps

### 1. Install Dependencies

```bash
# Navigate to project directory
cd "/Users/dhanishbuhari/Projects/Landing Pages/Unfriction"

# Install all dependencies
npm install
```

This will install:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- TypeScript
- All dev dependencies

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the Unfriction landing page with placeholder content.

### 3. Add Your Assets

Follow the `ASSETS_CHECKLIST.md` to add your media files:

```bash
# Create assets directory (already exists)
# Add your files to public/assets/
# - hero-demo.mp4
# - demo-quick.mp4
# - ss1.png, ss2.png, ss3.png
# - og-placeholder.png
```

### 4. Update Gumroad/LemonSqueezy Links

Edit these files and replace the placeholder URL:

**File: `components/HeroSection.tsx` (line 24)**
```tsx
window.open('YOUR_GUMROAD_LINK_HERE', '_blank')
```

**File: `components/PricingSection.tsx` (line 12)**
```tsx
window.open('YOUR_GUMROAD_LINK_HERE', '_blank')
```

### 5. Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to test the production build.

## Common Issues & Solutions

### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: TypeScript errors

**Solution:**
```bash
# Regenerate type definitions
rm -rf .next
npm run dev
```

### Issue: Styles not applying

**Solution:**
1. Check `tailwind.config.ts` has correct content paths
2. Ensure `globals.css` imports Tailwind directives
3. Clear `.next` cache: `rm -rf .next`
4. Restart dev server

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## File Structure

```
Unfriction/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with SEO
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── privacy/           # Privacy policy page
├── components/            # React components
│   ├── HeroSection.tsx
│   ├── ValueTrio.tsx
│   ├── DemoSection.tsx
│   ├── FeaturesSection.tsx
│   ├── WhySection.tsx
│   ├── PricingSection.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   └── AnimatedSection.tsx
├── lib/                   # Utilities
│   └── analytics.ts       # Analytics helpers
├── public/                # Static assets
│   ├── assets/           # Media files
│   └── favicon-32.png
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind config
├── next.config.js         # Next.js config
└── vercel.json           # Vercel deployment config
```

## Next Steps

1. ✅ Complete setup and verify dev server runs
2. ⬜ Add all assets (see `ASSETS_CHECKLIST.md`)
3. ⬜ Update Gumroad/LemonSqueezy links
4. ⬜ Test locally on multiple devices
5. ⬜ Deploy to Vercel (see `DEPLOYMENT.md`)
6. ⬜ Set up custom domain
7. ⬜ Add analytics (optional)
8. ⬜ Launch! 🚀

## Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Vercel Deployment**: https://vercel.com/docs

## Need Help?

- Check `README.md` for project overview
- See `DEPLOYMENT.md` for deployment guide
- Review `ASSETS_CHECKLIST.md` for asset requirements
- Open an issue on GitHub (if public repo)
- Contact: support@unfriction.app

---

**Ready to build?** Run `npm install && npm run dev` and start customizing! 🎨



