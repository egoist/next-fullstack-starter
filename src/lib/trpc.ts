import { AppRouter } from "$server/trpc"
import { createReactQueryHooks } from "@trpc/react"

export const trpc = createReactQueryHooks<AppRouter>()
