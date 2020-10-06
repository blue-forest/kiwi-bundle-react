import React from "react"
import * as ReactNative from "react-native"

type Props = {
  title: string
  onPress: (event: ReactNative.NativeSyntheticEvent<ReactNative.NativeTouchEvent>) => void
  children?: React.ReactNode
}

export const Button = (props: Props) => {
  return <ReactNative.Button
    onPress={props.onPress}
    title={props.title}
    children={props.children}
  />
}
