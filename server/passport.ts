import passport from 'passport'
import { Profile } from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github'
import connect from 'next-connect'
import { prisma } from './prisma'
import { ServerResponse } from 'http'
import { login } from './auth'
import { NextApiHandler } from 'next'

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser<any>(function (obj, cb) {
  cb(null, obj)
})

const PROVIDERS: Array<{
  name: string
  clientId?: string
  clientSecret?: string
  Strategy: typeof GitHubStrategy
  scope: string[]
}> = [
  {
    name: 'google',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // @ts-expect-error
    Strategy: GoogleStrategy,
    scope: ['openid', 'email', 'profile'],
  },
  {
    name: 'github',
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    Strategy: GitHubStrategy,
    scope: ['user:email'],
  },
]

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN

for (const provider of PROVIDERS) {
  if (provider.clientSecret && provider.clientId) {
    passport.use(
      new provider.Strategy(
        {
          clientID: provider.clientId,
          clientSecret: provider.clientSecret,
          callbackURL: `${APP_DOMAIN ? `https://${APP_DOMAIN}` : ''}/api/auth/${
            provider.name
          }/callback`,
        },
        async (_, refreshToken, profile, cb) => {
          try {
            const user = await findOrCreateUser(profile, provider.name)
            cb(null, user)
          } catch (error) {
            cb(error)
          }
        },
      ),
    )
  }
}

const findOrCreateUser = async (profile: Profile, provider: string) => {
  const key = `${provider}UserId`

  let existing = await prisma.user.findUnique({
    where: {
      [key]: profile.id,
    },
  })

  const email = profile.emails && profile.emails[0].value
  if (!email) throw new Error('missing email')

  if (!existing) {
    existing = await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  if (!existing) {
    // create user
    existing = await prisma.user.create({
      data: {
        email,
        name: profile.displayName || email.split('@')[0],
        [key]: profile.id,
      },
    })
  }

  return existing
}

export { passport }

export const passportMiddleware: NextApiHandler = async (req, res) => {
  const slugArray = req.query.slug as string[]
  const slug = slugArray.join('/')
  const name = slugArray[0]
  const provider = PROVIDERS.find((p) => p.name === name)

  const app = connect()

  if (provider) {
    app.use(passport.initialize())

    if (slug === provider.name) {
      app.use(
        passport.authenticate(provider.name, {
          scope: provider.scope,
        }),
      )
    } else if (slug === `${provider.name}/callback`) {
      app
        .use(
          passport.authenticate(provider.name, { failureRedirect: '/login' }),
        )
        .use((req: any, res: ServerResponse) => {
          login(res, req.user.id, '/')
        })
    }
  }

  await app(req, res)
}
