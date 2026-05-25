import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-jost font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-champagne/30 text-text-primary",
        gold: "bg-solar-gold/10 text-solar-gold border border-solar-gold/20",
        sage: "bg-light-sage/60 text-botanical-green",
        rose: "bg-rose/20 text-blush-rose",
        dark: "glass-dark text-cream/80 border border-white/10",
        outline: "border border-border-warm text-text-muted bg-transparent",
        cream: "glass-warm text-text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
