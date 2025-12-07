import { NextResponse } from 'next/server'

/**
 * Debug endpoint to see raw Polar API response
 * Helps diagnose purchase count issues
 */
export async function GET() {
  const apiKey = process.env.POLAR_API_KEY
  const productId = process.env.POLAR_PRODUCT_ID_LIFETIME

  if (!apiKey || !productId) {
    return NextResponse.json({
      error: 'Polar API credentials not configured',
      hasApiKey: !!apiKey,
      hasProductId: !!productId,
    }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.polar.sh/v1/orders?product_id=${productId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    const status = response.status
    const statusText = response.statusText
    const data = await response.json()

    // Try to parse the response
    const transactions = data.items || data.data || data || []
    
    // Filter for successful purchases
    const successfulPurchases = transactions.filter(
      (transaction: any) => {
        const status = transaction.status || transaction.payment_status || transaction.state
        const isRefunded = transaction.refunded || transaction.refunded_at || false
        const transactionProductId = transaction.product_id || transaction.product?.id

        return (
          (status === 'paid' || status === 'completed' || status === 'succeeded') &&
          !isRefunded &&
          transactionProductId === productId
        )
      }
    )

    return NextResponse.json({
      apiStatus: status,
      apiStatusText: statusText,
      rawResponse: data,
      responseStructure: {
        hasItems: !!data.items,
        hasData: !!data.data,
        isArray: Array.isArray(data),
        keys: Object.keys(data),
      },
      totalTransactions: transactions.length,
      successfulPurchases: successfulPurchases.length,
      successfulTransactions: successfulPurchases.map((t: any) => ({
        id: t.id,
        status: t.status || t.payment_status || t.state,
        productId: t.product_id || t.product?.id,
        refunded: t.refunded || t.refunded_at || false,
        createdAt: t.created_at || t.createdAt,
      })),
      productId,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to fetch from Polar API',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 })
  }
}

