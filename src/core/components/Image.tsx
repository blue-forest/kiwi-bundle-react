import * as React from "react"
import { LanguagesObject_IncludeAll, i18nSettings, i18nData, i18n, i18nSchema } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"

interface ImageProps extends ComponentProps {
  source: string|LanguagesObject_IncludeAll<string>
  alt?: string|i18nSchema
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

export class Image extends Component<ImageProps> {

  render() {
    const { source, alt, onClick } = this.props
    return <img
      src={(() => {
        if(typeof source === "string") {
          return source
        }
        if(typeof source[i18nSettings.getCurrentLanguage()] !== "undefined") {
          return source[i18nSettings.getCurrentLanguage()]
        }
        if(typeof source[i18nSettings.getDefaultLanguage()] !== "undefined") {
          return source[i18nSettings.getDefaultLanguage()]
        }
        return ""
      })()}
      alt={typeof alt === "string" ? alt : i18n(alt as i18nSchema)}
      onClick={onClick?.bind(this)}
      style={this.state.$.style}
    />
  }

}
