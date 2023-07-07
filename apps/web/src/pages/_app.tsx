import "../css/spinner.css"
import "../css/tailwind.css"
import { AppType } from "next/dist/shared/lib/utils"
import { Toaster } from "react-hot-toast"
import { trpc } from "~/lib/trpc"
import { NextSeo } from "next-seo"
import { APP_NAME } from "~/lib/config"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NextSeo title={APP_NAME} />
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

export default trpc.withTRPC(MyApp)
