import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { toast } from "./sonner.toast"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-gradient-to-r group-[.toaster]:from-primary group-[.toaster]:to-accent group-[.toaster]:text-primary-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl rounded-full font-heading",
          description: "group-[.toast]:text-muted-foreground font-sans",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground rounded-full font-heading",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground rounded-full font-heading",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
