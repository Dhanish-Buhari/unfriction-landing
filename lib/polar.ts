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

/**
 * Fetch the count of successful lifetime purchases from Polar API
 */
export async function getLifetimePurchasesCount(): Promise<number> {
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
        next: { revalidate: 60 }, // Cache for 60 seconds
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

    // Filter for successful, non-refunded transactions
    // Adjust field names based on Polar's actual API response structure
    const successfulPurchases = transactions.filter(
      (transaction: any) => {
        const status = transaction.status || transaction.payment_status || transaction.state
        const isRefunded = transaction.refunded || transaction.refunded_at || false
        const transactionProductId = transaction.product_id || transaction.product?.id

        return (
          (status === 'paid' || status === 'completed' || status === 'succeeded') &&
          !isRefunded &&
          transactionProductId === productId
        )
      }
    )

    return successfulPurchases.length
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
 */
export async function getLifetimePricingState(): Promise<LifetimePricingState> {
  const count = await getLifetimePurchasesCount()

  const priceId9 = process.env.POLAR_PRICE_ID_9
  const priceId19 = process.env.POLAR_PRICE_ID_19
  const priceId29 = process.env.POLAR_PRICE_ID_29
  const priceId39 = process.env.POLAR_PRICE_ID_39

  // Founders tier: 0-9 purchases
  if (count < 10) {
    return {
      tier: 'FOUNDERS_75',
      price: 9,
      remaining: 10 - count,
      displayPrice: '$9',
      polarPriceId: priceId9 || '',
      discount: 75,
      originalPrice: 39,
    }
  }

  // Early tier: 10-19 purchases
  if (count < 20) {
    return {
      tier: 'EARLY_50',
      price: 19,
      remaining: 20 - count,
      displayPrice: '$19',
      polarPriceId: priceId19 || '',
      discount: 50,
      originalPrice: 39,
    }
  }

  // Launch tier: 20-49 purchases
  if (count < 50) {
    return {
      tier: 'LAUNCH_25',
      price: 29,
      remaining: 50 - count,
      displayPrice: '$29',
      polarPriceId: priceId29 || '',
      discount: 25,
      originalPrice: 39,
    }
  }

  // Full price: 50+ purchases
  return {
    tier: 'FULL',
    price: 39,
    remaining: null,
    displayPrice: '$39',
    polarPriceId: priceId39 || '',
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
        label: 'Founder Tier — 75% OFF',
        emoji: '🔥',
        color: 'bg-orange-500',
      }
    case 'EARLY_50':
      return {
        label: 'Early Tier — 50% OFF',
        emoji: '⚡',
        color: 'bg-yellow-500',
      }
    case 'LAUNCH_25':
      return {
        label: 'Launch Tier — 25% OFF',
        emoji: '🎯',
        color: 'bg-blue-500',
      }
    case 'FULL':
      return {
        label: 'Full Price',
        emoji: '✨',
        color: 'bg-slate-500',
      }
  }
}

