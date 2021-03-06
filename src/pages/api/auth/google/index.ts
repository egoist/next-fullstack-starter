import connect from 'next-connect'
import { passport } from '@server/lib/passport'

const handler = connect()

handler.use(
  passport.initialize(),
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

export default handler
