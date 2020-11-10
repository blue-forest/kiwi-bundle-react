import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props extends ReactNative.KeyboardAvoidingViewProps {
  style?: StyleSheetStyleView
}

export const KeyboardAvoidingView = (props: Props) => {
  return <ReactNative.KeyboardAvoidingView {...props}/>
}
