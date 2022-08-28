import { CurrentUser, getCurrentUser } from "$server/auth"
import * as trpc from "@trpc/server"
import { CreateHTTPContextOptions } from "@trpc/server/dist/declarations/src/adapters/standalone"
import { IncomingMessage, ServerResponse } from "http"
import { z } from "zod"

export const appRouter = trpc.router().query("hello", {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  resolve({ input }) {
    return {
      greeting: `hello ${input?.text ?? "world"}`,
    }
  },
})

export type AppRouter = typeof appRouter

export type Context = {
  req: IncomingMessage
  res: ServerResponse
  user: CurrentUser | null
}

export const createContext = async ({
  req,
  res,
}: CreateHTTPContextOptions): Promise<Context> => {
  const user = await getCurrentUser(req)
  return {
    req,
    res,
    user,
  }
}
