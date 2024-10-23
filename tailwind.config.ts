import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/componants/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:"class",
  theme: {
    colors:{
      'red-50':'#fef2f2',
      'red-del':'#F23536',
      'red-500':'#ef4444',
      'gray-100':'#BBC2C0',
      'gray-200':'#F3F3F3',
      'gray-300':'#939494',
      'gray-900':'#101828',
      'success':'#49A569',
      'color-base':'#191919',
      'golden':'#C5A365',
      'white':'#FFFFFF',
      'black':'#000000',
      'green-100':'#191919',
      'green-300':'#2B5F44',
      'green-500':'#243831',
      'badge':'#4A4A4A',
      'title':'#101828'
    },
    fontFamily:{
      'header':["Castoro"],
      'inter': ['Inter', 'sans-serif'],
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
    }
  },
  plugins: [ require("tailwindcss/defaultConfig"),require('@tailwindcss/forms')({ strategy: 'class' }),],
};
export default config;
