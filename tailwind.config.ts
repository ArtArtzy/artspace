import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#18212f",
        paper: "#f7f5ef",
        coral: "#ff735c",
      },
      fontFamily: {
        sans: ["var(--font-prompt)", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(24, 33, 47, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
