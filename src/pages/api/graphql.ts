import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import { getSchema } from '@server/lib/graphql'
import { getServerSession } from '@server/lib/auth'

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

  const schema = await getSchema()

  const apolloServer = new ApolloServer({
    schema,
    tracing: !isProd,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    async context({ req, res }) {
      const { user } = await getServerSession(req)
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
