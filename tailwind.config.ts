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
        arn: {
          canvas: "var(--arn-color-canvas)",
          surface: "var(--arn-color-surface)",
          raised: "var(--arn-color-surface-raised)",
          soft: "var(--arn-color-surface-soft)",
          border: "var(--arn-color-border)",
          "border-strong": "var(--arn-color-border-strong)",
          accent: "var(--arn-color-accent)",
          "accent-strong": "var(--arn-color-accent-strong)",
          "accent-soft": "var(--arn-color-accent-soft)",
          "accent-ink": "var(--arn-color-accent-ink)",
          text: "var(--arn-color-text-primary)",
          muted: "var(--arn-color-text-muted)",
          subtle: "var(--arn-color-text-subtle)",
          faint: "var(--arn-color-text-faint)",
        },
        section: {
          home: "var(--arn-accent-home)",
          novel: "var(--arn-accent-novel)",
          fanfic: "var(--arn-accent-fanfic)",
          cartoon: "var(--arn-accent-cartoon)",
          community: "var(--arn-accent-community)",
        },
      },
      fontFamily: {
        sans: ["var(--font-prompt)", "Arial", "sans-serif"],
      },
      fontSize: {
        "ds-display": ["56px", { lineHeight: "1.08", fontWeight: "700" }],
        "ds-h1": ["40px", { lineHeight: "1.15", fontWeight: "700" }],
        "ds-h2": ["24px", { lineHeight: "1.25", fontWeight: "600" }],
        "ds-h3": ["18px", { lineHeight: "1.3", fontWeight: "600" }],
        "ds-body": ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        "ds-body-sm": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        "ds-meta": ["12px", { lineHeight: "1.35", fontWeight: "400" }],
        "ds-caption": ["11px", { lineHeight: "1.35", fontWeight: "400" }],
      },
      spacing: {
        "ds-1": "4px",
        "ds-2": "8px",
        "ds-3": "12px",
        "ds-4": "16px",
        "ds-5": "20px",
        "ds-6": "24px",
        "ds-8": "32px",
        "ds-10": "40px",
        "ds-12": "48px",
        "ds-16": "64px",
      },
      borderRadius: {
        "ds-sm": "6px",
        "ds-md": "8px",
        "ds-lg": "12px",
        "ds-xl": "16px",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(24, 33, 47, 0.12)",
        "ds-card": "var(--arn-shadow-card)",
        "ds-floating": "var(--arn-shadow-floating)",
        "ds-glow": "var(--arn-shadow-glow)",
      },
    },
  },
  plugins: [],
};

export default config;
