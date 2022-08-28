import * as trpc from "@trpc/server"
import { CreateNextContextOptions } from "@trpc/server/adapters/next"
import { IncomingMessage, ServerResponse } from "http"
import { CurrentUser, getCurrentUser } from "./auth"

export type Context = {
  req: IncomingMessage
  res: ServerResponse
  user: CurrentUser | null
}

export const createContext = async ({
  req,
  res,
}: CreateNextContextOptions): Promise<Context> => {
  const user = await getCurrentUser(req, res)
  return {
    req,
    res,
    user,
  }
}

export const createRouter = () => trpc.router<Context>()
