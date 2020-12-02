import { React, ReactNative } from "../vendors"
import { ZoomableViewProps } from "./ZoomableView"

export const ZoomableView = (props: ZoomableViewProps) => {
  const ref: any = React.createRef()
  const [scale, setScale] = React.useState(1)
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 })
  let isMouseDown = React.useRef(false)
  React.useEffect(() => {
    ref.current.onmouseup = () => {
      isMouseDown.current = false
    }
    ref.current.onmousedown = (event: any) => {
      isMouseDown.current = event.target === ref.current
    }
    ref.current.onmousemove = (event: any) => {
      if (isMouseDown.current) {
        if (event.buttons !== 1) {
          isMouseDown.current = false
        } else {
          let x = translate.x + event.movementX
          if (x <= 0) {
            x = 0
          }
          let y = translate.y + event.movementY
          if (y <= 0) {
            y = 0
          }
          setTranslate({ x, y })
        }
      }
    }

    ref.current.ondragstart = () => false

    ref.current.onwheel = (event: any) => {
      //console.log(event.offsetX, event.offsetY)
      if (event.deltaY < 0) {
        if (scale < 1) {
          setScale(scale + 0.1)
        }
      } else {
        if (scale > 0.2) {
          setScale(scale - 0.1)
        }
      }
      event.preventDefault()
    }
  }, [props, ref, scale, translate])
  return (
    <ReactNative.View
      ref={ref}
      style={[
        {
          overflow: "hidden",
        },
        props.style,
      ]}>
      <ReactNative.View
        style={{
          transform: [
            { scale },
            { translateX: translate.x },
            { translateY: translate.y },
          ],
        }}
        children={props.children}
      />
    </ReactNative.View>
  )
}
