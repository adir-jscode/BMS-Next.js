import type { Config } from "tailwindcss";
import daisyui from "daisyui";


export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    daisyui

  ],
   daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#31C4F3",
          // primary: "#FF3811",
          secondary: "teal",

          ".btn-primary": {
            "color" : "#fff"
          },

          ".btn-outline.btn-primary:hover": {
            "color" : "#fff"
          },
        },
      },
      "light",
      "cupcake",
    ],
  },
} satisfies Config;
