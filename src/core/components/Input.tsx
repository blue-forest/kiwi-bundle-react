import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface InputProps extends ComponentProps {}

export class Input extends Component<InputProps> {

  render() {
    return <input style={this.state.style} children={this.props.children}/>
  }

}
