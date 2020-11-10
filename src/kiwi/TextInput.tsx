import { React, ReactNative } from "../vendors"
import { StyleSheetStyleText } from "../core/app/styles"

type Props = {
  style?: ReactNative.StyleProp<StyleSheetStyleText>
  children?: React.ReactNode
}

export const TextInput = (props: Props) => {
  return <ReactNative.TextInput
    style={props.style}
    children={props.children}
  />
}
