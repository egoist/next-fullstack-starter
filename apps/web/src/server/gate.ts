import { TRPCError } from "@trpc/server"
import { AuthUser } from "./auth"

export const createGate = (user: AuthUser | null) => {
  return {
    getUser: <T extends boolean>(requireAuth: T) => {
      if (requireAuth && !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      return user as T extends true ? AuthUser : AuthUser | null
    },
  }
}
