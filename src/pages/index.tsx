import { trpc } from "$src/lib/trpc"
import { unstable_getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { authOptions } from "$src/pages/api/auth/[...nextauth]"
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  return {
    props: {
      session,
    },
  }
}

export default function Page() {
  const hello = trpc.useQuery(["hello"])
  const session = useSession()
  return (
    <div className="text-center py-12">
      <h1>{hello.data?.greeting}</h1>
      {session.data?.user?.name}
    </div>
  )
}
