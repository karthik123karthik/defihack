/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
        colors:{
          homePageBackGroundColour1:"#8D2806",
          homePageBackGroundColour2:"#003F17",
          homePageBackGroundColour3:"#5D1627",
          homePageBackGroundColour4:"#A83E59",
          homePageBackGroundColour5:"#8D2806"
        },
        fontFamily:{
          homefont: ['"Bungee"'],
          homefont1: ['"Caveat"']
        }
    },
  },
  plugins: [],
}
