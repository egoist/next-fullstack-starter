import { AuthUser } from '@server/lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { createParamDecorator } from 'type-graphql'

export type Context = {
  req: NextApiRequest
  res: NextApiResponse
  user?: AuthUser | null
}

export function GqlContext() {
  return createParamDecorator<Context>(({ context }) => context)
}
