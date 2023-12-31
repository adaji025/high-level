/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "4xl": "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
      },
      colors: {
        darkBlue: "#17426D",
        mainText: "#030916" ,
        secondaryText: "#4D4D4D" ,
        highLevelRed: "#E84E38" ,
      }
    },
  },
  plugins: [],
};
