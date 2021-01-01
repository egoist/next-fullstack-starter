import { AUTH_COOKIE_NAME } from '@server/lib/constants'
import { serialize } from 'cookie'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = (req, res) => {
  const authCookie = serialize(AUTH_COOKIE_NAME, '', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 0,
  })
  res.setHeader('Set-Cookie', [authCookie])
  res.redirect('/login')
}

export default handler
