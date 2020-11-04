import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { ButtonComponent } from "../components/Button"
import { ComponentsPageStyle } from "./Components.style"

type States = {
  count: number
  test: {
    test?: string
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
  .render(({ states, style, appearance }) => {
    console.log("COMPONENTS", "RENDER")
    const scheme = appearance.theme.scheme.get()
    return <Kiwi.View>
      <Kiwi.View style={style.textContainer}>
        <Kiwi.Text style={style.text}>{states.get.count}</Kiwi.Text>
      </Kiwi.View>
      <Kiwi.View style={style.container}>
        <ButtonComponent
          title="-"
          onPress={() => { if (states.get.count > 0) { states.set.count(states.get.count - 1) } }}
        />
        <ButtonComponent
          title="+"
          onPress={() => { states.set.count(states.get.count + 1) }}
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
