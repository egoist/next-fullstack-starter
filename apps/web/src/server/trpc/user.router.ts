import { t } from "./t"

export const userRouter = t.router({
  currentUser: t.procedure.query(({ ctx }) => {
    return ctx.user
  }),
})
