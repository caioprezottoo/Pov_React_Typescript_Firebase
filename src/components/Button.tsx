import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"
import React from "react"
import { buttonVariants } from "../variants/button-variants"

interface ButtonProps
    extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
    children?: React.ReactNode
}

export default function Button({
    children,
    variant,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ variant }), className)} // ✅ fixed
            {...props}
        >
            {children}
        </button>
    )
}
