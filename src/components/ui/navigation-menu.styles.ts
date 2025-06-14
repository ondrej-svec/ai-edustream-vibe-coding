import { cva } from "class-variance-authority"

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-full bg-background px-6 py-2 text-base font-heading font-semibold transition-colors shadow-sm hover:bg-accent hover:text-accent-foreground hover:shadow-md focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gradient-to-r data-[active]:from-primary data-[active]:to-accent data-[state=open]:bg-gradient-to-r data-[state=open]:from-primary data-[state=open]:to-accent"
)

export { navigationMenuTriggerStyle } 