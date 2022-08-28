import * as trpcNext from "@trpc/server/adapters/next"
import { appRouter, createContext } from "$server/trpc"

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
