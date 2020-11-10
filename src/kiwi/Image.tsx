import { React, ReactNative } from "../vendors"

type Props = {
  source: string | ReactNative.ImageSourcePropType
  style?: ReactNative.StyleProp<ReactNative.ImageStyle>
}

export const Image = (props: Props) => {
  return <ReactNative.Image
    source={props.source as ReactNative.ImageSourcePropType}
    style={props.style}
  />
}
