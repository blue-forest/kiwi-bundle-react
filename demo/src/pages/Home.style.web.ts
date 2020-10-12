import { KBRD } from "../bundle"
import { HomePageStyle as common } from "./Home.style.common"

export const HomePageStyle = KBRD.StyleSheet.extends(common, {
  textContainer: {
    backgroundColor: "green",
  },
  text: {
    color: "white",
  },
})
