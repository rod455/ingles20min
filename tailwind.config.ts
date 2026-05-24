import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefdf3",
          100: "#d6fae1",
          200: "#aff3c6",
          300: "#79e7a3",
          400: "#3ed079",
          500: "#18b85b",
          600: "#0c9549",
          700: "#0c753d",
          800: "#0e5c33",
          900: "#0d4c2c",
        },
        accent: {
          400: "#ffb547",
          500: "#ff9f1c",
          600: "#e8860a",
        },
        ink: {
          900: "#0a1f17",
          800: "#10271d",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
