import { KBRD } from "../app"

export const DefaultTheme = KBRD.Theme(({ colors }) => ({
  primary: { light: "rgb(0, 122, 255)", dark: "rgb(10, 132, 255)" },
  background: { light: "rgb(242, 242, 242)", dark: "rgb(1, 1, 1)" },
  card: { light: "rgb(255, 255, 255)", dark: "rgb(18, 18, 18)" },
  text: { light: colors.black, dark: colors.grey },
  border: { light: "rgb(216, 216, 216)", dark: "rgb(39, 39, 41)" },
  notification: { light: "rgb(255, 59, 48)", dark: "rgb(255, 69, 58)" },
}))
