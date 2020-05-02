import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface FormProps extends ComponentProps {}

export class Form extends Component<FormProps> {

  render() {
    return <form style={this.state.$.style} children={this.props.children}/>
  }

}
