import type { Config } from 'tailwindcss'

const withMT = require("@material-tailwind/react/utils/withMT")

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {

        greenbg1: "#5EFB7B",
        greenbg2: "#47AF5A",
        greenbg3: "#4CC662",


        greenbuttonlogin: "#45B063",
        greenbuttonac: "#10C517",

        redbutton: "#E63434",


      },
    },
  },
  plugins: [],
}
export default config
