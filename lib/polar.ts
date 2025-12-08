/**
 * Static Polar helpers — purchase count logic removed.
 * No external services are called; safe for builds without env vars.
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

// Optional mock value (defaults to 0)
let mockPurchaseCount: number | null = 0

export function setMockPurchaseCount(count: number | null) {
  mockPurchaseCount = count
}

export function getMockPurchaseCount(): number | null {
  return mockPurchaseCount
}

// Purchase count logic removed; return a safe number
export async function getLifetimePurchasesCount(): Promise<number> {
  if (mockPurchaseCount !== null) {
    return mockPurchaseCount
  }
  return 0
}

/**
 * Return a static pricing state (still supports discount codes via env if present).
 */
export async function getLifetimePricingState(): Promise<LifetimePricingState> {
  const count = await getLifetimePurchasesCount()

  const checkoutLinkId = process.env.POLAR_CHECKOUT_LINK_ID || 'BHW961g1TbEn4CQDVkDTh5EnBJ53aktNYJh7o2Y8sF1'
  const discount75 = process.env.POLAR_DISCOUNT_CODE_75 || 'FOUNDER75'
  const discount50 = process.env.POLAR_DISCOUNT_CODE_50 || 'EARLY50'
  const discount25 = process.env.POLAR_DISCOUNT_CODE_25 || 'FIRSTFIFTY50'

  if (count < 10) {
    const remaining = 10 - count
    return {
      tier: 'FOUNDERS_75',
      price: 9.75,
      remaining: remaining > 0 ? remaining : 0,
      displayPrice: '$9.75',
      polarPriceId: `${checkoutLinkId}|${discount75}`,
      discount: 75,
      originalPrice: 39,
    }
  }

  if (count < 20) {
    const remaining = 20 - count
    return {
      tier: 'EARLY_50',
      price: 19.5,
      remaining: remaining > 0 ? remaining : 0,
      displayPrice: '$19.50',
      polarPriceId: `${checkoutLinkId}|${discount50}`,
      discount: 50,
      originalPrice: 39,
    }
  }

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

  return {
    tier: 'FULL',
    price: 39,
    remaining: null,
    displayPrice: '$39',
    polarPriceId: checkoutLinkId,
    discount: 0,
    originalPrice: 39,
  }
}

export function getTierBadge(tier: PricingTier): {
  label: string
  emoji: string
  color: string
} {
  switch (tier) {
    case 'FOUNDERS_75':
      return { label: 'Founder Tier - 75% OFF', emoji: '', color: 'bg-orange-500' }
    case 'EARLY_50':
      return { label: 'Early Supporter - 50% OFF', emoji: '', color: 'bg-yellow-500' }
    case 'LAUNCH_25':
      return { label: 'Launch Pricing - 25% OFF', emoji: '', color: 'bg-blue-500' }
    case 'FULL':
      return { label: 'Standard Price', emoji: '', color: 'bg-slate-500' }
  }
}

