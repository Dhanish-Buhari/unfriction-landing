import { NextResponse } from 'next/server'
import { getLifetimePricingState, getLifetimePurchasesCount } from '@/lib/polar'

/**
 * API route to fetch current pricing state
 * This allows client components to fetch pricing data
 * No caching for real-time updates
 */
export async function GET() {
  try {
    // Get raw purchase count for debugging
    const purchaseCount = await getLifetimePurchasesCount()
    const pricingState = await getLifetimePricingState()
    
    // Include debug info in development mode
    const responseData = process.env.NODE_ENV === 'development' 
      ? { ...pricingState, _debug: { purchaseCount } }
      : pricingState
    
    // Return with headers to prevent caching for real-time updates
    return NextResponse.json(responseData, {
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

