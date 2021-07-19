const styles = require('./config/tw-styles');

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}', 
    './partial/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: styles.colors,
    fontSize: styles.fontSize,
    borderRadius: styles.borderRadius,
    fontFamily: styles.fontFamily,
    extend: {
      spacing: styles.spacing,
    },
    container: {
      center: true
    },
  },
  variants: {
    extend: {}
  },
  plugins: []
};
