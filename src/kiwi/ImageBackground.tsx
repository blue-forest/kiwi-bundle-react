import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props extends ReactNative.ImageBackgroundProps {
  style?: StyleSheetStyleView
}

export const ImageBackground = (props: Props) => {
  return <ReactNative.ImageBackground {...props}/>
}
