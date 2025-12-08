import { NextResponse } from 'next/server'
import { getLifetimePricingState } from '@/lib/polar'

/**
 * API route to fetch current pricing state
 * This allows client components to fetch pricing data
 * No caching for real-time updates
 */
export async function GET() {
  try {
    const pricingState = await getLifetimePricingState()

    return NextResponse.json(pricingState, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Error fetching pricing state:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pricing' },
      { status: 500 }
    )
  }
}

