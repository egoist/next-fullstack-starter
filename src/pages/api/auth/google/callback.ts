import { handleSuccessfulLogin, passport } from '@server/lib/passport'
import { NextApiRequest, NextApiResponse } from 'next'
import connect from 'next-connect'

export default connect<NextApiRequest, NextApiResponse>().use(
  passport.initialize(),
  passport.authenticate('google', { failureRedirect: '/login' }),
  handleSuccessfulLogin,
)
