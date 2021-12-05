import 'reflect-metadata'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import connect from 'next-connect'
import cors from 'cors'
import { schema } from '$server/graphql-schema'
import { getSession } from 'next-auth/react'
import { getAuthUser } from '$server/auth'

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
    plugins: [ApolloServerPluginLandingPageLocalDefault],
    async context({ req, res }) {
      const session = await getSession({ req })
      const user = await getAuthUser(session?.userId as string)
      return {
        req,
        res,
        user,
      }
    },
  })

  await apolloServer.start()

  handler = apolloServer.createHandler({
    path: `/api/graphql`,
  })

  return handler(req, res)
}

export default connect().use(cors({})).use(apiHandler)
