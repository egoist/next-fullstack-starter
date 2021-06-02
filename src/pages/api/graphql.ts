import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import { schema } from '$server/lib/graphql-schema'
import { getCurrentUser } from '$server/lib/auth'

export const config = {
  api: {
    bodyParser: false,
  },
}

let handler: any

const isProd = process.env.NODE_ENV === 'production'

const apiHandler: NextApiHandler = async (req, res) => {
  if (handler && isProd) {
    return handler(req, res)
  }

  await schema.wait
  const apolloServer = new ApolloServer({
    schema: schema.value,
    tracing: !isProd,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    async context({ req, res }) {
      const user = await getCurrentUser(req)
      return {
        req,
        res,
        user,
      }
    },
  })

  handler = apolloServer.createHandler({
    path: `/api/graphql`,
  })

  return handler(req, res)
}

export default apiHandler
