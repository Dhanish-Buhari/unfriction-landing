import { NextResponse } from 'next/server'

/**
 * API route to add email to Loops newsletter subscription
 * POST /api/subscribe
 * Body: { email: string }
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if Loops API key is configured
    const loopsApiKey = process.env.LOOPS_API_KEY
    if (!loopsApiKey) {
      console.warn('LOOPS_API_KEY is not configured. Subscription skipped.')
      // Return success to avoid breaking the UI, but log warning
      return NextResponse.json({ success: true, warning: 'Subscription API not configured' })
    }

    // Call Loops API
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loopsApiKey}`,
      },
      body: JSON.stringify({
        email,
        tags: ['newsletter'],
      }),
    })

    const data = await response.json()

    // Loops returns 200 for both new contacts and existing contacts
    // So we treat both as success (idempotent behavior)
    if (response.ok) {
      return NextResponse.json({ success: true })
    }

    // Handle specific error cases
    if (data.error) {
      // If email already exists, Loops might return an error, but we treat as success
      // since it's idempotent - user is already subscribed
      if (response.status === 400 && data.error.includes('already exists')) {
        return NextResponse.json({ success: true })
      }

      return NextResponse.json(
        { success: false, error: data.error },
        { status: response.status }
      )
    }

    // Unknown error
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Error subscribing email:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

