import { ReactNative } from "../../vendors"

export type StyleSheetStyleView = ReactNative.ViewStyle & { cursor?: "pointer" }

export type StyleSheetStyleText = ReactNative.TextStyle

export type StyleSheetStyleImage = ReactNative.ImageStyle

export type StyleSheetStyle = StyleSheetStyleView &
  StyleSheetStyleText &
  StyleSheetStyleImage

export type StyleSheetMediaQuery = {
  min?: number
  max?: number
  style: StyleSheetStyle
}

export type AppStyleSheet<Style = StyleSheetStyle | StyleSheetMediaQuery[]> = {
  [name: string]: Style
}

const windowDimensions = ReactNative.Dimensions.get("window")
let WIDTH = windowDimensions.width
let HEIGHT = windowDimensions.height

const minUpdates: { [min: number]: (() => void)[] } = {}
const maxUpdates: { [max: number]: (() => void)[] } = {}

const resized = () => {
  console.log("UPDATE", WIDTH, HEIGHT)
}

ReactNative.Dimensions.addEventListener("change", ({ window }) => {
  WIDTH = window.width
  HEIGHT = window.height
  resized()
})

export const renderStyle = (
  style: AppStyleSheet,
  set: (style: AppStyleSheet<StyleSheetStyle>) => void,
  update: () => void,
) => {
  set(
    Object.keys(style).reduce<AppStyleSheet<StyleSheetStyle>>(
      (finalStyle, name) => {
        const currentStyle = style[name]
        if (Array.isArray(currentStyle)) {
          const generate = () => {
            return currentStyle.reduce<StyleSheetStyle>((all, current) => {
              return Object.assign(all, current.style)
            }, {})
          }
          finalStyle[name] = generate()
        } else {
          finalStyle[name] = currentStyle
        }
        return finalStyle
      },
      {},
    ),
  )
}
