# How to Get Polar Product ID for Dynamic Pricing

## The Difference: Product ID vs Price ID

With dynamic pricing, you have:
- **1 Product** (Lifetime) 
- **4 Prices** within that product ($9, $19, $29, $39)

The webhook needs the **Product ID**, not the individual price IDs.

## How to Find Your Product ID

1. **Go to Polar Dashboard**
   - Navigate to **Products**
   - Click on your **Lifetime** product

2. **Find the Product ID**
   - Look for a field labeled "Product ID" or "ID"
   - It will look something like: `prod_xxxxxxxxxxxxx` or a UUID
   - This is different from the Price IDs

3. **Copy and Add to `.env.local`**
   ```env
   POLAR_PRODUCT_ID_LIFETIME="prod_xxxxxxxxxxxxx"
   ```

## How It Works

The webhook handler checks the **product ID** from the webhook event:
- When someone buys at $9 → Product ID matches → Upgrades to lifetime ✅
- When someone buys at $19 → Product ID matches → Upgrades to lifetime ✅
- When someone buys at $29 → Product ID matches → Upgrades to lifetime ✅
- When someone buys at $39 → Product ID matches → Upgrades to lifetime ✅

All price tiers automatically work because they all belong to the same product!

## Price IDs (Already Configured)

The price IDs ($9, $19, $29, $39) are already used in `lib/polar.ts` for:
- Determining which checkout link to show
- Displaying the correct price based on purchase count

You don't need to configure price IDs in the webhook - the product ID is enough.

## Verify It's Working

After setting up:
1. Make a test purchase at any price tier
2. Check your Supabase `profiles` table
3. The user's `plan` should be `lifetime` regardless of which price they paid

