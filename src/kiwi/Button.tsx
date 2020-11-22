import { React, ReactNative } from "../vendors"
import { XOR } from "dropin-client"
import { Text, View } from "."
import { StyleSheetStyleText, StyleSheetStyleView } from "../core/app/styles"

type Props = Omit<ReactNative.ButtonProps, "onPress"> & {
  onPress?: (
    ev: ReactNative.NativeSyntheticEvent<ReactNative.NativeTouchEvent>,
  ) => void
} & XOR<
    {
      style?: ReactNative.StyleProp<StyleSheetStyleView>
      textStyle?: ReactNative.StyleProp<StyleSheetStyleText>
    },
    {
      containerStyle?: ReactNative.StyleProp<StyleSheetStyleView>
    }
  >

export const Button = (props: Props) => {
  if (
    typeof props.style !== "undefined" ||
    typeof props.textStyle !== "undefined"
  ) {
    const textStyle: ReactNative.TextStyle = {}
    if (typeof props.color !== "undefined") {
      textStyle.color = props.color
    }
    const style: StyleSheetStyleView = { cursor: "pointer" }
    return (
      <View style={[style, props.style]} onPress={props.onPress}>
        <Text style={[textStyle, props.textStyle]} children={props.title} />
      </View>
    )
  }
  let { onPress, ...propsLeft } = props
  const button = (
    <ReactNative.Button onPress={onPress || (() => {})} {...propsLeft} />
  )
  if (typeof props.containerStyle === "undefined") {
    return button
  }
  return <View style={props.containerStyle} children={button} />
}
