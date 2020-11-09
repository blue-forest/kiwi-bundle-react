import { ReactNative } from "../../vendors"

export type StyleSheetStyleView = ReactNative.ViewStyle

export type StyleSheetStyleText = ReactNative.TextStyle

export type StyleSheetStyleImage = ReactNative.ImageStyle

export type StyleSheetStyle = StyleSheetStyleView | StyleSheetStyleText | StyleSheetStyleImage

export type StyleSheetMediaQuery = {
  min?: number
  max?: number
  style: StyleSheetStyle
}
