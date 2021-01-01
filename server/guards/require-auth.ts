import { AuthenticationError, ApolloError } from 'apollo-server-micro'
import { Context } from '@server/decorators/gql-context'

export function requireAuth(context: Context) {
  if (!context.user) {
    throw new AuthenticationError(`Unauthenticated`)
  }

  return context.user
}

const ADMIN_IDS = [1]
export function requireAdmin(user: { id: number }) {
  if (!ADMIN_IDS.includes(user.id)) {
    throw new ApolloError(`Require admin permission`)
  }
}

export function isAdmin(user: { id: number }) {
  return ADMIN_IDS.includes(user.id)
}
