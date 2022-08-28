import { z } from "zod"
import { createRouter } from "./utils"

export const appRouter = createRouter().query("hello", {
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
