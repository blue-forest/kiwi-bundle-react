import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { ButtonComponent } from "../components/Button"
import { ComponentsPageStyle } from "./Components.style"

type HomePageStates = {
  count: number
}

export default KBRD.Page({
  style: ComponentsPageStyle,
})<HomePageStates>({
  count: 0,
/*})({
  values: {},
  functions: {},*/
})({
  init: ({ appearance }) => {
    console.log("COMPONENTS PAGE INIT", appearance.colors)
  },
  render: ({ state, style, appearance }) => (
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
      <ButtonComponent title="set dark scheme" onPress={() => {
        console.log(appearance.theme.scheme.get())
        appearance.theme.scheme.set("dark")
        console.log(appearance.theme.scheme.get())
      }}/>
    </Kiwi.View>
  ),
  /*functions: {
    test: context => { console.log(context) },
  },*/
})
