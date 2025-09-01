import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soothing Flavor Colors
        'sf-green': '#16A34A',
        'sf-green-dark': '#0E8F3A',
        'sf-teal': '#14B8A6',
        'sf-orange': '#F59E0B',
        'sf-slate': '#0F172A',
        'sf-mint': '#ECFDF5',
        'sf-foam': '#F4FFF7',
        'sf-ice': '#F7FAF9',
      },
    },
  },
  plugins: [],
};

export default config;
