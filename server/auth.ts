import { IncomingMessage, ServerResponse } from 'http'
import cookie from 'cookie'
import { AuthenticationError } from 'apollo-server-micro'
import { verify, sign } from 'jsonwebtoken'
import { User } from '@prisma/client'
import { prisma } from './prisma'
import { Context } from './gql-context'

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME
const AUTH_COOKIE_DOMAIN = process.env.AUTH_COOKIE_DOMAIN
const AUTH_SECRET = process.env.AUTH_SECRET

export const getSession = async (req: IncomingMessage) => {
  const parsedCookie = cookie.parse(req.headers.cookie || '')
  const token = parsedCookie[AUTH_COOKIE_NAME]

  if (!token) return null

  try {
    const { uid } = verify(token, AUTH_SECRET) as { uid: number }

    const user = await prisma.user.findUnique({
      where: {
        id: uid,
      },
    })
    return user
  } catch (error) {
    return null
  }
}

const isProd = process.env.NODE_ENV === 'production'

const redirect = (res: ServerResponse, url: string) => {
  res.setHeader('location', url)
  res.statusCode = 302
  res.end()
}

export const login = (res: ServerResponse, uid: number, redirectTo: string) => {
  const jwt = sign({ uid }, AUTH_SECRET, { expiresIn: '30d' })
  res.setHeader(
    'set-cookie',
    cookie.serialize(AUTH_COOKIE_NAME, jwt, {
      path: '/',
      secure: isProd,
      sameSite: 'lax',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      domain: AUTH_COOKIE_DOMAIN,
    }),
  )
  redirect(res, redirectTo)
}

export const logout = (res: ServerResponse, redirectTo: string) => {
  res.setHeader(
    'set-cookie',
    cookie.serialize(AUTH_COOKIE_NAME, '', {
      path: '/',
      httpOnly: true,
      maxAge: 0,
    }),
  )
  redirect(res, redirectTo)
}

export const getAuth = <TRequireAuth extends boolean = false>(
  ctx: Context,
  options: { requireAuth?: TRequireAuth } = {},
) => {
  const { user } = ctx

  if (!user && options.requireAuth) {
    throw new AuthenticationError('You must be logged in')
  }

  return {
    user: user as TRequireAuth extends true ? User : User | undefined | null,
  }
}
