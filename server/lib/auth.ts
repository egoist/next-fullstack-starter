import { IncomingMessage } from 'http'
import cookie from 'cookie'
import { NextApiRequest } from 'next'
import Iron from '@hapi/iron'
import { AUTH_COOKIE_NAME } from './constants'
import { prisma } from './singletion'

export type CookieUserPayload = {
  userId: number
}

export function createSecureToken(payload: CookieUserPayload) {
  const token = Iron.seal(payload, process.env.AUTH_SECRET, Iron.defaults)
  return token
}

export async function parseSecureToken(
  token?: string,
): Promise<CookieUserPayload | null> {
  if (!token) return null
  try {
    return Iron.unseal(token, process.env.AUTH_SECRET, Iron.defaults)
  } catch (error) {
    ;`
    console.error('auth error', error)`
    return null
  }
}

export type AuthUser = {
  id: number
  avatarUrl?: string | null
}

export const getServerSession = async (
  req: NextApiRequest | IncomingMessage,
): Promise<{ user: AuthUser | null }> => {
  const token = cookie.parse(req.headers.cookie || '')[AUTH_COOKIE_NAME]

  const cookieUserPayload = await parseSecureToken(token)

  if (!cookieUserPayload) {
    return { user: null }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: cookieUserPayload.userId,
    },
  })

  return {
    user: user
      ? {
          id: user.id,
          avatarUrl: user.avatarUrl,
        }
      : null,
  }
}
