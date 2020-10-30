import { ReactNative } from "../vendors"

export type AppStyleSheetViewStyle = ReactNative.ViewStyle

export type AppStyleSheetTextStyle = ReactNative.TextStyle

export type AppStyleSheetImageStyle = ReactNative.ImageStyle

export type StyleSheetStyle = AppStyleSheetViewStyle | AppStyleSheetTextStyle | AppStyleSheetImageStyle

type AppStyleSheetMediaQuery = {
  min?: number
  max?: number
  style: StyleSheetStyle
}

export type AppStyleSheet = {
  [name: string]: StyleSheetStyle | AppStyleSheetMediaQuery[]
}
