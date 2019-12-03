import * as React from "react"
import { Component } from "./Component"

interface Props {}

export class List extends Component<Props> {

  render() {
    return <ul style={this.props.style} children={this.props.children}/>
  }
}
