module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  // daisyUI config
  daisyui: {
    styled: true,
    themes: ['luxury', 'light', 'dark', 'bumblebee'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
}
