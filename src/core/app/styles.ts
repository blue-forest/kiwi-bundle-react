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
  min: { [min: number]: (() => void)[] }
  currentMin?: number
  max: { [max: number]: (() => void)[] }
  currentMax?: number
} = { min: {}, max: {} }

onDimensionsChange({
  width: ({ width }) => {
    const min = Object.keys(stylesUpdates.min).reduce<number>((all, key) => {
      const keyMin = Number(key)
      return width > keyMin ? keyMin : all
    }, 0)
    if (
      typeof stylesUpdates.currentMin === "undefined" ||
      (min !== 0 && min !== stylesUpdates.currentMin)
    ) {
      stylesUpdates.currentMin = min
      console.log("MIN", min)
    }
    const max = Object.keys(stylesUpdates.max).reduce<number>((all, key) => {
      const keyMax = Number(key)
      return width < keyMax ? keyMax : all
    }, 0)
    if (
      typeof stylesUpdates.currentMax === "undefined" ||
      (max !== 0 && max !== stylesUpdates.currentMax)
    ) {
      stylesUpdates.currentMax = max
      console.log("MAX", max)
    }
  },
})

export const renderStyle = (
  style: AppStyleSheet,
  set: (style: AppStyleSheet<StyleSheetStyle>) => void,
  update: () => void,
) => {
  const generate = (watchForUpdates: boolean) => {
    let limits: { min?: number; max?: number } | undefined
    const finalStyle = Object.keys(style).reduce<
      AppStyleSheet<StyleSheetStyle>
    >((styleChildren, name) => {
      const currentStyle = style[name]
      if (Array.isArray(currentStyle)) {
        styleChildren[name] = currentStyle.reduce<StyleSheetStyle>(
          (all, current) => {
            if (
              (typeof current.min === "undefined" ||
                DimensionsWidth >= current.min) &&
              (typeof current.max === "undefined" ||
                DimensionsWidth <= current.max)
            ) {
              if (watchForUpdates) {
                if (
                  typeof current.min !== "undefined" &&
                  (typeof limits === "undefined" ||
                    typeof limits.min === "undefined" ||
                    current.min < limits.min)
                ) {
                  if (typeof limits === "undefined") {
                    limits = { min: current.min }
                  } else {
                    limits.min = current.min
                  }
                }
                if (
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
                }
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
    if (typeof limits !== "undefined") {
      const trigger = () => {
        generate(false)
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
  generate(true)
}
