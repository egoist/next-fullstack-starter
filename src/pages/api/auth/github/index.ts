import connect from 'next-connect'
import { passport } from '@server/lib/passport'

const handler = connect()

handler.use(
  passport.initialize(),
  passport.authenticate('github', {
    scope: ['user:email'],
  }),
)

export default handler
