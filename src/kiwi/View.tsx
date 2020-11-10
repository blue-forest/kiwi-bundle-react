import React from "react"
import * as ReactNative from "react-native"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props extends ReactNative.ViewProps {
  style?: ReactNative.StyleProp<StyleSheetStyleView>
  onPress?: (event: ReactNative.NativeSyntheticEvent<ReactNative.NativeTouchEvent>) => void
  children?: React.ReactNode
}

export const View = (props: Props) => {
  const view = <ReactNative.View {...props}/>
  if (typeof props.onPress === "undefined") return view
  return <ReactNative.TouchableWithoutFeedback onPress={props.onPress} children={view}/>
}
