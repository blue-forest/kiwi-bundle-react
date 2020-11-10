import { React, ReactNative } from "../vendors"
import { StyleSheetStyleText } from "../core/app/styles"
import { i18n, NameField_Text } from "dropin-client"

type Props = {
  style?: ReactNative.StyleProp<StyleSheetStyleText>
  onPress?: (event: ReactNative.GestureResponderEvent) => void
  onLongPress?: (event: ReactNative.GestureResponderEvent) => void
  children?: NameField_Text
}

export const Text = (props: Props) => {
  return <ReactNative.Text
    style={props.style}
    onPress={props.onPress}
    onLongPress={props.onLongPress}
    children={typeof props.children === "undefined" ? undefined : i18n(props.children)}
  />
}
