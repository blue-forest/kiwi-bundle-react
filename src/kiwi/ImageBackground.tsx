import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props extends Omit<ReactNative.ImageBackgroundProps, "source"> {
  source: string | ReactNative.ImageSourcePropType
  style?: StyleSheetStyleView
}

export const ImageBackground = (props: Props) => {
  let { source, ...propsLeft } = props
  return (
    <ReactNative.ImageBackground
      source={source as ReactNative.ImageSourcePropType}
      {...propsLeft}
    />
  )
}
