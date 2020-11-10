import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props extends ReactNative.ViewProps {
  style?: StyleSheetStyleView
}

export const SafeAreaView = (props: Props) => {
  return <ReactNative.SafeAreaView {...props}/>
}
