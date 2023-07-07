import { useState } from "react"
import { useForm } from "react-hook-form"
import { trpc } from "~/lib/trpc"
import { toastError } from "~/lib/toast"
import { useRouter } from "next/router"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

export const LoginForm = () => {
  const router = useRouter()
  const trpcContext = trpc.useContext()
  const [sentLoginCode, setSentLoginCode] = useState(false)
  const { handleSubmit, register, watch, reset } = useForm({
    defaultValues: {
      email: "",
      loginCode: "",
    },
  })
  const email = watch("email")
  const requestLoginCode = trpc.auth.requestLoginCode.useMutation({
    onSuccess() {
      setSentLoginCode(true)
    },
    onError(error) {
      toastError(error)
    },
  })
  const login = trpc.auth.login.useMutation({
    onSuccess() {
      trpcContext.invalidate()
      router.push("/")
    },
    onError(error) {
      toastError(error)
    },
  })

  const onSubmit = handleSubmit((values) => {
    if (sentLoginCode) {
      login.mutate({
        email: values.email,
        loginCode: values.loginCode,
      })
      return
    }
    requestLoginCode.mutate({
      email: values.email,
    })
  })
  return (
    <form className="grid gap-3 mt-3" onSubmit={onSubmit}>
      {sentLoginCode ? (
        <div className="text-sm text-green-500">
          A login code has been sent to{" "}
          <span className="font-bold">{email}</span>, please enter it below.
        </div>
      ) : (
        <div className="text-sm text-zinc-500">
          Enter your email and we'll send you a secure login code.
        </div>
      )}

      {!sentLoginCode && (
        <div>
          <Input
            type="email"
            className="bg-zinc-100"
            required
            autoComplete="off"
            autoFocus
            placeholder="Email address"
            {...register("email")}
          />
        </div>
      )}

      {sentLoginCode && (
        <div>
          <Input
            required
            placeholder="login code"
            className="bg-zinc-100"
            autoFocus
            {...register("loginCode")}
          />
        </div>
      )}

      <div className="flex gap-1 items-center">
        <Button
          type="submit"
          variant="outline"
          className="h-10 rounded-lg hover:bg-zinc-50"
          isLoading={login.isLoading || requestLoginCode.isLoading}
        >
          {sentLoginCode ? "Log in" : "Submit"}
        </Button>
      </div>
    </form>
  )
}
