import { React, ReactNative } from "../vendors"
import { ZoomableViewProps } from "./ZoomableView"

export const ZoomableView = (props: ZoomableViewProps) => {
  const ref: any = React.createRef()
  React.useEffect(() => {
    ref.current.onwheel = (event: any) => {
      if (event.deltaY < 0) {
        if (typeof props.onZoomUp !== "undefined") {
          props.onZoomUp()
        }
      } else {
        if (typeof props.onZoomDown !== "undefined") {
          props.onZoomDown()
        }
      }
    }
  }, [props, ref])
  return <ReactNative.View ref={ref} children={props.children} />
}
