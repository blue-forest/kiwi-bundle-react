import * as React from "react"
import { ComponentProps, Component } from "./Component"
import { i18nSchema, i18n } from "dropin-recipes"

interface ButtonProps extends ComponentProps {
  children?: string|i18nSchema
}

export class Button extends Component<ButtonProps> {

  render() {
    const { children } = this.props
    return <button
      style={this.state.$.style}
      children={typeof children === "string" ? children : i18n(children as i18nSchema)}
    />
  }

}
