# Complete Testing Guide - Simulate Purchase Flow

## 🎯 Quick Test Commands

### 1. Test Different Purchase Counts (Tiers)

```bash
# Set purchase count to 5 (75% discount tier)
curl http://localhost:3000/api/test/purchase-count?count=5

# Set purchase count to 15 (50% discount tier)
curl http://localhost:3000/api/test/purchase-count?count=15

# Set purchase count to 30 (25% discount tier)
curl http://localhost:3000/api/test/purchase-count?count=30

# Set purchase count to 60 (full price tier)
curl http://localhost:3000/api/test/purchase-count?count=60

# Clear mock count (use real API)
curl -X DELETE http://localhost:3000/api/test/purchase-count
```

### 2. Check Current Pricing

```bash
# See what tier/price is active
curl http://localhost:3000/api/pricing
```

### 3. Simulate a Purchase (Webhook)

```bash
# Simulate purchase for test@example.com
curl -X POST http://localhost:3000/api/test/webhook \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 4. Test Success Page

Just visit: `http://localhost:3000/success`

Or with email: `http://localhost:3000/success?email=test@example.com`

---

## 🧪 Complete Test Scenarios

### Scenario 1: Test First 10 Purchases (75% Discount)

```bash
# 1. Set purchase count to 5
curl http://localhost:3000/api/test/purchase-count?count=5

# 2. Check pricing (should show $9.75, 75% off)
curl http://localhost:3000/api/pricing

# 3. Click "Unlock Lifetime" button on site
# Should redirect to: https://buy.polar.sh/polar_cl_...?discount_code=FOUNDER75

# 4. Simulate purchase completion
curl -X POST http://localhost:3000/api/test/webhook \
  -H "Content-Type: application/json" \
  -d '{"email":"founder@test.com"}'

# 5. Check profile was updated
curl -X POST http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -d '{"email":"founder@test.com"}'
# Should return: plan: "lifetime", notesLimit: 999999, isEarlyAdopter: true
```

### Scenario 2: Test Next 10 Purchases (50% Discount)

```bash
# 1. Set purchase count to 15
curl http://localhost:3000/api/test/purchase-count?count=15

# 2. Check pricing (should show $19.50, 50% off)
curl http://localhost:3000/api/pricing

# 3. Click "Unlock Lifetime" button
# Should redirect with discount_code=EARLY50

# 4. Simulate purchase
curl -X POST http://localhost:3000/api/test/webhook \
  -H "Content-Type: application/json" \
  -d '{"email":"early@test.com"}'
```

### Scenario 3: Test Next 30 Purchases (25% Discount)

```bash
# 1. Set purchase count to 30
curl http://localhost:3000/api/test/purchase-count?count=30

# 2. Check pricing (should show $29.25, 25% off)
curl http://localhost:3000/api/pricing

# 3. Click "Unlock Lifetime" button
# Should redirect with discount_code=FIRSTFIFTY50
```

### Scenario 4: Test Full Price (50+ Purchases)

```bash
# 1. Set purchase count to 60
curl http://localhost:3000/api/test/purchase-count?count=60

# 2. Check pricing (should show $39.00, no discount)
curl http://localhost:3000/api/pricing

# 3. Click "Unlock Lifetime" button
# Should redirect WITHOUT discount_code parameter
```

---

## 🔍 Verify Everything Works

### Check 1: Pricing API Returns Correct Tier

```bash
curl http://localhost:3000/api/pricing | jq
```

Expected response:
```json
{
  "tier": "FOUNDERS_75",
  "price": 9.75,
  "displayPrice": "$9.75",
  "discount": 75,
  "polarPriceId": "BHW961g1TbEn4CQDVkDTh5EnBJ53aktNYJh7o2Y8sF1|FOUNDER75"
}
```

### Check 2: Webhook Updates Profile

```bash
# Simulate purchase
curl -X POST http://localhost:3000/api/test/webhook \
  -H "Content-Type: application/json" \
  -d '{"email":"verify@test.com"}'

# Check profile
curl -X POST http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -d '{"email":"verify@test.com"}'
```

Expected response:
```json
{
  "userId": "...",
  "plan": "lifetime",
  "notesLimit": 999999,
  "ocrLimit": 999999,
  "isEarlyAdopter": true
}
```

### Check 3: Success Page Shows Correctly

1. Visit: `http://localhost:3000/success`
2. Should see:
   - ✅ Success message
   - ✅ Lifetime access confirmation
   - ✅ Download button
   - ✅ Early adopter badge

### Check 4: Checkout URL Has Correct Discount

1. Set purchase count: `curl http://localhost:3000/api/test/purchase-count?count=5`
2. Click "Unlock Lifetime" button
3. Check browser network tab - should redirect to:
   ```
   https://buy.polar.sh/polar_cl_BHW961g1TbEn4CQDVkDTh5EnBJ53aktNYJh7o2Y8sF1?discount_code=FOUNDER75
   ```

---

## 📧 Testing Email (Optional)

If you want to test email sending:

1. **Check Supabase Auth Email:**
   - User creation triggers email confirmation
   - Check Supabase Dashboard → Authentication → Users
   - Email should be sent automatically

2. **Test Email Capture:**
   - Use the email signup form on the site
   - Check `/api/subscribe` endpoint logs

---

## 🐛 Troubleshooting

### Mock purchase count not working?
- Make sure you're in development mode (`NODE_ENV=development`)
- Check server logs for "[TEST MODE]" message
- Restart dev server after setting mock count

### Webhook test fails?
- Check Supabase connection
- Verify `.env.local` has Supabase credentials
- Check server logs for errors

### Pricing shows wrong tier?
- Clear mock count: `curl -X DELETE http://localhost:3000/api/test/purchase-count`
- Set new count: `curl http://localhost:3000/api/test/purchase-count?count=X`
- Refresh page

### Success page not showing?
- Visit directly: `http://localhost:3000/success`
- Check if page exists: `ls app/success/page.tsx`

---

## 🎬 Full End-to-End Test Script

```bash
#!/bin/bash

echo "🧪 Testing Purchase Flow"
echo ""

# Test 1: First 10 purchases (75% off)
echo "1️⃣ Testing Founders Tier (75% off)..."
curl -s http://localhost:3000/api/test/purchase-count?count=5 > /dev/null
PRICING=$(curl -s http://localhost:3000/api/pricing)
echo "   Pricing: $(echo $PRICING | jq -r '.displayPrice') (should be $9.75)"
echo "   Discount: $(echo $PRICING | jq -r '.discount')% (should be 75%)"
echo ""

# Test 2: Simulate purchase
echo "2️⃣ Simulating purchase..."
WEBHOOK=$(curl -s -X POST http://localhost:3000/api/test/webhook \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}')
echo "   Result: $(echo $WEBHOOK | jq -r '.message')"
echo ""

# Test 3: Verify profile
echo "3️⃣ Verifying profile..."
PROFILE=$(curl -s -X POST http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}')
echo "   Plan: $(echo $PROFILE | jq -r '.plan') (should be 'lifetime')"
echo "   Early Adopter: $(echo $PROFILE | jq -r '.isEarlyAdopter') (should be true)"
echo ""

echo "✅ Test complete! Visit http://localhost:3000/success to see success page"
```

Save as `test-flow.sh`, make executable: `chmod +x test-flow.sh`, then run: `./test-flow.sh`

---

## 📝 Notes

- Mock purchase count only works in development mode
- Mock count resets when server restarts
- Real Polar API is used in production
- Test webhook doesn't actually charge anything
- All test data is in your local Supabase instance

