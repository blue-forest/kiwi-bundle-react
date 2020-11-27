import { KBRD } from ".."

export const StylesPageStyle = KBRD.StyleSheet(() => ({
  responsive: [
    {
      style: {
        height: 200,
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
      }
    },
    {
      min: 300,
      style: {
        backgroundColor: "red",
      },
    },
  ],
}))
