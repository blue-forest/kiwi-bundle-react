import * as React from "react"
import { i18nData, i18nSettings, i18n, XOR, i18nSchema } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"

type TextProps = ComponentProps & XOR<{
  id: string
  children: i18nSchema
}, {
  children: string
}>

export class Text extends Component<TextProps> {

  render() {
    const { children, id } = this.props
    return <span
      style={this.state.style}
      children={(() => {
        if(typeof children === "object") {
          return i18nSettings.compileMarkdown<React.ReactElement>(id as string, i18n(children))
        }
        return children
      })()}
    />
  }

}
