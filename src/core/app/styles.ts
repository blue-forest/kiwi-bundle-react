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
  console.log("===", Object.keys(stylesUpdates.min))
  const min = Object.keys(stylesUpdates.min).reduce<number>((all, key) => {
    const keyMin = Number(key)
    return width > keyMin ? keyMin : all
  }, 0)
  if (isInit || min !== stylesUpdates.currentMin) {
    console.log("SET MIN", Object.keys(stylesUpdates.min), min)
    stylesUpdates.currentMin = min
  } else {
    console.log("DO NOTHING", Object.keys(stylesUpdates.min), min)
  }
  /*if (minKeys.length !== 0) {
    if (typeof stylesUpdates.currentMin === "undefined") {
      stylesUpdates.currentMin = min
    } else if (min !== stylesUpdates.currentMin) {
      console.log("MIN", min)
    }
  }*/
  /*(typeof stylesUpdates.currentMin === "undefined" ||
    (min !== 0 && min !== stylesUpdates.currentMin))
) {*/
  //}
  /*const max = Object.keys(stylesUpdates.max).reduce<number>((all, key) => {
  const keyMax = Number(key)
  return width < keyMax ? keyMax : all
}, 0)
if (
  typeof stylesUpdates.currentMax === "undefined" ||
  (max !== 0 && max !== stylesUpdates.currentMax)
) {
  stylesUpdates.currentMax = max
  console.log("MAX", max)
}*/
}

onDimensionsChange({ width: ({ width }) => setStyleDimensions(width, false) })

export const renderStyle = (
  style: AppStyleSheet,
  set: (style: AppStyleSheet<StyleSheetStyle>) => void,
  update: () => void,
) => {
  const generate = (width: number, isInit: boolean) => {
    const limits: { min?: number; max?: number } = {}
    const finalStyle = Object.keys(style).reduce<
      AppStyleSheet<StyleSheetStyle>
    >((styleChildren, name) => {
      const currentStyle = style[name]
      if (Array.isArray(currentStyle)) {
        styleChildren[name] = currentStyle.reduce<StyleSheetStyle>(
          (all, current) => {
            if (
              (typeof current.min === "undefined" || width >= current.min) &&
              (typeof current.max === "undefined" || width <= current.max)
            ) {
              if (isInit) {
                if (
                  typeof current.min !== "undefined" &&
                  (typeof limits === "undefined" ||
                    typeof limits.min === "undefined" ||
                    current.min < limits.min)
                ) {
                  limits.min = current.min
                }
                /*if (
                  typeof current.max !== "undefined" &&
                  (typeof limits === "undefined" ||
                    typeof limits.max === "undefined" ||
                    current.max > limits.max)
                ) {
                  if (typeof limits === "undefined") {
                    limits = { max: current.max }
                  } else {
                    limits.max = current.max
                  }
                }*/
              }
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
    }, {})
    set(finalStyle)
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
      }
      if (typeof limits.max !== "undefined") {
        if (typeof stylesUpdates.max[limits.max] === "undefined") {
          stylesUpdates.max[limits.max] = []
        }
        stylesUpdates.max[limits.max].push(trigger)
      }
    }
  }
  generate(DimensionsWidth, true)
  setStyleDimensions(DimensionsWidth, true)
}
