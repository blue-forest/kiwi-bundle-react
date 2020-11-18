import { React } from "kiwi-bundle-react"
import { KBRD } from ".."
import { CounterComponent } from "../components/Counter"

export const CounterGlobalLayout = KBRD.Component((self) =>
  self
    .stores({
      global: [ "counter" ],
    })
    .render(({ stores }) => {
      console.log({ type: "render", name: "CounterGlobalLayout" })
      return <CounterComponent
        count={stores.global.get.counter}
        setCount={stores.global.set.counter}
      />
    }),
)
