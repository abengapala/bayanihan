import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Philippine flag inspired palette
        bayani: {
          blue: {
            50: "#e8f0ff",
            100: "#c5d8ff",
            200: "#9ebdff",
            300: "#74a0ff",
            400: "#5588ff",
            500: "#0038A8", // Primary — Philippine blue
            600: "#002d8a",
            700: "#00226b",
            800: "#00184d",
            900: "#000d2e",
          },
          red: {
            50: "#fff0f0",
            100: "#ffd6d6",
            200: "#ffadad",
            300: "#ff8080",
            400: "#ff5252",
            500: "#CE1126", // Accent — Philippine red
            600: "#a80d1e",
            700: "#830a17",
            800: "#5d070f",
            900: "#380408",
          },
          gold: {
            50: "#fffdf0",
            100: "#fff8d1",
            200: "#fff0a3",
            300: "#ffe875",
            400: "#ffe047",
            500: "#FCD116", // Accent — Philippine gold/yellow
            600: "#d4af00",
            700: "#a38600",
            800: "#735e00",
            900: "#423600",
          },
        },
        // Status colors
        status: {
          active: "#059669",       // emerald-600
          closed: "#d97706",       // amber-600
          nofunds: "#dc2626",      // red-600
          seasonal: "#2563eb",     // blue-600
        },
        // Medical / healthcare
        medical: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Surface colors
        surface: {
          light: "#f8fafc",
          DEFAULT: "#f1f5f9",
          dark: "#0f172a",
          card: "#ffffff",
          "card-dark": "#1e293b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "body-sm": ["14px", { lineHeight: "20px" }],
        "body": ["16px", { lineHeight: "24px" }],
        "body-lg": ["18px", { lineHeight: "28px" }],
        "heading-sm": ["20px", { lineHeight: "28px" }],
        "heading": ["24px", { lineHeight: "32px" }],
        "heading-lg": ["30px", { lineHeight: "36px" }],
        "heading-xl": ["36px", { lineHeight: "40px" }],
        "display": ["48px", { lineHeight: "52px" }],
      },
      borderRadius: {
        "card": "16px",
        "button": "12px",
      },
      boxShadow: {
        "card": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        "glass": "0 8px 32px 0 rgba(0, 56, 168, 0.15)",
        "glow": "0 0 20px rgba(252, 209, 22, 0.3)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0038A8 0%, #001d5c 50%, #000d2e 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
        "gold-gradient": "linear-gradient(135deg, #FCD116 0%, #d4af00 100%)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "pulse-gentle": "pulseGentle 2s ease-in-out infinite",
        "bounce-gentle": "bounceGentle 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGentle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      screens: {
        "xs": "375px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
