import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-rounded", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#2b2a33",
          soft: "#4a4857",
          faint: "#6f6d7d",
        },
        parchment: {
          DEFAULT: "#fbf7f0",
          deep: "#f3ece0",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(40, 35, 60, 0.18)",
        "soft-lg": "0 24px 70px -20px rgba(40, 35, 60, 0.28)",
        glow: "0 0 40px -8px var(--tw-shadow-color)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        drift: {
          "0%": { transform: "translateX(-8px)" },
          "100%": { transform: "translateX(8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        drift: "drift 7s ease-in-out infinite alternate",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.2,0.6,0.3,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
