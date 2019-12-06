import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface ListElementProps extends ComponentProps {}

export class ListElement extends Component<ListElementProps> {
  render() {
    return <li style={this.state.style} children={this.props.children}/>
  }
}
