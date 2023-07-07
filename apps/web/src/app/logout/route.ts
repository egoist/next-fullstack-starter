import { NextRequest, NextResponse } from "next/server"
import { env } from "~/server/env"

export const GET = (request: NextRequest) => {
  const url = request.nextUrl.clone()
  url.pathname = "/"
  const res = NextResponse.redirect(url)
  res.cookies.delete(env.AUTH_COOKIE_NAME)
  return res
}
