import { KiwiBundleReact } from "./vendors/kiwi-bundle-react/bundle"

export const KBRD = KiwiBundleReact({
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
  routes: {
    HOME: {
      path: "/"
    },
  },
})
