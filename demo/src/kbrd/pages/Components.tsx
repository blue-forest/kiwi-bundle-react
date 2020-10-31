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
  render: ({ state, style, appearance }) => {
    const scheme = appearance.theme.scheme.get()
    const theme = appearance.theme.get()
    console.log({ theme })
    return <Kiwi.View>
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
      <ButtonComponent title={`Switch from ${scheme} to ${scheme === "dark" ? "light" : "dark"}`} onPress={() => {
        if(scheme === "dark") {
          appearance.theme.scheme.set("light")
        } else {
          appearance.theme.scheme.set("dark")
        }
      }}/>
    </Kiwi.View>
  },
  /*functions: {
    test: context => { console.log(context) },
  },*/
})
