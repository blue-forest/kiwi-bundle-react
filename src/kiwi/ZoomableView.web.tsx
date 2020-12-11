import { React } from "../vendors"
import { View } from "./View"
import { ZoomableViewProps } from "./ZoomableView"

const MIN_ZOOM = 0.1
const MAX_ZOOM = 4

export const ZoomableView = (props: ZoomableViewProps) => {
  const ref: any = React.createRef()
  let isMouseDown = React.useRef(false)
  let [isCtrlDown, setIsCtrlDown] = React.useState(false)
  let oldY = React.useRef(-1)
  const [scale, setScale] = React.useState(1)
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 })
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
          if (x >= 0) {
            x = 0
          }
          let y = translate.y + event.movementY
          if (y >= 0) {
            y = 0
          }
          setTranslate({ x, y })
        }
      }
    }

    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        console.log("keydown")
        setIsCtrlDown(true)
      }
    }

    const keyup = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        console.log("keyup")
        setIsCtrlDown(false)
      }
    }

    console.log("test")

    document.addEventListener("keydown", keydown, false)

    document.addEventListener("keydown", keyup, false)

    ref.current.ondragstart = () => false

    ref.current.onwheel = (event: any) => {
      //console.log(event.offsetX, event.offsetY)
      /*if (event.deltaY < 0) {
        if (scale < 1) {
          setScale(scale + 0.1)
        }
      } else {
        if (scale > 0.2) {
          setScale(scale - 0.1)
        }
      }*/
      const zoomDelta = (event.offsetY - oldY.current) / 10
      if (oldY.current < 0) {
        oldY.current = event.offsetY
      }
      if (Math.abs(zoomDelta) > 5) {
        //const oldScale = scale
        setScale(
          Math.max(Math.min(MAX_ZOOM, scale + zoomDelta / 100), MIN_ZOOM),
        )
        oldY.current = event.offsetY
        console.log(oldY.current)
      }
      event.preventDefault()
    }
  })
  return (
    <View
      ref={ref}
      style={[
        {
          overflow: "hidden",
          cursor: isCtrlDown ? "move" : "pointer",
        },
        props.style,
      ]}>
      <View
        style={{
          transform: [
            { scale },
            { translateX: translate.x },
            { translateY: translate.y },
          ],
        }}
        children={props.children}
      />
    </View>
  )
}
