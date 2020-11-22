import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { CounterLayoutStyle } from "./Counter.style"

type Props = {
  count: number
  setCount: (count: number) => void
}

export const CounterComponent = KBRD.Component<Props>((self) =>
  self
    .style(CounterLayoutStyle)
    .render(({ style, props }) => {
      return <Kiwi.View style={style.container}>
        <Kiwi.Button
          title="-"
          onPress={() => {
            if (props.count > 0) {
              props.setCount(props.count - 1)
            }
          }}
        />
        <Kiwi.Text children={props.count} />
        <Kiwi.Button
          title="+"
          onPress={() => {
            props.setCount(props.count + 1)
          }}
        />
      </Kiwi.View>
    }),
)
