import { User as DB_User } from "@prisma/client"
import { prisma } from "./prisma"
import { IncomingMessage } from "http"

export type CurrentUser = DB_User & {}

// TODO: implement an actual auth system
const getUserId = (req: IncomingMessage) => {
  return req.headers.authorization
}

export const getCurrentUser = async (
  req: IncomingMessage,
): Promise<CurrentUser | null> => {
  const uid = getUserId(req)

  if (!uid) return null
  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  })
  return user
}
