import { initTRPC } from "@trpc/server"
import { Context } from "./context"
import { ZodError } from "zod"

export const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts
    console.error(error)

    let message = shape.message

    if (error.cause instanceof ZodError) {
      message = error.cause.issues
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join("\n")
    }

    return {
      ...shape,
      message,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    }
  },
})
