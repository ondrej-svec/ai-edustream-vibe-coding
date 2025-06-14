import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full shadow-lg hover:from-accent hover:to-primary/80 hover:shadow-xl",
        destructive:
          "bg-destructive text-destructive-foreground rounded-full shadow-md hover:bg-destructive/90 hover:shadow-lg",
        outline:
          "border border-input bg-background rounded-full hover:bg-accent hover:text-accent-foreground hover:shadow-md",
        secondary:
          "bg-secondary text-secondary-foreground rounded-full shadow hover:bg-secondary/80 hover:shadow-md",
        ghost:
          "rounded-full hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2 text-base",
        sm: "h-9 rounded-full px-4 text-sm",
        lg: "h-12 rounded-full px-8 text-lg",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export { buttonVariants } 