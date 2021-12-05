import { AuthenticationError } from 'apollo-server-micro'
import { User as DB_User } from '@prisma/client'
import { Context } from './gql-context'
import { prisma } from './prisma'

export type AuthUser = DB_User & {}

export const getAuthUser = async (uid?: string): Promise<AuthUser | null> => {
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
