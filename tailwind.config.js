/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        heading: 'Roboto_400Regular',
        subtitle: 'Roboto_500Medium',
        bold: 'Roboto_700Bold',
      },
    },
  },
  plugins: [],
};
