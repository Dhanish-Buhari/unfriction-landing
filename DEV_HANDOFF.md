# Unfriction Landing Page — Developer Handoff

## Overview
Conversion-first landing page redesign for Product Hunt and Reddit launch. This document outlines all implementation tasks, assets, and code snippets needed to complete the transformation.

---

## 🎯 Completed Components

### 1. **Hero Section** (`components/Hero.tsx`)
- ✅ Updated headline: "Instant notes. Zero friction."
- ✅ Updated subhead with OCR mention
- ✅ Micro-CTA line added
- ✅ GIF/video placeholder structure ready
- ✅ CTAs: "Download Free — Early User" and "Watch 57s demo"

### 2. **Key Metrics Row** (`components/KeyMetricsRow.tsx`)
- ✅ New component: Shows "Opens in <400ms • Instant OCR • Notarized DMG"
- ✅ Micro-icons and check badges included

### 3. **Features Grid** (`components/FeaturesGrid.tsx`)
- ✅ Updated to 3 columns: Native Design, Instant Launch, Instant OCR
- ✅ Single-sentence benefits with proof lines
- ✅ Subtle entrance animations (y: +8px -> 0, opacity 0 -> 1)

### 4. **Pricing Section** (`components/Pricing.tsx`)
- ✅ Updated copy and structure
- ✅ Urgency badge: "Not free forever — pricing opens at 1,000 users"
- ✅ "Request early access" button on Pro card
- ✅ Founders Club CTA button
- ✅ Scroll tracking implemented

### 5. **Floating Testimonials** (`components/FloatingTestimonials.tsx`)
- ✅ Header: "Loved by makers"
- ✅ Auto-scroll with snap (4s intervals, easeOutBack easing)
- ✅ Hover pause implemented
- ✅ Click tracking added

### 6. **FAQ** (`components/FAQ.tsx`)
- ✅ 3 questions (already correct)
- ✅ Accordion functionality working

### 7. **Footer** (`components/Footer.tsx`)
- ✅ All links: Support, Privacy, GitHub, Product Hunt
- ✅ Notarized DMG badge
- ✅ Social links included

### 8. **Floating Download CTA** (`components/FloatingDownloadCTA.tsx`)
- ✅ New component: Sticky bottom-right pill
- ✅ Appears after 300px scroll
- ✅ Opens DownloadDMGModal

### 9. **Download DMG Modal** (`components/DownloadDMGModal.tsx`)
- ✅ New component: Installation instructions
- ✅ "Report issues" secondary CTA

### 10. **Founders Club Modal** (`components/FoundersClubModal.tsx`)
- ✅ Email input + motivation textarea
- ✅ Lifetime price lock messaging
- ✅ Analytics tracking ready

---

## 📋 TODO: Assets & Content

### Required Assets

1. **Hero Demo GIF/Video**
   - Path: `/public/media/hero-demo.gif`
   - Specs: 1280×720, 10–12s loop, 8–12fps, optimized WebP fallback
   - Placeholder structure exists — replace with actual asset

2. **Feature Icons** (already using Lucide icons)
   - ✅ Native Design: Sparkles icon
   - ✅ Instant Launch: Gauge icon
   - ✅ Instant OCR: FileText icon

3. **Mobile Hero Screenshot**
   - Optional: 640×360 for mobile preview

---

## 🔧 Implementation Tasks

### Task 1: Hero Video/GIF Integration

**Location**: `components/Hero.tsx` (lines ~145-165)

**Current**: Placeholder structure with fallback
**Action**: Replace placeholder with actual `hero-demo.gif`

```tsx
// Current placeholder code expects:
// /public/media/hero-demo.gif
// Fallback: /public/media/hero-demo.mp4 or /media/Unfriction_Demo_V1_1.mov
```

---

### Task 2: Pricing Badge HTML Snippet

**Copy/paste-ready HTML**:

```html
<div class="pricing-badge" aria-hidden="false" role="note" style="display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;border:1px solid rgba(98,98,120,0.06);background:#fffef8;">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l3 6 6 .5-4.5 4 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8 12 2z" fill="#F6B352"/></svg>
  <span style="font-size:13px;color:#5C5F66">Not free forever — pricing opens at 1,000 users</span>
</div>
```

**Note**: Already implemented in `components/Pricing.tsx` with Tailwind classes.

---

### Task 3: Analytics Event Tracking

**Location**: `lib/analytics.ts`

**Events implemented**:
- ✅ `download_clicked` — All download buttons
- ✅ `demo_played` — Demo video play
- ✅ `join_founders_clicked` — Founders Club CTA
- ✅ `pricing_engaged` — Scroll to pricing section
- ✅ `testimonial_clicked` — Testimonial card clicks

**Plausible Integration**:
All events use `window.plausible()` with props. Ready for production.

**UTM Suggestions**:
- X/Twitter: `?utm_source=x&utm_medium=social&utm_campaign=ph_prelaunch`
- Reddit: `?utm_source=reddit&utm_medium=social&utm_campaign=ph_prelaunch`
- Product Hunt: `?utm_source=producthunt&utm_medium=referral&utm_campaign=launch`

---

### Task 4: SEO Metadata

**Location**: `app/layout.tsx`

**Completed**:
- ✅ Meta title: "Unfriction — Instant overlay notes for macOS | Opens in <400ms"
- ✅ Meta description: "Capture thoughts instantly with Unfriction — launches in <400ms, does OCR from screenshots, notarized DMG. Free for early users."
- ✅ Structured data (JSON-LD) with product info

**Action**: Verify OG image path (`/assets/og-placeholder.png`)

---

### Task 5: CSS Tokens & Styling

**Location**: `app/globals.css`

**Button Styles** (already defined):
- Height: 48px
- Border radius: 12px (rounded-xl)
- Font weight: 700 (font-bold)

**Card Shadows** (implemented):
```css
box-shadow: 2px 10px 30px rgba(20, 20, 30, 0.06), 0 1px 0 rgba(255, 255, 255, 0.02);
```

**Glass Effect**:
```css
background: rgba(255, 255, 255, 0.9);
backdrop-filter: blur(8px);
```

---

### Task 6: Framer Motion Animations

**Component**: `components/FeaturesGrid.tsx`
- Entrance: `y: +8px -> 0, opacity: 0 -> 1, duration: 300ms`

**Component**: `components/FloatingTestimonials.tsx`
- Auto-scroll: `duration: 35s, ease: 'linear'`
- Snap scroll: CSS `scroll-snap-type: x mandatory`
- Hover scale: `scale: 1.05`

**Component**: `components/Pricing.tsx`
- Hover scale: `scale: 1.02`
- Shadow grow on hover

**Floating Badge** (if needed):
- Fade in/out every 6s (subtle)

---

### Task 7: Accessibility

**Completed**:
- ✅ Keyboard focusable buttons (tabIndex, focus-visible)
- ✅ ARIA labels on testimonials
- ✅ Contrast ratios verified (4.5:1 minimum)
- ✅ ESC key handlers for modals
- ✅ `prefers-reduced-motion` support

**Video Accessibility**:
- Demo video: Autoplay muted (no sound)
- Captions: Add `.srt` file if needed for demo video

---

### Task 8: Email Collection Backend

**Location**: `components/FoundersClubModal.tsx`

**Current**: Redirects to `/purchase` stub

**TODO**: Wire to your email service
- Tag as `interested_pro`
- Store email + motivation text
- Send confirmation email

**Example API call**:
```typescript
// In handleSubmit function:
const response = await fetch('/api/founders-club', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email,
    motivation,
    source: 'founders_club_modal',
    tag: 'interested_pro',
  }),
})
```

---

## 🎨 Design Tokens

**Primary Brand Color**: 
- Teal: `#60BEA6` (Tailwind: `teal-500`)
- Buttons: `bg-teal-500 hover:bg-teal-600`

**CTA Buttons**:
- Primary: Dark solid (navy/slate-900) with subtle inset shadow
- Secondary: Outline style

**Typography**:
- Headline (desktop): 72–84px (currently 72px via `text-[72px]`)
- Headline (mobile): 36–48px (currently responsive)
- Text width max: 520px (hero left column)

---

## 📱 Responsive Breakpoints

- Mobile: Default (< 768px)
- Tablet: `md:` prefix (≥ 768px)
- Desktop: `lg:` prefix (≥ 1024px)

---

## 🚀 Deployment Checklist

- [ ] Add `/public/media/hero-demo.gif` asset
- [ ] Verify OG image exists at `/public/assets/og-placeholder.png`
- [ ] Test all download buttons (Hero, Pricing, Floating CTA)
- [ ] Test all modals (Download DMG, Founders Club)
- [ ] Verify analytics events in Plausible dashboard
- [ ] Test on mobile devices
- [ ] Verify keyboard navigation
- [ ] Check `prefers-reduced-motion` behavior
- [ ] Test UTM parameters on share links
- [ ] Wire Founders Club email collection (backend)
- [ ] Set up `/purchase` page or redirect

---

## 🐛 Known Issues / Notes

1. **Hero GIF**: Placeholder structure exists, waiting for asset
2. **Founders Club Modal**: Currently redirects to `/purchase` stub — wire to actual payment/email service
3. **Download DMG Modal**: Opens DMG download — verify DMG file path is correct
4. **Testimonial Auto-scroll**: Uses CSS + Framer Motion — may need fine-tuning for performance

---

## 📞 Support

For questions or issues, contact:
- Email: support@unfriction.app
- GitHub: [unfriction-landing](https://github.com/dhanishbuhari/unfriction-landing)

---

**Last Updated**: 2024-12-26
**Version**: 2.0.0 (Conversion-First Redesign)

