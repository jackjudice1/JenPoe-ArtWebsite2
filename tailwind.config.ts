import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F1E4",
        parchment: "#EFE7D4",
        ink: "#16213A",
        "ink-soft": "#28304A",
        jade: "#1F6B54",
        "jade-deep": "#154A3A",
        lacquer: "#C42B29",
        "lacquer-deep": "#9A211F",
        gold: "#C6A15B",
        "gold-soft": "#E2C888",
        plum: "#5B3A5C"
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"]
      },
      borderRadius: {
        tile: "4px 4px 20px 20px"
      },
      boxShadow: {
        tile: "0 1px 0 rgba(22,33,58,0.06), 0 20px 40px -24px rgba(22,33,58,0.35)",
        "tile-hover": "0 1px 0 rgba(22,33,58,0.06), 0 30px 60px -20px rgba(22,33,58,0.45)"
      },
      backgroundImage: {
        "tile-grid":
          "radial-gradient(circle, rgba(22,33,58,0.08) 1.5px, transparent 1.5px)"
      },
      backgroundSize: {
        "tile-grid": "18px 18px"
      },
      maxWidth: {
        content: "1320px"
      }
    }
  },
  plugins: []
};

export default config;
