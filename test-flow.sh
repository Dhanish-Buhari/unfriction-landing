#!/bin/bash

# Test Purchase Flow Script
# Run: chmod +x test-flow.sh && ./test-flow.sh

BASE_URL="https://unfriction.app"

echo "🧪 Testing Unfriction Purchase Flow"
echo "===================================="
echo ""

# Test 1: Set purchase count to 5 (Founders tier - 75% off)
echo "1️⃣ Setting purchase count to 5 (Founders tier - 75% off)..."
curl -s "$BASE_URL/api/test/purchase-count?count=5" > /dev/null
echo "   ✅ Mock count set"
echo ""

# Test 2: Check pricing
echo "2️⃣ Checking pricing..."
PRICING=$(curl -s "$BASE_URL/api/pricing")
PRICE=$(echo $PRICING | python3 -c "import sys, json; d=json.load(sys.stdin); print(d['displayPrice'])")
DISCOUNT=$(echo $PRICING | python3 -c "import sys, json; d=json.load(sys.stdin); print(d['discount'])")
TIER=$(echo $PRICING | python3 -c "import sys, json; d=json.load(sys.stdin); print(d['tier'])")
echo "   Price: $PRICE"
echo "   Discount: $DISCOUNT%"
echo "   Tier: $TIER"
echo ""

# Test 3: Simulate purchase
echo "3️⃣ Simulating purchase for test@example.com..."
WEBHOOK=$(curl -s -X POST "$BASE_URL/api/test/webhook" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}')
RESULT=$(echo $WEBHOOK | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('message', 'Error'))")
echo "   Result: $RESULT"
echo ""

# Test 4: Verify profile
echo "4️⃣ Verifying profile was updated..."
PROFILE=$(curl -s -X POST "$BASE_URL/api/profile" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}')
PLAN=$(echo $PROFILE | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('plan', 'Error'))")
EARLY=$(echo $PROFILE | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('isEarlyAdopter', False))")
echo "   Plan: $PLAN (should be 'lifetime')"
echo "   Early Adopter: $EARLY (should be true)"
echo ""

echo "✅ Test complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Visit: $BASE_URL/success?email=test@example.com"
echo "   2. Click 'Unlock Lifetime' button to test checkout redirect"
echo "   3. Check Supabase dashboard to verify profile was created"
echo ""

