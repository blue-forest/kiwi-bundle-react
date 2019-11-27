import { PureComponent } from "react"
import { i18nData, i18nSettings, i18n } from "dropin-recipes"

interface TextProps {
  keyPrefix: string
  i18n: i18nData
}

export class Text extends PureComponent<TextProps> {

  constructor(props: TextProps) {
    super(props)
  }

  render() {
    return i18nSettings.compileMarkdown<React.ReactElement>(this.props.keyPrefix, i18n(this.props.i18n))
  }

}
