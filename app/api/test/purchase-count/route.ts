import { NextResponse } from 'next/server'
import { setMockPurchaseCount, getMockPurchaseCount } from '@/lib/polar'

/**
 * Test endpoint to mock purchase count for testing different tiers
 * This overrides the real Polar API call for testing
 * 
 * Usage:
 * GET /api/test/purchase-count?count=5
 * 
 * Then call /api/pricing - it will use the mocked count
 */

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const count = searchParams.get('count')

  if (count !== null) {
    const numCount = parseInt(count, 10)
    if (isNaN(numCount) || numCount < 0) {
      return NextResponse.json({ error: 'Invalid count. Must be a number >= 0' }, { status: 400 })
    }
    setMockPurchaseCount(numCount)
    return NextResponse.json({
      success: true,
      message: `Mock purchase count set to ${numCount}`,
      count: numCount,
      tier: getTierForCount(numCount),
    })
  }

  const currentCount = getMockPurchaseCount()
  return NextResponse.json({
    currentMockCount: currentCount,
    message: currentCount !== null 
      ? `Using mock count: ${currentCount} (tier: ${getTierForCount(currentCount)})`
      : 'No mock count set. Purchase count logic disabled; using static pricing.',
    usage: 'GET /api/test/purchase-count?count=5 to set mock count',
  })
}

export async function DELETE() {
  setMockPurchaseCount(null)
  return NextResponse.json({ success: true, message: 'Mock count cleared. Using real Polar API.' })
}

function getTierForCount(count: number): string {
  if (count < 10) return 'FOUNDERS_75 (75% off)'
  if (count < 20) return 'EARLY_50 (50% off)'
  if (count < 50) return 'LAUNCH_25 (25% off)'
  return 'FULL (no discount)'
}

