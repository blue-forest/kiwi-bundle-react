import { KBRD } from ".."
import { HomePageStyle as common } from "./Home.style.common"

export const HomePageStyle = KBRD.StyleSheet(common, {
  container: {
    padding: 100,
  },
  textContainer: {
    backgroundColor: "green",
  },
  text: {
    color: "blue",
  },
} as const)
