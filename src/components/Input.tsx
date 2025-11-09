import React from 'react'
import Icon from './Icon'
import type { VariantProps } from 'class-variance-authority'
import { inputVariants } from '@/variants/input-variants'

interface InputProps extends React.ComponentProps<"input">, VariantProps<typeof inputVariants> {
    className?: string
    icon?: React.FC<React.ComponentProps<"svg">>
}

export default function Input({ className, variant, icon: IconSvg, ...props }: InputProps) {
    return (
        <div className="relative">
            {IconSvg && (
                <Icon
                    svg={IconSvg}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 
                        w-3 h-3 pointer-events-none`}
                />
            )}
            <input
                className={`
                    ${inputVariants({ variant })}
                    ${className}
                `}
                {...props}
            />
        </div>
    )
}
