import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
  const [session, loading] = useSession()

  return (
    <div className="text-center py-12">
      {!session && (
        <>
          <div className="mb-3">Not signed in</div>
          <button
            className="rounded-md border bg-indigo-500 text-white px-4 h-10 inline-flex items-center"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          <div className="mb-3">Signed in as {session.user.email}</div>
          <button
            className="rounded-md border bg-red-500 text-white px-4 h-10 inline-flex items-center"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      )}
    </div>
  )
}
