import { React, ReactNative } from "../vendors"
import { StyleSheetStyleText } from "../core/app/styles"
import { i18n, NameField_Text } from "dropin-client"

interface Props extends ReactNative.TextProps {
  style?: ReactNative.StyleProp<StyleSheetStyleText>
  children?: NameField_Text
}

export const Text = (props: Props) => {
  let { children, ...propsLeft } = props
  if(typeof children === "string") children = i18n(children)
  return <ReactNative.Text {...propsLeft}
    children={children}
  />
}
