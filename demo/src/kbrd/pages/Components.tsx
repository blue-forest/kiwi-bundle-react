import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { ButtonComponent } from "../components/Button"
import { ComponentsPageStyle } from "./Components.style"

type HomePageStates = {
  count: number
}

export default KBRD.Page({
  style: ComponentsPageStyle,
  init: () => {
    console.log("COMPONENTS PAGE INIT")
  },
})<HomePageStates>({
  count: 0,
})({
  render: ({ state, style }) => (
    <Kiwi.View>
      <Kiwi.View style={style.textContainer}>
        <Kiwi.Text style={style.text}>{state.get.count}</Kiwi.Text>
      </Kiwi.View>
      <Kiwi.View style={style.container}>
        <ButtonComponent
          title="-"
          onPress={() => {
            if (state.get.count > 0) {
              state.set.count(state.get.count - 1)
            }
          }}
        />
        <ButtonComponent
          title="+"
          onPress={() => {
            state.set.count(state.get.count + 1)
          }}
        />
      </Kiwi.View>
    </Kiwi.View>
  ),
})
