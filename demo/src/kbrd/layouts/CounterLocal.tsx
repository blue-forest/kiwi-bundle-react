import { React } from "kiwi-bundle-react"
import { KBRD } from ".."
import { CounterComponent } from "../components/Counter"

type States = {
  count: number
}

export const CounterLocalLayout = KBRD.Component((self) =>
  self
    .states<States>({
      count: 0,
    })
    .render(({ states }) => {
      console.log({ type: "render", name: "CounterLocalLayout" })
      return <CounterComponent
        count={states.get.count}
        setCount={states.set.count}
      />
    }),
)
