import { KBRD } from ".."

export const HomePageStyle = KBRD.StyleSheet({
  container: {
    backgroundColor: "red",
  },
  textContainer: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 10,
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
