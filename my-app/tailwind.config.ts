import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        clouds: "move-clouds 15s linear infinite",
      },
      keyframes: {
        "move-clouds": {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(100vw)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
