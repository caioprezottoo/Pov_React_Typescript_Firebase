import { cva } from "class-variance-authority";
import { textVariants } from '../variants/text-variants'


export const buttonVariants = cva(`
        bg-gray-100 cursor-pointer ${textVariants({ variant: "m-text-sm" })} rounded-2xl
        hover:bg-gray-700 active:scale-[0.975] transition-transform duration-300 hover:scale-103
    `, {
    variants: {
        variant: {
            "primary": "text-gray-400 w-[17.375rem] h-12",
            "secondary": "w-16 h-10"
        }
    }
})