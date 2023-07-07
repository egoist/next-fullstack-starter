import { inferAsyncReturnType } from "@trpc/server"
import { createGate } from "../gate"
import { getUserFromHeader } from "../auth"
import { IncomingMessage, ServerResponse } from "http"

export async function createContext({
  req,
  res,
}: {
  req: IncomingMessage
  res: ServerResponse
}) {
  const user = await getUserFromHeader(req)
  const gate = createGate(user)
  return { req, res, user, gate }
}
export type Context = inferAsyncReturnType<typeof createContext>
