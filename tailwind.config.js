/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "serif"],
      poppins: ["Poppins", "serif"],
    },
    extend: {
      colors: {
        "Primary": "#B88E2F",
        "Gray1": "#3A3A3A",
        "Gray2": "#616161",
        "Gray3": "#898989",
        "Gray4": "#B0B0B0",
        "Gray5": "#D8D8D8",
        "LightBG": "#F4F5F7",
        "FontColor": "#333333",
        "GreenAccents": "#2EC1AC",
        "RedAccents": "#E97171",
        "FontColor1": "#666666",
        "9F9F9F": "#9F9F9F",
        "C4C4C4": "#C4C4C4",
        "D9D9D9": "#D9D9D9",
        "FCF8F3": "#FCF8F3",
        "FFF3E3": "#FFF3E3",
      },
      backgroundImage: {
        'home-bg': "url(https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/image-sec1.png)",
        'banner': "url(https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/image-page-name.png)",
      },
      fontSize: {
        "5.5xl": [
          "3.25rem",
          {
            lineHeight: "1.2",
          },
        ],
        "4.5xl": [
          "2.5rem",
          {
            lineHeight: "1.2",
          },
        ],
      },
      spacing: {
        "443px": "27.6rem",
        "643px": "40.1rem",
      },
    },
  },
  plugins: [],
}

