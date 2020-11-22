import { KBRD } from ".."

export const HomePageStyle = KBRD.StyleSheet(({ sizes }) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: sizes.global_padding,
    paddingRight: sizes.global_padding,
    paddingBottom: sizes.global_padding,
  },
  cover: {
    flex: 1,
    width: "100%",
    maxHeight: 300,
    resizeMode: "contain",
    marginBottom: sizes.global_margin,
  },
  button: {
    width: 200,
    marginTop: sizes.global_margin,
    marginBottom: sizes.global_margin,
  },
}))
