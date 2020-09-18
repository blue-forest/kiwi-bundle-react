import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface ListProps extends ComponentProps {}

export class List extends Component<ListProps> {
  render() {
    return <ul style={this.state.$.style} children={this.props.children}/>
  }
}
