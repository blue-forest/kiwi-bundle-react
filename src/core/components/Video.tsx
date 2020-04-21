import * as React from "react"
import { LanguagesObject_IncludeAll, i18nSettings } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"

interface VideoProps extends ComponentProps {
  sources: string[]|LanguagesObject_IncludeAll<string[]>
  keyPrefix: string
}

export class Video extends Component<VideoProps> {

  render() {
    const { sources, keyPrefix } = this.props

    let finalSources: string[] = []
    if(typeof sources === "object") {
      const sourcesAsLanguages = sources as LanguagesObject_IncludeAll<string[]>
      if(typeof sourcesAsLanguages[i18nSettings.getCurrentLanguage()] !== "undefined") {
        finalSources = sourcesAsLanguages[i18nSettings.getCurrentLanguage()]
      } else if(typeof sourcesAsLanguages[i18nSettings.getDefaultLanguage()] !== "undefined") {
        finalSources =  sourcesAsLanguages[i18nSettings.getDefaultLanguage()]
      }
    } else {
      finalSources = sources
    }

    return <video style={this.state.style} loop autoPlay>
      {finalSources.map((source, index) => {
        const split = source.split(".")
        const format = split[split.length - 1]
        return <source key={`${keyPrefix}-${index}`} src={source} type={`video/${format}`}/>
      })}
      {this.props.children}
    </video>
  }

}
