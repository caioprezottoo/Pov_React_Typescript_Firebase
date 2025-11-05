import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"
import React from "react"
import { buttonVariants } from "../variants/button-variants"
import Icon from "./Icon"

interface ButtonProps
    extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
    children?: React.ReactNode
    icon?: React.FC<React.ComponentProps<"svg">>
}

export default function Button({
    children,
    variant,
    className,
    icon: IconSvg,
    ...props
}: ButtonProps) {
    return (
        <div>
            <button
                className={`${cn(buttonVariants({ variant }), className)} flex items-center justify-center`}
                {...props}
            >
                {IconSvg && (
                    <Icon
                        svg={IconSvg}
                        className={`absolute w-3 h-3 pointer-events-none`}
                    />
                )}
                {children}
            </button>
        </div>

    )
}
