# Analytics Setup Guide

This landing page includes comprehensive analytics tracking for all your key metrics.

## 📊 Metrics Tracked

### Automatic Metrics (Plausible/Fathom)
- **Page Views** - Total visits to your landing page
- **Unique Visitors** - Number of unique users
- **Bounce Rate** - Percentage of single-page visits
- **Average Session Duration** - How long visitors stay
- **Traffic Sources** - Where visitors come from (referrers, search engines, direct)
- **Device/Browser Breakdown** - Desktop vs mobile, browser types
- **Geographic Data** - Where your visitors are located (country-level)

### Custom Event Tracking
- **Downloads** - Every download button click (`download_initiated`)
- **Demo Clicks** - When users click "Watch demo" (`cta_demo_click`)
- **Email Signups** - Newsletter subscriptions (`email_signup`)
- **Section Views** - When users scroll to Hero, Features, Demo, Pricing sections
- **Scroll Depth** - 25%, 50%, 75%, 100% scroll milestones (conversion funnel drop-off)
- **Time on Page** - Engagement tracking at 30s, 60s, 120s, 300s
- **Exit Intent** - When users try to leave without converting (churn indicator)

## 🚀 Quick Setup

### Option 1: Plausible Analytics (Recommended)

1. **Sign up** at [plausible.io](https://plausible.io)
2. **Add your domain** (e.g., `unfriction.app`)
3. **Set environment variable:**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=unfriction.app
   ```
4. **Deploy** - Analytics will automatically start tracking

**Why Plausible?**
- Privacy-friendly (GDPR compliant, no cookies)
- Clean, simple dashboard
- Affordable ($9/month for 10k pageviews)
- Open source

### Option 2: Fathom Analytics

1. **Sign up** at [usefathom.com](https://usefathom.com)
2. **Create a site** and get your Site ID
3. **Set environment variable:**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_FATHOM_SITE_ID=YOUR_SITE_ID
   ```
4. **Deploy** - Analytics will automatically start tracking

**Why Fathom?**
- Privacy-focused (GDPR compliant)
- Beautiful dashboard
- $14/month for unlimited pageviews
- Great support

### Option 3: Use Both

You can use both simultaneously by setting both environment variables.

## 📈 Understanding Your Metrics

### Conversion Funnel (Churn Rate)
Track how many users drop off at each stage:
1. **Landing Page View** → All visitors
2. **Scroll to Features** → Engaged visitors
3. **Scroll to Demo** → Interested visitors  
4. **Scroll to Pricing** → Serious prospects
5. **Download Click** → Converted users

**Calculate Churn Rate:**
- Hero → Features drop-off: `(hero views - features views) / hero views × 100`
- Features → Demo drop-off: `(features views - demo views) / features views × 100`
- Demo → Pricing drop-off: `(demo views - pricing views) / demo views × 100`
- Pricing → Download drop-off: `(pricing views - downloads) / pricing views × 100`

### Bounce Rate
- **Good:** < 50% (visitors are engaging with your page)
- **Average:** 50-70% (typical for landing pages)
- **High:** > 70% (may need to improve messaging/design)

### Time on Page
- **< 30 seconds:** Visitors didn't find what they wanted
- **30-60 seconds:** Quick skim, may return
- **60-120 seconds:** Engaged, reading content
- **> 120 seconds:** Highly engaged, good conversion potential

### Exit Intent Tracking
When users move their mouse to leave (top of browser), we track this as an exit intent event. High exit intent + no download = opportunity to improve CTA placement or add exit-intent popup.

## 🎯 Key Metrics to Monitor

### Week 1-2: Baseline
- Total page views
- Bounce rate
- Average session duration
- Traffic sources

### Week 3-4: Conversion
- Download click-through rate (CTR)
- Conversion funnel drop-off rates
- Section engagement rates
- Time on page by segment

### Ongoing: Optimization
- A/B test headlines (track which gets more scroll depth)
- Test CTA placement (track click rates)
- Monitor exit intent (when do users leave?)
- Track which traffic sources convert best

## 🔍 Viewing Your Analytics

### Plausible Dashboard
Visit: `https://plausible.io/unfriction.app`
- See all metrics in real-time
- View custom events in "Goals" section
- Export data for deeper analysis

### Fathom Dashboard
Visit: `https://app.usefathom.com`
- Beautiful charts and graphs
- Custom goals (events) section
- Detailed referrer information

## 🛠️ Troubleshooting

### Analytics not tracking?
1. Check environment variables are set correctly
2. Verify domain/site ID is correct
3. Clear browser cache and test
4. Check browser console for errors (should see analytics events in dev mode)

### Events not showing up?
1. Make sure you've deployed with environment variables
2. Check that events are firing in browser console (development mode)
3. Wait a few minutes - some analytics platforms have a slight delay

### Need help?
- Plausible: [docs.plausible.io](https://docs.plausible.io)
- Fathom: [usefathom.com/help](https://usefathom.com/help)

## 📝 Event Reference

All custom events tracked:

```javascript
{
  // Page events
  landing_loaded: 'Page viewed',
  page_view: 'Automatic page tracking',
  
  // Engagement
  section_view: { section: 'hero' | 'features' | 'demo' | 'pricing' },
  scroll_depth: { percentage: 25 | 50 | 75 | 100 },
  time_on_page: { seconds: 30 | 60 | 120 | 300 },
  
  // Actions
  cta_demo_click: 'Demo button clicked',
  cta_download_click: 'Download button clicked',
  download_initiated: { early_user: true },
  email_signup: { email: 'user@example.com' },
  
  // Churn indicators
  exit_intent: 'User tried to leave'
}
```

## 🎉 You're All Set!

Once you've set up your analytics provider and deployed, you'll start seeing data within minutes. Check your dashboard to see real-time metrics and optimize your landing page based on actual user behavior!






