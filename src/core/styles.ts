import { ReactNative } from "../vendors"

export type StyleSheetViewStyle = ReactNative.ViewStyle

export type StyleSheetTextStyle = ReactNative.TextStyle

export type StyleSheetImageStyle = ReactNative.ImageStyle

export type StyleSheetStyle = StyleSheetViewStyle | StyleSheetTextStyle | StyleSheetImageStyle

type StyleSheetMediaQuery = {
  min?: number
  max?: number
  style: StyleSheetStyle
}

export type StyleSheet<Style = any> = {
  [Name in keyof Style]: StyleSheetStyle | StyleSheetMediaQuery[]
}
