import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from "../app"
import { ButtonLayout } from "../components/Button"
import { HomePageStyle } from "./Home.style"

type Props = {
  selected?: boolean
}

type States = {
  count: number
}

export const HomePage = KBRD.Page<Props, States>({
  style: HomePageStyle,
  states: {
    count: 5,
  },
  render: ({ state, style }) => (
    <Kiwi.View>
      <Kiwi.View style={style.textContainer}>
        <Kiwi.Text style={HomePageStyle.text}>{state.get.count}</Kiwi.Text>
      </Kiwi.View>
      <Kiwi.View style={HomePageStyle.container}>
        <ButtonLayout
          title="-"
          onPress={() => {
            if (state.get.count > 0) {
              state.set.count(state.get.count - 1)
            }
          }}
        />
        <ButtonLayout
          title="+"
          onPress={() => {
            state.set.count(state.get.count + 1)
          }}
        />
      </Kiwi.View>
    </Kiwi.View>
  ),
})
