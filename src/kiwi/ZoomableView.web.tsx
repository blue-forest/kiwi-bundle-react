import { React, ReactNative } from "../vendors"
import { ZoomableViewProps } from "./ZoomableView"

export const ZoomableView = (props: ZoomableViewProps) => {
  const ref: any = React.createRef()
  React.useEffect(() => {
    if (typeof props.onMove !== "undefined") {
      ref.current.onmousedown = (downEvent: any) => {
        if (downEvent.target === ref.current) {
          const onMouseMove = (event: any) => {
            props.onMove!({ x: event.movementX, y: event.movementX })
          }
          ref.current.addEventListener("mousemove", onMouseMove)
          ref.current.onmouseup = () => {
            ref.current.removeEventListener("mousemove", onMouseMove)
            ref.current.onmouseup = null
          }
        }
      }
    }

    ref.current.ondragstart = () => false

    ref.current.onwheel = (event: any) => {
      //console.log(event.offsetX, event.offsetY)
      if (event.deltaY < 0) {
        if (typeof props.onZoomUp !== "undefined") {
          props.onZoomUp()
        }
      } else {
        if (typeof props.onZoomDown !== "undefined") {
          props.onZoomDown()
        }
      }
      event.preventDefault()
    }
  }, [props, ref])
  return (
    <ReactNative.View ref={ref} style={props.style} children={props.children} />
  )
}
