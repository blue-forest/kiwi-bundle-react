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
      default: DefaultTheme,
    },
  },
  stores: {
    test: TestStore,
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
