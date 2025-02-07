import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'xs': '480px', // Tambahkan breakpoint untuk layar sangat kecil
        '3xl': '1920px', // Tambahkan breakpoint untuk layar ekstra besar
      },
      spacing :{
        "1px"  : "1px",
        "5px"  : "5px",
        "40px" : "40px",
        "20px": "20px",
        "5%": "5%",
        "10%": "10%",
        "15%": "15%",
        "20%": "20%",
        "25%": "25%",
        "30%": "30%",
        "35%": "35%",
        "40%": "40%",
        "45%": "45%",
        "50%": "50%",
      },
    },
  },
  daisyui: {
    themes: ["winter"],
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
