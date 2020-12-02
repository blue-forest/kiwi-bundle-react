import { React, ReactNative } from "../vendors"
import { PinchGestureHandler } from "react-native-gesture-handler"
import { StyleSheetStyleView } from "../core/app/styles"

export interface ZoomableViewProps {
  children?: React.ReactNode
  onZoomUp?: () => void
  onZoomDown?: () => void
  onMove?: (movement: { x: number; y: number }) => void
  style?: ReactNative.StyleProp<StyleSheetStyleView>
}

export const ZoomableView = (props: ZoomableViewProps) => {
  return <PinchGestureHandler {...props} />
}
