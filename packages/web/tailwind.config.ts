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
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-primary': 'var(--color-bg-primary)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        danger: 'var(--color-danger)',
        yellow: 'var(--color-yellow)',
        light: 'var(--color-light)',
        'light-gray': 'var(--color-light-gray)',
        gray: 'var(--color-gray)',
      },
    },
  },
  plugins: [],
};
export default config;
