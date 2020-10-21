import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from "../app"
import { ButtonComponent } from "../components/Button"
import { HomePageStyle } from "./Home.style"

export const HomePage = KBRD.Page({
  style: HomePageStyle,
})({
  count: 5,
})(({ navigation }) => (
  <Kiwi.View>
    <ButtonComponent title="Components" onPress={() => { navigation.navigate("COMPONENTS") }}/>
  </Kiwi.View>
))
