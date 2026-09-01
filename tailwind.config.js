/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        paper: "var(--paper)",
        lime: "var(--lime)",
        "lime-bright": "var(--lime-bright)",
        fog: "var(--fog)",
        "fog-dim": "var(--fog-dim)",
      },
      fontFamily: {
        display: ["var(--font-display-family)", "sans-serif"],
        sans: ["var(--font-body-family)", "sans-serif"],
        mono: ["var(--font-mono-family)", "monospace"],
        signature: ["var(--font-signature-family)", "cursive"],
      },
      borderRadius: {
        card: "1.5rem",
      },
    },
  },
  plugins: [],
};
