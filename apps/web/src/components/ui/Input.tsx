"use client"
import { forwardRef, useEffect, useState } from "react"
import { tv } from "tailwind-variants"
import { Slot } from "@radix-ui/react-slot"

const style = tv({
  base: "border w-full rounded-lg h-10 inline-flex items-center px-3 focus:ring outline-none bg-white dark:bg-transparent focus:border-blue-400 ring-blue-400 read-only:focus:ring-0 dark:text-white dark:ring-blue-600 dark:focus:border-blue-600",
})

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  asChild?: boolean
  suffix?: React.ReactNode
  isPassword?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, asChild, suffix, isPassword, ...props }, ref) => {
    const Comp = asChild ? Slot : "input"
    const [isRevealed, setIsRevealed] = useState(false)

    return (
      <div className="w-full flex relative">
        <Comp
          type={!isPassword || isRevealed ? "text" : "password"}
          {...props}
          ref={ref}
          className={style({ className })}
        />
        {isPassword ? (
          <button
            type="button"
            className="inline-flex items-center absolute right-0 h-full w-10 justify-center"
            onClick={() => setIsRevealed((v) => !v)}
          >
            <span
              className={isRevealed ? "i-tabler-eye-off" : "i-tabler-eye"}
            ></span>
          </button>
        ) : (
          suffix
        )}
      </div>
    )
  },
)
