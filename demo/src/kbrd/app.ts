import { App } from "kiwi-bundle-react"

export const KBRD = App({
  key: "kbrd",
  navigation: {
    routes: {
      HOME: {
        path: "/",
        title: "Accueil",
      },
      COMPONENTS: {
        path: "/components",
        title: "Composants",
      },
      PARAMS: {
        path: "/params/:first/:second",
        title: "Paramètres",
      },
    },
    prefixes: [
      "http://localhost:3000",
    ],
  },
  appearance: {
    header: {
      hide: false,
      style: {
        backgroundColor: "grey",
      },
    },
    sizes: {
      small: 10,
      medium: 15,
      big: 20,
    },
    colors: {
      blue: "rgb(2, 68, 198)",
      black: "rgb(28, 28, 30)",
      grey: "rgb(229, 229, 231)",
    },
    themes: {
      default: {
        colors: {
          primary: { light: "rgb(0, 122, 255)", dark: "rgb(10, 132, 255)" },
          background: { light: "rgb(242, 242, 242)", dark: "rgb(1, 1, 1)" },
          card: { light: "rgb(255, 255, 255)", dark: "rgb(18, 18, 18)" },
          text: { light: colors => colors.black, dark: colors => colors.grey },
          border: { light: "rgb(216, 216, 216)", dark: "rgb(39, 39, 41)" },
          notification: { light: "rgb(255, 59, 48)", dark: "rgb(255, 69, 58)" },
        },
      },
    },
  },
  platforms: {
    web: {
      title: page => {
        let title = "Kiwi Bundle React Demo"
        if (typeof page !== "undefined") {
          title += " - " + page
        }
        return title
      },
    },
  },
})
