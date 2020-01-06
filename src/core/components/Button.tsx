import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface ButtonProps extends ComponentProps {}

export class Button extends Component<ButtonProps> {

  render() {
    return <button style={this.state.style} children={this.props.children}/>
  }

}
