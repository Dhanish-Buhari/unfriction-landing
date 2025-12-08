import { NextResponse } from 'next/server'
import { getLifetimePurchasesCount, getLifetimePricingState } from '@/lib/polar'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

/**
 * Debug endpoint to verify purchase count from database
 * Access at: /api/debug/purchase-count
 */
export async function GET() {
  try {
    // Get count from our function (which queries Supabase)
    const count = await getLifetimePurchasesCount()
    
    // Get pricing state
    const pricingState = await getLifetimePricingState()
    
    // Also query database directly for verification
    const supabaseAdmin = getSupabaseAdmin()
    const { count: dbCount, data: profiles, error } = await supabaseAdmin
      .from('profiles')
      .select('id, email, plan, created_at, updated_at')
      .eq('plan', 'lifetime')

    return NextResponse.json({
      purchaseCount: count,
      remainingSlots: pricingState.remaining,
      tier: pricingState.tier,
      price: pricingState.displayPrice,
      discount: pricingState.discount,
      database: {
        count: dbCount || 0,
        profiles: profiles || [],
        error: error?.message,
      },
      calculation: {
        formula: 'remaining = 10 - purchaseCount',
        current: `remaining = 10 - ${count} = ${10 - count}`,
      },
    })
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

