module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  variants: {
    pointerEvents: ["responsive", "hover"],
    display: ["responsive", "hover", "group-hover"],
    textDecoration: ["responsive", "hover", "focus", "group-hover"],
    roundedFull: ["responsive", "focus"],
    margin: ["responsive", "group-hover"],
    textColor: ["responsive", "hover", "focus", "group-hover"],
    borderWidth: ["hover"],
    borderOpacity: ["hover"],
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/custom-forms"),
    require("@tailwindcss/typography"),
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    fontSize: {
      s: ["1rem", "1.5rem"],
      m: ["1.25rem", "1.875rem"],
      l: ["1.5rem", "1.875rem"],
      "heading-xs": ["1.125rem", "125%"],
      "heading-s": ["1.25rem", "125%"],
      "heading-m": ["1.5rem", "125%"],
      "heading-l": ["2rem", "125%"],
      "heading-xl": ["2.5rem", "125%"],
      "heading-xxl": ["3rem", "125%"],
      "heading-xxxl": ["4rem", "110%"],
    },
    colors: {
      black: "#000000",
      white: "#FFF",
      "pzh-form": "#F4F4F7",
      /** Add custom PZH colors */
      pzh: {
        red: {
          10: "#FFEDF0",
          100: "#EB7085",
          500: "#D11F3D",
          900: "#97162C",
        },
        yellow: {
          10: "#FFF9E3",
          100: "#F1DB7E",
          500: "#EFCC36",
          900: "#C6A410",
        },
        blue: {
          10: "#F2F7FC",
          100: "#7BADDE",
          500: "#281F6B",
          900: "#16113B",
        },
        pink: {
          100: "#D76AAC",
          500: "#AA0067",
          900: "#750047",
        },
        orange: {
          100: "#FBA66A",
          500: "#FF6B02",
          900: "#B24A00",
        },
        "apple-green": {
          100: "#ADD57D",
          500: "#76BC21",
          900: "#629623",
        },
        purple: {
          100: "#9B99CC",
          500: "#503D90",
          900: "#32265A",
        },
        "warm-gray": {
          100: "#BEB1A7",
          500: "#847062",
          900: "#584B41",
        },
        green: {
          10: "#EDFAF0",
          100: "#61B375",
          500: "#00804D",
          900: "#004D2E",
        },
        gray: {
          100: "#F8F8F8",
          200: "#E6E6E6",
          300: "#D5D5D5",
          400: "#BFBFBF",
          500: "#838383",
          600: "#5C5C5C",
          700: "#464646",
          800: "#222222",
        },
        positive: "#00804D",
        neutral: "#7BADDE",
        negative: "#D11F3D",
        white: "#FFFFFF",
        black: "#000000",
        "visited-link": "#5F29A2",
        backdrop: "rgba(92,92,92,.5)",
        focus: "#2360C5",
      },
      /** OLD colors */
      "pzh-red": {
        DEFAULT: "#d11f3d",
        light: "#eb7085",
        dark: "#97162c",
      },
      "pzh-yellow": {
        DEFAULT: "#efcc36",
        light: "#f1db7e",
        dark: "#c6a410",
      },
      "pzh-blue": {
        DEFAULT: "#281f6b",
        light: "#7badde",
        dark: "#16113b",
        "super-light": "#ececf3", // Custom
      },
      "pzh-pink": {
        DEFAULT: "#aa0067",
        light: "#d76aac",
        dark: "#750047",
      },
      "pzh-orange": {
        DEFAULT: "#ff6b02",
        light: "#fba66a",
        dark: "#b24a00",
      },
      "pzh-apple-green": {
        DEFAULT: "#76bc21",
        light: "#add57d",
        dark: "#629623",
      },
      "pzh-green": {
        DEFAULT: "#00804d",
        light: "#61b375",
        dark: "#004d2e",
      },
      "pzh-purple": {
        DEFAULT: "#503d90",
        light: "#9b99cc",
        dark: "#32265a",
      },
      "pzh-cool-gray": {
        DEFAULT: "#838383",
        light: "#bfbfbf",
        dark: "#5c5c5c",
      },
      "pzh-warm-gray": {
        DEFAULT: "#847062",
        light: "#beb1a7",
        dark: "#584b41",
      },
      "pzh-badge": {
        green: "#50A658",
        red: "#CB3B36",
        orange: "#F9B53C",
      },
      "pzh-ui": {
        white: "#FFFFFF",
        "light-blue": "#E5EFF8",
      },
    },
    extend: {
      opacity: {
        35: "0.35",
        55: "0.55",
      },
      boxShadow: {
        card: "0px 18px 60px rgba(0, 0, 0, 0.07), 0px 4.02054px 13.4018px rgba(0, 0, 0, 0.0417275), 0px 1.19702px 3.99006px rgba(0, 0, 0, 0.0282725)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            li: {
              p: {
                margin: 0,
              },
              "&>ol": {
                margin: 0,
              },
              "&>ul": {
                margin: 0,
              },
            },
          },
        },
      },
    },
  },
};
