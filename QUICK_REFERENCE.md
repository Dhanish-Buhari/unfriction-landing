# Polar.sh Integration - Quick Reference

## 🚀 Quick Start

1. **Set up Polar.sh account and create product/prices** (see `POLAR_SETUP.md`)

2. **Add environment variables to `.env.local`**:
   ```bash
   POLAR_API_KEY=your_key
   POLAR_PRODUCT_ID_LIFETIME=your_product_id
   POLAR_PRICE_ID_9=price_id_9
   POLAR_PRICE_ID_19=price_id_19
   POLAR_PRICE_ID_29=price_id_29
   POLAR_PRICE_ID_39=price_id_39
   ```

3. **Test locally**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/#pricing
   ```

4. **Deploy to Vercel**:
   - Add same environment variables in Vercel dashboard
   - Deploy!

## 📁 File Structure

```
lib/
  └── polar.ts                    # Polar API integration & pricing logic

app/
  ├── actions/
  │   └── checkout.ts            # Server action for checkout redirect
  └── api/
      └── pricing/
          └── route.ts           # API route for pricing state

components/
  └── PricingSection.tsx         # Main pricing UI component

POLAR_SETUP.md                   # Detailed setup instructions
POLAR_IMPLEMENTATION.md          # Full implementation details
```

## 🎯 Pricing Tiers

- **0-9 purchases**: $9 (75% off) - 🔥 Founder Tier
- **10-19 purchases**: $19 (50% off) - ⚡ Early Tier  
- **20-49 purchases**: $29 (25% off) - 🎯 Launch Tier
- **50+ purchases**: $39 (full price) - ✨ Full Price

## 🔧 API Endpoints

- **GET `/api/pricing`** - Returns current pricing state
- **POST `/actions/checkout`** - Redirects to Polar Pay Link

## 📊 How Pricing Updates

1. User visits pricing page
2. Component calls `/api/pricing`
3. API fetches purchase count from Polar
4. Calculates tier based on count
5. Returns pricing state with tier, price, remaining slots
6. UI updates dynamically

## ✅ Checklist

- [ ] Polar.sh account created
- [ ] Lifetime product created in Polar
- [ ] 4 prices created ($9, $19, $29, $39)
- [ ] API key created
- [ ] Environment variables added (local + Vercel)
- [ ] Tested pricing display
- [ ] Tested checkout redirect
- [ ] Verified tier transitions

## 🐛 Common Issues

**Pricing not loading?**
- Check environment variables
- Check browser console
- Verify API endpoint format (may need adjustment)

**Wrong tier displayed?**
- Check Polar purchase count
- Verify tier calculation logic
- Check API response structure

**Checkout not working?**
- Verify price IDs are correct
- Check Polar Pay Links enabled
- Test Polar URL format

## 📚 Documentation

- **`POLAR_SETUP.md`** - Step-by-step Polar setup
- **`POLAR_IMPLEMENTATION.md`** - Full technical details
- **`QUICK_REFERENCE.md`** - This file

---

**Ready to ship?** Follow `POLAR_SETUP.md` and you're good to go! 🚀

