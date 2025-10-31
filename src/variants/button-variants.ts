import { cva } from "class-variance-authority";

export const buttonVariants = cva("w-[17.375rem] h-12 rounded-2xl bg-gray-100", {
    variants: {
        variant: {
            "primary": "border",
            "secondary": "bg-opacity-14 border-2 border-gray-100"
        }
    }
})