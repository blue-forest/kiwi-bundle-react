import React from "react"
import * as ReactNative from "react-native"

type Props = {
  children?: React.ReactNode
  style?: ReactNative.StyleProp<ReactNative.TextStyle>
}

export const TextInput = (props: Props) => {
  return <ReactNative.TextInput
    children={props.children}
    style={props.style}
  />
}
