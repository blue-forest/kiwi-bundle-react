import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { GlobalStore } from "../stores/global"
import { CounterLayoutStyle } from "./Counter.style"

type Props = {
}

type States = {
  count: number
}

export const CounterLayout = KBRD.Component<Props>((self) =>
  self
    .style(CounterLayoutStyle)
    .states<States>({
      count: GlobalStore.get.counter(),
    })
    .onInit(({ states }) => {
      GlobalStore.bind({
        get: () => ({ counter: states.get.count }),
        set: store => { states.set.count(store.counter) },
      })
    })
    .render(({ style, states }) => {
      console.log({ type: "render", name: "CounterLayout" })
      return <Kiwi.View style={style.container}>
        <Kiwi.Button
          title="-"
          onPress={() => {
            if (states.get.count > 0) {
              states.set.count(states.get.count - 1)
            }
          }}
        />
        <Kiwi.Text children={states.get.count} />
        <Kiwi.Button
          title="+"
          onPress={() => {
            states.set.count(states.get.count + 1)
          }}
        />
      </Kiwi.View>
    }),
)
