import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#dbe9ff',
          200: '#bcd6ff',
          300: '#8db9ff',
          400: '#5e99ff',
          500: '#2f76ff',
          600: '#1557e6',
          700: '#0e43b4',
          800: '#0b3390',
          900: '#09296f'
        }
      }
    }
  },
  plugins: []
};

export default config;
