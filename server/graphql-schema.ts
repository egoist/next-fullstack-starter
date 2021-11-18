import { buildSchema } from 'type-graphql'
import { singletonAsync } from './singleton'

export const schema = singletonAsync(
  'graphq-schema',
  async () => {
    const resolvers: any = []
    // @ts-expect-error
    const r = require.context('./resolvers', false, /\.resolver\.ts$/)
    r.keys().forEach((key: string) => {
      resolvers.push(r(key).default)
    })

    const schema = await buildSchema({
      resolvers,
    })

    return schema
  },
  // Always rebuild schema on each request in development
  process.env.NODE_ENV === 'production',
)
