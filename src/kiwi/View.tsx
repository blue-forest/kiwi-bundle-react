import React from "react"
import * as ReactNative from "react-native"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props
  extends ReactNative.ViewProps,
    React.ClassAttributes<ReactNative.View> {
  style?: ReactNative.StyleProp<StyleSheetStyleView>
  onPress?: (
    event: ReactNative.NativeSyntheticEvent<ReactNative.NativeTouchEvent>,
  ) => void
  children?: React.ReactNode
}

export const View = React.forwardRef<ReactNative.View, Props>((props, ref) => {
  const { onPress, ...rest } = props
  const view = <ReactNative.View ref={ref} {...rest} />
  if (typeof onPress !== "undefined") {
    return (
      <ReactNative.TouchableWithoutFeedback onPress={onPress} children={view} />
    )
  }
  return view
})
