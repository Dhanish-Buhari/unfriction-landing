import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

/**
 * Polar.sh Webhook Handler
 * 
 * Handles payment events from Polar and updates user profiles in Supabase
 * 
 * Expected events:
 * - order.created
 * - order.updated
 * - subscription.created
 * - subscription.updated
 * - subscription.canceled
 */

interface PolarWebhookEvent {
  type: string
  data: {
    id: string
    customer?: {
      email?: string
      id?: string
    }
    product?: {
      id?: string
      name?: string
    }
    price?: {
      id?: string
      amount?: number
    }
    status?: string
    metadata?: Record<string, any>
  }
}

export async function POST(req: Request) {
  try {
    // Verify webhook signature (if Polar provides one)
    const signature = req.headers.get('x-polar-signature')
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET

    // TODO: Implement signature verification if Polar provides it
    // if (webhookSecret && signature) {
    //   const isValid = verifyPolarSignature(req.body, signature, webhookSecret)
    //   if (!isValid) {
    //     return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    //   }
    // }

    const event: PolarWebhookEvent = await req.json()

    console.log('Polar webhook received:', event.type, event.data)

    // Handle different event types
    switch (event.type) {
      case 'order.created':
      case 'order.updated':
      case 'order.paid':
        await handleOrderEvent(event.data)
        break

      case 'subscription.created':
      case 'subscription.updated':
      case 'subscription.active':
        await handleSubscriptionEvent(event.data)
        break

      case 'subscription.canceled':
      case 'subscription.revoked':
        await handleSubscriptionCanceled(event.data)
        break

      case 'order.refunded':
        await handleOrderRefunded(event.data)
        break

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Polar webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Handle order events (one-time payments like lifetime)
 * Works with dynamic pricing - checks product ID, not price ID
 */
async function handleOrderEvent(data: any) {
  const email = data.customer?.email
  const customerId = data.customer?.id
  const productId = data.product?.id
  const priceId = data.price?.id
  const status = data.status

  if (!email) {
    console.warn('Order event missing email:', data)
    return
  }

  // Only process successful orders
  // Polar uses 'paid' status for completed orders
  if (status !== 'completed' && status !== 'paid') {
    console.log('Order not completed, skipping:', status)
    return
  }

  // Check if this is a lifetime product
  // With dynamic pricing, all price tiers ($9, $19, $29, $39) belong to the same product
  const lifetimeProductId = process.env.POLAR_PRODUCT_ID_LIFETIME
  
  if (!lifetimeProductId) {
    console.warn('POLAR_PRODUCT_ID_LIFETIME not configured')
    return
  }

  if (productId !== lifetimeProductId) {
    console.log('Not a lifetime product, skipping. Product ID:', productId)
    return
  }

  console.log('Processing lifetime purchase:', { email, productId, priceId, status })

  // Find or create user by email
  const { data: userList } = await supabaseAdmin.auth.admin.listUsers()
  let user = userList.users.find((u) => u.email === email)

  if (!user) {
    // Create user if doesn't exist
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
    })
    if (error || !created?.user) {
      console.error('Failed to create user:', error)
      return
    }
    user = created.user
  }

  // Update profile to lifetime plan
  const { error: updateError } = await supabaseAdmin
    .from('profiles')
    .upsert(
      {
        id: user.id,
        email,
        plan: 'lifetime',
        notes_limit: 999999, // Unlimited
        ocr_limit: 999999, // Unlimited
        is_early_adopter: true,
        polar_customer_id: customerId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    )

  if (updateError) {
    console.error('Failed to update profile:', updateError)
    return
  }

  console.log('Profile upgraded to lifetime for:', email)
}

/**
 * Handle subscription events (for future Pro plan)
 */
async function handleSubscriptionEvent(data: any) {
  const email = data.customer?.email
  const customerId = data.customer?.id
  const subscriptionId = data.id
  const status = data.status

  if (!email) {
    console.warn('Subscription event missing email:', data)
    return
  }

  // Find user by email
  const { data: userList } = await supabaseAdmin.auth.admin.listUsers()
  const user = userList.users.find((u) => u.email === email)

  if (!user) {
    console.warn('User not found for subscription:', email)
    return
  }

  // Update profile based on subscription status
  if (status === 'active' || status === 'trialing') {
    await supabaseAdmin
      .from('profiles')
      .update({
        plan: 'pro',
        notes_limit: 999999,
        ocr_limit: 999999,
        polar_customer_id: customerId,
        polar_subscription_id: subscriptionId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    console.log('Profile upgraded to pro for:', email)
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionCanceled(data: any) {
  const email = data.customer?.email

  if (!email) {
    console.warn('Subscription canceled event missing email:', data)
    return
  }

  // Find user by email
  const { data: userList } = await supabaseAdmin.auth.admin.listUsers()
  const user = userList.users.find((u) => u.email === email)

  if (!user) {
    console.warn('User not found for canceled subscription:', email)
    return
  }

  // Downgrade to free plan
  await supabaseAdmin
    .from('profiles')
    .update({
      plan: 'free',
      notes_limit: 50,
      ocr_limit: 10,
      polar_subscription_id: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  console.log('Profile downgraded to free for:', email)
}

/**
 * Handle order refunds - downgrade user back to free
 */
async function handleOrderRefunded(data: any) {
  const email = data.customer?.email
  const productId = data.product?.id

  if (!email) {
    console.warn('Order refunded event missing email:', data)
    return
  }

  // Only process refunds for lifetime product
  const lifetimeProductId = process.env.POLAR_PRODUCT_ID_LIFETIME
  if (productId !== lifetimeProductId) {
    console.log('Not a lifetime product refund, skipping')
    return
  }

  // Find user by email
  const { data: userList } = await supabaseAdmin.auth.admin.listUsers()
  const user = userList.users.find((u) => u.email === email)

  if (!user) {
    console.warn('User not found for refunded order:', email)
    return
  }

  // Downgrade to free plan
  await supabaseAdmin
    .from('profiles')
    .update({
      plan: 'free',
      notes_limit: 50,
      ocr_limit: 10,
      polar_customer_id: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  console.log('Profile downgraded to free due to refund for:', email)
}

