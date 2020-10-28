import React from "react"
import * as ReactNative from "react-native"

type Props = {
  children?: React.ReactNode
  style?: ReactNative.StyleProp<ReactNative.ViewStyle>
  onPress?: (event: ReactNative.NativeSyntheticEvent<ReactNative.NativeTouchEvent>) => void
}

export const View = (props: Props) => {
  const view = <ReactNative.View
    children={props.children}
    style={props.style}
  />
  if (typeof props.onPress !== "undefined") {
    return <ReactNative.TouchableWithoutFeedback onPress={props.onPress}>
      {view}
    </ReactNative.TouchableWithoutFeedback>
  }
  return view
}
