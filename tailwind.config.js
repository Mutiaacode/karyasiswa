/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ini memungkinkan Tailwind memproses semua file di folder src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Tambahkan Poppins sebagai font sans default
      },
      colors: {
        pink: {
          500: '#ff66b2', // Atur warna pink khusus jika ingin warna tertentu
        },
      },
    },
  },
  plugins: [],
}
