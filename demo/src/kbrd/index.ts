import { App } from "kiwi-bundle-react"
import { Language } from "dropin-client"

export const KBRD = App({
  key: "kbrd",
  navigation: {
    routes: {
      HOME: {
        path: "/",
        title: "Accueil",
        header: {
          hideTitle: true,
        },
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
      global_padding: 30,
      global_margin: 4,
    } as const,
    colors: {
      blue: "rgb(2, 68, 198)",
      black: "rgb(28, 28, 30)",
      grey: "rgb(229, 229, 231)",
    } as const,
  },
  i18n: {
    languages: [Language.FRENCH, Language.ENGLISH],
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
      i18n: {
        urlQueryParam: "locale",
      },
    },
  },
}, {
  pages: {
    HOME: import("./pages/Home"),
    COMPONENTS: import("./pages/Components"),
    PARAMS: import("./pages/Params"),
  },
  themes: {
    default: import("./themes/default"),
  },
  custom: {
    header: {
      right: import("./custom/HeaderRight"),
    },
  },
})
