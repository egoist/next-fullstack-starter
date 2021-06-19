import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { createParamDecorator } from 'type-graphql'

export type Context = {
  req: NextApiRequest
  res: NextApiResponse
  user?: User | null
}

export function GqlContext() {
  return createParamDecorator<Context>(({ context }) => context)
}
