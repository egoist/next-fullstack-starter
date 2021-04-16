import passport, { Profile } from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github'
import { AUTH_COOKIE_NAME } from './constants'
import { createSecureToken } from './auth'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './singletion'

passport.serializeUser<any>((user, done) => {
  done(null, user.id)
})

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, cb) => {
        const user = await getUserByProviderProfile(profile, 'google')
        cb(undefined, user)
      },
    ),
  )
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `/api/auth/github/callback`,
      },
      async (accessToken, refreshToken, profile, cb) => {
        const user = await getUserByProviderProfile(profile, 'github')
        cb(undefined, user)
      },
    ),
  )
}

async function getUserByProviderProfile(
  profile: Profile,
  provider: 'github' | 'google',
) {
  const email = profile.emails![0].value
  const avatarUrl = profile.photos![0].value

  const providerKey = `${provider}UserId`

  // Find one by provider user id
  let existing = await prisma.user.findUnique({
    where: {
      [providerKey]: profile.id,
    },
  })
  // Otherwise find one with the same email and link them
  if (!existing) {
    existing = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (existing) {
      await prisma.user.update({
        where: { id: existing.id },
        data: {
          [providerKey]: profile.id,
        },
      })
    }
  }

  if (!existing) {
    existing = await prisma.user.create({
      data: {
        email,
        [providerKey]: profile.id,
        avatarUrl,
      },
    })
  }

  if (avatarUrl && existing.avatarUrl !== avatarUrl) {
    await prisma.user.update({
      where: {
        id: existing.id,
      },
      data: {
        avatarUrl,
      },
    })
  }

  return existing
}

export { passport }

export async function handleSuccessfulLogin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = (req as $TsFixMe).user
  const authToken = await createSecureToken({
    userId: id,
  })
  const authCookie = serialize(AUTH_COOKIE_NAME, authToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 90, // 3 months
  })
  res.setHeader('Set-Cookie', [authCookie])
  res.redirect('/')
}
