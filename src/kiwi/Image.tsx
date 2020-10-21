import { React, ReactNative } from "../vendors"

type Props = {
  source: string | ReactNative.ImageURISource
  style?: ReactNative.StyleProp<ReactNative.ImageStyle>
}

export const Image = (props: Props) => {
  return <ReactNative.Image
    source={props.source as any}
    style={props.style}
  />
}
