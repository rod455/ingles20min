import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep navy backgrounds (Vocaboost brand)
        navy: {
          950: "#060b22",
          900: "#0b1233",
          800: "#111a40",
          700: "#1a2657",
          600: "#26376f",
        },
        // Primary CTA / highlight red
        brand: {
          300: "#ff7884",
          400: "#f7434f",
          500: "#ed1f2d",
          600: "#cf1622",
          700: "#a8121c",
        },
        // Acid lime-green accent
        accent: {
          300: "#dafb6e",
          400: "#c8f53f",
          500: "#b6ee1d",
          600: "#97c70f",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
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
