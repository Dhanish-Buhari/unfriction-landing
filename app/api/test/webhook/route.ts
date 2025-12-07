import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// Mark as dynamic to prevent build-time analysis
export const dynamic = 'force-dynamic'

/**
 * Test endpoint to simulate Polar webhook events
 * Use this to test the purchase flow without making real payments
 * 
 * Usage:
 * POST /api/test/webhook
 * Body: { email: "test@example.com", tier?: "FOUNDERS_75" | "EARLY_50" | "LAUNCH_25" | "FULL" }
 */
export async function POST(req: Request) {
  try {
    const { email, tier = 'FOUNDERS_75' } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Simulate webhook event data
    const mockWebhookData = {
      type: 'order.paid',
      data: {
        id: `test-order-${Date.now()}`,
        status: 'paid',
        customer: {
          email,
          id: `test-customer-${Date.now()}`,
        },
        product: {
          id: process.env.POLAR_PRODUCT_ID_LIFETIME || '4d071440-14fc-47f0-911d-33bae19e3822',
        },
      },
    }

    // Find or create user
    const { data: userList } = await supabaseAdmin.auth.admin.listUsers()
    let user = userList.users.find((u) => u.email === email)

    if (!user) {
      const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
      })
      if (error || !created?.user) {
        return NextResponse.json({ error: 'Failed to create user', details: error }, { status: 500 })
      }
      user = created.user
    }

    // Update profile to lifetime plan
    const { data: profile, error: updateError } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email,
          plan: 'lifetime',
          notes_limit: 999999,
          ocr_limit: 999999,
          is_early_adopter: true,
          polar_customer_id: mockWebhookData.data.customer.id,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update profile', details: updateError }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Test purchase simulated successfully',
      user: {
        id: user.id,
        email: user.email,
      },
      profile: {
        plan: profile.plan,
        notesLimit: profile.notes_limit,
        ocrLimit: profile.ocr_limit,
        isEarlyAdopter: profile.is_early_adopter,
      },
      webhookData: mockWebhookData,
    })
  } catch (error) {
    console.error('Test webhook error:', error)
    return NextResponse.json({ error: 'Test failed', details: String(error) }, { status: 500 })
  }
}

