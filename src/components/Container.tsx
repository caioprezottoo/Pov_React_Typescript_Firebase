import React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { containerVariants } from '../variants/container-variants'

interface ContainerProps extends React.ComponentProps<"div">, VariantProps<typeof containerVariants> {
    as?: keyof React.JSX.IntrinsicElements
    className?: string
}

export default function Container({ as = "div", size, children, className, ...props }: ContainerProps) {
    return React.createElement(
        as,
        {
            className: containerVariants({ size, className }),
            ...props
        },
        children
    )
}