import { KBRD } from "../app"
import { HomePageStyle as common } from "./Home.style.common"

export const HomePageStyle = KBRD.StyleSheet(common, {
  textContainer: {
    backgroundColor: "green",
  },
  text: {
    color: "white",
  },
} as const)
