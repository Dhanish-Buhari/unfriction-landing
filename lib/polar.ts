/**
 * Polar.sh API Integration
 * 
 * Server-side functions for fetching purchase data and determining pricing tiers
 */

type PricingTier = "FOUNDERS_75" | "EARLY_50" | "LAUNCH_25" | "FULL"

export interface LifetimePricingState {
  tier: PricingTier
  price: number
  remaining: number | null
  displayPrice: string
  polarPriceId: string
  discount: number
  originalPrice: number
}

// Global variable to store mock purchase count (for testing)
let mockPurchaseCount: number | null = null

/**
 * Set mock purchase count for testing (development only)
 */
export function setMockPurchaseCount(count: number | null) {
  if (process.env.NODE_ENV === 'development') {
    mockPurchaseCount = count
  }
}

/**
 * Get mock purchase count (for testing)
 */
export function getMockPurchaseCount(): number | null {
  return mockPurchaseCount
}

/**
 * Fetch the count of successful lifetime purchases from Polar API
 * In test mode, can use mocked purchase count
 */
export async function getLifetimePurchasesCount(): Promise<number> {
  // Check for mock purchase count (for testing)
  if (process.env.NODE_ENV === 'development' && mockPurchaseCount !== null) {
    console.log(`[TEST MODE] Using mock purchase count: ${mockPurchaseCount}`)
    return mockPurchaseCount
  }

  const apiKey = process.env.POLAR_API_KEY
  const productId = process.env.POLAR_PRODUCT_ID_LIFETIME

  if (!apiKey || !productId) {
    console.warn('Polar API credentials not configured, returning 0 purchases')
    return 0
  }

  try {
    // Fetch transactions for the lifetime product
    // Note: Adjust the API endpoint based on Polar.sh's actual API structure
    // Common patterns: /v1/transactions, /api/v1/orders, etc.
    const response = await fetch(
      `https://api.polar.sh/v1/orders?product_id=${productId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        next: { revalidate: 30 }, // Cache for 30 seconds (reduced for faster updates)
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Polar API error: ${response.status} ${response.statusText}`, errorText)
      return 0
    }

    const data = await response.json()

    // Handle different possible response structures
    // Polar might return: { items: [...] } or { data: [...] } or direct array
    const transactions = data.items || data.data || data || []

    // Log for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Polar API] Raw response structure:', {
        hasItems: !!data.items,
        hasData: !!data.data,
        isArray: Array.isArray(data),
        totalItems: transactions.length,
      })
    }

    // Filter for successful, non-refunded transactions
    // Adjust field names based on Polar's actual API response structure
    const successfulPurchases = transactions.filter(
      (transaction: any) => {
        const status = transaction.status || transaction.payment_status || transaction.state
        const isRefunded = transaction.refunded || transaction.refunded_at || false
        const transactionProductId = transaction.product_id || transaction.product?.id

        const isSuccessful = (
          (status === 'paid' || status === 'completed' || status === 'succeeded') &&
          !isRefunded &&
          transactionProductId === productId
        )

        // Log filtered transactions in development
        if (process.env.NODE_ENV === 'development' && isSuccessful) {
          console.log('[Polar API] Successful purchase found:', {
            id: transaction.id,
            status,
            productId: transactionProductId,
            createdAt: transaction.created_at || transaction.createdAt,
          })
        }

        return isSuccessful
      }
    )

    const count = successfulPurchases.length
    
    // Log final count
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Polar API] Total successful purchases: ${count}`)
    }

    return count
  } catch (error) {
    console.error('Error fetching Polar purchases:', error)
    // In development, you might want to return a mock count for testing
    if (process.env.NODE_ENV === 'development') {
      console.warn('Returning 0 purchases due to API error (development mode)')
    }
    return 0
  }
}

/**
 * Get the current pricing state based on purchase count
 * Uses checkout link with discount codes instead of multiple price IDs
 */
export async function getLifetimePricingState(): Promise<LifetimePricingState> {
  const count = await getLifetimePurchasesCount()
  
  // Log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Pricing] Purchase count: ${count}, calculating tier...`)
  }

  const checkoutLinkId = process.env.POLAR_CHECKOUT_LINK_ID || 'BHW961g1TbEn4CQDVkDTh5EnBJ53aktNYJh7o2Y8sF1'
  // Discount codes from Polar dashboard
  const discount75 = process.env.POLAR_DISCOUNT_CODE_75 || 'FOUNDER75'      // 75% off - First 10 purchases
  const discount50 = process.env.POLAR_DISCOUNT_CODE_50 || 'EARLY50'       // 50% off - Next 10 purchases (10-19)
  const discount25 = process.env.POLAR_DISCOUNT_CODE_25 || 'FIRSTFIFTY50'  // 25% off - Next 30 purchases (20-49)

  // Founders tier: 0-9 purchases (75% off)
  // Remaining slots = 10 - count (so if count=1, remaining=9)
  if (count < 10) {
    const remaining = 10 - count
    return {
      tier: 'FOUNDERS_75',
      price: 9.75,
      remaining: remaining > 0 ? remaining : 0, // Ensure non-negative
      displayPrice: '$9.75',
      polarPriceId: `${checkoutLinkId}|${discount75}`, // Format: checkout_link_id|discount_code
      discount: 75,
      originalPrice: 39,
    }
  }

  // Early tier: 10-19 purchases (50% off)
  if (count < 20) {
    const remaining = 20 - count
    return {
      tier: 'EARLY_50',
      price: 19.50,
      remaining: remaining > 0 ? remaining : 0,
      displayPrice: '$19.50',
      polarPriceId: `${checkoutLinkId}|${discount50}`,
      discount: 50,
      originalPrice: 39,
    }
  }

  // Launch tier: 20-49 purchases (25% off)
  if (count < 50) {
    const remaining = 50 - count
    return {
      tier: 'LAUNCH_25',
      price: 29.25,
      remaining: remaining > 0 ? remaining : 0,
      displayPrice: '$29.25',
      polarPriceId: `${checkoutLinkId}|${discount25}`,
      discount: 25,
      originalPrice: 39,
    }
  }

  // Full price: 50+ purchases (no discount)
  return {
    tier: 'FULL',
    price: 39,
    remaining: null,
    displayPrice: '$39',
    polarPriceId: checkoutLinkId, // No discount
    discount: 0,
    originalPrice: 39,
  }
}

/**
 * Get tier display information
 */
export function getTierBadge(tier: PricingTier): {
  label: string
  emoji: string
  color: string
} {
  switch (tier) {
    case 'FOUNDERS_75':
      return {
        label: 'Founder Tier - 75% OFF',
        emoji: '',
        color: 'bg-orange-500',
      }
    case 'EARLY_50':
      return {
        label: 'Early Supporter - 50% OFF',
        emoji: '',
        color: 'bg-yellow-500',
      }
    case 'LAUNCH_25':
      return {
        label: 'Launch Pricing - 25% OFF',
        emoji: '',
        color: 'bg-blue-500',
      }
    case 'FULL':
      return {
        label: 'Standard Price',
        emoji: '',
        color: 'bg-slate-500',
      }
  }
}

