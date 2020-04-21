import * as React from "react"
import { i18nData, i18nSettings, i18n, XOR } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"

type TextProps = ComponentProps & XOR<{
  id: string
  children: i18nData
}, {
  children: string
}>

export class Text extends Component<TextProps> {

  renderChildren() {
    const { children, id } = this.props
    if(typeof children === "object") {
      return i18nSettings.compileMarkdown<React.ReactElement>(id as string, i18n(children as i18nData))
    }
    return children
  }

  render() {
    return <span style={this.state.style} children={this.renderChildren()}/>
  }

}
