import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts}",
  ],
  theme: {
    screens: {
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        burgundy: {
          950: "hsl(350, 30%, 12%)",
          900: "hsl(350, 25%, 16%)",
          800: "hsl(350, 25%, 20%)",
          700: "hsl(350, 20%, 25%)",
        },
        crimson: {
          DEFAULT: "hsl(350, 85%, 55%)",
          500: "hsl(350, 85%, 55%)",
          600: "hsl(350, 85%, 45%)",
        },
      },

      fontFamily: {
        serif: ["Playfair Display Variable", "serif"],
        sans: ["Inter Variable", "system-ui", "sans-serif"],
      },

      fontSize: {
        "7xl": ["4.76813rem", { lineHeight: "5.96063rem", fontWeight: 500 }],
        "6xl": ["3.8375rem", { lineHeight: "4.79688rem", fontWeight: 500 }],
        "5xl": ["3.99875rem", { lineHeight: "4.99844rem", fontWeight: 500 }],
        "4xl": ["2.44375rem", { lineHeight: "3.05469rem", fontWeight: 500 }],
        "3xl": ["1.95313rem", { lineHeight: "2.44141rem", fontWeight: 500 }],
        "2xl": ["1.5625rem", { lineHeight: "1.95313rem", fontWeight: 500 }],
        xl: ["1.25rem", { lineHeight: "1.25rem", fontWeight: 500 }],
        lg: ["1.125rem", { lineHeight: "1.125rem", fontWeight: 500 }],
        sm: ["1rem", { lineHeight: "1rem", fontWeight: 500 }],
      },

      boxShadow: {
        focus: "0 0 0 4px hsl(350 85% 55% / 0.3)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
};

export default config;
