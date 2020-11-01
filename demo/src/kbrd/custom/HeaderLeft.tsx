import { React, Kiwi, AppCustomHeaderLeft } from "kiwi-bundle-react"
import { KBRD } from ".."

export default KBRD.Custom<AppCustomHeaderLeft>(() => (
  <Kiwi.View>
    <Kiwi.Text>LEFT</Kiwi.Text>
  </Kiwi.View>
))
