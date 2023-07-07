import { LoginForm } from "~/components/LoginForm"
import { Spinner } from "~/components/ui/Spinner"
import { APP_NAME } from "~/lib/config"
import { useCurrentUser } from "~/lib/current-user"

export default function Page() {
  const currentUser = useCurrentUser()
  return (
    <div className="py-12 max-w-md mx-auto">
      <h1 className="text-2xl mb-5 font-bold">{APP_NAME}</h1>
      {currentUser.isLoading ? (
        <Spinner />
      ) : currentUser.data ? (
        <p>Hi, {currentUser.data.email}</p>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}
