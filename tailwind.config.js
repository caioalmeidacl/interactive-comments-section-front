/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        "dark-blue": "hsl(212, 24%, 26%)",
        "grayish-Blue": "hsl(211, 10%, 45%)",
        "moderate-blue": "hsl(238, 40%, 52%)",
        "soft-red": "hsl(358, 79%, 66%)",
        "light-grayish-blue": "hsl(239, 57%, 85%)",
        "pale-red": "hsl(357, 100%, 86%)",
        "light-gray": "hsl(223, 19%, 93%)",
        "very-light-gray": "hsl(228, 33%, 97%)",
      }, 
      fontSize: {
        paragragh: "16px", 
      }
    }, 
    fontFamily: ["Rubik", "sans-serif"]
  },
  plugins: [],
}