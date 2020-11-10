import React from "react"
import * as ReactNative from "react-native"
import { StyleSheetStyleView } from "../core/app/styles"

type Props = {
  style?: ReactNative.StyleProp<StyleSheetStyleView>
  onPress?: (event: ReactNative.NativeSyntheticEvent<ReactNative.NativeTouchEvent>) => void
  children?: React.ReactNode
}

export const View = (props: Props) => {
  const view = <ReactNative.View
    children={props.children}
    style={props.style}
  />
  if (typeof props.onPress !== "undefined") {
    return <ReactNative.TouchableWithoutFeedback onPress={props.onPress} children={view}/>
  }
  return view
}
