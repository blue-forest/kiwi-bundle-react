import { React, Kiwi, CustomHeaderLeft } from "kiwi-bundle-react"
import { KBRD } from ".."

export default KBRD.Custom<CustomHeaderLeft>(() => (
  <Kiwi.View>
    <Kiwi.Text>LEFT</Kiwi.Text>
  </Kiwi.View>
))
