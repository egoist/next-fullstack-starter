import { unstable_getServerSession } from "next-auth"
import { authOptions } from "$src/pages/api/auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"

export type CurrentUser = {
  id: string
  email?: string | null
  emailVerified?: Date | null
  name?: string | null
  image?: string | null
}

export const getCurrentUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<CurrentUser | null> => {
  const session: any = await unstable_getServerSession(req, res, authOptions)
  return session.user || null
}
