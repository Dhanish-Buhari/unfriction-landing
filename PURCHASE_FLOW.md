# Purchase Flow - Complete Guide

## What Happens When a User Buys

### 1. User Clicks "Unlock Lifetime"
- Button triggers `startLifetimeCheckout()` server action
- System checks current purchase count from Polar API
- Determines which discount tier applies (0-9 = 75%, 10-19 = 50%, 20-49 = 25%, 50+ = full price)
- Builds checkout URL with appropriate discount code

### 2. Redirect to Polar Checkout
- User is redirected to: `https://buy.polar.sh/polar_cl_BHW961g1TbEn4CQDVkDTh5EnBJ53aktNYJh7o2Y8sF1?discount_code=FOUNDER75`
- Discount code is automatically applied (no manual entry needed)
- User completes payment on Polar's secure checkout page

### 3. After Payment Success
**Two things happen simultaneously:**

#### A. Polar Redirects User (if configured)
- Polar may redirect to your success page: `https://unfriction.app/success`
- **Note:** You need to configure this in Polar Dashboard → Checkout Links → Success URL
- If not configured, user stays on Polar's confirmation page

#### B. Polar Sends Webhook (automatic)
- Polar sends `order.paid` event to: `https://unfriction.app/api/webhooks/polar`
- Webhook handler:
  1. Extracts customer email from webhook data
  2. Creates user in Supabase (if doesn't exist)
  3. Updates profile to `lifetime` plan
  4. Sets unlimited notes/OCR limits
  5. Marks as early adopter

### 4. Success Page (`/success`)
- Shows confirmation message
- Displays lifetime access benefits
- Provides download link for Unfriction.dmg
- Shows early adopter badge

## Current Setup Status

✅ **What's Working:**
- Checkout redirect with discount codes
- Webhook handler for profile updates
- Success page exists

⚠️ **What Needs Configuration:**

### 1. Configure Success Redirect in Polar
Go to Polar Dashboard → Checkout Links → Edit your checkout link:
- Set **Success URL**: `https://unfriction.app/success`
- Or for local testing: `http://localhost:3000/success`

### 2. Verify Webhook is Active
- Polar Dashboard → Settings → Webhooks
- Ensure webhook URL is: `https://unfriction.app/api/webhooks/polar`
- Events selected: `order.paid`, `order.created`, `order.updated`

### 3. Add Base URL to Environment
Add to `.env.local`:
```env
NEXT_PUBLIC_BASE_URL="https://unfriction.app"
# Or for local: NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## Complete Flow Diagram

```
User clicks "Unlock Lifetime"
    ↓
Check purchase count → Determine discount tier
    ↓
Redirect to Polar checkout with discount_code
    ↓
User pays on Polar
    ↓
┌─────────────────────────────────────┐
│  Polar processes payment            │
└─────────────────────────────────────┘
    ↓                    ↓
    │                    │
    │                    └─→ Webhook fires
    │                         ↓
    │                    Update Supabase profile
    │                    (lifetime plan, unlimited limits)
    │
    └─→ Redirect to /success
         ↓
    Show success page
    Download button
    Early adopter badge
```

## Testing the Flow

### Test Locally:
1. Use ngrok to expose localhost: `ngrok http 3000`
2. Update Polar webhook URL to ngrok URL
3. Make test purchase
4. Check:
   - Webhook received (check server logs)
   - Profile updated in Supabase
   - Success page shows correctly

### Test in Production:
1. Make real purchase
2. Check Supabase `profiles` table - should show `plan: 'lifetime'`
3. Verify user can access lifetime features

## Troubleshooting

### User not redirected to success page?
- Configure success URL in Polar Dashboard
- Check if Polar supports `success_url` parameter (may need to configure in dashboard instead)

### Profile not updated after purchase?
- Check webhook logs in server
- Verify webhook URL is correct in Polar
- Check Supabase logs for errors
- Ensure `POLAR_PRODUCT_ID_LIFETIME` matches the product ID in webhook

### Discount not applying?
- Verify discount code names are correct
- Check URL parameter is `discount_code` (not `discount`)
- Test discount code manually in Polar checkout

