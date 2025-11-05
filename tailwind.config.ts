import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                shine: {
                    "0%": { backgroundPosition: "100%" },
                    "100%": { backgroundPosition: "-100%" },
                },
            },
            animation: {
                shine: "shine 5s linear infinite",
            },
        },
    },
    plugins: [],
} satisfies Config;
