import { KBRD } from "../app"

export const HomePageStyle = KBRD.StyleSheet({
  container: {
    flexDirection: "row",
  },
  textContainer: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
  },
  button: {
    width: "50%",
    paddingLeft: 20,
    paddingRight: 20,
  },
} as const)
