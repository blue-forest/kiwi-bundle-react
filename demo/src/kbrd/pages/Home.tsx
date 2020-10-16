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
}, ({ state, style }) => (
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
))

type OptionsType = { style: { [name: string]: number } }
const globalStyle = { a: 1, b: 2 } as const
type PropsType = { [name: string]: any }

function Component<P extends PropsType, Options extends OptionsType>(o: Options, r: (o: { style: Options["style"] }) => void) {}
Component({ style: globalStyle }, ({ style }) => { style })
Component<{ test: any }>({ style: globalStyle }, ({ style }) => { style })






const Component2 = <P extends PropsType>() => {
  return <Options extends OptionsType>(o: Options) => {
    return (r: (o: { style: Options["style"] }) => void) => {}
  }
}

Component2<{
  states: {},
}>()({
  style: globalStyle,
})(({ style }) => {
  console.log(style)
})



/*class Test<Props extends PropsType, Options extends OptionsType> {
  constructor(options: Options, r: (o: { style: Options["style"] }) => void) {}
}

new Test<{ test: any }>({ style: globalStyle })*/
