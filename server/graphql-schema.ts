import { buildSchema } from "type-graphql"
import { singletonAsync } from "./singleton"

export const schema = singletonAsync(
  "graphq-schema",
  async () => {
    const resolvers: any = []
    // @ts-expect-error
    const r = require.context("./resolvers", false, /\.resolver\.ts$/)

    for (const key of r.keys()) {
      const mod = await r(key)
      resolvers.push(mod.default)
    }

    const schema = await buildSchema({
      resolvers,
    })

    return schema
  },
  // Always rebuild schema on each request in development
  process.env.NODE_ENV === "production",
)
