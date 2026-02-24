/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'racing-sans': ['"Racing Sans One"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        abeezee: ['ABeeZee', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'open-sans-hebrew': ['"Open Sans Hebrew"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
