import { StyleSheetStyleImage } from "kiwi-bundle-react"
import { KBRD } from ".."

export const HomePageStyle = KBRD.StyleSheet({
  container: {
    flex: 1,
    padding: 30,
  },
  cover: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  } as StyleSheetStyleImage,
} as const)
