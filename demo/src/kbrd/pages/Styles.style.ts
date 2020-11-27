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
      max: 400,
      style: {
        backgroundColor: "red",
      },
    },
    {
      min: 350,
      max: 380,
      style: {
        backgroundColor: "blue",
      },
    },
  ],
}))
