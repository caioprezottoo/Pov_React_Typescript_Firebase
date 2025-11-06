import { cva } from "class-variance-authority";

export const inputVariants = cva(`
        rounded-2xl  
        focus:border
        focus:border-solid focus:border-gray-100
        text-gray-100 outline-none my-2
        bg-gradient-input
    `, {
    variants: {
        variant: {
            "primary": "w-57 sm:w-66 lg:w-66 h-10 sm:h-12 lg:h-12 p-3 items-start self-stretch inline-flex",
            "secondary": "w-62 h-9 pl-10"
        }
    }
})