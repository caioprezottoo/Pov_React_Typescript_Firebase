import { cva } from "class-variance-authority";

export const textVariants = cva("text-gray-100 ", {
    variants: {
        variant: {
            "m-text-xs": "font-montserrat font-medium text-[10px]",
            "m-text-sm": "font-montserrat font-medium text-[15px]",
            "m-text-lg": "font-montserrat font-bold text-[43px]",
            "m-text-xl": "font-montserrat font-bold text-[82px]",
            "l-text-sm": "font-lato text-[10px]",
            "l-text-md": "font-lato text-[15px]",
            "l-text-lg": "font-lato text-[20px] opacity-78",
            "dm-text-xs": "font-dmsans font-bold text-xs",
            "dm-text-sm": "font-dmsans font-medium text-[15px]",
            "dm-text-md": "font-dmsans font-bold text-[28px]",
            "dm-text-lg": "font-dmsans font-bold text-[45px]",
        }
    }, defaultVariants: {
        variant: "m-text-lg"
    }
}) 