import { App } from "kiwi-bundle-react"

export const KBRD = App({
  key: "kbrd",
  navigation: {
    title: page => {
      let title = "Kiwi Bundle React Demo"
      if(typeof page !== "undefined") {
        title += " - " + page
      }
      return title
    },
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
  themes: {
    dark: {
      colors: {
        blue: "#0244c6",
      },
      sizes: {
        small: 10,
        medium: 15,
        big: 20,
      }
    },
  },
})
