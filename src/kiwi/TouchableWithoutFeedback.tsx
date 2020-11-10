import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props extends ReactNative.TouchableWithoutFeedbackProps {
  style?: StyleSheetStyleView
}

export const TouchableWithoutFeedback = (props: Props) => {
  return <ReactNative.TouchableWithoutFeedback {...props}/>
}
