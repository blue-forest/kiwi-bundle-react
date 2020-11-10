import { App } from "kiwi-bundle-react"
import { Language } from "dropin-client"

export const KBRD = App({
  key: "kbrd",
  navigation: {
    routes: {
      HOME: {
        path: "/",
        title: { en: "Home", fr: "Accueil" },
        header: {
          hideTitle: true,
        },
      },
      COMPONENTS: {
        path: "/components",
        title: { en: "Components", fr: "Composants" },
      },
      STYLES: {
        path: "/styles",
        title: "Styles",
      },
      DATA: {
        path: "/data",
        title: { en: "Data", fr: "Données" },
      },
      NAVIGATION: {
        path: "/navigation/:first/:second",
        title: "Navigation",
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
    STYLES: import("./pages/Styles"),
    DATA: import("./pages/Data"),
    NAVIGATION: import("./pages/Navigation"),
  },
  themes: {
    default: import("./themes/default"),
  },
  custom: {
    header: {
      left: import("./custom/HeaderLeft"),
      right: import("./custom/HeaderRight"),
    },
  },
})
