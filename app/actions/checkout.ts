'use server'

import { redirect } from 'next/navigation'
import { getLifetimePricingState } from '@/lib/polar'

/**
 * Server action to initiate lifetime checkout
 * Redirects user to Polar Checkout Link with appropriate discount code
 */
export async function startLifetimeCheckout() {
  const state = await getLifetimePricingState()

  if (!state.polarPriceId) {
    console.error('Polar checkout link not configured')
    return { error: 'Checkout not available' }
  }

  // polarPriceId format: "checkout_link_id|discount_code" or just "checkout_link_id"
  const [checkoutLinkId, discountCode] = state.polarPriceId.split('|')
  
  // Build checkout URL with discount code and success redirect
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://unfriction.app'
  const successUrl = `${baseUrl}/success`
  
  let checkoutUrl = `https://buy.polar.sh/polar_cl_${checkoutLinkId}`
  const params = new URLSearchParams()
  
  if (discountCode) {
    // Polar uses discount_code parameter with the code name (not ID)
    params.append('discount_code', discountCode)
  }
  
  // Add success redirect URL (Polar may support this)
  params.append('success_url', successUrl)
  
  if (params.toString()) {
    checkoutUrl += `?${params.toString()}`
  }

  redirect(checkoutUrl)
}

