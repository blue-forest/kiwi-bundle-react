import React from "react"
import * as ReactNative from "react-native"
import {Text, View} from "."

type Props = {
  title: string
  onPress: (event: ReactNative.NativeSyntheticEvent<ReactNative.NativeTouchEvent>) => void
  color?: string
  disabled?: boolean
  accessibilityLabel?: string
  testID?: string
  style?: any
  textStyle?: any
}

export const Button = (props: Props) => {
  if (typeof props.style !== "undefined" || typeof props.textStyle !== "undefined") {
    return <View style={[{cursor: "pointer"}, props.style]} onPress={props.onPress}>
      <Text style={props.textStyle}>{props.title}</Text>
    </View>
  }
  return <ReactNative.Button
    title={props.title}
    onPress={props.onPress}
    color={props.color}
    disabled={props.disabled}
    accessibilityLabel={props.accessibilityLabel}
  />
}
