import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { ButtonComponentStyle } from "./Button.style"

type Props = {
  title: string
  onPress: () => void
  containerStyle?: any
}

export const ButtonComponent = KBRD.Component({
  style: ButtonComponentStyle,
})()<Props>({
  render: ({ props, style }) => (
    <Kiwi.View style={[style.container, props.containerStyle]}>
      <Kiwi.Button
        title={props.title}
        onPress={props.onPress}
      />
    </Kiwi.View>
  ),
})
