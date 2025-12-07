import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  // Check if user exists
  const { data: userList } = await supabaseAdmin.auth.admin.listUsers()
  const existingUser = userList.users.find((u) => u.email === email)

  let userId = existingUser?.id

  // Create user if missing
  if (!userId) {
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
    })
    if (error || !created?.user) {
      return NextResponse.json({ error: 'Unable to create user' }, { status: 500 })
    }
    userId = created.user.id
  }

  // Ensure profile exists
  const { data: profile, error: profileErr } = await supabaseAdmin
    .from('profiles')
    .upsert(
      { id: userId, email },
      { onConflict: 'id' }
    )
    .select()
    .single()

  if (profileErr) {
    return NextResponse.json({ error: 'Profile error' }, { status: 500 })
  }

  return NextResponse.json({
    userId,
    plan: profile.plan,
    notesLimit: profile.notes_limit,
    ocrLimit: profile.ocr_limit,
    isEarlyAdopter: profile.is_early_adopter,
  })
}

