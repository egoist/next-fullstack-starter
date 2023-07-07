import { toast } from "react-hot-toast"

export const toastError = (error: unknown, id?: string) => {
  if (error instanceof Error) {
    const message = error.message

    toast.error(message, {
      id,
    })
  } else if (typeof error === "string") {
    toast.error(error, {
      id,
    })
  }
}
