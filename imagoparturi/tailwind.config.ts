import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm monochrome palette — no colour, Scandinavian minimal.
        ink: {
          DEFAULT: "#1a1916", // warm near-black (text)
          soft: "#33312c", // softer dark surface
        },
        paper: {
          DEFAULT: "#f5f3ef", // warm off-white (page)
          warm: "#ebe8e1", // slightly deeper for alternating sections
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      letterSpacing: {
        label: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;
