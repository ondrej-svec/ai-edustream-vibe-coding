import { cva } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-accent hover:to-primary/80 hover:shadow-md",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:shadow-md",
        outline: "text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export { badgeVariants } 