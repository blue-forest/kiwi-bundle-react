import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface ListElementProps extends ComponentProps {
  id: string
}

export class ListElement extends Component<ListElementProps> {
  render() {
    return <li key={this.props.id} style={this.state.style} children={this.props.children}/>
  }
}
