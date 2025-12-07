# Polar Checkout Link Setup

## ✅ Code Updated

The code now uses **checkout links with discount codes** instead of multiple price IDs.

## Environment Variables Needed

Add these to your `.env.local`:

```env
# Polar Checkout Link (required)
POLAR_CHECKOUT_LINK_ID="BHW961g1TbEn4CQDVkDTh5EnBJ53aktNYJh7o2Y8sF1"

# Polar Discount Codes (required)
POLAR_DISCOUNT_75="cd8e53bf-f31e-47a2-83f0-a636589d3fb7"  # 75% off (Founders tier)
POLAR_DISCOUNT_50="38f72c4d-1387-4041-8d09-97abc649955f"  # 50% off (Early tier)
POLAR_DISCOUNT_25="c3e2bf64-18a8-49b5-b11b-5fcd9b7acfd2"  # 25% off (Launch tier)

# Existing
POLAR_PRODUCT_ID_LIFETIME="4d071440-14fc-47f0-911d-33bae19e3822"
POLAR_API_KEY="your-polar-api-key"  # Still needed for purchase count
```

## How It Works

1. **Purchase count determines tier:**
   - 0-9 purchases → 75% discount (Founders)
   - 10-19 purchases → 50% discount (Early)
   - 20-49 purchases → 25% discount (Launch)
   - 50+ purchases → Full price ($39)

2. **Checkout redirect:**
   - Builds URL: `https://buy.polar.sh/polar_cl_{checkout_link_id}?discount={discount_id}`
   - Applies appropriate discount code based on tier

## Testing

1. Test checkout flow:
   - Click "Unlock Lifetime" button
   - Should redirect to Polar checkout with correct discount

2. Verify discount codes:
   - Check that the URL includes the correct discount parameter
   - Test each tier to ensure correct discount is applied

## Note on Discount URL Format

If Polar uses a different format for discount codes (e.g., `discount_code` instead of `discount`), update `app/actions/checkout.ts` line 20:

```typescript
checkoutUrl += `?discount_code=${discountId}`  // If Polar uses discount_code
```

Test the checkout URL format in Polar's documentation or by testing a purchase.

