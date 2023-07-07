import { Resend } from "resend"
import { env } from "./env"
import LoginCodeEmailTemplate from "~/components/email-templates/login-code"

const isDev = process.env.NODE_ENV === "development"

export const sendLoginCodeEmail = async ({
  email,
  code,
}: {
  email: string
  code: string
}) => {
  if (isDev) {
    console.log("Login code:", code)
    return
  }

  const resend = new Resend(env.RESEND_API_KEY)
  await resend.emails.send({
    from: `Panik <team@panik.app>`,
    to: [email],
    subject: "Log in to Panik",
    react: LoginCodeEmailTemplate({ code }),
  })
}
