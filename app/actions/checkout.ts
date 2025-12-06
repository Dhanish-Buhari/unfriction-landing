'use server'

import { redirect } from 'next/navigation'
import { getLifetimePricingState } from '@/lib/polar'

/**
 * Server action to initiate lifetime checkout
 * Redirects user to Polar Pay Link based on current pricing tier
 */
export async function startLifetimeCheckout() {
  const state = await getLifetimePricingState()

  if (!state.polarPriceId) {
    console.error('Polar price ID not configured')
    return { error: 'Checkout not available' }
  }

  // Redirect to Polar Pay Link
  // Format: https://polar.sh/pay/{price_id}
  redirect(`https://polar.sh/pay/${state.polarPriceId}`)
}

