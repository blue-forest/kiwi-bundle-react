import { ReactNative } from "../../vendors"
import { DimensionsWidth, onDimensionsChange } from "./dimensions"

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

const stylesUpdates: {
  min: { [min: number]: ((width: number) => void)[] }
  currentMin?: number
  max: { [max: number]: ((width: number) => void)[] }
  currentMax?: number
} = { min: {}, max: {} }

const setStyleDimensions = (width: number, isInit: boolean) => {
  const min = Object.keys(stylesUpdates.min).reduce<number>((all, key) => {
    const keyMin = Number(key)
    return width > keyMin ? keyMin : all
  }, 0)
  if (isInit || min !== stylesUpdates.currentMin) {
    stylesUpdates.currentMin = min
    if (!isInit && typeof stylesUpdates.min[min] !== "undefined") {
      stylesUpdates.min[min].forEach((cb) => cb(min))
    }
  }
  const max = Object.keys(stylesUpdates.max).reduce<number>((all, key) => {
    const keyMax = Number(key)
    return width < keyMax ? keyMax : all
  }, 0)
  if (isInit || max !== stylesUpdates.currentMax) {
    stylesUpdates.currentMax = max
    if (!isInit && typeof stylesUpdates.max[max] !== "undefined") {
      stylesUpdates.max[max].forEach((cb) => cb(max))
    }
  }
}

onDimensionsChange({ width: ({ width }) => setStyleDimensions(width, false) })

export const renderStyle = (
  style: AppStyleSheet,
  set: (style: AppStyleSheet<StyleSheetStyle>) => void,
  update: () => void,
) => {
  const generate = (width: number, isInit: boolean) => {
    const limits: { min?: number; max?: number } = {}
    set(
      Object.keys(style).reduce<AppStyleSheet<StyleSheetStyle>>(
        (styleChildren, name) => {
          const currentStyle = style[name]
          if (Array.isArray(currentStyle)) {
            styleChildren[name] = currentStyle.reduce<StyleSheetStyle>(
              (all, current) => {
                if (isInit) {
                  if (
                    typeof current.min !== "undefined" &&
                    (typeof limits.min === "undefined" ||
                      current.min < limits.min)
                  ) {
                    limits.min = current.min
                  }
                  if (
                    typeof current.max !== "undefined" &&
                    (typeof limits.max === "undefined" ||
                      current.max > limits.max)
                  ) {
                    limits.max = current.max
                  }
                }
                if (
                  (typeof current.min === "undefined" ||
                    width >= current.min) &&
                  (typeof current.max === "undefined" || width <= current.max)
                ) {
                  return Object.assign(all, current.style)
                }
                return all
              },
              {},
            )
          } else {
            styleChildren[name] = currentStyle
          }
          return styleChildren
        },
        {},
      ),
    )
    if (isInit) {
      const trigger = (newWidth: number) => {
        generate(newWidth, false)
        update()
      }
      if (typeof limits.min !== "undefined") {
        if (typeof stylesUpdates.min[limits.min] === "undefined") {
          stylesUpdates.min[limits.min] = []
        }
        stylesUpdates.min[limits.min].push(trigger)
        if (typeof stylesUpdates.min[0] === "undefined") {
          stylesUpdates.min[0] = []
        }
        stylesUpdates.min[0].push(trigger)
      }
      if (typeof limits.max !== "undefined") {
        if (typeof stylesUpdates.max[limits.max] === "undefined") {
          stylesUpdates.max[limits.max] = []
        }
        stylesUpdates.max[limits.max].push(trigger)
        if (typeof stylesUpdates.max[0] === "undefined") {
          stylesUpdates.max[0] = []
        }
        stylesUpdates.max[0].push(trigger)
      }
    }
  }
  generate(DimensionsWidth, true)
  setStyleDimensions(DimensionsWidth, true)
}
