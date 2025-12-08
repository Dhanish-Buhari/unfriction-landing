import { NextResponse } from 'next/server'
import { getLifetimePricingState } from '@/lib/polar'

/**
 * Debug endpoint to verify purchase count from database
 * Access at: /api/debug/purchase-count
 */
export async function GET() {
  try {
    const pricingState = await getLifetimePricingState()

    return NextResponse.json(
      {
        purchaseCount: 0,
        remainingSlots: pricingState.remaining,
        tier: pricingState.tier,
        price: pricingState.displayPrice,
        discount: pricingState.discount,
        message: 'Purchase count logic disabled; returning static pricing state.',
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch purchase count',
        details: error?.message,
      },
      { status: 500 }
    )
  }
}

