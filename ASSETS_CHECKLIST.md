# Assets Checklist

Before deploying, make sure to add these assets to your project:

## Required Assets

### Images & Media

- [ ] **Hero GIF/Video** → `public/assets/hero-demo.mp4`
  - Format: MP4 (convert from GIF for smaller size)
  - Duration: 5-8 seconds loop
  - Size: Under 1MB
  - Resolution: 1920x1080 or similar
  - Command to convert GIF to MP4:
    ```bash
    ffmpeg -i input.gif -vf "scale=1920:-1" -c:v libx264 -pix_fmt yuv420p -crf 23 public/assets/hero-demo.mp4
    ```

- [ ] **Demo Video** → `public/assets/demo-quick.mp4`
  - Format: MP4
  - Duration: 5-12 seconds
  - Size: Under 2MB
  - Resolution: 1920x1080

- [ ] **Screenshot 1** → `public/assets/ss1.png`
  - Caption: "Instant overlay"
  - Size: 1024×640
  - Format: PNG or WebP

- [ ] **Screenshot 2** → `public/assets/ss2.png`
  - Caption: "Auto-saves"
  - Size: 1024×640
  - Format: PNG or WebP

- [ ] **Screenshot 3** → `public/assets/ss3.png`
  - Caption: "Lock-aware behaviour"
  - Size: 1024×640
  - Format: PNG or WebP

- [ ] **Open Graph Image** → `public/assets/og-placeholder.png`
  - Size: 1200×630
  - Format: PNG or JPG
  - Include: App name, tagline, visual
  - Tool: Use Figma, Canva, or https://og-image.vercel.app/

- [ ] **Favicon** → `public/favicon-32.png`
  - Size: 32×32 (also create 16x16, 48x48, 180x180 for various devices)
  - Format: PNG
  - Tool: Use https://realfavicongenerator.net/

- [ ] **Logo SVG** (optional) → `public/assets/logo-unfriction.svg`
  - Format: SVG
  - For footer or header if needed

## How to Optimize Assets

### GIF to MP4 Conversion
```bash
# Install ffmpeg (Mac)
brew install ffmpeg

# Convert GIF to MP4 (much smaller file size)
ffmpeg -i your-file.gif -vf "scale=1920:-1" -c:v libx264 -pix_fmt yuv420p -crf 23 output.mp4

# Add webm version for better browser support
ffmpeg -i your-file.gif -vf "scale=1920:-1" -c:v libvpx-vp9 -b:v 0 -crf 30 output.webm
```

### Image Optimization
- Use [Squoosh](https://squoosh.app/) for PNG/JPG compression
- Use [SVGOMG](https://jakearchibald.github.io/svgomg/) for SVG optimization
- Target: <100KB for images, <1MB for videos

### OG Image Generator
Create a social card with:
```
Title: Unfriction — Instant notes. Zero friction.
Subtitle: A macOS overlay for instant, distraction-free notes
Background: Clean white or gradient
Size: 1200×630
```

Tools:
- https://og-image.vercel.app/
- Figma template: search "Open Graph template"
- Canva: search "Social media card"

## After Adding Assets

1. Update references in code if filenames differ
2. Test all images load properly locally
3. Check file sizes (keep total under 5MB)
4. Verify OG tags show correctly: https://www.opengraph.xyz/
5. Test on mobile devices
6. Run Lighthouse audit for performance

## Asset Integration in Code

Once you have the assets, update these files:

### Hero Video
```tsx
// components/HeroSection.tsx (line ~70)
<video
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover rounded-xl"
>
  <source src="/assets/hero-demo.mp4" type="video/mp4" />
  <source src="/assets/hero-demo.webm" type="video/webm" />
</video>
```

### Demo Video
```tsx
// components/DemoSection.tsx (line ~35)
<video
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover rounded-xl"
>
  <source src="/assets/demo-quick.mp4" type="video/mp4" />
</video>
```

### Screenshots
```tsx
// components/DemoSection.tsx (line ~50)
<img
  src="/assets/ss1.png"
  alt="Instant overlay"
  className="w-full h-full object-cover rounded-xl"
/>
```

## Pro Tips

- Use lazy loading for images below the fold: `loading="lazy"`
- Provide multiple formats (WebP + PNG fallback)
- Use proper alt text for accessibility
- Compress aggressively - landing pages should load in <2 seconds
- Test on slow 3G to ensure good UX

## Need Help?

- Video compression: https://www.freeconvert.com/video-compressor
- Image optimization: https://tinypng.com/
- OG testing: https://www.opengraph.xyz/









