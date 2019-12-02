import * as React from "react"
import { Component } from "./Component"

interface Props {
  children: any
}

export class ListElement extends Component<Props> {
  render() {
    return <li children={this.props.children}/>
  }
}
