import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface GridProps extends ComponentProps {
  elementWidth?: number
  columns?: number
  margin?: number
}

export class Grid extends Component<GridProps> {

  render() {
    return <ul style={this.state.style}>
      {this.props.children}
    </ul>
  }

}
