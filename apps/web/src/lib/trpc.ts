import { httpBatchLink, splitLink, httpLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import { AppRouter } from "~/server/trpc"

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    const url = `/api/trpc`
    return {
      links: [
        splitLink({
          condition(op) {
            // check for context property `skipBatch`
            return op.context.skipBatch === true
          },
          // when condition is true, use normal request
          true: httpLink({
            url,
            fetch: (url, init) =>
              window.fetch(url, {
                credentials: "include",
                ...init,
              }),
          }),
          // when condition is false, use batching
          false: httpBatchLink({
            url,
            fetch: (url, init) =>
              window.fetch(url, {
                credentials: "include",
                ...init,
              }),
          }),
        }),
      ],
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
})
