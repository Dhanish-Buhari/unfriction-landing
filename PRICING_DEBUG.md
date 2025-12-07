# Pricing Counter Debug Guide

## Issue
After first sale, counter still shows "10 slots left" instead of "9 slots left"

## What I Fixed

1. **Reduced cache time** from 60s to 30s for faster updates
2. **Added better logging** to see what Polar API returns
3. **Fixed remaining slots calculation** to ensure non-negative values
4. **Added debug endpoint** to inspect raw Polar API response

## How to Debug

### 1. Check Raw Polar API Response

```bash
# See what Polar API actually returns
curl https://unfriction.app/api/debug/polar
```

This will show:
- Raw API response structure
- Total transactions found
- Successful purchases count
- Each transaction's details

### 2. Check Current Pricing State

```bash
# See current pricing calculation
curl https://unfriction.app/api/pricing
```

Expected response:
```json
{
  "tier": "FOUNDERS_75",
  "price": 9.75,
  "remaining": 9,  // Should be 9 after 1 sale, not 10!
  "displayPrice": "$9.75",
  "discount": 75,
  "originalPrice": 39
}
```

### 3. Check Server Logs

In development mode, check your terminal for:
```
[Polar API] Raw response structure: { ... }
[Polar API] Successful purchase found: { ... }
[Polar API] Total successful purchases: 1
[Pricing] Purchase count: 1, calculating tier...
```

## Common Issues

### Issue 1: Polar API Returns Different Structure

**Symptom**: Debug endpoint shows `totalTransactions: 0` but you have sales

**Solution**: Check the `responseStructure` in debug output. Polar might use:
- `data.items` (array)
- `data.data` (array)  
- Direct array
- Different field names

Update the parsing logic in `lib/polar.ts` line 84:
```typescript
const transactions = data.items || data.data || data || []
```

### Issue 2: Status Field Names Don't Match

**Symptom**: Purchases exist but `successfulPurchases: 0`

**Solution**: Check what status field Polar uses. Update line 90 in `lib/polar.ts`:
```typescript
const status = transaction.status || transaction.payment_status || transaction.state
```

Common Polar status values:
- `paid`
- `completed`
- `succeeded`
- `active`

### Issue 3: Product ID Mismatch

**Symptom**: Transactions found but filtered out

**Solution**: Verify `POLAR_PRODUCT_ID_LIFETIME` matches the product ID in Polar dashboard. Check in debug output:
```json
{
  "successfulTransactions": [
    {
      "productId": "xxx",  // Should match your env var
      ...
    }
  ]
}
```

### Issue 4: Cache Showing Stale Data

**Symptom**: Count doesn't update after purchase

**Solution**: 
1. Wait 30 seconds (cache time)
2. Or restart dev server
3. Or add `?t=` timestamp to API call to bust cache

## Testing Purchase Count

### Test with Mock Count

```bash
# Set mock count to 1 (simulate first sale)
curl https://unfriction.app/api/test/purchase-count?count=1

# Check pricing
curl https://unfriction.app/api/pricing
# Should show: "remaining": 9

# Set to 5 sales
curl https://unfriction.app/api/test/purchase-count?count=5
# Should show: "remaining": 5

# Set to 10 sales (last slot)
curl https://unfriction.app/api/test/purchase-count?count=10
# Should show: "remaining": 0 (or move to next tier)
```

### Clear Mock and Use Real API

```bash
curl -X DELETE https://unfriction.app/api/test/purchase-count
```

## Production Debugging

In production, you can't use the debug endpoint easily. Instead:

1. **Check Vercel logs** for the console.log statements
2. **Add temporary logging** to see purchase count
3. **Use Polar dashboard** to verify actual purchase count
4. **Compare** Polar dashboard count vs API response

## Next Steps

1. **Run debug endpoint** to see actual Polar API response
2. **Check if purchase count is correct** in Polar dashboard
3. **Verify webhook is working** - purchases should trigger webhook
4. **Check if webhook updates profile** correctly

If the debug endpoint shows the correct count but pricing still shows wrong:
- Check cache headers
- Verify the pricing calculation logic
- Check if there's a CDN cache (Vercel edge cache)

## Quick Fix Commands

```bash
# 1. Check what Polar returns
curl https://unfriction.app/api/debug/polar | jq

# 2. Check current pricing
curl https://unfriction.app/api/pricing | jq

# 3. Test with mock
curl https://unfriction.app/api/test/purchase-count?count=1
curl https://unfriction.app/api/pricing | jq '.remaining'

# 4. Clear mock
curl -X DELETE https://unfriction.app/api/test/purchase-count
```

