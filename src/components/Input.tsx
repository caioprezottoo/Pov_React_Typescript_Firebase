import React from 'react'
import Icon from './Icon'

interface InputProps extends React.ComponentProps<"input"> {
    className?: string
    icon?: React.FC<React.ComponentProps<"svg">>
}

export default function Input({ className, icon: IconSvg, ...props }: InputProps) {
    return (
        <div className="relative w-full">
            {IconSvg && (
                <Icon
                    svg={IconSvg}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 
                        w-5 h-5 pointer-events-none`}
                />
            )}
            <input
                className={`
                    w-57 sm:w-66 lg:w-66 h-10 sm:h-12 lg:h-12 rounded-2xl p-3 inline-flex
                    items-start self-stretch focus:border
                    focus:border-solid focus:border-gray-100
                    text-gray-100 outline-none my-2
                    bg-gradient-input
                    ${className}
                `}
                {...props}
            />
        </div>
    )
}
