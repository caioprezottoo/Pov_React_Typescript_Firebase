import { cva } from "class-variance-authority";

export const buttonVariants = cva("w-[17.375rem] h-12 rounded-2xl bg-gray-100 cursor-pointer", {
    variants: {
        variant: {
            "primary": "border",
            "secondary": "bg-transparent border-2 border-gray-100 text-gray-100"
        }
    }
})