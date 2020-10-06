import React from "react"
import * as ReactNative from "react-native"

type Props = {
  children?: React.ReactNode
  style?: ReactNative.StyleProp<ReactNative.ViewStyle>
}

export const View = (props: Props) => {
  return <ReactNative.View
    children={props.children}
    style={props.style}
  />
}
