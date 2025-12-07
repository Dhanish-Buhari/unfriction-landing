import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseAdminClient: SupabaseClient | null = null

function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseAdminClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    
    // During build, use placeholder values to avoid errors
    if (!url || !key) {
      supabaseAdminClient = createClient('https://placeholder.supabase.co', 'placeholder-key')
    } else {
      supabaseAdminClient = createClient(url, key)
    }
  }
  
  return supabaseAdminClient
}

// Lazy initialization - only creates client when accessed
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return getSupabaseAdmin()[prop as keyof SupabaseClient]
  }
})

