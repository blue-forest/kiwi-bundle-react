import React from "react"
import { XOR, i18nData, i18nSettings, i18n } from "dropin-recipes"

type TextProps = XOR<{
  keyPrefix: string
  i18n: i18nData
}, {
  children: React.ReactNode
}>

export class Text extends React.PureComponent<TextProps> {

  constructor(props: TextProps) {
    super(props)
  }

  render() {
    const { i18n: i18nValue, keyPrefix, children } = this.props
    if(typeof i18nValue !== "undefined" && typeof keyPrefix !== "undefined") {
      return i18nSettings.compileMarkdown<React.ReactElement>(keyPrefix, i18n(i18nValue))
    }
    return children
  }

}
