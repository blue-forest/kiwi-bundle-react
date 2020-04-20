import * as React from "react"
import { XOR, i18nData, i18nSettings, i18n } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"

type TextProps = ComponentProps & XOR<{
  keyPrefix: string
  i18n: i18nData|string
}, {
  children: React.ReactNode
}>

export class Text extends Component<TextProps> {

  renderChildren() {
    const { i18n: i18nValue, keyPrefix, children } = this.props
    if(typeof i18nValue !== "undefined" && typeof keyPrefix !== "undefined") {
      return i18nSettings.compileMarkdown<React.ReactElement>(keyPrefix, i18n(i18nValue))
    }
    return children
  }

  render() {
    return <span style={this.state.style} children={this.renderChildren()}/>
  }

}
