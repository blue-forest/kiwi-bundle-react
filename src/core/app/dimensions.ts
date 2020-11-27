import { ReactNative } from "../../vendors"

type Dimensions<Content = number> = {
  width: Content
  height: Content
}

type DimensionsCallback = (dimensions: Dimensions) => void

const windowDimensions = ReactNative.Dimensions.get("window")

export let DimensionsWidth = windowDimensions.width
export let DimensionsHeight = windowDimensions.height

const onUpdateCallbacks: Dimensions<DimensionsCallback[]> = {
  width: [],
  height: [],
}

ReactNative.Dimensions.addEventListener("change", ({ window }) => {
  if (DimensionsWidth !== window.width) {
    onUpdateCallbacks.width.forEach((onUpdate) => {
      onUpdate({ width: window.width, height: window.height })
    })
    DimensionsWidth = window.width
  }
  if (DimensionsHeight !== window.height) {
    onUpdateCallbacks.height.forEach((onUpdate) => {
      onUpdate({ width: window.width, height: window.height })
    })
    DimensionsHeight = window.height
  }
})

export const onDimensionsChange = (
  onUpdate: DimensionsCallback | Partial<Dimensions<DimensionsCallback>>,
) => {
  if (typeof onUpdate === "function") {
    onUpdateCallbacks.width.push(onUpdate)
    onUpdateCallbacks.height.push(onUpdate)
  } else {
    if (typeof onUpdate.width !== "undefined") {
      onUpdateCallbacks.width.push(onUpdate.width)
    }
    if (typeof onUpdate.height !== "undefined") {
      onUpdateCallbacks.height.push(onUpdate.height)
    }
  }
}
