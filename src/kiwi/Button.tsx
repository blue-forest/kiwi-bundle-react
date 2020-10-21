import React from "react"
import * as ReactNative from "react-native"

type Props = {
  title: string
  onPress: (event: ReactNative.NativeSyntheticEvent<ReactNative.NativeTouchEvent>) => void
  color?: string
  disabled?: boolean
  accessibilityLabel?: string
  testID?: string
}

export const Button = (props: Props) => {
  return <ReactNative.Button
    title={props.title}
    onPress={props.onPress}
    color={props.color}
    disabled={props.disabled}
    accessibilityLabel={props.accessibilityLabel}
  />
}
