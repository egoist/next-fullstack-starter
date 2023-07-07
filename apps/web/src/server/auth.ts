import { IncomingMessage, ServerResponse } from "http"
import { z } from "zod"
import Cookie from "cookie"
import { env } from "./env"
import { prisma } from "./prisma"

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  createdAt: z.string(),
})

export type AuthUser = z.infer<typeof AuthUserSchema>

export async function getUserFromHeader(
  req: IncomingMessage,
): Promise<AuthUser | null> {
  const cookie = req.headers.cookie
  const token = cookie ? Cookie.parse(cookie)[env.AUTH_COOKIE_NAME] : null
  if (token) {
    const session = await prisma.session.findUnique({
      where: {
        token,
      },
    })
    if (session) {
      const [user] = await Promise.all([
        prisma.user.findUnique({ where: { id: session.userId } }),
      ])
      if (user) {
        return {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt.toISOString(),
        }
      }
    }
  }
  return null
}

export const setAuthCookie = (
  res: ServerResponse,
  token: string,
  remove?: boolean,
) => {
  const value = Cookie.serialize(env.AUTH_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    domain: env.AUTH_COOKIE_DOMAIN,
    // 1 year
    maxAge: remove ? 0 : 60 * 60 * 24 * 365,
  })

  console.log("set auth cookie", value)
  res.setHeader("Set-Cookie", value)
}
