/* eslint-env node */
/** @type {import('tailwindcss').Config} */

import { fontFamily } from "tailwindcss/defaultTheme";

import {
  background,
  base,
  black,
  electric,
  fire,
  health,
  healthBackground,
  mental,
  nature,
  primary,
  secondary,
  text,
  toxic,
  transparent,
  water,
  white,
} from "./src/tailwindTheme";

export default {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    fontFamily: {
      sans: ["Red Hat Text", ...fontFamily.sans],
      display: ["Red Hat Display", ...fontFamily.sans],
      mono: ["Red Hat Mono", ...fontFamily.sans],
    },
    colors: {
      white,
      black,
      base,
      primary,
      secondary,
      fire,
      nature,
      water,
      electric,
      mental,
      toxic,
      background,
      text,
      health,
      healthBackground,
      transparent,
    },
    extend: {
      fontSize: {
        "2xs": ".625rem",
        md: "1rem",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      backgroundImage: {
        "background-intro": `image-set( url('/public/backgrounds/background-intro.jpg') 1x, url('/public/backgrounds/background-intro@2x.jpg') 2x, url('/public/backgrounds/background-intro@3x.jpg') 3x )`,
      },
    },
  },
  plugins: [require("tailwindcss-safe-area")],
};
