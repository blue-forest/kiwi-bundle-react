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
  const min = Object.keys(stylesUpdates.min)
    .map((s) => Number(s))
    .sort((a, b) => a - b)
    .reduce<number>((all, current) => (width > current ? current : all), 0)
  if (isInit || min !== stylesUpdates.currentMin) {
    stylesUpdates.currentMin = min
    if (!isInit && typeof stylesUpdates.min[min] !== "undefined") {
      stylesUpdates.min[min].forEach((cb) => cb(min))
    }
  }
  const maxList = Object.keys(stylesUpdates.max)
    .map((s) => Number(s))
    .sort((a, b) => b - a)
  const max = maxList.reduce<number>(
    (all, current) => (width < current ? current : all),
    maxList[0],
  )
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
  const limits: { min: number[]; max: number[] } = {
    min: [0],
    max: [Infinity],
  }
  const generate = (width: number, isInit: boolean) => {
    set(
      Object.keys(style).reduce<AppStyleSheet<StyleSheetStyle>>(
        (styleChildren, name) => {
          const currentStyle = style[name]
          if (Array.isArray(currentStyle)) {
            styleChildren[name] = currentStyle.reduce<StyleSheetStyle>(
              (all, current) => {
                if (isInit) {
                  if (typeof current.min !== "undefined") {
                    limits.min.push(current.min)
                  }
                  if (typeof current.max !== "undefined") {
                    limits.max.push(current.max)
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
      limits.min.forEach((limit) => {
        if (typeof stylesUpdates.min[limit] === "undefined") {
          stylesUpdates.min[limit] = []
        }
        stylesUpdates.min[limit].push(trigger)
      })
      limits.max.forEach((limit) => {
        if (typeof stylesUpdates.max[limit] === "undefined") {
          stylesUpdates.max[limit] = []
        }
        stylesUpdates.max[limit].unshift(trigger)
      })
    }
  }
  generate(DimensionsWidth, true)
  setStyleDimensions(DimensionsWidth, true)
}
