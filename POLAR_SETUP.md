# Polar.sh Integration Setup

This document explains how to set up Polar.sh for the Unfriction pricing system.

## Environment Variables

Add these environment variables to your deployment (Vercel, etc.):

```bash
# Polar API Key (Bearer token)
POLAR_API_KEY=your_polar_api_key_here

# Lifetime Product ID
POLAR_PRODUCT_ID_LIFETIME=your_product_id_here

# Price IDs for each tier
POLAR_PRICE_ID_9=price_id_for_9_dollars
POLAR_PRICE_ID_19=price_id_for_19_dollars
POLAR_PRICE_ID_29=price_id_for_29_dollars
POLAR_PRICE_ID_39=price_id_for_39_dollars
```

## Setup Steps

### 1. Create Polar Account

1. Go to [polar.sh](https://polar.sh)
2. Sign up or log in
3. Complete your organization setup

### 2. Create Lifetime Product

1. Navigate to **Products** in your Polar dashboard
2. Click **Create Product**
3. Name it "Unfriction Lifetime"
4. Set description and other details
5. Copy the **Product ID** → use for `POLAR_PRODUCT_ID_LIFETIME`

### 3. Create Prices for Each Tier

For each pricing tier, create a separate price in Polar:

#### Founders Tier ($9)
1. In your product, click **Add Price**
2. Set amount to **$9.00 USD**
3. Set as **One-time payment**
4. Copy the **Price ID** → use for `POLAR_PRICE_ID_9`

#### Early Tier ($19)
1. Add another price
2. Set amount to **$19.00 USD**
3. Copy the **Price ID** → use for `POLAR_PRICE_ID_19`

#### Launch Tier ($29)
1. Add another price
2. Set amount to **$29.00 USD**
3. Copy the **Price ID** → use for `POLAR_PRICE_ID_29`

#### Full Price ($39)
1. Add another price
2. Set amount to **$39.00 USD**
3. Copy the **Price ID** → use for `POLAR_PRICE_ID_39`

### 4. Create API Key

1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "Unfriction Landing Page")
4. Copy the key → use for `POLAR_API_KEY`
5. ⚠️ **Important**: Store this securely - you won't see it again!

### 5. Configure Environment Variables

#### For Local Development

Create a `.env.local` file in your project root:

```bash
POLAR_API_KEY=your_key_here
POLAR_PRODUCT_ID_LIFETIME=your_product_id_here
POLAR_PRICE_ID_9=your_price_id_here
POLAR_PRICE_ID_19=your_price_id_here
POLAR_PRICE_ID_29=your_price_id_here
POLAR_PRICE_ID_39=your_price_id_here
```

#### For Vercel Production

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - Key: `POLAR_API_KEY`
   - Value: (paste your API key)
   - Environment: Production, Preview, Development (select all)
4. Repeat for all variables
5. Redeploy your application

## Testing

1. Start your dev server: `npm run dev`
2. Navigate to the pricing section
3. Check that pricing tiers display correctly
4. Test the "Unlock Lifetime" button (it should redirect to Polar checkout)

## Pricing Tiers

The system automatically adjusts pricing based on purchase count:

| Purchases | Discount | Price | Tier Name |
|-----------|----------|-------|-----------|
| 0-9       | 75% off  | $9    | Founder Tier |
| 10-19     | 50% off  | $19   | Early Tier |
| 20-49     | 25% off  | $29   | Launch Tier |
| 50+       | Full     | $39   | Full Price |

## API Endpoint

The pricing data is fetched from:
- **Local**: `http://localhost:3000/api/pricing`
- **Production**: `https://yourdomain.com/api/pricing`

This endpoint:
- Fetches purchase count from Polar API
- Calculates current pricing tier
- Returns pricing state with remaining slots

## Troubleshooting

### Pricing not loading
- Check that all environment variables are set
- Verify API key has correct permissions
- Check browser console for errors
- Verify Polar API is accessible

### Wrong pricing tier
- Check purchase count in Polar dashboard
- Verify API is returning correct transaction data
- Check `lib/polar.ts` for tier calculation logic

### Checkout not working
- Verify price IDs are correct
- Check that Polar Pay Links are enabled
- Test Polar checkout URL format: `https://polar.sh/pay/{price_id}`

## Support

- [Polar.sh Documentation](https://docs.polar.sh)
- [Polar.sh Dashboard](https://polar.sh/dashboard)
- Check Polar API logs in dashboard for transaction issues

