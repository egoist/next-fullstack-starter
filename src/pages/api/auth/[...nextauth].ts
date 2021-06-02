import NextAuth from 'next-auth'
import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'
import { prisma } from '$server/lib/prisma'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DB_URL,

  adapter: Adapters.Prisma.Adapter({ prisma }),

  callbacks: {
    async session(session, user) {
      return {
        ...session,
        // @ts-expect-error
        user: { ...session.user, id: user.id },
      }
    },
  },
})
