import { KBRD } from "../app"
import { HomePageStyle as common } from "./Home.style.common"

export const HomePageStyle = KBRD.StyleSheet.extends(common, {
  textContainer: {
    backgroundColor: "blue",
  },
})
