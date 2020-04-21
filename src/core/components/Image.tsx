import * as React from "react"
import { LanguagesObject_IncludeAll, i18nSettings } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"

interface ImageProps extends ComponentProps {
  source: string|LanguagesObject_IncludeAll<string>
  alt?: string
}

export class Image extends Component<ImageProps> {

  render() {
    const { source } = this.props
    let finalSource = ""
    if(typeof source === "object") {
      if(typeof source[i18nSettings.getCurrentLanguage()] !== "undefined") {
        finalSource = source[i18nSettings.getCurrentLanguage()]
      } else if(typeof source[i18nSettings.getDefaultLanguage()] !== "undefined") {
        finalSource =  source[i18nSettings.getDefaultLanguage()]
      }
    } else {
      finalSource = source
    }
    return <img src={finalSource} alt={this.props.alt} style={this.state.style}/>
  }

}
