import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface ContainerProps extends ComponentProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export class Container extends Component<ContainerProps> {
  render() {
    return <div onClick={this.props.onClick?.bind(this)} style={this.state.style} children={this.props.children}/>
  }
}
