import * as React from "react"
import { tv, VariantProps } from "tailwind-variants"
import { Slot } from "@radix-ui/react-slot"

const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  variants: {
    variant: {
      default: "bg-blue-500 text-white hover:bg-blue-500/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-zinc-200 text-black hover:bg-zinc-200/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "underline-offset-4 hover:underline text-primary",
    },
    size: {
      default: "h-8 py-2 px-4",
      sm: "h-6 px-3 text-xs",
      lg: "h-10 px-8",
      xs: "h-5 px-2 text-xs",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  left?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild,
      children,
      isLoading,
      disabled,
      left,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = isLoading || disabled

    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin i-lucide-loader-2"></span>
        )}
        {!isLoading && left}
        {children}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
