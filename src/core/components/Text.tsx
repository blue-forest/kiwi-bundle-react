import * as React from "react"
import { i18nData, i18nSettings, i18n } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"

type TextProps = ComponentProps & {
  id: string
  children: React.ReactNode|i18nData
}

export class Text extends Component<TextProps> {

  renderChildren() {
    const { children, id } = this.props
    if(React.isValidElement(children)) return children
    return i18nSettings.compileMarkdown<React.ReactElement>(id, i18n(children as i18nData))
  }

  render() {
    return <span key={this.props.id} style={this.state.style} children={this.renderChildren()}/>
  }

}
