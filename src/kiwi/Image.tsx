import { React, ReactNative } from "../vendors"

type Props = Omit<ReactNative.ImagePropsBase, "source"> & {
  source: string | ReactNative.ImageSourcePropType
  style?: ReactNative.StyleProp<ReactNative.ImageStyle>
}

export const Image = (props: Props) => {
  const { source, ...propsLeft } = props
  return (
    <ReactNative.Image
      {...propsLeft}
      source={source as ReactNative.ImageSourcePropType}
    />
  )
}
