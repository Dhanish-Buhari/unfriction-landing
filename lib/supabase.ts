import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    
    // During build, use placeholder values to avoid errors
    if (!url || !key) {
      supabaseClient = createClient('https://placeholder.supabase.co', 'placeholder-key')
    } else {
      supabaseClient = createClient(url, key)
    }
  }
  
  return supabaseClient
}

// Lazy initialization - only creates client when accessed
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return getSupabaseClient()[prop as keyof SupabaseClient]
  }
})

