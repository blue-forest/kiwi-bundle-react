import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { ButtonComponent } from "../components/Button"
import { HomePageStyle } from "./Home.style"
import KiwiImage from "../../assets/kiwi.png"

export default KBRD.Page(self => self
  .style(HomePageStyle)
  .render(({ navigation, style }) => (
    <Kiwi.View style={style.container}>
      <Kiwi.Image
        source={KiwiImage}
        style={{ width: 64, height: 64, resizeMode: "contain" }}
      />
      <ButtonComponent
        title="Components"
        onPress={() => { navigation.push("COMPONENTS") }}
      />
      <ButtonComponent
        title="Parameters"
        onPress={() => { navigation.push("PARAMS", { first: "it", second: "works", very: "well" }) }}
      />
    </Kiwi.View>
  ))
)
