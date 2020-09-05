import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface GridElementProps extends ComponentProps {
  width: number
}

export class GridElement extends Component<GridElementProps> {

  render() {
    const { width } = this.props
    const style = Object.assign(this.state.$.style, { width })
    return <li style={style}>
      {this.props.children}
    </li>
  }

}
