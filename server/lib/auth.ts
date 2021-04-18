import { IncomingMessage } from 'http'
import { getSession } from 'next-auth/client'
import { prisma } from './singletion'

export const getCurrentUser = async (req: IncomingMessage) => {
  const session = await getSession({ req })
  if (!session) return

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id as number,
    },
  })
  return user
}
