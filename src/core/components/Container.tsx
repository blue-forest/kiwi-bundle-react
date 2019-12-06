import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface ContainerProps extends ComponentProps {}

export class Container extends Component<ContainerProps> {

  render() {
    return <div style={this.state.style} children={this.props.children}/>
  }

}
