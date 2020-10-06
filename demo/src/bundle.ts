import { Bundle } from "kiwi-bundle-react"

export const KBRD = Bundle({
  id: "kbrd",
  routes: {
    HOME: {
      path: "/",
    },
    COMPONENTS: {
      path: "/components",
    },
    PARAMS: {
      path: "/params/{first}/{second}",
    },
  },
  theme: {
    dark: {
      colors: {
        blue: "#ffffff",
      },
      sizes: {
        small: 10,
        medium: 15,
        big: 20,
      }
    },
  },
})
