# Assets Specification Guide

Complete guide for creating and adding assets to your Unfriction landing page.

## 📹 Videos

### Hero Demo (`/public/media/hero-demo.mp4`)

**Specifications:**
- **Duration**: 5-7 seconds (looping)
- **Resolution**: 1080×640 (or 16:9 aspect ratio)
- **Format**: MP4 (H.264 codec)
- **Audio**: Muted
- **Size**: ~1MB max
- **Content**: Show the app launching and quick note capture

**How to Create:**
1. Record screen at 1920×1080 or higher
2. Trim to 5-7s best moment
3. Crop to 1080×640 or 16:9
4. Convert/compress to MP4:

```bash
ffmpeg -i input.mov -vf "scale=1080:-1" -c:v libx264 -pix_fmt yuv420p -crf 23 -an hero-demo.mp4
```

**GIF to MP4 Conversion:**
```bash
ffmpeg -i input.gif -vf "scale=1080:-1" -c:v libx264 -pix_fmt yuv420p -crf 23 hero-demo.mp4
```

---

### Demo Video (`/public/media/demo-quick.mp4`)

**Specifications:**
- **Duration**: 5-10 seconds
- **Resolution**: 1080p or higher
- **Format**: MP4 (H.264)
- **Audio**: Optional (muted by default)
- **Size**: <2MB
- **Content**: Full feature walkthrough

**How to Create:**
Same process as hero video, just longer duration.

---

## 📸 Screenshots

### Requirements (All 3 Screenshots)

**Filenames:**
- `/public/media/ss-1.png` — "Instant overlay"
- `/public/media/ss-2.png` — "Auto-saves"
- `/public/media/ss-3.png` — "Lock-aware behaviour"

**Specifications:**
- **Resolution**: 1024×640 (or similar 16:10)
- **Format**: PNG or WebP
- **Size**: <200KB each
- **Content**:
  - ss-1: Show app overlay appearing
  - ss-2: Show auto-save indicator
  - ss-3: Show lock screen behavior

**How to Create:**
1. Take screenshots at 2×resolution (2048×1280)
2. Crop to highlight feature
3. Compress with [Squoosh](https://squoosh.app/)
4. Target <200KB with WebP or optimized PNG

---

## 🎨 Graphics

### Notarization Badge (`/public/media/notarized-badge.svg`)

**Specifications:**
- **Format**: SVG
- **Size**: Ideally <5KB
- **Colors**: Match brand (teal-500 accent)
- **Content**: Shield or checkmark icon

**Example SVG:**
```svg
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" rx="8" fill="#0EA5A4" fill-opacity="0.1"/>
  <path d="M20 8L28 14L20 20L12 14L20 8Z" fill="#0EA5A4"/>
  <path d="M16 18L18 20L24 14" stroke="#0EA5A4" stroke-width="2" stroke-linecap="round"/>
</svg>
```

---

## 🏷️ Logo (`/public/logo-unfriction.svg`)

**Current**: Placeholder teal diamond (replace!)

**Specifications:**
- **Format**: SVG
- **Size**: 32×32 display, but create at 64×64 or vector
- **Colors**: Match brand
- **Style**: Simple, recognizable icon

**How to Create:**
1. Design in Figma/Sketch/Illustrator
2. Export as SVG
3. Optimize with [SVGOMG](https://jakearchibald.github.io/svgomg/)
4. Place in `/public/logo-unfriction.svg`

---

## 🖼️ Open Graph Image (`/public/og-unfriction-1200x630.png`)

**Specifications:**
- **Resolution**: 1200×630 (exact)
- **Format**: PNG or JPG
- **Size**: <500KB
- **Content**:
  - App name: "Unfriction"
  - Tagline: "Instant notes. Zero friction."
  - Visual: App screenshot or icon
  - Background: Clean gradient or solid

**How to Create:**

### Option 1: Figma Template
1. Create 1200×630 frame
2. Add your logo, headline, visual
3. Export as PNG at 2×
4. Compress to <500KB

### Option 2: Online Generator
- [Bannerbear](https://www.bannerbear.com/demos/og-image-generator/)
- [OG Image Generator](https://og-image.vercel.app/)

**Template Layout:**
```
┌────────────────────────────────────┐
│                                    │
│   Logo   Unfriction                │
│                                    │
│   Instant notes.                   │
│   Zero friction.                   │
│                                    │
│   [Screenshot or visual]           │
│                                    │
│   Launches in <400ms               │
│                                    │
└────────────────────────────────────┘
```

---

## 🔧 Tools & Resources

### Video Editing
- **ScreenFlow** (Mac) — Best for screen recording
- **QuickTime** (Mac) — Free screen recording
- **OBS** (Cross-platform) — Free, powerful
- **FFmpeg** (CLI) — Format conversion

### Image Optimization
- **Squoosh** — https://squoosh.app/
- **TinyPNG** — https://tinypng.com/
- **ImageOptim** (Mac) — https://imageoptim.com/

### SVG Optimization
- **SVGOMG** — https://jakearchibald.github.io/svgomg/

### Design Tools
- **Figma** — Best for OG images and graphics
- **Canva** — Quick templates
- **Sketch** — Mac-only design tool

---

## 📋 Asset Checklist

Before deploying, ensure you have:

### Videos
- [ ] `hero-demo.mp4` (5-7s, 1080×640, <1MB)
- [ ] `demo-quick.mp4` (5-10s, 1080p, <2MB)

### Screenshots
- [ ] `ss-1.png` — "Instant overlay"
- [ ] `ss-2.png` — "Auto-saves"
- [ ] `ss-3.png` — "Lock-aware behaviour"

### Graphics
- [ ] `notarized-badge.svg`
- [ ] `logo-unfriction.svg` (replace placeholder)
- [ ] `og-unfriction-1200x630.png`

### Placement
- [ ] All videos in `/public/media/`
- [ ] Logo in `/public/`
- [ ] OG image in `/public/`

---

## ⚡ Quick Commands

### Convert GIF to optimized MP4
```bash
ffmpeg -i input.gif -vf "scale=1080:-1" -c:v libx264 -pix_fmt yuv420p -crf 23 output.mp4
```

### Compress video
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow output.mp4
```

### Convert MOV to MP4
```bash
ffmpeg -i input.mov -c:v libx264 -pix_fmt yuv420p -crf 23 -c:a aac output.mp4
```

### Add mute to video
```bash
ffmpeg -i input.mp4 -c:v copy -an output-muted.mp4
```

---

## 🎯 Priority Order

If you don't have all assets yet, create them in this order:

1. **Logo** — Most visible, needed for brand
2. **Hero video** — Key selling point
3. **OG image** — For social sharing
4. **Demo video** — Showcases features
5. **Screenshots** — Nice to have
6. **Notarization badge** — Can use placeholder SVG

---

## 💡 Tips

- **Videos**: Show real usage, not just animations
- **Screenshots**: Capture at 2× resolution for Retina displays
- **Compress everything**: Page should load in <2 seconds
- **Test on mobile**: Videos should be responsive
- **Use placeholders**: Missing assets won't break the site

---

Need help? Email support@unfriction.app

