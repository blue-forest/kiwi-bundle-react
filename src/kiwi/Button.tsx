import { React, ReactNative } from "../vendors"
import { XOR } from "dropin-client"
import {Text, View} from "."
import { StyleSheetStyleText, StyleSheetStyleView } from "../core/app/styles"

type Props = {
  title: string
  onPress?: (event: ReactNative.NativeSyntheticEvent<ReactNative.NativeTouchEvent>) => void
  color?: string
  disabled?: boolean
  accessibilityLabel?: string
  testID?: string
} & XOR<{
  style?: ReactNative.StyleProp<StyleSheetStyleView>
  textStyle?: ReactNative.StyleProp<StyleSheetStyleText>
}, {
  containerStyle?: ReactNative.StyleProp<StyleSheetStyleView>
}>

export const Button = (props: Props) => {
  if (typeof props.style !== "undefined" || typeof props.textStyle !== "undefined") {
    return <View style={[{cursor: "pointer"}, props.style]} onPress={props.onPress}>
      <Text style={props.textStyle} children={props.title}/>
    </View>
  }
  return <View style={props.containerStyle}>
    <ReactNative.Button
      title={props.title}
      onPress={props.onPress || (() => {})}
      color={props.color}
      disabled={props.disabled}
      accessibilityLabel={props.accessibilityLabel}
    />
  </View>
}
