import { React, ReactNative } from "../vendors"

type Props = {
  children?: React.ReactNode
  style?: ReactNative.StyleProp<ReactNative.TextStyle>
  onPress?: (event: ReactNative.GestureResponderEvent) => void
  onLongPress?: (event: ReactNative.GestureResponderEvent) => void
}

export const Text = (props: Props) => {
  return <ReactNative.Text
    children={props.children}
    style={props.style}
    onPress={props.onPress}
    onLongPress={props.onLongPress}
  />
}
