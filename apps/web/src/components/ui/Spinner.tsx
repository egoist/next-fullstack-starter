import { useEffect, useState } from "react"
import { cn } from "~/lib/cn"

export const Spinner = ({
  className,
  delay,
}: {
  className?: string
  delay?: number
}) => {
  const [show, setShow] = useState(!delay)

  useEffect(() => {
    const id = window.setTimeout(() => {
      setShow(true)
    }, delay)

    return () => {
      window.clearTimeout(id)
    }
  }, [delay])

  if (!show) {
    return null
  }

  return (
    <div className={cn("spinner", className)}>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
    </div>
  )
}
