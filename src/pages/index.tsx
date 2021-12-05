import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

type Props = { isLoggedIn: boolean }

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const session = await getSession({ req })

  return {
    props: {
      isLoggedIn: !!session,
    },
  }
}

export default function Page({ isLoggedIn }: Props) {
  return (
    <div className="text-center py-12">
      {isLoggedIn ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <Link href="/api/auth/signin">
          <a>Sign In</a>
        </Link>
      )}
    </div>
  )
}
