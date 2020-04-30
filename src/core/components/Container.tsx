import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface ContainerProps extends ComponentProps {
  onClick?: () => void
}

export class Container extends Component<ContainerProps> {
  render() {
    return <div onClick={this.props.onClick} style={this.state.style} children={this.props.children}/>
  }
}
