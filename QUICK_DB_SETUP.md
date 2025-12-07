# Quick Database Setup Checklist

## ✅ Run This SQL in Supabase SQL Editor

Copy and paste `supabase/migrations/001_create_profiles.sql` into Supabase SQL Editor and run it.

## ✅ Verify Setup

1. **Check Table Exists**
   - Go to Table Editor → `profiles` table should exist

2. **Test Profile Creation**
   ```bash
   curl -X POST http://localhost:3000/api/profile \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

3. **Check Supabase Dashboard**
   - Go to Authentication → Users
   - User should be created
   - Go to Table Editor → profiles
   - Profile row should exist

## ✅ Configure Polar Webhook

1. **In Polar Dashboard:**
   - Settings → Webhooks
   - Add: `https://yourdomain.com/api/webhooks/polar`
   - Events: `order.created`, `order.updated`, `subscription.*`

2. **Add to `.env.local`:**
   ```env
   POLAR_PRODUCT_ID_LIFETIME="your-product-id"
   POLAR_WEBHOOK_SECRET="optional-secret"
   ```

## ✅ Test Webhook (Optional)

Use the test endpoint or simulate a Polar event to verify webhook updates profiles correctly.

---

**Full guide:** See `SUPABASE_SETUP.md` for detailed instructions.

