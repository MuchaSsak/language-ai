const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DMSans", "sans-serif"],
        mono: ["monospace", "Menlo"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
      },
      colors: {
        white: "#f5f5f5",
        black: "#0a0a0a",

        background: "hsl(var(--background))",
        "background-max": "hsl(var(--background-max))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          hover: "hsl(var(--secondary-hover))",
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

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        border: {
          DEFAULT: "hsl(var(--border))",
          foreground: "hsl(var(--border-foreground))",
        },

        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          hover: "hsl(var(--destructive-hover))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        "chart-1": "hsl(var(--chart-1))",
        "chart-2": "hsl(var(--chart-2))",
        "chart-3": "hsl(var(--chart-3))",
        "chart-4": "hsl(var(--chart-4))",
        "chart-5": "hsl(var(--chart-5))",
      },

      borderRadius: {
        xl: "calc(var(--radius) + 8px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 8px)",
      },

      borderWidth: {
        hairline: hairlineWidth(),
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
        "pulse-sm": {
          "0%": { filter: "brightness(100%)" },
          "50%": { filter: "brightness(90%)" },
          "100%": { filter: "brightness(100%)" },
        },
        skeleton: {
          "0%, 100%": {
            backgroundColor: "hsl(var(--loading-from))",
          },
          "50%": {
            backgroundColor: "hsl(var(--loading-to))",
          },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-sm": "pulse-sm 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        skeleton: "skeleton 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("tailwindcss-animate")],
};
