import { KBRD } from ".."

export const ButtonComponentStyle = KBRD.StyleSheet({
  container: {
    backgroundColor: "green",
  },
  button: {
    color: "black",
  }
} as const, {
  container: {
    height: 200,
  }
} as const)
