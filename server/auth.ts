import { AuthenticationError } from 'apollo-server-micro'
import { User as DB_User } from '@prisma/client'
import { Context } from './gql-context'
import { prisma } from './prisma'
import { IncomingMessage } from 'http'
import { getSession } from 'next-auth/react'

export type AuthUser = DB_User & {}

export const getAuthUser = async (
  req: IncomingMessage,
): Promise<AuthUser | null> => {
  const session = await getSession({ req })

  const uid = session?.userId as string | undefined

  if (!uid) return null
  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  })
  return user
}

export const getAuth = <TRequireAuth extends boolean = false>(
  ctx: Context,
  options: { requireAuth?: TRequireAuth } = {},
) => {
  const { user } = ctx

  if (!user && options.requireAuth) {
    throw new AuthenticationError('You must be logged in')
  }

  return {
    user: user as TRequireAuth extends true
      ? AuthUser
      : AuthUser | undefined | null,
  }
}
