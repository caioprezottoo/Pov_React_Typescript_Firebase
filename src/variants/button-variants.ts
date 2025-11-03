import { cva } from "class-variance-authority";
import { textVariants } from '../variants/text-variants'


export const buttonVariants = cva(`
        w-[17.375rem] h-12 rounded-2xl bg-gray-100 cursor-pointer ${textVariants({ variant: "m-text-sm" })}
    `, {
    variants: {
        variant: {
            "primary": "text-gray-400",
            "secondary": "bg-transparent border-2 border-gray-100 text-gray-100"
        }
    }
})