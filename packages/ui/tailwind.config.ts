import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../apps/frontend/src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    transparent: "transparent",
    current: "currentColor",
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Proxima Nova", ...fontFamily.sans],
      },
      gap: {
        ten: "10px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        bg: "#00191F",
        grey: "#787777",
        principal: "#00A99F",
        "principal-hover": "#00847C",
        second: "#E0F8F6",
        disabled: "#B8B8B8",
        black: "#181818",
        "status-active": "#80F9A9",
        "status-pending": "#FFD373",
        "status-expired": "#FFA6A0",
        access: "#B2E8FF",
        "table-button": "#F2F2F3",
        "table-icon": "#928F8F",
        "study-no-components": "#F5F5F5",
        "study-transport": "#F8F8F8",
        "table-header": "#00A99F",
        color1: "#3BC3BB",
        color2: "#306F84",
        color3: "#143339",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fade-in-move": {
          "0%": { opacity: "0", transform: "translateX(-50%)" },
          "20%": { opacity: "1", transform: "translateX(0)" },
          "80%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in-move": "fade-in-move 6s forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config
export default config
