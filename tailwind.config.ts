import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titan: "Titan One",
        roboto: "Roboto",
      },
      colors: {
        babyBlue: "#E3FCFF",
        lightGreen: "#88EF1C",
        red: "#DE2A2A",
        yellowAlert: "#FED004",
        lightGrayText: "#A3ABA3",
        darkGray: "#5F5858",
        darkBlue: "#0F1A1F",
        nonWhite: "#DEDEDE",
        lightBlue: "#8BA8B5",
        darkGrayText: "#ADACA7",
        grayBlue: "#333D44",
        suggColors: "#8BA8B5",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
