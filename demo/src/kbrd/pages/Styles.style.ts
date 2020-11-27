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
      min: 200,
      max: 800,
      style: {
        backgroundColor: "blue",
      },
    },
    {
      min: 400,
      max: 600,
      style: {
        backgroundColor: "red",
      },
    },
  ],
}))
