import { KBRD } from ".."
import { HomePageStyle as common } from "./Home.style.common"

export const HomePageStyle = KBRD.StyleSheet(common, {
  textContainer: {
    backgroundColor: "blue",
  },
} as const)
