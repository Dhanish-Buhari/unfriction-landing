export async function fetchUserProfile(email: string) {
  const res = await fetch('/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) throw new Error('Failed to fetch user profile')
  return await res.json()
}

