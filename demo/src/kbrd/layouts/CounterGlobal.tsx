import { React } from "kiwi-bundle-react"
import { KBRD } from ".."
import { CounterComponent } from "../components/Counter"
import { GlobalStore } from "../stores/global"

export const CounterGlobalLayout = KBRD.Component((self) =>
  self
    .stores([
      GlobalStore.bind([ "counter" ]),
    ])
    .render(() => {
      console.log({ type: "render", name: "CounterGlobalLayout" })
      return <CounterComponent
        count={GlobalStore.get.counter}
        setCount={GlobalStore.set.counter}
      />
    }),
)
