# Supabase Database Setup Guide

This guide walks you through setting up the Supabase database schema, Row Level Security (RLS) policies, and webhook integration for Unfriction.

## Prerequisites

- Supabase project created
- Environment variables configured in `.env.local`
- Access to Supabase SQL Editor

## Step 1: Run Database Migration

1. **Open Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to **SQL Editor**

2. **Run the Migration**
   - Copy the contents of `supabase/migrations/001_create_profiles.sql`
   - Paste into the SQL Editor
   - Click **Run** (or press Cmd/Ctrl + Enter)

3. **Verify Table Creation**
   - Go to **Table Editor**
   - You should see a `profiles` table with the following columns:
     - `id` (UUID, primary key)
     - `email` (text)
     - `plan` (text, default: 'free')
     - `notes_limit` (integer, default: 50)
     - `ocr_limit` (integer, default: 10)
     - `is_early_adopter` (boolean, default: false)
     - `polar_customer_id` (text, nullable)
     - `polar_subscription_id` (text, nullable)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

## Step 2: Verify RLS Policies

The migration automatically creates RLS policies:

- ✅ **Users can view own profile** - Users can only read their own data
- ✅ **Users can update own profile** - Users can update their own data
- ✅ **Service role full access** - Server-side operations have full access

To verify:
1. Go to **Authentication** → **Policies**
2. Find the `profiles` table
3. You should see 3 policies listed

## Step 3: Test Profile Creation

Test that profiles are automatically created when users sign up:

1. **Enable Email Auth** (if not already enabled)
   - Go to **Authentication** → **Providers**
   - Ensure **Email** is enabled
   - Configure magic link settings

2. **Test User Creation**
   - Use the test button in `EmailCapture` component
   - Or call `/api/profile` with an email
   - Check the `profiles` table - a new row should be created automatically

## Step 4: Configure Polar Webhook

1. **Get Your Webhook URL**
   - Your webhook endpoint: `https://yourdomain.com/api/webhooks/polar`
   - For local testing: Use a tool like [ngrok](https://ngrok.com) to expose localhost

2. **Add Webhook in Polar Dashboard**
   - Go to Polar.sh dashboard
   - Navigate to **Settings** → **Webhooks**
   - Add new webhook with URL: `https://yourdomain.com/api/webhooks/polar`
   - Select events to listen for:
     - `order.created`
     - `order.updated`
     - `subscription.created`
     - `subscription.updated`
     - `subscription.canceled`

3. **Add Webhook Secret (Optional but Recommended)**
   - Generate a secret key
   - Add to `.env.local`: `POLAR_WEBHOOK_SECRET=your_secret_here`
   - Update webhook handler to verify signatures (TODO in code)

## Step 5: Environment Variables

Ensure these are set in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Polar (for webhooks)
# IMPORTANT: Use PRODUCT ID, not price ID
# With dynamic pricing, all price tiers ($9, $19, $29, $39) belong to the same product
# Find this in Polar Dashboard → Products → Your Lifetime Product → Copy the Product ID
POLAR_PRODUCT_ID_LIFETIME="your-lifetime-product-id"
POLAR_WEBHOOK_SECRET="your-webhook-secret" # Optional

# Polar Price IDs (for checkout - already configured in lib/polar.ts)
POLAR_PRICE_ID_9="price-id-for-9-dollars"
POLAR_PRICE_ID_19="price-id-for-19-dollars"
POLAR_PRICE_ID_29="price-id-for-29-dollars"
POLAR_PRICE_ID_39="price-id-for-39-dollars"
```

## Step 6: Test the Flow

### Test Profile API
```bash
curl -X POST https://unfriction.app/api/profile \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Expected response:
```json
{
  "userId": "...",
  "plan": "free",
  "notesLimit": 50,
  "ocrLimit": 10,
  "isEarlyAdopter": false
}
```

### Test Webhook (Simulate Polar Event)
```bash
curl -X POST https://unfriction.app/api/webhooks/polar \
  -H "Content-Type: application/json" \
  -d '{
    "type": "order.created",
    "data": {
      "id": "test-order",
      "status": "completed",
      "customer": {
        "email": "test@example.com",
        "id": "customer-123"
      },
      "product": {
        "id": "your-lifetime-product-id"
      }
    }
  }'
```

After webhook fires, check the profile:
- `plan` should be `lifetime`
- `notes_limit` should be `999999`
- `ocr_limit` should be `999999`
- `is_early_adopter` should be `true`

## Troubleshooting

### Profile Not Created Automatically
- Check that the trigger `on_auth_user_created` exists
- Verify the function `handle_new_user()` was created
- Check Supabase logs for errors

### RLS Policy Errors
- Ensure you're using `supabaseAdmin` (service role) for server-side operations
- Check that policies are enabled: `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;`

### Webhook Not Receiving Events
- Verify webhook URL is publicly accessible
- Check Polar dashboard for webhook delivery logs
- Ensure webhook secret matches (if configured)
- Check server logs for errors

## Next Steps

- ✅ Database schema created
- ✅ RLS policies configured
- ✅ Webhook handler ready
- 🔄 Test with real Polar payments
- 🔄 Add webhook signature verification
- 🔄 Set up monitoring/alerts for webhook failures

