/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        // aïaaïa brand colors
        cream: "#FFF9F3",
        "deep-green": "#005450",
        "rich-green": "#084C3F",
        "dark-green": "#013A3A",
        "solar-gold": "#F2A900",
        "light-sage": "#E4F4DE",
        "warm-peach": "#FFD6BA",
        champagne: "#E8D7B8",
        rose: "#D9B6AA",
        "luxury-green": "#7C9A78",
        "botanical-green": "#536B4F",
        "blush-rose": "#C4817A",
        "text-primary": "#2E2923",
        "text-muted": "#7A7168",
        "text-light": "#B5A99A",
        "dark-panel": "#1C1A17",
        "dark-card": "#242018",
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        jost: ['Jost', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(4rem, 10vw, 9rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        hero: ['clamp(3rem, 7vw, 7rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        h1: ['clamp(2.5rem, 5vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h2: ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1' }],
        h3: ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        overline: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.18em' }],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'gold-glow': '0 4px 40px rgba(199, 167, 106, 0.15)',
        'card-lift': '0 12px 40px rgba(46, 41, 35, 0.12)',
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
        "float-up": {
          "0%": { transform: "translateY(110vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.5" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(-10vh) rotate(360deg)", opacity: "0" },
        },
        "float-particle": {
          "0%": { transform: "translateY(110vh) translateX(0)", opacity: "0" },
          "10%": { opacity: "0.7" },
          "90%": { opacity: "0.7" },
          "100%": { transform: "translateY(-10vh) translateX(30px)", opacity: "0" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { transform: "translateX(100vw)", opacity: "0" },
        },
        "river-flow": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.05)", opacity: "0.85" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float-up": "float-up linear infinite",
        "float-particle": "float-particle linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "river-flow": "river-flow 8s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
