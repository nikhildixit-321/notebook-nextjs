import * as React from "react"
import { cn } from "@/lib/utils"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
    "data-invalid"?: boolean
    orientation?: "horizontal" | "vertical"
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
    ({ className, orientation = "vertical", ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "flex flex-col gap-2",
                orientation === "horizontal" && "flex-row items-center",
                className
            )}
            {...props}
        />
    )
)
Field.displayName = "Field"

const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props} />
    )
)
FieldGroup.displayName = "FieldGroup"

const FieldLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => (
        <label
            ref={ref}
            className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                className
            )}
            {...props}
        />
    )
)
FieldLabel.displayName = "FieldLabel"

const FieldDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    )
)
FieldDescription.displayName = "FieldDescription"

const FieldError = React.forwardRef<HTMLParagraphElement, { errors: any[] } & React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, errors, ...props }, ref) => {
        if (!errors || errors.length === 0 || !errors[0]) return null
        return (
            <p
                ref={ref}
                className={cn("text-sm font-medium text-destructive", className)}
                {...props}
            >
                {errors[0].message}
            </p>
        )
    }
)
FieldError.displayName = "FieldError"

export { Field, FieldGroup, FieldLabel, FieldDescription, FieldError }
