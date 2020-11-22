import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { ButtonComponent } from "../components/Button"
import { StylesPageStyle } from "./Styles.style"

export default KBRD.Page((self) =>
  self
  .style(StylesPageStyle)
  .render(({ appearance, style }) => {
    console.log({ type: "render", name: "StylesPage" })
    const scheme = appearance.theme.scheme.get()
    return <Kiwi.View>
      <ButtonComponent
        title={`Switch from ${scheme} to ${
          scheme === "dark" ? "light" : "dark"
        }`}
        onPress={() => {
          if (scheme === "dark") {
            appearance.theme.scheme.set("light")
          } else {
            appearance.theme.scheme.set("dark")
          }
        }}
      />
      <Kiwi.View style={style.responsive}/>
    </Kiwi.View>
  })
)
