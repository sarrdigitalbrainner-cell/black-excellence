import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F1D583",
          soft: "#E3C468",
          deep: "#9C7A22",
        },
      },
    },
  },
  plugins: [],
};

export default config;
