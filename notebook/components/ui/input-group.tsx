import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("relative flex w-full", className)}
            {...props}
        />
    )
)
InputGroup.displayName = "InputGroup"

const InputGroupAddon = React.forwardRef<HTMLDivElement, { align?: "block-end" | "inline-end" } & React.HTMLAttributes<HTMLDivElement>>(
    ({ className, align, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "absolute right-3 bottom-2 pointer-events-none",
                align === "block-end" && "bottom-2 right-3",
                className
            )}
            {...props}
        />
    )
)
InputGroupAddon.displayName = "InputGroupAddon"

const InputGroupText = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ className, ...props }, ref) => (
        <span
            ref={ref}
            className={cn("text-xs text-muted-foreground", className)}
            {...props}
        />
    )
)
InputGroupText.displayName = "InputGroupText"

const InputGroupTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-16",
                className
            )}
            ref={ref}
            {...props}
        />
    )
)
InputGroupTextarea.displayName = "InputGroupTextarea"

export { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea }
