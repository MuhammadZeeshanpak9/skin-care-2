import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar-gold/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-text-primary text-cream font-jost font-medium tracking-wide px-8 py-4 hover:shadow-card-lift btn-liquid",
        secondary:
          "glass-warm text-text-primary/70 hover:text-text-primary font-jost font-medium tracking-wide px-8 py-4 hover:shadow-gold-glow",
        ghost:
          "bg-transparent text-text-primary/60 hover:text-text-primary font-jost font-normal px-4 py-2 hover:bg-champagne/20",
        gold:
          "bg-solar-gold text-cream font-jost font-medium tracking-wide px-8 py-4 hover:shadow-lg hover:shadow-solar-gold/20 btn-liquid",
        whatsapp:
          "bg-luxury-green text-white font-jost font-medium tracking-wide px-6 py-3 hover:bg-botanical-green btn-liquid",
        outline:
          "border border-border-warm bg-transparent text-text-primary font-jost font-medium px-6 py-3 hover:bg-champagne/10",
      },
      size: {
        default: "h-auto px-8 py-4",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-10 py-5 text-base",
        icon: "h-10 w-10 p-0",
        pill: "px-6 py-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
