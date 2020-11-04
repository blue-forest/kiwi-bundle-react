import { ReactNative } from "../../vendors"

export type StyleSheetViewStyle = ReactNative.ViewStyle

export type StyleSheetTextStyle = ReactNative.TextStyle

export type StyleSheetImageStyle = ReactNative.ImageStyle

export type StyleSheetStyle = StyleSheetViewStyle | StyleSheetTextStyle | StyleSheetImageStyle

export type StyleSheetMediaQuery = {
  min?: number
  max?: number
  style: StyleSheetStyle
}
