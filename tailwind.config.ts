import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'banner-secondary-font-color': '#B4C7E7',

        'primary-color': '#1B3764',
        'secondary-bg-color': '#F5F8FC',
        'tertiary-bg-color': '#FFFFFF',
        'quaternary-color': '#FFCA42',

        'secondary-font-color': '#969AA0',

        'input-border-color': '#DCE1E9',
      },
      fontFamily: {
        'cardo': ['cardo', 'serif'],
        'inter': ['var(--font-inter)'],
      },
      fontSize: {
        sm: '13px',
        m: '16px',
        l: '20px',
        xl: '24px',
        xxl: '36px',
        icon: '0.25rem'
      },
      margin: {
        '610px': '610px',
      },
      padding: {
        '450px': '450px',
        'main-container': '5rem 9rem',
        'book-container': '13px 3px 0px',
        'banner-paragraph': '28rem'
      },
      width: {
        'table': '30rem',
        'logo': '10%',
        'mobile-logo': '7%'
      }
    },
  },
  plugins: [],
};
export default config;
