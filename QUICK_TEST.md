# Quick Testing Guide

## 🚀 Fast Test Commands

### Test Different Tiers

```bash
# Test Founders tier (75% off - $9.75)
curl https://unfriction.app/api/test/purchase-count?count=5
curl https://unfriction.app/api/pricing

# Test Early tier (50% off - $19.50)
curl https://unfriction.app/api/test/purchase-count?count=15
curl https://unfriction.app/api/pricing

# Test Launch tier (25% off - $29.25)
curl https://unfriction.app/api/test/purchase-count?count=30
curl https://unfriction.app/api/pricing

# Test Full price ($39.00)
curl https://unfriction.app/api/test/purchase-count?count=60
curl https://unfriction.app/api/pricing
```

### Simulate Purchase

```bash
# Simulate a purchase (updates profile to lifetime)
curl -X POST https://unfriction.app/api/test/webhook \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Check Profile

```bash
# Check if profile was updated
curl -X POST https://unfriction.app/api/profile \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Test Success Page

Just visit: `https://unfriction.app/success?email=test@example.com`

### Run Full Test Script

```bash
./test-flow.sh
```

---

## 🎯 What Each Test Does

1. **Purchase Count Test** - Mocks how many people have bought (for testing different discount tiers)
2. **Webhook Test** - Simulates Polar sending a payment confirmation (updates your Supabase profile)
3. **Profile Test** - Checks if the profile was updated correctly
4. **Success Page** - Shows the thank you page after purchase

---

## 📋 Complete Test Checklist

- [ ] Set purchase count to 5 → Check pricing shows $9.75
- [ ] Click "Unlock Lifetime" → Should redirect with FOUNDER75 discount
- [ ] Simulate purchase → Profile should update to lifetime
- [ ] Visit success page → Should show confirmation
- [ ] Test different tiers (15, 30, 60) → Pricing should change
- [ ] Clear mock count → Should use real Polar API

---

**Full guide:** See `TESTING_GUIDE.md` for detailed scenarios

