import React from "react"
import * as ReactNative from "react-native"

type Props = {
  children?: React.ReactNode
  style?: ReactNative.StyleProp<ReactNative.TextStyle>
}

export const Text = (props: Props) => {
  return <ReactNative.Text
    children={props.children}
    style={props.style}
  />
}
