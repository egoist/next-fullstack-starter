import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '$server/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  cookies: {
    sessionToken: {
      name: process.env.AUTH_COOKIE_NAME,
      options: {
        domain: process.env.AUTH_COOKIE_DOMAIN,
        path: '/',
        secure: true,
        httpOnly: true,
        // Apollo Studio requires sameSite: none
        sameSite: process.env.NODE_ENV === 'development' ? 'none' : 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      },
    },
  },
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session, token }) {
      session.userId = token.sub
      return session
    },
  },
})
