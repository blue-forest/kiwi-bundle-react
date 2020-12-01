import { React } from "../vendors"
import { PinchGestureHandler } from "react-native-gesture-handler"

export interface ZoomableViewProps {
  children?: React.ReactNode
  onZoomUp?: () => void
  onZoomDown?: () => void
}

export const ZoomableView = (props: ZoomableViewProps) => {
  return <PinchGestureHandler {...props} />
}
