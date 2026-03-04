// tailwind.config.ts
import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { 950:"#05070a", 900:"#0b1020" },
        cyan: { 500:"#00d4ff" }
      },
    },
  },
  plugins: [],
  
};

export default config;