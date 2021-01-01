import passport, { Profile } from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github'
import { AUTH_COOKIE_NAME } from './constants'
import { createSecureToken } from './auth'
import { serialize } from 'cookie'
import { getRepos } from '../orm'
import { NextApiRequest, NextApiResponse } from 'next'

passport.serializeUser<any, number>((user, done) => {
  done(null, user.id)
})

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
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
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`,
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
  const avatar = profile.photos![0].value

  const providerKey = `${provider}UserId` as 'githubUserId' | 'googleUserId'

  const repos = await getRepos()
  // Find one by provider user id
  let existing = await repos.user.findOne({
    where: {
      [providerKey]: profile.id,
    },
  })
  // Otherwise find one with the same email and link them
  if (!existing) {
    existing = await repos.user.findOne({
      where: {
        email,
      },
    })
    if (existing) {
      await repos.user.update(
        {
          id: existing.id,
        },
        {
          [providerKey]: profile.id,
        },
      )
    }
  }

  if (!existing) {
    existing = repos.user.create({
      email,
      name: profile.displayName || profile.username,
      [providerKey]: profile.id,
      avatar,
    })
    await repos.user.save(existing)
  }

  if (avatar && existing.avatar !== avatar) {
    await repos.user.update(
      {
        id: existing.id,
      },
      {
        avatar,
      },
    )
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
