import { StyleSheetStyleImage } from "kiwi-bundle-react"
import { KBRD } from ".."

export const HomePageStyle = KBRD.StyleSheet(() => ({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    alignItems: "center",
  },
  cover: {
    flex: 1,
    width: "100%",
    maxHeight: 300,
    resizeMode: "contain",
    marginBottom: 4,
  } as StyleSheetStyleImage,
  button: {
    marginTop: 4,
    marginBottom: 4,
    width: 200,
  },
} as const))
