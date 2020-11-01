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
    } as const,
    colors: {
      blue: "rgb(2, 68, 198)",
      black: "rgb(28, 28, 30)",
      grey: "rgb(229, 229, 231)",
    } as const,
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
}, {
  themes: {
    default: import("./themes/default"),
  },
  stores: {
    counter: import("./stores/counter"),
  },
  pages: {
    HOME: import("./pages/Home"),
    COMPONENTS: import("./pages/Components"),
    PARAMS: import("./pages/Params"),
  },
  custom: {
    header: {
      left: import("./custom/HeaderLeft"),
      right: import("./custom/HeaderRight"),
    },
  },
})
