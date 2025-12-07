import { supabase } from '@/lib/supabase'

// Mark as dynamic to prevent build-time analysis
export const dynamic = 'force-dynamic'

export async function GET() {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return Response.json(
      { error: 'Supabase not configured', data: null },
      { status: 503 }
    )
  }

  const { data, error } = await supabase.from('users').select('*').limit(1)

  return Response.json({ data, error })
}

