import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface Props extends ComponentProps {}

export class ListElement extends Component<Props> {
  render() {
    return <li style={this.state.style} children={this.props.children}/>
  }
}
