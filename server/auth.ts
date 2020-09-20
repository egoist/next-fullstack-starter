import Iron from '@hapi/iron'

export type AuthUser = {
  userId: string
}

export function createSecureToken(payload: AuthUser) {
  const token = Iron.seal(payload, process.env.HASH_KEY, Iron.defaults)
  return token
}

export async function parseSecureToken(
  token: string,
): Promise<AuthUser | null> {
  try {
    return Iron.unseal(token, process.env.HASH_KEY)
  } catch (error) {
    console.error('auth error', error)
    return null
  }
}
