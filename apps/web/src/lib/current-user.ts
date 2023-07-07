import { trpc } from "./trpc"

export const useCurrentUser = () =>
  trpc.user.currentUser.useQuery(undefined, {
    trpc: {
      context: {
        skipBatch: true,
      },
    },
  })
