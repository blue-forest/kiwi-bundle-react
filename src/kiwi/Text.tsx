import { React, ReactNative } from "../vendors"
import { StyleSheetStyleText } from "../core/app/styles"
import { i18n, NameField_Text } from "dropin-client"
import { useTheme } from "@react-navigation/native"

interface Props extends ReactNative.TextProps {
  style?: ReactNative.StyleProp<StyleSheetStyleText>
  children?: NameField_Text
}

export const Text = (props: Props) => {
  let { children, style, ...propsLeft } = props
  if (typeof children === "string") {
    children = i18n(children)
  }
  if (!style) {
    style = {}
  }
  if (!(style as any).color) {
    (style as any).color = useTheme().colors.text
  }
  return <ReactNative.Text {...propsLeft} style={style} children={children} />
}
