import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { ButtonComponent } from "../components/Button"
import { ComponentsPageStyle } from "./Components.style"

type States = {
  count: number
  test: {
    test: string
  }
}

export default KBRD.Page(self => self
  .style(ComponentsPageStyle)
  .states<States>({
    count: 0,
    test: {
      test: "test",
    },
  })
  .onInit(() => { console.log("COMPONENTS", "INIT") })
  .onMount(() => { console.log("COMPONENTS", "MOUNT") })
  .onUnmount(() => { console.log("COMPONENTS", "UNMOUNT") })
  .render(({ state, style, appearance }) => {
    console.log("COMPONENTS", "RENDER")
    const scheme = appearance.theme.scheme.get()
    return <Kiwi.View>
      <Kiwi.View style={style.textContainer}>
        <Kiwi.Text style={style.text}>{state.get.count}</Kiwi.Text>
      </Kiwi.View>
      <Kiwi.View style={style.container}>
        <ButtonComponent
          title="-"
          onPress={() => { if (state.get.count > 0) { state.set.count(state.get.count - 1) } }}
        />
        <ButtonComponent
          title="+"
          onPress={() => { state.set.count(state.get.count + 1) }}
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
  })
)
