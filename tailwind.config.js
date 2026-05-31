module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bbc-red': '#BB1919',
        'bbc-blue': '#0063B1',
        'bbc-gray': '#F0F0F0',
        'bbc-dark': '#3F3F42'
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
      }
    }
  },
  plugins: [],
}
