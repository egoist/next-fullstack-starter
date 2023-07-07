import { z } from "zod"
import { t } from "./t"
import { prisma } from "../prisma"
import { TRPCError } from "@trpc/server"
import { setAuthCookie } from "../auth"
import { nanoid, customAlphabet } from "nanoid"
import dayjs from "dayjs"
import { sendLoginCodeEmail } from "../email"

const generateLoginCode = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRXTUVWXYZ",
  6,
)

export const authRouter = t.router({
  login: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        loginCode: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const loginCode = await prisma.loginCode.findUnique({
        where: {
          email_code: {
            email: input.email,
            code: input.loginCode,
          },
        },
      })

      if (!loginCode) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Login code not found",
        })
      }

      if (loginCode.expiresAt < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Login code expired",
        })
      }

      let user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: input.email,
          },
        })
      }

      const [session] = await Promise.all([
        prisma.session.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
            name: "Login via Email",
            token: nanoid(),
          },
        }),
        prisma.loginCode.delete({
          where: {
            id: loginCode.id,
          },
        }),
      ])

      setAuthCookie(ctx.res, session.token)
    }),

  requestLoginCode: t.procedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      const loginCode = await prisma.loginCode.create({
        data: {
          email: input.email,
          expiresAt: dayjs().add(30, "minute").toDate(),
          code: generateLoginCode(),
        },
      })

      await sendLoginCodeEmail({ email: input.email, code: loginCode.code })
    }),
})
