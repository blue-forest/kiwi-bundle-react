import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface Props extends ComponentProps {}

export class List extends Component<Props> {
  render() {
    return <ul style={this.state.style} children={this.props.children}/>
  }
}
