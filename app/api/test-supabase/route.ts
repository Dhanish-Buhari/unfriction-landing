import { getSupabase } from '@/lib/supabase'

// Avoid prerender issues; this route should always be evaluated at request time
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from('users').select('*').limit(1)
    return Response.json({ data, error })
  } catch (error: any) {
    // Return a friendly response instead of failing the build when env vars are missing
    return Response.json(
      { data: null, error: error?.message || 'Supabase not configured' },
      { status: 200 }
    )
  }
}

