import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface FormProps extends ComponentProps {
  onSubmit: () => void
}

export class Form extends Component<FormProps> {

  private onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit()
  }

  render() {
    return <form
      onSubmit={this.onSubmit.bind(this)}
      style={this.state.$.style}
      children={this.props.children}
    />
  }

}
