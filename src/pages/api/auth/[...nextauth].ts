import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "$server/prisma"
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_DOMAIN,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "$server/config"
import { truthy } from "$src/lib/utils"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  cookies: {
    sessionToken: {
      name: AUTH_COOKIE_NAME,
      options: {
        domain: AUTH_COOKIE_DOMAIN,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    GOOGLE_CLIENT_ID &&
      GOOGLE_CLIENT_SECRET &&
      GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    GITHUB_CLIENT_ID &&
      GITHUB_CLIENT_SECRET &&
      GitHubProvider({
        clientId: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
      }),
  ].filter(truthy),
}

export default NextAuth(authOptions)
