import { KBRD } from "../app"
import { HomePageStyle as all } from "./Home.style.all"

export const HomePageStyle = KBRD.StyleSheet({
  ...all,
  textContainer: {
    backgroundColor: "blue",
  },
} as const)
